import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { useHome } from "@/content/home";
import dashboard from "@/assets/dashboards/dashboard.png";
import analytics from "@/assets/dashboards/analytics.png";
import events from "@/assets/dashboards/events.png";
import orders from "@/assets/dashboards/orders.png";
import clients from "@/assets/dashboards/clients.png";
import profile from "@/assets/dashboards/profile.png";

// 32 images distributed across 4 columns of 8. Dashboard weighted heaviest.
const images = [
  // Col 1
  dashboard, analytics, clients, dashboard, orders, events, dashboard, profile,
  // Col 2
  analytics, dashboard, profile, clients, dashboard, events, orders, analytics,
  // Col 3
  clients, orders, dashboard, analytics, profile, dashboard, events, clients,
  // Col 4
  dashboard, analytics, events, profile, clients, orders, dashboard, analytics,
];

export function MarqueeSection() {
  const t = useHome();
  return (
    <section className="py-16 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            {t.marquee.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            {t.marquee.title}
          </h2>
        </div>
        <div className="relative mx-auto my-10 max-w-7xl rounded-3xl bg-surface/40 p-2 ring-1 ring-border">
          <ThreeDMarquee images={images} />
        </div>
      </div>
    </section>
  );
}
