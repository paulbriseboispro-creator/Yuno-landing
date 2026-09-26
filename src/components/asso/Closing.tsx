import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import { LANDING_LANGS, rememberLandingLang } from "@/i18n/landing-lang";
import { cn } from "@/lib/utils";
import { useLanding } from "@/components/landing/context";
import { FadeIn, FounderCta, YunoLogo } from "@/components/landing/ui";
import { useAsso } from "./content";

// Last call: the association's name opens the signup on the next question.
export function AssoFinal() {
  const f = useAsso().final;
  const { openSignup } = useLanding();
  const [name, setName] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    openSignup({ orgName: name.trim() || undefined });
  }

  return (
    <section data-ph-section="closing" className="px-4 pb-16 sm:px-6 sm:pb-24 md:pb-32">
      <FadeIn className="yl-keep yl-edge relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-zinc-950 px-5 py-14 text-center text-white sm:px-6 sm:py-16 md:px-12 md:py-24">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-full">
          {[360, 560, 760, 960, 1160].map((d) => (
            <div
              key={d}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
              style={{ width: d, height: d }}
            />
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,25,44,0.45),transparent)]"
        />

        <div className="relative">
          <h2 className="yl-h2 mx-auto max-w-[18ch] text-balance text-white">{f.title}</h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-zinc-400 md:text-base">
            {f.sub}
          </p>

          <form
            onSubmit={onSubmit}
            className="mx-auto mt-9 flex max-w-lg flex-col gap-2 rounded-full sm:flex-row sm:bg-white/10 sm:p-1.5 sm:ring-1 sm:ring-white/15 sm:backdrop-blur"
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={f.placeholder}
              aria-label={f.placeholder}
              autoComplete="organization"
              maxLength={120}
              className="h-12 w-full min-w-0 rounded-full bg-white/10 px-5 text-[16px] text-white placeholder:text-zinc-500 outline-none ring-1 ring-white/15 focus:ring-white/40 sm:h-11 sm:flex-1 sm:bg-transparent sm:text-[15px] sm:ring-0"
            />
            <button
              type="submit"
              data-ph-cta="signup"
              className="yl-btn-primary group h-12 bg-white px-5 text-[14px] text-zinc-950 hover:bg-zinc-100 sm:h-11"
            >
              {f.primary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </form>
          <div className="mt-5 flex justify-center">
            <FounderCta
              size="sm"
              className="border-white/15 bg-transparent text-white hover:border-white/30 hover:bg-white/5"
            >
              {f.secondary}
            </FounderCta>
          </div>
          <p className="mt-6 text-[12.5px] text-zinc-500">{f.note}</p>
        </div>
      </FadeIn>
    </section>
  );
}

// A footer that keeps associations on their page: its own sections, the legal
// pages and the language switch, no link into the club / organizer site.
export function AssoFooter() {
  const f = useAsso().footer;
  const { lang, anchor, langHref, home } = useLanding();
  return (
    <footer
      data-ph-area="footer"
      className="border-t border-zinc-100 px-4 pb-28 pt-16 sm:px-6 md:pb-12"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-9 sm:gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
        <div className="col-span-2 md:col-span-1">
          <a href={home} aria-label="Yuno" className="inline-flex text-[var(--yuno-red)]">
            <YunoLogo className="h-6" />
          </a>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-zinc-500">{f.tagline}</p>
          <div className="mt-6 flex gap-1.5">
            {LANDING_LANGS.map((l) => (
              <a
                key={l}
                href={langHref(l)}
                onClick={() => rememberLandingLang(l)}
                data-ph-lang={l}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[12px] font-semibold transition-colors",
                  l === lang
                    ? "bg-zinc-950 text-white"
                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
                )}
              >
                {l.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
        {f.cols.map((c) => (
          <div key={c.title}>
            <p className="text-[13px] font-semibold text-zinc-950">{c.title}</p>
            <ul className="mt-3 space-y-1 sm:mt-4 sm:space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={anchor(l.href)}
                    className="inline-block py-1 text-[13.5px] text-zinc-500 transition-colors hover:text-zinc-950 sm:py-0"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-zinc-100 pt-6 text-[12.5px] text-zinc-400 sm:mt-14 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} Yuno. {f.rights}
        </span>
        <span>{f.made}</span>
      </div>
    </footer>
  );
}
