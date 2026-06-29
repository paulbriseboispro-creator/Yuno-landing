import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Gift,
  Lock,
  Sparkles,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/site/Reveal";
import { BdePhoneParallax } from "@/components/site/BdePhoneParallax";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { useBde } from "@/content/bde";

import eventFlyer from "@/assets/bde/event-flyer.png";
import soldout from "@/assets/bde/soldout.png";
import agenda from "@/assets/bde/agenda.png";
import guestlist from "@/assets/bde/guestlist.png";
import tickets from "@/assets/bde/tickets.png";

// Landscape organizer dashboards (the BDE Yuno back-office) for the wall further down.
import dashDashboard from "@/assets/bde/dashboards/dashboard.png";
import dashAnalytics from "@/assets/bde/dashboards/analytics.png";
import dashEvents from "@/assets/bde/dashboards/events.png";
import dashOrders from "@/assets/bde/dashboards/orders.png";
import dashClients from "@/assets/bde/dashboards/clients.png";
import dashProfile from "@/assets/bde/dashboards/profile.png";

const QUICK_ICONS: Record<string, LucideIcon> = {
  gift: Gift,
  lock: Lock,
  sparkles: Sparkles,
};

// 16 tiles for the 3D marquee, cycling the five public-design screens.
const MARQUEE_IMAGES = [
  eventFlyer, agenda, soldout, guestlist,
  tickets, soldout, eventFlyer, agenda,
  guestlist, eventFlyer, agenda, tickets,
  soldout, guestlist, eventFlyer, agenda,
];

// 20 landscape tiles cycling the six BDE Yuno organizer dashboards.
const BACKOFFICE_IMAGES = [
  dashDashboard, dashAnalytics, dashEvents, dashOrders, dashClients,
  dashProfile, dashDashboard, dashOrders, dashAnalytics, dashEvents,
  dashClients, dashDashboard, dashProfile, dashAnalytics, dashOrders,
  dashEvents, dashClients, dashDashboard, dashAnalytics, dashProfile,
];

// A single comparison cell: yes/no check or a piece of text. `accent` styles the
// Yuno column; `highlight` bolds the standout rows.
function CompareValue({
  value,
  accent,
  highlight,
}: {
  value: string | boolean;
  accent: boolean;
  highlight?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className={`inline size-5 ${accent ? "text-accent" : "text-muted-foreground"}`} />
    ) : (
      <X className="inline size-5 text-muted-foreground/60" />
    );
  }
  const cls = accent
    ? highlight
      ? "text-accent font-medium"
      : "text-foreground"
    : highlight
      ? "text-foreground"
      : "text-muted-foreground";
  return <span className={cls}>{value}</span>;
}

export function BdePage() {
  const t = useBde();

  return (
    <>
      {/* Hero — phone-screen scroll parallax */}
      <BdePhoneParallax />

      {/* Quick points */}
      <section className="px-6 pb-4">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3">
          {t.quickPoints.map((p, i) => {
            const Icon = QUICK_ICONS[p.icon] ?? Sparkles;
            return (
              <Reveal key={p.title} delay={i * 0.05}>
                <article className="h-full rounded-2xl bg-surface p-6 ring-1 ring-border">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-base font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{p.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Free */}
      <section id="gratuit" className="scroll-mt-24 px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <article className="rounded-3xl bg-surface p-8 ring-1 ring-border md:p-12">
              <span className="mb-5 inline-block rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                {t.free.tag}
              </span>
              <h2 className="text-balance text-2xl font-medium tracking-tight md:text-4xl">
                {t.free.title}
              </h2>
              <p className="mt-4 max-w-[60ch] text-pretty text-muted-foreground">{t.free.body}</p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {t.free.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.75} />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs italic text-muted-foreground">{t.free.caption}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Audience control */}
      <section id="audience" className="scroll-mt-24 border-t border-border px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.audience.tag}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              {t.audience.title}
            </h2>
            <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">{t.audience.body}</p>
          </Reveal>
          <Reveal delay={0.12}>
            <ul className="space-y-3 rounded-3xl bg-surface p-6 ring-1 ring-border md:p-8">
              {t.audience.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm md:text-base">
                  <span className="mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <Lock className="size-3" strokeWidth={2} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* App showcase — the real ticket-selection UI proving the claims */}
      <section id="design" className="scroll-mt-24 border-t border-border px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <Reveal className="order-2 md:order-1">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.showcase.tag}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              {t.showcase.title}
            </h2>
            <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">{t.showcase.body}</p>
            <ul className="mt-6 space-y-4">
              {t.showcase.features.map((f) => (
                <li key={f.title} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} />
                  <div>
                    <p className="text-sm font-medium md:text-base">{f.title}</p>
                    <p className="text-sm text-muted-foreground text-pretty">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Phone frame */}
          <Reveal delay={0.12} className="order-1 flex justify-center md:order-2">
            <div className="relative w-[15rem] shrink-0 sm:w-[16rem]">
              <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-accent/10 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2.2rem] border-[6px] border-zinc-800 bg-zinc-900 shadow-2xl ring-1 ring-white/10">
                <img
                  src={tickets}
                  alt="La page de billetterie Yuno : billets à paliers, tables VIP et guest list"
                  className="h-[34rem] w-full object-cover object-top"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Premium / built for the night */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-8">
            <span className="inline-block rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              {t.premium.tag}
            </span>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              {t.premium.title}
            </h2>
            <p className="mt-4 max-w-[60ch] text-pretty text-muted-foreground">{t.premium.body}</p>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.premium.bullets.map((b, i) => (
              <Reveal key={b} delay={i * 0.04}>
                <div className="flex items-start gap-3 rounded-2xl bg-surface p-5 ring-1 ring-border">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} />
                  <span className="text-sm md:text-base">{b}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Back-office — the real BDE Yuno organizer dashboards (landscape wall) */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.backoffice.eyebrow}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              {t.backoffice.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">{t.backoffice.sub}</p>
          </Reveal>
          <Reveal>
            <div className="relative mx-auto max-w-7xl rounded-3xl bg-surface/40 p-2 ring-1 ring-border">
              <ThreeDMarquee images={BACKOFFICE_IMAGES} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Payout */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl bg-surface p-8 ring-1 ring-accent/40 md:p-12">
              <div className="pointer-events-none absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)]" />
              <div className="relative z-10">
                <span className="mb-5 inline-block rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                  {t.payout.tag}
                </span>
                <h2 className="max-w-[24ch] text-balance text-2xl font-medium tracking-tight md:text-4xl">
                  {t.payout.title}
                </h2>
                <p className="mt-4 max-w-[60ch] text-pretty text-muted-foreground">{t.payout.body}</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* Comparison vs HelloAsso */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <Reveal className="mb-10 text-center">
            <span className="mb-5 inline-block rounded-full border border-accent/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              {t.comparison.eyebrow}
            </span>
            <h2 className="mx-auto max-w-[30ch] text-balance text-2xl font-medium leading-[1.15] tracking-tight md:text-4xl">
              {t.comparison.title}
            </h2>
          </Reveal>

          <Reveal>
            {/* Desktop / tablet — table */}
            <div className="hidden overflow-hidden rounded-3xl bg-surface ring-1 ring-border md:block">
              <div className="grid grid-cols-[1.3fr_1fr_1fr] text-sm">
                <div className="border-b border-border p-5" />
                <div className="border-b border-l border-border p-5 text-center">
                  <div className="text-lg font-medium">{t.comparison.colA}</div>
                </div>
                <div className="border-b border-l border-border bg-accent/5 p-5 text-center">
                  <div className="text-lg font-medium">{t.comparison.colB}</div>
                </div>
                {t.comparison.rows.map((r) => (
                  <div key={r.label} className="contents">
                    <div className={`border-t border-border p-5 ${r.highlight ? "font-medium" : "text-muted-foreground"}`}>
                      {r.label}
                    </div>
                    <div className="border-t border-l border-border p-5 text-center">
                      <CompareValue value={r.a} accent={false} highlight={r.highlight} />
                    </div>
                    <div className="border-t border-l border-border bg-accent/5 p-5 text-center">
                      <CompareValue value={r.b} accent highlight={r.highlight} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile — stacked cards */}
            <div className="divide-y divide-border overflow-hidden rounded-3xl bg-surface ring-1 ring-border md:hidden">
              {t.comparison.rows.map((r) => (
                <div key={r.label} className="p-4">
                  <div className={`mb-3 text-sm ${r.highlight ? "font-medium" : "text-muted-foreground"}`}>
                    {r.label}
                  </div>
                  <div className="grid grid-cols-2 gap-2.5 text-sm">
                    <div className="rounded-xl p-3 text-center ring-1 ring-border/70">
                      <div className="mb-1.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        {t.comparison.colA}
                      </div>
                      <CompareValue value={r.a} accent={false} highlight={r.highlight} />
                    </div>
                    <div className="rounded-xl bg-accent/5 p-3 text-center ring-1 ring-accent/40">
                      <div className="mb-1.5 text-[10px] uppercase tracking-[0.16em] text-accent">
                        {t.comparison.colB}
                      </div>
                      <CompareValue value={r.b} accent highlight={r.highlight} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-[60ch] text-pretty text-center text-base text-muted-foreground">
              {t.comparison.footer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* 3D marquee — wall of the public Yuno design */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.marquee.eyebrow}
            </span>
            <h2 className="mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              {t.marquee.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground text-pretty">{t.marquee.sub}</p>
          </Reveal>
          <Reveal>
            <div className="relative mx-auto max-w-7xl rounded-3xl bg-surface/40 p-2 ring-1 ring-border">
              <ThreeDMarquee images={MARQUEE_IMAGES} aspectClassName="aspect-[9/16]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section id="comment" className="scroll-mt-24 border-t border-border px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <span className="inline-block rounded-full border border-accent/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              {t.steps.tag}
            </span>
            <h2 className="mx-auto mt-4 max-w-[24ch] text-balance text-3xl font-medium tracking-tight md:text-4xl">
              {t.steps.title}
            </h2>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {t.steps.items.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <article className="h-full rounded-2xl bg-surface p-6 ring-1 ring-border">
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground">
                    {s.n}
                  </span>
                  <h3 className="mt-4 text-lg font-medium tracking-tight">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-pretty">{s.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-border px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-8 text-center">
            <span className="inline-block rounded-full border border-accent/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
              {t.faq.eyebrow}
            </span>
            <h2 className="mt-4 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              {t.faq.title}
            </h2>
          </Reveal>
          <Reveal>
            <Accordion className="space-y-2" collapsible type="single">
              {t.faq.items.map((item, i) => (
                <AccordionItem className="border-0" key={item.q} value={`faq-${i}`}>
                  <AccordionTrigger className="rounded-xl bg-surface px-5 py-4 text-left text-sm font-medium transition-colors hover:bg-surface-2 hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pt-3 pb-4 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <article className="relative overflow-hidden rounded-3xl bg-surface p-10 text-center ring-1 ring-accent/40 md:p-14">
              <div className="pointer-events-none absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_70%)]" />
              <div className="relative z-10">
                <h2 className="mx-auto max-w-[22ch] text-balance text-3xl font-medium tracking-tight md:text-4xl">
                  {t.cta.title}
                </h2>
                <p className="mx-auto mt-4 max-w-[48ch] text-pretty text-muted-foreground">{t.cta.body}</p>
                <div className="mt-8 flex justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    {t.cta.button} <ArrowRight className="size-4" />
                  </Link>
                </div>
                <p className="mt-5 text-xs text-muted-foreground">{t.cta.note}</p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
