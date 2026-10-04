import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  AtSign,
  CalendarClock,
  Check,
  Mail,
  Megaphone,
  MessageCircle,
  MessageSquareText,
  Phone,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { Accent, CtaButton, Eyebrow, Reveal, YunitFace, useFmt } from "./ui";

// The reference's "Your data. Your AI." block, turned into what Yuno really
// does: one place to write to a segment, by email or SMS today (Instagram and
// WhatsApp soon), with the cost in Yunits shown before anything leaves. The
// composer writes itself, message after message; channel icons orbit around.

const ORBIT: { Icon: typeof Mail; cls: string; bg: string; fg: string; d: number }[] = [
  { Icon: Mail, cls: "left-[16%] top-[6%]", bg: "#FFF2F1", fg: "#E3141B", d: 5.2 },
  {
    Icon: MessageSquareText,
    cls: "left-1/2 -top-[2%] -translate-x-1/2",
    bg: "#1C1517",
    fg: "#fff",
    d: 6.4,
  },
  { Icon: AtSign, cls: "right-[16%] top-[7%]", bg: "#FFF0E6", fg: "#FF6B35", d: 5.8 },
  { Icon: Users, cls: "left-[6%] top-[42%]", bg: "#F7F4F3", fg: "#3D3437", d: 6.8 },
  { Icon: MessageCircle, cls: "right-[6%] top-[40%]", bg: "#EAF8EF", fg: "#17A34A", d: 6 },
  { Icon: Megaphone, cls: "left-[12%] bottom-[10%]", bg: "#FFF6E5", fg: "#9A6300", d: 7.2 },
  { Icon: Phone, cls: "right-[13%] bottom-[12%]", bg: "#FFE1DF", fg: "#C30D15", d: 5.6 },
];

function Composer() {
  const ch = useCrm().channels;
  const c = ch.composer;
  const { num } = useFmt();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [mi, setMi] = useState(0);
  const [typed, setTyped] = useState(0);
  const [sent, setSent] = useState(false);
  const m = c.messages[mi];
  const full = m.text;

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setTyped(full.length);
      return;
    }
    setTyped(0);
    setSent(false);
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 2;
      setTyped(Math.min(i, full.length));
      if (i < full.length) t = setTimeout(tick, 28);
      else
        t = setTimeout(() => {
          setSent(true);
          t = setTimeout(() => setMi((k) => (k + 1) % c.messages.length), 1700);
        }, 1400);
    };
    t = setTimeout(tick, 450);
    return () => clearTimeout(t);
  }, [mi, inView, reduce, full, c.messages.length]);

  const isSms = m.channel === "SMS";
  const cost = m.count * (isSms ? 40 : 1);

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[600px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 rounded-[60px] bg-[radial-gradient(closest-side,rgba(255,107,53,.28),rgba(227,20,27,.12)_60%,transparent)] blur-2xl"
      />
      <div className="overflow-hidden rounded-[24px] bg-white text-left shadow-[0_2px_4px_rgba(28,21,23,.05),0_30px_70px_-30px_rgba(157,11,18,.4)] ring-1 ring-yc-sand-200">
        <div className="flex items-center justify-between border-b border-yc-sand-100 px-5 py-3.5">
          <span className="font-yc-display text-[17px] font-semibold tracking-[-0.01em]">
            {c.title}
          </span>
          <div className="inline-flex gap-0.5 rounded-full bg-yc-sand-100 p-[3px] text-[12.5px] font-semibold">
            {[ch.rates[0].name, ch.rates[1].name].map((name, k) => {
              const on = (k === 1) === isSms;
              return (
                <span
                  key={name}
                  className={cn(
                    "rounded-full px-3 py-1 transition-colors",
                    on ? "bg-white text-yc-ink shadow-[var(--shadow-xs)]" : "text-yc-sand-500",
                  )}
                >
                  {name}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 border-b border-yc-sand-100 px-5 py-3 text-[14px]">
          <span className="text-yc-sand-500">{c.to}</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={mi}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex h-7 items-center gap-1.5 rounded-full bg-yc-red-50 px-3 text-[13px] font-semibold text-yc-red-700"
            >
              <Users className="size-3.5" />
              {m.seg} · {num(m.count)}
            </motion.span>
          </AnimatePresence>
        </div>
        {!isSms && (
          <div className="flex gap-2 border-b border-yc-sand-100 px-5 py-3 text-[14px]">
            <span className="text-yc-sand-500">{c.subject}</span>
            <span className="font-semibold text-yc-ink">{m.subject}</span>
          </div>
        )}
        <div className="min-h-[124px] px-5 py-4">
          {isSms ? (
            <div className="max-w-[86%] rounded-[18px] rounded-bl-[6px] bg-yc-sand-100 px-4 py-3 text-[15px] leading-[1.5] text-yc-ink">
              {full.slice(0, typed)}
              {typed < full.length && <span className="yc-caret" />}
            </div>
          ) : (
            <p className="text-[15.5px] leading-[1.6] text-yc-sand-700">
              {full.slice(0, typed)}
              {typed < full.length && <span className="yc-caret" />}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 bg-yc-sand-50 px-5 py-3.5">
          <div className="flex items-center gap-3">
            <YunitFace size={30} blink={false} mood={sent ? "ravi" : "content"} />
            <span className="flex flex-col">
              <span className="text-[12px] text-yc-sand-500">{c.cost}</span>
              <span className="text-[15px] font-semibold tabular-nums">
                {num(cost)} Yunits{" "}
                <span className="font-normal text-yc-sand-500">
                  · {c.after} {num(Math.max(0, c.balance - cost))}
                </span>
              </span>
            </span>
          </div>
          <AnimatePresence mode="wait" initial={false}>
            {sent ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-yc-green-50 px-4 text-[14px] font-semibold text-yc-green-700"
              >
                <Check className="size-4" strokeWidth={3} />
                {c.schedule}
              </motion.span>
            ) : (
              <motion.span
                key="btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-flex h-10 items-center gap-2 rounded-full pl-4 pr-1.5 text-[14px] font-semibold text-white"
                style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-cta)" }}
              >
                {c.send}
                <span className="inline-flex h-7 items-center gap-1 rounded-full bg-white/20 px-2.5 text-[12.5px]">
                  <CalendarClock className="size-3.5" />
                  {c.schedule}
                </span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function CrmChannels() {
  const ch = useCrm().channels;
  return (
    <section
      data-ph-section="channels"
      className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 sm:pt-36"
    >
      <div className="mx-auto max-w-[860px] text-center">
        <Reveal>
          <Eyebrow>{ch.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="yc-h2 mt-5 text-yc-ink">
            <Accent text={ch.title} accent={ch.accent} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="yc-lead mx-auto mt-6 max-w-[40rem]">{ch.sub}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-9 flex justify-center">
          <CtaButton size="lg" ring cta="channels_crm">
            {ch.cta}
          </CtaButton>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-[1100px] px-0 pb-6 pt-24 sm:px-10 md:pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
          {ORBIT.map(({ Icon, cls, bg, fg, d }, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 + i * 0.07 }}
              className={`absolute ${cls}`}
            >
              <span
                className="yc-float grid size-14 place-items-center rounded-[18px] shadow-[0_10px_24px_-10px_rgba(28,21,23,.3)] ring-1 ring-black/5"
                style={
                  {
                    background: bg,
                    color: fg,
                    "--fd": `${d}s`,
                    "--r": `${(i % 2 ? 1 : -1) * 6}deg`,
                  } as CSSProperties
                }
              >
                <Icon className="size-6" strokeWidth={2} />
              </span>
            </motion.span>
          ))}
        </div>
        <Composer />
        <Reveal
          delay={0.1}
          className="mx-auto mt-8 flex max-w-[780px] flex-wrap justify-center gap-2"
        >
          {ch.rates.map((r) => (
            <span
              key={r.name}
              className={cn(
                "inline-flex h-10 items-center gap-2 rounded-[12px] border px-3.5 text-[14px] font-semibold",
                r.soon
                  ? "border-dashed border-yc-sand-300 bg-white/60 text-yc-sand-500"
                  : "border-yc-sand-200 bg-white text-yc-ink shadow-[var(--shadow-xs)]",
              )}
            >
              {r.name}
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[12px]",
                  r.soon ? "bg-yc-sand-100 text-yc-sand-600" : "bg-yc-red-50 text-yc-red-700",
                )}
              >
                {r.cost}
              </span>
            </span>
          ))}
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-5 max-w-[34rem] text-center text-[13.5px] leading-[1.55] text-yc-sand-500">
            {ch.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
