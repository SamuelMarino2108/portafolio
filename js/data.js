/*
 * Portfolio content.
 * Edit texts, projects and links here — the HTML is rendered from this object.
 * Paths are relative so the site works under /portafolio/ on GitHub Pages.
 *
 * - PORTFOLIO.common: data that is the same in every language (links, files, stack).
 * - PORTFOLIO.es / PORTFOLIO.en: translated content + `ui` (fixed interface texts).
 *   Both language trees must have the same keys.
 * - Projects are split: links/stack live in common.projects, and each language
 *   adds title/description under projects[id].
 */
const PORTFOLIO = {
  common: {
    name: "Samuel Mariño",
    status: "open_to_work",
    photo: "assets/img/samuel-marino.jpeg",
    cv: "assets/cv-samuel-marino.pdf",
    contact: {
      github: "https://github.com/SamuelMarino2108",
      linkedin: "https://www.linkedin.com/in/samuel-edgardo-marino-medina",
      linkedinHandle: "in/samuel-edgardo-marino-medina",
      email: "samuel.e.marino@hotmail.com",
      whatsappPhone: "573212136560",
    },
    // `type` picks the badge: "wip" (in development) or "academic". Leave it out for none.
    projects: [
      { id: "orders", stack: ["ASP.NET Core", "PostgreSQL", "JWT", "FluentValidation"], github: "#", demo: "#" },
      { id: "ocr", stack: ["Google Apps Script", "Google Drive", "Google Sheets", "OCR"], github: "#", demo: "#" },
      { id: "cod", stack: ["C#", ".NET"], type: "wip", github: "#", demo: "#" },
      { id: "routes", stack: ["Python"], type: "academic", github: "#", demo: "#" },
    ],
  },

  /* ==================== Español ==================== */
  es: {
    meta: {
      title: "Samuel Mariño — Desarrollador Backend .NET",
      description: "Portafolio de Samuel Mariño, desarrollador backend .NET en Bogotá, Colombia. C#, ASP.NET Core, Entity Framework Core, SQL Server y PostgreSQL.",
    },

    ui: {
      skipLink: "Saltar al contenido",
      navLabel: "Principal",
      brandLabel: "Samuel Mariño, ir al inicio",
      menuOpen: "Abrir menú",
      menuClose: "Cerrar menú",
      nav: {
        "sobre-mi": "sobre mí",
        skills: "stack",
        proyectos: "proyectos",
        experiencia: "experiencia",
        educacion: "educación",
        contacto: "contacto",
      },
      themeText: "tema",
      themeToLight: "Cambiar a modo claro",
      themeToDark: "Cambiar a modo oscuro",
      langLabel: "Switch to English", // read in the language the button switches to
      sections: {
        about: { label: "sobre mí", title: "Backend con los pies en la operación." },
        skills: { label: "stack", title: "Herramientas con las que trabajo." },
        projects: { label: "proyectos", title: "Problemas reales, soluciones simples." },
        experience: { label: "experiencia", title: "Dónde he trabajado." },
        education: { label: "educación", title: "Formación." },
        contact: { label: "contacto", title: "Hablemos." },
      },
      downloadCv: "Descargar CV",
      contactCta: "Contacto",
      terminalLabel: "Estado actual",
      badges: { wip: "En desarrollo", academic: "Académico" },
      projectCode: "Código de {title} en GitHub",
      projectDemo: "Demo de {title}",
      email: "Correo",
      whatsappHandle: "Escríbeme directamente",
      newTab: "(se abre en una pestaña nueva)",
      copyEmail: "Copiar correo",
      copied: "¡Copiado!",
      copyFailed: "No se pudo copiar",
      whatsappMessage: "Hola Samuel, vi tu portafolio y me gustaría hablar contigo sobre una oportunidad.",
      footerTech: "html + css + js · sin frameworks",
      backToTop: "volver arriba ↑",
    },

    profile: {
      role: "Desarrollador Backend .NET",
      location: "Bogotá, Colombia",
      tagline: "Construyo APIs y sistemas backend claros, mantenibles y sin sobreingeniería.",
      photoAlt: "Foto de Samuel Mariño",
    },

    about: {
      text: "Estudiante de Ingeniería de Sistemas en la Universidad EAN y técnico en programación del SENA. Experiencia como desarrollador y soporte técnico con C# y ASP.NET Core. Antes trabajé en logística de última milla, lo que me dio una visión práctica de los problemas reales de operación que hoy intento resolver con software. Me importa el código limpio, las arquitecturas simples y evitar la sobreingeniería.",
      availability: "Abierto a trabajo remoto, híbrido o presencial (incluido remoto internacional).",
      modes: ["remoto", "híbrido", "presencial", "remoto_internacional"],
    },

    skills: [
      { group: "Backend", items: ["C#", "ASP.NET Core (MVC y Web API)", "Entity Framework Core"] },
      { group: "Bases de datos", items: ["SQL Server", "PostgreSQL", "MongoDB"] },
      { group: "Seguridad / APIs", items: ["JWT", "FluentValidation", "Rate limiting", "CORS"] },
      { group: "Otros lenguajes", items: ["Python", "JavaScript", "C"] },
      { group: "Herramientas", items: ["Git / GitHub", "Azure DevOps", "Postman", "Docker"] },
      { group: "Idiomas", items: ["Español (nativo)", "Inglés (C1)"] },
    ],

    projects: {
      orders: {
        title: "OrderManagementApi",
        description: "Sistema de gestión de pedidos mensuales y catálogos de productos para hasta 15 empresas. Roles admin/usuario, estado del pedido calculado dinámicamente, ventana de edición de 5 días, soft-delete y exportación a Excel.",
      },
      ocr: {
        title: "Buscador de remesas con OCR",
        description: "Automatización que lee con OCR fotos de guías de envío, las renombra por número de guía, las registra en una hoja de cálculo y ofrece un buscador web.",
      },
      cod: {
        title: "Conciliador COD + Monitor de envíos",
        description: "Herramienta para conciliar pagos contra-entrega y monitorear novedades de envíos de múltiples transportadoras.",
      },
      routes: {
        title: "Sistema de rutas de entrega con grafos",
        description: "Cálculo de rutas óptimas con Dijkstra y Floyd-Warshall.",
      },
    },

    education: [
      { title: "Ingeniería de Sistemas", institution: "Universidad EAN", period: "2026 – 2030 (esperado)" },
      { title: "Tecnólogo en Análisis y Desarrollo de Software", institution: "SENA", period: "Finalizado (certificación en trámite)" },
      { title: "Técnico en Programación de Aplicaciones para Dispositivos Móviles", institution: "SENA", period: "2024" },
    ],

    experience: [
      { role: "Desarrollador y Soporte Técnico", company: "Aurotech", period: "feb 2026 – ago 2026", stack: ["C#", "ASP.NET Core MVC", "EF Core", "SQL Server"] },
      { role: "Repartidor de última milla", company: "Proships", period: "2023 – 2026", stack: [] },
    ],

    contact: {
      intro: "¿Tienes una vacante, un proyecto o quieres hablar de backend? Escríbeme.",
    },
  },

  /* ==================== English ==================== */
  en: {
    meta: {
      title: "Samuel Mariño — .NET Backend Developer",
      description: "Portfolio of Samuel Mariño, a .NET backend developer based in Bogotá, Colombia. C#, ASP.NET Core, Entity Framework Core, SQL Server and PostgreSQL.",
    },

    ui: {
      skipLink: "Skip to content",
      navLabel: "Main",
      brandLabel: "Samuel Mariño, go to top",
      menuOpen: "Open menu",
      menuClose: "Close menu",
      nav: {
        "sobre-mi": "about",
        skills: "stack",
        proyectos: "projects",
        experiencia: "experience",
        educacion: "education",
        contacto: "contact",
      },
      themeText: "theme",
      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",
      langLabel: "Cambiar a español",
      sections: {
        about: { label: "about", title: "Backend grounded in real operations." },
        skills: { label: "stack", title: "Tools I work with." },
        projects: { label: "projects", title: "Real problems, simple solutions." },
        experience: { label: "experience", title: "Where I've worked." },
        education: { label: "education", title: "Education." },
        contact: { label: "contact", title: "Let's talk." },
      },
      downloadCv: "Download CV",
      contactCta: "Contact",
      terminalLabel: "Current status",
      badges: { wip: "In development", academic: "Academic" },
      projectCode: "{title} source code on GitHub",
      projectDemo: "{title} demo",
      email: "Email",
      whatsappHandle: "Message me directly",
      newTab: "(opens in a new tab)",
      copyEmail: "Copy email",
      copied: "Copied!",
      copyFailed: "Couldn't copy",
      whatsappMessage: "Hi Samuel, I came across your portfolio and would like to talk to you about an opportunity.",
      footerTech: "html + css + js · no frameworks",
      backToTop: "back to top ↑",
    },

    profile: {
      role: ".NET Backend Developer",
      location: "Bogotá, Colombia",
      tagline: "I build clear, maintainable APIs and backend systems — without overengineering.",
      photoAlt: "Photo of Samuel Mariño",
    },

    about: {
      text: "Systems Engineering student at Universidad EAN and programming technician from SENA, Colombia's national training service. I've worked as a developer and technical support engineer with C# and ASP.NET Core. Before that I worked in last-mile logistics, which gave me a hands-on view of the real operational problems I now try to solve with software. I care about clean code, simple architectures and avoiding overengineering.",
      availability: "Open to remote, hybrid or on-site roles (including international remote).",
      modes: ["remote", "hybrid", "on_site", "international_remote"],
    },

    skills: [
      { group: "Backend", items: ["C#", "ASP.NET Core (MVC & Web API)", "Entity Framework Core"] },
      { group: "Databases", items: ["SQL Server", "PostgreSQL", "MongoDB"] },
      { group: "Security / APIs", items: ["JWT", "FluentValidation", "Rate limiting", "CORS"] },
      { group: "Other languages", items: ["Python", "JavaScript", "C"] },
      { group: "Tools", items: ["Git / GitHub", "Azure DevOps", "Postman", "Docker"] },
      { group: "Languages", items: ["Spanish (native)", "English (C1)"] },
    ],

    projects: {
      orders: {
        title: "OrderManagementApi",
        description: "Monthly order and product catalog management for up to 15 companies. Admin and user roles, order status computed on the fly, a 5-day edit window, soft delete and Excel export.",
      },
      ocr: {
        title: "OCR shipping-label finder",
        description: "Automation that reads photos of shipping labels with OCR, renames each file by tracking number, logs it in a spreadsheet and provides a web search tool.",
      },
      cod: {
        title: "COD reconciler + shipment monitor",
        description: "Tool to reconcile cash-on-delivery payments and track shipment exceptions across multiple carriers.",
      },
      routes: {
        title: "Graph-based delivery routing",
        description: "Optimal route calculation using Dijkstra and Floyd-Warshall.",
      },
    },

    education: [
      { title: "B.S. in Systems Engineering", institution: "Universidad EAN", period: "2026 – 2030 (expected)" },
      { title: "Software Analysis and Development Technologist", institution: "SENA", period: "Completed (certificate pending)" },
      { title: "Mobile Application Programming Technician", institution: "SENA", period: "2024" },
    ],

    experience: [
      { role: "Developer & Technical Support", company: "Aurotech", period: "Feb 2026 – Aug 2026", stack: ["C#", "ASP.NET Core MVC", "EF Core", "SQL Server"] },
      { role: "Last-mile delivery driver", company: "Proships", period: "2023 – 2026", stack: [] },
    ],

    contact: {
      intro: "Have an opening, a project, or just want to talk backend? Get in touch.",
    },
  },
};
