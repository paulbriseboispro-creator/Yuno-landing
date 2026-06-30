"use client";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroParallax, type ParallaxProduct } from "@/components/ui/hero-parallax";

// Generic scroll-parallax hero shared by the role landings (/clubs, /organizers).
// Same three-rows-of-cards treatment as the main + BDE heroes, but the product
// screens and the centred copy are passed in so each role shows its own app.
type HeroCopy = {
  badge: string;
  titleLead: string;
  titleEmphasis: string;
  titleRest?: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  note?: string;
};

function RoleParallaxHeader({ hero }: { hero: HeroCopy }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 hidden h-[75vh] bg-gradient-to-b from-background via-background/85 to-transparent md:block" />
      <div className="relative z-20 mx-auto w-full max-w-3xl px-6 pt-4 pb-4 text-center md:absolute md:inset-x-0 md:top-0 md:pt-24 md:pb-0">
        <span className="pointer-events-auto mb-4 md:mb-6 inline-block rounded-full border border-accent/40 bg-background/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
          {hero.badge}
        </span>
        <h1 className="text-balance text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
          {hero.titleLead}
          <span className="serif italic text-muted-foreground">{hero.titleEmphasis}</span>
          {hero.titleRest}
        </h1>
        <p className="mx-auto mt-4 md:mt-6 max-w-[52ch] text-pretty text-base text-muted-foreground md:text-lg">
          {hero.subtitle}
        </p>
        <div className="pointer-events-auto mt-6 md:mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            {hero.primaryCta} <ArrowRight className="size-4" />
          </Link>
          <a
            href="#offre"
            className="inline-flex w-full items-center justify-center rounded-full bg-background/60 px-6 py-3 text-sm font-medium ring-1 ring-border backdrop-blur-sm transition-colors hover:bg-surface sm:w-auto"
          >
            {hero.secondaryCta}
          </a>
        </div>
        {hero.note && <p className="mt-3 md:mt-5 text-xs text-muted-foreground">{hero.note}</p>}
      </div>
    </>
  );
}

export function RolePhoneParallax({
  products,
  hero,
}: {
  products: ParallaxProduct[];
  hero: HeroCopy;
}) {
  // Wrapper carries the #top anchor the role header's logo links back to.
  return (
    <div id="top">
      <HeroParallax products={products} header={<RoleParallaxHeader hero={hero} />} />
    </div>
  );
}
