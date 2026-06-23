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
import { affiliatesContent, useAffiliates } from "@/content/affiliates";

const stepIcons = [Mail, Handshake, Calendar, Globe];

export const Route = createFileRoute("/affiliates")({
  head: ({ match }) => {
    const m = affiliatesContent[match.context.locale].meta;
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.title },
        { property: "og:description", content: m.ogDescription },
        { property: "og:url", content: "/affiliates" },
      ],
      links: [{ rel: "canonical", href: "/affiliates" }],
    };
  },
  component: AffiliatesPage,
});

function AffiliatesPage() {
  const t = useAffiliates();

  return (
    <>
      {/* SECTION 1 — HERO */}
      <section className="relative px-6 pt-24 pb-20 overflow-hidden">
        <div className="absolute -inset-x-20 -top-32 h-[28rem] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_14%,transparent),transparent_70%)] pointer-events-none" />
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-7">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.02] text-balance">
              {t.hero.title.line1}
              <br />
              {t.hero.title.line2}
              <br />
              <span className="serif italic text-muted-foreground">{t.hero.title.line3}</span>
            </h1>
            <p className="mt-7 text-lg text-muted-foreground max-w-[58ch] text-pretty">
              {t.hero.body}
            </p>
            <div className="mt-9">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                {t.hero.cta}
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
                      <p className="text-sm font-medium">{t.hero.mockup.name}</p>
                      <p className="text-[11px] text-muted-foreground">{t.hero.mockup.meta}</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-medium uppercase tracking-[0.16em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                    {t.hero.mockup.badge}
                  </span>
                </div>
                <div className="space-y-2">
                  {t.heroEvents.map((e) => (
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
                        {t.hero.mockup.getTickets}
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
          {t.pillars.map((p) => (
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
              {t.branded.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05] max-w-[24ch] mx-auto">
              {t.branded.title}{" "}
              <span className="serif italic text-muted-foreground">{t.branded.titleEmphasis}</span>
            </h2>
          </Reveal>

          <div className="mx-auto max-w-[56ch] text-center mb-14">
            <p className="text-base text-muted-foreground text-pretty">
              {t.branded.body}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-start max-w-5xl mx-auto">
            {/* Before — generic Linktree */}
            <Reveal>
              <div className="rounded-3xl bg-surface ring-1 ring-border p-6 relative">
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-5">{t.branded.beforeLabel}</p>
                <div className="space-y-2.5">
                  {t.branded.before.map((l) => (
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
                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground mb-5">{t.branded.afterLabel}</p>
                <div className="flex items-center gap-3 mb-5">
                  <div className="size-10 rounded-xl bg-gradient-to-br from-accent to-accent/40 flex items-center justify-center text-accent-foreground font-semibold">
                    C
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.branded.after.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.branded.after.meta}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {t.branded.after.events.map((e) => (
                    <div key={e.name} className="flex items-center justify-between rounded-xl bg-background/40 ring-1 ring-border/60 px-4 py-3">
                      <div>
                        <p className="text-sm font-medium">{e.name}</p>
                        <p className="text-[11px] text-muted-foreground">{e.date} · {e.venue}</p>

                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent border border-accent/40 rounded-full px-2 py-0.5">
                        {t.branded.after.ticketsLabel}
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
                      {t.team.mockup.eyebrow}
                    </p>
                    <p className="text-base font-medium mt-1">{t.team.mockup.title}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Link2 className="size-3 text-accent" /> {t.team.mockup.linksReady}
                  </span>
                </div>
                <div className="space-y-2">
                  {t.promoters.map((p, i) => (
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
                              <span className="ml-2 text-accent">{t.team.mockup.topSeller}</span>
                            )}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-accent border border-accent/40 rounded-full px-2 py-0.5 shrink-0">
                        {t.team.mockup.active}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 md:order-2">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t.team.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05]">
              {t.team.titleStart}{" "}
              <span className="serif italic text-muted-foreground">{t.team.titleEmphasis}</span>{" "}
              {t.team.titleEnd}
            </h2>
            <p className="mt-6 text-base text-muted-foreground max-w-[56ch] text-pretty">
              {t.team.body1}
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-[56ch] text-pretty">
              {t.team.body2}
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
              {t.exclusivity.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05]">
              {t.exclusivity.titleStart}{" "}
              <span className="serif italic text-muted-foreground">{t.exclusivity.titleEmphasis}</span>
            </h2>
            <p className="mt-6 text-base text-muted-foreground text-pretty">
              {t.exclusivity.body1}
            </p>
            <p className="mt-4 text-base text-muted-foreground text-pretty">
              {t.exclusivity.body2}
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
            {t.cities.map((c) => (
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
              {t.exclusivity.cta}
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
              {t.how.eyebrow}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {t.how.title}
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {t.steps.map((s, i) => {
              const Icon = stepIcons[i];
              return (
                <Reveal key={s.title} delay={i * 0.06}>
                  <div className="h-full p-7 rounded-2xl bg-surface ring-1 ring-border">
                    <div className="flex items-center justify-between mb-5">
                      <span className="size-9 rounded-xl bg-accent/10 ring-1 ring-accent/30 flex items-center justify-center">
                        <Icon className="size-4 text-accent" strokeWidth={1.75} />
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                        {t.how.stepLabel} 0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium tracking-tight mb-2">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                  </div>
                </Reveal>
              );
            })}
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
                {t.finalCta.title}
              </h2>
              <p className="text-muted-foreground max-w-[56ch] mx-auto mb-8 text-pretty">
                {t.finalCta.body}
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-7 py-3.5 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
              >
                {t.finalCta.cta}
                <ArrowRight className="size-4" />
              </Link>
              <p className="mt-5 text-xs text-muted-foreground">
                {t.finalCta.footnote}
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
