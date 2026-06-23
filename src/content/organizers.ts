// Organizers page copy, available in every locale. The component reads it via
// useOrganizers(); the route head() function reads the raw
// organizersContent[locale] map. French is checked against the English shape at
// compile time (OrganizersContent = typeof en).
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Yuno for Organizers — Ticketing without the markup",
    description:
      "Run events with the lowest ticketing fees in Europe and split revenue with your host venue automatically through Stripe Connect.",
    ogTitle: "Yuno for Organizers",
    ogDescription:
      "Low-fee ticketing, automated revenue splits, and your own check-in app.",
  },
  hero: {
    badge: "For event organizers",
    titleLead: "Ticketing without the ",
    titleEmphasis: "markup",
    subtitle:
      "Yuno is the missing layer between you, your host venue and the crowd you bring. Low fees, automatic splits, and the door app your team actually wants to use.",
    primaryCta: "Create my first event",
    secondaryCta: "See pricing",
  },
  calculator: {
    badge: "The cheapest in the market",
    title: "How much you'd save vs Shotgun, Weezevent, Xceed",
    subtitle:
      "Set your ticket price and yearly volume. We do the math against every major nightlife ticketing platform.",
  },
  split: {
    tag: "How the split works",
    title: "Money moves the second the card clears",
    body: "Every ticket sale is broken into its agreed parts at the moment of payment. You see it land. The venue sees it land. The promoter who brought the sale sees their commission queued for payout.",
  },
  math: {
    tag: "The math",
    title: "What the difference actually looks like",
    eventPrefix: "An event: ",
    eventHighlight: "200 tickets at €20",
    eventSuffix: ".",
    legacyLabel: "Legacy platform — 8%",
    legacyAmount: "€320",
    legacyNote: "in fees — paid by your attendees, which means fewer people buy.",
    yunoLabel: "Yuno — 4%",
    yunoAmount: "€160",
    yunoNote: "Half the friction at the checkout.",
    conclusionPrefix: "That's ",
    conclusionHighlight: "€160 staying in the room",
    conclusionSuffix: ", per event. Multiply by your season.",
    disclaimer: "Illustrative — rates are real, your mileage will vary.",
  },
  blocks: [
    {
      tag: "Pricing",
      title: "4% per ticket. €0.99 floor. No monthly fee.",
      body: "Stop bleeding 12–18% to legacy ticketing platforms. With Yuno the service fee is 4% per ticket (€0.99 minimum) — always paid by the customer at checkout, never by you.",
      bullets: [
        "Zero monthly fee on the Yuno Core plan",
        "Service fees always paid by the customer",
        "Early Bird / Regular / Late tiers with quotas",
      ],
    },
    {
      tag: "Revenue split",
      title: "Stripe Connect, settled at checkout",
      body: "You and your host venue agree on a contractual split, e.g. 70/30. The instant a ticket clears, funds land in each party's Stripe account — no month-end reconciliation, no awkward DMs.",
      bullets: [
        "Stripe Connect Standard accounts",
        "Promoter commissions deducted automatically",
        "Full audit trail per event",
      ],
    },
    {
      tag: "On the door",
      title: "Your own check-in app, your own crew",
      body: "Recruit scanners for the night and hand each one a temporary PIN. Their phone becomes a scanner. Guest list is synced live across every device.",
      bullets: [
        "PIN-based door staff onboarding",
        "Live guest-list sync across all scanners",
        "PWA-based scanner — works on any smartphone, no app download required",
      ],
    },
  ],
  collab: {
    badge: "Yuno Collab",
    title: "Host an event, unlock the full stack",
    body: "You organize an event in a venue that's not on Yuno? Propose them Yuno Collab. The venue hosts your event and gets access to Yuno Pro dashboards for that night — automatically, at no cost to them. You get a co-branded event page and automatic check-in synced with their door. Everyone wins.",
  },
};

export type OrganizersContent = typeof en;

const fr: OrganizersContent = {
  meta: {
    title: "Yuno pour les organisateurs — La billetterie sans la commission",
    description:
      "Organisez vos événements avec les frais de billetterie les plus bas d'Europe et répartissez automatiquement les revenus avec votre établissement hôte via Stripe Connect.",
    ogTitle: "Yuno pour les organisateurs",
    ogDescription:
      "Billetterie à frais réduits, répartition automatique des revenus et votre propre application de contrôle d'accès.",
  },
  hero: {
    badge: "Pour les organisateurs d'événements",
    titleLead: "La billetterie sans la ",
    titleEmphasis: "commission",
    subtitle:
      "Yuno est la couche qui manquait entre vous, votre établissement hôte et le public que vous amenez. Des frais réduits, des répartitions automatiques et l'application d'accès que votre équipe a vraiment envie d'utiliser.",
    primaryCta: "Créer mon premier événement",
    secondaryCta: "Voir les tarifs",
  },
  calculator: {
    badge: "Les moins chers du marché",
    title: "Combien vous économiseriez face à Shotgun, Weezevent, Xceed",
    subtitle:
      "Indiquez le prix de votre billet et votre volume annuel. Nous faisons le calcul face à toutes les grandes plateformes de billetterie nightlife.",
  },
  split: {
    tag: "Comment fonctionne la répartition",
    title: "L'argent circule dès que la carte est validée",
    body: "Chaque vente de billet est répartie selon les parts convenues au moment du paiement. Vous la voyez arriver. L'établissement la voit arriver. Le promoteur qui a apporté la vente voit sa commission mise en file pour versement.",
  },
  math: {
    tag: "Le calcul",
    title: "À quoi ressemble vraiment la différence",
    eventPrefix: "Un événement : ",
    eventHighlight: "200 billets à 20 €",
    eventSuffix: ".",
    legacyLabel: "Plateforme classique — 8 %",
    legacyAmount: "320 €",
    legacyNote:
      "de frais — payés par vos participants, ce qui veut dire que moins de gens achètent.",
    yunoLabel: "Yuno — 4 %",
    yunoAmount: "160 €",
    yunoNote: "Deux fois moins de friction au paiement.",
    conclusionPrefix: "C'est ",
    conclusionHighlight: "160 € qui restent dans la salle",
    conclusionSuffix: ", par événement. Multipliez par votre saison.",
    disclaimer:
      "À titre indicatif — les taux sont réels, vos résultats varieront.",
  },
  blocks: [
    {
      tag: "Tarifs",
      title: "4 % par billet. Plancher de 0,99 €. Sans frais mensuels.",
      body: "Arrêtez de perdre 12–18 % au profit des plateformes de billetterie classiques. Avec Yuno, les frais de service sont de 4 % par billet (0,99 € minimum) — toujours payés par le client au paiement, jamais par vous.",
      bullets: [
        "Zéro frais mensuel sur le plan Yuno Core",
        "Les frais de service toujours payés par le client",
        "Paliers Early Bird / Regular / Late avec quotas",
      ],
    },
    {
      tag: "Répartition des revenus",
      title: "Stripe Connect, réglée au paiement",
      body: "Vous et votre établissement hôte convenez d'une répartition contractuelle, par ex. 70/30. Dès qu'un billet est validé, les fonds arrivent sur le compte Stripe de chaque partie — aucune réconciliation en fin de mois, aucun message gênant.",
      bullets: [
        "Comptes Stripe Connect Standard",
        "Commissions promoteurs déduites automatiquement",
        "Traçabilité complète par événement",
      ],
    },
    {
      tag: "À l'entrée",
      title: "Votre propre application d'accès, votre propre équipe",
      body: "Recrutez des scanneurs pour la soirée et remettez à chacun un code PIN temporaire. Leur téléphone devient un scanneur. La liste des invités est synchronisée en direct sur tous les appareils.",
      bullets: [
        "Intégration du staff d'entrée par code PIN",
        "Synchro en direct de la liste d'invités sur tous les scanneurs",
        "Scanneur en PWA — fonctionne sur n'importe quel smartphone, sans téléchargement d'application",
      ],
    },
  ],
  collab: {
    badge: "Yuno Collab",
    title: "Organisez un événement, débloquez toute la plateforme",
    body: "Vous organisez un événement dans un établissement qui n'est pas sur Yuno ? Proposez-lui Yuno Collab. L'établissement accueille votre événement et obtient l'accès aux tableaux de bord Yuno Pro pour cette soirée — automatiquement, sans frais pour lui. Vous obtenez une page d'événement co-brandée et un contrôle d'accès automatique synchronisé avec leur entrée. Tout le monde y gagne.",
  },
};

export const organizersContent: Record<Locale, OrganizersContent> = { en, fr };

export function useOrganizers(): OrganizersContent {
  return organizersContent[useLocale()];
}
