import { StackHeader } from "@/components/ui/StackHeader";
import { StatusChip } from "@/components/ui/StatusChip";
import { mockAudit } from "@/lib/mock";

export default function AuditPage() {
  return (
    <div className="min-h-full">
      <StackHeader
        title="Weekly Muhasaba"
        eyebrow="Spiritual Audit"
        backHref="/spiritual/"
      />
      <main className="mx-auto max-w-lg px-[var(--margin-mobile)] py-8 pb-12">
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="font-data text-on-surface-variant">{mockAudit.weekOf}</p>
          <StatusChip>Cached Locally</StatusChip>
        </div>

        <section className="mb-6 rounded-lg border border-outline-variant bg-surface-container p-5">
          <h2 className="font-label mb-3 text-secondary">Diagnostic</h2>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {mockAudit.diagnostic}
          </p>
        </section>

        <section className="mb-6 rounded-lg border border-outline-variant bg-surface-container p-5">
          <h2 className="font-label mb-3 text-primary">Practical Remedy</h2>
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {mockAudit.remedy}
          </p>
        </section>

        <section className="mb-6 rounded-lg border border-outline-variant bg-surface-container-high p-5">
          <div className="mb-3 h-px w-12 bg-secondary" aria-hidden />
          <h2 className="font-label mb-3 text-secondary">
            Spiritual Prescription
          </h2>
          <p className="font-display text-lg leading-snug italic text-on-surface">
            {mockAudit.prescription}
          </p>
        </section>

        <p className="font-data text-center text-outline">
          Mock mentor report — LLM route in a later pass
        </p>
      </main>
    </div>
  );
}
