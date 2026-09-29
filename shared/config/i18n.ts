// ===========================================================================
// UTILIDADES Y TIPOS DE INTERNACIONALIZACIÓN (I18N)
// ===========================================================================
import type { ExperienceLink } from './site.types';

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
 * Obtiene el idioma activo leyendo document.documentElement.lang en el cliente.
 * Por defecto devuelve 'es'.
 */
export function getLang(): Lang {
  if (typeof document !== 'undefined' && document.documentElement?.lang === 'en') {
    return 'en';
  }
  return 'es';
}

/**
 * Helper para resolver un valor localizado.
 * - Si se pasa lang explícito: t(value, 'es')
 * - Si no se pasa lang o se pasan variables de interpolación: t(value, { n: '01' }) lee document.documentElement.lang
 *
 * @param value Objeto con las traducciones { es, en }
 * @param langOrVars Idioma explícito ('es' | 'en') u objeto con variables para interpolar
 * @param vars Variables opcionales si se especificó el idioma primero
 */
export function t<T>(
  value: Localized<T>,
  langOrVars?: Lang | Record<string, string | number>,
  vars?: Record<string, string | number>
): T {
  let lang: Lang;
  let actualVars: Record<string, string | number> | undefined;

  if (typeof langOrVars === 'string') {
    lang = langOrVars as Lang;
    actualVars = vars;
  } else {
    lang = getLang();
    actualVars = langOrVars;
  }

  const result = value ? value[lang] : ('' as unknown as T);
  if (typeof result === 'string' && actualVars) {
    const v = actualVars;
    return result.replace(/\{(\w+)\}/g, (match, key) => {
      return key in v ? String(v[key]) : match;
    }) as unknown as T;
  }
  return result;
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
 * El tipo ExperienceLink es una unión estricta: garantiza que siempre
 * esté presente `url` o `route`, nunca ninguno de los dos.
 */
export function linkHref(link: ExperienceLink, lang: Lang): string {
  if ('url' in link && link.url) return link.url;
  return localizedPath((link as { route: RouteKey }).route, lang);
}

/**
 * Resuelve un texto que puede ser string plano o un objeto Localized.
 */
export function tText(value: string | Localized, lang: Lang): string {
  return typeof value === 'string' ? value : t(value, lang);
}

