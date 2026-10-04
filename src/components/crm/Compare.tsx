import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { ConsoleHome, Scaled } from "./Dashboard";
import { TicketingPhone } from "./Phone";
import { Accent, CtaButton, EASE, Reveal } from "./ui";

// "Instagram Insights says 10,000 views. Insyder says who to contact." →
// "Your ticketing says how many tickets went. Yuno says who to nudge." Two
// folder tabs around a dial: the dial turns from a plain knob into the Yuno logo,
// the card flips from sand (what ticketing gives) to night (what Yuno gives).
// Flips with the scroll: the logo stays put, the card changes as it crosses the viewport.

// Yunit seen straight on: flat red disc, white pixel face, no tilt, no gloss.
function YunitFace() {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="absolute inset-[5%] size-[90%]">
      <defs>
        <radialGradient id="yunit-face" cx="35%" cy="28%" r="85%">
          <stop offset="0" stopColor="#ff5a3c" />
          <stop offset="1" stopColor="#e8192c" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="50" fill="url(#yunit-face)" />
      <g transform="translate(21 21) scale(.58)">
        <path
          fill="#fff"
          d="M30 0h40v10h20v20h10v40H90v20H70v10H30V90H10V70H0V30h10V10h20z"
        />
        <rect x="27" y="32" width="15" height="17" fill="#ef2a2a" />
        <rect x="58" y="32" width="15" height="17" fill="#ef2a2a" />
        <path d="M22 60q28 22 56 0" fill="none" stroke="#ef2a2a" strokeWidth="7" />
      </g>
    </svg>
  );
}

function Dial({ on }: { on: boolean }) {
  return (
    <div className="relative z-20 grid size-[108px] place-items-center rounded-full sm:size-[150px]">
      <span className="absolute inset-x-[18%] -top-[14%] h-[38%] rounded-t-[40px] bg-yc-ink [clip-path:polygon(0_100%,8%_0,92%_0,100%_100%)]" />
      <motion.span
        animate={{ rotate: on ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="relative grid size-full place-items-center rounded-full bg-yc-ink p-[7px] shadow-[0_18px_40px_-12px_rgba(28,21,23,.55)]"
      >
        <span className="relative grid size-full place-items-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d9d4d3_45%,#a8a2a1_75%,#8a8483)] shadow-[inset_0_2px_6px_rgba(255,255,255,.8),inset_0_-6px_12px_rgba(0,0,0,.25)]">
          <AnimatePresence initial={false} mode="popLayout">
            {on ? (
              <motion.span
                key="yunit"
                initial={{ opacity: 0, scale: 0.6, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: -180 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0"
              >
                <YunitFace />
              </motion.span>
            ) : (
              <motion.span
                key="knob"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="size-[38%] rounded-full bg-[conic-gradient(from_0deg,#b9b3b2,#f2efee,#9b9594,#e6e2e1,#b9b3b2)] shadow-[0_2px_4px_rgba(0,0,0,.25),inset_0_1px_2px_rgba(255,255,255,.7)]"
              />
            )}
          </AnimatePresence>
        </span>
      </motion.span>
    </div>
  );
}

export function CrmCompare() {
  const c = useCrm().compare;
  const [on, setOn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => setOn(v > 0.4));

  return (
    <section data-ph-section="compare" className="relative px-4 pt-28 sm:px-6 sm:pt-36">
      <Reveal className="mx-auto max-w-[900px] text-center">
        <h2 className="yc-h2 text-yc-ink">
          <Accent text={c.title} accent={c.accent} />
        </h2>
      </Reveal>

      <div ref={ref} className="relative mx-auto mt-16 max-w-[980px]">
        {/* folder tabs around the dial */}
        <div className="relative flex items-end justify-center">
          <div
            className={cn(
              "relative -mr-6 flex min-h-[64px] flex-1 items-center justify-end rounded-t-[22px] border border-b-0 py-3 pl-3 pr-12 text-right text-[13px] font-semibold leading-tight transition-colors sm:pr-20 sm:text-[16px]",
              !on
                ? "border-yc-sand-200 bg-yc-sand-50 text-yc-ink"
                : "border-transparent bg-transparent text-yc-sand-400",
            )}
          >
            {c.tabs[0]}
          </div>
          <div className="relative z-20 -mb-10 flex-none sm:-mb-12">
            <Dial on={on} />
          </div>
          <div
            className={cn(
              "relative -ml-6 flex min-h-[64px] flex-1 items-center rounded-t-[22px] border border-b-0 py-3 pl-12 pr-3 text-left text-[13px] font-semibold leading-tight transition-colors sm:pl-20 sm:text-[16px]",
              on
                ? "border-yc-night bg-yc-night text-white"
                : "border-transparent bg-transparent text-yc-sand-400",
            )}
          >
            {c.tabs[1]}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[32px]">
          <AnimatePresence mode="wait" initial={false}>
            {!on ? (
              <motion.div
                key="left"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative flex h-[860px] flex-col overflow-hidden bg-yc-sand-50 px-6 pb-0 pt-20 md:h-[600px] ring-1 ring-inset ring-yc-sand-200 sm:px-12"
              >
                <h3 className="yc-h3 text-center text-[32px] text-yc-ink sm:text-[42px]">
                  {c.left.title}
                </h3>
                <div className="mt-10 grid min-h-0 flex-1 items-end gap-8 md:grid-cols-2">
                  <ul className="flex flex-col gap-4 pb-14 md:pl-8">
                    {c.left.items.map((it, i) => (
                      <motion.li
                        key={it}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                        className="flex items-start gap-3 text-[17px] font-medium text-yc-sand-700"
                      >
                        <X className="mt-0.5 size-5 flex-none text-yc-red-500" strokeWidth={2.4} />
                        {it}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="flex justify-center">
                    <TicketingPhone className="mb-8 w-[190px]" />
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="right"
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="yc-aura--night relative isolate flex h-[860px] flex-col overflow-hidden px-6 md:h-[600px] pt-20 text-yc-on-night sm:px-12"
              >
                <h3 className="yc-h3 text-center text-[32px] sm:text-[42px]">{c.right.title}</h3>
                <div className="mt-10 grid min-h-0 flex-1 items-end gap-8 md:grid-cols-[0.85fr_1.15fr]">
                  <ul className="relative z-10 flex flex-col gap-4 pb-14 md:pl-4">
                    {c.right.items.map((it, i) => (
                      <motion.li
                        key={it}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: EASE }}
                        className="flex items-start gap-3 text-[17px] font-medium"
                      >
                        <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-yc-mint/20 text-yc-mint">
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                        {it}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="-mr-12 overflow-hidden rounded-tl-[18px] shadow-[var(--shadow-halo)] ring-1 ring-white/10 sm:-mr-12">
                    <Scaled cw={1440} height={780}>
                      <ConsoleHome start />
                    </Scaled>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Reveal className="mt-12 flex justify-center">
        <CtaButton size="lg" ring cta="compare_crm">
          {c.cta}
        </CtaButton>
      </Reveal>
    </section>
  );
}
