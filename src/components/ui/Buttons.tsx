import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "gold" | "discipline";
};

export function PrimaryButton({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base =
    "font-label inline-flex min-h-11 w-full items-center justify-center rounded px-4 py-3 tracking-widest transition-[opacity,transform,background-color] duration-200 ease-out hover:opacity-90 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

  const variants = {
    primary: "bg-primary text-on-primary",
    gold: "bg-secondary text-on-secondary",
    discipline:
      "border border-secondary bg-surface-container text-on-surface",
  };

  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function DisciplineButton(props: ButtonProps) {
  return <PrimaryButton variant="discipline" {...props} />;
}
