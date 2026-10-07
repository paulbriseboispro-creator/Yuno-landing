import { useId, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  ArrowDown,
  CalendarDays,
  CreditCard,
  Download,
  Eye,
  MousePointerClick,
  Repeat,
  Search,
  Send,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCrm } from "./content";
import { Accent, Avatar, CtaButton, Marquee, Reveal, StatusTag, useFmt } from "./ui";

// The reference's big night block: "Instagram already knows who will buy" →
// "Your tickets already know who comes back. Now you do too." A live customer
// file on a red halo, the crosshair frame lines, then three rows of feature
// chips drifting in opposite directions and the CTA.

const DOTS = ["#E3141B", "#FF6B35", "#17A34A", "#E59A0B", "#FF948D", "#F7F2F1"];

// The funnel above the customer file: where email recipients stop (the Console's
// customer journey), then
// who the customers are. Numbers are the demo club's (Le Bunker), not real data.
const FUNNEL = {
  counts: [11655, 6593, 1117, 406, 29],
  pcts: [100, 57, 17, 36, 7],
  drops: [43, 83, 64, 93],
  worst: 1,
  heights: [0.96, 0.86, 0.46, 0.38, 0.34],
};
const FUNNEL_ICONS = [Eye, CalendarDays, MousePointerClick, CreditCard, Repeat];

function funnelPath() {
  const W = 1000;
  const H = 100;
  const w = 46;
  const half = FUNNEL.heights.map((h) => (h * H) / 2);
  const cy = H / 2;
  let top = `M0 ${cy - half[0]}`;
  let bottom = `L${W} ${cy + half[4]}`;
  for (let i = 0; i < 4; i++) {
    const b = (W / 5) * (i + 1);
    top += ` L${b - w} ${cy - half[i]} C${b} ${cy - half[i]} ${b} ${cy - half[i + 1]} ${b + w} ${cy - half[i + 1]}`;
  }
  top += ` L${W} ${cy - half[4]}`;
  for (let i = 3; i >= 0; i--) {
    const b = (W / 5) * (i + 1);
    bottom += ` L${b + w} ${cy + half[i + 1]} C${b} ${cy + half[i + 1]} ${b} ${cy + half[i]} ${b - w} ${cy + half[i]}`;
  }
  return `${top} ${bottom} L0 ${cy + half[0]} Z`;
}

function Funnel() {
  const f = useCrm().night.funnel;
  const { num, pct } = useFmt();
  const [sel, setSel] = useState(FUNNEL.worst);
  const id = useId();
  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-yc-display text-[24px] font-semibold tracking-[-0.025em] text-yc-ink">
            {f.title}
          </div>
          <div className="mt-0.5 text-[13.5px] text-yc-sand-500">{f.sub}</div>
        </div>
        <span className="hidden items-center gap-1.5 text-[13px] text-yc-sand-500 sm:flex">
          <Sparkles className="size-3.5" />
          {f.hint}
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3 rounded-[16px] bg-yc-red-50 px-4 py-3 text-[14px] font-medium text-yc-ink">
        <span className="size-2 flex-none rounded-full bg-yc-red-500" />
        {f.insight}
      </div>
      <div className="mt-6 overflow-x-auto">
        <div className="relative min-w-[760px]">
          <div
            aria-hidden
            className="absolute inset-y-0 w-1/5 rounded-[18px] border border-yc-red-200 bg-yc-red-50/70 transition-[left] duration-300"
            style={{ left: `${sel * 20}%` }}
          />
          <svg
            aria-hidden
            viewBox="0 0 1000 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-[72px] z-10 h-[190px] w-full"
          >
            <defs>
              <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stopColor="#E3141B" />
                <stop offset="0.79" stopColor="#FF3A30" />
                <stop offset="0.8" stopColor="#FF9A8A" />
                <stop offset="1" stopColor="#FF9A8A" />
              </linearGradient>
            </defs>
            <path d={funnelPath()} fill={`url(#${id})`} />
          </svg>
          <div className="relative z-20 grid grid-cols-5">
            {f.steps.map((st, i) => {
              const Icon = FUNNEL_ICONS[i];
              const on = sel === i;
              return (
                <button
                  key={st.label}
                  type="button"
                  onClick={() => setSel(i)}
                  aria-pressed={on}
                  className="flex flex-col items-center px-2 pb-4 text-center"
                >
                  <span className="mt-4 flex h-[56px] flex-col items-center gap-1.5">
                    <span
                      className={cn(
                        "flex size-[30px] items-center justify-center rounded-full transition-colors",
                        on ? "bg-yc-ink text-white" : "bg-yc-sand-100 text-yc-ink",
                      )}
                    >
                      <Icon className="size-4" />
                    </span>
                    <span className="text-[14px] font-semibold text-yc-ink">{st.label}</span>
                  </span>
                  <span className="flex h-[198px] flex-col items-center justify-center text-white">
                    <span className="font-yc-display text-[26px] font-semibold tracking-[-0.02em]">
                      {pct(FUNNEL.pcts[i])}
                    </span>
                    <span className="text-[12.5px] opacity-90">{st.cap}</span>
                  </span>
                  <span className="font-yc-display text-[28px] font-semibold tracking-[-0.02em] text-yc-ink">
                    {num(FUNNEL.counts[i])}
                  </span>
                  <span className="mt-0.5 max-w-[170px] text-[12.5px] leading-4 text-yc-sand-500">
                    {st.count}
                  </span>
                </button>
              );
            })}
          </div>
          {FUNNEL.drops.map((d, i) => (
            <span
              key={i}
              className={cn(
                "absolute top-[167px] z-30 -translate-x-1/2 rounded-full px-2.5 py-1 text-[12px] font-semibold shadow-sm",
                i === FUNNEL.worst ? "bg-yc-ink text-white" : "bg-white text-yc-ink",
              )}
              style={{ left: `${(i + 1) * 20}%` }}
            >
              −{pct(d)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// Phones: the same funnel read top to bottom. Each bar is the share of the
// step before it (57 % of visitors opened a night…), the drop sits between two
// steps, the worst one in black. Tap a step for its sentence.
function FunnelPhone() {
  const f = useCrm().night.funnel;
  const { num, pct } = useFmt();
  const [sel, setSel] = useState(FUNNEL.worst);
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div className="p-5 pb-9">
      <div className="font-yc-display text-[21px] font-semibold tracking-[-0.025em] text-yc-ink">
        {f.title}
      </div>
      <div className="mt-0.5 text-[12.5px] text-yc-sand-500">{f.sub}</div>
      <div className="mt-4 flex gap-2.5 rounded-[14px] bg-yc-red-50 px-3.5 py-3 text-[13px] font-medium leading-[1.45] text-yc-ink">
        <span className="mt-[6px] size-1.5 flex-none rounded-full bg-yc-red-500" />
        {f.insight}
      </div>
      <ol ref={ref} className="mt-4">
        {f.steps.map((st, i) => {
          const Icon = FUNNEL_ICONS[i];
          const on = sel === i;
          return (
            <li key={st.label}>
              {i > 0 && (
                <div className="flex justify-center py-1.5" aria-hidden>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[11px] font-semibold",
                      i - 1 === FUNNEL.worst
                        ? "bg-yc-ink text-white"
                        : "bg-yc-sand-100 text-yc-sand-600",
                    )}
                  >
                    −{pct(FUNNEL.drops[i - 1])}
                  </span>
                </div>
              )}
              <button
                type="button"
                onClick={() => setSel(i)}
                aria-pressed={on}
                className={cn(
                  "w-full rounded-[16px] border px-3.5 py-3 text-left transition-colors duration-300",
                  on ? "border-yc-red-200 bg-yc-red-50/70" : "border-yc-sand-200 bg-white",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid size-8 flex-none place-items-center rounded-full transition-colors",
                      on ? "bg-yc-ink text-white" : "bg-yc-sand-100 text-yc-ink",
                    )}
                  >
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold leading-[18px] text-yc-ink">
                      {st.label}
                    </span>
                    <span className="block text-[12px] leading-4 text-yc-sand-500">
                      {i === 0 ? st.cap : `${pct(FUNNEL.pcts[i])} ${st.cap}`}
                    </span>
                  </span>
                  <span className="font-yc-display text-[22px] font-semibold tabular-nums tracking-[-0.02em] text-yc-ink">
                    {num(FUNNEL.counts[i])}
                  </span>
                </span>
                <span className="mt-2.5 block h-1.5 overflow-hidden rounded-full bg-yc-sand-100">
                  <span
                    className="block h-full rounded-full"
                    style={{
                      width: inView ? `${FUNNEL.pcts[i]}%` : "0%",
                      background: i === 4 ? "#FF9A8A" : "var(--gradient-brand)",
                      transition: `width 1s cubic-bezier(.22,1,.36,1) ${0.1 + i * 0.08}s`,
                    }}
                  />
                </span>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.span
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block overflow-hidden"
                    >
                      <span className="block pt-2 text-[12.5px] text-yc-sand-600">{st.count}</span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// Phones: the customer file as a list (no table to swipe sideways), five people
// per filter, and the action the desktop shows as a floating chip.
function ClientsPhone() {
  const t = useCrm().night.table;
  const { num } = useFmt();
  const [f, setF] = useState(0);
  const tones: (null | string[])[] = [null, ["hot"], ["new"], ["cold"]];
  const rows = t.rows.filter((r) => !tones[f] || tones[f]!.includes(r.tone)).slice(0, 5);
  return (
    <div className="px-5 pb-5 pt-8">
      <div className="font-yc-display text-[21px] font-semibold tracking-[-0.025em] text-yc-ink">
        {t.title}
      </div>
      <div className="mt-0.5 text-[12.5px] text-yc-sand-500">{t.sub}</div>
      <div className="yc-swipe yc-swipe--start -mx-5 mt-4 gap-1.5 px-5">
        {t.filters.map((x, i) => (
          <button
            key={x}
            type="button"
            onClick={() => setF(i)}
            aria-pressed={f === i}
            className={cn(
              "h-8 whitespace-nowrap rounded-full px-3.5 text-[13px] font-semibold transition-colors",
              f === i ? "bg-yc-ink text-white" : "bg-yc-sand-100 text-yc-sand-600",
            )}
          >
            {x}
          </button>
        ))}
      </div>
      <ul className="mt-2">
        <AnimatePresence initial={false} mode="popLayout">
          {rows.map((r) => (
            <motion.li
              key={r.name}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 border-b border-yc-sand-100 py-2.5 last:border-0"
            >
              <Avatar ini={r.ini} tone={r.tone as "hot"} size={36} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold leading-[18px] text-yc-ink">
                  {r.name}
                </span>
                <span className="block truncate text-[12px] leading-4 text-yc-sand-500">
                  {num(r.nights)} {t.cols[1].toLowerCase()} · {r.last}
                </span>
              </span>
              <StatusTag tone={r.tone as "hot"}>{r.tag}</StatusTag>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="mt-3 flex items-center justify-between gap-3 rounded-full bg-yc-ink py-1.5 pl-4 pr-1.5 text-[13.5px] font-medium text-white">
        <span className="truncate">
          {t.filters[1]} · {num(1284)}
        </span>
        <span
          className="inline-flex h-8 flex-none items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Send className="size-3.5" />
          E-mail
        </span>
      </div>
    </div>
  );
}

function Bridge() {
  const label = useCrm().night.funnel.bridge;
  return (
    <div className="relative px-6 sm:px-8">
      <div className="border-t border-yc-sand-200" />
      <span className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-yc-sand-200 bg-white px-4 py-1.5 text-[13px] font-semibold text-yc-ink">
        <ArrowDown className="size-3.5 text-yc-red-500" />
        {label}
      </span>
    </div>
  );
}

function ClientsTable() {
  const t = useCrm().night.table;
  const { num } = useFmt();
  const [f, setF] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const tones: (null | string[])[] = [null, ["hot"], ["new"], ["cold"]];
  const rows = t.rows.filter((r) => !tones[f] || tones[f]!.includes(r.tone));
  return (
    <div ref={ref} className="relative bg-white text-left">
      <div className="hidden md:block">
        <Funnel />
      </div>
      <div className="md:hidden">
        <FunnelPhone />
      </div>
      <Bridge />
      <div className="md:hidden">
        <ClientsPhone />
      </div>
      <div className="hidden p-6 sm:p-8 md:block md:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-yc-display text-[24px] font-semibold tracking-[-0.025em] text-yc-ink">
              {t.title}
            </div>
            <div className="mt-0.5 text-[13.5px] text-yc-sand-500">{t.sub}</div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-9 w-[220px] items-center gap-2 rounded-full border border-yc-sand-200 bg-white px-3 text-[13.5px] text-yc-sand-400">
              <Search className="size-4" />
              {t.search}
            </span>
            <div className="inline-flex gap-0.5 rounded-full bg-yc-sand-100 p-[3px]">
              {t.filters.map((x, i) => (
                <button
                  key={x}
                  type="button"
                  onClick={() => setF(i)}
                  className={cn(
                    "h-[30px] rounded-full px-3.5 text-[13px] font-semibold transition-colors",
                    f === i ? "bg-yc-ink text-white" : "text-yc-sand-600 hover:text-yc-ink",
                  )}
                >
                  {x}
                </button>
              ))}
            </div>
            <span className="hidden h-9 items-center gap-1.5 rounded-full border border-yc-sand-200 px-3.5 text-[13.5px] font-semibold text-yc-ink sm:flex">
              <Download className="size-4" />
              {t.export}
            </span>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-0 text-[14px]">
            <thead>
              <tr>
                {t.cols.map((c, i) => (
                  <th
                    key={c}
                    className={cn(
                      "whitespace-nowrap border-b border-yc-sand-200 px-3.5 py-2.5 text-left font-yc-mono text-[11.5px] font-medium uppercase tracking-[0.05em] text-yc-sand-500",
                      (i === 1 || i === 2) && "text-right",
                    )}
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {rows.map((r, i) => (
                  <motion.tr
                    key={r.name}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 8 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, delay: inView ? i * 0.05 : 0 }}
                    className={cn(
                      "transition-colors hover:bg-yc-paper",
                      i === 1 && f === 0 && "bg-yc-red-50 hover:bg-yc-red-50",
                    )}
                  >
                    <td className="border-b border-yc-sand-100 px-3.5 py-3">
                      <span className="flex items-center gap-2.5">
                        <Avatar ini={r.ini} tone={r.tone as "hot"} size={34} />
                        <span className="flex flex-col">
                          <span className="whitespace-nowrap font-semibold leading-[18px] text-yc-ink">
                            {r.name}
                          </span>
                          <span className="text-[12.5px] leading-4 text-yc-red-600">{r.sub}</span>
                        </span>
                      </span>
                    </td>
                    <td className="border-b border-yc-sand-100 px-3.5 py-3 text-right font-medium tabular-nums text-yc-ink">
                      {num(r.nights)}
                    </td>
                    <td className="whitespace-nowrap border-b border-yc-sand-100 px-3.5 py-3 text-right text-yc-sand-700">
                      {r.last}
                    </td>
                    <td className="border-b border-yc-sand-100 px-3.5 py-3">
                      <span className="flex min-w-[130px] items-center gap-2.5">
                        <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-yc-sand-100">
                          <span
                            className="block h-full rounded-full"
                            style={{
                              width: inView ? `${r.score}%` : "0%",
                              background: "var(--gradient-brand)",
                              transition: `width 1s cubic-bezier(.22,1,.36,1) ${0.2 + i * 0.06}s`,
                            }}
                          />
                        </span>
                        <span className="w-6 text-right text-[13px] font-semibold tabular-nums text-yc-ink">
                          {r.score}
                        </span>
                      </span>
                    </td>
                    <td className="whitespace-nowrap border-b border-yc-sand-100 px-3.5 py-3 text-[13px] text-yc-sand-600">
                      {r.reach}
                    </td>
                    <td className="border-b border-yc-sand-100 px-3.5 py-3">
                      <StatusTag tone={r.tone as "hot"}>{r.tag}</StatusTag>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-3 rounded-full bg-yc-ink py-2 pl-5 pr-2 text-[14px] font-medium text-white shadow-[var(--shadow-md)] md:flex"
      >
        <span className="whitespace-nowrap">
          {t.filters[1]} · {num(1284)}
        </span>
        <span
          className="inline-flex h-8 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold"
          style={{ background: "var(--gradient-brand)" }}
        >
          <Send className="size-3.5" />
          E-mail
        </span>
      </motion.div>
    </div>
  );
}

export function CrmNight() {
  const n = useCrm().night;
  const frame = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: frame, offset: ["start end", "start 0.3"] });
  const scale = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0.9, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 60, 0]);

  return (
    <section id="fonctionnalites" data-ph-section="night" className="relative px-2 sm:px-4">
      <div className="yc-aura--night relative isolate overflow-hidden rounded-[32px] px-4 pb-14 pt-16 sm:rounded-[40px] sm:px-6 sm:pb-20 md:pt-64">
        {/* the reference's crosshair frame lines */}
        <div aria-hidden className="yc-gridlines hidden md:block">
          <i className="bottom-0 left-[20%] top-0 w-px" />
          <i className="bottom-0 right-[20%] top-0 w-px" />
          <i className="inset-x-0 top-[96px] h-px" />
          <i className="inset-x-0 bottom-[96px] h-px" />
          <span className="yc-plus" style={{ left: "20%", top: 96 }} />
          <span className="yc-plus" style={{ left: "80%", top: 96 }} />
          <span className="yc-plus" style={{ left: "20%", top: "calc(100% - 96px)" }} />
          <span className="yc-plus" style={{ left: "80%", top: "calc(100% - 96px)" }} />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(227,20,27,.45),rgba(255,107,53,.12)_55%,transparent)] blur-2xl"
        />

        <div className="mx-auto max-w-[840px] text-center">
          <Reveal>
            <h2 className="yc-h2 text-yc-on-night">
              <Accent text={n.title} accent={n.accent} />
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-5 max-w-[38rem] text-pretty text-[16px] leading-[1.6] text-yc-on-night-2 sm:mt-6 sm:text-[17px]">
              {n.sub}
            </p>
          </Reveal>
        </div>

        <motion.div
          ref={frame}
          style={{ scale, y }}
          className="relative mx-auto mt-10 max-w-[1080px] sm:mt-14"
        >
          <div
            className="overflow-hidden rounded-[28px]"
            style={{ boxShadow: "var(--shadow-halo)" }}
          >
            <ClientsTable />
          </div>
        </motion.div>

        <div className="mt-14 text-center sm:mt-20">
          <Reveal>
            <span className="text-[17px] font-medium text-yc-on-night">{n.chipsTitle}</span>
          </Reveal>
          <div className="mx-auto mt-6 flex max-w-[1000px] flex-col gap-2.5 sm:mt-7 sm:gap-3">
            {n.chips.map((row, r) => (
              <Marquee key={r} reverse={r % 2 === 1} duration={44 + r * 8} gap={12}>
                {row.map((chip, i) => (
                  <span
                    key={chip}
                    className="inline-flex flex-none items-center gap-2.5 whitespace-nowrap rounded-[12px] border border-white/10 bg-white/[.06] px-3.5 py-2 text-[14px] font-medium text-yc-on-night sm:px-4 sm:py-2.5 sm:text-[15px]"
                  >
                    <span
                      className="size-2.5 rounded-full"
                      style={{ background: DOTS[(i + r * 2) % DOTS.length] }}
                    />
                    {chip}
                  </span>
                ))}
              </Marquee>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-12 hidden justify-center sm:flex">
            <CtaButton size="lg" ring cta="night_crm">
              {n.cta}
            </CtaButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
