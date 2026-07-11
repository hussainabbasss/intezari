import Link from "next/link";
import { ChevronRight, type LucideIcon } from "lucide-react";

type LogActionRowProps = {
  title: string;
  subtitle: string;
  href: string;
  icon: LucideIcon;
};

export function LogActionRow({
  title,
  subtitle,
  href,
  icon: Icon,
}: LogActionRowProps) {
  return (
    <Link
      href={href}
      className="group flex min-h-14 items-center justify-between border-b border-outline-variant bg-surface-container px-5 py-4 transition-colors duration-200 last:border-b-0 hover:bg-surface-variant"
    >
      <div className="flex min-w-0 items-center gap-4">
        <Icon
          className="size-5 shrink-0 text-outline transition-colors group-hover:text-primary"
          aria-hidden
        />
        <div className="min-w-0">
          <p className="truncate text-lg font-semibold text-on-surface">
            {title}
          </p>
          <p className="truncate text-sm text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      <ChevronRight
        className="size-5 shrink-0 text-outline transition-transform group-hover:translate-x-0.5"
        aria-hidden
      />
    </Link>
  );
}
