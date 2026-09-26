// Copy of the student-association landing ("/fr/associations", "/associations",
// "/es/asociaciones"). A separate audience from the main landing: BDE, BDS, BDA,
// ESN sections and other student associations that run parties, galas and WEIs.
//
// Facts it relies on (docs/yuno-context.md + the yuno repo):
//  - An "asso" account is an ORGANIZER account that a super admin flags
//    `bde_verified` (organizer_profiles). The flag lowers the MINIMUM service fee
//    paid by the buyer on tickets and tables from €0.99 to €0.49 (the 4% rate
//    and the €25 table cap don't change) and makes the association's nights
//    private by default: link-only, never in public search; going public is a
//    request a Yuno admin approves.
//  - The self-serve signup opens an organizer account (complete_pro_signup) and
//    tags the journey `source = asso…` so the admin knows to verify it. Until
//    then the standard minimum applies — the copy says the rate is switched on
//    once the association is verified, never "instantly".
//  - €0 subscription, 0% commission; Stripe processing (1.5% + €0.25) is on the
//    association. Money lands on the association's own Stripe account as it sells.
//  - Competitor facts (HelloAsso, Shotgun) come from their public pages, listed
//    in `switch.sources` with the date they were checked. No guessed number.
//  - Never claim "cheapest": Billetweb or HelloAsso can cost the association
//    less. The edges are the night itself (tiers, guest list, door, tables, the
//    club deal), private nights, the €0.49 student minimum and the payout pace.
import type { LandingContent } from "@/content/landing";

type SignupCopy = LandingContent["signup"];

const fr = {
  meta: {
    title: "Billetterie association étudiante : soirées BDE, galas, WEI | Yuno",
    description:
      "La billetterie des associations étudiantes : billets, guest list et scan à l'entrée. 0 € pour l'asso, frais réduits pour les étudiants (dès 0,49 €), l'argent sur le compte de l'asso à chaque vente.",
    shareTitle: "Yuno pour les assos — vos soirées pleines et payées d'avance",
    shareDescription:
      "Billets, guest list et scan à l'entrée pour les BDE, BDS, BDA et assos étudiantes. 0 € pour l'asso, frais dès 0,49 € pour les étudiants.",
    ogAlt:
      "Yuno pour les associations étudiantes — la billetterie de vos soirées, 0 € pour l'asso.",
  },
  nav: {
    links: [
      { label: "Fonctionnalités", href: "#features" },
      { label: "Tarifs", href: "#pricing" },
      { label: "Comparatif", href: "#switch" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Créer le compte asso",
  },
  hero: {
    chip: "Pour les associations étudiantes",
    chipBadge: "Frais étudiants dès 0,49 €",
    kicker: "Billetterie pour associations étudiantes\u00a0: BDE, BDS, BDA, ESN, galas et WEI",
    titleA: "Vos soirées d'asso,",
    titleB: "pleines et payées d'avance.",
    sub: "Billets, guest list et scan à l'entrée, sur un seul lien à poster dans le groupe de promo. 0 € pour l'asso, des frais réduits pour vos étudiants, et l'argent sur le compte de l'asso à chaque vente.",
    inputLabel: "Nom de votre asso",
    inputPh: "Nom de votre asso (BDE, BDS…)",
    primary: "Créer le compte asso",
    secondary: "Une question ? WhatsApp",
    note: ["0 € pour l'asso", "Compte créé en 2 minutes", "Sans carte bancaire"],
    types: ["Soirées d'inté", "WEI", "Galas", "Afterworks", "Soirées en club", "Tournois"],
    phone: {
      heading: "Billets",
      event: "Soirée d'intégration",
      steps: ["Sélection", "Résumé", "Paiement"],
      tiers: [
        { name: "Early", price: "8,00 €", status: "Complet" },
        { name: "Prévente", price: "10,00 €", status: "" },
      ],
      guest: "Guest list bureau",
      free: "Gratuit",
      guestMeta: "Entrée gratuite avant 23:30",
      guestLeft: "40 places",
      fee: "Frais de service",
      feeValue: "0,49 €",
      pay: "Payer 10,49 €",
    },
    notifications: [
      { icon: "ticket", title: "+46 places vendues", meta: "Depuis la story de l'asso · 1 h" },
      {
        icon: "wallet",
        title: "412 € sur le compte de l'asso",
        meta: "Au fil des ventes · Stripe",
      },
      { icon: "scan", title: "Léa M. est entrée", meta: "Guest list bureau · 23:12" },
      {
        icon: "mail",
        title: "Email « Dernières places » envoyé",
        meta: "1 380 étudiants · 38 ventes",
      },
    ],
  },
  stats: {
    items: [
      { value: "0 €", label: "Pour l'asso", body: "Ni abonnement, ni commission sur vos billets." },
      {
        value: "0,49 €",
        label: "Frais min. pour l'étudiant",
        body: "Au lieu de 0,99 € au tarif standard.",
      },
      {
        value: "30 s",
        label: "Pour prendre sa place",
        body: "Carte ou Apple Pay, sans compte ni app.",
      },
      { value: "2 min", label: "Pour ouvrir le compte", body: "Depuis cette page, sans appel." },
    ],
  },
  problem: {
    eyebrow: "Le constat",
    title: "Une soirée d'asso, c'est souvent Lydia, un Google Sheet et un stylo.",
    sub: "Des virements à vérifier un par un, une liste imprimée pour la porte, et un trésorier qui rapproche tout la semaine d'après. Yuno remplace le bricolage par un seul lien.",
    today: "Aujourd'hui",
    withYuno: "Avec Yuno",
    rows: [
      {
        subject: "Le paiement",
        today: "Des virements à vérifier un par un et des captures d'écran dans le groupe.",
        yuno: "Carte ou Apple Pay en 30 secondes, billet QR envoyé tout de suite.",
      },
      {
        subject: "La liste",
        today: "Un Google Sheet copié-collé, imprimé la veille pour la porte.",
        yuno: "La liste se remplit toute seule et se scanne depuis les téléphones du bureau.",
      },
      {
        subject: "La porte",
        today: "Des noms rayés au stylo, des places revendues en double.",
        yuno: "Chaque QR ne passe qu'une fois, recherche par nom, compteur d'entrées en direct.",
      },
      {
        subject: "La trésorerie",
        today: "Des soirées entières à rapprocher les virements et le cash.",
        yuno: "Chaque vente tracée au centime, remboursements et exports depuis le dashboard.",
      },
      {
        subject: "La passation",
        today: "Les contacts de la promo partent avec l'ancien bureau.",
        yuno: "La base, les soirées et l'historique restent dans l'espace de l'asso.",
      },
    ],
  },
  features: {
    eyebrow: "Fonctionnalités",
    title: "Du lien en story au dernier scan de la nuit.",
    sub: "La même plateforme que les clubs et les organisateurs, réglée pour la vie d'une asso : des soirées privées, des tarifs adhérents et un bureau qui change chaque année.",
    items: [
      {
        id: "tickets",
        title: "Billets à paliers",
        body: "Early, prévente, dernière minute, quotas et codes promo pour le tarif adhérent ou les partenaires. Billet QR par email et dans Apple Wallet.",
      },
      {
        id: "guests",
        title: "Guest list",
        body: "Entrée gratuite avant l'heure que vous fixez, avec des quotas : le bureau, les partenaires, les invités. Aucun frais.",
      },
      {
        id: "private",
        title: "Soirées privées par défaut",
        body: "Accessibles uniquement par votre lien, jamais affichées dans la recherche publique. Une soirée peut devenir publique sur demande.",
      },
      {
        id: "door",
        title: "Scan à l'entrée",
        body: "Le bureau scanne avec son téléphone, connexion par code PIN, rien à installer. Doublons bloqués, entrées comptées en direct.",
      },
      {
        id: "money",
        title: "L'argent de l'asso",
        body: "Stripe Connect au nom de l'asso : chaque vente arrive sur son compte. Remboursements, factures et exports pour le trésorier.",
      },
      {
        id: "club",
        title: "Soirées en club",
        body: "Le partage avec le club se signe dans Yuno, et le décompte de fin de soirée se valide à deux. Fini les comptes en cash à 6 h.",
      },
      {
        id: "mail",
        title: "Emails à vos étudiants",
        body: "Chaque acheteur rejoint la base de l'asso. Annoncez la prochaine date, relancez les indécis : 15 000 emails/mois inclus.",
      },
      {
        id: "team",
        title: "Bureau & passation",
        body: "Rôles admin, éditeur et scanner pour le bureau. Ouvrez le compte avec l'email de l'asso : il reste quand le bureau change.",
      },
    ],
  },
  club: {
    eyebrow: "Soirées en club",
    title: "Une soirée en boîte ? Le deal avec le club, signé dans Yuno.",
    body: "La plupart des soirées d'asso se font en club. Connectez le club à votre soirée et fixez le partage pilier par pilier : billets, tables, bar. À la fermeture, le club déclare ses recettes, vous validez ou contestez. Rien ne part sans votre accord.",
    bullets: [
      "Contrat signé dans Yuno avant la soirée, pas sur un coin de table",
      "Billets, guest list et tables vendus sur la même page",
      "Décompte validé par les deux, chacun payé sur son propre compte",
    ],
    card: {
      title: "Contrat asso × club",
      status: "Signé",
      rows: [
        { label: "Billets", value: "80 % asso · 20 % club" },
        { label: "Guest list", value: "Gratuite avant 23:30" },
        { label: "Bar", value: "100 % club" },
      ],
      closing: "Décompte de fin de soirée",
      closingMeta: "Validé par l'asso et le club",
      party: "Asso",
      venue: "Club",
    },
    cta: "Créer le compte asso",
  },
  how: {
    eyebrow: "Comment ça marche",
    title: "De zéro à la première vente, sans appel.",
    sub: "Tout se fait depuis cette page, puis depuis votre téléphone.",
    steps: [
      {
        title: "Créez le compte asso",
        body: "Le nom de l'asso, votre ville, votre email : deux minutes. On vérifie ensuite que vous êtes bien une asso étudiante pour activer le tarif asso.",
      },
      {
        title: "Publiez la soirée",
        body: "Affiche, paliers, guest list, codes adhérents. Connectez le compte Stripe de l'asso pour encaisser.",
      },
      {
        title: "Partagez le lien",
        body: "Dans le groupe de promo, en story, en bio Insta, en QR sur les affiches. Vos étudiants paient en 30 secondes.",
      },
      {
        title: "Scannez à l'entrée",
        body: "Le bureau se connecte par code PIN. La liste se met à jour en direct sur tous les téléphones.",
      },
    ],
  },
  showcase: {
    eyebrow: "L'espace asso",
    title: "Toute la soirée sur un écran, du premier billet à la fermeture.",
    sub: "Ventes, billets vendus, acheteurs, prochaines soirées : le bureau voit tout en direct, le trésorier exporte en un clic.",
    alt: "Le tableau de bord d'une association sur Yuno : chiffre d'affaires, billets vendus, acheteurs uniques et prochaines soirées.",
    url: "yunoapp.eu/organizer",
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Gratuit pour l'asso. Allégé pour vos étudiants.",
    sub: "La même plateforme que les clubs, avec un tarif asso : le minimum de frais payé par l'étudiant passe de 0,99 € à 0,49 €. L'asso ne paie que les frais bancaires.",
    colItem: "Poste",
    colWho: "Qui paie",
    colAmount: "Montant",
    rows: [
      {
        item: "Abonnement & commission",
        who: "—",
        amount: "0\u00a0€ · 0\u00a0%",
        was: "",
        highlight: true,
      },
      {
        item: "Frais de service, billets",
        who: "L'étudiant, en plus du prix",
        amount: "4\u00a0% · min. 0,49\u00a0€",
        was: "0,99\u00a0€",
        highlight: true,
      },
      {
        item: "Frais de service, tables",
        who: "L'étudiant, sur le montant débité",
        amount: "4\u00a0% · min. 0,49\u00a0€ · max. 25\u00a0€",
        was: "",
        highlight: false,
      },
      { item: "Guest list", who: "—", amount: "Gratuit", was: "", highlight: false },
      {
        item: "Frais bancaires (Stripe)",
        who: "L'asso, sur l'encaissement",
        amount: "1,5\u00a0% +\u00a00,25\u00a0€",
        was: "",
        highlight: false,
      },
    ],
    verified:
      "Le tarif asso s'active dès que l'équipe Yuno a vérifié que vous êtes bien une association étudiante. Rien à envoyer : on vous écrit si on a besoin d'une précision.",
    calc: {
      title: "Ce que votre asso encaisse",
      price: "Prix du billet",
      qty: "Billets vendus",
      student: "L'étudiant paie",
      studentMeta: "dont {fee} de frais de service",
      keep: "L'asso garde par billet",
      keepMeta: "après {stripe} de frais bancaires",
      total: "Net pour la soirée",
      saved: "Économisé par vos étudiants grâce au tarif asso",
      savedMeta: "vs le minimum standard de 0,99 €",
      foot: "Frais de service Yuno : 4 %, min. 0,49 € au tarif asso, payés par l'étudiant en plus du prix. Frais bancaires Stripe : 1,5 % + 0,25 € par paiement, payés par l'asso. Calcul pour un billet par paiement.",
    },
    cardTitle: "Tout est compris",
    cardSub: "Une seule offre, de la soirée d'inté au gala de fin d'année.",
    price: "0 €",
    priceSuffix: "/ mois pour l'asso",
    included: [
      "Billets à paliers, préventes, codes adhérents",
      "Guest list avec quotas et QR nominatifs",
      "Soirées privées par défaut",
      "Scan à l'entrée, codes PIN pour le bureau",
      "Tables et carrés pour les galas",
      "Contrat et décompte avec le club",
      "Stripe Connect au nom de l'asso, exports",
      "15 000 emails/mois à vos étudiants",
      "Apple Wallet, FR · EN · ES",
    ],
    cta: "Créer le compte asso",
    ctaNote: "Sans carte bancaire · Sans engagement",
  },
  switch: {
    eyebrow: "Comparatif",
    title: "Vous venez d'où ? Voici ce qui change.",
    sub: "Pas besoin de tout quitter : gardez ce qui marche, passez vos soirées sur Yuno.",
    cards: [
      {
        name: "HelloAsso",
        tag: "Parfait pour les adhésions",
        intro:
          "HelloAsso est idéal pour les cotisations et les dons. Pour les soirées, Yuno ajoute ce qu'un formulaire ne fait pas.",
        points: [
          "Une page de soirée qui donne envie, avec paliers, guest list et tables",
          "L'argent au fil des ventes, là où HelloAsso verse les fonds chaque mois, ou sur demande 7 jours ouvrés après le paiement",
          "Le scan à l'entrée et le deal avec le club au même endroit",
        ],
        honest:
          "La vraie différence de prix : chez Yuno, l'asso paie les frais bancaires Stripe (1,5 % + 0,25 €) ; HelloAsso se finance par une contribution volontaire proposée au payeur.",
      },
      {
        name: "Shotgun",
        tag: "Billetterie de soirées",
        intro: "Beaucoup d'assos vendent déjà leurs soirées sur Shotgun. Sur Yuno :",
        points: [
          "0 % de commission sur le prix de vos billets, là où Shotgun prélève une commission sur vos ventes",
          "L'argent sur le compte de l'asso au fil des ventes, pas viré 24 h après la soirée",
          "Le contrat avec le club et le décompte validé à deux, pour vos soirées en boîte",
        ],
        honest: "",
      },
      {
        name: "Lydia + Google Forms",
        tag: "Le système D",
        intro: "Gratuit, mais c'est le bureau qui paie en heures. Avec Yuno :",
        points: [
          "Paiement et billet QR en 30 secondes, sans capture d'écran à vérifier",
          "La liste de porte se remplit toute seule, sans doublons",
          "Chaque euro tracé pour le trésorier, remboursements en un clic",
        ],
        honest: "",
      },
    ],
    sourcesTitle: "Sources (consultées le 26 septembre 2026)",
    sources: [
      {
        label: "HelloAsso — Modèle économique",
        url: "https://info.helloasso.com/modele-economique",
      },
      {
        label: "HelloAsso — Versement des sommes collectées",
        url: "https://centredaide.helloasso.com/association?question=comment-fonctionne-le-versement-des-sommes-collectees",
      },
      {
        label: "Shotgun — Comprendre les frais de services",
        url: "https://support-pro.shotgun.live/hc/fr/articles/6989212196242-Comprendre-les-frais-de-services",
      },
      {
        label: "Shotgun — Virer les fonds d'un événement",
        url: "https://support-pro.shotgun.live/hc/fr/articles/12836807849490",
      },
    ],
    disclaimer:
      "HelloAsso et Shotgun sont des marques de leurs propriétaires respectifs. Yuno n'est affilié à aucune d'elles. Comparaison fondée sur leurs informations publiques à la date indiquée ; les conditions négociées peuvent différer.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions que les bureaux nous posent.",
    items: [
      {
        q: "C'est vraiment gratuit pour l'asso ?",
        a: "Oui : 0 € d'abonnement et 0 % de commission sur le prix de vos billets. Les frais de service Yuno (4 %, minimum 0,49 € au tarif asso) sont ajoutés au prix et payés par l'étudiant. L'asso ne paie que les frais bancaires Stripe : 1,5 % + 0,25 € par paiement.",
      },
      {
        q: "Comment obtient-on le tarif asso à 0,49 € ?",
        a: "Créez le compte depuis cette page. L'équipe Yuno vérifie que vous êtes bien une association étudiante, puis active le tarif asso sur vos soirées. Aucun dossier à envoyer : on vous écrit si on a besoin d'une précision.",
      },
      {
        q: "Quelles associations peuvent l'utiliser ?",
        a: "Toute association étudiante qui organise des événements : BDE, BDS, BDA, associations d'école ou de fac, sections ESN, comités de gala, WEI.",
      },
      {
        q: "Nos soirées sont-elles visibles par tout le monde ?",
        a: "Non. Les soirées d'une asso sont privées par défaut : accessibles uniquement par le lien que vous partagez, jamais affichées dans la recherche publique. Vous pouvez demander à rendre une soirée publique ; l'équipe Yuno valide la demande.",
      },
      {
        q: "Peut-on faire un tarif adhérent ?",
        a: "Oui : créez un code promo (par exemple ADHERENT) réservé à vos adhérents, ou un palier dédié. Les codes s'appliquent aux billets et aux tables, sur une soirée ou sur toutes.",
      },
      {
        q: "Quand touche-t-on l'argent ?",
        a: "Les paiements passent par Stripe Connect : chaque vente arrive sur le compte Stripe de l'asso, à son nom, au fil des ventes, puis part sur votre compte bancaire selon le calendrier de versement Stripe. Yuno ne détient jamais vos fonds.",
      },
      {
        q: "Faut-il un compte au nom de l'asso ?",
        a: "Oui, pour encaisser : vous ouvrez le compte Stripe de l'asso depuis votre espace Yuno, étape par étape. Créer le compte et préparer la soirée peut se faire avant.",
      },
      {
        q: "Et pour une soirée en boîte ?",
        a: "Connectez le club à votre soirée. Le partage se signe dans Yuno pilier par pilier (billets, tables, bar). À la fermeture, le club déclare ses recettes, vous validez ou contestez, et chacun est payé sur son propre compte.",
      },
      {
        q: "Les étudiants doivent-ils télécharger une app ?",
        a: "Non. L'achat prend 30 secondes sur le web, par carte ou Apple Pay, sans créer de compte. Le billet QR arrive par email et dans Apple Wallet.",
      },
      {
        q: "Que se passe-t-il à la passation ?",
        a: "Ouvrez le compte avec l'email de l'asso et invitez le bureau avec les rôles admin, éditeur ou scanner. Quand le bureau change, les nouveaux reprennent l'espace : base de contacts, soirées et historique restent à l'asso.",
      },
      {
        q: "On utilise HelloAsso, faut-il tout quitter ?",
        a: "Non. Gardez HelloAsso pour les adhésions et les dons, et passez vos soirées sur Yuno : page de soirée, paliers, guest list, scan à l'entrée et deal avec le club.",
      },
    ],
  },
  final: {
    title: "La prochaine soirée de l'asso commence ici.",
    sub: "Créez le compte asso en deux minutes. 0 € pour l'asso, des frais réduits pour vos étudiants, l'argent sur le compte de l'asso.",
    placeholder: "Nom de votre asso",
    primary: "Créer le compte asso",
    secondary: "Écrire au fondateur",
    note: "Sans carte bancaire · Sans engagement · FR · EN · ES",
  },
  footer: {
    tagline: "La billetterie des soirées étudiantes, par Yuno.",
    cols: [
      {
        title: "L'offre asso",
        links: [
          { label: "Fonctionnalités", href: "#features" },
          { label: "Soirées en club", href: "#club" },
          { label: "Tarifs", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Yuno",
        links: [
          { label: "Se connecter", href: "https://yunoapp.eu/auth" },
          { label: "Confidentialité", href: "/fr/privacy" },
          { label: "CGU", href: "/fr/terms" },
        ],
      },
    ],
    rights: "Tous droits réservés.",
    made: "Conçu à Paris & Madrid",
  },
  mobileCta: "Créer le compte asso",
  whatsappMessage:
    "Bonjour Paul 👋 Je fais partie d'une asso étudiante et j'aimerais en savoir plus sur Yuno.",
  signup: {
    orgTitle: "Parlez-nous de votre asso",
    structureSub: "On prépare l'espace de l'asso et sa première soirée à partir de ça.",
    orgName: "Nom de l'asso",
    orgNamePh: "BDE Atlas",
    city: "Ville",
    cityPh: "Lyon",
    crowd: "Participants par événement",
    crowdOpts: [
      { id: "lt100", label: "< 100" },
      { id: "100_300", label: "100 – 300" },
      { id: "300_800", label: "300 – 800" },
      { id: "gt800", label: "800+" },
    ],
    frequency: "Événements par an",
    frequencyOpts: [
      { id: "y1_3", label: "1 – 3" },
      { id: "y4_10", label: "4 – 10" },
      { id: "y10plus", label: "10+" },
    ],
    needsTitle: "Qu'allez-vous proposer ?",
    needsSub:
      "Choisissez ce qui compte maintenant, le reste s'active en un clic, soirée par soirée.",
    pillars: [
      { id: "tickets", label: "Billets", hint: "Paliers, préventes, codes adhérents" },
      {
        id: "guest_list",
        label: "Guest list",
        hint: "Bureau, partenaires, gratuit avant une heure",
      },
      { id: "tables", label: "Tables & carrés", hint: "Pour les galas et les soirées en club" },
      { id: "drinks", label: "Boissons", hint: "Commande au QR du bar" },
    ],
    tool: "Vous utilisez quoi aujourd'hui ?",
    toolOpts: [
      { id: "helloasso", label: "HelloAsso" },
      { id: "shotgun", label: "Shotgun" },
      { id: "weezevent", label: "Weezevent" },
      { id: "billetweb", label: "Billetweb" },
      { id: "lydia_forms", label: "Lydia / Forms" },
      { id: "other", label: "Autre" },
      { id: "none", label: "Rien encore" },
    ],
    toolHint: "On vous aidera à importer vos contacts.",
    nextNight: "Votre prochain événement ?",
    accountTitle: "Créez le compte de l'asso",
    accountTitleOrg: "Créez le compte de {org}",
    accountSub: "0 € pour l'asso · Frais étudiants dès 0,49 € · Sans carte bancaire",
    email: "Email",
    emailPh: "bureau@monasso.fr",
    emailHint: "Astuce : l'email de l'asso reste quand le bureau change.",
    phoneHint:
      "Pour valider le tarif asso et vous aider à lancer la première soirée. Jamais de pub.",
    submit: "Créer le compte asso",
    creatingSteps: ["Création du compte", "Ouverture de l'espace asso", "Demande du tarif asso"],
    confirmBody:
      "On a envoyé un lien à {email}. Cliquez dessus pour confirmer votre email : l'espace de l'asso s'ouvre aussitôt.",
  } satisfies Partial<SignupCopy> & { emailHint: string },
};

export type AssoContent = typeof fr;

const en: AssoContent = {
  meta: {
    title: "Ticketing for student associations: parties, galas, socials | Yuno",
    description:
      "Ticketing for student associations: tickets, guest list and door scanning. €0 for the association, reduced fees for students (from €0.49), money on the association's account with every sale.",
    shareTitle: "Yuno for student associations — sell-out nights, paid upfront",
    shareDescription:
      "Tickets, guest list and door scanning for student unions, societies and ESN sections. €0 for the association, fees from €0.49 for students.",
    ogAlt: "Yuno for student associations — ticketing for your nights, €0 for the association.",
  },
  nav: {
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Compare", href: "#switch" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Create the association account",
  },
  hero: {
    chip: "For student associations",
    chipBadge: "Student fees from €0.49",
    kicker:
      "Ticketing for student associations: unions, societies, ESN sections, galas and socials",
    titleA: "Your association's nights,",
    titleB: "sold out and paid upfront.",
    sub: "Tickets, guest list and door scanning, on one link to drop in the class group chat. €0 for the association, reduced fees for your students, and the money on the association's account with every sale.",
    inputLabel: "Your association's name",
    inputPh: "Your association's name",
    primary: "Create the association account",
    secondary: "Questions? WhatsApp",
    note: ["€0 for the association", "Account ready in 2 minutes", "No credit card"],
    types: ["Welcome parties", "Socials", "Galas", "Afterworks", "Club nights", "Tournaments"],
    phone: {
      heading: "Tickets",
      event: "Welcome party",
      steps: ["Selection", "Summary", "Payment"],
      tiers: [
        { name: "Early", price: "€8.00", status: "Sold out" },
        { name: "Presale", price: "€10.00", status: "" },
      ],
      guest: "Committee guest list",
      free: "Free",
      guestMeta: "Free entry before 11:30 pm",
      guestLeft: "40 spots",
      fee: "Service fee",
      feeValue: "€0.49",
      pay: "Pay €10.49",
    },
    notifications: [
      { icon: "ticket", title: "+46 tickets sold", meta: "From the association's story · 1 h" },
      { icon: "wallet", title: "€412 on the association's account", meta: "As you sell · Stripe" },
      { icon: "scan", title: "Léa M. just got in", meta: "Committee guest list · 11:12 pm" },
      { icon: "mail", title: "“Last tickets” email sent", meta: "1,380 students · 38 sales" },
    ],
  },
  stats: {
    items: [
      {
        value: "€0",
        label: "For the association",
        body: "No subscription, no commission on your tickets.",
      },
      {
        value: "€0.49",
        label: "Minimum student fee",
        body: "Instead of €0.99 at the standard rate.",
      },
      { value: "30s", label: "To get a ticket", body: "Card or Apple Pay, no account, no app." },
      { value: "2 min", label: "To open the account", body: "From this page, no call needed." },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "A student night often runs on bank transfers, a spreadsheet and a pen.",
    sub: "Transfers checked one by one, a printed list at the door, and a treasurer reconciling it all the week after. Yuno swaps the patchwork for a single link.",
    today: "Today",
    withYuno: "With Yuno",
    rows: [
      {
        subject: "Payment",
        today: "Transfers checked one by one and screenshots in the group chat.",
        yuno: "Card or Apple Pay in 30 seconds, QR ticket sent right away.",
      },
      {
        subject: "The list",
        today: "A copy-pasted spreadsheet, printed the day before for the door.",
        yuno: "The list fills itself and is scanned from the committee's phones.",
      },
      {
        subject: "The door",
        today: "Names crossed out in pen, tickets resold twice.",
        yuno: "Each QR only works once, search by name, live entry counter.",
      },
      {
        subject: "The books",
        today: "Whole evenings spent matching transfers and cash.",
        yuno: "Every sale tracked to the cent, refunds and exports from the dashboard.",
      },
      {
        subject: "Handover",
        today: "The students' contacts leave with the old committee.",
        yuno: "The customer base, the nights and the history stay in the association's space.",
      },
    ],
  },
  features: {
    eyebrow: "Features",
    title: "From the link in your story to the last scan of the night.",
    sub: "The same platform clubs and organizers use, tuned for student life: private nights, member prices and a committee that changes every year.",
    items: [
      {
        id: "tickets",
        title: "Ticket tiers",
        body: "Early bird, presale, last minute, quotas and promo codes for member prices or partners. QR ticket by email and in Apple Wallet.",
      },
      {
        id: "guests",
        title: "Guest list",
        body: "Free entry before the time you set, with quotas: the committee, partners, guests. No fee.",
      },
      {
        id: "private",
        title: "Private nights by default",
        body: "Reachable only through your link, never shown in public search. A night can go public on request.",
      },
      {
        id: "door",
        title: "Door scanning",
        body: "The committee scans with their phones, PIN login, nothing to install. Duplicates blocked, entries counted live.",
      },
      {
        id: "money",
        title: "The association's money",
        body: "Stripe Connect in the association's name: every sale lands on its account. Refunds, invoices and exports for the treasurer.",
      },
      {
        id: "club",
        title: "Club nights",
        body: "The split with the club is signed in Yuno, and the end-of-night statement is approved by both sides. No more cash counting at 6 am.",
      },
      {
        id: "mail",
        title: "Emails to your students",
        body: "Every buyer joins the association's base. Announce the next date, nudge the undecided: 15,000 emails/month included.",
      },
      {
        id: "team",
        title: "Committee & handover",
        body: "Admin, editor and scanner roles for the committee. Open the account with the association's email: it stays when the committee changes.",
      },
    ],
  },
  club: {
    eyebrow: "Club nights",
    title: "A night at a club? The deal with the venue, signed in Yuno.",
    body: "Most student nights happen in clubs. Connect the club to your night and set the split pillar by pillar: tickets, tables, bar. At closing, the club declares its takings and you approve or dispute. Nothing moves without your agreement.",
    bullets: [
      "A contract signed in Yuno before the night, not on a napkin",
      "Tickets, guest list and tables sold on the same page",
      "A statement approved by both sides, each paid on their own account",
    ],
    card: {
      title: "Association × club contract",
      status: "Signed",
      rows: [
        { label: "Tickets", value: "80% association · 20% club" },
        { label: "Guest list", value: "Free before 11:30 pm" },
        { label: "Bar", value: "100% club" },
      ],
      closing: "End-of-night statement",
      closingMeta: "Approved by the association and the club",
      party: "Assoc.",
      venue: "Club",
    },
    cta: "Create the association account",
  },
  how: {
    eyebrow: "How it works",
    title: "From zero to your first sale, no call needed.",
    sub: "It all starts on this page, then runs from your phone.",
    steps: [
      {
        title: "Create the association account",
        body: "The association's name, your city, your email: two minutes. We then check you're a student association to switch on the association rate.",
      },
      {
        title: "Publish the night",
        body: "Poster, tiers, guest list, member codes. Connect the association's Stripe account to get paid.",
      },
      {
        title: "Share the link",
        body: "In the class group chat, in your story, in your Instagram bio, as a QR on posters. Students pay in 30 seconds.",
      },
      {
        title: "Scan at the door",
        body: "The committee logs in with a PIN. The list updates live on every phone.",
      },
    ],
  },
  showcase: {
    eyebrow: "The association space",
    title: "The whole night on one screen, from the first ticket to closing.",
    sub: "Revenue, tickets sold, buyers, upcoming nights: the committee sees it live, the treasurer exports in one click.",
    alt: "A student association's dashboard on Yuno: revenue, tickets sold, unique buyers and upcoming nights.",
    url: "yunoapp.eu/organizer",
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Free for the association. Lighter for your students.",
    sub: "The same platform as clubs, with an association rate: the minimum fee a student pays drops from €0.99 to €0.49. The association only pays card processing.",
    colItem: "Item",
    colWho: "Who pays",
    colAmount: "Amount",
    rows: [
      { item: "Subscription & commission", who: "—", amount: "€0 · 0%", was: "", highlight: true },
      {
        item: "Service fee, tickets",
        who: "The student, on top of the price",
        amount: "4% · min. €0.49",
        was: "€0.99",
        highlight: true,
      },
      {
        item: "Service fee, tables",
        who: "The student, on the amount charged",
        amount: "4% · min. €0.49 · max. €25",
        was: "",
        highlight: false,
      },
      { item: "Guest list", who: "—", amount: "Free", was: "", highlight: false },
      {
        item: "Card processing (Stripe)",
        who: "The association, on what it collects",
        amount: "1.5% +\u00a0€0.25",
        was: "",
        highlight: false,
      },
    ],
    verified:
      "The association rate is switched on as soon as the Yuno team has checked you're a student association. Nothing to send: we'll write to you if we need a detail.",
    calc: {
      title: "What your association collects",
      price: "Ticket price",
      qty: "Tickets sold",
      student: "The student pays",
      studentMeta: "including {fee} service fee",
      keep: "The association keeps per ticket",
      keepMeta: "after {stripe} card processing",
      total: "Net for the night",
      saved: "Saved by your students with the association rate",
      savedMeta: "vs the standard €0.99 minimum",
      foot: "Yuno service fee: 4%, min. €0.49 at the association rate, paid by the student on top of the price. Stripe card processing: 1.5% + €0.25 per payment, paid by the association. Worked out for one ticket per payment.",
    },
    cardTitle: "Everything included",
    cardSub: "One offer, from the welcome party to the end-of-year gala.",
    price: "€0",
    priceSuffix: "/ month for the association",
    included: [
      "Ticket tiers, presales, member codes",
      "Guest list with quotas and named QR codes",
      "Private nights by default",
      "Door scanning, PIN codes for the committee",
      "Tables and booths for galas",
      "Contract and statement with the club",
      "Stripe Connect in the association's name, exports",
      "15,000 emails/month to your students",
      "Apple Wallet, EN · FR · ES",
    ],
    cta: "Create the association account",
    ctaNote: "No credit card · No commitment",
  },
  switch: {
    eyebrow: "Compare",
    title: "Where are you coming from? Here's what changes.",
    sub: "No need to drop everything: keep what works, move your nights to Yuno.",
    cards: [
      {
        name: "HelloAsso",
        tag: "Great for memberships",
        intro:
          "HelloAsso is ideal for membership fees and donations. For nights out, Yuno adds what a form can't do.",
        points: [
          "An event page people want to buy from, with tiers, guest list and tables",
          "Money as you sell, where HelloAsso pays out monthly, or on request 7 business days after payment",
          "Door scanning and the club deal in the same place",
        ],
        honest:
          "The real price difference: on Yuno the association pays Stripe card processing (1.5% + €0.25); HelloAsso is funded by a voluntary contribution offered to the payer.",
      },
      {
        name: "Shotgun",
        tag: "Nightlife ticketing",
        intro: "Many associations already sell their nights on Shotgun. On Yuno:",
        points: [
          "0% commission on your ticket price, where Shotgun takes a commission on your sales",
          "Money on the association's account as you sell, not transferred 24 h after the night",
          "The club contract and a statement approved by both sides, for your club nights",
        ],
        honest: "",
      },
      {
        name: "Transfers + a spreadsheet",
        tag: "The DIY way",
        intro: "Free, but the committee pays in hours. With Yuno:",
        points: [
          "Payment and QR ticket in 30 seconds, no screenshots to check",
          "The door list fills itself, with no duplicates",
          "Every euro tracked for the treasurer, one-click refunds",
        ],
        honest: "",
      },
    ],
    sourcesTitle: "Sources (checked on 26 September 2026)",
    sources: [
      { label: "HelloAsso — Business model", url: "https://info.helloasso.com/modele-economique" },
      {
        label: "HelloAsso — How payouts work",
        url: "https://centredaide.helloasso.com/association?question=comment-fonctionne-le-versement-des-sommes-collectees",
      },
      {
        label: "Shotgun — Understanding service fees",
        url: "https://support-pro.shotgun.live/hc/fr/articles/6989212196242-Comprendre-les-frais-de-services",
      },
      {
        label: "Shotgun — Transfer funds from an event",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/12836807849490",
      },
    ],
    disclaimer:
      "HelloAsso and Shotgun are trademarks of their respective owners. Yuno is not affiliated with either. Comparison based on their public information on the date shown; negotiated terms may differ.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "What committees ask us.",
    items: [
      {
        q: "Is it really free for the association?",
        a: "Yes: €0 subscription and 0% commission on your ticket price. Yuno's service fee (4%, minimum €0.49 at the association rate) is added to the price and paid by the student. The association only pays Stripe card processing: 1.5% + €0.25 per payment.",
      },
      {
        q: "How do we get the €0.49 association rate?",
        a: "Create the account from this page. The Yuno team checks you're a student association, then switches the association rate on for your nights. Nothing to send: we'll write to you if we need a detail.",
      },
      {
        q: "Which associations can use it?",
        a: "Any student association that runs events: student unions, sports and arts societies, school or university clubs, ESN sections, gala committees.",
      },
      {
        q: "Can anyone see our nights?",
        a: "No. An association's nights are private by default: reachable only through the link you share, never shown in public search. You can ask for a night to go public; the Yuno team approves the request.",
      },
      {
        q: "Can we have a member price?",
        a: "Yes: create a promo code (MEMBER, say) for your members, or a dedicated tier. Codes apply to tickets and tables, for one night or all of them.",
      },
      {
        q: "When do we get the money?",
        a: "Payments go through Stripe Connect: every sale lands on the association's Stripe account, in its name, as you sell, then goes to your bank on Stripe's payout schedule. Yuno never holds your funds.",
      },
      {
        q: "Do we need an account in the association's name?",
        a: "Yes, to get paid: you open the association's Stripe account from your Yuno space, step by step. Creating the account and preparing the night can happen before.",
      },
      {
        q: "What about a night at a club?",
        a: "Connect the club to your night. The split is signed in Yuno pillar by pillar (tickets, tables, bar). At closing, the club declares its takings, you approve or dispute, and each side is paid on its own account.",
      },
      {
        q: "Do students need to download an app?",
        a: "No. Buying takes 30 seconds on the web, by card or Apple Pay, without creating an account. The QR ticket arrives by email and in Apple Wallet.",
      },
      {
        q: "What happens at handover?",
        a: "Open the account with the association's email and invite the committee as admin, editor or scanner. When the committee changes, the new team takes over the space: contacts, nights and history stay with the association.",
      },
      {
        q: "We use HelloAsso. Do we have to leave it?",
        a: "No. Keep HelloAsso for memberships and donations, and run your nights on Yuno: event page, tiers, guest list, door scanning and the club deal.",
      },
    ],
  },
  final: {
    title: "Your association's next night starts here.",
    sub: "Create the association account in two minutes. €0 for the association, reduced fees for your students, the money on the association's account.",
    placeholder: "Your association's name",
    primary: "Create the association account",
    secondary: "Message the founder",
    note: "No credit card · No commitment · EN · FR · ES",
  },
  footer: {
    tagline: "Ticketing for student nights, by Yuno.",
    cols: [
      {
        title: "For associations",
        links: [
          { label: "Features", href: "#features" },
          { label: "Club nights", href: "#club" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Yuno",
        links: [
          { label: "Log in", href: "https://yunoapp.eu/auth" },
          { label: "Privacy", href: "/privacy" },
          { label: "Terms", href: "/terms" },
        ],
      },
    ],
    rights: "All rights reserved.",
    made: "Made in Paris & Madrid",
  },
  mobileCta: "Create the association account",
  whatsappMessage:
    "Hi Paul 👋 I'm part of a student association and I'd like to know more about Yuno.",
  signup: {
    orgTitle: "Tell us about your association",
    structureSub: "We'll set up the association's space and its first night from this.",
    orgName: "Association name",
    orgNamePh: "Atlas Student Union",
    city: "City",
    cityPh: "Madrid",
    crowd: "Attendees per event",
    crowdOpts: [
      { id: "lt100", label: "< 100" },
      { id: "100_300", label: "100 – 300" },
      { id: "300_800", label: "300 – 800" },
      { id: "gt800", label: "800+" },
    ],
    frequency: "Events per year",
    frequencyOpts: [
      { id: "y1_3", label: "1 – 3" },
      { id: "y4_10", label: "4 – 10" },
      { id: "y10plus", label: "10+" },
    ],
    needsTitle: "What will you offer?",
    needsSub: "Pick what matters now; the rest switches on in one click, night by night.",
    pillars: [
      { id: "tickets", label: "Tickets", hint: "Tiers, presales, member codes" },
      {
        id: "guest_list",
        label: "Guest list",
        hint: "Committee, partners, free before a set time",
      },
      { id: "tables", label: "Tables & booths", hint: "For galas and club nights" },
      { id: "drinks", label: "Drinks", hint: "Order at the bar's QR" },
    ],
    tool: "What do you use today?",
    toolOpts: [
      { id: "helloasso", label: "HelloAsso" },
      { id: "shotgun", label: "Shotgun" },
      { id: "eventbrite", label: "Eventbrite" },
      { id: "weezevent", label: "Weezevent" },
      { id: "lydia_forms", label: "Transfers / Forms" },
      { id: "other", label: "Other" },
      { id: "none", label: "Nothing yet" },
    ],
    toolHint: "We'll help you import your contacts.",
    nextNight: "Your next event?",
    accountTitle: "Create the association's account",
    accountTitleOrg: "Create {org}'s account",
    accountSub: "€0 for the association · Student fees from €0.49 · No credit card",
    email: "Email",
    emailPh: "committee@myassociation.org",
    emailHint: "Tip: the association's email stays when the committee changes.",
    phoneHint: "To confirm the association rate and help you launch your first night. Never ads.",
    submit: "Create the association account",
    creatingSteps: [
      "Creating the account",
      "Opening the association space",
      "Requesting the association rate",
    ],
    confirmBody:
      "We sent a link to {email}. Click it to confirm your email: the association's space opens right away.",
  },
};

const es: AssoContent = {
  meta: {
    title: "Ticketera para asociaciones de estudiantes: fiestas, galas | Yuno",
    description:
      "La ticketera de las asociaciones de estudiantes: entradas, lista de invitados y control de acceso. 0 € para la asociación, gastos reducidos para los estudiantes (desde 0,49 €), el dinero en la cuenta de la asociación con cada venta.",
    shareTitle: "Yuno para asociaciones — fiestas llenas y cobradas por adelantado",
    shareDescription:
      "Entradas, lista de invitados y control de acceso para asociaciones de estudiantes y secciones ESN. 0 € para la asociación, gastos desde 0,49 € para los estudiantes.",
    ogAlt:
      "Yuno para asociaciones de estudiantes — la ticketera de tus fiestas, 0 € para la asociación.",
  },
  nav: {
    links: [
      { label: "Funciones", href: "#features" },
      { label: "Precios", href: "#pricing" },
      { label: "Comparativa", href: "#switch" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Crear la cuenta de la asociación",
  },
  hero: {
    chip: "Para asociaciones de estudiantes",
    chipBadge: "Gastos para estudiantes desde 0,49 €",
    kicker:
      "Ticketera para asociaciones de estudiantes: delegaciones, clubes universitarios, ESN, galas y fiestas",
    titleA: "Las fiestas de tu asociación,",
    titleB: "llenas y cobradas por adelantado.",
    sub: "Entradas, lista de invitados y control de acceso, en un solo enlace para el grupo de clase. 0 € para la asociación, gastos reducidos para tus estudiantes y el dinero en la cuenta de la asociación con cada venta.",
    inputLabel: "Nombre de tu asociación",
    inputPh: "Nombre de tu asociación",
    primary: "Crear la cuenta de la asociación",
    secondary: "¿Dudas? WhatsApp",
    note: ["0 € para la asociación", "Cuenta lista en 2 minutos", "Sin tarjeta"],
    types: [
      "Fiestas de bienvenida",
      "Fiestas universitarias",
      "Galas",
      "Afterworks",
      "Noches en discoteca",
      "Torneos",
    ],
    phone: {
      heading: "Entradas",
      event: "Fiesta de bienvenida",
      steps: ["Selección", "Resumen", "Pago"],
      tiers: [
        { name: "Early", price: "8,00 €", status: "Agotada" },
        { name: "Preventa", price: "10,00 €", status: "" },
      ],
      guest: "Lista de la junta",
      free: "Gratis",
      guestMeta: "Entrada gratis antes de las 23:30",
      guestLeft: "40 plazas",
      fee: "Gastos de gestión",
      feeValue: "0,49 €",
      pay: "Pagar 10,49 €",
    },
    notifications: [
      {
        icon: "ticket",
        title: "+46 entradas vendidas",
        meta: "Desde la story de la asociación · 1 h",
      },
      {
        icon: "wallet",
        title: "412 € en la cuenta de la asociación",
        meta: "A medida que vendes · Stripe",
      },
      { icon: "scan", title: "Lea M. ha entrado", meta: "Lista de la junta · 23:12" },
      {
        icon: "mail",
        title: "Email «Últimas entradas» enviado",
        meta: "1.380 estudiantes · 38 ventas",
      },
    ],
  },
  stats: {
    items: [
      {
        value: "0 €",
        label: "Para la asociación",
        body: "Sin suscripción ni comisión sobre tus entradas.",
      },
      {
        value: "0,49 €",
        label: "Gasto mínimo del estudiante",
        body: "En lugar de 0,99 € con la tarifa estándar.",
      },
      {
        value: "30 s",
        label: "Para comprar su entrada",
        body: "Tarjeta o Apple Pay, sin cuenta ni app.",
      },
      { value: "2 min", label: "Para abrir la cuenta", body: "Desde esta página, sin llamadas." },
    ],
  },
  problem: {
    eyebrow: "El problema",
    title: "Una fiesta de asociación suele ir con Bizum, un Excel y un boli.",
    sub: "Bizums que revisar uno a uno, una lista impresa en la puerta y un tesorero cuadrándolo todo la semana siguiente. Yuno cambia el apaño por un solo enlace.",
    today: "Hoy",
    withYuno: "Con Yuno",
    rows: [
      {
        subject: "El pago",
        today: "Bizums que revisar uno a uno y capturas de pantalla en el grupo.",
        yuno: "Tarjeta o Apple Pay en 30 segundos, entrada QR enviada al momento.",
      },
      {
        subject: "La lista",
        today: "Un Excel copiado y pegado, impreso la víspera para la puerta.",
        yuno: "La lista se rellena sola y se escanea desde los móviles de la junta.",
      },
      {
        subject: "La puerta",
        today: "Nombres tachados a boli, entradas revendidas dos veces.",
        yuno: "Cada QR solo pasa una vez, búsqueda por nombre, contador de entradas en directo.",
      },
      {
        subject: "Las cuentas",
        today: "Tardes enteras cuadrando Bizums y efectivo.",
        yuno: "Cada venta registrada al céntimo, reembolsos y exportaciones desde el panel.",
      },
      {
        subject: "El relevo",
        today: "Los contactos de los estudiantes se van con la junta saliente.",
        yuno: "La base, las fiestas y el historial se quedan en el espacio de la asociación.",
      },
    ],
  },
  features: {
    eyebrow: "Funciones",
    title: "Del enlace en tu story al último escaneo de la noche.",
    sub: "La misma plataforma que usan discotecas y organizadores, ajustada a la vida de una asociación: fiestas privadas, precios para socios y una junta que cambia cada año.",
    items: [
      {
        id: "tickets",
        title: "Entradas por tramos",
        body: "Early bird, preventa, última hora, cupos y códigos promocionales para socios o colaboradores. Entrada QR por email y en Apple Wallet.",
      },
      {
        id: "guests",
        title: "Lista de invitados",
        body: "Entrada gratis antes de la hora que fijes, con cupos: la junta, colaboradores, invitados. Sin gastos.",
      },
      {
        id: "private",
        title: "Fiestas privadas por defecto",
        body: "Accesibles solo con tu enlace, nunca en la búsqueda pública. Una fiesta puede hacerse pública si lo pides.",
      },
      {
        id: "door",
        title: "Control de acceso",
        body: "La junta escanea con su móvil, acceso con PIN, nada que instalar. Duplicados bloqueados, entradas contadas en directo.",
      },
      {
        id: "money",
        title: "El dinero de la asociación",
        body: "Stripe Connect a nombre de la asociación: cada venta llega a su cuenta. Reembolsos, facturas y exportaciones para el tesorero.",
      },
      {
        id: "club",
        title: "Noches en discoteca",
        body: "El reparto con la discoteca se firma en Yuno y la liquidación de la noche la aprueban las dos partes. Se acabó contar efectivo a las 6.",
      },
      {
        id: "mail",
        title: "Emails a tus estudiantes",
        body: "Cada comprador entra en la base de la asociación. Anuncia la próxima fecha, reactiva a los indecisos: 15.000 emails/mes incluidos.",
      },
      {
        id: "team",
        title: "Junta y relevo",
        body: "Roles de admin, editor y escáner para la junta. Abre la cuenta con el email de la asociación: se queda cuando cambia la junta.",
      },
    ],
  },
  club: {
    eyebrow: "Noches en discoteca",
    title: "¿Una fiesta en discoteca? El trato con el local, firmado en Yuno.",
    body: "La mayoría de las fiestas de asociación se hacen en discotecas. Conecta la discoteca a tu fiesta y fija el reparto pilar por pilar: entradas, mesas, barra. Al cierre, la discoteca declara su recaudación y tú apruebas o reclamas. Nada se mueve sin tu acuerdo.",
    bullets: [
      "Contrato firmado en Yuno antes de la fiesta, no en una servilleta",
      "Entradas, lista de invitados y mesas vendidas en la misma página",
      "Liquidación aprobada por las dos partes, cada una cobra en su propia cuenta",
    ],
    card: {
      title: "Contrato asociación × discoteca",
      status: "Firmado",
      rows: [
        { label: "Entradas", value: "80 % asociación · 20 % local" },
        { label: "Lista", value: "Gratis antes de las 23:30" },
        { label: "Barra", value: "100 % local" },
      ],
      closing: "Liquidación de la noche",
      closingMeta: "Aprobada por la asociación y la discoteca",
      party: "Asoc.",
      venue: "Local",
    },
    cta: "Crear la cuenta de la asociación",
  },
  how: {
    eyebrow: "Cómo funciona",
    title: "De cero a la primera venta, sin llamadas.",
    sub: "Empieza en esta página y sigue desde tu móvil.",
    steps: [
      {
        title: "Crea la cuenta de la asociación",
        body: "El nombre de la asociación, tu ciudad, tu email: dos minutos. Después comprobamos que sois una asociación de estudiantes para activar la tarifa asociación.",
      },
      {
        title: "Publica la fiesta",
        body: "Cartel, tramos, lista de invitados, códigos para socios. Conecta la cuenta Stripe de la asociación para cobrar.",
      },
      {
        title: "Comparte el enlace",
        body: "En el grupo de clase, en stories, en la bio de Instagram, en QR en los carteles. Tus estudiantes pagan en 30 segundos.",
      },
      {
        title: "Escanea en la puerta",
        body: "La junta entra con un PIN. La lista se actualiza en directo en todos los móviles.",
      },
    ],
  },
  showcase: {
    eyebrow: "El espacio de la asociación",
    title: "Toda la fiesta en una pantalla, de la primera entrada al cierre.",
    sub: "Ventas, entradas vendidas, compradores, próximas fiestas: la junta lo ve en directo, el tesorero exporta con un clic.",
    alt: "El panel de una asociación de estudiantes en Yuno: ingresos, entradas vendidas, compradores únicos y próximas fiestas.",
    url: "yunoapp.eu/organizer",
  },
  pricing: {
    eyebrow: "Precios",
    title: "Gratis para la asociación. Más ligero para tus estudiantes.",
    sub: "La misma plataforma que las discotecas, con una tarifa asociación: el gasto mínimo que paga el estudiante baja de 0,99 € a 0,49 €. La asociación solo paga la comisión bancaria.",
    colItem: "Concepto",
    colWho: "Quién paga",
    colAmount: "Importe",
    rows: [
      {
        item: "Suscripción y comisión",
        who: "—",
        amount: "0\u00a0€ · 0\u00a0%",
        was: "",
        highlight: true,
      },
      {
        item: "Gastos de gestión, entradas",
        who: "El estudiante, además del precio",
        amount: "4\u00a0% · mín. 0,49\u00a0€",
        was: "0,99\u00a0€",
        highlight: true,
      },
      {
        item: "Gastos de gestión, mesas",
        who: "El estudiante, sobre el importe cobrado",
        amount: "4\u00a0% · mín. 0,49\u00a0€ · máx. 25\u00a0€",
        was: "",
        highlight: false,
      },
      { item: "Lista de invitados", who: "—", amount: "Gratis", was: "", highlight: false },
      {
        item: "Comisión bancaria (Stripe)",
        who: "La asociación, sobre lo cobrado",
        amount: "1,5\u00a0% +\u00a00,25\u00a0€",
        was: "",
        highlight: false,
      },
    ],
    verified:
      "La tarifa asociación se activa en cuanto el equipo de Yuno comprueba que sois una asociación de estudiantes. No hay que enviar nada: te escribimos si necesitamos algún dato.",
    calc: {
      title: "Lo que cobra tu asociación",
      price: "Precio de la entrada",
      qty: "Entradas vendidas",
      student: "El estudiante paga",
      studentMeta: "incluye {fee} de gastos de gestión",
      keep: "La asociación se queda por entrada",
      keepMeta: "tras {stripe} de comisión bancaria",
      total: "Neto de la fiesta",
      saved: "Ahorro de tus estudiantes con la tarifa asociación",
      savedMeta: "frente al mínimo estándar de 0,99 €",
      foot: "Gastos de gestión Yuno: 4 %, mín. 0,49 € con la tarifa asociación, pagados por el estudiante además del precio. Comisión bancaria Stripe: 1,5 % + 0,25 € por pago, pagada por la asociación. Cálculo para una entrada por pago.",
    },
    cardTitle: "Todo incluido",
    cardSub: "Una sola oferta, de la fiesta de bienvenida a la gala de fin de curso.",
    price: "0 €",
    priceSuffix: "/ mes para la asociación",
    included: [
      "Entradas por tramos, preventas, códigos para socios",
      "Lista de invitados con cupos y QR nominativos",
      "Fiestas privadas por defecto",
      "Control de acceso, PIN para la junta",
      "Mesas y reservados para las galas",
      "Contrato y liquidación con la discoteca",
      "Stripe Connect a nombre de la asociación, exportaciones",
      "15.000 emails/mes a tus estudiantes",
      "Apple Wallet, ES · EN · FR",
    ],
    cta: "Crear la cuenta de la asociación",
    ctaNote: "Sin tarjeta · Sin permanencia",
  },
  switch: {
    eyebrow: "Comparativa",
    title: "¿De dónde vienes? Esto es lo que cambia.",
    sub: "No hace falta dejarlo todo: quédate con lo que funciona y pasa tus fiestas a Yuno.",
    cards: [
      {
        name: "Bizum + Google Forms",
        tag: "El apaño",
        intro: "Gratis, pero la junta lo paga en horas. Con Yuno:",
        points: [
          "Pago y entrada QR en 30 segundos, sin capturas que revisar",
          "La lista de la puerta se rellena sola, sin duplicados",
          "Cada euro registrado para el tesorero, reembolsos con un clic",
        ],
        honest: "",
      },
      {
        name: "Relaciones públicas del local",
        tag: "Vender a través de la discoteca",
        intro:
          "Cuando la discoteca vende por sus RR. PP., la asociación pierde los datos y el control del reparto. Con Yuno:",
        points: [
          "Tus estudiantes compran en la página de la asociación y entran en tu base",
          "El reparto con la discoteca, firmado antes de la fiesta",
          "Una liquidación que aprueban las dos partes, sin efectivo a las 6",
        ],
        honest: "",
      },
      {
        name: "Shotgun",
        tag: "Ticketera de ocio nocturno",
        intro: "Algunas asociaciones ya venden sus fiestas en Shotgun. En Yuno:",
        points: [
          "0 % de comisión sobre el precio de tus entradas, donde Shotgun cobra una comisión sobre tus ventas",
          "El dinero en la cuenta de la asociación a medida que vendes, no 24 h después de la fiesta",
          "El contrato con la discoteca y una liquidación aprobada por las dos partes",
        ],
        honest: "",
      },
    ],
    sourcesTitle: "Fuentes (consultadas el 26 de septiembre de 2026)",
    sources: [
      {
        label: "Shotgun — Comprender los gastos de servicio",
        url: "https://support-pro.shotgun.live/hc/fr/articles/6989212196242-Comprendre-les-frais-de-services",
      },
      {
        label: "Shotgun — Transferir los fondos de un evento",
        url: "https://support-pro.shotgun.live/hc/en-us/articles/12836807849490",
      },
    ],
    disclaimer:
      "Shotgun es una marca de su propietario. Yuno no está afiliado a ella. Comparación basada en su información pública en la fecha indicada; las condiciones negociadas pueden variar.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Lo que nos preguntan las juntas.",
    items: [
      {
        q: "¿De verdad es gratis para la asociación?",
        a: "Sí: 0 € de suscripción y 0 % de comisión sobre el precio de tus entradas. Los gastos de gestión de Yuno (4 %, mínimo 0,49 € con la tarifa asociación) se suman al precio y los paga el estudiante. La asociación solo paga la comisión bancaria de Stripe: 1,5 % + 0,25 € por pago.",
      },
      {
        q: "¿Cómo se consigue la tarifa asociación de 0,49 €?",
        a: "Crea la cuenta desde esta página. El equipo de Yuno comprueba que sois una asociación de estudiantes y activa la tarifa asociación en vuestras fiestas. No hay que enviar nada: te escribimos si necesitamos algún dato.",
      },
      {
        q: "¿Qué asociaciones pueden usarlo?",
        a: "Cualquier asociación de estudiantes que organice eventos: delegaciones de estudiantes, clubes deportivos o culturales universitarios, secciones ESN, comisiones de gala.",
      },
      {
        q: "¿Cualquiera puede ver nuestras fiestas?",
        a: "No. Las fiestas de una asociación son privadas por defecto: accesibles solo con el enlace que compartes, nunca en la búsqueda pública. Puedes pedir que una fiesta sea pública; el equipo de Yuno aprueba la solicitud.",
      },
      {
        q: "¿Podemos tener un precio para socios?",
        a: "Sí: crea un código promocional (SOCIO, por ejemplo) para tus socios, o un tramo propio. Los códigos valen para entradas y mesas, en una fiesta o en todas.",
      },
      {
        q: "¿Cuándo cobramos?",
        a: "Los pagos pasan por Stripe Connect: cada venta llega a la cuenta Stripe de la asociación, a su nombre, a medida que vendes, y luego a tu banco según el calendario de pagos de Stripe. Yuno nunca retiene tus fondos.",
      },
      {
        q: "¿Hace falta una cuenta a nombre de la asociación?",
        a: "Sí, para cobrar: abres la cuenta Stripe de la asociación desde tu espacio Yuno, paso a paso. Crear la cuenta y preparar la fiesta se puede hacer antes.",
      },
      {
        q: "¿Y una fiesta en discoteca?",
        a: "Conecta la discoteca a tu fiesta. El reparto se firma en Yuno pilar por pilar (entradas, mesas, barra). Al cierre, la discoteca declara su recaudación, tú apruebas o reclamas y cada parte cobra en su propia cuenta.",
      },
      {
        q: "¿Los estudiantes tienen que descargar una app?",
        a: "No. La compra lleva 30 segundos en la web, con tarjeta o Apple Pay, sin crear cuenta. La entrada QR llega por email y a Apple Wallet.",
      },
      {
        q: "¿Qué pasa con el relevo de la junta?",
        a: "Abre la cuenta con el email de la asociación e invita a la junta como admin, editor o escáner. Cuando cambia la junta, los nuevos retoman el espacio: contactos, fiestas e historial se quedan en la asociación.",
      },
      {
        q: "¿Funciona fuera de España?",
        a: "Sí. Yuno funciona en español, inglés y francés, en Madrid, en París y en cualquier ciudad donde tu asociación organice fiestas.",
      },
    ],
  },
  final: {
    title: "La próxima fiesta de tu asociación empieza aquí.",
    sub: "Crea la cuenta de la asociación en dos minutos. 0 € para la asociación, gastos reducidos para tus estudiantes, el dinero en la cuenta de la asociación.",
    placeholder: "Nombre de tu asociación",
    primary: "Crear la cuenta de la asociación",
    secondary: "Escribir al fundador",
    note: "Sin tarjeta · Sin permanencia · ES · EN · FR",
  },
  footer: {
    tagline: "La ticketera de las fiestas universitarias, por Yuno.",
    cols: [
      {
        title: "Para asociaciones",
        links: [
          { label: "Funciones", href: "#features" },
          { label: "Noches en discoteca", href: "#club" },
          { label: "Precios", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Yuno",
        links: [
          { label: "Iniciar sesión", href: "https://yunoapp.eu/auth" },
          { label: "Privacidad", href: "/privacy" },
          { label: "Condiciones", href: "/terms" },
        ],
      },
    ],
    rights: "Todos los derechos reservados.",
    made: "Hecho en París y Madrid",
  },
  mobileCta: "Crear la cuenta de la asociación",
  whatsappMessage:
    "Hola Paul 👋 Formo parte de una asociación de estudiantes y me gustaría saber más sobre Yuno.",
  signup: {
    orgTitle: "Háblanos de tu asociación",
    structureSub: "Con esto preparamos el espacio de la asociación y su primera fiesta.",
    orgName: "Nombre de la asociación",
    orgNamePh: "Asociación Atlas",
    city: "Ciudad",
    cityPh: "Madrid",
    crowd: "Asistentes por evento",
    crowdOpts: [
      { id: "lt100", label: "< 100" },
      { id: "100_300", label: "100 – 300" },
      { id: "300_800", label: "300 – 800" },
      { id: "gt800", label: "800+" },
    ],
    frequency: "Eventos al año",
    frequencyOpts: [
      { id: "y1_3", label: "1 – 3" },
      { id: "y4_10", label: "4 – 10" },
      { id: "y10plus", label: "10+" },
    ],
    needsTitle: "¿Qué vas a ofrecer?",
    needsSub: "Elige lo que importa ahora; el resto se activa con un clic, fiesta a fiesta.",
    pillars: [
      { id: "tickets", label: "Entradas", hint: "Tramos, preventas, códigos para socios" },
      {
        id: "guest_list",
        label: "Lista de invitados",
        hint: "Junta, colaboradores, gratis antes de una hora",
      },
      { id: "tables", label: "Mesas y reservados", hint: "Para galas y noches en discoteca" },
      { id: "drinks", label: "Bebidas", hint: "Pedido en el QR de la barra" },
    ],
    tool: "¿Qué usáis hoy?",
    toolOpts: [
      { id: "lydia_forms", label: "Bizum / Forms" },
      { id: "club_rrpp", label: "RR. PP. del local" },
      { id: "shotgun", label: "Shotgun" },
      { id: "xceed", label: "Xceed" },
      { id: "other", label: "Otra" },
      { id: "none", label: "Nada todavía" },
    ],
    toolHint: "Te ayudaremos a importar tus contactos.",
    nextNight: "¿Tu próximo evento?",
    accountTitle: "Crea la cuenta de la asociación",
    accountTitleOrg: "Crea la cuenta de {org}",
    accountSub: "0 € para la asociación · Gastos desde 0,49 € · Sin tarjeta",
    email: "Email",
    emailPh: "junta@miasociacion.es",
    emailHint: "Consejo: el email de la asociación se queda cuando cambia la junta.",
    phoneHint:
      "Para confirmar la tarifa asociación y ayudarte con la primera fiesta. Nunca publicidad.",
    submit: "Crear la cuenta de la asociación",
    creatingSteps: [
      "Creando la cuenta",
      "Abriendo el espacio de la asociación",
      "Solicitando la tarifa asociación",
    ],
    confirmBody:
      "Hemos enviado un enlace a {email}. Haz clic para confirmar tu email: el espacio de la asociación se abre al momento.",
  },
};

export const assoContent: Record<"en" | "fr" | "es", AssoContent> = { en, fr, es };
