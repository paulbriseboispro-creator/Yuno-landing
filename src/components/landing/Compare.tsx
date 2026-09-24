import { Check, Minus, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { FadeIn, PrimaryCta, SectionHeader } from "./ui";

export function Compare() {
  const { t } = useLanding();
  const c = t.compare;
  return (
    <section id="compare" className="relative scroll-mt-20 bg-zinc-50 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={c.eyebrow} title={c.title} sub={c.sub} />

      <FadeIn className="mx-auto mt-14 max-w-5xl">
        <div className="yl-card overflow-hidden">
          <div className="hidden grid-cols-[170px_1.3fr_1fr] border-b border-zinc-100 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 md:grid">
            <div className="px-6 py-4">{c.colPlatform}</div>
            <div className="px-6 py-4">{c.colPays}</div>
            <div className="px-6 py-4">{c.colKeeps}</div>
          </div>
          {c.rows.map((r, i) => {
            const yuno = i === 0;
            // `you`: true = you keep them, false = the marketplace does,
            // null = not compared on this point (shown as a neutral dash).
            return (
              <FadeIn
                key={r.name}
                delay={i * 0.05}
                y={8}
                className={cn(
                  "relative grid grid-cols-1 gap-1 px-5 py-5 md:grid-cols-[170px_1.3fr_1fr] md:gap-0 md:px-0 md:py-0",
                  i > 0 && "border-t border-zinc-100",
                  yuno && "bg-[linear-gradient(90deg,rgba(232,25,44,0.06),rgba(232,25,44,0.015))]",
                )}
              >
                {yuno && (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[3px] bg-[var(--yuno-red)]"
                  />
                )}
                <div className="flex items-center gap-2 md:px-6 md:py-5">
                  <span
                    className={cn(
                      "text-[15px] font-semibold tracking-tight",
                      yuno ? "text-[var(--yuno-red)]" : "text-zinc-950",
                    )}
                  >
                    {r.name}
                  </span>
                </div>
                <div
                  className={cn(
                    "text-[14px] leading-relaxed md:px-6 md:py-5",
                    yuno ? "font-medium text-zinc-900" : "text-zinc-500",
                  )}
                >
                  {r.pays}
                </div>
                <div className="flex items-start gap-2 text-[14px] leading-relaxed md:px-6 md:py-5">
                  {r.you === true && (
                    <Check className="mt-1 size-3.5 shrink-0 text-emerald-600" strokeWidth={3} />
                  )}
                  {r.you === false && (
                    <Minus className="mt-1 size-3.5 shrink-0 text-zinc-300" strokeWidth={3} />
                  )}
                  <span
                    className={
                      r.you === true
                        ? "font-medium text-zinc-900"
                        : r.you === null
                          ? "text-zinc-300"
                          : "text-zinc-500"
                    }
                  >
                    {r.keeps}
                  </span>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div className="yl-keep yl-edge mt-6 flex flex-col items-start gap-5 rounded-2xl bg-zinc-950 p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
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
