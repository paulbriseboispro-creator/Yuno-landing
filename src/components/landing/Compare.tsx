import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  BarChart3,
  Check,
  Handshake,
  Landmark,
  Megaphone,
  Receipt,
  ScanLine,
  Ticket,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mark } from "@/content/landing";
import { useLanding } from "./context";
import { FadeIn, PrimaryCta, SectionHeader } from "./ui";

type Cell = { mark: Mark; note: string };

// One icon per area of the night in the all-in-one block (`compare.allInOne`).
const AREA_ICONS: Record<string, LucideIcon> = {
  sales: Ticket,
  ops: ScanLine,
  crm: Users,
  marketing: Megaphone,
  finance: Landmark,
  accounting: Receipt,
  collab: Handshake,
  insight: BarChart3,
};

// Yuno's column keeps a faint red wash in both themes.
const YUNO_TINT = "bg-[rgba(232,25,44,0.06)]";
// Phone table: feature label, then one narrow mark column per platform.
const MOBILE_COLS = "grid-cols-[minmax(0,1fr)_4rem_4.75rem]";

function MarkIcon({ mark, lg }: { mark: Mark; lg?: boolean }) {
  const box = lg ? "size-7" : "size-5";
  const glyph = lg ? "size-3.5" : "size-3";
  if (mark === "yes")
    return (
      <span
        className={cn(
          "grid shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600",
          box,
        )}
      >
        <Check className={glyph} strokeWidth={3.5} />
      </span>
    );
  if (mark === "partial")
    return (
      <span className={cn("grid shrink-0 place-items-center rounded-full bg-amber-50", box)}>
        <span
          className={cn(
            "rounded-full border-2 border-[#f59e0b] bg-[linear-gradient(90deg,#f59e0b_50%,transparent_50%)]",
            lg ? "size-3" : "size-2.5",
          )}
        />
      </span>
    );
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-400", box)}
    >
      <X className={glyph} strokeWidth={3} />
    </span>
  );
}

function MarkCell({ cell, strong }: { cell: Cell; strong?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <MarkIcon mark={cell.mark} />
      {cell.note && (
        <span
          className={cn(
            "text-[12px] leading-snug",
            strong ? "font-medium text-zinc-700" : "text-zinc-500",
          )}
        >
          {cell.note}
        </span>
      )}
    </div>
  );
}

const fullyCovered = (cells: Cell[]) => cells.filter((c) => c.mark === "yes").length;

export function Compare() {
  const { t } = useLanding();
  const c = t.compare;
  const [sel, setSel] = useState(0);
  const them = c.competitors[sel];
  const total = c.features.length;
  const cols = {
    gridTemplateColumns: `minmax(220px,1.35fr) repeat(${c.competitors.length + 1}, minmax(0,1fr))`,
  };

  return (
    <section
      data-ph-section="compare"
      id="compare"
      className="relative scroll-mt-20 bg-zinc-50 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={c.eyebrow} title={c.title} sub={c.sub} />

      <FadeIn className="mx-auto mt-10 max-w-6xl sm:mt-12">
        {/* Competitor picker — drives the highlighted column on desktop. Phones
            get the same tabs inside the sticky head of their table. */}
        <div className="hidden flex-col items-center gap-3 lg:flex">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            {c.pick}
          </span>
          <div
            role="tablist"
            className="inline-flex max-w-full gap-1 overflow-x-auto rounded-full border border-zinc-200 bg-white p-1 shadow-[0_1px_2px_rgba(10,10,11,0.04)]"
          >
            {c.competitors.map((comp, i) => {
              const on = i === sel;
              return (
                <button
                  key={comp.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setSel(i)}
                  className={cn(
                    "relative shrink-0 rounded-full px-3 py-2 text-[13px] font-medium transition-colors sm:px-4",
                    on ? "text-white" : "text-zinc-600 hover:text-zinc-950",
                  )}
                >
                  {on && (
                    <motion.span
                      layoutId="compare-pill"
                      className="absolute inset-0 rounded-full bg-zinc-950"
                      transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">{comp.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop: the whole market at a glance. */}
        <div className="yl-card mt-8 hidden overflow-hidden lg:block">
          <div className="grid" style={cols}>
            <div className="border-b border-zinc-100" />
            <div className={cn("relative border-b border-zinc-100 px-4 py-5", YUNO_TINT)}>
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[var(--yuno-red)]" />
              <div className="text-[15px] font-semibold tracking-tight text-[var(--yuno-red)]">
                {c.yuno.name}
              </div>
              <div className="mt-0.5 text-[11px] leading-snug text-zinc-500">{c.yuno.kind}</div>
              <div className="mt-2 text-[11px] font-semibold text-zinc-900">
                {fullyCovered(c.yuno.cells)}/{total} {c.covered}
              </div>
            </div>
            {c.competitors.map((comp, i) => (
              <button
                key={comp.name}
                type="button"
                onClick={() => setSel(i)}
                className={cn(
                  "border-b border-zinc-100 px-4 py-5 text-left transition-colors",
                  i === sel ? "bg-zinc-100/70" : "hover:bg-zinc-50",
                )}
              >
                <div className="text-[15px] font-semibold tracking-tight text-zinc-950">
                  {comp.name}
                </div>
                <div className="mt-0.5 text-[11px] leading-snug text-zinc-500">{comp.kind}</div>
                <div className="mt-2 text-[11px] font-medium text-zinc-400">
                  {fullyCovered(comp.cells)}/{total} {c.covered}
                </div>
              </button>
            ))}

            {c.features.map((feature, r) => (
              <div key={feature} className="contents">
                <div className="border-b border-zinc-100 px-6 py-4 text-[14px] font-medium leading-snug text-zinc-900">
                  {feature}
                </div>
                <div className={cn("border-b border-zinc-100 px-4 py-4", YUNO_TINT)}>
                  <MarkCell cell={c.yuno.cells[r]} strong />
                </div>
                {c.competitors.map((comp, i) => (
                  <div
                    key={comp.name}
                    className={cn(
                      "border-b border-zinc-100 px-4 py-4 transition-colors",
                      i === sel && "bg-zinc-100/70",
                    )}
                  >
                    <MarkCell cell={comp.cells[r]} />
                  </div>
                ))}
              </div>
            ))}

            <div className="px-6 py-5 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {c.costLabel}
            </div>
            <div
              className={cn(
                "px-4 py-5 text-[12px] font-medium leading-snug text-zinc-900",
                YUNO_TINT,
              )}
            >
              {c.yuno.cost}
            </div>
            {c.competitors.map((comp, i) => (
              <div
                key={comp.name}
                className={cn(
                  "px-4 py-5 text-[12px] leading-snug text-zinc-500 transition-colors",
                  i === sel && "bg-zinc-100/70",
                )}
              >
                {comp.cost}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & tablet: Yuno head-to-head with the picked platform. A real
            table (feature · Yuno · them), whose head — tabs + column names —
            sticks under the nav while you scroll the rows. `overflow-clip`
            (not hidden) keeps the sticky head working. */}
        <p className="mt-8 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400 lg:hidden">
          {c.pick}
        </p>
        <div className="yl-card mt-3 overflow-clip lg:hidden">
          <div className="sticky top-[4.25rem] z-10 border-b border-zinc-100 bg-white">
            <div className="px-3 pt-3">
              <div
                role="tablist"
                className="grid gap-1 rounded-full bg-zinc-100 p-1"
                style={{ gridTemplateColumns: `repeat(${c.competitors.length}, minmax(0,1fr))` }}
              >
                {c.competitors.map((comp, i) => {
                  const on = i === sel;
                  return (
                    <button
                      key={comp.name}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setSel(i)}
                      className={cn(
                        "relative h-9 truncate rounded-full px-0.5 text-[12px] font-semibold tracking-tight transition-colors min-[360px]:text-[13px]",
                        on ? "text-zinc-950" : "text-zinc-500",
                      )}
                    >
                      {on && (
                        <motion.span
                          layoutId="compare-pill-mobile"
                          className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(10,10,11,0.12)]"
                          transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
                        />
                      )}
                      <span className="relative">{comp.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className={cn("mt-2 grid items-end", MOBILE_COLS)}>
              <div className="pb-2.5 pl-4 text-[11px] leading-tight text-zinc-400">{c.covered}</div>
              <div className={cn("relative px-1 pb-2.5 pt-2 text-center", YUNO_TINT)}>
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] bg-[var(--yuno-red)]"
                />
                <div className="truncate text-[13px] font-semibold text-[var(--yuno-red)]">
                  {c.yuno.name}
                </div>
                <div className="text-[12px] font-semibold tabular-nums text-zinc-900">
                  {fullyCovered(c.yuno.cells)}/{total}
                </div>
              </div>
              <div className="px-1 pb-2.5 pt-2 text-center">
                <div className="truncate text-[11.5px] font-semibold tracking-tight text-zinc-950 min-[360px]:text-[12.5px]">
                  {them.name}
                </div>
                <div className="text-[12px] font-medium tabular-nums text-zinc-400">
                  {fullyCovered(them.cells)}/{total}
                </div>
              </div>
            </div>
          </div>

          {c.features.map((feature, r) => {
            const mine = c.yuno.cells[r];
            const theirs = them.cells[r];
            return (
              <div key={feature} className="border-b border-zinc-100 last:border-b-0">
                <div className={cn("grid items-stretch", MOBILE_COLS)}>
                  <div className="py-3.5 pl-4 pr-2 text-[14px] font-medium leading-snug text-zinc-900">
                    {feature}
                  </div>
                  <div className="grid place-items-center">
                    <MarkIcon mark={mine.mark} lg />
                  </div>
                  <div className="grid place-items-center">
                    <MarkIcon mark={theirs.mark} lg />
                  </div>
                </div>
                {(mine.note || theirs.note) && (
                  <dl className="space-y-1 px-4 pb-3.5 text-[12.5px] leading-snug">
                    {mine.note && (
                      <div className="flex gap-1.5">
                        <dt className="shrink-0 font-semibold text-[var(--yuno-red)]">
                          {c.yuno.name}
                        </dt>
                        <dd className="text-zinc-700">{mine.note}</dd>
                      </div>
                    )}
                    {theirs.note && (
                      <div className="flex gap-1.5">
                        <dt className="shrink-0 font-semibold text-zinc-900">{them.name}</dt>
                        <dd className="text-zinc-500">{theirs.note}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>
            );
          })}

          <div className="border-t border-zinc-100 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {c.costLabel}
            </div>
            <div className={cn("mt-2.5 rounded-xl p-3", YUNO_TINT)}>
              <div className="text-[13px] font-semibold text-[var(--yuno-red)]">{c.yuno.name}</div>
              <p className="mt-0.5 text-[13px] leading-snug text-zinc-900">{c.yuno.cost}</p>
            </div>
            <div className="mt-2 rounded-xl bg-zinc-50 p-3">
              <div className="text-[13px] font-semibold text-zinc-950">{them.name}</div>
              <p className="mt-0.5 text-[13px] leading-snug text-zinc-500">{them.cost}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-zinc-500">
          {(["yes", "partial", "no"] as const).map((m) => (
            <span key={m} className="inline-flex items-center gap-1.5">
              <MarkIcon mark={m} />
              {c.legend[m]}
            </span>
          ))}
        </div>

        {/* Not one more ticketing tool: every part of the night in one account. */}
        <div className="yl-keep yl-edge mt-10 rounded-[1.5rem] bg-zinc-950 p-5 text-white sm:p-6 md:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-balance text-[22px] font-semibold leading-tight tracking-tight md:text-[28px]">
                {c.allInOne.title}
              </h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-zinc-400">
                {c.allInOne.sub}
              </p>
            </div>
            <PrimaryCta className="w-full shrink-0 bg-white text-zinc-950 hover:bg-zinc-100 sm:w-auto sm:self-start md:self-auto">
              {t.hero.primary}
            </PrimaryCta>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden bg-white/10 sm:mt-8 sm:grid-cols-2 sm:rounded-2xl lg:grid-cols-4">
            {c.allInOne.items.map((item) => {
              const Icon = AREA_ICONS[item.id] ?? Check;
              return (
                <div key={item.id} className="flex gap-3.5 bg-zinc-950 px-1 py-3.5 sm:block sm:p-5">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[rgba(232,25,44,0.16)]">
                    <Icon className="size-[18px] text-[var(--yuno-red)]" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold tracking-tight sm:mt-4">
                      {item.title}
                    </div>
                    <p className="mt-0.5 text-[13px] leading-snug text-zinc-400 sm:mt-1 sm:leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">{c.footnote}</p>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          {c.more.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                data-ph-cta="compare_page"
                className="group inline-flex items-center gap-1.5 text-[13.5px] font-medium text-zinc-900 underline decoration-zinc-300 underline-offset-4 transition-colors hover:decoration-zinc-900"
              >
                {l.label}
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
