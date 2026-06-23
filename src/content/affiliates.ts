// Affiliates page copy in both locales. Components read it via useAffiliates();
// the route head() reads the raw `affiliatesContent[locale]` map. French is
// checked against the English shape at compile time (AffiliatesContent = typeof en).
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Yuno for Affiliates — One collective per city",
    description:
      "Promoter collectives get free access to Yuno's professional infrastructure, a branded page for all their events, and exclusive territory in their city.",
    ogDescription:
      "Free pro infrastructure, a branded event page for your collective, and exclusive city territory.",
  },
  hero: {
    badge: "One collective per city",
    title: {
      line1: "Your collective.",
      line2: "Your city.",
      line3: "On Yuno.",
    },
    body: "Promoter agencies get free access to Yuno's professional infrastructure — a branded home for all your events, and a system your whole team can actually use.",
    cta: "Apply for your city",
    mockup: {
      name: "Colectivo Norte",
      meta: "12 promoters · 4 upcoming",
      badge: "Exclusive affiliate · Madrid",
      getTickets: "Get tickets",
    },
  },
  heroEvents: [
    { name: "Subterráneo · Opening", date: "Sat 21 Jun", venue: "Kapital", price: "€20" },
    { name: "House of Hours", date: "Fri 27 Jun", venue: "Opium", price: "€22" },
    { name: "Late Night Bloom", date: "Sat 05 Jul", venue: "Fitz", price: "€18" },
    { name: "Members Only · Vol. 03", date: "Sat 12 Jul", venue: "Gabana", price: "€25" },
  ],
  pillars: [
    { value: "€0", label: "No subscription, ever" },
    { value: "1 per city", label: "Exclusive territory partnership" },
    { value: "Your whole team", label: "Every promoter in your roster, in one place" },
  ],
  branded: {
    eyebrow: "Your branded presence",
    title: "One page for all your events.",
    titleEmphasis: "Actually professional.",
    body: "Stop sending people to a generic Linktree with five links and no context. Your Yuno collective page lists every event you run — with the venue, the date, the lineup, and a direct link to buy tickets. Branded with your name. Shareable by your whole team.",
    beforeLabel: "Before",
    afterLabel: "After — Yuno",
    before: [
      { label: "Tickets for Saturday", url: "linktr.ee/tix-sat" },
      { label: "Our Instagram", url: "instagram.com/collective" },
      { label: "Resident Advisor", url: "ra.co/..." },
      { label: "Book a table", url: "dice.fm/..." },
      { label: "Merch store", url: "shop.com/..." },
    ],
    after: {
      name: "Colectivo Norte",
      meta: "Madrid · 12 promoters",
      ticketsLabel: "Tickets",
      events: [
        { name: "Subterráneo · Opening", date: "Sat 21 Jun", venue: "Kapital" },
        { name: "House of Hours", date: "Fri 27 Jun", venue: "Opium" },
        { name: "Late Night Bloom", date: "Sat 05 Jul", venue: "Fitz" },
        { name: "Members Only · Vol. 03", date: "Sat 12 Jul", venue: "Gabana" },
      ],
    },
  },
  team: {
    mockup: {
      eyebrow: "Collective",
      title: "Team roster",
      linksReady: "Links ready",
      topSeller: "· top seller",
      active: "Active",
    },
    eyebrow: "Team management",
    titleStart: "Your promoters.",
    titleEmphasis: "Each with their own link.",
    titleEnd: "No spreadsheet needed.",
    body1: "Add every promoter in your roster to Yuno. Each one gets their own personal page for every event — they share it on their socials, and your brand stays consistent across the team.",
    body2: "No more \"send me the link again\". No more ten different versions of the same flyer.",
  },
  promoters: [
    { name: "Lucas M.", initials: "LM" },
    { name: "Sofia R.", initials: "SR" },
    { name: "Tomás A.", initials: "TA" },
    { name: "Inès G.", initials: "IG" },
    { name: "Diego P.", initials: "DP" },
  ],
  exclusivity: {
    eyebrow: "Exclusive access",
    titleStart: "First in your city.",
    titleEmphasis: "The only one.",
    body1: "Yuno partners with one affiliate collective per city. When you're in, your territory is yours — no competitor collective running events alongside you on the same platform.",
    body2: "We're opening cities progressively. First to apply, first to get it.",
    cta: "Apply for your city",
  },
  cities: [
    { name: "Madrid", status: "open" as const, label: "Open — applying now" },
    { name: "Valencia", status: "open" as const, label: "Open — applying now" },
    { name: "Toulouse", status: "open" as const, label: "Open — applying now" },
    { name: "Lyon", status: "open" as const, label: "Open — applying now" },
    { name: "Barcelona", status: "soon" as const, label: "Coming soon" },
    { name: "Paris", status: "soon" as const, label: "Coming soon" },
  ],
  how: {
    eyebrow: "How it works",
    title: "From application to first event — in days.",
    stepLabel: "Step",
  },
  steps: [
    {
      title: "Apply for your city",
      body: "Tell us about your collective — how many promoters, which venues you work with, which city you operate in.",
    },
    {
      title: "We set you up",
      body: "A Yuno team member creates your collective account, your branded page, and onboards your team.",
    },
    {
      title: "List your events",
      body: "Add your events, assign links to your promoters, and share your collective page. Tickets redirect to the venue's existing system — nothing changes for the club.",
    },
    {
      title: "Grow the relationship",
      body: "As Yuno grows in your city, your collective grows with it. More events, more visibility, first access to what comes next.",
    },
  ],
  finalCta: {
    title: "Your city is waiting.",
    body: "One collective per city. Free infrastructure. Exclusive territory. Apply now.",
    cta: "Apply for your city",
    footnote: "Free to join · No contract · Exclusive territory",
  },
};

export type AffiliatesContent = typeof en;

const fr: AffiliatesContent = {
  meta: {
    title: "Yuno pour les affiliés — Un collectif par ville",
    description:
      "Les collectifs de promoteurs accèdent gratuitement à l'infrastructure professionnelle de Yuno, à une page brandée pour tous leurs événements et à un territoire exclusif dans leur ville.",
    ogDescription:
      "Infrastructure pro gratuite, une page d'événements brandée pour votre collectif et un territoire exclusif dans votre ville.",
  },
  hero: {
    badge: "Un collectif par ville",
    title: {
      line1: "Votre collectif.",
      line2: "Votre ville.",
      line3: "Sur Yuno.",
    },
    body: "Les agences de promoteurs accèdent gratuitement à l'infrastructure professionnelle de Yuno — un espace brandé pour tous vos événements, et un système que toute votre équipe peut vraiment utiliser.",
    cta: "Candidater pour votre ville",
    mockup: {
      name: "Colectivo Norte",
      meta: "12 promoteurs · 4 à venir",
      badge: "Affilié exclusif · Madrid",
      getTickets: "Obtenir des billets",
    },
  },
  heroEvents: [
    { name: "Subterráneo · Opening", date: "Sam 21 juin", venue: "Kapital", price: "20 €" },
    { name: "House of Hours", date: "Ven 27 juin", venue: "Opium", price: "22 €" },
    { name: "Late Night Bloom", date: "Sam 05 juil", venue: "Fitz", price: "18 €" },
    { name: "Members Only · Vol. 03", date: "Sam 12 juil", venue: "Gabana", price: "25 €" },
  ],
  pillars: [
    { value: "0 €", label: "Aucun abonnement, jamais" },
    { value: "1 par ville", label: "Partenariat de territoire exclusif" },
    { value: "Toute votre équipe", label: "Chaque promoteur de votre équipe, au même endroit" },
  ],
  branded: {
    eyebrow: "Votre présence brandée",
    title: "Une seule page pour tous vos événements.",
    titleEmphasis: "Vraiment professionnelle.",
    body: "Arrêtez d'envoyer les gens vers un Linktree générique avec cinq liens et aucun contexte. Votre page de collectif Yuno liste chaque événement que vous organisez — avec le lieu, la date, le line-up et un lien direct pour acheter des billets. Brandée à votre nom. Partageable par toute votre équipe.",
    beforeLabel: "Avant",
    afterLabel: "Après — Yuno",
    before: [
      { label: "Billets pour samedi", url: "linktr.ee/tix-sat" },
      { label: "Notre Instagram", url: "instagram.com/collective" },
      { label: "Resident Advisor", url: "ra.co/..." },
      { label: "Réserver une table", url: "dice.fm/..." },
      { label: "Boutique merch", url: "shop.com/..." },
    ],
    after: {
      name: "Colectivo Norte",
      meta: "Madrid · 12 promoteurs",
      ticketsLabel: "Billets",
      events: [
        { name: "Subterráneo · Opening", date: "Sam 21 juin", venue: "Kapital" },
        { name: "House of Hours", date: "Ven 27 juin", venue: "Opium" },
        { name: "Late Night Bloom", date: "Sam 05 juil", venue: "Fitz" },
        { name: "Members Only · Vol. 03", date: "Sam 12 juil", venue: "Gabana" },
      ],
    },
  },
  team: {
    mockup: {
      eyebrow: "Collectif",
      title: "Liste de l'équipe",
      linksReady: "Liens prêts",
      topSeller: "· meilleur vendeur",
      active: "Actif",
    },
    eyebrow: "Gestion de l'équipe",
    titleStart: "Vos promoteurs.",
    titleEmphasis: "Chacun avec son propre lien.",
    titleEnd: "Aucun tableur nécessaire.",
    body1: "Ajoutez chaque promoteur de votre équipe à Yuno. Chacun obtient sa propre page personnelle pour chaque événement — il la partage sur ses réseaux, et votre marque reste cohérente dans toute l'équipe.",
    body2: "Fini les « renvoie-moi le lien ». Fini les dix versions différentes du même flyer.",
  },
  promoters: [
    { name: "Lucas M.", initials: "LM" },
    { name: "Sofia R.", initials: "SR" },
    { name: "Tomás A.", initials: "TA" },
    { name: "Inès G.", initials: "IG" },
    { name: "Diego P.", initials: "DP" },
  ],
  exclusivity: {
    eyebrow: "Accès exclusif",
    titleStart: "Premier dans votre ville.",
    titleEmphasis: "Le seul.",
    body1: "Yuno s'associe à un seul collectif affilié par ville. Une fois admis, votre territoire est à vous — aucun collectif concurrent n'organise d'événements à vos côtés sur la même plateforme.",
    body2: "Nous ouvrons les villes progressivement. Premier à candidater, premier servi.",
    cta: "Candidater pour votre ville",
  },
  cities: [
    { name: "Madrid", status: "open" as const, label: "Ouvert — candidatures en cours" },
    { name: "Valencia", status: "open" as const, label: "Ouvert — candidatures en cours" },
    { name: "Toulouse", status: "open" as const, label: "Ouvert — candidatures en cours" },
    { name: "Lyon", status: "open" as const, label: "Ouvert — candidatures en cours" },
    { name: "Barcelone", status: "soon" as const, label: "Bientôt disponible" },
    { name: "Paris", status: "soon" as const, label: "Bientôt disponible" },
  ],
  how: {
    eyebrow: "Comment ça marche",
    title: "De la candidature au premier événement — en quelques jours.",
    stepLabel: "Étape",
  },
  steps: [
    {
      title: "Candidatez pour votre ville",
      body: "Parlez-nous de votre collectif — combien de promoteurs, avec quels lieux vous travaillez, dans quelle ville vous opérez.",
    },
    {
      title: "Nous vous configurons",
      body: "Un membre de l'équipe Yuno crée votre compte de collectif, votre page brandée, et accompagne votre équipe.",
    },
    {
      title: "Listez vos événements",
      body: "Ajoutez vos événements, attribuez des liens à vos promoteurs et partagez votre page de collectif. Les billets redirigent vers le système existant du lieu — rien ne change pour le club.",
    },
    {
      title: "Développez la relation",
      body: "À mesure que Yuno grandit dans votre ville, votre collectif grandit avec elle. Plus d'événements, plus de visibilité, un accès prioritaire à ce qui arrive ensuite.",
    },
  ],
  finalCta: {
    title: "Votre ville vous attend.",
    body: "Un collectif par ville. Infrastructure gratuite. Territoire exclusif. Candidatez maintenant.",
    cta: "Candidater pour votre ville",
    footnote: "Adhésion gratuite · Sans contrat · Territoire exclusif",
  },
};

export const affiliatesContent: Record<Locale, AffiliatesContent> = { en, fr };

export function useAffiliates(): AffiliatesContent {
  return affiliatesContent[useLocale()];
}
