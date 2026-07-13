"use client";

import { GITHUB_RELEASES_URL } from "@/lib/site";
import { Download } from "lucide-react";

type DownloadButtonProps = {
  className?: string;
  label?: string;
};

export function DownloadButton({
  className = "",
  label = "Download APK",
}: DownloadButtonProps) {
  return (
    <a
      href={GITHUB_RELEASES_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`animate-glow inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-md)] bg-gold px-6 py-3.5 font-sans text-base font-semibold text-on-gold transition-[filter,transform] hover:brightness-110 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${className}`}
    >
      <Download className="size-5 shrink-0" aria-hidden />
      {label}
    </a>
  );
}
