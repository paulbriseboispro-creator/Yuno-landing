// Contact (lead form) page copy, available in every locale. The component reads
// it via useContact(); the route head() reads the raw `contactContent[locale]`
// map. French is checked against the English shape at compile time
// (ContactContent = typeof en), so the two locales can never drift in keys or
// array lengths — only values are translated.
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Book a demo — Yuno",
    description:
      "Talk to a Yuno expert. We'll walk through your floor plan, your fee stack and what migrating would look like.",
    ogDescription: "Talk to a Yuno expert. 30-minute call, no pressure.",
  },
  tag: "Talk to us",
  heading: {
    lead: "Book a 30-minute",
    accent: "walkthrough",
  },
  subhead:
    "Tell us about your venue or your events. We'll come back within one business day with a tailored demo and a fee comparison.",
  benefits: [
    "No card, no commitment",
    "Migration plan from your current tooling",
    "EU-based, GDPR-native",
  ],
  contactInfo: {
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Based in",
    location: "Paris · Barcelona · London",
  },
  form: {
    segmentLabel: "I am a…",
    segments: {
      club: "Nightclub",
      organizer: "Organizer",
      affiliate: "Promoter",
      other: "Other",
    },
    nameLabel: "Full name",
    namePlaceholder: "Alex Martin",
    emailLabel: "Work email",
    emailPlaceholder: "alex@yourclub.com",
    companyLabel: "Company / venue",
    companyPlaceholder: "Neon Room",
    phoneLabel: "Phone",
    phonePlaceholder: "+33 6 ...",
    messageLabel: "What do you want to fix first?",
    messagePlaceholder: "Bar queues, VIP tracking, ticketing fees...",
    submit: "Book my demo",
    submitting: "Sending…",
    errorMessage: "Something went wrong.",
  },
  success: {
    title: "You're on the list.",
    body: "We'll be in touch within one business day.",
  },
  consent:
    "By submitting you agree to be contacted about Yuno. We never share your data.",
};

export type ContactContent = typeof en;

const fr: ContactContent = {
  meta: {
    title: "Réserver une démo — Yuno",
    description:
      "Échangez avec un expert Yuno. Nous passerons en revue votre plan de salle, vos frais et ce à quoi ressemblerait une migration.",
    ogDescription: "Échangez avec un expert Yuno. Appel de 30 minutes, sans pression.",
  },
  tag: "Parlons-en",
  heading: {
    lead: "Réservez une démo",
    accent: "de 30 minutes",
  },
  subhead:
    "Parlez-nous de votre établissement ou de vos événements. Nous reviendrons vers vous sous un jour ouvré avec une démo sur mesure et un comparatif des frais.",
  benefits: [
    "Sans carte, sans engagement",
    "Plan de migration depuis vos outils actuels",
    "Conforme RGPD, basé en Europe",
  ],
  contactInfo: {
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    locationLabel: "Basé à",
    location: "Paris · Barcelone · Londres",
  },
  form: {
    segmentLabel: "Je suis…",
    segments: {
      club: "Club",
      organizer: "Organisateur",
      affiliate: "Promoteur",
      other: "Autre",
    },
    nameLabel: "Nom complet",
    namePlaceholder: "Alex Martin",
    emailLabel: "Email professionnel",
    emailPlaceholder: "alex@yourclub.com",
    companyLabel: "Société / établissement",
    companyPlaceholder: "Neon Room",
    phoneLabel: "Téléphone",
    phonePlaceholder: "+33 6 ...",
    messageLabel: "Que souhaitez-vous résoudre en priorité ?",
    messagePlaceholder: "Files au bar, suivi VIP, frais de billetterie...",
    submit: "Réserver ma démo",
    submitting: "Envoi…",
    errorMessage: "Impossible d'enregistrer votre demande. Réessayez.",
  },
  success: {
    title: "Vous êtes sur la liste.",
    body: "Nous vous recontactons sous un jour ouvré.",
  },
  consent:
    "En soumettant ce formulaire, vous acceptez d'être contacté au sujet de Yuno. Nous ne partageons jamais vos données.",
};

export const contactContent: Record<Locale, ContactContent> = { en, fr };

export function useContact(): ContactContent {
  return contactContent[useLocale()];
}
