import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { homeContent, useHome } from "@/content/home";
import { SegmentSwitcher } from "@/components/site/SegmentSwitcher";
import { SplitVisual } from "@/components/site/SplitVisual";
import { PricingGrid } from "@/components/site/PricingGrid";
import { SavingsCalculator } from "@/components/site/SavingsCalculator";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { LogoCloud } from "@/components/logo-cloud";
import { HeroParallaxSection } from "@/components/site/HeroParallaxSection";
import { MarqueeSection } from "@/components/site/MarqueeSection";
import { ShotgunComparison } from "@/components/site/ShotgunComparison";
import { DifferentiatorsSection } from "@/components/site/DifferentiatorsSection";
import { YunoCollabSection } from "@/components/site/YunoCollabSection";
import { FounderQuote } from "@/components/site/FounderQuote";
import { pageSeo } from "@/i18n/seo";
import clubPreview from "@/assets/previews/club.png";
import orgaPreview from "@/assets/previews/orga.png";
import djPreview from "@/assets/previews/dj.png";

// Live 9:16 mobile captures of the real Yuno pages, keyed by persona.
const personaPreviews: Record<string, string> = {
  club: clubPreview,
  orga: orgaPreview,
  dj: djPreview,
};

export function Index() {
  const t = useHome();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <>
      {/* Hero — parallax */}
      <HeroParallaxSection />

      {/* Logo cloud */}
      <section className="px-6 pt-8 pb-16 relative z-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-6">
            {t.logoCloud.label}
          </p>
          <LogoCloud />
        </div>
        <div id="product" />
      </section>

      {/* Industry reality check — Shotgun vs Yuno */}
      <ShotgunComparison />

      {/* 3 things no one else does */}
      <DifferentiatorsSection />


      {/* Segment Switcher */}
      <section className="py-16 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.segmentsSection.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto">
              {t.segmentsSection.title}
            </h2>
          </Reveal>
          <SegmentSwitcher />
        </div>
      </section>

      {/* Per-role design pages */}
      <section className="py-16 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.personaPages.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto">
              {t.personaPages.title}
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-[58ch] mx-auto text-pretty">
              {t.personaPages.sub}
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.personaPages.items.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.08}>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-2xl bg-surface ring-1 ring-border p-6 transition-all hover:ring-accent/40"
                >
                  {/* Live 9:16 mobile preview of the real page */}
                  <div className="relative mx-auto w-full max-w-[240px] overflow-hidden rounded-2xl ring-1 ring-border shadow-xl shadow-black/40">
                    <img
                      src={personaPreviews[p.key]}
                      alt={p.title}
                      loading="lazy"
                      className="aspect-[9/16] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 rounded-2xl" />
                  </div>
                  {/* Meta */}
                  <div className="mt-6 flex flex-1 flex-col">
                    <span className="inline-block self-start text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5 mb-4">
                      {p.tag}
                    </span>
                    <h3 className="text-xl font-medium mb-2 tracking-tight">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.body}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                      {t.personaPages.ctaLabel}
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-16 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.features.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {t.features.title}
            </h2>
          </Reveal>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            onMouseLeave={() => setHoveredFeature(null)}
          >
            {t.features.items.map((f, i) => (
              <div
                key={f.title}
                className="relative group block p-2 h-full w-full"
                onMouseEnter={() => setHoveredFeature(i)}
              >
                {hoveredFeature === i && (
                  <motion.span
                    className="absolute inset-0 h-full w-full bg-[#ef4444] block rounded-2xl"
                    layoutId="hoverBackground"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  />
                )}
                <article className="relative z-20 h-full p-8 rounded-2xl bg-surface ring-1 ring-border group-hover:ring-accent/40 transition-all overflow-hidden">
                  <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5 mb-5">
                    {f.tag}
                  </span>
                  <h3 className="text-xl font-medium mb-3 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stripe split */}
      <section className="py-16 px-6 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.split.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mb-6">
              {t.split.title} <span className="text-accent">{t.split.titleEm}</span>
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-[52ch] text-pretty">
              {t.split.body}
            </p>
            <ul className="space-y-3">
              {t.split.bullets.map((b) => (
                <li key={b} className="flex items-center gap-3 text-sm">
                  <span className="size-1.5 rounded-full bg-accent" />
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15}>
            <SplitVisual />
          </Reveal>
        </div>
      </section>

      {/* Yuno Collab — for organizers */}
      <YunoCollabSection />


      {/* Onboarding — live in one afternoon */}
      <section className="py-16 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.onboarding.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {t.onboarding.title}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.onboarding.steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="h-full p-8 rounded-2xl bg-surface ring-1 ring-border">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      {t.onboarding.stepLabel} {s.step}
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                      {s.time}
                    </span>
                  </div>
                  <p className="text-lg font-medium tracking-tight text-balance">{s.title}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Savings calculator */}
      <section className="py-16 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
              {t.savings.eyebrow}
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto">
              {t.savings.titleA} <span className="serif italic text-muted-foreground">{t.savings.titleEm}</span> {t.savings.titleB}
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-[58ch] mx-auto text-pretty">
              {t.savings.body}
            </p>
          </Reveal>
          <Reveal>
            <SavingsCalculator />
          </Reveal>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.pricingTeaser.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight">
              {t.pricingTeaser.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{t.pricingTeaser.sub}</p>
          </Reveal>
          <Reveal className="mb-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-accent/5 ring-1 ring-accent/30 p-6 md:p-8 text-center">
              <p className="text-base md:text-lg text-balance">
                <span className="text-foreground font-medium">{t.pricingTeaser.calloutBold}</span>{" "}
                <span className="text-muted-foreground">{t.pricingTeaser.calloutMuted}</span>{" "}
                <span className="text-accent">{t.pricingTeaser.calloutAccent}</span>
              </p>
            </div>
          </Reveal>
          <PricingGrid />
          <div className="mt-10 text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              {t.pricingTeaser.compareLink}
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founding Members */}
      <section className="py-16 px-6 border-t border-border">
        <Reveal className="mx-auto max-w-5xl">
          <article className="relative overflow-hidden rounded-3xl bg-surface ring-1 ring-accent/40 p-10 md:p-14">
            <div className="absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5 mb-5">
                {t.founding.eyebrow}
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[22ch] mb-4">
                {t.founding.title}
              </h2>
              <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-8">
                {t.founding.bodyA}<span className="text-foreground font-medium">{t.founding.bodyVenues}</span>{t.founding.bodyB}<span className="text-accent">{t.founding.bodyMonths}</span>{t.founding.bodyC}<span className="text-accent">{t.founding.bodyAnnual}</span>{t.founding.bodyD}
              </p>
              <ul className="space-y-2 mb-8">
                {t.founding.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-accent shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                {t.founding.cta}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Founder quote + market validation */}
      <FounderQuote />

      {/* FAQ */}
      <section className="py-16 px-6 border-t border-border">
        <FaqSection
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          items={t.faq.items}
        />
      </section>

      {/* 3D Marquee */}
      <MarqueeSection />

      {/* Final CTA */}
      <section className="py-16 px-6">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center bg-surface ring-1 ring-border">
            <div className="absolute -inset-x-20 -top-40 h-80 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.18),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
                {t.cta.title}
              </h2>
              <p className="text-muted-foreground max-w-[56ch] mx-auto mb-8">{t.cta.sub}</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                {t.cta.button}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
