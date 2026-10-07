import type { CrmPageContent } from "./types";

// Query: "crm boîte de nuit", "crm discothèque", "crm club de nuit", "fidéliser
// clientèle boîte de nuit". The SERP of 7 Oct 2026 is mostly sports clubs and
// Club Med: a page that answers for a nightclub can lead it.
export const club: CrmPageContent = {
  id: "club",
  kind: "solution",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "CRM pour boîte de nuit : habitués, relances, SMS | Yuno CRM",
    description:
      "Le CRM des boîtes de nuit qui vendent sur Shotgun : fichier clients, habitués qui décrochent, bilan de chaque soirée, e-mails et SMS ciblés. Essai 14 jours.",
  },
  crumb: "CRM pour boîte de nuit",
  card: {
    title: "CRM pour boîte de nuit",
    body: "Vos habitués, semaine après semaine, et ceux qui décrochent avant qu’ils ne partent ailleurs.",
  },
  hero: {
    kicker: "Boîtes de nuit et clubs",
    title: "Le CRM des boîtes de nuit qui veulent revoir leurs habitués.",
    accent: "revoir leurs habitués",
    sub: "Vous vendez vos entrées sur Shotgun ou ailleurs. Yuno CRM réunit tous vos acheteurs dans un seul fichier clients, repère les habitués qui décrochent et vous aide à les faire revenir, par e-mail et par SMS.",
    cta: "Essayer 14 jours gratuitement",
    note: [
      "Branché à Shotgun en 2 minutes",
      "Vous gardez votre billetterie",
      "Sans carte bancaire",
    ],
  },
  answer: {
    title: "Un CRM pour une boîte de nuit, c’est quoi ?",
    paragraphs: [
      "C’est le fichier de vos clients, tenu à jour tout seul : qui est venu, combien de fois, quand pour la dernière fois, et s’il accepte de recevoir vos messages. Une billetterie vous donne des ventes par soirée ; un CRM vous donne des **personnes**, d’une soirée à l’autre.",
      "Pour un club, l’enjeu est simple : la plupart de vos entrées viennent de gens qui sont déjà venus. Les repérer, savoir quand ils décrochent et leur écrire au bon moment rapporte plus qu’une campagne de plus envoyée à tout le monde.",
    ],
    bullets: [
      "Un fichier clients unique, doublons fusionnés, mis à jour à chaque vente",
      "Des segments prêts : habitués, nouveaux, endormis, gros dépensiers",
      "Le bilan de chaque soirée, comparé à la précédente au même moment",
      "Des e-mails et des SMS qui partent seuls au bon moment",
    ],
  },
  blocks: [
    {
      type: "cards",
      id: "fonctions",
      eyebrow: "Ce que Yuno CRM fait pour un club",
      title: "Savoir qui vient, et qui ne vient plus.",
      accent: "qui ne vient plus",
      items: [
        {
          title: "Vos habitués, nommés",
          body: "Par défaut, un habitué est venu à 3 soirées ou plus sur les 6 derniers mois. Vous réglez ce seuil selon votre rythme : un club ouvert deux soirs par semaine n’a pas les habitudes d’une soirée mensuelle.",
        },
        {
          title: "Ceux qui décrochent, repérés",
          body: "L’automatisation « L’habitué décroche » écrit à un habitué qui n’est pas revenu depuis plusieurs semaines, avant qu’il ne devienne un ancien client. Vous choisissez le délai.",
        },
        {
          title: "Le bilan de chaque soirée",
          body: "Ventes, nouveaux et habitués, rythme des achats : chaque soirée est comparée à la précédente de la même série, au même nombre de jours avant l’ouverture des portes.",
        },
        {
          title: "D’où viennent vos ventes",
          body: "Story Instagram, lien en bio, e-mail, SMS, app Shotgun, accès direct : Yuno rattache chaque vente à sa source, et vous dit quelle publication a rempli la salle.",
        },
        {
          title: "Des e-mails qui lisent la soirée",
          body: "Les blocs Soirée, Billetterie, Line-up et Compte à rebours lisent votre billetterie au moment de l’envoi : un tarif épuisé s’affiche épuisé, la guest list gratuite s’affiche gratuite.",
        },
        {
          title: "Le SMS, sous votre nom",
          body: "Un SMS part avec votre nom d’expéditeur et la mention STOP obligatoire, jamais entre 21 h 30 et 8 h. C’est le canal du jour J, quand l’e-mail arrive trop tard.",
        },
      ],
    },
    {
      type: "text",
      id: "pourquoi",
      eyebrow: "Pourquoi un CRM",
      title: "Une billetterie compte les billets. Un CRM compte les gens.",
      accent: "compte les gens",
      paragraphs: [
        "Votre billetterie a déjà des contacts. Shotgun, par exemple, vous donne une liste de contacts, des segments et l’envoi de newsletters (voir [Shotgun + Yuno CRM](page:shotgun)). Ce qui manque à un club, c’est la lecture d’une **saison** : qui revient chaque mois, qui a lâché depuis la rentrée, quelle soirée a fait venir le plus de nouveaux, et quel message a vraiment fait vendre.",
        "Yuno CRM part des mêmes ventes et les relit dans la durée. Il ne vend rien, ne scanne rien et ne touche pas à votre billetterie : il lit, il range, et il vous dit à qui écrire.",
      ],
    },
    {
      type: "steps",
      id: "demarrer",
      eyebrow: "Démarrer",
      title: "Votre club dans Yuno CRM en trois étapes.",
      accent: "trois étapes",
      items: [
        {
          title: "Connectez votre billetterie",
          body: "Sur Shotgun, copiez votre ID organisateur et générez un jeton API (Paramètres › Intégrations › Shotgun APIs), puis collez-les dans Yuno. Sur un autre outil, importez votre fichier clients en CSV ou Excel.",
        },
        {
          title: "Yuno range votre historique",
          body: "Soirées, billets et acheteurs sont importés, regroupés par personne et classés par fidélité. Ensuite, Yuno relit Shotgun toutes les 15 minutes.",
        },
        {
          title: "Allumez vos relances",
          body: "Annonce d’une nouvelle soirée, dernier appel la veille, merci le lendemain, habitué qui décroche : chaque automatisation s’active d’un clic et respecte les règles d’envoi de Yuno.",
        },
      ],
    },
    {
      type: "table",
      id: "relances",
      eyebrow: "Les relances d’un club",
      title: "Qui recevoir quoi, et quand.",
      accent: "et quand",
      head: ["Moment", "Pour qui", "Message"],
      rows: [
        [
          "Mise en vente",
          "Toute la base qui a accepté vos e-mails",
          "Annonce de la soirée, tarifs à jour",
        ],
        [
          "Veille ou jour J",
          "Ceux qui n’ont pas encore leur place",
          "Dernier appel par e-mail, un SMS si vous le programmez",
        ],
        ["Lendemain", "Ceux qui sont venus (scan à la porte)", "Merci, et la prochaine date"],
        ["Lendemain", "Ceux qui avaient un billet sans venir", "On t’a manqué"],
        ["Quelques semaines sans venir", "Vos habitués", "L’habitué décroche"],
        ["Plusieurs mois sans venir", "Les anciens clients", "Reconquête"],
      ],
      footnote:
        "Au plus un message automatique par personne toutes les 48 h, jamais entre 23 h et 9 h, uniquement aux contacts qui ont accepté.",
    },
    {
      type: "callout",
      title: "Votre prochaine soirée se vend déjà.",
      body: "Connectez Shotgun en 2 minutes et voyez vos habitués avant samedi.",
      cta: "Essayer 14 jours gratuitement",
    },
  ],
  faq: {
    title: "Questions des clubs.",
    accent: "clubs",
    items: [
      {
        q: "Faut-il changer de billetterie ?",
        a: "Non. Vous gardez Shotgun, ou l’outil que vous utilisez. Yuno CRM lit vos ventes et s’occupe du reste : fichier clients, relances, bilans. Si vous voulez aussi vendre vos entrées, vos tables VIP et votre guest list avec Yuno, Yuno Billetterie s’ouvre sur le même compte.",
      },
      {
        q: "Qu’est-ce qu’un habitué pour Yuno ?",
        a: "Par défaut, un client venu à 3 soirées ou plus sur les 6 derniers mois. Un endormi n’est pas revenu depuis 4 mois. Les deux seuils se règlent dans la Console.",
      },
      {
        q: "Puis-je écrire à tous les acheteurs de mon club ?",
        a: "Non, et c’est la loi : seuls ceux qui ont accepté de recevoir vos messages les reçoivent. Les autres restent dans vos chiffres (fidélité, bilans) sans rien recevoir.",
      },
      {
        q: "Combien coûte Yuno CRM pour un club ?",
        a: "24 € HT par mois au prix de lancement, gardé tant que vous restez abonné. Les envois se paient en Yunits : 1 e-mail = 1 Yunit, 1 SMS en France = 35 Yunits. L’essai dure 14 jours, sans carte bancaire.",
      },
      {
        q: "Mon équipe peut-elle l’utiliser ?",
        a: "Oui, sans limite de places. Chaque personne a son accès : administrateur, éditeur ou lecteur.",
      },
    ],
  },
  related: ["shotgun", "loyalty", "sms", "organizer"],
};
