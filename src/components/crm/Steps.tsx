import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import shotgunLogo from "@/assets/crm/shotgun-logo.webp";
import { useCrm } from "./content";
import { ConsoleHome, Scaled } from "./Dashboard";
import { PhoneTodo } from "./PhoneConsole";
import { Accent, Count, CtaButton, EASE, Eyebrow, Reveal, YunitFace, useFmt } from "./ui";

// "Yuno in 2 minutes." The reference's sticky monitor: steps scroll on the left,
// the screen on the right follows — connect Shotgun (the form fills and
// validates itself), Yuno sorts everything (the Yunit counts the import), then
// the Console home.

function ConnectScreen({ active }: { active: boolean }) {
  return (
    <div
      className="grid h-[450px] w-[720px] place-items-center p-6"
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%,rgba(255,107,53,.10),transparent 70%),var(--color-yc-paper)",
      }}
    >
      <ConnectCard active={active} />
    </div>
  );
}

// The Shotgun connection form, filling and validating itself.
function ConnectCard({ active, className }: { active: boolean; className?: string }) {
  const c = useCrm().steps.connect;
  const reduce = useReducedMotion();
  const token = "shg_live_8Hq2••••••••••••Xk4";
  const [typed, setTyped] = useState(reduce ? token.length : 0);
  const [phase, setPhase] = useState<"typing" | "busy" | "ok">(reduce ? "ok" : "typing");

  useEffect(() => {
    if (!active || reduce) return;
    setTyped(0);
    setPhase("typing");
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setTyped(i);
      if (i < token.length) t = setTimeout(tick, 45);
      else {
        t = setTimeout(() => {
          setPhase("busy");
          t = setTimeout(() => setPhase("ok"), 1100);
        }, 450);
      }
    };
    t = setTimeout(tick, 500);
    return () => clearTimeout(t);
  }, [active, reduce, token.length]);

  return (
    <div
      className={cn(
        "w-full max-w-[360px] rounded-[22px] bg-white p-6 shadow-[0_2px_4px_rgba(28,21,23,.05),0_24px_60px_-24px_rgba(28,21,23,.3)] ring-1 ring-yc-sand-200",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <img src={shotgunLogo} alt="" className="size-10 rounded-[11px]" />
        <div>
          <div className="font-yc-display text-[19px] font-semibold tracking-[-0.02em]">
            {c.title}
          </div>
          <div className="flex items-center gap-1 text-[12.5px] text-yc-sand-500">
            <Lock className="size-3" />
            {c.sub}
          </div>
        </div>
      </div>
      <label className="mt-5 block text-[12.5px] font-semibold text-yc-ink">{c.id}</label>
      <div className="mt-1.5 flex h-10 items-center rounded-[12px] border border-yc-sand-200 px-3 font-yc-mono text-[13px] text-yc-ink">
        {c.idVal}
      </div>
      <label className="mt-3.5 block text-[12.5px] font-semibold text-yc-ink">{c.token}</label>
      <div
        className={cn(
          "mt-1.5 flex h-10 items-center rounded-[12px] border px-3 font-yc-mono text-[13px] text-yc-ink transition-shadow",
          phase === "typing"
            ? "border-yc-red-500 shadow-[0_0_0_3px_var(--color-yc-red-200)]"
            : "border-yc-sand-200",
        )}
      >
        {token.slice(0, typed)}
        {phase === "typing" && <span className="yc-caret" />}
      </div>
      <div className="mt-1.5 text-[12px] font-medium text-yc-red-600">{c.help}</div>
      <div className="mt-5">
        <AnimatePresence mode="wait" initial={false}>
          {phase === "ok" ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex h-11 items-center justify-center gap-2 rounded-full bg-yc-green-50 text-[14px] font-semibold text-yc-green-700"
            >
              <Check className="size-4" strokeWidth={3} />
              {c.ok}
            </motion.div>
          ) : (
            <motion.div
              key="btn"
              exit={{ opacity: 0, scale: 0.96 }}
              className="flex h-11 items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold text-white"
              style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-cta)" }}
            >
              {phase === "busy" && <Loader2 className="size-4 animate-spin" />}
              {phase === "busy" ? c.busy : c.btn}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SortScreen({ active }: { active: boolean }) {
  return (
    <div className="flex h-[450px] w-[720px] flex-col items-center justify-center gap-3 bg-white p-6">
      <SortBody active={active} />
    </div>
  );
}

// The import of the history: the Yunit counts what Yuno sorted.
function SortBody({ active, compact = false }: { active: boolean; compact?: boolean }) {
  const s = useCrm().steps.sort;
  const { num } = useFmt();
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!active) return;
    setDone(false);
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <>
      <motion.div
        animate={active ? { y: [0, -8, 0] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <YunitFace mood={done ? "ravi" : "content"} size={compact ? 44 : 64} />
      </motion.div>
      <div className={cn("text-center", compact && "hidden")}>
        <div className="font-yc-display text-[19px] font-semibold tracking-[-0.02em]">
          {s.title}
        </div>
        <div className="text-[13px] text-yc-sand-500">{s.sub}</div>
      </div>
      <div className="w-full max-w-[380px] rounded-[18px] border border-yc-sand-200 p-2">
        {s.rows.map((r, i) => (
          <div key={r.label} className="flex items-center gap-3 rounded-[12px] px-3 py-2">
            <span
              className={cn(
                "grid size-6 flex-none place-items-center rounded-full transition-colors duration-500",
                active ? "bg-yc-green-50 text-yc-green-700" : "bg-yc-sand-100 text-yc-sand-400",
              )}
              style={{ transitionDelay: `${0.5 + i * 0.5}s` }}
            >
              <Check className="size-3.5" strokeWidth={3} />
            </span>
            <span className="flex-1 text-[13.5px] font-medium text-yc-sand-700">{r.label}</span>
            {active ? (
              <Count
                key={`${active}`}
                to={r.n}
                duration={1.2 + i * 0.35}
                format={(v) => num(Math.round(v))}
                className="text-[14px] font-semibold text-yc-ink"
              />
            ) : (
              <span className="text-[14px] font-semibold text-yc-sand-300">—</span>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {done && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex h-8 items-center gap-1.5 rounded-full bg-yc-ink px-3.5 text-[13px] font-semibold text-white"
          >
            <span className="size-1.5 rounded-full bg-yc-mint" />
            {s.done}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}

// Starts its child's animation the first time it is half on screen.
function WhenSeen({ children }: { children: (seen: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  return <div ref={ref}>{children(seen)}</div>;
}

// Phones and tablets: a 1-2-3 timeline, each step with its screen drawn at its
// real size (the scaled monitor screens were unreadable on a phone).
function StepItem({ i, last, children }: { i: number; last: boolean; children: ReactNode }) {
  const s = useCrm().steps;
  const it = s.items[i];
  return (
    <li className="relative pl-12 sm:pl-14">
      {!last && (
        <span
          aria-hidden
          className="absolute -bottom-12 left-[17px] top-12 w-px bg-gradient-to-b from-yc-sand-300 to-yc-sand-100"
        />
      )}
      <span
        aria-hidden
        className="absolute left-0 top-0 grid size-9 place-items-center rounded-full bg-yc-ink font-yc-display text-[16px] font-semibold text-white shadow-[0_6px_14px_-6px_rgba(28,21,23,.5)]"
      >
        {i + 1}
      </span>
      <Reveal>
        <span className="block pt-2.5 font-yc-mono text-[11.5px] uppercase leading-4 tracking-[0.08em] text-yc-sand-500">
          {s.stepWord} {i + 1}
        </span>
        <h3 className="yc-h3 mt-2 text-[24px] text-yc-ink sm:text-[30px]">{it.title}</h3>
        <p className="mt-2 text-[15px] leading-[1.6] text-yc-sand-600 sm:text-[16px]">{it.body}</p>
        <div className="mt-5">{children}</div>
      </Reveal>
    </li>
  );
}

function Monitor({ step }: { step: number }) {
  return (
    <div className="yc-dots relative grid aspect-[1/1] place-items-center overflow-hidden rounded-[32px] px-[7%] lg:aspect-[1/0.96]">
      <div className="relative w-full">
        {/* bezel + screen */}
        <div className="rounded-[20px] bg-[#151112] p-[10px] shadow-[inset_0_0_0_1px_rgba(255,255,255,.08),0_40px_70px_-28px_rgba(28,21,23,.55)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-white">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={step}
                initial={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: EASE }}
                className="absolute inset-0"
              >
                {step === 0 && (
                  <Scaled cw={720} height={450} className="h-full">
                    <ConnectScreen active />
                  </Scaled>
                )}
                {step === 1 && (
                  <Scaled cw={720} height={450} className="h-full">
                    <SortScreen active />
                  </Scaled>
                )}
                {step === 2 && (
                  <Scaled cw={1440} height={900} className="h-full">
                    <ConsoleHome start />
                  </Scaled>
                )}
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.14),transparent_38%)]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* neck + foot, centred under the screen */}
        <div className="mx-auto h-[clamp(36px,7vw,64px)] w-[17%] bg-[linear-gradient(90deg,#8f8a89,#d4cfce_32%,#a7a2a1_72%,#7d7877)] [clip-path:polygon(8%_0,92%_0,100%_100%,0_100%)]" />
        <div className="mx-auto h-[7px] w-[30%] rounded-[3px] bg-[linear-gradient(90deg,#8f8a89,#dcd7d6_40%,#8f8a89)] shadow-[0_10px_16px_-6px_rgba(0,0,0,.4)]" />
      </div>
    </div>
  );
}

function StepText({ i, onActive }: { i: number; onActive: (i: number) => void }) {
  const s = useCrm().steps;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(i);
  }, [inView, i, onActive]);
  const it = s.items[i];
  return (
    <div ref={ref} className="flex min-h-[78vh] flex-col justify-center">
      <span className="text-[16px] font-medium text-yc-sand-500">
        {s.stepWord} {i + 1}
      </span>
      <h3 className="yc-h3 mt-3 text-[34px] text-yc-ink sm:text-[42px]">{it.title}</h3>
      <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.6] text-yc-sand-600">{it.body}</p>
    </div>
  );
}

// Only the layout in use mounts its screens (the desktop monitor or the mobile
// stack): both texts stay in the server HTML.
function useIsDesktop() {
  const [v, setV] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const on = () => setV(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return v;
}

export function CrmSteps() {
  const s = useCrm().steps;
  const [step, setStep] = useState(0);
  const desktop = useIsDesktop();
  return (
    <section id="etapes" data-ph-section="how" className="relative px-4 pt-20 sm:px-6 sm:pt-36">
      <div className="mx-auto max-w-[880px] text-center">
        <Reveal>
          <Eyebrow>{s.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="yc-h2 mt-5 text-yc-ink">
            <Accent text={s.title} accent={s.accent} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="yc-lead mx-auto mt-6 max-w-[40rem]">{s.sub}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 hidden justify-center sm:flex">
          <CtaButton size="lg" ring cta="steps_crm">
            {s.cta}
          </CtaButton>
        </Reveal>
      </div>

      {/* Desktop: sticky monitor */}
      <div className="mx-auto mt-10 hidden max-w-[1200px] grid-cols-[0.9fr_1.1fr] gap-12 lg:grid">
        <div>
          {s.items.map((_, i) => (
            <div
              key={i}
              className={cn(
                "transition-opacity duration-500",
                step === i ? "opacity-100" : "opacity-30",
              )}
            >
              <StepText i={i} onActive={setStep} />
            </div>
          ))}
        </div>
        <div className="relative">
          <div className="sticky top-[12vh]">
            {desktop !== false && <Monitor step={step} />}
            <div className="mt-5 flex justify-center gap-2">
              {s.items.map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-500",
                    step === i ? "w-8 bg-yc-red-500" : "w-1.5 bg-yc-sand-300",
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Phones / tablets: the 1-2-3 timeline */}
      {desktop !== true && (
        <ol className="mx-auto mt-12 flex max-w-[560px] flex-col gap-12 sm:mt-14 lg:hidden">
          <StepItem i={0} last={false}>
            <WhenSeen>{(seen) => <ConnectCard active={seen} className="p-5" />}</WhenSeen>
          </StepItem>
          <StepItem i={1} last={false}>
            <WhenSeen>
              {(seen) => (
                <div className="flex flex-col items-center gap-3 rounded-[22px] bg-white px-4 py-5 shadow-[0_2px_4px_rgba(28,21,23,.05),0_24px_60px_-28px_rgba(28,21,23,.3)] ring-1 ring-yc-sand-200">
                  <SortBody active={seen} compact />
                </div>
              )}
            </WhenSeen>
          </StepItem>
          <StepItem i={2} last>
            <div
              className="rounded-[22px] p-3.5 ring-1 ring-yc-sand-200"
              style={{ background: "var(--color-yc-paper)" }}
            >
              <PhoneTodo />
            </div>
          </StepItem>
        </ol>
      )}
    </section>
  );
}
