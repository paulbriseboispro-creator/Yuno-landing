import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SplitVisual } from "@/components/site/SplitVisual";
import { SavingsCalculator } from "@/components/site/SavingsCalculator";

export const Route = createFileRoute("/organizers")({
  head: () => ({
    meta: [
      { title: "Yuno for Organizers — Ticketing without the markup" },
      {
        name: "description",
        content:
          "Run events with the lowest ticketing fees in Europe and split revenue with your host venue automatically through Stripe Connect.",
      },
      { property: "og:title", content: "Yuno for Organizers" },
      {
        property: "og:description",
        content: "Low-fee ticketing, automated revenue splits, and your own check-in app.",
      },
      { property: "og:url", content: "/organizers" },
    ],
    links: [{ rel: "canonical", href: "/organizers" }],
  }),
  component: OrganizersPage,
});

function OrganizersPage() {
  const blocks = [
    {
      tag: "Pricing",
      title: "4% per ticket. €0.99 floor. No monthly fee.",
      body: "Stop bleeding 12–18% to legacy ticketing platforms. With Yuno the service fee is 4% per ticket (€0.99 minimum) — always paid by the customer at checkout, never by you.",
      bullets: [
        "Zero monthly fee on the Yuno Core plan",
        "Service fees always paid by the customer",
        "Early Bird / Regular / Late tiers with quotas",
      ],
    },
    {
      tag: "Revenue split",
      title: "Stripe Connect, settled at checkout",
      body: "You and your host venue agree on a contractual split, e.g. 70/30. The instant a ticket clears, funds land in each party's Stripe account — no month-end reconciliation, no awkward DMs.",
      bullets: [
        "Stripe Connect Standard accounts",
        "Promoter commissions deducted automatically",
        "Full audit trail per event",
      ],
    },
    {
      tag: "On the door",
      title: "Your own check-in app, your own crew",
      body: "Recruit scanners for the night and hand each one a temporary PIN. Their phone becomes a scanner. Guest list is synced live across every device.",
      bullets: [
        "PIN-based door staff onboarding",
        "Live guest-list sync across all scanners",
        "PWA-based scanner — works on any smartphone, no app download required",
      ],
    },
  ];

  return (
    <>
      <section className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
            For event organizers
          </span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[22ch] mx-auto leading-[1.05]">
            Ticketing without the <span className="serif italic text-muted-foreground">markup</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-[60ch] mx-auto text-pretty">
            Yuno is the missing layer between you, your host venue and the crowd you bring. Low fees, automatic splits, and the door app your team actually wants to use.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Create my first event <ArrowRight className="size-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center text-sm font-medium px-6 py-3 rounded-full ring-1 ring-border hover:bg-surface transition-colors">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Savings calculator */}
      <section className="px-6 py-16 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center mb-10">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
              The cheapest in the market
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[26ch] mx-auto">
              How much you'd save vs Shotgun, Weezevent, Xceed
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-[60ch] mx-auto">
              Set your ticket price and yearly volume. We do the math against every major nightlife ticketing platform.
            </p>
          </Reveal>
          <Reveal>
            <SavingsCalculator />
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-16 border-t border-border">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              How the split works
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              Money moves the second the card clears
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[52ch] text-pretty">
              Every ticket sale is broken into its agreed parts at the moment of payment. You see it land. The venue sees it land. The promoter who brought the sale sees their commission queued for payout.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <SplitVisual />
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <article className="rounded-2xl bg-surface ring-1 ring-border p-8 md:p-12">
              <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5 mb-5">
                The math
              </span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-balance mb-6">
                What the difference actually looks like
              </h2>
              <p className="text-base text-muted-foreground mb-6">An event: <span className="text-foreground font-medium">200 tickets at €20</span>.</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl ring-1 ring-border p-5 bg-background/40">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Legacy platform — 8%</p>
                  <p className="text-3xl font-medium">€320</p>
                  <p className="text-sm text-muted-foreground mt-2">in fees — paid by your attendees, which means fewer people buy.</p>
                </div>
                <div className="rounded-xl ring-1 ring-accent/40 p-5 bg-background/40">
                  <p className="text-xs uppercase tracking-[0.18em] text-accent mb-2">Yuno — 4%</p>
                  <p className="text-3xl font-medium text-accent">€160</p>
                  <p className="text-sm text-muted-foreground mt-2">Half the friction at the checkout.</p>
                </div>
              </div>
              <p className="text-base text-foreground">
                That's <span className="text-accent font-medium">€160 staying in the room</span>, per event. Multiply by your season.
              </p>
              <p className="mt-4 text-xs text-muted-foreground italic">Illustrative — rates are real, your mileage will vary.</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl space-y-6">
          {blocks.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="grid md:grid-cols-[180px_1fr] gap-8 p-8 md:p-10 rounded-2xl bg-surface ring-1 ring-border">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                    {s.tag}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-balance">{s.title}</h2>
                  <p className="text-base text-muted-foreground max-w-[60ch] mb-6 text-pretty">{s.body}</p>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="size-4 mt-0.5 text-accent shrink-0" strokeWidth={1.75} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl bg-surface ring-1 ring-accent/40 p-10 md:p-14">
              <div className="absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] pointer-events-none" />
              <div className="relative z-10">
                <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5 mb-5">
                  Yuno Collab
                </span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mb-4">
                  Host an event, unlock the full stack
                </h2>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty">
                  You organize an event in a venue that's not on Yuno? Propose them Yuno Collab. The venue hosts your event and gets access to Yuno Pro dashboards for that night — automatically, at no cost to them. You get a co-branded event page and automatic check-in synced with their door. Everyone wins.
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
