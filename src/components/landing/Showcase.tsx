import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import clubDashboard from "@/assets/home/club-dashboard.webp";
import liveNight from "@/assets/home/live-night.webp";
import orgaAnalytics from "@/assets/home/orga-analytics.webp";
import clubVip from "@/assets/home/club-vip.webp";
import orgaTicketing from "@/assets/home/orga-ticketing.webp";
import { useLanding } from "./context";
import { BrowserFrame } from "./Frame";
import { FadeIn, FounderCta, PrimaryCta, SectionHeader } from "./ui";

const SHOTS: Record<string, { src: string; url: string }> = {
  dashboard: { src: clubDashboard, url: "yunoapp.eu/owner/dashboard" },
  live: { src: liveNight, url: "yunoapp.eu/owner/live-night" },
  analytics: { src: orgaAnalytics, url: "yunoapp.eu/organizer-app/analytics" },
  tables: { src: clubVip, url: "yunoapp.eu/owner/tables" },
  ticketing: { src: orgaTicketing, url: "yunoapp.eu/organizer-app/ticketing" },
};

export function Showcase() {
  const { t } = useLanding();
  const s = t.showcase;
  const [active, setActive] = useState(s.tabs[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 30%"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.94, 1]);
  const shot = SHOTS[active] ?? SHOTS.dashboard;
  const shotLabel = s.tabs.find((x) => x.id === active)?.label ?? s.tabs[0].label;

  return (
    <section className="relative overflow-hidden px-4 pb-24 pt-24 sm:px-6 md:pb-32 md:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(50%_60%_at_50%_60%,rgba(232,25,44,0.08),transparent)]"
      />
      <SectionHeader eyebrow={s.eyebrow} title={s.title} sub={s.sub} className="relative" />
      <FadeIn className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <PrimaryCta>{s.primary}</PrimaryCta>
        <FounderCta>{s.secondary}</FounderCta>
      </FadeIn>

      <div className="relative mx-auto mt-14 max-w-5xl">
        <div className="mb-5 flex justify-center">
          <div
            role="tablist"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-zinc-200 bg-white/90 p-1 backdrop-blur"
          >
            {s.tabs.map((tab) => {
              const on = tab.id === active;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(tab.id)}
                  className={cn(
                    "relative shrink-0 rounded-full px-3.5 py-1.5 text-[12.5px] font-medium transition-colors",
                    on ? "text-zinc-950" : "text-zinc-500 hover:text-zinc-900",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="showcase-pill"
                      className="absolute inset-0 rounded-full bg-zinc-100 ring-1 ring-zinc-200"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div ref={ref} style={{ perspective: 1400 }}>
          <motion.div style={{ rotateX, scale, transformOrigin: "50% 0%" }}>
            <BrowserFrame url={shot.url}>
              <div className="relative aspect-[1800/1022] w-full overflow-hidden">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={active}
                    src={shot.src}
                    alt={`Yuno — ${s.eyebrow}: ${shotLabel}`}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 size-full object-cover object-top"
                  />
                </AnimatePresence>
              </div>
            </BrowserFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
