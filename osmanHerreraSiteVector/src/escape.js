// ===========================================================================
// UTILIDAD DE ESCAPADO HTML PARA PREVENIR INYECCIÓN XSS
// ===========================================================================

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const HTML_ESCAPE_REGEX = /[&<>"']/g;

/**
 * Escapa caracteres especiales de HTML (&, <, >, ", ') para inserción segura en innerHTML y atributos.
 * Regla: nada entra a innerHTML sin pasar por escapeHtml.
 *
 * @param {unknown} str - Valor a escapar
 * @returns {string} Cadena sanitizada y segura
 */
export function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(HTML_ESCAPE_REGEX, (char) => HTML_ESCAPE_MAP[char] || char);
}
