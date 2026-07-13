# Architecture

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v4 + CSS variables from `ui-tokens.md` |
| Motion | Framer Motion |
| Icons | Lucide React (sparingly) |
| Fonts | `next/font` — Aref Ruqaa, Source Serif 4, Geist, JetBrains Mono |
| Hosting | Static-friendly; no server actions or API routes |

## Folder structure

```
landing-site/
├── app/
│   ├── layout.tsx          # fonts, metadata, root shell
│   ├── page.tsx            # composes landing sections
│   ├── globals.css         # tokens + base styles
│   └── favicon.ico
├── components/
│   ├── Hero.tsx
│   ├── DuaSection.tsx
│   ├── Pillars.tsx
│   ├── DownloadCta.tsx
│   ├── SiteFooter.tsx
│   ├── SacredMotifs.tsx    # SVG decorative graphics
│   └── DownloadButton.tsx
├── lib/
│   └── site.ts             # URLs, copy constants
├── public/
│   └── banner.png
└── context/                # produce specs (this folder)
```

## System boundaries

- **No backend.** All content is static.
- **No coupling to the Capacitor app runtime.** Shared brand language only (tokens / tone from docs).
- **Config constants** in `lib/site.ts` for GitHub repo + releases URL — easy to swap when the final release link arrives.

## Data-flow rules

1. Components never hard-code brand URLs; import from `lib/site.ts`.
2. Visual values come from CSS variables (tokens), never one-off hex in JSX except SVG fills that reference `currentColor` or CSS vars.
3. Page is a composition of section components; `page.tsx` stays thin.

## Constraints

- API routes: none
- Database: none
- Auth: none
- Client JS only for motion / interactivity; landing must remain usable without JS for core content and download link
