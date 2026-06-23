import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  MapPin,
  Users,
  Mail,
  Handshake,
  Calendar,
  Globe,
  Link2,
  ExternalLink,
} from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/affiliates")({
  head: () => ({
    meta: [
      { title: "Yuno for Affiliates — One collective per city" },
      {
        name: "description",
        content:
          "Promoter collectives get free access to Yuno's professional infrastructure, a branded page for all their events, and exclusive territory in their city.",
      },
      { property: "og:title", content: "Yuno for Affiliates — One collective per city" },
      {
        property: "og:description",
        content:
          "Free pro infrastructure, a branded event page for your collective, and exclusive city territory.",
      },
      { property: "og:url", content: "/affiliates" },
    ],
    links: [{ rel: "canonical", href: "/affiliates" }],
  }),
  component: AffiliatesPage,
});

const cities = [
  { name: "Madrid", status: "open" as const, label: "Open — applying now" },
  { name: "Valencia", status: "open" as const, label: "Open — applying now" },
  { name: "Toulouse", status: "open" as const, label: "Open — applying now" },
  { name: "Lyon", status: "open" as const, label: "Open — applying now" },
  { name: "Barcelone", status: "soon" as const, label: "Coming soon" },
  { name: "Paris", status: "soon" as const, label: "Coming soon" },
];

const heroEvents = [
  { name: "Subterráneo · Opening", date: "Sat 21 Jun", venue: "Kapital", price: "€20" },
  { name: "House of Hours", date: "Fri 27 Jun", venue: "Opium", price: "€22" },
  { name: "Late Night Bloom", date: "Sat 05 Jul", venue: "Fitz", price: "€18" },
  { name: "Members Only · Vol. 03", date: "Sat 12 Jul", venue: "Gabana", price: "€25" },
];

const promoters = [
  { name: "Lucas M.", initials: "LM" },
  { name: "Sofia R.", initials: "SR" },
  { name: "Tomás A.", initials: "TA" },
  { name: "Inès G.", initials: "IG" },
  { name: "Diego P.", initials: "DP" },
];

const steps = [
  {
    icon: Mail,
    title: "Apply for your city",
    body: "Tell us about your collective — how many promoters, which venues you work with, which city you operate in.",
  },
  {
    icon: Handshake,
    title: "We set you up",
    body: "A Yuno team member creates your collective account, your branded page, and onboards your team.",
  },
  {
    icon: Calendar,
    title: "List your events",
    body: "Add your events, assign links to your promoters, and share your collective page. Tickets redirect to the venue's existing system — nothing changes for the club.",
  },
  {
    icon: Globe,
    title: "Grow the relationship",
    body: "As Yuno grows in your city, your collective grows with it. More events, more visibility, first access to what comes next.",
  },
];

function AffiliatesPage() {
  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative px-6 pt-24 pb-20 overflow-hidden">
        <div className="absolute -inset-x-20 -top-32 h-[28rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_70%)] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-7">
              One collective per city
            </span>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-balance">
              Your collective.
              <br />
              Your city.
              <br />
              <span className="serif italic text-muted-foreground">On Yuno.</span>
            </h1>
            <p className="mt-7 text-lg text-muted-foreground max-w-[58ch] text-pretty">
              Promoter agencies get free access to Yuno's professional infrastructure — a branded home for all your events, and a system your whole team can actually use.
            </p>
            <div className="mt-9">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                Apply for your city
                <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Hero mockup: Colectivo Norte event page */}
          <Reveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_top_right,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)] pointer-events-none" />
              <div className="relative rounded-3xl bg-surface/70 backdrop-blur-xl ring-1 ring-border/80 p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center text-accent-foreground font-semibold">
                      C
                    </div>
                    <div>
                      <p className="text-sm font-medium">Colectivo Norte</p>
                      <p className="text-[11px] text-muted-foreground">12 promoters · 4 upcoming</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                    Exclusive affiliate · Madrid
                  </span>
                </div>
                <div className="space-y-2">
                  {heroEvents.map((e) => (
                    <div
                      key={e.name}
                      className="flex items-center justify-between rounded-xl bg-background/40 ring-1 ring-border/60 px-4 py-3"
                    >
                      <div>
                        <p className="text-sm font-medium">{e.name}</p>
                        <p className="text-[11px] text-muted-foreground">
                          {e.date} · {e.venue}
                        </p>
                      </div>
                      <span className="text-xs font-medium text-accent bg-accent/10 ring-1 ring-accent/30 rounded-full px-3 py-1">
                        Get tickets
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2 — PILLARS */}
      <section className="px-6 py-16 border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 md:divide-x md:divide-border">
          {[
            { value: "€0", label: "No subscription, ever" },
            { value: "1 per city", label: "Exclusive territory partnership" },
            { value: "Your whole team", label: "Every promoter in your roster, in one place" },
          ].map((p) => (
            <div key={p.label} className="px-6 md:px-10 py-6 md:py-2 text-center md:text-left">
              <p className="text-3xl md:text-4xl font-medium tracking-tight">{p.value}</p>
              <p className="mt-2 text-sm text-muted-foreground max-w-[28ch] mx-auto md:mx-0">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — YOUR BRANDED PRESENCE (Linktree replacement) */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Your branded presence
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05] max-w-[24ch] mx-auto">
              One page for all your events.{" "}
              <span className="serif italic text-muted-foreground">Actually professional.</span>
            </h2>
          </Reveal>

          <div className="mx-auto max-w-[56ch] text-center mb-14">
            <p className="text-base text-muted-foreground text-pretty">
              Stop sending people to a generic Linktree with five links and no context. Your Yuno collective page lists every event you run — with the venue, the date, the lineup, and a direct link to buy tickets. Branded with your name. Shareable by your whole team.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start max-w-5xl mx-auto">
            {/* Before — generic Linktree */}
            <Reveal>
              <div className="rounded-3xl bg-surface ring-1 ring-border p-6 relative">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-5">Before</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Tickets for Saturday", url: "linktr.ee/tix-sat" },
                    { label: "Our Instagram", url: "instagram.com/collective" },
                    { label: "Resident Advisor", url: "ra.co/..." },
                    { label: "Book a table", url: "dice.fm/..." },
                    { label: "Merch store", url: "shop.com/..." },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-3 rounded-xl bg-background/60 ring-1 ring-border/60 px-4 py-3">
                      <ExternalLink className="size-3.5 text-muted-foreground shrink-0" />
                      <span className="text-sm text-muted-foreground">{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* After — Yuno collective page */}
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-surface ring-1 ring-border p-6 relative">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-5">After — Yuno</p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center text-accent-foreground font-semibold">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-medium">Colectivo Norte</p>
                    <p className="text-[11px] text-muted-foreground">Madrid · 12 promoters</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {[
                    { name: "Subterráneo · Opening", date: "Sat 21 Jun", venue: "Kapital" },
                    { name: "House of Hours", date: "Fri 27 Jun", venue: "Opium" },
                    { name: "Late Night Bloom", date: "Sat 05 Jul", venue: "Fitz" },
                    { name: "Members Only · Vol. 03", date: "Sat 12 Jul", venue: "Gabana" },
                  ].map((e) => (
                    <div key={e.name} className="flex items-center justify-between rounded-xl bg-background/40 ring-1 ring-border/60 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{e.name}</p>
                        <p className="text-[11px] text-muted-foreground">{e.date} · {e.venue}</p>

                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                        Tickets
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TEAM MANAGEMENT */}
      <section className="px-6 py-24 border-y border-border bg-surface/40">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-14 items-center">
          {/* Mockup: team view (no financial numbers) */}
          <Reveal className="order-2 md:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_10%,transparent),transparent_70%)] pointer-events-none" />
              <div className="relative rounded-3xl bg-surface ring-1 ring-border p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Collective
                    </p>
                    <p className="text-base font-medium mt-1">Team roster</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Link2 className="size-3 text-accent" /> Links ready
                  </span>
                </div>
                <div className="space-y-2">
                  {promoters.map((p, i) => (
                    <div
                      key={p.name}
                      className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl bg-background/40 ring-1 ring-border/60 px-4 py-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="size-8 rounded-full bg-surface-2 ring-1 ring-border flex items-center justify-center text-xs font-medium shrink-0">
                          {p.initials}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm truncate">{p.name}</p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Link2 className="size-3" /> yuno.app/p/{p.name.split(" ")[0].toLowerCase()}
                            {i === 0 && (
                              <span className="ml-2 text-accent">· top seller</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent border border-accent/40 rounded-full px-2 py-0.5 shrink-0">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 md:order-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Team management
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05]">
              Your promoters.{" "}
              <span className="serif italic text-muted-foreground">Each with their own link.</span>{" "}
              No spreadsheet needed.
            </h2>
            <p className="mt-6 text-base text-muted-foreground max-w-[56ch] text-pretty">
              Add every promoter in your roster to Yuno. Each one gets their own personal page for every event — they share it on their socials, and your brand stays consistent across the team.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-[56ch] text-pretty">
              No more "send me the link again". No more ten different versions of the same flyer.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SECTION 5 — TERRITORIAL EXCLUSIVITY */}
      <section className="px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_6%,transparent),transparent_70%)] pointer-events-none" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Exclusive access
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05]">
              First in your city.{" "}
              <span className="serif italic text-muted-foreground">The only one.</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground text-pretty">
              Yuno partners with one affiliate collective per city. When you're in, your territory is yours — no competitor collective running events alongside you on the same platform.
            </p>
            <p className="mt-4 text-base text-muted-foreground text-pretty">
              We're opening cities progressively. First to apply, first to get it.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {cities.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-between rounded-xl bg-background/60 ring-1 ring-border px-5 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin
                    className={`size-4 ${c.status === "open" ? "text-accent" : "text-muted-foreground"}`}
                    strokeWidth={1.75}
                  />
                  <span className="text-sm font-medium">{c.name}</span>
                </div>
                <span
                  className={`text-[10px] font-medium uppercase tracking-[0.16em] rounded-full px-2 py-0.5 border ${
                    c.status === "open"
                      ? "text-accent border-accent/40"
                      : "text-muted-foreground border-border"
                  }`}
                >
                  {c.label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
            >
              Apply for your city
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 6 — HOW IT WORKS */}
      <section className="px-6 py-24 border-y border-border bg-surface/40">
        <div className="mx-auto max-w-7xl">
          <Reveal className="text-center mb-14">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              How it works
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              From application to first event — in days.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="h-full p-7 rounded-2xl bg-surface ring-1 ring-border">
                  <div className="flex items-center justify-between mb-5">
                    <span className="size-9 rounded-xl bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center">
                      <s.icon className="size-4 text-accent" strokeWidth={1.75} />
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      Step 0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium tracking-tight mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — FINAL CTA */}
      <section className="px-6 pb-24 pt-24">
        <Reveal className="mx-auto max-w-5xl">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-16 text-center bg-surface ring-1 ring-accent/40">
            <div className="absolute -inset-x-20 -top-40 h-80 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_22%,transparent),transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4 text-balance">
                Your city is waiting.
              </h2>
              <p className="text-muted-foreground max-w-[56ch] mx-auto mb-8 text-pretty">
                One collective per city. Free infrastructure. Exclusive territory. Apply now.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                Apply for your city
                <ArrowRight className="size-4" />
              </Link>
              <p className="mt-5 text-xs text-muted-foreground">
                Free to join · No contract · Exclusive territory
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
