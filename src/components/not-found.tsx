import { ArrowRight } from "lucide-react";
import { useCommon } from "@/content/common";
import { useLocale } from "@/i18n/locale";
import { LANDING_PATHS } from "@/i18n/landing-lang";
import { LandingShell } from "@/components/landing/Shell";

// 404, on the landing's light chrome (nav, footer) like every other page.
export function NotFoundPage() {
  const t = useCommon().notFound;
  const lang = useLocale();
  return (
    <LandingShell lang={lang}>
      <section className="flex min-h-[60vh] items-center justify-center px-4 py-24 text-center">
        <div>
          <p className="yl-h1 bg-gradient-to-b from-zinc-950 to-zinc-400 bg-clip-text text-[clamp(5rem,14vw,9rem)] leading-none text-transparent">
            {t.title}
          </p>
          <p className="mt-4 text-[15px] text-zinc-500">
            {t.descLine1} <br />
            {t.descLine2}
          </p>
          <a href={LANDING_PATHS[lang]} className="yl-btn-primary group mt-8 h-11 px-5 text-sm">
            {t.goHome}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </LandingShell>
  );
}
