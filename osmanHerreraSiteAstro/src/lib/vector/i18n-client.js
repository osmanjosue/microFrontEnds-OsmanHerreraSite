// ===========================================================================
// HELPER I18N PARA EL CLIENTE (VECTOR WORK)
// ===========================================================================
// Permite resolver textos localizados en componentes puramente de cliente leyendo
// document.documentElement.lang ('es' | 'en') y soportando interpolación {key}.
// ===========================================================================

/**
 * Obtiene el idioma activo en el cliente leyendo document.documentElement.lang.
 * @returns {'es' | 'en'}
 */
export function getLang() {
  if (typeof document !== 'undefined' && document.documentElement?.lang === 'en') {
    return 'en';
  }
  return 'es';
}

/**
 * Resuelve un valor localizado en el cliente según document.documentElement.lang,
 * con soporte opcional de interpolación de variables {key}.
 *
 * @param {Record<'es' | 'en', any>} value
 * @param {Record<string, string | number>} [vars]
 * @returns {any}
 */
export function tc(value, vars) {
  if (!value) return '';
  const lang = getLang();
  const result = value[lang];
  if (typeof result === 'string' && vars) {
    return result.replace(/\{(\w+)\}/g, (match, key) => {
      return key in vars ? String(vars[key]) : match;
    });
  }
  return result;
}
