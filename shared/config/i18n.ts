// ===========================================================================
// UTILIDADES Y TIPOS DE INTERNACIONALIZACIÓN (I18N)
// ===========================================================================

export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'es';

/**
 * Tipo genérico para valores que deben existir en todos los idiomas soportados.
 * Si falta una clave de idioma en cualquier definición, TypeScript generará un error en tiempo de compilación.
 */
export type Localized<T = string> = Record<Lang, T>;

/** Claves identificadoras de las rutas principales del sitio */
export type RouteKey = 'home' | 'privacy' | 'vectorwork';

/**
 * Tabla de rutas del sitio por idioma.
 * Define la correspondencia exacta entre las URLs en español e inglés.
 */
export const ROUTES: Record<RouteKey, Localized<string>> = {
  home: {
    es: '/',
    en: '/en/',
  },
  privacy: {
    es: '/politicadeprivacidad',
    en: '/en/privacy-policy',
  },
  vectorwork: {
    es: '/vectorwork/',
    en: '/en/vectorwork/',
  },
};

/**
 * Helper para resolver un valor localizado según el idioma recibido.
 * @param value Objeto con las traducciones { es, en }
 * @param lang Idioma a extraer
 */
export function t<T>(value: Localized<T>, lang: Lang): T {
  return value[lang];
}

/**
 * Devuelve la ruta localizada para una clave de página e idioma especificados.
 * @param route Clave de la ruta ('home' | 'privacy' | 'vectorwork')
 * @param lang Idioma deseado
 */
export function localizedPath(route: RouteKey, lang: Lang): string {
  return ROUTES[route][lang];
}

/**
 * Devuelve la URL externa o la ruta interna localizada para un ExperienceLink.
 */
export function linkHref(link: { url?: string; route?: RouteKey }, lang: Lang): string {
  if (link.url) return link.url;
  if (link.route) return localizedPath(link.route, lang);
  return '#';
}

/**
 * Resuelve un texto que puede ser string plano o un objeto Localized.
 */
export function tText(value: string | Localized, lang: Lang): string {
  return typeof value === 'string' ? value : t(value, lang);
}

