# UI Rules

## Feel

Solemn, empowering, nocturnal. High-performance readiness tool — not soft wellness. Full-bleed atmospheric hero; brand الانصار is hero-level. One composition in the first viewport.

## Layout

- First viewport: brand, one headline, one supporting line, CTA group, dominant visual plane (banner / star-field motifs). No stats strips, no card grids in hero.
- Sections: one job, one headline, one short supporting sentence.
- Cards: only for the three pillars (interaction = scanning distinct capabilities). No cards in hero or dua.
- Max content width ~72rem; generous vertical rhythm from tokens.

## Components

### Buttons
- Primary (Download): gold fill, dark text, disciplined radius — scarce and loud.
- Secondary (GitHub): 1px outline, transparent fill, emerald hover border.
- No rounded-full pills for primary CTAs on this site (slight radius only).

### Dua block
- Full-width atmospheric band; Arabic RTL, Aref Ruqaa, gold calligraphy.
- English italic Source Serif below; source attribution in mono label.
- Decorative separators ✦ only as sparse sacred punctuation — not emoji clutter.

### Pillars
- Three distinct columns (Physical / Intellectual / Spiritual), not identical icon+heading+text clones in visual weight — vary motif accent color (emerald / tertiary / gold).
- Avoid uppercase tracked eyebrows above every section.

### Motifs
- 8-pointed star (khatim), crescent, constellation lines, subtle radial dawn behind calligraphy.
- Opacity 2–8% for background texture; stronger for hero focal graphics.
- Prefer SVG + CSS; respect `prefers-reduced-motion`.

## Absolute bans (impeccable)

- No side-stripe accent borders on cards
- No gradient text
- No glassmorphism-by-default (glass only if a sticky bar is added)
- No hero-metric / big-number template
- No identical icon+heading+text card grids as reflex
- No uppercase tracked eyebrow above every section
- No 01/02/03 section numbering as scaffolding
- No purple-on-white or purple-indigo default AI look
- No warm cream body background
- Reveal animations must not gate visibility on scroll classes; content visible without JS

## Motion

Ship intentional motions only:

1. Hero motif slow drift / star twinkle (CSS)
2. Readiness ring or dawn radial fade-in on load
3. CTA subtle gold glow pulse

All have `prefers-reduced-motion: reduce` → static final state.
