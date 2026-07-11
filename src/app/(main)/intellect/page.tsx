import Link from "next/link";
import { CommandmentCard } from "@/components/ui/CommandmentCard";
import { mockNarrations } from "@/lib/mock";

export default function IntellectPage() {
  return (
    <main className="mx-auto max-w-lg px-[var(--margin-mobile)]">
      <section className="mb-6">
        <p className="font-label mb-1 tracking-widest text-secondary">
          Kitab al-Ghaybah
        </p>
        <h1 className="font-display text-2xl font-semibold">Intellect</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Narrations for firmness during the major occultation — curated for
          daily grounding.
        </p>
      </section>

      <div className="flex flex-col gap-4">
        {mockNarrations.map((n) => (
          <CommandmentCard
            key={n.id}
            label={n.label}
            quote={n.quote}
            refText={`Ref: ${n.ref}`}
            href={`/intellect/${n.id}/`}
          />
        ))}
      </div>

      <p className="font-data mt-8 text-center text-outline">
        In-app feed · native widget later
      </p>
      <Link
        href="/spiritual/"
        className="font-label mt-4 block text-center text-primary"
      >
        Continue to Muhasaba →
      </Link>
    </main>
  );
}
