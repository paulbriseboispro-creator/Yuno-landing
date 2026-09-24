import { useState } from "react";
import { motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "./context";
import { CountUp } from "./Stats";
import { EASE, FadeIn, PrimaryCta, SectionHeader } from "./ui";

export function Pricing() {
  const { t } = useLanding();
  const p = t.pricing;
  return (
    <section id="pricing" className="relative scroll-mt-20 bg-zinc-50 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} className="max-w-3xl" />
      <div className="mx-auto mt-14 grid max-w-6xl items-start gap-6 lg:grid-cols-[1.25fr_1fr]">
        <FadeIn>
          <div className="yl-card overflow-hidden">
            <div className="grid grid-cols-[1.2fr_1fr] border-b border-zinc-100 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 sm:grid-cols-[1.2fr_1.2fr_1fr]">
              <div className="px-5 py-4">{p.colItem}</div>
              <div className="hidden px-5 py-4 sm:block">{p.colWho}</div>
              <div className="px-5 py-4 text-right">{p.colAmount}</div>
            </div>
            {p.rows.map((r, i) => (
              <div
                key={r.item}
                className={cn(
                  "grid grid-cols-[1.2fr_1fr] items-center sm:grid-cols-[1.2fr_1.2fr_1fr]",
                  i > 0 && "border-t border-zinc-100",
                  r.highlight && "bg-[linear-gradient(90deg,rgba(232,25,44,0.06),transparent)]",
                )}
              >
                <div className="px-5 py-4">
                  <span className="block text-[14px] font-semibold tracking-tight text-zinc-950">
                    {r.item}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-zinc-500 sm:hidden">
                    {r.who}
                  </span>
                </div>
                <div className="hidden px-5 py-4 text-[13.5px] text-zinc-500 sm:block">{r.who}</div>
                <div
                  className={cn(
                    "px-5 py-4 text-right text-[14px] font-semibold tabular-nums",
                    r.highlight ? "text-[var(--yuno-red)]" : "text-zinc-900",
                  )}
                >
                  {r.amount}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-5 text-[14px] leading-relaxed text-emerald-900">
            {p.example}
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="yl-keep yl-edge relative overflow-hidden rounded-[1.5rem] bg-zinc-950 p-7 text-white shadow-[0_30px_60px_-24px_rgba(10,10,11,0.5)] md:p-8">
            <div
              aria-hidden
              className="absolute -right-24 -top-24 size-72 rounded-full bg-[radial-gradient(closest-side,rgba(232,25,44,0.45),transparent)]"
            />
            <div className="relative">
              <p className="text-[15px] font-semibold">{p.cardTitle}</p>
              <p className="mt-1 text-[13.5px] text-zinc-400">{p.cardSub}</p>
              <div className="mt-6 flex items-baseline gap-2">
                <CountUp value={p.price} className="text-6xl font-semibold tracking-[-0.05em]" />
                <span className="text-[14px] text-zinc-400">{p.priceSuffix}</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {p.included.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.4, ease: EASE }}
                    className="flex items-start gap-2.5 text-[13.5px] text-zinc-200"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-[var(--yuno-red)]"
                      strokeWidth={2.5}
                    />
                    {it}
                  </motion.li>
                ))}
              </ul>
              <PrimaryCta
                size="lg"
                className="mt-8 w-full bg-white text-zinc-950 hover:bg-zinc-100"
              >
                {p.cta}
              </PrimaryCta>
              <p className="mt-3 text-center text-[12px] text-zinc-500">{p.ctaNote}</p>
            </div>
          </div>
        </FadeIn>
      </div>

      <Traction />
    </section>
  );
}

function Traction() {
  const { t } = useLanding();
  const tr = t.traction;
  return (
    <FadeIn className="mx-auto mt-20 max-w-6xl">
      <p className="text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
        {tr.eyebrow}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200/70 bg-zinc-200/70 lg:grid-cols-4">
        {tr.items.map((it) => (
          <div key={it.value} className="bg-white p-5 md:p-6">
            <span className="block text-[20px] font-semibold tracking-tight text-zinc-950 md:text-[22px]">
              {it.value}
            </span>
            <span className="mt-1 block text-[13px] leading-snug text-zinc-500">{it.label}</span>
          </div>
        ))}
      </div>
    </FadeIn>
  );
}

// The landing FAQ by default; the comparison pages pass their own questions.
export function Faq({
  eyebrow,
  title,
  items,
}: {
  eyebrow?: string;
  title?: string;
  items?: { q: string; a: string }[];
} = {}) {
  const { t } = useLanding();
  const f = {
    eyebrow: eyebrow ?? t.faq.eyebrow,
    title: title ?? t.faq.title,
    items: items ?? t.faq.items,
  };
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative scroll-mt-20 px-4 py-24 sm:px-6 md:py-32">
      <SectionHeader eyebrow={f.eyebrow} title={f.title} />
      <FadeIn className="mx-auto mt-12 max-w-3xl">
        <ul className="space-y-3">
          {f.items.map((it, i) => {
            const on = open === i;
            return (
              <li
                key={it.q}
                className={cn(
                  "yl-card overflow-hidden transition-shadow",
                  on &&
                    "shadow-[0_1px_2px_rgba(10,10,11,0.04),0_16px_36px_-18px_rgba(10,10,11,0.18)]",
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={on}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(on ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
                  >
                    <span className="text-[15.5px] font-semibold tracking-tight text-zinc-950">
                      {it.q}
                    </span>
                    <span
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        on
                          ? "rotate-45 border-zinc-950 bg-zinc-950 text-white"
                          : "border-zinc-200 text-zinc-500",
                      )}
                    >
                      <Plus className="size-3.5" strokeWidth={2.5} />
                    </span>
                  </button>
                </h3>
                {/* Every answer stays in the DOM (collapsed with grid rows, not
                    unmounted) so crawlers and AI engines read the whole FAQ from
                    the server HTML, matching the FAQPage structured data. */}
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                    on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden" inert={!on}>
                    <p className="px-5 pb-5 text-pretty text-[14.5px] leading-relaxed text-zinc-500 md:px-6 md:pb-6">
                      {it.a}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </FadeIn>
    </section>
  );
}
