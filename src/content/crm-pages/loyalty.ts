import type { CrmPageContent } from "./types";

// Query: "fidéliser clientèle boîte de nuit", "programme fidélité boîte de nuit",
// "attirer plus de monde en boîte de nuit", "remplir sa boîte de nuit". The
// pages ranking on 7 Oct 2026 are old, thin or about loyalty cards. A method
// built on what a ticketing base really contains. No market statistic is
// quoted: the numbers to watch are the reader's own.
export const loyalty: CrmPageContent = {
  id: "loyalty",
  kind: "guide",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "Fidéliser le public d’une boîte de nuit : la méthode pas à pas",
    description:
      "Habitués, nouveaux, endormis : comment lire votre public, quoi leur écrire et quand, et les trois chiffres à suivre pour remplir chaque soirée.",
  },
  crumb: "Fidéliser son public",
  card: {
    title: "Fidéliser le public d’une boîte de nuit",
    body: "Lire son public, écrire au bon moment, et les trois chiffres qui disent si ça marche.",
  },
  hero: {
    kicker: "Guide · Fidélisation",
    title: "Fidéliser votre public, soirée après soirée.",
    accent: "soirée après soirée",
    sub: "Une carte de fidélité ne fait pas revenir quelqu’un qui a oublié votre soirée. Ce qui marche : savoir qui sont vos habitués, remarquer quand ils décrochent, et leur écrire avant tout le monde. La méthode, pas à pas.",
    cta: "Voir mes habitués avec Yuno",
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "Classez votre public en quatre groupes : **habitués**, **occasionnels**, **nouveaux** et **endormis**. Écrivez à chacun un message différent : la prévente en avant-première pour les habitués, le dernier appel pour ceux qui n’ont pas encore pris leur place, un merci aux nouveaux le lendemain, une relance à ceux qui décrochent.",
      "Puis suivez trois chiffres d’une soirée à l’autre : la part de nouveaux, la part d’habitués, et combien de nouveaux reviennent.",
    ],
  },
  blocks: [
    {
      type: "table",
      id: "groupes",
      eyebrow: "Étape 1",
      title: "Les quatre groupes de votre public.",
      accent: "quatre groupes",
      head: ["Groupe", "Définition (à ajuster)", "Ce qu’il attend"],
      rows: [
        [
          "Habitués",
          "3 soirées ou plus sur les 6 derniers mois",
          "Être prévenus en premier, être reconnus",
        ],
        ["Occasionnels", "Venus 2 fois", "Une bonne raison de revenir : un line-up, une date"],
        ["Nouveaux", "Une première soirée", "Un merci, et la prochaine date"],
        ["Endormis", "Plus revenus depuis 4 mois", "Un message personnel, pas une pub de plus"],
      ],
      footnote:
        "Ces seuils sont ceux de Yuno CRM par défaut. Un club ouvert chaque week-end et un collectif mensuel n’ont pas le même rythme : ajustez-les.",
    },
    {
      type: "steps",
      id: "relances",
      eyebrow: "Étape 2",
      title: "Six messages qui font revenir.",
      accent: "font revenir",
      sub: "Au plus un message automatique par personne tous les deux jours : au-delà, vous perdez des abonnés plus vite que vous ne vendez.",
      items: [
        {
          title: "La mise en vente, habitués d’abord",
          body: "Ouvrez la prévente à vos habitués quelques heures avant le public. C’est la reconnaissance qui coûte le moins cher.",
        },
        {
          title: "Le dernier appel",
          body: "La veille ou le jour J, uniquement à ceux qui n’ont pas encore leur place. Jamais à ceux qui l’ont déjà.",
        },
        {
          title: "Le merci du lendemain",
          body: "À ceux qui sont venus, scannés à la porte. Une photo, un mot, la prochaine date.",
        },
        {
          title: "« On t’a manqué »",
          body: "À ceux qui avaient un billet mais ne sont pas venus. Sans reproche : la date suivante, simplement.",
        },
        {
          title: "L’habitué qui décroche",
          body: "Un habitué absent depuis quelques semaines. C’est le message qui rapporte le plus, si vous l’envoyez avant qu’il ne devienne un ancien client.",
        },
        {
          title: "La reconquête",
          body: "Aux endormis, plusieurs mois plus tard, avec une vraie raison de revenir : une soirée qui leur ressemble.",
        },
      ],
    },
    {
      type: "table",
      id: "chiffres",
      eyebrow: "Étape 3",
      title: "Les trois chiffres à suivre.",
      accent: "trois chiffres",
      head: ["Chiffre", "Ce qu’il dit", "Comment le lire"],
      rows: [
        [
          "Part de nouveaux par soirée",
          "Votre capacité à recruter",
          "Trop bas : votre public vieillit avec vous",
        ],
        [
          "Part d’habitués par soirée",
          "La solidité de votre base",
          "Trop bas : chaque soirée repart de zéro",
        ],
        [
          "Nouveaux revenus sous 90 jours",
          "Votre capacité à transformer un essai",
          "C’est le chiffre que vos relances font bouger",
        ],
      ],
      footnote:
        "Comparez une soirée à la précédente de la même série, au même moment avant les portes : c’est le bilan que Yuno CRM prépare pour chaque date.",
    },
    {
      type: "text",
      id: "erreurs",
      eyebrow: "À éviter",
      title: "Les erreurs qui vident une liste.",
      accent: "vident une liste",
      paragraphs: [
        "La fidélisation se joue autant sur ce que vous n’envoyez pas que sur ce que vous envoyez.",
      ],
      bullets: [
        "Le même message à toute la base, habitués compris.",
        "Relancer quelqu’un qui a déjà son billet.",
        "Écrire la nuit : rien avant 9 h ni après 23 h pour un e-mail, rien avant 8 h ni après 21 h 30 pour un SMS.",
        "Écrire à des gens qui n’ont jamais accepté vos messages.",
        "Ne jamais regarder ce que chaque envoi a vendu.",
      ],
    },
    {
      type: "text",
      id: "guest-list",
      eyebrow: "Et la guest list ?",
      title: "Vos invités sont vos futurs clients.",
      accent: "futurs clients",
      paragraphs: [
        "La guest list fait entrer des gens qui ne vous connaissent pas encore. Ce qui compte n’est pas combien d’invités sont venus, mais combien ont ensuite **acheté** une place. Suivez-les comme des nouveaux : merci le lendemain, prévente à la date suivante.",
        "Yuno CRM lit les invitations et billets gratuits de Shotgun à part, et vous dit quels invités sont devenus des clients payants.",
      ],
    },
    {
      type: "callout",
      title: "Vos habitués sont déjà dans votre billetterie.",
      body: "Connectez Shotgun : Yuno CRM les classe en quatre groupes et prépare les six relances.",
      cta: "Voir mes habitués avec Yuno",
    },
  ],
  faq: {
    title: "Questions fréquentes.",
    accent: "fréquentes",
    items: [
      {
        q: "Une carte de fidélité marche-t-elle en boîte de nuit ?",
        a: "Elle récompense ceux qui viennent déjà. Pour faire revenir ceux qui décrochent, il faut d’abord les repérer et leur écrire : c’est le rôle d’un fichier clients tenu à jour.",
      },
      {
        q: "À partir de combien de soirées est-on un habitué ?",
        a: "Il n’y a pas de règle universelle. 3 soirées sur 6 mois est un bon point de départ pour un club ; un collectif mensuel peut descendre à 2.",
      },
      {
        q: "Combien de messages envoyer par mois ?",
        a: "Autant que de soirées, à peu près, mais jamais plus d’un message automatique tous les deux jours à la même personne.",
      },
    ],
  },
  related: ["club", "sms", "organizer", "instagram"],
};
