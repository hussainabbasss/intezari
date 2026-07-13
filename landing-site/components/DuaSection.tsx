"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MihrabFrame, Khatim, Starfield } from "./SacredMotifs";
import { DUA_ARABIC, DUA_ENGLISH, DUA_SOURCE } from "@/lib/site";

export function DuaSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="dua"
      aria-labelledby="dua-heading"
      className="relative overflow-hidden border-y border-outline/40 bg-bg-deep py-[clamp(4rem,10vw,7rem)]"
    >
      <Starfield className="pointer-events-none absolute inset-0 z-[var(--z-motif)] h-full w-full opacity-30" />
      <Khatim className="pointer-events-none absolute left-1/2 top-1/2 z-[var(--z-motif)] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.08]" />
      <MihrabFrame className="pointer-events-none absolute left-1/2 top-4 z-[var(--z-motif)] hidden h-[30rem] w-auto -translate-x-1/2 opacity-40 lg:block" />

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 opacity-50"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 0%, oklch(0.82 0.12 70 / 0.12), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-[var(--z-content)] mx-auto max-w-3xl px-5 md:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <h2
            id="dua-heading"
            className="font-[family-name:var(--font-source-serif)] text-[clamp(1.5rem,3vw,2rem)] font-semibold text-on-surface [text-wrap:balance]"
          >
            The prayer of the helpers
          </h2>
          <p className="mt-3 max-w-md text-base leading-relaxed text-on-surface-muted">
            The heart of Al-Ansaar — from Dua Al-A&apos;hd.
          </p>

          <blockquote className="mt-12 w-full rounded-[var(--radius-lg)] border border-gold/20 bg-surface/40 px-5 py-10 md:px-10 md:py-12">
            <p
              lang="ar"
              dir="rtl"
              className="dua-calligraphy font-[family-name:var(--font-aref-ruqaa)] text-[clamp(1.4rem,4.4vw,2.25rem)] leading-[2.2] text-gold-bright"
            >
              {DUA_ARABIC}
            </p>
            <p className="mt-8 select-none text-lg text-gold" aria-hidden>
              ✦ &nbsp; ✦ &nbsp; ✦
            </p>
            <p className="mt-8 font-[family-name:var(--font-source-serif)] text-base italic leading-relaxed text-on-surface-muted [text-wrap:pretty] md:text-lg md:leading-8">
              &ldquo;{DUA_ENGLISH}&rdquo;
            </p>
            <footer className="mt-8 font-mono text-[0.7rem] tracking-[0.18em] text-primary/80 uppercase">
              — {DUA_SOURCE}
            </footer>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
