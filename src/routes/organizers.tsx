import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { SplitVisual } from "@/components/site/SplitVisual";
import { SavingsCalculator } from "@/components/site/SavingsCalculator";
import { organizersContent, useOrganizers } from "@/content/organizers";

export const Route = createFileRoute("/organizers")({
  head: ({ match }) => {
    const m = organizersContent[match.context.locale].meta;
    return {
      meta: [
        { title: m.title },
        { name: "description", content: m.description },
        { property: "og:title", content: m.ogTitle },
        { property: "og:description", content: m.ogDescription },
        { property: "og:url", content: "/organizers" },
      ],
      links: [{ rel: "canonical", href: "/organizers" }],
    };
  },
  component: OrganizersPage,
});

function OrganizersPage() {
  const t = useOrganizers();

  return (
    <>
      <section className="pt-24 pb-12 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
            {t.hero.badge}
          </span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[22ch] mx-auto leading-[1.05]">
            {t.hero.titleLead}<span className="serif italic text-muted-foreground">{t.hero.titleEmphasis}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-[60ch] mx-auto text-pretty">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              {t.hero.primaryCta} <ArrowRight className="size-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center text-sm font-medium px-6 py-3 rounded-full ring-1 ring-border hover:bg-surface transition-colors">
              {t.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Savings calculator */}
      <section className="px-6 py-16 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <Reveal className="text-center mb-10">
            <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1">
              {t.calculator.badge}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[26ch] mx-auto">
              {t.calculator.title}
            </h2>
            <p className="mt-3 text-sm text-muted-foreground max-w-[60ch] mx-auto">
              {t.calculator.subtitle}
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
              {t.split.tag}
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
              {t.split.title}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-[52ch] text-pretty">
              {t.split.body}
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
                {t.math.tag}
              </span>
              <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-balance mb-6">
                {t.math.title}
              </h2>
              <p className="text-base text-muted-foreground mb-6">{t.math.eventPrefix}<span className="text-foreground font-medium">{t.math.eventHighlight}</span>{t.math.eventSuffix}</p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-xl ring-1 ring-border p-5 bg-background/40">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{t.math.legacyLabel}</p>
                  <p className="text-3xl font-medium">{t.math.legacyAmount}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t.math.legacyNote}</p>
                </div>
                <div className="rounded-xl ring-1 ring-accent/40 p-5 bg-background/40">
                  <p className="text-xs uppercase tracking-[0.18em] text-accent mb-2">{t.math.yunoLabel}</p>
                  <p className="text-3xl font-medium text-accent">{t.math.yunoAmount}</p>
                  <p className="text-sm text-muted-foreground mt-2">{t.math.yunoNote}</p>
                </div>
              </div>
              <p className="text-base text-foreground">
                {t.math.conclusionPrefix}<span className="text-accent font-medium">{t.math.conclusionHighlight}</span>{t.math.conclusionSuffix}
              </p>
              <p className="mt-4 text-xs text-muted-foreground italic">{t.math.disclaimer}</p>
            </article>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl space-y-6">
          {t.blocks.map((s, i) => (
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
                  {t.collab.badge}
                </span>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-balance max-w-[24ch] mb-4">
                  {t.collab.title}
                </h2>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty">
                  {t.collab.body}
                </p>
              </div>
            </article>
          </Reveal>
        </div>
      </section>
    </>
  );
}
