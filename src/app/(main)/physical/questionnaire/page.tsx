"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { StackHeader } from "@/components/ui/StackHeader";
import { PrimaryButton } from "@/components/ui/Buttons";

const steps = [
  {
    key: "height",
    label: "Height (cm)",
    placeholder: "175",
    type: "number" as const,
  },
  {
    key: "weight",
    label: "Weight (kg)",
    placeholder: "72",
    type: "number" as const,
  },
  {
    key: "baseline",
    label: "Fitness baseline",
    placeholder: "Beginner / Intermediate / Advanced",
    type: "text" as const,
  },
  {
    key: "medical",
    label: "Medical constraints",
    placeholder: "Injuries, limits, or none",
    type: "text" as const,
  },
  {
    key: "equipment",
    label: "Available equipment",
    placeholder: "Bodyweight, dumbbells, gym…",
    type: "text" as const,
  },
] as const;

export default function QuestionnairePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});

  const current = steps[step];
  const isLast = step === steps.length - 1;

  function next() {
    if (!isLast) {
      setStep((s) => s + 1);
      return;
    }
    router.push("/physical/session/");
  }

  return (
    <div className="min-h-full">
      <StackHeader
        title="Fitness Profile"
        eyebrow="Sacred Discipline"
        backHref="/physical/"
      />
      <main className="mx-auto max-w-lg px-[var(--margin-mobile)] py-8">
        <p className="font-data mb-6 text-on-surface-variant">
          Step {step + 1} of {steps.length}
        </p>
        <div className="mb-6 h-1 w-full rounded-full bg-surface-variant">
          <div
            className="h-full rounded-full bg-primary transition-all"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>

        <label className="block">
          <span className="font-label mb-3 block text-secondary">
            {current.label}
          </span>
          <input
            type={current.type}
            value={values[current.key] ?? ""}
            onChange={(e) =>
              setValues((v) => ({ ...v, [current.key]: e.target.value }))
            }
            placeholder={current.placeholder}
            className="w-full border border-outline-variant bg-surface-container-lowest px-3 py-3 text-base focus:border-secondary focus:outline-none"
          />
        </label>

        <div className="mt-8 flex gap-3">
          {step > 0 ? (
            <PrimaryButton
              variant="discipline"
              className="flex-1"
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </PrimaryButton>
          ) : null}
          <PrimaryButton className="flex-1" onClick={next}>
            {isLast ? "Generate Plan" : "Continue"}
          </PrimaryButton>
        </div>

        <p className="font-data mt-6 text-center text-outline">
          Mock only — no API call in this pass
        </p>
      </main>
    </div>
  );
}
