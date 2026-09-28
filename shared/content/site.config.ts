// ===========================================================================
// CONTENIDO DEL SITIO (fuente única de verdad)
// Edita este archivo y ambas versiones (Angular y React) se actualizan.
// ===========================================================================
import type { SiteConfig } from './site.types';

const CONTACT_EMAIL = 'contact@osmanherrera.dev';

export const siteConfig: SiteConfig = {
  theme: {
    // Naranja arriba → morado a la mitad → rojo al final (se interpola gradualmente)
    scrollColors: ['#ff5e00', '#663399'],
  },

  brand: {
    highlight: 'Osman',
    rest: 'Herrera.dev',
  },

  nav: [
    { label: 'Inicio', target: 'hero' },
    { label: 'Habilidades', target: 'technologies' },
    { label: 'Formación', target: 'formation' },
    { label: 'Experiencia', target: 'experience' },
    { label: 'Contacto', target: 'contact' },
  ],

  frameworkSwitch: {
    angular: {
      text: 'Este sitio está hecho en Angular, pulsa aquí para ver la versión en React',
      href: '/react',
      icon: '/assets/icons/react-logo.svg',
    },
    react: {
      text: 'Este sitio está hecho en React, pulsa aquí para ver la versión en Angular',
      href: '/angular',
      icon: '/assets/icons/angular-logo.svg',
    },
  },

  hero: {
    title: [
      'Desarrollo web con ',
      { text: 'lógica', highlight: true },
      ' y ',
      { text: 'pasión', highlight: true },
      '.',
    ],
    subtitle: 'FullStack Developer | Graphic Designer',
    cta: { label: 'Hablemos de tu proyecto', target: 'contact' },
  },

  profile: {
    name: 'Osman Herrera',
    image: '/assets/images/IMG_20230209_080358.jpg',
    imageAlt: 'Osman Herrera',
    badges: ['Desarrollador FullStack', 'Diseñador Gráfico'],
    cv: {
      label: 'Descargar CV',
      url: 'https://raw.githubusercontent.com/osmanjosue/pdfCv/main/CV_oherrera_dev_eng_2026.pdf',
      icon: '/assets/icons/Download_icon.svg',
    },
    bio: [
      [
        '¡Hola! Soy ',
        { text: 'desarrollador web independiente', highlight: true, bold: true },
        ' y un ',
        { text: 'eterno aprendiz', highlight: true, bold: true },
        '. Mi fortaleza es una lógica sólida para hacer realidad cualquier proyecto.',
      ],
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
    title: 'Habilidades Técnicas',
    technologies: [
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
    ],
  },

  formation: {
    title: 'Formación',
    education: [
      {
        platform: 'UNIVERSIDAD',
        title: 'Técnico Universitario en Desarrollo de Aplicaciones Computacionales',
        detail: 'UTH • Estudiando Actualmente',
      },
    ],
    certificates: [
      {
        platform: 'Udemy',
        title: 'Master en JavaScript: Aprender JS, jQuery, Angular, NodeJS',
        month: 'Enero',
        date: 2024,
        link: 'https://www.udemy.com/certificate/UC-53ecf1b8-00d0-49a5-a948-ae2e6d2ecfd0/',
      },
      {
        platform: 'Udemy',
        title: 'Angular Avanzado: Lleva tus bases al siguiente nivel - MEAN',
        month: 'Agosto',
        date: 2023,
        link: 'https://www.udemy.com/certificate/UC-03475c4f-f50b-491c-a1e2-4975b8aab381/',
      },
      {
        platform: 'Devtalles',
        title: 'GIT+GitHub: Todo un sistema de control de versiones de cero',
        month: 'Abril',
        date: 2024,
        link: 'https://cursos.devtalles.com/certificates/zl0noyjvkn',
      },
      {
        platform: 'Udemy',
        title: 'Alojamiento de sitio web en modo serverless en Amazon AWS',
        month: 'Julio',
        date: 2022,
        link: 'https://www.udemy.com/certificate/UC-4840328a-96c0-47c9-afa4-04f65c37096d/',
      },
    ],
    certificateLinkLabel: 'Ver Certificado →',
  },

  experience: {
    title: 'Experiencia Profesional',
    subtitle: 'Proyectos y roles que he desempeñado',
    items: [
      {
        role: ['Desarrollador ', { text: 'web', highlight: true }],
        company: 'Fundación Prolancho',
        period: '2023 - 2026',
        description:
          'Desarrollo del sitio web con Angular 15 en frontend y NodeJS para API backend. Base de datos MongoDB con Cloudinary para gestión de imágenes. Autenticación con JWT y validación de credenciales para panel administrativo. Alojado en AWS EC2 con Ubuntu, NGINX y PM2.',
        technologies: ['Angular 15', 'NodeJS', 'MongoDB', 'JWT', 'AWS EC2', 'NGINX'],
        links: [
          {
            label: 'Repositorio',
            url: 'https://github.com/osmanjosue/fundacionProlanchoSiteFrontAndBack',
            icon: '/assets/icons/technologies-GitHub.svg',
          },
          {
            label: 'Sitio Web',
            url: 'https://www.fundacionprolancho.org',
            icon: '/assets/icons/website.svg',
          },
        ],
      },
      {
        role: [
          'Diseñador ',
          { text: 'Gráfico', highlight: true },
          ' & Coordinador de Productos',
        ],
        company: 'Empresa de Diseño y Estampado',
        period: '2012 - 2023',
        description:
          'Diseño y creación de ilustraciones profesionales. Separación de colores para serigrafía y sublimación. Coordinación de personal, cumplimiento de objetivos de producción, y lanzamiento de nuevos productos con fechas puntuales basados en metas establecidas.',
        technologies: [
          'Diseño Gráfico',
          'Photoshop',
          'Ilustrator',
          'Gestión de Equipos',
          'Serigrafía',
          'Sublimación',
        ],
        links: [
          {
            label: 'Página de Facebook',
            url: 'https://www.facebook.com/beomegusta/',
            icon: '/assets/icons/facebook.svg',
          },
        ],
      },
    ],
  },

  contact: {
    title: 'Contacto',
  },

  contactForm: {
    name: { label: 'Nombre / Empresa', placeholder: 'Tu nombre o empresa' },
    email: { label: 'Correo Electrónico', placeholder: 'tu@email.com' },
    message: { label: 'Mensaje', placeholder: 'Tu mensaje aquí...' },
    minMessageLength: 10,
    errors: {
      nameRequired: 'El nombre es obligatorio',
      emailRequired: 'El correo es obligatorio',
      emailPattern: 'El formato de correo no es válido',
      messageRequired: 'El mensaje es obligatorio',
      messageMinLength: 'El mensaje debe tener al menos 10 caracteres',
      formInvalid: 'ℹ️ Completa correctamente todos los campos',
    },
    submit: 'Enviar Mensaje',
    sending: 'Enviando...',
    note: 'Responderé lo antes posible',
    alerts: {
      success: 'Mensaje enviado con éxito',
      error: 'No se pudo enviar el mensaje',
    },
  },

  footer: {
    copyright: '© 2026 Osman Herrera. Todos los derechos reservados.',
    credit: 'Diseñado y desarrollado con ❤️ por Osman Herrera',
    privacyLink: {
      label: 'Política de Privacidad',
      internal: '/politicadeprivacidad',
      external: '/react/politicadeprivacidad',
    },
  },

  privacyPolicy: {
    title: ['Política de ', { text: 'Privacidad', highlight: true }],
    owner: 'Osman Josue Herrera Perez',
    backLabel: 'Volver al Inicio',
    homeLabel: 'Ir al Inicio',
    lastUpdated: 'Última actualización: 28 de mayo de 2026',
    intro: [
      'En ',
      { text: 'Osman Josue Herrera Perez', highlight: true, bold: true },
      ', nos tomamos muy en serio la privacidad de tus datos. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos la información cuando interactúas con nuestra aplicación y servicios a través de la API de WhatsApp, de conformidad con las buenas prácticas de protección de datos y la legislación aplicable en Honduras.',
    ],
    sections: [
      {
        title: '1. Información que recopilamos',
        paragraphs: [
          [
            'Cuando te comunicas con nosotros o utilizas nuestra aplicación a través de WhatsApp, podemos recopilar la siguiente información:',
          ],
        ],
        cards: [
          {
            title: 'Perfil de WhatsApp',
            text: 'Tu número de teléfono y el nombre de perfil público que tienes configurado en WhatsApp.',
          },
          {
            title: 'Mensajes y contenido',
            text: 'El texto de los mensajes, imágenes u otros archivos que envíes directamente a nuestro sistema o cuenta de WhatsApp Business para procesar tus solicitudes.',
          },
          {
            title: 'Datos técnicos',
            text: 'Información básica sobre las interacciones, comandos y respuestas que se ejecutan dentro de la aplicación.',
          },
        ],
      },
      {
        title: '2. Cómo utilizamos tu información',
        paragraphs: [
          ['Utilizamos la información recopilada exclusivamente para los siguientes fines:'],
        ],
        bullets: [
          ['Proporcionar, operar y mantener las funciones de nuestra aplicación y servicios de automatización.'],
          ['Responder a tus consultas, comandos y mensajes de manera automatizada o personalizada.'],
          ['Mejorar la experiencia de usuario y la calidad de nuestro servicio de atención.'],
          [
            { text: 'Envío de notificaciones y alertas:', bold: true },
            ' Enviar alertas automatizadas, recordatorios, actualizaciones del servicio o información relevante que hayas solicitado o que forme parte de la interacción con nuestros sistemas.',
          ],
        ],
      },
      {
        title: '3. Uso de proveedores de servicios de terceros (Meta/WhatsApp)',
        paragraphs: [
          [
            'Nuestra aplicación utiliza la API de WhatsApp Business, un servicio proporcionado por Meta Platforms, Inc. El procesamiento de tus mensajes está sujeto a las condiciones de servicio y políticas de privacidad de WhatsApp. No vendemos, alquilamos ni compartimos tu información personal con fines comerciales con ningún otro tercero.',
          ],
        ],
      },
      {
        title: '4. Retención y seguridad de los datos',
        paragraphs: [
          [
            'Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos de accesos no autorizados, alteraciones o divulgaciones. Los mensajes e información recopilada se almacenan únicamente durante el tiempo necesario para cumplir con la finalidad para la que fueron solicitados o para cumplir con obligaciones legales.',
          ],
        ],
      },
      {
        title: '5. Tus derechos (Acceso, Rectificación y Cancelación)',
        paragraphs: [
          [
            'Tienes derecho a conocer qué información tenemos sobre ti, solicitar su corrección en caso de ser errónea o pedir que la eliminemos por completo de nuestros registros. Para ejercer estos derechos, puedes ponerte en contacto directamente a través del correo electrónico: ',
            { text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, highlight: true, bold: true },
            '.',
          ],
        ],
      },
      {
        title: '6. Cambios a esta Política de Privacidad',
        paragraphs: [
          [
            'Nos reservamos el derecho de actualizar esta política en cualquier momento para adaptarla a novedades legislativas o mejoras en nuestros servicios de automatización. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.',
          ],
        ],
      },
    ],
    closing: {
      question:
        '¿Tienes alguna consulta sobre el manejo de tus datos de WhatsApp o alertas automatizadas?',
      linkLabel: `Contáctame a ${CONTACT_EMAIL}`,
      href: `mailto:${CONTACT_EMAIL}`,
    },
  },
};
