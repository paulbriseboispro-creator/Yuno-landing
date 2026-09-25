import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Check, Crown, Martini, MousePointer2, QrCode, Ticket, Wine, X } from "lucide-react";
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
    <section
      data-ph-section="pillars"
      id="product"
      className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} className="max-w-3xl" />
      <div className="mx-auto mt-14 grid max-w-6xl grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {p.items.map((it, i) => (
          <FadeIn key={it.id} delay={(i % 3) * 0.08}>
            <article className="yl-card group h-full overflow-hidden transition-[transform,box-shadow] duration-500 hover:-translate-y-1 hover:shadow-[0_1px_2px_rgba(10,10,11,0.04),0_24px_48px_-20px_rgba(10,10,11,0.18)]">
              <div className="relative h-60 overflow-hidden border-b border-zinc-100 bg-zinc-50">
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

// VIP floor plan: a guest picks a free table, sees its zone and price, pays
// the deposit — the table turns booked and the bottles are pre-ordered.
type FloorTable = {
  n: number;
  x: number;
  y: number;
  w: number;
  h: number;
  zone: string;
  round?: boolean;
};
const FLOOR: FloorTable[] = [
  { n: 1, x: 3, y: 4, w: 21, h: 24, zone: "Gold" },
  { n: 2, x: 76, y: 4, w: 21, h: 24, zone: "Gold" },
  { n: 3, x: 3, y: 38, w: 21, h: 24, zone: "Silver" },
  { n: 4, x: 76, y: 38, w: 21, h: 24, zone: "Silver" },
  { n: 5, x: 8, y: 74, w: 13, h: 22, zone: "Bronze", round: true },
  { n: 6, x: 31, y: 74, w: 13, h: 22, zone: "Bronze", round: true },
  { n: 7, x: 56, y: 74, w: 13, h: 22, zone: "Bronze", round: true },
  { n: 8, x: 79, y: 74, w: 13, h: 22, zone: "Bronze", round: true },
];
const FLOOR_PRICE: Record<string, string> = { Gold: "€800", Silver: "€500", Bronze: "€300" };
const ALREADY_BOOKED = [2, 6];
const TARGETS = [0, 4, 3, 7];

function TablesMini({ m }: { m: Mini }) {
  const { ref, i: k } = useLoop(TARGETS.length * 3, 950);
  const ti = Math.floor(k / 3);
  const phase = k % 3; // 0 = cursor travels, 1 = table picked, 2 = deposit paid
  const target = FLOOR[TARGETS[ti]];
  const booked = new Set([...ALREADY_BOOKED, ...TARGETS.slice(0, ti)]);
  if (phase === 2) booked.add(TARGETS[ti]);
  const cx = target.x + target.w / 2;
  const cy = target.y + target.h / 2;

  return (
    <div ref={ref} className="relative w-full max-w-[300px] pb-5">
      <div className="yl-float-card p-3">
        <div className="mb-2.5 flex items-center justify-between text-[10.5px] font-medium text-zinc-400">
          <span className="flex items-center gap-1.5 font-semibold text-zinc-600">
            <span className="relative flex size-1.5">
              <span className="yl-pulse-ring absolute inset-0 rounded-full bg-emerald-400" />
              <span className="relative size-1.5 rounded-full bg-emerald-500" />
            </span>
            {m.hostLive}
          </span>
          <span className="flex items-center gap-2.5">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-[3px] bg-[var(--yuno-red)]" />
              {m.booked}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-[3px] border border-zinc-300" />
              {m.available}
            </span>
          </span>
        </div>

        <div className="relative h-[150px]">
          {/* DJ booth with a live equalizer */}
          <div className="yl-keep absolute left-[30%] right-[30%] top-0 flex h-[22px] items-center justify-center gap-1.5 rounded-md bg-zinc-950">
            <span className="flex h-2.5 items-end gap-[2px]">
              {[0, 1, 2, 3].map((b) => (
                <span
                  key={b}
                  className="yl-eq w-[2px] rounded-full bg-[var(--yuno-red)]"
                  style={
                    {
                      height: "100%",
                      "--dur": `${0.6 + b * 0.17}s`,
                      "--delay": `${-b * 0.2}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </span>
            <span className="text-[8.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {m.dj}
            </span>
          </div>
          {/* Dance floor */}
          <div className="absolute left-[30%] right-[30%] top-[24%] flex h-[42%] items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-[repeating-linear-gradient(45deg,transparent_0_6px,var(--color-zinc-100)_6px_7px)]">
            <span className="rounded bg-white/80 px-1 text-[8.5px] font-medium uppercase tracking-[0.14em] text-zinc-400">
              {m.dancefloor}
            </span>
          </div>

          {FLOOR.map((tb, idx) => {
            const on = booked.has(idx);
            const picked = idx === TARGETS[ti] && phase >= 1;
            return (
              <motion.div
                key={tb.n}
                className={cn(
                  "absolute flex items-center justify-center border text-[9.5px] font-semibold",
                  tb.round ? "rounded-full" : "rounded-lg",
                )}
                style={{ left: `${tb.x}%`, top: `${tb.y}%`, width: `${tb.w}%`, height: `${tb.h}%` }}
                animate={{
                  backgroundColor: on
                    ? "#E8192C"
                    : picked
                      ? "rgba(232,25,44,0.1)"
                      : "rgba(0,0,0,0)",
                  color: on ? "#ffffff" : picked ? "#E8192C" : "#a1a1aa",
                  borderColor:
                    on || picked
                      ? "#E8192C"
                      : tb.zone === "Gold"
                        ? "rgba(245,158,11,0.55)"
                        : "rgba(161,161,170,0.4)",
                  scale: picked && phase === 1 ? 1.08 : 1,
                }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {on ? <Check className="size-3" strokeWidth={3} /> : `T${tb.n}`}
                {tb.zone === "Gold" && !tb.round && (
                  <Crown
                    className={cn(
                      "absolute -right-1 -top-1 size-3 rounded-full p-[1.5px]",
                      on ? "bg-white text-amber-500" : "bg-amber-100 text-amber-600",
                    )}
                  />
                )}
                {/* bottles pop out when the deposit lands */}
                <AnimatePresence>
                  {idx === TARGETS[ti] && phase === 2 && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.6 }}
                      animate={{ opacity: 1, y: -14, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="absolute left-1/2 top-0 flex -translate-x-1/2 gap-0.5"
                    >
                      <Wine className="size-3 text-amber-500" />
                      <Wine className="size-3 text-amber-500" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* the guest's finger */}
          <motion.div
            className="pointer-events-none absolute z-10"
            animate={{ left: `${cx}%`, top: `${cy}%` }}
            transition={{ duration: 0.75, ease: EASE }}
          >
            <AnimatePresence>
              {phase === 1 && (
                <motion.span
                  key={`tap-${k}`}
                  initial={{ opacity: 0.6, scale: 0.4 }}
                  animate={{ opacity: 0, scale: 2.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute -left-3 -top-3 size-6 rounded-full bg-[var(--yuno-red)]"
                />
              )}
            </AnimatePresence>
            <MousePointer2
              className="relative size-4 fill-zinc-950 text-white drop-shadow"
              strokeWidth={1.5}
            />
          </motion.div>
        </div>
      </div>

      {/* booking toast */}
      <div className="absolute bottom-0 left-1/2 w-max -translate-x-1/2">
        <AnimatePresence mode="wait">
          {phase === 2 ? (
            <motion.div
              key={`paid-${ti}`}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="flex items-center gap-1.5 rounded-full bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-[#fff] shadow-lg"
            >
              <Check className="size-3" strokeWidth={3} /> {m.deposit} · +2 {m.bottles}
            </motion.div>
          ) : (
            <motion.div
              key={`pick-${ti}`}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="yl-keep flex items-center gap-1.5 rounded-full bg-zinc-950 px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg"
            >
              <Crown className="size-3 text-amber-400" />T{target.n} · {target.zone} · 6 {m.guests}{" "}
              · {FLOOR_PRICE[target.zone]}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Bartender queue: orders paid from the table QR land on top, move through
// pending → prepping → ready, then leave once picked up.
const DRINK_PRICES = ["€18", "€11", "€16", "€120", "€10", "€15"];
const STATUS_PROGRESS = ["18%", "62%", "100%"];

function BarMini({ m }: { m: Mini }) {
  const { ref, i: n } = useLoop(10_000, 1700);
  const states = [
    { label: m.pending, cls: "bg-amber-100 text-amber-700", bar: "bg-amber-400" },
    { label: m.prepping, cls: "bg-sky-100 text-sky-700", bar: "bg-sky-500" },
    { label: m.ready, cls: "bg-emerald-100 text-emerald-700", bar: "bg-emerald-500" },
  ];
  // newest first: pending, prepping, ready
  const orders = [n + 2, n + 1, n].map((id, pos) => ({ id, status: 2 - pos }));

  return (
    <div ref={ref} className="w-full max-w-[290px]">
      <div className="mb-2 flex items-center justify-between px-1 text-[10.5px] font-medium text-zinc-400">
        <span className="flex items-center gap-1.5 font-semibold text-zinc-700">
          <Martini className="size-3.5 text-violet-600" />
          {m.barName}
        </span>
        <span className="tabular-nums">
          3 {m.queue} · {m.avgWait}
        </span>
      </div>
      <div className="relative h-[164px]">
        <AnimatePresence initial={false} mode="popLayout">
          {orders.map((o) => {
            const st = states[o.status];
            const drink = m.drinks[o.id % m.drinks.length];
            const source = o.id % 2 ? `${m.table} ${((o.id * 5) % 12) + 1}` : m.atBar;
            return (
              <motion.div
                key={o.id}
                layout
                initial={{ opacity: 0, y: -18, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, transition: { duration: 0.35 } }}
                transition={{ duration: 0.45, ease: EASE }}
                className={cn(
                  "yl-float-card relative mb-1.5 overflow-hidden px-3 py-2",
                  o.status === 2 && "border-emerald-300/60",
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-violet-50">
                    <QrCode className="size-3.5 text-violet-600" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12.5px] font-semibold text-zinc-900">
                      {drink}
                    </span>
                    <span className="block truncate text-[10.5px] text-zinc-400">
                      #{1040 + o.id} · {source} · {DRINK_PRICES[o.id % DRINK_PRICES.length]}
                    </span>
                  </span>
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={o.status}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                        st.cls,
                      )}
                    >
                      {o.status === 2 ? `${m.pickup} ✓` : st.label}
                    </motion.span>
                  </AnimatePresence>
                </div>
                {o.status === 0 && (
                  <motion.span
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: 1.1, duration: 0.4 }}
                    className="absolute right-2 top-1 rounded-full bg-zinc-950 px-1.5 text-[8.5px] font-semibold text-white"
                  >
                    {m.paidWith}
                  </motion.span>
                )}
                <div className="absolute inset-x-0 bottom-0 h-[2px] bg-zinc-100">
                  <motion.div
                    className={cn("h-full", st.bar)}
                    initial={false}
                    animate={{ width: STATUS_PROGRESS[o.status] }}
                    transition={{ duration: 1.2, ease: EASE }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

// The door: one scanner for tickets, guest list and tables, duplicates
// explained, a live entry counter — and the shift logged in with a PIN.
const SCAN_TONE = [
  { ring: "#10B981", bg: "bg-emerald-500", Icon: Check },
  { ring: "#10B981", bg: "bg-emerald-500", Icon: Check },
  { ring: "#F59E0B", bg: "bg-amber-500", Icon: Crown },
  { ring: "#E8192C", bg: "bg-[var(--yuno-red)]", Icon: X },
];
// A fixed 7×7 QR-ish pattern (1 = dark module).
const QR = "1110111100100110111011010001011101001100101101110".split("");
const STAFF_TINT = ["#E8192C", "#F59E0B", "#8B5CF6"];

function DoorMini({ m }: { m: Mini }) {
  const { ref, i: k } = useLoop(10_000, 1300);
  const showing = k % 2 === 1;
  const scanIdx = Math.floor(k / 2) % 4;
  const scan = m.scans[scanIdx];
  const tone = SCAN_TONE[scanIdx];
  // entries only count on accepted scans (not duplicates): 3 per cycle of 4
  const done = Math.floor((k + 1) / 2);
  const entries = 412 + done - Math.floor(done / 4);
  const pct = Math.min(100, (entries / 600) * 100);

  return (
    <div ref={ref} className="flex w-full max-w-[300px] items-stretch gap-2.5">
      {/* the bouncer's phone — the app is dark in both themes */}
      <div className="yl-keep relative h-[196px] w-[112px] shrink-0 rounded-[22px] bg-zinc-950 p-[5px] shadow-[0_18px_40px_-16px_rgba(10,10,11,0.55)] ring-1 ring-zinc-900/10">
        <div className="relative flex h-full flex-col overflow-hidden rounded-[17px] bg-zinc-900">
          <div className="mx-auto mt-1.5 h-1 w-8 rounded-full bg-white/15" />
          <div className="mt-1.5 flex items-center justify-between px-2 text-[8px] font-medium text-white/50">
            <span>{m.staff[0].role}</span>
            <span className="tabular-nums">{entries}</span>
          </div>
          <div className="relative mx-auto mt-2 size-[78px]">
            {/* corner brackets */}
            {[
              "left-0 top-0 border-l-2 border-t-2 rounded-tl-md",
              "right-0 top-0 border-r-2 border-t-2 rounded-tr-md",
              "left-0 bottom-0 border-b-2 border-l-2 rounded-bl-md",
              "right-0 bottom-0 border-b-2 border-r-2 rounded-br-md",
            ].map((c) => (
              <motion.span
                key={c}
                className={cn("absolute size-3.5", c)}
                animate={{ borderColor: showing ? tone.ring : "rgba(255,255,255,0.85)" }}
                transition={{ duration: 0.2 }}
              />
            ))}
            <motion.div
              className="absolute inset-[11px] grid grid-cols-7 gap-[1.5px] rounded-sm bg-white p-[3px]"
              animate={{ scale: showing ? 0.92 : 1, opacity: showing ? 0.35 : 1 }}
              transition={{ duration: 0.25 }}
            >
              {QR.map((q, j) => (
                <span key={j} className={q === "1" ? "rounded-[1px] bg-zinc-900" : ""} />
              ))}
            </motion.div>
            {!showing && (
              <div className="yl-scan-line absolute inset-x-1 top-1 h-0.5 rounded-full bg-[var(--yuno-red)] shadow-[0_0_12px_2px_rgba(232,25,44,0.7)]" />
            )}
          </div>
          <AnimatePresence mode="wait">
            {showing && (
              <motion.div
                key={k}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%", transition: { duration: 0.2 } }}
                transition={{ duration: 0.3, ease: EASE }}
                className={cn("absolute inset-x-0 bottom-0 px-2 pb-2.5 pt-2", tone.bg)}
              >
                <span className="flex items-center gap-1 text-[10.5px] font-bold text-white">
                  <tone.Icon className="size-3" strokeWidth={3} /> {scan.status}
                </span>
                <span className="mt-0.5 block truncate text-[8.5px] font-medium text-white/85">
                  {scan.label}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="yl-float-card p-2.5">
          <div className="flex items-baseline justify-between">
            <motion.span
              key={entries}
              initial={{ y: -6, opacity: 0.4 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-[22px] font-semibold tabular-nums leading-none tracking-tight text-zinc-950"
            >
              {entries}
            </motion.span>
            <span className="text-[10px] tabular-nums text-zinc-400">/ 600</span>
          </div>
          <span className="mt-1 block text-[10.5px] text-zinc-400">{m.entries}</span>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-100">
            <motion.div
              className="h-full rounded-full bg-[var(--yuno-red)]"
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.5, ease: EASE }}
            />
          </div>
        </div>
        <div className="yl-float-card flex-1 p-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
              {m.staffTitle}
            </span>
            <span className="flex gap-[3px]" aria-hidden>
              {[0, 1, 2, 3].map((d) => (
                <span
                  key={d}
                  className={cn(
                    "size-[5px] rounded-full transition-colors duration-200",
                    d < k % 5 ? "bg-zinc-900" : "bg-zinc-200",
                  )}
                />
              ))}
            </span>
          </div>
          <ul className="mt-1.5 space-y-1">
            {m.staff.map((p, j) => (
              <li key={p.name} className="flex items-center gap-1.5">
                <span
                  className="flex size-[18px] shrink-0 items-center justify-center rounded-full text-[8.5px] font-bold text-[#fff]"
                  style={{ background: STAFF_TINT[j] }}
                >
                  {p.name[0]}
                </span>
                <span className="min-w-0 flex-1 truncate text-[11px] font-medium text-zinc-800">
                  {p.name}
                </span>
                <span className="shrink-0 truncate rounded-full bg-zinc-100 px-1.5 py-px text-[9px] font-medium text-zinc-500">
                  {p.role}
                </span>
                <span
                  className={cn(
                    "size-1.5 shrink-0 rounded-full",
                    j === 0 && !showing ? "animate-pulse bg-[var(--yuno-red)]" : "bg-emerald-500",
                  )}
                />
              </li>
            ))}
          </ul>
          <span className="mt-1.5 block text-[9px] text-zinc-400">{m.pinLogin}</span>
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
