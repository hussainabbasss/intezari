"use client";

import { useState } from "react";
import { BookOpen, Dumbbell, LayoutGrid, Moon, NotebookPen, PersonStanding } from "lucide-react";
import { PreparationRing } from "@/components/ui/PreparationRing";
import { CommandmentCard } from "@/components/ui/CommandmentCard";
import { PillarBanner, PillarTile } from "@/components/ui/PillarTile";
import { LogActionRow } from "@/components/ui/LogActionRow";
import { FAB } from "@/components/ui/FAB";
import { ActionSheet } from "@/components/ui/ActionSheet";
import {
  mockCommandment,
  mockPillars,
  mockPreparation,
} from "@/lib/mock";

export default function DashboardPage() {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <main className="mx-auto max-w-lg px-[var(--margin-mobile)]">
      <section className="mb-10 flex flex-col items-center">
        <PreparationRing
          percent={mockPreparation.percent}
          status={mockPreparation.status}
          label="PREPARATION"
          caption={`Daily Goals · ${mockPreparation.state}`}
        />
      </section>

      <section className="mb-10">
        <CommandmentCard
          label={mockCommandment.label}
          quote={mockCommandment.quote}
          refText={`Ref: ${mockCommandment.ref}`}
          href="/intellect/ghaybah-01/"
        />
      </section>

      <section className="mb-10">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-primary">
          <LayoutGrid className="size-5" />
          Pillars of Readiness
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <PillarTile
            title={mockPillars.physical.label}
            metric={mockPillars.physical.metric}
            value={mockPillars.physical.value}
            href="/physical/"
            icon={Dumbbell}
            tone="primary"
          />
          <PillarTile
            title={mockPillars.intellect.label}
            metric={mockPillars.intellect.metric}
            value={mockPillars.intellect.value}
            href="/intellect/"
            icon={BookOpen}
            tone="tertiary"
          />
          <PillarBanner
            title={mockPillars.spiritual.label}
            subtitle={mockPillars.spiritual.subtitle}
            score={mockPillars.spiritual.score}
            href="/spiritual/"
            icon={PersonStanding}
          />
        </div>
      </section>

      <section className="mb-6">
        <h2 className="mb-4 text-lg font-semibold text-primary">
          Daily Log Actions
        </h2>
        <div className="overflow-hidden rounded-lg border border-outline-variant">
          <LogActionRow
            title="New Morning Log"
            subtitle="Capture your state of mind"
            href="/spiritual/"
            icon={NotebookPen}
          />
          <LogActionRow
            title="Evening Reflection"
            subtitle="Close the day with Muhasaba"
            href="/spiritual/audit/"
            icon={Moon}
          />
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-lg opacity-70 transition-opacity duration-500 hover:opacity-100">
        <div className="flex h-48 items-end bg-gradient-to-br from-primary-container via-surface-container to-surface-container-lowest p-5">
          <p className="font-display max-w-[28ch] text-lg italic text-on-surface/85">
            Command center for the wait.
          </p>
        </div>
      </section>

      <FAB onClick={() => setSheetOpen(true)} />
      <ActionSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        actions={[
          {
            id: "log-prayer",
            label: "Log prayer",
            subtitle: "Binary Namaz presence",
            href: "/spiritual/",
          },
          {
            id: "morning-note",
            label: "Morning note",
            subtitle: "Capture your state of mind",
            href: "/spiritual/?focus=prompt",
          },
          {
            id: "evening-reflection",
            label: "Evening reflection",
            subtitle: "Weekly Muhasaba path",
            href: "/spiritual/audit/",
          },
        ]}
      />
    </main>
  );
}
