# 06 — Physical Step Counter (Native Pedometer)

**Status:** Implemented  
**Product context:** [`project-overview.md`](./project-overview.md)  
**UI context:** [`ui-plan.md`](./ui-plan.md), [`01-ui.md`](./01-ui.md)  
**Depends on:** [`03-physical.md`](./03-physical.md) (Physical tab shell; pedometer was out of scope there)  
**Storage pattern:** same durable Preferences approach as prior passes

**Plugin note:** `@capacitor-community/pedometer` is not on npm. Implementation uses maintained `@capgo/capacitor-pedometer` (Capacitor 8) behind `src/lib/physical/steps.ts`.

---

## What we are building

A **small live step counter** on the Physical tab that shows **today’s steps**, counted by the **OS pedometer** (Android Activity Recognition / Health Connect–style pipeline; iOS HealthKit / Core Motion where available) through a Capacitor plugin. Counting continues while the screen is locked and the app is backgrounded, once the user grants permission. No account required. Web/dev shows a clear unavailable / stub state — no fake step theater.

---

## Language we agreed on

| Term | Meaning |
|------|---------|
| **Small step counter** | Compact live readout on the Physical tab (today’s step count) — not a new tab, weekly chart, or goal/streak system. |
| **Accelerometer / pedometer** | The phone’s motion hardware via the **OS step pipeline**, not a custom JS accelerometer algorithm in the WebView. Capacitor bridges to HealthKit / Google Fit (or current Android equivalent). |
| **Phone is off** | **Screen locked / app not in foreground.** Steps still accumulate via the OS. A powered-off device cannot sense motion. |
| **Automatically count** | Continuous background counting after permission — no manual “start walking” control. |
| **User permissions** | Platform motion / activity permission (and HealthKit / Health Connect access where required), requested once and respected if denied. |

---

## Decisions made

| Decision | Choice | Why |
|----------|--------|-----|
| Sensing approach | **OS pedometer via Capacitor**, not raw WebView `DeviceMotion` | Locked-screen / background counting is impossible from the WebView alone. Product overview already names `@capacitor-community/pedometer` (HealthKit / Google Fit). |
| Plugin | **`@capgo/capacitor-pedometer`** (community package absent from npm); thin `steps.ts` wrapper keeps UI plugin-agnostic | Overview named community package; same app-facing API as planned |
| Platform priority | **Android first**; iOS wired in the same project, secondary QA | Matches stack priority in project overview. |
| UI placement | Compact mono metric strip on Physical — **above** the Calories Burn card (or directly under the page intro). Independent of plan gating. | UI plan: “live step count readout”; steps must work before a fitness plan exists. |
| Plan gate interaction | Step counter **always interactive** (permission permitting). Calories / modules / session stay gated per `03-physical.md`. | Steps are a readiness signal, not part of the LLM plan. |
| What we display | **Today’s step total** (local calendar day). Optional subtle “live” cue when the native listener is active. | Keeps the “small” promise; no weekly pedometer chart this pass. |
| Source of truth | **OS pedometer query** when available; **Preferences mirror** of last known today total for fast paint / brief offline of the bridge | Local-first display without inventing steps. |
| History | Persist a small map `date → steps` for recent days (e.g. last 14) when the OS returns daily totals; do not build a history UI yet | Cheap future chart; out of scope to render it now. |
| Progress ring / pillars | **Do not** fold steps into Progress `%` this pass | Explicitly out of scope in `05-linkup.md`. |
| Auth | Pre-auth / anonymous OK — same as overview for steps | No sign-in gate. |
| Denied permission | Show muted counter + short enable CTA; no crash loops; remember soft “asked” | Respect user choice. |
| Web / `next dev` | Detect non-native; show `—` / “Available on the mobile app” | Static export still builds; no browser pedometer fiction. |

---

## Assumptions

- “Today” uses the device’s **local calendar date** (`YYYY-MM-DD`), consistent with namaz / session keys.
- OS step APIs may reset or lag slightly after midnight or vendor battery restrictions; UI refreshes on Physical focus / app resume and via a live pedometer subscription when the plugin supports it.
- Android may require `ACTIVITY_RECOGNITION` (and possibly Health Connect read steps on newer OS versions). Document exact manifests in the Capacitor Android project during implementation.
- Literally powered-off phones do not count; that is an OS limitation, not an app bug.
- Supabase sync of step history is **not** in this pass.

---

## Storage

| Store | Use | Cleared by Android “Clear cache”? |
|-------|-----|-------------------------------------|
| `@capacitor/preferences` | Mirrored daily step totals, permission-asked flag | **No** |
| OS Health / Fit / Core Motion | Authoritative continuous step sensing | N/A |
| WebView / HTTP cache | **Forbidden** for step data | Yes — do not use |

### New keys

- `intezari.physical.stepsByDate` — `{ "YYYY-MM-DD": number }` (mirror / cache; trim old days)
- `intezari.physical.stepsPermissionAsked` — `true` after first native prompt attempt (optional soft flag)

### Existing keys (unchanged)

- `intezari.physical.profile` / `plan` / `sessionProgress` — no coupling required

---

## UI rules

### Physical tab (`/physical/`)

1. **Step counter strip** (small):
   - Label: e.g. `TODAY` / `STEPS` in mono / label typography
   - Value: integer step count (or `—` when unavailable)
   - Does **not** use a heavy card treatment if a single strip/chip is enough; stay Sacred Discipline (emerald/gold/mono), no dashboard clutter
2. **Visible without a plan** — not covered by the “Add details” disabled overlay
3. **Permission denied** — value muted; one-line action: “Enable motion access” → re-request / open OS settings guidance as the plugin allows
4. **Web** — same strip, non-interactive unavailable copy
5. **Calories Burn** remains the plan-driven chart from pass 03; do **not** replace it with a pedometer “Readiness Load” chart this pass

### Refresh

- On Physical mount, window focus, and Capacitor `appStateChange` → active
- Subscribe to pedometer updates while Physical is mounted when the plugin supports live updates; unsubscribe on leave

---

## Native / API split

```
Physical UI  →  src/lib/physical/steps.ts (wrapper)
                    ├─ Capacitor.isNativePlatform()
                    │     → pedometer plugin: permission + today query + optional watch
                    └─ web → { available: false, steps: null }
```

- Request permission only on native, ideally when Physical is first opened (or on explicit CTA if previously denied).
- Never block the rest of Physical on pedometer init failure.

### Capacitor notes

- Add plugin dependency; `npx cap sync`
- Android: declare activity-recognition (and Health Connect steps read if required by target SDK / plugin docs)
- iOS: HealthKit / motion usage strings in `Info.plist` when enabling iOS QA

---

## How to build it (implementation order)

1. Add Capacitor pedometer dependency + thin `src/lib/physical/steps.ts` wrapper (permission, today total, watch, web stub).
2. Preferences mirror helpers for `stepsByDate` (+ trim).
3. Small `StepCounter` UI component; mount on Physical page above Calories Burn; outside plan gate.
4. Wire refresh on focus/resume; live subscription while on Physical.
5. Android manifest / permission strings; `cap sync`; smoke on device (locked screen walk test).
6. Update [`README.md`](../README.md) Physical section to mention live steps (native only).
7. Mark this doc **Implemented** when done-when is checked.

---

## Out of scope

- Folding steps into Progress ring / Physical pillar %
- Weekly pedometer chart / “Readiness Load %” derived from steps (UI plan mentioned it; defer)
- Step goals, streaks, badges, or social comparison
- Raw custom accelerometer ML in JS
- Supabase sync of step history
- iOS as launch-blocking QA (wire yes; Android validates first)
- Replacing Calories Burn with live wearable calories

---

## Done when

- [x] `06-step-counter.md` written and confirmed
- [x] Physical shows a small today’s-steps readout (plan-independent)
- [x] Native build requests permission and reads OS pedometer totals
- [x] Steps continue accumulating with screen locked / app backgrounded (OS-backed)
- [x] Denied / web states are calm and non-breaking
- [x] Preferences mirror written; no Progress formula changes
- [x] README mentions native step counting
- [x] `build:cap` / `cap sync` succeed

---

## Confirm to build

Implemented after explicit confirmation.
