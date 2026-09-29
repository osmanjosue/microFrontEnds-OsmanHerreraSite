// ===========================================================================
// CONFIGURACIÓN CENTRALIZADA DEL SITIO (FUENTE ÚNICA DE VERDAD BILINGÜE)
// ===========================================================================
//
// GUÍA DE MANTENIMIENTO:
//
// 1. CÓMO EDITAR UN TEXTO:
//    - Todo texto visible en el sitio es de tipo Localized<T>, es decir:
//      { es: 'Texto en español', en: 'Text in English' }
//    - Modifica ambas cadenas. Si dejas una clave ausente, TypeScript
//      impedirá compilar alertando de la falta de traducción.
//    - Para textos enriquecidos (RichText), edita los arrays en ambas claves
//      preservando los segmentos ({ text, highlight, bold, href }).
//
// 2. CÓMO AGREGAR UN PROYECTO:
//    - Dirígete a la sección `projects.items`.
//    - Agrega un nuevo objeto de tipo Project con todos sus campos bilingües:
//      {
//        id: 'nuevo-proyecto',
//        category: 'web' | 'modulos' | 'diseno' | 'datos',
//        badge: { es: 'DESTACADO', en: 'FEATURED' },
//        title: { es: 'Nombre', en: 'Name' },
//        description: { es: 'Detalle...', en: 'Detail...' },
//        image: '/assets/images/projects/captura.webp',
//        technologies: ['React', 'TypeScript'],
//        links: [{ label: { es: 'Sitio Web', en: 'Website' }, url: 'https://...', icon: '/assets/icons/website.svg' }],
//        featured: true
//      }
//
// 3. CÓMO AGREGAR UN IDIOMA:
//    - En `shared/config/i18n.ts`, agrega el código de idioma a `LANGS`:
//      export const LANGS = ['es', 'en', 'fr'] as const;
//    - TypeScript exigirá automáticamente en `site.config.ts` la clave 'fr'
//      en cada objeto Localized.
//    - En `astro.config.mjs`, añade el nuevo idioma a `i18n.locales`.
//    - Agrega la correspondencia de rutas en `ROUTES` de `shared/config/i18n.ts`.
// ===========================================================================

import { ROUTES } from './i18n';
import type { SiteConfig } from './site.types';

export const CONTACT_EMAIL = 'contact@osmanherrera.dev';
export const PHONE = '+504 8970-9021';

export const MATERIAL_ICONS = [
  'arrow_back',
  'arrow_forward',
  'brush',
  'calendar_today',
  'check_circle',
  'close',
  'description',
  'download',
  'error',
  'home',
  'location_on',
  'mail',
  'menu',
  'north_east',
  'open_in_new',
  'person',
  'print',
  'refresh',
  'school',
  'send',
  'terminal',
  'verified',
  'view_in_ar',
  'workspace_premium',
] as const;

const TECHNOLOGIES = [
  'CSS',
  'HTML',
  'JavaScript',
  'TypeScript',
  'Angular',
  'React',
  'NodeJS',
  'GitHub',
  'Git',
  'MongoDB',
  'PostgreSQL',
  'Photoshop',
  'Illustrator',
  'JWT',
  'Python',
  'n8n',
  'Docker',
  'Nginx',
  'Linux',
];

export const siteConfig: SiteConfig = {
  routes: ROUTES,

  seo: {
    es: {
      title: 'Osman Herrera — Full Stack Developer · Automation & Data Engineer',
      description:
        'Portafolio profesional de Osman Herrera. Desarrollo web full stack, automatizaciones con IA y pipelines de datos en Python para clientes.',
      ogLocale: 'es_HN',
      ogLocaleAlternate: 'en_US',
    },
    en: {
      title: 'Osman Herrera — Full Stack Developer · Automation & Data Engineer',
      description:
        'Professional portfolio of Osman Herrera. Full stack web development, AI-powered automations, and Python data pipelines.',
      ogLocale: 'en_US',
      ogLocaleAlternate: 'es_HN',
    },
  },

  ui: {
    availableBadge: {
      es: 'DESARROLLADOR FREELANCER',
      en: 'FREELANCE DEVELOPER',
    },
    locationLabel: {
      es: 'UBICACIÓN',
      en: 'LOCATION',
    },
    vectorWorkBtn: {
      es: 'VECTOR WORK',
      en: 'VECTOR WORK',
    },
    langToggle: {
      es: 'EN',
      en: 'ES',
    },
    langToggleAria: {
      es: 'Cambiar idioma a inglés',
      en: 'Switch language to Spanish',
    },
    menuOpenAria: {
      es: 'Abrir menú de navegación',
      en: 'Open navigation menu',
    },
    menuCloseAria: {
      es: 'Cerrar menú de navegación',
      en: 'Close navigation menu',
    },
    viewDetails: {
      es: 'Ver detalles',
      en: 'View details',
    },
  },

  brand: {
    highlight: 'Osman',
    rest: 'Herrera.dev',
  },

  nav: [
    { label: { es: 'Inicio', en: 'Home' }, target: 'hero' },
    { label: { es: 'Habilidades', en: 'Skills' }, target: 'technologies' },
    { label: { es: 'Proyectos', en: 'Projects' }, target: 'projects' },
    { label: { es: 'Formación', en: 'Education' }, target: 'formation' },
    { label: { es: 'Experiencia', en: 'Experience' }, target: 'experience' },
    { label: { es: 'CV', en: 'CV' }, route: 'cv' },
    { label: { es: 'Contacto', en: 'Contact' }, target: 'contact' },
  ],

  vectorWorkLink: {
    label: { es: 'Vector Work', en: 'Vector Work' },
    targetRoute: 'vectorwork',
  },

  hero: {
    kicker: {
      es: 'EXP_REF // DOSSIER PROFESIONAL',
      en: 'EXP_REF // PROFESSIONAL DOSSIER',
    },
    location: {
      es: 'SIGUATEPEQUE, HN · GMT-6',
      en: 'SIGUATEPEQUE, HN · GMT-6',
    },
    stats: [
      {
        value: '3+',
        label: { es: 'Años en desarrollo web', en: 'Years in web development' },
      },
      {
        value: '11+',
        label: { es: 'Años en diseño gráfico', en: 'Years in graphic design' },
      },
      {
        value: String(TECHNOLOGIES.length),
        label: { es: 'Tecnologías', en: 'Technologies' },
      },
    ],
    title: {
      es: [
        'Desarrollo web con ',
        { text: 'lógica', highlight: true },
        ' y ',
        { text: 'pasión', highlight: true },
        '.',
      ],
      en: [
        'Web development with ',
        { text: 'logic', highlight: true },
        ' and ',
        { text: 'passion', highlight: true },
        '.',
      ],
    },
    subtitle: {
      es: 'Desarrollador Full Stack · Ingeniero de Automatización y Datos',
      en: 'Full Stack Developer · Automation & Data Engineer',
    },
    cta: {
      label: { es: 'Hablemos de tu proyecto', en: "Let's talk about your project" },
      target: 'contact',
    },
  },

  profile: {
    name: 'Osman Herrera',
    image: '/assets/images/IMG_20230209_080358.jpg',
    imageAlt: {
      es: 'Osman Herrera',
      en: 'Osman Herrera',
    },
    status: {
      es: 'DISPONIBLE PARA CONTRATACIÓN',
      en: 'AVAILABLE FOR HIRE',
    },
    focus: {
      es: 'Desarrollador Full Stack · Ingeniero de Automatización y Datos',
      en: 'Full Stack Developer · Automation & Data Engineer',
    },
    badges: [
      { es: 'Desarrollador FullStack', en: 'FullStack Developer' },
      { es: 'Diseñador Gráfico', en: 'Graphic Designer' },
      { es: 'Automatización y Datos', en: 'Automation & Data' },
    ],
    cv: {
      label: { es: 'Descargar CV', en: 'Download CV' },
      url: 'https://raw.githubusercontent.com/osmanjosue/pdfCv/main/CV_oherrera_dev_eng_2026.pdf',
      icon: '/assets/icons/Download_icon.svg',
    },
    bio: [
      {
        es: [
          { text: 'Construyo software que elimina trabajo manual.', highlight: true, bold: true },
          ' Desde 2023 diseño, despliego y mantengo aplicaciones web en producción, automatizaciones con IA y pipelines de datos en Python para clientes: frontends en Angular y React, APIs en Node.js, MongoDB y PostgreSQL, n8n con la API de OpenAI e infraestructura Linux propia. Antes y en paralelo, dirigí la operación nocturna y el cierre financiero de un hotel en Oracle OPERA, donde automaticé el reporte diario de ingresos de 2-4 horas a unos 5 minutos; atendí clientes norteamericanos como supervisor de escalamientos Tier 2; y cofundé y operé durante once años un negocio de diseño y estampado textil. Bilingüe inglés/español, en Honduras con horario compatible con EE. UU.',
        ],
        en: [
          { text: 'I build software that removes manual work.', highlight: true, bold: true },
          ' Since 2023 I have designed, deployed, and maintained production web applications, AI-powered automations, and Python data pipelines for paying clients: Angular and React front ends, Node.js APIs, MongoDB and PostgreSQL, n8n with the OpenAI API, and self-managed Linux infrastructure. Before and alongside that, I ran a hotel\'s overnight operation and financial close in Oracle OPERA, where I automated the daily revenue report from 2-4 hours to about 5 minutes; supported North American customers as a Tier 2 escalation supervisor; and co-founded and ran a design and apparel printing business for eleven years. Bilingual English/Spanish, based in Honduras with full U.S. time zone overlap.',
        ],
      },
    ],
  },

  socialIcons: [
    {
      title: 'linkedin',
      icon: '/assets/icons/social1.svg',
      address: 'https://www.linkedin.com/in/osmanherrera/',
    },
    {
      title: 'whatsapp',
      icon: '/assets/icons/social2.svg',
      address: 'https://wa.me/50489709021',
    },
    {
      title: 'email',
      icon: '/assets/icons/social3.svg',
      address: `mailto:${CONTACT_EMAIL}`,
    },
    {
      title: 'github',
      icon: '/assets/icons/social4.svg',
      address: 'https://github.com/osmanjosue',
    },
  ],

  skills: {
    title: {
      es: 'Habilidades Técnicas',
      en: 'Technical Skills',
    },
    technologies: TECHNOLOGIES,
  },

  projects: {
    title: {
      es: 'Proyectos Destacados',
      en: 'Featured Projects',
    },
    subtitle: {
      es: 'Casos de estudio, aplicaciones web y trabajos vectoriales',
      en: 'Case studies, web applications, and vector artwork',
    },
    kicker: {
      es: 'PORTFOLIO // SELECCIÓN DE TRABAJOS',
      en: 'PORTFOLIO // SELECTED WORKS',
    },
    filterAria: {
      es: 'Filtrar proyectos por categoría',
      en: 'Filter projects by category',
    },
    filters: [
      { id: 'all', label: { es: 'Todos', en: 'All' } },
      { id: 'web', label: { es: 'Web', en: 'Web' } },
      { id: 'modulos', label: { es: 'Módulos', en: 'Modules' } },
      { id: 'datos', label: { es: 'Datos', en: 'Data' } },
      { id: 'diseno', label: { es: 'Diseño', en: 'Design' } },
    ],
    items: [
      {
        id: 'night-audit-revenue-pipeline',
        category: 'datos',
        badge: { es: 'AUTOMATIZACIÓN', en: 'AUTOMATION' },
        title: {
          es: 'Night Audit Revenue Report Pipeline',
          en: 'Night Audit Revenue Report Pipeline',
        },
        description: {
          es: 'Pipeline en Python de cuatro etapas que automatiza la extracción, reconciliación y carga del reporte diario de ingresos desde Oracle OPERA hacia Excel. Reduce el tiempo de proceso de 2-4 horas a ~5 minutos, con validación estricta de 190 códigos de transacción.',
          en: 'Four-stage Python ETL pipeline automating extraction, reconciliation, and loading of daily revenue reports from Oracle OPERA to Excel. Slashes processing time from 2-4 hours to ~5 minutes, strictly validating 190 transaction codes.',
        },
        caseStudy: {
          problem: {
            es: 'Cada noche el reporte gerencial de ingresos del hotel se armaba a mano copiando tres reportes del PMS a un libro de Excel con macros: 2-4 horas de copiar y verificar. El PMS (Oracle OPERA, de escritorio) no tiene API.',
            en: 'Every night, the hotel\'s management revenue report was assembled by hand from three PMS reports into a macro-enabled Excel workbook: 2-4 hours of copying and checking. The PMS (Oracle OPERA, desktop) has no API.',
          },
          solution: {
            es: 'Un pipeline en Python de cuatro etapas: RPA exporta los reportes, se extrae el texto de los PDF y se parsea con regex hacia pandas, cada transacción se clasifica por su código numérico (190 códigos) y se agrupa por categoría, y los resultados se escriben en celdas fijas del libro del día sin tocar sus macros. Cualquier código desconocido detiene el proceso en lugar de producir un reporte descuadrado en silencio. Cada etapa guarda su propia copia para trazabilidad; se ejecuta desde una interfaz web local o por línea de comandos.',
            en: 'A four-stage Python pipeline: RPA exports the reports, text is extracted from the PDFs and parsed with regex into pandas, every transaction is classified by its numeric code (190 codes) and aggregated by category, and results are written into fixed cells of the day\'s workbook without touching its macros. Any unknown code stops the run instead of producing a silently wrong report. Each stage saves its own copy for traceability; runs from a local web UI or the command line.',
          },
          result: {
            es: 'De 2-4 horas a unos 5 minutos por noche, con menos errores de digitación. Hecho por iniciativa propia; el código anonimizado es público.',
            en: 'From 2-4 hours to about 5 minutes per night, with fewer entry errors. Built on my own initiative; anonymized code is public.',
          },
        },
        image: '/assets/images/projects/night-audit.svg',
        technologies: [
          'Python',
          'pandas',
          'openpyxl',
          'pdfplumber',
          'PyMuPDF',
          'tabula',
          'regex',
          'PyAutoGUI',
        ],
        links: [
          {
            label: { es: 'Ver Código', en: 'View Code' },
            url: 'https://github.com/osmanjosue/night-audit-revenue-report',
            icon: '/assets/icons/technologies-GitHub.svg',
          },
        ],
        featured: true,
      },
      {
        id: 'fundacion-prolancho-web',
        category: 'web',
        badge: { es: 'EN PRODUCCIÓN', en: 'IN PRODUCTION' },
        title: {
          es: 'Fundación Prolancho — Sitio web',
          en: 'Fundación Prolancho — Website',
        },
        description: {
          es: 'Desarrollo del sitio web con Angular 15 en frontend y NodeJS para API backend. Base de datos MongoDB con Cloudinary para gestión de imágenes. Autenticación con JWT y validación de credenciales para panel administrativo. Alojado en Hetzner con Ubuntu Server, NGINX y PM2.',
          en: 'Built the website with an Angular 15 frontend and a Node.js backend API. MongoDB database with Cloudinary for image management. JWT authentication and credential validation for the admin panel. Hosted on Hetzner with Ubuntu Server, NGINX, and PM2.',
        },
        image: '/assets/images/projects/prolancho-web.webp',
        technologies: ['Angular 15', 'NodeJS', 'MongoDB', 'JWT', 'Hetzner', 'NGINX'],
        links: [
          {
            label: { es: 'Sitio Web', en: 'Website' },
            url: 'https://www.fundacionprolancho.org',
            icon: '/assets/icons/website.svg',
          },
          {
            label: { es: 'Repositorio', en: 'Repository' },
            url: 'https://github.com/osmanjosue/fundacionProlanchoSiteFrontAndBack',
            icon: '/assets/icons/technologies-GitHub.svg',
          },
        ],
        featured: true,
      },
      {
        id: 'fundacion-prolancho-reclutamiento',
        category: 'modulos',
        badge: { es: 'NUEVO', en: 'NEW' },
        title: {
          es: 'Fundación Prolancho — Módulo de Reclutamiento y Gestión de Talento',
          en: 'Fundación Prolancho — Recruitment & Talent Management Module',
        },
        description: {
          es: 'Sistema web integral de captación y administración de postulaciones laborales. Diseñado para optimizar la recepción de talento mediante un formulario público interactivo con carga segura de hojas de vida (PDF en Cloudinary) y notificaciones automatizadas. Incluye un directorio privado de evaluación protegido por autenticación segura sin contraseña (Magic Links criptográficos vía email), permitiendo al equipo directivo filtrar, auditar y consultar perfiles en tiempo real sin exponer credenciales.',
          en: 'End-to-end web system for sourcing and managing job applications. Built to streamline talent intake through an interactive public form with secure résumé uploads (PDFs on Cloudinary) and automated notifications. It includes a private review directory protected by secure passwordless authentication (cryptographic Magic Links via email), letting the leadership team filter, audit, and browse profiles in real time without exposing credentials.',
        },
        image: '/assets/images/projects/prolancho-reclutamiento.webp',
        technologies: [
          'Angular 20',
          'NodeJS',
          'MongoDB',
          'JWT',
          'Cloudinary',
          'Hetzner',
          'Ubuntu Server',
        ],
        links: [
          {
            label: { es: 'Sitio Web', en: 'Website' },
            url: 'https://fundacionprolancho.org/trabaja-con-nosotros',
            icon: '/assets/icons/website.svg',
          },
        ],
        featured: false,
      },
      {
        id: 'drafrancisherrera-com',
        category: 'web',
        badge: { es: 'NUEVO', en: 'NEW' },
        title: {
          es: 'drafrancisherrera.com',
          en: 'drafrancisherrera.com',
        },
        description: {
          es: 'Proyecto freelance: sitio web profesional para una médica especialista en ginecología y obstetricia. Reserva de citas online, chat con IA que escala a WhatsApp y formulario de contacto, con todo el contenido centralizado en archivos de datos.',
          en: 'Freelance project: professional website for an OB-GYN specialist. Online appointment booking, an AI chat that escalates to WhatsApp, and a contact form, with all content centralized in data files.',
        },
        image: '/assets/images/projects/drafrancisherrera.webp',
        technologies: ['React 19', 'TypeScript', 'Vite', 'NodeJS', 'Cloudflare'],
        links: [
          {
            label: { es: 'Sitio Web', en: 'Website' },
            url: 'https://drafrancisherrera.com',
            icon: '/assets/icons/website.svg',
          },
        ],
        featured: false,
      },
      {
        id: 'vector-work',
        category: 'diseno',
        badge: { es: 'LABORATORIO VECTORIAL', en: 'VECTOR LAB' },
        title: {
          es: 'Vector Work',
          en: 'Vector Work',
        },
        description: {
          es: 'Galería de conversión raster a vector con visor interactivo de doble capa, modo outline e inspección de trazados vectoriales de alta precisión.',
          en: 'Raster-to-vector gallery featuring an interactive split-slider viewer, outline mode, and high-precision vector path inspection.',
        },
        image: '/assets/images/projects/vectorwork.webp',
        technologies: ['JavaScript', 'Vite', 'Tailwind CSS', 'Illustrator', 'SVG'],
        links: [
          {
            label: { es: 'Explorar Galería', en: 'Explore Gallery' },
            route: 'vectorwork',
            icon: '/assets/icons/website.svg',
          },
        ],
        featured: true,
      },
    ],
  },

  formation: {
    kicker: {
      es: 'ACADEMIA // CERTIFICACIONES TÉCNICAS',
      en: 'ACADEMICS // TECHNICAL CERTIFICATIONS',
    },
    educationTitle: {
      es: 'Educación Superior',
      en: 'Higher Education',
    },
    certificatesTitle: {
      es: 'Certificaciones Profesionales',
      en: 'Professional Certifications',
    },
    title: {
      es: 'Formación',
      en: 'Education',
    },
    education: [
      {
        platform: { es: 'UNIVERSIDAD', en: 'UNIVERSITY' },
        title: {
          es: 'Técnico Universitario en Desarrollo de Aplicaciones Computacionales',
          en: 'Associate Degree in Computer Application Development',
        },
        detail: {
          es: 'UTH • Estudiando Actualmente',
          en: 'UTH • In progress',
        },
      },
    ],
    certificates: [
      {
        platform: 'Udemy',
        title: 'Master en JavaScript: Aprender JS, jQuery, Angular, NodeJS',
        month: { es: 'Enero', en: 'January' },
        date: 2024,
        link: 'https://www.udemy.com/certificate/UC-53ecf1b8-00d0-49a5-a948-ae2e6d2ecfd0/',
      },
      {
        platform: 'Udemy',
        title: 'Angular Avanzado: Lleva tus bases al siguiente nivel - MEAN',
        month: { es: 'Agosto', en: 'August' },
        date: 2023,
        link: 'https://www.udemy.com/certificate/UC-03475c4f-f50b-491c-a1e2-4975b8aab381/',
      },
      {
        platform: 'Udemy',
        title: 'Automate the Boring Stuff with Python Programming',
        month: { es: 'TODO: confirmar', en: 'TODO: confirm' },
        date: 'TODO: confirmar',
        link: '',
      },
      {
        platform: 'Devtalles',
        title: 'GIT+GitHub: Todo un sistema de control de versiones de cero',
        month: { es: 'Abril', en: 'April' },
        date: 2024,
        link: 'https://cursos.devtalles.com/certificates/zl0noyjvkn',
      },
      {
        platform: 'Udemy',
        title: 'Alojamiento de sitio web en modo serverless en Amazon AWS',
        month: { es: 'Julio', en: 'July' },
        date: 2022,
        link: 'https://www.udemy.com/certificate/UC-4840328a-96c0-47c9-afa4-04f65c37096d/',
      },
    ],
    certificateLinkLabel: {
      es: 'Ver Certificado →',
      en: 'View Certificate →',
    },
  },

  experience: {
    kicker: {
      es: 'TRAYECTORIA // HISTORIAL LABORAL',
      en: 'CAREER // WORK HISTORY',
    },
    title: {
      es: 'Experiencia Profesional',
      en: 'Professional Experience',
    },
    subtitle: {
      es: 'Proyectos y roles que he desempeñado',
      en: 'Roles and projects I\'ve worked on',
    },
    items: [
      {
        role: {
          es: [
            'Desarrollador Web Freelance e ',
            { text: 'Ingeniero de Automatización', highlight: true },
          ],
          en: [
            'Freelance Web Developer & ',
            { text: 'Automation Engineer', highlight: true },
          ],
        },
        company: {
          es: 'Trabajador independiente (Freelance)',
          en: 'Self-employed (Freelance)',
        },
        period: {
          es: 'Nov 2023 – Presente',
          en: 'Nov 2023 – Present',
        },
        location: {
          es: 'Remoto',
          en: 'Remote',
        },
        description: {
          es: 'Gestiono cada proyecto de principio a fin como único punto de contacto: levantamiento de requisitos, desarrollo, despliegue y soporte en producción.',
          en: 'Own the full client engagement for paying customers: scoping, building, deploying, and supporting in production as sole point of contact.',
        },
        highlights: {
          es: [
            'Gestiono cada proyecto de principio a fin como único punto de contacto: levantamiento de requisitos, desarrollo, despliegue y soporte en producción.',
            'Construyo pipelines ETL (Python, webhooks, n8n) que extraen datos de sistemas origen, los limpian y mapean, y los sincronizan en el formato destino.',
            'drafrancisherrera.com: levanté requisitos con un consultorio médico y entregué un sitio en producción (React, Node.js) más un chatbot de WhatsApp que interpreta consultas en lenguaje natural con n8n y la API de OpenAI y las enruta al miembro del personal correcto, con manejo de casos sin coincidencia. Capacité al cliente; contrato de mantenimiento de un año.',
            'Implementé envío y validación de correos transaccionales con Resend y Brevo.',
          ],
          en: [
            'Own the full client engagement for paying customers: scoping, building, deploying, and supporting in production as sole point of contact.',
            'Build ETL pipelines (Python, webhooks, n8n) that extract structured data from source systems, clean and map it, and sync it into target formats.',
            'drafrancisherrera.com: gathered requirements from a medical practice and delivered a production site (React, Node.js) plus a WhatsApp chatbot that interprets natural-language patient inquiries through n8n and the OpenAI API and routes them to the right staff member, with fallback handling. Trained the client on the system; retained under a one-year maintenance contract.',
            'Implemented transactional email dispatch and validation workflows with Resend and Brevo.',
          ],
        },
        technologies: [
          'Python',
          'Node.js',
          'React',
          'n8n',
          'OpenAI API',
          'Resend',
          'Brevo',
          'Webhooks',
        ],
        links: [
          {
            label: { es: 'Sitio Web', en: 'Website' },
            url: 'https://drafrancisherrera.com',
            icon: '/assets/icons/website.svg',
          },
        ],
      },
      {
        role: {
          es: [
            'Desarrollador Web y ',
            { text: 'Arquitecto', highlight: true },
          ],
          en: [
            'Web Developer & ',
            { text: 'Architect', highlight: true },
          ],
        },
        company: {
          es: 'Fundación Prolancho',
          en: 'Fundación Prolancho',
        },
        period: {
          es: '2023 – Presente',
          en: '2023 – Present',
        },
        location: {
          es: 'Remoto (Honduras)',
          en: 'Remote (Honduras)',
        },
        description: {
          es: 'Responsable técnico único de una plataforma de RR. HH. full stack (Angular + API REST en Node.js): diseñé el modelo de datos y la arquitectura en MongoDB, implementé autenticación JWT con control de acceso por roles y construí los dashboards por rol que usa la organización.',
          en: 'Sole technical owner of a full-stack HR platform (Angular + Node.js REST API): designed the data model and MongoDB architecture, implemented JWT authentication with role-based access rules, and built the per-role dashboards a live organization uses to manage its records.',
        },
        highlights: {
          es: [
            'Responsable técnico único de una plataforma de RR. HH. full stack (Angular + API REST en Node.js): diseñé el modelo de datos y la arquitectura en MongoDB, implementé autenticación JWT con control de acceso por roles y construí los dashboards por rol que usa la organización.',
            'Entregué de punta a punta un módulo de Talento/Reclutamiento: formulario público de postulación con carga de CV limitada por tasa (Cloudinary), acceso escalonado por magic link (JWT) a un directorio de candidatos de solo lectura con ocultamiento de campos, y flujo de revisión administrativo.',
            'Despliego y administro el entorno de producción (Ubuntu, Nginx como reverse proxy, PM2, SSL); migré el hosting de AWS EC2 a un servidor cloud en Hetzner, responsable de la disponibilidad y la resolución de incidencias.',
            'Lideré el proyecto desde la planificación y los requisitos con la organización hasta el lanzamiento y las nuevas funcionalidades.',
          ],
          en: [
            'Sole technical owner of a full-stack HR platform (Angular + Node.js REST API): designed the data model and MongoDB architecture, implemented JWT authentication with role-based access rules, and built the per-role dashboards a live organization uses to manage its records.',
            'Shipped a Talent/Recruitment module end to end: a public Careers application form with rate-limited resume uploads (Cloudinary), a tiered magic-link (JWT) access system for a read-only candidate directory with field-level redaction, and an admin review workflow.',
            'Deploy and administer the production environment (Ubuntu, Nginx reverse proxy, PM2, SSL); migrated hosting from AWS EC2 to a Hetzner cloud server, accountable for uptime and issue resolution.',
            'Led the project from initial planning and requirements with the organization through launch and ongoing feature requests.',
          ],
        },
        technologies: [
          'Angular',
          'Node.js',
          'MongoDB',
          'JWT',
          'Cloudinary',
          'Ubuntu',
          'Nginx',
          'PM2',
          'Hetzner',
          'AWS EC2',
        ],
        links: [
          {
            label: { es: 'Repositorio', en: 'Repository' },
            url: 'https://github.com/osmanjosue/fundacionProlanchoSiteFrontAndBack',
            icon: '/assets/icons/technologies-GitHub.svg',
          },
          {
            label: { es: 'Sitio Web', en: 'Website' },
            url: 'https://fundacionprolancho.org',
            icon: '/assets/icons/website.svg',
          },
        ],
      },
      {
        role: {
          es: [
            'Auditor Nocturno y ',
            { text: 'Manager on Duty', highlight: true },
          ],
          en: [
            'Night Auditor & ',
            { text: 'Manager on Duty', highlight: true },
          ],
        },
        company: {
          es: 'Hyatt Place San Pedro Sula',
          en: 'Hyatt Place San Pedro Sula',
        },
        period: {
          es: 'Sep 2024 – Ene 2026',
          en: 'Sep 2024 – Jan 2026',
        },
        location: {
          es: 'San Pedro Sula, Honduras',
          en: 'San Pedro Sula, Honduras',
        },
        description: {
          es: 'Por iniciativa propia diseñé y construí un pipeline ETL de cuatro etapas en Python que genera el reporte diario de ingresos: RPA sobre Oracle OPERA (sin API) con PyAutoGUI, extracción de tres fuentes PDF, parsing con regex hacia pandas, mapeo de 190 códigos de transacción y una validación que detiene el proceso ante cualquier código sin mapear.',
          en: 'Designed and built, on my own initiative, a four-stage Python ETL pipeline that generates the daily revenue report end to end: RPA against Oracle OPERA (no API available) with PyAutoGUI, extraction from three PDF sources, regex parsing into pandas, mapping across 190 transaction codes, and an integrity check that fails loudly on any unmapped code.',
        },
        highlights: {
          es: [
            'Por iniciativa propia diseñé y construí un pipeline ETL de cuatro etapas en Python que genera el reporte diario de ingresos: RPA sobre Oracle OPERA (sin API) con PyAutoGUI, extracción de tres fuentes PDF, parsing con regex hacia pandas, mapeo de 190 códigos de transacción y una validación que detiene el proceso ante cualquier código sin mapear. Salida al libro de Excel existente preservando macros. De 2-4 horas a ~5 minutos. Versión anonimizada en GitHub.',
            'Diseñé una validación de integridad que detiene el proceso ante cualquier código sin mapear, para que ninguna cifra incompleta llegue al reporte financiero.',
            'Ejecuté sin supervisión el cierre financiero nocturno en Oracle OPERA con fecha límite fija: conciliación, manejo de excepciones y validación de las cifras que gerencia usaba cada mañana.',
            'Única persona a cargo del hotel de noche: recepción, check-in y check-out, solicitudes de huéspedes (desde comida del market hasta almohadas y sábanas), coordinación del personal de seguridad, acceso de proveedores, emergencias médicas y problemas de mantenimiento con proveedores externos.',
            'Referente de Oracle OPERA en la propiedad: capacité al personal de recepción en el sistema hasta que pudieran operar de forma independiente.',
            'Manejé a diario información personal y de pago de huéspedes conforme a las políticas de privacidad y seguridad.',
          ],
          en: [
            'Designed and built, on my own initiative, a four-stage Python ETL pipeline that generates the daily revenue report end to end: RPA against Oracle OPERA (no API available) with PyAutoGUI, extraction from three PDF sources, regex parsing into pandas, mapping across 190 transaction codes, and an integrity check that fails loudly on any unmapped code. Output written to the existing Excel workbook with macros preserved. Cut the task from 2-4 hours to roughly 5 minutes. Anonymized version on GitHub.',
            'Designed an integrity check that halts the run on any unmapped transaction code, so an incomplete figure never reaches a financial report silently; output written to Excel while preserving the existing workbook\'s macros and links.',
            'Ran the nightly financial close in Oracle OPERA unsupervised on a fixed deadline: reconciliation, exception handling, and validation of the figures management used to make decisions each morning. Accountable for numbers that had to be right the first time.',
            'Only staff member in charge of the property overnight: front desk, check-ins and check-outs, guest requests (from late-night meals from the market to linens), directing security staff, granting vendor access, handling medical emergencies, and resolving maintenance issues with outside vendors.',
            'Became the property\'s go-to person for Oracle OPERA and trained front desk staff on the system, walking non-technical colleagues through workflows until they could operate independently.',
            'Handled guest personal and payment-related information daily in line with the property\'s privacy and security policies.',
          ],
        },
        technologies: [
          'Python',
          'Oracle OPERA PMS',
          'pandas',
          'PyAutoGUI',
          'Excel',
          'openpyxl',
          'pdfplumber',
          'regex',
        ],
        links: [
          {
            label: { es: 'Repositorio', en: 'Repository' },
            url: 'https://github.com/osmanjosue/night-audit-revenue-report',
            icon: '/assets/icons/technologies-GitHub.svg',
          },
        ],
      },
      {
        role: {
          es: [
            'Cofundador y ',
            { text: 'Diseñador Gráfico', highlight: true },
          ],
          en: [
            'Co-founder & ',
            { text: 'Graphic Designer', highlight: true },
          ],
        },
        company: {
          es: 'Beo Shirts (Negocio de diseño y estampado textil)',
          en: 'Beo Shirts (Apparel printing & design business)',
        },
        period: {
          es: '2012 – 2023',
          en: '2012 – 2023',
        },
        location: {
          es: 'San Pedro Sula, Honduras (En paralelo a otros empleos)',
          en: 'San Pedro Sula, Honduras (Alongside other employment)',
        },
        description: {
          es: 'Diseño e ilustración de personajes y gráficos originales para estampado textil, incluyendo separación de colores para serigrafía y sublimación.',
          en: 'Designed and illustrated original characters and graphics for textile printing, including color separation for screen printing and sublimation.',
        },
        highlights: {
          es: [
            'Diseño e ilustración de personajes y gráficos originales para estampado textil, incluyendo separación de colores para serigrafía y sublimación.',
            'Planifiqué y ejecuté lanzamientos de productos en fechas fijas según metas acordadas, y creé y gestioné campañas publicitarias en Facebook.',
            'Cogestioné el negocio durante 11 años junto con otros empleos: registro de clientes, cotizaciones, programación de producción y seguimiento de entregas.',
          ],
          en: [
            'Designed and illustrated original characters and graphics for textile printing, including color separation for screen printing and sublimation.',
            'Planned and delivered product launches on fixed dates against goals agreed with partners, and created and managed Facebook advertising campaigns.',
            'Co-ran the business for 11 years alongside other employment: client records, quoting, production scheduling, and delivery tracking.',
          ],
        },
        technologies: [
          'Photoshop',
          'Illustrator',
          { es: 'Serigrafía', en: 'Screen Printing' },
          { es: 'Sublimación', en: 'Sublimation' },
          'Facebook Ads',
        ],
        links: [
          {
            label: { es: 'Página de Facebook', en: 'Facebook Page' },
            url: 'https://www.facebook.com/beomegusta/',
            icon: '/assets/icons/facebook.svg',
          },
        ],
      },
      {
        role: {
          es: [
            'Diseñador Gráfico y ',
            { text: 'Fotógrafo de Producto', highlight: true },
          ],
          en: [
            'Graphic Designer & ',
            { text: 'Product Photographer', highlight: true },
          ],
        },
        company: {
          es: 'Del Tropico Designs',
          en: 'Del Tropico Designs',
        },
        period: {
          es: 'Ene 2013 – Dic 2013',
          en: 'Jan 2013 – Dec 2013',
        },
        location: {
          es: 'San Pedro Sula, Honduras',
          en: 'San Pedro Sula, Honduras',
        },
        description: {
          es: 'Fotografía de productos (muebles), edición y retoque de imágenes y diagramación del catálogo en CorelDRAW.',
          en: 'Photographed furniture products (lighting and composition), then edited, retouched, and laid out the collection catalog in CorelDRAW.',
        },
        technologies: [
          'CorelDRAW',
          { es: 'Fotografía de Producto', en: 'Product Photography' },
          { es: 'Retoque Digital', en: 'Image Retouching' },
        ],
        links: [],
      },
      {
        role: {
          es: [
            'Especialista de Servicio al Cliente, promovido a ',
            { text: 'Supervisor de Escalamientos Tier 2', highlight: true },
          ],
          en: [
            'Customer Service Specialist, promoted to ',
            { text: 'Tier 2 Escalation Supervisor', highlight: true },
          ],
        },
        company: {
          es: 'Allied Global Technology Services',
          en: 'Allied Global Technology Services',
        },
        period: {
          es: '2014 – 2015',
          en: '2014 – 2015',
        },
        location: {
          es: 'San Pedro Sula, Honduras · Cliente: Operador móvil norteamericano',
          en: 'San Pedro Sula, Honduras · Client: North American mobile carrier',
        },
        description: {
          es: 'Soporte técnico en inglés para un operador móvil norteamericano: troubleshooting en vivo con metas de tiempo de respuesta. Promovido a supervisor de escalamientos Tier 2, a cargo de los casos que el primer nivel no podía resolver.',
          en: 'Technical support in English for a North American mobile carrier: live troubleshooting under response-time targets. Promoted to Tier 2 escalation supervisor, owning the cases first-line agents could not resolve.',
        },
        technologies: [
          'Tier 2 Escalations',
          { es: 'Soporte Técnico en Inglés', en: 'Technical Support' },
          { es: 'Resolución de Incidencias', en: 'Troubleshooting' },
        ],
        links: [],
      },
      {
        role: {
          es: [
            'Representante de ',
            { text: 'Servicio al Cliente', highlight: true },
          ],
          en: [
            'Customer Service ',
            { text: 'Representative', highlight: true },
          ],
        },
        company: {
          es: 'Startek',
          en: 'Startek',
        },
        period: {
          es: '2011 – 2012',
          en: '2011 – 2012',
        },
        location: {
          es: 'San Pedro Sula, Honduras · Cliente: T-Mobile (U.S.)',
          en: 'San Pedro Sula, Honduras · Client: T-Mobile (U.S.)',
        },
        description: {
          es: 'Atención telefónica en inglés a clientes de T-Mobile: consultas de cuenta, facturación y servicio.',
          en: 'Provided phone support in English to T-Mobile customers: account, billing, and service inquiries.',
        },
        technologies: [
          { es: 'Atención al Cliente (Inglés)', en: 'Customer Support' },
          { es: 'Facturación', en: 'Billing' },
          { es: 'Gestión de Cuentas', en: 'Account Management' },
        ],
        links: [],
      },
    ],
  },

  cv: {
    headline: {
      es: 'Desarrollador Full Stack · Ingeniero de Automatización y Datos',
      en: 'Full Stack Developer · Automation & Data Engineer',
    },
    location: {
      es: 'Siguatepeque, Comayagua, Honduras (GMT-6)',
      en: 'Siguatepeque, Honduras (GMT-6, full U.S./Canada time zone overlap)',
    },
    profileSummary: {
      es: 'Construyo software que elimina trabajo manual. Desde 2023 diseño, despliego y mantengo aplicaciones web en producción, automatizaciones con IA y pipelines de datos en Python para clientes: frontends en Angular y React, APIs en Node.js, MongoDB y PostgreSQL, n8n con la API de OpenAI e infraestructura Linux propia. Antes y en paralelo, dirigí la operación nocturna y el cierre financiero de un hotel en Oracle OPERA, donde automaticé el reporte diario de ingresos de 2-4 horas a unos 5 minutos; atendí clientes norteamericanos como supervisor de escalamientos Tier 2; y cofundé y operé durante once años un negocio de diseño y estampado textil. Bilingüe inglés/español, en Honduras con horario compatible con EE. UU.',
      en: 'I build software that removes manual work. Since 2023 I have designed, deployed, and maintained production web applications, AI-powered automations, and Python data pipelines for paying clients: Angular and React front ends, Node.js APIs, MongoDB and PostgreSQL, n8n with the OpenAI API, and self-managed Linux infrastructure. Before and alongside that, I ran a hotel\'s overnight operation and financial close in Oracle OPERA, where I automated the daily revenue report from 2-4 hours to about 5 minutes; supported North American customers as a Tier 2 escalation supervisor; and co-founded and ran a design and apparel printing business for eleven years. Bilingual English/Spanish, based in Honduras with full U.S. time zone overlap.',
    },
    whatIDo: [
      {
        id: 'dev',
        title: {
          es: 'Desarrollo de Software',
          en: 'Software Development',
        },
        description: {
          es: 'Aplicaciones web full stack en producción: Angular, React, Node.js, MongoDB, PostgreSQL, JWT/roles, despliegue en Linux.',
          en: 'Full-stack web apps in production: Angular, React, Node.js, MongoDB, PostgreSQL, JWT/RBAC, Linux deployment.',
        },
      },
      {
        id: 'data',
        title: {
          es: 'Datos y Automatización',
          en: 'Data & Automation',
        },
        description: {
          es: 'Pipelines ETL en Python, pandas, validación de datos, RPA, flujos en n8n y ruteo con LLM mediante la API de OpenAI.',
          en: 'Python ETL pipelines, pandas, data validation, RPA, n8n workflows, and LLM-powered routing with the OpenAI API.',
        },
      },
      {
        id: 'ops',
        title: {
          es: 'Operaciones y Clientes',
          en: 'Operations & Customers',
        },
        description: {
          es: 'Auditoría nocturna y manager on duty en Oracle OPERA, capacitación de personal y soporte Tier 2 en inglés.',
          en: 'Hotel night audit and manager on duty in Oracle OPERA, staff training, and Tier 2 customer support in English.',
        },
      },
      {
        id: 'design',
        title: {
          es: 'Diseño Gráfico',
          en: 'Graphic Design',
        },
        description: {
          es: 'Once años de ilustración, producción para estampado, lanzamientos de producto y marca para un negocio textil.',
          en: 'Eleven years of illustration, print production, product launches, and brand work for an apparel business.',
        },
      },
    ],
    skillGroups: [
      {
        title: { es: 'Lenguajes', en: 'Languages' },
        skills: [
          { name: 'TypeScript', level: 'core' },
          { name: 'JavaScript', level: 'core' },
          { name: 'Python', level: 'core' },
          { name: 'SQL', level: 'working' },
          { name: 'HTML5 / CSS3', level: 'core' },
        ],
      },
      {
        title: { es: 'Frontend', en: 'Frontend' },
        skills: [
          { name: 'Angular', level: 'core' },
          { name: 'React', level: 'working' },
          { name: 'RxJS', level: 'working' },
        ],
      },
      {
        title: { es: 'Backend', en: 'Backend' },
        skills: [
          { name: 'Node.js', level: 'core' },
          { name: 'Express', level: 'core' },
          { name: 'REST APIs', level: 'core' },
          { name: 'JWT auth / RBAC / magic links / rate limiting', level: 'core' },
        ],
      },
      {
        title: { es: 'Bases de datos', en: 'Databases' },
        skills: [
          { name: 'MongoDB', level: 'core' },
          { name: 'PostgreSQL', level: 'working' },
          { name: 'Data modeling / schema design', level: 'core' },
        ],
      },
      {
        title: { es: 'Datos', en: 'Data' },
        skills: [
          { name: 'pandas', level: 'core' },
          { name: 'openpyxl', level: 'core' },
          { name: 'PDF extraction (pdfplumber, PyMuPDF, tabula)', level: 'core' },
          { name: 'Regex parsing', level: 'core' },
          { name: 'ETL pipelines', level: 'core' },
          { name: 'Data validation / reconciliation / exception logs', level: 'core' },
          { name: 'Excel (formulas, lookups, pivot tables, data cleaning, macro-safe automation)', level: 'core' },
          { name: 'Google Sheets', level: 'working' },
          { name: 'JSON / CSV', level: 'core' },
          { name: 'Report design / KPI tracking', level: 'working' },
        ],
      },
      {
        title: { es: 'Automatización e IA', en: 'Automation & AI' },
        skills: [
          { name: 'n8n', level: 'core' },
          { name: 'Webhooks', level: 'core' },
          { name: 'OpenAI API', level: 'core' },
          { name: 'LLM classification & routing / WhatsApp chatbots', level: 'core' },
          { name: 'RPA (PyAutoGUI, image recognition)', level: 'core' },
          { name: 'Conditional routing, fallback logic, retries, error handling', level: 'core' },
          { name: 'AI assistants in daily work (ChatGPT, Claude, Gemini)', level: 'core' },
        ],
      },
      {
        title: { es: 'DevOps y Cloud', en: 'DevOps & Cloud' },
        skills: [
          { name: 'Linux (Ubuntu)', level: 'core' },
          { name: 'Nginx', level: 'core' },
          { name: 'PM2', level: 'core' },
          { name: 'SSL / Certbot', level: 'core' },
          { name: 'Docker', level: 'working' },
          { name: 'Hetzner', level: 'core' },
          { name: 'AWS (EC2, serverless hosting)', level: 'working' },
          { name: 'Git / GitHub', level: 'core' },
        ],
      },
      {
        title: { es: 'Servicios', en: 'Services' },
        skills: [
          { name: 'Cloudinary', level: 'working' },
          { name: 'Resend / Brevo', level: 'working' },
        ],
      },
      {
        title: { es: 'Sistemas de negocio', en: 'Business systems' },
        skills: [
          { name: 'Oracle OPERA PMS', level: 'core' },
          { name: 'Night audit / folio reconciliation / financial & occupancy reporting', level: 'core' },
          { name: 'Cash handling', level: 'core' },
        ],
      },
      {
        title: { es: 'Procesos', en: 'Process' },
        skills: [
          { name: 'Requirements gathering / scoping', level: 'core' },
          { name: 'User training & enablement', level: 'core' },
          { name: 'Process documentation / runbooks', level: 'working' },
          { name: 'Escalation handling / SLA & queue targets', level: 'core' },
          { name: 'PII handling', level: 'core' },
        ],
      },
      {
        title: { es: 'Diseño', en: 'Design' },
        skills: [
          { name: 'Adobe Illustrator', level: 'core' },
          { name: 'Adobe Photoshop', level: 'core' },
          { name: 'CorelDRAW', level: 'working' },
          { name: 'Character illustration', level: 'core' },
          { name: 'Color separation (screen printing, sublimation)', level: 'core' },
          { name: 'Product photography & retouching', level: 'working' },
          { name: 'Facebook Ads campaigns', level: 'working' },
        ],
      },
    ],
    strengths: {
      es: [
        'Atención al detalle',
        'Comunicación efectiva',
        'Resolución de problemas bajo presión',
        'Trabajo independiente',
        'Aprendizaje rápido de software',
        'Sentido de responsabilidad',
        'Capacitación a usuarios no técnicos',
      ],
      en: [
        'Attention to detail',
        'Clear communication',
        'Problem solving under pressure',
        'Works independently (unsupervised night shifts)',
        'Fast learner of new software',
        'Ownership',
        'Teaching non-technical users',
      ],
    },
    languages: [
      {
        language: { es: 'Español', en: 'Spanish' },
        level: { es: 'Nativo', en: 'Native' },
      },
      {
        language: { es: 'Inglés', en: 'English' },
        level: { es: 'Fluido', en: 'Fluent' },
      },
    ],
    aboutMe: {
      es: 'Antes del software pasé ocho años en la selección nacional de taekwondo de Honduras. Esa disciplina se quedó: aprendí a programar por mi cuenta desde 2022 mientras trabajaba de noche, y sigo prefiriendo demostrar con sistemas funcionando y resultados medibles.',
      en: 'Before software, I spent eight years on Honduras\' national taekwondo team. That discipline carried over: I learned to code on my own starting in 2022 while working nights, and I still prefer to prove things with working systems and measurable results.',
    },
    taekwondo: {
      es: 'Selección Nacional de Taekwondo de Honduras (2009-2017): clasificado a los Juegos Panamericanos Guadalajara 2011; bronce en los Juegos Centroamericanos 2010; plata en el Pan Am Open 2010 (Monterrey) y en el Open de Costa Rica 2012.',
      en: 'Honduras National Taekwondo Team (2009-2017): qualified for the 2011 Pan American Games (Guadalajara); bronze at the 2010 Central American Games; silver at the 2010 Pan Am Open (Monterrey) and 2012 Costa Rica Open.',
    },
    briefProjects: [
      {
        title: 'Self-hosted automation infrastructure',
        description: {
          es: 'Configuré y migré un entorno n8n autoalojado (Docker, Nginx, Certbot) en un servidor Linux de Hetzner para orquestaciones de datos.',
          en: 'Configured and migrated a self-hosted n8n environment (Docker, Nginx, Certbot) on a Hetzner Linux server for client data orchestrations.',
        },
        chips: ['n8n', 'Docker', 'Nginx', 'Certbot', 'Hetzner', 'Ubuntu'],
      },
      {
        title: 'E-learning data extraction pipeline',
        description: {
          es: 'Pipeline ETL automatizado (Python, webhooks, n8n) que extrae contenido de cursos técnicos y lo sincroniza en Markdown para una bóveda personal de conocimiento.',
          en: 'Automated ETL pipeline (Python, webhooks, n8n) que extrae contenido de cursos técnicos y lo sincroniza en Markdown para una bóveda personal de conocimiento.',
        },
        chips: ['Python', 'webhooks', 'n8n', 'Markdown'],
      },
      {
        title: 'Design portfolio & personal brand',
        description: {
          es: 'Identidad de marca personal (sistema de logos) y CVs diseñados en Adobe Illustrator; portafolio en osmanherrera.dev.',
          en: 'Personal brand identity (logo system) and self-designed résumé layouts in Adobe Illustrator; portfolio site at osmanherrera.dev.',
        },
        chips: [],
      },
    ],
    updated: '2026-09-28',
    ui: {
      viewCvBtn: { es: 'Ver CV', en: 'View CV' },
      printPdfBtn: { es: 'Imprimir / PDF', en: 'Print / PDF' },
      profileSection: { es: 'Perfil', en: 'Profile' },
      whatIDoSection: { es: 'Qué hago', en: 'What I do' },
      experienceSection: { es: 'Experiencia', en: 'Experience' },
      featuredProjectsSection: { es: 'Proyectos destacados', en: 'Featured projects' },
      skillsSection: { es: 'Habilidades', en: 'Skills' },
      strengthsSection: { es: 'Fortalezas', en: 'Strengths' },
      educationSection: { es: 'Educación y certificaciones', en: 'Education & certifications' },
      languagesSection: { es: 'Idiomas', en: 'Languages' },
      aboutMeSection: { es: 'Sobre mí', en: 'About me' },
      updatedLabel: { es: 'Actualizado', en: 'Updated' },
      viewCode: { es: 'Ver código', en: 'View code' },
      problemLabel: { es: 'Problema', en: 'Problem' },
      solutionLabel: { es: 'Solución', en: 'Solution' },
      resultLabel: { es: 'Resultado', en: 'Result' },
    },
  },

  contact: {
    title: {
      es: 'Contacto',
      en: 'Contact',
    },
    kicker: {
      es: 'COMUNICACIÓN // ENLACE DIRECTO',
      en: 'COMMUNICATION // DIRECT LINK',
    },
    subtitle: {
      es: 'Inicia una conversación o consulta disponibilidad para nuevos proyectos',
      en: 'Start a conversation or check availability for new projects',
    },
    intro: {
      es: '¿Tienes en mente un desarrollo web, arquitectura de frontend o diseño gráfico especializado? Contáctame a través de cualquiera de mis redes o deja un mensaje.',
      en: 'Have a web development project, frontend architecture, or specialized graphic design in mind? Reach out through any of my channels or send a message.',
    },
    channelsTitle: {
      es: 'Canales directos',
      en: 'Direct channels',
    },
    formTitle: {
      es: 'Mensaje Directo',
      en: 'Direct Message',
    },
    email: CONTACT_EMAIL,
  },

  contactForm: {
    name: {
      label: { es: 'Nombre / Empresa', en: 'Name / Company' },
      placeholder: { es: 'Tu nombre o empresa', en: 'Your name or company' },
    },
    email: {
      label: { es: 'Correo Electrónico', en: 'Email Address' },
      placeholder: { es: 'tu@email.com', en: 'you@email.com' },
    },
    message: {
      label: { es: 'Mensaje', en: 'Message' },
      placeholder: { es: 'Tu mensaje aquí...', en: 'Your message here...' },
    },
    minMessageLength: 10,
    errors: {
      nameRequired: {
        es: 'El nombre es obligatorio',
        en: 'Name is required',
      },
      emailRequired: {
        es: 'El correo es obligatorio',
        en: 'Email is required',
      },
      emailPattern: {
        es: 'El formato de correo no es válido',
        en: 'Please enter a valid email address',
      },
      messageRequired: {
        es: 'El mensaje es obligatorio',
        en: 'Message is required',
      },
      messageMinLength: {
        es: 'El mensaje debe tener al menos 10 caracteres',
        en: 'Message must be at least 10 characters',
      },
      formInvalid: {
        es: 'ℹ️ Completa correctamente todos los campos',
        en: 'ℹ️ Please fill out all fields correctly',
      },
    },
    submit: {
      es: 'Enviar Mensaje',
      en: 'Send Message',
    },
    sending: {
      es: 'Enviando...',
      en: 'Sending...',
    },
    note: {
      es: 'Responderé lo antes posible',
      en: 'I\'ll get back to you as soon as possible',
    },
    alerts: {
      success: {
        es: 'Mensaje enviado con éxito',
        en: 'Message sent successfully',
      },
      error: {
        es: 'No se pudo enviar el mensaje. Intenta de nuevo.',
        en: 'Your message couldn\'t be sent. Please try again.',
      },
      close: {
        es: 'Cerrar notificación',
        en: 'Close notification',
      },
    },
  },

  footer: {
    copyright: {
      es: '© 2026 Osman Herrera. Todos los derechos reservados.',
      en: '© 2026 Osman Herrera. All rights reserved.',
    },
    credit: {
      es: 'Diseñado y desarrollado con ❤️ por Osman Herrera',
      en: 'Designed and developed with ❤️ by Osman Herrera',
    },
    privacyLink: {
      label: {
        es: 'Política de Privacidad',
        en: 'Privacy Policy',
      },
      targetRoute: 'privacy',
    },
  },

  privacyPolicy: {
    kicker: {
      es: 'LEGAL // INFORMACIÓN LEGAL',
      en: 'LEGAL // LEGAL INFORMATION',
    },
    title: {
      es: ['Política de ', { text: 'Privacidad', highlight: true }],
      en: ['Privacy ', { text: 'Policy', highlight: true }],
    },
    owner: 'Osman Josue Herrera Perez',
    backLabel: {
      es: 'Volver al Inicio',
      en: 'Back to home',
    },
    homeLabel: {
      es: 'Ir al Inicio',
      en: 'Go to homepage',
    },
    lastUpdatedDate: '2026-05-28',
    lastUpdatedLabel: {
      es: 'Última actualización:',
      en: 'Last updated:',
    },
    intro: {
      es: [
        'En ',
        { text: 'Osman Josue Herrera Perez', highlight: true, bold: true },
        ', nos tomamos muy en serio la privacidad de tus datos. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos la información cuando interactúas con nuestra aplicación y servicios a través de la API de WhatsApp, de conformidad con las buenas prácticas de protección de datos y la legislación aplicable en Honduras.',
      ],
      en: [
        'At ',
        { text: 'Osman Josue Herrera Perez', highlight: true, bold: true },
        ', we take your data privacy very seriously. This Privacy Policy describes how we collect, use, and share information when you interact with our application and services through the WhatsApp API, in accordance with data protection best practices and applicable legislation in Honduras.',
      ],
    },
    sections: [
      {
        title: {
          es: '1. Información que recopilamos',
          en: '1. Information We Collect',
        },
        paragraphs: [
          {
            es: [
              'Cuando te comunicas con nosotros o utilizas nuestra aplicación a través de WhatsApp, podemos recopilar la siguiente información:',
            ],
            en: [
              'When you communicate with us or use our application through WhatsApp, we may collect the following information:',
            ],
          },
        ],
        cards: [
          {
            title: {
              es: 'Perfil de WhatsApp',
              en: 'WhatsApp Profile',
            },
            text: {
              es: 'Tu número de teléfono y el nombre de perfil público que tienes configurado en WhatsApp.',
              en: 'Your phone number and public profile name configured in WhatsApp.',
            },
          },
          {
            title: {
              es: 'Mensajes y contenido',
              en: 'Messages & Content',
            },
            text: {
              es: 'El texto de los mensajes, imágenes u otros archivos que envíes directamente a nuestro sistema o cuenta de WhatsApp Business para procesar tus solicitudes.',
              en: 'The text of messages, images, or other files you send directly to our system or WhatsApp Business account to process your requests.',
            },
          },
          {
            title: {
              es: 'Datos técnicos',
              en: 'Technical Data',
            },
            text: {
              es: 'Información básica sobre las interacciones, comandos y respuestas que se ejecutan dentro de la aplicación.',
              en: 'Basic information about interactions, commands, and responses executed within the application.',
            },
          },
        ],
      },
      {
        title: {
          es: '2. Cómo utilizamos tu información',
          en: '2. How We Use Your Information',
        },
        paragraphs: [
          {
            es: ['Utilizamos la información recopilada exclusivamente para los siguientes fines:'],
            en: ['We use the collected information exclusively for the following purposes:'],
          },
        ],
        bullets: [
          {
            es: ['Proporcionar, operar y mantener las funciones de nuestra aplicación y servicios de automatización.'],
            en: ['Provide, operate, and maintain the features of our application and automation services.'],
          },
          {
            es: ['Responder a tus consultas, comandos y mensajes de manera automatizada o personalizada.'],
            en: ['Respond to your inquiries, commands, and messages in an automated or personalized manner.'],
          },
          {
            es: ['Mejorar la experiencia de usuario y la calidad de nuestro servicio de atención.'],
            en: ['Improve user experience and the quality of our customer service.'],
          },
          {
            es: [
              { text: 'Envío de notificaciones y alertas:', bold: true },
              ' Enviar alertas automatizadas, recordatorios, actualizaciones del servicio o información relevante que hayas solicitado o que forme parte de la interacción con nuestros sistemas.',
            ],
            en: [
              { text: 'Notification and alert delivery:', bold: true },
              ' Send automated alerts, reminders, service updates, or relevant information that you requested or that forms part of the interaction with our systems.',
            ],
          },
        ],
      },
      {
        title: {
          es: '3. Uso de proveedores de servicios de terceros (Meta/WhatsApp)',
          en: '3. Use of Third-Party Service Providers (Meta/WhatsApp)',
        },
        paragraphs: [
          {
            es: [
              'Nuestra aplicación utiliza la API de WhatsApp Business, un servicio proporcionado por Meta Platforms, Inc. El procesamiento de tus mensajes está sujeto a las condiciones de servicio y políticas de privacidad de WhatsApp. No vendemos, alquilamos ni compartimos tu información personal con fines comerciales con ningún otro tercero.',
            ],
            en: [
              'Our application uses the WhatsApp Business API, a service provided by Meta Platforms, Inc. The processing of your messages is subject to WhatsApp terms of service and privacy policies. We do not sell, rent, or share your personal information for commercial purposes with any other third party.',
            ],
          },
        ],
      },
      {
        title: {
          es: '4. Retención y seguridad de los datos',
          en: '4. Data Retention and Security',
        },
        paragraphs: [
          {
            es: [
              'Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos de accesos no autorizados, alteraciones o divulgaciones. Los mensajes e información recopilada se almacenan únicamente durante el tiempo necesario para cumplir con la finalidad para la que fueron solicitados o para cumplir con obligaciones legales.',
            ],
            en: [
              'We implement technical and organizational security measures to protect your data against unauthorized access, alteration, or disclosure. Collected messages and information are stored only for as long as necessary to fulfill the purpose for which they were requested or to comply with legal obligations.',
            ],
          },
        ],
      },
      {
        title: {
          es: '5. Tus derechos (Acceso, Rectificación y Cancelación)',
          en: '5. Your Rights (Access, Correction, and Deletion)',
        },
        paragraphs: [
          {
            es: [
              'Tienes derecho a conocer qué información tenemos sobre ti, solicitar su corrección en caso de ser errónea o pedir que la eliminemos por completo de nuestros registros. Para ejercer estos derechos, puedes ponerte en contacto directamente a través del correo electrónico: ',
              { text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, highlight: true, bold: true },
              '.',
            ],
            en: [
              'You have the right to know what information we hold about you, request corrections if inaccurate, or ask for complete deletion from our records. To exercise these rights, please contact us directly via email: ',
              { text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, highlight: true, bold: true },
              '.',
            ],
          },
        ],
      },
      {
        title: {
          es: '6. Cambios a esta Política de Privacidad',
          en: '6. Changes to this Privacy Policy',
        },
        paragraphs: [
          {
            es: [
              'Nos reservamos el derecho de actualizar esta política en cualquier momento para adaptarla a novedades legislativas o mejoras en nuestros servicios de automatización. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.',
            ],
            en: [
              'We reserve the right to update this policy at any time to adapt to legislative updates or improvements in our automation services. We recommend reviewing this page periodically to remain aware of any changes.',
            ],
          },
        ],
      },
    ],
    closing: {
      question: {
        es: '¿Tienes alguna consulta sobre el manejo de tus datos de WhatsApp o alertas automatizadas?',
        en: 'Do you have questions regarding the handling of your WhatsApp data or automated alerts?',
      },
      linkLabel: {
        es: `Contáctame a ${CONTACT_EMAIL}`,
        en: `Contact me at ${CONTACT_EMAIL}`,
      },
      href: `mailto:${CONTACT_EMAIL}`,
    },
  },

  notFound: {
    metaTitle: {
      es: '404 // Página no encontrada — Osman Herrera',
      en: '404 // Page Not Found — Osman Herrera',
    },
    metaDescription: {
      es: 'La página solicitada no existe o ha sido movida.',
      en: 'La página solicitada no existe o ha sido movida.',
    },
    kicker: {
      es: 'ERROR 404 // RECURSO NO LOCALIZADO',
      en: 'ERROR 404 // RESOURCE NOT FOUND',
    },
    code: '404',
    langLabel: {
      es: 'ES // ESPAÑOL',
      en: 'EN // ENGLISH',
    },
    title: {
      es: 'Página no encontrada',
      en: 'Page Not Found',
    },
    description: {
      es: 'La ruta a la que intentas acceder no existe, ha sido trasladada o el enlace es incorrecto.',
      en: 'The route you are trying to access does not exist, has been moved, or the link is incorrect.',
    },
    homeLink: {
      es: 'Volver al inicio',
      en: 'Back to home',
    },
  },
};
