import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronDown, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  LANDING_LANGS,
  LANDING_LANG_LABELS,
  LANDING_PATHS,
  rememberLandingLang,
} from "@/i18n/landing-lang";
import { APP_URL, useLanding } from "./context";
import { EASE, PrimaryCta, YunoLogo } from "./ui";

export function LandingNav() {
  const { t, lang } = useLanding();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "border-b border-zinc-200/70 bg-white/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href={LANDING_PATHS[lang]} aria-label="Yuno" className="flex items-center">
          <YunoLogo className="h-[22px]" />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {t.nav.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[13.5px] font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LangSwitcher className="hidden sm:block" />
          <a
            href={APP_URL}
            className="hidden rounded-full px-3.5 py-2 text-[13.5px] font-medium text-zinc-700 transition-colors hover:bg-zinc-100 md:inline-flex"
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
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 64px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden bg-white md:hidden"
          >
            <div className="flex h-full flex-col px-4 pb-8 pt-2">
              <ul className="flex flex-col">
                {t.nav.links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.04, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between border-b border-zinc-100 py-4 text-lg font-medium tracking-tight text-zinc-900"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
                <li>
                  <a
                    href={APP_URL}
                    className="flex items-center justify-between border-b border-zinc-100 py-4 text-lg font-medium tracking-tight text-zinc-900"
                  >
                    {t.nav.login}
                  </a>
                </li>
              </ul>
              <div className="mt-6 flex gap-2">
                {LANDING_LANGS.map((l) => (
                  <a
                    key={l}
                    href={LANDING_PATHS[l]}
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
              </div>
              <div className="mt-auto" onClick={() => setOpen(false)}>
                <PrimaryCta size="lg" className="w-full">
                  {t.hero.primary}
                </PrimaryCta>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LangSwitcher({ className }: { className?: string }) {
  const { lang, t } = useLanding();
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
                  href={LANDING_PATHS[l]}
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
