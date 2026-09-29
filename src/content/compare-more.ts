// More comparison pages: Weezevent (FR), Xceed (ES), DICE (EN). Same rules as
// compare.ts: only what each competitor publishes, dated, listed in `sources`;
// "not found" when it isn't public; the competitor keeps its real strengths;
// never a guessed number. Yuno facts: docs/yuno-context.md.
import type { ComparePageContent } from "./compare-types";

const UPDATED = "2026-09-29";

// ------------------------------------------------------------- Weezevent FR
const weezeventFr: ComparePageContent = {
  id: "weezevent",
  lang: "fr",
  path: "/fr/alternative-weezevent",
  twins: { fr: "/fr/alternative-weezevent" },
  competitor: "Weezevent",
  updated: UPDATED,
  meta: {
    title: "Alternative à Weezevent pour soirées et clubs | Yuno",
    description:
      "Weezevent ou Yuno pour une soirée ? Commission, frais acheteur, versements, tables VIP, bar, promoteurs : le comparatif sourcé, forces de Weezevent incluses.",
    ogAlt: "Yuno vs Weezevent — comparatif billetterie pour soirées et clubs",
  },
  breadcrumb: { home: "Yuno", current: "Alternative à Weezevent" },
  hero: {
    kicker: "Yuno vs Weezevent — billetterie de soirée, frais et versements",
    title:
      "L'alternative à Weezevent pensée pour la nuit : tables, bar, promoteurs et versements sur votre compte.",
    sub: "Weezevent est une billetterie généraliste solide, utilisée pour tous types d'événements. Yuno est bâtie pour les soirées : billets et guest list, tables VIP avec acompte, commande au bar, répartition club × organisateur et commissions des promoteurs — 0 € d'abonnement, 0 % de commission sur votre prix, argent versé au fil des ventes.",
    primary: "Créer mon compte gratuit",
    secondary: "Parler au fondateur",
    updatedLabel: "Informations publiques relevées en septembre 2026",
  },
  tldr: {
    title: "En bref",
    items: [
      "Commission : Weezevent affiche 2,5 % par billet vendu en ligne, minimum 0,99 € TTC (répercutable sur l'acheteur). Yuno : 0 % côté organisateur ; l'acheteur paie 4 % (min. 0,99 €).",
      "Prix du billet : jusqu'à environ 25 € le billet, les frais acheteur sont équivalents (0,99 € minimum des deux côtés) ; au-delà, la grille de Weezevent est moins chère pour l'acheteur. Yuno ne prétend pas être la moins chère : son argument est 0 € d'abonnement et 0 % de commission à un prix publié.",
      "Versements : Weezevent verse les recettes tous les 15 jours. Sur Yuno, l'argent arrive directement sur votre compte Stripe, au fil des ventes ; Yuno ne détient jamais les fonds.",
      "La nuit : Yuno ajoute les tables VIP avec acompte, la commande au bar par QR code, les commissions des promoteurs calculées et la répartition club × organisateur. Nous ne les avons pas trouvées dans la documentation publique de Weezevent.",
    ],
  },
  table: {
    eyebrow: "Comparatif",
    title: "Yuno vs Weezevent, point par point.",
    sub: "Ce qui est public chez chacun, sans deviner ce qui ne l'est pas.",
    colCriterion: "Critère",
    colYuno: "Yuno",
    colOther: "Weezevent",
    rows: [
      {
        criterion: "Abonnement",
        yuno: "0 €, sans engagement.",
        other: "Pas d'abonnement ni d'engagement sur la billetterie de base.",
        verdict: "tie",
      },
      {
        criterion: "Commission organisateur",
        yuno: "0 % sur votre prix.",
        other:
          "2,5 % par billet vendu en ligne, minimum 0,99 € TTC ; peut être reportée sur l'acheteur.",
        verdict: "yuno",
      },
      {
        criterion: "Frais payés par l'acheteur",
        yuno: "4 % (min. 0,99 €) sur les billets ; 4 % plafonnés à 25 € sur les tables ; 3 % sur les boissons.",
        other:
          "La commission est à la charge de l'organisateur par défaut ; elle peut être répercutée sur l'acheteur (2,5 %, min. 0,99 €).",
        verdict: "other",
      },
      {
        criterion: "Versement des recettes",
        yuno: "Stripe Connect : l'argent arrive sur votre propre compte, au fil des ventes. Yuno ne détient jamais les fonds.",
        other: "Versements tous les 15 jours.",
        verdict: "yuno",
      },
      {
        criterion: "Tables VIP & bottle service",
        yuno: "Plan de salle interactif, formules, acompte ou paiement sur place, précommande de bouteilles, minimum de dépense suivi en direct.",
        other:
          "Billetterie avec placement et numérotation de places ; pas de module de tables VIP de club dans la documentation publique consultée.",
        verdict: "yuno",
      },
      {
        criterion: "Bar",
        yuno: "Commande et paiement au QR code du bar, file d'attente sur l'écran du barman.",
        other: "Cashless WeezPay en option payante (1,20 € par transaction).",
        verdict: "tie",
      },
      {
        criterion: "Personnel & accès",
        yuno: "Un scanner pour billets, guest list et tables ; chaque membre du staff a son propre compte (videur, serveur VIP, barman…).",
        other: "Personnel géré via WeezCrew, module payant à partir de 1 000 €.",
        verdict: "yuno",
      },
      {
        criterion: "Promoteurs",
        yuno: "Lien personnel par soirée, ventes et entrées comptées en direct, commission calculée et réglée en trois étapes horodatées.",
        other:
          "Pas de gestion de promoteurs avec commissions trouvée dans la documentation publique.",
        verdict: "yuno",
      },
      {
        criterion: "Soirée co-organisée club × organisateur",
        yuno: "Contrat signé dans Yuno (par pilier ou au barème), décompte validé par les deux parties, chacun payé sur son compte.",
        other: "Non trouvé dans la documentation publique.",
        verdict: "yuno",
      },
      {
        criterion: "Base clients & emailing",
        yuno: "Chaque acheteur rejoint votre base ; 9 automatisations, 15 000 emails/mois inclus, ventes attribuées à chaque campagne.",
        other: "CRM WeezTarget gratuit, avec envois d'emails aux contacts.",
        verdict: "tie",
      },
      {
        criterion: "Polyvalence",
        yuno: "Spécialisée soirées, clubs, organisateurs et promoteurs.",
        other:
          "Généraliste : concerts, festivals, sport, associations, salons ; billetterie gratuite pour les événements gratuits.",
        verdict: "other",
      },
    ],
    footnote:
      "Sources : pages publiques de Weezevent (page tarifs et grille tarifaire PDF, aide sur la gestion des frais), relevées en septembre 2026. Les conditions négociées par chaque organisateur peuvent différer.",
  },
  about: {
    eyebrow: "Deux approches",
    title: "Weezevent vend des billets pour tous les événements. Yuno gère toute la soirée.",
    paragraphs: [
      "Weezevent est l'une des billetteries les plus utilisées en France : concerts, festivals, événements sportifs, associations. Sa force est la polyvalence et une grille tarifaire simple et publique : 2,5 % par billet vendu en ligne, avec un minimum de 0,99 € TTC, que l'organisateur peut choisir de reporter sur l'acheteur.",
      "Pour une soirée en club, le billet n'est qu'une partie de la nuit. Les tables VIP, le bar, la porte, les promoteurs et le partage des recettes avec le club se gèrent souvent à côté — dans des tableurs, des messages et des virements manuels. Weezevent propose des modules payants pour certains besoins (cashless, personnel), mais nous n'y avons pas trouvé de réservation de carrés VIP, de commissions de promoteurs ni de contrat club × organisateur.",
      "Yuno met ces éléments dans le même compte que la billetterie : chaque soirée a un interrupteur par pilier (billets, tables, boissons), et l'argent va directement sur votre compte Stripe. Vous pouvez commencer par la guest list et ajouter le reste plus tard.",
    ],
  },
  choose: {
    eyebrow: "Lequel choisir",
    title: "Weezevent ou Yuno : cela dépend de vos soirées.",
    other: {
      title: "Weezevent convient si…",
      items: [
        "Vous vendez des billets pour des événements variés (concerts, festivals, sport…) et pas seulement des soirées en club.",
        "Vos billets dépassent 25 € et vous voulez les frais acheteur les plus bas.",
        "Une grille simple et publique de 2,5 % par billet vous suffit, sans tables ni promoteurs à gérer.",
      ],
    },
    yuno: {
      title: "Yuno convient si…",
      items: [
        "Vous organisez des soirées et voulez vendre billets, tables VIP et boissons dans le même compte.",
        "Vous payez des promoteurs à la commission et voulez qu'elle soit calculée et réglée sans tableur.",
        "Vous co-organisez avec un club et voulez un contrat et un décompte validés par les deux parties.",
        "Vous voulez l'argent sur votre compte au fil des ventes plutôt que tous les 15 jours.",
        "Vous voulez 0 € d'abonnement et 0 % de commission à un prix publié.",
      ],
    },
  },
  switch: {
    eyebrow: "Passer à Yuno",
    title: "Changer sans rien casser.",
    sub: "Chaque soirée a un interrupteur par pilier : vous pouvez tester Yuno sur une seule partie de la nuit.",
    steps: [
      {
        title: "Importez votre base",
        body: "Votre fichier clients s'importe dans Yuno, dédoublonné, avec consentement attesté.",
      },
      {
        title: "Commencez par un pilier",
        body: "Juste la guest list, juste les tables ou la vente complète : le reste de vos outils continue de fonctionner.",
      },
      {
        title: "Première soirée accompagnée",
        body: "Compte créé en deux minutes ; billets, prix, staff et compte d'encaissement réglés avec vous en environ une heure.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Questions fréquentes sur Weezevent et Yuno",
    items: [
      {
        q: "Quelle est la meilleure alternative à Weezevent pour une soirée en club ?",
        a: "Pour une soirée, une alternative doit couvrir plus que le billet : tables VIP avec acompte, commande au bar, contrôle à l'entrée, commissions des promoteurs et répartition avec le club. Yuno réunit ces éléments dans un seul compte, avec 0 € d'abonnement et 0 % de commission sur votre prix.",
      },
      {
        q: "Combien coûte Weezevent pour une billetterie de soirée ?",
        a: "Selon sa page tarifs (relevée en septembre 2026), Weezevent prélève 2,5 % par billet vendu en ligne, avec un minimum de 0,99 € TTC par billet, sans abonnement. L'organisateur peut reporter ces frais sur l'acheteur. Yuno ne prélève aucune commission sur votre prix : l'acheteur paie 4 % (min. 0,99 €) et les frais de carte Stripe (1,5 % + 0,25 €) sont à votre charge.",
      },
      {
        q: "Yuno est-elle moins chère que Weezevent ?",
        a: "Pas systématiquement. Jusqu'à environ 25 € le billet, les frais acheteur sont équivalents (0,99 € minimum des deux côtés). Au-delà, les 4 % de Yuno dépassent le minimum de 0,99 € de Weezevent. L'intérêt de Yuno n'est pas d'être la moins chère mais de proposer 0 € d'abonnement, 0 % de commission et toute la soirée dans un seul compte.",
      },
      {
        q: "Quand Weezevent verse-t-il les recettes ?",
        a: "Weezevent indique verser les recettes tous les 15 jours. Sur Yuno, l'argent arrive directement sur votre propre compte Stripe, au fil des ventes ; Yuno ne détient jamais les fonds.",
      },
      {
        q: "Peut-on vendre des tables VIP avec Weezevent ?",
        a: "Weezevent permet de vendre des billets avec placement et numérotation de places. Nous n'avons pas trouvé de module de réservation de tables VIP de club (plan de salle, acompte, minimum de consommation) dans sa documentation publique. Sur Yuno, le plan de salle interactif, l'acompte et le suivi du minimum sont inclus.",
      },
      {
        q: "Puis-je utiliser Yuno et Weezevent en même temps ?",
        a: "Oui. Chaque soirée de Yuno s'active par piliers : vous pouvez commencer par la guest list ou les tables uniquement et garder le reste de vos outils jusqu'à ce que vous décidiez de changer.",
      },
    ],
  },
  related: {
    title: "À lire aussi",
    links: [
      { label: "Alternative à Shotgun : le comparatif détaillé", href: "/fr/alternative-shotgun" },
      {
        label: "Réservation de tables VIP en discothèque",
        href: "/fr/reservation-table-vip-discotheque",
      },
      { label: "Logiciel de suivi des promoteurs", href: "/fr/logiciel-promoteurs-soiree" },
      { label: "Tarifs Yuno : 0 € d'abonnement, 0 % de commission", href: "/fr/pricing" },
    ],
  },
  sources: {
    title: "Sources (relevées en septembre 2026)",
    items: [
      { label: "Weezevent — Tarifs", url: "https://weezevent.com/fr/nos-tarifs/" },
      {
        label: "Weezevent — WeezTicket, tarifs et fonctionnalités",
        url: "https://weezevent.com/fr/weezticket/tarifs-fonctionnalites/",
      },
      {
        label: "Weezevent — Grille tarifaire (PDF, mise à jour du 17/06/2025)",
        url: "https://weezevent.com/wp-content/uploads/2025/06/17154506/weezticket-tarifs.pdf",
      },
      {
        label: "Weezevent — Gérer les frais sur mes tarifs (aide)",
        url: "https://help.weezevent.com/fr/articles/13407411-gerer-les-frais-sur-mes-tarifs",
      },
      {
        label: "La Fabrique du Net — Alternatives à Weezevent",
        url: "https://www.lafabriquedunet.fr/logiciels/alternatives/alternative-weezevent",
      },
    ],
  },
  disclaimer:
    "Weezevent est une marque de son propriétaire. Yuno n'est pas affiliée à Weezevent. Ce comparatif se fonde uniquement sur des informations publiques, relevées à la date indiquée ; les conditions négociées par chaque organisateur peuvent différer. Une information inexacte ? Écrivez-nous, nous corrigeons sous 48 h.",
};

// ------------------------------------------------------------------ Xceed ES
const xceedEs: ComparePageContent = {
  id: "xceed",
  lang: "es",
  path: "/es/alternativa-xceed",
  twins: { es: "/es/alternativa-xceed" },
  competitor: "Xceed",
  updated: UPDATED,
  meta: {
    title: "Alternativa a Xceed para discotecas: comisiones y precios | Yuno",
    description:
      "¿Xceed o Yuno para entradas y reservados? Comisión, marketplace del 15 %, cuota mensual, RRPP, barra y reparto: comparativa con fuentes públicas.",
    ogAlt: "Yuno vs Xceed — comparativa para discotecas y organizadores",
  },
  breadcrumb: { home: "Yuno", current: "Alternativa a Xceed" },
  hero: {
    kicker: "Yuno vs Xceed — entradas, reservados, RRPP y comisiones",
    title:
      "La alternativa a Xceed con 0 € de cuota, precios públicos y toda la noche en una cuenta.",
    sub: "Xceed es un marketplace de ocio nocturno conocido, con un plan Pro para discotecas. Yuno vende entradas, listas y reservados, gestiona la puerta y la barra, calcula las comisiones de tus RRPP y reparte la noche entre discoteca, organizador y RRPP — 0 € de cuota mensual, 0 % de comisión sobre tu precio y el dinero directo a tu cuenta.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    updatedLabel: "Información pública revisada en septiembre de 2026",
  },
  tldr: {
    title: "En resumen",
    items: [
      "Comisión: Xceed publica un 3 % por entrada solo en las ventas por tus propios canales, RRPP y afiliados, y un 15 % de comisión en las reservas que llegan por su marketplace. Yuno: 0 % para el organizador; el comprador paga un 4 % (mín. 0,99 €).",
      "Cuota: las herramientas de gestión de Xceed Pro (mapa de mesas, RRPP) tienen una cuota mensual publicada de 29 a 59 €. Yuno no cobra cuota mensual.",
      "Público: Xceed aporta la audiencia de su marketplace; es su gran ventaja. Yuno tiene su marketplace (App Store y web app) y cada comprador entra en tu propia base.",
      "Toda la noche: Yuno añade el pedido de copas con QR, el reparto discoteca × organizador firmado en la plataforma y las comisiones de RRPP calculadas. No los encontramos en la documentación pública de Xceed.",
    ],
  },
  table: {
    eyebrow: "Comparativa",
    title: "Yuno vs Xceed, punto por punto.",
    sub: "Solo lo que cada uno publica, sin adivinar lo que no es público.",
    colCriterion: "Criterio",
    colYuno: "Yuno",
    colOther: "Xceed",
    rows: [
      {
        criterion: "Cuota mensual",
        yuno: "0 €, sin permanencia.",
        other: "Xceed Pro: cuota mensual publicada de 29 a 59 € según el plan.",
        verdict: "yuno",
      },
      {
        criterion: "Comisión para el organizador",
        yuno: "0 % sobre tu precio.",
        other:
          "3 % por entrada en ventas por tus canales, RRPP y afiliados; 15 % en reservas del marketplace de Xceed.",
        verdict: "yuno",
      },
      {
        criterion: "Audiencia del marketplace",
        yuno: "Marketplace Yuno (App Store y web app); Madrid: 22 discotecas asociadas en la plataforma.",
        other: "Marketplace de ocio nocturno con más de 5 millones de usuarios, según Xceed.",
        verdict: "other",
      },
      {
        criterion: "Mapa de mesas y reservados",
        yuno: "Plano interactivo, señal, botellas pre-pedidas, consumo mínimo en directo. Incluido, sin plan.",
        other: "Mapa de mesas con asignación de clientes, en Xceed Pro.",
        verdict: "tie",
      },
      {
        criterion: "RRPP",
        yuno: "Enlace personal por noche, ventas y entradas en directo, comisión calculada y liquidada en tres pasos con fecha y hora.",
        other: "Enlaces de venta, listas y seguimiento de RRPP, en Xceed Pro.",
        verdict: "tie",
      },
      {
        criterion: "Barra",
        yuno: "El cliente pide y paga su copa con el QR de la barra; el camarero ve la cola.",
        other: "No encontrado en la documentación pública.",
        verdict: "yuno",
      },
      {
        criterion: "Reparto discoteca × organizador",
        yuno: "Contrato firmado en Yuno (por pilar o por tramos), cierre aprobado por las dos partes, cada una cobra en su cuenta.",
        other: "No encontrado en la documentación pública.",
        verdict: "yuno",
      },
    ],
    footnote:
      "Fuentes: páginas públicas de Xceed (precios, Xceed Pro y centro de ayuda), revisadas en septiembre de 2026. Las condiciones que Xceed ofrece a cada cliente pueden variar.",
  },
  about: {
    eyebrow: "Dos enfoques",
    title: "Xceed es un marketplace con herramientas Pro. Yuno es la noche entera en una cuenta.",
    paragraphs: [
      "Xceed es una plataforma europea de ocio nocturno: un marketplace donde el público descubre y compra entradas, y un plan Pro con herramientas de gestión para locales y promotoras (mapa de mesas, RRPP, listas de puerta). Su gran ventaja es la audiencia que ya tiene.",
      "Su modelo mezcla varias tarifas: un 3 % por entrada cuando la venta viene de tus propios canales, RRPP o afiliados; un 15 % de comisión de marketing cuando el comprador llega por el marketplace; y una cuota mensual publicada de 29 a 59 € para las herramientas Pro.",
      "Yuno parte de otro modelo: 0 € de cuota, 0 % de comisión sobre tu precio y un solo nivel de servicio, con precios públicos. El comprador paga los gastos de servicio; tú pagas solo los gastos de tarjeta de Stripe. Y la noche entera — entradas, reservados, copas, puerta, RRPP y reparto con la discoteca — vive en la misma cuenta.",
    ],
  },
  choose: {
    eyebrow: "Cuál elegir",
    title: "Xceed o Yuno: depende de tus noches.",
    other: {
      title: "Xceed encaja si…",
      items: [
        "Quieres aprovechar la audiencia de su marketplace, aunque implique una comisión del 15 % en esas ventas.",
        "Tu público llega sobre todo por sus recomendaciones y ya trabajas con su ecosistema.",
        "Te compensa pagar una cuota mensual por sus herramientas Pro.",
      ],
    },
    yuno: {
      title: "Yuno encaja si…",
      items: [
        "Quieres saber lo que pagas antes de hablar con nadie: 0 € de cuota, 0 % de comisión, tarifa pública.",
        "Quieres el pedido de copas con QR, la puerta y las comisiones de RRPP en la misma cuenta que las entradas.",
        "Trabajas con una discoteca y quieres un reparto firmado y aprobado por las dos partes.",
        "Quieres que cada comprador entre en tu propia base y volver a escribirle para la siguiente noche.",
        "Quieres el dinero en tu cuenta a medida que vendes.",
      ],
    },
  },
  switch: {
    eyebrow: "Pasarse a Yuno",
    title: "Cambiar sin romper nada.",
    sub: "Cada noche tiene un interruptor por pilar: puedes probar Yuno en una sola parte de la noche.",
    steps: [
      {
        title: "Importa tu base",
        body: "Tu fichero de clientes se importa en Yuno, deduplicado y con consentimiento acreditado.",
      },
      {
        title: "Empieza por un pilar",
        body: "Solo la lista, solo los reservados o la venta completa: el resto de tus herramientas sigue funcionando.",
      },
      {
        title: "Primera noche acompañada",
        body: "Cuenta creada en dos minutos; entradas, precios, staff y cuenta de cobro configurados contigo en una hora aproximadamente.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Preguntas frecuentes sobre Xceed y Yuno",
    items: [
      {
        q: "¿Cuál es la mejor alternativa a Xceed para una discoteca u organizador?",
        a: "Depende de lo que necesites, pero una alternativa debería cubrir más que la venta de entradas: reservados, copas, puerta, RRPP y reparto con la discoteca. Yuno lo reúne en una sola cuenta, con 0 € de cuota mensual, 0 % de comisión sobre tu precio y tarifas públicas.",
      },
      {
        q: "¿Cuánto cobra Xceed por entrada?",
        a: "Según su página de precios (septiembre de 2026), Xceed publica un 3 % por entrada en las ventas por tus propios canales, RRPP y afiliados, y una comisión de marketing del 15 % en las reservas que llegan por su marketplace. Las herramientas Pro tienen una cuota mensual publicada de 29 a 59 €.",
      },
      {
        q: "¿Cuánto cuesta Xceed Pro al mes?",
        a: "Xceed publica una cuota mensual de 29 a 59 € para Xceed Pro, según el plan. Yuno no cobra cuota mensual: el mapa de reservados, los RRPP y el resto de funciones están incluidos en el mismo nivel de servicio.",
      },
      {
        q: "¿Yuno es más barato que Xceed?",
        a: "Depende del volumen y de dónde vengan tus ventas. Xceed es competitivo con un 3 % en tus propios canales. Yuno no se presenta como la más barata: su propuesta es 0 € de cuota, 0 % de comisión para el organizador y toda la noche en una cuenta, a un precio público.",
      },
      {
        q: "¿Puedo gestionar los RRPP y las comisiones con Yuno?",
        a: "Sí. Cada RRPP recibe un enlace personal por noche; las ventas y entradas se cuentan en directo, la comisión se calcula automáticamente y se liquida en tres pasos con fecha y hora.",
      },
      {
        q: "¿Puedo usar Yuno y Xceed a la vez?",
        a: "Sí. Cada noche de Yuno se activa por pilares: puedes empezar solo con la lista o con los reservados y mantener el resto de tus herramientas hasta que decidas cambiar.",
      },
    ],
  },
  related: {
    title: "Sigue leyendo",
    links: [
      { label: "Alternativa a Fourvenues", href: "/es/alternativa-fourvenues" },
      {
        label: "Software de reservados para discotecas",
        href: "/es/software-reservados-discoteca",
      },
      {
        label: "Software para RRPP: seguimiento y comisiones",
        href: "/es/software-rrpp-discoteca",
      },
      { label: "Precios de Yuno: 0 € de cuota, 0 % de comisión", href: "/es/precios" },
    ],
  },
  sources: {
    title: "Fuentes (consultadas en septiembre de 2026)",
    items: [
      { label: "Xceed — Precios", url: "https://xceed.me/es/pricing" },
      { label: "Xceed — Pricing (EN)", url: "https://xceed.me/en/pricing" },
      {
        label: "Xceed Pro — Gestión de eventos y venta de entradas",
        url: "https://xceed.me/es/business",
      },
      {
        label: "Xceed — RRPPs: cómo usar Xceed Pro",
        url: "https://support.xceed.me/es/articles/9172738",
      },
    ],
  },
  disclaimer:
    "Xceed es una marca de su propietario. Yuno no está afiliado a Xceed. Esta comparativa se basa únicamente en información pública, revisada en la fecha indicada; las condiciones que Xceed ofrece a cada cliente pueden variar. ¿Algún dato inexacto? Escríbenos y lo corregimos en 48 h.",
};

// ------------------------------------------------------------------ DICE EN
const diceEn: ComparePageContent = {
  id: "dice",
  lang: "en",
  path: "/dice-alternative",
  twins: { en: "/dice-alternative" },
  competitor: "DICE",
  updated: UPDATED,
  meta: {
    title: "DICE alternative for club nights: published fees | Yuno",
    description:
      "A DICE alternative for club nights? Compare fees, payouts, VIP tables, bar and promoters. Yuno: €0 subscription, 0% commission, published prices.",
    ogAlt: "Yuno vs DICE — an alternative for club nights, with published fees",
  },
  breadcrumb: { home: "Yuno", current: "DICE alternative" },
  hero: {
    kicker: "Yuno vs DICE — ticketing for club nights, fees and payouts",
    title: "A DICE alternative that publishes its fees and runs the whole club night.",
    sub: "DICE is a well-known fan app for live music and nights out. Yuno is built for the people running the night: tickets and guest list, VIP tables, drinks at the bar, the door, promoter commissions and the split with the club — €0 subscription, 0% commission on your price, at prices you can read before talking to anyone.",
    primary: "Create my free account",
    secondary: "Talk to the founder",
    updatedLabel: "Public information checked in September 2026",
  },
  tldr: {
    title: "In short",
    items: [
      "Fees: DICE does not publish its organiser pricing; terms are agreed per partnership (third-party comparisons estimate 10–15%). Yuno publishes everything: €0 subscription, 0% commission for the organiser, a buyer service fee of 4% (min. €0.99).",
      "Audience: DICE brings a large fan audience, its main strength (owned by Fever since 2025). Yuno has its own marketplace (App Store and web app), and every buyer joins your own customer base.",
      "The night itself: Yuno adds VIP tables with deposits, ordering at the bar by QR code, computed promoter commissions and a club × organiser split signed in the platform. We did not find these in DICE's public documentation.",
      "Money: on Yuno, funds go straight to your own Stripe account as you sell; Yuno never holds them.",
    ],
  },
  table: {
    eyebrow: "Comparison",
    title: "Yuno vs DICE, point by point.",
    sub: "What each side publishes, without guessing what it doesn't.",
    colCriterion: "Criterion",
    colYuno: "Yuno",
    colOther: "DICE",
    rows: [
      {
        criterion: "Subscription",
        yuno: "€0, no commitment.",
        other: "None advertised for organisers; terms agreed with DICE.",
        verdict: "tie",
      },
      {
        criterion: "Organiser commission",
        yuno: "0% on your price.",
        other: "Not published; negotiated per partnership (third-party estimates: 10–15%).",
        verdict: "yuno",
      },
      {
        criterion: "Fees paid by the buyer",
        yuno: "4% (min. €0.99) on tickets; 4% capped at €25 on tables; 3% on drinks.",
        other: "A booking fee is added for fans and split with organisers; it varies by event.",
        verdict: "tie",
      },
      {
        criterion: "Public price list",
        yuno: "Yes, all of it on the website.",
        other: "No.",
        verdict: "yuno",
      },
      {
        criterion: "Payouts",
        yuno: "Stripe Connect: money lands on your own account as you sell. Yuno never holds funds.",
        other: "Paid out by DICE after the event.",
        verdict: "yuno",
      },
      {
        criterion: "Fan audience",
        yuno: "Yuno marketplace (App Store and web app); every buyer joins your own customer base.",
        other: "Large consumer app for live music and nights out; part of Fever since 2025.",
        verdict: "other",
      },
      {
        criterion: "VIP tables & bottle service",
        yuno: "Interactive floor plan, packages, deposit or pay on site, bottle pre-orders, minimum spend tracked live.",
        other: "Not found in DICE's public documentation.",
        verdict: "yuno",
      },
      {
        criterion: "Bar",
        yuno: "Order and pay at the bar's QR code; the bartender sees the queue.",
        other: "Not found in DICE's public documentation.",
        verdict: "yuno",
      },
      {
        criterion: "Promoters",
        yuno: "Personal link per night, sales and entries counted live, commission computed and settled in three timestamped steps.",
        other: "Not found in DICE's public documentation.",
        verdict: "yuno",
      },
      {
        criterion: "Club × organiser split",
        yuno: "Contract signed in Yuno (per pillar or tiered), statement approved by both sides, each paid to its own account.",
        other: "Not found in DICE's public documentation.",
        verdict: "yuno",
      },
    ],
    footnote:
      "Sources: DICE's public help centre and third-party fee comparisons, checked in September 2026. DICE terms are negotiated per partnership and can differ from what is shown here.",
  },
  about: {
    eyebrow: "Two approaches",
    title: "DICE is a fan app. Yuno is the platform for the people running the night.",
    paragraphs: [
      "DICE is a ticketing app known for live music, gigs and club nights, with a large consumer audience. It joined Fever in 2025. Organiser pricing is not published: fees are agreed per partnership, and third-party comparisons put them around 10–15%.",
      "For a club night, the ticket is only one part of the evening. VIP tables, drinks, the door, the promoters and the split with the venue are usually handled next to the ticketing — spreadsheets, messages, manual transfers. We did not find tables, bar ordering, promoter commissions or a venue × organiser contract in DICE's public documentation.",
      "Yuno puts these in the same account as the tickets. Each night has one switch per pillar (tickets, tables, drinks), so you can start with the guest list and add the rest later. Prices are public: €0 subscription and 0% commission on your price; the buyer pays the service fee and you pay only Stripe's card fees.",
    ],
  },
  choose: {
    eyebrow: "Which to choose",
    title: "DICE or Yuno: it depends on your nights.",
    other: {
      title: "DICE fits if…",
      items: [
        "You want to reach DICE's fan audience and are happy with terms negotiated with their team.",
        "Your nights are mainly gigs and live music and you sell tickets only.",
        "You do not need tables, bar ordering or promoter tools in the same platform.",
      ],
    },
    yuno: {
      title: "Yuno fits if…",
      items: [
        "You run club nights and want tickets, VIP tables and drinks in one account.",
        "You want to know what you pay before talking to anyone: €0 subscription, 0% commission.",
        "You pay promoters on commission and want it computed and settled without a spreadsheet.",
        "You share a night with a club and want a contract and statement both sides approve.",
        "You want your money on your own account as you sell, and every buyer in your own customer base.",
      ],
    },
  },
  switch: {
    eyebrow: "Switching to Yuno",
    title: "Switch without breaking anything.",
    sub: "Each night has one switch per pillar: you can try Yuno on a single part of the night.",
    steps: [
      {
        title: "Import your list",
        body: "Your customer file is imported into Yuno, deduplicated, with attested consent.",
      },
      {
        title: "Start with one pillar",
        body: "Just the guest list, just the tables or the full sale — the rest of your tools keeps working.",
      },
      {
        title: "First night, with support",
        body: "Account created in two minutes; tickets, prices, staff and your payout account set up with you in about an hour.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "DICE and Yuno: frequently asked questions",
    items: [
      {
        q: "What is the best DICE alternative for club nights?",
        a: "For club nights, an alternative should cover more than the ticket: VIP tables, drinks, door control, promoter commissions and the split with the venue. Yuno puts all of this in one account, with €0 subscription, 0% commission on your price and published fees.",
      },
      {
        q: "How much does DICE charge organisers?",
        a: "DICE does not publish organiser pricing: terms are agreed per partnership. Third-party comparisons estimate 10–15%. Yuno charges the organiser nothing on your price: the buyer pays a 4% service fee (min. €0.99) on tickets and Stripe's card fees (1.5% + €0.25) are paid by you.",
      },
      {
        q: "Does DICE publish its fees?",
        a: "Not for organisers: DICE's help centre explains how booking fees work for fans, but partnership terms are negotiated. Yuno's prices are all public.",
      },
      {
        q: "Who owns the customer data on Yuno?",
        a: "Every buyer — ticket, table, drink or guest list — joins your own customer base. You can import your existing file (deduplicated, with attested consent) and email your customers with 9 ready-made automations.",
      },
      {
        q: "When do I get paid?",
        a: "On Yuno, money goes straight to your own Stripe account as you sell; Yuno never holds your funds. DICE pays out after the event.",
      },
      {
        q: "Can I use Yuno and DICE at the same time?",
        a: "Yes. Each Yuno night is activated pillar by pillar: you can start with the guest list or the tables only and keep your other tools until you decide to switch.",
      },
    ],
  },
  related: {
    title: "Keep reading",
    links: [
      { label: "Shotgun alternative: the detailed comparison", href: "/alternative-shotgun" },
      { label: "VIP table booking software", href: "/vip-table-booking-software" },
      { label: "Promoter tracking software", href: "/promoter-tracking-software" },
      { label: "Yuno pricing: €0 subscription, 0% commission", href: "/pricing" },
    ],
  },
  sources: {
    title: "Sources (checked in September 2026)",
    items: [
      {
        label: "DICE Help Center — How DICE fees work",
        url: "https://dicefm.zendesk.com/hc/en-gb/articles/19919684020113-How-DICE-fees-work",
      },
      {
        label: "Ticketing Fees — DICE fees in 2026",
        url: "https://ticketingfees.co.uk/dice-fees/",
      },
      { label: "Hi.Events — DICE alternative", url: "https://hi.events/dice-alternative" },
    ],
  },
  disclaimer:
    "DICE is a trademark of its owner. Yuno is not affiliated with DICE. This comparison relies only on public information checked on the date shown; terms negotiated by each organiser may differ. Spotted an inaccuracy? Write to us and we will correct it within 48 hours.",
};

export const MORE_COMPARE_PAGES: ComparePageContent[] = [weezeventFr, xceedEs, diceEn];
