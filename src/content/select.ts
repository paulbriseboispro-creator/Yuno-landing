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
  title: "What's the one thing you'd fix about your nights?",
  subtitle:
    "Yuno runs the money, the floor, the door and the data for the whole night. Tell us what you run and we'll show you the setup built for your job.",
  roles: [
    {
      key: "club",
      to: "/clubs",
      tag: "Club owner",
      title: "I run a venue",
      body: "VIP tables sold and cashed before the night, the whole night on one live screen, your customer data kept, and the money settled under the club's name.",
      bullets: [
        "VIP tables & live minimum-spend tracking",
        "Live night control room + real attendance",
        "CRM, loyalty & staff PIN access",
      ],
      cta: "See Yuno for clubs",
    },
    {
      key: "orga",
      to: "/organizers",
      tag: "Event organizer",
      title: "I throw events",
      body: "A full back-office that tells you if tonight fills and what you net, your own Stripe payout, and an automatic split with the host venue.",
      bullets: [
        "Mission Control: sold, gross & net, check-in",
        "Your own Stripe — Yuno never holds funds",
        "Auto-split with the venue, promoter attribution",
      ],
      cta: "See Yuno for organizers",
    },
  ],
  wedge: {
    tag: "Club × Organizer",
    title: "Co-produce a night? Split it by contract, paid automatically.",
    body: "The one thing no one else does natively: a recurring revenue-share between a club and an organizer or BDE, applied to every ticket, table and drink through Stripe Connect. No cash, no Excel, no argument at settlement.",
    clubCta: { label: "I'm the venue", to: "/clubs", besoin: "co-soiree" },
    orgaCta: { label: "I'm the organizer", to: "/organizers", besoin: "co-soiree" },
  },
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
  title: "Quelle est LA chose que vous régleriez dans vos soirées ?",
  subtitle:
    "Yuno gère l'argent, la salle, l'entrée et les données de toute la nuit. Dites-nous ce que vous gérez, on vous montre la configuration pensée pour votre métier.",
  roles: [
    {
      key: "club",
      to: "/clubs",
      tag: "Gérant de club",
      title: "Je gère un établissement",
      body: "Des tables VIP vendues et encaissées avant la soirée, toute la nuit sur un écran en direct, vos données clients gardées, et l'argent réglé au nom du club.",
      bullets: [
        "Tables VIP & minimum de conso en direct",
        "War-room Live Night + présence réelle",
        "CRM, fidélité & accès staff par PIN",
      ],
      cta: "Voir Yuno pour les clubs",
    },
    {
      key: "orga",
      to: "/organizers",
      tag: "Organisateur d'événements",
      title: "J'organise des soirées",
      body: "Un back-office complet qui dit si ce soir se remplit et ce que vous touchez, votre propre payout Stripe, et une répartition automatique avec l'établissement hôte.",
      bullets: [
        "Mission Control : vendus, brut & net, check-in",
        "Votre propre Stripe — Yuno ne détient jamais les fonds",
        "Répartition auto avec la salle, attribution promoteurs",
      ],
      cta: "Voir Yuno pour les organisateurs",
    },
  ],
  wedge: {
    tag: "Club × Organisateur",
    title: "Vous co-produisez une soirée ? Splittez-la par contrat, payée automatiquement.",
    body: "La chose que personne d'autre ne fait nativement : un partage de revenus récurrent entre un club et un orga ou un BDE, appliqué à chaque billet, table et boisson via Stripe Connect. Sans cash, sans Excel, sans dispute au règlement.",
    clubCta: { label: "Je suis l'établissement", to: "/clubs", besoin: "co-soiree" },
    orgaCta: { label: "Je suis l'organisateur", to: "/organizers", besoin: "co-soiree" },
  },
  footnote: "Vous pourrez changer à tout moment — toute la plateforme est connectée.",
};

export const selectContent: Record<Locale, SelectContent> = { en, fr };

export function useSelect(): SelectContent {
  return selectContent[useLocale()];
}
