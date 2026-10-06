import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "@/components/landing/context";
import { CRM_LOGIN_URL } from "@/i18n/hosts";
import { LANDING_LANGS } from "@/i18n/landing-lang";
import { useCrm } from "./content";
import { useMedia } from "./media";
import { CtaButton, EASE, Wordmark } from "./ui";

// The floating pill nav of the reference: white 86 % + blur, links with a
// scroll-spy pill, the gradient CTA with its arrow disc. A 3 px brand bar on
// top of the viewport tracks the reading progress. Drops in first in the
// opening sequence.
export function CrmNav() {
  const c = useCrm();
  const { home, lang, langHref } = useLanding();
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Phones: the pill tucks away while you read down and comes back as soon as
  // you scroll up (the progress bar stays), so the text gets the whole screen.
  const narrow = useMedia("(max-width: 767px)");
  const [tucked, setTucked] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  // Scroll-spy: the link whose section crosses the middle of the screen.
  useEffect(() => {
    const ids = c.nav.links.map((l) => l.href.slice(1));
    let raf = 0;
    let lastY = window.scrollY;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        // Direction over at least 8 px of travel (a slow scroll moves < 8 px
        // per frame, so the reference point only moves once a way is decided).
        if (y < 140) {
          setTucked(false);
          lastY = y;
        } else if (Math.abs(y - lastY) > 8) {
          setTucked(y > lastY);
          lastY = y;
        }
        const mid = window.innerHeight * 0.45;
        let cur = "";
        for (const id of ids) {
          const r = document.getElementById(id)?.getBoundingClientRect();
          if (r && r.top <= mid && r.bottom >= mid) cur = id;
        }
        setActive(cur);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [c.nav.links]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left"
        style={{ scaleX: progress, background: "var(--gradient-brand)" }}
      />
      <div
        className={cn(
          "pointer-events-none sticky top-0 z-50 px-3 pt-3 transition-transform duration-300 [transition-timing-function:cubic-bezier(.22,1,.36,1)] sm:px-6",
          narrow && tucked && !open && "-translate-y-[calc(100%+4px)]",
        )}
        data-ph-area="nav"
      >
        <motion.nav
          initial={{ opacity: 0, y: -22, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.05 }}
          className={cn(
            "pointer-events-auto mx-auto flex h-[60px] max-w-[860px] items-center justify-between gap-3 rounded-full border bg-white/[.86] pl-4 pr-2 backdrop-blur-[14px] transition-[box-shadow,border-color] duration-300 sm:pl-5",
            scrolled
              ? "border-yc-sand-200 shadow-[0_1px_2px_rgba(28,21,23,.05),0_10px_30px_-10px_rgba(28,21,23,.18)]"
              : "border-yc-sand-100 shadow-[var(--shadow-sm)]",
          )}
        >
          <a href={home} className="flex-none" aria-label="Yuno CRM">
            <Wordmark size={28} />
          </a>
          <div className="hidden min-w-0 flex-1 justify-center gap-0.5 md:flex">
            {c.nav.links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.06 }}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors",
                  active === l.href.slice(1) ? "text-yc-ink" : "text-yc-sand-600 hover:text-yc-ink",
                )}
              >
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="yc-nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-yc-sand-100"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {l.label}
              </motion.a>
            ))}
          </div>
          <div className="flex flex-none items-center gap-1.5">
            <a
              href={CRM_LOGIN_URL}
              className="hidden whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-semibold text-yc-sand-600 transition-colors hover:text-yc-ink lg:inline-block"
            >
              {c.nav.login}
            </a>
            <CtaButton size="sm" cta="nav_crm" className="hidden sm:inline-flex">
              {c.nav.cta}
            </CtaButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={c.nav.menu}
              className="grid size-10 place-items-center rounded-full text-yc-ink transition-colors hover:bg-yc-sand-50 md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            data-ph-area="menu"
          >
            <div
              className="absolute inset-0 bg-yc-ink/30 backdrop-blur-[6px]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-x-3 top-3 rounded-[28px] bg-white p-5 shadow-[var(--shadow-lg)]"
            >
              <div className="flex items-center justify-between">
                <Wordmark size={28} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={c.nav.close}
                  className="grid size-10 place-items-center rounded-full bg-yc-sand-50 text-yc-ink"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-5 flex flex-col">
                {c.nav.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-yc-sand-100 py-4 font-yc-display text-[24px] font-semibold tracking-[-0.02em] text-yc-ink"
                  >
                    {l.label}
                  </a>
                ))}
                <a href={CRM_LOGIN_URL} className="py-4 text-[16px] font-semibold text-yc-sand-600">
                  {c.nav.login}
                </a>
              </div>
              <CtaButton size="lg" block cta="menu_crm" className="mt-2">
                {c.hero.cta}
              </CtaButton>
              <div className="mt-5 flex justify-center gap-1">
                {LANDING_LANGS.map((l) => (
                  <a
                    key={l}
                    href={langHref(l)}
                    data-ph-lang={l}
                    className={cn(
                      "rounded-full px-3 py-1.5 font-yc-mono text-[12px] uppercase tracking-[0.08em]",
                      l === lang ? "bg-yc-ink text-white" : "text-yc-sand-500",
                    )}
                  >
                    {l}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
