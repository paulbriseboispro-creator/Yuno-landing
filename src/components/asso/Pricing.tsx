import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { BadgeCheck, Check, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { INTL_LOCALE } from "@/i18n/landing-lang";
import { useLanding } from "@/components/landing/context";
import { AnimatedMoney, Slider, computeTicket } from "@/components/landing/Money";
import { CountUp } from "@/components/landing/Stats";
import { EASE, FadeIn, PrimaryCta, SectionHeader } from "@/components/landing/ui";
import { useAsso } from "./content";

// Minimum service fee per ticket: a verified student association vs the
// standard rate (organizer_profiles.bde_verified in the yuno repo).
const ASSO_MIN_FEE = 0.49;
const STANDARD_MIN_FEE = 0.99;

export function AssoPricing() {
  const p = useAsso().pricing;
  return (
    <section
      data-ph-section="pricing"
      id="pricing"
      className="relative scroll-mt-20 bg-zinc-50 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} className="max-w-3xl" />
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 items-start gap-6 sm:mt-14 lg:grid-cols-[1.25fr_1fr]">
        <FadeIn>
          <div className="yl-card overflow-hidden">
            <div className="grid grid-cols-2 border-b border-zinc-100 text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc-400 sm:grid-cols-[1.2fr_1.2fr_1fr]">
              <div className="px-4 py-3.5 sm:px-5 sm:py-4">{p.colItem}</div>
              <div className="hidden px-5 py-4 sm:block">{p.colWho}</div>
              <div className="px-4 py-3.5 text-right sm:px-5 sm:py-4">{p.colAmount}</div>
            </div>
            {p.rows.map((r, i) => (
              <div
                key={r.item}
                className={cn(
                  "grid grid-cols-2 items-center sm:grid-cols-[1.2fr_1.2fr_1fr]",
                  i > 0 && "border-t border-zinc-100",
                  r.highlight && "bg-[linear-gradient(90deg,rgba(232,25,44,0.06),transparent)]",
                )}
              >
                <div className="py-3.5 pl-4 pr-2 sm:px-5 sm:py-4">
                  <span className="block text-[14px] font-semibold tracking-tight text-zinc-950">
                    {r.item}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] text-zinc-500 sm:hidden">
                    {r.who}
                  </span>
                </div>
                <div className="hidden px-5 py-4 text-[13.5px] text-zinc-500 sm:block">{r.who}</div>
                <div className="py-3.5 pl-2 pr-4 text-right sm:px-5 sm:py-4">
                  <span
                    className={cn(
                      "block text-balance text-[14px] font-semibold tabular-nums",
                      r.highlight ? "text-[var(--yuno-red)]" : "text-zinc-900",
                    )}
                  >
                    {r.amount}
                  </span>
                  {r.was && (
                    <span className="mt-0.5 block text-[12px] tabular-nums text-zinc-400 line-through">
                      {r.was}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 flex gap-3 rounded-2xl border border-emerald-200/70 bg-emerald-50/70 p-4 text-[13.5px] leading-relaxed text-emerald-900 sm:p-5">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-emerald-600" />
            {p.verified}
          </p>
          <Calculator />
        </FadeIn>

        <FadeIn delay={0.1} className="lg:sticky lg:top-24">
          <div className="yl-keep yl-edge relative overflow-hidden rounded-[1.5rem] bg-zinc-950 p-6 text-white shadow-[0_30px_60px_-24px_rgba(10,10,11,0.5)] sm:p-7 md:p-8">
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
    </section>
  );
}

// What the association keeps on a night, and what the association rate saves
// its students — Yuno's own published fees only, no competitor figure.
function Calculator() {
  const { lang } = useLanding();
  const c = useAsso().pricing.calc;
  const [price, setPrice] = useState(10);
  const [qty, setQty] = useState(300);
  const r = computeTicket(price, ASSO_MIN_FEE);
  const std = computeTicket(price, STANDARD_MIN_FEE);
  const saved = Math.max(0, std.fee - r.fee) * qty;

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

  return (
    <div className="yl-card mt-6 p-6 md:p-7">
      <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
        {c.title}
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Slider
          label={c.price}
          display={eur0(price)}
          value={price}
          min={3}
          max={40}
          step={1}
          onChange={setPrice}
        />
        <Slider
          label={c.qty}
          display={int.format(qty)}
          value={qty}
          min={20}
          max={1500}
          step={10}
          onChange={setQty}
        />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-100">
        <div className="bg-white p-4">
          <p className="text-[12.5px] text-zinc-500">{c.student}</p>
          <p className="mt-1 text-[20px] font-semibold tabular-nums tracking-tight text-zinc-950">
            {eur2(r.customer)}
          </p>
          <p className="mt-0.5 text-[12px] text-zinc-400">
            {c.studentMeta.replace("{fee}", eur2(r.fee))}
          </p>
        </div>
        <div className="bg-white p-4">
          <p className="text-[12.5px] text-zinc-500">{c.keep}</p>
          <p className="mt-1 text-[20px] font-semibold tabular-nums tracking-tight text-zinc-950">
            {eur2(r.keep)}
          </p>
          <p className="mt-0.5 text-[12px] text-zinc-400">
            {c.keepMeta.replace("{stripe}", eur2(r.stripe))}
          </p>
        </div>
      </div>

      <div className="yl-keep yl-edge mt-4 flex items-end justify-between gap-4 rounded-2xl bg-zinc-950 p-5 text-white">
        <span className="text-[13px] leading-snug text-zinc-400">{c.total}</span>
        <span className="whitespace-nowrap text-[28px] font-semibold tabular-nums tracking-tight sm:text-4xl">
          <AnimatedMoney value={r.keep * qty} fmt={eur0} />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-[rgba(232,25,44,0.06)] px-5 py-3.5">
        <span className="min-w-0">
          <span className="block text-[13px] font-medium text-zinc-800">{c.saved}</span>
          <span className="block text-[12px] text-zinc-500">{c.savedMeta}</span>
        </span>
        <span className="shrink-0 text-[18px] font-semibold tabular-nums text-[var(--yuno-red)]">
          +<AnimatedMoney value={saved} fmt={eur0} />
        </span>
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-zinc-400">{c.foot}</p>
    </div>
  );
}

// "Where are you coming from?" — one card per tool associations use today, with
// only what those tools publish (sources listed and dated under the cards).
export function AssoSwitch() {
  const s = useAsso().switch;
  return (
    <section
      data-ph-section="compare"
      id="switch"
      className="relative scroll-mt-20 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={s.eyebrow} title={s.title} sub={s.sub} className="max-w-3xl" />
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-4 sm:mt-14 lg:grid-cols-3">
        {s.cards.map((card, i) => (
          <FadeIn key={card.name} delay={i * 0.06} y={12} className="h-full">
            <div className="yl-card flex h-full flex-col p-6 md:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[17px] font-semibold tracking-tight text-zinc-950">
                  {card.name}
                </p>
                <span className="shrink-0 whitespace-nowrap rounded-full bg-zinc-100 px-2.5 py-1 text-[11.5px] font-medium text-zinc-600">
                  {card.tag}
                </span>
              </div>
              <p className="mt-3 text-pretty text-[14px] leading-relaxed text-zinc-500">
                {card.intro}
              </p>
              <ul className="mt-5 space-y-3">
                {card.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5 text-[14px] text-zinc-800">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-[var(--yuno-red)]"
                      strokeWidth={2.5}
                    />
                    {pt}
                  </li>
                ))}
              </ul>
              {card.honest && (
                <p className="mt-auto pt-5 text-[12.5px] leading-relaxed text-zinc-500">
                  <span className="block border-t border-zinc-100 pt-4">{card.honest}</span>
                </p>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn className="mx-auto mt-8 max-w-6xl">
        <p className="text-[12px] font-semibold text-zinc-500">{s.sourcesTitle}</p>
        <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1.5">
          {s.sources.map((src) => (
            <li key={src.url}>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-flex items-center gap-1 text-[12px] text-zinc-400 underline-offset-2 hover:text-zinc-700 hover:underline"
              >
                {src.label}
                <ExternalLink className="size-3" />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 max-w-3xl text-[11.5px] leading-relaxed text-zinc-400">{s.disclaimer}</p>
      </FadeIn>
    </section>
  );
}
