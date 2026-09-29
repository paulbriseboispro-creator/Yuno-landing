// Club × organizer revenue split. Targets: "how to split revenue between club and
// event organizer", "nightclub promoter contract revenue share", "club night door
// deal split" (EN), "contrat discothèque organisateur", "partage des recettes soirée
// club organisateur", "répartition recettes billetterie bar entrée" (FR), "reparto de
// ingresos discoteca organizador", "contrato discoteca promotora", "cómo repartir la
// barra y la puerta" (ES). Facts: docs/yuno-context.md ("Money" section). Generic deal
// structures are industry-common, phrased carefully; no legal advice.
import type { TopicPageContent } from "../topic-types";

const UPDATED = "2026-09-29";
const TWINS = {
  en: "/club-organizer-revenue-split",
  fr: "/fr/contrat-club-organisateur",
  es: "/es/reparto-ingresos-discoteca-organizador",
};

const en: TopicPageContent = {
  id: "revenue-split",
  lang: "en",
  path: TWINS.en,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "How to split revenue between a club and an organizer | Yuno",
    description:
      "Door, bar, tickets, tables: the usual club and organizer deal structures, the classic disputes, and a contract plus closing statement signed inside Yuno.",
    ogAlt: "Yuno — club × organizer contract and revenue split",
  },
  breadcrumb: { home: "Yuno", current: "Club × organizer revenue split" },
  hero: {
    kicker: "Club × organizer contract & revenue split for club nights",
    title: "Split the night's money without the spreadsheet and the argument.",
    sub: "Sign the deal between club and organizer inside Yuno — pillar by pillar or as a tiered revenue share. At closing the club declares the bar and door takings, the organizer accepts or disputes, and nothing moves until both sides agree.",
    primary: "Create my free account",
    secondary: "Talk to the founder",
    note: [
      "Contract inside Yuno",
      "Nothing moves without both sides",
      "Each side paid on its own Stripe",
    ],
  },
  answer: {
    title: "In short",
    paragraphs: [
      "There is no single standard, but club nights are usually split in one of a few ways: a percentage of the door or tickets, a percentage of the bar, a minimum guarantee for one side, a revenue share that changes once sales pass a threshold, or a different split for each source of money (tickets, tables, bar). Most disputes are not about the percentages: they are about who counts the bar and door takings, and when the organizer gets paid.",
      "Yuno turns the agreement into a contract signed inside the platform, either pillar by pillar (tickets, tables, bar) or as a tiered revenue share. At closing, the club declares the bar and door takings, the organizer accepts or disputes them, and nothing moves without both sides agreeing. Each side is paid on its own Stripe account.",
    ],
    bullets: [
      "For example, a contract can read “Tickets 70/30 · Tables 50/50”: an illustration of a per-pillar split, not a recommended deal.",
      "€0 subscription and 0% commission for the club and the organizer. The buyer pays a 4% service fee on tickets (min €0.99), 4% on tables (capped at €25) and 3% on drinks.",
      "Card processing (Stripe, 1.5% + €0.25) is paid by the club or organizer; Yuno never holds the funds.",
      "This page describes common practice and how Yuno works. It is not legal advice: have your contract reviewed.",
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "One contract, one statement, one version of the truth",
    sub: "What usually lives in WhatsApp messages, spreadsheets and bank transfers, kept in one place.",
    items: [
      {
        title: "Contract signed inside Yuno",
        body: "Club and organizer agree the terms in the platform, not in a chat thread. The deal for a night or a partnership is written down where both sides can find it.",
      },
      {
        title: "Pillar by pillar",
        body: "Set a split for tickets, another for tables, another for the bar. For example: Tickets 70/30 · Tables 50/50. Each pillar follows its own rule.",
      },
      {
        title: "Or a tiered revenue share",
        body: "Prefer one shared pot? Define a tiered share so the split can change as sales pass a threshold, instead of renegotiating after a good night.",
      },
      {
        title: "Closing declared by the club",
        body: "At the end of the night the club declares the bar and door takings. The organizer sees the figures and the resulting statement, and accepts or disputes them.",
      },
      {
        title: "Nothing moves without both sides",
        body: "A disputed figure stays visible and open. The settlement only goes through once the club and the organizer both agree, so nobody is paid on a number the other side has not seen.",
      },
      {
        title: "Paid on your own Stripe account",
        body: "Money lands directly on each side's Stripe account, under their own name. Yuno never holds funds, and refunds, invoices and accounting exports live in the dashboard.",
      },
    ],
  },
  table: {
    eyebrow: "Typical deals",
    title: "Common ways clubs and organizers split a night",
    sub: "Generic structures seen across club nights. Every deal is negotiated case by case: these are examples, not rules.",
    head: ["Structure", "How it works", "Watch out for"],
    rows: [
      [
        "Percentage of the door or tickets",
        "The organizer and the club share ticket and door sales at an agreed percentage.",
        "Free entries, guest list and door sales counted in different places.",
      ],
      [
        "Percentage of the bar",
        "The organizer receives a share of the bar takings on the night, or above a baseline.",
        "The club is the one who counts the bar: agree what is included (discounts, staff drinks, VIP bottles).",
      ],
      [
        "Minimum guarantee",
        "One side is guaranteed a fixed amount, then the share applies above it (or the higher of the two).",
        "Who carries the risk on a slow night, and what happens if the night is cancelled.",
      ],
      [
        "Tiered revenue share",
        "The split changes once sales pass a threshold, for example a larger share for the organizer above a set turnover.",
        "Thresholds that are unclear: gross or net, with or without tables and bar.",
      ],
      [
        "Per-pillar split",
        "A different split for each source: tickets, tables, bar. For example, Tickets 70/30 · Tables 50/50.",
        "Gaps between pillars: who owns the table deposit, and who pays the fees.",
      ],
    ],
    footnote:
      "Illustrative structures based on common industry practice, not statistics and not recommendations. Yuno supports a per-pillar split and a tiered revenue share. Have your contract reviewed by a professional: this is not legal advice.",
  },
  steps: {
    eyebrow: "How it works",
    title: "From handshake to settlement in three steps",
    items: [
      {
        title: "Sign the deal inside Yuno",
        body: "Club and organizer agree the terms in the platform: a split per pillar (tickets, tables, bar) or a tiered revenue share. Both sides see the same contract.",
      },
      {
        title: "Sell and run the night",
        body: "Tickets, tables and drinks are sold through Yuno, the door is scanned, and the money reaches each side's own Stripe account. Promoter commissions are computed automatically if you work with promoters.",
      },
      {
        title: "Close the night, together",
        body: "The club declares the bar and door takings. The organizer accepts or disputes. Once both agree, the statement is settled — and until then, nothing moves.",
      },
    ],
  },
  proof: {
    eyebrow: "Facts",
    title: "Built for the club × organizer relationship",
    stats: [
      { value: "€0 · 0%", label: "subscription and commission for the club and the organizer" },
      { value: "3", label: "pillars you can split separately: tickets, tables and drinks" },
      { value: "22", label: "partner clubs listed in Madrid, launched with Amoris" },
      { value: "EN · FR · ES", label: "one platform in three languages" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Club × organizer revenue split: your questions",
    items: [
      {
        q: "How do I split revenue between a club and an event organizer?",
        a: "Agree in writing which sources are shared (tickets, tables, bar, door), at what percentage, and who counts what. Common structures are a percentage of the door, a percentage of the bar, a minimum guarantee, a tiered share above a threshold, or a different split per source. In Yuno the contract is signed inside the platform, pillar by pillar or as a tiered revenue share.",
      },
      {
        q: "What is a typical nightclub promoter contract revenue share?",
        a: "There is no universal figure: it depends on the club, the night, the organizer's audience and who takes the risk. Rather than quote a percentage, this page lists the structures that are commonly used. Yuno lets you write yours in the contract, for example Tickets 70/30 · Tables 50/50 (an illustration, not a recommendation).",
      },
      {
        q: "What is a door deal for a club night?",
        a: "A door deal means the organizer and the club share what comes in at the door and through ticket sales, usually at an agreed percentage, sometimes with a minimum guarantee. The classic problem is agreeing on the count: online tickets, door sales and free entries can sit in different places.",
      },
      {
        q: "Who counts the bar and door takings, and how do we avoid disputes?",
        a: "Usually the club, since it runs the bar and the door. To avoid disputes, both sides should see the same figures. In Yuno the club declares the bar and door takings at closing, the organizer accepts or disputes, and the settlement waits until both sides agree.",
      },
      {
        q: "When does the organizer get paid?",
        a: "That is the second classic dispute: too often it is “when the club sends a transfer”. In Yuno, each side is paid on its own Stripe account, and the settlement of the shared amounts goes through once the club and the organizer have both agreed the closing statement.",
      },
      {
        q: "Can we split tickets, tables and bar differently?",
        a: "Yes. The contract can set a split per pillar, for example Tickets 70/30 · Tables 50/50, or use a tiered revenue share instead. Each night has one switch per pillar, so you can also start with a single pillar.",
      },
      {
        q: "Does Yuno take a commission on the split?",
        a: "No. Yuno charges the club and the organizer €0 subscription and 0% commission. The buyer pays a service fee: 4% on tickets (min €0.99), 4% on tables (capped at €25), 3% on drinks. Stripe card fees (1.5% + €0.25) are paid by the club or organizer.",
      },
      {
        q: "Do other ticketing platforms offer a club × organizer contract?",
        a: "We have not found a club × organizer contract and statement in the public documentation of Shotgun, Weezevent or Xceed, which we reviewed between June and September 2026. If one of them publishes it since, tell us and we will update this page.",
      },
      {
        q: "Is this legal advice?",
        a: "No. This page explains common practice and how Yuno works. Contract terms, taxes and liability depend on your situation and country: have your contract reviewed by a professional.",
      },
    ],
  },
  related: {
    title: "Keep exploring",
    links: [
      { label: "VIP table booking software", href: "/vip-table-booking-software" },
      { label: "Promoter tracking & commission software", href: "/promoter-tracking-software" },
      { label: "Nightclub guest list software", href: "/nightclub-guest-list-software" },
      { label: "Yuno pricing", href: "/pricing" },
      { label: "All Yuno features (home)", href: "/" },
    ],
  },
};

const fr: TopicPageContent = {
  id: "revenue-split",
  lang: "fr",
  path: TWINS.fr,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Contrat discothèque organisateur : partage des recettes | Yuno",
    description:
      "Entrée, bar, billets, tables : les modèles de partage courants entre club et organisateur, les litiges classiques, et un contrat signé dans Yuno avec clôture.",
    ogAlt: "Yuno — contrat et partage des recettes club × organisateur",
  },
  breadcrumb: { home: "Yuno", current: "Contrat club × organisateur" },
  hero: {
    kicker: "Contrat club × organisateur et partage des recettes de soirée",
    title: "Partagez l'argent de la soirée sans tableur et sans dispute.",
    sub: "Signez l'accord entre le club et l'organisateur dans Yuno — pilier par pilier ou en partage par paliers. À la clôture, le club déclare les recettes du bar et de l'entrée, l'organisateur accepte ou conteste, et rien ne bouge tant que les deux ne sont pas d'accord.",
    primary: "Créer mon compte gratuit",
    secondary: "Parler au fondateur",
    note: [
      "Contrat signé dans Yuno",
      "Rien ne bouge sans les deux parties",
      "Chacun payé sur son Stripe",
    ],
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "Il n'existe pas de standard unique, mais les soirées club se partagent le plus souvent de quelques façons : un pourcentage sur l'entrée ou la billetterie, un pourcentage sur le bar, un minimum garanti pour l'une des parties, un partage qui change au-delà d'un palier de ventes, ou une répartition différente pour chaque source (billets, tables, bar). La plupart des litiges ne portent pas sur les pourcentages, mais sur qui compte les recettes du bar et de l'entrée, et sur le moment où l'organisateur est payé.",
      "Yuno transforme l'accord en contrat signé dans la plateforme, pilier par pilier (billets, tables, bar) ou en partage par paliers. À la clôture, le club déclare les recettes du bar et de l'entrée, l'organisateur les accepte ou les conteste, et rien ne bouge sans l'accord des deux parties. Chacun est payé sur son propre compte Stripe.",
    ],
    bullets: [
      "Par exemple, un contrat peut dire « Billets 70/30 · Tables 50/50 » : une illustration d'un partage par pilier, pas une recommandation.",
      "0 € d'abonnement et 0 % de commission pour le club et l'organisateur. L'acheteur paie 4 % de frais de service sur les billets (min. 0,99 €), 4 % sur les tables (plafonnés à 25 €) et 3 % sur les boissons.",
      "Les frais de carte (Stripe, 1,5 % + 0,25 €) sont à la charge du club ou de l'organisateur ; Yuno ne détient jamais les fonds.",
      "Cette page décrit les pratiques courantes et le fonctionnement de Yuno. Ce n'est pas un conseil juridique : faites relire votre contrat.",
    ],
  },
  features: {
    eyebrow: "Ce que vous obtenez",
    title: "Un contrat, un décompte, une seule version des faits",
    sub: "Ce qui vit d'habitude dans des messages WhatsApp, des tableurs et des virements, réuni au même endroit.",
    items: [
      {
        title: "Contrat signé dans Yuno",
        body: "Le club et l'organisateur fixent les conditions dans la plateforme, pas dans un fil de discussion. L'accord d'une soirée ou d'un partenariat est écrit là où les deux parties le retrouvent.",
      },
      {
        title: "Pilier par pilier",
        body: "Définissez un partage pour les billets, un autre pour les tables, un autre pour le bar. Par exemple : Billets 70/30 · Tables 50/50. Chaque pilier suit sa propre règle.",
      },
      {
        title: "Ou un partage par paliers",
        body: "Vous préférez une seule cagnotte ? Définissez un partage par paliers : la répartition évolue quand les ventes passent un seuil, au lieu de renégocier après une bonne soirée.",
      },
      {
        title: "Clôture déclarée par le club",
        body: "En fin de soirée, le club déclare les recettes du bar et de l'entrée. L'organisateur voit les chiffres et le décompte qui en résulte, puis les accepte ou les conteste.",
      },
      {
        title: "Rien ne bouge sans les deux parties",
        body: "Un chiffre contesté reste visible et ouvert. Le règlement ne passe qu'une fois le club et l'organisateur d'accord : personne n'est payé sur un montant que l'autre n'a pas vu.",
      },
      {
        title: "Payé sur votre propre compte Stripe",
        body: "L'argent arrive directement sur le compte Stripe de chacun, à son nom. Yuno ne détient jamais les fonds ; remboursements, factures et exports comptables sont dans le tableau de bord.",
      },
    ],
  },
  table: {
    eyebrow: "Les accords courants",
    title: "Les façons courantes de partager une soirée entre club et organisateur",
    sub: "Des structures génériques qu'on rencontre sur les soirées club. Chaque accord se négocie au cas par cas : ce sont des exemples, pas des règles.",
    head: ["Modèle", "Comment ça marche", "Points de vigilance"],
    rows: [
      [
        "Pourcentage sur l'entrée ou la billetterie",
        "L'organisateur et le club se partagent les ventes de billets et de l'entrée selon un pourcentage convenu.",
        "Entrées gratuites, guest list et ventes à la porte comptées à des endroits différents.",
      ],
      [
        "Pourcentage sur le bar",
        "L'organisateur reçoit une part des recettes du bar le soir même, ou au-delà d'un seuil de référence.",
        "C'est le club qui compte le bar : précisez ce qui est inclus (remises, consommations du staff, bouteilles VIP).",
      ],
      [
        "Minimum garanti",
        "Une des parties est assurée d'un montant fixe, puis le partage s'applique au-delà (ou le plus élevé des deux).",
        "Qui porte le risque un soir creux, et ce qui se passe si la soirée est annulée.",
      ],
      [
        "Partage par paliers",
        "La répartition change quand les ventes passent un seuil, par exemple une part plus grande pour l'organisateur au-delà d'un chiffre d'affaires fixé.",
        "Des seuils flous : brut ou net, avec ou sans tables et bar.",
      ],
      [
        "Répartition par pilier",
        "Un partage différent par source : billets, tables, bar. Par exemple, Billets 70/30 · Tables 50/50.",
        "Les zones grises entre piliers : à qui revient l'acompte d'une table, et qui paie les frais.",
      ],
    ],
    footnote:
      "Structures données à titre d'illustration, d'après les pratiques courantes du secteur : ce ne sont ni des statistiques ni des recommandations. Yuno gère un partage par pilier et un partage par paliers. Faites relire votre contrat par un professionnel : ceci n'est pas un conseil juridique.",
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "De la poignée de main au règlement en trois étapes",
    items: [
      {
        title: "Signez l'accord dans Yuno",
        body: "Le club et l'organisateur fixent les conditions dans la plateforme : un partage par pilier (billets, tables, bar) ou un partage par paliers. Les deux parties voient le même contrat.",
      },
      {
        title: "Vendez et pilotez la soirée",
        body: "Billets, tables et boissons se vendent via Yuno, l'entrée est scannée et l'argent arrive sur le compte Stripe de chacun. Les commissions des promoteurs sont calculées automatiquement si vous travaillez avec eux.",
      },
      {
        title: "Clôturez la soirée, à deux",
        body: "Le club déclare les recettes du bar et de l'entrée. L'organisateur accepte ou conteste. Quand les deux sont d'accord, le décompte est réglé — et d'ici là, rien ne bouge.",
      },
    ],
  },
  proof: {
    eyebrow: "Repères",
    title: "Pensé pour la relation club × organisateur",
    stats: [
      { value: "0 € · 0 %", label: "d'abonnement et de commission pour le club et l'organisateur" },
      { value: "3", label: "piliers à partager séparément : billets, tables et boissons" },
      { value: "22", label: "clubs partenaires référencés à Madrid, lancement avec Amoris" },
      { value: "FR · EN · ES", label: "une plateforme en trois langues" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Partage des recettes club × organisateur : vos questions",
    items: [
      {
        q: "Comment partager les recettes entre une discothèque et un organisateur ?",
        a: "Convenez par écrit des sources partagées (billets, tables, bar, entrée), du pourcentage et de qui compte quoi. Les modèles courants : un pourcentage sur l'entrée, un pourcentage sur le bar, un minimum garanti, un partage par paliers au-delà d'un seuil, ou une répartition différente par source. Dans Yuno, le contrat est signé dans la plateforme, pilier par pilier ou en partage par paliers.",
      },
      {
        q: "Que contient un contrat entre une discothèque et un organisateur ?",
        a: "En général : les soirées concernées, les sources de recettes partagées, le pourcentage ou le minimum garanti, qui compte le bar et l'entrée, la date de règlement et ce qui se passe en cas d'annulation. Il n'y a pas de chiffre universel. Dans Yuno, vous écrivez votre accord dans le contrat, par exemple Billets 70/30 · Tables 50/50 (une illustration, pas une recommandation).",
      },
      {
        q: "Comment répartir les recettes de la billetterie, du bar et de l'entrée ?",
        a: "Soit source par source (un partage pour les billets, un pour les tables, un pour le bar), soit avec un partage global par paliers. La difficulté est rarement le pourcentage : c'est de s'accorder sur le décompte, car billets en ligne, entrées à la porte et entrées gratuites peuvent se trouver à des endroits différents.",
      },
      {
        q: "Qui compte les recettes du bar et de l'entrée, et comment éviter les litiges ?",
        a: "En général le club, puisqu'il tient le bar et la porte. Pour éviter les litiges, les deux parties doivent voir les mêmes chiffres. Dans Yuno, le club déclare les recettes du bar et de l'entrée à la clôture, l'organisateur accepte ou conteste, et le règlement attend l'accord des deux.",
      },
      {
        q: "Quand l'organisateur est-il payé ?",
        a: "C'est le deuxième litige classique : trop souvent, « quand le club fait le virement ». Dans Yuno, chacun est payé sur son propre compte Stripe, et le règlement des montants partagés passe une fois que le club et l'organisateur ont tous les deux validé le décompte de clôture.",
      },
      {
        q: "Peut-on partager différemment billets, tables et bar ?",
        a: "Oui. Le contrat peut fixer un partage par pilier, par exemple Billets 70/30 · Tables 50/50, ou utiliser à la place un partage par paliers. Chaque soirée a un interrupteur par pilier : vous pouvez aussi commencer par un seul pilier.",
      },
      {
        q: "Yuno prend-il une commission sur le partage ?",
        a: "Non. Yuno facture 0 € d'abonnement et 0 % de commission au club et à l'organisateur. L'acheteur paie des frais de service : 4 % sur les billets (min. 0,99 €), 4 % sur les tables (plafonnés à 25 €), 3 % sur les boissons. Les frais de carte Stripe (1,5 % + 0,25 €) sont à la charge du club ou de l'organisateur.",
      },
      {
        q: "Les autres billetteries proposent-elles un contrat club × organisateur ?",
        a: "Nous n'avons pas trouvé de contrat et de décompte club × organisateur dans la documentation publique de Shotgun, Weezevent ou Xceed, consultée entre juin et septembre 2026. Si l'un d'eux le propose depuis, dites-le-nous et nous mettrons cette page à jour.",
      },
      {
        q: "Est-ce un conseil juridique ?",
        a: "Non. Cette page explique les pratiques courantes et le fonctionnement de Yuno. Les clauses, la fiscalité et les responsabilités dépendent de votre situation et de votre pays : faites relire votre contrat par un professionnel.",
      },
    ],
  },
  related: {
    title: "Pour aller plus loin",
    links: [
      {
        label: "Réservation de tables VIP pour discothèques",
        href: "/fr/reservation-table-vip-discotheque",
      },
      {
        label: "Logiciel de suivi et commissions des promoteurs",
        href: "/fr/logiciel-promoteurs-soiree",
      },
      { label: "Logiciel de guest list pour soirées", href: "/fr/guest-list-soiree-logiciel" },
      { label: "Tarifs Yuno", href: "/fr/pricing" },
      { label: "Toutes les fonctions de Yuno (accueil)", href: "/fr" },
    ],
  },
};

const es: TopicPageContent = {
  id: "revenue-split",
  lang: "es",
  path: TWINS.es,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Reparto de ingresos entre discoteca y organizador | Yuno",
    description:
      "Puerta, barra, entradas y mesas: los repartos habituales entre discoteca y organizador, las disputas típicas y un contrato firmado en Yuno con cierre.",
    ogAlt: "Yuno — contrato y reparto de ingresos discoteca × organizador",
  },
  breadcrumb: { home: "Yuno", current: "Reparto discoteca × organizador" },
  hero: {
    kicker: "Contrato discoteca × organizador y reparto de ingresos de la noche",
    title: "Reparte el dinero de la noche sin hojas de cálculo y sin discusiones.",
    sub: "Firma el acuerdo entre la discoteca y el organizador dentro de Yuno — pilar por pilar o como reparto por tramos. En el cierre, la discoteca declara lo de la barra y la puerta, el organizador acepta o discute, y nada se mueve hasta que los dos estén de acuerdo.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    note: [
      "Contrato dentro de Yuno",
      "Nada se mueve sin las dos partes",
      "Cada uno cobra en su Stripe",
    ],
  },
  answer: {
    title: "En breve",
    paragraphs: [
      "No hay un estándar único, pero las noches de discoteca suelen repartirse de unas pocas formas: un porcentaje de la puerta o de las entradas, un porcentaje de la barra, un mínimo garantizado para una de las partes, un reparto que cambia al superar un tramo de ventas, o un reparto distinto por cada fuente (entradas, mesas, barra). La mayoría de las disputas no son por los porcentajes, sino por quién cuenta lo de la barra y la puerta, y por cuándo cobra el organizador.",
      "Yuno convierte el acuerdo en un contrato firmado dentro de la plataforma, pilar por pilar (entradas, mesas, barra) o como reparto por tramos. En el cierre, la discoteca declara lo recaudado en barra y puerta, el organizador lo acepta o lo discute, y nada se mueve sin que las dos partes estén de acuerdo. Cada uno cobra en su propia cuenta de Stripe.",
    ],
    bullets: [
      "Por ejemplo, un contrato puede decir «Entradas 70/30 · Mesas 50/50»: una ilustración de un reparto por pilar, no una recomendación.",
      "0 € de cuota y 0 % de comisión para la discoteca y el organizador. El comprador paga un 4 % de gastos de servicio en las entradas (mín. 0,99 €), un 4 % en las mesas (tope de 25 €) y un 3 % en las copas.",
      "Los gastos de tarjeta (Stripe, 1,5 % + 0,25 €) los paga la discoteca o el organizador; Yuno nunca retiene los fondos.",
      "Esta página describe prácticas habituales y cómo funciona Yuno. No es asesoramiento jurídico: haz revisar tu contrato.",
    ],
  },
  features: {
    eyebrow: "Qué incluye",
    title: "Un contrato, una liquidación, una sola versión de los hechos",
    sub: "Lo que suele vivir en mensajes de WhatsApp, hojas de cálculo y transferencias, reunido en un solo sitio.",
    items: [
      {
        title: "Contrato firmado dentro de Yuno",
        body: "La discoteca y el organizador acuerdan las condiciones en la plataforma, no en un hilo de chat. El acuerdo de una noche o de una colaboración queda escrito donde ambas partes lo encuentran.",
      },
      {
        title: "Pilar por pilar",
        body: "Define un reparto para las entradas, otro para las mesas y otro para la barra. Por ejemplo: Entradas 70/30 · Mesas 50/50. Cada pilar sigue su propia regla.",
      },
      {
        title: "O un reparto por tramos",
        body: "¿Prefieres un solo bote común? Define un reparto por tramos: el porcentaje cambia al superar un umbral de ventas, en vez de renegociar después de una buena noche.",
      },
      {
        title: "Cierre declarado por la discoteca",
        body: "Al terminar la noche, la discoteca declara lo recaudado en barra y puerta. El organizador ve las cifras y la liquidación resultante, y las acepta o las discute.",
      },
      {
        title: "Nada se mueve sin las dos partes",
        body: "Una cifra discutida queda visible y abierta. La liquidación solo se hace cuando la discoteca y el organizador están de acuerdo: nadie cobra sobre un importe que la otra parte no ha visto.",
      },
      {
        title: "Cobras en tu propia cuenta de Stripe",
        body: "El dinero llega directo a la cuenta de Stripe de cada uno, a su nombre. Yuno nunca retiene fondos; reembolsos, facturas y exportaciones contables están en el panel.",
      },
    ],
  },
  table: {
    eyebrow: "Acuerdos habituales",
    title: "Formas habituales de repartir una noche entre discoteca y organizador",
    sub: "Estructuras genéricas que se ven en las noches de club. Cada acuerdo se negocia caso por caso: son ejemplos, no reglas.",
    head: ["Estructura", "Cómo funciona", "Ojo con"],
    rows: [
      [
        "Porcentaje de la puerta o de las entradas",
        "El organizador y la discoteca se reparten las ventas de entradas y de puerta según un porcentaje pactado.",
        "Entradas gratis, listas y ventas en puerta contadas en sitios distintos.",
      ],
      [
        "Porcentaje de la barra",
        "El organizador recibe una parte de lo recaudado en la barra esa noche, o por encima de una base.",
        "La que cuenta la barra es la discoteca: acordad qué entra (descuentos, copas del personal, botellas VIP).",
      ],
      [
        "Mínimo garantizado",
        "A una de las partes se le asegura una cantidad fija y el reparto se aplica por encima (o se cobra la más alta de las dos).",
        "Quién asume el riesgo en una noche floja y qué pasa si se cancela la noche.",
      ],
      [
        "Reparto por tramos",
        "El reparto cambia al superar un umbral de ventas, por ejemplo una parte mayor para el organizador por encima de una facturación fijada.",
        "Umbrales poco claros: bruto o neto, con o sin mesas y barra.",
      ],
      [
        "Reparto por pilar",
        "Un reparto distinto por cada fuente: entradas, mesas, barra. Por ejemplo, Entradas 70/30 · Mesas 50/50.",
        "Zonas grises entre pilares: de quién es la señal de una mesa y quién paga las comisiones.",
      ],
    ],
    footnote:
      "Estructuras a modo de ilustración, basadas en prácticas habituales del sector: no son estadísticas ni recomendaciones. Yuno admite un reparto por pilar y un reparto por tramos. Haz revisar tu contrato por un profesional: esto no es asesoramiento jurídico.",
  },
  steps: {
    eyebrow: "Cómo funciona",
    title: "Del apretón de manos a la liquidación en tres pasos",
    items: [
      {
        title: "Firma el acuerdo dentro de Yuno",
        body: "La discoteca y el organizador fijan las condiciones en la plataforma: un reparto por pilar (entradas, mesas, barra) o un reparto por tramos. Las dos partes ven el mismo contrato.",
      },
      {
        title: "Vende y dirige la noche",
        body: "Entradas, mesas y copas se venden con Yuno, la puerta se escanea y el dinero llega a la cuenta de Stripe de cada uno. Las comisiones de los RRPP se calculan solas si trabajas con ellos.",
      },
      {
        title: "Cerrad la noche, juntos",
        body: "La discoteca declara lo recaudado en barra y puerta. El organizador acepta o discute. Cuando los dos están de acuerdo, la liquidación se cierra — y hasta entonces, nada se mueve.",
      },
    ],
  },
  proof: {
    eyebrow: "Datos",
    title: "Pensado para la relación discoteca × organizador",
    stats: [
      { value: "0 € · 0 %", label: "de cuota y de comisión para la discoteca y el organizador" },
      { value: "3", label: "pilares que puedes repartir por separado: entradas, mesas y copas" },
      { value: "22", label: "discotecas asociadas en Madrid, lanzamiento con Amoris" },
      { value: "ES · EN · FR", label: "una plataforma en tres idiomas" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Reparto de ingresos discoteca × organizador: tus preguntas",
    items: [
      {
        q: "¿Cómo se reparten los ingresos entre una discoteca y un organizador?",
        a: "Pactad por escrito qué fuentes se reparten (entradas, mesas, barra, puerta), con qué porcentaje y quién cuenta qué. Las fórmulas habituales son un porcentaje de la puerta, un porcentaje de la barra, un mínimo garantizado, un reparto por tramos al superar un umbral o un reparto distinto por fuente. En Yuno el contrato se firma dentro de la plataforma, pilar por pilar o como reparto por tramos.",
      },
      {
        q: "¿Qué lleva un contrato entre una discoteca y una promotora?",
        a: "Normalmente: las noches a las que aplica, las fuentes de ingresos que se reparten, el porcentaje o el mínimo garantizado, quién cuenta la barra y la puerta, cuándo se liquida y qué pasa si se cancela. No hay una cifra universal. En Yuno escribes tu acuerdo en el contrato, por ejemplo Entradas 70/30 · Mesas 50/50 (una ilustración, no una recomendación).",
      },
      {
        q: "¿Cómo repartir la barra y la puerta?",
        a: "O fuente por fuente (un reparto para las entradas, otro para las mesas, otro para la barra), o con un reparto global por tramos. La dificultad casi nunca es el porcentaje, sino ponerse de acuerdo en la cuenta: las entradas online, las ventas en puerta y las entradas gratis pueden estar en sitios distintos.",
      },
      {
        q: "¿Quién cuenta lo recaudado en barra y puerta, y cómo se evitan las disputas?",
        a: "Normalmente la discoteca, porque es quien lleva la barra y la puerta. Para evitar disputas, las dos partes deben ver las mismas cifras. En Yuno, la discoteca declara lo recaudado en barra y puerta en el cierre, el organizador acepta o discute, y la liquidación espera a que los dos estén de acuerdo.",
      },
      {
        q: "¿Cuándo cobra el organizador?",
        a: "Es la segunda disputa clásica: demasiadas veces es «cuando la discoteca haga la transferencia». En Yuno, cada uno cobra en su propia cuenta de Stripe, y la liquidación de los importes compartidos se hace cuando la discoteca y el organizador han aceptado los dos el cierre de la noche.",
      },
      {
        q: "¿Se puede repartir distinto entradas, mesas y barra?",
        a: "Sí. El contrato puede fijar un reparto por pilar, por ejemplo Entradas 70/30 · Mesas 50/50, o usar en su lugar un reparto por tramos. Cada noche tiene un interruptor por pilar, así que también puedes empezar con un solo pilar.",
      },
      {
        q: "¿Yuno cobra comisión sobre el reparto?",
        a: "No. Yuno cobra a la discoteca y al organizador 0 € de cuota y 0 % de comisión. El comprador paga unos gastos de servicio: 4 % en las entradas (mín. 0,99 €), 4 % en las mesas (tope de 25 €) y 3 % en las copas. Los gastos de tarjeta de Stripe (1,5 % + 0,25 €) los paga la discoteca o el organizador.",
      },
      {
        q: "¿Otras ticketeras ofrecen un contrato discoteca × organizador?",
        a: "No hemos encontrado un contrato y una liquidación discoteca × organizador en la documentación pública de Shotgun, Weezevent o Xceed, que revisamos entre junio y septiembre de 2026. Si alguna lo publica desde entonces, avísanos y actualizaremos esta página.",
      },
      {
        q: "¿Esto es asesoramiento jurídico?",
        a: "No. Esta página explica prácticas habituales y cómo funciona Yuno. Las cláusulas, los impuestos y las responsabilidades dependen de tu situación y de tu país: haz revisar tu contrato por un profesional.",
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
        label: "Software de listas de invitados para discotecas",
        href: "/es/lista-invitados-discoteca-software",
      },
      { label: "Precios de Yuno", href: "/es/precios" },
      { label: "Todas las funciones de Yuno (inicio)", href: "/es" },
    ],
  },
};

export const revenueSplit = [en, fr, es];
