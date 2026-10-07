import type { CrmPageContent } from "./types";

// The guides hub (/fr/guides): every CRM page reachable in one click from the
// CRM footer, so search engines find them and readers browse them.
export const guides: CrmPageContent = {
  id: "guides",
  kind: "hub",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "Guides pour remplir vos soirées : Shotgun, Instagram, SMS | Yuno CRM",
    description:
      "Fidéliser son public, exporter ses acheteurs Shotgun, suivre ses stories Instagram, envoyer des SMS dans les règles : les guides de Yuno CRM.",
  },
  crumb: "Guides",
  card: {
    title: "Tous les guides",
    body: "Shotgun, Instagram, SMS, fidélisation : des méthodes concrètes pour remplir vos soirées.",
  },
  hero: {
    kicker: "Guides",
    title: "Remplir vos soirées, méthode par méthode.",
    accent: "méthode par méthode",
    sub: "Des guides courts et concrets pour les clubs et les organisateurs : ce que permet votre billetterie, ce que dit la loi, ce qui fait revenir votre public.",
    cta: "Essayer Yuno CRM 14 jours",
  },
  blocks: [
    {
      type: "links",
      id: "guides",
      eyebrow: "Les guides",
      title: "Pour vos prochaines soirées.",
      accent: "prochaines soirées",
      pages: ["loyalty", "instagram", "export", "sms"],
    },
    {
      type: "links",
      id: "solutions",
      eyebrow: "Yuno CRM",
      title: "Pour votre profil.",
      accent: "votre profil",
      pages: ["club", "organizer", "shotgun", "brevo"],
    },
  ],
  related: [],
};
