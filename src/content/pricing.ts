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
      "Yuno plans: Core (free), Essential €39/mo, Pro €69/mo, Elite €99/mo. Plus 4% per ticket with €0.99 minimum on transactions.",
    ogTitle: "Pricing — Yuno",
    ogDescription:
      "Core, Essential €39, Pro €69, Elite €99 — plus low transactional fees.",
  },
  plans: [
    {
      name: "Yuno Core",
      price: "Free",
      suffix: "Pay-as-you-grow ticketing",
      cta: "Get started",
      popular: false,
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
      price: "€39",
      suffix: "/ month",
      cta: "Start 14-day trial",
      popular: false,
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
      price: "€69",
      suffix: "/ month",
      cta: "Start 14-day trial",
      popular: true,
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
      price: "€99",
      suffix: "/ month",
      cta: "Talk to sales",
      popular: false,
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
  fees: "Plus 4% per ticket (€0.99 min) and 3% on drinks — service fees paid by the customer, never by you. Organizer and Affiliate accounts are free.",
  // PricingGrid sub-CTA under each plan card.
  cardNote: "No setup fee · Cancel anytime · No commitment",
  mostPopular: "Most popular",

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
      essential: "Essential — €39/mo",
      pro: "Pro — €69/mo",
      elite: "Elite — €99/mo",
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
        sub: "0% commission — subscription only",
        costLabel: "subscription only",
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
      " Shotgun 10% organizer commission · Weezevent 2.5% + €0.99/ticket organizer-side · Xceed Marketplace 15% organizer commission · Yuno: 0% organizer commission, subscription only. DICE adds fees on top of your price for buyers — not comparable on organizer cost. Estimate only; actual fees vary by payment method and event.",
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
    titleA: "A plan for every ",
    titleEm: "scale of night",
    sub: "Monthly SaaS plans for the back office, plus transparent transactional fees on what actually moves money.",
    feeIntroA: "Yuno charges you a ",
    feeIntroMonthly: "monthly subscription",
    feeIntroB:
      ". Ticket and drink fees are paid by your guests at checkout — ",
    feeIntroNotYou: "not by you",
    feeIntroC: ". The fee calculator below shows what your attendees pay per purchase.",
    noCutBold: "Yuno doesn't take a cut from your revenue.",
    noCutBody:
      "The 4% service fee is paid by your customers at checkout — like a credit card processing fee. You keep 100% of your ticket price.",
    noCutCompare: "Compare that to Shotgun's 10% taken directly from your payout.",
    savingsEyebrow: "vs. Shotgun · Weezevent · Xceed · DICE",
    savingsTitle: "The cheapest ticketing platform for nightlife — by a wide margin",
    savingsSub:
      "Yuno is subscription only. No per-ticket commission. Compare what each platform actually costs you per year.",
    serviceFeeEyebrow: "See it in numbers",
    serviceFeeTitle: "What your customers actually pay in fees",
    serviceFeeSub:
      "Drag the sliders. Every service fee is paid by the customer at checkout — never by you. You keep 100% of your menu and ticket prices.",
    founding: {
      badge: "Early Adopters — 15 spots only",
      title: "Founding Club Offer",
      introA: "We're onboarding our first ",
      introVenues: "15 partner venues",
      introB: " — and that's where it stops.",
      bodyA: "Founding clubs get ",
      bodyFree: "3 months completely free",
      bodyB: ", no credit card, no commitment. Run real nights on Yuno, see what it does for your operations, and decide after.",
      pathsLabel: "After your trial, two paths:",
      pathMonthly: "Go monthly at the standard rate, any time.",
      pathAnnualA: "Go annual and get ",
      pathAnnualEm: "2 extra months free",
      pathAnnualB:
        " — plus a lifetime price lock. Your rate never increases, even as we add features and raise prices for everyone else.",
      checks: [
        "3 months free — no card, no strings",
        "Direct onboarding with Paul, Yuno's founder",
        "Annual plan = 2 months free + your rate locked forever",
      ],
      deadline: "Open until September 2026 — or until all 15 spots are claimed.",
      cta: "Claim your founding spot",
      ctaMeta: "Free to join · No contract · Exclusive territory",
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
        body: "A flat 3% service fee on every pre-ordered round, paid by the customer. You receive 100% of the menu price — pre-ordering is a guest-side perk that cuts your queue without costing you anything.",
      },
      {
        title: "VIP tables",
        body: "Same 4% / €0.99 minimum on online deposits and tables billed through Yuno — paid by the customer. No commission on cash collected at the door.",
      },
      {
        title: "Promoter attribution",
        body: "Commissions you've configured (fixed or %) are deducted from the venue's net share and paid directly to the promoter.",
      },
    ],
  },
};

export type PricingContent = typeof en;

const fr: PricingContent = {
  meta: {
    title: "Tarifs — Yuno",
    description:
      "Les formules Yuno : Core (gratuit), Essential 39 €/mois, Pro 69 €/mois, Elite 99 €/mois. Plus 4 % par billet avec un minimum de 0,99 € sur les transactions.",
    ogTitle: "Tarifs — Yuno",
    ogDescription:
      "Core, Essential 39 €, Pro 69 €, Elite 99 € — plus des frais de transaction réduits.",
  },
  plans: [
    {
      name: "Yuno Core",
      price: "Gratuit",
      suffix: "Billetterie à l'usage",
      cta: "Commencer",
      popular: false,
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
      price: "39 €",
      suffix: "/ mois",
      cta: "Démarrer l'essai de 14 jours",
      popular: false,
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
      price: "69 €",
      suffix: "/ mois",
      cta: "Démarrer l'essai de 14 jours",
      popular: true,
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
      price: "99 €",
      suffix: "/ mois",
      cta: "Contacter l'équipe commerciale",
      popular: false,
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
  fees: "Plus 4 % par billet (0,99 € min) et 3 % sur les boissons — des frais de service réglés par le client, jamais par vous. Les comptes Organisateur et Affilié sont gratuits.",
  cardNote: "Sans frais d'installation · Annulation à tout moment · Sans engagement",
  mostPopular: "Le plus populaire",

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
      essential: "Essential — 39 €/mois",
      pro: "Pro — 69 €/mois",
      elite: "Elite — 99 €/mois",
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
        sub: "0 % de commission — abonnement uniquement",
        costLabel: "abonnement uniquement",
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
      " Shotgun 10 % de commission organisateur · Weezevent 2,5 % + 0,99 €/billet côté organisateur · Xceed Marketplace 15 % de commission organisateur · Yuno : 0 % de commission organisateur, abonnement uniquement. DICE ajoute des frais au-dessus de votre prix pour les acheteurs — non comparable sur le coût organisateur. Estimation seulement ; les frais réels varient selon le mode de paiement et l'événement.",
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
    titleA: "Une formule pour chaque ",
    titleEm: "envergure de soirée",
    sub: "Des formules SaaS mensuelles pour la gestion, plus des frais de transaction transparents sur ce qui génère réellement de l'argent.",
    feeIntroA: "Yuno vous facture un ",
    feeIntroMonthly: "abonnement mensuel",
    feeIntroB:
      ". Les frais sur les billets et les boissons sont réglés par vos invités au moment du paiement — ",
    feeIntroNotYou: "pas par vous",
    feeIntroC: ". Le calculateur de frais ci-dessous montre ce que vos participants paient par achat.",
    noCutBold: "Yuno ne prend aucune part de vos revenus.",
    noCutBody:
      "Les 4 % de frais de service sont réglés par vos clients au moment du paiement — comme des frais de carte bancaire. Vous conservez 100 % du prix de votre billet.",
    noCutCompare: "Comparez cela aux 10 % de Shotgun prélevés directement sur votre versement.",
    savingsEyebrow: "vs. Shotgun · Weezevent · Xceed · DICE",
    savingsTitle: "La plateforme de billetterie la moins chère pour la nuit — de loin",
    savingsSub:
      "Yuno fonctionne uniquement par abonnement. Aucune commission par billet. Comparez ce que chaque plateforme vous coûte réellement par an.",
    serviceFeeEyebrow: "Les chiffres en clair",
    serviceFeeTitle: "Ce que vos clients paient réellement en frais",
    serviceFeeSub:
      "Déplacez les curseurs. Chaque frais de service est réglé par le client au moment du paiement — jamais par vous. Vous conservez 100 % de vos prix de menu et de billet.",
    founding: {
      badge: "Premiers adoptants — 15 places seulement",
      title: "Offre Club Fondateur",
      introA: "Nous intégrons nos 15 premiers ",
      introVenues: "établissements partenaires",
      introB: " — et cela s'arrête là.",
      bodyA: "Les clubs fondateurs bénéficient de ",
      bodyFree: "3 mois entièrement gratuits",
      bodyB: ", sans carte bancaire, sans engagement. Organisez de vraies soirées sur Yuno, voyez ce que cela apporte à vos opérations, et décidez ensuite.",
      pathsLabel: "Après votre essai, deux options :",
      pathMonthly: "Passez au mensuel au tarif standard, à tout moment.",
      pathAnnualA: "Passez à l'annuel et obtenez ",
      pathAnnualEm: "2 mois supplémentaires gratuits",
      pathAnnualB:
        " — plus un tarif verrouillé à vie. Votre tarif n'augmente jamais, même lorsque nous ajoutons des fonctionnalités et augmentons les prix pour tous les autres.",
      checks: [
        "3 mois gratuits — sans carte, sans condition",
        "Intégration directe avec Paul, le fondateur de Yuno",
        "Formule annuelle = 2 mois gratuits + votre tarif verrouillé à vie",
      ],
      deadline: "Ouvert jusqu'en septembre 2026 — ou jusqu'à ce que les 15 places soient prises.",
      cta: "Réserver ma place de fondateur",
      ctaMeta: "Adhésion gratuite · Sans contrat · Territoire exclusif",
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
        body: "Un frais de service forfaitaire de 3 % sur chaque tournée précommandée, réglé par le client. Vous recevez 100 % du prix du menu — la précommande est un avantage côté client qui réduit votre file d'attente sans rien vous coûter.",
      },
      {
        title: "Tables VIP",
        body: "Même minimum de 4 % / 0,99 € sur les acomptes en ligne et les tables facturées via Yuno — réglé par le client. Aucune commission sur l'argent encaissé à l'entrée.",
      },
      {
        title: "Attribution promoteurs",
        body: "Les commissions que vous avez configurées (fixes ou %) sont déduites de la part nette du club et versées directement au promoteur.",
      },
    ],
  },
};

export const pricingContent: Record<Locale, PricingContent> = { en, fr };

export function usePricing(): PricingContent {
  return pricingContent[useLocale()];
}
