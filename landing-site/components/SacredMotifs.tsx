/** Decorative SVG motifs for Imam al-Asr / occultation atmosphere. */

export function Starfield({ className = "" }: { className?: string }) {
  const stars = [
    { cx: 8, cy: 12, r: 1.2, delay: "0s" },
    { cx: 22, cy: 28, r: 0.8, delay: "0.6s" },
    { cx: 48, cy: 8, r: 1.1, delay: "1.2s" },
    { cx: 72, cy: 22, r: 0.7, delay: "0.3s" },
    { cx: 88, cy: 14, r: 1.3, delay: "1.8s" },
    { cx: 15, cy: 48, r: 0.9, delay: "0.9s" },
    { cx: 38, cy: 55, r: 1.0, delay: "1.5s" },
    { cx: 62, cy: 42, r: 0.6, delay: "2.1s" },
    { cx: 82, cy: 58, r: 1.1, delay: "0.4s" },
    { cx: 55, cy: 18, r: 0.5, delay: "2.4s" },
    { cx: 28, cy: 72, r: 0.8, delay: "1.1s" },
    { cx: 70, cy: 78, r: 1.0, delay: "0.7s" },
    { cx: 92, cy: 38, r: 0.7, delay: "1.9s" },
    { cx: 5, cy: 65, r: 0.6, delay: "2.6s" },
    { cx: 45, cy: 88, r: 0.9, delay: "0.2s" },
  ];

  return (
    <svg
      className={className}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.cx}
          cy={s.cy}
          r={s.r}
          fill="var(--color-gold-bright)"
          className="animate-twinkle"
          style={{ animationDelay: s.delay }}
          opacity={0.5}
        />
      ))}
    </svg>
  );
}

export function Khatim({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden
    >
      <g
        stroke="var(--color-primary)"
        strokeWidth="1"
        opacity="0.35"
        transform="translate(60 60)"
      >
        {/* 8-pointed star (khatim) */}
        <polygon
          points="0,-48 12,-12 48,0 12,12 0,48 -12,12 -48,0 -12,-12"
          fill="none"
        />
        <polygon
          points="0,-48 12,-12 48,0 12,12 0,48 -12,12 -48,0 -12,-12"
          fill="none"
          transform="rotate(22.5)"
        />
        <circle r="18" />
        <circle r="28" strokeDasharray="2 4" opacity="0.6" />
      </g>
    </svg>
  );
}

export function Crescent({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden
    >
      <path
        d="M48 8a32 32 0 1 0 0 64 28 28 0 1 1 0-64z"
        fill="var(--color-gold)"
        opacity="0.55"
      />
    </svg>
  );
}

export function Constellation({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      aria-hidden
    >
      <g stroke="var(--color-tertiary)" strokeWidth="0.6" opacity="0.4">
        <line x1="20" y1="60" x2="55" y2="30" />
        <line x1="55" y1="30" x2="95" y2="45" />
        <line x1="95" y1="45" x2="130" y2="20" />
        <line x1="95" y1="45" x2="140" y2="70" />
        <line x1="140" y1="70" x2="175" y2="50" />
      </g>
      {[
        [20, 60],
        [55, 30],
        [95, 45],
        [130, 20],
        [140, 70],
        [175, 50],
      ].map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={2.2}
          fill="var(--color-gold-bright)"
          className="animate-twinkle"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </svg>
  );
}

export function DawnRadial({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 animate-dawn ${className}`}
      aria-hidden
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 50% 20%, oklch(0.8 0.07 165 / 0.18), transparent 70%), radial-gradient(ellipse 50% 40% at 70% 10%, oklch(0.82 0.12 70 / 0.12), transparent 60%)",
      }}
    />
  );
}

export function MihrabFrame({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 320 400"
      fill="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="arch-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-gold-bright)" stopOpacity="0.95" />
          <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0.45" />
        </linearGradient>
        <radialGradient id="arch-glow" cx="50%" cy="30%" r="50%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="160" cy="160" rx="110" ry="130" fill="url(#arch-glow)" />
      <path
        d="M40 380 V200
           C40 120 80 60 160 40
           C240 60 280 120 280 200
           V380"
        stroke="url(#arch-gold)"
        strokeWidth="2.5"
        fill="oklch(0.22 0.04 260 / 0.45)"
      />
      <path
        d="M55 380 V205
           C55 135 90 80 160 62
           C230 80 265 135 265 205
           V380"
        stroke="var(--color-primary)"
        strokeWidth="1"
        opacity="0.4"
        fill="none"
      />
      {/* Scallop accents along the arch crown */}
      {[100, 130, 160, 190, 220].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={48 + Math.abs(i - 2) * 6}
          r={3}
          fill="var(--color-gold-bright)"
          opacity={0.55}
        />
      ))}
      <circle cx="160" cy="42" r="16" stroke="var(--color-gold)" strokeWidth="1.5" fill="var(--color-bg-deep)" />
      <circle cx="160" cy="42" r="7" fill="var(--color-primary)" opacity="0.75" />
    </svg>
  );
}
