# Agent instructions — Intezari

## Read docs before building

Before writing or changing application code, read the relevant docs in `docs/`:

1. [`docs/project-overview.md`](docs/project-overview.md) — product vision, architecture, auth, roadmap
2. [`docs/ui-plan.md`](docs/ui-plan.md) — Sacred Discipline visual system and screen specs
3. Active implementation plans (`docs/01-*.md`, etc.) — current pass scope, decisions, and done-when

Do not invent product behavior that contradicts those docs. If a plan is marked **Awaiting confirmation to build**, do not implement it until the developer confirms.

Stitch design references live under `docs/stitch_al_asr_readiness_training/`.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
