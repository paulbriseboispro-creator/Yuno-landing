import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LANDING_LANGS, LANDING_PATHS, rememberLandingLang } from "@/i18n/landing-lang";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { EASE, FadeIn, FounderCta, YunoLogo } from "./ui";

export function FinalCta() {
  const { t, openSignup } = useLanding();
  const f = t.final;
  const [email, setEmail] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    openSignup({ email: email.trim() || undefined });
  }

  return (
    <section data-ph-section="closing" className="px-4 pb-16 sm:px-6 sm:pb-24 md:pb-32">
      <FadeIn className="yl-keep yl-edge relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-zinc-950 px-5 py-14 text-center text-white sm:px-6 sm:py-16 md:px-12 md:py-24">
        {/* concentric arcs echoing the hero */}
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={f.placeholder}
              aria-label={f.placeholder}
              autoComplete="email"
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

export function LandingFooter() {
  const { t, lang, anchor, langHref } = useLanding();
  const f = t.footer;
  return (
    <footer
      data-ph-area="footer"
      className="border-t border-zinc-100 px-4 pb-28 pt-16 sm:px-6 md:pb-12"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-9 sm:gap-10 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
        <div className="col-span-2 md:col-span-4 lg:col-span-1">
          <a
            href={LANDING_PATHS[lang]}
            aria-label="Yuno"
            className="inline-flex text-[var(--yuno-red)]"
          >
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
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t sm:mt-14 border-zinc-100 pt-6 text-[12.5px] text-zinc-400 sm:flex-row sm:justify-between">
        <span>
          © {new Date().getFullYear()} Yuno. {f.rights}
        </span>
        <span>{f.made}</span>
      </div>
    </footer>
  );
}

// Mobile-only sticky CTA, shown once the hero's own buttons have scrolled away.
export function MobileCta() {
  const { t, openSignup, signup } = useLanding();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const nearBottom = window.innerHeight + window.scrollY > document.body.scrollHeight - 700;
      setShow(window.scrollY > 640 && !nearBottom);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && !signup.open && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          data-ph-area="mobile_bar"
          className="fixed inset-x-3 bottom-3 z-40 md:hidden"
          style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        >
          <button
            type="button"
            onClick={() => openSignup()}
            data-ph-cta="signup"
            className="yl-btn-primary h-13 w-full py-3.5 text-[15px] shadow-[0_18px_40px_-12px_rgba(10,10,11,0.55)]"
          >
            {t.mobileCta}
            <ArrowRight className="size-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
