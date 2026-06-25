import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { clubsContent, useClubs } from "@/content/clubs";
import { pageSeo } from "@/i18n/seo";

export function ClubsPage() {
  const t = useClubs();
  return (
    <>
      <section className="pt-24 pb-16 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <span className="inline-block text-xs font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
            {t.hero.eyebrow}
          </span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[20ch] mx-auto leading-[1.05]">
            {t.hero.titleLead}<span className="serif italic text-muted-foreground">{t.hero.titleEmphasis}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-[60ch] mx-auto text-pretty">
            {t.hero.subtitle}
          </p>
          <div className="mt-10 flex justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors">
              {t.hero.bookDemo} <ArrowRight className="size-4" />
            </Link>
            <Link to="/pricing" className="inline-flex items-center text-sm font-medium px-6 py-3 rounded-full ring-1 ring-border hover:bg-surface transition-colors">
              {t.hero.seePricing}
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
                    {t.earlyAdopters.badge}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-balance max-w-[24ch] mb-4">
                  {t.earlyAdopters.title}
                </h2>
                <p className="text-base text-muted-foreground max-w-[62ch] text-pretty mb-6">
                  {t.earlyAdopters.bodyLead}<span className="text-foreground font-medium">{t.earlyAdopters.bodyHighlight1}</span>{t.earlyAdopters.bodyMid}<span className="text-accent font-medium">{t.earlyAdopters.bodyHighlight2}</span>{t.earlyAdopters.bodyEnd}
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link to="/contact" className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition-all">
                    {t.earlyAdopters.cta} <ArrowRight className="size-4" />
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {t.earlyAdopters.fineprint}
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
              {t.intro.bodyLead}<span className="text-accent">{t.intro.bodyEmphasis}</span>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl space-y-6">
          {t.sections.map((s, i) => (
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
                      <span className="not-italic font-medium text-accent mr-1">{t.whatThisMeans}</span>
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
