// Pricing. Targets: "Yuno pricing", "nightclub ticketing software pricing",
// "ticketing platform with no commission" (EN); "tarif billetterie soirée",
// "billetterie sans commission", "combien coûte une billetterie pour une soirée",
// "frais de service billetterie" (FR); "precio software discotecas", "ticketera
// sin comisiones", "cuánto cobra una ticketera" (ES). Replaces the legacy paid
// plans page. Facts: docs/yuno-context.md (pricing table, worked example, competitors).
import type { TopicPageContent } from "../topic-types";

const UPDATED = "2026-09-29";
const TWINS = {
  en: "/pricing",
  fr: "/fr/pricing",
  es: "/es/precios",
};

const en: TopicPageContent = {
  id: "pricing",
  lang: "en",
  path: TWINS.en,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Yuno pricing: €0 subscription, 0% commission ticketing | Yuno",
    description:
      "Yuno's published prices: €0 subscription, 0% commission on your price, one service level. The customer pays the fee (tickets 4%, min €0.99). With an example.",
    ogAlt: "Yuno pricing — €0 subscription, 0% commission, fees paid by the customer",
  },
  breadcrumb: { home: "Yuno", current: "Pricing" },
  hero: {
    kicker: "Yuno pricing · nightclub ticketing software",
    title: "Free for pros. Paid by the night.",
    sub: "A ticketing and club-management platform with no subscription, no commission on your price and no tiers. Yuno earns a service fee added to your displayed price and paid by the customer, so it only makes money when your night does.",
    primary: "Create my free account",
    secondary: "Talk to the founder",
    note: ["€0 subscription", "0% commission on your price", "One service level, no options"],
  },
  answer: {
    title: "In short",
    paragraphs: [
      "Yuno costs €0 a month and takes 0% commission on the price you set. There is one service level: no Core, Pro or Elite plan, no paid options, no annual contract. Ticketing, guest list, VIP tables, bar ordering, door scanning, promoter commissions, club × organizer contracts and the CRM are all included.",
      "Yuno earns a service fee that is added to your displayed price and paid by the end customer: 4% on tickets (minimum €0.99), 4% on VIP tables (minimum €0.99, maximum €25) and 3% on drinks. The only cost on your side is card processing by Stripe, 1.5% + €0.25 on what you collect, and the money goes straight to your own account.",
    ],
    bullets: [
      "€0 subscription and 0% commission for the club, organizer or promoter.",
      "Paid by the customer: tickets 4% (min €0.99) · tables 4% (min €0.99, max €25) · drinks 3%.",
      "Paid by you: Stripe card processing, 1.5% + €0.25. Yuno never holds your funds.",
      "Emailing to your customers: 15,000 emails a month included, then €10 per 10,000.",
    ],
  },
  features: {
    eyebrow: "What is included",
    title: "One level of service, everything included",
    sub: "From a 200-capacity club to an organizer starting out: the same account, at the same published price.",
    items: [
      {
        title: "Ticketing & guest list",
        body: "Price tiers, presales, promo codes, Apple Wallet passes, and a guest list with quotas and named QR codes. Checkout takes about thirty seconds, with no account and no app.",
      },
      {
        title: "VIP tables & drinks",
        body: "An interactive floor plan with deposits and bottle pre-orders, and drink ordering from the bar's QR code, with a screen for the bartender.",
      },
      {
        title: "Door, bar and staff screens",
        body: "One scanner for tickets, guests and tables, a live entry counter, and a screen for each role — bouncer, VIP host, bartender — with no training.",
      },
      {
        title: "Promoters & club × organizer split",
        body: "A personal link per promoter with commissions computed automatically, and a club × organizer contract signed inside Yuno, with a night statement both sides accept.",
      },
      {
        title: "CRM & emailing",
        body: "Every buyer joins your own customer base. 15,000 emails a month and 9 automations are included, with segments built on what people actually bought.",
      },
      {
        title: "Money, invoices & analytics",
        body: "Stripe Connect in your name, refunds and invoices from the dashboard, analytics per night, a live view, exports and an AI assistant. Three languages (EN · FR · ES).",
      },
    ],
  },
  table: {
    eyebrow: "The fee table",
    title: "Every Yuno fee and who pays it (September 2026)",
    sub: "This is the complete list. There is no other charge on the platform.",
    head: ["Item", "Who pays", "Amount"],
    rows: [
      ["Subscription and commission", "Nobody", "€0 · 0%"],
      ["Service fee, tickets", "The customer, on top of your price", "4% · min. €0.99"],
      [
        "Service fee, VIP tables",
        "The customer, on the amount charged",
        "4% · min. €0.99 · max. €25",
      ],
      ["Service fee, drinks", "The customer, on top of your price", "3%"],
      ["Card processing (Stripe)", "You (club or organizer), on what you collect", "1.5% + €0.25"],
      ["Emailing to your customers", "Included", "15,000 emails/month, then €10 per 10,000"],
      ["Plans, tiers or paid options", "None", "One service level"],
    ],
    footnote:
      "Example: 300 tickets at €20. The customer pays €20.99 per ticket (the €0.99 minimum applies, since 4% of €20 is €0.80); you keep €19.44 per ticket after €0.56 of Stripe fees, which is €5,832 net, in your own account. Prices from yunoapp.eu, updated 29 September 2026.",
  },
  steps: {
    eyebrow: "The maths on one ticket",
    title: "How a €20 ticket adds up",
    sub: "The same calculation as the worked example, one ticket at a time.",
    items: [
      {
        title: "You set the price: €20",
        body: "That is the price you displayed, and the price you get. Yuno takes 0% of it.",
      },
      {
        title: "The customer pays €20.99",
        body: "Yuno's service fee is 4% with a €0.99 minimum, and on a €20 ticket the minimum applies. The customer pays it on top of your price.",
      },
      {
        title: "You keep €19.44",
        body: "Stripe processes the card for 1.5% + €0.25, which is €0.56 on this payment. Over 300 tickets that is €5,832 net, in your own account, without waiting for a payout after the event.",
      },
    ],
  },
  proof: {
    eyebrow: "Worked example",
    title: "300 tickets at €20: €5,832 net",
    stats: [
      { value: "€20.99", label: "paid by the customer per ticket (€20 + €0.99 service fee)" },
      { value: "€0.56", label: "Stripe card fees per ticket, paid by you" },
      { value: "€19.44", label: "kept by you per ticket" },
      { value: "€5,832", label: "net on 300 tickets, in your own account" },
    ],
    note: "Numbers from the Yuno pricing table, September 2026. Your Stripe fees can vary with the card used.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Yuno pricing: your questions",
    items: [
      {
        q: "How much does Yuno cost?",
        a: "€0 a month and 0% commission on your price. The customer pays a service fee on top: 4% on tickets (min. €0.99), 4% on VIP tables (min. €0.99, max. €25) and 3% on drinks. You only pay Stripe's card processing, 1.5% + €0.25.",
      },
      {
        q: "Is there a ticketing platform with no commission?",
        a: "Yuno takes 0% commission on the price you set, with a €0 subscription. The service fee is paid by the customer on top of your price, so what you display is what you keep, minus Stripe's card processing.",
      },
      {
        q: "Who pays Yuno's service fee?",
        a: "The end customer, added to your displayed price at checkout: 4% on tickets (min. €0.99), 4% on tables (min. €0.99, max. €25), 3% on drinks. The club or organizer does not pay it.",
      },
      {
        q: "What does the club or organizer pay?",
        a: "Only card processing by Stripe, 1.5% + €0.25 on what you collect. There is no subscription, no commission and no paid option on Yuno's side.",
      },
      {
        q: "Are there plans, tiers or paid options?",
        a: "No. There is one service level, with everything included, whether you run a 200-capacity club or you are an organizer starting out. Earlier plan names (Core, Essential, Pro, Elite) no longer exist.",
      },
      {
        q: "Is Yuno the cheapest?",
        a: "We make no such claim. Yuno's 4% buyer fee (min. €0.99) is higher than Weezevent's per-ticket fee once a ticket costs more than about €25. What Yuno promises is a €0 subscription and 0% commission for the organizer, at a published price. Compare on the total cost for your own ticket price, using the public figures listed in the next question.",
      },
      {
        q: "What do other ticketing platforms charge?",
        a: "From their public pages, read between June and September 2026. Shotgun: 10% base commission on the organizer's sales, negotiable by contract, plus buyer fees. Weezevent: 2.5% per ticket, min. €0.99 (can be passed to the buyer), with paid add-ons for cashless and staff. Xceed: 3% per ticket, 15% on marketplace sales and €29 to €59 a month. Eventbrite: from 3.5% + €0.49 (Essentials) to 5.5% + €0.99 (Pro) per ticket. Fourvenues: subscription on quote after a demo. Prices change, so check each provider's site.",
      },
      {
        q: "When do I get my money?",
        a: "Payments run on Stripe Connect, so the money lands directly in your own account, under your name on the customer's statement. Yuno never holds your funds.",
      },
      {
        q: "How much does emailing cost?",
        a: "15,000 emails a month are included in the €0 subscription. Beyond that it is €10 per 10,000 emails, with no subscription.",
      },
      {
        q: "Is there a contract or a commitment?",
        a: "No annual contract and no commitment. You create your account yourself in about two minutes, without a card.",
      },
    ],
  },
  related: {
    title: "Keep exploring",
    links: [
      { label: "VIP table booking software", href: "/vip-table-booking-software" },
      { label: "Promoter tracking & commission software", href: "/promoter-tracking-software" },
      { label: "Club × organizer revenue split", href: "/club-organizer-revenue-split" },
      { label: "Nightclub guest list software", href: "/nightclub-guest-list-software" },
      { label: "All Yuno features (home)", href: "/" },
      { label: "Yuno vs Shotgun", href: "/alternative-shotgun" },
    ],
  },
  sources: {
    title: "Sources",
    items: [
      { label: "Shotgun Pro — organizer site", url: "https://pro.shotgun.live/en" },
      {
        label: "Shotgun Pro — service fees (help center)",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/9666665025042",
      },
      {
        label: "Fourvenues — software for nightclubs",
        url: "https://www.fourvenues.com/es/software-para-discotecas",
      },
    ],
    disclaimer:
      "Third-party names belong to their owners. Weezevent, Xceed and Eventbrite figures come from each provider's public pricing pages, read between June and September 2026. Information may have changed since.",
  },
};

const fr: TopicPageContent = {
  id: "pricing",
  lang: "fr",
  path: TWINS.fr,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Tarif billetterie soirée sans commission ni abonnement | Yuno",
    description:
      "Tarifs publics de Yuno : 0 € d'abonnement, 0 % de commission sur votre prix, un seul niveau de service. Frais payés par le client (billets 4 %, min. 0,99 €).",
    ogAlt: "Yuno — tarifs : 0 € d'abonnement, 0 % de commission, frais payés par le client",
  },
  breadcrumb: { home: "Yuno", current: "Tarifs" },
  hero: {
    kicker: "Tarifs Yuno · billetterie sans commission pour soirées et clubs",
    title: "Gratuit pour les pros. Payé par la soirée.",
    sub: "Une billetterie et un logiciel de gestion de club sans abonnement, sans commission sur votre prix et sans formules. Yuno se rémunère par des frais de service ajoutés au prix affiché et payés par le client : Yuno ne gagne de l'argent que quand votre soirée en gagne.",
    primary: "Créer mon compte gratuit",
    secondary: "Parler au fondateur",
    note: ["0 € d'abonnement", "0 % de commission sur votre prix", "Un seul niveau de service"],
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "Yuno coûte 0 € par mois et ne prend aucune commission (0 %) sur le prix que vous fixez. Il n'y a qu'un seul niveau de service : pas de formule Core, Pro ou Elite, pas d'options payantes, pas d'engagement annuel. Billetterie, guest list, tables VIP, commande au bar, scan à la porte, commissions des promoteurs, contrats club × organisateur et CRM sont inclus.",
      "Yuno se rémunère par des frais de service ajoutés au prix affiché et payés par le client final : 4 % sur les billets (minimum 0,99 €), 4 % sur les tables VIP (minimum 0,99 €, maximum 25 €) et 3 % sur les boissons. Seul coût de votre côté : le traitement bancaire de Stripe, 1,5 % + 0,25 € sur l'encaissement, et l'argent arrive directement sur votre propre compte.",
    ],
    bullets: [
      "0 € d'abonnement et 0 % de commission pour le club, l'organisateur ou le promoteur.",
      "Payé par le client : billets 4 % (min. 0,99 €) · tables 4 % (min. 0,99 €, max. 25 €) · boissons 3 %.",
      "Payé par vous : traitement bancaire Stripe, 1,5 % + 0,25 €. Yuno ne détient jamais vos fonds.",
      "Emailing vers vos clients : 15 000 emails par mois inclus, puis 10 € les 10 000.",
    ],
  },
  features: {
    eyebrow: "Ce qui est inclus",
    title: "Un seul niveau de service, tout est compris",
    sub: "Du club de 200 places à l'organisateur qui débute : le même compte, au même prix publié.",
    items: [
      {
        title: "Billetterie et guest list",
        body: "Paliers de prix, préventes, codes promo, pass Apple Wallet, et une guest list avec quotas et QR nominatifs. Le paiement prend une trentaine de secondes, sans compte ni app.",
      },
      {
        title: "Tables VIP et boissons",
        body: "Un plan de salle interactif avec acomptes et précommande de bouteilles, et la commande de boissons depuis le QR code du bar, avec un écran pour le barman.",
      },
      {
        title: "Porte, bar et écrans du staff",
        body: "Un scanner pour les billets, les invités et les tables, un compteur d'entrées en direct, et un écran par rôle — videur, responsable VIP, barman — sans formation.",
      },
      {
        title: "Promoteurs et répartition club × organisateur",
        body: "Un lien personnel par promoteur avec commissions calculées automatiquement, et un contrat club × organisateur signé dans Yuno, avec un décompte de soirée que les deux parties acceptent.",
      },
      {
        title: "CRM et emailing",
        body: "Chaque acheteur entre dans votre propre base clients. 15 000 emails par mois et 9 automatisations sont inclus, avec des segments construits sur ce que les gens ont réellement acheté.",
      },
      {
        title: "Argent, factures et analytics",
        body: "Stripe Connect à votre nom, remboursements et factures depuis le tableau de bord, analytics par soirée, vue en direct, exports et assistant IA. Trois langues (FR · EN · ES).",
      },
    ],
  },
  table: {
    eyebrow: "La grille des frais",
    title: "Tous les frais Yuno et qui les paie (septembre 2026)",
    sub: "C'est la liste complète. Il n'y a aucun autre frais sur la plateforme.",
    head: ["Poste", "Qui paie", "Montant"],
    rows: [
      ["Abonnement et commission", "Personne", "0 € · 0 %"],
      ["Frais de service, billets", "Le client, en plus de votre prix", "4 % · min. 0,99 €"],
      [
        "Frais de service, tables VIP",
        "Le client, sur le montant débité",
        "4 % · min. 0,99 € · max. 25 €",
      ],
      ["Frais de service, boissons", "Le client, en plus de votre prix", "3 %"],
      [
        "Traitement bancaire (Stripe)",
        "Vous (club ou organisateur), sur l'encaissement",
        "1,5 % + 0,25 €",
      ],
      ["Emailing vers vos clients", "Inclus", "15 000 emails/mois, puis 10 € les 10 000"],
      ["Formules, paliers ou options payantes", "Aucune", "Un seul niveau de service"],
    ],
    footnote:
      "Exemple : 300 billets à 20 €. Le client paie 20,99 € par billet (le minimum de 0,99 € s'applique, car 4 % de 20 € font 0,80 €) ; vous gardez 19,44 € par billet après 0,56 € de frais Stripe, soit 5 832 € nets, sur votre propre compte. Tarifs de yunoapp.eu, mis à jour le 29 septembre 2026.",
  },
  steps: {
    eyebrow: "Le calcul sur un billet",
    title: "Comment se compose un billet à 20 €",
    sub: "Le même calcul que l'exemple chiffré, billet par billet.",
    items: [
      {
        title: "Vous fixez le prix : 20 €",
        body: "C'est le prix que vous affichez, et le prix que vous touchez. Yuno en prend 0 %.",
      },
      {
        title: "Le client paie 20,99 €",
        body: "Les frais de service Yuno sont de 4 % avec un minimum de 0,99 € ; sur un billet à 20 €, c'est le minimum qui s'applique. Le client les règle en plus de votre prix.",
      },
      {
        title: "Vous gardez 19,44 €",
        body: "Stripe traite la carte pour 1,5 % + 0,25 €, soit 0,56 € sur ce paiement. Sur 300 billets, cela fait 5 832 € nets, sur votre propre compte, sans attendre un virement après l'événement.",
      },
    ],
  },
  proof: {
    eyebrow: "Exemple chiffré",
    title: "300 billets à 20 € : 5 832 € nets",
    stats: [
      {
        value: "20,99 €",
        label: "payés par le client par billet (20 € + 0,99 € de frais de service)",
      },
      { value: "0,56 €", label: "de frais bancaires Stripe par billet, à votre charge" },
      { value: "19,44 €", label: "gardés par vous par billet" },
      { value: "5 832 €", label: "nets sur 300 billets, sur votre propre compte" },
    ],
    note: "Chiffres issus de la grille tarifaire Yuno, septembre 2026. Les frais Stripe peuvent varier selon la carte utilisée.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Tarifs Yuno : vos questions",
    items: [
      {
        q: "Combien coûte une billetterie pour une soirée avec Yuno ?",
        a: "0 € par mois et 0 % de commission sur votre prix. Le client paie des frais de service en plus : 4 % sur les billets (min. 0,99 €), 4 % sur les tables VIP (min. 0,99 €, max. 25 €) et 3 % sur les boissons. Vous ne payez que le traitement bancaire Stripe, 1,5 % + 0,25 €.",
      },
      {
        q: "Existe-t-il une billetterie sans commission ?",
        a: "Yuno prend 0 % de commission sur le prix que vous fixez, avec 0 € d'abonnement. Les frais de service sont payés par le client en plus de votre prix : ce que vous affichez est ce que vous gardez, moins le traitement bancaire de Stripe.",
      },
      {
        q: "Qui paie les frais de service de Yuno ?",
        a: "Le client final, ajoutés à votre prix affiché au moment du paiement : 4 % sur les billets (min. 0,99 €), 4 % sur les tables (min. 0,99 €, max. 25 €), 3 % sur les boissons. Le club ou l'organisateur ne les paie pas.",
      },
      {
        q: "Que paie le club ou l'organisateur ?",
        a: "Uniquement le traitement bancaire de Stripe, 1,5 % + 0,25 € sur l'encaissement. Côté Yuno, il n'y a ni abonnement, ni commission, ni option payante.",
      },
      {
        q: "Y a-t-il des formules, des paliers ou des options payantes ?",
        a: "Non. Il n'y a qu'un seul niveau de service, tout compris, que vous dirigiez un club de 200 places ou que vous débutiez comme organisateur. Les anciennes formules (Core, Essential, Pro, Elite) n'existent plus.",
      },
      {
        q: "Yuno est-il la billetterie la moins chère ?",
        a: "Nous ne faisons pas cette promesse. Les frais acheteur de Yuno (4 %, min. 0,99 €) dépassent les frais par billet de Weezevent dès qu'un billet coûte plus d'environ 25 €. Ce que Yuno promet, c'est 0 € d'abonnement et 0 % de commission pour l'organisateur, à un prix publié. Comparez le coût total pour votre propre prix de billet, avec les chiffres publics de la question suivante.",
      },
      {
        q: "Combien facturent les autres billetteries ?",
        a: "D'après leurs pages publiques, relevées entre juin et septembre 2026. Shotgun : 10 % de commission de base sur les ventes de l'organisateur, négociable par contrat, plus des frais acheteur. Weezevent : 2,5 % par billet, min. 0,99 € (répercutable sur l'acheteur), avec des extensions payantes pour le cashless et le staff. Xceed : 3 % par billet, 15 % sur les ventes de la marketplace et 29 à 59 € par mois. Eventbrite : de 3,5 % + 0,49 € (Essentials) à 5,5 % + 0,99 € (Pro) par billet. Fourvenues : abonnement sur devis après une démo. Les prix évoluent : vérifiez sur le site de chaque éditeur.",
      },
      {
        q: "Quand est-ce que je reçois mon argent ?",
        a: "Les paiements passent par Stripe Connect : l'argent arrive directement sur votre propre compte, à votre nom sur le relevé du client. Yuno ne détient jamais vos fonds.",
      },
      {
        q: "Combien coûte l'emailing ?",
        a: "15 000 emails par mois sont inclus dans les 0 € d'abonnement. Au-delà, c'est 10 € les 10 000 emails, sans abonnement.",
      },
      {
        q: "Y a-t-il un contrat ou un engagement ?",
        a: "Ni contrat annuel ni engagement. Vous créez votre compte vous-même en environ deux minutes, sans carte bancaire.",
      },
    ],
  },
  related: {
    title: "Pour aller plus loin",
    links: [
      {
        label: "Logiciel de réservation de tables VIP",
        href: "/fr/reservation-table-vip-discotheque",
      },
      {
        label: "Logiciel de suivi et commissions des promoteurs",
        href: "/fr/logiciel-promoteurs-soiree",
      },
      {
        label: "Contrat et répartition club × organisateur",
        href: "/fr/contrat-club-organisateur",
      },
      { label: "Logiciel de guest list pour soirées", href: "/fr/guest-list-soiree-logiciel" },
      { label: "Toutes les fonctions de Yuno (accueil)", href: "/fr" },
      { label: "Yuno face à Shotgun", href: "/fr/alternative-shotgun" },
    ],
  },
  sources: {
    title: "Sources",
    items: [
      { label: "Shotgun Pro — site organisateurs", url: "https://pro.shotgun.live/en" },
      {
        label: "Shotgun Pro — frais de service (centre d'aide)",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/9666665025042",
      },
      {
        label: "Fourvenues — logiciel pour discothèques",
        url: "https://www.fourvenues.com/es/software-para-discotecas",
      },
    ],
    disclaimer:
      "Les noms tiers appartiennent à leurs propriétaires. Les chiffres de Weezevent, Xceed et Eventbrite proviennent des pages tarifaires publiques de chaque éditeur, relevées entre juin et septembre 2026. Les informations ont pu changer depuis.",
  },
};

const es: TopicPageContent = {
  id: "pricing",
  lang: "es",
  path: TWINS.es,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Precio software discotecas: 0 € de cuota, 0 % comisión | Yuno",
    description:
      "Precios públicos de Yuno: 0 € de cuota, 0 % de comisión sobre tu precio y un solo nivel de servicio. Gastos a cargo del cliente (entradas 4 %, mín. 0,99 €).",
    ogAlt: "Yuno — precios: 0 € de cuota, 0 % de comisión, gastos a cargo del cliente",
  },
  breadcrumb: { home: "Yuno", current: "Precios" },
  hero: {
    kicker: "Precios de Yuno · ticketera sin comisiones para discotecas y eventos",
    title: "Gratis para los profesionales. Lo paga la noche.",
    sub: "Una ticketera y un software de gestión de discotecas sin cuota, sin comisión sobre tu precio y sin planes. Yuno cobra unos gastos de servicio que se suman a tu precio y paga el cliente: Yuno solo gana dinero cuando tu noche lo gana.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    note: ["0 € de cuota", "0 % de comisión sobre tu precio", "Un solo nivel de servicio"],
  },
  answer: {
    title: "En breve",
    paragraphs: [
      "Yuno cuesta 0 € al mes y no cobra comisión (0 %) sobre el precio que tú fijas. Hay un solo nivel de servicio: sin planes Core, Pro o Elite, sin opciones de pago y sin permanencia anual. Venta de entradas, lista de invitados, reservados, pedidos en barra, control de puerta, comisiones de RRPP, contratos discoteca × organizador y CRM están incluidos.",
      "Yuno cobra unos gastos de servicio que se suman a tu precio y paga el cliente final: 4 % en entradas (mínimo 0,99 €), 4 % en mesas VIP (mínimo 0,99 €, máximo 25 €) y 3 % en copas. Tu único coste es el procesamiento de tarjeta de Stripe, 1,5 % + 0,25 € sobre lo que cobras, y el dinero llega directo a tu propia cuenta.",
    ],
    bullets: [
      "0 € de cuota y 0 % de comisión para la discoteca, el organizador o el RRPP.",
      "Lo paga el cliente: entradas 4 % (mín. 0,99 €) · mesas 4 % (mín. 0,99 €, máx. 25 €) · copas 3 %.",
      "Lo pagas tú: procesamiento de tarjeta de Stripe, 1,5 % + 0,25 €. Yuno nunca retiene tus fondos.",
      "Emailing a tus clientes: 15.000 emails al mes incluidos, y luego 10 € por cada 10.000.",
    ],
  },
  features: {
    eyebrow: "Qué está incluido",
    title: "Un solo nivel de servicio, todo incluido",
    sub: "De la discoteca de 200 personas al organizador que empieza: la misma cuenta, al mismo precio publicado.",
    items: [
      {
        title: "Venta de entradas y lista de invitados",
        body: "Tramos de precio, preventas, códigos promocionales, pases de Apple Wallet y una lista de invitados con cupos y QR nominativos. El pago lleva unos treinta segundos, sin cuenta ni app.",
      },
      {
        title: "Mesas VIP y copas",
        body: "Un plano interactivo con señales y botellas reservadas de antemano, y pedidos de copas desde el QR de la barra, con una pantalla para el camarero.",
      },
      {
        title: "Puerta, barra y pantallas del staff",
        body: "Un escáner para entradas, invitados y mesas, un contador de entradas en directo y una pantalla por rol — portero, responsable VIP, camarero — sin formación.",
      },
      {
        title: "RRPP y reparto discoteca × organizador",
        body: "Un enlace personal por RRPP con comisiones calculadas automáticamente, y un contrato discoteca × organizador firmado dentro de Yuno, con un cierre de noche que aceptan las dos partes.",
      },
      {
        title: "CRM y emailing",
        body: "Cada comprador entra en tu propia base de clientes. Se incluyen 15.000 emails al mes y 9 automatizaciones, con segmentos construidos sobre lo que la gente ha comprado de verdad.",
      },
      {
        title: "Dinero, facturas y analítica",
        body: "Stripe Connect a tu nombre, reembolsos y facturas desde el panel, analítica por noche, vista en directo, exportaciones y asistente IA. Tres idiomas (ES · EN · FR).",
      },
    ],
  },
  table: {
    eyebrow: "La tabla de gastos",
    title: "Todos los gastos de Yuno y quién los paga (septiembre 2026)",
    sub: "Es la lista completa. No hay ningún otro cargo en la plataforma.",
    head: ["Concepto", "Quién paga", "Importe"],
    rows: [
      ["Cuota y comisión", "Nadie", "0 € · 0 %"],
      ["Gastos de servicio, entradas", "El cliente, además de tu precio", "4 % · mín. 0,99 €"],
      [
        "Gastos de servicio, mesas VIP",
        "El cliente, sobre el importe cobrado",
        "4 % · mín. 0,99 € · máx. 25 €",
      ],
      ["Gastos de servicio, copas", "El cliente, además de tu precio", "3 %"],
      [
        "Procesamiento de tarjeta (Stripe)",
        "Tú (discoteca u organizador), sobre lo cobrado",
        "1,5 % + 0,25 €",
      ],
      ["Emailing a tus clientes", "Incluido", "15.000 emails/mes; después 10 € por 10.000"],
      ["Planes, niveles u opciones de pago", "Ninguno", "Un solo nivel de servicio"],
    ],
    footnote:
      "Ejemplo: 300 entradas a 20 €. El cliente paga 20,99 € por entrada (se aplica el mínimo de 0,99 €, porque el 4 % de 20 € son 0,80 €); tú te quedas 19,44 € por entrada tras 0,56 € de gastos de Stripe, es decir 5.832 € netos, en tu propia cuenta. Precios de yunoapp.eu, actualizados el 29 de septiembre de 2026.",
  },
  steps: {
    eyebrow: "La cuenta con una entrada",
    title: "Cómo se compone una entrada de 20 €",
    sub: "El mismo cálculo del ejemplo, entrada a entrada.",
    items: [
      {
        title: "Tú fijas el precio: 20 €",
        body: "Es el precio que muestras y el que cobras. Yuno se queda un 0 % de él.",
      },
      {
        title: "El cliente paga 20,99 €",
        body: "Los gastos de servicio de Yuno son un 4 % con un mínimo de 0,99 €; en una entrada de 20 € se aplica el mínimo. El cliente los paga además de tu precio.",
      },
      {
        title: "Tú te quedas 19,44 €",
        body: "Stripe procesa la tarjeta por 1,5 % + 0,25 €, es decir 0,56 € en este pago. Con 300 entradas son 5.832 € netos, en tu propia cuenta, sin esperar a un pago después del evento.",
      },
    ],
  },
  proof: {
    eyebrow: "Ejemplo con números",
    title: "300 entradas a 20 €: 5.832 € netos",
    stats: [
      {
        value: "20,99 €",
        label: "paga el cliente por entrada (20 € + 0,99 € de gastos de servicio)",
      },
      { value: "0,56 €", label: "de gastos de tarjeta de Stripe por entrada, a tu cargo" },
      { value: "19,44 €", label: "te quedas por entrada" },
      { value: "5.832 €", label: "netos con 300 entradas, en tu propia cuenta" },
    ],
    note: "Cifras de la tabla de precios de Yuno, septiembre de 2026. Los gastos de Stripe pueden variar según la tarjeta utilizada.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Precios de Yuno: tus preguntas",
    items: [
      {
        q: "¿Cuánto cobra Yuno como ticketera?",
        a: "0 € al mes y 0 % de comisión sobre tu precio. El cliente paga además unos gastos de servicio: 4 % en entradas (mín. 0,99 €), 4 % en mesas VIP (mín. 0,99 €, máx. 25 €) y 3 % en copas. Tú solo pagas el procesamiento de tarjeta de Stripe, 1,5 % + 0,25 €.",
      },
      {
        q: "¿Existe una ticketera sin comisiones?",
        a: "Yuno cobra un 0 % de comisión sobre el precio que fijas, con 0 € de cuota. Los gastos de servicio los paga el cliente además de tu precio: lo que muestras es lo que te quedas, menos el procesamiento de tarjeta de Stripe.",
      },
      {
        q: "¿Quién paga los gastos de servicio de Yuno?",
        a: "El cliente final, sumados a tu precio al pagar: 4 % en entradas (mín. 0,99 €), 4 % en mesas (mín. 0,99 €, máx. 25 €) y 3 % en copas. La discoteca o el organizador no los paga.",
      },
      {
        q: "¿Qué paga la discoteca o el organizador?",
        a: "Solo el procesamiento de tarjeta de Stripe, 1,5 % + 0,25 € sobre lo cobrado. Por parte de Yuno no hay cuota, ni comisión, ni opciones de pago.",
      },
      {
        q: "¿Hay planes, niveles u opciones de pago?",
        a: "No. Hay un solo nivel de servicio, con todo incluido, tanto si diriges una discoteca de 200 personas como si empiezas como organizador. Los antiguos planes (Core, Essential, Pro, Elite) ya no existen.",
      },
      {
        q: "¿Es Yuno la ticketera más barata?",
        a: "No hacemos esa afirmación. Los gastos al comprador de Yuno (4 %, mín. 0,99 €) superan la tarifa por entrada de Weezevent cuando la entrada cuesta más de unos 25 €. Lo que Yuno promete es 0 € de cuota y 0 % de comisión para el organizador, a un precio publicado. Compara el coste total con tu propio precio de entrada, usando las cifras públicas de la pregunta siguiente.",
      },
      {
        q: "¿Cuánto cobran otras ticketeras?",
        a: "Según sus páginas públicas, consultadas entre junio y septiembre de 2026. Shotgun: 10 % de comisión base sobre las ventas del organizador, negociable por contrato, más gastos al comprador. Weezevent: 2,5 % por entrada, mín. 0,99 € (se puede repercutir al comprador), con complementos de pago para cashless y staff. Xceed: 3 % por entrada, 15 % en las ventas del marketplace y entre 29 y 59 € al mes. Eventbrite: de 3,5 % + 0,49 € (Essentials) a 5,5 % + 0,99 € (Pro) por entrada. Fourvenues: cuota a consultar tras una demo. Los precios cambian: comprueba la web de cada proveedor.",
      },
      {
        q: "¿Cuándo llega el dinero a mi cuenta?",
        a: "Los pagos funcionan con Stripe Connect: el dinero llega directamente a tu propia cuenta, con tu nombre en el extracto del cliente. Yuno nunca retiene tus fondos.",
      },
      {
        q: "¿Cuánto cuesta el emailing?",
        a: "Los 15.000 emails al mes están incluidos en los 0 € de cuota. A partir de ahí son 10 € por cada 10.000 emails, sin cuota mensual.",
      },
      {
        q: "¿Hay contrato o permanencia?",
        a: "No hay contrato anual ni permanencia. Creas tu cuenta tú mismo en unos dos minutos, sin tarjeta.",
      },
    ],
  },
  related: {
    title: "Sigue explorando",
    links: [
      {
        label: "Software de reservados para discotecas",
        href: "/es/software-reservados-discoteca",
      },
      {
        label: "Software para RRPP: seguimiento y comisiones",
        href: "/es/software-rrpp-discoteca",
      },
      {
        label: "Reparto de ingresos discoteca × organizador",
        href: "/es/reparto-ingresos-discoteca-organizador",
      },
      {
        label: "Software de listas de invitados para discotecas",
        href: "/es/lista-invitados-discoteca-software",
      },
      { label: "Todas las funciones de Yuno (inicio)", href: "/es" },
      { label: "Alternativa a Fourvenues", href: "/es/alternativa-fourvenues" },
    ],
  },
  sources: {
    title: "Fuentes",
    items: [
      { label: "Shotgun Pro — sitio para organizadores", url: "https://pro.shotgun.live/en" },
      {
        label: "Shotgun Pro — gastos de servicio (centro de ayuda)",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/9666665025042",
      },
      {
        label: "Fourvenues — software para discotecas",
        url: "https://www.fourvenues.com/es/software-para-discotecas",
      },
    ],
    disclaimer:
      "Los nombres de terceros pertenecen a sus propietarios. Las cifras de Weezevent, Xceed y Eventbrite proceden de las páginas de precios públicas de cada proveedor, consultadas entre junio y septiembre de 2026. La información puede haber cambiado.",
  },
};

export const pricing = [en, fr, es];
