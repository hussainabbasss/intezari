# Al-Ansaar Landing Site — Project Overview

## What it is

A single-page marketing / download site for **Al-Ansaar** (الانصار) — the local-first readiness training app for the Shia community. It presents Intizar as active preparation for Imam al-Asr (atfs), not passive waiting.

This site lives in `landing-site/` and is separate from the Capacitor mobile app in the monorepo root.

## Who it is for

- Shia seekers discovering the app for the first time
- Community members looking for an Android APK / release download
- Contributors who want a beautiful public face for the open-source project

## Problems it solves

- Gives Al-Ansaar a solemn, attractive public home beyond GitHub README
- Surfaces the Dua Al-A'hd calligraphically as the spiritual heart of the brand
- Provides a clear download CTA (GitHub Releases) once the APK ships
- Communicates the three pillars: Physical, Intellectual, Spiritual

## Primary user flows

1. **Arrive → feel the brand** — full-bleed nocturnal hero with Imam al-Asr atmosphere and brand mark الانصار
2. **Read the dua** — Arabic calligraphy of Dua Al-A'hd + English translation
3. **Understand the product** — three pillars of readiness training
4. **Download** — primary CTA to GitHub Releases (URL configurable; placeholder until provided)
5. **Explore source** — secondary link to the GitHub repository

## In scope

- Single landing page (hero, dua, pillars, download, footer)
- Sacred Discipline visual language aligned with the mobile app
- SVG / CSS graphics evocative of Imam al-Asr, occultation, and readiness (stars, khatim, crescent motifs, atmospheric light)
- Calligraphic Arabic dua from README
- Download button → GitHub Releases URL (env or config constant; TBD by developer)
- Responsive desktop + mobile
- Motion: 2–3 intentional Framer Motion / CSS animations with `prefers-reduced-motion`

## Out of scope

- Auth, accounts, or app functionality
- Blog, docs site, or multi-page marketing
- App Store / Play Store listings (APK via GitHub Releases only for now)
- CMS or editable content admin
- Backend / API routes

## Assumptions

1. **Stack:** Next.js App Router + Tailwind CSS v4 + Framer Motion inside existing `landing-site/` scaffold (already initialized).
2. **Download URL:** Placeholder constant `GITHUB_RELEASES_URL` pointing at `https://github.com/hussainabbasss/intezari/releases` until the developer supplies the final link.
3. **Repo URL:** `https://github.com/hussainabbasss/intezari`
4. **Language:** English UI chrome; Arabic for brand mark and dua (RTL for dua block).
5. **Tone:** Solemn Sacred Discipline — nocturnal navy, emerald growth, scarce gold — matching `docs/ui-plan.md`, not consumer wellness pastel.
6. **Imagery:** Use existing `docs/banner.png` (copied to `public/banner.png`) plus custom SVG sacred motifs; no stock photography of people.
7. **Fonts:** Aref Ruqaa for Arabic calligraphy; Source Serif 4 for sacred English quotes; Geist for UI; JetBrains Mono for labels.
8. **Deploy:** Static-friendly Next.js site (no API routes required).
