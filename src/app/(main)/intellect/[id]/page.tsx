import { notFound } from "next/navigation";
import { StackHeader } from "@/components/ui/StackHeader";
import { getNarration, mockNarrations } from "@/lib/mock";

export function generateStaticParams() {
  return mockNarrations.map((n) => ({ id: n.id }));
}

export default async function NarrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const narration = getNarration(id);
  if (!narration) notFound();

  return (
    <div className="min-h-full">
      <StackHeader
        title="Reflect"
        eyebrow={narration.label}
        backHref="/intellect/"
      />
      <main className="mx-auto max-w-lg px-[var(--margin-mobile)] py-8 pb-12">
        <p className="font-display mb-4 text-2xl leading-snug font-semibold italic">
          &ldquo;{narration.quote}&rdquo;
        </p>
        <p className="font-data mb-8 text-outline">Ref: {narration.ref}</p>
        <p className="max-w-[65ch] text-base leading-relaxed text-on-surface-variant">
          {narration.body}
        </p>
      </main>
    </div>
  );
}
