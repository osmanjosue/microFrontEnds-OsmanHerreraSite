// ===========================================================================
// TIPOS DEL CONTENIDO DEL SITIO
// Compartidos por la versión Angular (osmanHerreraSite) y React (osmanHerreraSiteReact)
// ===========================================================================

/** Segmento de texto enriquecido: texto plano o con formato (resaltado, negrita, enlace) */
export interface RichTextSegment {
  text: string;
  highlight?: boolean;
  bold?: boolean;
  href?: string;
}

/** Texto compuesto por segmentos, para no meter HTML en el config */
export type RichText = (string | RichTextSegment)[];

export interface NavItem {
  label: string;
  /** Id de la sección destino (sin '#') */
  target: string;
}

export interface FrameworkSwitch {
  text: string;
  href: string;
  icon: string;
}

export interface SocialIcon {
  title: string;
  icon: string;
  address: string;
}

export interface Technology {
  title: string;
  icon: string;
}

export interface Certificate {
  platform: string;
  title: string;
  month: string;
  date: number;
  link: string;
}

export interface EducationCard {
  platform: string;
  title: string;
  detail: string;
}

export interface ExperienceLink {
  label: string;
  url: string;
  icon: string;
}

export interface Experience {
  role: RichText;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  links: ExperienceLink[];
}

export interface SectionHeader {
  title: string;
  subtitle?: string;
}

export interface FormField {
  label: string;
  placeholder: string;
}

export interface PrivacyCard {
  title: string;
  text: string;
}

export interface PrivacySection {
  title: string;
  paragraphs?: RichText[];
  cards?: PrivacyCard[];
  bullets?: RichText[];
}

export interface SiteConfig {
  theme: {
    /** Colores hex del acento (--variant), repartidos de arriba a abajo del scroll */
    scrollColors: string[];
  };
  brand: {
    highlight: string;
    rest: string;
  };
  nav: NavItem[];
  vectorWorkLink: {
    label: string;
    href: string;
  };
  frameworkSwitch: {
    /** Banner mostrado en la versión Angular (apunta a React) */
    angular: FrameworkSwitch;
    /** Banner mostrado en la versión React (apunta a Angular) */
    react: FrameworkSwitch;
  };
  hero: {
    title: RichText;
    subtitle: string;
    cta: { label: string; target: string };
  };
  profile: {
    name: string;
    image: string;
    imageAlt: string;
    badges: string[];
    cv: { label: string; url: string; icon: string };
    bio: RichText[];
  };
  socialIcons: SocialIcon[];
  skills: SectionHeader & {
    /** Nombres de tecnologías; el icono es /assets/icons/technologies-{nombre}.svg */
    technologies: string[];
  };
  formation: SectionHeader & {
    education: EducationCard[];
    certificates: Certificate[];
    certificateLinkLabel: string;
  };
  experience: SectionHeader & {
    items: Experience[];
  };
  contact: {
    title: string;
  };
  contactForm: {
    name: FormField;
    email: FormField;
    message: FormField;
    minMessageLength: number;
    errors: {
      nameRequired: string;
      emailRequired: string;
      emailPattern: string;
      messageRequired: string;
      messageMinLength: string;
      formInvalid: string;
    };
    submit: string;
    sending: string;
    note: string;
    alerts: {
      success: string;
      error: string;
    };
  };
  footer: {
    copyright: string;
    credit: string;
    privacyLink: {
      label: string;
      /** Ruta interna en la app React */
      internal: string;
      /** URL absoluta usada desde la versión Angular */
      external: string;
    };
  };
  privacyPolicy: {
    title: RichText;
    owner: string;
    backLabel: string;
    homeLabel: string;
    lastUpdated: string;
    intro: RichText;
    sections: PrivacySection[];
    closing: {
      question: string;
      linkLabel: string;
      href: string;
    };
  };
}
