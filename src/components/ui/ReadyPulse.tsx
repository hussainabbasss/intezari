"use client";

import { motion, useReducedMotion } from "framer-motion";

type ReadyPulseProps = {
  label?: string;
  className?: string;
};

export function ReadyPulse({ label, className = "" }: ReadyPulseProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.span
        className="size-2 shrink-0 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,185,95,0.6)]"
        animate={
          reduceMotion
            ? { opacity: 1 }
            : { opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
        aria-hidden
      />
      {label ? (
        <span className="font-label text-secondary">{label}</span>
      ) : null}
    </div>
  );
}
