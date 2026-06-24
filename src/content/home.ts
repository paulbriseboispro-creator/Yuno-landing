// Home page copy in both locales. Components read it via useHome(); the route
// head() function reads the raw `homeContent[locale]` map. French is checked
// against the English shape at compile time (HomeContent = typeof en), so the
// two objects must keep identical keys and identical array lengths — only the
// values differ.
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Yuno — The OS for clubs, organizers & promoters",
    description:
      "The all-in-one platform powering modern nightlife. VIP floor plans, click-and-collect bars, ticketing with automated Stripe Connect revenue splits.",
    ogDescription:
      "The all-in-one platform powering modern nightlife. VIP floor plans, click-and-collect bars, automated revenue splits.",
  },
  hero: {
    eyebrow: "The nightlife operating system",
    titleA: "Run your whole",
    titleEm: "night.",
    titleB: "Keep 100% of every ticket.",
    sub: "Every night ends with a spreadsheet. Promoter payments, bar splits, guest list reconciliation — hours of work after a night that already ran on adrenaline. Yuno closes the loop automatically, so your next morning starts with a bank transfer, not a calculator.",
    ctaPrimary: "Start free",
    ctaSecondary: "Watch product tour",
  },
  logoCloud: {
    label: "Already trusted by venues like",
  },
  comparison: {
    eyebrow: "Industry reality check",
    titleA: "Your ticketing platform is your highest operating cost.",
    titleEm: "You just don't see it on an invoice.",
    colStandardLabel: "Industry standard",
    colStandardName: "Shotgun",
    colYunoLabel: "Yuno",
    colYunoName: "Subscription only",
    rows: [
      { label: "Ticket commission", shotgun: "10% — paid by you", yuno: "0% — paid by the customer" },
      { label: "200 tickets at €20", shotgun: "You lose €400", yuno: "You receive €4,000", highlight: true },
      { label: "Bank transfer fees", shotgun: "+3%", yuno: "Included" },
      { label: "Funds recovery", shotgun: "72h after the event", yuno: "Automatic at checkout" },
      { label: "Bar, floor plan, CRM", shotgun: false, yuno: true },
    ] as ComparisonRow[],
    footerA: "Over a 20-night season:",
    footerShotgun: "€8,000",
    footerShotgunRest: " paid to Shotgun in commission.",
    footerYuno: "A full year of Yuno Pro costs €1,188.",
  },
  differentiators: {
    eyebrow: "What makes us different",
    title: "Three things no one else does",
    items: [
      {
        icon: "Banknote",
        title: "Automatic revenue splits",
        body: "At closing, every party gets paid. Club, organizer, promoters — each to their own Stripe account, automatically. No Excel, no Venmo, no \"I'll sort it tomorrow.\"",
        tag: "The only nightlife platform with multi-party Stripe Connect splits.",
      },
      {
        icon: "Users",
        title: "Yuno Collab — organizers pay zero",
        body: "An external organizer wants to throw a night in your venue? They create the event on Yuno, you host the infrastructure. Splits happen automatically. No subscription for them, Pro dashboards free for you that night.",
        tag: "Host more nights, keep more margin.",
      },
      {
        icon: "Tag",
        title: "Transparent pricing — you see it before you sign",
        body: "No sales call. No annual contract. No \"contact us for pricing.\" Core starts at €0. Pro at €99/month. You decide.",
        tag: "Fourvenues will send you a quote. We'll send you a link.",
      },
    ] as DifferentiatorItem[],
  },
  segmentsSection: {
    eyebrow: "Built for three roles",
    title: "One platform, three operating modes",
  },
  segments: {
    clubs: "Clubs",
    organizers: "Organizers",
    promoters: "Promoters",
  },
  segmentContent: {
    clubs: {
      title: "Run the floor, not the spreadsheet",
      bullets: [
        "Interactive VIP floor plan with live minimum-spend tracking",
        "Guests order from their phone. Bar staff receive the order. No queue, no cash handling, 30% higher average order.",
        "Your bouncer is on the door in 30 seconds. No app download, no email account — just a PIN. Built for the turnover rate of nightlife.",
        "Built-in CRM with SMS & email campaigns to your top spenders",
        "Bouncer QR scanner with real-time capacity tracking and incident logging",
        "Pre-night analytics — see expected attendance before doors open based on ticket velocity and historical patterns.",
      ],
    },
    organizers: {
      title: "Ticketing without the markup",
      bullets: [
        "4% per ticket, €0.99 minimum — among the lowest in Europe",
        "Stripe Connect splits revenue with your host venue in real time",
        "Tiered pricing, queues, guest list and your own check-in app",
        "Onboard scanners with one-time PINs — no devices to provision",
      ],
    },
    promoters: {
      title: "Get paid for the crowd you bring",
      bullets: [
        "Personal Linktree-style page with all your nights in one URL",
        "Per-click, per-ticket and per-table attribution — automated",
        "IBAN payouts scheduled and traceable: pending, approved, paid",
        "Live leaderboard and conversion analytics for your team",
      ],
    },
  },
  features: {
    eyebrow: "What's inside",
    title: "Operator-grade tooling, end to end",
    items: [
      {
        tag: "Floor plan",
        title: "VIP Floor Plan Editor",
        body: "Drag-and-drop your tables, zones and minimum spend. VIP hosts log bottles on iPad — the system flags shortfalls automatically.",
      },
      {
        tag: "Bar",
        title: "Click & Collect Bar",
        body: "Guests pre-order drinks from their phone. Barmen see a live queue — Waiting → Prep → Ready — and push a notification when it's ready.",
      },
      {
        tag: "CRM",
        title: "CRM & SMS Marketing",
        body: "Every visit, favourite bottle and door incident in one profile. Send targeted SMS or email campaigns to your top 1% of spenders.",
      },
      {
        tag: "Staff",
        title: "PIN-Based Staff Login",
        body: "Bouncers, barmen, vestiaire and VIP hosts sign in with a 4-digit PIN. Two seconds, any terminal — built for nightly turnover.",
      },
      {
        tag: "Promoters",
        title: "Promoter Attribution",
        body: "Each promoter gets a unique link. Sales tracked live. Commission calculated automatically. Paid directly to their Stripe account after the night — zero manual work, zero disputes.",
      },
      {
        tag: "Live night",
        title: "Live Night Dashboard",
        body: "Entries, bar revenue, table spend and staff status — one screen, refreshed in real time, the way a night manager actually thinks.",
      },
    ],
  },
  split: {
    eyebrow: "Stripe Connect",
    title: "Instant payouts with",
    titleEm: "automated splits",
    body: "Every ticket sale is split at the moment the card clears — between the host venue, the organizer and the promoter who brought the sale. No month-end reconciliation, no awkward Whatsapps.",
    bullets: [
      "Real-time promoter attribution",
      "Full audit trail per transaction (VAT invoice support coming)",
      "Stripe Connect Standard accounts — you keep ownership",
    ],
  },
  collab: {
    eyebrow: "For organizers — Yuno Collab",
    titleA: "Host a night anywhere.",
    titleEm: "Pay nothing.",
    body: "Find a club already on Yuno. Create your event. Set your split. Sell tickets. The venue gets its cut automatically. You get yours. Promoters get theirs.",
    costLabel: "Your cost?",
    costValue: "Zero subscription. Ever.",
    note: "The club hosts the infrastructure. You bring the crowd. Stripe Connect handles the rest.",
    cta: "Create your first event",
  },
  onboarding: {
    eyebrow: "Onboarding",
    title: "You're live in one afternoon",
    stepLabel: "Step",
    steps: [
      { step: "01", title: "Setup your events, tickets, floor plan & staff", time: "30 min" },
      { step: "02", title: "Connect Stripe & configure your bar", time: "20 min" },
      { step: "03", title: "Invite your promoters & go live. Send each their unique link — they start selling, you see every sale in real time.", time: "10 min" },
    ],
  },
  savings: {
    eyebrow: "0% commission · subscription only",
    titleA: "Stop paying",
    titleEm: "10–15%",
    titleB: "on every ticket",
    body: "Shotgun, Weezevent and Xceed take a cut on every ticket you sell. Yuno is a flat monthly subscription — keep the rest. See how much you'd save in a year.",
  },
  pricingTeaser: {
    eyebrow: "Pricing",
    title: "Ready to scale your nights?",
    sub: "Pick a plan that matches your venue. Switch any time.",
    calloutBold: "Yuno doesn't take a cut from your revenue.",
    calloutMuted:
      "The 4% service fee is paid by your customers at checkout — like a credit card processing fee. You keep 100% of your ticket price.",
    calloutAccent: "Compare that to Shotgun's 10% taken directly from your payout.",
    compareLink: "Compare all plans",
  },
  founding: {
    eyebrow: "Early Adopters",
    title: "Founding Club Offer",
    bodyA: "We're onboarding our first ",
    bodyVenues: "15 partner venues",
    bodyB: ". Founding clubs get ",
    bodyMonths: "3 months free",
    bodyC: " — no credit card, no commitment. After that, go monthly at full price or choose annual and get ",
    bodyAnnual: "2 months free + a lifetime price lock",
    bodyD: ". Your rate never increases, even if our prices go up.",
    bullets: [
      "3 months completely free, no card required",
      "Dedicated onboarding call with the founding team",
      "Annual plan = 2 months free + price locked forever",
    ],
    cta: "Join the founding cohort",
  },
  founderQuote: {
    eyebrow: "Why we built it",
    quote:
      "We built Yuno because we spent too many Sunday mornings reconciling Excel sheets from the night before. There had to be a better way.",
    name: "Paul",
    title: "Co-founder, Yuno",
    statValue: "4h+",
    statBodyA: "The average club spends ",
    statBodyHighlight: "4+ hours per event",
    statBodyB: " on post-night reconciliation — promoter payouts, bar splits, guest list, refunds.",
    statResultA: "Yuno reduces that to ",
    statResultHighlight: "zero",
    statResultB: ".",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions, straight answers",
    categories: {
      all: "All Topics",
      "getting-started": "Getting Started",
      features: "Features",
      billing: "Billing",
      support: "Support",
    } as Record<string, string>,
    items: [
      {
        id: "setup-time",
        category: "getting-started",
        title: "How long does it take to set up a club?",
        content: "Most venues are live in under a week. We migrate your guest list, build your floor plan with you, and your staff is trained on the PIN flow in an afternoon.",
      },
      {
        id: "onboarding",
        category: "getting-started",
        title: "Do you offer training or onboarding?",
        content: "We provide video tutorials, documentation, and live webinars. Pro and Elite plans include personalized onboarding sessions with our support team.",
      },
      {
        id: "pos-integration",
        category: "features",
        title: "Can I keep my existing ticketing or POS?",
        content: "Yuno can run alongside an external ticketing provider for an event, but you'll get full operational value (bar, VIP, CRM, payouts) only when ticketing runs through Yuno.",
      },
      {
        id: "floor-plan",
        category: "features",
        title: "How does the VIP floor plan editor work?",
        content: "Drag-and-drop tables, zones and minimum spend directly in the app. VIP hosts log bottles on iPad — the system flags shortfalls automatically and updates availability in real time.",
      },
      {
        id: "bar-flow",
        category: "features",
        title: "How does the Click & Collect bar reduce queues?",
        content: "Guests pre-order drinks from their phone. Barmen see a live queue — pending, preparing, ready — and push a notification when the round is ready for pickup.",
      },
      {
        id: "revenue-split",
        category: "billing",
        title: "How does the revenue split with a host venue work?",
        content: "When you onboard, both parties connect their Stripe Connect Standard accounts and agree on a split (e.g. 70/30). Every sale is split at the moment of payment — funds land in each account independently.",
      },
      {
        id: "plan-change",
        category: "billing",
        title: "Can I change my plan anytime?",
        content: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate your billing accordingly.",
      },
      {
        id: "markets",
        category: "support",
        title: "Which markets do you operate in?",
        content: "Europe-first. We currently serve venues and organizers across France, Spain, Belgium, Switzerland and the UK, and we settle payouts in EUR and GBP.",
      },
      {
        id: "bug-report",
        category: "support",
        title: "How do I report a bug or request a feature?",
        content: "Use the in-app feedback button or email support@yunoapp.eu with details. Our team typically responds within 24 hours on business days.",
      },
    ],
  },
  marquee: {
    eyebrow: "In the wild",
    title: "See Yuno in action across every venue",
  },
  cta: {
    title: "Run your next night on Yuno",
    sub: "Book a 30-minute call. We'll walk through your floor plan, your fee stack and what migrating would look like.",
    button: "Book a demo",
  },
};

// Comparison rows hold either a string or a boolean (the checkmark/X cells). The
// boolean shape needs an explicit type so the French mirror doesn't widen to
// `string` and break the literal-friendly typeof inference.
type ComparisonRow = {
  label: string;
  shotgun: string | boolean;
  yuno: string | boolean;
  highlight?: boolean;
};

type DifferentiatorItem = {
  icon: string;
  title: string;
  body: string;
  tag: string;
};

export type HomeContent = typeof en;

const fr: HomeContent = {
  meta: {
    title: "Yuno — Le système d'exploitation des clubs, organisateurs & promoteurs",
    description:
      "La plateforme tout-en-un qui propulse la vie nocturne moderne. Plans de salle VIP, bars en click-and-collect, billetterie avec répartition automatique des revenus via Stripe Connect.",
    ogDescription:
      "La plateforme tout-en-un qui propulse la vie nocturne moderne. Plans de salle VIP, bars en click-and-collect, répartition automatique des revenus.",
  },
  hero: {
    eyebrow: "Le système d'exploitation de la vie nocturne",
    titleA: "Gérez toute votre",
    titleEm: "soirée.",
    titleB: "Gardez 100 % de chaque billet.",
    sub: "Chaque nuit se termine par un tableur. Paiements des promoteurs, répartition du bar, réconciliation de la liste d'invités — des heures de travail après une nuit déjà menée à l'adrénaline. Yuno boucle la boucle automatiquement, pour que votre matin commence par un virement, pas par une calculatrice.",
    ctaPrimary: "Commencer gratuitement",
    ctaSecondary: "Voir la démo produit",
  },
  logoCloud: {
    label: "Déjà adoptée par des établissements comme",
  },
  comparison: {
    eyebrow: "Le vrai coût du secteur",
    titleA: "Votre plateforme de billetterie est votre poste de dépense le plus élevé.",
    titleEm: "Vous ne le voyez simplement pas sur une facture.",
    colStandardLabel: "Standard du secteur",
    colStandardName: "Shotgun",
    colYunoLabel: "Yuno",
    colYunoName: "Abonnement uniquement",
    rows: [
      { label: "Commission par billet", shotgun: "10 % — payés par vous", yuno: "0 % — payés par le client" },
      { label: "200 billets à 20 €", shotgun: "Vous perdez 400 €", yuno: "Vous recevez 4 000 €", highlight: true },
      { label: "Frais de virement", shotgun: "+3 %", yuno: "Inclus" },
      { label: "Récupération des fonds", shotgun: "72 h après l'événement", yuno: "Automatique au paiement" },
      { label: "Bar, plan de salle, CRM", shotgun: false, yuno: true },
    ],
    footerA: "Sur une saison de 20 soirées :",
    footerShotgun: "8 000 €",
    footerShotgunRest: " versés à Shotgun en commissions.",
    footerYuno: "Une année complète de Yuno Pro coûte 1 188 €.",
  },
  differentiators: {
    eyebrow: "Ce qui nous distingue",
    title: "Trois choses que personne d'autre ne fait",
    items: [
      {
        icon: "Banknote",
        title: "Répartition automatique des revenus",
        body: "À la fermeture, chaque partie est payée. Club, organisateur, promoteurs — chacun sur son propre compte Stripe, automatiquement. Pas d'Excel, pas de Lydia, pas de « je règle ça demain ».",
        tag: "La seule plateforme de vie nocturne avec répartition multi-parties via Stripe Connect.",
      },
      {
        icon: "Users",
        title: "Yuno Collab — les organisateurs ne paient rien",
        body: "Un organisateur externe veut monter une soirée dans votre établissement ? Il crée l'événement sur Yuno, vous hébergez l'infrastructure. La répartition se fait automatiquement. Aucun abonnement pour lui, des tableaux de bord Pro offerts pour vous ce soir-là.",
        tag: "Accueillez plus de soirées, gardez plus de marge.",
      },
      {
        icon: "Tag",
        title: "Tarifs transparents — vous les voyez avant de signer",
        body: "Pas d'appel commercial. Pas de contrat annuel. Pas de « contactez-nous pour un devis ». Core démarre à 0 €. Pro à 99 €/mois. Vous décidez.",
        tag: "Fourvenues vous enverra un devis. Nous, un lien.",
      },
    ],
  },
  segmentsSection: {
    eyebrow: "Conçu pour trois rôles",
    title: "Une plateforme, trois modes de fonctionnement",
  },
  segments: {
    clubs: "Clubs",
    organizers: "Organisateurs",
    promoters: "Promoteurs",
  },
  segmentContent: {
    clubs: {
      title: "Gérez la salle, pas le tableur",
      bullets: [
        "Plan de salle VIP interactif avec suivi du minimum de consommation en temps réel",
        "Les clients commandent depuis leur téléphone. Le staff du bar reçoit la commande. Pas de file d'attente, pas de manipulation d'espèces, panier moyen supérieur de 30 %.",
        "Votre videur est sur la porte en 30 secondes. Aucune application à télécharger, aucun compte e-mail — juste un PIN. Conçu pour le rythme de rotation de la vie nocturne.",
        "CRM intégré avec campagnes SMS & e-mail vers vos meilleurs clients",
        "Scanner QR pour videur avec suivi de capacité en temps réel et journal des incidents",
        "Analyses avant-soirée — visualisez l'affluence attendue avant l'ouverture des portes, selon la vitesse de vente des billets et les tendances historiques.",
      ],
    },
    organizers: {
      title: "La billetterie sans la marge",
      bullets: [
        "4 % par billet, 0,99 € minimum — parmi les plus bas d'Europe",
        "Stripe Connect répartit les revenus avec votre établissement hôte en temps réel",
        "Tarifs par paliers, files d'attente, liste d'invités et votre propre application de contrôle d'accès",
        "Équipez vos scanners avec des codes PIN à usage unique — aucun appareil à provisionner",
      ],
    },
    promoters: {
      title: "Soyez payé pour la foule que vous amenez",
      bullets: [
        "Page personnelle façon Linktree avec toutes vos soirées dans une seule URL",
        "Attribution par clic, par billet et par table — automatisée",
        "Versements IBAN planifiés et traçables : en attente, approuvé, payé",
        "Classement en direct et analyses de conversion pour votre équipe",
      ],
    },
  },
  features: {
    eyebrow: "Ce qu'il y a à l'intérieur",
    title: "Des outils de niveau opérateur, de bout en bout",
    items: [
      {
        tag: "Plan de salle",
        title: "Éditeur de plan de salle VIP",
        body: "Glissez-déposez vos tables, zones et minimum de consommation. Les hôtes VIP enregistrent les bouteilles sur iPad — le système signale automatiquement les manques.",
      },
      {
        tag: "Bar",
        title: "Bar Click & Collect",
        body: "Les clients commandent leurs boissons à l'avance depuis leur téléphone. Les barmen voient une file en direct — En attente → Préparation → Prêt — et envoient une notification dès que c'est prêt.",
      },
      {
        tag: "CRM",
        title: "CRM & marketing SMS",
        body: "Chaque visite, bouteille préférée et incident à la porte dans un seul profil. Envoyez des campagnes SMS ou e-mail ciblées à vos 1 % de meilleurs clients.",
      },
      {
        tag: "Staff",
        title: "Connexion du staff par PIN",
        body: "Videurs, barmen, vestiaire et hôtes VIP se connectent avec un PIN à 4 chiffres. Deux secondes, sur n'importe quel terminal — conçu pour la rotation nocturne.",
      },
      {
        tag: "Promoteurs",
        title: "Attribution des promoteurs",
        body: "Chaque promoteur reçoit un lien unique. Ventes suivies en direct. Commission calculée automatiquement. Versée directement sur son compte Stripe après la soirée — zéro travail manuel, zéro litige.",
      },
      {
        tag: "Live night",
        title: "Tableau de bord Live Night",
        body: "Entrées, revenus du bar, dépenses par table et statut du staff — un seul écran, actualisé en temps réel, à la manière dont un manager de nuit raisonne vraiment.",
      },
    ],
  },
  split: {
    eyebrow: "Stripe Connect",
    title: "Versements instantanés avec",
    titleEm: "répartition automatique",
    body: "Chaque vente de billet est répartie au moment où la carte est validée — entre l'établissement hôte, l'organisateur et le promoteur à l'origine de la vente. Pas de réconciliation en fin de mois, pas de WhatsApp gênants.",
    bullets: [
      "Attribution des promoteurs en temps réel",
      "Piste d'audit complète par transaction (facturation TVA bientôt disponible)",
      "Comptes Stripe Connect Standard — vous en gardez la propriété",
    ],
  },
  collab: {
    eyebrow: "Pour les organisateurs — Yuno Collab",
    titleA: "Organisez une soirée n'importe où.",
    titleEm: "Ne payez rien.",
    body: "Trouvez un club déjà sur Yuno. Créez votre événement. Définissez votre répartition. Vendez vos billets. L'établissement reçoit sa part automatiquement. Vous recevez la vôtre. Les promoteurs reçoivent la leur.",
    costLabel: "Votre coût ?",
    costValue: "Zéro abonnement. Jamais.",
    note: "Le club héberge l'infrastructure. Vous amenez la foule. Stripe Connect gère le reste.",
    cta: "Créez votre premier événement",
  },
  onboarding: {
    eyebrow: "Onboarding",
    title: "Vous êtes opérationnel en une après-midi",
    stepLabel: "Étape",
    steps: [
      { step: "01", title: "Configurez vos événements, billets, plan de salle & staff", time: "30 min" },
      { step: "02", title: "Connectez Stripe & configurez votre bar", time: "20 min" },
      { step: "03", title: "Invitez vos promoteurs & lancez-vous. Envoyez à chacun son lien unique — ils commencent à vendre, vous voyez chaque vente en temps réel.", time: "10 min" },
    ],
  },
  savings: {
    eyebrow: "0 % de commission · abonnement uniquement",
    titleA: "Arrêtez de payer",
    titleEm: "10–15 %",
    titleB: "sur chaque billet",
    body: "Shotgun, Weezevent et Xceed prennent une part sur chaque billet que vous vendez. Yuno est un abonnement mensuel fixe — gardez le reste. Découvrez combien vous économiseriez en un an.",
  },
  pricingTeaser: {
    eyebrow: "Tarifs",
    title: "Prêt à faire grandir vos soirées ?",
    sub: "Choisissez une formule adaptée à votre établissement. Changez à tout moment.",
    calloutBold: "Yuno ne prend aucune part sur vos revenus.",
    calloutMuted:
      "Les 4 % de frais de service sont payés par vos clients au paiement — comme des frais de traitement de carte. Vous gardez 100 % du prix de votre billet.",
    calloutAccent: "Comparez avec les 10 % de Shotgun prélevés directement sur votre versement.",
    compareLink: "Comparer tous les plans",
  },
  founding: {
    eyebrow: "Premiers adoptants",
    title: "Offre Club Fondateur",
    bodyA: "Nous accueillons nos ",
    bodyVenues: "15 premiers établissements partenaires",
    bodyB: ". Les clubs fondateurs bénéficient de ",
    bodyMonths: "3 mois offerts",
    bodyC: " — sans carte bancaire, sans engagement. Ensuite, passez au mensuel au tarif plein ou choisissez l'annuel et obtenez ",
    bodyAnnual: "2 mois offerts + un prix bloqué à vie",
    bodyD: ". Votre tarif n'augmente jamais, même si nos prix montent.",
    bullets: [
      "3 mois entièrement offerts, sans carte requise",
      "Appel d'onboarding dédié avec l'équipe fondatrice",
      "Formule annuelle = 2 mois offerts + prix bloqué pour toujours",
    ],
    cta: "Rejoindre la cohorte fondatrice",
  },
  founderQuote: {
    eyebrow: "Pourquoi nous l'avons créé",
    quote:
      "Nous avons créé Yuno parce que nous avons passé trop de dimanches matin à réconcilier des feuilles Excel de la veille. Il devait y avoir une meilleure façon de faire.",
    name: "Paul",
    title: "Co-fondateur, Yuno",
    statValue: "4h+",
    statBodyA: "Un club passe en moyenne ",
    statBodyHighlight: "plus de 4 heures par événement",
    statBodyB: " sur la réconciliation post-soirée — versements aux promoteurs, répartition du bar, liste d'invités, remboursements.",
    statResultA: "Yuno réduit ça à ",
    statResultHighlight: "zéro",
    statResultB: ".",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions courantes, réponses directes",
    categories: {
      all: "Tous les sujets",
      "getting-started": "Pour commencer",
      features: "Fonctionnalités",
      billing: "Facturation",
      support: "Support",
    },
    items: [
      {
        id: "setup-time",
        category: "getting-started",
        title: "Combien de temps faut-il pour configurer un club ?",
        content: "La plupart des établissements sont opérationnels en moins d'une semaine. Nous migrons votre liste d'invités, construisons votre plan de salle avec vous, et votre staff est formé au flux PIN en une après-midi.",
      },
      {
        id: "onboarding",
        category: "getting-started",
        title: "Proposez-vous de la formation ou de l'onboarding ?",
        content: "Nous proposons des tutoriels vidéo, de la documentation et des webinaires en direct. Les formules Pro et Elite incluent des sessions d'onboarding personnalisées avec notre équipe support.",
      },
      {
        id: "pos-integration",
        category: "features",
        title: "Puis-je garder ma billetterie ou mon POS actuel ?",
        content: "Yuno peut fonctionner aux côtés d'un prestataire de billetterie externe pour un événement, mais vous n'obtiendrez toute la valeur opérationnelle (bar, VIP, CRM, versements) que lorsque la billetterie passe par Yuno.",
      },
      {
        id: "floor-plan",
        category: "features",
        title: "Comment fonctionne l'éditeur de plan de salle VIP ?",
        content: "Glissez-déposez tables, zones et minimum de consommation directement dans l'application. Les hôtes VIP enregistrent les bouteilles sur iPad — le système signale automatiquement les manques et met à jour la disponibilité en temps réel.",
      },
      {
        id: "bar-flow",
        category: "features",
        title: "Comment le bar Click & Collect réduit-il les files d'attente ?",
        content: "Les clients commandent leurs boissons à l'avance depuis leur téléphone. Les barmen voient une file en direct — en attente, en préparation, prêt — et envoient une notification dès que la tournée est prête à être récupérée.",
      },
      {
        id: "revenue-split",
        category: "billing",
        title: "Comment fonctionne la répartition des revenus avec un établissement hôte ?",
        content: "À l'onboarding, les deux parties connectent leurs comptes Stripe Connect Standard et conviennent d'une répartition (ex. 70/30). Chaque vente est répartie au moment du paiement — les fonds arrivent sur chaque compte indépendamment.",
      },
      {
        id: "plan-change",
        category: "billing",
        title: "Puis-je changer de formule à tout moment ?",
        content: "Oui, vous pouvez passer à une formule supérieure ou inférieure à tout moment. Les changements prennent effet immédiatement, et nous calculons votre facturation au prorata.",
      },
      {
        id: "markets",
        category: "support",
        title: "Dans quels marchés opérez-vous ?",
        content: "L'Europe d'abord. Nous servons aujourd'hui des établissements et organisateurs en France, Espagne, Belgique, Suisse et au Royaume-Uni, et nous réglons les versements en EUR et GBP.",
      },
      {
        id: "bug-report",
        category: "support",
        title: "Comment signaler un bug ou demander une fonctionnalité ?",
        content: "Utilisez le bouton de feedback dans l'application ou écrivez à support@yunoapp.eu avec les détails. Notre équipe répond généralement sous 24 heures les jours ouvrés.",
      },
    ],
  },
  marquee: {
    eyebrow: "Sur le terrain",
    title: "Voyez Yuno à l'œuvre dans chaque établissement",
  },
  cta: {
    title: "Faites tourner votre prochaine soirée sur Yuno",
    sub: "Réservez un appel de 30 minutes. Nous passerons en revue votre plan de salle, votre structure de frais et à quoi ressemblerait une migration.",
    button: "Réserver une démo",
  },
};

export const homeContent: Record<Locale, HomeContent> = { en, fr };

export function useHome(): HomeContent {
  return homeContent[useLocale()];
}
