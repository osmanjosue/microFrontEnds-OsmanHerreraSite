// ===========================================================================
// GESTIÓN DE TÍTULOS DE PIEZAS (PROTEGIDOS DE INDEXACIÓN)
// ===========================================================================
import { vectorConfig } from './content/vector.config.js';
import { getLang, t } from './i18n.js';

let titlesPromise = null;
let cachedTitles = null;

/**
 * Carga el diccionario de títulos reales desde data/titles.json.
 * Se ejecuta una sola vez y cachea la promesa.
 * Si falla la red, el código HTTP no es 200 o el JSON es inválido,
 * devuelve un objeto vacío y emite únicamente console.info (nunca console.error).
 *
 * @returns {Promise<Record<string, { es?: string, en?: string }>>}
 */
export function loadTitles() {
  if (titlesPromise) {
    return titlesPromise;
  }

  const env = import.meta?.env || {};
  const base = env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  const url = `${cleanBase}data/titles.json`;

  titlesPromise = fetch(url)
    .then((response) => {
      if (!response.ok) {
        console.info(
          `[titles] titles.json no disponible (HTTP ${response.status}). Se usarán títulos por defecto.`
        );
        cachedTitles = {};
        return {};
      }
      return response.json();
    })
    .then((data) => {
      if (data && typeof data === 'object') {
        cachedTitles = data;
        return data;
      }
      cachedTitles = {};
      return {};
    })
    .catch((error) => {
      console.info(
        '[titles] titles.json bloqueado o inaccesible. Se usarán títulos por defecto.',
        error?.message || ''
      );
      cachedTitles = {};
      return {};
    });

  return titlesPromise;
}

/**
 * Genera el título por defecto y genérico para la pieza (ej: "Estudio vectorial #01").
 * Este es el único título visible para buscadores en el HTML/metadatos.
 *
 * @param {number} index - Índice base 0 de la pieza
 * @returns {string}
 */
export function getDefaultTitle(index) {
  const numberStr = String(index + 1).padStart(2, '0');
  return t(vectorConfig.ui.defaultTitle, { n: numberStr });
}

/**
 * Obtiene el título a mostrar para una pieza.
 * Prioridad:
 * 1. Título real en el idioma activo (titles[slug][lang])
 * 2. Título real en español (titles[slug].es)
 * 3. Título genérico por defecto (getDefaultTitle(index))
 *
 * @param {{ slug: string }} work - Objeto de la pieza
 * @param {number} index - Índice base 0 de la pieza
 * @param {Record<string, { es?: string, en?: string }>} [titlesMap] - Diccionario de títulos opcional
 * @returns {string}
 */
export function getTitle(work, index, titlesMap) {
  const titles = titlesMap || cachedTitles || {};
  const lang = getLang();
  const entry = titles[work.slug];

  if (entry) {
    if (typeof entry === 'string') return entry;
    if (entry[lang]) return entry[lang];
    if (entry.es) return entry.es;
  }

  return getDefaultTitle(index);
}

/**
 * Obtiene el crédito opcional del arte base para una pieza.
 * Devuelve el texto según el idioma actual, o null si no existe.
 *
 * @param {{ slug: string }} work - Objeto de la pieza
 * @param {Record<string, { es?: string, en?: string, credit?: { es?: string, en?: string } }>} [titlesMap] - Diccionario de títulos opcional
 * @returns {string | null}
 */
export function getCredit(work, titlesMap) {
  const titles = titlesMap || cachedTitles || {};
  const lang = getLang();
  const entry = titles[work?.slug];

  if (entry && entry.credit) {
    if (typeof entry.credit === 'string') return entry.credit;
    if (entry.credit[lang]) return entry.credit[lang];
    if (entry.credit.es) return entry.credit.es;
    if (entry.credit.en) return entry.credit.en;
  }

  return null;
}
