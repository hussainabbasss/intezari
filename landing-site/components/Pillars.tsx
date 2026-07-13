"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Dumbbell, Heart } from "lucide-react";

const pillars = [
  {
    title: "Physical",
    accent: "text-primary",
    surface: "bg-primary-container/25 border-primary/35 hover:border-primary/70",
    icon: Dumbbell,
    body: "Endurance and functional strength — steps, sessions, and a plan shaped for service.",
    span: "md:col-span-1",
  },
  {
    title: "Intellectual",
    accent: "text-tertiary",
    surface: "bg-surface-high border-tertiary/35 hover:border-tertiary/70",
    icon: BookOpen,
    body: "Daily narrations from Kitab al-Ghaybah — patience, resilience, and firm faith in the occultation.",
    span: "md:col-span-1",
  },
  {
    title: "Spiritual",
    accent: "text-gold",
    surface: "bg-surface border-gold/35 hover:border-gold/70 md:col-span-2 lg:col-span-1",
    icon: Heart,
    body: "Binary namaz log, Hudur al-Qalb journals, and weekly Muhasaba grounded in Akhlaq.",
    span: "md:col-span-2 lg:col-span-1",
  },
] as const;

export function Pillars() {
  const reduce = useReducedMotion();

  return (
    <section
      id="pillars"
      aria-labelledby="pillars-heading"
      className="relative py-[clamp(4rem,10vw,7rem)]"
    >
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h2
            id="pillars-heading"
            className="font-[family-name:var(--font-source-serif)] text-[clamp(1.5rem,3vw,2rem)] font-semibold text-on-surface [text-wrap:balance]"
          >
            Three pillars of readiness
          </h2>
          <p className="mt-3 text-base leading-relaxed text-on-surface-muted [text-wrap:pretty]">
            Intizar as active preparation — body, mind, and heart trained
            together.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.li
                key={p.title}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.5,
                  delay: reduce ? 0 : i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`rounded-[var(--radius-lg)] border p-6 transition-colors ${p.surface} ${p.span}`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-bg-deep/60 ${p.accent}`}
                  >
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-sans text-lg font-semibold text-on-surface">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-on-surface-muted md:text-[0.95rem] md:leading-7">
                      {p.body}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
