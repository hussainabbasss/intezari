import { Book } from "lucide-react";
import Link from "next/link";

type CommandmentCardProps = {
  label: string;
  quote: string;
  refText: string;
  href?: string;
};

export function CommandmentCard({
  label,
  quote,
  refText,
  href = "/intellect/ghaybah-01/",
}: CommandmentCardProps) {
  return (
    <article className="relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container-high p-5 sm:p-6">
      <div className="pointer-events-none absolute top-0 right-0 p-4 opacity-[0.08]">
        <Book className="size-16" aria-hidden />
      </div>
      <h3 className="font-label mb-3 text-secondary">{label}</h3>
      <p className="font-display max-w-[36ch] text-xl leading-snug font-semibold text-on-surface italic sm:text-2xl">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-5 flex items-end justify-between gap-4">
        <cite className="font-data not-italic text-outline">{refText}</cite>
        <Link
          href={href}
          className="font-label inline-flex min-h-9 items-center gap-1.5 rounded-full bg-primary-container px-4 py-2 text-on-primary-container transition-opacity duration-200 hover:opacity-90 active:scale-95"
        >
          <Book className="size-3.5" aria-hidden />
          Reflect
        </Link>
      </div>
    </article>
  );
}
