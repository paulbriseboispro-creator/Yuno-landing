"use client";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroParallax, type ParallaxProduct } from "@/components/ui/hero-parallax";
import { useBde } from "@/content/bde";

import dashboard from "@/assets/bde/dashboards/dashboard.png";
import analytics from "@/assets/bde/dashboards/analytics.png";
import events from "@/assets/bde/dashboards/events.png";
import orders from "@/assets/bde/dashboards/orders.png";
import clients from "@/assets/bde/dashboards/clients.png";
import profile from "@/assets/bde/dashboards/profile.png";

// Same scroll-parallax hero as the main landing — three rows of landscape cards
// that fill from the top and drift apart on scroll — but showing the BDE Yuno
// organizer dashboards. Fifteen tiles cycle the six screens across the rows.
const products: ParallaxProduct[] = [
  { title: "Tableau de bord", link: "#gratuit", thumbnail: dashboard },
  { title: "Analytique", link: "#gratuit", thumbnail: analytics },
  { title: "Événements", link: "#gratuit", thumbnail: events },
  { title: "Commandes", link: "#gratuit", thumbnail: orders },
  { title: "Clients", link: "#gratuit", thumbnail: clients },
  { title: "Profil public", link: "#gratuit", thumbnail: profile },
  { title: "Tableau de bord", link: "#gratuit", thumbnail: dashboard },
  { title: "Commandes", link: "#gratuit", thumbnail: orders },
  { title: "Analytique", link: "#gratuit", thumbnail: analytics },
  { title: "Événements", link: "#gratuit", thumbnail: events },
  { title: "Clients", link: "#gratuit", thumbnail: clients },
  { title: "Profil public", link: "#gratuit", thumbnail: profile },
  { title: "Tableau de bord", link: "#gratuit", thumbnail: dashboard },
  { title: "Analytique", link: "#gratuit", thumbnail: analytics },
  { title: "Commandes", link: "#gratuit", thumbnail: orders },
];

// Centred hero copy + CTAs, overlaid on the parallax cards. The fade keeps the
// text readable over the top row.
function BdeParallaxHeader() {
  const t = useBde();
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[75vh] bg-gradient-to-b from-background via-background/85 to-transparent" />
      <div className="absolute inset-x-0 top-0 z-20 mx-auto w-full max-w-3xl px-6 pt-16 text-center md:pt-24">
        <span className="pointer-events-auto mb-6 inline-block rounded-full border border-accent/40 bg-background/40 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
          {t.hero.badge}
        </span>
        <h1 className="text-balance text-4xl font-medium leading-[1.06] tracking-tight md:text-6xl">
          {t.hero.titleLead}
          <span className="serif italic text-muted-foreground">{t.hero.titleEmphasis}</span>
          {t.hero.titleRest}
        </h1>
        <p className="mx-auto mt-6 max-w-[52ch] text-pretty text-base text-muted-foreground md:text-lg">
          {t.hero.subtitle}
        </p>
        <div className="pointer-events-auto mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto"
          >
            {t.hero.primaryCta} <ArrowRight className="size-4" />
          </Link>
          <a
            href="#gratuit"
            className="inline-flex w-full items-center justify-center rounded-full bg-background/60 px-6 py-3 text-sm font-medium ring-1 ring-border backdrop-blur-sm transition-colors hover:bg-surface sm:w-auto"
          >
            {t.hero.secondaryCta}
          </a>
        </div>
        <p className="mt-5 text-xs text-muted-foreground">{t.hero.note}</p>
      </div>
    </>
  );
}

export function BdePhoneParallax() {
  // Wrapper carries the #top anchor the BDE header nav links to.
  return (
    <div id="top">
      <HeroParallax products={products} header={<BdeParallaxHeader />} />
    </div>
  );
}
