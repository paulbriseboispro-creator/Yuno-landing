import { useSearch } from "@tanstack/react-router";
import { RoleLanding } from "@/components/site/RoleLanding";
import { useOrganizers } from "@/content/organizers";
import { useLocale } from "@/i18n/locale";
import type { RoleImages } from "@/content/role-landing";

// Fallback screens (real Yuno owner / BDE captures) used until dedicated
// organizer captures are dropped into src/assets/organizers/.
import bdeDashboard from "@/assets/bde/dashboards/dashboard.png";
import bdeAnalytics from "@/assets/bde/dashboards/analytics.png";
import bdeEvents from "@/assets/bde/dashboards/events.png";
import bdeOrders from "@/assets/bde/dashboards/orders.png";
import ownerCollaborations from "@/assets/dashboards/owner/collaborations.png";
import ownerPromoters from "@/assets/dashboards/owner/promoters.png";
import ownerTicketing from "@/assets/dashboards/owner/ticketing.png";
import ownerCustomers from "@/assets/dashboards/owner/customers.png";
import ownerAccounting from "@/assets/dashboards/owner/accounting.png";
import ownerGuestList from "@/assets/dashboards/owner/guest-list.png";
import ownerSms from "@/assets/dashboards/owner/sms.png";
import ownerInvoices from "@/assets/dashboards/owner/invoices.png";
// Phone showcase — the real ticket page guests buy from, split across two screens
// (billets + liste d'invités, then tables VIP + plan de salle) because the live
// page stacks all of it vertically and it doesn't fit legibly on one phone.
import showcaseTickets from "@/assets/organizers/showcase/tickets.png";
import showcaseTables from "@/assets/organizers/showcase/tables.png";

// Auto-pick the real organizer captures the moment they exist in
// src/assets/organizers/<name>.png — just drop a PNG there (dashboard.png,
// analytics.png, …) and it's used automatically, no code change. Until then,
// each one falls back to an existing owner/BDE screen so the build stays green.
const ORG_GLOB = import.meta.glob("../assets/organizers/*.png", {
  eager: true,
  import: "default",
}) as Record<string, string>;
function org(name: string, fallback: string): string {
  const hit = Object.entries(ORG_GLOB).find(([p]) => p.endsWith(`/${name}.png`));
  return hit ? hit[1] : fallback;
}

const imgDashboard = org("dashboard", bdeDashboard);
const imgAnalytics = org("analytics", bdeAnalytics);
const imgEvents = org("events", bdeEvents);
const imgOrders = org("orders", bdeOrders);
const imgCustomers = org("customers", ownerCustomers);
const imgCollaborations = org("collaborations", ownerCollaborations);
const imgPromoters = org("promoters", ownerPromoters);
const imgTicketing = org("ticketing", ownerTicketing);
const imgAccounting = org("accounting", ownerAccounting);
const imgCheckin = org("checkin", ownerGuestList);
const imgGuestList = org("guest-list", ownerGuestList);
const imgCampaign = org("campaign", ownerSms);
const imgInvoices = org("invoices", ownerInvoices);

// Parallax hero + 3D marquee run on these real organizer screens (index-keyed).
const DASHBOARDS = [
  imgDashboard, //      0
  imgAnalytics, //      1
  imgEvents, //         2
  imgOrders, //         3
  imgCustomers, //      4
  imgCollaborations, // 5
  imgPromoters, //      6
  imgTicketing, //      7
  imgAccounting, //     8
];

const PARALLAX_TITLES: Record<"en" | "fr", string[]> = {
  en: [
    "Dashboard", "Analytics", "Events", "Orders", "Customers",
    "Collaborations", "Promoters", "Ticketing", "Accounting",
  ],
  fr: [
    "Tableau de bord", "Analytique", "Événements", "Commandes", "Clients",
    "Collaborations", "Promoteurs", "Billetterie", "Comptabilité",
  ],
};

// 15 cards (three rows of five); 20-tile marquee wall. Both cycle the 9 screens.
const BASE_PARALLAX = [0, 1, 2, 7, 8, 4, 5, 6, 3, 1, 0, 2, 7, 8, 5];
const MARQUEE_SEQUENCE = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 2, 4, 6, 8, 1, 3, 5, 7, 0, 1];

// Active-pain parallax lead (indices into DASHBOARDS above).
const PAIN_LEAD: Record<string, number[]> = {
  orga: [0, 1, 8],
  prix: [8, 1, 0],
  billetterie: [7, 3, 2],
  "co-soiree": [5, 2, 8],
  promo: [6, 3, 1],
  data: [1, 3, 0],
  fidelite: [4, 1, 0],
  porte: [2, 7, 0],
  compta: [8, 3, 1],
};

// Focus-block proof image per pain.
const PAIN_IMAGES: Record<string, string> = {
  orga: imgDashboard,
  prix: imgAccounting,
  "co-soiree": imgCollaborations,
  promo: imgPromoters,
  billetterie: imgTicketing,
  data: imgAnalytics,
  fidelite: imgCustomers,
  porte: imgCheckin,
  compta: imgAccounting,
};

// Optional 2nd image (inset on md+).
const PAIN_IMAGES_ALT: Record<string, string> = {
  orga: imgAnalytics,
  prix: imgInvoices,
  "co-soiree": imgEvents,
  billetterie: imgOrders,
  data: imgOrders,
  fidelite: imgCampaign,
  porte: imgGuestList,
  compta: imgInvoices,
};

// Only nine organizer screens exist today, so the parallax deliberately repeats
// them to fill all 15 cards (three rows of five) — same full-height hero as
// /clubs, with no dead space below the last row. Lead with the active pain's
// screens, then cycle the base sequence, skipping a card only when it would sit
// directly next to an identical one. (A global dedup here would collapse the
// nine screens into nine cards, leaving the third row empty.)
function buildParallax(besoin?: string): number[] {
  const lead = (besoin && PAIN_LEAD[besoin]) || [];
  const out: number[] = [...lead];
  for (let bi = 0; out.length < 15; bi++) {
    const i = BASE_PARALLAX[bi % BASE_PARALLAX.length];
    if (out[out.length - 1] !== i) out.push(i);
  }
  return out.slice(0, 15);
}

export function OrganizersPage() {
  const t = useOrganizers();
  const locale = useLocale();
  const search = useSearch({ strict: false }) as { besoin?: string };
  const besoin = search.besoin;
  const titles = PARALLAX_TITLES[locale];
  const seq = buildParallax(besoin);

  const images: RoleImages = {
    parallax: seq.map((i) => ({ title: titles[i], thumbnail: DASHBOARDS[i] })),
    marquee: MARQUEE_SEQUENCE.map((i) => DASHBOARDS[i]),
    showcase: showcaseTickets,
    showcaseAlt: showcaseTables,
    painImages: PAIN_IMAGES,
    painImagesAlt: PAIN_IMAGES_ALT,
  };

  return <RoleLanding content={t} images={images} role="orga" besoin={besoin} />;
}
