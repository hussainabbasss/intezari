# UI Tokens

**Color strategy:** Restrained nocturnal palette — deep navy canvas, emerald for life/readiness, scarce gold for sacred emphasis.  
**Scene:** A seeker opens the page at night after Maghrib, soft lamp light on calligraphy; the screen should feel like a quiet command center under a star-field, not a marketing brochure under daylight.

All values below ship as CSS custom properties in `globals.css`.

## Color (OKLCH)

```css
--color-bg: oklch(0.18 0.04 260);           /* #0b1326 nocturnal canvas */
--color-bg-deep: oklch(0.14 0.04 260);      /* #060e20 recessed */
--color-surface: oklch(0.22 0.04 260);      /* #171f33 */
--color-surface-high: oklch(0.26 0.035 260);/* #222a3d */
--color-on-surface: oklch(0.92 0.02 260);   /* #dae2fd primary text ≥ 4.5:1 */
--color-on-surface-muted: oklch(0.82 0.02 160); /* #bfc9c3 secondary */
--color-outline: oklch(0.45 0.02 160);      /* #404944 borders */
--color-primary: oklch(0.80 0.07 165);      /* #95d3ba emerald */
--color-on-primary: oklch(0.28 0.06 165);   /* #003829 */
--color-primary-container: oklch(0.35 0.07 165); /* #064e3b */
--color-gold: oklch(0.82 0.12 70);          /* #ffb95f scarce sacred */
--color-gold-bright: oklch(0.90 0.14 95);   /* calligraphy highlight */
--color-on-gold: oklch(0.32 0.08 60);       /* #472a00 */
--color-tertiary: oklch(0.80 0.03 250);     /* #b9c7e0 intellect */
```

## Typography

| Token | Family | Notes |
|-------|--------|-------|
| `--font-display` | Source Serif 4 | English sacred / headlines; clamp max ≤ 6rem |
| `--font-arabic` | Aref Ruqaa | Brand الانصار + dua calligraphy |
| `--font-sans` | Geist | UI body |
| `--font-mono` | JetBrains Mono | Labels |

Letter-spacing: never tighter than `-0.04em`.

## Spacing (4px base)

`--space-1` 4px · `--space-2` 8px · `--space-3` 12px · `--space-4` 16px · `--space-5` 24px · `--space-6` 40px · `--space-7` 64px · `--space-8` 96px

## Radii

`--radius-sm` 4px · `--radius-md` 8px · `--radius-lg` 12px · `--radius-full` 9999px

## Shadows

Prefer tonal layering over heavy shadows. Optional soft gold glow on CTA only: `--glow-gold: 0 0 40px oklch(0.82 0.12 70 / 0.25)`.

## Z-index scale

| Token | Value | Use |
|-------|-------|-----|
| `--z-base` | 0 | content |
| `--z-motif` | 1 | decorative SVG layers |
| `--z-content` | 10 | text above motifs |
| `--z-sticky` | 100 | sticky nav if any |
| `--z-modal-backdrop` | 200 | — |
| `--z-modal` | 210 | — |
| `--z-toast` | 300 | — |
| `--z-tooltip` | 400 | — |
