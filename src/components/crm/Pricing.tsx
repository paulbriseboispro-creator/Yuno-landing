import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import {
  Check,
  CircleCheck,
  Plus,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import yunitStack from "@/assets/crm/yunit-stack.webp";
import { useCrm } from "./content";
import { Accent, CtaButton, EASE, Eyebrow, Reveal, Rich, YunitFace, useFmt } from "./ui";

// Pricing of the design (Tarifs.dc.html), mirror of the app's billing
// (src/lib/crmPlans.ts + _shared/crm-billing.ts): one subscription, 29 € HT a
// month (launch price; 39 € later for new accounts) or 348 € HT a year with
// 30,000 bonus Yunits, 10,000 Yunits offered every month, sends paid in Yunits
// (email 1, SMS 40), recharges at 500 Yunits per euro with +10 % / +15 % bonus.

// Recharge packs (crm_pricing_config: 500 Yunits / €, +10 % from 25,000, +15 % from 50,000).
const PACKS = [
  { y: 5000, p: 10, b: 0 },
  { y: 12500, p: 25, b: 0 },
  { y: 27500, p: 50, b: 10 },
  { y: 57500, p: 100, b: 15 },
];
const MONTHLY_YUNITS = 10000;

// Cheapest mix of packs covering `need` Yunits (the design's solver, 500-Yunit units).
function solve(need: number) {
  if (need <= 0) return { cost: 0, counts: [0, 0, 0, 0], got: 0 };
  const N = Math.ceil(need / 500);
  const P = PACKS.map((p) => ({ u: p.y / 500, c: p.p }));
  const dp = [0];
  const ch = [-1];
  for (let i = 1; i <= N; i++) {
    let best = Infinity;
    let k = -1;
    for (let j = P.length - 1; j >= 0; j--) {
      const v = dp[Math.max(0, i - P[j].u)] + P[j].c;
      if (v < best) {
        best = v;
        k = j;
      }
    }
    dp[i] = best;
    ch[i] = k;
  }
  const counts = [0, 0, 0, 0];
  let i = N;
  let got = 0;
  while (i > 0) {
    const k = ch[i];
    counts[k]++;
    got += PACKS[k].y;
    i = Math.max(0, i - P[k].u);
  }
  return { cost: dp[N], counts, got };
}

function useTween(value: number, duration = 800) {
  const reduce = useReducedMotion();
  const [v, setV] = useState(value);
  const from = useRef(value);
  useEffect(() => {
    if (reduce) {
      setV(value);
      return;
    }
    const start = from.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const e = 1 - Math.pow(1 - p, 4);
      const cur = start + (value - start) * e;
      from.current = cur;
      setV(cur);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration, reduce]);
  return v;
}

function PriceCard({ annual }: { annual: boolean }) {
  const p = useCrm().pricing;
  const { num, lang } = useFmt();
  const price = useTween(annual ? p.year : p.month);
  return (
    <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr]">
      <div className="relative overflow-hidden rounded-[28px] bg-white p-7 text-left shadow-[0_2px_4px_rgba(28,21,23,.04),0_30px_70px_-30px_rgba(157,11,18,.35)] ring-1 ring-yc-sand-200 sm:p-9">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(255,107,53,.18),transparent)]"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-yc-display text-[20px] font-semibold tracking-[-0.02em]">
            {p.plan}
          </span>
          <span className="inline-flex h-7 items-center gap-1.5 rounded-full bg-yc-red-50 px-3 text-[12.5px] font-semibold text-yc-red-700">
            <span className="yc-live size-1.5 rounded-full bg-yc-red-500" />
            {p.launch}
          </span>
        </div>
        <div className="mt-6 flex items-end gap-2">
          {lang === "en" && (
            <span className="self-start pt-2 font-yc-display text-[38px] font-semibold leading-none">
              €
            </span>
          )}
          <span className="font-yc-display text-[88px] font-semibold leading-[0.85] tracking-[-0.055em] tabular-nums sm:text-[104px]">
            {num(Math.round(price))}
          </span>
          <span className="flex flex-col pb-2">
            {lang !== "en" && (
              <span className="font-yc-display text-[30px] font-semibold leading-none">€</span>
            )}
            <span className="mt-1 text-[14px] font-medium text-yc-sand-500">
              {annual ? p.perYear : p.perMonth}
            </span>
          </span>
        </div>
        <p className="mt-4 text-[14.5px] leading-[1.55] text-yc-sand-600">
          {annual ? p.subAnnual : p.subMonthly}
        </p>
        <div className="mt-6 flex flex-col gap-2.5">
          <div className="flex items-center gap-3 rounded-[16px] bg-yc-sand-50 p-3">
            <img src={yunitStack} alt="" className="size-12 flex-none object-contain" />
            <span className="text-[14.5px] leading-[1.45] text-yc-sand-700">
              <Rich text={p.monthlyYunits} />{" "}
              <span className="text-yc-sand-500">· {p.monthlyYunitsSub}</span>
            </span>
          </div>
          <AnimatePresence initial={false}>
            {annual && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
                className="overflow-hidden"
              >
                <div
                  className="flex items-center gap-3 rounded-[16px] p-3 text-white"
                  style={{ background: "var(--gradient-brand)" }}
                >
                  <span className="grid size-12 flex-none place-items-center rounded-full bg-white/20">
                    <Plus className="size-6" strokeWidth={2.6} />
                  </span>
                  <span className="text-[14.5px] leading-[1.45]">
                    <Rich text={p.annualBonus} />{" "}
                    <span className="text-white/80">· {p.annualBonusSub}</span>
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <CtaButton size="lg" block cta="pricing_crm" className="mt-7">
          {p.cta}
        </CtaButton>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] font-medium text-yc-sand-600">
          {p.notes.map((n) => (
            <span key={n} className="inline-flex items-center gap-1.5">
              <CircleCheck className="size-4 text-yc-green-500" strokeWidth={2.2} />
              {n}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-[28px] bg-yc-sand-50 p-7 text-left ring-1 ring-inset ring-black/[.04] sm:p-9">
        <div className="flex flex-col gap-0.5">
          <span className="font-yc-display text-[20px] font-semibold tracking-[-0.02em]">
            {p.includedTitle}
          </span>
          <span className="text-[14px] text-yc-sand-500">{p.includedSub}</span>
        </div>
        <ul className="mt-6 flex flex-col gap-3.5">
          {p.feats.map((f, i) => {
            const soon = /bientôt|soon|pronto/i.test(f.d);
            return (
              <motion.li
                key={f.t}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.5, ease: EASE }}
                className="flex items-start gap-3"
              >
                <span
                  className={cn(
                    "mt-px grid size-[22px] flex-none place-items-center rounded-full",
                    soon ? "bg-yc-sand-100 text-yc-sand-500" : "bg-yc-red-50 text-yc-red-600",
                  )}
                >
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-[1.4]">
                  <span className="font-semibold text-yc-ink">{f.t}</span>
                  <span className="text-yc-sand-500"> · {f.d}</span>
                </span>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// The design's animated wallet: sends drain the balance, free things stay free,
// a 10 € top-up refills it.
const STAGES = [
  { b: 10000, w: 900 },
  { b: 7800, w: 1500 },
  { b: 5400, w: 1500 },
  { b: 5400, w: 1300 },
  { b: 5400, w: 1300 },
  { b: 400, w: 1900 },
  { b: 5400, w: 2800 },
];

function Wallet() {
  const y = useCrm().pricing.yunits;
  const { num } = useFmt();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [st, setSt] = useState(reduce ? 6 : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const next = (k: number) => {
      t = setTimeout(() => {
        const n = (k + 1) % STAGES.length;
        setSt(n);
        next(n);
      }, STAGES[k].w);
    };
    next(st);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce]);
  const bal = useTween(STAGES[st].b, 900);
  const low = st === 5;
  const chip = low ? y.chip[1] : st === 6 ? y.chip[2] : y.chip[0];
  return (
    <div
      ref={ref}
      className="rounded-[28px] bg-white p-6 shadow-[0_2px_4px_rgba(28,21,23,.04),0_30px_70px_-34px_rgba(28,21,23,.35)] ring-1 ring-yc-sand-200 sm:p-7"
    >
      <div className="flex items-center justify-between">
        <span className="font-yc-mono text-[11.5px] uppercase tracking-[0.08em] text-yc-sand-500">
          {y.wallet}
        </span>
        <span
          className={cn(
            "h-7 rounded-full px-3 text-[12.5px] font-semibold leading-7 transition-colors",
            low
              ? "bg-yc-amber-50 text-yc-amber-700"
              : st === 6
                ? "bg-yc-green-50 text-yc-green-700"
                : "bg-yc-sand-50 text-yc-sand-600",
          )}
        >
          {chip}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <YunitFace size={46} mood={low ? "inquiet" : st === 6 ? "ravi" : "content"} />
        <span
          className={cn(
            "font-yc-display text-[54px] font-semibold leading-none tracking-[-0.05em] tabular-nums",
            low ? "text-yc-amber-700" : "text-yc-ink",
          )}
        >
          {num(Math.round(bal))}
        </span>
        <span className="self-end pb-1.5 text-[15px] text-yc-sand-500">Yunits</span>
      </div>
      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-yc-sand-100">
        <div
          className="h-full rounded-full transition-[width,background] duration-700"
          style={{
            width: `${Math.min(100, bal / 100)}%`,
            background: low ? "var(--color-yc-amber-500)" : "var(--gradient-brand)",
          }}
        />
      </div>
      <div className="mt-5 flex flex-col gap-1.5">
        {y.rows.map((r, i) => {
          const on = st > i;
          const last = st === i + 1;
          const good = r.k === "free" || r.k === "plus";
          return (
            <div
              key={r.t}
              className={cn(
                "flex items-center justify-between rounded-[12px] px-3.5 py-2.5 transition-all duration-500",
                good ? "bg-yc-green-50" : last ? "bg-yc-red-50" : "bg-yc-sand-50",
              )}
              style={{ opacity: on ? 1 : 0, transform: on ? "none" : "translateY(10px)" }}
            >
              <span className="flex flex-col">
                <span className="text-[14px] font-semibold text-yc-ink">{r.t}</span>
                <span className="text-[12.5px] text-yc-sand-500">{r.s}</span>
              </span>
              <span
                className={cn(
                  "text-[14px] font-semibold tabular-nums",
                  good ? "text-yc-green-700" : last ? "text-yc-red-700" : "text-yc-sand-700",
                )}
              >
                {r.d}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Simulator() {
  const s = useCrm().pricing.sim;
  const p = useCrm().pricing;
  const { num, money } = useFmt();
  const [preset, setPreset] = useState("orga");
  const [emails, setEmails] = useState(45000);
  const [sms, setSms] = useState(300);
  const used = emails + sms * 40;
  const inc = Math.min(used, MONTHLY_YUNITS);
  const need = Math.max(0, used - MONTHLY_YUNITS);
  const r = useMemo(() => solve(need), [need]);
  const total = p.month + r.cost;
  const totT = useTween(total, 600);
  const left = r.got - need;
  const snapE = (v: number) =>
    Math.min(
      200000,
      v < 10000
        ? Math.round(v / 250) * 250
        : v < 50000
          ? Math.round(v / 1000) * 1000
          : Math.round(v / 5000) * 5000,
    );
  const snapS = (v: number) =>
    Math.min(
      3000,
      v < 200
        ? Math.round(v / 10) * 10
        : v < 1000
          ? Math.round(v / 50) * 50
          : Math.round(v / 100) * 100,
    );
  const ePos = Math.round(1000 * Math.sqrt(emails / 200000));
  const sPos = Math.round(1000 * Math.sqrt(sms / 3000));

  return (
    <div className="rounded-[32px] bg-yc-sand-50 p-4 ring-1 ring-inset ring-black/[.04] sm:p-6">
      <div className="grid gap-2 sm:grid-cols-3">
        {s.presets.map((x) => {
          const on = preset === x.id;
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => {
                setPreset(x.id);
                setEmails(x.e);
                setSms(x.s);
              }}
              className={cn(
                "flex flex-col items-start rounded-[18px] border px-4 py-3 text-left transition-colors active:scale-[.98]",
                on
                  ? "border-yc-ink bg-yc-ink text-white"
                  : "border-yc-sand-200 bg-white text-yc-ink hover:border-yc-sand-300",
              )}
            >
              <span className="text-[15px] font-semibold">{x.label}</span>
              <span className={cn("text-[13px]", on ? "text-yc-sand-300" : "text-yc-sand-600")}>
                {x.desc}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col justify-center gap-8 rounded-[24px] bg-white p-6 ring-1 ring-yc-sand-200 sm:p-8">
          {[
            {
              label: s.emails,
              v: emails,
              eq: `= ${num(emails)} Yunits`,
              pos: ePos,
              on: (x: number) => setEmails(snapE(200000 * Math.pow(x / 1000, 2))),
            },
            {
              label: s.sms,
              v: sms,
              eq: `${num(sms)} × 40 = ${num(sms * 40)} Yunits`,
              pos: sPos,
              on: (x: number) => setSms(snapS(3000 * Math.pow(x / 1000, 2))),
            },
          ].map((row) => (
            <div key={row.label}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[14px] font-semibold text-yc-sand-700">{row.label}</span>
                <span className="text-[12.5px] text-yc-sand-500 tabular-nums">{row.eq}</span>
              </div>
              <div className="mt-1 font-yc-display text-[40px] font-semibold leading-none tracking-[-0.04em] tabular-nums">
                {num(row.v)}
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={1}
                value={row.pos}
                onChange={(e) => {
                  setPreset("custom");
                  row.on(Number(e.target.value));
                }}
                aria-label={row.label}
                className="yc-range mt-4"
                style={{ "--pct": `${row.pos / 10}%` } as CSSProperties}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-[24px] bg-yc-ink p-6 text-white sm:p-8">
          <div>
            <span className="font-yc-mono text-[11.5px] uppercase tracking-[0.08em] text-yc-on-night-2">
              {s.estimate}
            </span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="font-yc-display text-[64px] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                {money(Math.round(totT))}
              </span>
              <span className="text-[14px] text-yc-on-night-2">{p.perMonth}</span>
            </div>
          </div>
          <div>
            <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="transition-[width] duration-500"
                style={{
                  width: used ? `${(inc / used) * 100}%` : "0%",
                  background: "var(--gradient-brand)",
                }}
              />
              <div
                className="bg-white/60 transition-[width] duration-500"
                style={{ width: used ? `${(need / used) * 100}%` : "0%" }}
              />
            </div>
            <div className="mt-2 flex gap-4 text-[12px] text-yc-on-night-2">
              <span className="inline-flex items-center gap-1.5">
                <i
                  className="size-2 rounded-full"
                  style={{ background: "var(--gradient-brand)" }}
                />
                {s.offered}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <i className="size-2 rounded-full bg-white/60" />
                {s.bought}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4 text-[14px]">
            <div className="flex justify-between">
              <span className="text-yc-on-night-2">{s.subscription}</span>
              <span className="font-semibold">{money(p.month)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yc-on-night-2">{s.sends}</span>
              <span className="font-semibold tabular-nums">{num(used)} Yunits</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yc-on-night-2">{s.included}</span>
              <span className="font-semibold tabular-nums text-yc-mint">− {num(inc)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yc-on-night-2">{s.recharges}</span>
              <span className="font-semibold tabular-nums">{money(r.cost)}</span>
            </div>
          </div>
          {need > 0 ? (
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-1.5">
                {r.counts
                  .map((c, i) => (c ? `${c} × ${money(PACKS[i].p)}` : ""))
                  .filter(Boolean)
                  .reverse()
                  .map((l) => (
                    <span
                      key={l}
                      className="rounded-full bg-white/10 px-2.5 py-1 text-[12.5px] font-semibold"
                    >
                      {l}
                    </span>
                  ))}
              </div>
              <span className="text-[12.5px] text-yc-on-night-2">
                {left > 0 ? s.left.replace("{n}", num(left)) : s.exact}
              </span>
            </div>
          ) : (
            <span className="inline-flex items-center gap-2 text-[13.5px] font-medium text-yc-mint">
              <CircleCheck className="size-4" />
              {s.enough}
            </span>
          )}
          <CtaButton block cta="simulator_crm" className="mt-auto">
            {p.cta}
          </CtaButton>
        </div>
      </div>
    </div>
  );
}

export function CrmPricing() {
  const p = useCrm().pricing;
  const { num, money } = useFmt();
  const [annual, setAnnual] = useState(false);
  const y = p.yunits;

  return (
    <section id="tarifs" data-ph-section="pricing" className="relative px-4 pt-28 sm:px-6 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(50%_60%_at_50%_0%,rgba(255,107,53,.10),transparent_70%)]"
      />
      <div className="mx-auto max-w-[820px] text-center">
        <Reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="yc-h2 mt-5 text-yc-ink">
            <Accent text={p.title} accent={p.accent} />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="yc-lead mx-auto mt-5 max-w-[34rem]">{p.sub}</p>
        </Reveal>
        <Reveal delay={0.15} className="mt-8 flex flex-col items-center gap-3">
          <div role="group" className="relative inline-flex rounded-full bg-yc-sand-100 p-1">
            <motion.span
              layout
              transition={{ type: "spring", stiffness: 400, damping: 34 }}
              className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-white shadow-[var(--shadow-xs)]"
              style={{ left: annual ? "50%" : 4 }}
            />
            {[p.monthly, p.annual].map((l, i) => (
              <button
                key={l}
                type="button"
                onClick={() => setAnnual(i === 1)}
                aria-pressed={annual === (i === 1)}
                className={cn(
                  "relative z-10 h-10 min-w-[120px] rounded-full px-5 text-[15px] font-semibold transition-colors",
                  annual === (i === 1) ? "text-yc-ink" : "text-yc-sand-600",
                )}
              >
                {l}
              </button>
            ))}
          </div>
          <span className="text-[13.5px] text-yc-sand-600">
            <Rich text={p.annualNote} />
          </span>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mx-auto mt-10 max-w-[1080px]">
        <PriceCard annual={annual} />
        <p className="mt-4 text-center text-[13px] text-yc-sand-500">{p.vat}</p>
      </Reveal>

      {/* Yunits */}
      <div className="mx-auto mt-28 grid max-w-[1080px] items-center gap-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <Eyebrow>{y.eyebrow}</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="yc-h2 mt-5 text-[clamp(2rem,4vw,3rem)] text-yc-ink">
              <Accent text={y.title} accent={y.accent} />
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-[30rem] text-[17px] leading-[1.6] text-yc-sand-600">{y.sub}</p>
          </Reveal>
          <Reveal
            delay={0.15}
            className="mt-7 overflow-hidden rounded-[22px] bg-white ring-1 ring-yc-sand-200"
          >
            {y.rates.map((r) => (
              <div
                key={r.name}
                className={cn(
                  "flex items-center justify-between border-b border-yc-sand-100 px-5 py-3.5 last:border-0",
                  r.soon && "opacity-60",
                )}
              >
                <span className="flex items-center gap-2 text-[15px] font-semibold">
                  {r.name}
                  {r.soon && (
                    <span className="rounded-full bg-yc-sand-100 px-2 py-0.5 text-[11.5px] font-semibold text-yc-sand-600">
                      {y.soon}
                    </span>
                  )}
                </span>
                <span className="flex items-center gap-1.5 font-yc-display text-[22px] font-semibold tabular-nums">
                  {num(r.cost)}
                  <YunitFace size={20} blink={false} />
                </span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.2} className="mt-4">
            <span className="text-[13px] font-semibold text-yc-ink">{y.free}</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {y.freeItems.map((f, i) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1.5 rounded-full bg-yc-green-50 px-3 py-1.5 text-[13px] font-medium text-yc-green-700"
                >
                  {i === 1 ? (
                    <Sparkles className="size-3.5" />
                  ) : (
                    <Check className="size-3.5" strokeWidth={3} />
                  )}
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-4 text-[14px] text-yc-sand-600">{y.eq}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <Wallet />
        </Reveal>
      </div>

      {/* Simulator */}
      <div className="mx-auto mt-28 max-w-[1080px]">
        <div className="mx-auto max-w-[680px] text-center">
          <Reveal>
            <h3 className="yc-h2 text-[clamp(1.9rem,3.6vw,2.8rem)] text-yc-ink">{p.sim.title}</h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mx-auto mt-4 max-w-[34rem] text-[17px] leading-[1.6] text-yc-sand-600">
              {p.sim.sub}
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="mt-8">
          <Simulator />
        </Reveal>
      </div>
    </section>
  );
}
