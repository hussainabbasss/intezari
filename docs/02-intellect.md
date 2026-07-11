# 02 — Intellect & Durable Local Storage

**Status:** Implemented  
**Product context:** [`project-overview.md`](./project-overview.md)  
**UI context:** [`ui-plan.md`](./ui-plan.md), [`01-ui.md`](./01-ui.md)

---

## What we are building

1. **Durable on-device storage** via Capacitor **Preferences** (Android `SharedPreferences` / iOS `UserDefaults`) — **not** HTTP cache, WebView cache, or temp directories Android may auto-clear.
2. **Kitab al-Ghaybah corpus** as an editable JSON file in-repo.
3. **Intellect tab**: each calendar day the phone persists a pack of **7** narrations; the UI shows **3** at a time; revisiting Intellect the same day **rotates** through that pack of 7.

## Storage principle

| Store | Use | Cleared by Android “Clear cache”? |
|-------|-----|-------------------------------------|
| `@capacitor/preferences` | Daily pack IDs, rotation offset, later settings | **No** (lives in app private prefs) |
| Bundled `content/…/ahadees.json` | Full corpus (read-only in the binary) | N/A (shipped with app) |
| WebView / HTTP cache | **Forbidden** for user data | Yes — do not use |

Clearing **app data** or uninstall still wipes Preferences (expected). Auto cache eviction must not wipe daily packs.

SQLite remains available later for Namaz logs / journals. Preferences is enough for Intellect daily pack state.

## Corpus file

Path: [`content/kitab-al-ghaybah/ahadees.json`](../content/kitab-al-ghaybah/ahadees.json)

Add narrations under `narrations[]`. Required fields:

- `id` — stable slug
- `label` — short theme label
- `quote` — primary line on cards
- `ref` — source citation
- `body` — longer text for the detail screen
- `themes` — optional tags

Ship at least **7** entries so a full daily pack is possible.

## Daily pack algorithm

1. Local calendar date `YYYY-MM-DD`.
2. If Preferences has no pack for today → seeded shuffle of corpus → take **7** IDs → save `{ date, ids, rotation }`.
3. If pack date is today → keep the same 7 IDs.
4. Each time the user **opens the Intellect tab**, increment `rotation` (debounced so React Strict Mode does not double-step).
5. Visible cards = 3 narrations starting at `rotation % 7`, wrapping within the day’s 7.

Midnight (new local date) → new pack of 7.

## Intellect UI

- Show exactly **3** `CommandmentCard`s from the visible window.
- Detail route `/intellect/[id]/` loads body from the corpus by `id`.
- Footer cue: stored on device / refreshes daily.

## Out of scope (this pass)

- Supabase sync of reading history
- Native home-screen widget
- Encrypting Preferences values
- Pedometer / salah storage (later prefs or SQLite)

## Done when

- [x] `@capacitor/preferences` installed and used for daily pack
- [x] `content/kitab-al-ghaybah/ahadees.json` exists and is the source of truth for text
- [x] Intellect shows 3 cards from a durable daily pack of 7
- [x] Same-day revisits rotate; new day refreshes the 7
- [x] Static export + `cap sync` succeed
