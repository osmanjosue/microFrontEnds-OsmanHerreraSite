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
//        category: 'web' | 'modulos' | 'diseno',
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

const CONTACT_EMAIL = 'contact@osmanherrera.dev';

const TECHNOLOGIES = [
  'CSS',
  'HTML',
  'JavaScript',
  'TypeScript',
  'Angular',
  'NodeJS',
  'GitHub',
  'Git',
  'MongoDB',
  'Photoshop',
  'Illustrator',
  'JWT',
  'Python',
  'n8n',
  'Docker',
];

export const siteConfig: SiteConfig = {
  routes: ROUTES,

  seo: {
    es: {
      title: 'Osman Herrera — FullStack Developer & Graphic Designer',
      description:
        'Portafolio profesional de Osman Herrera. Desarrollo web FullStack con lógica y pasión, y arte vectorial de alta precisión.',
      ogLocale: 'es_HN',
      ogLocaleAlternate: 'en_US',
    },
    en: {
      title: 'Osman Herrera — FullStack Developer & Graphic Designer',
      description:
        'Professional portfolio of Osman Herrera. FullStack web development driven by logic and passion, and high-precision vector art.',
      ogLocale: 'en_US',
      ogLocaleAlternate: 'es_HN',
    },
  },

  ui: {
    availableBadge: {
      es: 'DISPONIBLE PARA TRABAJO REMOTO',
      en: 'AVAILABLE FOR REMOTE WORK',
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
      es: 'FullStack Developer | Graphic Designer',
      en: 'FullStack Developer | Graphic Designer',
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
      es: 'Desarrollo Web FullStack & Arte Vectorial',
      en: 'FullStack Web Development & Vector Art',
    },
    badges: [
      { es: 'Desarrollador FullStack', en: 'FullStack Developer' },
      { es: 'Diseñador Gráfico', en: 'Graphic Designer' },
    ],
    cv: {
      label: { es: 'Descargar CV', en: 'Download CV' },
      url: 'https://raw.githubusercontent.com/osmanjosue/pdfCv/main/CV_oherrera_dev_eng_2026.pdf',
      icon: '/assets/icons/Download_icon.svg',
    },
    bio: [
      {
        es: [
          '¡Hola! Soy ',
          { text: 'desarrollador web independiente', highlight: true, bold: true },
          ' y un ',
          { text: 'eterno aprendiz', highlight: true, bold: true },
          '. Mi fortaleza es una lógica sólida para hacer realidad cualquier proyecto.',
        ],
        en: [
          'Hi! I\'m an ',
          { text: 'independent web developer', highlight: true, bold: true },
          ' and a ',
          { text: 'lifelong learner', highlight: true, bold: true },
          '. My strength is solid logical thinking that brings any project to life.',
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
      address: 'https://wa.me/50489709082',
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
    filters: [
      { id: 'all', label: { es: 'Todos', en: 'All' } },
      { id: 'web', label: { es: 'Web', en: 'Web' } },
      { id: 'modulos', label: { es: 'Módulos', en: 'Modules' } },
      { id: 'diseno', label: { es: 'Diseño', en: 'Design' } },
    ],
    items: [
      {
        id: 'fundacion-prolancho-web',
        category: 'web',
        badge: { es: 'EN PRODUCCIÓN', en: 'IN PRODUCTION' },
        title: {
          es: 'Fundación Prolancho — Sitio web',
          en: 'Fundación Prolancho — Website',
        },
        description: {
          es: 'Desarrollo del sitio web con Angular 15 en frontend y NodeJS para API backend. Base de datos MongoDB con Cloudinary para gestión de imágenes. Autenticación con JWT y validación de credenciales para panel administrativo. Alojado en AWS EC2 con Ubuntu, NGINX y PM2.',
          en: 'Built the website with an Angular 15 frontend and a Node.js backend API. MongoDB database with Cloudinary for image management. JWT authentication and credential validation for the admin panel. Hosted on AWS EC2 with Ubuntu, NGINX, and PM2.',
        },
        image: '/assets/images/projects/prolancho-web.webp',
        technologies: ['Angular 15', 'NodeJS', 'MongoDB', 'JWT', 'AWS EC2', 'NGINX'],
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
          es: 'Fundación Prolancho — Módulo de Reclutamiento',
          en: 'Fundación Prolancho — Recruitment Module',
        },
        description: {
          es: 'TODO: confirmar',
          en: 'TODO: confirmar',
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
            url: 'https://www.fundacionprolancho.org',
            icon: '/assets/icons/website.svg',
          },
        ],
        featured: false,
      },
      {
        id: 'francisherrera-com',
        category: 'web',
        badge: { es: 'NUEVO', en: 'NEW' },
        title: {
          es: 'francisherrera.com',
          en: 'francisherrera.com',
        },
        description: {
          es: 'TODO: confirmar',
          en: 'TODO: confirmar',
        },
        image: '/assets/images/projects/francisherrera.webp',
        technologies: ['React', 'NodeJS'],
        links: [
          {
            label: { es: 'Sitio Web', en: 'Website' },
            url: 'https://francisherrera.com',
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
          es: ['Desarrollador ', { text: 'web', highlight: true }],
          en: [{ text: 'Web', highlight: true }, ' Developer'],
        },
        company: { es: 'Fundación Prolancho', en: 'Fundación Prolancho' },
        period: '2023 - 2026',
        description: {
          es: 'Desarrollo del sitio web con Angular 15 en frontend y NodeJS para API backend. Base de datos MongoDB con Cloudinary para gestión de imágenes. Autenticación con JWT y validación de credenciales para panel administrativo. Alojado en AWS EC2 con Ubuntu, NGINX y PM2.',
          en: 'Built the website with an Angular 15 frontend and a Node.js backend API. MongoDB database with Cloudinary for image management. JWT authentication and credential validation for the admin panel. Hosted on AWS EC2 with Ubuntu, NGINX, and PM2.',
        },
        technologies: ['Angular 15', 'NodeJS', 'MongoDB', 'JWT', 'AWS EC2', 'NGINX'],
        links: [
          {
            label: { es: 'Repositorio', en: 'Repository' },
            url: 'https://github.com/osmanjosue/fundacionProlanchoSiteFrontAndBack',
            icon: '/assets/icons/technologies-GitHub.svg',
          },
          {
            label: { es: 'Sitio Web', en: 'Website' },
            url: 'https://www.fundacionprolancho.org',
            icon: '/assets/icons/website.svg',
          },
        ],
      },
      {
        role: {
          es: [
            'Diseñador ',
            { text: 'Gráfico', highlight: true },
            ' & Coordinador de Productos',
          ],
          en: [
            'Graphic ',
            { text: 'Designer', highlight: true },
            ' & Product Coordinator',
          ],
        },
        company: {
          es: 'Empresa de Diseño y Estampado',
          en: 'Design & Screen Printing Company',
        },
        period: '2012 - 2023',
        description: {
          es: 'Diseño y creación de ilustraciones profesionales. Separación de colores para serigrafía y sublimación. Coordinación de personal, cumplimiento de objetivos de producción, y lanzamiento de nuevos productos con fechas puntuales basados en metas establecidas.',
          en: 'Design and creation of professional illustrations. Color separation for screen printing and sublimation. Staff coordination, meeting production targets, and launching new products on schedule to meet established goals.',
        },
        technologies: [
          { es: 'Diseño Gráfico', en: 'Graphic Design' },
          'Photoshop',
          'Illustrator',
          { es: 'Gestión de Equipos', en: 'Team Management' },
          { es: 'Serigrafía', en: 'Screen Printing' },
          { es: 'Sublimación', en: 'Sublimation' },
        ],
        links: [
          {
            label: { es: 'Página de Facebook', en: 'Facebook Page' },
            url: 'https://www.facebook.com/beomegusta/',
            icon: '/assets/icons/facebook.svg',
          },
        ],
      },
    ],
  },

  contact: {
    title: {
      es: 'Contacto',
      en: 'Contact',
    },
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
        es: 'No se pudo enviar el mensaje',
        en: 'Your message couldn\'t be sent. Please try again.',
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
    lastUpdated: {
      es: 'Última actualización: 28 de mayo de 2026',
      en: 'Last updated: May 28, 2026',
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
};
