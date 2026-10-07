import type { CrmPageContent } from "./types";

// Query: "shotgun brevo", "brevo soirée", "newsletter soirée", "emailing boîte de
// nuit" (the commercial side). Shotgun syncs contacts to Brevo since Sept 2025,
// so many organizers already have Brevo. Honest: Brevo is cheaper for plain
// email; Yuno knows the nights. Brevo prices from its public page (JSON-LD
// offers), 7 Oct 2026.
export const brevo: CrmPageContent = {
  id: "brevo",
  kind: "compare",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "Yuno CRM ou Brevo pour les e-mails de vos soirées ?",
    description:
      "Brevo est un e-mailing généraliste, Yuno CRM un CRM pensé pour les soirées Shotgun. Prix, fonctions, cas où Brevo suffit : la comparaison honnête.",
  },
  crumb: "Yuno CRM ou Brevo",
  card: {
    title: "Yuno CRM ou Brevo ?",
    body: "Quand Brevo suffit, quand un CRM de soirées change les choses. Comparaison honnête, prix compris.",
  },
  hero: {
    kicker: "Comparatif",
    title: "Yuno CRM ou Brevo : lequel pour remplir vos soirées ?",
    accent: "remplir vos soirées",
    sub: "Brevo envoie très bien des e-mails, et pour pas cher. Mais il ne sait pas qui est venu à quelle soirée. Voici ce qui change quand votre outil connaît vos nuits, et les cas où Brevo vous suffit.",
    cta: "Essayer Yuno CRM 14 jours",
  },
  answer: {
    title: "La réponse courte",
    paragraphs: [
      "Si vous envoyez une newsletter par mois à toute votre liste, **Brevo suffit** et coûte moins cher : son offre gratuite permet jusqu’à 300 e-mails par jour, et l’offre Starter commence à 7 € par mois.",
      "Si vous voulez écrire différemment à vos habitués, à ceux qui décrochent et à ceux qui n’ont pas encore leur place, voir quelle soirée a fait venir des nouveaux et savoir combien de billets chaque message a vendu, il vous faut un outil qui lit votre billetterie : c’est ce que fait **Yuno CRM**.",
    ],
  },
  blocks: [
    {
      type: "table",
      id: "comparaison",
      eyebrow: "Point par point",
      title: "Brevo et Yuno CRM, côte à côte.",
      accent: "côte à côte",
      head: ["", "Brevo", "Yuno CRM"],
      rows: [
        ["Pensé pour", "Tout type d’entreprise", "Clubs, organisateurs et collectifs"],
        [
          "Lien avec Shotgun",
          "Contacts synchronisés par Shotgun",
          "Soirées, billets et acheteurs lus par l’API, toutes les 15 min",
        ],
        [
          "Ce que l’outil sait d’un client",
          "Ce que vous importez (e-mail, attributs)",
          "Soirées faites, dernière venue, fidélité, source de chaque achat",
        ],
        [
          "Segments prêts pour la nuit",
          "À construire vous-même",
          "Habitués, nouveaux, endormis, gros dépensiers, invités jamais payants…",
        ],
        [
          "E-mails qui lisent la soirée",
          "Non",
          "Tarifs, épuisé, line-up et compte à rebours au moment de l’envoi",
        ],
        [
          "Relances de soirée",
          "Scénarios génériques à monter",
          "Annonce, dernier appel, merci, on t’a manqué, habitué qui décroche, reconquête",
        ],
        [
          "Ventes rattachées à un message",
          "Clics et ouvertures",
          "Billets Shotgun vendus après un clic, par message",
        ],
        ["SMS", "Crédits vendus à part", "35 Yunits par SMS en France"],
        [
          "Prix d’entrée",
          "Gratuit (300 e-mails/jour), Starter dès 7 €/mois",
          "24 € HT/mois, envois en Yunits (1 e-mail = 1 Yunit)",
        ],
      ],
      footnote:
        "Prix Brevo : page tarifs publique de Brevo, relevée le 7 octobre 2026, « à partir de » selon le volume. Prix Yuno CRM : prix de lancement, gardé tant que vous restez abonné.",
    },
    {
      type: "cards",
      id: "quand",
      eyebrow: "Pour choisir",
      title: "Quand Brevo suffit, quand Yuno CRM change la donne.",
      accent: "change la donne",
      items: [
        {
          title: "Brevo suffit si…",
          body: "Vous envoyez une newsletter mensuelle à toute votre liste, vous n’avez pas besoin de distinguer vos habitués, et vos ventes se lisent soirée par soirée sur Shotgun.",
        },
        {
          title: "Yuno CRM change la donne si…",
          body: "Vous faites plusieurs soirées par mois, votre public revient d’une date à l’autre, et vous voulez savoir qui relancer, quand, et ce que chaque message a rapporté.",
        },
        {
          title: "Les deux ensemble ?",
          body: "C’est possible : votre fichier Brevo s’importe dans Yuno CRM et rejoint la même base, sans doublons. Mais deux outils qui écrivent aux mêmes gens finissent par les saturer : Yuno écarte déjà ceux qu’il a trop sollicités, pas ceux que Brevo a contactés.",
        },
      ],
    },
    {
      type: "steps",
      id: "passer",
      eyebrow: "Passer de Brevo à Yuno CRM",
      title: "Sans perdre un seul contact.",
      accent: "un seul contact",
      items: [
        {
          title: "Exportez votre liste Brevo",
          body: "Un export CSV de vos contacts, avec la colonne qui indique s’ils ont accepté vos e-mails.",
        },
        {
          title: "Connectez Shotgun et importez",
          body: "Yuno lit vos soirées Shotgun, puis vous importez le fichier : les doublons sont fusionnés, les désabonnés ne sont jamais réabonnés.",
        },
        {
          title: "Rejouez vos modèles",
          body: "Recréez vos e-mails dans l’éditeur de Yuno avec les blocs qui lisent la soirée, puis allumez les relances.",
        },
      ],
    },
  ],
  faq: {
    title: "Questions fréquentes.",
    accent: "fréquentes",
    items: [
      {
        q: "Brevo est-il moins cher que Yuno CRM ?",
        a: "Pour de l’e-mail seul, oui : Brevo a une offre gratuite et une offre Starter dès 7 € par mois. Yuno CRM coûte 24 € HT par mois parce qu’il fait autre chose : lire votre billetterie, classer vos clients et relier chaque vente au message qui l’a amenée.",
      },
      {
        q: "Mes désabonnés Brevo seront-ils respectés ?",
        a: "Oui. À l’import, Yuno ne réabonne jamais un contact qui s’est désabonné, et chaque message propose une désinscription.",
      },
      {
        q: "Puis-je garder la synchro Shotgun vers Brevo ?",
        a: "Oui, elle ne gêne pas Yuno CRM, qui lit Shotgun de son côté. Évitez seulement d’envoyer les mêmes relances depuis les deux outils.",
      },
    ],
  },
  sources: {
    title: "Sources",
    note: "Pages publiques consultées le 7 octobre 2026.",
    items: [
      { label: "Brevo — Tarifs", url: "https://www.brevo.com/fr/pricing/" },
      {
        label: "Shotgun — Nouveautés de septembre 2025 (synchro Mailchimp et Brevo)",
        url: "https://support-pro.shotgun.live/hc/fr/articles/29417335388178",
      },
    ],
  },
  related: ["shotgun", "export", "organizer", "loyalty"],
};
