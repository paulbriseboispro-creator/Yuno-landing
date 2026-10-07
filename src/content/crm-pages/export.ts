import type { CrmPageContent } from "./types";

// Query: "exporter les participants shotgun", "export acheteurs shotgun",
// "shotgun export", "shotgun brevo", "jeton api shotgun". Every reader is an
// organizer on Shotgun: the ideal customer. Facts from Shotgun's public help
// centre (contacts, API token, Brevo/Mailchimp sync), dated in `sources`.
export const exportGuide: CrmPageContent = {
  id: "export",
  kind: "guide",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "Exporter ses acheteurs Shotgun : CSV, Brevo, API (guide 2026)",
    description:
      "Les trois façons de sortir vos acheteurs de Shotgun (export, synchro Brevo/Mailchimp, API), ce que vous récupérez, ce que la loi permet d’en faire.",
  },
  crumb: "Exporter ses acheteurs Shotgun",
  card: {
    title: "Exporter ses acheteurs Shotgun",
    body: "Export, synchro Brevo/Mailchimp ou API : ce que vous récupérez, et ce que vous avez le droit d’en faire.",
  },
  hero: {
    kicker: "Guide · Shotgun",
    title: "Exporter vos acheteurs Shotgun, et en faire quelque chose.",
    accent: "en faire quelque chose",
    sub: "Shotgun vous laisse sortir vos données de trois façons. Ce guide compare l’export, la synchronisation vers Brevo ou Mailchimp et l’API, dit ce que vous récupérez avec chacune, et rappelle à qui vous avez le droit d’écrire ensuite.",
    cta: "Brancher Shotgun à Yuno CRM",
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "**Export** : la liste des billets ou des participants d’une soirée, en CSV, depuis le Smartboard. Pratique pour une fois, à refaire à chaque soirée.",
      "**Synchro Brevo ou Mailchimp** : depuis septembre 2025, Shotgun synchronise vos contacts vers ces outils, sans export manuel.",
      "**API** : avec votre ID organisateur et un jeton (Paramètres › Intégrations › Shotgun APIs), un outil externe lit vos soirées et vos billets en continu. C’est ainsi que se branche Yuno CRM.",
    ],
  },
  blocks: [
    {
      type: "table",
      id: "comparaison",
      eyebrow: "Les trois méthodes",
      title: "Ce que vous récupérez avec chacune.",
      accent: "avec chacune",
      head: ["", "Export CSV", "Synchro Brevo / Mailchimp", "API (jeton)"],
      rows: [
        ["Mise à jour", "À la main, soirée par soirée", "Automatique", "Automatique"],
        [
          "Ce qui sort",
          "Billets ou participants d’une soirée",
          "Vos contacts et leurs attributs",
          "Soirées et billets, toutes dates",
        ],
        [
          "Historique multi-soirées",
          "À recoller vous-même",
          "Selon les attributs synchronisés",
          "Oui",
        ],
        [
          "Pour qui",
          "Un bilan ponctuel",
          "Une newsletter dans un outil généraliste",
          "Un outil qui analyse et relance (CRM)",
        ],
        ["Effort", "Faible, mais répété", "Une configuration", "Coller un ID et un jeton"],
      ],
      footnote: "D’après le centre d’aide public de Shotgun, relevé le 7 octobre 2026.",
    },
    {
      type: "text",
      id: "droit",
      eyebrow: "Ce que la loi permet",
      title: "Exporter n’est pas avoir le droit d’écrire.",
      accent: "le droit d’écrire",
      paragraphs: [
        "Un acheteur vous a donné son e-mail pour recevoir son billet. Pour lui envoyer de la **prospection** (l’annonce de votre prochaine soirée), il faut son accord préalable, comme le rappelle la CNIL. Shotgun suit cet accord : chaque contact porte son statut d’abonnement aux newsletters et notifications.",
        "Avant d’importer un export dans un outil d’e-mailing, gardez la colonne d’accord et n’écrivez qu’à ceux qui ont accepté. Un e-mail de service (le billet, un changement d’horaire) n’est pas de la prospection ; une annonce de soirée, si.",
      ],
      bullets: [
        "Gardez la trace de l’origine de l’accord : date et canal.",
        "Chaque message marketing propose un lien de désinscription.",
        "Un désabonné ne se réabonne pas à l’import suivant.",
      ],
    },
    {
      type: "cards",
      id: "ensuite",
      eyebrow: "Après l’export",
      title: "Ce que vous pouvez en tirer.",
      accent: "en tirer",
      items: [
        {
          title: "Vos habitués",
          body: "Recollez les exports de plusieurs soirées par e-mail : ceux qui reviennent apparaissent. C’est long à la main ; Yuno CRM le fait à chaque vente.",
        },
        {
          title: "Ceux qui décrochent",
          body: "Un habitué absent depuis plusieurs semaines est le client le plus facile à faire revenir, à condition de le repérer à temps.",
        },
        {
          title: "Ce qui a fait vendre",
          body: "La colonne utm_source de l’export des commandes dit d’où vient chaque achat. Voir [le guide des liens story Instagram](page:instagram).",
        },
      ],
    },
    {
      type: "callout",
      title: "Arrêtez de recoller des exports.",
      body: "Branchez Shotgun à Yuno CRM : historique importé, mis à jour toutes les 15 minutes, lecture seule.",
      cta: "Brancher Shotgun à Yuno CRM",
    },
  ],
  faq: {
    title: "Questions fréquentes.",
    accent: "fréquentes",
    items: [
      {
        q: "Où trouver l’ID organisateur et le jeton API Shotgun ?",
        a: "Dans le Smartboard : Paramètres › Intégrations › Shotgun APIs. L’ID s’affiche directement, le jeton se génère avec « Générer un jeton ».",
      },
      {
        q: "Puis-je envoyer une newsletter à tous les acheteurs exportés ?",
        a: "Non : seulement à ceux qui ont accepté de recevoir vos messages. Les autres ont acheté un billet, pas un abonnement.",
      },
      {
        q: "L’API Shotgun permet-elle de modifier des billets ?",
        a: "Yuno CRM ne s’en sert que pour lire. Il ne crée, ne rembourse et ne publie rien chez Shotgun.",
      },
    ],
  },
  sources: {
    title: "Sources",
    note: "Pages publiques consultées le 7 octobre 2026.",
    items: [
      {
        label: "Shotgun — Comprendre votre liste de contacts",
        url: "https://support-pro.shotgun.live/hc/fr/articles/9439619664402",
      },
      {
        label: "Shotgun — Trouvez votre ID organisateur et votre jeton API",
        url: "https://support-pro.shotgun.live/hc/fr/articles/33561354477970",
      },
      {
        label: "Shotgun — Nouveautés de septembre 2025",
        url: "https://support-pro.shotgun.live/hc/fr/articles/29417335388178",
      },
      {
        label: "CNIL — La prospection commerciale par courrier électronique, SMS et MMS",
        url: "https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel",
      },
    ],
  },
  related: ["shotgun", "brevo", "instagram", "loyalty"],
};
