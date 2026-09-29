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
  target?: string;
  /** Ruta canónica para navegación entre páginas */
  route?: RouteKey;
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
  month?: Localized;
  date?: number | string;
  link?: string;
}

export interface EducationCard {
  platform: Localized;
  title: Localized;
  detail: Localized;
}

export type ExperienceLink = (
  | { url: string; route?: never }
  | { route: RouteKey; url?: never }
) & {
  label: Localized;
  icon: string;
};

export interface Experience {
  role: Localized<RichText>;
  company: Localized;
  period: Localized;
  location?: Localized;
  description: Localized;
  highlights?: Localized<string[]>;
  technologies: (string | Localized)[];
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

export type ProjectCategory = 'web' | 'modulos' | 'diseno' | 'datos';

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
  caseStudy?: {
    problem: Localized;
    solution: Localized;
    result: Localized;
  };
}

export interface ProjectsConfig {
  title: Localized;
  subtitle?: Localized;
  kicker: Localized;
  filterAria: Localized;
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
  menuOpenAria: Localized;
  menuCloseAria: Localized;
  viewDetails: Localized;
}

export interface SiteConfig {
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
    kicker: Localized;
    educationTitle: Localized;
    certificatesTitle: Localized;
    education: EducationCard[];
    certificates: Certificate[];
    certificateLinkLabel: Localized;
  };
  experience: SectionHeader & {
    kicker: Localized;
    items: Experience[];
  };
  contact: {
    title: Localized;
    kicker: Localized;
    subtitle: Localized;
    intro: Localized;
    channelsTitle: Localized;
    formTitle: Localized;
    email: string;
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
      close: Localized;
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
    kicker: Localized;
    title: Localized<RichText>;
    owner: string;
    backLabel: Localized;
    homeLabel: Localized;
    lastUpdatedDate: string;
    lastUpdatedLabel: Localized;
    intro: Localized<RichText>;
    sections: PrivacySection[];
    closing: {
      question: Localized;
      linkLabel: Localized;
      href: string;
    };
  };
  notFound: {
    metaTitle: Localized;
    metaDescription: Localized;
    kicker: Localized;
    code: string;
    langLabel: Localized;
    title: Localized;
    description: Localized;
    homeLink: Localized;
  };
  cv: CvConfig;
}

export interface CvWhatIDoItem {
  id: string;
  title: Localized;
  description: Localized;
}

export interface CvSkillGroup {
  title: Localized;
  skills: { name: string; level?: 'core' | 'working' }[];
}

export interface CvLanguage {
  language: Localized;
  level: Localized;
}

export interface CvBriefProject {
  title: string;
  description: Localized;
  chips: string[];
}

export interface CvUiTexts {
  viewCvBtn: Localized;
  printPdfBtn: Localized;
  contactNavAria: Localized;
  profileSection: Localized;
  whatIDoSection: Localized;
  experienceSection: Localized;
  featuredProjectsSection: Localized;
  skillsSection: Localized;
  strengthsSection: Localized;
  educationSection: Localized;
  languagesSection: Localized;
  aboutMeSection: Localized;
  updatedLabel: Localized;
  viewCode: Localized;
  problemLabel: Localized;
  solutionLabel: Localized;
  resultLabel: Localized;
}

export interface CvConfig {
  headline: Localized;
  location: Localized;
  profileSummary: Localized;
  whatIDo: CvWhatIDoItem[];
  skillGroups: CvSkillGroup[];
  strengths: Localized<string[]>;
  languages: CvLanguage[];
  aboutMe: Localized;
  taekwondo: Localized;
  briefProjects: CvBriefProject[];
  updated: string;
  ui: CvUiTexts;
}
