// Shared chrome copy (nav, footer, banner, search, error/404, default meta),
// available in every locale. Components read it via useCommon(); route head()
// functions read the raw `common[locale]` map. French is checked against the
// English shape at compile time (CommonContent = typeof en).
import { useLocale, type Locale } from "@/i18n/locale";

type SearchCategory = "Product" | "Pricing" | "Audience" | "FAQ" | "Company";
type SearchEntry = {
  title: string;
  category: SearchCategory;
  to: string;
  keywords: string[];
};

const en = {
  nav: {
    product: "Product",
    pricing: "Pricing",
    clubs: "Clubs",
    organizers: "Organizers",
    ads: "Ads & marketing",
    affiliates: "Affiliates",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    bookDemo: "Book demo",
    startFree: "Start free",
  },
  meta: {
    title: "Yuno — Run the money, the floor and the night",
    description:
      "The platform for clubs and organizers: VIP tables, live night control, customer data and loyalty, with co-hosted revenue splits handled automatically.",
  },
  banner: {
    label: "Launch offer",
    rest: " — Yuno is 100% free for clubs during launch. No subscription, no credit card.",
    cta: "Create your club account",
  },
  footer: {
    tagline: "The infrastructure layer for the after-dark economy.",
    rights: "WOMBER. All rights reserved.",
    language: "Language",
    website: "Website",
    // Publisher identity, verbatim from the platform's legal notice
    // (yunoapp.eu/legal/mentions-legales). Partners, payment providers and
    // Meta's business verification all check the site against the registry
    // record, so the name, number and address must match it exactly.
    legal:
      "Yuno is published by WOMBER, sole proprietorship registered in France under SIRET 995 130 747 00018, 25 avenue Mercure, 31130 Quint-Fonsegrives, France. Publication director: Paul Brisebois. Contact: contact@yunoapp.eu.",
    legalLinkLabel: "Legal notice",
    legalLinkHref: "https://www.yunoapp.eu/legal/mentions-legales",
  },
  search: {
    label: "Search",
    placeholder: "Try ‘VIP tables’, ‘pricing’, ‘promoter’…",
    popular: "Popular",
    results: "Results",
    noMatches: "No matches. Try a different keyword.",
    categories: {
      Product: "Product",
      Pricing: "Pricing",
      Audience: "Audience",
      FAQ: "FAQ",
      Company: "Company",
    } as Record<SearchCategory, string>,
    index: [
      { title: "VIP floor plan editor", category: "Product", to: "/clubs", keywords: ["vip", "floor", "tables", "minimum spend"] },
      { title: "Click & Collect bar", category: "Product", to: "/clubs", keywords: ["bar", "queue", "drinks", "order"] },
      { title: "Live Night dashboard", category: "Product", to: "/clubs", keywords: ["live", "dashboard", "entries", "revenue"] },
      { title: "PIN-based staff login", category: "Product", to: "/clubs", keywords: ["staff", "pin", "login", "bouncer"] },
      { title: "CRM & SMS marketing", category: "Product", to: "/clubs", keywords: ["crm", "sms", "marketing", "campaign"] },
      { title: "Meta ads: your pixel, your audiences", category: "Product", to: "/clubs?besoin=pub", keywords: ["ads", "meta", "facebook", "instagram", "pixel", "audience", "advertising"] },
      { title: "Ticketing & Stripe Connect splits", category: "Product", to: "/organizers", keywords: ["tickets", "stripe", "split", "payout"] },
      { title: "Promoter attribution & leaderboard", category: "Product", to: "/affiliates", keywords: ["promoter", "affiliate", "attribution", "commission"] },
      { title: "Pricing — free for clubs during launch", category: "Pricing", to: "/pricing", keywords: ["pricing", "plans", "cost", "free", "launch"] },
      { title: "For nightclubs", category: "Audience", to: "/clubs", keywords: ["club", "venue", "owner"] },
      { title: "For organizers", category: "Audience", to: "/organizers", keywords: ["organizer", "events"] },
      { title: "For promoters & agencies", category: "Audience", to: "/affiliates", keywords: ["promoter", "agency", "affiliate"] },
      { title: "How does the revenue split work?", category: "FAQ", to: "/#faq", keywords: ["revenue", "split", "stripe", "venue", "share"] },
      { title: "Which markets do you operate in?", category: "FAQ", to: "/#faq", keywords: ["markets", "country", "europe", "france", "spain"] },
      { title: "Book a demo", category: "Company", to: "/contact", keywords: ["demo", "contact", "sales", "call"] },
    ] as SearchEntry[],
  },
  // The rdv (meeting) choice surfaced at every CTA: book via the form, or talk to
  // the team on WhatsApp. No calendar tool — these are the two real channels.
  rdv: {
    formCta: "Book a demo",
    whatsappCta: "Message us on WhatsApp",
    or: "or",
    whatsappNumber: "33644216689",
    whatsappMessage: "Hi Yuno 👋 I run a venue / events and I'd like to see a demo.",
    whatsappHint: "Straight to the team, no form.",
  },
  notFound: {
    title: "404",
    descLine1: "The page you're looking for might have been",
    descLine2: "moved or doesn't exist.",
    goHome: "Go Home",
    explore: "Explore",
  },
  error: {
    title: "This page didn't load",
    body: "Something went wrong on our end. Try refreshing or head back home.",
    tryAgain: "Try again",
    goHome: "Go home",
  },
  switcher: {
    label: "Language",
  },
};

export type CommonContent = typeof en;

const fr: CommonContent = {
  nav: {
    product: "Produit",
    pricing: "Tarifs",
    clubs: "Clubs",
    organizers: "Organisateurs",
    ads: "Publicité & marketing",
    affiliates: "Affiliés",
    contact: "Contact",
    privacy: "Confidentialité",
    terms: "Conditions",
    bookDemo: "Réserver une démo",
    startFree: "Essai gratuit",
  },
  meta: {
    title: "Yuno — Pilotez l'argent, la salle et la nuit",
    description:
      "La plateforme pour les clubs et organisateurs : tables VIP, pilotage live de la soirée, données clients et fidélité, avec la répartition des soirées co-produites gérée automatiquement.",
  },
  banner: {
    label: "Offre de lancement",
    rest: " — Yuno est 100 % gratuit pour les clubs pendant le lancement. Sans abonnement, sans carte bancaire.",
    cta: "Créer mon compte club",
  },
  footer: {
    tagline: "La couche d'infrastructure de l'économie de la nuit.",
    rights: "WOMBER. Tous droits réservés.",
    language: "Langue",
    website: "Site web",
    legal:
      "Yuno est éditée par WOMBER, entreprise individuelle immatriculée en France sous le SIRET 995 130 747 00018, 25 avenue Mercure, 31130 Quint-Fonsegrives, France. Directeur de la publication : Paul Brisebois. Contact : contact@yunoapp.eu.",
    legalLinkLabel: "Mentions légales",
    legalLinkHref: "https://www.yunoapp.eu/legal/mentions-legales",
  },
  search: {
    label: "Rechercher",
    placeholder: "Essayez « tables VIP », « tarifs », « promoteur »…",
    popular: "Populaire",
    results: "Résultats",
    noMatches: "Aucun résultat. Essayez un autre mot-clé.",
    categories: {
      Product: "Produit",
      Pricing: "Tarifs",
      Audience: "Public",
      FAQ: "FAQ",
      Company: "Entreprise",
    },
    index: [
      { title: "Éditeur de plan de salle VIP", category: "Product", to: "/clubs", keywords: ["vip", "salle", "tables", "minimum"] },
      { title: "Bar Click & Collect", category: "Product", to: "/clubs", keywords: ["bar", "file", "boissons", "commande"] },
      { title: "Tableau de bord Live Night", category: "Product", to: "/clubs", keywords: ["live", "tableau", "entrées", "revenus"] },
      { title: "Connexion du staff par code PIN", category: "Product", to: "/clubs", keywords: ["staff", "pin", "connexion", "videur"] },
      { title: "CRM & marketing SMS", category: "Product", to: "/clubs", keywords: ["crm", "sms", "marketing", "campagne"] },
      { title: "Publicité Meta : votre pixel, vos audiences", category: "Product", to: "/clubs?besoin=pub", keywords: ["pub", "publicité", "meta", "facebook", "instagram", "pixel", "audience"] },
      { title: "Billetterie & répartition Stripe Connect", category: "Product", to: "/organizers", keywords: ["billets", "stripe", "répartition", "versement"] },
      { title: "Attribution promoteurs & classement", category: "Product", to: "/affiliates", keywords: ["promoteur", "affilié", "attribution", "commission"] },
      { title: "Tarifs — gratuit pour les clubs pendant le lancement", category: "Pricing", to: "/pricing", keywords: ["tarifs", "plans", "coût", "gratuit", "lancement"] },
      { title: "Pour les clubs", category: "Audience", to: "/clubs", keywords: ["club", "établissement", "gérant"] },
      { title: "Pour les organisateurs", category: "Audience", to: "/organizers", keywords: ["organisateur", "événements"] },
      { title: "Pour les promoteurs & agences", category: "Audience", to: "/affiliates", keywords: ["promoteur", "agence", "affilié"] },
      { title: "Comment fonctionne la répartition des revenus ?", category: "FAQ", to: "/#faq", keywords: ["revenus", "répartition", "stripe", "club", "part"] },
      { title: "Dans quels marchés opérez-vous ?", category: "FAQ", to: "/#faq", keywords: ["marchés", "pays", "europe", "france", "espagne"] },
      { title: "Réserver une démo", category: "Company", to: "/contact", keywords: ["démo", "contact", "commercial", "appel"] },
    ],
  },
  rdv: {
    formCta: "Réserver une démo",
    whatsappCta: "Écrire sur WhatsApp",
    or: "ou",
    whatsappNumber: "33644216689",
    whatsappMessage: "Bonjour Yuno 👋 Je gère un établissement / des soirées et j'aimerais voir une démo.",
    whatsappHint: "Réponse directe de l'équipe, sans formulaire.",
  },
  notFound: {
    title: "404",
    descLine1: "La page que vous cherchez a peut-être été",
    descLine2: "déplacée ou n'existe pas.",
    goHome: "Accueil",
    explore: "Explorer",
  },
  error: {
    title: "Cette page n'a pas pu se charger",
    body: "Une erreur est survenue de notre côté. Réessayez ou revenez à l'accueil.",
    tryAgain: "Réessayer",
    goHome: "Accueil",
  },
  switcher: {
    label: "Langue",
  },
};

export const common: Record<Locale, CommonContent> = { en, fr };

export function useCommon(): CommonContent {
  return common[useLocale()];
}
