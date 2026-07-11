# Design System — Sacred Discipline

Visual system for Intezari mobile UI. Canonical narrative also lives in `docs/ui-plan.md` and `docs/stitch_al_asr_readiness_training/sacred_discipline/DESIGN.md`.

## Theme

Dark-only nocturnal command surface. Tonal elevation (surface ladder), not shadows. Restrained color strategy: tinted slate neutrals + emerald primary + scarce gold secondary.

## Colors

| Token | Value | Use |
|-------|-------|-----|
| background / surface | `#0b1326` | Canvas |
| surface-container-lowest | `#060e20` | Inputs |
| surface-container-low | `#131b2e` | Secondary tiles |
| surface-container | `#171f33` | Cards / rows |
| surface-container-high | `#222a3d` | Elevated cards / sheets |
| surface-variant | `#2d3449` | Tracks |
| on-surface | `#dae2fd` | Body / titles |
| on-surface-variant | `#bfc9c3` | Secondary |
| outline / outline-variant | `#89938d` / `#404944` | Labels / borders |
| primary | `#95d3ba` | Progress, brand accent |
| primary-container | `#064e3b` | Filled CTAs |
| secondary | `#ffb95f` | Active tab, READY, spiritual CTAs |

## Typography

- **Source Serif 4** — display, wordmark, sacred quotes
- **Geist** — UI titles and body
- **JetBrains Mono** — caps labels, metrics, chips

## Spacing & radius

4px base; 8px rhythm; 20px mobile margin. Disciplined radii: ~4px controls, ~8px cards. Pills only for small chips and tab shell.

## Components

Shared under `src/components/ui/`: AppTopBar, BottomTabs, ReadinessRing, CommandmentCard, PresenceRow, PromptComposer, FAB, ActionSheet, JournalSheet, StackHeader, PrimaryButton.

## Motion

READY pulse, readiness ring draw-in, sync spin. 150–250ms for UI transitions. Honor reduced motion.

## z-index

`--z-sticky` (40) → `--z-nav` (50) → `--z-overlay` (60) → `--z-toast` (70)
