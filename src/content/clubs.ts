// Owner de club landing (/clubs). Bilingual, indexed. Rebuilt on the shared
// RoleLandingContent shape (the same section skeleton as the /bde landing the
// team liked) so the club owner gets one focused funnel instead of the old,
// overloaded home. French is checked against the English shape at compile time.
// Copy stays grounded in Yuno's real model (docs/yuno-context.md: €0
// subscription, 0% commission, no paid plans) — no "trusted by N clubs" claims.
import { useLocale, type Locale } from "@/i18n/locale";
import type { RoleLandingContent } from "@/content/role-landing";

const en: RoleLandingContent = {
  meta: {
    title: "Nightclub management software for club owners | Yuno",
    description:
      "Run your club from one account: VIP floor plan with deposits, ticketing and guest list, door control, staff screens and CRM. €0 subscription, 0% commission.",
    ogTitle: "Yuno for Clubs",
    ogDescription: "VIP floor plan, ticketing & guest list, PIN staff login, CRM & SMS.",
  },
  nav: [
    { label: "Floor plan", href: "#audience" },
    { label: "Event page", href: "#app" },
    { label: "Offer", href: "#offre" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "For nightclub owners",
    titleLead: "Your most profitable tables, ",
    titleEmphasis: "sold and paid before the night starts",
    titleRest: ".",
    subtitle:
      "An €800 VIP table that no-shows is dead money. Yuno sells and cashes your tables up front, tracks every minimum spend live, and settles the night under the club's own name — no paper floor plan, no WhatsApp, no end-of-night cash count.",
    primaryCta: "Book a demo",
    secondaryCta: "See the offer",
    note: "€0 subscription · 0% commission · 4% tickets & tables (€0.99 min), paid by the customer",
  },
  quickPoints: [
    {
      icon: "card",
      title: "Cashed before the doors open",
      body: "Tables, packs and tickets are paid up front through Stripe. The money is in before the night starts, not chased the morning after.",
    },
    {
      icon: "lock",
      title: "Paid under your name",
      body: "Every sale settles to the club's own Stripe account — you stay merchant of record, the money lands on your IBAN, the accounting reconciles itself.",
    },
    {
      icon: "zap",
      title: "Live, all night",
      body: "Every table's minimum, every sale, every entry — tracked in real time from doors to close, on one screen.",
    },
  ],
  free: {
    tag: "Pricing",
    title: "€0 subscription. 0% commission on your price.",
    body: "No subscription and no commission on your price, at one published service level. The buyer pays a service fee at checkout — 4% on tickets and tables (€0.99 minimum, capped at €25 on tables) — so it isn't taken out of your revenue. You only pay Stripe's card processing (1.5% + €0.25), and the money lands on your own account.",
    bullets: [
      "€0 subscription, 0% commission on your price",
      "Buyer pays 4% on tickets & tables (€0.99 min, €25 max on tables)",
      "No setup fee, no commitment",
      "Money straight to your own Stripe account",
    ],
    caption:
      "Fees are added at checkout and paid by the buyer. Card processing by Stripe (1.5% + €0.25) is paid by the venue.",
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
    tag: "The event page",
    title: "Tickets and tables bought in thirty seconds, no app.",
    body: "Each night gets one page: tickets with their price tiers, the guest list and your VIP tables, bought by card or Apple Pay without creating an account. The QR arrives by email and in Apple Wallet, and every buyer joins your customer base.",
    imageAlt: "A club's event page on Yuno, on a phone.",
    features: [
      {
        title: "One page for the whole night",
        body: "Tickets, guest list and VIP tables side by side, each switched on or off per night.",
      },
      {
        title: "Checkout in thirty seconds",
        body: "Card or Apple Pay, no account, no app. The QR lands by email and in Apple Wallet.",
      },
      {
        title: "Every buyer in your base",
        body: "Tickets, tables and guest-list sign-ups join your CRM, ready for the next night.",
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
      "Attendance & no-show analytics per night",
      "Scarcity tools for ticket urgency",
      "Segmented SMS & email campaigns from one CRM",
    ],
  },
  payout: {
    tag: "Live control",
    title: "Every table, every sale, on one screen.",
    body: "Entries, ticket sales, table minimums and revenue update in real time as the night runs. Your manager sees the whole room from one dashboard, and money settles cleanly through Stripe — no end-of-night cash count, no month-end reconciliation.",
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
      { label: "The door", a: "Paper list + another scanner app", b: "One scanner for everything" },
      { label: "Staff access", a: "Shared passwords", b: "Role-scoped PIN" },
      { label: "Promoter tracking", a: "Spreadsheet", b: "Automatic attribution" },
      { label: "Customer data", a: false, b: true, highlight: true },
      { label: "Live view of the room", a: false, b: true, highlight: true },
      { label: "Starting cost", a: "Several licences", b: "€0 subscription" },
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
        body: "Bouncers, VIP hosts and cloakroom staff each get a role-scoped PIN. No app to install.",
      },
      {
        n: "3",
        title: "Run the night",
        body: "Watch every table, sale and entry update live. Revoke any access the moment a shift ends.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "The questions owners ask us.",
    items: [
      {
        q: "How much does it cost?",
        a: "€0 subscription and 0% commission on your price. The buyer pays a service fee at checkout (4% on tickets and tables, €0.99 minimum, capped at €25 on tables). You only pay Stripe's card processing (1.5% + €0.25), and the money goes straight to your own account.",
      },
      {
        q: "Do we need to buy hardware?",
        a: "No. The VIP host app, the door check-in and the cloakroom all run in the browser on any phone. Staff sign in with a temporary PIN — nothing to install.",
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
    title: "Ready to run the night on your terms?",
    body: "Create your account in two minutes, or book a demo and we'll set your venue up with you.",
    button: "Book my demo",
    note: "€0 subscription · 0% commission · No commitment",
  },
  defaultPainId: "vip",
  pains: [
    {
      id: "vip",
      chipLabel: "VIP tables",
      hero: {
        badge: "VIP & bottle service",
        titleLead: "Your most profitable tables, ",
        titleEmphasis: "sold and paid before the night starts",
        titleRest: ".",
        subtitle:
          "An €800 table that no-shows is dead money. Sell and cash your tables up front, track every minimum spend live, and run VIP service from a phone instead of a paper plan and the host's memory.",
      },
      focus: {
        tag: "VIP & bottle service",
        title: "Sell the table, track the minimum, run the service.",
        body: "Build your floor plan, price each table with its own minimum spend and packs, and take the deposit through Stripe up front. On the night the VIP host sees every table live — what's been spent, what's left to reach the minimum, what to upsell — from their own phone.",
        bullets: [
          "Drag-and-drop floor-plan editor and table packs",
          "Live minimum-spend bar: spent / minimum / left to reach",
          "VIP service timer and a dedicated VIP host dashboard",
          "The table is cashed before the night, under the club's name",
        ],
      },
      contactLabel: "VIP tables & bottle service",
    },
    {
      id: "co-soiree",
      chipLabel: "Co-hosted nights",
      hero: {
        badge: "Co-hosted nights",
        titleLead: "The co-produced night, ",
        titleEmphasis: "split by contract and paid automatically",
        titleRest: ".",
        subtitle:
          "Sharing the takings with a BDE or an organizer by cash, Excel and informal transfers means zero traceability and arguments at settlement. Yuno splits every ticket and table to the agreed shares, automatically, while the club stays merchant of record.",
      },
      focus: {
        tag: "Co-hosted revenue split",
        title: "Agree the split once. Yuno applies it to every sale.",
        body: "Set a recurring revenue-share contract between the club and the organizer or BDE. It's attached to the event before tickets go on sale, and the money splits at each sale through Stripe Connect, by item type. The club stays seller of record. No incumbent does this natively.",
        bullets: [
          "Recurring club ↔ organizer / BDE revenue-share contract",
          "Automatic split on tickets and tables via Stripe Connect",
          "Club stays merchant of record (name on the statement)",
          "Collaboration proposals inbox — no more cash and Excel",
        ],
      },
      contactLabel: "Co-hosted night revenue split with an organizer / BDE",
    },
    {
      id: "data",
      chipLabel: "Who came",
      hero: {
        badge: "Attendance & data",
        titleLead: "Not who bought. ",
        titleEmphasis: "Who actually walked in",
        titleRest: ".",
        subtitle:
          "You know who paid. You don't know who came. Yuno gives you real attendance from scanned tickets and guest list, the true no-show rate, revenue per head, and the real door peak by scan time.",
      },
      focus: {
        tag: "Attendance analytics",
        title: "Real heads, real no-show rate, real door peak.",
        body: "Your attendance is scanned tickets, plus checked-in table guests, plus scanned guest list — not who paid. See the no-show rate (red alert above 25%), revenue per head, guest-list fill rate, and arrivals by hour computed on scan time, so you read the real door peak, not the purchase time.",
        bullets: [
          "True attendance from entry scans, not sales",
          "No-show rate with a red alert above 25%",
          "Revenue per head and guest-list fill rate",
          "Arrivals by hour on scan time — the real door peak",
        ],
      },
      contactLabel: "Real attendance data and no-show tracking",
    },
    {
      id: "fidelite",
      chipLabel: "Loyalty & data",
      hero: {
        badge: "CRM & loyalty",
        titleLead: "The one place in the night where ",
        titleEmphasis: "you keep your customers",
        titleRest: ", not lose them.",
        subtitle:
          "Most clubs have zero customer data: a guest comes once and is never seen again. Yuno builds a per-venue CRM that segments every customer and a loyalty program that gives them a reason to come back.",
      },
      focus: {
        tag: "CRM & loyalty",
        title: "Know your regulars. Give them a reason to return.",
        body: "Two parts. A CRM that auto-segments every customer relative to your venue (champions, loyal, promising, new, at-risk, dormant, lost) with churn risk, average basket and a map of where they came from. And a configurable loyalty program: points per euro, Bronze / Silver / Gold / Platinum tiers (0 / 200 / 500 / 1000€), QR rewards and a post-visit message.",
        bullets: [
          "RFM segmentation relative to your venue, plus churn risk",
          "Customer origins map, average basket, CSV export",
          "Loyalty: points, four tiers, QR rewards, post-visit CRM message",
        ],
        caveat:
          "Client-side loyalty (points / QR) is live; the owner predictive engine is on the roadmap, not shipped.",
      },
      contactLabel: "Customer CRM and a loyalty program",
    },
    {
      id: "live",
      chipLabel: "Live night",
      hero: {
        badge: "Live night",
        titleLead: "The whole night on one screen — ",
        titleEmphasis: "the door backing up shows the minute it happens",
        titleRest: ", not the next morning.",
        subtitle:
          "During the night you're blind, running between the door, the tables and the booth with no overview. Yuno's Live Night is the real-time control room for the night in progress.",
      },
      focus: {
        tag: "Live night control room",
        title: "A war-room for the night in progress.",
        body: "Live KPIs (revenue, tickets, entries, refunds, cloakroom), per-staff activity, the entry flow by hour, and severity alerts — a rush is info, a refund spike is critical.",
        bullets: [
          "Live KPI bar with live / 1h / full-night windows",
          "Per-staff activity and the entry flow in real time",
          "Severity alerts: rush, refund spike",
        ],
      },
      contactLabel: "The Live Night real-time control room",
    },
    {
      id: "staff",
      chipLabel: "Staff access",
      hero: {
        badge: "Staff & access",
        titleLead: "Each role signs in in two seconds and ",
        titleEmphasis: "sees only their post",
        titleRest: " — without ever sharing your password.",
        subtitle:
          "You can't hand the master login to a bouncer. Yuno gives every role — door, cloakroom, VIP — its own view, fast, on a shared phone.",
      },
      focus: {
        tag: "Staff & roles",
        title: "Role dashboards, PIN login, your password stays yours.",
        body: "Bouncer, VIP host and cloakroom each get their own dashboard and a per-employee PIN login. The bouncer scans tickets and guest list and logs incidents; the VIP host seats the tables; the cloakroom turns the ticket into a QR. A manager gets around 25 granular permissions, delegated without account control.",
        bullets: [
          "Per-role dashboards and per-employee PIN login",
          "Bouncer entry control and incident log; cloakroom QR",
          "Manager role with ~25 delegated permissions",
        ],
      },
      contactLabel: "PIN staff login and role dashboards",
    },
    {
      id: "compta",
      chipLabel: "Accounting",
      hero: {
        badge: "Money & accounting",
        titleLead: "The money lands under the club's name, ",
        titleEmphasis: "and the accounting reconciles itself",
        titleRest: ".",
        subtitle:
          "Reconciling Stripe payouts against ticket and table sales by hand, plus a shoebox of receipts for the accountant. Yuno makes the money one source of truth.",
      },
      focus: {
        tag: "Accounting",
        title: "One source of truth, club as seller of record.",
        body: "Club revenue equals the amount paid minus Yuno's fee; net payout is gross minus Stripe minus refunds, across tickets and tables. An accounting view with gross / club net / Yuno fee / Stripe fee / refunds per line and configurable VAT, PDF invoices per ticket and table with period exports, and refunds that read the service fee frozen at purchase.",
        bullets: [
          "Accounting view: gross / club net / Yuno / Stripe / refunds, configurable VAT",
          "PDF invoices per ticket and table, plus period exports",
          "Money paid under the club's name, direct payout to your IBAN",
        ],
      },
      contactLabel: "Accounting, invoices and Stripe reconciliation",
    },
  ],
};

export type ClubsContent = RoleLandingContent;

const fr: RoleLandingContent = {
  meta: {
    title: "Logiciel de gestion de boîte de nuit pour discothèques | Yuno",
    description:
      "Pilotez votre club dans un seul compte : plan de salle VIP avec acompte, billetterie et guest list, contrôle d'accès, écrans staff et CRM. 0 € d'abonnement.",
    ogTitle: "Yuno pour les clubs",
    ogDescription:
      "Plan de salle VIP, billetterie & guest list, connexion du staff par PIN, CRM & SMS.",
  },
  nav: [
    { label: "Plan de salle", href: "#audience" },
    { label: "Page de soirée", href: "#app" },
    { label: "L'offre", href: "#offre" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "Pour les gérants de clubs",
    titleLead: "Vos tables les plus rentables, ",
    titleEmphasis: "vendues et encaissées avant que la soirée commence",
    titleRest: ".",
    subtitle:
      "Une table VIP à 800 € qui ne vient pas, c'est mort sec. Yuno vend et encaisse vos tables à l'avance, suit chaque minimum de conso en direct, et règle la soirée au nom du club — sans plan papier, sans WhatsApp, sans comptage de caisse à la fermeture.",
    primaryCta: "Réserver une démo",
    secondaryCta: "Voir l'offre",
    note: "0 € d'abonnement · 0 % de commission · 4 % billets & tables (min 0,99 €), payés par le client",
  },
  quickPoints: [
    {
      icon: "card",
      title: "Encaissé avant l'ouverture",
      body: "Tables, packs et billets payés à l'avance via Stripe. L'argent rentre avant le début de la soirée, pas le lendemain matin.",
    },
    {
      icon: "lock",
      title: "Réglé à votre nom",
      body: "Chaque vente arrive sur le compte Stripe du club — vous restez vendeur de record, l'argent atterrit sur votre IBAN, la compta se réconcilie toute seule.",
    },
    {
      icon: "zap",
      title: "En direct, toute la nuit",
      body: "Le minimum de chaque table, chaque vente, chaque entrée — suivis en temps réel de l'ouverture à la fermeture, sur un seul écran.",
    },
  ],
  free: {
    tag: "Le prix",
    title: "0 € d'abonnement. 0 % de commission sur votre prix.",
    body: "Pas d'abonnement et pas de commission sur votre prix, à un seul niveau de service publié. L'acheteur paie des frais de service au moment du paiement — 4 % sur les billets et les tables (0,99 € minimum, plafonnés à 25 € sur les tables) — donc jamais déduits de vos revenus. Vous ne payez que le traitement de carte Stripe (1,5 % + 0,25 €), et l'argent arrive sur votre propre compte.",
    bullets: [
      "0 € d'abonnement, 0 % de commission sur votre prix",
      "L'acheteur paie 4 % sur billets & tables (0,99 € min, 25 € max sur les tables)",
      "Aucuns frais d'installation, sans engagement",
      "L'argent directement sur votre compte Stripe",
    ],
    caption:
      "Les frais sont ajoutés au paiement et payés par l'acheteur. Le traitement de carte Stripe (1,5 % + 0,25 €) est à la charge de l'établissement.",
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
    tag: "La page de soirée",
    title: "Billets et tables achetés en trente secondes, sans app.",
    body: "Chaque soirée a sa page : les billets et leurs paliers de prix, la guest list et vos tables VIP, achetés par carte ou Apple Pay sans créer de compte. Le QR arrive par email et dans Apple Wallet, et chaque acheteur entre dans votre base clients.",
    imageAlt: "La page de soirée d'un club sur Yuno, sur un téléphone.",
    features: [
      {
        title: "Une page pour toute la soirée",
        body: "Billets, guest list et tables VIP côte à côte, chacun activé ou coupé par soirée.",
      },
      {
        title: "Paiement en trente secondes",
        body: "Carte ou Apple Pay, sans compte ni app. Le QR arrive par email et dans Apple Wallet.",
      },
      {
        title: "Chaque acheteur dans votre base",
        body: "Billets, tables et inscriptions en guest list entrent dans votre CRM, prêts pour la prochaine soirée.",
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
      "Analyses de présence & no-show par soirée",
      "Outils de rareté pour créer l'urgence sur les billets",
      "Campagnes SMS & email segmentées depuis un seul CRM",
    ],
  },
  payout: {
    tag: "Pilotage en direct",
    title: "Chaque table, chaque vente, sur un seul écran.",
    body: "Entrées, ventes de billets, minimums de table et recettes se mettent à jour en temps réel pendant la nuit. Votre manager voit toute la salle depuis un seul tableau de bord, et l'argent est réglé proprement via Stripe — sans comptage d'espèces en fin de nuit, sans réconciliation en fin de mois.",
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
      {
        label: "La porte",
        a: "Liste papier + une autre appli de scan",
        b: "Un seul scanner pour tout",
      },
      { label: "Accès du staff", a: "Mots de passe partagés", b: "PIN limité par rôle" },
      { label: "Suivi des promoteurs", a: "Tableur", b: "Attribution automatique" },
      { label: "Données clients", a: false, b: true, highlight: true },
      { label: "Vue de la salle en direct", a: false, b: true, highlight: true },
      { label: "Coût de départ", a: "Plusieurs licences", b: "0 € d'abonnement" },
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
        body: "Videurs, hôtes VIP et vestiaire reçoivent chacun un PIN limité à leur rôle. Aucune appli à installer.",
      },
      {
        n: "3",
        title: "Pilotez la nuit",
        body: "Suivez chaque table, vente et entrée en direct. Révoquez n'importe quel accès dès la fin d'un service.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions que nous posent les gérants.",
    items: [
      {
        q: "Combien ça coûte ?",
        a: "0 € d'abonnement et 0 % de commission sur votre prix. L'acheteur paie des frais de service au moment du paiement (4 % sur les billets et les tables, 0,99 € minimum, plafonnés à 25 € sur les tables). Vous ne payez que le traitement de carte Stripe (1,5 % + 0,25 €), et l'argent va directement sur votre propre compte.",
      },
      {
        q: "Faut-il acheter du matériel ?",
        a: "Non. L'app hôte VIP, le contrôle d'accès et le vestiaire tournent tous dans le navigateur, sur n'importe quel téléphone. Le staff se connecte avec un PIN temporaire — rien à installer.",
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
    title: "Prêt à piloter la nuit à vos conditions ?",
    body: "Créez votre compte en deux minutes, ou réservez une démo et on configure votre établissement avec vous.",
    button: "Réserver ma démo",
    note: "0 € d'abonnement · 0 % de commission · Sans engagement",
  },
  defaultPainId: "vip",
  pains: [
    {
      id: "vip",
      chipLabel: "Tables VIP",
      hero: {
        badge: "VIP & service bouteille",
        titleLead: "Vos tables les plus rentables, ",
        titleEmphasis: "vendues et encaissées avant que la soirée commence",
        titleRest: ".",
        subtitle:
          "Une table à 800 € qui ne vient pas, c'est mort sec. Vendez et encaissez vos tables à l'avance, suivez chaque minimum de conso en direct, et gérez le service VIP depuis un téléphone plutôt qu'un plan papier et la mémoire de l'hôtesse.",
      },
      focus: {
        tag: "VIP & service bouteille",
        title: "Vendez la table, suivez le minimum, pilotez le service.",
        body: "Construisez votre plan de salle, tarifez chaque table avec son minimum de conso et ses packs, prenez l'acompte via Stripe à l'avance. Le soir, l'hôte VIP voit chaque table en direct — ce qui est consommé, ce qu'il reste pour atteindre le minimum, quoi proposer en plus — depuis son propre téléphone.",
        bullets: [
          "Éditeur de plan de salle et packs de tables",
          "Barre de minimum de conso en direct : consommé / minimum / reste à atteindre",
          "Timer de service et tableau de bord hôte VIP dédié",
          "La table est encaissée avant la soirée, au nom du club",
        ],
      },
      contactLabel: "Tables VIP & service bouteille",
    },
    {
      id: "co-soiree",
      chipLabel: "Soirées co-produites",
      hero: {
        badge: "Soirées co-produites",
        titleLead: "La soirée co-produite, ",
        titleEmphasis: "splittée par contrat et payée automatiquement",
        titleRest: ".",
        subtitle:
          "Partager la recette avec un BDE ou un orga en cash, Excel et virements informels, c'est zéro traçabilité et des disputes au règlement. Yuno répartit chaque billet et chaque table selon les parts convenues, automatiquement, pendant que le club reste vendeur de record.",
      },
      focus: {
        tag: "Répartition co-soirée",
        title: "Convenez la répartition une fois. Yuno l'applique à chaque vente.",
        body: "Mettez en place un contrat de partage de revenus récurrent entre le club et l'orga ou le BDE. Il est attaché à l'événement avant la mise en vente, et l'argent se répartit à chaque vente via Stripe Connect, par type d'item. Le club reste vendeur de record. Aucun concurrent ne le fait nativement.",
        bullets: [
          "Contrat de partage de revenus récurrent club ↔ orga / BDE",
          "Répartition automatique sur billets et tables via Stripe Connect",
          "Le club reste vendeur de record (nom sur le relevé)",
          "Boîte de propositions de collab — fini le cash et l'Excel",
        ],
      },
      contactLabel: "Répartition d'une soirée co-produite avec un orga / BDE",
    },
    {
      id: "data",
      chipLabel: "Qui est venu",
      hero: {
        badge: "Présence & données",
        titleLead: "Pas qui a acheté. ",
        titleEmphasis: "Qui est réellement entré",
        titleRest: ".",
        subtitle:
          "Vous savez qui a payé. Vous ne savez pas qui est venu. Yuno vous donne la présence réelle (billets scannés et liste d'invités), le vrai taux de no-show, le revenu par tête et le vrai pic de porte par heure de scan.",
      },
      focus: {
        tag: "Analytique de présence",
        title: "Des vraies têtes, un vrai taux de no-show, un vrai pic de porte.",
        body: "Votre présence, c'est les billets scannés, plus les invités de table check-in, plus la guestlist scannée — pas qui a payé. Voyez le taux de no-show (alerte rouge au-delà de 25 %), le revenu par tête, le taux de remplissage de la guestlist, et les arrivées par heure calculées sur l'heure de scan, pour lire le vrai pic de porte, pas l'heure d'achat.",
        bullets: [
          "Présence réelle issue des scans d'entrée, pas des ventes",
          "Taux de no-show avec alerte rouge au-delà de 25 %",
          "Revenu par tête et taux de remplissage de la guestlist",
          "Arrivées par heure sur l'heure de scan — le vrai pic de porte",
        ],
      },
      contactLabel: "Données de présence réelle et suivi du no-show",
    },
    {
      id: "fidelite",
      chipLabel: "Fidélité & data",
      hero: {
        badge: "CRM & fidélité",
        titleLead: "Le seul endroit de la nuit où ",
        titleEmphasis: "vous gardez vos clients",
        titleRest: ", pas où vous les perdez.",
        subtitle:
          "La plupart des clubs ont zéro donnée client : un client vient une fois et on ne le revoit jamais. Yuno construit un CRM propre à votre lieu qui segmente chaque client, et un programme de fidélité qui lui donne une raison de revenir.",
      },
      focus: {
        tag: "CRM & fidélité",
        title: "Connaissez vos habitués. Donnez-leur une raison de revenir.",
        body: "Deux briques. Un CRM qui segmente automatiquement chaque client relativement à votre lieu (champions, fidèles, prometteurs, nouveaux, à risque, dormants, perdus) avec churn-risk, panier moyen et carte des pays d'origine. Et un programme de fidélité configurable : points par euro, paliers Bronze / Silver / Gold / Platinum (0 / 200 / 500 / 1000 €), récompenses en QR et message post-visite.",
        bullets: [
          "Segmentation RFM relative à votre lieu, plus churn-risk",
          "Carte des pays d'origine, panier moyen, export CSV",
          "Fidélité : points, quatre paliers, récompenses QR, message CRM post-visite",
        ],
        caveat:
          "La fidélité côté client (points / QR) est live ; le moteur prédictif côté owner est au roadmap, pas encore livré.",
      },
      contactLabel: "CRM clients et programme de fidélité",
    },
    {
      id: "live",
      chipLabel: "Live night",
      hero: {
        badge: "Live night",
        titleLead: "Toute la soirée sur un seul écran — ",
        titleEmphasis: "la porte qui bouchonne se voit à la minute",
        titleRest: ", pas le lendemain.",
        subtitle:
          "Pendant la soirée vous êtes aveugle, à courir entre la porte, les tables et le booth sans vue d'ensemble. Le Live Night de Yuno, c'est la war-room temps réel de la soirée en cours.",
      },
      focus: {
        tag: "War-room Live Night",
        title: "Une war-room pour la soirée en cours.",
        body: "KPIs live (revenu, billets, entrées, remboursements, vestiaire), l'activité par staff, le flux d'entrées par heure, et des alertes de sévérité — un rush est une info, un pic de remboursements une alerte critique.",
        bullets: [
          "Barre de KPIs live avec fenêtres live / 1h / nuit complète",
          "Activité par staff et flux d'entrées en temps réel",
          "Alertes de sévérité : backlog, rush, pic de remboursements",
        ],
      },
      contactLabel: "La war-room temps réel Live Night",
    },
    {
      id: "staff",
      chipLabel: "Accès staff",
      hero: {
        badge: "Staff & accès",
        titleLead: "Chaque rôle se connecte en deux secondes et ",
        titleEmphasis: "ne voit que son poste",
        titleRest: " — sans jamais partager votre mot de passe.",
        subtitle:
          "Impossible de filer le login maître à un videur. Yuno donne à chaque rôle — porte, vestiaire, VIP — sa propre vue, vite, sur un téléphone partagé.",
      },
      focus: {
        tag: "Staff & rôles",
        title: "Dashboards par rôle, connexion par PIN, votre mot de passe reste le vôtre.",
        body: "Videur, hôte VIP et vestiaire ont chacun leur dashboard et une connexion par PIN par employé. Le videur scanne billets et guestlist et log les incidents ; l'hôte VIP place les tables ; le vestiaire transforme le ticket en QR. Le manager reçoit environ 25 permissions granulaires, déléguées sans contrôle du compte.",
        bullets: [
          "Dashboards par rôle et connexion par PIN par employé",
          "Contrôle d'entrée videur et journal d'incidents ; QR vestiaire",
          "Rôle manager avec ~25 permissions déléguées",
        ],
      },
      contactLabel: "Connexion staff par PIN et dashboards par rôle",
    },
    {
      id: "compta",
      chipLabel: "Comptabilité",
      hero: {
        badge: "Argent & compta",
        titleLead: "L'argent atterrit au nom du club, ",
        titleEmphasis: "et la compta se réconcilie toute seule",
        titleRest: ".",
        subtitle:
          "Réconcilier les virements Stripe avec les ventes billets et tables à la main, plus la boîte à chaussures de reçus pour le comptable. Yuno fait de l'argent une seule source de vérité.",
      },
      focus: {
        tag: "Comptabilité",
        title: "Une source de vérité, le club comme vendeur de record.",
        body: "Revenu club = montant payé moins les frais Yuno ; payout net = brut moins Stripe moins remboursements, sur les billets et les tables. Une vue comptabilité avec brut / net club / frais Yuno / frais Stripe / remboursements par ligne et TVA configurable, des factures PDF par billet et par table avec exports par période, et des remboursements qui lisent le frais de service gelé à l'achat.",
        bullets: [
          "Vue compta : brut / net club / Yuno / Stripe / remboursements, TVA configurable",
          "Factures PDF par billet et par table, plus exports par période",
          "Argent encaissé au nom du club, payout direct sur votre IBAN",
        ],
      },
      contactLabel: "Comptabilité, factures et réconciliation Stripe",
    },
  ],
};

export const clubsContent: Record<Locale, RoleLandingContent> = { en, fr };

export function useClubs(): RoleLandingContent {
  return clubsContent[useLocale()];
}
