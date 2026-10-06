import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "motion/react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { ConsoleHome, Scaled } from "./Dashboard";
import { TicketingPhone } from "./Phone";
import { useMedia } from "./media";
import { Accent, CtaButton, EASE, Reveal } from "./ui";

// "Instagram Insights says 10,000 views. Insyder says who to contact." →
// "Your ticketing says how many tickets went. Yuno says who to nudge." Two
// folder tabs around a dial: the dial turns from a plain knob into the Yuno logo,
// the card flips from sand (what ticketing gives) to night (what Yuno gives).
// Flips with the scroll: the logo stays put, the card changes as it crosses the viewport.

// The official Yunit (claude.design "YunitFace", mood "content"): gradient disc,
// pixel head cut by a mask, straight on.
function YunitFace() {
  const id = useId();
  const [closed, setClosed] = useState(false);

  // Blink every 2.6-5.2 s, eyes shut for 140 ms (as in the design file).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t1: ReturnType<typeof setTimeout>;
    let t2: ReturnType<typeof setTimeout>;
    const loop = () => {
      t1 = setTimeout(
        () => {
          setClosed(true);
          t2 = setTimeout(() => {
            setClosed(false);
            loop();
          }, 140);
        },
        2600 + Math.random() * 2600,
      );
    };
    loop();
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const eyeY = closed ? 518 : 458;
  const eyeH = closed ? 16 : 136;
  return (
    <span className="absolute inset-[5%] block overflow-hidden rounded-full bg-[linear-gradient(65deg,#E3141B_8%,#FF6B35_96%)]">
      <svg viewBox="38 38 1175 1175" aria-hidden className="block size-full">
        <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="1250" height="1250">
          <rect width="1250" height="1250" fill="#fff" />
          <g fill="#000">
            <rect x="451" y={eyeY} width="110" height={eyeH} rx="12" />
            <rect x="692" y={eyeY} width="111" height={eyeH} rx="12" />
            <rect x="375" y="665" width="86" height="88" rx="12" />
            <rect x="787" y="665" width="90" height="88" rx="12" />
          </g>
          <path d="M455 722C540 790 710 790 795 722" fill="none" stroke="#000" strokeWidth="32" />
        </mask>
        <g mask={`url(#${id})`} fill="#fff" stroke="#fff" strokeWidth="22" strokeLinejoin="round">
          <rect x="471" y="273" width="313" height="78" />
          <rect x="329" y="369" width="595" height="113" />
          <rect x="211" y="499" width="831" height="246" />
          <rect x="325" y="763" width="602" height="100" />
          <rect x="466" y="879" width="320" height="74" />
          <rect x="471" y="340" width="313" height="40" />
          <rect x="329" y="470" width="595" height="40" />
          <rect x="325" y="735" width="602" height="40" />
          <rect x="466" y="851" width="320" height="40" />
        </g>
      </svg>
    </span>
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

// Phones: the two answers stacked, the dial between them; it turns to the Yunit
// once the night card is on screen (no 860 px card flipping under the thumb).
function CompareStack() {
  const c = useCrm().compare;
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { amount: 0.55 });
  return (
    <div className="mx-auto mt-10 max-w-[560px] md:hidden">
      <Reveal className="rounded-[26px] bg-yc-sand-50 px-6 pb-14 pt-6 ring-1 ring-inset ring-yc-sand-200">
        <h3 className="yc-h3 text-[21px] text-yc-ink">{c.left.title}</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {c.left.items.map((it) => (
            <li
              key={it}
              className="flex items-start gap-3 text-[15px] font-medium leading-[1.45] text-yc-sand-700"
            >
              <X className="mt-0.5 size-[18px] flex-none text-yc-red-500" strokeWidth={2.4} />
              {it}
            </li>
          ))}
        </ul>
      </Reveal>
      <div className="relative z-20 -my-12 flex justify-center">
        <Dial on={on} />
      </div>
      <div
        ref={ref}
        className="yc-aura--night relative isolate overflow-hidden rounded-[26px] px-6 pb-7 pt-16 text-yc-on-night"
      >
        <h3 className="yc-h3 text-[21px]">{c.right.title}</h3>
        <ul className="mt-4 flex flex-col gap-3">
          {c.right.items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: EASE }}
              className="flex items-start gap-3 text-[15px] font-medium leading-[1.45]"
            >
              <span className="mt-0.5 grid size-5 flex-none place-items-center rounded-full bg-yc-mint/20 text-yc-mint">
                <Check className="size-3.5" strokeWidth={3} />
              </span>
              {it}
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function CrmCompare() {
  const c = useCrm().compare;
  const [on, setOn] = useState(false);
  // Under md the stacked version shows: the hidden one never mounts its Console.
  const narrow = useMedia("(max-width: 767px)");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 30%"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => setOn(v > 0.4));

  return (
    <section data-ph-section="compare" className="relative px-4 pt-20 sm:px-6 sm:pt-36">
      <Reveal className="mx-auto max-w-[900px] text-center">
        <h2 className="yc-h2 text-yc-ink">
          <Accent text={c.title} accent={c.accent} />
        </h2>
      </Reveal>

      <CompareStack />

      <div ref={ref} className="relative mx-auto mt-16 hidden max-w-[980px] md:block">
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
                  <div className="-mr-12 self-start overflow-hidden rounded-tl-[18px] shadow-[var(--shadow-halo)] ring-1 ring-white/10 sm:-mr-12">
                    {narrow !== true && (
                      <Scaled cw={1440} height={1300}>
                        <ConsoleHome start />
                      </Scaled>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Reveal className="mt-12 hidden justify-center sm:flex">
        <CtaButton size="lg" ring cta="compare_crm">
          {c.cta}
        </CtaButton>
      </Reveal>
    </section>
  );
}
