"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { StackHeader } from "@/components/ui/StackHeader";
import { PrimaryButton } from "@/components/ui/Buttons";
import { mockWorkoutSteps, type WorkoutStep } from "@/lib/mock";

export default function SessionPage() {
  const [steps, setSteps] = useState<WorkoutStep[]>(mockWorkoutSteps);
  const doneCount = steps.filter((s) => s.done).length;

  function toggle(id: string) {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s)),
    );
  }

  return (
    <div className="min-h-full">
      <StackHeader
        title="Record Session"
        eyebrow="Muhasaba of Movement"
        backHref="/physical/"
      />
      <main className="mx-auto max-w-lg px-[var(--margin-mobile)] py-8 pb-12">
        <p className="font-data mb-5 text-on-surface-variant">
          {doneCount} / {steps.length} complete
        </p>
        <ul className="mb-8 space-y-2">
          {steps.map((step) => (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => toggle(step.id)}
                className="flex w-full items-start gap-4 border border-outline-variant bg-surface-container p-5 text-left transition-colors active:bg-surface-variant"
              >
                <span
                  className={`mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm border ${
                    step.done
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline"
                  }`}
                >
                  {step.done ? <Check className="size-4" strokeWidth={3} /> : null}
                </span>
                <span className={step.done ? "opacity-50" : ""}>
                  <span
                    className={`block font-semibold ${
                      step.done ? "line-through" : ""
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-sm text-on-surface-variant">
                    {step.detail}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
        <PrimaryButton
          variant="gold"
          disabled={doneCount === 0}
          onClick={() => {
            /* mock complete */
          }}
        >
          Close Session
        </PrimaryButton>
      </main>
    </div>
  );
}
