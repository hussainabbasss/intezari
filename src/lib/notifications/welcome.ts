import { Capacitor } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { getDurableJson, setDurableJson } from "@/lib/storage/durable";
import { WELCOME_NOTIF_ID } from "./ids";

const WELCOME_SENT_KEY = "intezari.notifications.welcomeSent";

/**
 * Once per install: local welcome notification on first native launch
 * after notification permission is granted.
 */
export async function maybeSendWelcomeNotification(): Promise<void> {
  if (!Capacitor.isNativePlatform()) return;

  try {
    const sent = await getDurableJson<boolean>(WELCOME_SENT_KEY);
    if (sent === true) return;

    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== "granted") return;

    await LocalNotifications.schedule({
      notifications: [
        {
          id: WELCOME_NOTIF_ID,
          title: "Al-Ansaar",
          body: "Welcome. Your readiness training begins here — physical, intellect, and spirit.",
          schedule: { at: new Date(Date.now() + 1000) },
          extra: { href: "/" },
        },
      ],
    });

    await setDurableJson(WELCOME_SENT_KEY, true);
  } catch {
    // Web / denied / schedule failure — silent
  }
}
