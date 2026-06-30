// Role-selection gate shown at "/" (and "/fr"). Replaces the old, overloaded
// home: instead of one page trying to address clubs, organizers and promoters at
// once, the visitor picks their role and is sent to a focused landing. Bilingual,
// indexed. BDE stays a private/unlinked audience, so it is intentionally NOT
// offered here.
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Yuno — Pick your side of the night",
    description:
      "Yuno runs ticketing, the floor and the door for the whole nightlife stack. Tell us what you run — a venue or events — and we'll show you the right setup.",
    ogDescription: "One platform for nightlife. Choose your role: club owner or event organizer.",
  },
  eyebrow: "Yuno",
  title: "One platform. Pick your side of the night.",
  subtitle:
    "Yuno runs ticketing, the floor and the door for the whole nightlife stack. Tell us what you run and we'll show you the setup built for you.",
  roles: [
    {
      key: "club",
      to: "/clubs",
      tag: "Club owner",
      title: "I run a venue",
      body: "Floor plan, bar, door staff and guest data in one operator-grade dashboard built for high-volume nights.",
      bullets: ["VIP floor plan & tables", "Click-and-collect bar", "PIN staff login & live CRM"],
      cta: "See Yuno for clubs",
    },
    {
      key: "orga",
      to: "/organizers",
      tag: "Event organizer",
      title: "I throw events",
      body: "The lowest ticketing fees in Europe, automatic revenue splits with your host venue, and the door app your team actually wants to use.",
      bullets: [
        "4% per ticket, no monthly fee",
        "Automatic Stripe Connect splits",
        "Your own PIN-based check-in app",
      ],
      cta: "See Yuno for organizers",
    },
  ],
  footnote: "You can switch anytime — the whole platform is connected.",
};

export type SelectContent = typeof en;

const fr: SelectContent = {
  meta: {
    title: "Yuno — Choisissez votre côté de la nuit",
    description:
      "Yuno gère la billetterie, la salle et l'entrée pour toute la nuit. Dites-nous ce que vous gérez — un établissement ou des événements — et on vous montre la bonne configuration.",
    ogDescription:
      "Une plateforme pour la nuit. Choisissez votre rôle : gérant de club ou organisateur d'événements.",
  },
  eyebrow: "Yuno",
  title: "Une plateforme. Choisissez votre côté de la nuit.",
  subtitle:
    "Yuno gère la billetterie, la salle et l'entrée pour toute la nuit. Dites-nous ce que vous gérez, on vous montre la configuration pensée pour vous.",
  roles: [
    {
      key: "club",
      to: "/clubs",
      tag: "Gérant de club",
      title: "Je gère un établissement",
      body: "Plan de salle, bar, staff et données clients dans un seul tableau de bord de niveau opérateur, conçu pour les nuits à fort volume.",
      bullets: [
        "Plan de salle & tables VIP",
        "Bar en click-and-collect",
        "Staff par code PIN & CRM en direct",
      ],
      cta: "Voir Yuno pour les clubs",
    },
    {
      key: "orga",
      to: "/organizers",
      tag: "Organisateur d'événements",
      title: "J'organise des soirées",
      body: "Les frais de billetterie les plus bas d'Europe, une répartition automatique avec votre établissement hôte, et l'app d'accès que votre équipe a vraiment envie d'utiliser.",
      bullets: [
        "4 % par billet, sans abonnement",
        "Répartition Stripe Connect automatique",
        "Votre propre app d'accès par code PIN",
      ],
      cta: "Voir Yuno pour les organisateurs",
    },
  ],
  footnote: "Vous pourrez changer à tout moment — toute la plateforme est connectée.",
};

export const selectContent: Record<Locale, SelectContent> = { en, fr };

export function useSelect(): SelectContent {
  return selectContent[useLocale()];
}
