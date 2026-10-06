import type { en } from "./en";

export const es: typeof en = {
  locale: "es",
  langTag: "es",
  htmlLang: "es",
  ogLocale: "es_LA",
  metadata: {
    title: "Puff Cross Media | Suscripción de Diseño a Demanda para Marcas en Crecimiento",
    description:
      "Escalá tu marca con diseño de empaques, branding y desarrollo digital de nivel senior en 48 horas. Tarifa plana mensual. Pausá o cancelá cuando quieras.",
    schemaDescription:
      "Servicio de suscripción de diseño a demanda: packaging de alta conversión, identidad de marca y piezas de marketing con entregas en 48 horas.",
  },
  header: {
    brandName: "Puff Cross Media",
    navItems: [
      { label: "Cómo funciona", href: "#how-it-works" },
      { label: "Precios", href: "#pricing" },
      { label: "Trabajos", href: "#work" },
      { label: "Preguntas", href: "#faq" },
    ],
    primaryCta: { label: "Ver planes", href: "#pricing" },
    menuAria: "Abrir menú",
  },
  hero: {
    steppedLineTop: "todo tu equipo",
    steppedLineCenter: "CREATIVO",
    steppedLineBottomStart: "EN",
    steppedLineBottomMiddle: "una",
    steppedLineBottomEnd: "CAJA",
    body: "Escalá tu marca con diseño de packaging, branding y digital de nivel senior entregado en 48 horas. Tarifa plana mensual. Pausá o cancelá cuando quieras.",
    cta: "Ver planes",
    skipLink: "Saltar al contenido principal",
  },
  process: {
    sticker: "BENEFICIOS Y VENTAJAS",
    titleLine1: "Por qué todos eligen",
    titleLine2Accent: "sumarse",
    titleLine2End: "A PUFF.",
    titleDark1: "Diseño de primer nivel,",
    titleDark2: "a demanda y",
    titleDark3: "sin límites.",
    darkDescription:
      "Decile adiós a freelancers informales y agencias lentas. Accedé a talento creativo senior con precios transparentes y cero fricción.",
    deck: [
      {
        num: "01",
        tag: "ILIMITADO",
        title: "Pedidos Ilimitados",
        description:
          "Enviá todos los pedidos de empaque, branding y web que necesites. Trabajamos en tu cola de forma continua sin costos ocultos.",
      },
      {
        num: "02",
        tag: "VELOCIDAD",
        title: "Entregas en 48h",
        description:
          "Recibí mockups de packaging listos para producción, piezas de marketing y updates web en 48 horas o menos.",
      },
      {
        num: "03",
        tag: "TALENTO SENIOR",
        title: "Diseñadores Dedicados",
        description:
          "Trabajá con talento creativo senior experimentado y dedicado a la identidad de tu marca. Estética consistente sin rotación.",
      },
      {
        num: "04",
        tag: "PERFECCIÓN",
        title: "Revisiones Ilimitadas",
        description:
          "¿No estás 100% convencido con el primer boceto? Iteramos, pulimos y ajustamos cada detalle hasta dar exactamente con tu visión.",
      },
      {
        num: "05",
        tag: "FLUJO ÁGIL",
        title: "Comunicación Directa",
        description:
          "Cero tickets burocráticos. Conversá directamente con tu equipo de diseño desde tu dashboard privado para un feedback inmediato.",
      },
      {
        num: "06",
        tag: "FLEXIBILIDAD",
        title: "Pausá o Cancelá Siempre",
        description:
          "Acelerá durante lanzamientos y pausá en temporadas tranquilas. Pagás únicamente por los días que realmente utilizás.",
      },
    ],
    steps: [
      {
        number: "1",
        title: "Elegí tu plan",
        description: "Seleccioná el plan que mejor se adapte a tus necesidades: Lite, Pro o Premium.",
      },
      {
        number: "2",
        title: "Pedí tus diseños",
        description: "Enviá tus requerimientos directamente desde tu dashboard.",
      },
      {
        number: "3",
        title: "Recibilos en 48h",
        description: "Tu equipo de Puff diseña y entrega solicitudes continuas con revisiones incluidas.",
      },
    ],
  },
  services: {
    sticker: "Capacidades y Servicios",
    title: "Lo que mejor hacemos",
    intro:
      "Ejecución creativa integral a través de un modelo de suscripción ágil. Diseño, código, motion y estrategia de marca bajo un mismo techo.",
    items: [
      {
        num: "01",
        category: "BRANDING",
        title: "IDENTIDAD DE MARCA Y DIRECCIÓN DE ARTE",
        description: "Sistemas tipográficos, paletas de color estratégicas y guías visuales completas.",
      },
      {
        num: "02",
        category: "DISEÑO WEB",
        title: "SITIOS WEB MODERNOS Y A MEDIDA",
        description: "Código a medida, tiempos de carga ultra veloces y layouts interactivos y responsivos.",
      },
      {
        num: "03",
        category: "PACKAGING Y MERCH",
        title: "PACKAGING Y MERCH PERSONALIZADO",
        description: "Cajas estructurales, etiquetas de producto y experiencias físicas de unboxing.",
      },
      {
        num: "04",
        category: "IMPRESIÓN Y ESPACIAL",
        title: "MATERIAL IMPRESO Y GRÁFICA ESPACIAL",
        description: "Cartelería para locales, menús, papelería táctil y piezas de marketing.",
      },
      {
        num: "05",
        category: "CAMPAÑAS",
        title: "CONTENIDO CREATIVO DE ALTO IMPACTO",
        description: "Creatividades publicitarias de alto rendimiento y piezas promocionales a escala.",
      },
    ],
  },
  testimonials: {
    sticker: "Reseñas de Clientes",
    heading: "Elegido por marcas ambiciosas",
    subheading: "Reseñas reales de Google de fundadores y directores que escalan con Puff Cross Media.",
  },
  pricing: {
    sticker: "Precios y Membresía",
    heading: "Una Suscripción,<br />Infinitas Posibilidades",
    joinCard: {
      pill: "Empezá hoy",
      title: "Sumate a Puff<br />Mensual",
    },
    subgridHeader: {
      title: "ELEGÍ TU NIVEL",
      badge: "PAUSÁ O CANCELÁ CUANDO QUIERAS",
    },
    plans: [
      {
        name: "Graphic",
        tag: "Esencial",
        price: "$1,000",
        period: "/mes",
        summary: "Servicio de diseño gráfico para piezas visuales ágiles y constantes.",
        inclusions: [
          "20 proyectos activos",
          "Un pedido a la vez",
          "Entrega prom. en 48 horas",
          "Marcas ilimitadas",
          "Pausá o cancelá cuando quieras",
        ],
        cta: "Elegir Graphic",
      },
      {
        name: "Web & UI",
        tag: "MÁS POPULAR",
        price: "$1,500",
        period: "/mes",
        summary: "Diseño gráfico + Sistema integral de Diseño Web y UI/UX.",
        inclusions: [
          "Proyectos activos ilimitados",
          "Pedidos simultáneos activos",
          "Diseño integral Web y UI/UX",
          "Desarrollo en Astro y Webflow",
          "Entrega prioritaria en 48 horas",
        ],
        cta: "Elegir Web & UI",
      },
      {
        name: "Full Scale",
        tag: "Todo Incluido",
        price: "$2,500",
        period: "/mes",
        summary: "Diseño gráfico + Web + Edición de Video y Animación 3D.",
        inclusions: [
          "Todo lo de Web & UI, más:",
          "Edición completa de video y motion",
          "Assets y animaciones 3D",
          "Videos de stock ilimitados",
          "Director creativo dedicado",
        ],
        cta: "Elegir Full Scale",
      },
    ],
    starterPlan: {
      tag: "Inicial",
      name: "Graphic Lite",
      price: "$200",
      period: "/mes",
      promoNote: "Tarifa fija • No aplica promo 20%",
      summary: "Servicio de diseño gráfico enfocado para 2 proyectos dedicados.",
      inclusions: [
        "2 proyectos activos",
        "Un pedido a la vez",
        "Entrega prom. en 48 horas",
        "Marcas ilimitadas",
        "Pausá o cancelá cuando quieras",
      ],
      cta: "Elegir Graphic Lite",
    },
    guarantee: {
      pillPrefix: "Probá Puff gratis por 7 días +",
      pillHighlight: " 20% OFF",
      pillSuffix: " por 3 meses*",
      disclaimer:
        "*Válido en planes trimestrales. Excluye Graphic Lite de $200.",
    },
  },
  faq: {
    stickerQuestions: "Preguntas",
    stickerAnswers: "Respuestas",
    heading: "Preguntas Frecuentes",
    description:
      "Todo lo que necesitás saber sobre nuestro modelo de suscripción, entregas en 48 horas, revisiones ilimitadas y política de pausa.",
    customRequestHeading: "¿Tenés un pedido a medida?",
    customRequestDesc: "Hablás directamente con nuestro equipo creativo senior.",
    customRequestCta: "Escribinos",
    items: [
      {
        question: "¿Qué tan rápido recibiré mis diseños?",
        answer:
          "La mayoría de las solicitudes se entregan en un promedio de 48 horas hábiles. Proyectos complejos como sitios web completos, mockups de packaging 3D detallados o manuales de identidad de marca se dividen en entregas parciales cada 48 horas.",
      },
      {
        question: "¿Cómo funciona la función de pausa?",
        answer:
          "Los ciclos de facturación se basan en periodos de 31 días. Si te suscribís, usás el servicio durante 21 días y decidís pausar, los 10 días restantes quedan guardados en tu cuenta indefinidamente hasta que decidas reactivar.",
      },
      {
        question: "¿Realmente no hay límite de pedidos de diseño?",
        answer:
          "Exacto, no hay límites. Una vez suscripto, podés agregar tantos pedidos a tu cola como desees. Los iremos trabajando de forma secuencial, uno a la vez (o en paralelo según tu plan).",
      },
      {
        question: "¿Quién diseña realmente las piezas?",
        answer:
          "Trabajás directamente con nuestro equipo creativo senior interno, liderado por directores de arte y diseñadores de marca experimentados. Cero pasantes junior ni freelancers tercerizados al azar.",
      },
      {
        question: "¿Qué pasa si no me convence un diseño?",
        answer:
          "Ningún problema. Hacemos todas las revisiones e iteraciones necesarias hasta que estés 100% satisfecho con el resultado final.",
      },
      {
        question: "¿Hay algún tipo de trabajo que no cubran?",
        answer:
          "No realizamos modelado y animación de personajes 3D complejos, desarrollo nativo de apps móviles (Swift/Kotlin) ni maquetación editorial extensa (>50 páginas). Todo lo demás en branding, packaging, web, UI/UX y diseño de marketing está 100% cubierto.",
      },
    ],
  },
  cta: {
    sticker: "Intro gratis",
    heading: "Comprobá si Puff es ideal para vos",
    headingHighlight: "(totalmente lo es)",
    description: "Agendá un recorrido guiado rápido de 15 minutos por Puff.",
    panelTag: "Próximo paso",
    panelTitle: "Agendá una llamada corta",
    panelDesc: "Conocé a tus líderes de diseño, revisá tus prioridades y resolvé tus dudas sobre tiempos de entrega.",
    panelButton: "Agendar llamada",
  },
  footer: {
    contactTag: "Contacto",
    contactText:
      "Servicio de suscripción de diseño a demanda: packaging, identidad de marca y piezas de marketing de alta conversión.",
    navLinks: [
      { label: "Cómo Funciona", href: "#how-it-works" },
      { label: "Precios", href: "#pricing" },
      { label: "Trabajos", href: "#work" },
      { label: "Preguntas", href: "#faq" },
    ],
    legalLinks: [
      { label: "Política de Privacidad", href: "/privacy" },
      { label: "Términos y Condiciones", href: "/terms" },
    ],
    copyright: "Todos los derechos reservados.",
  },
};
