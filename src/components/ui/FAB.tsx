"use client";

import { Plus } from "lucide-react";

type FABProps = {
  onClick: () => void;
  label?: string;
};

export function FAB({ onClick, label = "Quick add" }: FABProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="fixed right-6 bottom-28 z-[var(--z-sticky)] flex size-14 items-center justify-center rounded-full bg-primary text-on-primary shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-transform duration-200 ease-out hover:brightness-110 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
    >
      <Plus className="size-7" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
