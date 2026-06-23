import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { en } from "@/content/en";
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



export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Yuno — The OS for clubs, organizers & promoters" },
      {
        name: "description",
        content:
          "The all-in-one platform powering modern nightlife. VIP floor plans, click-and-collect bars, ticketing with automated Stripe Connect revenue splits.",
      },
      { property: "og:title", content: "Yuno — The OS for clubs, organizers & promoters" },
      {
        property: "og:description",
        content:
          "The all-in-one platform powering modern nightlife. VIP floor plans, click-and-collect bars, automated revenue splits.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: en.faq.items.map((item) => ({
            "@type": "Question",
            name: item.title,
            acceptedAnswer: { "@type": "Answer", text: item.content },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  return (
    <>
      {/* Hero — parallax */}
      <HeroParallaxSection />

      {/* Logo cloud */}
      <section className="px-6 pt-8 pb-16 relative z-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-6">
            Trusted by venues across Europe
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
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Built for three roles
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto">
              One platform, three operating modes
            </h2>
          </Reveal>
          <SegmentSwitcher />
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-12 max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {en.features.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {en.features.title}
            </h2>
          </Reveal>
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
            onMouseLeave={() => setHoveredFeature(null)}
          >
            {en.features.items.map((f, i) => (
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
      <section className="py-24 px-6 bg-surface/40 border-y border-border">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {en.split.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mb-6">
              {en.split.title} <span className="text-accent">{en.split.titleEm}</span>
            </h2>
            <p className="text-base text-muted-foreground mb-8 max-w-[52ch] text-pretty">
              {en.split.body}
            </p>
            <ul className="space-y-3">
              {en.split.bullets.map((b) => (
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
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center mb-12">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Onboarding
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              You're live in one afternoon
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Setup your events, tickets, floor plan & staff", time: "30 min" },
              { step: "02", title: "Connect Stripe & configure your bar", time: "20 min" },
              { step: "03", title: "Invite your promoters & go live. Send each their unique link — they start selling, you see every sale in real time.", time: "10 min" },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="h-full p-8 rounded-2xl bg-surface ring-1 ring-border">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Step {s.step}
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
      <section className="py-24 px-6 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center mb-12">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
              0% commission · subscription only
            </span>
            <h2 className="mt-4 text-3xl md:text-5xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto">
              Stop paying <span className="serif italic text-muted-foreground">10–15%</span> on every ticket
            </h2>
            <p className="mt-4 text-base text-muted-foreground max-w-[58ch] mx-auto text-pretty">
              Shotgun, Weezevent and Xceed take a cut on every ticket you sell. Yuno is a flat monthly subscription — keep the rest. See how much you'd save in a year.
            </p>
          </Reveal>
          <Reveal>
            <SavingsCalculator />
          </Reveal>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="py-24 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-16">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {en.pricing.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight">
              {en.pricing.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">{en.pricing.sub}</p>
          </Reveal>
          <Reveal className="mb-10">
            <div className="mx-auto max-w-3xl rounded-2xl bg-accent/5 ring-1 ring-accent/30 p-6 md:p-8 text-center">
              <p className="text-base md:text-lg text-balance">
                <span className="text-foreground font-medium">Yuno doesn't take a cut from your revenue.</span>{" "}
                <span className="text-muted-foreground">The 4% service fee is paid by your customers at checkout — like a credit card processing fee. You keep 100% of your ticket price.</span>{" "}
                <span className="text-accent">Compare that to Shotgun's 10% taken directly from your payout.</span>
              </p>
            </div>
          </Reveal>
          <PricingGrid />
          <div className="mt-10 text-center">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Compare all plans
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Founding Members */}
      <section className="py-24 px-6 border-t border-border">
        <Reveal className="mx-auto max-w-5xl">
          <article className="relative overflow-hidden rounded-3xl bg-surface ring-1 ring-accent/40 p-10 md:p-14">
            <div className="absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5 mb-5">
                Early Adopters
              </span>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[22ch] mb-4">
                Founding Club Offer
              </h2>
              <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-8">
                We're onboarding our first <span className="text-foreground font-medium">15 partner venues</span>. Founding clubs get <span className="text-accent">3 months free</span> — no credit card, no commitment. After that, go monthly at full price or choose annual and get <span className="text-accent">2 months free + a lifetime price lock</span>. Your rate never increases, even if our prices go up.
              </p>
              <ul className="space-y-2 mb-8">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-accent shrink-0" />
                  <span>3 months completely free, no card required</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-accent shrink-0" />
                  <span>Dedicated onboarding call with the founding team</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="size-4 text-accent shrink-0" />
                  <span>Annual plan = 2 months free + price locked forever</span>
                </li>
              </ul>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                Join the founding cohort
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Founder quote + market validation */}
      <FounderQuote />

      {/* FAQ */}
      <section className="py-24 px-6 border-t border-border">
        <FaqSection
          eyebrow={en.faq.eyebrow}
          title={en.faq.title}
          items={en.faq.items}
        />
      </section>

      {/* 3D Marquee */}
      <MarqueeSection />

      {/* Final CTA */}
      <section className="py-24 px-6">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center bg-surface ring-1 ring-border">
            <div className="absolute -inset-x-20 -top-40 h-80 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.18),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
                {en.cta.title}
              </h2>
              <p className="text-muted-foreground max-w-[56ch] mx-auto mb-8">{en.cta.sub}</p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                {en.cta.button}
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
