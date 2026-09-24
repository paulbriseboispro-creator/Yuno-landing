import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, ChevronDown, Globe, Menu, Moon, Sun, X } from "lucide-react";
import { MagnifyNav } from "@/components/site/MagnifyNav";
import { useScroll as useScrolled } from "@/hooks/use-scroll";
import { cn } from "@/lib/utils";
import {
  LANDING_LANGS,
  LANDING_LANG_LABELS,
  LANDING_PATHS,
  rememberLandingLang,
} from "@/i18n/landing-lang";
import { LOGIN_URL, useLanding } from "./context";
import { EASE, PrimaryCta, YunoLogo } from "./ui";

// Same feel as the previous landing's header: a full-width bar at the top of
// the page that folds into a rounded pill fitted to its content once you
// scroll (motion `layout` animates the width), with the dock-style
// magnification on the links. The pill also tracks the section in view.
const PILL_SPRING = { type: "spring", stiffness: 420, damping: 38, mass: 0.9 } as const;

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join(",");
  useEffect(() => {
    let raf = 0;
    const compute = () => {
      const line = window.innerHeight * 0.38;
      let found: string | null = null;
      for (const id of key.split(",")) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) found = id;
      }
      setActive(found);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(compute);
    };
    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);
  return active;
}

export function LandingNav() {
  const { t, lang, anchor, langHref } = useLanding();
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(t.nav.links.map((l) => l.href.slice(1)));
  const pill = scrolled || open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 w-full px-3 pt-2 sm:px-4 md:pt-3">
        <motion.nav
          layout
          transition={PILL_SPRING}
          style={{ borderRadius: 999 }}
          className={cn(
            "pointer-events-auto relative mx-auto flex h-14 items-center justify-between border transition-[background-color,border-color,box-shadow] duration-300 md:h-[52px]",
            pill
              ? "w-full gap-3 border-zinc-200/80 bg-white/75 pl-4 pr-1.5 shadow-[0_1px_2px_rgba(10,10,11,0.05),0_12px_32px_-14px_rgba(10,10,11,0.22)] backdrop-blur-xl backdrop-saturate-150 md:w-fit md:gap-5 md:pl-5"
              : "w-full max-w-6xl gap-4 border-transparent bg-transparent px-1 sm:px-2",
          )}
        >
          <motion.a
            layout="position"
            transition={PILL_SPRING}
            href={LANDING_PATHS[lang]}
            aria-label="Yuno"
            className="flex shrink-0 items-center"
          >
            <YunoLogo className="h-[20px] md:h-[21px]" />
          </motion.a>

          <motion.div layout="position" transition={PILL_SPRING} className="hidden md:block">
            <MagnifyNav className="flex items-center">
              {t.nav.links.map((l) => {
                const on = active === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={anchor(l.href)}
                    aria-current={on ? "true" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors",
                      on ? "text-zinc-950" : "text-zinc-600 hover:text-zinc-950",
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="yl-nav-active"
                        className="absolute inset-0 rounded-full bg-zinc-100 ring-1 ring-zinc-200/70"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                );
              })}
            </MagnifyNav>
          </motion.div>

          <motion.div
            layout="position"
            transition={PILL_SPRING}
            className="flex shrink-0 items-center gap-1 sm:gap-1.5"
          >
            <LangSwitcher className="hidden sm:block" />
            <ThemeToggle className="hidden sm:inline-flex" />
            <a
              href={LOGIN_URL}
              className={cn(
                "rounded-full px-3.5 py-2 text-[13.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100",
                pill ? "hidden" : "hidden lg:inline-flex",
              )}
            >
              {t.nav.login}
            </a>
            <PrimaryCta size="sm" className="hidden sm:inline-flex">
              {t.nav.cta}
            </PrimaryCta>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              className="inline-flex size-10 items-center justify-center rounded-full text-zinc-800 transition-colors hover:bg-zinc-100 md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "x" : "menu"}
                  initial={{ opacity: 0, rotate: -45, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 45, scale: 0.8 }}
                  transition={{ duration: 0.18 }}
                >
                  {open ? <X className="size-5" /> : <Menu className="size-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </motion.div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/25 backdrop-blur-[3px] md:hidden"
            />
            <motion.div
              key="sheet"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.32, ease: EASE }}
              className="yl-card fixed inset-x-3 top-[76px] z-50 origin-top overflow-y-auto p-3 md:hidden"
              style={{ maxHeight: "calc(100dvh - 90px)" }}
            >
              <ul className="flex flex-col">
                {t.nav.links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.04 + i * 0.04, duration: 0.35, ease: EASE }}
                  >
                    <a
                      href={anchor(l.href)}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-2xl px-3 py-3.5 text-[17px] font-medium tracking-tight text-zinc-900 transition-colors active:bg-zinc-100"
                    >
                      {l.label}
                      <ArrowUpRight className="size-4 text-zinc-400" />
                    </a>
                  </motion.li>
                ))}
                <li>
                  <a
                    href={LOGIN_URL}
                    className="flex items-center justify-between rounded-2xl px-3 py-3.5 text-[17px] font-medium tracking-tight text-zinc-900 active:bg-zinc-100"
                  >
                    {t.nav.login}
                    <ArrowUpRight className="size-4 text-zinc-400" />
                  </a>
                </li>
              </ul>
              <div className="mt-3 flex items-center gap-2 border-t border-zinc-100 px-1 pt-4">
                {LANDING_LANGS.map((l) => (
                  <a
                    key={l}
                    href={langHref(l)}
                    onClick={() => rememberLandingLang(l)}
                    className={cn(
                      "flex-1 rounded-full border py-2.5 text-center text-sm font-medium",
                      l === lang
                        ? "border-zinc-900 bg-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-700",
                    )}
                  >
                    {l.toUpperCase()}
                  </a>
                ))}
                <ThemeToggle className="size-11 shrink-0 border border-zinc-200" />
              </div>
              <div className="mt-4" onClick={() => setOpen(false)}>
                <PrimaryCta size="lg" className="w-full">
                  {t.hero.primary}
                </PrimaryCta>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, t } = useLanding();
  const dark = theme === "dark";
  const label = dark ? t.nav.toLight : t.nav.toDark;
  return (
    <button
      type="button"
      onClick={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        toggleTheme({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
      }}
      aria-label={label}
      title={label}
      className={cn(
        "relative inline-flex size-9 items-center justify-center overflow-hidden rounded-full text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -60 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 60 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="flex"
        >
          {dark ? <Sun className="size-[17px]" /> : <Moon className="size-[17px]" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

function LangSwitcher({ className }: { className?: string }) {
  const { lang, t, langHref } = useLanding();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t.lang}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[13px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100"
      >
        <Globe className="size-4 text-zinc-500" />
        {lang.toUpperCase()}
        <ChevronDown
          className={cn("size-3.5 text-zinc-400 transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="yl-float-card absolute right-0 top-11 w-44 origin-top-right p-1.5"
          >
            {LANDING_LANGS.map((l) => (
              <li key={l} role="option" aria-selected={l === lang}>
                <a
                  href={langHref(l)}
                  onClick={() => rememberLandingLang(l)}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <span>
                    <span className="mr-2 font-semibold text-zinc-400">{l.toUpperCase()}</span>
                    {LANDING_LANG_LABELS[l]}
                  </span>
                  {l === lang && <Check className="size-4 text-[var(--yuno-red)]" />}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
