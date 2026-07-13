# Code Standards

## TypeScript

- Strict mode; no `any`.
- Prefer named exports for components.
- Props interfaces colocated in the same file, prefixed with component name (`HeroProps`).

## Naming

- Components: PascalCase files matching export.
- CSS variables: `--color-*`, `--space-*`, `--font-*`, `--z-*`.
- Constants: SCREAMING_SNAKE in `lib/site.ts` for URLs.

## File patterns

- One component per file under `components/`.
- Page composes only; no heavy markup in `page.tsx`.
- No unused demo assets left in `public/` after build (remove default Next SVGs if unused).

## Errors / links

- External links: `rel="noopener noreferrer"` + `target="_blank"` for GitHub.
- Download button always renders an `<a>` with a real href (never a dead button waiting for JS).

## Accessibility

- Semantic landmarks: `header`, `main`, `section`, `footer`.
- Arabic block: `dir="rtl"` and `lang="ar"`.
- Decorative SVGs: `aria-hidden="true"`.
- Contrast: body text ≥ 4.5:1 on background tokens.
