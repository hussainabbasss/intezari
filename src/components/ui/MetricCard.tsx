import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string;
  icon: LucideIcon;
  iconClassName?: string;
};

export function MetricCard({
  label,
  value,
  icon: Icon,
  iconClassName = "text-primary",
}: MetricCardProps) {
  return (
    <div className="rounded border border-outline-variant bg-surface-container p-5">
      <Icon className={`mb-2 size-5 ${iconClassName}`} aria-hidden />
      <p className="font-label text-on-surface-variant">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-on-surface">{value}</p>
    </div>
  );
}
