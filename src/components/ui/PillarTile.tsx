import Link from "next/link";
import type { LucideIcon } from "lucide-react";

type PillarTileProps = {
  title: string;
  metric: string;
  value: number;
  href: string;
  icon: LucideIcon;
  tone?: "primary" | "tertiary";
};

export function PillarTile({
  title,
  metric,
  value,
  href,
  icon: Icon,
  tone = "primary",
}: PillarTileProps) {
  const iconColor = tone === "primary" ? "text-primary" : "text-tertiary";
  const barColor = tone === "primary" ? "bg-primary" : "bg-tertiary";

  return (
    <Link
      href={href}
      className="flex aspect-square flex-col justify-between rounded-md border border-outline-variant bg-surface-container-low p-5 transition-colors duration-200 hover:bg-surface-variant active:bg-surface-variant"
    >
      <div>
        <Icon className={`mb-1 size-5 ${iconColor}`} aria-hidden />
        <h4 className="text-lg font-semibold text-on-surface">{title}</h4>
      </div>
      <div>
        <div
          className="mb-1 h-1 w-full overflow-hidden rounded-full bg-surface-variant"
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={metric}
        >
          <div
            className={`h-full rounded-full ${barColor}`}
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="font-data text-on-surface-variant">{metric}</span>
      </div>
    </Link>
  );
}

type PillarBannerProps = {
  title: string;
  subtitle: string;
  score: number;
  href: string;
  icon: LucideIcon;
};

export function PillarBanner({
  title,
  subtitle,
  score,
  href,
  icon: Icon,
}: PillarBannerProps) {
  return (
    <Link
      href={href}
      className="col-span-2 flex min-h-16 items-center justify-between rounded-md border border-outline-variant bg-surface-container-low p-5 transition-colors duration-200 hover:bg-surface-variant active:bg-surface-variant"
    >
      <div className="flex min-w-0 items-center gap-4">
        <div className="shrink-0 rounded-full bg-secondary/15 p-2.5">
          <Icon className="size-5 text-secondary" aria-hidden />
        </div>
        <div className="min-w-0">
          <h4 className="truncate text-lg font-semibold text-on-surface">
            {title}
          </h4>
          <span className="block truncate text-sm text-outline">{subtitle}</span>
        </div>
      </div>
      <span className="font-display ml-3 shrink-0 text-2xl font-semibold text-secondary">
        {score}
      </span>
    </Link>
  );
}
