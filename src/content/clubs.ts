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
    titleLead: "Your most profitable tables, ",
    titleEmphasis: "sold and paid before the night starts",
    titleRest: ".",
    subtitle:
      "An €800 VIP table that no-shows is dead money. Yuno sells and cashes your tables up front, tracks every minimum spend live, and settles the night under the club's own name — no paper floor plan, no WhatsApp, no end-of-night cash count.",
    primaryCta: "Book a demo",
    secondaryCta: "See the offer",
    note: "Core free · Flat 3% drinks / 4% tickets & tables (€0.99 min) · No commitment",
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
      body: "Every table's minimum, every order, every entry — tracked in real time from doors to close, on one screen.",
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
    title: "Drinks paid up front: cash out of staff hands, basket up.",
    body: "Guests order and pay from their phone, so the cash never passes through the barman's hands. The order moves through a live queue — pending → prepping → ready — and the barman scans the QR to serve. Cart rules and packs lift the average basket on purpose, not by luck.",
    imageAlt: "A Yuno drink order and the live bar queue on a phone.",
    features: [
      {
        title: "Pre-paid orders, QR pickup",
        body: "The fan pays before the bar; your staff just executes. The cash never touches a till.",
      },
      {
        title: "Live bar-side queue",
        body: "Barmen see every order move pending → prepping → ready, and scan the QR to serve.",
      },
      {
        title: "Average-basket upsell rules",
        body: "Cart suggestions, drink packs and ticket add-ons you configure — measured in your upsell stats.",
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
    title: "Ready to run the night on your terms?",
    body: "Book a demo and we'll set your venue up. Founding spots include three months free.",
    button: "Book my demo",
    note: "3 months free · No commitment · 15 founding venues",
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
          "Drag-and-drop floor-plan editor, table packs and per-table QR",
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
          "Sharing the takings with a BDE or an organizer by cash, Excel and informal transfers means zero traceability and arguments at settlement. Yuno splits every ticket, table and drink to the agreed shares, automatically, while the club stays merchant of record.",
      },
      focus: {
        tag: "Co-hosted revenue split",
        title: "Agree the split once. Yuno applies it to every sale.",
        body: "Set a recurring revenue-share contract between the club and the organizer or BDE. It's attached to the event before tickets go on sale, and the money splits at each sale through Stripe Connect, by item type. The club keeps the alcohol licence and stays seller of record. No incumbent does this natively.",
        bullets: [
          "Recurring club ↔ organizer / BDE revenue-share contract",
          "Automatic split on tickets, tables and drinks via Stripe Connect",
          "Club stays merchant of record (alcohol licence, name on the statement)",
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
        caveat: "Client-side loyalty (points / QR) is live; the owner predictive engine is on the roadmap, not shipped.",
      },
      contactLabel: "Customer CRM and a loyalty program",
    },
    {
      id: "live",
      chipLabel: "Live night",
      hero: {
        badge: "Live night",
        titleLead: "The whole night on one screen — ",
        titleEmphasis: "the bar backing up shows the minute it happens",
        titleRest: ", not the next morning.",
        subtitle:
          "During the night you're blind, running between the door, the bar and the booth with no overview. Yuno's Live Night is the real-time control room for the night in progress.",
      },
      focus: {
        tag: "Live night control room",
        title: "A war-room for the night in progress.",
        body: "Live KPIs (revenue, tickets, orders placed / in progress / done, average basket, entries, refunds, cloakroom), an order pipeline, per-staff activity, the entry flow by hour, and severity alerts — a backlog is a warning, a rush is info, a refund spike is critical.",
        bullets: [
          "Live KPI bar with live / 1h / full-night windows",
          "Order pipeline and per-staff activity in real time",
          "Severity alerts: backlog, rush, refund spike",
        ],
        caveat: "The live-visitors panel is a Pro / Elite feature.",
      },
      contactLabel: "The Live Night real-time control room",
    },
    {
      id: "bar",
      chipLabel: "The bar",
      hero: {
        badge: "The bar",
        titleLead: "The drink paid up front: ",
        titleEmphasis: "cash out of staff hands, basket up",
        titleRest: ".",
        subtitle:
          "At the bar the cash passes through the barman's hands and the average basket depends on who's working. Yuno takes payment up front and turns the basket into something you can steer.",
      },
      focus: {
        tag: "Bar & average basket",
        title: "Anti-theft by design, basket by intent.",
        body: "Guests order and pay before the bar, so the cash never touches the barman's hands. Orders move pending → prepping → ready and the barman scans the QR to serve. Cart rules, drink packs and ticket add-ons lift the average basket on purpose, tracked in your upsell stats.",
        bullets: [
          "Pre-paid drink orders, QR pickup, live bar queue",
          "Cart rules and packs to lift the average basket",
          "Upsell stats — measured, not guessed",
        ],
      },
      contactLabel: "Pre-paid bar orders and average-basket upsell",
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
          "You can't hand the master login to a bouncer. Yuno gives every role — bar, door, cloakroom, VIP — its own view, fast, on a shared phone.",
      },
      focus: {
        tag: "Staff & roles",
        title: "Role dashboards, PIN login, your password stays yours.",
        body: "Barman, bouncer, VIP host and cloakroom each get their own dashboard and a per-employee PIN login. The bouncer scans tickets and guest list and logs incidents; the barman runs the order queue; the cloakroom turns the ticket into a QR. A manager gets around 25 granular permissions, delegated without account control.",
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
          "Reconciling Stripe payouts against ticket, table and drink sales by hand, plus a shoebox of receipts for the accountant. Yuno makes the money one source of truth.",
      },
      focus: {
        tag: "Accounting",
        title: "One source of truth, club as seller of record.",
        body: "Club revenue equals the amount paid minus Yuno's fee; net payout is gross minus Stripe minus refunds, across all three pillars. An accounting view with gross / club net / Yuno fee / Stripe fee / refunds per line and configurable VAT, PDF invoices per ticket, table and order with period exports, and refunds that read the service fee frozen at purchase.",
        bullets: [
          "Accounting view: gross / club net / Yuno / Stripe / refunds, configurable VAT",
          "PDF invoices per ticket, table and order, plus period exports",
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
    titleLead: "Vos tables les plus rentables, ",
    titleEmphasis: "vendues et encaissées avant que la soirée commence",
    titleRest: ".",
    subtitle:
      "Une table VIP à 800 € qui ne vient pas, c'est mort sec. Yuno vend et encaisse vos tables à l'avance, suit chaque minimum de conso en direct, et règle la soirée au nom du club — sans plan papier, sans WhatsApp, sans comptage de caisse à la fermeture.",
    primaryCta: "Réserver une démo",
    secondaryCta: "Voir l'offre",
    note: "Core gratuit · 3 % boissons / 4 % billets & tables (min 0,99 €) · Sans engagement",
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
      body: "Le minimum de chaque table, chaque commande, chaque entrée — suivis en temps réel de l'ouverture à la fermeture, sur un seul écran.",
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
    title: "La boisson payée d'avance : le cash sort des mains du staff, le panier monte.",
    body: "Les clients commandent et paient depuis leur téléphone : le cash ne passe plus par les mains du barman. La commande suit une file en direct — en attente → préparation → prête — et le barman scanne le QR pour servir. Des règles de panier et des packs font monter le panier moyen volontairement, pas au hasard.",
    imageAlt: "Une commande de boisson Yuno et la file du bar en direct, sur un téléphone.",
    features: [
      {
        title: "Commandes prépayées, retrait par QR",
        body: "Le client paie avant le bar ; votre staff n'a plus qu'à exécuter. Le cash ne touche aucune caisse.",
      },
      {
        title: "File du bar en direct",
        body: "Les barmen voient chaque commande passer d'en attente → préparation → prête, et scannent le QR pour servir.",
      },
      {
        title: "Règles d'upsell sur le panier",
        body: "Suggestions panier, packs et add-ons de billet que vous configurez — mesurés dans vos stats d'upsell.",
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
    title: "Prêt à piloter la nuit à vos conditions ?",
    body: "Réservez une démo et on configure votre établissement. Les places fondatrices incluent trois mois offerts.",
    button: "Réserver ma démo",
    note: "3 mois offerts · Sans engagement · 15 établissements fondateurs",
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
          "Éditeur de plan de salle, packs de tables et QR par table",
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
          "Partager la recette avec un BDE ou un orga en cash, Excel et virements informels, c'est zéro traçabilité et des disputes au règlement. Yuno répartit chaque billet, table et boisson selon les parts convenues, automatiquement, pendant que le club reste vendeur de record.",
      },
      focus: {
        tag: "Répartition co-soirée",
        title: "Convenez la répartition une fois. Yuno l'applique à chaque vente.",
        body: "Mettez en place un contrat de partage de revenus récurrent entre le club et l'orga ou le BDE. Il est attaché à l'événement avant la mise en vente, et l'argent se répartit à chaque vente via Stripe Connect, par type d'item. Le club garde la licence alcool et reste vendeur de record. Aucun concurrent ne le fait nativement.",
        bullets: [
          "Contrat de partage de revenus récurrent club ↔ orga / BDE",
          "Répartition automatique sur billets, tables et boissons via Stripe Connect",
          "Le club reste vendeur de record (licence alcool, nom sur le relevé)",
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
        caveat: "La fidélité côté client (points / QR) est live ; le moteur prédictif côté owner est au roadmap, pas encore livré.",
      },
      contactLabel: "CRM clients et programme de fidélité",
    },
    {
      id: "live",
      chipLabel: "Live night",
      hero: {
        badge: "Live night",
        titleLead: "Toute la soirée sur un seul écran — ",
        titleEmphasis: "le bar qui bouchonne se voit à la minute",
        titleRest: ", pas le lendemain.",
        subtitle:
          "Pendant la soirée vous êtes aveugle, à courir entre la porte, le bar et le booth sans vue d'ensemble. Le Live Night de Yuno, c'est la war-room temps réel de la soirée en cours.",
      },
      focus: {
        tag: "War-room Live Night",
        title: "Une war-room pour la soirée en cours.",
        body: "KPIs live (revenu, billets, commandes placées / en cours / terminées, panier moyen, entrées, remboursements, vestiaire), un pipeline de commandes, l'activité par staff, le flux d'entrées par heure, et des alertes de sévérité — un backlog est un warning, un rush une info, un pic de remboursements une alerte critique.",
        bullets: [
          "Barre de KPIs live avec fenêtres live / 1h / nuit complète",
          "Pipeline de commandes et activité par staff en temps réel",
          "Alertes de sévérité : backlog, rush, pic de remboursements",
        ],
        caveat: "Le panneau visiteurs en direct est une fonction Pro / Elite.",
      },
      contactLabel: "La war-room temps réel Live Night",
    },
    {
      id: "bar",
      chipLabel: "Le bar",
      hero: {
        badge: "Le bar",
        titleLead: "La boisson payée d'avance : ",
        titleEmphasis: "le cash sort des mains du staff, le panier monte",
        titleRest: ".",
        subtitle:
          "Au bar, le cash passe par les mains du barman et le panier moyen dépend de qui bosse ce soir. Yuno encaisse à l'avance et transforme le panier en quelque chose que vous pilotez.",
      },
      focus: {
        tag: "Bar & panier moyen",
        title: "Anti-vol par conception, panier par intention.",
        body: "Les clients commandent et paient avant le bar : le cash ne touche jamais les mains du barman. Les commandes passent en attente → préparation → prête et le barman scanne le QR pour servir. Règles de panier, packs de boissons et add-ons de billet font monter le panier moyen volontairement, suivis dans vos stats d'upsell.",
        bullets: [
          "Commandes de boisson prépayées, retrait QR, file du bar en direct",
          "Règles de panier et packs pour faire monter le panier moyen",
          "Stats d'upsell — mesurées, pas devinées",
        ],
      },
      contactLabel: "Commandes de bar prépayées et upsell du panier",
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
          "Impossible de filer le login maître à un videur. Yuno donne à chaque rôle — bar, porte, vestiaire, VIP — sa propre vue, vite, sur un téléphone partagé.",
      },
      focus: {
        tag: "Staff & rôles",
        title: "Dashboards par rôle, connexion par PIN, votre mot de passe reste le vôtre.",
        body: "Barman, videur, hôte VIP et vestiaire ont chacun leur dashboard et une connexion par PIN par employé. Le videur scanne billets et guestlist et log les incidents ; le barman gère la file de commandes ; le vestiaire transforme le ticket en QR. Le manager reçoit environ 25 permissions granulaires, déléguées sans contrôle du compte.",
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
          "Réconcilier les virements Stripe avec les ventes billets, tables et boissons à la main, plus la boîte à chaussures de reçus pour le comptable. Yuno fait de l'argent une seule source de vérité.",
      },
      focus: {
        tag: "Comptabilité",
        title: "Une source de vérité, le club comme vendeur de record.",
        body: "Revenu club = montant payé moins les frais Yuno ; payout net = brut moins Stripe moins remboursements, sur les trois piliers. Une vue comptabilité avec brut / net club / frais Yuno / frais Stripe / remboursements par ligne et TVA configurable, des factures PDF par billet, table et commande avec exports par période, et des remboursements qui lisent le frais de service gelé à l'achat.",
        bullets: [
          "Vue compta : brut / net club / Yuno / Stripe / remboursements, TVA configurable",
          "Factures PDF par billet, table et commande, plus exports par période",
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
