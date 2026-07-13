import {
  CLOSING_DUA,
  GITHUB_REPO_URL,
  SITE_NAME,
  SITE_NAME_AR,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-outline/40 bg-bg-deep py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 text-center md:px-8">
        <p
          lang="ar"
          dir="rtl"
          className="font-[family-name:var(--font-aref-ruqaa)] text-xl text-primary md:text-2xl"
        >
          {CLOSING_DUA}
        </p>
        <p className="font-mono text-[0.65rem] tracking-[0.18em] text-on-surface-muted uppercase">
          {SITE_NAME_AR} · {SITE_NAME}
        </p>
        <a
          href={GITHUB_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-on-surface-muted underline-offset-4 transition-colors hover:text-primary hover:underline"
        >
          github.com/hussainabbasss/intezari
        </a>
      </div>
    </footer>
  );
}
