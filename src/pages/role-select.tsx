import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { useSelect } from "@/content/select";

import clubPreview from "@/assets/previews/club.png";
import orgaPreview from "@/assets/previews/orga.png";

// Live 9:16 mobile captures of the real Yuno pages, keyed by role.
const rolePreviews: Record<string, string> = {
  club: clubPreview,
  orga: orgaPreview,
};

// The new "/" — a calm role-selection gate. Two cards, two destinations. This
// replaces the old home that tried to say everything to everyone at once.
export function RoleSelectPage() {
  const t = useSelect();

  return (
    <section className="px-6 pt-16 pb-24 md:pt-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-accent">
            {t.eyebrow}
          </span>
          <h1 className="mx-auto mt-4 max-w-[20ch] text-balance text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[56ch] text-pretty text-base text-muted-foreground md:text-lg">
            {t.subtitle}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-6">
          {t.roles.map((role, i) => (
            <Reveal key={role.key} delay={i * 0.1}>
              <Link
                to={role.to}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-surface ring-1 ring-border transition-all hover:ring-accent/50"
              >
                {/* Live mobile preview */}
                <div className="relative overflow-hidden">
                  <img
                    src={rolePreviews[role.key]}
                    alt={role.title}
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                  <span className="absolute left-5 top-5 inline-block rounded-full border border-accent/40 bg-background/60 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
                    {role.tag}
                  </span>
                </div>

                {/* Meta */}
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h2 className="text-2xl font-medium tracking-tight md:text-3xl">{role.title}</h2>
                  <p className="mt-3 text-pretty text-sm text-muted-foreground md:text-base">
                    {role.body}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {role.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-accent"
                          strokeWidth={1.75}
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-flex items-center gap-2 self-start rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors group-hover:bg-primary/90">
                    {role.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Shared wedge band — the co-soirée auto-split, the one thing no
            incumbent does natively. Links into either role's co-soirée pain. */}
        <Reveal delay={0.2}>
          <article className="relative mt-4 overflow-hidden rounded-3xl bg-surface p-7 ring-1 ring-accent/40 md:mt-6 md:p-10">
            <div className="pointer-events-none absolute -inset-x-20 -top-32 h-64 bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_70%)]" />
            <div className="relative z-10">
              <span className="inline-block rounded-full border border-accent/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-accent">
                {t.wedge.tag}
              </span>
              <h2 className="mt-4 max-w-[32ch] text-balance text-2xl font-medium tracking-tight md:text-3xl">
                {t.wedge.title}
              </h2>
              <p className="mt-3 max-w-[64ch] text-pretty text-sm text-muted-foreground md:text-base">
                {t.wedge.body}
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/clubs"
                  search={{ besoin: "co-soiree" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  {t.wedge.clubCta.label}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  to="/organizers"
                  search={{ besoin: "co-soiree" }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-background/60 px-5 py-2.5 text-sm font-medium ring-1 ring-border transition-colors hover:bg-surface"
                >
                  {t.wedge.orgaCta.label}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-10 text-center text-xs text-muted-foreground">{t.footnote}</p>
        </Reveal>
      </div>
    </section>
  );
}
