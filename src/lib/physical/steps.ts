import { Capacitor, type PluginListenerHandle } from "@capacitor/core";
import { CapacitorPedometer } from "@capgo/capacitor-pedometer";
import { localDateKey } from "@/lib/spiritual/storage";
import {
  loadStepsByDate,
  loadStepsPermissionAsked,
  mirrorTodaySteps,
  saveStepsPermissionAsked,
} from "./storage";

export type StepsPermission = "granted" | "denied" | "prompt" | "unavailable";

export type StepsStatus = {
  available: boolean;
  steps: number | null;
  permission: StepsPermission;
  live: boolean;
};

const WEB_STATUS: StepsStatus = {
  available: false,
  steps: null,
  permission: "unavailable",
  live: false,
};

function startOfLocalDayMs(d = new Date()): number {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

function mapPermission(
  state: string | undefined,
): Exclude<StepsPermission, "unavailable"> {
  if (state === "granted") return "granted";
  if (state === "denied") return "denied";
  return "prompt";
}

/** Web / non-native: no pedometer fiction. */
export function isStepsNative(): boolean {
  return Capacitor.isNativePlatform();
}

export async function checkStepsPermission(): Promise<StepsPermission> {
  if (!isStepsNative()) return "unavailable";
  try {
    const avail = await CapacitorPedometer.isAvailable();
    if (!avail.stepCounting) return "unavailable";
    const status = await CapacitorPedometer.checkPermissions();
    return mapPermission(status.activityRecognition);
  } catch {
    return "unavailable";
  }
}

export async function requestStepsPermission(): Promise<StepsPermission> {
  if (!isStepsNative()) return "unavailable";
  try {
    await saveStepsPermissionAsked(true);
    const status = await CapacitorPedometer.requestPermissions();
    return mapPermission(status.activityRecognition);
  } catch {
    await saveStepsPermissionAsked(true);
    return "denied";
  }
}

/**
 * Best-effort today’s total.
 * iOS: historical query from local midnight.
 * Android: Preferences mirror (session deltas apply via watch).
 */
export async function queryTodaySteps(now = new Date()): Promise<number | null> {
  if (!isStepsNative()) return null;

  const date = localDateKey(now);
  const mirrored = await loadStepsByDate();
  const cached = mirrored[date];

  try {
    const perm = await checkStepsPermission();
    if (perm !== "granted") {
      return typeof cached === "number" ? cached : null;
    }

    if (Capacitor.getPlatform() === "ios") {
      const measurement = await CapacitorPedometer.getMeasurement({
        start: startOfLocalDayMs(now),
        end: now.getTime(),
      });
      const steps = measurement.numberOfSteps;
      if (typeof steps === "number" && Number.isFinite(steps)) {
        const n = Math.max(0, Math.floor(steps));
        await mirrorTodaySteps(date, n);
        return n;
      }
    }

    // Android (and iOS fallback): last mirrored total
    if (typeof cached === "number") return cached;

    const live = await CapacitorPedometer.getMeasurement();
    if (typeof live.numberOfSteps === "number") {
      return Math.max(0, Math.floor(live.numberOfSteps));
    }
  } catch {
    if (typeof cached === "number") return cached;
  }

  return typeof cached === "number" ? cached : null;
}

/**
 * Start OS pedometer updates while Physical is mounted.
 * Returns cleanup (stop updates + remove listener).
 *
 * Android: session delta is added to the mirrored day total at start
 * so locked-screen steps still accumulate while updates stay active.
 * iOS: seed from historical midnight query, then add live deltas.
 */
export async function watchTodaySteps(
  onUpdate: (steps: number, meta: { live: boolean }) => void,
): Promise<() => void> {
  if (!isStepsNative()) {
    return () => undefined;
  }

  let cancelled = false;
  let handle: PluginListenerHandle | null = null;
  let sessionBase = 0;
  let activeDate = localDateKey();

  const cleanup = async () => {
    cancelled = true;
    try {
      await handle?.remove();
    } catch {
      // ignore
    }
    handle = null;
    try {
      await CapacitorPedometer.stopMeasurementUpdates();
    } catch {
      // ignore
    }
  };

  try {
    const avail = await CapacitorPedometer.isAvailable();
    if (!avail.stepCounting) {
      return cleanup;
    }

    let perm = await checkStepsPermission();
    if (perm === "prompt") {
      const asked = await loadStepsPermissionAsked();
      if (!asked) {
        perm = await requestStepsPermission();
      }
    }

    if (perm !== "granted") {
      const mirrored = await loadStepsByDate();
      const cached = mirrored[activeDate];
      if (typeof cached === "number") onUpdate(cached, { live: false });
      return cleanup;
    }

    // Seed today’s total before live deltas.
    if (Capacitor.getPlatform() === "ios") {
      const queried = await queryTodaySteps();
      sessionBase = queried ?? 0;
    } else {
      const mirrored = await loadStepsByDate();
      sessionBase =
        typeof mirrored[activeDate] === "number" ? mirrored[activeDate]! : 0;
    }

    if (!cancelled) onUpdate(sessionBase, { live: false });

    handle = await CapacitorPedometer.addListener("measurement", (event) => {
      if (cancelled) return;
      const today = localDateKey();
      // Midnight while listening: drop prior-day base; delta still
      // includes pre-midnight steps until next remount — acceptable.
      if (today !== activeDate) {
        activeDate = today;
        sessionBase = 0;
      }
      const delta = Math.max(0, Math.floor(event.numberOfSteps ?? 0));
      const total = sessionBase + delta;
      void mirrorTodaySteps(today, total);
      onUpdate(total, { live: true });
    });

    await CapacitorPedometer.startMeasurementUpdates();
    if (!cancelled) onUpdate(sessionBase, { live: true });
  } catch {
    const mirrored = await loadStepsByDate();
    const cached = mirrored[activeDate];
    if (typeof cached === "number") onUpdate(cached, { live: false });
  }

  return cleanup;
}

export async function getInitialStepsStatus(): Promise<StepsStatus> {
  if (!isStepsNative()) return WEB_STATUS;

  try {
    const avail = await CapacitorPedometer.isAvailable();
    if (!avail.stepCounting) {
      return {
        available: false,
        steps: null,
        permission: "unavailable",
        live: false,
      };
    }

    const permission = await checkStepsPermission();
    const mirrored = await loadStepsByDate();
    const cached = mirrored[localDateKey()];
    const steps =
      permission === "granted"
        ? ((await queryTodaySteps()) ??
          (typeof cached === "number" ? cached : null))
        : typeof cached === "number"
          ? cached
          : null;

    return {
      available: true,
      steps,
      permission,
      live: false,
    };
  } catch {
    return {
      available: false,
      steps: null,
      permission: "unavailable",
      live: false,
    };
  }
}
