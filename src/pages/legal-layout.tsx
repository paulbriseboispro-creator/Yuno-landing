import type { ReactNode } from "react";
import { LandingShell } from "@/components/landing/Shell";
import { Eyebrow } from "@/components/landing/ui";

// Privacy and terms on the landing's light chrome: eyebrow, title, date, the
// "final version coming" notice, then the sections.
export function LegalLayout({
  lang,
  path,
  t,
  children,
}: {
  lang: "en" | "fr";
  path: string;
  t: { badge: string; heading: string; lastUpdated: string; placeholder: string; notice: string };
  children: ReactNode;
}) {
  return (
    <LandingShell lang={lang} path={path}>
      <section className="px-4 pb-24 pt-10 sm:px-6 md:pt-16">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>{t.badge}</Eyebrow>
          <h1 className="yl-h1 mt-5 text-balance text-[clamp(2rem,4.4vw,3rem)] text-zinc-950">
            {t.heading}
          </h1>
          <p className="mt-3 text-sm text-zinc-500">{t.lastUpdated}</p>

          <div className="yl-card mt-8 p-6 md:p-8">
            <p className="text-sm leading-relaxed text-zinc-500">
              <strong className="text-zinc-950">{t.placeholder}</strong> {t.notice}{" "}
              <a
                className="text-zinc-950 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-950"
                href="mailto:contact@yunoapp.eu"
              >
                contact@yunoapp.eu
              </a>
              .
            </p>
          </div>

          <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-zinc-500">
            {children}
          </div>
        </div>
      </section>
    </LandingShell>
  );
}
