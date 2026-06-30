import { RoleLanding } from "@/components/site/RoleLanding";
import { useOrganizers } from "@/content/organizers";
import { useLocale } from "@/i18n/locale";
import type { RoleImages } from "@/content/role-landing";

// PLACEHOLDER IMAGERY — awaiting the real organizer screens from Paul.
// The parallax hero + 3D marquee currently reuse the club back-office dashboards
// so the page is visually complete; swap DASHBOARDS for the organizer captures
// once they land (drop them in src/assets/organizers/ and update the imports).
import dashDashboard from "@/assets/bde/dashboards/dashboard.png";
import dashAnalytics from "@/assets/bde/dashboards/analytics.png";
import dashEvents from "@/assets/bde/dashboards/events.png";
import dashOrders from "@/assets/bde/dashboards/orders.png";
import dashClients from "@/assets/bde/dashboards/clients.png";
import dashProfile from "@/assets/bde/dashboards/profile.png";
// Phone showcase — the real ticket-selection page guests buy from. Final, not a placeholder.
import tickets from "@/assets/bde/tickets.png";

const DASHBOARDS = [dashDashboard, dashAnalytics, dashEvents, dashOrders, dashClients, dashProfile];

// Localized labels for the parallax cards (hover overlay + alt text).
const PARALLAX_TITLES: Record<"en" | "fr", string[]> = {
  en: ["Dashboard", "Analytics", "Events", "Orders", "Attendees", "Public profile"],
  fr: ["Tableau de bord", "Analytique", "Événements", "Commandes", "Participants", "Profil public"],
};

// 15 cards (three rows of five); 20-tile marquee wall. Both cycle the six screens.
const PARALLAX_SEQUENCE = [0, 1, 2, 3, 4, 5, 0, 3, 1, 2, 4, 5, 0, 1, 3];
const MARQUEE_SEQUENCE = [0, 1, 2, 3, 4, 5, 0, 3, 1, 2, 4, 5, 0, 1, 3, 2, 4, 5, 1, 0];

export function OrganizersPage() {
  const t = useOrganizers();
  const locale = useLocale();
  const titles = PARALLAX_TITLES[locale];

  const images: RoleImages = {
    parallax: PARALLAX_SEQUENCE.map((i) => ({ title: titles[i], thumbnail: DASHBOARDS[i] })),
    marquee: MARQUEE_SEQUENCE.map((i) => DASHBOARDS[i]),
    showcase: tickets,
  };

  return <RoleLanding content={t} images={images} />;
}
