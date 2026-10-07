import type { CrmPageContent } from "./types";

// Query: "lien story instagram billetterie", "associer instagram et shotgun",
// "lien tracké story instagram", "savoir quelle story a vendu". Facts on the
// Shotgun side: a tracking link is the event URL with a source parameter, the
// source comes back in the utm_source column of the orders export and in the
// Tickets API; utm_medium is replaced by the platform and utm_campaign is not
// returned (yuno repo docs/designs/SHOTGUN_API_REFERENCE.md). Hence the tool
// puts everything in utm_source.
export const instagram: CrmPageContent = {
  id: "instagram",
  kind: "guide",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "Lien story Instagram : savoir quelle story vend vos billets Shotgun",
    description:
      "Un lien par story ou par bio, la source qui remonte dans Shotgun, et un générateur gratuit. Le guide pour savoir quelle publication remplit votre soirée.",
  },
  crumb: "Liens story Instagram et Shotgun",
  card: {
    title: "Quelle story a vendu vos billets ?",
    body: "Un lien par publication, la source qui remonte chez Shotgun, et un générateur gratuit.",
  },
  hero: {
    kicker: "Guide · Instagram et Shotgun",
    title: "Quelle story a vraiment vendu vos billets Shotgun ?",
    accent: "vraiment vendu",
    sub: "Instagram vous dit combien de personnes ont vu une story. Pas combien ont acheté. En donnant à chaque publication son propre lien, la vente revient dans Shotgun avec sa source. Méthode, pièges, et un générateur de liens gratuit.",
    cta: "Suivre mes stories avec Yuno",
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "Ajoutez à l’adresse de votre soirée Shotgun un paramètre **utm_source** différent pour chaque publication (une story, votre lien en bio, un groupe WhatsApp). Quand quelqu’un achète après avoir cliqué, Shotgun garde cette source : elle apparaît dans la colonne utm_source de l’export des commandes et dans son API.",
      "Mettez tout l’identifiant dans utm_source. Dans les données de billets, Shotgun remplace utm_medium par la plateforme d’achat (site, app, widget) et ne renvoie pas utm_campaign : ce qui n’est pas dans utm_source se perd.",
    ],
  },
  blocks: [
    {
      type: "tool",
      tool: "shotgun-links",
      id: "generateur",
      eyebrow: "Outil gratuit",
      title: "Générez un lien suivi par publication.",
      accent: "par publication",
      sub: "Collez l’adresse de votre soirée Shotgun, choisissez l’emplacement, nommez la publication. Rien n’est envoyé à Yuno : le lien se construit dans votre navigateur.",
    },
    {
      type: "steps",
      id: "methode",
      eyebrow: "La méthode",
      title: "Un lien par publication, en quatre étapes.",
      accent: "quatre étapes",
      items: [
        {
          title: "Listez vos publications",
          body: "Story d’annonce, story line-up, story « dernières places », lien en bio, message dans le groupe WhatsApp, newsletter : chacune aura son lien.",
        },
        {
          title: "Donnez un nom court à chacune",
          body: "Par exemple ig-story-lineup, ig-bio, wa-groupe. Lisible dans un export, sans espace ni accent.",
        },
        {
          title: "Posez le lien au bon endroit",
          body: "En story, avec le sticker Lien. En bio, dans le champ du site web (un seul lien à la fois, changez-le à chaque soirée).",
        },
        {
          title: "Lisez les ventes par source",
          body: "Sur Shotgun, exportez les commandes et triez la colonne utm_source. Ou laissez Yuno CRM faire le compte, soirée par soirée.",
        },
      ],
    },
    {
      type: "text",
      id: "pieges",
      eyebrow: "Les pièges",
      title: "Ce qui fausse le compte.",
      accent: "fausse le compte",
      paragraphs: [
        "Une source ne mesure que les acheteurs qui ont **cliqué ce lien-là**. Quelqu’un qui voit votre story, ferme Instagram et achète plus tard depuis l’app Shotgun ne sera pas attribué à la story : comptez vos chiffres comme un minimum, pas comme un total.",
      ],
      bullets: [
        "Le même lien partout : vous ne saurez jamais quelle publication a vendu.",
        "Des informations dans utm_campaign ou utm_medium : elles ne reviennent pas dans les données de billets Shotgun.",
        "Un lien en bio jamais mis à jour : il pointe vers la soirée de la semaine dernière.",
        "Des noms illisibles (story1, story2) : dans un mois, plus personne ne sait de quoi il s’agissait.",
      ],
    },
    {
      type: "cards",
      id: "yuno",
      eyebrow: "Avec Yuno CRM",
      title: "Le compte se fait tout seul.",
      accent: "tout seul",
      items: [
        {
          title: "Un lien court par publication",
          body: "Dans l’onglet Liens de partage d’une soirée, créez un lien yunoapp.eu/go/… pour une story, votre bio Instagram ou TikTok. Nommez la publication, ajoutez sa capture si vous voulez.",
        },
        {
          title: "Clics et ventes, publication par publication",
          body: "Yuno compte les clics sans cookie, puis rattache chaque vente que Shotgun rapporte au lien qui l’a amenée. Vous voyez quelle story a rempli la salle.",
        },
        {
          title: "Instagram n’est jamais lu",
          body: "Yuno n’a aucun accès à votre compte Instagram : il mesure ce qui passe par ses liens et ce que Shotgun lui rapporte, rien d’autre.",
        },
      ],
    },
  ],
  faq: {
    title: "Questions fréquentes.",
    accent: "fréquentes",
    items: [
      {
        q: "Shotgun a-t-il ses propres liens de suivi ?",
        a: "Oui : un lien de suivi Shotgun est l’adresse de la soirée avec une source. La source remonte dans l’export des commandes. Ce guide décrit la même mécanique, à appliquer publication par publication.",
      },
      {
        q: "Pourquoi tout mettre dans utm_source ?",
        a: "Parce que c’est le seul champ que les données de billets Shotgun rendent tel quel. utm_medium est remplacé par la plateforme d’achat, utm_campaign n’est pas renvoyé.",
      },
      {
        q: "Peut-on mettre un lien dans une story Instagram ?",
        a: "Oui, avec le sticker Lien, sur tous les comptes. Dans un post ou un reel, la légende n’a pas de lien cliquable : passez par la bio ou la story.",
      },
      {
        q: "Combien de temps garder un lien ?",
        a: "Le temps de la soirée. Pour la suivante, créez de nouveaux liens : vous pourrez comparer les publications d’une date à l’autre.",
      },
    ],
  },
  related: ["shotgun", "export", "organizer", "loyalty"],
};
