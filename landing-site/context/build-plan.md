# Build Plan

## Phase 0 — Foundations

- Install Framer Motion + Lucide React
- Wire fonts + CSS tokens in `layout.tsx` / `globals.css`
- Add `lib/site.ts` with repo + releases URLs
- Copy brand banner to `public/`

**Done when:** `npm run build` succeeds with empty shell using new tokens.

## Phase 1 — Motifs + Hero

- Build `SacredMotifs` (khatim, constellation, crescent)
- Build `Hero` with brand الانصار, headline, supporting line, Download + GitHub CTAs, banner visual plane
- Build `DownloadButton`

**Done when:** First viewport reads as one Sacred Discipline composition; download links to releases URL.

## Phase 2 — Dua + Pillars + CTA + Footer

- `DuaSection` with full Arabic calligraphy + translation from README
- `Pillars` for Physical / Intellectual / Spiritual
- `DownloadCta` band repeating the download action
- `SiteFooter` with closing line اللّهُمَّ عَجِّلْ لِوَلِيِّكَ الْفَرَج

**Done when:** Full page scroll tells the story; all links work; responsive.

## Phase 3 — Verify

- Lint + production build
- Manual pass: mobile width, reduced motion, RTL dua
- Update `ui-registry.md` + `progress-tracker.md`
- Update landing-site README briefly

**Done when:** Clean build; registry accurate.

## Phase 4 — Impeccable polish

- Write `PRODUCT.md` + `DESIGN.md`
- Run impeccable polish; fix issues

**Done when:** Polish pass clean; site ready to share.
