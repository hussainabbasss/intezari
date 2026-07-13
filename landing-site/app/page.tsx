import { Hero } from "@/components/Hero";
import { DuaSection } from "@/components/DuaSection";
import { Pillars } from "@/components/Pillars";
import { DownloadCta } from "@/components/DownloadCta";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <DuaSection />
        <Pillars />
        <DownloadCta />
      </main>
      <SiteFooter />
    </>
  );
}
