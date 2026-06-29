// Clubs page copy in both locales. Components read it via useClubs(); the route
// head() function reads the raw `clubsContent[locale]` map. French is checked
// against the English shape at compile time (ClubsContent = typeof en).
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Yuno for Clubs — Run the floor, not the spreadsheet",
    description:
      "Digitize your club: VIP floor plan, click-and-collect bar, PIN-based staff login, built-in CRM and SMS marketing.",
    ogTitle: "Yuno for Clubs",
    ogDescription: "VIP floor plan, click-and-collect bar, PIN staff login, CRM & SMS.",
  },
  hero: {
    eyebrow: "For nightclub owners",
    titleLead: "Run the floor, ",
    titleEmphasis: "not the spreadsheet",
    subtitle:
      "Yuno replaces the cahier des tables, the WhatsApp chain and the cash drawer with one operator-grade dashboard built for high-volume nights.",
    bookDemo: "Book a demo",
    seePricing: "See pricing",
  },
  earlyAdopters: {
    badge: "Early Adopters — 15 spots only",
    title: "3 months free. Then a price locked forever.",
    bodyLead: "We're hand-picking our first 15 partner venues. Founding clubs get ",
    bodyHighlight1: "3 months completely free",
    bodyMid: " — no credit card, no commitment. After that, choose monthly at full price or go annual for ",
    bodyHighlight2: "2 months free + a lifetime price lock",
    bodyEnd: ". Your rate never increases, even if our prices go up later.",
    cta: "Claim your spot",
    fineprint: "No setup fee · No commitment · Exclusive to the first 15 clubs",
  },
  intro: {
    bodyLead:
      "Most venues run their nights across 4–6 different tools. One for reservations, one for the bar, WhatsApp for the team, a spreadsheet for promoters, and nothing for customer data. ",
    bodyEmphasis: "Yuno replaces all of it.",
  },
  whatThisMeans: "What this means:",
  sections: [
    {
      tag: "Floor plan",
      title: "Design the room, price the table",
      body: "Drag your tables, set shapes and zones, price each one with its own minimum spend. VIP hosts log bottles from their own phone — Yuno tells them when a table is short and what to upsell.",
      meaning: "No more overbooking a table that was already reserved on paper. Your host sees every table's status in real time.",
      bullets: [
        "Drag-and-drop editor, unlimited zones",
        "Live minimum-spend tracking per table",
        "VIP host app that runs on any phone — no extra hardware",
      ],
    },
    {
      tag: "Bar",
      title: "Kill the queue, lift the basket",
      body: "Guests order from their phone, barmen see a live queue — Waiting → Prepping → Ready → Served — and a push notification tells the guest when to walk up.",
      meaning: "Guests pre-order from their phone before they reach the bar. Your staff executes. No cash, no confusion.",
      bullets: [
        "Mobile pre-orders with QR pickup",
        "Live bar-side queue dashboard",
        "Push notifications on every status change",
      ],
    },
    {
      tag: "Staff",
      title: "PIN login built for nightly turnover",
      body: "Forget shared passwords. Create a profile, hand out a 4-digit PIN, the bouncer or barman is signed in in two seconds — and out of your data in one.",
      meaning: "No app download for your team. They enter a PIN at the door and they're in. Bouncers, hosts, managers — different access levels, one system.",
      bullets: [
        "4-digit PIN for bouncers, barmen, VIP hosts and vestiaire",
        "Role-scoped access (no cross-contamination)",
        "Instant revoke, full activity log",
      ],
    },
    {
      tag: "CRM",
      title: "Every guest, every bottle, every incident",
      body: "Visits, favourite bottles, total spend, door incidents — all in one customer record. Send SMS or email campaigns to your top 1% of spenders in two clicks.",
      meaning: "Every guest who ever visited is in your database. You can filter by visit frequency, spend level, or last seen date — and reach them directly.",
      bullets: [
        "Unified guest profile across nights",
        "Segmented SMS & email campaigns",
        "In-app SMS credit purchases",
      ],
    },
    {
      tag: "Beyond the night",
      title: "Loyalty, hype, and the long tail of revenue",
      body: "Yuno keeps working between Saturdays. Reward your regulars, schedule your DJs, manage your promoter teams, and forecast how packed the room will be — before doors even open.",
      meaning: undefined as string | undefined,
      bullets: [
        "Loyalty program — points, tiers, rewards",
        "Promoter team management",
        "DJ scheduling & comms",
        "Hype Analysis AI — predictive fill rate",
        "Scarcity tools for ticket urgency",
      ],
    },
  ],
};

export type ClubsContent = typeof en;

const fr: ClubsContent = {
  meta: {
    title: "Yuno pour les clubs — Gérez la salle, pas le tableur",
    description:
      "Digitalisez votre établissement : plan de salle VIP, bar en click-and-collect, connexion du staff par code PIN, CRM et marketing SMS intégrés.",
    ogTitle: "Yuno pour les clubs",
    ogDescription: "Plan de salle VIP, bar en click-and-collect, connexion du staff par PIN, CRM & SMS.",
  },
  hero: {
    eyebrow: "Pour les gérants de clubs",
    titleLead: "Gérez la salle, ",
    titleEmphasis: "pas le tableur",
    subtitle:
      "Yuno remplace le cahier des tables, la chaîne WhatsApp et la caisse par un seul tableau de bord de niveau opérateur, conçu pour les nuits à fort volume.",
    bookDemo: "Réserver une démo",
    seePricing: "Voir les tarifs",
  },
  earlyAdopters: {
    badge: "Premiers adoptants — 15 places seulement",
    title: "3 mois offerts. Puis un tarif verrouillé à vie.",
    bodyLead: "Nous sélectionnons à la main nos 15 premiers établissements partenaires. Les clubs fondateurs bénéficient de ",
    bodyHighlight1: "3 mois entièrement gratuits",
    bodyMid: " — sans carte bancaire, sans engagement. Ensuite, choisissez le mensuel au tarif plein ou passez à l'annuel pour ",
    bodyHighlight2: "2 mois offerts + un tarif verrouillé à vie",
    bodyEnd: ". Votre tarif n'augmente jamais, même si nos prix montent plus tard.",
    cta: "Réserver ma place",
    fineprint: "Aucuns frais d'installation · Sans engagement · Réservé aux 15 premiers clubs",
  },
  intro: {
    bodyLead:
      "La plupart des établissements gèrent leurs nuits avec 4 à 6 outils différents. Un pour les réservations, un pour le bar, WhatsApp pour l'équipe, un tableur pour les promoteurs, et rien pour les données clients. ",
    bodyEmphasis: "Yuno remplace tout ça.",
  },
  whatThisMeans: "Ce que ça veut dire :",
  sections: [
    {
      tag: "Plan de salle",
      title: "Dessinez la salle, tarifez la table",
      body: "Glissez vos tables, définissez formes et zones, tarifez chacune avec son propre minimum de consommation. Les hôtes VIP enregistrent les bouteilles depuis leur propre téléphone — Yuno leur indique quand une table est en retard et quoi proposer en plus.",
      meaning: "Fini la double réservation d'une table déjà bloquée sur papier. Votre hôte voit le statut de chaque table en temps réel.",
      bullets: [
        "Éditeur glisser-déposer, zones illimitées",
        "Suivi en direct du minimum de consommation par table",
        "App hôte VIP qui tourne sur n'importe quel téléphone — sans matériel en plus",
      ],
    },
    {
      tag: "Bar",
      title: "Supprimez la file, augmentez le panier moyen",
      body: "Les clients commandent depuis leur téléphone, les barmen voient une file en direct — En attente → En préparation → Prêt → Servi — et une notification push prévient le client quand venir.",
      meaning: "Les clients précommandent depuis leur téléphone avant même d'arriver au bar. Votre staff exécute. Sans espèces, sans confusion.",
      bullets: [
        "Précommandes mobiles avec retrait par QR",
        "Tableau de bord de la file côté bar en direct",
        "Notifications push à chaque changement de statut",
      ],
    },
    {
      tag: "Staff",
      title: "Connexion par PIN pensée pour le roulement nocturne",
      body: "Oubliez les mots de passe partagés. Créez un profil, distribuez un code PIN à 4 chiffres, le videur ou le barman est connecté en deux secondes — et coupé de vos données en une.",
      meaning: "Aucune appli à télécharger pour votre équipe. Ils saisissent un PIN à l'entrée et c'est parti. Videurs, hôtes, managers — différents niveaux d'accès, un seul système.",
      bullets: [
        "PIN à 4 chiffres pour videurs, barmen, hôtes VIP et vestiaire",
        "Accès limité par rôle (aucune contamination croisée)",
        "Révocation instantanée, journal d'activité complet",
      ],
    },
    {
      tag: "CRM",
      title: "Chaque client, chaque bouteille, chaque incident",
      body: "Visites, bouteilles préférées, dépense totale, incidents à l'entrée — le tout dans une seule fiche client. Envoyez des campagnes SMS ou email à votre top 1 % des plus gros dépensiers en deux clics.",
      meaning: "Chaque client qui est déjà venu est dans votre base de données. Vous pouvez filtrer par fréquence de visite, niveau de dépense ou date de dernière visite — et les contacter directement.",
      bullets: [
        "Profil client unifié à travers les soirées",
        "Campagnes SMS & email segmentées",
        "Achat de crédits SMS directement dans l'app",
      ],
    },
    {
      tag: "Au-delà de la nuit",
      title: "Fidélité, hype et les revenus de la longue traîne",
      body: "Yuno continue de travailler entre les samedis. Récompensez vos habitués, planifiez vos DJ, gérez vos équipes de promoteurs et anticipez le taux de remplissage de la salle — avant même l'ouverture des portes.",
      meaning: undefined as string | undefined,
      bullets: [
        "Programme de fidélité — points, paliers, récompenses",
        "Gestion des équipes de promoteurs",
        "Planning & communication des DJ",
        "Hype Analysis AI — taux de remplissage prédictif",
        "Outils de rareté pour créer l'urgence sur les billets",
      ],
    },
  ],
};

export const clubsContent: Record<Locale, ClubsContent> = { en, fr };

export function useClubs(): ClubsContent {
  return clubsContent[useLocale()];
}
