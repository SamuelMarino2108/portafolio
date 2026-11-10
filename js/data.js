/*
 * Portfolio content.
 * Edit texts, projects and links here — the HTML is rendered from this object.
 * Paths are relative so the site works under /portafolio/ on GitHub Pages.
 */
const PORTFOLIO = {
  profile: {
    name: "Samuel Mariño",
    role: "Desarrollador Backend .NET",
    location: "Bogotá, Colombia",
    status: "open_to_work",
    tagline: "Construyo APIs y sistemas backend claros, mantenibles y sin sobreingeniería.",
    photo: "assets/img/samuel-marino.jpeg",
    photoAlt: "Foto de Samuel Mariño",
    cv: "assets/cv-samuel-marino.pdf",
  },

  about: {
    text: "Estudiante de Ingeniería de Sistemas en la Universidad EAN y técnico en programación del SENA. Experiencia como desarrollador y soporte técnico con C# y ASP.NET Core. Antes trabajé en logística de última milla, lo que me dio una visión práctica de los problemas reales de operación que hoy intento resolver con software. Me importa el código limpio, las arquitecturas simples y evitar la sobreingeniería.",
    availability: "Abierto a trabajo remoto, híbrido o presencial (incluido remoto internacional).",
    modes: ["remoto", "híbrido", "presencial", "remoto_internacional"],
  },

  skills: [
    { group: "Backend", items: ["C#", "ASP.NET Core (MVC y Web API)", "Entity Framework Core"] },
    { group: "Bases de datos", items: ["SQL Server", "PostgreSQL"] },
    { group: "Seguridad / APIs", items: ["JWT", "FluentValidation", "Rate limiting", "CORS"] },
    { group: "Otros lenguajes", items: ["Python", "C", "Kotlin"] },
    { group: "Herramientas", items: ["Git (Conventional Commits)", "Visual Studio", "Google Apps Script", "Google Sheets"] },
    { group: "Idiomas", items: ["Español (nativo)", "Inglés (C1)", "Portugués (intermedio)"] },
  ],

  projects: [
    {
      title: "OrderManagementApi",
      description: "Sistema de gestión de pedidos mensuales y catálogos de productos para hasta 15 empresas. Roles admin/usuario, estado del pedido calculado dinámicamente, ventana de edición de 5 días, soft-delete y exportación a Excel.",
      stack: ["ASP.NET Core", "PostgreSQL", "JWT", "FluentValidation"],
      github: "#",
      demo: "#",
    },
    {
      title: "Buscador de remesas con OCR",
      description: "Automatización que lee con OCR fotos de guías de envío, las renombra por número de guía, las registra en una hoja de cálculo y ofrece un buscador web.",
      stack: ["Google Apps Script", "Google Drive", "Google Sheets", "OCR"],
      github: "#",
      demo: "#",
    },
    {
      title: "Conciliador COD + Monitor de envíos",
      description: "Herramienta para conciliar pagos contra-entrega y monitorear novedades de envíos de múltiples transportadoras.",
      stack: ["C#", ".NET"],
      badge: "En desarrollo",
      github: "#",
      demo: "#",
    },
    {
      title: "Sistema de rutas de entrega con grafos",
      description: "Cálculo de rutas óptimas con Dijkstra y Floyd-Warshall.",
      stack: ["Python"],
      badge: "Académico",
      github: "#",
      demo: "#",
    },
  ],

  education: [
    { title: "Ingeniería de Sistemas", institution: "Universidad EAN", period: "2026 – en curso" },
    { title: "Tecnólogo en Análisis y Desarrollo de Software", institution: "SENA", period: "Finalizado (certificación en trámite)" },
    { title: "Técnico en Programación de Aplicaciones para Dispositivos Móviles", institution: "SENA", period: "2024" },
  ],

  experience: [
    {
      role: "Desarrollador y Soporte Técnico",
      company: "Aurotech",
      period: "feb 2026 – ago 2026",
      stack: ["C#", "ASP.NET Core MVC", "EF Core", "SQL Server"],
    },
    {
      role: "Repartidor de última milla",
      company: "Proships",
      period: "2023 – 2026",
      stack: [],
    },
  ],

  contact: {
    intro: "¿Tienes una vacante, un proyecto o quieres hablar de backend? Escríbeme.",
    github: "https://github.com/SamuelMarino2108",
    linkedin: "https://www.linkedin.com/in/samuel-edgardo-marino-medina",
    whatsapp: {
      phone: "57TUNUMERO", // placeholder: country code + number, digits only
      message: "Hola Samuel, vi tu portafolio y me gustaría hablar contigo sobre una oportunidad.",
    },
  },
};
