import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type StackHeaderProps = {
  title: string;
  backHref: string;
  eyebrow?: string;
};

export function StackHeader({ title, backHref, eyebrow }: StackHeaderProps) {
  return (
    <header className="sticky top-0 z-[var(--z-sticky)] border-b border-outline-variant bg-surface/90 px-[var(--margin-mobile)] pt-[env(safe-area-inset-top)] backdrop-blur-xl">
      <div className="flex h-14 items-center gap-3">
        <Link
          href={backHref}
          aria-label="Back"
          className="touch-target inline-flex items-center justify-center text-primary transition-opacity duration-200 hover:opacity-80"
        >
          <ArrowLeft className="size-5" aria-hidden />
        </Link>
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p className="font-label truncate text-[10px] text-secondary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="truncate font-display text-lg font-semibold">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
}
