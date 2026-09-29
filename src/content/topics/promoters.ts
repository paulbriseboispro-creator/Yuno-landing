// Promoter tracking & commissions. Targets: "promoter tracking software", "club
// promoter app", "promoter commission tracking software" (EN), "logiciel promoteurs
// soirée", "commission promoteur soirée", "lien de suivi promoteur", "rémunérer ses
// promoteurs" (FR), "software para RRPP", "app RRPP discoteca", "comisiones RRPP",
// "cómo pagar a los RRPP" (ES). Facts: docs/yuno-context.md.
import type { TopicPageContent } from "../topic-types";

const UPDATED = "2026-09-29";
const TWINS = {
  en: "/promoter-tracking-software",
  fr: "/fr/logiciel-promoteurs-soiree",
  es: "/es/software-rrpp-discoteca",
};

const en: TopicPageContent = {
  id: "promoters",
  lang: "en",
  path: TWINS.en,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Promoter tracking software for clubs, with commissions | Yuno",
    description:
      "One tracked link per promoter per night, sales and entries counted live, commissions computed for you. No more spreadsheets. €0 subscription, 0% commission.",
    ogAlt: "Yuno — promoter tracking and commission software for clubs",
  },
  breadcrumb: { home: "Yuno", current: "Promoter tracking" },
  hero: {
    kicker: "Promoter tracking & commission software for clubs and organizers",
    title: "Give every promoter a tracked link. Stop arguing over the count.",
    sub: "A personal link per promoter per night, sales and entries counted live, the commission computed for you and settled in three tracked steps. No notebook, no WhatsApp screenshots, no spreadsheet at 5 a.m.",
    primary: "Create my free account",
    secondary: "Talk to the founder",
    note: ["No subscription", "0% commission on your price", "No app to install"],
  },
  answer: {
    title: "In short",
    paragraphs: [
      "Yuno is nightclub software that gives each promoter a personal tracked link for each night. Every ticket, table or guest-list sign-up made through that link is credited to the promoter, and every entry scanned at the door is credited to the right person through the guest list QR code. Sales and entries are counted live.",
      "The commission is computed automatically from those counts, so nobody re-adds anything by hand after the night. Settlement then goes through three tracked, timestamped steps: you and your promoter can both see what was validated, and when.",
      "How promoters are usually paid: a fixed amount per guest who enters, a fixed amount or share per ticket sold, or a percentage on tables — often a mix. Entry-based pay protects you from no-shows; sales-based pay rewards whoever pre-sells. Rates are agreed between you and each promoter. Yuno counts both sales and entries, so either basis is on screen.",
    ],
    bullets: [
      "€0 subscription, 0% commission for the club or organizer. The buyer pays a 4% service fee on tickets (min €0.99).",
      "Card processing (Stripe, 1.5% + €0.25) is paid by the club or organizer; the money goes straight to your own Stripe account.",
      "Promoter tracking is part of the same account as tickets, guest list, tables and drinks — not a separate tool.",
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "Everything to track, rank and pay your promoters",
    sub: "From the link you send on Monday to the settlement after the night.",
    items: [
      {
        title: "A personal tracked link per promoter, per night",
        body: "Each promoter gets their own link for each night. Whatever is bought through it is attributed to them, whether they post it on Instagram or send it in a WhatsApp group.",
      },
      {
        title: "Sales and entries counted live",
        body: "Watch each promoter's sales climb before the doors open, then see who actually walks in. Two numbers, one screen, no end-of-night counting.",
      },
      {
        title: "Commission computed automatically",
        body: "The commission comes from the counted sales and entries. You no longer rebuild it from a notebook, a chat thread and a door list.",
      },
      {
        title: "Guest list entries credited to the right promoter",
        body: "Free guest list before a set time, with a link per promoter. Each guest gets a QR code; when it is scanned at the door, the entry goes to the promoter who brought them.",
      },
      {
        title: "Promoter leaderboard",
        body: "A live ranking that motivates. For example: “Inès — 64 sales tonight, commission €128, #1 on the leaderboard”. A little competition sells tickets.",
      },
      {
        title: "Settlement in three tracked steps",
        body: "Every settlement runs through three timestamped steps. If a promoter asks “where is my commission?”, the answer is on screen, not in someone's memory.",
      },
    ],
  },
  table: {
    eyebrow: "The landscape",
    title: "How promoter tracking works elsewhere (public info, September 2026)",
    sub: "We only list what each provider publishes or what we found in its public pages. Where we found nothing, we say nothing.",
    head: ["", "Yuno", "Shotgun", "Fourvenues"],
    rows: [
      [
        "Personal tracked links for promoters",
        "Yes — one per promoter per night",
        "Yes — “Sales partners” tracking links",
        "Yes — personal sales links for each promoter",
      ],
      [
        "How commissions are worked out",
        "Computed automatically from live sales and entries, settled in three timestamped steps",
        "Calculated by hand: revenue goes back to the organizer, who pays the promoters himself",
        "RRPP management with automatic count at close and fixed or variable commissions",
      ],
      [
        "Tables and bar in the same account",
        "Yes — tickets, tables, drinks, door",
        "No VIP tables or bar in what we found",
        "Yes (full club suite)",
      ],
      [
        "Price for the club or organizer",
        "€0 subscription, 0% commission (published)",
        "Commission on the organizer's ticket sales",
        "Subscription on quote after a demo",
      ],
    ],
    footnote:
      "Sources: each provider's public pages, read in September 2026 (pro.shotgun.live, fourvenues.com). Features and prices change: check the provider's site before deciding. Yuno: yunoapp.eu, information updated 29 September 2026.",
  },
  steps: {
    eyebrow: "How it works",
    title: "Tracking your promoters in three steps",
    items: [
      {
        title: "Set up your night and your promoters",
        body: "Create the night, switch on tickets and the free guest list, and add your promoters. Each one gets a personal link for that night.",
      },
      {
        title: "Promoters share, you watch it live",
        body: "They post their link everywhere they already talk to their crowd. Sales and guest-list sign-ups land on their name, and the leaderboard moves in real time.",
      },
      {
        title: "Entries are credited, commissions are settled",
        body: "At the door, the guest list QR code credits the entry to the right promoter. The commission is computed, then settled in three tracked, timestamped steps.",
      },
    ],
  },
  proof: {
    eyebrow: "In real life",
    title: "Built with clubs in Madrid and Paris",
    sub: "Real numbers only. The leaderboard and guest-list screens described above are examples of the interface.",
    stats: [
      { value: "22", label: "partner clubs listed in Madrid, launched with Amoris" },
      { value: "3", label: "tracked, timestamped steps to settle a promoter's commission" },
      { value: "€0 · 0%", label: "subscription and commission for the club or organizer" },
      { value: "EN · FR · ES", label: "booking pages in three languages" },
    ],
    note: "In Paris, the first real night with a Parisian organizer ran on the Yuno guest list, with online sign-ups and a verified door scan.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Promoter tracking and commissions: your questions",
    items: [
      {
        q: "How do you pay club promoters?",
        a: "There are three common bases: a fixed amount per guest who enters, a fixed amount or a share per ticket sold, or a percentage on tables and bottles. Many clubs mix them, for example a base per entry plus a bonus for tables. Pay per entry protects you from no-shows; pay per sale rewards pre-selling. There is no standard rate: you agree it with each promoter. Yuno counts sales and entries live, so whichever basis you choose, the numbers are on screen.",
      },
      {
        q: "What is a promoter tracking link?",
        a: "A personal web address created for one promoter and one night. Anything bought or signed up through it is attributed to that promoter. In Yuno, each promoter gets their own link per night, and sales and entries are counted live.",
      },
      {
        q: "How do I stop disputes about who brought whom?",
        a: "By counting at the source instead of after the night. Sales and sign-ups come through the promoter's own link; entries are credited by the guest list QR code scanned at the door; the commission is computed from those counts; and settlement goes through three tracked, timestamped steps. Both sides see the same numbers.",
      },
      {
        q: "Can I track guest list entries per promoter?",
        a: "Yes. You can open a free guest list before a set time with a link per promoter. Each guest receives a QR code, and when it is scanned at the door the entry is credited to the promoter who brought them. For example, a screen can show “96 via Inès's link”.",
      },
      {
        q: "How does Yuno compute the commission?",
        a: "Automatically, from the sales and entries it has counted for each promoter on each night. You agree the rule with your promoter; Yuno does the arithmetic and keeps the record, so nobody rebuilds a tally from a chat thread.",
      },
      {
        q: "Can my promoters create their own account?",
        a: "Not as a self-serve account today. The club or organizer creates the account and invites its promoters. A promoter who wants to use Yuno can leave their details on the signup form and we get back to them.",
      },
      {
        q: "What does promoter tracking cost?",
        a: "Yuno charges the club or organizer €0 subscription and 0% commission. The buyer pays a 4% service fee on tickets, with a €0.99 minimum, and Stripe's card fee (1.5% + €0.25) is paid by the club or organizer. What you pay your promoters is between you and them; it is not a Yuno fee.",
      },
      {
        q: "Can I start with just the guest list and promoter links?",
        a: "Yes. Each night has one switch per pillar (tickets, tables, drinks), so you can begin with the free guest list and promoter links, and add the rest later.",
      },
    ],
  },
  related: {
    title: "Keep exploring",
    links: [
      { label: "Nightclub guest list software", href: "/nightclub-guest-list-software" },
      { label: "VIP table booking software", href: "/vip-table-booking-software" },
      { label: "Club × organizer revenue split", href: "/club-organizer-revenue-split" },
      { label: "The Shotgun alternative", href: "/alternative-shotgun" },
      { label: "Yuno pricing", href: "/pricing" },
      { label: "All Yuno features (home)", href: "/" },
    ],
  },
  sources: {
    title: "Sources",
    items: [
      { label: "Shotgun Pro — organizer site", url: "https://pro.shotgun.live/en" },
      {
        label: "Fourvenues — promoters management",
        url: "https://www.fourvenues.com/en/promoters-management",
      },
    ],
    disclaimer:
      "Third-party names belong to their owners. Information is taken from public pages and may have changed since.",
  },
};

const fr: TopicPageContent = {
  id: "promoters",
  lang: "fr",
  path: TWINS.fr,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Logiciel promoteurs soirée : suivi et commissions | Yuno",
    description:
      "Un lien de suivi par promoteur et par soirée, ventes et entrées en direct, commissions calculées seules. Fini le tableur. 0 € d'abonnement, 0 % de commission.",
    ogAlt: "Yuno — logiciel de suivi et de commissions des promoteurs de soirée",
  },
  breadcrumb: { home: "Yuno", current: "Suivi des promoteurs" },
  hero: {
    kicker: "Logiciel de suivi et de commissions des promoteurs pour clubs et organisateurs",
    title: "Donnez à chaque promoteur son lien de suivi. Fini les disputes sur le compte.",
    sub: "Un lien personnel par promoteur et par soirée, ventes et entrées comptées en direct, commission calculée pour vous et réglée en trois étapes tracées. Plus de carnet, de captures WhatsApp ni de tableur à 5 h du matin.",
    primary: "Créer mon compte gratuit",
    secondary: "Parler au fondateur",
    note: ["Sans abonnement", "0 % de commission sur votre prix", "Aucune app à installer"],
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "Yuno est un logiciel pour boîtes de nuit qui donne à chaque promoteur un lien de suivi personnel pour chaque soirée. Chaque billet, table ou inscription en guest list passé par ce lien est crédité au promoteur, et chaque entrée scannée à la porte est créditée au bon promoteur grâce au QR code de la guest list. Ventes et entrées sont comptées en direct.",
      "La commission est calculée automatiquement à partir de ces comptes : personne n'a à tout ré-additionner à la main après la soirée. Le règlement passe ensuite par trois étapes tracées et horodatées : vous et votre promoteur voyez ce qui a été validé, et quand.",
      "Comment rémunérer ses promoteurs (ou RP) : un montant fixe par invité qui entre, un montant fixe ou une part par billet vendu, ou un pourcentage sur les tables — souvent un mélange. La rémunération à l'entrée vous protège des no-shows ; celle à la vente récompense la prévente. Le taux se négocie avec chaque promoteur. Yuno compte à la fois les ventes et les entrées : les deux bases sont à l'écran.",
    ],
    bullets: [
      "0 € d'abonnement, 0 % de commission pour le club ou l'organisateur. L'acheteur paie 4 % de frais de service sur les billets (min. 0,99 €).",
      "Les frais de carte (Stripe, 1,5 % + 0,25 €) sont à la charge du club ou de l'organisateur ; l'argent va directement sur votre propre compte Stripe.",
      "Le suivi des promoteurs est dans le même compte que la billetterie, la guest list, les tables et les boissons — pas un outil de plus.",
    ],
  },
  features: {
    eyebrow: "Ce que vous obtenez",
    title: "Tout pour suivre, classer et rémunérer vos promoteurs",
    sub: "Du lien envoyé le lundi au règlement après la soirée.",
    items: [
      {
        title: "Un lien de suivi personnel par promoteur et par soirée",
        body: "Chaque promoteur a son propre lien pour chaque soirée. Tout ce qui est acheté via ce lien lui est attribué, qu'il le poste sur Instagram ou l'envoie dans un groupe WhatsApp.",
      },
      {
        title: "Ventes et entrées comptées en direct",
        body: "Regardez les ventes de chaque promoteur grimper avant l'ouverture, puis voyez qui entre vraiment. Deux chiffres, un seul écran, aucun comptage en fin de nuit.",
      },
      {
        title: "Commission calculée automatiquement",
        body: "La commission découle des ventes et des entrées comptées. Vous ne la reconstituez plus à partir d'un carnet, d'un fil de discussion et d'une liste de porte.",
      },
      {
        title: "Entrées de la guest list créditées au bon promoteur",
        body: "Guest list gratuite avant une heure donnée, avec un lien par promoteur. Chaque invité reçoit un QR code ; scanné à la porte, l'entrée revient au promoteur qui l'a amené.",
      },
      {
        title: "Classement des promoteurs",
        body: "Un classement en direct qui motive. Par exemple : « Inès — 64 ventes ce soir, commission de 128 €, n° 1 du classement ». Un peu de compétition fait vendre des billets.",
      },
      {
        title: "Règlement en trois étapes tracées",
        body: "Chaque règlement passe par trois étapes horodatées. Quand un promoteur demande « où est ma commission ? », la réponse est à l'écran, pas dans la mémoire de quelqu'un.",
      },
    ],
  },
  table: {
    eyebrow: "Le paysage",
    title: "Le suivi des promoteurs ailleurs (informations publiques, septembre 2026)",
    sub: "Nous ne citons que ce que chaque éditeur publie ou ce que nous avons trouvé dans ses pages publiques. Quand nous n'avons rien trouvé, nous ne disons rien.",
    head: ["", "Yuno", "Shotgun", "Fourvenues"],
    rows: [
      [
        "Liens de suivi personnels pour les promoteurs",
        "Oui — un par promoteur et par soirée",
        "Oui — liens de suivi « Partenaires de vente »",
        "Oui — liens de vente personnels pour chaque RRPP",
      ],
      [
        "Comment les commissions sont calculées",
        "Calcul automatique à partir des ventes et entrées en direct, réglées en trois étapes horodatées",
        "Calcul à la main : les revenus reviennent à l'organisateur, qui rémunère lui-même ses promoteurs",
        "Gestion des RRPP avec décompte automatique à la clôture et commissions fixes ou variables",
      ],
      [
        "Tables et bar dans le même compte",
        "Oui — billets, tables, boissons, porte",
        "Ni tables VIP ni bar dans ce que nous avons trouvé",
        "Oui (suite complète pour clubs)",
      ],
      [
        "Prix pour le club ou l'organisateur",
        "0 € d'abonnement, 0 % de commission (publié)",
        "Commission sur les ventes de billets de l'organisateur",
        "Abonnement sur devis après démo",
      ],
    ],
    footnote:
      "Sources : pages publiques de chaque éditeur, relevées en septembre 2026 (pro.shotgun.live, fourvenues.com). Les fonctions et les prix évoluent : vérifiez sur le site de l'éditeur avant de décider. Yuno : yunoapp.eu, informations mises à jour le 29 septembre 2026.",
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Suivre vos promoteurs en trois étapes",
    items: [
      {
        title: "Préparez votre soirée et vos promoteurs",
        body: "Créez la soirée, activez la billetterie et la guest list gratuite, puis ajoutez vos promoteurs. Chacun reçoit un lien personnel pour cette soirée.",
      },
      {
        title: "Les promoteurs partagent, vous suivez en direct",
        body: "Ils postent leur lien partout où ils parlent déjà à leur public. Ventes et inscriptions en guest list tombent à leur nom, et le classement bouge en temps réel.",
      },
      {
        title: "Les entrées sont créditées, les commissions réglées",
        body: "À la porte, le QR code de la guest list crédite l'entrée au bon promoteur. La commission est calculée, puis réglée en trois étapes tracées et horodatées.",
      },
    ],
  },
  proof: {
    eyebrow: "Dans la vraie vie",
    title: "Construit avec des clubs à Madrid et à Paris",
    sub: "Uniquement des chiffres réels. Les écrans de classement et de guest list décrits plus haut sont des exemples d'interface.",
    stats: [
      { value: "22", label: "clubs partenaires référencés à Madrid, lancement avec Amoris" },
      {
        value: "3",
        label: "étapes tracées et horodatées pour régler la commission d'un promoteur",
      },
      { value: "0 € · 0 %", label: "d'abonnement et de commission pour le club ou l'organisateur" },
      { value: "FR · EN · ES", label: "pages de réservation en trois langues" },
    ],
    note: "À Paris, la première vraie soirée avec un organisateur parisien a tourné sur la guest list Yuno, avec inscriptions en ligne et scan de porte vérifié.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Suivi et commissions des promoteurs : vos questions",
    items: [
      {
        q: "Comment rémunérer ses promoteurs de soirée ?",
        a: "Trois bases reviennent le plus : un montant fixe par invité qui entre, un montant fixe ou une part par billet vendu, ou un pourcentage sur les tables et les bouteilles. Beaucoup de clubs les mélangent, par exemple un fixe à l'entrée plus une prime sur les tables. Payer à l'entrée vous protège des no-shows ; payer à la vente récompense la prévente. Il n'existe pas de taux standard : il se convient avec chaque promoteur. Yuno compte les ventes et les entrées en direct, donc quelle que soit la base choisie, les chiffres sont à l'écran.",
      },
      {
        q: "Qu'est-ce qu'un lien de suivi promoteur ?",
        a: "Une adresse web personnelle créée pour un promoteur et une soirée. Tout achat ou inscription passé par ce lien lui est attribué. Dans Yuno, chaque promoteur a son propre lien par soirée, et les ventes comme les entrées sont comptées en direct.",
      },
      {
        q: "Comment éviter les disputes sur « qui a amené qui » ?",
        a: "En comptant à la source plutôt qu'après la soirée. Les ventes et inscriptions passent par le lien du promoteur ; les entrées sont créditées par le QR code de la guest list scanné à la porte ; la commission est calculée à partir de ces comptes ; et le règlement passe par trois étapes tracées et horodatées. Les deux parties voient les mêmes chiffres.",
      },
      {
        q: "Puis-je suivre les entrées de la guest list par promoteur ?",
        a: "Oui. Vous pouvez ouvrir une guest list gratuite avant une heure donnée, avec un lien par promoteur. Chaque invité reçoit un QR code, et quand il est scanné à la porte, l'entrée est créditée au promoteur qui l'a amené. Par exemple, un écran peut afficher « 96 via le lien d'Inès ».",
      },
      {
        q: "Comment Yuno calcule-t-il la commission d'un promoteur ?",
        a: "Automatiquement, à partir des ventes et des entrées comptées pour chaque promoteur et chaque soirée. Vous convenez de la règle avec votre promoteur ; Yuno fait le calcul et garde la trace, si bien que personne ne reconstitue un décompte à partir d'un fil de discussion.",
      },
      {
        q: "Mes promoteurs peuvent-ils créer leur propre compte ?",
        a: "Pas en libre-service aujourd'hui. C'est le club ou l'organisateur qui crée le compte et y invite ses promoteurs. Un promoteur qui veut utiliser Yuno peut laisser ses coordonnées dans le formulaire d'inscription et nous le recontactons.",
      },
      {
        q: "Combien coûte le suivi des promoteurs ?",
        a: "Yuno facture 0 € d'abonnement et 0 % de commission au club ou à l'organisateur. L'acheteur paie 4 % de frais de service sur les billets, avec un minimum de 0,99 €, et les frais de carte de Stripe (1,5 % + 0,25 €) sont à la charge du club ou de l'organisateur. Ce que vous versez à vos promoteurs se règle entre vous et eux : ce ne sont pas des frais Yuno.",
      },
      {
        q: "Puis-je commencer par la seule guest list et les liens promoteurs ?",
        a: "Oui. Chaque soirée a un interrupteur par pilier (billets, tables, boissons) : vous pouvez démarrer avec la guest list gratuite et les liens promoteurs, puis ajouter le reste plus tard.",
      },
    ],
  },
  related: {
    title: "Pour aller plus loin",
    links: [
      { label: "Logiciel de guest list pour soirées", href: "/fr/guest-list-soiree-logiciel" },
      {
        label: "Réservation de tables VIP en discothèque",
        href: "/fr/reservation-table-vip-discotheque",
      },
      {
        label: "Contrat et répartition club × organisateur",
        href: "/fr/contrat-club-organisateur",
      },
      { label: "L'alternative à Shotgun", href: "/fr/alternative-shotgun" },
      { label: "Tarifs Yuno", href: "/fr/pricing" },
      { label: "Toutes les fonctions de Yuno (accueil)", href: "/fr" },
    ],
  },
  sources: {
    title: "Sources",
    items: [
      { label: "Shotgun Pro — site organisateurs", url: "https://pro.shotgun.live/en" },
      {
        label: "Fourvenues — gestion des RRPP (promoters management)",
        url: "https://www.fourvenues.com/en/promoters-management",
      },
    ],
    disclaimer:
      "Les noms tiers appartiennent à leurs propriétaires. Les informations proviennent de pages publiques et ont pu changer depuis.",
  },
};

const es: TopicPageContent = {
  id: "promoters",
  lang: "es",
  path: TWINS.es,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Software para RRPP de discoteca: enlaces y comisiones | Yuno",
    description:
      "Un enlace de seguimiento por RRPP y por noche, ventas y entradas en directo, comisiones calculadas solas. Adiós al Excel. 0 € de cuota y 0 % de comisión.",
    ogAlt: "Yuno — software de seguimiento y comisiones para RRPP de discoteca",
  },
  breadcrumb: { home: "Yuno", current: "Software para RRPP" },
  hero: {
    kicker: "Software de seguimiento y comisiones de RRPP para discotecas y organizadores",
    title: "Dale a cada RRPP su enlace de seguimiento. Se acabaron las discusiones por la cuenta.",
    sub: "Un enlace personal por RRPP y por noche, ventas y entradas contadas en directo, la comisión calculada por ti y liquidada en tres pasos registrados. Sin libreta, sin capturas de WhatsApp, sin Excel a las 5 de la mañana.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    note: ["Sin cuota mensual", "0 % de comisión sobre tu precio", "Sin app que instalar"],
  },
  answer: {
    title: "En breve",
    paragraphs: [
      "Yuno es un software para discotecas que da a cada RRPP un enlace de seguimiento personal para cada noche. Cada entrada, mesa o apuntado a la lista que pase por ese enlace se le atribuye, y cada entrada escaneada en la puerta se acredita al RRPP correcto gracias al QR de la lista de invitados. Ventas y entradas se cuentan en directo.",
      "La comisión se calcula automáticamente a partir de esos recuentos, así que nadie tiene que volver a sumar a mano después de la noche. La liquidación pasa después por tres pasos registrados y con fecha y hora: tú y tu RRPP veis qué se validó y cuándo.",
      "Cómo se paga a los RRPP: una cantidad fija por invitado que entra, una cantidad fija o un porcentaje por entrada vendida, o un porcentaje sobre las mesas — a menudo una mezcla. Pagar por entrada te protege de los no-shows; pagar por venta premia la preventa. La tarifa se pacta con cada RRPP. Yuno cuenta ventas y entradas, así que las dos bases están en pantalla.",
    ],
    bullets: [
      "0 € de cuota y 0 % de comisión para la discoteca o el organizador. El comprador paga un 4 % de gastos de servicio en las entradas (mín. 0,99 €).",
      "Los gastos de tarjeta (Stripe, 1,5 % + 0,25 €) los paga la discoteca o el organizador; el dinero va directo a tu propia cuenta de Stripe.",
      "El seguimiento de RRPP vive en la misma cuenta que las entradas, la lista, las mesas y las copas — no es otra herramienta más.",
    ],
  },
  features: {
    eyebrow: "Qué incluye",
    title: "Todo para seguir, clasificar y pagar a tus RRPP",
    sub: "Desde el enlace que mandas el lunes hasta la liquidación tras la noche.",
    items: [
      {
        title: "Un enlace personal por RRPP y por noche",
        body: "Cada RRPP tiene su propio enlace para cada noche. Todo lo que se compre por él se le atribuye, lo publique en Instagram o lo mande a un grupo de WhatsApp.",
      },
      {
        title: "Ventas y entradas contadas en directo",
        body: "Mira cómo suben las ventas de cada RRPP antes de abrir puertas y luego quién entra de verdad. Dos cifras, una sola pantalla, sin recuento al final de la noche.",
      },
      {
        title: "Comisión calculada automáticamente",
        body: "La comisión sale de las ventas y entradas contadas. Ya no la reconstruyes con una libreta, un chat y una lista de puerta.",
      },
      {
        title: "Entradas de la lista acreditadas al RRPP correcto",
        body: "Lista gratuita hasta una hora concreta, con un enlace por RRPP. Cada invitado recibe un QR; al escanearlo en la puerta, la entrada se acredita al RRPP que lo trajo.",
      },
      {
        title: "Ranking de RRPP",
        body: "Un ranking en directo que motiva. Por ejemplo: «Inès — 64 ventas esta noche, comisión de 128 €, n.º 1 del ranking». Un poco de competencia vende entradas.",
      },
      {
        title: "Liquidación en tres pasos registrados",
        body: "Cada liquidación pasa por tres pasos con fecha y hora. Si un RRPP pregunta «¿dónde está mi comisión?», la respuesta está en pantalla, no en la memoria de alguien.",
      },
    ],
  },
  table: {
    eyebrow: "El panorama",
    title: "Cómo se sigue a los RRPP en otras plataformas (información pública, septiembre 2026)",
    sub: "Solo citamos lo que cada proveedor publica o lo que encontramos en sus páginas públicas. Donde no encontramos nada, no decimos nada.",
    head: ["", "Yuno", "Shotgun", "Fourvenues"],
    rows: [
      [
        "Enlaces de seguimiento personales para RRPP",
        "Sí — uno por RRPP y por noche",
        "Sí — enlaces de seguimiento de «Sales partners»",
        "Sí — enlaces de venta personales para cada RRPP",
      ],
      [
        "Cómo se calculan las comisiones",
        "Cálculo automático a partir de ventas y entradas en directo, liquidadas en tres pasos con fecha y hora",
        "Cálculo a mano: los ingresos vuelven al organizador, que paga él mismo a sus RRPP",
        "Gestión de RRPP con recuento automático al cierre y comisiones fijas o variables",
      ],
      [
        "Mesas y barra en la misma cuenta",
        "Sí — entradas, mesas, copas, puerta",
        "Ni mesas VIP ni barra en lo que encontramos",
        "Sí (suite completa para discotecas)",
      ],
      [
        "Precio para la discoteca o el organizador",
        "0 € de cuota, 0 % de comisión (publicado)",
        "Comisión sobre las ventas de entradas del organizador",
        "Suscripción a consultar tras una demo",
      ],
    ],
    footnote:
      "Fuentes: páginas públicas de cada proveedor, consultadas en septiembre de 2026 (pro.shotgun.live, fourvenues.com). Las funciones y los precios cambian: comprueba en la web del proveedor antes de decidir. Yuno: yunoapp.eu, información actualizada el 29 de septiembre de 2026.",
  },
  steps: {
    eyebrow: "Cómo funciona",
    title: "Seguir a tus RRPP en tres pasos",
    items: [
      {
        title: "Prepara tu noche y tus RRPP",
        body: "Crea la noche, activa la venta de entradas y la lista gratuita, y añade a tus RRPP. Cada uno recibe un enlace personal para esa noche.",
      },
      {
        title: "Los RRPP comparten, tú lo ves en directo",
        body: "Publican su enlace donde ya hablan con su gente. Ventas y apuntados a la lista caen a su nombre, y el ranking se mueve en tiempo real.",
      },
      {
        title: "Se acreditan las entradas y se liquidan las comisiones",
        body: "En la puerta, el QR de la lista acredita la entrada al RRPP correcto. La comisión se calcula y luego se liquida en tres pasos registrados y con fecha y hora.",
      },
    ],
  },
  proof: {
    eyebrow: "En la vida real",
    title: "Hecho con discotecas de Madrid y París",
    sub: "Solo cifras reales. Las pantallas de ranking y de lista descritas arriba son ejemplos de la interfaz.",
    stats: [
      { value: "22", label: "discotecas asociadas en Madrid, lanzamiento con Amoris" },
      {
        value: "3",
        label: "pasos registrados y con fecha y hora para liquidar la comisión de un RRPP",
      },
      { value: "0 € · 0 %", label: "de cuota y de comisión para la discoteca o el organizador" },
      { value: "ES · EN · FR", label: "páginas de reserva en tres idiomas" },
    ],
    note: "En París, la primera noche real con un organizador parisino funcionó con la lista de invitados de Yuno, con apuntados online y escaneo de puerta verificado.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Seguimiento y comisiones de RRPP: tus preguntas",
    items: [
      {
        q: "¿Cómo se paga a los RRPP de una discoteca?",
        a: "Hay tres bases habituales: una cantidad fija por invitado que entra, una cantidad fija o un porcentaje por entrada vendida, o un porcentaje sobre mesas y botellas. Muchas discotecas las combinan, por ejemplo un fijo por entrada más un extra por las mesas. Pagar por entrada te protege de los no-shows; pagar por venta premia la preventa. No hay una tarifa estándar: se pacta con cada RRPP. Yuno cuenta ventas y entradas en directo, así que elijas la base que elijas, las cifras están en pantalla.",
      },
      {
        q: "¿Qué es un enlace de seguimiento de RRPP?",
        a: "Una dirección web personal creada para un RRPP y una noche. Toda compra o apuntado que pase por ella se le atribuye. En Yuno, cada RRPP tiene su propio enlace por noche, y tanto las ventas como las entradas se cuentan en directo.",
      },
      {
        q: "¿Cómo evito las discusiones sobre quién trajo a quién?",
        a: "Contando en origen, no después de la noche. Las ventas y los apuntados pasan por el enlace del RRPP; las entradas se acreditan con el QR de la lista escaneado en la puerta; la comisión se calcula a partir de esos recuentos; y la liquidación pasa por tres pasos registrados y con fecha y hora. Las dos partes ven las mismas cifras.",
      },
      {
        q: "¿Puedo seguir las entradas de la lista de invitados por RRPP?",
        a: "Sí. Puedes abrir una lista gratuita hasta una hora concreta con un enlace por RRPP. Cada invitado recibe un QR y, al escanearlo en la puerta, la entrada se acredita al RRPP que lo trajo. Por ejemplo, una pantalla puede mostrar «96 con el enlace de Inès».",
      },
      {
        q: "¿Cómo calcula Yuno las comisiones de los RRPP?",
        a: "Automáticamente, a partir de las ventas y entradas contadas para cada RRPP y cada noche. Tú pactas la regla con tu RRPP; Yuno hace la cuenta y guarda el registro, así nadie reconstruye un recuento a partir de un chat.",
      },
      {
        q: "¿Pueden mis RRPP crear su propia cuenta?",
        a: "Hoy no como cuenta de autoservicio. La discoteca o el organizador crea la cuenta e invita a sus RRPP. Un RRPP que quiera usar Yuno puede dejar sus datos en el formulario de registro y le contestamos.",
      },
      {
        q: "¿Cuánto cuesta el seguimiento de RRPP?",
        a: "Yuno cobra a la discoteca o al organizador 0 € de cuota y 0 % de comisión. El comprador paga un 4 % de gastos de servicio en las entradas, con un mínimo de 0,99 €, y los gastos de tarjeta de Stripe (1,5 % + 0,25 €) los paga la discoteca o el organizador. Lo que pagues a tus RRPP se acuerda entre vosotros: no son gastos de Yuno.",
      },
      {
        q: "¿Puedo empezar solo con la lista y los enlaces de RRPP?",
        a: "Sí. Cada noche tiene un interruptor por pilar (entradas, mesas, copas): puedes empezar con la lista gratuita y los enlaces de RRPP, y añadir el resto más adelante.",
      },
    ],
  },
  related: {
    title: "Sigue explorando",
    links: [
      {
        label: "Software de listas de invitados para discotecas",
        href: "/es/lista-invitados-discoteca-software",
      },
      {
        label: "Software de reservados para discotecas",
        href: "/es/software-reservados-discoteca",
      },
      {
        label: "Reparto de ingresos discoteca × organizador",
        href: "/es/reparto-ingresos-discoteca-organizador",
      },
      { label: "Alternativa a Fourvenues", href: "/es/alternativa-fourvenues" },
      { label: "Precios de Yuno", href: "/es/precios" },
      { label: "Todas las funciones de Yuno (inicio)", href: "/es" },
    ],
  },
  sources: {
    title: "Fuentes",
    items: [
      { label: "Shotgun Pro — web para organizadores", url: "https://pro.shotgun.live/en" },
      {
        label: "Fourvenues — gestión de RRPP (promoters management)",
        url: "https://www.fourvenues.com/en/promoters-management",
      },
    ],
    disclaimer:
      "Los nombres de terceros pertenecen a sus propietarios. La información procede de páginas públicas y puede haber cambiado.",
  },
};

export const promoters = [en, fr, es];
