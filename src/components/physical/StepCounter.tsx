"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Footprints } from "lucide-react";
import { StatusChip } from "@/components/ui/StatusChip";
import {
  checkStepsPermission,
  getInitialStepsStatus,
  isStepsNative,
  requestStepsPermission,
  queryTodaySteps,
  watchTodaySteps,
  type StepsPermission,
} from "@/lib/physical/steps";

function formatSteps(n: number | null): string {
  if (n == null || !Number.isFinite(n)) return "—";
  return Math.max(0, Math.floor(n)).toLocaleString();
}

export function StepCounter() {
  const native = isStepsNative();
  const [steps, setSteps] = useState<number | null>(null);
  const [permission, setPermission] = useState<StepsPermission>(
    native ? "prompt" : "unavailable",
  );
  const [live, setLive] = useState(false);
  const [available, setAvailable] = useState(native);
  const [busy, setBusy] = useState(false);
  const watchCleanup = useRef<(() => void) | null>(null);

  const refreshQuery = useCallback(async () => {
    if (!native) return;
    try {
      const perm = await checkStepsPermission();
      setPermission(perm);
      if (perm === "granted") {
        const n = await queryTodaySteps();
        if (n != null) setSteps(n);
      }
    } catch {
      // keep last paint
    }
  }, [native]);

  const startWatch = useCallback(async () => {
    if (!native) return;

    if (watchCleanup.current) {
      watchCleanup.current();
      watchCleanup.current = null;
    }

    const cleanup = await watchTodaySteps((n, meta) => {
      setSteps(n);
      setLive(meta.live);
      if (meta.live) setPermission("granted");
    });
    watchCleanup.current = () => {
      void cleanup();
    };

    const perm = await checkStepsPermission();
    setPermission(perm);
  }, [native]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const status = await getInitialStepsStatus();
      if (cancelled) return;
      setAvailable(status.available);
      setPermission(status.permission);
      setSteps(status.steps);
      setLive(status.live);

      if (native && status.available) {
        await startWatch();
      }
    })();

    const onFocus = () => {
      void refreshQuery();
    };
    const onVis = () => {
      if (document.visibilityState === "visible") void refreshQuery();
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelled = true;
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVis);
      watchCleanup.current?.();
      watchCleanup.current = null;
    };
  }, [native, refreshQuery, startWatch]);

  const onEnable = async () => {
    if (!native || busy) return;
    setBusy(true);
    try {
      const perm = await requestStepsPermission();
      setPermission(perm);
      if (perm === "granted") {
        await startWatch();
        const n = await queryTodaySteps();
        if (n != null) setSteps(n);
      }
    } finally {
      setBusy(false);
    }
  };

  const muted =
    !native ||
    !available ||
    permission === "denied" ||
    permission === "unavailable";

  return (
    <div className="mb-4 flex items-center justify-between gap-3 rounded-md border border-outline-variant bg-surface-container-low px-4 py-3">
      <div className="flex min-w-0 items-center gap-3">
        <Footprints
          className={`size-5 shrink-0 ${muted ? "text-outline" : "text-primary"}`}
          aria-hidden
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-label text-on-surface-variant">Today · Steps</p>
            {live && permission === "granted" ? (
              <StatusChip tone="secondary">Live</StatusChip>
            ) : null}
          </div>
          {!native ? (
            <p className="mt-0.5 text-xs text-on-surface-variant">
              Available on the mobile app
            </p>
          ) : permission === "denied" ? (
            <button
              type="button"
              onClick={() => void onEnable()}
              disabled={busy}
              className="mt-0.5 text-left text-xs text-secondary underline-offset-2 hover:underline disabled:opacity-60"
            >
              Enable motion access
            </button>
          ) : permission === "unavailable" || !available ? (
            <p className="mt-0.5 text-xs text-on-surface-variant">
              Pedometer unavailable on this device
            </p>
          ) : null}
        </div>
      </div>
      <div className="shrink-0 text-right">
        <p
          className={`font-display text-2xl font-semibold tabular-nums ${
            muted ? "text-outline" : "text-secondary"
          }`}
        >
          {muted && steps == null ? "—" : formatSteps(steps)}
        </p>
        <p className="font-label text-[10px] text-on-surface-variant">STEPS</p>
      </div>
    </div>
  );
}
