import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroParallax, type ParallaxProduct } from "@/components/ui/hero-parallax";
import { useHome } from "@/content/home";

import dashboard from "@/assets/dashboards/dashboard.png";
import analytics from "@/assets/dashboards/analytics.png";
import events from "@/assets/dashboards/events.png";
import orders from "@/assets/dashboards/orders.png";
import clients from "@/assets/dashboards/clients.png";
import profile from "@/assets/dashboards/profile.png";

const products: ParallaxProduct[] = [
  // Row 1
  { title: "Dashboard", link: "#product", thumbnail: dashboard },
  { title: "Analytique", link: "#product", thumbnail: analytics },
  { title: "Clients", link: "#product", thumbnail: clients },
  { title: "Commandes", link: "#product", thumbnail: orders },
  { title: "Événements", link: "#product", thumbnail: events },
  // Row 2
  { title: "Profil public", link: "#product", thumbnail: profile },
  { title: "Dashboard", link: "#product", thumbnail: dashboard },
  { title: "Événements", link: "#product", thumbnail: events },
  { title: "Analytique", link: "#product", thumbnail: analytics },
  { title: "Clients", link: "#product", thumbnail: clients },
  // Row 3
  { title: "Commandes", link: "#product", thumbnail: orders },
  { title: "Dashboard", link: "#product", thumbnail: dashboard },
  { title: "Profil public", link: "#product", thumbnail: profile },
  { title: "Clients", link: "#product", thumbnail: clients },
  { title: "Analytique", link: "#product", thumbnail: analytics },
];


function ParallaxHeader() {
  const t = useHome();
  return (
    <div className="max-w-7xl absolute left-0 right-0 mx-auto py-20 md:py-28 px-4 w-full top-0 z-20">
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-3 py-1 mb-8">
        <span className="size-1.5 rounded-full bg-accent" />
        {t.hero.eyebrow}
      </span>
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[22ch] leading-[1.05]">
        {t.hero.titleA}{" "}
        <span className="serif italic text-muted-foreground">{t.hero.titleEm}</span>{" "}
        {t.hero.titleB}
      </h1>
      <p className="max-w-2xl text-base md:text-lg mt-8 text-muted-foreground text-pretty">
        {t.hero.sub}
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-10">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          {t.hero.ctaPrimary}
          <ArrowRight className="size-4" />
        </Link>
        <a
          href="#product"
          className="inline-flex items-center gap-2 text-sm font-medium text-foreground px-6 py-3 rounded-full ring-1 ring-border hover:bg-surface transition-colors"
        >
          {t.hero.ctaSecondary}
        </a>
      </div>
      <p className="mt-4 text-xs text-muted-foreground/80 max-w-md text-pretty">
        {t.hero.fineprint}
      </p>
    </div>
  );
}

export function HeroParallaxSection() {
  return <HeroParallax products={products} header={<ParallaxHeader />} />;
}
