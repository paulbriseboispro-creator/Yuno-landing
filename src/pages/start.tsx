import { useEffect, useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import {
  LANDING_LANGS,
  LANDING_PATHS,
  rememberLandingLang,
  type LandingLang,
} from "@/i18n/landing-lang";
import { START_PATHS } from "@/i18n/start";
import { cn } from "@/lib/utils";
import {
  LandingProvider,
  LOGIN_URL,
  useLanding,
  whatsappHref,
  type SignupRole,
} from "@/components/landing/context";
import { SignupFlow } from "@/components/landing/SignupFlow";
import { YunoLogo } from "@/components/landing/ui";

// "/start", "/fr/start", "/es/start" — the direct path to a Yuno pro account:
// the link to put in an Instagram bio, a WhatsApp message, an email signature
// or a sales deck. Same funnel as the landing's dialog (SignupFlow), on a page
// of its own. `?role=club|organizer` skips the first question.

export function StartPage({ lang, role }: { lang: LandingLang; role?: SignupRole }) {
  return (
    <LandingProvider lang={lang}>
      <StartBody role={role} />
    </LandingProvider>
  );
}

function StartBody({ role }: { role?: SignupRole }) {
  const { t, lang } = useLanding();
  const p = t.start;
  // The funnel reads sessionStorage and draws a random journey key: render it
  // on the client only, so server HTML and first client render always match.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="yl min-h-screen overflow-x-clip bg-[#fafafa]">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href={LANDING_PATHS[lang]} aria-label="Yuno" className="flex items-center">
          <YunoLogo className="h-[22px]" />
        </a>
        <div className="flex items-center gap-1">
          {LANDING_LANGS.map((l) => (
            <a
              key={l}
              href={START_PATHS[l] + (role ? `?role=${role}` : "")}
              onClick={() => rememberLandingLang(l)}
              data-ph-lang={l}
              className={cn(
                "rounded-full px-2.5 py-1 text-[12px] font-semibold transition-colors",
                l === lang
                  ? "bg-zinc-950 text-white"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
              )}
            >
              {l.toUpperCase()}
            </a>
          ))}
          <a
            href={LOGIN_URL}
            className="ml-1 rounded-full px-3 py-2 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
          >
            {t.nav.login}
          </a>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-8 px-4 pb-20 pt-4 sm:px-6 md:grid-cols-[1fr_minmax(0,520px)] md:gap-14 md:pt-12">
        <section className="order-2 md:order-1 md:pt-6">
          <p className="text-[12.5px] font-semibold uppercase tracking-[0.12em] text-[var(--yuno-red)]">
            {p.eyebrow}
          </p>
          <h1 className="yl-h2 mt-3 max-w-[16ch] text-balance text-zinc-950">{p.heading}</h1>
          <p className="mt-4 max-w-md text-pretty text-[15.5px] leading-relaxed text-zinc-500">
            {p.sub}
          </p>
          <ul className="mt-7 space-y-3">
            {p.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14.5px] text-zinc-800">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {b}
              </li>
            ))}
          </ul>
          <p className="mt-8 border-t border-zinc-200 pt-5 text-[13px] text-zinc-500">{p.proof}</p>
          <p className="mt-4 text-[13.5px] text-zinc-600">
            {p.help}{" "}
            <a
              href={whatsappHref(t.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-zinc-950 underline-offset-2 hover:underline"
            >
              <MessageCircle className="size-4 text-[#25D366]" /> {p.helpCta}
            </a>
          </p>
        </section>

        <section className="order-1 md:order-2">
          <div className="yl-card p-6 sm:p-8">
            {mounted ? (
              <SignupFlow source="start" initialRole={role} variant="page" />
            ) : (
              <div className="h-[420px] animate-pulse rounded-2xl bg-zinc-50" aria-hidden />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
