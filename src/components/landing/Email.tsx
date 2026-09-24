import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Crown, Mail, Ticket, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { CountUp } from "./Stats";
import { EASE, Eyebrow, FadeIn } from "./ui";

export function Email() {
  const { t } = useLanding();
  const e = t.email;
  return (
    <section
      id="email"
      className="relative scroll-mt-20 overflow-hidden px-4 py-24 sm:px-6 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <FadeIn>
          <Eyebrow>{e.eyebrow}</Eyebrow>
          <h2 className="yl-h2 mt-4 text-balance">{e.title}</h2>
          <p className="mt-4 max-w-lg text-pretty text-[15px] leading-relaxed text-zinc-500 md:text-base">
            {e.body}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100">
            {e.stats.map((s) => (
              <div key={s.label} className="bg-white p-5">
                <CountUp
                  value={s.value}
                  className="block text-[28px] font-semibold tabular-nums tracking-[-0.03em] text-zinc-950"
                />
                <span className="mt-1 block text-[13px] leading-snug text-zinc-500">{s.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-zinc-400">{e.proof}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3.5 py-1.5 text-[13px] font-medium text-zinc-700">
            <Mail className="size-3.5 text-[var(--yuno-red)]" /> {e.included}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="relative">
          <div
            aria-hidden
            className="absolute -inset-10 -z-10 bg-[radial-gradient(closest-side,rgba(14,165,233,0.10),transparent)]"
          />
          <EmailMock />
          <Automations />
        </FadeIn>
      </div>
    </section>
  );
}

function EmailMock() {
  const { t } = useLanding();
  const m = t.email.mock;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [tables, setTables] = useState(24);
  const [sales, setSales] = useState(0);

  // The "live inventory" beat: tables tick down while the campaign's sales tick up.
  useEffect(() => {
    if (!inView || reduce) {
      if (reduce) {
        setTables(21);
        setSales(12);
      }
      return;
    }
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      if (n <= 3) setTables((v) => v - 1);
      setSales((v) => Math.min(12, v + 2));
      if (n >= 6) window.clearInterval(id);
    }, 650);
    return () => window.clearInterval(id);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="yl-card relative mx-auto max-w-md overflow-hidden">
      <div className="flex items-center gap-3 border-b border-zinc-100 px-5 py-4">
        <span className="flex size-9 items-center justify-center rounded-full bg-[var(--yuno-red)] text-[13px] font-bold text-white">
          Y
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[13.5px] font-semibold text-zinc-950">{m.from}</span>
          <span className="block truncate text-[12.5px] text-zinc-500">
            {m.subject.replace("21", String(tables))}
          </span>
        </span>
      </div>
      <div className="space-y-3 p-5">
        <div className="relative h-28 overflow-hidden rounded-xl bg-[radial-gradient(120%_120%_at_20%_0%,#7f1d1d,#0a0a0b_60%)]">
          <span className="absolute bottom-3 left-4 text-[22px] font-black uppercase tracking-tight text-white/95">
            Electronic Body
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-white/10 px-2 py-0.5 text-[10.5px] font-medium text-white/80 backdrop-blur">
            SAT · 23:00
          </span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-zinc-100 px-3.5 py-2.5">
          <span className="flex items-center gap-2 text-[13px] font-medium text-zinc-800">
            <Ticket className="size-3.5 text-[var(--yuno-red)]" /> {m.tier}
          </span>
          <span className="text-[13px] font-semibold text-zinc-950">€15</span>
        </div>
        <div className="flex items-center justify-between rounded-xl border border-amber-200/70 bg-amber-50/70 px-3.5 py-2.5">
          <span className="flex items-center gap-2 text-[13px] font-medium text-amber-900">
            <Crown className="size-3.5 text-amber-600" /> {m.tables}
          </span>
          <motion.span
            key={tables}
            initial={{ scale: 1.35, color: "#E8192C" }}
            animate={{ scale: 1, color: "#78350f" }}
            transition={{ duration: 0.4 }}
            className="text-[15px] font-bold tabular-nums"
          >
            {tables}
          </motion.span>
        </div>
        <div className="rounded-full bg-zinc-950 py-2.5 text-center text-[13px] font-semibold text-white">
          {m.cta}
        </div>
      </div>
      <div className="flex items-center gap-2 border-t border-zinc-100 bg-emerald-50/60 px-5 py-3 text-[12.5px] text-emerald-800">
        <TrendingUp className="size-4" />
        <span className="font-semibold tabular-nums">{sales}</span> {m.sales}
      </div>
    </div>
  );
}

function Automations() {
  const { t } = useLanding();
  const e = t.email;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <div
      ref={ref}
      className="yl-card relative mx-auto mt-4 max-w-md p-5 sm:ml-auto sm:mr-0 sm:max-w-sm lg:-mr-6"
    >
      <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
        {e.automationsTitle}
      </p>
      <ul className="mt-3 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
        {e.automations.map((a, i) => (
          <li
            key={a}
            className="flex items-center justify-between gap-2 text-[12.5px] text-zinc-700"
          >
            <span className="truncate">{a}</span>
            <Toggle on={inView} delay={0.2 + i * 0.12} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toggle({ on, delay }: { on: boolean; delay: number }) {
  return (
    <span className={cn("relative inline-flex h-4 w-7 shrink-0 rounded-full bg-zinc-200")}>
      <motion.span
        className="absolute inset-0 rounded-full bg-emerald-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: on ? 1 : 0 }}
        transition={{ delay, duration: 0.3 }}
      />
      <motion.span
        className="absolute top-0.5 size-3 rounded-full bg-white shadow"
        initial={{ left: 2 }}
        animate={{ left: on ? 14 : 2 }}
        transition={{ delay, duration: 0.3, ease: EASE }}
      />
    </span>
  );
}
