import { Capacitor } from "@capacitor/core";
import { maybeRunWeeklyMuhasaba } from "@/lib/spiritual/weekly";
import { scheduleExerciseReminders } from "./exercise";
import { schedulePrayerNotifications } from "./prayer";
import { maybeSendWelcomeNotification } from "./welcome";

let scheduling = false;

/** Reschedule prayer + exercise notifications, welcome once, check weekly Muhasaba. */
export async function refreshLocalSchedules(now = new Date()): Promise<void> {
  if (!Capacitor.isNativePlatform()) {
    try {
      await maybeRunWeeklyMuhasaba(now);
    } catch {
      // ignore
    }
    return;
  }
  if (scheduling) return;
  scheduling = true;
  try {
    // Welcome first so the permission prompt isn’t raced with other schedules.
    await maybeSendWelcomeNotification();
    await Promise.all([
      schedulePrayerNotifications(now),
      scheduleExerciseReminders(now),
      maybeRunWeeklyMuhasaba(now),
    ]);
  } catch {
    // ignore
  } finally {
    scheduling = false;
  }
}
