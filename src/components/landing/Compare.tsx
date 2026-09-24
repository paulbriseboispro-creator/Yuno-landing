import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ShieldCheck, Trophy, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Mark } from "@/content/landing";
import { useLanding } from "./context";
import { EASE, FadeIn, PrimaryCta, SectionHeader } from "./ui";

type Cell = { mark: Mark; note: string };

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes")
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-600">
        <Check className="size-3" strokeWidth={3.5} />
      </span>
    );
  if (mark === "partial")
    return (
      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-amber-50">
        <span className="size-2.5 rounded-full border-2 border-amber-500 bg-[linear-gradient(90deg,#f59e0b_50%,transparent_50%)]" />
      </span>
    );
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-zinc-100 text-zinc-400">
      <X className="size-3" strokeWidth={3} />
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

  return (
    <section
      id="compare"
      className="relative scroll-mt-20 bg-[#fafafa] px-4 py-24 sm:px-6 md:py-32"
    >
      <SectionHeader eyebrow={c.eyebrow} title={c.title} sub={c.sub} />

      <FadeIn className="mx-auto mt-12 max-w-6xl">
        {/* Competitor picker — drives the highlighted column, the mobile
            head-to-head and the verdict card below. */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            {c.pick}
          </span>
          <div className="flex flex-wrap justify-center gap-2" role="tablist">
            {c.competitors.map((comp, i) => (
              <button
                key={comp.name}
                type="button"
                role="tab"
                aria-selected={i === sel}
                onClick={() => setSel(i)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-[13px] font-medium transition-colors",
                  i === sel
                    ? "border-zinc-950 bg-zinc-950 text-white"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900",
                )}
              >
                {comp.name}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: the whole market at a glance. */}
        <div className="yl-card mt-8 hidden overflow-hidden lg:block">
          <div className="grid grid-cols-[minmax(220px,1.35fr)_repeat(6,minmax(0,1fr))]">
            <div className="border-b border-zinc-100" />
            <div className="relative border-b border-zinc-100 bg-[rgba(232,25,44,0.05)] px-4 py-5">
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
                <div className="border-b border-zinc-100 bg-[rgba(232,25,44,0.05)] px-4 py-4">
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
            <div className="bg-[rgba(232,25,44,0.05)] px-4 py-5 text-[12px] font-medium leading-snug text-zinc-900">
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

        {/* Mobile & tablet: Yuno head-to-head with the picked platform. */}
        <div className="yl-card mt-8 overflow-hidden lg:hidden">
          <div className="grid grid-cols-2 border-b border-zinc-100">
            <div className="relative bg-[rgba(232,25,44,0.05)] px-4 py-4">
              <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] bg-[var(--yuno-red)]" />
              <div className="text-[15px] font-semibold text-[var(--yuno-red)]">{c.yuno.name}</div>
              <div className="mt-1 text-[11px] font-semibold text-zinc-900">
                {fullyCovered(c.yuno.cells)}/{total} {c.covered}
              </div>
            </div>
            <div className="px-4 py-4">
              <div className="text-[15px] font-semibold text-zinc-950">{them.name}</div>
              <div className="mt-1 text-[11px] font-medium text-zinc-400">
                {fullyCovered(them.cells)}/{total} {c.covered}
              </div>
            </div>
          </div>
          {c.features.map((feature, r) => (
            <div key={feature} className="border-b border-zinc-100 last:border-b-0">
              <div className="px-4 pt-4 text-[13px] font-medium text-zinc-900">{feature}</div>
              <div className="grid grid-cols-2">
                <div className="px-4 pb-4 pt-2">
                  <MarkCell cell={c.yuno.cells[r]} strong />
                </div>
                <div className="px-4 pb-4 pt-2">
                  <MarkCell cell={them.cells[r]} />
                </div>
              </div>
            </div>
          ))}
          <div className="border-t border-zinc-100 px-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
            {c.costLabel}
          </div>
          <div className="grid grid-cols-2">
            <div className="px-4 pb-4 pt-2 text-[12px] font-medium leading-snug text-zinc-900">
              {c.yuno.cost}
            </div>
            <div className="px-4 pb-4 pt-2 text-[12px] leading-snug text-zinc-500">{them.cost}</div>
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

        {/* Verdict: a fair word on the picked platform, then Yuno's edge. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={them.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-8 grid gap-4 md:grid-cols-[1fr_1.6fr]"
          >
            <div className="yl-card p-6">
              <div className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                {c.strongLabel} · {them.name}
              </div>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-zinc-600">
                {them.strong}
              </p>
            </div>
            <div className="yl-card relative overflow-hidden p-6">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-[3px] bg-[var(--yuno-red)]"
              />
              <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--yuno-red)]">
                <Trophy className="size-3.5" />
                {c.winLabel}
              </div>
              <p className="mt-3 text-pretty text-[15px] font-medium leading-relaxed text-zinc-900">
                {them.win}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex flex-col items-start gap-5 rounded-2xl bg-zinc-950 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div className="flex gap-4">
            <ShieldCheck className="mt-0.5 size-6 shrink-0 text-[var(--yuno-red)]" />
            <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-zinc-300">
              {c.extra}
            </p>
          </div>
          <PrimaryCta className="shrink-0 bg-white text-zinc-950 hover:bg-zinc-100">
            {t.hero.primary}
          </PrimaryCta>
        </div>
        <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">{c.footnote}</p>
      </FadeIn>
    </section>
  );
}
