type WeeklyLoadChartProps = {
  days: {
    day: string;
    height: number;
    highlight: false | "primary" | "secondary";
  }[];
};

export function WeeklyLoadChart({ days }: WeeklyLoadChartProps) {
  return (
    <div className="mt-4 flex h-32 items-end justify-between gap-2">
      {days.map((d) => {
        const barClass =
          d.highlight === "primary"
            ? "bg-primary"
            : d.highlight === "secondary"
              ? "bg-secondary"
              : "bg-surface-variant";
        const labelClass =
          d.highlight === "primary"
            ? "text-primary"
            : d.highlight === "secondary"
              ? "text-secondary"
              : "";

        return (
          <div
            key={d.day}
            className="flex flex-1 flex-col items-center gap-2"
          >
            <div
              className={`w-full rounded-t-sm ${barClass} transition-all`}
              style={{ height: `${d.height}%` }}
            />
            <span className={`font-label text-[10px] ${labelClass}`}>
              {d.day}
            </span>
          </div>
        );
      })}
    </div>
  );
}
