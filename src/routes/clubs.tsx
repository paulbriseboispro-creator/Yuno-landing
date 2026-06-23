import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/clubs")({
  head: () => ({
    meta: [
      { title: "Yuno for Clubs — Run the floor, not the spreadsheet" },
      {
        name: "description",
        content:
          "Digitize your club: VIP floor plan, click-and-collect bar, PIN-based staff login, built-in CRM and SMS marketing.",
      },
      { property: "og:title", content: "Yuno for Clubs" },
      {
        property: "og:description",
        content: "VIP floor plan, click-and-collect bar, PIN staff login, CRM & SMS.",
      },
      { property: "og:url", content: "/clubs" },
    ],
    links: [{ rel: "canonical", href: "/clubs" }],
  }),
  component: ClubsPage,
});

const sections = [
  {
    tag: "Floor plan",
    title: "Design the room, price the table",
    body: "Drag your tables, set shapes and zones, price each one with its own minimum spend. VIP hosts log bottles on iPad — Yuno tells them when a table is short and what to upsell.",
    meaning: "No more overbooking a table that was already reserved on paper. Your host sees every table's status in real time.",
    bullets: [
      "Drag-and-drop editor, unlimited zones",
      "Live minimum-spend tracking per table",
      "iPad-first VIP host app",
    ],
  },
  {
    tag: "Bar",
    title: "Kill the queue, lift the basket",
    body: "Guests order from their phone, barmen see a live queue — Waiting → Prepping → Ready → Served — and a push notification tells the guest when to walk up.",
    meaning: "Guests pre-order from their phone before they reach the bar. Your staff executes. No cash, no confusion.",
    bullets: [
      "Mobile pre-orders with QR pickup",
      "Live bar-side queue dashboard",
      "Push notifications on every status change",
    ],
  },
  {
    tag: "Staff",
    title: "PIN login built for nightly turnover",
    body: "Forget shared passwords. Create a profile, hand out a 4-digit PIN, the bouncer or barman is signed in in two seconds — and out of your data in one.",
    meaning: "No app download for your team. They enter a PIN at the door and they're in. Bouncers, hosts, managers — different access levels, one system.",
    bullets: [
      "4-digit PIN for bouncers, barmen, VIP hosts and vestiaire",
      "Role-scoped access (no cross-contamination)",
      "Instant revoke, full activity log",
    ],
  },
  {
    tag: "CRM",
    title: "Every guest, every bottle, every incident",
    body: "Visits, favourite bottles, total spend, door incidents — all in one customer record. Send SMS or email campaigns to your top 1% of spenders in two clicks.",
    meaning: "Every guest who ever visited is in your database. You can filter by visit frequency, spend level, or last seen date — and reach them directly.",
    bullets: [
      "Unified guest profile across nights",
      "Segmented SMS & email campaigns",
      "In-app SMS credit purchases",
    ],
  },
  {
    tag: "Beyond the night",
    title: "Loyalty, hype, and the long tail of revenue",
    body: "Yuno keeps working between Saturdays. Reward your regulars, schedule your DJs, manage your promoter teams, and forecast how packed the room will be — before doors even open.",
    bullets: [
      "Loyalty program — points, tiers, rewards",
      "Promoter team management",
      "DJ scheduling & comms",
      "Hype Analysis AI — predictive fill rate",
      "Scarcity tools for ticket urgency",
    ],
  },
] as { tag: string; title: string; body: string; meaning?: string; bullets: string[] }[];

function ClubsPage() {
  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
            For nightclub owners
          </span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[20ch] mx-auto leading-[1.05]">
            Run the floor, <span className="serif italic text-muted-foreground">not the spreadsheet</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-[60ch] mx-auto text-pretty">
            Yuno replaces the cahier des tables, the WhatsApp chain and the cash drawer with one operator-grade dashboard built for high-volume nights.
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              Book a demo <ArrowRight className="size-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center text-sm font-medium px-6 py-3 rounded-full ring-1 ring-border hover:bg-surface transition-colors">
              See pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Early Adopters Offer */}
      <section className="px-6 pb-10">
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
                  3 months free. Then a price locked forever.
                </h2>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-6">
                  We're hand-picking our first 15 partner venues. Founding clubs get <span className="text-foreground font-medium">3 months completely free</span> — no credit card, no commitment. After that, choose monthly at full price or go annual for <span className="text-accent font-medium">2 months free + a lifetime price lock</span>. Your rate never increases, even if our prices go up later.
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition-all">
                    Claim your spot <ArrowRight className="size-4" />
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    No setup fee · No commitment · Exclusive to the first 15 clubs
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-10">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="text-lg md:text-xl text-foreground/90 text-pretty leading-relaxed text-center">
              Most venues run their nights across 4–6 different tools. One for reservations, one for the bar, WhatsApp for the team, a spreadsheet for promoters, and nothing for customer data. <span className="text-accent">Yuno replaces all of it.</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl space-y-6">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <article className="grid md:grid-cols-[180px_1fr] gap-8 p-8 md:p-10 rounded-2xl bg-surface ring-1 ring-border">
                <div>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                    {s.tag}
                  </span>
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4 text-balance">
                    {s.title}
                  </h2>
                  <p className="text-base text-muted-foreground max-w-[60ch] mb-4 text-pretty">{s.body}</p>
                  {s.meaning && (
                    <p className="text-sm text-foreground/80 max-w-[60ch] mb-6 pl-3 border-l-2 border-accent/60 italic">
                      <span className="not-italic font-medium text-accent mr-1">What this means:</span>
                      {s.meaning}
                    </p>
                  )}
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
    </>
  );
}
