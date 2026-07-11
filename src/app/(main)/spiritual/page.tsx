"use client";

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BookOpen, Bolt, Eye, Lock, NotebookPen } from "lucide-react";
import { DisciplineCard } from "@/components/ui/DisciplineCard";
import { PresenceRow } from "@/components/ui/PresenceRow";
import { PromptComposer } from "@/components/ui/PromptComposer";
import { MetricCard } from "@/components/ui/MetricCard";
import { StatusChip } from "@/components/ui/StatusChip";
import { JournalSheet } from "@/components/ui/JournalSheet";
import { mockPrayers, mockSpiritual, type Prayer } from "@/lib/mock";

function SpiritualContent() {
  const searchParams = useSearchParams();
  const focusPrompt = searchParams.get("focus") === "prompt";

  const [prayers, setPrayers] = useState<Prayer[]>(mockPrayers);
  const [promptValue, setPromptValue] = useState("");
  const [journalOpen, setJournalOpen] = useState(false);
  const [activePrayerId, setActivePrayerId] = useState<Prayer["id"] | null>(
    null,
  );

  const activePrayer = useMemo(
    () => prayers.find((p) => p.id === activePrayerId) ?? null,
    [prayers, activePrayerId],
  );

  function togglePrayer(id: Prayer["id"]) {
    setPrayers((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const nextDone = !p.done;
        if (nextDone) {
          setActivePrayerId(id);
          setJournalOpen(true);
        }
        return { ...p, done: nextDone };
      }),
    );
  }

  function updateJournal(value: string) {
    if (!activePrayerId) return;
    setPrayers((prev) =>
      prev.map((p) =>
        p.id === activePrayerId ? { ...p, journal: value } : p,
      ),
    );
  }

  return (
    <main className="mx-auto max-w-lg px-[var(--margin-mobile)]">
      <section className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-label mb-1 tracking-widest text-secondary">
            Daily Audit
          </p>
          <h1 className="font-display text-3xl font-semibold">
            Muhasaba Focus
          </h1>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-data text-on-surface-variant">
            {mockSpiritual.hijriDate}
          </p>
          <div className="mt-1">
            <StatusChip>Active Readiness</StatusChip>
          </div>
        </div>
      </section>

      <DisciplineCard className="mb-4">
        <div className="pointer-events-none absolute top-0 right-0 p-6 opacity-[0.08]">
          <Eye className="size-20" aria-hidden />
        </div>
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
          <Eye className="size-5 text-primary" aria-hidden />
          Presence Audit (Salat)
        </h2>
        <div>
          {prayers.map((prayer) => (
            <PresenceRow
              key={prayer.id}
              name={prayer.name}
              subtitle={prayer.subtitle}
              done={prayer.done}
              onToggle={() => togglePrayer(prayer.id)}
            />
          ))}
        </div>
      </DisciplineCard>

      <div className="mb-4 flex flex-col rounded-lg border border-outline-variant bg-surface-container-high p-5 sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-secondary">
          <Bolt className="size-5" aria-hidden />
          Ready Summary
        </h2>
        <div className="flex flex-col items-center text-center">
          <div
            className="relative mb-5 flex size-32 items-center justify-center rounded-full border-4 border-secondary"
            role="img"
            aria-label={`Ready index ${mockSpiritual.readyIndex}`}
          >
            <span className="font-display text-[42px] leading-none text-secondary">
              {mockSpiritual.readyIndex}
            </span>
            <span className="font-label absolute -bottom-2 rounded-full bg-secondary px-3 py-0.5 text-[10px] text-on-secondary">
              Index
            </span>
          </div>
          <p className="mb-5 max-w-[42ch] px-1 text-sm leading-relaxed text-on-surface-variant">
            {mockSpiritual.readyBlurb}
          </p>
          <Link
            href="/spiritual/audit/"
            className="font-label flex min-h-11 w-full items-center justify-center bg-secondary tracking-widest text-on-secondary transition-opacity duration-200 hover:opacity-90"
          >
            Open Weekly Audit
          </Link>
        </div>
      </div>

      <div className="mb-4">
        <PromptComposer
          prompt={mockSpiritual.prompt}
          value={promptValue}
          onChange={setPromptValue}
          autoFocus={focusPrompt}
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <MetricCard
          label="Reading"
          value={mockSpiritual.reading}
          icon={BookOpen}
        />
        <MetricCard
          label="Journaling"
          value={mockSpiritual.journaling}
          icon={NotebookPen}
          iconClassName="text-secondary"
        />
      </div>

      <div className="mb-8 flex items-center justify-center gap-2 opacity-50">
        <Lock className="size-3.5" aria-hidden />
        <span className="font-data text-[10px] tracking-widest uppercase">
          Stored locally on device
        </span>
      </div>

      <JournalSheet
        open={journalOpen && !!activePrayer}
        prayerName={activePrayer?.name ?? ""}
        value={activePrayer?.journal ?? ""}
        onChange={updateJournal}
        onClose={() => setJournalOpen(false)}
      />
    </main>
  );
}

export default function SpiritualPage() {
  return (
    <Suspense
      fallback={
        <main className="mx-auto max-w-lg px-[var(--margin-mobile)] py-10">
          <p className="font-data text-on-surface-variant">Loading audit…</p>
        </main>
      }
    >
      <SpiritualContent />
    </Suspense>
  );
}
