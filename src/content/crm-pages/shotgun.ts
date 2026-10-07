import type { CrmPageContent } from "./types";

// Query: "shotgun crm", "crm shotgun", "shotgun smartboard contacts", "jeton api
// shotgun", "complément shotgun". Shotgun sells itself as "de la billetterie au
// CRM" and does have contacts, segments, newsletters and a Brevo/Mailchimp sync:
// this page says so (sources below) and only claims what Yuno CRM adds.
export const shotgun: CrmPageContent = {
  id: "shotgun",
  kind: "solution",
  published: "2026-10-07",
  updated: "2026-10-07",
  meta: {
    title: "Shotgun CRM : ce que Yuno ajoute à vos contacts Shotgun",
    description:
      "Gardez Shotgun pour vendre. Yuno CRM se branche par l’API en lecture seule et ajoute bilans comparés, habitués qui décrochent, SMS et ventes par story.",
  },
  crumb: "Shotgun + Yuno CRM",
  card: {
    title: "Shotgun + Yuno CRM",
    body: "Ce que Shotgun vous donne déjà, ce que Yuno ajoute, et comment brancher le jeton API.",
  },
  hero: {
    kicker: "Pour les organisateurs et clubs sur Shotgun",
    title: "Vous vendez sur Shotgun. Yuno CRM fait revenir vos acheteurs.",
    accent: "fait revenir vos acheteurs",
    sub: "Yuno CRM se branche sur votre compte Shotgun en lecture seule, avec votre ID organisateur et un jeton API. Vos ventes restent sur Shotgun ; Yuno les relit pour vous dire qui revient, qui décroche et quel message a fait vendre.",
    cta: "Connecter mon compte Shotgun",
    note: ["Lecture seule", "Historique importé", "Déconnexion à tout moment"],
  },
  answer: {
    title: "Shotgun a déjà un CRM. Pourquoi Yuno ?",
    paragraphs: [
      "Shotgun vous donne une vraie liste de contacts : acheteurs, abonnés à votre page, inscrits à une liste d’attente, invités, imports CSV, avec des attributs (soirées faites, dernière venue, total dépensé) et des segments. Vous pouvez envoyer des newsletters et des notifications, et synchroniser vos contacts vers Brevo ou Mailchimp.",
      "Yuno CRM part des mêmes ventes et s’occupe de ce qui vient après : **comparer** chaque soirée à la précédente au même moment, **repérer** les habitués qui décrochent, écrire par **SMS**, savoir **quelle story** a vendu, analyser la **guest list** et réunir vos autres fichiers dans la même base. Les deux outils se complètent : vous ne changez rien à votre billetterie.",
    ],
  },
  blocks: [
    {
      type: "table",
      id: "comparaison",
      eyebrow: "Point par point",
      title: "Ce que vous avez sur Shotgun, ce que Yuno ajoute.",
      accent: "ce que Yuno ajoute",
      head: ["", "Shotgun (Smartboard)", "Avec Yuno CRM en plus"],
      rows: [
        [
          "Contacts dédoublonnés",
          "Oui, par e-mail",
          "Oui, plus vos fichiers d’autres billetteries dans la même base",
        ],
        [
          "Segments",
          "Oui (attributs : soirées, dernière venue, dépense, accords)",
          "Une quarantaine de segments prêts en dix familles, dont habitués, endormis et invités jamais payants",
        ],
        [
          "Newsletters",
          "Oui, aux contacts qui l’ont accepté",
          "E-mails dont les blocs lisent vos tarifs, votre line-up et le compte à rebours au moment de l’envoi",
        ],
        [
          "Relances automatiques",
          "Non vu dans le centre d’aide",
          "Annonce, dernier appel, merci, on t’a manqué, habitué qui décroche, reconquête",
        ],
        [
          "SMS",
          "Non vu dans le centre d’aide",
          "Oui, sous votre nom d’expéditeur, STOP et horaires légaux gérés",
        ],
        [
          "Liens de suivi",
          "Oui, la source remonte dans l’export des commandes",
          "Un lien par story ou par bio, ses clics, et les ventes rattachées à chaque publication",
        ],
        [
          "Bilan de soirée",
          "Statistiques de ventes",
          "Comparé à la soirée précédente de la même série, au même nombre de jours avant",
        ],
        [
          "Guest list",
          "Invitations et billets gratuits",
          "Qui est venu, et quels invités sont devenus des clients payants",
        ],
        ["IA", "—", "ChatGPT, Claude ou Gemini branchés sur vos chiffres par MCP"],
      ],
      footnote:
        "Colonne Shotgun : d’après le centre d’aide public de Shotgun, relevé le 7 octobre 2026 (sources en bas de page). « Non vu » ne veut pas dire « impossible » : signalez-nous toute erreur, nous corrigeons sous 48 h.",
    },
    {
      type: "steps",
      id: "connecter",
      eyebrow: "Brancher Shotgun",
      title: "Le jeton API Shotgun, en 2 minutes.",
      accent: "en 2 minutes",
      sub: "Shotgun prévoit cet accès pour les outils externes qui ne sont pas intégrés directement. Pas de mot de passe à donner.",
      items: [
        {
          title: "Ouvrez votre Smartboard",
          body: "Connectez-vous à votre compte organisateur Shotgun, puis allez dans Paramètres › Intégrations › Shotgun APIs.",
        },
        {
          title: "Copiez l’ID, générez le jeton",
          body: "Votre ID organisateur s’affiche dans cette section. Cliquez sur « Générer un jeton » pour obtenir votre jeton API.",
        },
        {
          title: "Collez-les dans Yuno",
          body: "Dans Connecteurs, collez l’ID et le jeton. Yuno vérifie l’accès, importe vos soirées, vos billets et vos acheteurs, puis relit Shotgun toutes les 15 minutes.",
        },
      ],
    },
    {
      type: "cards",
      id: "garanties",
      eyebrow: "Ce que Yuno ne fait pas",
      title: "Lecture seule, sans exception.",
      accent: "sans exception",
      items: [
        {
          title: "Rien n’est écrit chez Shotgun",
          body: "Yuno ne crée, ne modifie, ne rembourse, ne scanne et ne publie rien. Il lit vos soirées et vos billets.",
        },
        {
          title: "Pas de mot de passe",
          body: "Yuno ne se sert du jeton que pour lire. Vous le révoquez depuis Shotgun ou coupez la connexion depuis Yuno quand vous voulez.",
        },
        {
          title: "Le consentement respecté",
          body: "Un acheteur n’entre dans votre liste d’envoi que si Shotgun rapporte son accord newsletter. Un désabonné ne reçoit jamais rien.",
        },
      ],
    },
    {
      type: "callout",
      title: "Gardez Shotgun. Ajoutez la mémoire de vos clients.",
      body: "Essai de 14 jours, sans carte bancaire, votre historique Shotgun importé dès la connexion.",
      cta: "Connecter mon compte Shotgun",
    },
  ],
  faq: {
    title: "Questions sur Shotgun.",
    accent: "Shotgun",
    items: [
      {
        q: "Shotgun autorise-t-il un outil externe à lire mes données ?",
        a: "Oui. Le centre d’aide de Shotgun décrit l’ID organisateur et le jeton API comme le moyen de connecter « un outil externe qui n’est pas directement intégré à Shotgun ». C’est exactement ce qu’utilise Yuno CRM.",
      },
      {
        q: "Yuno remplace-t-il le Smartboard ?",
        a: "Non. Vous continuez à créer vos soirées, vendre et scanner sur Shotgun. Yuno CRM ajoute la lecture dans la durée et les relances.",
      },
      {
        q: "Et la synchro Shotgun vers Brevo ou Mailchimp ?",
        a: "Elle envoie vos contacts vers un outil d’e-mailing généraliste. Yuno CRM, lui, connaît les soirées de chaque client et vous dit combien de billets chaque message a fait vendre. Voir [Yuno CRM ou Brevo](page:brevo).",
      },
      {
        q: "Mes chiffres seront-ils les mêmes que sur Shotgun ?",
        a: "Ils partent des mêmes billets : billets valides ou transférés, valeur faciale hors frais de billetterie, remboursements déduits. Les invitations et duplicatas ne sont pas comptés comme des ventes.",
      },
      {
        q: "Que se passe-t-il si je déconnecte Shotgun ?",
        a: "La synchronisation s’arrête. Votre base reste dans Yuno, lisible et exportable, et vous pouvez tout supprimer.",
      },
    ],
  },
  sources: {
    title: "Sources",
    note: "Pages publiques de Shotgun, consultées le 7 octobre 2026.",
    items: [
      {
        label: "Shotgun — Comprendre votre liste de contacts (mis à jour le 2 juillet 2026)",
        url: "https://support-pro.shotgun.live/hc/fr/articles/9439619664402",
      },
      {
        label: "Shotgun — Trouvez votre ID organisateur et votre jeton API (24 février 2026)",
        url: "https://support-pro.shotgun.live/hc/fr/articles/33561354477970",
      },
      {
        label: "Shotgun — Nouveautés de septembre 2025 (synchro Mailchimp et Brevo)",
        url: "https://support-pro.shotgun.live/hc/fr/articles/29417335388178",
      },
    ],
  },
  related: ["export", "instagram", "brevo", "organizer"],
};
