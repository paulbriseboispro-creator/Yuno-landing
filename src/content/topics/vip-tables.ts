// VIP tables / bottle service. Targets: "réservation table VIP discothèque",
// "carré VIP", "logiciel réservation table discothèque" (FR), "VIP table booking
// software", "bottle service software" (EN), "software reservados discoteca",
// "reservados discoteca online" (ES). Facts: docs/yuno-context.md.
import type { TopicPageContent } from "../topic-types";

const UPDATED = "2026-09-29";
const TWINS = {
  en: "/vip-table-booking-software",
  fr: "/fr/reservation-table-vip-discotheque",
  es: "/es/software-reservados-discoteca",
};

const en: TopicPageContent = {
  id: "vip-tables",
  lang: "en",
  path: TWINS.en,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "VIP table booking software for nightclubs, with deposits | Yuno",
    description:
      "Sell VIP tables and bottle service online: interactive floor plan, deposits, minimum spend tracked live, money to your account. €0 subscription.",
    ogAlt: "Yuno — VIP table booking software for nightclubs",
  },
  breadcrumb: { home: "Yuno", current: "VIP table booking" },
  hero: {
    kicker: "VIP table booking & bottle service software for nightclubs",
    title: "Sell your VIP tables online. Get paid before the night starts.",
    sub: "An interactive floor plan, packages, deposits and bottle pre-orders — then a live floor plan for your VIP host on the night. Money lands on your own account, with €0 subscription and 0% commission.",
    primary: "Create my free account",
    secondary: "Talk to the founder",
    note: ["No subscription", "0% commission on your price", "No app to install"],
  },
  answer: {
    title: "In short",
    paragraphs: [
      "Yuno is nightclub software that lets guests book and pay for a VIP table from their phone. You draw your floor plan, set zones, packages and minimum spend, and take a deposit (or full payment) online — or let guests pay on site.",
      "On the night, your VIP host sees the same floor plan live: which tables are seated, walk-ins, bottles ordered from the table and how far each table is from its minimum spend.",
    ],
    bullets: [
      "€0 subscription, 0% commission for the club or organizer. The buyer pays a 4% service fee on tables (min €0.99, capped at €25).",
      "Card processing (Stripe, 1.5% + €0.25) is paid by the club; the money goes straight to your Stripe account — Yuno never holds your funds.",
      "Tables are one of three pillars (tickets, tables, drinks): switch each on or off per night.",
    ],
  },
  features: {
    eyebrow: "What you get",
    title: "Everything to sell and run a VIP table",
    sub: "From the booking page to the last bottle of the night.",
    items: [
      {
        title: "Interactive VIP floor plan",
        body: "Draw your room once: tables, booths, zones. Guests pick their table on a live plan and see what is still available, at their price.",
      },
      {
        title: "Packages & minimum spend",
        body: "Sell each table with its package (bottles included) or a minimum spend, per zone and per night. Change prices for a big night without touching anything else.",
      },
      {
        title: "Table deposit or full payment",
        body: "Take a deposit online to lock the booking, or the full amount. Guests can also pay on site. Fewer no-shows, cash in before the doors open.",
      },
      {
        title: "Bottle pre-orders",
        body: "Guests add bottles when they book. The order is waiting at the table, and your bar knows what to prepare.",
      },
      {
        title: "Live VIP host screen",
        body: "A living floor plan on the host's phone: seat walk-ins, track each table's minimum spend, take orders from the table and see who to nudge with one more bottle.",
      },
      {
        title: "Same account as your tickets and bar",
        body: "Tables sit next to tickets, guest list and drinks: one customer base, one dashboard, one payout — no second tool for VIP.",
      },
    ],
  },
  table: {
    eyebrow: "What it costs",
    title: "What table-booking software costs (public prices, September 2026)",
    sub: "We only list what each provider publishes. “On quote” means no public price.",
    head: ["Provider", "Yuno", "ResaFlow", "Fourvenues"],
    rows: [
      [
        "Subscription",
        "€0",
        "From €49.99 per night or €350–500 per month",
        "On quote after a demo",
      ],
      [
        "Commission on tables",
        "0% for the club. Buyer pays 4% (min €0.99, max €25)",
        "Not published",
        "Not published",
      ],
      [
        "Tickets, bar and promoters in the same tool",
        "Yes — tickets, tables, drinks, door, promoter commissions",
        "Tables only",
        "Yes (full club suite)",
      ],
      ["Public price list", "Yes", "Yes", "No"],
    ],
    footnote:
      "Sources: each provider's public website, read in September 2026 (resaflow.com, fourvenues.com). Prices change: check the provider's site before deciding. Yuno: yunoapp.eu, docs updated 29 September 2026.",
  },
  steps: {
    eyebrow: "How it works",
    title: "Selling VIP tables in three steps",
    items: [
      {
        title: "Draw your floor plan",
        body: "Add your tables and zones, set the package or minimum spend and the deposit for each. Two minutes for a first night, then it is reusable.",
      },
      {
        title: "Guests book and pay",
        body: "They choose a table on your event page or your link, pay the deposit by card or Apple Pay, and get a confirmation with their table.",
      },
      {
        title: "Your host runs the night",
        body: "Seat guests from the live plan, add walk-ins, take orders from the table and see each minimum spend fill up. The money is already on your account.",
      },
    ],
  },
  proof: {
    eyebrow: "In real life",
    title: "Built with clubs in Madrid and Paris",
    stats: [
      { value: "22", label: "partner clubs listed in Madrid, launched with Amoris" },
      { value: "€0 · 0%", label: "subscription and commission for the club or organizer" },
      { value: "4%", label: "buyer service fee on tables, min €0.99, max €25" },
      { value: "EN · FR · ES", label: "booking pages in three languages" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "VIP table booking: your questions",
    items: [
      {
        q: "How do I take deposits on VIP tables?",
        a: "You set a deposit per table or package. Guests pay it online by card or Apple Pay when they book, and the balance is settled on the night (or they pay everything upfront). The money goes to your own Stripe account.",
      },
      {
        q: "Does Yuno take a commission on my VIP tables?",
        a: "No. Yuno charges the club or organizer €0 subscription and 0% commission. The buyer pays a 4% service fee on tables, with a €0.99 minimum and a €25 cap. Card processing by Stripe (1.5% + €0.25) is paid by the club.",
      },
      {
        q: "Can guests pre-order bottles with their table?",
        a: "Yes. Bottles can be added when the table is booked; the order is ready for the table and visible to your bar. During the night, your VIP host can also add orders from the table.",
      },
      {
        q: "Can I sell tables for one night only, or use it alongside my current ticketing?",
        a: "Yes. Each night has one switch per pillar (tickets, tables, drinks), so you can start with tables only, or with the guest list, and add the rest later.",
      },
      {
        q: "What does my VIP host see on the night?",
        a: "A live floor plan: seated and open tables, walk-ins, each table's spend against its minimum, and orders taken from the table.",
      },
      {
        q: "Who is Yuno for?",
        a: "Clubs, event organizers and collectives, promoters and agencies in France and Spain. Yuno is available in English, French and Spanish.",
      },
    ],
  },
  related: {
    title: "Keep exploring",
    links: [
      { label: "Promoter tracking & commission software", href: "/promoter-tracking-software" },
      { label: "Club × organizer revenue split", href: "/club-organizer-revenue-split" },
      { label: "Nightclub guest list software", href: "/nightclub-guest-list-software" },
      { label: "Yuno pricing", href: "/pricing" },
      { label: "All Yuno features (home)", href: "/" },
    ],
  },
  sources: {
    title: "Sources",
    items: [
      { label: "ResaFlow — table management for clubs", url: "https://resaflow.com/" },
      {
        label: "Fourvenues — VIP booking software",
        url: "https://www.fourvenues.com/en/vip-booking-software",
      },
    ],
    disclaimer:
      "Third-party names belong to their owners. Information is taken from public pages and may have changed since.",
  },
};

const fr: TopicPageContent = {
  id: "vip-tables",
  lang: "fr",
  path: TWINS.fr,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Logiciel réservation table VIP discothèque, avec acompte | Yuno",
    description:
      "Vendez vos carrés VIP et le bottle service en ligne : plan de salle, acompte, minimum de consommation suivi en direct, argent sur votre compte.",
    ogAlt: "Yuno — logiciel de réservation de tables VIP pour discothèques",
  },
  breadcrumb: { home: "Yuno", current: "Réservation de tables VIP" },
  hero: {
    kicker: "Logiciel de réservation de tables VIP et bottle service pour discothèques",
    title: "Vendez vos carrés VIP en ligne. Encaissez avant que la soirée commence.",
    sub: "Un plan de salle interactif, des formules, un acompte et la précommande de bouteilles — puis un plan vivant pour votre responsable VIP le soir même. L'argent arrive sur votre compte, avec 0 € d'abonnement et 0 % de commission.",
    primary: "Créer mon compte gratuit",
    secondary: "Parler au fondateur",
    note: ["Sans abonnement", "0 % de commission sur votre prix", "Aucune app à installer"],
  },
  answer: {
    title: "En bref",
    paragraphs: [
      "Yuno est un logiciel pour boîtes de nuit qui permet à vos clients de réserver et payer un carré VIP depuis leur téléphone. Vous dessinez votre plan de salle, fixez zones, formules et minimum de consommation, puis encaissez un acompte (ou la totalité) en ligne — ou laissez payer sur place.",
      "Le soir même, votre responsable VIP voit le même plan en direct : tables installées, walk-ins, bouteilles commandées depuis la table et où en est chaque table par rapport à son minimum.",
    ],
    bullets: [
      "0 € d'abonnement, 0 % de commission pour le club ou l'organisateur. L'acheteur paie 4 % de frais de service sur les tables (min. 0,99 €, plafonnés à 25 €).",
      "Les frais de carte (Stripe, 1,5 % + 0,25 €) sont à la charge du club ; l'argent va directement sur votre compte Stripe — Yuno ne détient jamais vos fonds.",
      "Les tables sont l'un des trois piliers (billets, tables, boissons) : activez-les soirée par soirée.",
    ],
  },
  features: {
    eyebrow: "Ce que vous obtenez",
    title: "Tout pour vendre et gérer un carré VIP",
    sub: "De la page de réservation à la dernière bouteille de la nuit.",
    items: [
      {
        title: "Plan de salle VIP interactif",
        body: "Dessinez votre salle une fois : tables, banquettes, zones. Le client choisit son carré sur un plan en direct et voit ce qui reste, à son prix.",
      },
      {
        title: "Formules & minimum de consommation",
        body: "Vendez chaque table avec sa formule (bouteilles incluses) ou un minimum de consommation, par zone et par soirée. Changez les prix d'une grosse nuit sans rien casser d'autre.",
      },
      {
        title: "Acompte ou paiement complet",
        body: "Prenez un acompte en ligne pour verrouiller la réservation, ou la totalité. Le client peut aussi payer sur place. Moins de no-shows, de la trésorerie avant l'ouverture.",
      },
      {
        title: "Précommande de bouteilles",
        body: "Le client ajoute ses bouteilles à la réservation. La commande attend à la table et votre bar sait quoi préparer.",
      },
      {
        title: "Écran responsable VIP en direct",
        body: "Un plan vivant sur le téléphone du responsable : installer les walk-ins, suivre le minimum de chaque table, prendre les commandes depuis la table et savoir qui relancer avec une bouteille de plus.",
      },
      {
        title: "Le même compte que billets et bar",
        body: "Les tables sont à côté de la billetterie, de la guest list et des boissons : une base clients, un tableau de bord, un seul virement — pas d'outil de plus pour le VIP.",
      },
    ],
  },
  table: {
    eyebrow: "Ce que ça coûte",
    title: "Combien coûte un logiciel de réservation de tables (prix publics, septembre 2026)",
    sub: "Nous ne citons que ce que chaque éditeur publie. « Sur devis » = pas de prix public.",
    head: ["Éditeur", "Yuno", "ResaFlow", "Fourvenues"],
    rows: [
      [
        "Abonnement",
        "0 €",
        "À partir de 49,99 € par soirée ou 350 à 500 € par mois",
        "Sur devis après démo",
      ],
      [
        "Commission sur les tables",
        "0 % pour le club. L'acheteur paie 4 % (min. 0,99 €, max. 25 €)",
        "Non publiée",
        "Non publiée",
      ],
      [
        "Billets, bar et promoteurs dans le même outil",
        "Oui — billets, tables, boissons, entrée, commissions promoteurs",
        "Tables uniquement",
        "Oui (suite complète pour clubs)",
      ],
      ["Grille de prix publique", "Oui", "Oui", "Non"],
    ],
    footnote:
      "Sources : sites publics de chaque éditeur, relevés en septembre 2026 (resaflow.com, fourvenues.com). Les prix évoluent : vérifiez sur le site de l'éditeur avant de décider. Yuno : yunoapp.eu, informations mises à jour le 29 septembre 2026.",
  },
  steps: {
    eyebrow: "Comment ça marche",
    title: "Vendre des carrés VIP en trois étapes",
    items: [
      {
        title: "Dessinez votre plan de salle",
        body: "Ajoutez vos tables et zones, fixez la formule ou le minimum et l'acompte de chacune. Deux minutes pour une première soirée, puis c'est réutilisable.",
      },
      {
        title: "Les clients réservent et paient",
        body: "Ils choisissent une table sur la page de votre soirée ou votre lien, paient l'acompte par carte ou Apple Pay et reçoivent une confirmation avec leur table.",
      },
      {
        title: "Votre responsable VIP pilote la nuit",
        body: "Installez les clients depuis le plan vivant, ajoutez les walk-ins, prenez les commandes de la table et regardez chaque minimum se remplir. L'argent est déjà sur votre compte.",
      },
    ],
  },
  proof: {
    eyebrow: "Dans la vraie vie",
    title: "Construit avec des clubs à Madrid et à Paris",
    stats: [
      { value: "22", label: "clubs partenaires référencés à Madrid, lancement avec Amoris" },
      { value: "0 € · 0 %", label: "d'abonnement et de commission pour le club ou l'organisateur" },
      {
        value: "4 %",
        label: "de frais de service acheteur sur les tables, min. 0,99 €, max. 25 €",
      },
      { value: "FR · EN · ES", label: "pages de réservation en trois langues" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Réservation de tables VIP : vos questions",
    items: [
      {
        q: "Comment prendre un acompte sur un carré VIP ?",
        a: "Vous fixez un acompte par table ou par formule. Le client le règle en ligne par carte ou Apple Pay au moment de réserver, puis solde le reste sur place (ou paie tout d'avance). L'argent va sur votre propre compte Stripe.",
      },
      {
        q: "Yuno prend-il une commission sur mes tables VIP ?",
        a: "Non. Yuno facture 0 € d'abonnement et 0 % de commission au club ou à l'organisateur. L'acheteur paie 4 % de frais de service sur les tables, avec un minimum de 0,99 € et un plafond de 25 €. Les frais de carte de Stripe (1,5 % + 0,25 €) sont à la charge du club.",
      },
      {
        q: "Le client peut-il précommander des bouteilles avec sa table ?",
        a: "Oui. Les bouteilles s'ajoutent à la réservation ; la commande est prête pour la table et visible par votre bar. Pendant la nuit, votre responsable VIP peut aussi ajouter des commandes depuis la table.",
      },
      {
        q: "Puis-je vendre des tables pour une seule soirée, ou l'utiliser avec ma billetterie actuelle ?",
        a: "Oui. Chaque soirée a un interrupteur par pilier (billets, tables, boissons) : vous pouvez commencer par les tables seules, ou par la guest list, et ajouter le reste plus tard.",
      },
      {
        q: "Que voit mon responsable VIP pendant la soirée ?",
        a: "Un plan de salle en direct : tables installées et libres, walk-ins, dépense de chaque table par rapport à son minimum et commandes prises depuis la table.",
      },
      {
        q: "Pour qui est fait Yuno ?",
        a: "Pour les clubs, les organisateurs et collectifs, les promoteurs et les agences en France et en Espagne. Yuno existe en français, en anglais et en espagnol.",
      },
    ],
  },
  related: {
    title: "Pour aller plus loin",
    links: [
      {
        label: "Logiciel de suivi et commissions des promoteurs",
        href: "/fr/logiciel-promoteurs-soiree",
      },
      {
        label: "Contrat et répartition club × organisateur",
        href: "/fr/contrat-club-organisateur",
      },
      { label: "Logiciel de guest list pour soirées", href: "/fr/guest-list-soiree-logiciel" },
      { label: "Tarifs Yuno", href: "/fr/pricing" },
      { label: "Toutes les fonctions de Yuno (accueil)", href: "/fr" },
    ],
  },
  sources: {
    title: "Sources",
    items: [
      { label: "ResaFlow — gestion de tables pour clubs", url: "https://resaflow.com/" },
      {
        label: "Fourvenues — logiciel de réservation VIP",
        url: "https://www.fourvenues.com/en/vip-booking-software",
      },
    ],
    disclaimer:
      "Les noms tiers appartiennent à leurs propriétaires. Les informations proviennent de pages publiques et ont pu changer depuis.",
  },
};

const es: TopicPageContent = {
  id: "vip-tables",
  lang: "es",
  path: TWINS.es,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Software de reservados para discotecas, con señal | Yuno",
    description:
      "Vende reservados y mesas VIP online: plano interactivo, señal, consumo mínimo en directo y el dinero en tu cuenta. 0 € de cuota, 0 % de comisión.",
    ogAlt: "Yuno — software de reservados y mesas VIP para discotecas",
  },
  breadcrumb: { home: "Yuno", current: "Reservados y mesas VIP" },
  hero: {
    kicker: "Software de reservados y mesas VIP para discotecas",
    title: "Vende tus reservados online. Cobra antes de que empiece la noche.",
    sub: "Un plano interactivo, packs, señal y botellas reservadas de antemano — y un plano en directo para tu responsable VIP durante la noche. El dinero llega a tu cuenta, sin cuota y sin comisión.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    note: ["Sin cuota mensual", "0 % de comisión sobre tu precio", "Sin app que instalar"],
  },
  answer: {
    title: "En breve",
    paragraphs: [
      "Yuno es un software para discotecas con el que tus clientes reservan y pagan un reservado desde el móvil. Dibujas tu plano, defines zonas, packs y consumo mínimo, y cobras una señal (o el total) online — o dejas pagar en el local.",
      "Durante la noche, tu responsable VIP ve el mismo plano en directo: mesas sentadas, clientes sin reserva, botellas pedidas desde la mesa y cuánto le falta a cada mesa para su consumo mínimo.",
    ],
    bullets: [
      "0 € de cuota y 0 % de comisión para la discoteca o el organizador. El comprador paga un 4 % de gastos de servicio en las mesas (mín. 0,99 €, tope de 25 €).",
      "Los gastos de tarjeta (Stripe, 1,5 % + 0,25 €) los paga la discoteca; el dinero va directo a tu cuenta de Stripe — Yuno nunca retiene tus fondos.",
      "Las mesas son uno de los tres pilares (entradas, mesas, copas): actívalos noche a noche.",
    ],
  },
  features: {
    eyebrow: "Qué incluye",
    title: "Todo para vender y gestionar un reservado VIP",
    sub: "Desde la página de reserva hasta la última botella de la noche.",
    items: [
      {
        title: "Plano VIP interactivo",
        body: "Dibuja tu sala una vez: mesas, sofás, zonas. El cliente elige su reservado en un plano en directo y ve lo que queda libre, a su precio.",
      },
      {
        title: "Packs y consumo mínimo",
        body: "Vende cada mesa con su pack (botellas incluidas) o con un consumo mínimo, por zona y por noche. Cambia los precios de una noche grande sin tocar nada más.",
      },
      {
        title: "Señal o pago completo",
        body: "Cobra una señal online para asegurar la reserva, o el importe completo. El cliente también puede pagar en el local. Menos no-shows y liquidez antes de abrir puertas.",
      },
      {
        title: "Botellas reservadas de antemano",
        body: "El cliente añade botellas al reservar. El pedido espera en la mesa y tu barra sabe qué preparar.",
      },
      {
        title: "Pantalla del responsable VIP en directo",
        body: "Un plano vivo en el móvil del responsable: sentar a los clientes sin reserva, seguir el mínimo de cada mesa, tomar pedidos desde la mesa y saber a quién ofrecer una botella más.",
      },
      {
        title: "La misma cuenta que entradas y barra",
        body: "Las mesas conviven con la venta de entradas, las listas y las copas: una base de clientes, un panel, un solo pago — sin otra herramienta para el VIP.",
      },
    ],
  },
  table: {
    eyebrow: "Cuánto cuesta",
    title: "Cuánto cuesta un software de reservados (precios públicos, septiembre 2026)",
    sub: "Solo citamos lo que cada proveedor publica. «A consultar» = sin precio público.",
    head: ["Proveedor", "Yuno", "ResaFlow", "Fourvenues"],
    rows: [
      ["Cuota", "0 €", "Desde 49,99 € por noche o 350–500 € al mes", "A consultar tras una demo"],
      [
        "Comisión sobre las mesas",
        "0 % para la discoteca. El comprador paga un 4 % (mín. 0,99 €, máx. 25 €)",
        "No publicada",
        "No publicada",
      ],
      [
        "Entradas, barra y RRPP en la misma herramienta",
        "Sí — entradas, mesas, copas, puerta, comisiones de RRPP",
        "Solo mesas",
        "Sí (suite completa para discotecas)",
      ],
      ["Tarifa pública", "Sí", "Sí", "No"],
    ],
    footnote:
      "Fuentes: webs públicas de cada proveedor, consultadas en septiembre de 2026 (resaflow.com, fourvenues.com). Los precios cambian: comprueba en la web del proveedor antes de decidir. Yuno: yunoapp.eu, información actualizada el 29 de septiembre de 2026.",
  },
  steps: {
    eyebrow: "Cómo funciona",
    title: "Vender reservados en tres pasos",
    items: [
      {
        title: "Dibuja tu plano",
        body: "Añade tus mesas y zonas, y fija el pack o el mínimo y la señal de cada una. Dos minutos para la primera noche y luego se reutiliza.",
      },
      {
        title: "Los clientes reservan y pagan",
        body: "Eligen una mesa en la página de tu evento o en tu enlace, pagan la señal con tarjeta o Apple Pay y reciben la confirmación con su mesa.",
      },
      {
        title: "Tu responsable VIP dirige la noche",
        body: "Sienta a los clientes desde el plano vivo, añade a los que llegan sin reserva, toma los pedidos de la mesa y mira cómo se llena cada mínimo. El dinero ya está en tu cuenta.",
      },
    ],
  },
  proof: {
    eyebrow: "En la vida real",
    title: "Hecho con discotecas de Madrid y París",
    stats: [
      { value: "22", label: "discotecas asociadas en Madrid, lanzamiento con Amoris" },
      { value: "0 € · 0 %", label: "de cuota y de comisión para la discoteca o el organizador" },
      {
        value: "4 %",
        label: "de gastos de servicio al comprador en mesas, mín. 0,99 €, máx. 25 €",
      },
      { value: "ES · EN · FR", label: "páginas de reserva en tres idiomas" },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Reservados y mesas VIP: tus preguntas",
    items: [
      {
        q: "¿Cómo cobro una señal por un reservado?",
        a: "Fijas una señal por mesa o por pack. El cliente la paga online con tarjeta o Apple Pay al reservar, y el resto se abona en el local (o paga todo por adelantado). El dinero va a tu propia cuenta de Stripe.",
      },
      {
        q: "¿Yuno cobra comisión por mis reservados?",
        a: "No. Yuno cobra a la discoteca o al organizador 0 € de cuota y 0 % de comisión. El comprador paga un 4 % de gastos de servicio en las mesas, con un mínimo de 0,99 € y un tope de 25 €. Los gastos de tarjeta de Stripe (1,5 % + 0,25 €) los paga la discoteca.",
      },
      {
        q: "¿Pueden los clientes reservar botellas junto con la mesa?",
        a: "Sí. Las botellas se añaden al reservar; el pedido queda listo para la mesa y visible para tu barra. Durante la noche, tu responsable VIP también puede añadir pedidos desde la mesa.",
      },
      {
        q: "¿Puedo vender mesas solo para una noche, o usarlo junto a mi ticketera actual?",
        a: "Sí. Cada noche tiene un interruptor por pilar (entradas, mesas, copas): puedes empezar solo con las mesas, o con la lista de invitados, y añadir el resto más adelante.",
      },
      {
        q: "¿Qué ve mi responsable VIP durante la noche?",
        a: "Un plano de sala en directo: mesas sentadas y libres, clientes sin reserva, el gasto de cada mesa frente a su mínimo y los pedidos tomados desde la mesa.",
      },
      {
        q: "¿Para quién es Yuno?",
        a: "Para discotecas, organizadores y colectivos, RRPP y agencias en España y Francia. Yuno está disponible en español, inglés y francés.",
      },
    ],
  },
  related: {
    title: "Sigue explorando",
    links: [
      {
        label: "Software para RRPP: seguimiento y comisiones",
        href: "/es/software-rrpp-discoteca",
      },
      {
        label: "Reparto de ingresos discoteca × organizador",
        href: "/es/reparto-ingresos-discoteca-organizador",
      },
      {
        label: "Software de listas de invitados para discotecas",
        href: "/es/lista-invitados-discoteca-software",
      },
      { label: "Precios de Yuno", href: "/es/precios" },
      { label: "Todas las funciones de Yuno (inicio)", href: "/es" },
    ],
  },
  sources: {
    title: "Fuentes",
    items: [
      { label: "ResaFlow — gestión de mesas para clubes", url: "https://resaflow.com/" },
      {
        label: "Fourvenues — software de reservas VIP",
        url: "https://www.fourvenues.com/en/vip-booking-software",
      },
    ],
    disclaimer:
      "Los nombres de terceros pertenecen a sus propietarios. La información procede de páginas públicas y puede haber cambiado.",
  },
};

export const vipTables = [en, fr, es];
