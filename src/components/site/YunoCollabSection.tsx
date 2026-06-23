import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useHome } from "@/content/home";

export function YunoCollabSection() {
  const t = useHome();
  return (
    <section className="px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <article className="relative overflow-hidden rounded-3xl bg-surface ring-1 ring-border p-10 md:p-16">
            <div className="absolute -right-32 -top-32 size-96 bg-[radial-gradient(circle,color-mix(in_oklab,var(--accent)_20%,transparent),transparent_70%)] pointer-events-none" />
            <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-10 items-end">
              <div className="max-w-[60ch]">
                <span className="inline-block text-[10px] font-medium uppercase tracking-[0.18em] text-accent border border-accent/40 rounded-full px-3 py-1 mb-6">
                  {t.collab.eyebrow}
                </span>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-balance leading-[1.05] mb-6">
                  {t.collab.titleA}{" "}
                  <span className="serif italic text-muted-foreground">{t.collab.titleEm}</span>
                </h2>
                <p className="text-base md:text-lg text-muted-foreground text-pretty mb-4">
                  {t.collab.body}
                </p>
                <p className="text-base text-foreground mb-8">
                  {t.collab.costLabel} <span className="text-accent font-medium">{t.collab.costValue}</span>
                </p>
                <p className="text-sm serif italic text-muted-foreground mb-8 max-w-[50ch]">
                  {t.collab.note}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full text-sm font-semibold hover:brightness-110 transition-all"
                >
                  {t.collab.cta}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
