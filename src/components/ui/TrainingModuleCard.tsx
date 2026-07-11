import Link from "next/link";
import { StatusChip } from "./StatusChip";

type TrainingModuleCardProps = {
  title: string;
  description: string;
  chip: string;
  chipTone: "gold" | "emerald";
  level: string;
  duration: string;
  href: string;
};

export function TrainingModuleCard({
  title,
  description,
  chip,
  chipTone,
  level,
  duration,
  href,
}: TrainingModuleCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface-container-high transition-opacity duration-200 hover:opacity-95 active:opacity-90"
    >
      <div
        className={`relative h-36 ${
          chipTone === "gold"
            ? "bg-gradient-to-br from-secondary/30 via-surface-container-high to-surface-container-lowest"
            : "bg-gradient-to-br from-primary/25 via-surface-container-high to-surface-container-lowest"
        }`}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high to-transparent" />
        <div className="absolute bottom-4 left-4 z-10">
          <StatusChip tone={chipTone === "gold" ? "secondary" : "primary"}>
            {chip}
          </StatusChip>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h3 className="text-lg font-semibold text-on-surface">{title}</h3>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          {description}
        </p>
        <div className="mt-2 flex items-center justify-between border-t border-outline-variant pt-2">
          <span
            className={`font-data ${
              chipTone === "gold" ? "text-secondary" : "text-primary"
            }`}
          >
            {level}
          </span>
          <span className="font-data text-on-surface-variant">{duration}</span>
        </div>
      </div>
    </Link>
  );
}
