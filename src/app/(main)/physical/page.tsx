import Link from "next/link";
import { PersonStanding } from "lucide-react";
import { WeeklyLoadChart } from "@/components/ui/WeeklyLoadChart";
import { TrainingModuleCard } from "@/components/ui/TrainingModuleCard";
import {
  mockFirstRunQuestionnaire,
  mockStillness,
  mockTrainingModules,
  mockWeeklyLoad,
} from "@/lib/mock";

export default function PhysicalPage() {
  return (
    <main className="mx-auto max-w-lg px-[var(--margin-mobile)]">
      <section className="mb-6 flex flex-col gap-1">
        <span className="font-label tracking-widest text-secondary">
          Sacred Discipline
        </span>
        <h1 className="font-display text-2xl font-semibold">
          Physical Readiness
        </h1>
        <p className="max-w-md text-sm text-on-surface-variant">
          Your body is the vessel for wait. Forge endurance, mobility, and
          functional strength for the moment of action.
        </p>
      </section>

      {mockFirstRunQuestionnaire ? (
        <Link
          href="/physical/questionnaire/"
          className="mb-4 block rounded-md border border-secondary/40 bg-surface-container px-4 py-3"
        >
          <p className="font-label text-secondary">First run</p>
          <p className="text-sm text-on-surface-variant">
            Complete the fitness questionnaire to generate your companion plan.
          </p>
        </Link>
      ) : null}

      <div className="relative mb-4 overflow-hidden rounded-lg border border-outline-variant bg-surface-container p-5">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-primary">Readiness Load</h2>
            <span className="font-data uppercase text-on-surface-variant">
              Weekly Activity Trend
            </span>
          </div>
          <div className="text-right">
            <span className="font-display text-3xl font-semibold text-secondary">
              {mockWeeklyLoad.percent}%
            </span>
            <p className="font-label text-on-surface-variant">
              {mockWeeklyLoad.label}
            </p>
          </div>
        </div>
        <WeeklyLoadChart days={mockWeeklyLoad.days} />
        <p className="font-data mt-3 text-on-surface-variant">
          Steps today (mock): 8,420
        </p>
      </div>

      <Link
        href="/physical/session/"
        className="mb-4 flex flex-col items-start gap-3 rounded-lg bg-primary-container p-5 text-on-primary-container transition-transform duration-200 active:scale-[0.99]"
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-on-primary/10 text-2xl leading-none" aria-hidden>
          ＋
        </span>
        <div>
          <h2 className="text-lg font-semibold">Record Session</h2>
          <p className="text-sm leading-relaxed opacity-85">
            Log your daily muhasaba of movement.
          </p>
        </div>
        <span className="font-label mt-1 flex min-h-10 w-full items-center justify-center rounded-full bg-on-primary text-primary">
          Initialize
        </span>
      </Link>

      <div className="mb-4 flex flex-col gap-4">
        {mockTrainingModules.map((mod) => (
          <TrainingModuleCard
            key={mod.id}
            title={mod.title}
            description={mod.description}
            chip={mod.chip}
            chipTone={mod.chipTone}
            level={mod.level}
            duration={mod.duration}
            href="/physical/session/"
          />
        ))}
      </div>

      <div className="mb-4 flex items-center gap-4 rounded-lg border border-outline-variant bg-surface-container p-5">
        <div className="flex size-16 items-center justify-center rounded-full border-2 border-secondary text-secondary">
          <PersonStanding className="size-8" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{mockStillness.title}</h3>
          <p className="text-sm text-on-surface-variant italic">
            &ldquo;{mockStillness.quote}&rdquo;
          </p>
        </div>
      </div>
    </main>
  );
}
