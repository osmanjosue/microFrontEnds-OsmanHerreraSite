// ===========================================================================
// COLOR DINÁMICO SEGÚN EL SCROLL
// Lógica pura (sin framework) compartida por Angular y React.
// ===========================================================================

interface Rgb {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): Rgb {
  const value = parseInt(hex.replace('#', ''), 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function lerp(start: number, end: number, t: number): number {
  return Math.round(start + (end - start) * t);
}

/**
 * Interpola entre los colores de la lista según el progreso (0 a 1).
 * Los colores se reparten a lo largo del recorrido: con 3 colores,
 * el segundo cae justo a la mitad.
 */
export function colorAtProgress(colors: string[], progress: number): string {
  const p = Math.min(Math.max(progress, 0), 1);
  if (colors.length === 1) return colors[0];

  const segments = colors.length - 1;
  const index = Math.min(Math.floor(p * segments), segments - 1);
  const t = p * segments - index;

  const from = hexToRgb(colors[index]);
  const to = hexToRgb(colors[index + 1]);
  return `rgb(${lerp(from.r, to.r, t)}, ${lerp(from.g, to.g, t)}, ${lerp(from.b, to.b, t)})`;
}

/** Progreso del scroll de la página (0 arriba, 1 al final; 0 si no hay scroll) */
export function scrollProgress(): number {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  return maxScroll > 0 ? window.scrollY / maxScroll : 0;
}
