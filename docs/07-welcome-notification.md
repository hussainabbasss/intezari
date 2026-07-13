# 07 — Welcome notification (first launch)

**Status:** Implemented

## What we are building

On the **first native launch** after install, schedule one local welcome notification (same Capacitor path as prayer / Muhasaba). Once only — gated by Preferences. Web/dev no-ops.

## Language

- **Install / first launch** — first time the native app runs with notification permission flow; not every open.
- **Welcome notification** — system local notification, not an in-app banner.

## Decisions

- Flag: `intezari.notifications.welcomeSent` in Preferences.
- Fire ~1s after first successful permission grant (same pattern as weekly Muhasaba).
- Notification id `4001` (outside prayer/exercise ranges).
- Tap opens Progress (`/`).
- Hook from `refreshLocalSchedules` so AppShell runs it on mount.

## Out of scope

- Re-sending on update / reinstall without clearing app data (Clear data resets Preferences → welcome can fire again; that is correct for a fresh install).
- Custom welcome copy variants / A-B.
