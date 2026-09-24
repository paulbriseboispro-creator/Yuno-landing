import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Crown, Martini, ScanLine, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { EASE, FadeIn, SectionHeader } from "./ui";

type Mini = ReturnType<typeof useLanding>["t"]["pillars"]["mini"];

export function Pillars() {
  const { t } = useLanding();
  const p = t.pillars;
  const visuals: Record<string, (m: Mini) => ReactNode> = {
    tickets: (m) => <TicketsMini m={m} />,
    tables: (m) => <TablesMini m={m} />,
    bar: (m) => <BarMini m={m} />,
    door: (m) => <DoorMini m={m} />,
    crm: (m) => <CrmMini m={m} />,
    money: (m) => <MoneyMini m={m} />,
  };

  return (
    <section id="product" className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} className="max-w-3xl" />
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {p.items.map((it, i) => (
          <FadeIn key={it.id} delay={(i % 3) * 0.08}>
            <article className="yl-card group h-full overflow-hidden transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(10,10,11,0.04),0_24px_48px_-20px_rgba(10,10,11,0.18)]">
              <div className="relative h-52 overflow-hidden border-b border-zinc-100 bg-[#fafafa]">
                <div
                  aria-hidden
                  className="yl-grid-bg absolute inset-0 opacity-70 [mask-image:radial-gradient(70%_70%_at_50%_50%,black,transparent)]"
                />
                <div className="relative flex h-full items-center justify-center p-5">
                  {visuals[it.id]?.(p.mini)}
                </div>
              </div>
              <div className="p-6">
                <h3 className="yl-h3 text-[17px] text-zinc-950">{it.title}</h3>
                <p className="mt-2 text-pretty text-[14px] leading-relaxed text-zinc-500">
                  {it.body}
                </p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function useLoop(length: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40px" });
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [inView, reduce, length, ms]);
  return { ref, i, inView };
}

function MiniCard({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("yl-float-card w-full max-w-[270px] p-3", className)}>{children}</div>;
}

function TicketsMini({ m }: { m: Mini }) {
  const { ref, inView } = useLoop(1, 1000);
  return (
    <div ref={ref} className="w-full max-w-[270px] space-y-2">
      <MiniCard className="flex items-center justify-between py-2.5">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-zinc-400 line-through">
          <Ticket className="size-3.5" /> {m.earlyBird} · €12
        </span>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-zinc-500">
          {m.soldOut}
        </span>
      </MiniCard>
      <MiniCard className="py-2.5">
        <div className="flex items-center justify-between text-[13px] font-semibold text-zinc-900">
          <span className="flex items-center gap-2">
            <Ticket className="size-3.5 text-[var(--yuno-red)]" /> {m.regular} · €15
          </span>
          <span className="text-[11px] font-medium text-zinc-400">108 {m.left}</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <motion.div
            className="h-full rounded-full bg-[var(--yuno-red)]"
            initial={{ width: "8%" }}
            animate={inView ? { width: "64%" } : undefined}
            transition={{ duration: 1.6, ease: EASE }}
          />
        </div>
      </MiniCard>
      <MiniCard className="flex items-center justify-between border-emerald-200/70 bg-emerald-50/80 py-2.5">
        <span className="text-[13px] font-semibold text-emerald-800">{m.guestList}</span>
        <span className="text-[11px] font-medium text-emerald-700">{m.freeBefore}</span>
      </MiniCard>
    </div>
  );
}

function TablesMini({ m }: { m: Mini }) {
  const { ref, i } = useLoop(6, 1100);
  const tables = [0, 1, 2, 3, 4, 5, 6, 7];
  const booked = new Set([1, 4, 6, (i + 2) % 8]);
  return (
    <div ref={ref} className="relative w-full max-w-[270px]">
      <div className="yl-float-card p-3">
        <div className="mb-2 flex items-center justify-between text-[11px] font-medium text-zinc-400">
          <span>DJ</span>
          <span className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm bg-[var(--yuno-red)]" />
              {m.booked}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-sm border border-zinc-300" />
              {m.available}
            </span>
          </span>
        </div>
        <div className="mb-3 h-2 rounded-full bg-zinc-900/90" />
        <div className="grid grid-cols-4 gap-2">
          {tables.map((n) => (
            <motion.div
              key={n}
              animate={{
                backgroundColor: booked.has(n) ? "#E8192C" : "#ffffff",
                color: booked.has(n) ? "#ffffff" : "#a1a1aa",
              }}
              transition={{ duration: 0.4 }}
              className={cn(
                "flex h-9 items-center justify-center border border-zinc-200 text-[10px] font-semibold",
                n % 3 === 0 ? "rounded-full" : "rounded-md",
              )}
            >
              T{n + 1}
            </motion.div>
          ))}
        </div>
      </div>
      <div className="yl-float absolute -bottom-3 -right-3 flex items-center gap-1.5 rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg">
        <Crown className="size-3 text-amber-400" /> Gold · €800 {m.minSpend}
      </div>
    </div>
  );
}

function BarMini({ m }: { m: Mini }) {
  const { ref, i } = useLoop(3, 1500);
  const states = [
    { label: m.pending, cls: "bg-amber-100 text-amber-700" },
    { label: m.prepping, cls: "bg-sky-100 text-sky-700" },
    { label: m.ready, cls: "bg-emerald-100 text-emerald-700" },
  ];
  const orders = [
    { id: "#1042", item: "2× Mojito", s: (0 + i) % 3 },
    { id: "#1041", item: "Gin tonic", s: (1 + i) % 3 },
    { id: "#1040", item: "4× Shots", s: (2 + i) % 3 },
  ];
  return (
    <div ref={ref} className="w-full max-w-[270px] space-y-1.5">
      {orders.map((o) => (
        <MiniCard key={o.id} className="flex items-center gap-3 py-2">
          <span className="flex size-7 items-center justify-center rounded-lg bg-violet-50">
            <Martini className="size-4 text-violet-600" />
          </span>
          <span className="flex-1">
            <span className="block text-[12.5px] font-semibold text-zinc-900">{o.item}</span>
            <span className="block text-[11px] text-zinc-400">{o.id}</span>
          </span>
          <motion.span
            key={o.s}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("rounded-full px-2 py-0.5 text-[10.5px] font-semibold", states[o.s].cls)}
          >
            {states[o.s].label}
          </motion.span>
        </MiniCard>
      ))}
    </div>
  );
}

function DoorMini({ m }: { m: Mini }) {
  const { ref, i } = useLoop(1000, 1800);
  return (
    <div ref={ref} className="flex w-full max-w-[270px] items-center gap-3">
      <div className="relative flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-zinc-950">
        <ScanLine className="size-12 text-white/25" strokeWidth={1.4} />
        <div className="yl-scan-line absolute inset-x-3 top-6 h-0.5 rounded-full bg-[var(--yuno-red)] shadow-[0_0_14px_2px_rgba(232,25,44,0.6)]" />
      </div>
      <div className="flex-1 space-y-2">
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="yl-float-card flex items-center gap-2 p-2.5"
        >
          <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500">
            <Check className="size-3.5 text-white" strokeWidth={3} />
          </span>
          <span className="text-[12px] font-semibold text-zinc-900">{m.valid}</span>
        </motion.div>
        <div className="yl-float-card p-2.5">
          <span className="block text-xl font-semibold tabular-nums tracking-tight text-zinc-950">
            {412 + (i % 1000)}
          </span>
          <span className="block text-[11px] text-zinc-400">{m.entries}</span>
        </div>
      </div>
    </div>
  );
}

function CrmMini({ m }: { m: Mini }) {
  const counts = ["312", "180", "1,204", "96"];
  const colors = ["bg-amber-400", "bg-violet-500", "bg-emerald-500", "bg-rose-500"];
  return (
    <div className="w-full max-w-[270px] space-y-2">
      {m.segments.map((s, i) => (
        <motion.div
          key={s}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 + i * 0.1, duration: 0.5, ease: EASE }}
          className="yl-float-card flex items-center justify-between px-3 py-2"
        >
          <span className="flex items-center gap-2 text-[12.5px] font-medium text-zinc-800">
            <span className={cn("size-2 rounded-full", colors[i])} />
            {s}
          </span>
          <span className="text-[12px] font-semibold tabular-nums text-zinc-500">{counts[i]}</span>
        </motion.div>
      ))}
    </div>
  );
}

function MoneyMini({ m }: { m: Mini }) {
  const { ref, inView } = useLoop(1, 1000);
  return (
    <div ref={ref} className="w-full max-w-[270px]">
      <MiniCard className="space-y-3 p-4">
        {[
          { label: m.club, pct: 70, color: "bg-zinc-950", amount: "€3,150" },
          { label: m.organizer, pct: 30, color: "bg-[var(--yuno-red)]", amount: "€1,350" },
        ].map((r, i) => (
          <div key={r.label}>
            <div className="flex items-center justify-between text-[12px]">
              <span className="font-semibold text-zinc-900">{r.label}</span>
              <span className="tabular-nums text-zinc-500">
                {r.pct}% · <span className="font-semibold text-zinc-900">{r.amount}</span>
              </span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-100">
              <motion.div
                className={cn("h-full rounded-full", r.color)}
                initial={{ width: 0 }}
                animate={inView ? { width: `${r.pct}%` } : undefined}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.2, ease: EASE }}
              />
            </div>
          </div>
        ))}
        <div className="flex items-center gap-1.5 border-t border-zinc-100 pt-2.5 text-[11px] font-medium text-emerald-700">
          <Check className="size-3.5" strokeWidth={3} /> {m.approved}
        </div>
      </MiniCard>
    </div>
  );
}
