import { getDurableJson, setDurableJson } from "@/lib/storage/durable";
import { getAllHadiths, getHadithById, type Hadith } from "./corpus";

export const DAILY_PACK_SIZE = 7;
export const VISIBLE_COUNT = 3;
const STORAGE_KEY = "intezari.intellect.dailyPack";
/** Prevents React Strict Mode double-mount from advancing rotation twice. */
const OPEN_DEBOUNCE_MS = 800;

export type DailyPack = {
  /** Local calendar date YYYY-MM-DD */
  date: string;
  /** Up to 7 hadith ids for today */
  ids: string[];
  /** Rotates which window of 3 is shown */
  rotation: number;
};

function localDateKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function hashString(input: string): number {
  let h = 2166136261;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Seeded shuffle so the same day always yields the same 7 from a fixed corpus. */
function pickDailyIds(allIds: string[], date: string, count: number): string[] {
  if (allIds.length === 0) return [];
  const shuffled = [...allIds];
  let seed = hashString(`intezari:${date}:ghaybah`);
  const rand = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 0x100000000;
  };
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = tmp;
  }
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

async function savePack(pack: DailyPack): Promise<void> {
  await setDurableJson(STORAGE_KEY, pack);
}

export async function loadOrCreateDailyPack(
  now = new Date(),
): Promise<{ pack: DailyPack; created: boolean }> {
  const today = localDateKey(now);
  const existing = await getDurableJson<DailyPack>(STORAGE_KEY);
  const allIds = getAllHadiths().map((h) => h.id);

  if (
    existing &&
    existing.date === today &&
    Array.isArray(existing.ids) &&
    existing.ids.length > 0
  ) {
    return {
      pack: {
        date: existing.date,
        ids: existing.ids,
        rotation: existing.rotation ?? 0,
      },
      created: false,
    };
  }

  const pack: DailyPack = {
    date: today,
    ids: pickDailyIds(allIds, today, DAILY_PACK_SIZE),
    rotation: 0,
  };
  await savePack(pack);
  return { pack, created: true };
}

export async function bumpRotation(pack: DailyPack): Promise<DailyPack> {
  if (pack.ids.length === 0) return pack;
  const next: DailyPack = {
    ...pack,
    rotation: (pack.rotation + 1) % pack.ids.length,
  };
  await savePack(next);
  return next;
}

export function visibleHadiths(pack: DailyPack): Hadith[] {
  if (pack.ids.length === 0) return [];
  const count = Math.min(VISIBLE_COUNT, pack.ids.length);
  const out: Hadith[] = [];
  for (let i = 0; i < count; i++) {
    const id = pack.ids[(pack.rotation + i) % pack.ids.length]!;
    const hadith = getHadithById(id);
    if (hadith) out.push(hadith);
  }
  return out;
}

/**
 * Per docs/02-intellect.md:
 * 1–3) Load or create today's durable pack of 7
 * 4) Each Intellect open increments rotation (debounced)
 * 5) UI shows 3 cards from rotation window
 */
export async function openIntellectFeed(): Promise<{
  pack: DailyPack;
  visible: Hadith[];
}> {
  const { pack: initial, created } = await loadOrCreateDailyPack();
  let pack = initial;

  const debounceKey = `intezari:intellect:open:${pack.date}`;
  const now = Date.now();
  const last =
    typeof sessionStorage !== "undefined"
      ? Number(sessionStorage.getItem(debounceKey) ?? "0")
      : 0;
  const canBump = now - last >= OPEN_DEBOUNCE_MS;

  if (typeof sessionStorage !== "undefined") {
    sessionStorage.setItem(debounceKey, String(now));
  }

  // First create of the day stays at rotation 0; later opens bump.
  if (!created && canBump) {
    pack = await bumpRotation(pack);
  }

  return { pack, visible: visibleHadiths(pack) };
}
