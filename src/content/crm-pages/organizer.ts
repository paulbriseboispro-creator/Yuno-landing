import type { CrmPageContent } from "./types";

// Query: "crm organisateur de soirée", "logiciel organisateur de soirée",
// "fichier clients soirée", "collectif soirée". Collectives "bring their own
// public" to clubs (Tsugi): the audience relationship is theirs, and they move
// from venue to venue. No software page answered this on 7 Oct 2026.
export const organizer: CrmPageContent = {
  id: "organizer",
  kind: "solution",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "CRM pour organisateur de soirées et collectifs | Yuno CRM",
    description:
      "Vous changez de lieu, votre public vous suit. Yuno CRM garde vos acheteurs d’une soirée à l’autre, prépare vos préventes et relance au bon moment. Avec Shotgun.",
  },
  crumb: "CRM pour organisateurs",
  card: {
    title: "CRM pour organisateurs et collectifs",
    body: "Un public qui vous suit d’un lieu à l’autre, des préventes qui partent plus vite.",
  },
  hero: {
    kicker: "Organisateurs, collectifs, promoteurs",
    title: "Votre public change de lieu avec vous. Votre fichier aussi.",
    accent: "Votre fichier aussi",
    sub: "Une salle cette semaine, un warehouse le mois prochain : vos soirées bougent, votre public reste le vôtre. Yuno CRM réunit les acheteurs de toutes vos dates dans un seul fichier clients, et vous aide à remplir la prochaine avant même d’ouvrir la billetterie.",
    cta: "Essayer 14 jours gratuitement",
    note: ["Toutes vos dates dans une base", "Branché à Shotgun", "Sans carte bancaire"],
  },
  answer: {
    title: "Pourquoi un organisateur a besoin d’un CRM",
    paragraphs: [
      "Un club garde ses murs. Un organisateur, lui, n’a que son public : c’est ce qu’il apporte au lieu qui l’accueille, et c’est ce qui fait vendre la date suivante. Encore faut-il le connaître autrement que par une suite d’exports.",
      "Yuno CRM relie toutes vos soirées : qui vous suit depuis le début, qui est venu une fois, qui n’a plus pris de place depuis la rentrée. Vous écrivez à ces gens-là, par e-mail ou par SMS, au moment où ils sont le plus prêts à acheter : l’annonce, puis la veille.",
    ],
    bullets: [
      "Un fichier clients commun à toutes vos dates et à tous vos lieux",
      "Chaque soirée comparée à la précédente de la même série",
      "Les ventes rattachées à chaque story, lien en bio ou e-mail",
      "Des pages d’inscription pour vos préventes et listes d’attente",
    ],
  },
  blocks: [
    {
      type: "cards",
      id: "fonctions",
      eyebrow: "Ce que Yuno CRM change pour un organisateur",
      title: "Remplir la prochaine, pas seulement compter la dernière.",
      accent: "Remplir la prochaine",
      items: [
        {
          title: "Une base qui vous suit",
          body: "Toutes vos soirées Shotgun sont importées, quelle que soit la salle. Un fichier d’une ancienne billetterie s’ajoute en CSV ou Excel et rejoint la même base, sans doublons.",
        },
        {
          title: "La prévente avant tout le monde",
          body: "Annoncez la date à vos habitués d’abord. L’e-mail lit vos tarifs Shotgun au moment de l’envoi : le premier palier épuisé s’affiche épuisé, sans que vous ayez à le corriger.",
        },
        {
          title: "Quelle story a vendu",
          body: "Un lien Yuno par story Instagram, un pour votre bio : chaque vente rapportée par Shotgun est rattachée à la publication qui l’a amenée. Voir [le guide des liens story](page:instagram).",
        },
        {
          title: "Pages d’inscription",
          body: "Une page à votre image pour une prévente, une liste d’attente ou votre communauté, avec son QR code. Chaque inscription confirmée rejoint votre base avec la preuve de l’accord.",
        },
        {
          title: "La guest list, enfin lue",
          body: "Invitations et billets gratuits Shotgun sont analysés à part : qui est vraiment venu, et quels invités sont devenus des clients payants.",
        },
        {
          title: "Votre IA sur vos chiffres",
          body: "Branchez ChatGPT, Claude ou Gemini par le MCP de Yuno et demandez : « quelle soirée a fait venir le plus de nouveaux en septembre ? ». Les réponses partent de vos vrais chiffres.",
        },
      ],
    },
    {
      type: "table",
      id: "avant-apres",
      eyebrow: "Un mois de soirée",
      title: "Avant et après Yuno CRM.",
      accent: "après Yuno CRM",
      head: ["Moment", "Sans CRM", "Avec Yuno CRM"],
      rows: [
        [
          "J-30, annonce",
          "Une story et une newsletter à toute la liste",
          "Prévente ouverte d’abord aux habitués, page d’inscription pour les autres",
        ],
        [
          "J-10",
          "On regarde le compteur de billets",
          "Le rythme comparé à la dernière date, au même jour",
        ],
        ["J-1", "Une dernière story", "Dernier appel à ceux qui n’ont pas encore leur place"],
        [
          "Lendemain",
          "On passe à la suivante",
          "Merci aux présents, la prochaine date en avant-première",
        ],
        [
          "Bilan",
          "Un export Shotgun dans un tableur",
          "Nouveaux, habitués, source de chaque vente, prêt à comparer",
        ],
      ],
    },
    {
      type: "steps",
      id: "demarrer",
      eyebrow: "Démarrer",
      title: "Connectez, rangez, relancez.",
      accent: "relancez",
      items: [
        {
          title: "Connectez Shotgun",
          body: "Votre ID organisateur et un jeton API, générés dans le Smartboard (Paramètres › Intégrations › Shotgun APIs). Yuno ne fait que lire : rien ne change chez Shotgun.",
        },
        {
          title: "Ajoutez vos anciens fichiers",
          body: "Un export d’une autre billetterie, une liste Brevo ou Mailchimp : Yuno repère les colonnes, vous montre un aperçu, puis fusionne les doublons.",
        },
        {
          title: "Préparez la prochaine date",
          body: "Créez vos segments en un clic (une quarantaine de modèles prêts), allumez l’annonce et le dernier appel, posez vos liens de story.",
        },
      ],
    },
    {
      type: "callout",
      title: "Votre public est déjà là. Retrouvez-le.",
      body: "14 jours pour voir vos habitués, vos nouveaux et ceux qui décrochent.",
      cta: "Essayer 14 jours gratuitement",
    },
  ],
  faq: {
    title: "Questions des organisateurs.",
    accent: "organisateurs",
    items: [
      {
        q: "Je n’ai pas de lieu fixe, ça marche quand même ?",
        a: "Oui, c’est même le cas pour lequel Yuno CRM est le plus utile : la base suit vos clients d’une date à l’autre, quel que soit le lieu. Chaque soirée garde son bilan.",
      },
      {
        q: "Je vends sur Shotgun pour certaines dates et ailleurs pour d’autres.",
        a: "Shotgun se connecte directement. Pour les autres dates, importez le fichier des acheteurs (CSV ou Excel) : tout rejoint la même base, sans doublons.",
      },
      {
        q: "Puis-je donner un accès à mes associés ?",
        a: "Oui, sans limite de places : administrateur, éditeur ou lecteur. Chaque personne a son propre accès.",
      },
      {
        q: "Les acheteurs Shotgun peuvent-ils tous recevoir mes e-mails ?",
        a: "Seuls ceux qui ont accepté vos newsletters chez Shotgun entrent dans votre liste d’envoi. Les autres comptent dans vos chiffres sans rien recevoir. Les pages d’inscription Yuno servent justement à agrandir cette liste, avec la preuve de l’accord.",
      },
      {
        q: "Combien ça coûte ?",
        a: "24 € HT par mois au prix de lancement, puis vos envois en Yunits (1 e-mail = 1 Yunit, 1 SMS en France = 35 Yunits). Essai de 14 jours sans carte.",
      },
    ],
  },
  related: ["shotgun", "instagram", "export", "club"],
};
