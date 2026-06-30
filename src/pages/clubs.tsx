import { useSearch } from "@tanstack/react-router";
import { RoleLanding } from "@/components/site/RoleLanding";
import { useClubs } from "@/content/clubs";
import { useLocale } from "@/i18n/locale";
import type { RoleImages } from "@/content/role-landing";

// Owner de club screens — the full Yuno back-office, captured page by page. The
// scroll-parallax hero and the 3D marquee at the bottom both run on these.
// (Confirmed by Paul: les photos du scroll + l'élément du bas = celles du owner.)
import dashDashboard from "@/assets/dashboards/owner/dashboard.png";
import dashAnalytics from "@/assets/dashboards/owner/analytics.png";
import dashEvents from "@/assets/dashboards/owner/events.png";
import dashTicketing from "@/assets/dashboards/owner/ticketing.png";
import dashGuestList from "@/assets/dashboards/owner/guest-list.png";
import dashVipTables from "@/assets/dashboards/owner/vip-tables.png";
import dashDjs from "@/assets/dashboards/owner/djs.png";
import dashBookingDj from "@/assets/dashboards/owner/booking-dj.png";
import dashCollaborations from "@/assets/dashboards/owner/collaborations.png";
import dashPromoters from "@/assets/dashboards/owner/promoters.png";
import dashCustomers from "@/assets/dashboards/owner/customers.png";
import dashLoyalty from "@/assets/dashboards/owner/loyalty.png";
import dashSms from "@/assets/dashboards/owner/sms.png";
import dashOrders from "@/assets/dashboards/owner/orders.png";
import dashInvoices from "@/assets/dashboards/owner/invoices.png";
import dashAccounting from "@/assets/dashboards/owner/accounting.png";
import dashStaff from "@/assets/dashboards/owner/staff.png";
import dashDrinkMenu from "@/assets/dashboards/owner/drink-menu.png";
import dashVipService from "@/assets/dashboards/owner/vip-service.png";
import dashNotifications from "@/assets/dashboards/owner/notifications.png";
// Live Night control room — a real owner screen (lives outside the 20-tile set).
import dashLiveNight from "@/assets/dashboards/live-night.png";
// Phone showcase — a club's customer-facing event page.
import eventFlyer from "@/assets/bde/event-flyer.png";

// All 20 owner dashboards, in owner-sidebar order (Overview → Events →
// Marketing/CRM → Operations). Index positions drive the sequences below.
const DASHBOARDS = [
  dashDashboard, //       0
  dashAnalytics, //       1
  dashEvents, //          2
  dashTicketing, //       3
  dashGuestList, //       4
  dashVipTables, //       5
  dashDjs, //             6
  dashBookingDj, //       7
  dashCollaborations, //  8
  dashPromoters, //       9
  dashCustomers, //      10
  dashLoyalty, //        11
  dashSms, //            12
  dashOrders, //         13
  dashInvoices, //       14
  dashAccounting, //     15
  dashStaff, //          16
  dashDrinkMenu, //      17
  dashVipService, //     18
  dashNotifications, //  19
];

// Localized labels for the parallax cards (hover overlay + alt text), one per
// DASHBOARDS index.
const PARALLAX_TITLES: Record<"en" | "fr", string[]> = {
  en: [
    "Dashboard", "Analytics", "Events", "Ticketing", "Guest list",
    "VIP Tables", "DJs", "Booking DJ", "Collaborations", "Promoters",
    "Customers", "Loyalty", "SMS", "Orders", "Invoices",
    "Accounting", "Staff", "Drink menu", "VIP Service", "Notifications",
  ],
  fr: [
    "Tableau de bord", "Analytique", "Événements", "Billetterie", "Liste invités",
    "Tables VIP", "DJs", "Booking DJ", "Collaborations", "Promoteurs",
    "Clients", "Fidélité", "SMS", "Commandes", "Factures",
    "Comptabilité", "Équipe", "Carte boissons", "Service VIP", "Notifications",
  ],
};

// Hero parallax renders 15 cards (three rows of five) — a curated, visually rich
// subset. The marquee below shows all 20, so every screen still appears.
const BASE_PARALLAX = [
  0, 1, 2, 5, 15, //   dashboard, analytics, events, vip-tables, accounting
  10, 11, 13, 14, 9, // customers, loyalty, orders, invoices, promoters
  6, 7, 8, 18, 3, //    djs, booking-dj, collaborations, vip-service, ticketing
];

// 3D marquee wall — every owner screen (4 columns of 5).
const MARQUEE_SEQUENCE = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

// When a pain is active, these DASHBOARDS indices lead the parallax hero so the
// pain's own screens show first. (Index map: see DASHBOARDS comments above.)
const PAIN_LEAD: Record<string, number[]> = {
  vip: [5, 18, 8],
  "co-soiree": [8, 5, 2],
  data: [1, 4, 0],
  fidelite: [10, 11, 12],
  live: [0, 13, 1],
  bar: [17, 13, 5],
  staff: [16, 4, 19],
  compta: [15, 14, 0],
};

// Real screenshot proving each pain's focus block (keyed by RolePain.id).
const PAIN_IMAGES: Record<string, string> = {
  vip: dashVipTables,
  "co-soiree": dashCollaborations,
  data: dashAnalytics,
  fidelite: dashCustomers,
  live: dashLiveNight,
  bar: dashDrinkMenu,
  staff: dashStaff,
  compta: dashAccounting,
};

// Optional 2nd real screenshot (inset on md+) for the pains whose story spans two
// surfaces — all from existing owner captures, no new exports needed.
const PAIN_IMAGES_ALT: Record<string, string> = {
  vip: dashVipService, // plan VIP + suivi du minimum de conso en direct
  fidelite: dashLoyalty, // CRM + programme de fidélité
  bar: dashOrders, // carte boissons + pipeline de commandes
  compta: dashInvoices, // compta + factures PDF
};

// Lead the parallax with the active pain's screens, then fill from the base set
// (deduped), capped at 15 cards.
function buildParallax(besoin?: string): number[] {
  const lead = (besoin && PAIN_LEAD[besoin]) || [];
  const seen = new Set<number>();
  const out: number[] = [];
  for (const i of [...lead, ...BASE_PARALLAX]) {
    if (!seen.has(i)) {
      seen.add(i);
      out.push(i);
    }
  }
  return out.slice(0, 15);
}

export function ClubsPage() {
  const t = useClubs();
  const locale = useLocale();
  const search = useSearch({ strict: false }) as { besoin?: string };
  const besoin = search.besoin;
  const titles = PARALLAX_TITLES[locale];
  const seq = buildParallax(besoin);

  const images: RoleImages = {
    parallax: seq.map((i) => ({ title: titles[i], thumbnail: DASHBOARDS[i] })),
    marquee: MARQUEE_SEQUENCE.map((i) => DASHBOARDS[i]),
    showcase: eventFlyer,
    painImages: PAIN_IMAGES,
    painImagesAlt: PAIN_IMAGES_ALT,
  };

  return <RoleLanding content={t} images={images} role="club" besoin={besoin} />;
}
