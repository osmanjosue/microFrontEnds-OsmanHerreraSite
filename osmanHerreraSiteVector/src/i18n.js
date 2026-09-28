// ===========================================================================
// INTERNACIONALIZACIÓN (i18n) — ESPAÑOL / INGLÉS
// ===========================================================================

const STORAGE_KEY = 'vw-lang';

// Variable de estado en memoria para el idioma activo (se inicializa una sola vez)
let currentLang = null;

/**
 * Detecta el idioma inicial según la prioridad:
 * 1. Parámetro ?lang= en la URL (se consume, se persiste y se remueve de la barra de direcciones)
 * 2. Preferencia guardada en localStorage
 * 3. Idioma reportado por el navegador (en* -> 'en', resto -> 'es')
 *
 * @returns {'es' | 'en'}
 */
function detectInitialLang() {
  // 1. Parámetro ?lang= en la URL
  try {
    if (typeof window !== 'undefined' && window.location) {
      const searchParams = new URLSearchParams(window.location.search);
      const paramLang = searchParams.get('lang');
      if (paramLang) {
        const normalized = paramLang.toLowerCase().slice(0, 2);
        if (normalized === 'en' || normalized === 'es') {
          // Eliminar el parámetro ?lang= de la URL conservando el hash y otros parámetros
          searchParams.delete('lang');
          const remainingQuery = searchParams.toString();
          const newSearch = remainingQuery ? `?${remainingQuery}` : '';
          const newUrl = `${window.location.pathname}${newSearch}${window.location.hash || ''}`;

          if (window.history && typeof window.history.replaceState === 'function') {
            window.history.replaceState(null, '', newUrl);
          }

          // Persistir inmediatamente en localStorage
          try {
            if (typeof localStorage !== 'undefined') {
              localStorage.setItem(STORAGE_KEY, normalized);
            }
          } catch {}

          return normalized;
        }
      }
    }
  } catch {
    // Si falla el análisis de la URL, continuar con la siguiente prioridad
  }

  // 2. localStorage
  try {
    if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'es') {
        return stored;
      }
    }
  } catch {
    // localStorage puede no estar disponible
  }

  // 3. Idioma del navegador
  try {
    if (typeof navigator !== 'undefined') {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('en')) {
        return 'en';
      }
    }
  } catch {
    // Fallback seguro
  }

  return 'es';
}

/**
 * Inicializa el idioma en memoria una sola vez.
 *
 * @returns {'es' | 'en'}
 */
export function initLang() {
  if (!currentLang) {
    currentLang = detectInitialLang();
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.lang = currentLang;
    }
  }
  return currentLang;
}

// Inicialización automática en tiempo de carga del módulo
initLang();

/**
 * Obtiene el idioma activo actual desde la variable en memoria.
 *
 * @returns {'es' | 'en'}
 */
export function getLang() {
  return currentLang || initLang();
}

/**
 * Establece el nuevo idioma activo, actualiza la variable en memoria,
 * lo persiste en localStorage y dispara el evento 'langchange'.
 *
 * @param {'es' | 'en'} lang - Nuevo idioma
 * @param {boolean} [silent=false] - Si es true, no dispara el evento 'langchange' para evitar re-render doble
 */
export function setLang(lang, silent = false) {
  const targetLang = lang === 'en' ? 'en' : 'es';
  currentLang = targetLang;

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, targetLang);
    }
  } catch {
    // Ignorar si localStorage está bloqueado
  }

  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.lang = targetLang;
  }

  if (!silent && typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
    window.dispatchEvent(new CustomEvent('langchange', { detail: { lang: targetLang } }));
  }
}

/**
 * Traduce un valor { es, en } o cadena simple, interpolando variables si se proveen.
 *
 * @param {string | { es?: string, en?: string }} value - Texto o diccionario bilingüe
 * @param {Record<string, string | number>} [vars] - Variables {clave} a interpolar
 * @returns {string}
 */
export function t(value, vars) {
  if (value === null || value === undefined) return '';

  const lang = getLang();
  let text = '';

  if (typeof value === 'object' && ('es' in value || 'en' in value)) {
    text = value[lang] ?? value.es ?? '';
  } else if (typeof value === 'string') {
    text = value;
  } else {
    text = String(value);
  }

  if (vars && typeof vars === 'object') {
    text = text.replace(/\{(\w+)\}/g, (match, key) => {
      return key in vars ? String(vars[key]) : match;
    });
  }

  return text;
}
