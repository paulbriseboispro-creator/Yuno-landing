import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  BarChart3,
  Check,
  ChevronRight,
  Mail,
  MessageSquareText,
  AtSign,
  Users,
  Workflow,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { Accent, Avatar, CtaButton, EASE, Eyebrow, Reveal, StatusTag } from "./ui";

// "Smart marketing" block, right after "Yuno in 2 minutes": what the CRM does
// once the customers are in. One customer at a time goes through three cards —
// what the CRM knows → what Yuno decides (trigger, channel, moment, message) →
// what it earns (sent / opened / clicked / bought) — then the ready-made
// automations, the sending rules and the real numbers of the first Paris send.
// Instagram DM is shown as "soon" (never read, never promised as live).

const CH_ICONS = [Mail, MessageSquareText, AtSign];
const PILLAR_ICONS = [Workflow, Users, BarChart3];

function Journey() {
  const e = useCrm().engine;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [i, setI] = useState(0);
  const [step, setStep] = useState(reduce ? 4 : 0);
  const j = e.journeys[i];
  const isMail = j.ch === 0;

  useEffect(() => {
    if (!inView || reduce) return;
    setStep(0);
    const timers = [1, 2, 3, 4].map((n) => setTimeout(() => setStep(n), 900 + n * 650));
    const next = setTimeout(() => setI((k) => (k + 1) % e.journeys.length), 6200);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(next);
    };
  }, [i, inView, reduce, e.journeys.length]);

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-[1100px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-10 -inset-y-10 -z-10 rounded-[60px] bg-[radial-gradient(closest-side,rgba(255,107,53,.22),rgba(227,20,27,.08)_62%,transparent)] blur-2xl"
      />

      <div className="mb-5 flex justify-center gap-2" role="tablist">
        {e.journeys.map((x, k) => (
          <button
            key={x.name}
            type="button"
            role="tab"
            aria-selected={k === i}
            onClick={() => setI(k)}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13.5px] font-semibold transition-colors",
              k === i
                ? "border-yc-ink bg-yc-ink text-white"
                : "border-yc-sand-200 bg-white text-yc-sand-600 hover:text-yc-ink",
            )}
          >
            {x.trigger}
          </button>
        ))}
      </div>

      <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1.25fr_auto_1fr]">
        {/* 1 — what the CRM knows */}
        <div className="rounded-[22px] bg-white p-5 text-left shadow-[0_2px_4px_rgba(28,21,23,.05),0_24px_60px_-30px_rgba(28,21,23,.3)] ring-1 ring-yc-sand-200">
          <div className="yc-label">{e.flow.crm}</div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="mt-4 flex items-center gap-3">
                <Avatar ini={j.ini} tone={j.tone} size={44} />
                <div className="min-w-0">
                  <div className="truncate font-yc-display text-[18px] font-semibold tracking-[-0.01em]">
                    {j.name}
                  </div>
                  <StatusTag tone={j.tone} className="mt-1">
                    {j.tag}
                  </StatusTag>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-[14px] text-yc-sand-700">
                {j.facts.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check
                      className="mt-0.5 size-3.5 flex-none text-yc-green-700"
                      strokeWidth={3}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>

        <ChevronRight
          aria-hidden
          className="mx-auto hidden size-6 self-center text-yc-sand-400 md:block"
        />

        {/* 2 — what Yuno decides */}
        <div className="rounded-[22px] bg-white p-5 text-left shadow-[0_2px_4px_rgba(28,21,23,.05),0_24px_60px_-30px_rgba(157,11,18,.35)] ring-1 ring-yc-sand-200">
          <div className="yc-label">{e.flow.decide}</div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px]">
            <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-yc-red-50 px-3 font-semibold text-yc-red-700">
              <Zap className="size-3.5" />
              {e.flow.trigger} · {j.trigger}
            </span>
          </div>
          <div className="mt-3 flex gap-1.5">
            {e.channels.map((c, k) => {
              const Icon = CH_ICONS[k];
              const on = k === j.ch;
              return (
                <span
                  key={c.name}
                  className={cn(
                    "inline-flex min-h-9 flex-1 items-center justify-center gap-1.5 rounded-[11px] border px-2 text-[13px] font-semibold transition-all",
                    on
                      ? "border-transparent text-white shadow-[var(--shadow-cta)]"
                      : c.soon
                        ? "border-dashed border-yc-sand-300 text-yc-sand-400"
                        : "border-yc-sand-200 text-yc-sand-500",
                  )}
                  style={on ? { background: "var(--gradient-brand)" } : undefined}
                >
                  <Icon className="size-3.5 flex-none" />
                  <span className="flex min-w-0 flex-col items-start leading-[1.15]">
                    <span className="truncate">{c.name}</span>
                    {c.soon && <span className="text-[10.5px] font-medium">{e.flow.soon}</span>}
                  </span>
                </span>
              );
            })}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-3"
            >
              <p className="text-[13px] leading-[1.5] text-yc-sand-500">
                {j.why} · <span className="font-semibold text-yc-sand-700">{j.when}</span>
              </p>
              <div className="mt-3 rounded-[14px] bg-yc-sand-50 p-3.5">
                {isMail && (
                  <div className="mb-1.5 text-[13.5px] font-semibold text-yc-ink">{j.subject}</div>
                )}
                {isMail ? (
                  <p className="text-[14px] leading-[1.55] text-yc-sand-700">{j.msg}</p>
                ) : (
                  <p className="max-w-[92%] rounded-[16px] rounded-bl-[5px] bg-white px-3.5 py-2.5 text-[14px] leading-[1.5] text-yc-ink shadow-[var(--shadow-xs)]">
                    {j.msg}
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <ChevronRight
          aria-hidden
          className="mx-auto hidden size-6 self-center text-yc-sand-400 md:block"
        />

        {/* 3 — what it earns */}
        <div className="rounded-[22px] bg-white p-5 text-left shadow-[0_2px_4px_rgba(28,21,23,.05),0_24px_60px_-30px_rgba(28,21,23,.3)] ring-1 ring-yc-sand-200">
          <div className="yc-label">{e.flow.result}</div>
          <ul className="mt-4 space-y-2.5">
            {e.flow.funnel.map((label, k) => {
              const lit = step > k;
              const last = k === e.flow.funnel.length - 1;
              return (
                <li
                  key={label}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-[12px] px-3 py-2.5 text-[14px] transition-all duration-500",
                    lit
                      ? last
                        ? "bg-yc-green-50 text-yc-green-700"
                        : "bg-yc-sand-50 text-yc-ink"
                      : "bg-transparent text-yc-sand-400",
                  )}
                >
                  <span className="flex items-center gap-2 font-medium">
                    <span
                      className={cn(
                        "grid size-5 place-items-center rounded-full transition-colors duration-500",
                        lit
                          ? last
                            ? "bg-yc-green-700 text-white"
                            : "bg-yc-ink text-white"
                          : "bg-yc-sand-100",
                      )}
                    >
                      {lit && <Check className="size-3" strokeWidth={3.5} />}
                    </span>
                    {label}
                  </span>
                  <span className="font-semibold tabular-nums">{lit ? j.result[k] : "·"}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function CrmEngine() {
  const e = useCrm().engine;
  return (
    <section
      id="marketing"
      data-ph-section="engine"
      className="relative overflow-hidden px-4 pb-6 pt-28 sm:px-6 sm:pt-36"
    >
      <div className="mx-auto max-w-[860px] text-center">
        <Reveal>
          <Eyebrow>{e.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="yc-h2 mt-5 text-yc-ink">
            <Accent text={e.title} accent={e.accent} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="yc-lead mx-auto mt-6 max-w-[40rem]">{e.sub}</p>
        </Reveal>
      </div>

      <Journey />

      <div className="mx-auto mt-16 grid max-w-[1100px] gap-4 md:grid-cols-3">
        {e.pillars.map((p, k) => {
          const Icon = PILLAR_ICONS[k];
          return (
            <Reveal key={p.t} delay={k * 0.06}>
              <div className="h-full rounded-[20px] border border-yc-sand-200 bg-white/70 p-5 text-left">
                <span className="grid size-10 place-items-center rounded-[12px] bg-yc-red-50 text-yc-red-700">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 font-yc-display text-[19px] font-semibold tracking-[-0.01em] text-yc-ink">
                  {p.t}
                </h3>
                <p className="mt-1.5 text-[14.5px] leading-[1.55] text-yc-sand-600">{p.d}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="mx-auto mt-14 max-w-[900px] text-center">
        <Reveal>
          <span className="text-[16px] font-medium text-yc-ink">{e.autosTitle}</span>
        </Reveal>
        <Reveal delay={0.05} className="mt-5 flex flex-wrap justify-center gap-2.5">
          {e.autos.map((a) => (
            <span
              key={a}
              className="inline-flex h-10 items-center gap-2 rounded-[12px] border border-yc-sand-200 bg-white px-3.5 text-[14.5px] font-medium text-yc-ink shadow-[var(--shadow-xs)]"
            >
              <Zap className="size-3.5 text-yc-red-600" />
              {a}
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="mx-auto mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-[13.5px] text-yc-sand-500">
            {e.rules.map((r) => (
              <li key={r} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-yc-green-700" strokeWidth={3} />
                {r}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mx-auto mt-14 max-w-[900px]">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[20px] bg-yc-sand-200 ring-1 ring-yc-sand-200 md:grid-cols-4">
          {e.stats.map((s) => (
            <div key={s.l} className="bg-white px-4 py-5 text-center">
              <dt className="sr-only">{s.l}</dt>
              <dd className="font-yc-display text-[30px] font-semibold tracking-[-0.02em] text-yc-ink sm:text-[34px]">
                {s.v}
              </dd>
              <p aria-hidden className="mt-1 text-[13px] leading-[1.35] text-yc-sand-500">
                {s.l}
              </p>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-center text-[13px] text-yc-sand-500">{e.statsNote}</p>
      </Reveal>

      <Reveal className="mt-10 flex justify-center">
        <CtaButton size="lg" ring cta="engine_crm">
          {e.cta}
        </CtaButton>
      </Reveal>
    </section>
  );
}
