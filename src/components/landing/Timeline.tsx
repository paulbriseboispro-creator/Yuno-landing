import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import {
  CalendarDays,
  DoorOpen,
  Mail,
  Megaphone,
  Sparkles,
  Wine,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { EASE, Eyebrow, FadeIn } from "./ui";

const STEP_ICONS: LucideIcon[] = [Megaphone, Mail, CalendarDays, DoorOpen, Wine, Sparkles];

export function Timeline() {
  const { t } = useLanding();
  const tl = t.timeline;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 60%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = tl.steps.length;
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const current = tl.steps[active];

  return (
    <section data-ph-section="timeline" className="relative px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <FadeIn>
            <Eyebrow>{tl.eyebrow}</Eyebrow>
            <h2 className="yl-h2 mt-4 text-balance">{tl.title}</h2>
            <p className="mt-4 max-w-md text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-base">
              {tl.sub}
            </p>
          </FadeIn>

          <div className="mt-10 hidden lg:block">
            <div className="yl-card relative overflow-hidden p-6">
              <div
                aria-hidden
                className="absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(closest-side,rgba(232,25,44,0.14),transparent)]"
              />
              <div className="relative flex items-center justify-between text-[12px] font-medium uppercase tracking-[0.14em] text-zinc-400">
                <span>{current.label}</span>
                <span className="tabular-nums">
                  {String(active + 1).padStart(2, "0")} / {String(tl.steps.length).padStart(2, "0")}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="relative mt-3 text-6xl font-semibold tracking-[-0.05em] text-zinc-950"
                >
                  {current.when}
                </motion.div>
              </AnimatePresence>
              <div className="relative mt-6 flex gap-1.5">
                {tl.steps.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-colors duration-500",
                      i <= active ? "bg-[var(--yuno-red)]" : "bg-zinc-200",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div ref={ref} className="relative">
          <div aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-zinc-200" />
          <motion.div
            aria-hidden
            className="absolute left-[19px] top-6 w-px origin-top bg-[var(--yuno-red)]"
            style={{ scaleY: fill, bottom: 24 }}
          />
          <ol className="space-y-5">
            {tl.steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? Sparkles;
              const on = i <= active;
              return (
                <motion.li
                  key={s.when}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="relative flex gap-5"
                >
                  <span
                    className={cn(
                      "relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-white transition-all duration-500",
                      on
                        ? "border-[var(--yuno-red)] text-[var(--yuno-red)] shadow-[0_0_0_5px_rgba(232,25,44,0.08)]"
                        : "border-zinc-200 text-zinc-400",
                    )}
                  >
                    <Icon className="size-[18px]" />
                  </span>
                  <div
                    className={cn(
                      "yl-card flex-1 p-5 transition-all duration-500 md:p-6",
                      i === active ? "ring-1 ring-zinc-900/5" : "opacity-90",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-zinc-950 px-2.5 py-0.5 text-[11.5px] font-semibold tabular-nums text-white">
                        {s.when}
                      </span>
                      <span className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                        {s.label}
                      </span>
                    </div>
                    <h3 className="yl-h3 mt-3 text-[17px] text-zinc-950">{s.title}</h3>
                    <p className="mt-2 text-pretty text-[14px] leading-relaxed text-zinc-500">
                      {s.body}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
