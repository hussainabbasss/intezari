"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Code2 } from "lucide-react";
import { DownloadButton } from "./DownloadButton";
import {
  Constellation,
  Crescent,
  DawnRadial,
  Khatim,
  Starfield,
} from "./SacredMotifs";
import {
  GITHUB_REPO_URL,
  SITE_NAME,
  SITE_NAME_AR,
} from "@/lib/site";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <header className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 bg-bg-deep" aria-hidden />
      <DawnRadial />
      <Starfield className="absolute inset-0 z-[var(--z-motif)] h-full w-full opacity-80" />
      <Khatim className="animate-drift absolute -right-8 top-20 z-[var(--z-motif)] h-72 w-72 opacity-45 md:right-10 md:top-16 md:h-[22rem] md:w-[22rem]" />
      <Crescent className="absolute left-[6%] top-[14%] z-[var(--z-motif)] h-14 w-14 opacity-60 md:h-20 md:w-20" />
      <Constellation className="absolute bottom-[22%] left-0 z-[var(--z-motif)] hidden w-72 opacity-55 lg:block" />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-[var(--z-motif)] h-[52svh] md:h-[58svh]">
        <Image
          src="/banner.png"
          alt="Calligraphic tribute to Imam al-Asr — peace be upon the Master of Time"
          fill
          priority
          className="object-contain object-[center_12%] opacity-95 mix-blend-screen md:object-top"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent 35%, var(--color-bg-deep) 88%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-[var(--z-content)] mx-auto flex min-h-[100svh] max-w-5xl flex-col justify-end px-5 pb-14 pt-[46svh] sm:pb-16 md:justify-center md:px-8 md:pb-24 md:pt-[40svh]">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center"
        >
          <p
            lang="ar"
            dir="rtl"
            className="font-[family-name:var(--font-aref-ruqaa)] text-[clamp(3.25rem,13vw,5.75rem)] leading-none text-primary [text-wrap:balance]"
          >
            {SITE_NAME_AR}
          </p>
          <p className="mt-3 font-[family-name:var(--font-source-serif)] text-lg tracking-wide text-gold md:text-xl">
            {SITE_NAME}
          </p>
          <h1 className="mt-5 max-w-2xl font-[family-name:var(--font-source-serif)] text-[clamp(1.45rem,3.8vw,2.15rem)] font-semibold leading-snug tracking-[-0.02em] text-on-surface [text-wrap:balance]">
            Readiness for Imam al-Asr
          </h1>
          <p className="mt-4 max-w-[38rem] text-base leading-relaxed text-on-surface-muted [text-wrap:pretty] md:text-lg md:leading-8">
            Local-first training for Intizar — physical strength, intellectual
            grounding, and spiritual presence for the companions of the Awaited.
          </p>
          <div className="mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center">
            <DownloadButton />
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-outline px-6 py-3.5 font-sans text-base font-medium text-on-surface transition-colors hover:border-primary hover:text-primary active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <Code2 className="size-5 shrink-0" aria-hidden />
              View source
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
