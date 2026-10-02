import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanding } from "@/components/landing/context";
import { FadeIn, FounderCta, PrimaryCta, SectionHeader } from "@/components/landing/ui";
import { useCrm } from "./content";

// The four Yuno CRM plans (same grid as the app: src/lib/crmPlans.ts in the
// yuno repo). Every account starts on a 14-day Pro trial, so every CTA opens
// the same signup — the plan is chosen later, in the Console.
export function CrmPricing() {
  const p = useCrm().pricing;
  const { lang } = useLanding();
  const [yearly, setYearly] = useState(false);
  const locale = lang === "fr" ? "fr-FR" : lang === "es" ? "es-ES" : "en-GB";
  const eur = (v: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(v);

  return (
    <section
      data-ph-section="pricing"
      id="pricing"
      className="relative scroll-mt-20 bg-zinc-50 px-4 py-16 sm:px-6 sm:py-24 md:py-32"
    >
      <SectionHeader eyebrow={p.eyebrow} title={p.title} sub={p.sub} className="max-w-3xl" />

      <FadeIn className="mx-auto mt-8 flex max-w-6xl flex-col items-center gap-4">
        <div className="inline-flex rounded-full border border-zinc-200 bg-white p-1 text-[13.5px] font-medium">
          {[false, true].map((y) => (
            <button
              key={String(y)}
              type="button"
              onClick={() => setYearly(y)}
              aria-pressed={yearly === y}
              className={cn(
                "rounded-full px-4 py-1.5 transition-colors",
                yearly === y ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-950",
              )}
            >
              {y ? p.yearly : p.monthly}
            </button>
          ))}
        </div>
        <p className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-center text-[13px] text-zinc-700 ring-1 ring-zinc-200">
          <Sparkles className="size-4 shrink-0 text-[var(--yuno-red)]" />
          {p.founder}
        </p>
      </FadeIn>

      <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {p.plans.map((plan, i) => {
          const rec = plan.id === "pro";
          const price = yearly ? plan.month * 10 : plan.month;
          return (
            <FadeIn key={plan.id} delay={i * 0.05} y={12}>
              <div
                className={cn("yl-card flex h-full flex-col p-6", rec && "ring-2 ring-zinc-950")}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[17px] font-semibold tracking-tight text-zinc-950">
                    {plan.name}
                  </h3>
                  {rec && (
                    <span className="rounded-full bg-zinc-950 px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      {p.recommended}
                    </span>
                  )}
                </div>
                <p className="mt-1 min-h-[40px] text-[13px] leading-snug text-zinc-500">
                  {plan.pitch}
                </p>
                <div className="mt-4 flex items-baseline gap-1.5">
                  <span className="text-[34px] font-semibold tabular-nums tracking-tight text-zinc-950">
                    {eur(price)}
                  </span>
                  {plan.month > 0 && (
                    <span className="text-[13px] text-zinc-500">
                      {yearly ? p.perYear : p.perMonth}
                    </span>
                  )}
                </div>
                {plan.founder != null && (
                  <p className="text-[12.5px] text-zinc-500">
                    {eur(yearly ? plan.founder * 10 : plan.founder)} · {p.founderShort}
                  </p>
                )}
                <ul className="mt-5 flex-1 space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-[13.5px] text-zinc-700">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-emerald-500"
                        strokeWidth={2.5}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <PrimaryCta
                    cta={`pricing_${plan.id}`}
                    className={cn(
                      "w-full justify-center",
                      !rec && "bg-zinc-100 text-zinc-950 hover:bg-zinc-200",
                    )}
                  >
                    {plan.id === "free" ? p.ctaFree : p.cta}
                  </PrimaryCta>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn className="mx-auto mt-6 flex max-w-6xl flex-col items-center gap-3 text-center">
        <p className="text-[12.5px] text-zinc-500">{p.footnote}</p>
        <FounderCta size="sm" cta="whatsapp_network">
          {p.network}
        </FounderCta>
      </FadeIn>
    </section>
  );
}
