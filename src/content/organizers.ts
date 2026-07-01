// Orga (event organizer) landing (/organizers). Bilingual, indexed. Rebuilt on
// the shared RoleLandingContent shape — the same focused skeleton as /clubs and
// /bde. Copy respects Yuno's real model: 0 cost to the organizer (only Stripe's
// fee), service fee paid by the customer, revenue split settles two days after
// the event (J+2), promoter commissions are TRACKED (promoters are not paid out
// via Stripe). Pre-launch: no traction claims.
//
// Imagery: the parallax hero, 3D marquee and per-pain proof blocks run on the
// real organizer captures in src/assets/organizers/ (see src/pages/organizers.tsx).
import { useLocale, type Locale } from "@/i18n/locale";
import type { RoleLandingContent } from "@/content/role-landing";

// The live Yuno event page the showcase screens are captured from.
const DEMO_EVENT =
  "https://yunoapp.eu/club/womber/event/e4436790-c3db-4de6-a9d5-f1bfd8d2f3e7/billets";

const en: RoleLandingContent = {
  meta: {
    title: "Yuno for Organizers — Ticketing without the markup",
    description:
      "Run events with low ticketing fees and split revenue with your host venue automatically through Stripe Connect — settled two days after the event.",
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
    titleLead: "Your full event back-office: ",
    titleEmphasis: "know if tonight fills, and what you actually net",
    titleRest: ".",
    subtitle:
      "Without a fixed venue, no screen tells you whether tonight will fill or what you really keep after fees, and you still split with the host by hand. Yuno gives you a Mission Control back-office, your own Stripe payout, and an automatic split with the venue.",
    primaryCta: "Book a demo",
    secondaryCta: "See the price",
    note: "Core free · 4% per ticket (€0.99 min), paid by the buyer · You only pay Stripe",
  },
  quickPoints: [
    {
      icon: "chart",
      title: "Mission Control",
      body: "Tonight at a glance: tickets sold, gross and net revenue, check-in rate, VIP tables — plus 30-day KPIs and your top events.",
    },
    {
      icon: "card",
      title: "Your own Stripe payout",
      body: "Connect your own Stripe. The money lands in your account, then your bank — Yuno never holds your funds. 4% per ticket (€0.99 min), paid by the buyer.",
    },
    {
      icon: "users",
      title: "Auto-split with the venue",
      body: "Co-produce in a venue and the revenue share is a contract applied at every sale through Stripe Connect — no cash, no Excel.",
    },
  ],
  free: {
    tag: "Pricing",
    title: "Core is free. 4% per ticket, paid by the buyer.",
    body: "No mandatory subscription to sell. Yuno's fee is a flat 4% per ticket and VIP table (€0.99 minimum), 3% on drinks, added at checkout and paid by the buyer, so it isn't taken out of your revenue. You only ever pay Stripe's processing fee.",
    bullets: [
      "Core plan free — no subscription required to sell",
      "Flat 4% tickets & tables, 3% drinks (€0.99 min), paid by the buyer",
      "Early Bird / Regular / Late tiers with quotas",
      "Fees shown to the buyer before payment — no surprises",
    ],
    caption:
      "The fee is added at checkout and paid by the buyer, not deducted from your revenue. You only pay Stripe's processing fee.",
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
    body: "Not a clunky checkout: an event page built to make people want in. Tiered tickets and the guest list on one screen, VIP tables and the floor plan on the next.",
    demo: { label: "See a live event", href: DEMO_EVENT },
    imageAlt: "Two real Yuno event screens on a phone: tiered tickets with the guest list, and VIP tables with the floor plan.",
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
    title: "The same event, a flat fee — and the split handled for you.",
    colA: "Legacy platforms",
    colB: "Yuno",
    rows: [
      { label: "Fee per ticket", a: "8–18%", b: "4% (€0.99 min)", highlight: true },
      { label: "Who pays the fee", a: "The customer", b: "The customer (flat 4%)" },
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
        a: "The customer, at checkout: 4% per ticket (€0.99 minimum), shown before payment. It's often lower than what legacy platforms charge, so fewer people drop off at the checkout.",
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
    title: "Ready to run your next event on Yuno?",
    body: "Book a demo and we'll help you set up your back-office and agree the split with your venue.",
    button: "Book a demo",
    note: "Core free · 4% per ticket (€0.99 min), paid by the buyer · No commitment",
  },
  defaultPainId: "orga",
  pains: [
    {
      id: "orga",
      chipLabel: "Back-office",
      hero: {
        badge: "Organizer back-office",
        titleLead: "Your full event back-office: ",
        titleEmphasis: "know if tonight fills, and what you actually net",
        titleRest: ".",
        subtitle:
          "Without a fixed venue, no screen tells you whether tonight will fill or what you really keep after fees. Yuno gives you a Mission Control back-office and your own Stripe payout.",
      },
      focus: {
        tag: "Mission Control",
        title: "Tonight's event, gross and net, on one screen.",
        body: "Mission Control shows tonight's event — tickets sold, gross and net revenue, check-in rate, VIP tables — plus 30-day KPIs, a revenue graph and your top events. Self-serve payment: connect your own Stripe, the money lands in your account then your bank. Yuno never holds the funds (4%, €0.99 min).",
        bullets: [
          "Tonight's event card: sold, gross and net, check-in, VIP tables",
          "30-day KPIs, revenue graph, top events",
          "Your own Stripe Connect — Yuno never holds your funds",
        ],
        caveat: "'Net' falls back to an estimate when distributions are missing; conversion-rate analytics are not live yet.",
      },
      contactLabel: "The organizer Mission Control back-office",
    },
    {
      id: "prix",
      chipLabel: "Free for you",
      hero: {
        badge: "What it costs you",
        titleLead: "Other platforms bill you. ",
        titleEmphasis: "Yuno costs you nothing but Stripe",
        titleRest: ".",
        subtitle:
          "Ticketing tools charge you a subscription or carve a margin out of every ticket. Yuno charges the organizer €0 — no subscription, no Yuno commission on your revenue. The only thing you pay is Stripe's processing fee.",
      },
      focus: {
        tag: "Your cost: 0 €",
        title: "Free for you. The 4% rides on the buyer, not your margin.",
        body: "No subscription to start selling and no Yuno commission taken from your revenue. The 4% service fee (€0.99 min, 3% on drinks) is added at checkout and paid by the buyer, so it never touches your share. On a co-produced night the split and the fees are shown to the cent. The only cost that reaches you is Stripe's standard processing fee — the same one you'd pay on any platform.",
        bullets: [
          "No subscription, no Yuno commission on your revenue",
          "The 4% (€0.99 min) is paid by the buyer, never deducted from you",
          "Legacy platforms take 8–18% or bill a subscription; Yuno charges you €0",
        ],
        caveat: "Stripe's processing fee is billed directly by Stripe at its standard rate, not set by Yuno.",
      },
      contactLabel: "How Yuno stays free for organizers",
    },
    {
      id: "co-soiree",
      chipLabel: "Split with the venue",
      hero: {
        badge: "Co-hosted nights",
        titleLead: "The co-produced night, ",
        titleEmphasis: "split by contract and paid automatically",
        titleRest: ".",
        subtitle:
          "You split the takings with the host venue by hand: cash, Excel, informal transfers, zero traceability, arguments at settlement. Yuno makes the split a contract applied to every sale.",
      },
      focus: {
        tag: "Auto-split with the venue",
        title: "Agree the split once. It applies to every sale.",
        body: "Set the revenue share with your host venue and it's attached to the event before tickets sell. The money splits venue ↔ organizer at each sale through Stripe Connect, by item type. The club stays merchant of record (alcohol licence); you see your share to the cent.",
        bullets: [
          "Revenue-share contract with the host venue",
          "Automatic split venue ↔ organizer via Stripe Connect, by item",
          "Collaboration proposals inbox — no cash, no Excel",
        ],
      },
      contactLabel: "Auto-split with a host venue (co-hosted night)",
    },
    {
      id: "promo",
      chipLabel: "Promoters",
      hero: {
        badge: "Promoters",
        titleLead: "Finally know which promoter ",
        titleEmphasis: "actually brought the crowd",
        titleRest: " — and settle in one click.",
        subtitle:
          "Promoter commissions are cash and a spreadsheet, with arguments over who sold what. Yuno tracks it automatically and settles in one click.",
      },
      focus: {
        tag: "Promoter attribution",
        title: "Tracked clicks to sales, settled without a dispute.",
        body: "Each promoter gets a tracked Linktree; clicks to conversions to sales are attributed automatically, on tickets and tables, with promoter ROI (revenue per €1 of commission) and a leaderboard. Settle in one click with a club-managed cycle pending → approved → paid to the promoter's IBAN.",
        bullets: [
          "Tracked promoter links, clicks → conversions → sales",
          "Promoter ROI and a live leaderboard",
          "One-click settle: pending → approved → paid to IBAN",
        ],
        caveat: "Promoter payout is a club-managed settlement to IBAN, not a per-sale Stripe split. Promoters are not affiliates.",
      },
      contactLabel: "Promoter attribution and one-click settlement",
    },
    {
      id: "billetterie",
      chipLabel: "Ticketing",
      hero: {
        badge: "Ticketing",
        titleLead: "Publish, price in rounds, ",
        titleEmphasis: "cash in before the night",
        titleRest: ".",
        subtitle:
          "Ticketing is a third-party site plus a spreadsheet plus a notebook at the door, and the money comes in too late. Yuno puts ticketing and the door in one place.",
      },
      focus: {
        tag: "Ticketing & door",
        title: "Rounds, quotas, QR entry — the money in before the night.",
        body: "Create your event with multi-round pricing (Early Bird to standard), per-round quotas and a global capacity, drink-included tickets, an entry deadline, recurring events and a guest list. Entry is by QR, scanned by your own crew on their phones. The cash is in before the night.",
        bullets: [
          "Multi-round pricing, quotas, global capacity",
          "Drink-included tickets, recurring events, guest list",
          "QR entry, multi-scanner PIN check-in on any phone",
        ],
      },
      contactLabel: "Event ticketing and door check-in",
    },
    {
      id: "data",
      chipLabel: "Analytics",
      hero: {
        badge: "Analytics",
        titleLead: "Know what actually sells — ",
        titleEmphasis: "by event, by hour, by ticket",
        titleRest: ".",
        subtitle:
          "Gross revenue, average order value, unique guests, and the exact hours your tickets move. Across everything or per event, exportable in one click.",
      },
      focus: {
        tag: "Analytics",
        title: "Detailed performance across all your events.",
        body: "Gross revenue, total orders, average order value and unique guests, each with its trend. A gross-revenue-by-hour distribution shows when your crowd actually buys, so you time your pushes. Switch between global and per-event, and export the data.",
        bullets: [
          "Revenue, orders, avg order value, unique guests with trends",
          "Gross-revenue-by-hour distribution",
          "Global or per-event view, one-click export",
        ],
      },
      contactLabel: "Event analytics and exports",
    },
    {
      id: "fidelite",
      chipLabel: "Customers & email",
      hero: {
        badge: "CRM & email",
        titleLead: "Your crowd is a mailing list ",
        titleEmphasis: "you actually own",
        titleRest: ".",
        subtitle:
          "Every buyer across all your events in one CRM, auto-segmented, with email campaigns that fill the next night. No more starting from zero each event.",
      },
      focus: {
        tag: "CRM & campaigns",
        title: "Own your audience, fill the next event.",
        body: "A customer base aggregated across all your events, auto-segmented (champions, loyal, promising, new, at-risk, lost) with average spend and where they came from. Send email campaigns and track opens and clicks, so the people who came last time hear about the next one first.",
        bullets: [
          "Cross-event CRM with RFM segments and origins",
          "Email campaigns with open and click tracking",
          "CSV export of your whole audience",
        ],
        caveat: "Client-side loyalty (points / QR) is live; the predictive engine is on the roadmap.",
      },
      contactLabel: "Cross-event CRM and email campaigns",
    },
    {
      id: "porte",
      chipLabel: "On the door",
      hero: {
        badge: "On the door",
        titleLead: "Your own door app — ",
        titleEmphasis: "scan tickets, drinks and cloakroom",
        titleRest: ".",
        subtitle:
          "Turn any phone into a scanner. Tickets, drinks and cloakroom, each scanned by type, with a live guest list synced across every device.",
      },
      focus: {
        tag: "Check-in & guest list",
        title: "The door runs on your team's phones.",
        body: "Each scanner signs in and validates entry by type — tickets, drinks, cloakroom — so nothing gets mixed up. The guest list is allocated per event with a share link your promoters and the host club can fill, and sign-ups sync live across every device.",
        bullets: [
          "Multi-type scanner: tickets, drinks, cloakroom",
          "Live guest list with a shareable sign-up link",
          "Synced across every device at the door",
        ],
      },
      contactLabel: "Door check-in and guest list",
    },
    {
      id: "compta",
      chipLabel: "Accounting",
      hero: {
        badge: "Money & accounting",
        titleLead: "What you actually net, ",
        titleEmphasis: "your co-production share included",
        titleRest: ".",
        subtitle:
          "A per-event financial report: revenue, VAT, Yuno and Stripe fees, and your exact share on co-produced nights. PDF invoices in FR or EN, ready for your accountant.",
      },
      focus: {
        tag: "Accounting",
        title: "Revenue, VAT, fees and your share — done for you.",
        body: "A monthly financial report per event: revenue excl. and incl. tax, VAT collected, Yuno and Stripe fees, refunds, and net to receive. On co-produced nights it shows your share automatically (e.g. 50%). Export CSV and download PDF invoices in FR or EN.",
        bullets: [
          "Revenue, VAT, Yuno + Stripe fees, net to receive",
          "Your co-production share computed per event",
          "PDF invoices FR / EN and CSV export",
        ],
        caveat: "'Net' can use a fallback estimate when revenue distributions are missing.",
      },
      contactLabel: "Accounting, VAT and your co-production share",
    },
  ],
};

export type OrganizersContent = RoleLandingContent;

const fr: RoleLandingContent = {
  meta: {
    title: "Yuno pour les organisateurs — La billetterie sans la commission",
    description:
      "Organisez vos événements avec des frais de billetterie réduits et répartissez automatiquement les revenus avec votre établissement hôte via Stripe Connect — réglés deux jours après l'événement.",
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
    titleLead: "Votre back-office d'orga complet : ",
    titleEmphasis: "savoir si ce soir se remplit, et ce que vous touchez vraiment",
    titleRest: ".",
    subtitle:
      "Sans salle fixe, aucun écran ne vous dit si ce soir va se remplir ni ce que vous gardez vraiment après frais, et vous partagez encore avec l'hôte à la main. Yuno vous donne un back-office Mission Control, votre propre payout Stripe, et une répartition automatique avec l'établissement.",
    primaryCta: "Réserver une démo",
    secondaryCta: "Voir le prix",
    note: "Core gratuit · 4 % par billet (min 0,99 €), payés par l'acheteur · Vous ne payez que Stripe",
  },
  quickPoints: [
    {
      icon: "chart",
      title: "Mission Control",
      body: "Ce soir en un coup d'œil : billets vendus, revenu brut et net, taux de check-in, tables VIP — plus les KPIs sur 30 jours et vos meilleurs événements.",
    },
    {
      icon: "card",
      title: "Votre propre payout Stripe",
      body: "Branchez votre propre Stripe. L'argent arrive sur votre compte, puis votre banque — Yuno ne détient jamais vos fonds. 4 % par billet (min 0,99 €), payés par l'acheteur.",
    },
    {
      icon: "users",
      title: "Répartition auto avec la salle",
      body: "Co-produisez dans un établissement et le partage des revenus est un contrat appliqué à chaque vente via Stripe Connect — sans cash, sans Excel.",
    },
  ],
  free: {
    tag: "Le prix",
    title: "Core est gratuit. 4 % par billet, payés par l'acheteur.",
    body: "Aucun abonnement obligatoire pour vendre. Le frais Yuno est un taux plat de 4 % par billet et table VIP (0,99 € minimum), 3 % sur les boissons, ajouté au paiement et payé par l'acheteur, donc jamais déduit de vos revenus. Vous ne réglez que les frais de traitement Stripe.",
    bullets: [
      "Formule Core gratuite — aucun abonnement requis pour vendre",
      "Taux plat 4 % billets & tables, 3 % boissons (min 0,99 €), payés par l'acheteur",
      "Paliers Early Bird / Regular / Late avec quotas",
      "Frais affichés à l'acheteur avant le paiement — aucune surprise",
    ],
    caption:
      "Le frais est ajouté au paiement et payé par l'acheteur, jamais déduit de vos revenus. Vous ne payez que les frais de traitement Stripe.",
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
    body: "Pas un paiement austère : une page d'événement pensée pour donner envie. Billets à paliers et liste d'invités sur un écran, tables VIP et plan de salle sur l'autre.",
    demo: { label: "Voir un événement en ligne", href: DEMO_EVENT },
    imageAlt:
      "Deux écrans réels d'un événement Yuno sur téléphone : billets à paliers avec liste d'invités, et tables VIP avec plan de salle.",
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
    title: "Le même événement, un taux plat — et la répartition gérée pour vous.",
    colA: "Plateformes classiques",
    colB: "Yuno",
    rows: [
      { label: "Frais par billet", a: "8 à 18 %", b: "4 % (min 0,99 €)", highlight: true },
      { label: "Qui paie les frais", a: "Le client", b: "Le client (4 % plat)" },
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
        a: "Le client, au moment du paiement : 4 % par billet (0,99 € minimum), affichés avant le paiement. C'est souvent moins que ce que prennent les plateformes classiques, donc moins de monde abandonne au paiement.",
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
    title: "Prêt à faire tourner votre prochain événement sur Yuno ?",
    body: "Réservez une démo et on vous aide à configurer votre back-office et à convenir de la répartition avec votre établissement.",
    button: "Réserver une démo",
    note: "Core gratuit · 4 % par billet (min 0,99 €), payés par l'acheteur · Sans engagement",
  },
  defaultPainId: "orga",
  pains: [
    {
      id: "orga",
      chipLabel: "Back-office",
      hero: {
        badge: "Back-office orga",
        titleLead: "Votre back-office d'orga complet : ",
        titleEmphasis: "savoir si ce soir se remplit, et ce que vous touchez vraiment",
        titleRest: ".",
        subtitle:
          "Sans salle fixe, aucun écran ne vous dit si ce soir va se remplir ni ce que vous gardez vraiment après frais. Yuno vous donne un back-office Mission Control et votre propre payout Stripe.",
      },
      focus: {
        tag: "Mission Control",
        title: "L'événement de ce soir, brut et net, sur un seul écran.",
        body: "Mission Control affiche l'événement de ce soir — billets vendus, revenu brut et net, taux de check-in, tables VIP — plus les KPIs sur 30 jours, un graphe de revenus et vos meilleurs événements. Paiement self-serve : branchez votre propre Stripe, l'argent arrive sur votre compte puis votre banque. Yuno ne détient jamais les fonds (4 %, min 0,99 €).",
        bullets: [
          "Carte de l'événement de ce soir : vendus, brut et net, check-in, tables VIP",
          "KPIs 30 jours, graphe de revenus, meilleurs événements",
          "Votre propre Stripe Connect — Yuno ne détient jamais vos fonds",
        ],
        caveat: "Le « net » s'appuie parfois sur une estimation quand les répartitions manquent ; les analyses de taux de conversion ne sont pas encore live.",
      },
      contactLabel: "Le back-office Mission Control de l'orga",
    },
    {
      id: "prix",
      chipLabel: "Gratuit pour vous",
      hero: {
        badge: "Ce que ça vous coûte",
        titleLead: "Les autres plateformes vous facturent. ",
        titleEmphasis: "Yuno ne vous coûte que Stripe",
        titleRest: ".",
        subtitle:
          "Les outils de billetterie vous prennent un abonnement ou une marge sur chaque billet. Yuno ne facture rien à l'organisateur — aucun abonnement, aucune commission Yuno sur vos revenus. La seule chose que vous payez, ce sont les frais de traitement Stripe.",
      },
      focus: {
        tag: "Votre coût : 0 €",
        title: "Gratuit pour vous. Les 4 % sont sur l'acheteur, pas sur votre marge.",
        body: "Aucun abonnement pour commencer à vendre et aucune commission Yuno prélevée sur vos revenus. Les 4 % de frais de service (min 0,99 €, 3 % sur les boissons) sont ajoutés au paiement et payés par l'acheteur : ils ne touchent jamais votre part. Sur une soirée co-produite, la répartition et les frais sont affichés au centime près. Le seul coût qui vous revient, ce sont les frais de traitement Stripe — les mêmes que sur n'importe quelle plateforme.",
        bullets: [
          "Aucun abonnement, aucune commission Yuno sur vos revenus",
          "Les 4 % (min 0,99 €) sont payés par l'acheteur, jamais déduits de vous",
          "Les plateformes classiques prennent 8 à 18 % ou un abonnement ; Yuno vous facture 0 €",
        ],
        caveat: "Les frais de traitement Stripe sont facturés directement par Stripe à son tarif standard, ils ne sont pas fixés par Yuno.",
      },
      contactLabel: "Comment Yuno reste gratuit pour les organisateurs",
    },
    {
      id: "co-soiree",
      chipLabel: "Répartition avec la salle",
      hero: {
        badge: "Soirées co-produites",
        titleLead: "La soirée co-produite, ",
        titleEmphasis: "splittée par contrat et payée automatiquement",
        titleRest: ".",
        subtitle:
          "Vous partagez la recette avec l'établissement hôte à la main : cash, Excel, virements informels, zéro traçabilité, des disputes au règlement. Yuno fait du partage un contrat appliqué à chaque vente.",
      },
      focus: {
        tag: "Répartition auto avec la salle",
        title: "Convenez la répartition une fois. Elle s'applique à chaque vente.",
        body: "Définissez le partage des revenus avec votre établissement hôte : il est attaché à l'événement avant la vente. L'argent se répartit salle ↔ orga à chaque vente via Stripe Connect, par type d'item. Le club reste vendeur de record (licence alcool) ; vous voyez votre part au centime près.",
        bullets: [
          "Contrat de partage des revenus avec l'établissement hôte",
          "Répartition automatique salle ↔ orga via Stripe Connect, par item",
          "Boîte de propositions de collab — sans cash, sans Excel",
        ],
      },
      contactLabel: "Répartition auto avec un établissement hôte (soirée co-produite)",
    },
    {
      id: "promo",
      chipLabel: "Promoteurs",
      hero: {
        badge: "Promoteurs",
        titleLead: "Enfin savoir quel promoteur ",
        titleEmphasis: "a vraiment rapporté la foule",
        titleRest: " — et le régler en un clic.",
        subtitle:
          "Les commissions promoteurs, c'est du cash et un tableur, avec des disputes sur qui a vendu quoi. Yuno suit tout automatiquement et règle en un clic.",
      },
      focus: {
        tag: "Attribution promoteurs",
        title: "Des clics trackés aux ventes, réglé sans dispute.",
        body: "Chaque promoteur reçoit une Linktree trackée ; les clics, conversions et ventes sont attribués automatiquement, sur billets et tables, avec le ROI promoteur (revenu par 1 € de commission) et un classement. Réglez en un clic avec un cycle géré par le club : en attente → approuvé → payé vers l'IBAN du promoteur.",
        bullets: [
          "Liens promoteurs trackés, clics → conversions → ventes",
          "ROI promoteur et classement en direct",
          "Règlement en un clic : en attente → approuvé → payé vers l'IBAN",
        ],
        caveat: "Le paiement promoteur est un règlement géré par le club vers l'IBAN, pas un split Stripe par vente. Les promoteurs ne sont pas les affiliés.",
      },
      contactLabel: "Attribution promoteurs et règlement en un clic",
    },
    {
      id: "billetterie",
      chipLabel: "Billetterie",
      hero: {
        badge: "Billetterie",
        titleLead: "Publiez, tarifez en rounds, ",
        titleEmphasis: "encaissez avant la nuit",
        titleRest: ".",
        subtitle:
          "La billetterie, c'est un site tiers, un tableur et un carnet à la porte, et l'argent rentre trop tard. Yuno met la billetterie et la porte au même endroit.",
      },
      focus: {
        tag: "Billetterie & porte",
        title: "Rounds, quotas, entrée par QR — l'argent rentre avant la nuit.",
        body: "Créez votre événement avec tarifs en plusieurs rounds (Early Bird à standard), quotas par round et capacité globale, billets boisson-incluse, deadline d'entrée, événements récurrents et guestlist. Entrée par QR, scannée par votre équipe sur ses téléphones. Le cash rentre avant la soirée.",
        bullets: [
          "Tarifs multi-rounds, quotas, capacité globale",
          "Billets boisson-incluse, événements récurrents, guestlist",
          "Entrée par QR, contrôle multi-scanneurs par PIN sur n'importe quel téléphone",
        ],
      },
      contactLabel: "Billetterie d'événement et contrôle d'accès",
    },
    {
      id: "data",
      chipLabel: "Analytics",
      hero: {
        badge: "Analytics",
        titleLead: "Savoir ce qui vend vraiment — ",
        titleEmphasis: "par événement, par heure, par billet",
        titleRest: ".",
        subtitle:
          "Revenu brut, panier moyen, invités uniques, et les heures exactes où vos billets partent. Sur tout ou par événement, exportable en un clic.",
      },
      focus: {
        tag: "Analytics",
        title: "Performance détaillée sur tous vos événements.",
        body: "Revenu brut, total des commandes, panier moyen et invités uniques, chacun avec sa tendance. Une distribution du revenu brut par heure montre quand votre public achète vraiment, pour caler vos relances. Basculez entre global et par événement, et exportez les données.",
        bullets: [
          "Revenu, commandes, panier moyen, invités uniques avec tendances",
          "Distribution du revenu brut par heure",
          "Vue globale ou par événement, export en un clic",
        ],
      },
      contactLabel: "Analytics d'événement et exports",
    },
    {
      id: "fidelite",
      chipLabel: "Clients & email",
      hero: {
        badge: "CRM & email",
        titleLead: "Votre public, c'est un fichier ",
        titleEmphasis: "qui vous appartient vraiment",
        titleRest: ".",
        subtitle:
          "Tous vos acheteurs, tous événements confondus, dans un seul CRM auto-segmenté, avec des campagnes email qui remplissent la prochaine soirée. Fini de repartir de zéro à chaque event.",
      },
      focus: {
        tag: "CRM & campagnes",
        title: "Possédez votre audience, remplissez le prochain event.",
        body: "Une base clients agrégée sur tous vos événements, auto-segmentée (champions, fidèles, prometteurs, nouveaux, à risque, perdus) avec panier moyen et provenance. Envoyez des campagnes email et suivez ouvertures et clics, pour que ceux qui sont venus la dernière fois entendent parler de la prochaine en premier.",
        bullets: [
          "CRM multi-événements avec segments RFM et provenance",
          "Campagnes email avec suivi des ouvertures et clics",
          "Export CSV de toute votre audience",
        ],
        caveat: "La fidélité côté client (points / QR) est live ; le moteur prédictif est au roadmap.",
      },
      contactLabel: "CRM multi-événements et campagnes email",
    },
    {
      id: "porte",
      chipLabel: "À l'entrée",
      hero: {
        badge: "À l'entrée",
        titleLead: "Votre propre app d'accès — ",
        titleEmphasis: "scannez billets, boissons et vestiaire",
        titleRest: ".",
        subtitle:
          "Transformez n'importe quel téléphone en scanneur. Billets, boissons et vestiaire, chacun scanné par type, avec une liste d'invités synchronisée sur tous les appareils.",
      },
      focus: {
        tag: "Contrôle d'accès & liste d'invités",
        title: "L'entrée tourne sur les téléphones de votre équipe.",
        body: "Chaque scanneur se connecte et valide l'entrée par type — billets, boissons, vestiaire — pour que rien ne se mélange. La liste d'invités est allouée par événement avec un lien de partage que vos promoteurs et l'établissement hôte peuvent remplir, et les inscriptions se synchronisent en direct sur tous les appareils.",
        bullets: [
          "Scanneur multi-types : billets, boissons, vestiaire",
          "Liste d'invités avec lien d'inscription partageable",
          "Synchronisé sur tous les appareils à l'entrée",
        ],
      },
      contactLabel: "Contrôle d'accès et liste d'invités",
    },
    {
      id: "compta",
      chipLabel: "Comptabilité",
      hero: {
        badge: "Argent & compta",
        titleLead: "Ce que vous touchez vraiment, ",
        titleEmphasis: "votre part de co-production incluse",
        titleRest: ".",
        subtitle:
          "Un rapport financier par événement : revenu, TVA, frais Yuno et Stripe, et votre part exacte sur les soirées co-produites. Factures PDF en FR ou EN, prêtes pour votre comptable.",
      },
      focus: {
        tag: "Comptabilité",
        title: "Revenu, TVA, frais et votre part — fait pour vous.",
        body: "Un rapport financier mensuel par événement : revenu HT et TTC, TVA collectée, frais Yuno et Stripe, remboursements, et net à recevoir. Sur les soirées co-produites, il affiche votre part automatiquement (ex. 50 %). Export CSV et factures PDF en FR ou EN.",
        bullets: [
          "Revenu, TVA, frais Yuno + Stripe, net à recevoir",
          "Votre part de co-production calculée par événement",
          "Factures PDF FR / EN et export CSV",
        ],
        caveat: "Le « net » peut utiliser une estimation de repli quand les répartitions manquent.",
      },
      contactLabel: "Comptabilité, TVA et votre part de co-production",
    },
  ],
};

export const organizersContent: Record<Locale, RoleLandingContent> = { en, fr };

export function useOrganizers(): RoleLandingContent {
  return organizersContent[useLocale()];
}
