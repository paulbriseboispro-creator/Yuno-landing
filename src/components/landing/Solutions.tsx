import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Building2,
  Check,
  Crown,
  FileSignature,
  Megaphone,
  PartyPopper,
  Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import clubDashboard from "@/assets/home/club-dashboard.webp";
import orgaDashboard from "@/assets/home/orga-dashboard.webp";
import orgaAnalytics from "@/assets/home/orga-analytics.webp";
import { useLanding, type SignupRole } from "./context";
import { BrowserFrame } from "./Frame";
import { EASE, FadeIn, PrimaryCta, SectionHeader } from "./ui";

const TAB_META: Record<
  string,
  { Icon: typeof Building2; img: string; url: string; CardIcon: typeof Crown; cardTint: string }
> = {
  club: {
    Icon: Building2,
    img: clubDashboard,
    url: "yunoapp.eu/owner/dashboard",
    CardIcon: Crown,
    cardTint: "#F59E0B",
  },
  organizer: {
    Icon: PartyPopper,
    img: orgaDashboard,
    url: "yunoapp.eu/organizer-app",
    CardIcon: FileSignature,
    cardTint: "#6366F1",
  },
  promoter: {
    Icon: Megaphone,
    img: orgaAnalytics,
    url: "yunoapp.eu/organizer-app/analytics",
    CardIcon: Trophy,
    cardTint: "#E8192C",
  },
};

export function Solutions() {
  const { t } = useLanding();
  const s = t.solutions;
  const [active, setActive] = useState(s.tabs[0].id);
  const tab = s.tabs.find((x) => x.id === active) ?? s.tabs[0];
  const meta = TAB_META[tab.id];

  return (
    <section
      id="solutions"
      className="relative scroll-mt-20 overflow-hidden bg-[#fafafa] px-4 py-24 sm:px-6 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-40 -z-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(232,25,44,0.07),transparent)]"
      />
      <SectionHeader eyebrow={s.eyebrow} title={s.title} sub={s.sub} className="relative" />

      <FadeIn className="relative mt-10 flex justify-center">
        <div
          role="tablist"
          className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-zinc-200 bg-white p-1 shadow-[0_1px_2px_rgba(10,10,11,0.04)]"
        >
          {s.tabs.map((x) => {
            const Icon = TAB_META[x.id].Icon;
            const on = x.id === active;
            return (
              <button
                key={x.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(x.id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors sm:px-4",
                  on ? "text-white" : "text-zinc-600 hover:text-zinc-950",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="sol-pill"
                    className="absolute inset-0 rounded-full bg-zinc-950"
                    transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                  />
                )}
                <Icon className="relative hidden size-4 sm:block" />
                <span className="relative">{x.label}</span>
              </button>
            );
          })}
        </div>
      </FadeIn>

      <div className="relative mx-auto mt-12 max-w-6xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
          >
            <div>
              <h3 className="yl-h3 text-balance text-[26px] text-zinc-950 md:text-[32px]">
                {tab.title}
              </h3>
              <p className="mt-4 text-pretty text-[15px] leading-relaxed text-zinc-500">
                {tab.body}
              </p>
              <ul className="mt-6 space-y-3">
                {tab.bullets.map((b, i) => (
                  <motion.li
                    key={b}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4, ease: EASE }}
                    className="flex items-start gap-3 text-[14.5px] text-zinc-800"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-zinc-950">
                      <Check className="size-3 text-white" strokeWidth={3} />
                    </span>
                    {b}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8">
                <PrimaryCta role={tab.id as SignupRole}>{tab.cta}</PrimaryCta>
              </div>
            </div>

            <div className="relative">
              <BrowserFrame url={meta.url}>
                <img
                  src={meta.img}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="block aspect-[1800/1022] w-full object-cover object-top"
                />
              </BrowserFrame>
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                className="absolute -bottom-6 left-4 right-4 sm:-left-6 sm:right-auto sm:w-[300px]"
              >
                <div className="yl-float-card yl-float flex items-center gap-3 p-3.5">
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: `${meta.cardTint}1A` }}
                  >
                    <meta.CardIcon className="size-[18px]" style={{ color: meta.cardTint }} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13.5px] font-semibold tracking-tight text-zinc-900">
                      {tab.card.title}
                    </span>
                    <span className="block truncate text-[12px] text-zinc-500">
                      {tab.card.meta}
                    </span>
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
