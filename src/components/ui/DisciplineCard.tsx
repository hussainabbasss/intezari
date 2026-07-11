type DisciplineCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function DisciplineCard({
  children,
  className = "",
}: DisciplineCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-outline-variant bg-surface-container p-5 sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
