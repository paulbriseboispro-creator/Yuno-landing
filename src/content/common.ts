// Default meta, 404 and error copy, in English and French. The 404 reads it via
// useCommon(); the root route's head() and error component read the raw
// `common[locale]` map. French is checked against the English shape at compile
// time (CommonContent = typeof en). The old site's nav, footer, banner and
// search copy went with it (retired 20/10/2026).
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Yuno — Run the money, the floor and the night",
    description:
      "The platform for clubs and organizers: tickets and guest list, VIP tables, the door, and the money split between club, organizer and promoters. €0 subscription, 0% commission.",
  },
  // The rdv (meeting) choice surfaced at every CTA: book via the form, or talk to
  // the team on WhatsApp. No calendar tool — these are the two real channels.
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
};

export type CommonContent = typeof en;

const fr: CommonContent = {
  meta: {
    title: "Yuno — Pilotez l'argent, la salle et la nuit",
    description:
      "La plateforme des clubs et organisateurs : billets et guest list, tables VIP, la porte, et la répartition de l'argent entre club, organisateur et promoteurs. 0 € d'abonnement, 0 % de commission.",
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
};

export const common: Record<Locale, CommonContent> = { en, fr };

export function useCommon(): CommonContent {
  return common[useLocale()];
}
