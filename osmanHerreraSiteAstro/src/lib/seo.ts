// ===========================================================================
// HELPER DE METADATOS SEO BILINGÜES
// ===========================================================================

import { siteConfig, type Lang, type RouteKey, localizedPath, DEFAULT_LANG } from '@config';

export interface SeoProps {
  route: RouteKey;
  lang: Lang;
  title?: string;
  description?: string;
}

export interface AlternateLink {
  rel: 'alternate';
  hreflang: string;
  href: string;
}

export interface SeoMetadata {
  htmlLang: Lang;
  title: string;
  description: string;
  canonicalUrl: string;
  ogLocale: string;
  ogLocaleAlternate: string;
  alternateLinks: AlternateLink[];
}

/**
 * Genera metadatos SEO bilingües con etiquetas canónicas y alternate hreflang absolutas.
 */
export function getSeoMetadata({ route, lang, title, description }: SeoProps): SeoMetadata {
  const baseUrl = (import.meta.env.SITE || 'https://osmanherrera.dev').replace(/\/$/, '');
  const seoConfig = siteConfig.seo[lang];

  const canonicalPath = localizedPath(route, lang);
  const canonicalUrl = `${baseUrl}${canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`}`;

  const esPath = localizedPath(route, 'es');
  const enPath = localizedPath(route, 'en');
  const defaultPath = localizedPath(route, DEFAULT_LANG);

  const alternateLinks: AlternateLink[] = [
    {
      rel: 'alternate',
      hreflang: 'es',
      href: `${baseUrl}${esPath.startsWith('/') ? esPath : `/${esPath}`}`,
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${baseUrl}${enPath.startsWith('/') ? enPath : `/${enPath}`}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${baseUrl}${defaultPath.startsWith('/') ? defaultPath : `/${defaultPath}`}`,
    },
  ];

  return {
    htmlLang: lang,
    title: title || seoConfig.title,
    description: description || seoConfig.description,
    canonicalUrl,
    ogLocale: seoConfig.ogLocale,
    ogLocaleAlternate: seoConfig.ogLocaleAlternate,
    alternateLinks,
  };
}
