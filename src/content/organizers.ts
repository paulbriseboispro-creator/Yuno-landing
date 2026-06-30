// Orga (event organizer) landing (/organizers). Bilingual, indexed. Rebuilt on
// the shared RoleLandingContent shape — the same focused skeleton as /clubs and
// /bde. Copy respects Yuno's real model: 0 cost to the organizer (only Stripe's
// fee), service fee paid by the customer, revenue split settles two days after
// the event (J+2), promoter commissions are TRACKED (promoters are not paid out
// via Stripe). Pre-launch: no traction claims.
//
// NOTE: the page currently reuses the club dashboards as placeholder imagery for
// the parallax hero + 3D marquee. Swap to the real organizer screens when Paul
// provides them (see src/pages/organizers.tsx).
import { useLocale, type Locale } from "@/i18n/locale";
import type { RoleLandingContent } from "@/content/role-landing";

// A live Yuno event page used as the showcase demo.
const DEMO_EVENT =
  "https://yunoapp.eu/club/2462e2f2-661c-491e-a5a9-9330f1d47503/event/e5500057-11d6-4469-ad16-d3f0e7e85501";

const en: RoleLandingContent = {
  meta: {
    title: "Yuno for Organizers — Ticketing without the markup",
    description:
      "Run events with the lowest ticketing fees in Europe and split revenue with your host venue automatically through Stripe Connect — settled two days after the event.",
    ogTitle: "Yuno for Organizers",
    ogDescription: "Low-fee ticketing, automated revenue splits, and your own check-in app.",
  },
  nav: [
    { label: "Pricing", href: "#offre" },
    { label: "On the door", href: "#audience" },
    { label: "Yuno Collab", href: "#collab" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "For event organizers",
    titleLead: "Ticketing without the ",
    titleEmphasis: "markup",
    titleRest: ".",
    subtitle:
      "Yuno is the missing layer between you, your host venue and the crowd you bring. It costs you nothing — only Stripe's processing fee — with automatic splits and the door app your team actually wants to use.",
    primaryCta: "Create my first event",
    secondaryCta: "See the price",
    note: "0 € to you · Only Stripe's fee · No commitment",
  },
  quickPoints: [
    {
      icon: "gift",
      title: "0 € to you",
      body: "No subscription, no Yuno commission. You only pay Stripe's processing fee on each sale.",
    },
    {
      icon: "card",
      title: "The lowest fees",
      body: "4% per ticket, always paid by the customer — half the friction of the 8–18% legacy platforms charge.",
    },
    {
      icon: "scan",
      title: "Your own door app",
      body: "Hand each scanner a PIN, their phone becomes a scanner, and the guest list syncs live across every device.",
    },
  ],
  free: {
    tag: "Pricing",
    title: "4% per ticket. €0.99 floor. No monthly fee.",
    body: "Stop bleeding 12–18% to legacy ticketing platforms. With Yuno the service fee is 4% per ticket (€0.99 minimum) — always paid by the customer at checkout, never by you. You only ever pay Stripe's processing fee.",
    bullets: [
      "0% commission to Yuno — only Stripe's processing fee",
      "Service fees always paid by the customer",
      "Early Bird / Regular / Late tiers with quotas",
      "Fees shown to the buyer before payment — no surprises",
    ],
    caption:
      "The 4% service fee (€0.99 floor) is added at checkout and paid by the customer, not deducted from your revenue.",
  },
  audience: {
    tag: "On the door",
    title: "Your own check-in app, your own crew.",
    body: "Recruit scanners for the night and hand each one a temporary PIN. Their phone becomes a scanner. The guest list is synced live across every device, so two doors never let the same ticket in twice.",
    bullets: [
      "PIN-based door staff onboarding",
      "Live guest-list sync across all scanners",
      "PWA scanner — works on any smartphone, no app download",
      "Recruit scanners per event, revoke access when it ends",
    ],
  },
  showcase: {
    tag: "In the app",
    title: "The ticket page your guests actually see.",
    body: "Not a clunky checkout: an event page built to make people want their ticket. Tiers, guest list and tables, all on one screen.",
    demo: { label: "See a live event", href: DEMO_EVENT },
    imageAlt: "A real Yuno event ticket page on a phone: tiers, guest list and tables.",
    features: [
      {
        title: "Tiered tickets with quotas",
        body: "Early Bird, Regular, Late — each with its own price and cap, sold out automatically.",
      },
      {
        title: "Built-in guest list",
        body: "Free entry until the time you set, with remaining spots shown live.",
      },
      {
        title: "VIP tables & carrés (optional)",
        body: "Turn on tables with a minimum spend and a floor plan when the event calls for it.",
      },
    ],
  },
  premium: {
    tag: "Built for events",
    title: "Everything the night needs, none of the admin.",
    body: "From the first ticket to the door, Yuno runs the event. Your guests get a page worth buying from, and your team runs the night from their phones.",
    bullets: [
      "Co-branded event page in your colors",
      "Tiered tickets (Early Bird, Late) with quotas",
      "Promoter attribution & live leaderboard",
      "Scarcity tools to drive ticket urgency",
      "Live stats: sales, entries, revenue at a glance",
      "Multi-scanner check-in with PIN login",
    ],
  },
  payout: {
    tag: "The split",
    title: "Money settles two days after the event.",
    body: "Every ticket sale is broken into its agreed parts. Two days after the event the funds settle, fee-free — the short delay leaves room for refunds and disputes. You see your share, the venue sees theirs, and the promoter who brought the sale sees their commission tracked to the cent. No month-end reconciliation, no awkward DMs.",
  },
  collab: {
    tag: "Yuno Collab",
    title: "Host an event, unlock the full stack.",
    body: "Organizing in a venue that's not on Yuno? Propose them Yuno Collab. The venue hosts your event and gets Yuno Pro dashboards for that night — automatically, at no cost to them. You get a co-branded event page and check-in synced with their door. Everyone wins.",
    bullets: [
      "Bring your event to any venue",
      "The venue gets Yuno Pro dashboards for that night, free",
      "Co-branded event page",
      "Check-in automatically synced with their door",
    ],
  },
  comparison: {
    eyebrow: "Yuno vs legacy ticketing",
    title: "The same event, half the fee — and the split handled for you.",
    colA: "Legacy platforms",
    colB: "Yuno",
    rows: [
      { label: "Fee per ticket", a: "8–18%", b: "4%", highlight: true },
      { label: "Who pays the fee", a: "The customer (high)", b: "The customer (half as much)" },
      { label: "Subscription", a: "Varies", b: "0 €" },
      {
        label: "Split with the venue",
        a: "Manual / month-end",
        b: "Automatic, 2 days after",
        highlight: true,
      },
      { label: "Check-in app", a: "Basic", b: "Multi-scanner PWA, PIN" },
      { label: "Promoter commissions", a: "By hand", b: "Tracked automatically" },
      {
        label: "Cost to you",
        a: "Margin on tickets",
        b: "0 € (only Stripe's fee)",
        highlight: true,
      },
    ],
    footer:
      "An event of 200 tickets at €20: a legacy 8% takes €320 in fees; Yuno's 4% takes €160. That's €160 staying in the room, per event. Multiply by your season.",
  },
  marquee: {
    eyebrow: "The Yuno back-office",
    title: "Your whole event runs from a single screen.",
    sub: "Sales, tickets, entries, revenue, splits — every dashboard tracked live, from the first ticket to the door.",
  },
  steps: {
    tag: "How it works",
    title: "From idea to door, in three steps.",
    items: [
      {
        n: "1",
        title: "Create your event",
        body: "Build your page in minutes: visual, tiered tickets, tables. Agree the split with your host venue.",
      },
      {
        n: "2",
        title: "Share your link",
        body: "In your story, your Insta bio, by QR on flyers. Your crowd grabs their ticket in two taps.",
      },
      {
        n: "3",
        title: "Scan at the door",
        body: "Your scanners sign in with a PIN. The guest list updates live across every phone.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "The questions organizers ask us.",
    items: [
      {
        q: "Is it really free for me?",
        a: "Yes. No subscription and no Yuno commission — you only pay Stripe's processing fee on each sale. The 4% service fee is added at checkout and paid by the customer, never deducted from your revenue.",
      },
      {
        q: "So who pays the fees?",
        a: "The customer, at checkout: 4% per ticket (€0.99 minimum), shown before payment. It's roughly half what legacy platforms charge, so fewer people drop off at the checkout.",
      },
      {
        q: "How and when am I paid?",
        a: "Through Stripe Connect. Two days after the event the funds settle into each party's Stripe account, fee-free — the short delay covers any refund or dispute. You see your share, the venue sees theirs, every transaction traced to the cent.",
      },
      {
        q: "What about the venue hosting me?",
        a: "Propose them Yuno Collab. They host your event and get Yuno Pro dashboards for that night automatically, at no cost, with a co-branded page and check-in synced to their door.",
      },
      {
        q: "Do I need hardware for the door?",
        a: "No. The scanner is a PWA that runs on any smartphone — no app download. Each scanner signs in with a temporary PIN and the guest list syncs live.",
      },
      {
        q: "And my promoters?",
        a: "Every promoter's commission is tracked automatically to the cent and shown on a live leaderboard, so attribution is never a spreadsheet argument.",
      },
    ],
  },
  cta: {
    title: "Ready to create your first event?",
    body: "Set up your first event for free. We'll help you get it online and agree the split with your venue.",
    button: "Create my first event",
    note: "0 € to you · Only Stripe's fee · No commitment",
  },
};

export type OrganizersContent = RoleLandingContent;

const fr: RoleLandingContent = {
  meta: {
    title: "Yuno pour les organisateurs — La billetterie sans la commission",
    description:
      "Organisez vos événements avec les frais de billetterie les plus bas d'Europe et répartissez automatiquement les revenus avec votre établissement hôte via Stripe Connect — réglés deux jours après l'événement.",
    ogTitle: "Yuno pour les organisateurs",
    ogDescription:
      "Billetterie à frais réduits, répartition automatique des revenus et votre propre application de contrôle d'accès.",
  },
  nav: [
    { label: "Tarifs", href: "#offre" },
    { label: "À l'entrée", href: "#audience" },
    { label: "Yuno Collab", href: "#collab" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    badge: "Pour les organisateurs d'événements",
    titleLead: "La billetterie sans la ",
    titleEmphasis: "commission",
    titleRest: ".",
    subtitle:
      "Yuno est la couche qui manquait entre vous, votre établissement hôte et le public que vous amenez. Il ne vous coûte rien — seulement les frais de traitement Stripe — avec des répartitions automatiques et l'application d'accès que votre équipe a vraiment envie d'utiliser.",
    primaryCta: "Créer mon premier événement",
    secondaryCta: "Voir le prix",
    note: "0 € pour vous · Frais Stripe uniquement · Sans engagement",
  },
  quickPoints: [
    {
      icon: "gift",
      title: "0 € pour vous",
      body: "Aucun abonnement, aucune commission Yuno. Vous ne payez que les frais de traitement Stripe sur chaque vente.",
    },
    {
      icon: "card",
      title: "Les frais les plus bas",
      body: "4 % par billet, toujours payés par le client — deux fois moins de friction que les 8 à 18 % des plateformes classiques.",
    },
    {
      icon: "scan",
      title: "Votre propre app d'accès",
      body: "Donnez un PIN à chaque scanneur, son téléphone devient un scanneur, et la liste d'invités se synchronise en direct sur tous les appareils.",
    },
  ],
  free: {
    tag: "Le prix",
    title: "4 % par billet. Plancher de 0,99 €. Sans frais mensuels.",
    body: "Arrêtez de perdre 12 à 18 % au profit des plateformes de billetterie classiques. Avec Yuno, les frais de service sont de 4 % par billet (0,99 € minimum) — toujours payés par le client au paiement, jamais par vous. Vous ne réglez que les frais de traitement Stripe.",
    bullets: [
      "0 % de commission pour Yuno — seulement les frais de traitement Stripe",
      "Les frais de service toujours payés par le client",
      "Paliers Early Bird / Regular / Late avec quotas",
      "Frais affichés à l'acheteur avant le paiement — aucune surprise",
    ],
    caption:
      "Les frais de service de 4 % (plancher 0,99 €) sont ajoutés au paiement et payés par le client, jamais déduits de vos revenus.",
  },
  audience: {
    tag: "À l'entrée",
    title: "Votre propre application d'accès, votre propre équipe.",
    body: "Recrutez des scanneurs pour la soirée et remettez à chacun un code PIN temporaire. Leur téléphone devient un scanneur. La liste des invités est synchronisée en direct sur tous les appareils, pour que deux entrées ne laissent jamais passer le même billet.",
    bullets: [
      "Intégration du staff d'entrée par code PIN",
      "Synchro en direct de la liste d'invités sur tous les scanneurs",
      "Scanneur en PWA — sur n'importe quel smartphone, sans téléchargement",
      "Recrutez des scanneurs par événement, révoquez l'accès à la fin",
    ],
  },
  showcase: {
    tag: "Dans l'app",
    title: "La page de billetterie que vos invités voient vraiment.",
    body: "Pas un paiement austère : une page d'événement pensée pour donner envie de prendre sa place. Paliers, liste d'invités et tables, sur une seule page.",
    demo: { label: "Voir un événement en ligne", href: DEMO_EVENT },
    imageAlt:
      "Une vraie page de billetterie Yuno sur un téléphone : paliers, liste d'invités et tables.",
    features: [
      {
        title: "Billets à paliers avec quotas",
        body: "Early Bird, Normal, Dernière minute — chacun avec son prix et son quota, épuisé automatiquement.",
      },
      {
        title: "Liste d'invités intégrée",
        body: "Entrée gratuite jusqu'à l'heure que vous fixez, avec les places restantes affichées en direct.",
      },
      {
        title: "Tables VIP & carrés (en option)",
        body: "Activez les tables avec minimum de consommation et plan de salle quand l'événement le mérite.",
      },
    ],
  },
  premium: {
    tag: "Pensé pour vos événements",
    title: "Tout ce qu'il faut pour la soirée, rien de l'administratif.",
    body: "Du premier billet jusqu'à la porte, Yuno gère l'événement. Vos invités ont une page qui donne envie d'acheter, et votre équipe pilote la nuit depuis son téléphone.",
    bullets: [
      "Page d'événement co-brandée à vos couleurs",
      "Billets à paliers (Early Bird, Dernière minute) avec quotas",
      "Attribution promoteurs & classement en direct",
      "Outils de rareté pour créer l'urgence sur les billets",
      "Statistiques en direct : ventes, entrées, recettes en un coup d'œil",
      "Contrôle d'accès multi-scanneurs avec connexion par PIN",
    ],
  },
  payout: {
    tag: "La répartition",
    title: "L'argent est réglé deux jours après l'événement.",
    body: "Chaque vente de billet est répartie selon les parts convenues. Deux jours après l'événement, les fonds sont réglés, sans frais — ce court délai laisse le temps de gérer remboursements et litiges. Vous voyez votre part, l'établissement voit la sienne, et le promoteur qui a apporté la vente voit sa commission suivie au centime près. Sans réconciliation en fin de mois, sans message gênant.",
  },
  collab: {
    tag: "Yuno Collab",
    title: "Organisez un événement, débloquez toute la plateforme.",
    body: "Vous organisez dans un établissement qui n'est pas sur Yuno ? Proposez-lui Yuno Collab. L'établissement accueille votre événement et obtient les tableaux de bord Yuno Pro pour cette soirée — automatiquement, sans frais pour lui. Vous obtenez une page d'événement co-brandée et un contrôle d'accès synchronisé avec son entrée. Tout le monde y gagne.",
    bullets: [
      "Amenez votre événement dans n'importe quel établissement",
      "L'établissement obtient les tableaux de bord Yuno Pro pour la soirée, gratuitement",
      "Page d'événement co-brandée",
      "Contrôle d'accès synchronisé automatiquement avec son entrée",
    ],
  },
  comparison: {
    eyebrow: "Yuno vs la billetterie classique",
    title: "Le même événement, deux fois moins de frais — et la répartition gérée pour vous.",
    colA: "Plateformes classiques",
    colB: "Yuno",
    rows: [
      { label: "Frais par billet", a: "8 à 18 %", b: "4 %", highlight: true },
      { label: "Qui paie les frais", a: "Le client (élevés)", b: "Le client (moitié moins)" },
      { label: "Abonnement", a: "Variable", b: "0 €" },
      {
        label: "Répartition avec le lieu",
        a: "Manuelle / fin de mois",
        b: "Automatique, 2 jours après",
        highlight: true,
      },
      { label: "App de contrôle d'accès", a: "Basique", b: "PWA multi-scanneurs, PIN" },
      { label: "Commissions promoteurs", a: "À la main", b: "Suivies automatiquement" },
      {
        label: "Coût pour vous",
        a: "Marge sur les billets",
        b: "0 € (seulement les frais Stripe)",
        highlight: true,
      },
    ],
    footer:
      "Un événement de 200 billets à 20 € : une plateforme à 8 % prend 320 € de frais ; les 4 % de Yuno prennent 160 €. C'est 160 € qui restent dans la salle, par événement. Multipliez par votre saison.",
  },
  marquee: {
    eyebrow: "Le back-office Yuno",
    title: "Tout votre événement se pilote depuis un seul écran.",
    sub: "Ventes, billets, entrées, recettes, répartitions : chaque tableau de bord suivi en direct, du premier billet jusqu'à la porte.",
  },
  steps: {
    tag: "Comment ça marche",
    title: "De l'idée à la porte, en trois étapes.",
    items: [
      {
        n: "1",
        title: "Créez votre événement",
        body: "Montez votre page en quelques minutes : visuel, billets à paliers, tables. Convenez de la répartition avec votre établissement hôte.",
      },
      {
        n: "2",
        title: "Partagez votre lien",
        body: "En story, en bio Insta, par QR sur les flyers. Votre public prend sa place en deux clics.",
      },
      {
        n: "3",
        title: "Scannez à l'entrée",
        body: "Vos scanneurs se connectent avec un PIN. La liste se met à jour en direct sur tous les téléphones.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions que nous posent les organisateurs.",
    items: [
      {
        q: "C'est vraiment gratuit pour moi ?",
        a: "Oui. Aucun abonnement et aucune commission Yuno — vous ne payez que les frais de traitement Stripe sur chaque vente. Les frais de service de 4 % sont ajoutés au paiement et payés par le client, jamais déduits de vos revenus.",
      },
      {
        q: "Alors, qui paie les frais ?",
        a: "Le client, au moment du paiement : 4 % par billet (0,99 € minimum), affichés avant le paiement. C'est environ la moitié de ce que prennent les plateformes classiques, donc moins de monde abandonne au paiement.",
      },
      {
        q: "Comment et quand suis-je payé ?",
        a: "Via Stripe Connect. Deux jours après l'événement, les fonds arrivent sur le compte Stripe de chaque partie, sans frais — ce court délai couvre un éventuel remboursement ou litige. Vous voyez votre part, l'établissement voit la sienne, chaque transaction tracée au centime.",
      },
      {
        q: "Et l'établissement qui m'accueille ?",
        a: "Proposez-lui Yuno Collab. Il accueille votre événement et obtient les tableaux de bord Yuno Pro pour la soirée, automatiquement et sans frais, avec une page co-brandée et un contrôle d'accès synchronisé à son entrée.",
      },
      {
        q: "Faut-il du matériel pour l'entrée ?",
        a: "Non. Le scanneur est une PWA qui tourne sur n'importe quel smartphone — sans téléchargement. Chaque scanneur se connecte avec un PIN temporaire et la liste d'invités se synchronise en direct.",
      },
      {
        q: "Et mes promoteurs ?",
        a: "La commission de chaque promoteur est suivie automatiquement au centime près et affichée sur un classement en direct, pour que l'attribution ne soit jamais une dispute de tableur.",
      },
    ],
  },
  cta: {
    title: "Prêt à créer votre premier événement ?",
    body: "Créez votre premier événement gratuitement. On vous accompagne pour le mettre en ligne et convenir de la répartition avec votre établissement.",
    button: "Créer mon premier événement",
    note: "0 € pour vous · Frais Stripe uniquement · Sans engagement",
  },
};

export const organizersContent: Record<Locale, RoleLandingContent> = { en, fr };

export function useOrganizers(): RoleLandingContent {
  return organizersContent[useLocale()];
}
