// Comparison pages ("Yuno vs <competitor>"). Competitor facts come only from
// their public pages and help centres, checked on the `updated` date and listed
// in `sources`. Rules (EU comparative advertising + GEO credibility): state what
// is public, say "not published" when it isn't, give the competitor its real
// strengths, never guess a number. Yuno facts: docs/yuno-context.md.
import type { ComparePageContent } from "./compare-types";

const UPDATED = "2026-09-24";

// ---------------------------------------------------------------- Shotgun FR
const shotgunFr: ComparePageContent = {
  id: "shotgun",
  lang: "fr",
  path: "/fr/alternative-shotgun",
  twins: { en: "/alternative-shotgun", fr: "/fr/alternative-shotgun" },
  competitor: "Shotgun",
  updated: UPDATED,
  meta: {
    title: "Alternative à Shotgun Pro : frais, commission et comparatif | Yuno",
    description:
      "Shotgun Pro ou Yuno ? Frais, commission organisateur, paiements, tables VIP, bar, promoteurs : le comparatif sourcé pour choisir votre billetterie de soirée.",
    ogAlt: "Yuno vs Shotgun Pro — comparatif billetterie pour clubs et organisateurs",
  },
  breadcrumb: { home: "Yuno", current: "Alternative à Shotgun" },
  hero: {
    kicker: "Yuno vs Shotgun Pro — comparatif billetterie, frais et commissions",
    title: "L'alternative à Shotgun qui vend aussi vos tables, votre bar et paie vos promoteurs.",
    sub: "Shotgun est une excellente billetterie pour la scène électro. Yuno est la plateforme de toute la soirée : billets et guest list, tables VIP, commande au bar, répartition club × organisateur et commissions des promoteurs — 0 € d'abonnement, 0 % de commission sur votre prix.",
    primary: "Créer mon compte gratuit",
    secondary: "Parler au fondateur",
    updatedLabel: "Informations publiques relevées le 24 septembre 2026",
  },
  tldr: {
    title: "En bref",
    items: [
      "Commission organisateur : 0 % chez Yuno ; chez Shotgun, 10 % des ventes par défaut, négociable au contrat (taux non affiché sur son site).",
      "Frais acheteur : Shotgun est moins cher pour l'acheteur (2,75 %, min. 0,30 €) que Yuno (4 %, min. 0,99 €).",
      "Au-delà du billet : Yuno vend les tables VIP avec acompte, prend les commandes au bar par QR code et répartit la soirée entre club, organisateur et promoteurs. Nous n'avons pas trouvé ces fonctions dans l'aide publique de Shotgun.",
      "Audience : l'app Shotgun fait découvrir vos soirées à plus de 5 millions d'utilisateurs par mois (selon Shotgun). Yuno a aussi sa marketplace, sur l'App Store et en web app, et chaque acheteur rejoint votre base.",
    ],
  },
  table: {
    eyebrow: "Comparatif",
    title: "Yuno vs Shotgun, point par point.",
    sub: "Ce qui est public chez chacun, sans deviner ce qui ne l'est pas.",
    colCriterion: "Critère",
    colYuno: "Yuno",
    colOther: "Shotgun Pro",
    rows: [
      {
        criterion: "Abonnement",
        yuno: "0 €, sans engagement.",
        other: "Aucun abonnement publié.",
        verdict: "tie",
      },
      {
        criterion: "Commission organisateur",
        yuno: "0 % sur votre prix.",
        other:
          "10 % des ventes par défaut, négociable au contrat ; taux non affiché sur le site de Shotgun.",
        verdict: "yuno",
      },
      {
        criterion: "Frais payés par l'acheteur",
        yuno: "4 % (min. 0,99 €) sur les billets ; 4 % plafonnés à 25 € sur les tables ; 3 % sur les boissons.",
        other: "2,75 % de la transaction (min. 0,30 €).",
        verdict: "other",
      },
      {
        criterion: "Encaissement",
        yuno: "Stripe Connect : l'argent arrive sur votre propre compte, à votre nom, au fil des ventes. Yuno ne détient jamais les fonds.",
        other:
          "Solde versé automatiquement 24 h après la fin de l'événement, ou virement manuel avant (2 à 3 jours ouvrés).",
        verdict: "yuno",
      },
      {
        criterion: "Tables VIP & bottle service",
        yuno: "Plan de salle interactif, formules, acompte ou paiement sur place, précommande de bouteilles, minimum de dépense suivi en direct.",
        other:
          "Pas de module de réservation de tables dans l'aide publique ; les billets de groupe peuvent servir aux carrés.",
        verdict: "yuno",
      },
      {
        criterion: "Bar",
        yuno: "Commande et paiement au QR code du bar, file d'attente sur l'écran du barman.",
        other: "Le cashless n'est pas fourni par Shotgun (aide acheteurs).",
        verdict: "yuno",
      },
      {
        criterion: "Promoteurs",
        yuno: "Lien personnel par soirée, ventes et entrées comptées en direct, commission calculée et réglée en trois étapes horodatées.",
        other:
          "Portail « Partenaires de vente » avec liens de suivi ; les revenus reviennent à l'organisateur, qui rémunère ses promoteurs.",
        verdict: "yuno",
      },
      {
        criterion: "Soirée co-organisée club × organisateur",
        yuno: "Contrat signé dans Yuno (par pilier ou au barème), décompte validé par les deux parties, chacun payé sur son compte.",
        other:
          "Les co-organisateurs ont un accès lecteur ou éditeur ; tous les revenus sont versés à l'organisateur principal.",
        verdict: "yuno",
      },
      {
        criterion: "Guest list",
        yuno: "Inscriptions en ligne, quotas, gratuit avant une heure donnée, QR nominatifs, entrée créditée au bon promoteur.",
        other:
          "Guest list sous forme de liste à cocher dans l'app Shotgun Scan, ou invitations avec QR.",
        verdict: "yuno",
      },
      {
        criterion: "Base clients & emailing",
        yuno: "Chaque acheteur (billet, table, boisson, guest list) rejoint votre base ; 9 automatisations, 15 000 emails/mois inclus, ventes attribuées à chaque campagne.",
        other:
          "Base de contacts enrichie à chaque vente ; newsletters et notifications push aux contacts qui ont accepté.",
        verdict: "tie",
      },
      {
        criterion: "Découverte par le public",
        yuno: "Marketplace Yuno sur l'App Store (iOS) et en web app : le public y découvre vos soirées, et chaque acheteur rejoint votre base.",
        other:
          "App grand public (5M+ utilisateurs actifs/mois selon Shotgun) qui recommande des soirées selon les goûts musicaux.",
        verdict: "tie",
      },
      {
        criterion: "Revente & liste d'attente",
        yuno: "Liste d'attente.",
        other: "Revente et liste d'attente intégrées (15 % de frais sur les billets revendus).",
        verdict: "other",
      },
      {
        criterion: "Contrôle à l'entrée",
        yuno: "Un seul scanner pour billets, guest list et tables, recherche par nom ; chaque membre du staff a son propre compte (videur, serveur VIP, barman…).",
        other:
          "App Shotgun Scan (hors ligne, fenêtres de validité, connexion PIN) et vente à la porte.",
        verdict: "tie",
      },
    ],
    footnote:
      "Sources : pages publiques de Shotgun (site Pro, centre d'aide organisateurs et acheteurs, CGV) et étude de cas Stripe, relevées le 24 septembre 2026. Les conditions négociées par chaque organisateur peuvent différer.",
  },
  about: {
    eyebrow: "Shotgun Pro",
    title: "Shotgun Pro, c'est quoi ?",
    paragraphs: [
      "Shotgun est une billetterie née à Paris en 2014 sur la scène électronique. Shotgun Pro est son espace organisateurs (« La billetterie qui engage vos fans ») : collectifs, clubs et festivals y créent leurs événements, vendent leurs billets et retrouvent leurs contacts.",
      "Sa force, c'est l'app grand public : plus de 5 millions d'utilisateurs actifs par mois selon Shotgun, qui y découvrent des soirées recommandées selon leurs goûts. C'est une vraie source de ventes pour un collectif qui cherche du public.",
      "Yuno part d'un autre besoin : faire tourner toute la soirée au même endroit. Les billets, mais aussi les tables VIP, le bar, la porte, les promoteurs et la répartition de l'argent entre le club et l'organisateur — avec une commission de 0 % pour vous.",
    ],
  },
  choose: {
    eyebrow: "Lequel choisir",
    title: "Shotgun ou Yuno : ça dépend de votre soirée.",
    other: {
      title: "Shotgun vous convient si…",
      items: [
        "Vous organisez surtout des soirées électro et comptez sur la découverte dans l'app pour trouver du public.",
        "Vous vendez uniquement des billets, sans tables ni bar à gérer.",
        "La revente officielle de billets est importante pour votre public.",
      ],
    },
    yuno: {
      title: "Yuno vous convient si…",
      items: [
        "Vous êtes un club, ou un organisateur qui joue en club et partage la soirée.",
        "Vous vendez des tables VIP ou des bouteilles, et voulez des acomptes.",
        "Vos promoteurs doivent être suivis et payés sans tableur.",
        "Vous voulez garder 100 % de votre prix, sans commission à négocier.",
        "Vous voulez écrire à vos clients avec des emails qui lisent la soirée en direct.",
      ],
    },
  },
  switch: {
    eyebrow: "Passer à Yuno",
    title: "Changer sans tout casser.",
    sub: "Chaque soirée a un interrupteur par pilier : vous pouvez tester Yuno sur un seul morceau de la nuit.",
    steps: [
      {
        title: "Importez votre base",
        body: "Votre fichier clients existant s'importe dans Yuno, dédoublonné, avec son consentement attesté.",
      },
      {
        title: "Commencez par un pilier",
        body: "La guest list seule, les tables seules ou la billetterie complète : le reste de vos outils continue de tourner.",
      },
      {
        title: "Première soirée accompagnée",
        body: "Compte créé en deux minutes ; plan de salle, tarifs, staff et compte de paiement configurés avec vous en une heure environ.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes sur Shotgun et Yuno",
    items: [
      {
        q: "Qu'est-ce que Shotgun Pro ?",
        a: "Shotgun Pro est l'espace organisateurs de Shotgun, une billetterie née à Paris en 2014 sur la scène électronique. Collectifs, clubs et festivals y créent leurs événements, vendent leurs billets, suivent leurs contacts et scannent les entrées avec l'app Shotgun Scan.",
      },
      {
        q: "Quels sont les frais de Shotgun ?",
        a: "Selon le centre d'aide de Shotgun, l'acheteur paie des frais de service de 2,75 % du montant de la transaction, avec un minimum de 0,30 €. La commission prélevée à l'organisateur n'est pas affichée sur son site : 10 % des ventes par défaut, négociable au contrat. Chez Yuno, la commission organisateur est de 0 % et l'acheteur paie 4 % (minimum 0,99 €).",
      },
      {
        q: "Quand Shotgun paie-t-il l'organisateur ?",
        a: "D'après l'aide Shotgun, le solde d'un événement est viré automatiquement 24 heures après sa fin ; un virement manuel est possible avant, avec 2 à 3 jours ouvrés de délai bancaire. Avec Yuno, les paiements passent par Stripe Connect et arrivent directement sur votre propre compte, à votre nom, au fil des ventes.",
      },
      {
        q: "Les frais de service Shotgun sont-ils remboursés si la soirée est annulée ?",
        a: "Non : les CGV de Shotgun indiquent que les frais de service ne sont pas remboursés aux clients en cas d'annulation ou de report. Le remboursement du billet lui-même est décidé par l'organisateur.",
      },
      {
        q: "Quelle est la meilleure alternative à Shotgun pour un club ?",
        a: "Pour un club, il faut plus qu'une billetterie : tables VIP avec acompte, bar, contrôle d'accès et partage des recettes avec les organisateurs invités. Yuno réunit tout cela dans un seul compte, avec 0 € d'abonnement et 0 % de commission sur votre prix.",
      },
      {
        q: "Peut-on utiliser Shotgun et Yuno en même temps ?",
        a: "Oui. Chaque soirée Yuno s'active pilier par pilier : vous pouvez garder Shotgun pour les billets et utiliser Yuno pour la guest list, les tables VIP ou le bar, puis basculer quand vous le souhaitez.",
      },
      {
        q: "Comment récupérer mes clients Shotgun dans Yuno ?",
        a: "Vous importez votre fichier clients existant dans Yuno : il est dédoublonné et chaque contact garde son consentement attesté. Ensuite, chaque acheteur de billet, de table, de boisson ou inscrit en guest list rejoint automatiquement votre base.",
      },
    ],
  },
  related: {
    title: "Pour aller plus loin",
    links: [
      { label: "Yuno face à Weezevent, Eventbrite, Xceed et DICE", href: "/fr#compare" },
      { label: "Tarifs Yuno : 0 € d'abonnement, 0 % de commission", href: "/fr#pricing" },
      { label: "Alternativa a Fourvenues (ES)", href: "/es/alternativa-fourvenues" },
      { label: "Shotgun alternative (EN)", href: "/alternative-shotgun" },
    ],
  },
  sources: {
    title: "Sources (consultées le 24 septembre 2026)",
    items: [
      { label: "Shotgun Pro — site organisateurs", url: "https://pro.shotgun.live/fr" },
      {
        label: "Shotgun — Comprendre les frais de services",
        url: "https://support-pro.shotgun.live/hc/fr/articles/6989212196242-Comprendre-les-frais-de-services",
      },
      {
        label: "Shotgun — Virer les fonds d'un événement",
        url: "https://support-pro.shotgun.live/hc/fr/articles/12836807849490",
      },
      {
        label: "Shotgun — Partenaires de vente (promoteurs)",
        url: "https://support-pro.shotgun.live/hc/fr/articles/13970546627858",
      },
      {
        label: "Shotgun — Co-organisateurs",
        url: "https://support-pro.shotgun.live/hc/fr/articles/9666665025042",
      },
      {
        label: "Shotgun — Newsletters",
        url: "https://support-pro.shotgun.live/hc/fr/articles/9796697570322",
      },
      {
        label: "Shotgun — Frais Shotgun (aide acheteurs)",
        url: "https://support.shotgun.live/hc/fr/articles/16492705310482",
      },
      {
        label: "Shotgun — Cashless (aide acheteurs)",
        url: "https://support.shotgun.live/hc/fr/articles/16486055540626",
      },
      { label: "Stripe — Étude de cas Shotgun", url: "https://stripe.com/customers/shotgun" },
    ],
  },
  disclaimer:
    "Shotgun et Shotgun Pro sont des marques de leurs propriétaires respectifs. Yuno n'est ni affilié ni partenaire de Shotgun. Ce comparatif s'appuie uniquement sur des informations publiques, relevées à la date indiquée ; les conditions négociées par chaque organisateur peuvent différer. Une information inexacte ? Écrivez-nous, nous la corrigeons.",
};

// ---------------------------------------------------------------- Shotgun EN
const shotgunEn: ComparePageContent = {
  id: "shotgun",
  lang: "en",
  path: "/alternative-shotgun",
  twins: { en: "/alternative-shotgun", fr: "/fr/alternative-shotgun" },
  competitor: "Shotgun",
  updated: UPDATED,
  meta: {
    title: "Shotgun alternative: Yuno vs Shotgun Pro fees & features | Yuno",
    description:
      "Shotgun Pro or Yuno? Organizer commission, buyer fees, payouts, VIP tables, bar and promoters compared, with sources — to pick the right ticketing for your nights.",
    ogAlt: "Yuno vs Shotgun Pro — ticketing comparison for clubs and organizers",
  },
  breadcrumb: { home: "Yuno", current: "Shotgun alternative" },
  hero: {
    kicker: "Yuno vs Shotgun Pro — ticketing, fees and commissions compared",
    title:
      "The Shotgun alternative that also sells your tables, runs your bar and pays your promoters.",
    sub: "Shotgun is a great ticketing platform for the electronic scene. Yuno runs the whole night: tickets and guest list, VIP tables, bar ordering, the club × organizer split and promoter commissions — €0 subscription, 0% commission on your price.",
    primary: "Create my free account",
    secondary: "Talk to the founder",
    updatedLabel: "Public information checked on 24 September 2026",
  },
  tldr: {
    title: "In short",
    items: [
      "Organizer commission: 0% with Yuno; with Shotgun, 10% of sales by default, negotiable by contract (rate not shown on its site).",
      "Buyer fees: Shotgun is cheaper for the buyer (2.75%, min. €0.30) than Yuno (4%, min. €0.99).",
      "Beyond tickets: Yuno sells VIP tables with deposits, takes QR orders at the bar and splits the night between club, organizer and promoters. We found none of these in Shotgun's public help centre.",
      "Audience: the Shotgun app shows your events to 5M+ monthly users (Shotgun's figure). Yuno has its own marketplace too, on the App Store and as a web app, and every buyer joins your base.",
    ],
  },
  table: {
    eyebrow: "Comparison",
    title: "Yuno vs Shotgun, point by point.",
    sub: "What each one publishes — no guessing at what they don't.",
    colCriterion: "Criterion",
    colYuno: "Yuno",
    colOther: "Shotgun Pro",
    rows: [
      {
        criterion: "Subscription",
        yuno: "€0, no commitment.",
        other: "No published subscription.",
        verdict: "tie",
      },
      {
        criterion: "Organizer commission",
        yuno: "0% on your price.",
        other: "10% of sales by default, negotiable by contract; rate not shown on Shotgun's site.",
        verdict: "yuno",
      },
      {
        criterion: "Fees paid by the buyer",
        yuno: "4% (min. €0.99) on tickets; 4% capped at €25 on tables; 3% on drinks.",
        other: "2.75% of the transaction (min. €0.30).",
        verdict: "other",
      },
      {
        criterion: "Payouts",
        yuno: "Stripe Connect: money lands in your own account, under your name, as you sell. Yuno never holds the funds.",
        other:
          "Balance paid out automatically 24 h after the event ends, or by manual transfer before (2–3 business days).",
        verdict: "yuno",
      },
      {
        criterion: "VIP tables & bottle service",
        yuno: "Interactive floor plan, packages, deposit or pay on site, bottle pre-orders, minimum spend tracked live.",
        other:
          "No table-booking module in the public help centre; group tickets can be used for table areas.",
        verdict: "yuno",
      },
      {
        criterion: "Bar",
        yuno: "Order and pay at the bar's QR code; the queue shows on the bartender's screen.",
        other: "Cashless is not provided by Shotgun (buyer help centre).",
        verdict: "yuno",
      },
      {
        criterion: "Promoters",
        yuno: "Personal link per night, sales and entries counted live, commission computed and settled in three timestamped steps.",
        other:
          '"Sales partners" portal with tracking links; revenue goes to the organizer, who pays promoters.',
        verdict: "yuno",
      },
      {
        criterion: "Club × organizer co-hosted nights",
        yuno: "Contract signed in Yuno (per pillar or tiered), closing statement approved by both sides, each paid in their own account.",
        other:
          "Co-hosts get viewer or editor access; all ticketing revenue is paid to the main organizer.",
        verdict: "yuno",
      },
      {
        criterion: "Guest list",
        yuno: "Online sign-ups, quotas, free before a set time, named QR codes, entries credited to the right promoter.",
        other: "Guest list as a checklist in the Shotgun Scan app, or invitations with a QR code.",
        verdict: "yuno",
      },
      {
        criterion: "Customer base & emailing",
        yuno: "Every buyer (ticket, table, drink, guest list) joins your base; 9 automations, 15,000 emails/month included, sales attributed per campaign.",
        other:
          "Contact base grows with each sale; newsletters and push notifications to contacts who opted in.",
        verdict: "tie",
      },
      {
        criterion: "Audience discovery",
        yuno: "Yuno marketplace on the App Store (iOS) and as a web app: the public discovers your nights there, and every buyer joins your base.",
        other:
          "Consumer app (5M+ monthly active users per Shotgun) recommending events by music taste.",
        verdict: "tie",
      },
      {
        criterion: "Resale & waiting list",
        yuno: "Waiting list.",
        other: "Built-in resale and waiting list (15% fee on resold tickets).",
        verdict: "other",
      },
      {
        criterion: "Door",
        yuno: "One scanner for tickets, guest list and tables, name search; every staff member has their own account (bouncer, VIP waiter, bartender…).",
        other: "Shotgun Scan app (offline, validity windows, PIN login) and door sales.",
        verdict: "tie",
      },
    ],
    footnote:
      "Sources: Shotgun's public pages (Pro site, organizer and buyer help centres, T&Cs) and Stripe's case study, checked on 24 September 2026. Terms negotiated by each organizer may differ.",
  },
  about: {
    eyebrow: "Shotgun Pro",
    title: "What is Shotgun Pro?",
    paragraphs: [
      'Shotgun is a ticketing platform founded in Paris in 2014 on the electronic music scene. Shotgun Pro is its organizer workspace ("the ticketing platform that engages your fans"): collectives, clubs and festivals create events, sell tickets and follow their contacts there.',
      "Its strength is the consumer app: 5M+ monthly active users according to Shotgun, discovering events recommended from their music taste. For a collective looking for a crowd, that is a real sales channel.",
      "Yuno starts from a different need: running the whole night in one place. Tickets, but also VIP tables, the bar, the door, promoters and the money split between club and organizer — with 0% commission for you.",
    ],
  },
  choose: {
    eyebrow: "Which one",
    title: "Shotgun or Yuno: it depends on your night.",
    other: {
      title: "Shotgun fits if…",
      items: [
        "You mostly run electronic nights and count on in-app discovery to find a crowd.",
        "You only sell tickets, with no tables or bar to manage.",
        "Official ticket resale matters to your audience.",
      ],
    },
    yuno: {
      title: "Yuno fits if…",
      items: [
        "You're a club, or an organizer who hosts in clubs and shares the night.",
        "You sell VIP tables or bottles and want deposits.",
        "Your promoters need to be tracked and paid without a spreadsheet.",
        "You want to keep 100% of your price, with no commission to negotiate.",
        "You want emails that read the night live when they reach your customers.",
      ],
    },
  },
  switch: {
    eyebrow: "Switching to Yuno",
    title: "Switch without breaking anything.",
    sub: "Each night has one switch per pillar: try Yuno on a single piece of the night.",
    steps: [
      {
        title: "Import your base",
        body: "Your existing customer file is imported into Yuno, deduplicated, with attested consent.",
      },
      {
        title: "Start with one pillar",
        body: "Guest list alone, tables alone or full ticketing: the rest of your tools keep running.",
      },
      {
        title: "First night, with us",
        body: "Account created in two minutes; floor plan, prices, staff and payment account set up with you in about an hour.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Common questions about Shotgun and Yuno",
    items: [
      {
        q: "What is Shotgun Pro?",
        a: "Shotgun Pro is the organizer workspace of Shotgun, a ticketing platform founded in Paris in 2014 on the electronic music scene. Collectives, clubs and festivals use it to create events, sell tickets, follow their contacts and scan entries with the Shotgun Scan app.",
      },
      {
        q: "What are Shotgun's fees?",
        a: "According to Shotgun's help centre, buyers pay a service fee of 2.75% of the transaction, with a €0.30 minimum. The commission charged to organizers isn't shown on its site: 10% of sales by default, negotiable by contract. With Yuno, the organizer commission is 0% and buyers pay 4% (€0.99 minimum).",
      },
      {
        q: "When does Shotgun pay organizers?",
        a: "Per Shotgun's help centre, an event's balance is transferred automatically 24 hours after it ends; a manual transfer is possible before, with 2–3 business days of bank delay. With Yuno, payments run on Stripe Connect and land directly in your own account, under your name, as you sell.",
      },
      {
        q: "Does Shotgun refund service fees if an event is cancelled?",
        a: "No: Shotgun's terms state that service fees are not refunded to customers when an event is cancelled or postponed. Refunding the ticket itself is the organizer's decision.",
      },
      {
        q: "What is the best Shotgun alternative for a nightclub?",
        a: "A club needs more than ticketing: VIP tables with deposits, the bar, door control and a revenue split with guest organizers. Yuno puts all of that in one account, with a €0 subscription and 0% commission on your price.",
      },
      {
        q: "Can I use Shotgun and Yuno at the same time?",
        a: "Yes. Each Yuno night is switched on pillar by pillar: keep Shotgun for tickets and use Yuno for the guest list, VIP tables or the bar, then move over when you're ready.",
      },
      {
        q: "How do I bring my Shotgun customers into Yuno?",
        a: "Import your existing customer file into Yuno: it is deduplicated and each contact keeps its attested consent. From then on, every ticket, table or drink buyer and every guest-list sign-up joins your base automatically.",
      },
    ],
  },
  related: {
    title: "Read next",
    links: [
      { label: "Yuno vs Weezevent, Eventbrite, Xceed and DICE", href: "/#compare" },
      { label: "Yuno pricing: €0 subscription, 0% commission", href: "/#pricing" },
      { label: "Alternativa a Fourvenues (ES)", href: "/es/alternativa-fourvenues" },
      { label: "Alternative à Shotgun (FR)", href: "/fr/alternative-shotgun" },
    ],
  },
  sources: {
    title: "Sources (checked 24 September 2026)",
    items: [
      { label: "Shotgun Pro — organizer site", url: "https://pro.shotgun.live/en" },
      {
        label: "Shotgun — Understanding service fees",
        url: "https://support-pro.shotgun.live/hc/fr/articles/6989212196242-Comprendre-les-frais-de-services",
      },
      {
        label: "Shotgun — Transfer funds from an event",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/12836807849490",
      },
      {
        label: "Shotgun — Sales partners (promoters)",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/13970546627858",
      },
      {
        label: "Shotgun — Co-hosts",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/9666665025042",
      },
      {
        label: "Shotgun — Newsletters",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/9796697570322",
      },
      {
        label: "Shotgun — Shotgun fees (buyer help)",
        url: "https://support.shotgun.live/hc/en-us/articles/16492705310482",
      },
      {
        label: "Shotgun — Cashless (buyer help)",
        url: "https://support.shotgun.live/hc/en-us/articles/16486055540626",
      },
      { label: "Stripe — Shotgun case study", url: "https://stripe.com/customers/shotgun" },
    ],
  },
  disclaimer:
    "Shotgun and Shotgun Pro are trademarks of their respective owners. Yuno is not affiliated with or endorsed by Shotgun. This comparison relies only on public information, checked on the date shown; terms negotiated by each organizer may differ. Spotted an error? Tell us and we'll fix it.",
};

// ------------------------------------------------------------- Fourvenues ES
const fourvenuesEs: ComparePageContent = {
  id: "fourvenues",
  lang: "es",
  path: "/es/alternativa-fourvenues",
  twins: { es: "/es/alternativa-fourvenues" },
  competitor: "Fourvenues",
  updated: UPDATED,
  meta: {
    title: "Alternativa a Fourvenues con marketplace y 0 % de comisión | Yuno",
    description:
      "¿Buscas una alternativa a Fourvenues? Yuno gestiona tu noche y además te trae público: marketplace en App Store y web, comunidad en Instagram. 0 € de suscripción.",
    ogAlt: "Yuno vs Fourvenues — software para discotecas con marketplace y comunidad de público",
  },
  breadcrumb: { home: "Yuno", current: "Alternativa a Fourvenues" },
  hero: {
    kicker: "Yuno vs Fourvenues — software para discotecas, promotoras y RRPP",
    title: "La alternativa a Fourvenues que, además de gestionar tu noche, te trae público.",
    sub: "Fourvenues es un software muy completo para que el equipo de una discoteca venda y gestione sus noches. Yuno hace lo mismo — entradas, listas, reservados, puerta, RRPP — y además construye una comunidad de público alrededor de tus noches: un marketplace en la App Store y en web app, un Instagram que publica con regularidad y cada comprador en tu propia base. Con precios públicos y 0 € de cuota.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    updatedLabel: "Información pública revisada el 24 de septiembre de 2026",
  },
  tldr: {
    title: "En resumen",
    items: [
      "Público: Yuno tiene un marketplace para el público (app en la App Store y web app) y una comunidad en Instagram que da visibilidad a las noches de la plataforma. Fourvenues es un software para el equipo del local: sus apps (Pro, Access y POS) son para el staff, y el público compra por los enlaces del local o de sus RRPP.",
      "Compra: con Yuno, el cliente compra en 30 segundos, sin cuenta, con tarjeta o Apple Pay, recibe su QR en Apple Wallet, y vuelve a encontrar tus noches en el marketplace de Yuno.",
      "Gestión: las dos plataformas cubren entradas, listas, reservados y RRPP. Fourvenues añade un TPV propio; Yuno añade el pedido de copas desde el móvil y el reparto discoteca × promotora firmado en la plataforma.",
      "Precio: Fourvenues no publica sus tarifas (se contratan tras una demo). Yuno sí: 0 € de suscripción, 0 % de comisión sobre tu precio y una tarifa de servicio que paga el cliente.",
    ],
  },
  table: {
    eyebrow: "Comparativa",
    title: "Yuno vs Fourvenues, punto por punto.",
    sub: "Primero lo que vive el público, después lo que gestiona tu equipo. Solo lo que cada uno publica.",
    colCriterion: "Criterio",
    colYuno: "Yuno",
    colOther: "Fourvenues",
    rows: [
      {
        criterion: "App para el público",
        yuno: "App Yuno en la App Store (iOS) y web app: el público descubre las noches y compra sus entradas.",
        other:
          "No encontramos app para el público en las tiendas: sus apps (Pro, Access y POS) son para el equipo del local.",
        verdict: "yuno",
      },
      {
        criterion: "Descubrimiento de tus noches",
        yuno: "Marketplace Yuno (Madrid: 22 discotecas asociadas en la plataforma) además de tu página, tus RRPP y tus redes.",
        other:
          "Webs por local y páginas por ciudad en web.fourvenues.com (p. ej. «Discotecas Madrid»), además de los enlaces de venta del local y de sus RRPP.",
        verdict: "yuno",
      },
      {
        criterion: "Comunidad",
        yuno: "Instagram de Yuno que publica con regularidad las noches de la plataforma para el público.",
        other:
          "Comunicación centrada en el software para profesionales («Nightlife Operating System»).",
        verdict: "yuno",
      },
      {
        criterion: "Cómo compra el cliente",
        yuno: "Desde tu página, el enlace de un RRPP o el marketplace: 30 s, sin cuenta, tarjeta o Apple Pay, QR por email y en Apple Wallet.",
        other:
          "Por el enlace de venta del local o del RRPP (también enviado por WhatsApp o SMS) y la web de cada local.",
        verdict: "tie",
      },
      {
        criterion: "Que el cliente vuelva",
        yuno: "Cada comprador entra en tu base; 9 automatizaciones (nueva noche, carrito abandonado, «te echamos de menos»…), 15.000 emails/mes incluidos.",
        other: "CRM con envíos de email y SMS y segmentación por gasto y asistencia, según su web.",
        verdict: "tie",
      },
      {
        criterion: "Precios publicados",
        yuno: "Sí: todos, en la web.",
        other: "No publicados; se solicita una demo.",
        verdict: "yuno",
      },
      {
        criterion: "Suscripción y comisión para la discoteca o promotora",
        yuno: "0 € de suscripción, 0 % de comisión sobre tu precio.",
        other: "No publicado.",
        verdict: "yuno",
      },
      {
        criterion: "Gastos que paga el comprador",
        yuno: "4 % (mín. 0,99 €) en entradas; 4 % con máximo de 25 € en reservados; 3 % en copas.",
        other: "Gastos de gestión configurables (importe fijo o porcentaje), según su web.",
        verdict: "tie",
      },
      {
        criterion: "Cobros",
        yuno: "Stripe Connect: el dinero llega a tu propia cuenta, a tu nombre, a medida que vendes. Yuno nunca retiene los fondos.",
        other: "No publicado.",
        verdict: "yuno",
      },
      {
        criterion: "Entradas, listas y reservados",
        yuno: "Tramos de precio, lista gratis hasta una hora, QR nominativos; plano interactivo con señal, botellas pre-pedidas y consumo mínimo en directo.",
        other:
          "Venta con precios dinámicos y extras; listas unificadas; mapa interactivo de reservados con fianzas.",
        verdict: "tie",
      },
      {
        criterion: "RRPP",
        yuno: "Enlace personal por noche, ventas y entradas contadas en directo, comisión calculada y liquidada en tres pasos con fecha y hora.",
        other:
          "Comisiones fijas o variables, recuento automático al cierre, cupos y enlaces de venta personales.",
        verdict: "tie",
      },
      {
        criterion: "Reparto discoteca × promotora",
        yuno: "Contrato firmado en Yuno (por pilar o por tramos), cierre aprobado por las dos partes, cada una cobra en su cuenta.",
        other: "No encontrado en sus páginas públicas.",
        verdict: "yuno",
      },
      {
        criterion: "Barra",
        yuno: "El cliente pide y paga su copa con el QR de la barra; el camarero ve la cola. No sustituye a tu TPV.",
        other: "TPV propio (Fourvenues POS) para la venta en barra y taquilla.",
        verdict: "tie",
      },
      {
        criterion: "Trayectoria",
        yuno: "Lanzado en 2026 en Madrid (Amoris y 22 discotecas asociadas) y en París.",
        other:
          "Plataforma consolidada (antes Discocil), 6,5 M€ levantados en 2023 y presencia en EE. UU. desde 2025.",
        verdict: "other",
      },
    ],
    footnote:
      "Fuentes: páginas públicas de Fourvenues (web, webs de venta y centro de ayuda), sus apps en las tiendas, su nota de prensa de octubre de 2025 y prensa económica, revisadas el 24 de septiembre de 2026. Las condiciones que Fourvenues ofrece a cada cliente pueden variar.",
  },
  about: {
    eyebrow: "Dos enfoques",
    title: "Fourvenues gestiona la noche. Yuno también te trae a la gente.",
    paragraphs: [
      "Fourvenues es un software valenciano para discotecas, festivales, promotoras y beach clubs, antes conocido como Discocil. Se presenta como una plataforma todo en uno para el equipo: venta de entradas, TPV, taquilla y reservas con datos en tiempo real, con apps para el staff (Pro, Access y POS). Es un actor consolidado, que levantó 6,5 millones de euros en 2023 y llegó a Estados Unidos en 2025.",
      "Con Fourvenues, el público llega a tus noches por tus propios canales: el enlace de tu local, los de tus RRPP y las webs de venta. Es una herramienta pensada para que el club venda y gestione.",
      "Yuno cubre la misma gestión, pero parte de otra idea: una noche se llena con una comunidad. Por eso Yuno tiene su propio marketplace para el público — una app en la App Store y una web app — y un Instagram que publica con regularidad las noches de la plataforma. El cliente descubre tus noches, compra en 30 segundos y entra en tu base, desde donde le vuelves a escribir para la siguiente.",
    ],
  },
  choose: {
    eyebrow: "Cuál elegir",
    title: "Fourvenues o Yuno: depende de lo que necesitas.",
    other: {
      title: "Fourvenues encaja si…",
      items: [
        "Buscas sobre todo una herramienta de gestión interna, con TPV de barra y taquilla del mismo proveedor.",
        "Tu público ya llega solo por tus RRPP y tus enlaces, y no necesitas más visibilidad.",
        "Gestionas un grupo de locales grande y prefieres un contrato a medida tras una demo.",
      ],
    },
    yuno: {
      title: "Yuno encaja si…",
      items: [
        "Quieres que el público descubra tus noches también fuera de tus canales: marketplace en App Store y web, comunidad en Instagram.",
        "Quieres una compra rápida para tu cliente — sin cuenta, Apple Pay, QR en Apple Wallet — y un marketplace donde vuelve a encontrarte.",
        "Quieres que cada comprador vuelva: base de clientes propia y emails automáticos que leen la noche en directo.",
        "Eres una promotora que trabaja con discotecas y quieres el reparto firmado y aprobado por las dos partes.",
        "Quieres saber lo que pagas antes de hablar con nadie: precios públicos, 0 € de cuota, el dinero directamente en tu cuenta.",
      ],
    },
  },
  switch: {
    eyebrow: "Pasarse a Yuno",
    title: "Cambiar sin romper nada.",
    sub: "Cada noche tiene un interruptor por pilar: puedes probar Yuno en una sola parte de la noche.",
    steps: [
      {
        title: "Importa tu base",
        body: "Tu fichero de clientes se importa en Yuno, deduplicado y con consentimiento acreditado.",
      },
      {
        title: "Empieza por un pilar",
        body: "Solo la lista, solo los reservados o la venta completa: el resto de tus herramientas sigue funcionando.",
      },
      {
        title: "Primera noche acompañada",
        body: "Cuenta creada en dos minutos; plano, precios, staff y cuenta de cobro configurados contigo en una hora aproximadamente.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes sobre Fourvenues y Yuno",
    items: [
      {
        q: "¿Qué diferencia a Yuno de Fourvenues?",
        a: "Las dos plataformas gestionan la noche de una discoteca: entradas, listas, reservados, puerta y RRPP. La diferencia es el público: Yuno tiene su propio marketplace (app en la App Store y web app) y una comunidad en Instagram que da visibilidad a tus noches, mientras que Fourvenues es un software para el equipo del local, cuyo público compra por los enlaces del club y de sus RRPP. Yuno publica además sus precios: 0 € de suscripción y 0 % de comisión.",
      },
      {
        q: "¿Fourvenues tiene app para el público?",
        a: "En las tiendas de apps, las aplicaciones de Fourvenues (Fourvenues Pro, Access y POS) están pensadas para el equipo del local. El público compra a través de los enlaces de venta del local o de sus RRPP y de las webs de venta en web.fourvenues.com. Yuno tiene una app para el público en la App Store y una web app donde se descubren y se compran las noches.",
      },
      {
        q: "¿Cuánto cuesta Fourvenues?",
        a: "Fourvenues no publica sus precios en su web (consultado el 24 de septiembre de 2026): hay que solicitar una demo al equipo comercial. Yuno publica los suyos: 0 € de suscripción, 0 % de comisión sobre tu precio y una tarifa de servicio que paga el cliente (4 % en entradas, mínimo 0,99 €).",
      },
      {
        q: "¿Qué comisión cobra Fourvenues por entrada?",
        a: "La comisión de Fourvenues no es pública. Su web indica que los gastos de gestión que paga el comprador son configurables, como importe fijo o porcentaje. En Yuno, la discoteca o promotora no paga comisión y el comprador paga un 4 % con un mínimo de 0,99 €.",
      },
      {
        q: "¿Qué es Discocil?",
        a: "Discocil era el nombre anterior de Fourvenues, empresa de Valencia que cambió de marca en 2021 para crecer fuera de España.",
      },
      {
        q: "¿Cuál es la mejor alternativa a Fourvenues para una promotora?",
        a: "Una promotora que trabaja con varias discotecas necesita público, además de herramientas: vender entradas, listas y reservados, pagar a sus RRPP, repartir la noche con cada club y darse a conocer. Yuno lo hace en una sola cuenta, con un marketplace para el público, el contrato discoteca × promotora firmado en la plataforma, 0 € de suscripción y precios públicos.",
      },
      {
        q: "¿Puedo usar Yuno y Fourvenues a la vez?",
        a: "Sí. Cada noche de Yuno se activa por pilares: puedes empezar solo con la lista o solo con los reservados, publicar tus noches en el marketplace de Yuno y mantener el resto de tus herramientas hasta que decidas cambiar.",
      },
    ],
  },
  related: {
    title: "Sigue leyendo",
    links: [
      { label: "El marketplace de Yuno (web app)", href: "https://yunoapp.eu" },
      { label: "Yuno en Instagram", href: "https://www.instagram.com/yunoapp.eu/" },
      { label: "Precios de Yuno: 0 € de suscripción, 0 % de comisión", href: "/es#pricing" },
      { label: "Alternativa a Shotgun (EN)", href: "/alternative-shotgun" },
    ],
  },
  sources: {
    title: "Fuentes (consultadas el 24 de septiembre de 2026)",
    items: [
      {
        label: "Fourvenues — Software de gestión de discotecas",
        url: "https://www.fourvenues.com/es/software-para-discotecas",
      },
      {
        label: "Fourvenues — VIP booking software",
        url: "https://www.fourvenues.com/en/vip-booking-software",
      },
      {
        label: "Fourvenues — Promoters management",
        url: "https://www.fourvenues.com/en/promoters-management",
      },
      {
        label: "Fourvenues — POS system software",
        url: "https://www.fourvenues.com/en/pos-system-software",
      },
      {
        label: "Fourvenues — Free CRM software",
        url: "https://www.fourvenues.com/en/free-crm-software",
      },
      {
        label: "Fourvenues — Web de venta «Discotecas Madrid»",
        url: "https://web.fourvenues.com/en/discotecas-madrid/events",
      },
      {
        label: "Fourvenues — Nota de prensa, llegada a EE. UU. (oct. 2025)",
        url: "https://www.prnewswire.com/news-releases/fourvenues-enters-the-us-to-redefine-the-100b-nightlife-industry-302598917.html",
      },
      {
        label: "El Español — Ronda de 6,5 M€ (mayo 2023)",
        url: "https://www.elespanol.com/invertia/empresas/20230517/fourvenues-herramienta-nocturno-impulsada-juan-roig-inversion/764423559_0.html",
      },
      {
        label: "Nevent — Fourvenues: opiniones y alternativas",
        url: "https://nevent.ai/es/plataformas-venta-entradas/fourvenues/",
      },
    ],
  },
  disclaimer:
    "Fourvenues es una marca de su propietario. Yuno no está afiliado a Fourvenues. Esta comparativa se basa únicamente en información pública, revisada en la fecha indicada; las condiciones que Fourvenues ofrece a cada cliente pueden variar. ¿Algún dato inexacto? Escríbenos y lo corregimos.",
};

export const COMPARE_PAGES: ComparePageContent[] = [shotgunEn, shotgunFr, fourvenuesEs];

export function comparePage(path: string): ComparePageContent {
  const page = COMPARE_PAGES.find((p) => p.path === path);
  if (!page) throw new Error(`No comparison page for ${path}`);
  return page;
}

export const COMPARE_PATHS = new Set(COMPARE_PAGES.map((p) => p.path));
