"use client";

import { useEffect, useRef } from "react";

type PromptComposerProps = {
  label?: string;
  prompt: string;
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
};

export function PromptComposer({
  label = "Prompt of the Day",
  prompt,
  value,
  onChange,
  autoFocus = false,
}: PromptComposerProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (autoFocus) ref.current?.focus();
  }, [autoFocus]);

  return (
    <div className="relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container p-5 sm:p-6">
      <div className="mb-2 h-px w-12 bg-secondary" aria-hidden />
      <span className="font-label mb-3 block text-secondary">{label}</span>
      <blockquote className="font-display mb-5 max-w-[40ch] text-xl leading-snug font-semibold text-on-surface">
        &ldquo;{prompt}&rdquo;
      </blockquote>
      <label className="sr-only" htmlFor="prompt-composer">
        Daily reflection
      </label>
      <textarea
        id="prompt-composer"
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Type your reflection here..."
        className="h-32 w-full resize-none rounded border border-outline-variant bg-surface-container-lowest p-4 text-sm leading-relaxed text-on-surface placeholder:text-on-surface-variant/50 focus:border-secondary focus:outline-none"
      />
      <div className="mt-2 flex justify-end">
        <span className="font-data text-[10px] text-on-surface-variant">
          Auto-saving locally
        </span>
      </div>
    </div>
  );
}
