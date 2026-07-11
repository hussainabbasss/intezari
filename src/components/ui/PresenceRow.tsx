"use client";

import { Check } from "lucide-react";

type PresenceRowProps = {
  name: string;
  subtitle: string;
  done: boolean;
  onToggle: () => void;
};

export function PresenceRow({
  name,
  subtitle,
  done,
  onToggle,
}: PresenceRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-outline-variant py-3 last:border-b-0">
      <div className="min-w-0 flex flex-col">
        <span className="font-label text-on-surface-variant">{name}</span>
        <span className="text-base leading-relaxed text-on-surface">
          {subtitle}
        </span>
      </div>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={done}
        aria-label={`${name}: ${done ? "completed" : "not completed"}. Toggle.`}
        className={`touch-target flex size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-200 active:scale-90 ${
          done
            ? "border-primary bg-primary-container text-primary"
            : "border-outline text-on-surface-variant hover:border-primary hover:text-primary"
        }`}
      >
        {done ? <Check className="size-5" strokeWidth={2.5} aria-hidden /> : null}
      </button>
    </div>
  );
}
