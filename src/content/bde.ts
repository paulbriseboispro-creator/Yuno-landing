// Standalone French-only landing for student unions (BDE — Bureau Des Étudiants).
// This page is intentionally NOT bilingual and NOT linked from the main club/
// organizer site: it lives at /bde, is noindex, and ships with its own minimal
// chrome so a BDE handed the link stays focused and never wanders into the
// club/organizer funnel. Copy stays consistent with Yuno's real model:
//   - 0 € to the BDE in Yuno fees (no subscription, no commission), but Stripe's
//     processing fee stays on the BDE.
//   - Unlike HelloAsso, which absorbs payment fees via the payer's voluntary
//     contribution, Yuno passes Stripe's processing fee to the BDE — so "as free
//     as HelloAsso" is overstated. Say "almost", and name the Stripe difference.
//   - Service fee is paid by the customer: 4% on tickets/tables (BDE floor 0,49 €
//     instead of 0,99 €), 3% on drinks. Shown before payment.
//   - BDE events are PRIVATE by default — link-only, never in public search.
//   - Money settles via Stripe Connect ~2 days after the night, fee-free.
// Pre-launch: no copy implying existing traction.

export const bde = {
  meta: {
    title: "Yuno pour les BDE — La billetterie premium de vos soirées étudiantes",
    description:
      "Gratuit pour votre BDE, pensé pour la nuit. Une page de soirée premium, vos événements privés par défaut et un contrôle d'accès sur smartphone. L'alternative nightlife à HelloAsso.",
  },

  hero: {
    badge: "Pour les BDE & assos étudiantes",
    titleLead: "Vos soirées méritent mieux qu'un ",
    titleEmphasis: "formulaire",
    titleRest: ".",
    subtitle:
      "Yuno, c'est la billetterie pensée pour la nuit étudiante. Gratuite pour votre BDE, premium pour vos invités, et 100 % sous votre contrôle. Vos soirées restent privées, réservées à votre école.",
    primaryCta: "Créer ma soirée",
    secondaryCta: "Voir comment ça marche",
    note: "0 € pour votre BDE · Prêt en quelques minutes · Sans engagement",
  },

  // Three at-a-glance promises under the hero.
  quickPoints: [
    {
      icon: "gift",
      title: "Gratuit pour le BDE",
      body: "Aucun abonnement, aucune commission Yuno. Vous ne payez que les frais bancaires Stripe.",
    },
    {
      icon: "lock",
      title: "Vos soirées, votre public",
      body: "Vos événements sont privés par défaut : accessibles par votre lien, jamais affichés au grand public.",
    },
    {
      icon: "sparkles",
      title: "Une expérience premium",
      body: "Une page de soirée moderne à votre image, qui donne envie de prendre sa place.",
    },
  ],

  free: {
    tag: "Le prix",
    title: "Presque aussi gratuit qu'HelloAsso. En beaucoup plus beau.",
    body: "Comme sur HelloAsso, Yuno ne prend ni abonnement ni commission sur vos ventes. La seule différence côté prix : les frais de traitement Stripe restent à votre charge, là où HelloAsso les absorbe via la contribution volontaire du payeur. Quelques centimes par billet, en échange d'un vrai produit pour la nuit plutôt qu'un formulaire associatif.",
    bullets: [
      "0 € d'abonnement, 0 % de commission Yuno",
      "Vous ne réglez que les frais de traitement Stripe — qu'HelloAsso, lui, prend à sa charge",
      "Tarif étudiant : la part client tombe à 0,49 € par billet au lieu de 0,99 €",
      "Frais affichés au client avant le paiement, jamais de mauvaise surprise",
    ],
    caption:
      "Les frais de service (4 % sur les billets, dès 0,49 € au tarif BDE, 3 % sur les boissons) sont ajoutés au prix et payés par le client au moment de l'achat.",
  },

  audience: {
    tag: "Le contrôle de l'audience",
    title: "Remplissez vos soirées. Pour votre école, pas pour tout internet.",
    body: "Sur Yuno, les soirées d'un BDE sont privées par défaut. Elles n'apparaissent dans aucune recherche publique : seuls celles et ceux à qui vous envoyez le lien peuvent prendre leur place. Vous gardez la main sur qui vient, et vous diffusez là où sont vos étudiants.",
    bullets: [
      "Soirées privées par défaut, accessibles uniquement par votre lien",
      "Jamais listées dans la recherche publique ni revendues ailleurs",
      "Partagez votre lien en story, en bio Instagram, par QR code sur les flyers",
      "Vous décidez : une soirée peut devenir publique sur simple demande",
    ],
  },

  premium: {
    tag: "Pensé pour la nuit",
    title: "Tout ce qu'il faut pour une vraie soirée, rien de l'administratif.",
    body: "Yuno gère votre événement de la billetterie jusqu'à la porte. Vos invités vivent une expérience à la hauteur de la soirée, et votre équipe pilote tout depuis son téléphone.",
    bullets: [
      "Page de soirée premium à votre image (logo et couleurs du BDE)",
      "Billets à paliers : Early Bird, Normal, Dernière minute, avec quotas",
      "Tables VIP et carrés pour vos soirées qui le méritent",
      "Liste d'invités et contrôle d'accès en direct, sur le téléphone du staff",
      "Codes PIN pour vos scanneurs à l'entrée — aucun matériel à acheter",
      "Statistiques en direct : entrées, ventes, recettes, en un coup d'œil",
    ],
  },

  payout: {
    tag: "Votre argent",
    title: "Versé deux jours après la soirée, sans frais.",
    body: "L'argent des ventes arrive sur le compte Stripe de votre BDE deux jours après l'événement, sans frais. Ce court délai laisse le temps de gérer un éventuel remboursement avant le versement. Tout est tracé, au centime près.",
  },

  // Showcase pairing the real ticket-selection UI with feature callouts —
  // "démontrer ce qu'on dit" : the screen proves the claims.
  showcase: {
    tag: "Dans l'app",
    title: "La page de billetterie que vos invités voient vraiment.",
    body: "Pas un formulaire associatif : un écran de soirée pensé pour donner envie de prendre sa place. Tout ce dont vous avez besoin est là, en une seule page.",
    features: [
      {
        title: "Billets à paliers",
        body: "Early Bird, First Release, Last Chance… Vos prix montent, vos invités achètent tôt.",
      },
      {
        title: "Guest list intégrée",
        body: "Entrée gratuite avant une heure, quotas par genre, places limitées affichées en direct.",
      },
      {
        title: "Tables VIP & carrés",
        body: "Réservation de tables avec minimum de conso et plan de salle, directement dans la page.",
      },
    ],
  },

  // 3D marquee — the BDE Yuno organizer dashboards (the hero screens).
  marquee: {
    eyebrow: "Le back-office BDE Yuno",
    title: "Toute votre soirée se pilote depuis un seul écran.",
    sub: "Recettes, billets vendus, entrées, commandes, clients : chaque tableau de bord est suivi en direct, du premier billet jusqu'à la fermeture.",
  },

  comparison: {
    eyebrow: "Yuno vs HelloAsso",
    title: "Aucune commission des deux côtés. Mais une seule est faite pour vos soirées.",
    colA: "HelloAsso",
    colB: "Yuno",
    rows: [
      { label: "Coût pour le BDE", a: "0 € (frais Stripe absorbés)", b: "0 € + frais Stripe" },
      { label: "Pensé pour les soirées", a: "Plateforme associative", b: "Fait pour la nuit", highlight: true },
      { label: "Page de soirée à votre image", a: "Formulaire standard", b: "Page premium", highlight: true },
      { label: "Soirées privées par défaut", a: false, b: true, highlight: true },
      { label: "Billets à paliers (Early Bird)", a: "Limité", b: true },
      { label: "Tables VIP & carrés", a: false, b: true },
      { label: "Contrôle d'accès à l'entrée", a: "QR basique", b: "App multi-scanneurs, PIN, live" },
      { label: "Statistiques en direct", a: false, b: true },
      { label: "Versement", a: "Virement", b: "Stripe Connect, 2 j après" },
      { label: "Frais côté client", a: "Contribution « volontaire »", b: "4 % transparent, dès 0,49 €" },
    ] as { label: string; a: string | boolean; b: string | boolean; highlight?: boolean }[],
    footer:
      "Vous utilisez déjà HelloAsso ? Pour quelques centimes de frais Stripe par billet, gagnez une vraie billetterie de soirée et le contrôle de votre public.",
  },

  steps: {
    tag: "Comment ça marche",
    title: "De l'idée à la porte, en trois étapes.",
    items: [
      {
        n: "1",
        title: "Créez votre soirée",
        body: "Montez votre page en quelques minutes : visuel, billets à paliers, tables. À votre image.",
      },
      {
        n: "2",
        title: "Partagez votre lien",
        body: "En story, en bio Insta, par QR sur les flyers. Vos étudiants prennent leur place en deux clics.",
      },
      {
        n: "3",
        title: "Scannez à l'entrée",
        body: "Vos scanneurs se connectent avec un code PIN. La liste se met à jour en direct sur tous les téléphones.",
      },
    ],
  },

  faq: {
    eyebrow: "FAQ",
    title: "Les questions qu'on nous pose.",
    items: [
      {
        q: "C'est vraiment gratuit pour le BDE ?",
        a: "Côté Yuno, oui : aucun abonnement et aucune commission. La nuance honnête, c'est qu'il reste les frais de traitement Stripe, à la charge de votre BDE — là où HelloAsso, lui, les prend en charge. On parle de quelques centimes par billet.",
      },
      {
        q: "Alors, qui paie les frais ?",
        a: "Les frais de service sont ajoutés au prix et payés par le client à l'achat : 4 % sur les billets (dès 0,49 € au tarif BDE, contre 0,99 € en standard) et 3 % sur les boissons. Tout est affiché avant le paiement.",
      },
      {
        q: "Nos soirées sont-elles visibles par tout le monde ?",
        a: "Non. Les soirées d'un BDE sont privées par défaut : accessibles uniquement par le lien que vous partagez, et jamais affichées dans une recherche publique. Vous pouvez choisir de rendre une soirée publique si vous le souhaitez.",
      },
      {
        q: "Faut-il acheter du matériel ou une appli ?",
        a: "Non. Le contrôle d'accès se fait sur le téléphone de votre staff, directement dans le navigateur. Chaque scanneur se connecte avec un code PIN temporaire, rien à installer.",
      },
      {
        q: "Comment et quand sommes-nous payés ?",
        a: "L'argent arrive sur le compte Stripe de votre BDE deux jours après la soirée, sans frais. Ce délai couvre les éventuels remboursements. Chaque vente est tracée au centime.",
      },
      {
        q: "On utilise déjà HelloAsso, pourquoi changer ?",
        a: "Côté prix, c'est presque pareil : pas de commission Yuno, seulement les frais Stripe (qu'HelloAsso absorbe, c'est la petite différence). En échange, vous gagnez une billetterie pensée pour la nuit : page premium, billets à paliers, tables VIP, contrôle d'accès en direct, statistiques, et surtout des soirées privées réservées à votre école.",
      },
    ],
  },

  cta: {
    title: "Prêt à remplir votre prochaine soirée ?",
    body: "Créez votre première soirée gratuitement. On vous accompagne pour la mettre en ligne.",
    button: "Créer ma soirée",
    note: "0 € pour votre BDE · Sans engagement",
  },
};

export type BdeContent = typeof bde;

export function useBde(): BdeContent {
  return bde;
}
