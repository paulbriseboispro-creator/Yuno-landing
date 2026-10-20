// Contact (lead form) page copy, available in every locale. The component reads
// it via useContact(); the route head() reads the raw `contactContent[locale]`
// map. French is checked against the English shape at compile time
// (ContactContent = typeof en), so the two locales can never drift in keys or
// array lengths — only values are translated.
import { useLocale, type Locale } from "@/i18n/locale";

const en = {
  meta: {
    title: "Contact — Yuno",
    description:
      "Clubs and organizers open their Yuno account themselves in two minutes: €0 subscription, 0% commission. A question first? Write to the founder.",
    ogDescription: "Open your Yuno account in two minutes, or write to the founder.",
  },
  tag: "Contact",
  heading: {
    lead: "Open your account in two minutes,",
    accent: "or write to us.",
  },
  subhead:
    "Clubs and organizers create their Yuno account themselves, with no call to book. A question first? Leave a message or write to the founder on WhatsApp; we answer within one business day.",
  benefits: [
    "Account open in two minutes, no card",
    "€0 subscription, 0% commission on your price",
    "Set up with you if you want",
  ],
  cta: "Create my free account",
  formTitle: "A question first?",
  contactInfo: {
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Based in",
    location: "Madrid · Toulouse",
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
    companyLabel: "Company / venue (optional)",
    companyPlaceholder: "Neon Room",
    phoneLabel: "Phone (optional)",
    phonePlaceholder: "+33 6 ...",
    messageLabel: "Your message",
    messagePlaceholder: "A question about your venue, your nights, the price…",
    submit: "Send my message",
    submitting: "Sending…",
    errorMessage: "Something went wrong.",
    phoneInvalid: "This phone number doesn't look complete.",
    or: "or",
    whatsappCta: "Message the founder on WhatsApp",
    phoneCountry: "Country code",
  },
  success: {
    title: "Message received.",
    body: "We'll get back to you within one business day.",
  },
  consent: "By submitting you agree to be contacted about Yuno. We never share your data.",
  // Human-readable label for each ?besoin= pain, used to pre-fill the message so
  // Paul answers on the visitor's actual problem.
  prefillPrefix: "I'd like to talk about",
  besoinLabels: {
    vip: "VIP tables & bottle service",
    "co-soiree": "Co-hosted night revenue split",
    data: "Real attendance data & no-show tracking",
    fidelite: "Customer CRM & loyalty",
    live: "The Live Night control room",
    staff: "PIN staff login & role dashboards",
    compta: "Accounting & Stripe reconciliation",
    orga: "The organizer Mission Control back-office",
    prix: "0 € cost for organizers (you only pay Stripe)",
    promo: "Promoter attribution & settlement",
    billetterie: "Event ticketing & door check-in",
    porte: "Door check-in & guest list",
  } as Record<string, string>,
};

export type ContactContent = typeof en;

const fr: ContactContent = {
  meta: {
    title: "Contact — Yuno",
    description:
      "Clubs et organisateurs ouvrent leur compte Yuno eux-mêmes en deux minutes : 0 € d'abonnement, 0 % de commission. Une question avant ? Écrivez au fondateur.",
    ogDescription: "Ouvrez votre compte Yuno en deux minutes, ou écrivez au fondateur.",
  },
  tag: "Contact",
  heading: {
    lead: "Ouvrez votre compte en deux minutes,",
    accent: "ou écrivez-nous.",
  },
  subhead:
    "Clubs et organisateurs créent leur compte Yuno eux-mêmes, sans appel à réserver. Une question avant ? Laissez un message ou écrivez au fondateur sur WhatsApp : on vous répond sous un jour ouvré.",
  benefits: [
    "Compte ouvert en deux minutes, sans carte",
    "0 € d'abonnement, 0 % de commission sur votre prix",
    "Configuration avec vous si vous le souhaitez",
  ],
  cta: "Créer mon compte gratuit",
  formTitle: "Une question avant ?",
  contactInfo: {
    emailLabel: "Email",
    phoneLabel: "Téléphone",
    locationLabel: "Basé à",
    location: "Madrid · Toulouse",
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
    companyLabel: "Société / établissement (optionnel)",
    companyPlaceholder: "Neon Room",
    phoneLabel: "Téléphone (optionnel)",
    phonePlaceholder: "+33 6 ...",
    messageLabel: "Votre message",
    messagePlaceholder: "Une question sur votre établissement, vos soirées, les tarifs…",
    submit: "Envoyer mon message",
    submitting: "Envoi…",
    errorMessage: "Impossible d'enregistrer votre demande. Réessayez.",
    phoneInvalid: "Ce numéro de téléphone semble incomplet.",
    or: "ou",
    whatsappCta: "Écrire au fondateur sur WhatsApp",
    phoneCountry: "Indicatif du pays",
  },
  success: {
    title: "Message bien reçu.",
    body: "On vous répond sous un jour ouvré.",
  },
  consent:
    "En soumettant ce formulaire, vous acceptez d'être contacté au sujet de Yuno. Nous ne partageons jamais vos données.",
  prefillPrefix: "Je souhaite échanger sur",
  besoinLabels: {
    vip: "Tables VIP & service bouteille",
    "co-soiree": "Répartition d'une soirée co-produite",
    data: "Données de présence réelle & no-show",
    fidelite: "CRM clients & fidélité",
    live: "La war-room Live Night",
    staff: "Connexion staff par PIN & dashboards par rôle",
    compta: "Comptabilité & réconciliation Stripe",
    orga: "Le back-office Mission Control de l'orga",
    prix: "0 € de coût pour l'organisateur (vous ne payez que Stripe)",
    promo: "Attribution promoteurs & règlement",
    billetterie: "Billetterie & contrôle d'accès",
    porte: "Contrôle d'accès & liste d'invités",
  },
};

export const contactContent: Record<Locale, ContactContent> = { en, fr };

export function useContact(): ContactContent {
  return contactContent[useLocale()];
}
