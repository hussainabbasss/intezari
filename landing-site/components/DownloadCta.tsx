"use client";

import { motion, useReducedMotion } from "framer-motion";
import { DownloadButton } from "./DownloadButton";
import { DawnRadial, Crescent, Khatim } from "./SacredMotifs";

export function DownloadCta() {
  const reduce = useReducedMotion();

  return (
    <section
      id="download"
      aria-labelledby="download-heading"
      className="relative overflow-hidden border-t border-outline/40 bg-surface py-[clamp(4rem,10vw,7rem)]"
    >
      <DawnRadial className="opacity-90" />
      <Crescent className="absolute right-[8%] top-8 h-28 w-28 opacity-25" />
      <Khatim className="absolute -left-16 bottom-0 h-56 w-56 opacity-15" />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-[var(--z-content)] mx-auto flex max-w-2xl flex-col items-center px-5 text-center md:px-8"
      >
        <h2
          id="download-heading"
          className="font-[family-name:var(--font-source-serif)] text-[clamp(1.5rem,3vw,2rem)] font-semibold text-on-surface [text-wrap:balance]"
        >
          Begin the training
        </h2>
        <p className="mt-3 max-w-md text-base leading-relaxed text-on-surface-muted [text-wrap:pretty]">
          Open source. Download the latest Android release and train for the
          day of meeting.
        </p>
        <div className="mt-9">
          <DownloadButton label="Get the latest release" />
        </div>
      </motion.div>
    </section>
  );
}
