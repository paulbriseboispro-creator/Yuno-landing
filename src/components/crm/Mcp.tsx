import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  ArrowUp,
  BarChart3,
  ChevronDown,
  GitCompareArrows,
  PenLine,
  Plug,
  Plus,
  SlidersHorizontal,
  TrendingUp,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { ChatGptMark, ClaudeMark, GeminiMark } from "./marks";
import { Accent, CtaButton, EASE, Eyebrow, Reveal, YunitFace } from "./ui";

// The reference's "Your data. Your AI. Through MCP." block: Yuno exposes the
// customer base and the nights to ChatGPT, Claude and Gemini through its MCP
// server. AI marks float around a prompt box that asks real questions about the
// crowd; the answer streams in, signed by the model and "through the Yuno MCP".

function Float({
  children,
  className,
  delay,
  d,
}: {
  children: ReactNode;
  className: string;
  delay: number;
  d: number;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.4, y: 10 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 170, damping: 13, delay }}
      className={`absolute ${className}`}
    >
      <span className="yc-float block" style={{ "--fd": `${d}s` } as CSSProperties}>
        {children}
      </span>
    </motion.span>
  );
}

const MARKS = [ClaudeMark, ChatGptMark, GeminiMark];

function PromptBox() {
  const m = useCrm().mcp;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const [i, setI] = useState(0);
  const [q, setQ] = useState(0);
  const [a, setA] = useState(0);
  const [phase, setPhase] = useState<"idle" | "typing" | "thinking" | "answer">("idle");
  const item = m.convo[i];
  const Mark = MARKS[i % MARKS.length];
  const model = m.models[i % m.models.length];

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setQ(item.q.length);
      setA(item.a.length);
      setPhase("answer");
      return;
    }
    let t: ReturnType<typeof setTimeout>;
    let k = 0;
    setQ(0);
    setA(0);
    setPhase("typing");
    const typeQ = () => {
      k += 1;
      setQ(k);
      if (k < item.q.length) t = setTimeout(typeQ, 32);
      else
        t = setTimeout(() => {
          setPhase("thinking");
          t = setTimeout(() => {
            setPhase("answer");
            k = 0;
            const typeA = () => {
              k += 3;
              setA(Math.min(k, item.a.length));
              if (k < item.a.length) t = setTimeout(typeA, 22);
              else t = setTimeout(() => setI((x) => (x + 1) % m.convo.length), 3600);
            };
            typeA();
          }, 900);
        }, 500);
    };
    t = setTimeout(typeQ, 400);
    return () => clearTimeout(t);
  }, [i, inView, reduce, item.q, item.a, m.convo.length]);

  const sent = phase === "thinking" || phase === "answer";

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[600px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-16 -inset-y-12 -z-10 rounded-[80px] bg-[radial-gradient(closest-side,rgba(255,107,53,.30),rgba(227,20,27,.14)_55%,transparent)] blur-2xl"
      />
      <div className="overflow-hidden rounded-[22px] bg-white text-left shadow-[0_2px_4px_rgba(28,21,23,.05),0_30px_70px_-30px_rgba(157,11,18,.4)] ring-1 ring-yc-sand-200">
        <AnimatePresence initial={false}>
          {sent && (
            <motion.div
              key={`ans-${i}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden border-b border-yc-sand-100 bg-yc-paper"
            >
              <div className="flex flex-col gap-3 px-5 py-4">
                <div className="ml-auto max-w-[85%] rounded-[16px] rounded-br-[6px] bg-yc-ink px-4 py-2.5 text-[14.5px] leading-[1.45] text-white">
                  {item.q}
                </div>
                <div className="flex items-start gap-3">
                  <span className="grid size-8 flex-none place-items-center rounded-full bg-white shadow-[var(--shadow-xs)] ring-1 ring-yc-sand-200">
                    <Mark className="size-[18px] text-black" />
                  </span>
                  <div className="min-w-0 flex-1">
                    {phase === "thinking" ? (
                      <span className="inline-flex h-6 items-center gap-1">
                        {[0, 1, 2].map((d) => (
                          <motion.i
                            key={d}
                            className="block size-1.5 rounded-full bg-yc-sand-400"
                            animate={{ opacity: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: d * 0.15 }}
                          />
                        ))}
                      </span>
                    ) : (
                      <p className="text-[15px] leading-[1.55] text-yc-ink">
                        {item.a.slice(0, a)}
                        {a < item.a.length && <span className="yc-caret" />}
                      </p>
                    )}
                    <span className="mt-1.5 inline-flex items-center gap-1.5 text-[12px] font-medium text-yc-sand-500">
                      <YunitFace size={14} blink={false} />
                      {model} · {m.via}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="min-h-[76px] px-5 pb-2 pt-4 text-[15.5px] leading-[1.5]">
          {phase === "typing" ? (
            <span className="text-yc-ink">
              {item.q.slice(0, q)}
              <span className="yc-caret" />
            </span>
          ) : (
            <span className="text-yc-sand-400">{m.placeholder}</span>
          )}
        </div>
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex gap-1.5">
            <span className="grid size-9 place-items-center rounded-[10px] border border-yc-sand-200 text-yc-sand-600">
              <Plus className="size-4" />
            </span>
            <span className="grid size-9 place-items-center rounded-[10px] border border-yc-sand-200 text-yc-sand-600">
              <SlidersHorizontal className="size-4" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              <motion.span
                key={model}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="inline-flex items-center gap-1.5 rounded-[10px] px-2 py-1.5 text-[13.5px] font-medium text-yc-sand-600"
              >
                <Mark className="size-4 text-black" />
                {model}
                <ChevronDown className="size-3.5" />
              </motion.span>
            </AnimatePresence>
            <span
              className={cn(
                "grid size-9 place-items-center rounded-[10px] text-white transition-transform duration-300",
                phase === "typing" && q >= item.q.length && "scale-90",
              )}
              style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-cta)" }}
            >
              <ArrowUp className="size-4" strokeWidth={2.6} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CrmMcp() {
  const m = useCrm().mcp;
  const icons = [BarChart3, Users, PenLine, GitCompareArrows, TrendingUp];
  return (
    <section
      data-ph-section="mcp"
      className="relative overflow-hidden px-4 pb-6 pt-28 sm:px-6 sm:pt-36"
    >
      <div className="mx-auto max-w-[860px] text-center">
        <Reveal>
          <Eyebrow>{m.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="yc-h2 mt-5 text-yc-ink">
            <Accent text={m.title} accent={m.accent} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-[34rem] text-pretty text-[17px] font-semibold leading-[1.55] text-yc-sand-700 sm:text-[18px]">
            {m.sub}
          </p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex justify-center">
          <CtaButton size="lg" ring cta="mcp_crm">
            {m.cta}
          </CtaButton>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-[1000px] pb-4 pt-28 sm:pt-36">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[300px]">
          <Float className="left-[22%] top-[22%] sm:left-[26%]" delay={0.1} d={5.4}>
            <ClaudeMark className="size-10 sm:size-12" />
          </Float>
          <Float className="left-1/2 top-0 -translate-x-1/2" delay={0.18} d={6.2}>
            <ChatGptMark className="size-10 text-black sm:size-12" />
          </Float>
          <Float className="right-[22%] top-[22%] sm:right-[26%]" delay={0.26} d={5.8}>
            <GeminiMark className="size-10 sm:size-12" />
          </Float>
          <Float className="left-[4%] top-[62%] hidden sm:block sm:left-[12%]" delay={0.34} d={6.8}>
            <span className="grid size-12 place-items-center rounded-[14px] bg-yc-ink text-white shadow-[0_10px_24px_-10px_rgba(28,21,23,.5)]">
              <Plug className="size-6" />
            </span>
          </Float>
          <Float className="right-[4%] top-[62%] hidden sm:block sm:right-[12%]" delay={0.42} d={6}>
            <YunitFace size={48} />
          </Float>
        </div>

        <Reveal className="relative mb-6 text-center">
          <h3 className="yc-h3 text-[clamp(1.7rem,3.4vw,2.6rem)] text-yc-ink">
            <Accent text={m.stage} accent={m.stageAccent} />
          </h3>
        </Reveal>
        <PromptBox />
        <Reveal
          delay={0.1}
          className="mx-auto mt-6 flex max-w-[640px] flex-wrap justify-center gap-2"
        >
          {m.chips.map((c, i) => {
            const Icon = icons[i % icons.length];
            return (
              <span
                key={c}
                className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-yc-sand-200 bg-white px-3 text-[13.5px] font-medium text-yc-sand-700 shadow-[var(--shadow-xs)]"
              >
                <Icon className="size-4 text-yc-sand-500" />
                {c}
              </span>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
