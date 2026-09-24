import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { useReducedMotion, useSpring } from "motion/react";
import { Handshake, Landmark, Link2, type LucideIcon } from "lucide-react";
import { INTL_LOCALE } from "@/i18n/landing-lang";
import { useLanding } from "./context";
import { Eyebrow, FadeIn, PrimaryCta } from "./ui";

const LIST_ICONS: { Icon: LucideIcon; bg: string; fg: string }[] = [
  { Icon: Landmark, bg: "#635BFF26", fg: "#635BFF" },
  { Icon: Handshake, bg: "#F9731626", fg: "#F97316" },
  { Icon: Link2, bg: "#E8192C26", fg: "#E8192C" },
];

const round2 = (v: number) => Math.round(v * 100) / 100;

// Yuno's real fee model (see docs/yuno-context.md): the service fee is added on
// top of the ticket price and paid by the buyer; Stripe's processing fee is
// charged on the amount collected and is the only cost to the seller.
export function computeTicket(price: number) {
  const fee = round2(Math.max(0.04 * price, 0.99));
  const customer = round2(price + fee);
  const stripe = round2(0.015 * customer + 0.25);
  const keep = round2(price - stripe);
  return { fee, customer, stripe, keep };
}

function AnimatedMoney({ value, fmt }: { value: number; fmt: (v: number) => string }) {
  const reduce = useReducedMotion();
  const spring = useSpring(value, { stiffness: 140, damping: 22, mass: 0.4 });
  const [text, setText] = useState(fmt(value));
  useEffect(() => {
    if (reduce) {
      setText(fmt(value));
      return;
    }
    spring.set(value);
  }, [value, reduce, spring, fmt]);
  useEffect(() => spring.on("change", (v) => setText(fmt(v))), [spring, fmt]);
  return <>{text}</>;
}

// Default organizer-side cost per ticket for the platforms we compare against
// (docs/yuno-context.md): Shotgun's 10% base commission, Weezevent's 2.5% with a
// €0.99 minimum — both counted as paid by the organizer, card fees included.
const COMPETITOR_KEEP: Record<string, (price: number) => number> = {
  shotgun: (p) => round2(p * 0.9),
  weezevent: (p) => round2(p - Math.max(0.025 * p, 0.99)),
};

function Slider({
  label,
  display,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  display: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[14px] font-medium text-zinc-700">
        {label}
        <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-[14px] font-semibold tabular-nums text-zinc-950">
          {display}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="yl-range mt-3"
        style={{ "--pct": `${pct}%` } as CSSProperties}
      />
    </label>
  );
}

export function Money() {
  const { t, lang } = useLanding();
  const m = t.money;
  const [price, setPrice] = useState(20);
  const [qty, setQty] = useState(300);
  const [nights, setNights] = useState(4);
  const r = computeTicket(price);

  const eur2 = useMemo(() => {
    const f = new Intl.NumberFormat(INTL_LOCALE[lang], {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return (v: number) => f.format(v);
  }, [lang]);
  const eur0 = useMemo(() => {
    const f = new Intl.NumberFormat(INTL_LOCALE[lang], {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    });
    return (v: number) => f.format(Math.round(v));
  }, [lang]);
  const int = useMemo(() => new Intl.NumberFormat(INTL_LOCALE[lang]), [lang]);

  const perMonth = (keep: number) => keep * qty * nights;
  const yunoMonth = perMonth(r.keep);
  const rows = [
    {
      name: "Yuno",
      rule: m.calc.yunoRule.replace("{customer}", eur2(r.customer)),
      keep: r.keep,
      month: yunoMonth,
      yuno: true,
    },
    ...m.calc.competitors.map((comp) => {
      const keep = COMPETITOR_KEEP[comp.id](price);
      return { name: comp.name, rule: comp.rule, keep, month: perMonth(keep), yuno: false };
    }),
  ];
  const savedYear = Math.max(0, ...rows.slice(1).map((row) => (yunoMonth - row.month) * 12));

  return (
    <section id="money" className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 className="yl-h2 mt-4 text-balance">{m.title}</h2>
          <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-base">
            {m.body}
          </p>
          <div className="mt-8">
            <PrimaryCta>{m.cta}</PrimaryCta>
          </div>
          <ul className="mt-10 space-y-3">
            {m.list.map((it, i) => {
              const ic = LIST_ICONS[i];
              return (
                <li
                  key={it.title}
                  className="flex gap-4 rounded-2xl border border-zinc-100 bg-white p-4 transition-colors hover:border-zinc-200"
                >
                  <span
                    className="flex size-10 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: ic.bg }}
                  >
                    <ic.Icon className="size-[18px]" style={{ color: ic.fg }} />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold tracking-tight text-zinc-950">
                      {it.title}
                    </span>
                    <span className="mt-0.5 block text-[13.5px] leading-relaxed text-zinc-500">
                      {it.body}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </FadeIn>

        <FadeIn delay={0.1} className="relative">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(99,91,255,0.10),transparent)]"
          />
          <div className="yl-card p-6 md:p-8">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              {m.calc.title}
            </p>

            <div className="mt-6 space-y-5">
              <Slider
                label={m.calc.price}
                display={eur0(price)}
                value={price}
                min={5}
                max={80}
                step={1}
                onChange={setPrice}
              />
              <Slider
                label={m.calc.qty}
                display={int.format(qty)}
                value={qty}
                min={50}
                max={2000}
                step={10}
                onChange={setQty}
              />
              <Slider
                label={m.calc.nights}
                display={int.format(nights)}
                value={nights}
                min={1}
                max={20}
                step={1}
                onChange={setNights}
              />
            </div>

            {/* What each platform leaves you, per ticket and per month. */}
            <ul className="mt-7 divide-y divide-zinc-100 rounded-2xl border border-zinc-100 bg-zinc-50/60">
              {rows.map((row) => (
                <li key={row.name} className="px-4 py-3.5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div
                        className={
                          row.yuno
                            ? "text-[14px] font-semibold text-[var(--yuno-red)]"
                            : "text-[14px] font-semibold text-zinc-900"
                        }
                      >
                        {row.name}
                      </div>
                      <div className="mt-0.5 text-[12px] leading-snug text-zinc-500">
                        {row.rule}
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div
                        className={
                          row.yuno
                            ? "text-[15px] font-semibold tabular-nums text-zinc-950"
                            : "text-[15px] font-medium tabular-nums text-zinc-700"
                        }
                      >
                        {eur0(row.month)}{" "}
                        <span className="text-[12px] font-normal text-zinc-400">
                          {m.calc.perMonth}
                        </span>
                      </div>
                      <div className="mt-0.5 text-[12px] tabular-nums text-zinc-500">
                        {row.yuno ? (
                          <>
                            {eur2(row.keep)} {m.calc.perTicket}
                          </>
                        ) : (
                          <span className="font-medium text-[var(--yuno-red)]">
                            −{eur0(Math.max(0, yunoMonth - row.month))} {m.calc.perMonth}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={
                        row.yuno
                          ? "h-full rounded-full bg-[var(--yuno-red)] transition-[width] duration-500"
                          : "h-full rounded-full bg-zinc-300 transition-[width] duration-500"
                      }
                      style={{
                        width: `${yunoMonth > 0 ? Math.min(100, (row.month / yunoMonth) * 100) : 0}%`,
                      }}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <div className="yl-keep yl-edge mt-6 flex items-end justify-between gap-4 rounded-2xl bg-zinc-950 p-5 text-white">
              <span className="max-w-[12rem] text-[13px] leading-snug text-zinc-400">
                {m.calc.saved}
              </span>
              <span className="whitespace-nowrap text-[26px] font-semibold tabular-nums tracking-tight sm:text-3xl md:text-4xl">
                +<AnimatedMoney value={savedYear} fmt={eur0} />
              </span>
            </div>
            <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">{m.calc.foot}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
