import type { CrmPageContent } from "./types";

// Query: "sms boîte de nuit", "sms marketing discothèque", "sms soirée",
// "envoyer sms soirée". On 7 Oct 2026 no French page answered this for nights
// (generic SMS vendors, Swiss pages). Rules: AF2M business messaging charter
// applicable from 1 March 2026 (8:00–21:30, Sundays and bank holidays now
// tolerated), Arcep decision 2022-1583 (no 06/07 numbers for automated
// messages since 1 Jan 2023), CNIL (prior consent). Yuno: 35 Yunits per SMS in
// France, 70 abroad, sender name, "STOP au 30101", floor 21:30–8:00.
export const sms: CrmPageContent = {
  id: "sms",
  kind: "guide",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "SMS pour soirées et boîtes de nuit : règles 2026, prix, exemples",
    description:
      "Horaires autorisés, mention STOP, nom d’expéditeur, consentement, longueur d’un SMS, prix, et des modèles prêts pour le jour J. Le guide du SMS de soirée.",
  },
  crumb: "SMS pour soirées",
  card: {
    title: "Le SMS de soirée en 2026",
    body: "Horaires, STOP, expéditeur, consentement, prix, et des modèles pour le jour J.",
  },
  hero: {
    kicker: "Guide · SMS",
    title: "Le SMS de soirée : ce qui est permis, ce qui marche.",
    accent: "ce qui marche",
    sub: "Le SMS est lu dans les minutes qui suivent, c’est le canal du jour J. Il est aussi le plus encadré. Horaires, consentement, expéditeur, longueur, prix : tout ce qu’il faut savoir avant d’écrire à votre public.",
    cta: "Envoyer mes SMS avec Yuno",
  },
  answer: {
    title: "Les règles en 5 lignes",
    paragraphs: [
      "Vous n’écrivez qu’aux personnes qui ont **accepté** de recevoir vos SMS. Chaque message porte une **mention STOP** gratuite. Il part entre **8 h et 21 h 30** ; depuis le 1er mars 2026, le dimanche et les jours fériés sont tolérés mais déconseillés. L’expéditeur est un **nom** (3 à 11 caractères), pas un numéro en 06 ou 07, interdit pour les envois automatisés depuis 2023.",
    ],
  },
  blocks: [
    {
      type: "table",
      id: "regles",
      eyebrow: "Le cadre",
      title: "Ce qu’un SMS marketing doit respecter.",
      accent: "doit respecter",
      head: ["Règle", "Ce qu’elle dit", "Source"],
      rows: [
        [
          "Consentement",
          "Accord préalable de la personne pour recevoir de la prospection par SMS",
          "CNIL",
        ],
        [
          "Désinscription",
          "Un moyen gratuit et simple de ne plus rien recevoir, rappelé dans chaque message (mention STOP)",
          "CNIL",
        ],
        ["Horaires", "Envois entre 8 h et 21 h 30", "Charte AF2M, 1er mars 2026"],
        [
          "Dimanche et jours fériés",
          "Tolérés depuis le 1er mars 2026, sans pression commerciale excessive",
          "Charte AF2M, 1er mars 2026",
        ],
        [
          "Expéditeur",
          "Pas de numéro en 06 ou 07 pour les envois automatisés : un nom d’expéditeur",
          "Arcep, depuis le 1er janvier 2023",
        ],
      ],
      footnote:
        "Résumé pratique, pas un conseil juridique : les textes complets sont en bas de page.",
    },
    {
      type: "cards",
      id: "longueur",
      eyebrow: "Longueur et coût",
      title: "Un SMS, c’est 160 caractères. Pas toujours.",
      accent: "Pas toujours",
      items: [
        {
          title: "160 caractères",
          body: "Avec l’alphabet SMS standard, un message tient en 160 caractères. Au-delà, il est découpé et compte pour 2 SMS ou plus.",
        },
        {
          title: "70 avec un émoji",
          body: "Un émoji ou certains caractères hors de l’alphabet standard font passer le message dans un autre encodage : 70 caractères par SMS seulement.",
        },
        {
          title: "Le lien compte aussi",
          body: "Une adresse longue mange la moitié du message. Un lien court (yunoapp.eu/go/…) laisse la place au texte, et dit d’où vient la vente.",
        },
      ],
    },
    {
      type: "table",
      id: "modeles",
      eyebrow: "Modèles",
      title: "Quatre SMS prêts pour vos soirées.",
      accent: "prêts",
      sub: "À adapter, puis à tester : envoyez-vous chaque message avant de le programmer.",
      head: ["Moment", "Exemple"],
      rows: [
        [
          "Ouverture de la prévente (habitués)",
          "BUNKER : la prévente de Techno Night ouvre pour vous, 2 h avant tout le monde. Votre place : yunoapp.eu/go/abc",
        ],
        [
          "Veille, ceux sans billet",
          "BUNKER : demain soir, Techno Night. Il reste des places au tarif Regular : yunoapp.eu/go/abc",
        ],
        [
          "Jour J, 17 h",
          "BUNKER : ce soir, portes à 23 h. Guest list gratuite avant minuit : yunoapp.eu/go/abc",
        ],
        [
          "Habitué qui décroche",
          "BUNKER : ça fait un moment ! Samedi, on vous garde une place : yunoapp.eu/go/abc",
        ],
      ],
      footnote: "La mention STOP s’ajoute au message : prévoyez-la dans votre longueur.",
    },
    {
      type: "cards",
      id: "yuno",
      eyebrow: "Avec Yuno CRM",
      title: "Les règles sont dans l’outil.",
      accent: "dans l’outil",
      items: [
        {
          title: "Rien ne part la nuit",
          body: "Aucun SMS ne part entre 21 h 30 et 8 h, quel que soit le réglage. Vous pouvez ajouter vos propres heures calmes.",
        },
        {
          title: "STOP et expéditeur gérés",
          body: "Votre nom d’expéditeur (3 à 11 lettres ou chiffres) et la mention « STOP au 30101 » sont ajoutés automatiquement. Un STOP n’est jamais réabonné.",
        },
        {
          title: "Le coût avant l’envoi",
          body: "Un SMS coûte 35 Yunits en France et 70 vers un numéro étranger. Yuno affiche le coût et votre solde avant chaque envoi. Le SMS de test est gratuit.",
        },
      ],
    },
    {
      type: "callout",
      title: "Le jour J se joue par SMS.",
      body: "Écrivez à ceux qui ont accepté vos SMS, au bon segment, sans risquer un envoi à 2 h du matin.",
      cta: "Envoyer mes SMS avec Yuno",
    },
  ],
  faq: {
    title: "Questions fréquentes.",
    accent: "fréquentes",
    items: [
      {
        q: "Puis-je envoyer un SMS à tous les acheteurs de ma soirée ?",
        a: "Pour de la prospection, seulement à ceux qui ont accepté vos SMS. Un message de service lié au billet acheté (changement d’horaire, annulation) n’en est pas.",
      },
      {
        q: "À quelle heure envoyer un SMS de soirée ?",
        a: "Entre 8 h et 21 h 30 en France. Pour un rappel du jour J, la fin d’après-midi laisse le temps de s’organiser ; testez sur deux soirées et comparez les ventes.",
      },
      {
        q: "Combien coûte un SMS avec Yuno CRM ?",
        a: "35 Yunits par SMS en France, 70 vers l’étranger. Au tarif de recharge de base (500 Yunits pour 1 € HT), un SMS en France revient à 7 centimes HT.",
      },
      {
        q: "Puis-je envoyer avec mon numéro de portable ?",
        a: "Pas pour des envois automatisés : depuis le 1er janvier 2023, les numéros en 06 et 07 ne peuvent plus servir à ces envois. Un nom d’expéditeur est la règle.",
      },
    ],
  },
  sources: {
    title: "Sources",
    note: "Pages publiques consultées le 7 octobre 2026.",
    items: [
      {
        label: "CNIL — La prospection commerciale par courrier électronique, SMS et MMS",
        url: "https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel",
      },
      {
        label:
          "La Réclame — Charte AF2M : SMS promotionnels autorisés le dimanche et les jours fériés (18 février 2026)",
        url: "https://lareclame.fr/af2m-smspromotionnels-dimanche-jourferie-330088",
      },
      {
        label: "UFC-Que Choisir — Démarchage interdit depuis les numéros en 06 et 07",
        url: "https://www.quechoisir.org/actualite-demarchage-telephonique-interdit-a-partir-de-numeros-de-telephone-mobile-n105035/",
      },
    ],
  },
  related: ["loyalty", "club", "instagram", "brevo"],
};
