type StatusChipProps = {
  children: React.ReactNode;
  tone?: "primary" | "secondary" | "muted";
};

export function StatusChip({ children, tone = "primary" }: StatusChipProps) {
  const styles =
    tone === "secondary"
      ? "bg-secondary text-on-secondary"
      : tone === "muted"
        ? "bg-surface-variant text-on-surface-variant"
        : "border border-primary/20 bg-primary-container text-primary";

  return (
    <span
      className={`font-label inline-flex items-center rounded-full px-2 py-1 text-[10px] ${styles}`}
    >
      {children}
    </span>
  );
}
