# Design — Al-Ansaar Landing

## Scene

A seeker opens the page at night after Maghrib; soft lamp light on calligraphy. The screen feels like a quiet command center under a star-field.

## Color strategy

Restrained nocturnal palette: deep navy canvas, emerald for life/readiness, scarce gold for sacred emphasis. Tokens in OKLCH via CSS variables (`app/globals.css`). Body text contrast ≥ 4.5:1.

## Typography

- **Aref Ruqaa** — Arabic brand + dua calligraphy
- **Source Serif 4** — English sacred headlines / translation
- **Geist** — UI body
- **JetBrains Mono** — labels
- Display clamp max ≤ 6rem; letter-spacing no tighter than -0.04em

## Rules

- Full-bleed atmospheric hero; brand الانصار is hero-level
- Cards only for the three pillars
- No side-stripe accents, gradient text, glassmorphism-by-default, hero metrics, identical card grids, uppercase eyebrows on every section, or 01/02/03 scaffolding
- Motion: star twinkle, motif drift, CTA glow — all respect `prefers-reduced-motion`
- Reveal animations never gate content visibility
