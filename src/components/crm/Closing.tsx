import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Mail, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding, whatsappHref } from "@/components/landing/context";
import { LANDING_LANGS, LANDING_PATHS } from "@/i18n/landing-lang";
import { landingHref, CRM_LOGIN_URL } from "@/i18n/hosts";
import yunitStack from "@/assets/crm/yunit-stack.webp";
import yunitCoin from "@/assets/crm/yunit-coin.webp";
import { useCrm } from "./content";
import { Accent, CtaButton, EASE, Eyebrow, Reveal, Wordmark } from "./ui";

// FAQ (title left, accordion cards right), the final call on a warm aura with
// the footer as a white card on top of it (the reference's closing), and the
// mobile sticky CTA.

export function CrmFaq() {
  const f = useCrm().faq;
  const [open, setOpen] = useState(0);
  return (
    <section
      id="faq"
      data-ph-section="faq"
      className="relative px-4 pb-28 pt-28 sm:px-6 sm:pb-36 sm:pt-36"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>{f.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="yc-h2 mt-5 text-yc-ink">
              <Accent text={f.title} accent={f.accent} />
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[24rem] text-[17px] leading-[1.6] text-yc-sand-600">{f.sub}</p>
            <a
              href={`mailto:${f.email}`}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full border border-yc-sand-200 bg-white px-4 text-[14.5px] font-semibold text-yc-ink shadow-[var(--shadow-xs)] transition-colors hover:border-yc-sand-300"
            >
              <Mail className="size-4 text-yc-red-500" />
              {f.email}
            </a>
          </Reveal>
        </div>
        <div className="flex flex-col gap-3">
          {f.items.map((it, i) => {
            const on = open === i;
            return (
              <Reveal key={it.q} delay={Math.min(i, 5) * 0.04} amount={0.1}>
                <div
                  className={cn(
                    "rounded-[22px] border transition-colors duration-300",
                    on
                      ? "border-yc-sand-200 bg-yc-sand-50"
                      : "border-yc-sand-200 bg-white hover:border-yc-sand-300",
                  )}
                >
                  <button
                    type="button"
                    onClick={() => setOpen(on ? -1 : i)}
                    aria-expanded={on}
                    className="flex w-full items-center justify-between gap-5 px-6 py-5 text-left"
                  >
                    <span className="text-[17px] font-semibold leading-[1.35] text-yc-ink sm:text-[18px]">
                      {it.q}
                    </span>
                    <span
                      className={cn(
                        "grid size-8 flex-none place-items-center rounded-full transition-colors",
                        on ? "bg-yc-ink text-white" : "bg-yc-sand-100 text-yc-ink",
                      )}
                    >
                      {on ? (
                        <Minus className="size-4" strokeWidth={2.6} />
                      ) : (
                        <Plus className="size-4" strokeWidth={2.6} />
                      )}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {on && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 pr-16 text-[15.5px] leading-[1.65] text-yc-sand-600">
                          {it.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CrmFinal() {
  const c = useCrm();
  const { lang, langHref, whatsappMessage } = useLanding();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const coinY = useTransform(scrollYProgress, [0, 1], [80, -120]);
  const stackY = useTransform(scrollYProgress, [0, 1], [40, -60]);
  // Legal pages and the Suite live on landing.yunoapp.eu, not on crm.yunoapp.eu.
  const linkFor = (href: string) =>
    href === "whatsapp"
      ? whatsappHref(whatsappMessage)
      : href === "login"
        ? CRM_LOGIN_URL
        : href.startsWith("/")
          ? landingHref(href)
          : href;

  return (
    <section
      ref={ref}
      data-ph-section="final"
      className="relative isolate overflow-hidden px-3 pb-3 pt-32 sm:px-6 sm:pb-6 sm:pt-40"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(70% 55% at 50% 100%,rgba(227,20,27,.55),transparent 72%),radial-gradient(45% 40% at 85% 35%,rgba(255,107,53,.35),transparent 70%),radial-gradient(40% 35% at 10% 40%,rgba(255,148,141,.35),transparent 70%),var(--noise),linear-gradient(180deg,#fff 0%,#FFF2F1 30%,#FFD6CF 62%,#FF948D 100%)",
        }}
      />
      <motion.img
        src={yunitStack}
        alt=""
        aria-hidden
        style={{ y: stackY }}
        className="pointer-events-none absolute left-[4%] top-[22%] -z-10 hidden w-[180px] rotate-[-12deg] drop-shadow-[0_24px_30px_rgba(157,11,18,.3)] md:block lg:w-[220px]"
      />
      <motion.img
        src={yunitCoin}
        alt=""
        aria-hidden
        style={{ y: coinY }}
        className="pointer-events-none absolute right-[6%] top-[14%] -z-10 hidden w-[120px] rotate-[16deg] drop-shadow-[0_24px_30px_rgba(157,11,18,.3)] md:block lg:w-[150px]"
      />

      <div className="mx-auto max-w-[880px] text-center">
        <Reveal>
          <h2 className="yc-display text-yc-ink">
            <Accent text={c.final.title} accent={c.final.accent} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="yc-lead mx-auto mt-6 max-w-[34rem] text-yc-sand-700">{c.final.sub}</p>
        </Reveal>
        <Reveal delay={0.18} className="mt-10 flex justify-center">
          <CtaButton size="lg" ring cta="final_crm">
            {c.final.cta}
          </CtaButton>
        </Reveal>
      </div>

      <footer
        data-ph-area="footer"
        className="relative mx-auto mt-32 max-w-[1200px] rounded-[32px] bg-white px-7 py-10 shadow-[0_30px_80px_-30px_rgba(116,10,16,.45)] sm:px-12 sm:py-14"
      >
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark size={34} />
            <p className="mt-5 max-w-[22rem] text-[16px] leading-[1.55] text-yc-sand-700">
              {c.footer.tagline}
            </p>
            <a
              href={`mailto:${c.faq.email}`}
              className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-yc-ink px-6 text-[15px] font-semibold text-white transition-colors hover:bg-yc-sand-700"
            >
              {c.faq.email}
            </a>
          </div>
          {c.footer.cols.map((col) => (
            <div key={col.title}>
              <div className="text-[16px] font-semibold text-yc-ink">{col.title}</div>
              <ul className="mt-4 flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={linkFor(l.href)}
                      target={l.href === "whatsapp" ? "_blank" : undefined}
                      rel={l.href === "whatsapp" ? "noopener noreferrer" : undefined}
                      className="text-[15px] text-yc-sand-600 transition-colors hover:text-yc-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-yc-sand-100 pt-6 text-[13.5px] text-yc-sand-500 md:flex-row md:items-center md:justify-between">
          <span>
            © 2026 {c.footer.rights} · {c.footer.region}
          </span>
          <a
            href={landingHref(LANDING_PATHS[lang])}
            className="inline-flex items-center gap-1 font-medium text-yc-sand-600 transition-colors hover:text-yc-red-600"
          >
            {c.footer.suite}
            <ArrowUpRight className="size-3.5" />
          </a>
          <div className="flex gap-1">
            {LANDING_LANGS.map((l) => (
              <a
                key={l}
                href={langHref(l)}
                data-ph-lang={l}
                className={cn(
                  "rounded-full px-2.5 py-1 font-yc-mono text-[11.5px] uppercase tracking-[0.08em] transition-colors",
                  l === lang ? "bg-yc-ink text-white" : "text-yc-sand-500 hover:text-yc-ink",
                )}
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}

// Mobile: the CTA sticks to the bottom once the hero is gone, hides on the final call.
export function CrmMobileBar() {
  const c = useCrm();
  const { signup } = useLanding();
  const [show, setShow] = useState(false);
  const [finalIn, setFinalIn] = useState(false);
  useEffect(() => {
    const el = document.querySelector('[data-ph-section="final"]');
    const io = el
      ? new IntersectionObserver(([e]) => setFinalIn(e.isIntersecting), {
          rootMargin: "0px 0px -10% 0px",
        })
      : null;
    if (el && io) io.observe(el);
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  const visible = show && !finalIn && !signup.open;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="fixed inset-x-3 bottom-3 z-40 sm:hidden"
          data-ph-area="mobile_cta"
        >
          <div className="rounded-full bg-white/90 p-1.5 shadow-[0_10px_30px_-8px_rgba(28,21,23,.35)] ring-1 ring-yc-sand-200 backdrop-blur">
            <CtaButton block cta="mobile_crm">
              {c.mobileCta}
            </CtaButton>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
