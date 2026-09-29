// Madrid. Targets: "software discotecas Madrid", "venta de entradas discotecas
// Madrid", "software para organizadores de fiestas en Madrid", "gestión de
// discotecas Madrid" (ES only, no twins). Facts: docs/yuno-context.md (traction:
// launch with Amoris + 22 partner clubs listed; pricing table; Fourvenues facts).
import type { TopicPageContent } from "../topic-types";

const UPDATED = "2026-09-29";
const TWINS = {
  es: "/es/software-discotecas-madrid",
};

const es: TopicPageContent = {
  id: "madrid",
  lang: "es",
  path: TWINS.es,
  twins: TWINS,
  updated: UPDATED,
  meta: {
    title: "Software para discotecas en Madrid: entradas y mesas | Yuno",
    description:
      "Vende entradas, listas y reservados en Madrid y gestiona puerta, barra y RRPP desde una cuenta. 0 € de cuota, 0 % de comisión, dinero directo a tu cuenta.",
    ogAlt: "Yuno — software para discotecas y organizadores de fiestas en Madrid",
  },
  breadcrumb: { home: "Yuno", current: "Software para discotecas en Madrid" },
  hero: {
    kicker: "Software para discotecas y organizadores de fiestas en Madrid",
    title: "Vende y gestiona tu noche en Madrid, de la entrada a la barra.",
    sub: "Entradas, listas, reservados y copas en una sola cuenta, con la puerta, los RRPP y el reparto discoteca × organizador dentro. Yuno se lanzó en Madrid con Amoris y 22 discotecas asociadas. Sin cuota y sin comisión sobre tu precio.",
    primary: "Crear mi cuenta gratis",
    secondary: "Hablar con el fundador",
    note: ["Sin cuota mensual", "0 % de comisión sobre tu precio", "Páginas de reserva en español"],
  },
  answer: {
    title: "En breve",
    paragraphs: [
      "Yuno es un software para discotecas y organizadores de fiestas en Madrid. Una sola cuenta vende entradas online, gestiona la lista de invitados, vende reservados y mesas con señal, toma pedidos en la barra con un QR, sigue las ventas de cada RRPP, controla la puerta y reparte el dinero entre la discoteca y el organizador.",
      "Yuno se lanzó en Madrid con Amoris, organizador de eventos, y 22 discotecas asociadas ya listadas en la plataforma. El público descubre las noches en la app de iOS (App Store) y en la app web; cada comprador, venga de donde venga, pasa a formar parte de la base de clientes de la discoteca o del organizador.",
    ],
    bullets: [
      "0 € de cuota y 0 % de comisión sobre tu precio. El comprador paga los gastos de servicio: 4 % en entradas (mín. 0,99 €), 4 % en mesas (mín. 0,99 €, tope de 25 €) y 3 % en copas.",
      "Los gastos de tarjeta (Stripe, 1,5 % + 0,25 €) los paga la discoteca o el organizador. El dinero llega directo a tu cuenta; Yuno nunca retiene tus fondos.",
      "Páginas de reserva en español (también en inglés y francés), sin registro para el comprador y sin app obligatoria.",
    ],
  },
  features: {
    eyebrow: "Qué incluye",
    title: "Lo que recibe una discoteca o un organizador en Madrid",
    sub: "Todo lo que hace falta entre publicar la noche y cerrar la caja.",
    items: [
      {
        title: "Venta de entradas online",
        body: "Tramos de precio, preventas, códigos promocionales y entradas en Apple Wallet. El comprador paga en unos treinta segundos, con tarjeta o Apple Pay, sin crear cuenta.",
      },
      {
        title: "Listas de invitados",
        body: "Lista gratuita con cupos, hora límite y QR nominativos. Cada nombre que entra por lista queda en tu base de clientes.",
      },
      {
        title: "Reservados y mesas VIP",
        body: "Plano interactivo, packs o consumo mínimo, señal o pago completo y botellas reservadas de antemano. Tu responsable VIP ve el plano en directo durante la noche.",
      },
      {
        title: "Barra con QR",
        body: "El cliente pide y paga desde el móvil escaneando el QR de la barra, y el camarero ve la cola de pedidos. Se activa por discoteca o por barra.",
      },
      {
        title: "RRPP con enlace propio",
        body: "Cada RRPP tiene su enlace personal por noche. Ventas y entradas se cuentan en directo, la comisión se calcula sola y la liquidación pasa por tres pasos registrados.",
      },
      {
        title: "Puerta con un solo escáner",
        body: "Un escáner para entradas, listas y mesas, con búsqueda por nombre, contador de entradas en directo y duplicados explicados. Cada persona del staff tiene su propia pantalla según su rol.",
      },
      {
        title: "Reparto discoteca × organizador",
        body: "El contrato se firma dentro de Yuno, pilar por pilar o como reparto escalonado. Al cierre la discoteca declara barra y puerta, el organizador acepta o discute, y nada se mueve sin acuerdo de las dos partes.",
      },
      {
        title: "Tus clientes, tu base",
        body: "Cada comprador (entrada, mesa, copa o lista) entra en tu base de clientes, con importación de tu fichero actual y emailing incluido: 15.000 emails al mes.",
      },
    ],
  },
  table: {
    eyebrow: "Cuánto cuesta",
    title: "Precios de Yuno para Madrid, publicados",
    sub: "Los mismos precios que en el resto de España y Francia: un solo nivel de servicio, sin planes ni opciones.",
    head: ["Concepto", "Quién paga", "Importe"],
    rows: [
      ["Cuota mensual y comisión", "—", "0 € · 0 %"],
      ["Gastos de servicio, entradas", "El cliente, además del precio", "4 % · mín. 0,99 €"],
      [
        "Gastos de servicio, mesas y reservados",
        "El cliente, sobre el importe cobrado",
        "4 % · mín. 0,99 € · máx. 25 €",
      ],
      ["Gastos de servicio, copas", "El cliente, además del precio", "3 %"],
      [
        "Procesamiento de tarjeta (Stripe)",
        "La discoteca o el organizador, sobre lo cobrado",
        "1,5 % + 0,25 €",
      ],
      ["Emailing a tus clientes", "Incluido", "15.000 emails/mes; después 10 € por 10.000"],
    ],
    footnote:
      "Ejemplo: 300 entradas a 20 €. El cliente paga 20,99 € por entrada; tú te quedas 19,44 € tras 0,56 € de gastos de Stripe, es decir 5.832 € netos, en tu propia cuenta. Precios de yunoapp.eu, actualizados el 29 de septiembre de 2026.",
  },
  steps: {
    eyebrow: "Cómo funciona",
    title: "Empezar en Madrid en tres pasos",
    items: [
      {
        title: "Crea tu cuenta",
        body: "Unos dos minutos, sin tarjeta: cuatro preguntas sobre tu perfil, tu sala o tus noches y lo que vendes. Puedes empezar solo con la lista de invitados y sumar el resto más adelante.",
      },
      {
        title: "Publica tu noche",
        body: "Activa entradas, mesas y copas noche a noche, con un interruptor por pilar. Comparte el enlace con tus RRPP y en tus redes, y tu noche también se descubre en la app y en la web de Yuno.",
      },
      {
        title: "Dirige la puerta y la barra",
        body: "El portero escanea, el responsable VIP sienta las mesas y el camarero ve los pedidos. Al cierre, el reparto entre discoteca y organizador se acepta dentro de Yuno.",
      },
    ],
  },
  proof: {
    eyebrow: "En la vida real",
    title: "Yuno en Madrid hoy",
    stats: [
      { value: "Amoris", label: "organizador de eventos, lanzamiento de Yuno en Madrid" },
      { value: "22", label: "discotecas asociadas listadas en la plataforma" },
      {
        value: "iOS + web",
        label: "app en la App Store y app web donde el público descubre las noches",
      },
      { value: "0 € · 0 %", label: "de cuota y de comisión para la discoteca o el organizador" },
    ],
    note: "Cifras de septiembre de 2026, tomadas de la plataforma.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Software para discotecas en Madrid: tus preguntas",
    items: [
      {
        q: "¿Qué software puede usar una discoteca en Madrid para vender entradas y gestionar la noche?",
        a: "Yuno vende entradas online, listas, reservados y copas, controla la puerta con un escáner y calcula las comisiones de los RRPP, todo desde una sola cuenta. La cuota es de 0 € y la comisión sobre tu precio, del 0 %. Fourvenues, otra herramienta conocida entre los locales españoles, también ofrece una suite para discotecas.",
      },
      {
        q: "¿Cuánto cuesta vender entradas de discoteca con Yuno en Madrid?",
        a: "Para la discoteca o el organizador, 0 € de cuota y 0 % de comisión sobre tu precio. El comprador paga los gastos de servicio: 4 % en entradas (mín. 0,99 €), 4 % en mesas (mín. 0,99 €, tope de 25 €) y 3 % en copas. Solo pagas el procesamiento de tarjeta de Stripe: 1,5 % + 0,25 €.",
      },
      {
        q: "¿En qué se diferencia Yuno de Fourvenues?",
        a: "Fourvenues es una herramienta consolidada para los locales españoles y su cuota se calcula a medida, tras una demo. La diferencia de Yuno es que sus precios están publicados y que incluye el reparto discoteca × organizador dentro de la herramienta: contrato, cierre de noche y liquidación aceptados por las dos partes. Puedes ver la comparación detallada en nuestra página de alternativa a Fourvenues.",
      },
      {
        q: "Soy organizador de fiestas y alquilo la sala: ¿cómo reparto los ingresos con la discoteca?",
        a: "El contrato discoteca × organizador se firma dentro de Yuno, pilar por pilar (entradas, mesas, barra, puerta) o como reparto escalonado. Al cierre, la discoteca declara lo cobrado en barra y puerta y el organizador lo acepta o lo discute: nada se mueve sin el acuerdo de las dos partes.",
      },
      {
        q: "¿Mis clientes tienen que descargar una app?",
        a: "No. Comprar en la web lleva unos treinta segundos, con tarjeta o Apple Pay y sin cuenta; el QR llega por email y a Apple Wallet. La app de Yuno para iOS (App Store) es opcional, para quien quiera descubrir noches en ella.",
      },
      {
        q: "¿Quién es dueño de los datos de los compradores?",
        a: "Tú. Cada comprador, venga de tu página o de la app y la web de Yuno, entra en la base de clientes de tu discoteca o de tu organización, y puedes escribirle por email desde Yuno.",
      },
      {
        q: "¿Cuándo llega el dinero a mi cuenta?",
        a: "El cobro funciona con Stripe Connect: el dinero llega directamente a tu cuenta, con tu nombre en el extracto del cliente. Yuno nunca retiene tus fondos.",
      },
      {
        q: "¿Puedo empezar solo con la lista de invitados?",
        a: "Sí. Cada noche tiene un interruptor por pilar (entradas, mesas, copas), así que puedes empezar por la lista de invitados y activar el resto cuando quieras.",
      },
    ],
  },
  related: {
    title: "Sigue explorando",
    links: [
      {
        label: "Software de reservados para discotecas",
        href: "/es/software-reservados-discoteca",
      },
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
      { label: "Alternativa a Fourvenues", href: "/es/alternativa-fourvenues" },
      { label: "Alternativa a Xceed", href: "/es/alternativa-xceed" },
    ],
  },
  sources: {
    title: "Fuentes",
    items: [
      {
        label: "Fourvenues — software para discotecas",
        url: "https://www.fourvenues.com/es/software-para-discotecas",
      },
    ],
    disclaimer:
      "Los nombres de terceros pertenecen a sus propietarios. La información procede de páginas públicas, consultadas en septiembre de 2026, y puede haber cambiado.",
  },
};

export const madrid = [es];
