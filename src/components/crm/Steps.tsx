import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Loader2, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import shotgunLogo from "@/assets/crm/shotgun-logo.webp";
import { useCrm } from "./content";
import { ConsoleHome, Scaled } from "./Dashboard";
import { Accent, Count, CtaButton, EASE, Eyebrow, Reveal, YunitFace, useFmt } from "./ui";

// "Yuno in 2 minutes." The reference's sticky monitor: steps scroll on the left,
// the screen on the right follows — connect Shotgun (the form fills and
// validates itself), Yuno sorts everything (the Yunit counts the import), then
// the Console home.

function ConnectScreen({ active, inset = false }: { active: boolean; inset?: boolean }) {
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
      className={cn("grid h-[475px] w-[760px] place-items-center p-6", inset && "pr-[100px]")}
      style={{
        background:
          "radial-gradient(60% 60% at 50% 0%,rgba(255,107,53,.10),transparent 70%),var(--color-yc-paper)",
      }}
    >
      <div className="w-full max-w-[360px] rounded-[22px] bg-white p-6 shadow-[0_2px_4px_rgba(28,21,23,.05),0_24px_60px_-24px_rgba(28,21,23,.3)] ring-1 ring-yc-sand-200">
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
    </div>
  );
}

function SortScreen({ active, inset = false }: { active: boolean; inset?: boolean }) {
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
    <div
      className={cn(
        "flex h-[475px] w-[760px] flex-col items-center justify-center gap-4 bg-white p-6",
        inset && "pr-[100px]",
      )}
    >
      <motion.div
        animate={active ? { y: [0, -8, 0] } : {}}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        <YunitFace mood={done ? "ravi" : "content"} size={76} />
      </motion.div>
      <div className="text-center">
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
    </div>
  );
}

function Monitor({ step }: { step: number }) {
  return (
    <div className="yc-dots relative flex aspect-[1/1.06] items-center justify-end overflow-hidden rounded-[32px] lg:aspect-[1/1.12]">
      <div className="relative ml-[9%] w-[104%]">
        <div className="overflow-hidden rounded-[18px] border-[9px] border-[#151112] bg-[#151112] shadow-[0_40px_80px_-30px_rgba(28,21,23,.6)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-white">
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
                  <Scaled cw={760} height={475} className="h-full">
                    <ConnectScreen active inset />
                  </Scaled>
                )}
                {step === 1 && (
                  <Scaled cw={760} height={475} className="h-full">
                    <SortScreen active inset />
                  </Scaled>
                )}
                {step === 2 && (
                  <Scaled cw={1440} height={900} className="h-full">
                    <ConsoleHome start />
                  </Scaled>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* stand */}
        <div className="mx-auto h-[70px] w-[22%] bg-[linear-gradient(90deg,#8f8a89,#cfcac9_30%,#a7a2a1_70%,#7d7877)]" />
        <div className="mx-auto h-2 w-[30%] rounded-t-[4px] bg-[linear-gradient(90deg,#8f8a89,#d8d3d2_40%,#8f8a89)] shadow-[0_8px_14px_-6px_rgba(0,0,0,.35)]" />
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
    <section id="etapes" data-ph-section="how" className="relative px-4 pt-28 sm:px-6 sm:pt-36">
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
        <Reveal delay={0.15} className="mt-9 flex justify-center">
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

      {/* Mobile / tablet: each step with its screen */}
      {desktop !== true && (
        <div className="mx-auto mt-14 flex max-w-[640px] flex-col gap-14 lg:hidden">
          {s.items.map((it, i) => (
            <Reveal key={it.title}>
              <span className="text-[15px] font-medium text-yc-sand-500">
                {s.stepWord} {i + 1}
              </span>
              <h3 className="yc-h3 mt-2 text-[30px]">{it.title}</h3>
              <p className="mt-3 text-[16px] leading-[1.6] text-yc-sand-600">{it.body}</p>
              <div className="mt-6 overflow-hidden rounded-[18px] border-[7px] border-[#151112] bg-white">
                <div className="relative aspect-[16/10]">
                  <div className="absolute inset-0">
                    {desktop === false && i === 0 && (
                      <Scaled cw={760} height={475} className="h-full">
                        <ConnectScreen active />
                      </Scaled>
                    )}
                    {desktop === false && i === 1 && (
                      <Scaled cw={760} height={475} className="h-full">
                        <SortScreen active />
                      </Scaled>
                    )}
                    {desktop === false && i === 2 && (
                      <Scaled cw={1440} height={900} className="h-full">
                        <ConsoleHome start />
                      </Scaled>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
