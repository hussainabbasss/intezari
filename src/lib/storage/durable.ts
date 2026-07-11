import { Preferences } from "@capacitor/preferences";

/**
 * Durable key-value storage via Capacitor Preferences.
 * Android: SharedPreferences (NOT cleared by “Clear cache”).
 * iOS: UserDefaults.
 * Web (dev): localStorage fallback built into the plugin.
 */
export async function getDurableString(key: string): Promise<string | null> {
  const { value } = await Preferences.get({ key });
  return value;
}

export async function setDurableString(key: string, value: string): Promise<void> {
  await Preferences.set({ key, value });
}

export async function removeDurableKey(key: string): Promise<void> {
  await Preferences.remove({ key });
}

export async function getDurableJson<T>(key: string): Promise<T | null> {
  const raw = await getDurableString(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function setDurableJson(key: string, value: unknown): Promise<void> {
  await setDurableString(key, JSON.stringify(value));
}
