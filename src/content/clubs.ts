// Owner de club landing (/clubs). Bilingual, indexed. Rebuilt on the shared
// RoleLandingContent shape (the same section skeleton as the /bde landing the
// team liked) so the club owner gets one focused funnel instead of the old,
// overloaded home. French is checked against the English shape at compile time.
// Copy stays grounded in Yuno's real model and the pre-launch posture: the
// founding offer (15 venues, 3 months free, lifetime price lock) is an offer,
// not traction — no "trusted by N clubs" claims.
import { useLocale, type Locale } from "@/i18n/locale";
import type { RoleLandingContent } from "@/content/role-landing";

const en: RoleLandingContent = {
  meta: {
    title: "Yuno for Clubs — Run the floor, not the spreadsheet",
    description:
      "Digitize your club: VIP floor plan, click-and-collect bar, PIN-based staff login, built-in CRM and SMS marketing — one operator-grade dashboard for high-volume nights.",
    ogTitle: "Yuno for Clubs",
    ogDescription: "VIP floor plan, click-and-collect bar, PIN staff login, CRM & SMS.",
  },
  nav: [
    { label: "Floor plan", href: "#audience" },
    { label: "The bar", href: "#app" },
    { label: "Offer", href: "#offre" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "For nightclub owners",
    titleLead: "Run the floor, ",
    titleEmphasis: "not the spreadsheet",
    titleRest: ".",
    subtitle:
      "Yuno replaces the cahier des tables, the WhatsApp chain and the cash drawer with one operator-grade dashboard built for high-volume nights.",
    primaryCta: "Book a demo",
    secondaryCta: "See the offer",
    note: "3 months free · No commitment · 15 founding venues",
  },
  quickPoints: [
    {
      icon: "layers",
      title: "One system, not six",
      body: "Reservations, bar, staff, promoters and customer data — all in a single dashboard instead of 4–6 disconnected tools.",
    },
    {
      icon: "lock",
      title: "PIN login for your crew",
      body: "Hand out a 4-digit PIN. The bouncer or barman is signed in in two seconds, and out of your data in one.",
    },
    {
      icon: "zap",
      title: "Live, all night",
      body: "Every table's minimum, every order, every entry — tracked in real time from doors to close.",
    },
  ],
  free: {
    tag: "Founding offer",
    title: "3 months free. Then a price locked forever.",
    body: "We're hand-picking our first 15 partner venues. Founding clubs get three months completely free — no credit card, no commitment. After that, choose monthly at full price or go annual for two months free and a lifetime price lock. Your rate never increases, even if our prices go up later.",
    bullets: [
      "3 months completely free — no credit card",
      "Annual plan: 2 months free + a price locked for life",
      "No setup fee, no commitment",
      "Exclusive to the first 15 founding clubs",
    ],
    caption:
      "Founding terms apply while spots last. After the free period you choose the plan that fits.",
  },
  audience: {
    tag: "Floor plan",
    title: "Design the room, price the table.",
    body: "Drag your tables, set shapes and zones, price each one with its own minimum spend. VIP hosts log bottles from their own phone — Yuno tells them when a table is short and what to upsell.",
    bullets: [
      "Drag-and-drop editor, unlimited zones",
      "Live minimum-spend tracking per table",
      "VIP host app that runs on any phone — no extra hardware",
      "No more double-booking a table that was reserved on paper",
    ],
  },
  showcase: {
    tag: "The bar",
    title: "Kill the queue, lift the basket.",
    body: "Guests order from their phone, barmen see a live queue — Waiting → Prepping → Ready → Served — and a push notification tells the guest when to walk up. No cash, no confusion.",
    imageAlt: "A Yuno club event page on a phone: the night, tickets and tables.",
    features: [
      {
        title: "Mobile pre-orders with QR pickup",
        body: "Guests pre-order before they reach the bar; your staff just executes.",
      },
      {
        title: "Live bar-side queue dashboard",
        body: "Barmen see every order move through Waiting → Prepping → Ready → Served.",
      },
      {
        title: "Push at every status change",
        body: "The guest is told exactly when to walk up — fewer people crowding the bar.",
      },
    ],
  },
  premium: {
    tag: "Beyond the night",
    title: "Loyalty, hype, and the long tail of revenue.",
    body: "Yuno keeps working between Saturdays. Reward your regulars, schedule your DJs, manage your promoter teams, and forecast how packed the room will be before doors even open.",
    bullets: [
      "Loyalty program — points, tiers, rewards",
      "Promoter team management & attribution",
      "DJ scheduling & comms",
      "Hype Analysis AI — predictive fill rate",
      "Scarcity tools for ticket urgency",
      "Segmented SMS & email campaigns from one CRM",
    ],
  },
  payout: {
    tag: "Live control",
    title: "Every table, every sale, on one screen.",
    body: "Entries, bar orders, table minimums and revenue update in real time as the night runs. Your manager sees the whole room from one dashboard, and money settles cleanly through Stripe — no end-of-night cash count, no month-end reconciliation.",
  },
  collab: {
    tag: "Yuno Collab",
    title: "Host organizers, keep your data.",
    body: "An organizer brings an event to your venue? Connect them through Yuno Collab. They run their ticketing; you get the night's data and Yuno Pro dashboards for that event — automatically, at no cost to you — with check-in synced to your door.",
    bullets: [
      "Host external events without losing visibility",
      "Yuno Pro dashboards for that night, automatically",
      "Co-branded event page with the organizer",
      "Check-in synced with your door staff",
    ],
  },
  comparison: {
    eyebrow: "Yuno vs the tool pile",
    title: "Most venues run the night across six tools. Yuno replaces all of it.",
    colA: "4–6 tools",
    colB: "Yuno",
    rows: [
      {
        label: "Table reservations",
        a: "Paper book / separate app",
        b: "Built in",
        highlight: true,
      },
      { label: "The bar", a: "Register + paper tickets", b: "Click-and-collect" },
      { label: "Staff access", a: "Shared passwords", b: "Role-scoped PIN" },
      { label: "Promoter tracking", a: "Spreadsheet", b: "Automatic attribution" },
      { label: "Customer data", a: false, b: true, highlight: true },
      { label: "Live view of the room", a: false, b: true, highlight: true },
      { label: "Starting cost", a: "Several licences", b: "3 months free" },
      { label: "Setup time", a: "Weeks", b: "One afternoon" },
    ],
    footer:
      "Stop paying for and stitching together six tools that don't talk to each other. One dashboard, one login, one source of truth for the night.",
  },
  marquee: {
    eyebrow: "The Yuno back-office",
    title: "The whole night runs from a single screen.",
    sub: "Revenue, tickets sold, entries, orders, clients — every dashboard tracked live, from the first ticket to last call.",
  },
  steps: {
    tag: "How it works",
    title: "From empty room to last call, in three steps.",
    items: [
      {
        n: "1",
        title: "Design your room",
        body: "Drop your tables and zones, price each minimum spend. Your floor plan is live in minutes.",
      },
      {
        n: "2",
        title: "Hand out the PINs",
        body: "Bouncers, barmen, VIP hosts and vestiaire each get a role-scoped PIN. No app to install.",
      },
      {
        n: "3",
        title: "Run the night",
        body: "Watch every table, order and entry update live. Revoke any access the moment a shift ends.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "The questions owners ask us.",
    items: [
      {
        q: "How much does it cost?",
        a: "Founding venues get three months completely free — no credit card. After that you choose monthly at full price or annual for two months free plus a price locked for life. The founding offer is limited to the first 15 clubs.",
      },
      {
        q: "Do we need to buy hardware?",
        a: "No. The VIP host app, the bar queue and the door check-in all run in the browser on any phone. Staff sign in with a temporary PIN — nothing to install.",
      },
      {
        q: "How long does it take to get set up?",
        a: "About an afternoon. You design your floor plan, set your minimums, create staff PINs, and you're ready for the next night.",
      },
      {
        q: "Who owns our customer data?",
        a: "You do. Every guest who ever visited lives in one CRM — visits, favourite bottles, spend — and you can segment and reach them by SMS or email. Export it anytime.",
      },
      {
        q: "Can we host external organizers in our venue?",
        a: "Yes — that's Yuno Collab. The organizer runs their event ticketing while you get the night's data and Yuno Pro dashboards for that event automatically, with check-in synced to your door.",
      },
    ],
  },
  cta: {
    title: "Ready to run the floor, not the spreadsheet?",
    body: "Book a demo and we'll set your venue up. Founding spots include three months free.",
    button: "Book my demo",
    note: "3 months free · No commitment · 15 founding venues",
  },
};

export type ClubsContent = RoleLandingContent;

const fr: RoleLandingContent = {
  meta: {
    title: "Yuno pour les clubs — Gérez la salle, pas le tableur",
    description:
      "Digitalisez votre établissement : plan de salle VIP, bar en click-and-collect, connexion du staff par code PIN, CRM et marketing SMS intégrés — un seul tableau de bord pour les nuits à fort volume.",
    ogTitle: "Yuno pour les clubs",
    ogDescription:
      "Plan de salle VIP, bar en click-and-collect, connexion du staff par PIN, CRM & SMS.",
  },
  nav: [
    { label: "Plan de salle", href: "#audience" },
    { label: "Le bar", href: "#app" },
    { label: "L'offre", href: "#offre" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "Pour les gérants de clubs",
    titleLead: "Gérez la salle, ",
    titleEmphasis: "pas le tableur",
    titleRest: ".",
    subtitle:
      "Yuno remplace le cahier des tables, la chaîne WhatsApp et la caisse par un seul tableau de bord de niveau opérateur, conçu pour les nuits à fort volume.",
    primaryCta: "Réserver une démo",
    secondaryCta: "Voir l'offre",
    note: "3 mois offerts · Sans engagement · 15 établissements fondateurs",
  },
  quickPoints: [
    {
      icon: "layers",
      title: "Un seul système, pas six",
      body: "Réservations, bar, staff, promoteurs et données clients — tout dans un seul tableau de bord, au lieu de 4 à 6 outils déconnectés.",
    },
    {
      icon: "lock",
      title: "Connexion par PIN pour l'équipe",
      body: "Distribuez un code à 4 chiffres. Le videur ou le barman est connecté en deux secondes, et coupé de vos données en une.",
    },
    {
      icon: "zap",
      title: "En direct, toute la nuit",
      body: "Le minimum de chaque table, chaque commande, chaque entrée — suivis en temps réel de l'ouverture à la fermeture.",
    },
  ],
  free: {
    tag: "Offre fondateur",
    title: "3 mois offerts. Puis un tarif verrouillé à vie.",
    body: "Nous sélectionnons à la main nos 15 premiers établissements partenaires. Les clubs fondateurs bénéficient de trois mois entièrement gratuits — sans carte bancaire, sans engagement. Ensuite, choisissez le mensuel au tarif plein ou passez à l'annuel pour deux mois offerts et un tarif verrouillé à vie. Votre tarif n'augmente jamais, même si nos prix montent plus tard.",
    bullets: [
      "3 mois entièrement gratuits — sans carte bancaire",
      "Annuel : 2 mois offerts + un tarif verrouillé à vie",
      "Aucuns frais d'installation, sans engagement",
      "Réservé aux 15 premiers clubs fondateurs",
    ],
    caption:
      "L'offre fondateur s'applique tant qu'il reste des places. Après la période gratuite, vous choisissez le plan adapté.",
  },
  audience: {
    tag: "Plan de salle",
    title: "Dessinez la salle, tarifez la table.",
    body: "Glissez vos tables, définissez formes et zones, tarifez chacune avec son propre minimum de consommation. Les hôtes VIP enregistrent les bouteilles depuis leur propre téléphone — Yuno leur indique quand une table est en retard et quoi proposer en plus.",
    bullets: [
      "Éditeur glisser-déposer, zones illimitées",
      "Suivi en direct du minimum de consommation par table",
      "App hôte VIP sur n'importe quel téléphone — sans matériel en plus",
      "Fini la double réservation d'une table déjà bloquée sur papier",
    ],
  },
  showcase: {
    tag: "Le bar",
    title: "Supprimez la file, augmentez le panier.",
    body: "Les clients commandent depuis leur téléphone, les barmen voient une file en direct — En attente → En préparation → Prêt → Servi — et une notification push prévient le client quand venir. Sans espèces, sans confusion.",
    imageAlt:
      "Une page d'événement de club sur Yuno, vue sur un téléphone : la soirée, les billets et les tables.",
    features: [
      {
        title: "Précommandes mobiles avec retrait par QR",
        body: "Les clients précommandent avant d'arriver au bar ; votre staff n'a plus qu'à exécuter.",
      },
      {
        title: "File du bar en direct",
        body: "Les barmen voient chaque commande passer d'En attente → En préparation → Prêt → Servi.",
      },
      {
        title: "Push à chaque changement de statut",
        body: "Le client sait exactement quand venir — moins de monde agglutiné au bar.",
      },
    ],
  },
  premium: {
    tag: "Au-delà de la nuit",
    title: "Fidélité, hype et revenus de la longue traîne.",
    body: "Yuno continue de travailler entre les samedis. Récompensez vos habitués, planifiez vos DJ, gérez vos équipes de promoteurs et anticipez le remplissage de la salle avant même l'ouverture des portes.",
    bullets: [
      "Programme de fidélité — points, paliers, récompenses",
      "Gestion & attribution des équipes de promoteurs",
      "Planning & communication des DJ",
      "Hype Analysis AI — taux de remplissage prédictif",
      "Outils de rareté pour créer l'urgence sur les billets",
      "Campagnes SMS & email segmentées depuis un seul CRM",
    ],
  },
  payout: {
    tag: "Pilotage en direct",
    title: "Chaque table, chaque vente, sur un seul écran.",
    body: "Entrées, commandes au bar, minimums de table et recettes se mettent à jour en temps réel pendant la nuit. Votre manager voit toute la salle depuis un seul tableau de bord, et l'argent est réglé proprement via Stripe — sans comptage d'espèces en fin de nuit, sans réconciliation en fin de mois.",
  },
  collab: {
    tag: "Yuno Collab",
    title: "Accueillez des organisateurs, gardez vos données.",
    body: "Un organisateur amène un événement dans votre établissement ? Connectez-le via Yuno Collab. Il gère sa billetterie ; vous obtenez les données de la nuit et les tableaux de bord Yuno Pro pour cet événement — automatiquement, sans frais pour vous — avec un contrôle d'accès synchronisé à votre entrée.",
    bullets: [
      "Accueillez des événements externes sans perdre la visibilité",
      "Tableaux de bord Yuno Pro pour cette soirée, automatiquement",
      "Page d'événement co-brandée avec l'organisateur",
      "Contrôle d'accès synchronisé avec votre staff d'entrée",
    ],
  },
  comparison: {
    eyebrow: "Yuno vs la pile d'outils",
    title: "La plupart des établissements gèrent la nuit avec six outils. Yuno remplace tout ça.",
    colA: "4 à 6 outils",
    colB: "Yuno",
    rows: [
      {
        label: "Réservations de tables",
        a: "Cahier / appli séparée",
        b: "Intégré",
        highlight: true,
      },
      { label: "Le bar", a: "Caisse + tickets papier", b: "Click-and-collect" },
      { label: "Accès du staff", a: "Mots de passe partagés", b: "PIN limité par rôle" },
      { label: "Suivi des promoteurs", a: "Tableur", b: "Attribution automatique" },
      { label: "Données clients", a: false, b: true, highlight: true },
      { label: "Vue de la salle en direct", a: false, b: true, highlight: true },
      { label: "Coût de départ", a: "Plusieurs licences", b: "3 mois offerts" },
      { label: "Mise en place", a: "Des semaines", b: "Un après-midi" },
    ],
    footer:
      "Arrêtez de payer et de bricoler six outils qui ne se parlent pas. Un tableau de bord, une connexion, une seule source de vérité pour la nuit.",
  },
  marquee: {
    eyebrow: "Le back-office Yuno",
    title: "Toute la nuit se pilote depuis un seul écran.",
    sub: "Recettes, billets vendus, entrées, commandes, clients : chaque tableau de bord suivi en direct, du premier billet à la dernière tournée.",
  },
  steps: {
    tag: "Comment ça marche",
    title: "De la salle vide à la dernière tournée, en trois étapes.",
    items: [
      {
        n: "1",
        title: "Dessinez votre salle",
        body: "Déposez vos tables et zones, tarifez chaque minimum de consommation. Votre plan de salle est en ligne en quelques minutes.",
      },
      {
        n: "2",
        title: "Distribuez les PIN",
        body: "Videurs, barmen, hôtes VIP et vestiaire reçoivent chacun un PIN limité à leur rôle. Aucune appli à installer.",
      },
      {
        n: "3",
        title: "Pilotez la nuit",
        body: "Suivez chaque table, commande et entrée en direct. Révoquez n'importe quel accès dès la fin d'un service.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions que nous posent les gérants.",
    items: [
      {
        q: "Combien ça coûte ?",
        a: "Les établissements fondateurs bénéficient de trois mois entièrement gratuits — sans carte bancaire. Ensuite, vous choisissez le mensuel au tarif plein ou l'annuel pour deux mois offerts plus un tarif verrouillé à vie. L'offre fondateur est limitée aux 15 premiers clubs.",
      },
      {
        q: "Faut-il acheter du matériel ?",
        a: "Non. L'app hôte VIP, la file du bar et le contrôle d'accès tournent tous dans le navigateur, sur n'importe quel téléphone. Le staff se connecte avec un PIN temporaire — rien à installer.",
      },
      {
        q: "Combien de temps pour être opérationnel ?",
        a: "Environ un après-midi. Vous dessinez votre plan de salle, définissez vos minimums, créez les PIN du staff, et vous êtes prêts pour la prochaine soirée.",
      },
      {
        q: "À qui appartiennent nos données clients ?",
        a: "À vous. Chaque client qui est déjà venu vit dans un seul CRM — visites, bouteilles préférées, dépense — et vous pouvez le segmenter et le contacter par SMS ou email. Exportable à tout moment.",
      },
      {
        q: "Peut-on accueillir des organisateurs externes dans notre salle ?",
        a: "Oui — c'est Yuno Collab. L'organisateur gère la billetterie de son événement pendant que vous récupérez les données de la nuit et les tableaux de bord Yuno Pro pour cet événement, automatiquement, avec un contrôle d'accès synchronisé à votre entrée.",
      },
    ],
  },
  cta: {
    title: "Prêt à gérer la salle, pas le tableur ?",
    body: "Réservez une démo et on configure votre établissement. Les places fondatrices incluent trois mois offerts.",
    button: "Réserver ma démo",
    note: "3 mois offerts · Sans engagement · 15 établissements fondateurs",
  },
};

export const clubsContent: Record<Locale, RoleLandingContent> = { en, fr };

export function useClubs(): RoleLandingContent {
  return clubsContent[useLocale()];
}
