# Library Docs

## Next.js 16 (App Router)

- Use App Router under `app/`. Read `node_modules/next/dist/docs/` before unfamiliar APIs.
- Fonts via `next/font/google` (Aref_Ruqaa, Source_Serif_4, Geist, JetBrains_Mono).
- Images via `next/image` for `banner.png`.
- No API routes in this package.

## Tailwind CSS v4

- Tokens defined in `globals.css` with `@theme inline` mapping CSS variables to Tailwind color/font utilities.
- Prefer utility classes that reference theme tokens (`bg-bg`, `text-on-surface`, etc.) over arbitrary hex.

## Framer Motion

- Use for section entrance and CTA presence only.
- Always pair with CSS `@media (prefers-reduced-motion: reduce)` — either disable variants or set `initial={false}` when reduced motion is preferred.
- Do not use scroll-triggered opacity gates that leave content invisible.

## Lucide React

- Optional small icons on pillars / download (e.g. Download, BookOpen, Heart, Dumbbell). Keep stroke consistent; do not build icon-row marketing chrome.

## Site config (`lib/site.ts`)

```ts
export const GITHUB_REPO_URL = "https://github.com/hussainabbasss/intezari";
export const GITHUB_RELEASES_URL = "https://github.com/hussainabbasss/intezari/releases";
// Swap GITHUB_RELEASES_URL when the final release / APK link is ready.
```
