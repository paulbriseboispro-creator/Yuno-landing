// Pricing-page copy plus the shared pricing-related component copy
// (PricingGrid, SplitVisual, SavingsCalculator, ServiceFeeCalculator),
// available in every locale. Components read it via usePricing(); the
// pricing route's head() reads the raw `pricingContent[locale]` map.
// French is checked against the English shape at compile time
// (PricingContent = typeof en).
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Pricing — Yuno",
    description:
      "Yuno is free for clubs during launch — every feature included, no subscription, no credit card. Customers pay a small service fee at checkout (4% tickets with €0.99 minimum, 3% drinks).",
    ogTitle: "Pricing — Yuno",
    ogDescription:
      "Free for clubs during launch — every feature included. Low service fees paid by the customer, never by you.",
  },
  plans: [
    {
      name: "Yuno Core",
      price: "Free",
      suffix: "Pay-as-you-grow ticketing",
      annual: "",
      cta: "Get started",
      popular: false,
      comingSoon: false,
      featureGroups: [
        {
          label: "Core features",
          items: [
            "Event management",
            "Entry control (QR)",
            "Guest list",
            "Basic promoter tracking",
            "Ticket metrics",
          ],
        },
      ],
    },
    {
      name: "Essential",
      price: "€49",
      suffix: "/ month",
      annual: "or €490/year billed once — 2 months free",
      cta: "Start 14-day trial",
      popular: false,
      comingSoon: false,
      featureGroups: [
        {
          label: "Everything in Core, plus",
          items: [
            "Orders & QR system",
            "Menu management",
            "Staff management (PIN)",
            "Invoices & refunds",
            "Basic analytics",
            "Story Builder",
          ],
        },
      ],
    },
    {
      name: "Pro",
      price: "€99",
      suffix: "/ month",
      annual: "or €990/year billed once — 2 months free",
      cta: "Start 14-day trial",
      popular: true,
      comingSoon: false,
      featureGroups: [
        {
          label: "Everything in Essential, plus",
          items: [
            "DJ management",
            "Organizer management",
            "Promoter tracking",
            "Advanced analytics",
            "CSV data export",
            "Customer database",
            "Live night",
            "Story Builder (advanced)",
            "Basic VIP table setup",
            "Promotional email campaigns",
          ],
        },
      ],
    },
    {
      name: "Elite",
      price: "€199",
      suffix: "/ month",
      annual: "or €1,990/year billed once — 2 months free",
      cta: "Talk to sales",
      popular: false,
      comingSoon: true,
      featureGroups: [
        {
          label: "Everything in Pro, plus",
          items: [
            "VIP tables",
            "VIP service",
            "Offers & upsell",
            "Loyalty & CRM",
            "Hype Analysis",
            "Client leaderboard (top spender ranking)",
            "Scarcity tools (FOMO ticket availability)",
            "Personalization engine",
          ],
        },
      ],
    },
  ],
  fees: "4% per ticket (€0.99 min) and 3% on drinks — service fees paid by the customer, never by you. Club, organizer and affiliate accounts are all free during launch.",
  // Billing-cadence note shown under the plan grid.
  annualLine: "Prices shown are monthly. Pay for the year in one payment and 2 months are on us — same plan, lower yearly cost.",
  // PricingGrid sub-CTA under each plan card.
  cardNote: "No setup fee · Cancel anytime · No commitment",
  mostPopular: "Most popular",
  comingSoonLabel: "Coming soon",

  // SplitVisual table data (the split prose lives in the home content module).
  splitVisual: {
    ticketLabel: "Ticket sale",
    ticketAmount: "€45.00",
    rows: [
      { label: "Venue", value: "€31.50", pct: "70%", accent: false },
      { label: "Organizer", value: "€9.00", pct: "20%", accent: true },
      { label: "Promoter", value: "€4.50", pct: "10%", accent: false },
    ],
  },

  // SavingsCalculator copy. Platform names and all numbers/percentages stay exact.
  savings: {
    heading: "Simulate your savings",
    subheading: "What you actually pay with each platform — from your pocket.",
    fieldTicketPrice: "Ticket price",
    fieldTicketsPerYear: "Tickets / year",
    fieldPlan: "Your Yuno plan",
    plans: {
      essential: "Essential — €49/mo",
      pro: "Pro — €99/mo",
      elite: "Elite — €199/mo",
    },
    colPlatform: "Platform",
    colCost: "Cost to you / year",
    colSave: "You save",
    yourPlatform: "Your platform",
    baseline: "baseline",
    perYear: "per year",
    notAvailable: "n/a",
    rows: {
      yuno: {
        sub: "0% commission — free during launch",
        costLabel: "free during launch",
      },
      shotgun: { sub: "10% commission — paid by you" },
      weezevent: { sub: "2.5% + €0.99 / ticket — paid by you" },
      xceed: { sub: "15% marketplace commission — paid by you" },
      dice: {
        sub: "~12% added on top of your price",
        costLabel: "not organizer-side",
      },
    },
    howCalculatedLabel: "How it's calculated:",
    howCalculated:
      " Shotgun 10% organizer commission · Weezevent 2.5% + €0.99/ticket organizer-side · Xceed Marketplace 15% organizer commission · Yuno: 0% organizer commission and €0 during launch (no subscription). DICE adds fees on top of your price for buyers — not comparable on organizer cost. Estimate only; actual fees vary by payment method and event.",
  },

  // ServiceFeeCalculator copy. Numbers/percentages stay exact.
  serviceFee: {
    summaryDrinksLabel: "Drinks:",
    summaryDrinksValue: "3%",
    summaryTicketsLabel: "Tickets & tables:",
    summaryTicketsValue: "from 0.99€ (max 4%)",
    summaryNote: "Service fees — always paid by the customer, never by you",
    drinksLabel: "Drinks",
    ticketsLabel: "Tickets & Tables",
    drinksFootnote: "3% of item price",
    ticketsFootnote: "From 0.99€, up to 4% of order value",
    itemPrice: "Item price:",
    serviceFeeLabel: "Service fee:",
    checks: [
      "No setup cost",
      "No hidden fees",
      "Money goes directly to your Stripe",
    ],
  },

  // pricing.tsx inline sections.
  page: {
    eyebrow: "Pricing",
    titleA: "Free for clubs during ",
    titleEm: "launch",
    sub: "Every feature included. No subscription, no credit card, no commitment. Yuno earns through small service fees your customers pay at checkout — you only ever pay Stripe's processing fee.",
    feeIntroA: "During launch, Yuno costs you ",
    feeIntroMonthly: "€0 — no subscription",
    feeIntroB:
      ". Ticket and drink fees are paid by your guests at checkout — ",
    feeIntroNotYou: "not by you",
    feeIntroC: ". The fee calculator below shows what your attendees pay per purchase.",
    // Launch-offer card — replaces the paid plan grid while subscriptions are off.
    launch: {
      badge: "Launch offer",
      title: "One plan: everything, free",
      body: "Ticketing, drinks ordering, VIP tables, guest list, staff with PINs, live night, analytics, CRM, email campaigns, story builder — the full platform, with nothing gated behind a paid tier.",
      included: [
        "Events, ticketing & entry control (QR)",
        "Drinks orders & menu management",
        "VIP tables & VIP service",
        "Guest list & staff with PINs",
        "Live night & advanced analytics",
        "Customer CRM, loyalty & email campaigns",
        "DJ & organizer collaborations",
        "CSV / PDF exports",
      ],
      note: "No setup fee · No subscription · No credit card · No commitment",
      cta: "Create your club account",
    },
    noCutBold: "Yuno doesn't take a cut from your revenue.",
    noCutBody:
      "The 4% service fee is paid by your customers at checkout — like a credit card processing fee. You keep 100% of your ticket price. Only standard Stripe processing fees apply.",
    noCutCompare: "Compare that to Shotgun's 10% taken directly from your payout.",
    organizerFree: {
      eyebrow: "Organizers & collectives",
      title: "Organizing in a host venue? Yuno is free too.",
      body: "If you organize events inside a host venue, you pay no subscription either — only Stripe's processing fee. The 4% ticket fee is paid by your attendees, never by you. That's the edge over Shotgun, Weezevent and Xceed, who take 10–15% straight out of your pocket.",
      cta: "See how it works for organizers",
    },
    savingsEyebrow: "vs. Shotgun · Weezevent · Xceed · DICE",
    savingsTitle: "The cheapest ticketing platform for nightlife — by a wide margin",
    savingsSub:
      "Yuno takes no per-ticket commission — and during launch, the software itself costs €0. Compare what each platform actually costs you per year.",
    serviceFeeEyebrow: "See it in numbers",
    serviceFeeTitle: "What your customers actually pay in fees",
    serviceFeeSub:
      "Drag the sliders. Every service fee is paid by the customer at checkout — never by you. You keep 100% of your menu and ticket prices. Standard Stripe processing fees still apply.",
    founding: {
      badge: "Launch period",
      title: "Free for every club that joins during launch",
      introA: "We're opening Yuno with the simplest deal possible: ",
      introVenues: "every feature, €0",
      introB: " — for every club that joins during the launch period.",
      bodyA: "That means ",
      bodyFree: "no subscription, no credit card, no commitment",
      bodyB: ". Run real nights on Yuno, see what it does for your operations, and keep going — it stays free for the whole launch period.",
      pathsLabel: "How Yuno makes money:",
      pathMonthly: "Small service fees paid by your customers at checkout — 4% on tickets and tables (€0.99 min), 3% on drinks.",
      pathAnnualA: "On your side, you only ever pay ",
      pathAnnualEm: "Stripe's processing fee",
      pathAnnualB: " (1.5% + €0.25 per transaction), deducted from payouts like on any platform.",
      checks: [
        "Every feature included — nothing gated",
        "Direct onboarding with Paul, Yuno's founder",
        "No trial countdown — free for the entire launch period",
      ],
      deadline: "Valid for every club joining during the launch period.",
      cta: "Create your club account",
      ctaMeta: "Free to join · No contract · Set up in minutes",
    },
    breakdownEyebrow: "Fee breakdown",
    breakdownTitle: "Service fees your customers pay at checkout",
    breakdownItems: [
      {
        title: "Tickets & tables",
        body: "4% per order with a €0.99 minimum. The service fee is always paid by the customer at checkout — never deducted from your share. Stripe fees (1.5% + €0.25) apply on payout.",
      },
      {
        title: "Drinks (Click & Collect)",
        body: "A flat 3% service fee on every pre-ordered round, paid by the customer. You receive 100% of the menu price, less standard Stripe processing — pre-ordering is a guest-side perk that cuts your queue.",
      },
      {
        title: "VIP tables",
        body: "Same 4% / €0.99 minimum on online deposits and tables billed through Yuno — paid by the customer. No commission on cash collected at the door.",
      },
      {
        title: "Promoter attribution",
        body: "Commissions you've configured (fixed or %) are tracked against the venue's net share, so the club can settle up with the promoter.",
      },
    ],
  },
};

export type PricingContent = typeof en;

const fr: PricingContent = {
  meta: {
    title: "Tarifs — Yuno",
    description:
      "Yuno est gratuit pour les clubs pendant le lancement — toutes les fonctionnalités incluses, sans abonnement, sans carte bancaire. Les clients paient un petit frais de service au paiement (4 % billets, min 0,99 € ; 3 % boissons).",
    ogTitle: "Tarifs — Yuno",
    ogDescription:
      "Gratuit pour les clubs pendant le lancement — toutes les fonctionnalités incluses. Des frais de service réduits, payés par le client, jamais par vous.",
  },
  plans: [
    {
      name: "Yuno Core",
      price: "Gratuit",
      suffix: "Billetterie à l'usage",
      annual: "",
      cta: "Commencer",
      popular: false,
      comingSoon: false,
      featureGroups: [
        {
          label: "Fonctionnalités de base",
          items: [
            "Gestion d'événements",
            "Contrôle d'accès (QR)",
            "Liste d'invités",
            "Suivi de base des promoteurs",
            "Statistiques de billetterie",
          ],
        },
      ],
    },
    {
      name: "Essential",
      price: "49 €",
      suffix: "/ mois",
      annual: "ou 490 €/an en un seul paiement — 2 mois offerts",
      cta: "Démarrer l'essai de 14 jours",
      popular: false,
      comingSoon: false,
      featureGroups: [
        {
          label: "Tout Core, plus",
          items: [
            "Commandes & système QR",
            "Gestion du menu",
            "Gestion du staff (PIN)",
            "Factures & remboursements",
            "Statistiques de base",
            "Story Builder",
          ],
        },
      ],
    },
    {
      name: "Pro",
      price: "99 €",
      suffix: "/ mois",
      annual: "ou 990 €/an en un seul paiement — 2 mois offerts",
      cta: "Démarrer l'essai de 14 jours",
      popular: true,
      comingSoon: false,
      featureGroups: [
        {
          label: "Tout Essential, plus",
          items: [
            "Gestion des DJ",
            "Gestion des organisateurs",
            "Suivi des promoteurs",
            "Statistiques avancées",
            "Export de données CSV",
            "Base de données clients",
            "Live night",
            "Story Builder (avancé)",
            "Configuration de base des tables VIP",
            "Campagnes e-mail promotionnelles",
          ],
        },
      ],
    },
    {
      name: "Elite",
      price: "199 €",
      suffix: "/ mois",
      annual: "ou 1 990 €/an en un seul paiement — 2 mois offerts",
      cta: "Contacter l'équipe commerciale",
      popular: false,
      comingSoon: true,
      featureGroups: [
        {
          label: "Tout Pro, plus",
          items: [
            "Tables VIP",
            "Service VIP",
            "Offres & ventes additionnelles",
            "Fidélité & CRM",
            "Hype Analysis",
            "Classement clients (palmarès des meilleurs dépensiers)",
            "Outils de rareté (disponibilité des billets FOMO)",
            "Moteur de personnalisation",
          ],
        },
      ],
    },
  ],
  fees: "4 % par billet (0,99 € min) et 3 % sur les boissons — des frais de service réglés par le client, jamais par vous. Les comptes Club, Organisateur et Affilié sont tous gratuits pendant le lancement.",
  annualLine: "Les tarifs affichés sont mensuels. Réglez l'année en un seul paiement et 2 mois vous sont offerts — la même formule, un coût annuel plus bas.",
  cardNote: "Sans frais d'installation · Annulation à tout moment · Sans engagement",
  mostPopular: "Le plus populaire",
  comingSoonLabel: "Bientôt disponible",

  splitVisual: {
    ticketLabel: "Vente de billet",
    ticketAmount: "45,00 €",
    rows: [
      { label: "Club", value: "31,50 €", pct: "70 %", accent: false },
      { label: "Organisateur", value: "9,00 €", pct: "20 %", accent: true },
      { label: "Promoteur", value: "4,50 €", pct: "10 %", accent: false },
    ],
  },

  savings: {
    heading: "Simulez vos économies",
    subheading: "Ce que vous payez réellement avec chaque plateforme — de votre poche.",
    fieldTicketPrice: "Prix du billet",
    fieldTicketsPerYear: "Billets / an",
    fieldPlan: "Votre formule Yuno",
    plans: {
      essential: "Essential — 49 €/mois",
      pro: "Pro — 99 €/mois",
      elite: "Elite — 199 €/mois",
    },
    colPlatform: "Plateforme",
    colCost: "Coût pour vous / an",
    colSave: "Vous économisez",
    yourPlatform: "Votre plateforme",
    baseline: "référence",
    perYear: "par an",
    notAvailable: "n/d",
    rows: {
      yuno: {
        sub: "0 % de commission — gratuit pendant le lancement",
        costLabel: "gratuit pendant le lancement",
      },
      shotgun: { sub: "10 % de commission — payés par vous" },
      weezevent: { sub: "2,5 % + 0,99 € / billet — payés par vous" },
      xceed: { sub: "15 % de commission marketplace — payés par vous" },
      dice: {
        sub: "~12 % ajoutés au-dessus de votre prix",
        costLabel: "pas côté organisateur",
      },
    },
    howCalculatedLabel: "Mode de calcul :",
    howCalculated:
      " Shotgun 10 % de commission organisateur · Weezevent 2,5 % + 0,99 €/billet côté organisateur · Xceed Marketplace 15 % de commission organisateur · Yuno : 0 % de commission organisateur et 0 € pendant le lancement (sans abonnement). DICE ajoute des frais au-dessus de votre prix pour les acheteurs — non comparable sur le coût organisateur. Estimation seulement ; les frais réels varient selon le mode de paiement et l'événement.",
  },

  serviceFee: {
    summaryDrinksLabel: "Boissons :",
    summaryDrinksValue: "3 %",
    summaryTicketsLabel: "Billets & tables :",
    summaryTicketsValue: "à partir de 0,99 € (max 4 %)",
    summaryNote: "Frais de service — toujours réglés par le client, jamais par vous",
    drinksLabel: "Boissons",
    ticketsLabel: "Billets & tables",
    drinksFootnote: "3 % du prix de l'article",
    ticketsFootnote: "À partir de 0,99 €, jusqu'à 4 % du montant de la commande",
    itemPrice: "Prix de l'article :",
    serviceFeeLabel: "Frais de service :",
    checks: [
      "Aucun frais d'installation",
      "Aucun frais caché",
      "L'argent arrive directement sur votre Stripe",
    ],
  },

  page: {
    eyebrow: "Tarifs",
    titleA: "Gratuit pour les clubs pendant ",
    titleEm: "le lancement",
    sub: "Toutes les fonctionnalités incluses. Sans abonnement, sans carte bancaire, sans engagement. Yuno se rémunère via de petits frais de service payés par vos clients au moment du paiement — vous ne payez que les frais de traitement Stripe.",
    feeIntroA: "Pendant le lancement, Yuno vous coûte ",
    feeIntroMonthly: "0 € — sans abonnement",
    feeIntroB:
      ". Les frais sur les billets et les boissons sont réglés par vos invités au moment du paiement — ",
    feeIntroNotYou: "pas par vous",
    feeIntroC: ". Le calculateur de frais ci-dessous montre ce que vos participants paient par achat.",
    // Carte offre de lancement — remplace la grille de formules payantes tant que l'abonnement est coupé.
    launch: {
      badge: "Offre de lancement",
      title: "Une seule formule : tout, gratuitement",
      body: "Billetterie, commande de boissons, tables VIP, guest list, staff avec PIN, soirée en direct, analytics, CRM, campagnes email, story builder — toute la plateforme, sans aucune fonctionnalité verrouillée derrière un palier payant.",
      included: [
        "Événements, billetterie & contrôle d'accès (QR)",
        "Commandes de boissons & gestion de la carte",
        "Tables VIP & service VIP",
        "Guest list & staff avec PIN",
        "Soirée en direct & analytics avancées",
        "CRM clients, fidélité & campagnes email",
        "Collaborations DJ & organisateurs",
        "Exports CSV / PDF",
      ],
      note: "Aucun frais d'installation · Sans abonnement · Sans carte bancaire · Sans engagement",
      cta: "Créer mon compte club",
    },
    noCutBold: "Yuno ne prend aucune part de vos revenus.",
    noCutBody:
      "Les 4 % de frais de service sont réglés par vos clients au moment du paiement — comme des frais de carte bancaire. Vous conservez 100 % du prix de votre billet. Seuls les frais de traitement Stripe habituels s'appliquent.",
    noCutCompare: "Comparez cela aux 10 % de Shotgun prélevés directement sur votre versement.",
    organizerFree: {
      eyebrow: "Organisateurs & collectifs",
      title: "Vous organisez dans un établissement hôte ? Yuno est gratuit aussi.",
      body: "Si vous organisez des événements dans un établissement hôte, vous ne payez aucun abonnement non plus — seulement les frais de traitement Stripe. Les 4 % de frais de billet sont payés par vos participants, jamais par vous. C'est l'avantage face à Shotgun, Weezevent et Xceed, qui prélèvent 10 à 15 % directement dans votre poche.",
      cta: "Voir comment ça marche pour les organisateurs",
    },
    savingsEyebrow: "vs. Shotgun · Weezevent · Xceed · DICE",
    savingsTitle: "La plateforme de billetterie la moins chère pour la nuit — de loin",
    savingsSub:
      "Yuno ne prend aucune commission par billet — et pendant le lancement, le logiciel lui-même coûte 0 €. Comparez ce que chaque plateforme vous coûte réellement par an.",
    serviceFeeEyebrow: "Les chiffres en clair",
    serviceFeeTitle: "Ce que vos clients paient réellement en frais",
    serviceFeeSub:
      "Déplacez les curseurs. Chaque frais de service est réglé par le client au moment du paiement — jamais par vous. Vous conservez 100 % de vos prix de menu et de billet. Les frais de traitement Stripe habituels s'appliquent tout de même.",
    founding: {
      badge: "Période de lancement",
      title: "Gratuit pour chaque club qui nous rejoint pendant le lancement",
      introA: "Yuno s'ouvre avec l'offre la plus simple possible : ",
      introVenues: "toutes les fonctionnalités, 0 €",
      introB: " — pour chaque club qui nous rejoint pendant la période de lancement.",
      bodyA: "Concrètement : ",
      bodyFree: "sans abonnement, sans carte bancaire, sans engagement",
      bodyB: ". Organisez de vraies soirées sur Yuno, voyez ce que cela apporte à vos opérations, et continuez — cela reste gratuit pendant toute la période de lancement.",
      pathsLabel: "Comment Yuno se rémunère :",
      pathMonthly: "De petits frais de service payés par vos clients au moment du paiement — 4 % sur les billets et tables (0,99 € min), 3 % sur les boissons.",
      pathAnnualA: "De votre côté, vous ne payez que ",
      pathAnnualEm: "les frais de traitement Stripe",
      pathAnnualB: " (1,5 % + 0,25 € par transaction), déduits des versements comme sur n'importe quelle plateforme.",
      checks: [
        "Toutes les fonctionnalités incluses — rien de verrouillé",
        "Intégration directe avec Paul, le fondateur de Yuno",
        "Pas de compte à rebours d'essai — gratuit pendant toute la période de lancement",
      ],
      deadline: "Valable pour chaque club qui nous rejoint pendant la période de lancement.",
      cta: "Créer mon compte club",
      ctaMeta: "Adhésion gratuite · Sans contrat · Prêt en quelques minutes",
    },
    breakdownEyebrow: "Détail des frais",
    breakdownTitle: "Les frais de service que vos clients paient au moment du paiement",
    breakdownItems: [
      {
        title: "Billets & tables",
        body: "4 % par commande avec un minimum de 0,99 €. Le frais de service est toujours réglé par le client au moment du paiement — jamais déduit de votre part. Les frais Stripe (1,5 % + 0,25 €) s'appliquent au versement.",
      },
      {
        title: "Boissons (Click & Collect)",
        body: "Un frais de service forfaitaire de 3 % sur chaque tournée précommandée, réglé par le client. Vous recevez 100 % du prix du menu, hors frais de traitement Stripe habituels — la précommande est un avantage côté client qui réduit votre file d'attente.",
      },
      {
        title: "Tables VIP",
        body: "Même minimum de 4 % / 0,99 € sur les acomptes en ligne et les tables facturées via Yuno — réglé par le client. Aucune commission sur l'argent encaissé à l'entrée.",
      },
      {
        title: "Attribution promoteurs",
        body: "Les commissions que vous avez configurées (fixes ou %) sont suivies sur la part nette du club, pour que le club règle directement le promoteur.",
      },
    ],
  },
};

export const pricingContent: Record<Locale, PricingContent> = { en, fr };

export function usePricing(): PricingContent {
  return pricingContent[useLocale()];
}
