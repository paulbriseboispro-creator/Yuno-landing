import { createFileRoute, Link } from "@tanstack/react-router";
import { PricingGrid } from "@/components/site/PricingGrid";
import { Reveal } from "@/components/site/Reveal";
import { ServiceFeeCalculator } from "@/components/site/ServiceFeeCalculator";
import { SavingsCalculator } from "@/components/site/SavingsCalculator";
import { pricingContent, usePricing } from "@/content/pricing";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: ({ match }) => {
    const m = pricingContent[match.context.locale].meta;
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.ogTitle },
        { property: "og:description", content: m.ogDescription },
        { property: "og:url", content: "/pricing" },
      ],
      links: [{ rel: "canonical", href: "/pricing" }],
    };
  },
  component: PricingPage,
});

function PricingPage() {
  const t = usePricing();
  const p = t.page;
  return (
    <>
      <section className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
            {p.eyebrow}
          </span>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto leading-[1.05]">
            {p.titleA}<span className="serif italic text-muted-foreground">{p.titleEm}</span>
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-[58ch] mx-auto text-pretty">
            {p.sub}
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-center text-base text-muted-foreground text-pretty">
              {p.feeIntroA}<span className="text-foreground">{p.feeIntroMonthly}</span>{p.feeIntroB}<span className="text-foreground">{p.feeIntroNotYou}</span>{p.feeIntroC}
            </p>
          </Reveal>
        </div>
      </section>


      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-accent/5 ring-1 ring-accent/30 p-6 md:p-8 text-center">
              <p className="text-base md:text-lg text-balance">
                <span className="text-foreground font-medium">{p.noCutBold}</span>{" "}
                <span className="text-muted-foreground">{p.noCutBody}</span>{" "}
                <span className="text-accent">{p.noCutCompare}</span>
              </p>
            </div>
          </Reveal>
          <PricingGrid />
        </div>
      </section>

      {/* Savings vs competitors */}
      <section className="px-6 pb-24 border-t border-border pt-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8 text-center">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
              {p.savingsEyebrow}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[26ch] mx-auto">
              {p.savingsTitle}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-[60ch] mx-auto">
              {p.savingsSub}
            </p>
          </Reveal>
          <Reveal>
            <SavingsCalculator />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 border-t border-border pt-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-8 text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {p.serviceFeeEyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {p.serviceFeeTitle}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-[58ch] mx-auto">
              {p.serviceFeeSub}
            </p>
          </Reveal>
          <Reveal>
            <ServiceFeeCalculator />
          </Reveal>
        </div>
      </section>

      {/* Founding Club Offer */}
      <section className="px-6 pb-10 border-t border-border pt-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl bg-surface ring-1 ring-accent/40 p-8 md:p-12">
              <div className="absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="size-4 text-accent" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                    {p.founding.badge}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-balance max-w-[24ch] mb-4">
                  {p.founding.title}
                </h2>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-4">
                  {p.founding.introA}<span className="text-foreground font-medium">{p.founding.introVenues}</span>{p.founding.introB}
                </p>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-6">
                  {p.founding.bodyA}<span className="text-foreground font-medium">{p.founding.bodyFree}</span>{p.founding.bodyB}
                </p>
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">{p.founding.pathsLabel}</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{p.founding.pathMonthly}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>{p.founding.pathAnnualA}<span className="text-foreground font-medium">{p.founding.pathAnnualEm}</span>{p.founding.pathAnnualB}</span>
                    </li>
                  </ul>
                </div>
                <ul className="space-y-2 mb-6">
                  {p.founding.checks.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="size-4 text-accent shrink-0" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mb-6">
                  {p.founding.deadline}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition-all">
                    {p.founding.cta} <ArrowRight className="size-4" />
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {p.founding.ctaMeta}
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24 border-t border-border pt-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {p.breakdownEyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {p.breakdownTitle}
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-[60ch]">{t.fees}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {p.breakdownItems.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.05}>
                <div className="p-6 rounded-2xl bg-surface ring-1 ring-border h-full">
                  <h3 className="text-lg font-medium mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
