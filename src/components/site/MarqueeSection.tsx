import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import revenue from "@/assets/dashboards/revenue.png";
import liveNight from "@/assets/dashboards/live-night.png";
import customers from "@/assets/dashboards/customers.png";
import orders from "@/assets/dashboards/orders.png";
import recap from "@/assets/dashboards/recap.png";
import invoices from "@/assets/dashboards/invoices.png";
import menu from "@/assets/dashboards/menu.png";
import subscription from "@/assets/dashboards/subscription.png";

// 32 images distributed across 4 columns of 8. Revenue weighted heaviest.
const images = [
  // Col 1
  revenue, liveNight, customers, revenue, orders, recap, revenue, menu,
  // Col 2
  liveNight, revenue, invoices, customers, revenue, subscription, orders, revenue,
  // Col 3
  recap, customers, revenue, liveNight, menu, revenue, invoices, recap,
  // Col 4
  revenue, orders, subscription, revenue, customers, liveNight, revenue, menu,
];

export function MarqueeSection() {
  return (
    <section className="py-24 px-6 border-t border-border">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            In the wild
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-medium tracking-tight text-balance">
            See Yuno in action across every venue
          </h2>
        </div>
        <div className="relative mx-auto my-10 max-w-7xl rounded-3xl bg-surface/40 p-2 ring-1 ring-border">
          <ThreeDMarquee images={images} />
        </div>
      </div>
    </section>
  );
}
