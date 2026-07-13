import { getDurableJson, setDurableJson } from "@/lib/storage/durable";
import { localDateKey } from "@/lib/spiritual/storage";
import type { FitnessProfile, StoredFitnessPlan } from "./types";

const PROFILE_KEY = "intezari.physical.profile";
const PLAN_KEY = "intezari.physical.plan";
const SESSION_KEY = "intezari.physical.sessionProgress";
const STEPS_BY_DATE_KEY = "intezari.physical.stepsByDate";
const STEPS_PERMISSION_ASKED_KEY = "intezari.physical.stepsPermissionAsked";

/** Keep a short rolling window for a future chart — not shown in UI yet. */
const STEPS_HISTORY_DAYS = 14;

export type SessionProgress = {
  /** `${week}-${day}` → completed exercise ids */
  completed: Record<string, string[]>;
};

export type StepsByDate = Record<string, number>;

function trimStepsByDate(map: StepsByDate, keepDays = STEPS_HISTORY_DAYS): StepsByDate {
  const keys = Object.keys(map).sort();
  if (keys.length <= keepDays) return map;
  const drop = keys.slice(0, keys.length - keepDays);
  const next = { ...map };
  for (const k of drop) delete next[k];
  return next;
}

export async function loadFitnessProfile(): Promise<FitnessProfile | null> {
  return getDurableJson<FitnessProfile>(PROFILE_KEY);
}

export async function saveFitnessProfile(profile: FitnessProfile): Promise<void> {
  await setDurableJson(PROFILE_KEY, profile);
}

export async function loadFitnessPlan(): Promise<StoredFitnessPlan | null> {
  return getDurableJson<StoredFitnessPlan>(PLAN_KEY);
}

export async function saveFitnessPlan(plan: StoredFitnessPlan): Promise<void> {
  await setDurableJson(PLAN_KEY, plan);
}

export async function loadSessionProgress(): Promise<SessionProgress> {
  const data = await getDurableJson<SessionProgress>(SESSION_KEY);
  return data ?? { completed: {} };
}

export async function saveSessionProgress(progress: SessionProgress): Promise<void> {
  await setDurableJson(SESSION_KEY, progress);
}

export function sessionDayKey(week: number, day: string): string {
  return `${week}-${day}`;
}

export async function loadStepsByDate(): Promise<StepsByDate> {
  return (await getDurableJson<StepsByDate>(STEPS_BY_DATE_KEY)) ?? {};
}

export async function mirrorTodaySteps(
  date: string,
  steps: number,
): Promise<void> {
  const map = await loadStepsByDate();
  map[date] = Math.max(0, Math.floor(steps));
  await setDurableJson(STEPS_BY_DATE_KEY, trimStepsByDate(map));
}

export async function loadMirroredTodaySteps(
  now = new Date(),
): Promise<number | null> {
  const map = await loadStepsByDate();
  const n = map[localDateKey(now)];
  return typeof n === "number" ? n : null;
}

export async function loadStepsPermissionAsked(): Promise<boolean> {
  const v = await getDurableJson<boolean>(STEPS_PERMISSION_ASKED_KEY);
  return v === true;
}

export async function saveStepsPermissionAsked(asked: boolean): Promise<void> {
  await setDurableJson(STEPS_PERMISSION_ASKED_KEY, asked);
}
