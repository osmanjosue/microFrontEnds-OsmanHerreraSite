// ===========================================================================
// UTILIDADES Y TIPOS DE INTERNACIONALIZACIÓN (I18N)
// ===========================================================================
import type { ExperienceLink } from './site.types';

export const LANGS = ['es', 'en'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

/**
 * Tipo genérico para valores que deben existir en todos los idiomas soportados.
 * Si falta una clave de idioma en cualquier definición, TypeScript generará un error en tiempo de compilación.
 */
export type Localized<T = string> = Record<Lang, T>;

/** Claves identificadoras de las rutas principales del sitio */
export type RouteKey = 'home' | 'privacy' | 'vectorwork' | 'cv';

/**
 * Tabla de rutas del sitio por idioma.
 * Define la correspondencia exacta entre las URLs en español e inglés.
 * El inglés es el idioma por defecto (sin prefijo); el español vive bajo /es/.
 */
export const ROUTES: Record<RouteKey, Localized<string>> = {
  home: {
    es: '/es/',
    en: '/',
  },
  privacy: {
    es: '/es/politicadeprivacidad/',
    en: '/privacy-policy/',
  },
  vectorwork: {
    es: '/es/vectorwork/',
    en: '/vectorwork/',
  },
  cv: {
    es: '/es/cv/',
    en: '/cv/',
  },
};

/**
 * Helper estricto para resolver un valor localizado en el idioma especificado.
 * Requiere explícitamente `lang` para garantizar en tiempo de compilación que ningún componente
 * omita el idioma y renderice un idioma incorrecto silenciosamente.
 *
 * @param value Objeto con las traducciones { es, en }
 * @param lang Idioma requerido ('es' | 'en')
 */
export function t<T = string>(value: Localized<T>, lang: Lang): T {
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

