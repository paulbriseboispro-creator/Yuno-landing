import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Check, Layers, Timer, Wallet, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { FadeIn, SectionHeader } from "./ui";

const STAT_ICONS: { Icon: LucideIcon; bg: string; fg: string }[] = [
  { Icon: Wallet, bg: "#6366F126", fg: "#6366F1" },
  { Icon: Check, bg: "#10B98126", fg: "#10B981" },
  { Icon: Layers, bg: "#E8192C26", fg: "#E8192C" },
  { Icon: Timer, bg: "#F9731626", fg: "#F97316" },
];

// Counts the numeric part of a value like "€0", "30s", "95.3%" or "7 228" up
// from zero when it scrolls into view, keeping prefix/suffix and separators.
// "7,228" / "7.228" / "7 228" are thousands; "95,3" / "0.015" are decimals.
function parseNumber(num: string) {
  const th = num.match(/^([1-9]\d{0,2})([\s\u202f.,])(\d{3})$/);
  if (th) return { target: Number(th[1] + th[3]), decimals: 0, sep: th[2], dec: "." };
  const d = num.match(/^(\d+)([.,])(\d+)$/);
  if (d) return { target: Number(`${d[1]}.${d[3]}`), decimals: d[3].length, sep: null, dec: d[2] };
  return { target: Number(num), decimals: 0, sep: null, dec: "." };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const m = value.match(/^(\D*?)([\d.,\s\u202f]*\d)(.*)$/);
  const [text, setText] = useState(value);

  useEffect(() => {
    if (!m || !inView || reduce) return;
    const [, pre, num, post] = m;
    const { target, decimals, sep, dec } = parseNumber(num);
    if (!Number.isFinite(target) || target === 0) return;
    const fmt = (v: number) => {
      let s = v.toFixed(decimals).replace(".", dec);
      if (sep) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, sep);
      return pre + s + post;
    };
    setText(fmt(0));
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(fmt(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

export function Stats() {
  const { t } = useLanding();
  return (
    <section className="relative px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={t.stats.eyebrow} title={t.stats.title} sub={t.stats.sub} />
      <FadeIn className="mx-auto mt-14 max-w-4xl">
        <div className="relative grid grid-cols-1 sm:grid-cols-2">
          {/* cross hairlines like the reference grid */}
          <div
            aria-hidden
            className="absolute inset-y-6 left-1/2 hidden w-px bg-gradient-to-b from-transparent via-zinc-200 to-transparent sm:block"
          />
          <div
            aria-hidden
            className="absolute inset-x-6 top-1/2 hidden h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent sm:block"
          />
          {t.stats.items.map((it, i) => {
            const ic = STAT_ICONS[i];
            return (
              <div
                key={it.label}
                className={cn(
                  "group flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-12",
                  i > 0 && "border-t border-zinc-100 sm:border-t-0",
                )}
              >
                <span
                  className="flex size-9 items-center justify-center rounded-xl transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                  style={{ background: ic.bg }}
                >
                  <ic.Icon className="size-[18px]" style={{ color: ic.fg }} strokeWidth={2.2} />
                </span>
                <div className="mt-5 flex items-baseline gap-2">
                  <CountUp
                    value={it.value}
                    className="yl-h3 text-3xl tabular-nums text-zinc-950 md:text-4xl"
                  />
                </div>
                <p className="mt-1 text-[15px] font-semibold tracking-tight text-zinc-900">
                  {it.label}
                </p>
                <p className="mt-2 max-w-[19rem] text-pretty text-[14px] leading-relaxed text-zinc-500">
                  {it.body}
                </p>
              </div>
            );
          })}
        </div>
      </FadeIn>
    </section>
  );
}

export function Problem() {
  const { t } = useLanding();
  const p = t.problem;
  return (
    <section className="relative px-4 py-24 sm:px-6 md:py-32">
      <div
        aria-hidden
        className="yl-grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_40%,black,transparent)]"
      />
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} className="max-w-3xl" />

      <FadeIn className="mx-auto mt-14 max-w-5xl">
        <div className="yl-card overflow-hidden">
          <div className="hidden grid-cols-[180px_1fr_1fr] border-b border-zinc-100 bg-zinc-50/70 text-[12px] font-semibold uppercase tracking-[0.12em] md:grid">
            <div className="px-6 py-3.5 text-zinc-400" />
            <div className="flex items-center gap-2 px-6 py-3.5 text-zinc-400">
              <span className="flex size-4 items-center justify-center rounded-full bg-zinc-200">
                <X className="size-2.5 text-zinc-500" strokeWidth={3} />
              </span>
              {p.today}
            </div>
            <div className="flex items-center gap-2 border-l border-zinc-100 px-6 py-3.5 text-zinc-900">
              <span className="flex size-4 items-center justify-center rounded-full bg-[var(--yuno-red)]">
                <Check className="size-2.5 text-[#fff]" strokeWidth={3} />
              </span>
              {p.withYuno}
            </div>
          </div>
          {p.rows.map((r, i) => (
            <FadeIn
              key={r.subject}
              delay={i * 0.06}
              y={10}
              className={cn(
                "grid grid-cols-1 md:grid-cols-[180px_1fr_1fr]",
                i > 0 && "border-t border-zinc-100",
              )}
            >
              <div className="px-5 pb-1 pt-5 text-[15px] font-semibold tracking-tight text-zinc-950 md:px-6 md:py-6">
                {r.subject}
              </div>
              <div className="flex gap-3 px-5 py-2 text-[14px] leading-relaxed text-zinc-400 md:px-6 md:py-6">
                <X className="mt-1 size-3.5 shrink-0 text-zinc-300" strokeWidth={3} />
                <span>{r.today}</span>
              </div>
              <div className="flex gap-3 px-5 pb-5 pt-2 text-[14px] leading-relaxed text-zinc-800 md:border-l md:border-zinc-100 md:bg-[linear-gradient(90deg,rgba(232,25,44,0.035),transparent)] md:px-6 md:py-6">
                <Check className="mt-1 size-3.5 shrink-0 text-[var(--yuno-red)]" strokeWidth={3} />
                <span>{r.yuno}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
