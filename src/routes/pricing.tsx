import { createFileRoute, Link } from "@tanstack/react-router";
import { PricingGrid } from "@/components/site/PricingGrid";
import { Reveal } from "@/components/site/Reveal";
import { ServiceFeeCalculator } from "@/components/site/ServiceFeeCalculator";
import { SavingsCalculator } from "@/components/site/SavingsCalculator";
import { en } from "@/content/en";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Yuno" },
      {
        name: "description",
        content:
          "Yuno plans: Core (free), Essential €39/mo, Pro €69/mo, Elite €99/mo. Plus 4% per ticket with €0.99 minimum on transactions.",
      },
      { property: "og:title", content: "Pricing — Yuno" },
      { property: "og:description", content: "Core, Essential €39, Pro €69, Elite €99 — plus low transactional fees." },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

const fees = [
  {
    title: "Tickets & tables",
    body: "4% per order with a €0.99 minimum. The service fee is always paid by the customer at checkout — never deducted from your share. Stripe fees (1.5% + €0.25) apply on payout.",
  },
  {
    title: "Drinks (Click & Collect)",
    body: "A flat 3% service fee on every pre-ordered round, paid by the customer. You receive 100% of the menu price — pre-ordering is a guest-side perk that cuts your queue without costing you anything.",
  },
  {
    title: "VIP tables",
    body: "Same 4% / €0.99 minimum on online deposits and tables billed through Yuno — paid by the customer. No commission on cash collected at the door.",
  },
  {
    title: "Promoter attribution",
    body: "Commissions you've configured (fixed or %) are deducted from the venue's net share and paid directly to the promoter.",
  },
];

function PricingPage() {
  return (
    <>
      <section className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
            Pricing
          </span>
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-balance max-w-[24ch] mx-auto leading-[1.05]">
            A plan for every <span className="serif italic text-muted-foreground">scale of night</span>
          </h1>
          <p className="mt-6 text-base text-muted-foreground max-w-[58ch] mx-auto text-pretty">
            Monthly SaaS plans for the back office, plus transparent transactional fees on what actually moves money.
          </p>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="text-center text-base text-muted-foreground text-pretty">
              Yuno charges you a <span className="text-foreground">monthly subscription</span>. Ticket and drink fees are paid by your guests at checkout — <span className="text-foreground">not by you</span>. The fee calculator below shows what your attendees pay per purchase.
            </p>
          </Reveal>
        </div>
      </section>


      <section className="px-6 pb-24">
        <div className="mx-auto max-w-7xl">
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
        </div>
      </section>

      {/* Savings vs competitors */}
      <section className="px-6 pb-24 border-t border-border pt-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-8 text-center">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
              vs. Shotgun · Weezevent · Xceed · DICE
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[26ch] mx-auto">
              The cheapest ticketing platform for nightlife — by a wide margin
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-[60ch] mx-auto">
              Yuno is subscription only. No per-ticket commission. Compare what each platform actually costs you per year.
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
              See it in numbers
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              What your customers actually pay in fees
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-[58ch] mx-auto">
              Drag the sliders. Every service fee is paid by the customer at checkout — never by you. You keep 100% of your menu and ticket prices.
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
                    Early Adopters — 15 spots only
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-balance max-w-[24ch] mb-4">
                  Founding Club Offer
                </h2>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-4">
                  We're onboarding our first <span className="text-foreground font-medium">15 partner venues</span> — and that's where it stops.
                </p>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-6">
                  Founding clubs get <span className="text-foreground font-medium">3 months completely free</span>, no credit card, no commitment. Run real nights on Yuno, see what it does for your operations, and decide after.
                </p>
                <div className="mb-6">
                  <p className="text-sm font-medium text-foreground mb-2">After your trial, two paths:</p>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>Go monthly at the standard rate, any time.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      <span>Go annual and get <span className="text-foreground font-medium">2 extra months free</span> — plus a lifetime price lock. Your rate never increases, even as we add features and raise prices for everyone else.</span>
                    </li>
                  </ul>
                </div>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-accent shrink-0" />
                    <span>3 months free — no card, no strings</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-accent shrink-0" />
                    <span>Direct onboarding with Paul, Yuno's founder</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="size-4 text-accent shrink-0" />
                    <span>Annual plan = 2 months free + your rate locked forever</span>
                  </li>
                </ul>
                <p className="text-xs text-muted-foreground mb-6">
                  Open until September 2026 — or until all 15 spots are claimed.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition-all">
                    Claim your founding spot <ArrowRight className="size-4" />
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    Free to join · No contract · Exclusive territory
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
              Fee breakdown
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              Service fees your customers pay at checkout
            </h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-[60ch]">{en.pricing.fees}</p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {fees.map((f, i) => (
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
