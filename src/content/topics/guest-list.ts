// Guest list software for clubs and organizers (B2B, the door team). Targets:
// "nightclub guest list software", "guest list app for clubs", "online guest list
// QR code check-in" (EN), "logiciel guest list soirée", "liste d'invités QR code
// application", "gestion guest list boîte de nuit", "contrôle d'accès soirée
// application" (FR), "software lista de invitados discoteca", "listas discoteca
// online", "control de acceso discoteca app" (ES). Facts: docs/yuno-context.md.
import type { TopicPageContent } from "../topic-types";

const UPDATED = "2026-09-29";
const TWINS = {
  en: "/nightclub-guest-list-software",
  fr: "/fr/guest-list-soiree-logiciel",
  es: "/es/lista-invitados-discoteca-software",
};

const en: TopicPageContent = {
  id: "guest-list",
  lang: "en",
  path: TWINS.en,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Nightclub guest list software with QR check-in | Yuno",
    description:
      "Guest list app for clubs: online sign-ups with quotas, named QR codes, one door scanner, live entry count, entries credited to each promoter. €0 subscription.",
    ogAlt: "Yuno — nightclub guest list software with QR code check-in",
  },
  breadcrumb: { home: "Yuno", current: "Guest list software" },
  hero: {
    kicker: "Guest list software for nightclubs, organizers and door teams",
    title: "Run your guest list online. Check people in at the door in seconds.",
    sub: "Guests sign up on your page and get a named QR code. Your door team scans it with the same scanner as tickets and tables, sees duplicates explained and watches the entry count live. €0 subscription, 0% commission.",
    primary: "Create my free account",
    secondary: "Talk to the founder",
    note: ["Start with the guest list alone", "No app for guests", "€0 subscription"],
  },
  answer: {
    title: "In short",
    paragraphs: [
      "Yuno replaces the paper list, the spreadsheet and the WhatsApp group with an online guest list built for clubs and organizers. Guests sign up on your event page or through a promoter's link, within the quotas you set and, if you want, only until a cut-off time. Each guest gets a named QR code (and an Apple Wallet pass) in about 30 seconds, with no account and no app.",
      "At the door, your team scans that QR code with the same scanner they use for tickets and tables. They can search by name when someone has lost their phone, see why a code is flagged as a duplicate, and follow the live entry counter. Every entry is credited to the promoter link the guest came from.",
    ],
    bullets: [
      "€0 subscription and 0% commission for the club or organizer. Guests sign up for the guest list for free; the buyer service fee (4%, min €0.99) applies to paid tickets — see the pricing page.",
      "Each night has one switch per pillar (tickets, tables, drinks): you can run the guest list alone, then add the rest when you are ready.",
      "Everyone who signs up joins your own customer base, with email consent attested, so you can invite them back to the next night.",
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "Everything to build a guest list and control the door",
    sub: "From the sign-up page to the last person through the doors.",
    items: [
      {
        title: "Online sign-ups with quotas",
        body: "Open the list on your event page and cap it: overall, or per promoter. When it is full, a waiting list takes over, so you never overbook by accident.",
      },
      {
        title: "Free until a cut-off time",
        body: "Keep the guest list free before the time you choose. It is the classic way to fill the room early without giving away the whole night.",
      },
      {
        title: "Named QR codes and Apple Wallet",
        body: "Every guest gets a QR code in their own name, added to Apple Wallet in one tap. Checkout takes about 30 seconds, by card or Apple Pay when a ticket is involved, and guests need no account and no app.",
      },
      {
        title: "One scanner for the whole door",
        body: "Tickets, guest-list entries and table bookings are scanned with the same tool. Your bouncer does not switch apps or lists depending on who is in front of them.",
      },
      {
        title: "Name search, duplicates explained",
        body: "No phone, no code? Search by name. If a code was already used, the scanner shows when and what happened, instead of a bare red screen.",
      },
      {
        title: "Live entry counter and incidents",
        body: "See how many people are in, on which list, in real time, and log incidents from the door. Your manager sees the same night as your bouncer.",
      },
      {
        title: "Entries credited to the right promoter",
        body: "Each promoter has a personal link per night. Sign-ups and real entries are counted live and feed the commission, with no manual recount the next morning.",
      },
      {
        title: "A screen for each role",
        body: "Each staff member has their own role-specific screen: bouncer, VIP host, bartender, cloakroom, manager. The organizer team also has admin, editor and scanner roles.",
      },
    ],
  },
  table: {
    eyebrow: "Paper vs app",
    title: "Paper list, spreadsheet or group chat vs a guest-list app",
    sub: "A generic comparison of the way most doors still run a guest list, and what changes with Yuno.",
    head: ["Criterion", "Paper or spreadsheet", "Yuno"],
    rows: [
      [
        "Sign-ups",
        "Names sent by message or email, typed in by hand",
        "Guests sign up themselves on your page or a promoter's link",
      ],
      [
        "Quota and waiting list",
        "Counted by hand, easy to overbook",
        "Quotas per list or per promoter, waiting list when full",
      ],
      [
        "Proof at the door",
        "A name read out loud, spelling doubts",
        "A named QR code and Apple Wallet pass, scanned in seconds",
      ],
      [
        "Duplicates and lost phones",
        "Someone gets in twice, or a real guest is turned away",
        "Duplicates explained on screen, name search as a backup",
      ],
      ["Entry count", "A clicker or a guess", "Live counter, shared with the manager"],
      [
        "Promoter credit",
        "Recounted the next day, disputed",
        "Each entry credited to the promoter's own link, live",
      ],
      [
        "Your data afterwards",
        "Scattered across chats and sheets",
        "In your customer base, with email consent attested",
      ],
    ],
    footnote:
      "Generic comparison, no third-party product named. Yuno: €0 subscription, 0% commission for the club or organizer; see the pricing page for the fees paid by buyers. Docs updated 29 September 2026.",
  },
  steps: {
    eyebrow: "How it works",
    title: "Running a guest list in three steps",
    items: [
      {
        title: "Open the list for your night",
        body: "Create the night, switch on the guest list, set your quota and, if you want, the cut-off time until which it stays free. Share your event link and give each promoter their own.",
      },
      {
        title: "Guests sign up and get their QR code",
        body: "They fill in the form on their phone and receive a named QR code and an Apple Wallet pass. If the list is full, they join the waiting list.",
      },
      {
        title: "Your door team scans",
        body: "One scanner for tickets, guests and tables, with name search, duplicates explained and a live entry counter. Each entry lands on the right promoter and the guest joins your customer base.",
      },
    ],
  },
  proof: {
    eyebrow: "In real life",
    title: "Tested on a real door",
    sub: "Yuno's first real night in Paris, with a Parisian organizer, ran on the Yuno guest list, online sign-ups and a verified door scan.",
    stats: [
      { value: "30 s", label: "checkout for a guest: no account, no app" },
      { value: "1", label: "scanner for tickets, guests and tables" },
      { value: "€0 · 0%", label: "subscription and commission for the club or organizer" },
      { value: "EN · FR · ES", label: "sign-up pages in three languages" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Guest list software: your questions",
    items: [
      {
        q: "Can I use Yuno for the guest list only?",
        a: "Yes. Each night has one switch per pillar (tickets, tables, drinks), so you can run the guest list alone and add tickets, tables or drinks later. The first real night in Paris ran on the guest list, online sign-ups and a verified door scan.",
      },
      {
        q: "How does the online QR code check-in work?",
        a: "Guests sign up on your page and get a QR code in their name, which they can add to Apple Wallet. Your door team scans it with the Yuno scanner. If a guest cannot show it, the team searches by name.",
      },
      {
        q: "What happens with duplicates or a lost phone?",
        a: "The scanner explains why a code is flagged, for example already used, instead of just refusing it. When a guest has no phone or code, your bouncer finds them by name in the same tool.",
      },
      {
        q: "Can I limit the list and keep it free until a set time?",
        a: "Yes. You set quotas, a waiting list takes over when the list is full, and the guest list can stay free before a cut-off time you choose.",
      },
      {
        q: "Are entries credited to my promoters?",
        a: "Yes. Each promoter has a personal link per night. Sign-ups and entries are counted live, and the commission is computed from real entries.",
      },
      {
        q: "Who keeps the guest data?",
        a: "You do. Every person who signs up joins your own customer base, with email consent attested, ready for your next campaign. You can also import an existing file, deduplicated.",
      },
      {
        q: "How do my staff log in?",
        a: "Each staff member has their own role-specific screen: bouncer, VIP host, bartender, cloakroom or manager. There is no account for guests and no training needed for the door.",
      },
      {
        q: "What does it cost?",
        a: "€0 subscription and 0% commission for the club or organizer. Guests sign up for the guest list for free. The buyer service fee (4%, min €0.99) applies to paid tickets; the full details are on the pricing page.",
      },
    ],
  },
  related: {
    title: "Keep exploring",
    links: [
      { label: "VIP table booking software", href: "/vip-table-booking-software" },
      { label: "Promoter tracking & commission software", href: "/promoter-tracking-software" },
      { label: "Club × organizer revenue split", href: "/club-organizer-revenue-split" },
      { label: "Yuno pricing", href: "/pricing" },
      { label: "All Yuno features (home)", href: "/" },
    ],
  },
};

const fr: TopicPageContent = {
  id: "guest-list",
  lang: "fr",
  path: TWINS.fr,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Logiciel guest list soirée avec QR code et scan | Yuno",
    description:
      "Guest list de boîte de nuit : inscriptions en ligne avec quotas, QR codes nominatifs, un seul scanner à l'entrée, comptage en direct. 0 € d'abonnement.",
    ogAlt: "Yuno — logiciel de guest list et contrôle d'accès pour soirées",
  },
  breadcrumb: { home: "Yuno", current: "Logiciel de guest list" },
  hero: {
    kicker: "Logiciel de guest list pour boîtes de nuit, organisateurs et équipes d'entrée",
    title: "Gérez votre guest list en ligne. Contrôlez l'entrée en quelques secondes.",
    sub: "Vos invités s'inscrivent sur votre page et reçoivent un QR code nominatif. Votre équipe d'entrée le scanne avec le même scanner que les billets et les tables, voit les doublons expliqués et suit le comptage en direct. 0 € d'abonnement, 0 % de commission.",
    primary: "Créer mon compte gratuit",
    secondary: "Parler au fondateur",
    note: ["Commencez par la guest list seule", "Aucune app pour l'invité", "0 € d'abonnement"],
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "Yuno remplace la liste papier, le tableur et le groupe WhatsApp par une guest list en ligne pensée pour les clubs et les organisateurs. Les invités s'inscrivent sur la page de votre soirée ou via le lien d'un promoteur, dans les quotas que vous fixez et, si vous le souhaitez, jusqu'à une heure limite. Chacun reçoit un QR code nominatif (et un pass Apple Wallet) en environ 30 secondes, sans compte et sans app.",
      "À l'entrée, votre équipe scanne ce QR code avec le même scanner que pour les billets et les tables. Elle peut chercher par nom quand quelqu'un a perdu son téléphone, comprendre pourquoi un code est signalé en doublon et suivre le compteur d'entrées en direct. Chaque entrée est créditée au lien du promoteur d'où vient l'invité.",
    ],
    bullets: [
      "0 € d'abonnement et 0 % de commission pour le club ou l'organisateur. L'inscription à la guest list est gratuite pour l'invité ; les frais de service acheteur (4 %, min. 0,99 €) s'appliquent aux billets payants — voir la page tarifs.",
      "Chaque soirée a un interrupteur par pilier (billets, tables, boissons) : vous pouvez lancer la guest list seule, puis ajouter le reste quand vous êtes prêt.",
      "Toute personne inscrite rejoint votre propre base clients, avec le consentement email attesté, pour la réinviter à votre prochaine soirée.",
    ],
  },
  features: {
    eyebrow: "Ce que vous obtenez",
    title: "Tout pour constituer une guest list et contrôler la porte",
    sub: "De la page d'inscription jusqu'à la dernière personne qui passe la porte.",
    items: [
      {
        title: "Inscriptions en ligne avec quotas",
        body: "Ouvrez la liste sur la page de votre soirée et plafonnez-la : au total, ou par promoteur. Quand elle est pleine, une liste d'attente prend le relais : pas de surbooking par accident.",
      },
      {
        title: "Gratuite jusqu'à une heure limite",
        body: "Gardez la guest list gratuite avant l'heure que vous choisissez. La méthode classique pour remplir la salle tôt sans brader toute la soirée.",
      },
      {
        title: "QR codes nominatifs et Apple Wallet",
        body: "Chaque invité reçoit un QR code à son nom, ajouté à Apple Wallet en un geste. Le passage en caisse dure environ 30 secondes, par carte ou Apple Pay quand un billet est concerné, sans compte et sans app pour l'invité.",
      },
      {
        title: "Un seul scanner pour toute l'entrée",
        body: "Billets, invités de la guest list et tables réservées se scannent avec le même outil. Votre videur ne change ni d'app ni de liste selon la personne qu'il a devant lui.",
      },
      {
        title: "Recherche par nom, doublons expliqués",
        body: "Pas de téléphone, pas de code ? Cherchez par nom. Si un code a déjà servi, le scanner indique quand et ce qui s'est passé, au lieu d'un simple écran rouge.",
      },
      {
        title: "Compteur d'entrées en direct et incidents",
        body: "Voyez en temps réel combien de personnes sont entrées, et par quelle liste, et consignez les incidents depuis l'entrée. Votre manager voit la même soirée que votre videur.",
      },
      {
        title: "Entrées créditées au bon promoteur",
        body: "Chaque promoteur a un lien personnel par soirée. Inscriptions et entrées réelles sont comptées en direct et alimentent la commission, sans recomptage le lendemain matin.",
      },
      {
        title: "Un écran par rôle",
        body: "Chaque membre de l'équipe a son propre écran adapté à son rôle : videur, responsable VIP, barman, vestiaire, manager. L'équipe organisateur dispose aussi des rôles admin, éditeur et scanner.",
      },
    ],
  },
  table: {
    eyebrow: "Papier ou appli",
    title: "Liste papier, tableur ou groupe WhatsApp vs application de guest list",
    sub: "Une comparaison générale de la façon dont beaucoup d'entrées gèrent encore leur guest list, et de ce qui change avec Yuno.",
    head: ["Critère", "Papier ou tableur", "Yuno"],
    rows: [
      [
        "Inscriptions",
        "Noms envoyés par message ou email, retapés à la main",
        "L'invité s'inscrit seul sur votre page ou via le lien d'un promoteur",
      ],
      [
        "Quota et liste d'attente",
        "Comptés à la main, surbooking facile",
        "Quotas par liste ou par promoteur, liste d'attente quand c'est plein",
      ],
      [
        "Preuve à l'entrée",
        "Un nom lancé à voix haute, des doutes sur l'orthographe",
        "Un QR code nominatif et un pass Apple Wallet, scannés en quelques secondes",
      ],
      [
        "Doublons et téléphone perdu",
        "Quelqu'un entre deux fois, ou un vrai invité est refusé",
        "Doublons expliqués à l'écran, recherche par nom en secours",
      ],
      [
        "Comptage des entrées",
        "Un compteur à main ou une estimation",
        "Compteur en direct, partagé avec le manager",
      ],
      [
        "Crédit des promoteurs",
        "Recompté le lendemain, contesté",
        "Chaque entrée créditée au lien du promoteur, en direct",
      ],
      [
        "Vos données ensuite",
        "Éparpillées entre conversations et fichiers",
        "Dans votre base clients, consentement email attesté",
      ],
    ],
    footnote:
      "Comparaison générale, aucun produit tiers cité. Yuno : 0 € d'abonnement, 0 % de commission pour le club ou l'organisateur ; voir la page tarifs pour les frais payés par l'acheteur. Informations mises à jour le 29 septembre 2026.",
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Gérer une guest list en trois étapes",
    items: [
      {
        title: "Ouvrez la liste pour votre soirée",
        body: "Créez la soirée, activez la guest list, fixez votre quota et, si vous le souhaitez, l'heure limite jusqu'à laquelle elle reste gratuite. Partagez le lien de la soirée et donnez à chaque promoteur le sien.",
      },
      {
        title: "Les invités s'inscrivent et reçoivent leur QR code",
        body: "Ils remplissent le formulaire sur leur téléphone et reçoivent un QR code nominatif et un pass Apple Wallet. Si la liste est pleine, ils rejoignent la liste d'attente.",
      },
      {
        title: "Votre équipe d'entrée scanne",
        body: "Un seul scanner pour billets, invités et tables, avec recherche par nom, doublons expliqués et compteur d'entrées en direct. Chaque entrée arrive chez le bon promoteur et l'invité rejoint votre base clients.",
      },
    ],
  },
  proof: {
    eyebrow: "Dans la vraie vie",
    title: "Testé à une vraie porte",
    sub: "La première vraie soirée de Yuno à Paris, avec un organisateur parisien, a tourné avec la guest list Yuno, des inscriptions en ligne et un scan à l'entrée vérifié.",
    stats: [
      { value: "30 s", label: "de passage en caisse pour un invité : sans compte, sans app" },
      { value: "1", label: "scanner pour billets, invités et tables" },
      { value: "0 € · 0 %", label: "d'abonnement et de commission pour le club ou l'organisateur" },
      { value: "FR · EN · ES", label: "pages d'inscription en trois langues" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Logiciel de guest list : vos questions",
    items: [
      {
        q: "Puis-je utiliser Yuno uniquement pour la guest list ?",
        a: "Oui. Chaque soirée a un interrupteur par pilier (billets, tables, boissons) : vous pouvez lancer la guest list seule et ajouter billets, tables ou boissons plus tard. La première vraie soirée à Paris a tourné avec la guest list, des inscriptions en ligne et un scan à l'entrée vérifié.",
      },
      {
        q: "Comment fonctionne le contrôle d'accès par QR code ?",
        a: "L'invité s'inscrit sur votre page et reçoit un QR code à son nom, qu'il peut ajouter à Apple Wallet. Votre équipe d'entrée le scanne avec le scanner Yuno. Si l'invité ne peut pas le montrer, l'équipe le retrouve par son nom.",
      },
      {
        q: "Que se passe-t-il avec un doublon ou un téléphone perdu ?",
        a: "Le scanner explique pourquoi un code est signalé, par exemple déjà utilisé, au lieu de simplement le refuser. Quand un invité n'a ni téléphone ni code, votre videur le retrouve par son nom dans le même outil.",
      },
      {
        q: "Puis-je limiter la liste et la garder gratuite jusqu'à une heure donnée ?",
        a: "Oui. Vous fixez des quotas, une liste d'attente prend le relais quand la liste est pleine, et la guest list peut rester gratuite avant l'heure limite que vous choisissez.",
      },
      {
        q: "Les entrées sont-elles créditées à mes promoteurs ?",
        a: "Oui. Chaque promoteur a un lien personnel par soirée. Les inscriptions et les entrées sont comptées en direct, et la commission est calculée sur les entrées réelles.",
      },
      {
        q: "À qui appartiennent les données des invités ?",
        a: "À vous. Toute personne qui s'inscrit rejoint votre propre base clients, avec le consentement email attesté, prête pour votre prochaine campagne. Vous pouvez aussi importer un fichier existant, dédoublonné.",
      },
      {
        q: "Comment mon équipe se connecte-t-elle ?",
        a: "Chaque membre de l'équipe a son propre écran adapté à son rôle : videur, responsable VIP, barman, vestiaire ou manager. L'invité n'a pas de compte à créer et l'équipe d'entrée n'a pas besoin de formation.",
      },
      {
        q: "Combien ça coûte ?",
        a: "0 € d'abonnement et 0 % de commission pour le club ou l'organisateur. L'inscription à la guest list est gratuite pour l'invité. Les frais de service acheteur (4 %, min. 0,99 €) s'appliquent aux billets payants ; tous les détails sont sur la page tarifs.",
      },
    ],
  },
  related: {
    title: "Pour aller plus loin",
    links: [
      {
        label: "Logiciel de réservation de tables VIP",
        href: "/fr/reservation-table-vip-discotheque",
      },
      {
        label: "Logiciel de suivi et commissions des promoteurs",
        href: "/fr/logiciel-promoteurs-soiree",
      },
      {
        label: "Contrat et répartition club × organisateur",
        href: "/fr/contrat-club-organisateur",
      },
      { label: "Tarifs Yuno", href: "/fr/pricing" },
      { label: "Toutes les fonctions de Yuno (accueil)", href: "/fr" },
    ],
  },
};

const es: TopicPageContent = {
  id: "guest-list",
  lang: "es",
  path: TWINS.es,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Software de lista de invitados para discotecas con QR | Yuno",
    description:
      "Listas de discoteca online: inscripciones con cupos, QR nominativo, un solo escáner en la puerta, aforo en directo y entradas por RRPP. 0 € de cuota",
    ogAlt: "Yuno — software de lista de invitados y control de acceso para discotecas",
  },
  breadcrumb: { home: "Yuno", current: "Software de lista de invitados" },
  hero: {
    kicker: "Software de lista de invitados para discotecas, organizadores y equipos de puerta",
    title: "Gestiona tu lista de invitados online. Controla la puerta en segundos.",
    sub: "Tus invitados se apuntan en tu página y reciben un QR con su nombre. Tu equipo de puerta lo escanea con el mismo escáner que las entradas y las mesas, ve los duplicados explicados y sigue el aforo en directo. 0 € de cuota, 0 % de comisión.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    note: ["Empieza solo con la lista", "Sin app para el invitado", "0 € de cuota"],
  },
  answer: {
    title: "En breve",
    paragraphs: [
      "Yuno sustituye la lista en papel, la hoja de cálculo y el grupo de WhatsApp por una lista de invitados online pensada para discotecas y organizadores. Los invitados se apuntan en la página de tu evento o con el enlace de un RRPP, dentro de los cupos que tú fijes y, si quieres, solo hasta una hora límite. Cada uno recibe un QR nominativo (y un pase de Apple Wallet) en unos 30 segundos, sin cuenta y sin app.",
      "En la puerta, tu equipo escanea ese QR con el mismo escáner que usa para las entradas y las mesas. Puede buscar por nombre cuando alguien ha perdido el móvil, entender por qué un código aparece como duplicado y seguir el contador de entradas en directo. Cada entrada se atribuye al enlace del RRPP del que viene el invitado.",
    ],
    bullets: [
      "0 € de cuota y 0 % de comisión para la discoteca o el organizador. Apuntarse a la lista de invitados es gratis para el invitado; los gastos de servicio al comprador (4 %, mín. 0,99 €) se aplican a las entradas de pago — consulta la página de precios.",
      "Cada noche tiene un interruptor por pilar (entradas, mesas, copas): puedes empezar solo con la lista de invitados y añadir el resto cuando quieras.",
      "Todas las personas que se apuntan pasan a tu propia base de clientes, con el consentimiento por email acreditado, para invitarlas de nuevo a tu próxima noche.",
    ],
  },
  features: {
    eyebrow: "Qué incluye",
    title: "Todo para montar una lista de invitados y controlar la puerta",
    sub: "Desde la página de inscripción hasta la última persona que cruza la puerta.",
    items: [
      {
        title: "Inscripciones online con cupos",
        body: "Abre la lista en la página de tu evento y ponle tope: en total o por RRPP. Cuando se llena, entra una lista de espera y no hay overbooking por descuido.",
      },
      {
        title: "Gratis hasta una hora límite",
        body: "Mantén la lista de invitados gratuita antes de la hora que elijas. La forma clásica de llenar la sala pronto sin regalar toda la noche.",
      },
      {
        title: "QR nominativos y Apple Wallet",
        body: "Cada invitado recibe un QR a su nombre, que añade a Apple Wallet con un toque. El pago dura unos 30 segundos, con tarjeta o Apple Pay cuando hay una entrada de por medio, sin cuenta y sin app para el invitado.",
      },
      {
        title: "Un solo escáner para toda la puerta",
        body: "Entradas, invitados de la lista y mesas reservadas se escanean con la misma herramienta. Tu portero no cambia de app ni de lista según quién tenga delante.",
      },
      {
        title: "Búsqueda por nombre, duplicados explicados",
        body: "¿Sin móvil y sin código? Busca por nombre. Si un código ya se ha usado, el escáner indica cuándo y qué pasó, en lugar de una simple pantalla roja.",
      },
      {
        title: "Contador de entradas en directo e incidencias",
        body: "Mira en tiempo real cuánta gente ha entrado y por qué lista, y registra incidencias desde la puerta. Tu manager ve la misma noche que tu portero.",
      },
      {
        title: "Entradas atribuidas al RRPP correcto",
        body: "Cada RRPP tiene un enlace personal por noche. Las inscripciones y las entradas reales se cuentan en directo y alimentan la comisión, sin recuentos a la mañana siguiente.",
      },
      {
        title: "Una pantalla para cada rol",
        body: "Cada miembro del equipo tiene su propia pantalla según su rol: portero, responsable VIP, camarero, guardarropa, manager. El equipo del organizador también cuenta con los roles admin, editor y escáner.",
      },
    ],
  },
  table: {
    eyebrow: "Papel o app",
    title: "Lista en papel, hoja de cálculo o grupo de WhatsApp vs app de lista de invitados",
    sub: "Una comparación general de cómo muchas puertas siguen gestionando su lista, y de lo que cambia con Yuno.",
    head: ["Criterio", "Papel u hoja de cálculo", "Yuno"],
    rows: [
      [
        "Inscripciones",
        "Nombres enviados por mensaje o email y copiados a mano",
        "El invitado se apunta solo en tu página o con el enlace de un RRPP",
      ],
      [
        "Cupo y lista de espera",
        "Contados a mano, overbooking fácil",
        "Cupos por lista o por RRPP, lista de espera cuando se llena",
      ],
      [
        "Prueba en la puerta",
        "Un nombre dicho en voz alta, dudas con la ortografía",
        "Un QR nominativo y un pase de Apple Wallet, escaneados en segundos",
      ],
      [
        "Duplicados y móvil perdido",
        "Alguien entra dos veces, o un invitado de verdad se queda fuera",
        "Duplicados explicados en pantalla, búsqueda por nombre como respaldo",
      ],
      [
        "Recuento de entradas",
        "Un contador de mano o a ojo",
        "Contador en directo, compartido con el manager",
      ],
      [
        "Atribución a los RRPP",
        "Recontada al día siguiente, discutida",
        "Cada entrada atribuida al enlace del RRPP, en directo",
      ],
      [
        "Tus datos después",
        "Repartidos entre chats y hojas",
        "En tu base de clientes, con consentimiento por email acreditado",
      ],
    ],
    footnote:
      "Comparación general, sin citar ningún producto de terceros. Yuno: 0 € de cuota y 0 % de comisión para la discoteca o el organizador; consulta la página de precios para los gastos que paga el comprador. Información actualizada el 29 de septiembre de 2026.",
  },
  steps: {
    eyebrow: "Cómo funciona",
    title: "Gestionar una lista de invitados en tres pasos",
    items: [
      {
        title: "Abre la lista para tu noche",
        body: "Crea la noche, activa la lista de invitados, fija tu cupo y, si quieres, la hora límite hasta la que sigue siendo gratis. Comparte el enlace del evento y da a cada RRPP el suyo.",
      },
      {
        title: "Los invitados se apuntan y reciben su QR",
        body: "Rellenan el formulario en el móvil y reciben un QR nominativo y un pase de Apple Wallet. Si la lista está llena, pasan a la lista de espera.",
      },
      {
        title: "Tu equipo de puerta escanea",
        body: "Un solo escáner para entradas, invitados y mesas, con búsqueda por nombre, duplicados explicados y contador de entradas en directo. Cada entrada llega al RRPP correcto y el invitado pasa a tu base de clientes.",
      },
    ],
  },
  proof: {
    eyebrow: "En la vida real",
    title: "Probado en una puerta de verdad",
    sub: "La primera noche real de Yuno en París, con un organizador parisino, funcionó con la lista de invitados de Yuno, inscripciones online y un escaneo en puerta verificado.",
    stats: [
      { value: "30 s", label: "de pago para un invitado: sin cuenta, sin app" },
      { value: "1", label: "escáner para entradas, invitados y mesas" },
      { value: "0 € · 0 %", label: "de cuota y de comisión para la discoteca o el organizador" },
      { value: "ES · EN · FR", label: "páginas de inscripción en tres idiomas" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Software de lista de invitados: tus preguntas",
    items: [
      {
        q: "¿Puedo usar Yuno solo para la lista de invitados?",
        a: "Sí. Cada noche tiene un interruptor por pilar (entradas, mesas, copas): puedes empezar solo con la lista de invitados y añadir entradas, mesas o copas más adelante. La primera noche real en París funcionó con la lista, inscripciones online y un escaneo en puerta verificado.",
      },
      {
        q: "¿Cómo funciona el control de acceso con QR?",
        a: "El invitado se apunta en tu página y recibe un QR a su nombre, que puede añadir a Apple Wallet. Tu equipo de puerta lo escanea con el escáner de Yuno. Si el invitado no puede enseñarlo, el equipo lo busca por nombre.",
      },
      {
        q: "¿Qué pasa con un duplicado o un móvil perdido?",
        a: "El escáner explica por qué un código aparece marcado, por ejemplo ya usado, en lugar de rechazarlo sin más. Cuando un invitado no tiene móvil ni código, tu portero lo encuentra por nombre en la misma herramienta.",
      },
      {
        q: "¿Puedo limitar la lista y mantenerla gratis hasta una hora concreta?",
        a: "Sí. Fijas cupos, una lista de espera entra cuando la lista se llena y la lista de invitados puede seguir siendo gratuita antes de la hora límite que elijas.",
      },
      {
        q: "¿Se atribuyen las entradas a mis RRPP?",
        a: "Sí. Cada RRPP tiene un enlace personal por noche. Las inscripciones y las entradas se cuentan en directo y la comisión se calcula sobre las entradas reales.",
      },
      {
        q: "¿Quién se queda con los datos de los invitados?",
        a: "Tú. Todas las personas que se apuntan pasan a tu propia base de clientes, con el consentimiento por email acreditado, listas para tu próxima campaña. También puedes importar un archivo existente, sin duplicados.",
      },
      {
        q: "¿Cómo accede mi equipo?",
        a: "Cada miembro del equipo tiene su propia pantalla según su rol: portero, responsable VIP, camarero, guardarropa o manager. El invitado no crea ninguna cuenta y el equipo de puerta no necesita formación.",
      },
      {
        q: "¿Cuánto cuesta?",
        a: "0 € de cuota y 0 % de comisión para la discoteca o el organizador. Apuntarse a la lista de invitados es gratis para el invitado. Los gastos de servicio al comprador (4 %, mín. 0,99 €) se aplican a las entradas de pago; todos los detalles están en la página de precios.",
      },
    ],
  },
  related: {
    title: "Sigue explorando",
    links: [
      { label: "Software de reservados y mesas VIP", href: "/es/software-reservados-discoteca" },
      {
        label: "Software para RRPP: seguimiento y comisiones",
        href: "/es/software-rrpp-discoteca",
      },
      {
        label: "Reparto de ingresos discoteca × organizador",
        href: "/es/reparto-ingresos-discoteca-organizador",
      },
      { label: "Precios de Yuno", href: "/es/precios" },
      { label: "Todas las funciones de Yuno (inicio)", href: "/es" },
    ],
  },
};

export const guestList = [en, fr, es];
