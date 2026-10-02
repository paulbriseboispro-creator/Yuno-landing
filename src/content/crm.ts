// Yuno CRM — the landing for organizers and clubs who KEEP their ticketing
// (Shotgun first). Separate product from the main landing (which sells the
// ticketing Suite): its own story, its own pricing (paid plans, unlike the
// Suite) and its own signup (SignupFlow product="crm").
//
// Facts here must match the yuno repo: grid in src/lib/crmPlans.ts
// (crm_plan_limits), trial / founder rules in YUNO_CRM_PRICING.md, connector in
// supabase/functions/affiliate-ticket-sync/ticketing.ts. Never claim a feature
// Shotgun lacks without a dated public source.

const en = {
  meta: {
    title: "Yuno CRM — keep your ticketing, make your crowd come back",
    description:
      "Yuno CRM plugs into Shotgun and turns your buyers into one living base: night reports, segments, email automations and Meta audiences. 14 days of Pro free, no card.",
  },
  whatsappMessage: "Hi Paul 👋 I sell on Shotgun and I'd like to know more about Yuno CRM.",
  nav: {
    links: [
      { label: "How it works", href: "#how" },
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Try Pro free",
  },
  hero: {
    eyebrow: "Yuno CRM · for organizers and clubs on Shotgun",
    title: "Keep your ticketing. Make your crowd come back.",
    sub: "Yuno CRM plugs into the ticketing you already use and turns every buyer into one profile: who comes, who comes back, who drifts away. Then it writes to them at the right time.",
    cta: "Try Pro free for 14 days",
    secondary: "See pricing",
    trust: ["Read-only on your ticketing", "No card needed", "Cancel anytime"],
    card: {
      title: "Your base",
      sync: "Shotgun · synced 12 min ago",
      rows: [
        { label: "Contacts", value: "773" },
        { label: "Reachable by email", value: "418" },
        { label: "Came back", value: "502" },
      ],
      night: "Last night",
      nightName: "Deep Night #18",
      nightLine: "173 tickets · 27 % new buyers",
      auto: "Last call sent to 214 people",
    },
  },
  stats: {
    items: [
      {
        value: "2",
        label: "pieces of info to connect",
        body: "Your Shotgun organizer ID and an API token.",
      },
      {
        value: "14",
        label: "days of Pro, free",
        body: "No card. The Free plan after, with your base intact.",
      },
      {
        value: "0",
        label: "change where you sell",
        body: "Read-only: Yuno never creates, refunds or scans on Shotgun.",
      },
      {
        value: "3",
        label: "languages",
        body: "English, French and Spanish, for you and your crowd.",
      },
    ],
  },
  problem: {
    eyebrow: "The problem",
    title: "Your buyers are in your ticketing. Your relationship with them isn't.",
    sub: "Each night ends in a list of buyers. Turning those lists into regulars takes time nobody has on a Thursday afternoon.",
    today: "Today",
    withYuno: "With Yuno CRM",
    rows: [
      {
        subject: "The base",
        today: "One export per night, in a spreadsheet, with the same people in ten files.",
        yuno: "One profile per person across all your nights, deduplicated, updated on its own.",
      },
      {
        subject: "The follow-up",
        today: "A newsletter to everyone, or to no one, when someone thinks about it.",
        yuno: "Emails that leave at the right moment: new night, last call, a regular drifting away.",
      },
      {
        subject: "The report",
        today: "A sales total, and a vague memory of the night before.",
        yuno: "Each night compared with the previous one at the same point, with its new faces.",
      },
      {
        subject: "The ads",
        today: "Instagram ads aimed at people who look like nobody in particular.",
        yuno: "Meta audiences built from your real buyers who agreed to hear from you.",
      },
      {
        subject: "Consent",
        today: "Hard to say who agreed to what, and when.",
        yuno: "Only people who accepted your newsletter receive your emails. Every send applies it.",
      },
    ],
  },
  how: {
    eyebrow: "How it works",
    title: "Connected in five minutes. Useful the same evening.",
    steps: [
      {
        title: "Connect your ticketing",
        body: "Paste your Shotgun organizer ID and an API token. Read-only: nothing changes on Shotgun.",
      },
      {
        title: "Your history comes in",
        body: "Nights, tickets and buyers arrive on their own, then stay in sync. Imported files join the same base.",
      },
      {
        title: "Yuno writes for you",
        body: "Turn on the automations you want. Yuno sends them at the right time, only to people who said yes.",
      },
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "Everything you need to fill the next night with the people from the last one.",
    sub: "The same marketing engine as the Yuno ticketing Suite, plugged into your own ticketing.",
    items: [
      {
        id: "base",
        title: "One living base",
        body: "Every buyer from every night and every file, one line per person, with nights, spend and last visit.",
      },
      {
        id: "report",
        title: "A report for every night",
        body: "Tickets, revenue, new buyers, sales curve against the previous night, prices and sources.",
      },
      {
        id: "segments",
        title: "Ready-made segments",
        body: "Regulars drifting away, big spenders, seen in the last 60 days: one click, and they're an audience.",
      },
      {
        id: "studio",
        title: "Email Studio",
        body: "Templates that pull your night's poster, prices and ticket link from your ticketing.",
      },
      {
        id: "auto",
        title: "Automations",
        body: "New night, last call, thank-you, win-back, regular drifting away: they leave on their own.",
      },
      {
        id: "meta",
        title: "Meta audiences · soon",
        body: "Your consenting buyers as an Instagram and Facebook audience, and lookalikes from them.",
      },
      {
        id: "team",
        title: "Your team, your rights",
        body: "Partners and marketing people get their own access, with their own permissions.",
      },
      {
        id: "consent",
        title: "Consent and deliverability",
        body: "Opt-ins tracked, unsubscribes respected everywhere, bounces and complaints watched for you.",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Start free. Pay when it works.",
    sub: "Every account starts with 14 days of Pro, no card. Then pick a plan, or stay on Free with your base intact.",
    monthly: "Monthly",
    yearly: "Yearly · 2 months free",
    perMonth: "excl. VAT / month",
    perYear: "excl. VAT / year",
    founder:
      "Founder price for the first 15 accounts: Pro at 89 € instead of 129 €, guaranteed for 12 months.",
    founderShort: "founder price",
    recommended: "Most chosen",
    cta: "Start with Pro free",
    ctaFree: "Start free",
    plans: [
      {
        id: "free",
        name: "Free",
        pitch: "Your base and your night reports.",
        month: 0,
        founder: null,
        features: [
          "1,000 emails / month",
          "Ticketing synced once a day",
          "Night reports and segments",
          "1 user",
          '"Sent with Yuno" in the footer',
        ],
      },
      {
        id: "essential",
        name: "Essential",
        pitch: "Write to your base, automate the essentials.",
        month: 49,
        founder: 35,
        features: [
          "15,000 emails / month",
          "100 SMS / month",
          "Ticketing synced every hour",
          "3 automations at once",
          "Segment export",
          "3 users",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        pitch: "Every automation, A/B tests and Meta ads.",
        month: 129,
        founder: 89,
        features: [
          "50,000 emails / month",
          "250 SMS / month",
          "Ticketing synced every 15 minutes",
          "Every automation",
          "Subject A/B test and resend to non-openers",
          "Meta audiences and ads",
          "5 users",
        ],
      },
      {
        id: "business",
        name: "Business",
        pitch: "For big bases and teams, set up with you.",
        month: 249,
        founder: 175,
        features: [
          "100,000 emails / month",
          "500 SMS / month",
          "Everything in Pro",
          "Unlimited users",
          "Import and templates done with you",
        ],
      },
    ],
    footnote:
      "Prices excl. VAT. Yearly = 10 months. SMS and Meta audiences open soon. Need more emails? Top-ups at cost: 10 € per 10,000.",
    network: "Several clubs or brands? Ask us about the Network plan.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions organizers ask us",
    items: [
      {
        q: "Does Yuno change anything on my ticketing?",
        a: "No. The connection is read-only: Yuno never creates, refunds, scans or edits anything on Shotgun. You keep selling exactly as today.",
      },
      {
        q: "Which ticketing tools do you support?",
        a: "Shotgun connects directly with your API token. From any other tool (DICE, Weezevent, Eventbrite, Xceed…), import your customer file: it joins the same base, deduplicated.",
      },
      {
        q: "Who receives my emails?",
        a: "Only people who accepted your newsletter, on Shotgun or in an imported file with its consent. Unsubscribes are respected on every send, and no welcome email ever goes to an imported history.",
      },
      {
        q: "Is my data mine?",
        a: "Yes. Export your whole base at any time. Disconnect your ticketing whenever you like, or delete everything Yuno imported in one click.",
      },
      {
        q: "What happens after the 14-day trial?",
        a: "If you don't choose a plan, the account moves to Free: your base and your reports stay, sync drops to once a day and automations beyond the plan turn off.",
      },
      {
        q: "Can I sell my tickets with Yuno later?",
        a: "Yes. Your account moves to the Yuno ticketing Suite without losing anything: same contacts, same segments, same templates.",
      },
    ],
  },
  final: {
    title: "Your next night, with the people from the last one.",
    sub: "Connect your ticketing in five minutes. Pro is free for 14 days, no card.",
    placeholder: "Your collective or club name",
    cta: "Try Pro free",
  },
  mobileCta: "Try Pro free",
  signup: {
    roleTitle: "Who's plugging in their ticketing?",
    roles: [
      { id: "club", label: "A club or venue", hint: "Your nights and your regulars" },
      { id: "organizer", label: "Events & nights", hint: "Organizer or collective" },
      { id: "promoter", label: "A promoter team", hint: "Promoter or agency" },
      { id: "other", label: "Something else", hint: "Festival, bar, DJ…" },
    ],
    roleSub: "Yuno CRM sets up your Console for it — two minutes, no call needed.",
    structureSub: "Your Console and your first reports are built on it.",
    tool: "Your ticketing",
    toolHint: "Shotgun connects directly; for the others, you'll import your customer file.",
  },
};

export type CrmContent = typeof en;

const fr: CrmContent = {
  meta: {
    title: "Yuno CRM — gardez votre billetterie, faites revenir votre public",
    description:
      "Yuno CRM se branche sur Shotgun et fait de vos acheteurs une base vivante : bilans de soirée, segments, automatisations email et audiences Meta. 14 jours de Pro offerts, sans carte.",
  },
  whatsappMessage:
    "Bonjour Paul 👋 Je vends sur Shotgun et j'aimerais en savoir plus sur Yuno CRM.",
  nav: {
    links: [
      { label: "Comment ça marche", href: "#how" },
      { label: "Fonctionnalités", href: "#features" },
      { label: "Tarifs", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Essayer le Pro",
  },
  hero: {
    eyebrow: "Yuno CRM · pour les organisateurs et les clubs sur Shotgun",
    title: "Gardez votre billetterie. Faites revenir votre public.",
    sub: "Yuno CRM se branche sur la billetterie que vous utilisez déjà et fait de chaque acheteur une seule fiche : qui vient, qui revient, qui décroche. Puis il leur écrit au bon moment.",
    cta: "Essayer le Pro 14 jours",
    secondary: "Voir les tarifs",
    trust: ["Lecture seule sur votre billetterie", "Sans carte bancaire", "Sans engagement"],
    card: {
      title: "Votre base",
      sync: "Shotgun · synchronisé il y a 12 min",
      rows: [
        { label: "Contacts", value: "773" },
        { label: "Joignables par email", value: "418" },
        { label: "Sont revenus", value: "502" },
      ],
      night: "Dernière soirée",
      nightName: "Deep Night #18",
      nightLine: "173 billets · 27 % de nouveaux acheteurs",
      auto: "Dernier appel envoyé à 214 personnes",
    },
  },
  stats: {
    items: [
      {
        value: "2",
        label: "infos pour se connecter",
        body: "Votre ID organisateur Shotgun et un jeton API.",
      },
      {
        value: "14",
        label: "jours de Pro offerts",
        body: "Sans carte. Puis le Gratuit, avec votre base intacte.",
      },
      {
        value: "0",
        label: "changement là où vous vendez",
        body: "Lecture seule : Yuno ne crée, ne rembourse et ne scanne rien chez Shotgun.",
      },
      {
        value: "3",
        label: "langues",
        body: "Français, anglais et espagnol, pour vous et votre public.",
      },
    ],
  },
  problem: {
    eyebrow: "Le problème",
    title: "Vos acheteurs sont dans votre billetterie. Votre relation avec eux, non.",
    sub: "Chaque soirée finit en liste d'acheteurs. En faire des habitués demande un temps que personne n'a un jeudi après-midi.",
    today: "Aujourd'hui",
    withYuno: "Avec Yuno CRM",
    rows: [
      {
        subject: "La base",
        today: "Un export par soirée, dans un tableur, avec les mêmes personnes dans dix fichiers.",
        yuno: "Une fiche par personne sur toutes vos soirées, dédoublonnée, mise à jour toute seule.",
      },
      {
        subject: "La relance",
        today: "Une newsletter à tout le monde, ou à personne, quand quelqu'un y pense.",
        yuno: "Des emails qui partent au bon moment : nouvelle soirée, dernier appel, habitué qui décroche.",
      },
      {
        subject: "Le bilan",
        today: "Un total de ventes, et un vague souvenir de la soirée d'avant.",
        yuno: "Chaque soirée comparée à la précédente au même moment, avec ses nouveaux visages.",
      },
      {
        subject: "La pub",
        today: "Des pubs Instagram visant des gens qui ne ressemblent à personne en particulier.",
        yuno: "Des audiences Meta construites sur vos vrais acheteurs qui ont accepté d'avoir de vos nouvelles.",
      },
      {
        subject: "Le consentement",
        today: "Difficile de dire qui a accepté quoi, et quand.",
        yuno: "Seuls ceux qui ont accepté votre newsletter reçoivent vos emails. Chaque envoi l'applique.",
      },
    ],
  },
  how: {
    eyebrow: "Comment ça marche",
    title: "Connecté en cinq minutes. Utile le soir même.",
    steps: [
      {
        title: "Connectez votre billetterie",
        body: "Collez votre ID organisateur Shotgun et un jeton API. Lecture seule : rien ne change chez Shotgun.",
      },
      {
        title: "Votre historique arrive",
        body: "Soirées, billets et acheteurs arrivent tout seuls, puis restent synchronisés. Vos fichiers rejoignent la même base.",
      },
      {
        title: "Yuno écrit pour vous",
        body: "Allumez les automatisations voulues. Yuno les envoie au bon moment, seulement à qui a dit oui.",
      },
    ],
  },
  features: {
    eyebrow: "Ce que vous obtenez",
    title: "Tout ce qu'il faut pour remplir la prochaine soirée avec les gens de la dernière.",
    sub: "Le même moteur marketing que la billetterie Yuno, branché sur votre propre billetterie.",
    items: [
      {
        id: "base",
        title: "Une base vivante",
        body: "Chaque acheteur de chaque soirée et de chaque fichier, une ligne par personne, avec ses soirées, sa dépense et sa dernière venue.",
      },
      {
        id: "report",
        title: "Un bilan par soirée",
        body: "Billets, CA, nouveaux acheteurs, courbe des ventes face à la soirée d'avant, tarifs et sources.",
      },
      {
        id: "segments",
        title: "Des segments prêts",
        body: "Habitués qui décrochent, gros paniers, vus ces 60 derniers jours : un clic, et c'est une audience.",
      },
      {
        id: "studio",
        title: "Email Studio",
        body: "Des modèles qui reprennent l'affiche, les tarifs et le lien de billetterie de votre soirée.",
      },
      {
        id: "auto",
        title: "Des automatisations",
        body: "Nouvelle soirée, dernier appel, merci, reconquête, habitué qui décroche : elles partent seules.",
      },
      {
        id: "meta",
        title: "Des audiences Meta · bientôt",
        body: "Vos acheteurs consentants en audience Instagram et Facebook, et des audiences similaires.",
      },
      {
        id: "team",
        title: "Votre équipe, vos droits",
        body: "Associés et responsables marketing ont leur propre accès, avec leurs propres droits.",
      },
      {
        id: "consent",
        title: "Consentement et délivrabilité",
        body: "Accords tracés, désabonnements respectés partout, rebonds et plaintes surveillés pour vous.",
      },
    ],
  },
  pricing: {
    eyebrow: "Tarifs",
    title: "Commencez gratuitement. Payez quand ça marche.",
    sub: "Chaque compte commence par 14 jours de Pro, sans carte. Ensuite, choisissez une offre, ou restez au Gratuit avec votre base intacte.",
    monthly: "Mensuel",
    yearly: "Annuel · 2 mois offerts",
    perMonth: "HT / mois",
    perYear: "HT / an",
    founder:
      "Prix fondateur pour les 15 premiers comptes : le Pro à 89 € au lieu de 129 €, garanti 12 mois.",
    founderShort: "prix fondateur",
    recommended: "Le plus choisi",
    cta: "Commencer avec le Pro offert",
    ctaFree: "Commencer gratuitement",
    plans: [
      {
        id: "free",
        name: "Gratuit",
        pitch: "Votre base et vos bilans de soirée.",
        month: 0,
        founder: null,
        features: [
          "1 000 emails / mois",
          "Billetterie synchronisée une fois par jour",
          "Bilans de soirée et segments",
          "1 utilisateur",
          "Mention « envoyé avec Yuno » au pied des emails",
        ],
      },
      {
        id: "essential",
        name: "Essentiel",
        pitch: "Écrire à votre base, automatiser l'essentiel.",
        month: 49,
        founder: 35,
        features: [
          "15 000 emails / mois",
          "100 SMS / mois",
          "Billetterie synchronisée toutes les heures",
          "3 automatisations en même temps",
          "Export des segments",
          "3 utilisateurs",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        pitch: "Toutes les automatisations, l'A/B et les pubs Meta.",
        month: 129,
        founder: 89,
        features: [
          "50 000 emails / mois",
          "250 SMS / mois",
          "Billetterie synchronisée toutes les 15 minutes",
          "Toutes les automatisations",
          "Test A/B d'objet et renvoi aux non-ouvreurs",
          "Audiences et pubs Meta",
          "5 utilisateurs",
        ],
      },
      {
        id: "business",
        name: "Business",
        pitch: "Pour les grosses bases et les équipes, mis en place avec vous.",
        month: 249,
        founder: 175,
        features: [
          "100 000 emails / mois",
          "500 SMS / mois",
          "Tout le Pro",
          "Utilisateurs illimités",
          "Import et modèles faits avec vous",
        ],
      },
    ],
    footnote:
      "Prix HT. Annuel = 10 mois. Le SMS et les audiences Meta ouvrent bientôt. Besoin de plus d'emails ? Recharges à prix coûtant : 10 € les 10 000.",
    network: "Plusieurs clubs ou plusieurs marques ? Parlons de l'offre Réseau.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Les questions que les organisateurs nous posent",
    items: [
      {
        q: "Yuno change-t-il quelque chose sur ma billetterie ?",
        a: "Non. La connexion est en lecture seule : Yuno ne crée, ne rembourse, ne scanne et ne modifie rien chez Shotgun. Vous continuez à vendre exactement comme aujourd'hui.",
      },
      {
        q: "Quelles billetteries sont prises en charge ?",
        a: "Shotgun se connecte directement avec votre jeton API. Depuis toute autre billetterie (DICE, Weezevent, Eventbrite, Xceed…), importez votre fichier clients : il rejoint la même base, dédoublonné.",
      },
      {
        q: "Qui reçoit mes emails ?",
        a: "Seulement les personnes qui ont accepté votre newsletter, chez Shotgun ou dans un fichier importé avec son consentement. Les désabonnements sont respectés à chaque envoi, et aucun email de bienvenue ne part vers un historique importé.",
      },
      {
        q: "Mes données sont-elles à moi ?",
        a: "Oui. Exportez votre base entière à tout moment. Déconnectez votre billetterie quand vous voulez, ou supprimez en un clic tout ce que Yuno a importé.",
      },
      {
        q: "Que se passe-t-il après les 14 jours d'essai ?",
        a: "Sans offre choisie, le compte passe au Gratuit : votre base et vos bilans restent, la synchro passe à une fois par jour et les automatisations au-delà de l'offre s'éteignent.",
      },
      {
        q: "Pourrai-je vendre mes billets avec Yuno plus tard ?",
        a: "Oui. Votre compte passe à la billetterie Yuno sans rien perdre : mêmes contacts, mêmes segments, mêmes modèles.",
      },
    ],
  },
  final: {
    title: "Votre prochaine soirée, avec les gens de la dernière.",
    sub: "Connectez votre billetterie en cinq minutes. Le Pro est offert 14 jours, sans carte.",
    placeholder: "Le nom de votre collectif ou de votre club",
    cta: "Essayer le Pro",
  },
  mobileCta: "Essayer le Pro",
  signup: {
    roleTitle: "Qui branche sa billetterie ?",
    roles: [
      { id: "club", label: "Un club ou une salle", hint: "Vos soirées et vos habitués" },
      { id: "organizer", label: "Des soirées", hint: "Organisateur ou collectif" },
      { id: "promoter", label: "Une équipe de promo", hint: "Promoteur ou agence" },
      { id: "other", label: "Autre chose", hint: "Festival, bar, DJ…" },
    ],
    roleSub: "Yuno CRM prépare votre Console en conséquence — deux minutes, sans appel.",
    structureSub: "Votre Console et vos premiers bilans se construisent là-dessus.",
    tool: "Votre billetterie",
    toolHint:
      "Shotgun se connecte directement ; pour les autres, vous importerez votre fichier clients.",
  },
};

const es: CrmContent = {
  meta: {
    title: "Yuno CRM — quédate con tu ticketera, haz que tu público vuelva",
    description:
      "Yuno CRM se conecta a Shotgun y convierte a tus compradores en una base viva: informes de fiesta, segmentos, automatizaciones de email y audiencias de Meta. 14 días de Pro gratis, sin tarjeta.",
  },
  whatsappMessage: "Hola Paul 👋 Vendo en Shotgun y me gustaría saber más sobre Yuno CRM.",
  nav: {
    links: [
      { label: "Cómo funciona", href: "#how" },
      { label: "Funciones", href: "#features" },
      { label: "Precios", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Probar el Pro",
  },
  hero: {
    eyebrow: "Yuno CRM · para organizadores y discotecas en Shotgun",
    title: "Quédate con tu ticketera. Haz que tu público vuelva.",
    sub: "Yuno CRM se conecta a la ticketera que ya usas y convierte a cada comprador en una sola ficha: quién viene, quién vuelve, quién se aleja. Y les escribe en el momento justo.",
    cta: "Probar el Pro 14 días",
    secondary: "Ver precios",
    trust: ["Solo lectura en tu ticketera", "Sin tarjeta", "Sin permanencia"],
    card: {
      title: "Tu base",
      sync: "Shotgun · sincronizado hace 12 min",
      rows: [
        { label: "Contactos", value: "773" },
        { label: "Contactables por email", value: "418" },
        { label: "Han vuelto", value: "502" },
      ],
      night: "Última fiesta",
      nightName: "Deep Night #18",
      nightLine: "173 entradas · 27 % de compradores nuevos",
      auto: "Último aviso enviado a 214 personas",
    },
  },
  stats: {
    items: [
      {
        value: "2",
        label: "datos para conectar",
        body: "Tu ID de organizador de Shotgun y un token API.",
      },
      {
        value: "14",
        label: "días de Pro gratis",
        body: "Sin tarjeta. Después el plan Gratis, con tu base intacta.",
      },
      {
        value: "0",
        label: "cambios donde vendes",
        body: "Solo lectura: Yuno no crea, no reembolsa ni escanea nada en Shotgun.",
      },
      { value: "3", label: "idiomas", body: "Español, inglés y francés, para ti y tu público." },
    ],
  },
  problem: {
    eyebrow: "El problema",
    title: "Tus compradores están en tu ticketera. Tu relación con ellos, no.",
    sub: "Cada fiesta termina en una lista de compradores. Convertirlos en habituales pide un tiempo que nadie tiene un jueves por la tarde.",
    today: "Hoy",
    withYuno: "Con Yuno CRM",
    rows: [
      {
        subject: "La base",
        today:
          "Una exportación por fiesta, en una hoja de cálculo, con las mismas personas en diez archivos.",
        yuno: "Una ficha por persona en todas tus fiestas, sin duplicados, actualizada sola.",
      },
      {
        subject: "El seguimiento",
        today: "Una newsletter a todos, o a nadie, cuando alguien se acuerda.",
        yuno: "Emails que salen en el momento justo: nueva fiesta, último aviso, un habitual que se aleja.",
      },
      {
        subject: "El informe",
        today: "Un total de ventas y un vago recuerdo de la fiesta anterior.",
        yuno: "Cada fiesta comparada con la anterior en el mismo momento, con sus caras nuevas.",
      },
      {
        subject: "Los anuncios",
        today: "Anuncios de Instagram dirigidos a gente que no se parece a nadie en concreto.",
        yuno: "Audiencias de Meta creadas con tus compradores reales que aceptaron saber de ti.",
      },
      {
        subject: "El consentimiento",
        today: "Difícil saber quién aceptó qué, y cuándo.",
        yuno: "Solo quienes aceptaron tu newsletter reciben tus emails. Cada envío lo aplica.",
      },
    ],
  },
  how: {
    eyebrow: "Cómo funciona",
    title: "Conectado en cinco minutos. Útil esa misma noche.",
    steps: [
      {
        title: "Conecta tu ticketera",
        body: "Pega tu ID de organizador de Shotgun y un token API. Solo lectura: nada cambia en Shotgun.",
      },
      {
        title: "Llega tu historial",
        body: "Fiestas, entradas y compradores llegan solos y se mantienen sincronizados. Tus archivos se unen a la misma base.",
      },
      {
        title: "Yuno escribe por ti",
        body: "Activa las automatizaciones que quieras. Yuno las envía en el momento justo, solo a quien dijo que sí.",
      },
    ],
  },
  features: {
    eyebrow: "Lo que obtienes",
    title: "Todo lo necesario para llenar la próxima fiesta con la gente de la última.",
    sub: "El mismo motor de marketing que la ticketera Yuno, conectado a tu propia ticketera.",
    items: [
      {
        id: "base",
        title: "Una base viva",
        body: "Cada comprador de cada fiesta y de cada archivo, una fila por persona, con sus fiestas, su gasto y su última visita.",
      },
      {
        id: "report",
        title: "Un informe por fiesta",
        body: "Entradas, facturación, compradores nuevos, curva de ventas frente a la fiesta anterior, precios y fuentes.",
      },
      {
        id: "segments",
        title: "Segmentos listos",
        body: "Habituales que se alejan, grandes gastadores, vistos en los últimos 60 días: un clic y ya es una audiencia.",
      },
      {
        id: "studio",
        title: "Email Studio",
        body: "Plantillas que toman el cartel, los precios y el enlace de entradas de tu fiesta.",
      },
      {
        id: "auto",
        title: "Automatizaciones",
        body: "Nueva fiesta, último aviso, gracias, recuperación, habitual que se aleja: salen solas.",
      },
      {
        id: "meta",
        title: "Audiencias de Meta · pronto",
        body: "Tus compradores con consentimiento como audiencia de Instagram y Facebook, y audiencias similares.",
      },
      {
        id: "team",
        title: "Tu equipo, tus permisos",
        body: "Socios y responsables de marketing tienen su propio acceso, con sus propios permisos.",
      },
      {
        id: "consent",
        title: "Consentimiento y entregabilidad",
        body: "Consentimientos registrados, bajas respetadas en todas partes, rebotes y quejas vigilados por ti.",
      },
    ],
  },
  pricing: {
    eyebrow: "Precios",
    title: "Empieza gratis. Paga cuando funcione.",
    sub: "Cada cuenta empieza con 14 días de Pro, sin tarjeta. Después elige un plan, o quédate en Gratis con tu base intacta.",
    monthly: "Mensual",
    yearly: "Anual · 2 meses gratis",
    perMonth: "sin IVA / mes",
    perYear: "sin IVA / año",
    founder:
      "Precio fundador para las 15 primeras cuentas: el Pro a 89 € en lugar de 129 €, garantizado 12 meses.",
    founderShort: "precio fundador",
    recommended: "El más elegido",
    cta: "Empezar con el Pro gratis",
    ctaFree: "Empezar gratis",
    plans: [
      {
        id: "free",
        name: "Gratis",
        pitch: "Tu base y tus informes de fiesta.",
        month: 0,
        founder: null,
        features: [
          "1.000 emails / mes",
          "Ticketera sincronizada una vez al día",
          "Informes de fiesta y segmentos",
          "1 usuario",
          "Mención «enviado con Yuno» al pie de los emails",
        ],
      },
      {
        id: "essential",
        name: "Esencial",
        pitch: "Escribir a tu base, automatizar lo esencial.",
        month: 49,
        founder: 35,
        features: [
          "15.000 emails / mes",
          "100 SMS / mes",
          "Ticketera sincronizada cada hora",
          "3 automatizaciones a la vez",
          "Exportación de segmentos",
          "3 usuarios",
        ],
      },
      {
        id: "pro",
        name: "Pro",
        pitch: "Todas las automatizaciones, A/B y anuncios Meta.",
        month: 129,
        founder: 89,
        features: [
          "50.000 emails / mes",
          "250 SMS / mes",
          "Ticketera sincronizada cada 15 minutos",
          "Todas las automatizaciones",
          "Test A/B de asunto y reenvío a quienes no abrieron",
          "Audiencias y anuncios Meta",
          "5 usuarios",
        ],
      },
      {
        id: "business",
        name: "Business",
        pitch: "Para bases grandes y equipos, configurado contigo.",
        month: 249,
        founder: 175,
        features: [
          "100.000 emails / mes",
          "500 SMS / mes",
          "Todo lo del Pro",
          "Usuarios ilimitados",
          "Importación y plantillas hechas contigo",
        ],
      },
    ],
    footnote:
      "Precios sin IVA. Anual = 10 meses. El SMS y las audiencias de Meta abren pronto. ¿Necesitas más emails? Recargas a precio de coste: 10 € los 10.000.",
    network: "¿Varias discotecas o marcas? Hablemos del plan Red.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Las preguntas que nos hacen los organizadores",
    items: [
      {
        q: "¿Yuno cambia algo en mi ticketera?",
        a: "No. La conexión es de solo lectura: Yuno no crea, no reembolsa, no escanea ni modifica nada en Shotgun. Sigues vendiendo exactamente como hoy.",
      },
      {
        q: "¿Qué ticketeras son compatibles?",
        a: "Shotgun se conecta directamente con tu token API. Desde cualquier otra (DICE, Weezevent, Eventbrite, Xceed…), importa tu archivo de clientes: se une a la misma base, sin duplicados.",
      },
      {
        q: "¿Quién recibe mis emails?",
        a: "Solo las personas que aceptaron tu newsletter, en Shotgun o en un archivo importado con su consentimiento. Las bajas se respetan en cada envío, y nunca sale un email de bienvenida a un historial importado.",
      },
      {
        q: "¿Mis datos son míos?",
        a: "Sí. Exporta tu base completa cuando quieras. Desconecta tu ticketera cuando quieras, o borra en un clic todo lo que Yuno importó.",
      },
      {
        q: "¿Qué pasa después de los 14 días de prueba?",
        a: "Sin plan elegido, la cuenta pasa a Gratis: tu base y tus informes se quedan, la sincronización baja a una vez al día y las automatizaciones que superan el plan se apagan.",
      },
      {
        q: "¿Podré vender mis entradas con Yuno más adelante?",
        a: "Sí. Tu cuenta pasa a la ticketera Yuno sin perder nada: mismos contactos, mismos segmentos, mismas plantillas.",
      },
    ],
  },
  final: {
    title: "Tu próxima fiesta, con la gente de la última.",
    sub: "Conecta tu ticketera en cinco minutos. El Pro es gratis 14 días, sin tarjeta.",
    placeholder: "El nombre de tu colectivo o discoteca",
    cta: "Probar el Pro",
  },
  mobileCta: "Probar el Pro",
  signup: {
    roleTitle: "¿Quién conecta su ticketera?",
    roles: [
      { id: "club", label: "Una discoteca o sala", hint: "Tus fiestas y tus habituales" },
      { id: "organizer", label: "Fiestas y eventos", hint: "Organizador o colectivo" },
      { id: "promoter", label: "Un equipo de promo", hint: "Promotor o agencia" },
      { id: "other", label: "Otra cosa", hint: "Festival, bar, DJ…" },
    ],
    roleSub: "Yuno CRM prepara tu Console para ello — dos minutos, sin llamada.",
    structureSub: "Tu Console y tus primeros informes se construyen con esto.",
    tool: "Tu ticketera",
    toolHint: "Shotgun se conecta directamente; para las demás, importarás tu archivo de clientes.",
  },
};

export const crmContent: Record<"en" | "fr" | "es", CrmContent> = { en, fr, es };
