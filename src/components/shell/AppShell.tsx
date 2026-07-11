"use client";

import { usePathname } from "next/navigation";
import { AppTopBar } from "@/components/ui/AppTopBar";
import { BottomTabs } from "@/components/ui/BottomTabs";

const HIDE_CHROME = ["/sign-in"];

function hideTabs(pathname: string) {
  if (HIDE_CHROME.some((p) => pathname.startsWith(p))) return true;
  if (pathname.includes("/questionnaire")) return true;
  if (pathname.includes("/session")) return true;
  if (pathname.includes("/audit")) return true;
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] === "intellect" && parts.length >= 2) return true;
  return false;
}

function topBarVariant(pathname: string): "centered" | "brand-left" {
  if (pathname.startsWith("/physical")) return "brand-left";
  return "centered";
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const chromeHidden = hideTabs(pathname);
  const showReadyLabel = pathname.startsWith("/physical");

  if (chromeHidden) {
    return <div className="min-h-full flex-1">{children}</div>;
  }

  return (
    <div className="min-h-full flex-1">
      <AppTopBar
        variant={topBarVariant(pathname)}
        showReadyLabel={showReadyLabel}
      />
      <div className="pt-[calc(4rem+env(safe-area-inset-top)+var(--page-top-gap))] pb-28">
        {children}
      </div>
      <BottomTabs />
    </div>
  );
}
