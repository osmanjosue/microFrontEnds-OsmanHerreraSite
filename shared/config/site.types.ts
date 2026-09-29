// ===========================================================================
// TIPOS CENTRALIZADOS DEL SITIO (BILINGÜE)
// ===========================================================================

import type { Lang, Localized, RouteKey } from './i18n';

/** Segmento de texto enriquecido: texto plano o con formato (resaltado, negrita, enlace) */
export interface RichTextSegment {
  text: string;
  highlight?: boolean;
  bold?: boolean;
  href?: string;
}

/** Texto compuesto por segmentos, para evitar HTML inline en los datos */
export type RichText = (string | RichTextSegment)[];

export interface NavItem {
  label: Localized;
  /** Id de la sección destino (sin '#') */
  target: string;
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
  month: Localized;
  date: number;
  link: string;
}

export interface EducationCard {
  platform: string;
  title: Localized;
  detail: Localized;
}

export interface ExperienceLink {
  label: Localized;
  url: string;
  icon: string;
}

export interface Experience {
  role: Localized<RichText>;
  company: string;
  period: string;
  description: Localized;
  technologies: string[];
  links: ExperienceLink[];
}

export interface SectionHeader {
  title: Localized;
  subtitle?: Localized;
}

export interface FormField {
  label: Localized;
  placeholder: Localized;
}

export type ProjectCategory = 'web' | 'modulos' | 'diseno';

export interface Project {
  id: string;
  category: ProjectCategory;
  badge?: Localized;
  title: Localized;
  description: Localized;
  image: string;
  technologies: string[];
  links: ExperienceLink[];
  featured?: boolean;
}

export interface ProjectsConfig {
  title: Localized;
  subtitle?: Localized;
  kicker: Localized;
  filters: { id: string; label: Localized }[];
  items: Project[];
}

export interface PrivacyCard {
  title: Localized;
  text: Localized;
}

export interface PrivacySection {
  title: Localized;
  paragraphs?: Localized<RichText>[];
  cards?: PrivacyCard[];
  bullets?: Localized<RichText>[];
}

export interface SeoItem {
  title: string;
  description: string;
  ogLocale: string;
  ogLocaleAlternate: string;
}

export interface UiTexts {
  availableBadge: Localized;
  locationLabel: Localized;
  vectorWorkBtn: Localized;
  langToggle: Localized;
  langToggleAria: Localized;
  viewCertificate: Localized;
  menuOpenAria: Localized;
  menuCloseAria: Localized;
  allFilterLabel: Localized;
  viewDetails: Localized;
}

export interface SiteConfig {
  theme: {
    /** Colores hex del acento (--variant), repartidos de arriba a abajo del scroll */
    scrollColors: string[];
  };
  routes: Record<RouteKey, Localized<string>>;
  seo: Record<Lang, SeoItem>;
  ui: UiTexts;
  brand: {
    highlight: string;
    rest: string;
  };
  nav: NavItem[];
  vectorWorkLink: {
    label: Localized;
    targetRoute: RouteKey;
  };
  hero: {
    kicker: Localized;
    location: Localized;
    stats: { value: string; label: Localized }[];
    title: Localized<RichText>;
    subtitle: Localized;
    cta: { label: Localized; target: string };
  };
  profile: {
    name: string;
    image: string;
    imageAlt: Localized;
    status: Localized;
    focus: Localized;
    badges: Localized[];
    cv: { label: Localized; url: string; icon: string };
    bio: Localized<RichText>[];
  };
  socialIcons: SocialIcon[];
  skills: SectionHeader & {
    /** Nombres de tecnologías; el icono es /assets/icons/technologies-{nombre}.svg */
    technologies: string[];
  };
  projects: ProjectsConfig;
  formation: SectionHeader & {
    education: EducationCard[];
    certificates: Certificate[];
    certificateLinkLabel: Localized;
  };
  experience: SectionHeader & {
    items: Experience[];
  };
  contact: {
    title: Localized;
  };
  contactForm: {
    name: FormField;
    email: FormField;
    message: FormField;
    minMessageLength: number;
    errors: {
      nameRequired: Localized;
      emailRequired: Localized;
      emailPattern: Localized;
      messageRequired: Localized;
      messageMinLength: Localized;
      formInvalid: Localized;
    };
    submit: Localized;
    sending: Localized;
    note: Localized;
    alerts: {
      success: Localized;
      error: Localized;
    };
  };
  footer: {
    copyright: Localized;
    credit: Localized;
    privacyLink: {
      label: Localized;
      targetRoute: RouteKey;
    };
  };
  privacyPolicy: {
    title: Localized<RichText>;
    owner: string;
    backLabel: Localized;
    homeLabel: Localized;
    lastUpdated: Localized;
    intro: Localized<RichText>;
    sections: PrivacySection[];
    closing: {
      question: Localized;
      linkLabel: Localized;
      href: string;
    };
  };
}
