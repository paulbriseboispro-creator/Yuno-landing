import { Reveal } from "@/components/site/Reveal";
import { useHome } from "@/content/home";

export function FounderQuote() {
  const t = useHome();
  return (
    <section className="px-6 py-16 border-t border-border">
      <div className="mx-auto max-w-5xl grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <Reveal>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t.founderQuote.eyebrow}
          </span>
          <blockquote className="mt-4 text-2xl md:text-3xl font-medium tracking-tight text-balance leading-snug">
            <span className="serif italic text-muted-foreground">"</span>
            {t.founderQuote.quote}
            <span className="serif italic text-muted-foreground">"</span>
          </blockquote>
          <p className="mt-6 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">{t.founderQuote.name}</span> · {t.founderQuote.title}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-3xl bg-surface ring-1 ring-border p-10">
            <div className="text-6xl md:text-7xl font-medium tracking-tight text-accent leading-none">{t.founderQuote.statValue}</div>
            <p className="mt-4 text-base text-muted-foreground text-pretty">
              {t.founderQuote.statBodyA}<span className="text-foreground">{t.founderQuote.statBodyHighlight}</span>{t.founderQuote.statBodyB}
            </p>
            <p className="mt-3 text-base text-foreground">
              {t.founderQuote.statResultA}<span className="text-accent font-medium">{t.founderQuote.statResultHighlight}</span>{t.founderQuote.statResultB}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
