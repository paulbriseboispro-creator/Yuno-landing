import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroParallax, type ParallaxProduct } from "@/components/ui/hero-parallax";
import { useHome } from "@/content/home";

import revenue from "@/assets/dashboards/revenue.png";
import liveNight from "@/assets/dashboards/live-night.png";
import customers from "@/assets/dashboards/customers.png";
import orders from "@/assets/dashboards/orders.png";
import recap from "@/assets/dashboards/recap.png";
import invoices from "@/assets/dashboards/invoices.png";
import menu from "@/assets/dashboards/menu.png";
import subscription from "@/assets/dashboards/subscription.png";

const products: ParallaxProduct[] = [
  // Row 1
  { title: "Revenue Analytics", link: "#product", thumbnail: revenue },
  { title: "Live Night", link: "#product", thumbnail: liveNight },
  { title: "Customers", link: "#product", thumbnail: customers },
  { title: "Revenue Analytics", link: "#product", thumbnail: revenue },
  { title: "Orders", link: "#product", thumbnail: orders },
  // Row 2
  { title: "Night Recap", link: "#product", thumbnail: recap },
  { title: "Revenue Analytics", link: "#product", thumbnail: revenue },
  { title: "Menu", link: "#product", thumbnail: menu },
  { title: "Live Night", link: "#product", thumbnail: liveNight },
  { title: "Invoices", link: "#product", thumbnail: invoices },
  // Row 3
  { title: "Subscription", link: "#product", thumbnail: subscription },
  { title: "Revenue Analytics", link: "#product", thumbnail: revenue },
  { title: "Customers", link: "#product", thumbnail: customers },
  { title: "Night Recap", link: "#product", thumbnail: recap },
  { title: "Live Night", link: "#product", thumbnail: liveNight },
];


function ParallaxHeader() {
  const t = useHome();
  return (
    <div className="max-w-7xl relative md:absolute left-0 right-0 mx-auto pt-4 pb-4 md:py-28 px-4 w-full md:top-0 z-20">
      <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground border border-border rounded-full px-3 py-1 mb-4 md:mb-8">
        <span className="size-1.5 rounded-full bg-accent" />
        {t.hero.eyebrow}
      </span>
      <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-balance max-w-[22ch] leading-[1.05]">
        {t.hero.titleA}{" "}
        <span className="serif italic text-muted-foreground">{t.hero.titleEm}</span>{" "}
        {t.hero.titleB}
      </h1>
      <p className="max-w-2xl text-base md:text-lg mt-4 md:mt-8 text-muted-foreground text-pretty">
        {t.hero.sub}
      </p>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-6 md:mt-10">
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
      <p className="mt-3 md:mt-4 text-xs text-muted-foreground/80 max-w-md text-pretty">
        {t.hero.fineprint}
      </p>
    </div>
  );
}

export function HeroParallaxSection() {
  return <HeroParallax products={products} header={<ParallaxHeader />} />;
}
