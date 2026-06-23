import { Reveal } from "@/components/site/Reveal";

export function FounderQuote() {
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Why we built it
          </span>
          <blockquote className="mt-4 text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug">
            <span className="serif italic text-muted-foreground">"</span>
            We built Yuno because we spent too many Sunday mornings reconciling Excel sheets from the night before. There had to be a better way.
            <span className="serif italic text-muted-foreground">"</span>
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Paul</span> · Co-founder, Yuno
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-surface ring-1 ring-border p-10">
            <div className="text-6xl md:text-7xl font-medium tracking-tight text-accent leading-none">4h+</div>
            <p className="mt-4 text-base text-muted-foreground text-pretty">
              The average club spends <span className="text-foreground">4+ hours per event</span> on post-night reconciliation — promoter payouts, bar splits, guest list, refunds.
            </p>
            <p className="mt-3 text-base text-foreground">
              Yuno reduces that to <span className="text-accent font-medium">zero</span>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
