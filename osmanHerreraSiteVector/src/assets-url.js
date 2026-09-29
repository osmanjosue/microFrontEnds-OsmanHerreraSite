// ===========================================================================
// GESTIÓN DE URLS DE ASSETS (R2 EN PRODUCCIÓN / LOCAL EN DESARROLLO)
// ===========================================================================

/**
 * Resuelve la URL completa de un asset (original o vector).
 * Si VITE_ASSETS_BASE_URL existe, resuelve con respecto a ese origen.
 * Si no, resuelve con respecto a la ruta base de la aplicación (BASE_URL).
 *
 * @param {string} path - Ruta relativa del asset (ej: 'works/pieza-01/original.webp')
 * @returns {string} URL absoluta o relativa lista para usarse
 */
export function assetUrl(path) {
  const env = import.meta?.env || {};

  if (typeof path !== 'string') {
    if (path && env.DEV) {
      console.warn(
        `[assetUrl] Se esperaba un string como ruta de asset, pero se recibió: ${typeof path}`
      );
    }
    return '';
  }

  if (!path) return '';

  if (env.DEV && path.startsWith('/')) {
    console.warn(
      `[assetUrl] La ruta "${path}" empieza con "/". Usa el formato corto sin barra inicial (ej: "works/...").`
    );
  }

  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const remoteBase = env.VITE_ASSETS_BASE_URL;

  if (remoteBase) {
    const cleanRemoteBase = remoteBase.endsWith('/') ? remoteBase : `${remoteBase}/`;
    return new URL(cleanPath, cleanRemoteBase).href;
  }

  const base = env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Obtiene el origen de la URL de assets remotos para preconnect, o null si no está definido.
 *
 * @returns {string | null}
 */
export function assetsOrigin() {
  const env = import.meta?.env || {};
  const remoteBase = env.VITE_ASSETS_BASE_URL;
  if (!remoteBase) return null;
  try {
    return new URL(remoteBase).origin;
  } catch {
    return null;
  }
}
