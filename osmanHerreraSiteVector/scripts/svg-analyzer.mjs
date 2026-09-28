// ===========================================================================
// MÓDULO: ANALIZADOR DE SVG COMPATIBLE CON EXPORTACIONES DE ILLUSTRATOR
// ===========================================================================
import crypto from 'node:crypto';
import { DOMParser } from '@xmldom/xmldom';
import svgpath from 'svgpath';
import colorName from 'color-name';

const NUM_REGEX = /-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi;

/**
 * Matriz identidad 2D (a, b, c, d, e, f).
 */
export function identityMatrix() {
  return [1, 0, 0, 1, 0, 0];
}

/**
 * Multiplicación de dos matrices afines 2D (m1 x m2).
 */
export function multiplyMatrix(m1, m2) {
  const [a1, b1, c1, d1, e1, f1] = m1;
  const [a2, b2, c2, d2, e2, f2] = m2;
  return [
    a1 * a2 + c1 * b2,
    b1 * a2 + d1 * b2,
    a1 * c2 + c1 * d2,
    b1 * c2 + d1 * d2,
    a1 * e2 + c1 * f2 + e1,
    b1 * e2 + d1 * f2 + f1,
  ];
}

/**
 * Parsea una cadena de transformaciones SVG compuestas (translate, scale, rotate, skewX, skewY, matrix).
 * Tokeniza con regex numérica para soportar números adyacentes de Illustrator (ej: matrix(1 0 0 1-50-20)).
 */
export function parseTransform(transformStr) {
  if (!transformStr || typeof transformStr !== 'string') return identityMatrix();
  let matrix = identityMatrix();
  const fnRegex = /([a-zA-Z]+)\s*\(([^)]*)\)/g;
  let match;

  while ((match = fnRegex.exec(transformStr)) !== null) {
    const fn = match[1].toLowerCase();
    const args = (match[2].match(NUM_REGEX) || []).map(Number);
    let m = identityMatrix();

    if (fn === 'matrix' && args.length >= 6) {
      m = [args[0], args[1], args[2], args[3], args[4], args[5]];
    } else if (fn === 'translate' && args.length >= 1) {
      const tx = args[0];
      const ty = args.length >= 2 ? args[1] : 0;
      m = [1, 0, 0, 1, tx, ty];
    } else if (fn === 'scale' && args.length >= 1) {
      const sx = args[0];
      const sy = args.length >= 2 ? args[1] : sx;
      m = [sx, 0, 0, sy, 0, 0];
    } else if (fn === 'rotate' && args.length >= 1) {
      const rad = (args[0] * Math.PI) / 180;
      const cos = Math.cos(rad);
      const sin = Math.sin(rad);
      if (args.length >= 3) {
        const cx = args[1];
        const cy = args[2];
        m = [
          cos,
          sin,
          -sin,
          cos,
          cx * (1 - cos) + cy * sin,
          cy * (1 - cos) - cx * sin,
        ];
      } else {
        m = [cos, sin, -sin, cos, 0, 0];
      }
    } else if (fn === 'skewx' && args.length >= 1) {
      const rad = (args[0] * Math.PI) / 180;
      m = [1, 0, Math.tan(rad), 1, 0, 0];
    } else if (fn === 'skewy' && args.length >= 1) {
      const rad = (args[0] * Math.PI) / 180;
      m = [1, Math.tan(rad), 0, 1, 0, 0];
    }

    matrix = multiplyMatrix(matrix, m);
  }

  return matrix;
}

/**
 * Aplica una matriz afín 2D a un punto (x, y).
 */
export function applyMatrix(matrix, x, y) {
  const [a, b, c, d, e, f] = matrix;
  return {
    x: a * x + c * y + e,
    y: b * x + d * y + f,
  };
}

/**
 * Parsea un número de atributo ignorando sufijo "px" si existe.
 */
export function parseNum(val, defaultVal = 0) {
  if (val === null || val === undefined) return defaultVal;
  const str = String(val).replace(/px$/i, '').trim();
  const n = parseFloat(str);
  return isNaN(n) ? defaultVal : n;
}

/**
 * Normaliza un color antes de contar:
 * - minúsculas
 * - #rgb -> #rrggbb
 * - nombres CSS vía color-name -> #rrggbb
 * - rgb()/rgba() -> #rrggbb (ignora alfa)
 * - descarta none, transparent, inherit, currentcolor, url(...)
 */
export function normalizeColor(val) {
  if (!val || typeof val !== 'string') return null;
  const trimmed = val.trim().toLowerCase();
  if (
    !trimmed ||
    trimmed === 'none' ||
    trimmed === 'transparent' ||
    trimmed === 'inherit' ||
    trimmed === 'currentcolor' ||
    trimmed.startsWith('url(')
  ) {
    return null;
  }

  // #rgb -> #rrggbb
  if (/^#[0-9a-f]{3}$/i.test(trimmed)) {
    return (
      '#' +
      trimmed[1] +
      trimmed[1] +
      trimmed[2] +
      trimmed[2] +
      trimmed[3] +
      trimmed[3]
    ).toLowerCase();
  }

  // #rrggbb
  if (/^#[0-9a-f]{6}$/i.test(trimmed)) {
    return trimmed.toLowerCase();
  }

  // rgb(...) / rgba(...) -> #rrggbb
  const rgbMatch = trimmed.match(/^rgba?\s*\(([^)]+)\)/i);
  if (rgbMatch) {
    const nums = rgbMatch[1].match(NUM_REGEX);
    if (nums && nums.length >= 3) {
      const r = Math.min(255, Math.max(0, Math.round(Number(nums[0]))));
      const g = Math.min(255, Math.max(0, Math.round(Number(nums[1]))));
      const b = Math.min(255, Math.max(0, Math.round(Number(nums[2]))));
      return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
    }
  }

  // Nombres de color CSS mediante color-name
  if (colorName && colorName[trimmed]) {
    const [r, g, b] = colorName[trimmed];
    return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');
  }

  return trimmed;
}

/**
 * Extrae los endpoints de un path usando svgpath(d).abs().unshort().
 * Para el comando 'A' toma solo su endpoint (seg[6], seg[7]), sin .unarc().
 * Al encontrar Z/z, si el último endpoint coincide con el inicio del subpath (tolerancia 0.01),
 * lo elimina para evitar anclas duplicadas en trazados cerrados de Illustrator.
 */
export function getPathEndpoints(d) {
  if (!d) return [];
  const points = [];
  const parsed = svgpath(d).abs().unshort();
  let curX = 0;
  let curY = 0;
  let subpathStartX = 0;
  let subpathStartY = 0;
  let subpathStartIndex = 0;

  for (const seg of parsed.segments) {
    const cmd = seg[0];
    let endX = curX;
    let endY = curY;

    if (cmd === 'M') {
      subpathStartX = seg[1];
      subpathStartY = seg[2];
      subpathStartIndex = points.length;
      endX = subpathStartX;
      endY = subpathStartY;
      points.push({ x: endX, y: endY });
    } else if (cmd === 'L') {
      endX = seg[1];
      endY = seg[2];
      points.push({ x: endX, y: endY });
    } else if (cmd === 'C') {
      endX = seg[5];
      endY = seg[6];
      points.push({ x: endX, y: endY });
    } else if (cmd === 'Q') {
      endX = seg[3];
      endY = seg[4];
      points.push({ x: endX, y: endY });
    } else if (cmd === 'H') {
      endX = seg[1];
      endY = curY;
      points.push({ x: endX, y: endY });
    } else if (cmd === 'V') {
      endX = curX;
      endY = seg[1];
      points.push({ x: endX, y: endY });
    } else if (cmd === 'A') {
      // ['A', rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x, y]
      endX = seg[6];
      endY = seg[7];
      points.push({ x: endX, y: endY });
    } else if (cmd === 'Z') {
      // Al encontrar Z, si el último endpoint coincide con el inicio del subpath, se descarta el duplicado
      if (points.length > subpathStartIndex + 1) {
        const lastPt = points[points.length - 1];
        if (Math.hypot(lastPt.x - subpathStartX, lastPt.y - subpathStartY) < 0.01) {
          points.pop();
        }
      }
      // Tras Z el punto actual vuelve al inicio del subpath
      endX = subpathStartX;
      endY = subpathStartY;
    }

    curX = endX;
    curY = endY;
  }

  return points;
}

/**
 * Realiza el análisis completo de un SVG en un solo recorrido.
 * Obtiene métricas reales, anclas transformadas, imágenes y conteo de formas degeneradas.
 *
 * @param {string} svgContent - Contenido XML del SVG fuente
 * @returns {{
 *   doc: Document,
 *   stats: { paths: number, anchors: number, colors: number, artboard: [number, number] },
 *   anchors: Array<{ x: number, y: number }>,
 *   artboard: [number, number],
 *   images: Array<{ x: number, y: number, width: number, height: number, area: number, hash: string, hrefLength: number }>,
 *   degenerateCount: number
 * }}
 */
export function analyzeSvg(svgContent) {
  const doc = new DOMParser().parseFromString(svgContent, 'image/svg+xml');
  const svgEl = doc.documentElement;

  // 1. Mapeo de IDs para resolución de elementos <use> y gradientes
  const idMap = new Map();
  function indexIds(node) {
    if (!node || node.nodeType !== 1) return;
    const id = node.getAttribute('id');
    if (id) idMap.set(id, node);
    const childNodes = node.childNodes || [];
    for (let i = 0; i < childNodes.length; i++) {
      indexIds(childNodes[i]);
    }
  }
  indexIds(svgEl);

  // 2. Colores: mapear reglas CSS de clases desde etiquetas <style>
  const colorsSet = new Set();
  const classRules = new Map();
  const allStyles = Array.from(doc.getElementsByTagName('style'));

  for (const styleEl of allStyles) {
    const text = styleEl.textContent || '';
    const ruleRegex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
    let rMatch;
    while ((rMatch = ruleRegex.exec(text)) !== null) {
      const cls = rMatch[1];
      const body = rMatch[2];
      const rule = {};
      const fillMatch = body.match(/fill\s*:\s*([^;}\s]+)/i);
      if (fillMatch) rule.fill = fillMatch[1].trim();
      const strokeMatch = body.match(/stroke\s*:\s*([^;}\s]+)/i);
      if (strokeMatch) rule.stroke = strokeMatch[1].trim();
      classRules.set(cls, rule);
    }
  }

  // 3. Recorrido unificado de geometrías, métricas y anclas con composición matricial
  const anchors = [];
  const images = [];
  let pathsCount = 0;
  let degenerateCount = 0;
  const referencedGradientIds = new Set();

  function checkRefGradient(val) {
    if (!val || typeof val !== 'string') return;
    const m = val.match(/url\s*\(\s*#([^)]+)\s*\)/i);
    if (m) referencedGradientIds.add(m[1]);
  }

  /**
   * Recorre el árbol SVG componiendo matrices de transformación y resolviendo
   * herencia de fill y stroke.
   */
  function walk(el, parentMatrix, inheritedContext, isUseRef = false, useCycle = new Set()) {
    if (!el || el.nodeType !== 1) return;
    const tag = el.tagName.toLowerCase();

    // Ignorar elementos de definición y recursos no visibles salvo que sea llamado desde <use>
    if (!isUseRef && ['defs', 'clippath', 'mask', 'symbol', 'pattern', 'marker'].includes(tag)) {
      return;
    }

    // Ignorar elementos explícitamente ocultos
    const displayAttr = el.getAttribute('display');
    const visibilityAttr = el.getAttribute('visibility');
    const styleAttr = el.getAttribute('style') || '';
    if (
      displayAttr === 'none' ||
      visibilityAttr === 'hidden' ||
      /display\s*:\s*none/i.test(styleAttr) ||
      /visibility\s*:\s*hidden/i.test(styleAttr)
    ) {
      return;
    }

    // Componer matriz de transform con ancestros
    const localMatrix = parseTransform(el.getAttribute('transform'));
    const currentMatrix = multiplyMatrix(parentMatrix, localMatrix);

    // Resolución de herencia de fill y stroke
    const sFill = styleAttr.match(/fill\s*:\s*([^;]+)/i)?.[1]?.trim();
    const sStroke = styleAttr.match(/stroke\s*:\s*([^;]+)/i)?.[1]?.trim();
    const aFill = el.getAttribute('fill');
    const aStroke = el.getAttribute('stroke');

    let cFill = null;
    let cStroke = null;
    const classAttr = el.getAttribute('class');
    if (classAttr) {
      for (const cls of classAttr.trim().split(/\s+/)) {
        if (classRules.has(cls)) {
          const rule = classRules.get(cls);
          if (rule.fill) cFill = rule.fill;
          if (rule.stroke) cStroke = rule.stroke;
        }
      }
    }

    // Prioridad: style > presentación > clase > herencia
    const specifiedFill = sFill || aFill || cFill;
    let effectiveFill = inheritedContext.fill;
    if (specifiedFill !== undefined && specifiedFill !== null) {
      if (specifiedFill.toLowerCase() === 'inherit') {
        effectiveFill = inheritedContext.fill;
      } else {
        effectiveFill = specifiedFill;
      }
    }

    const specifiedStroke = sStroke || aStroke || cStroke;
    let effectiveStroke = inheritedContext.stroke;
    if (specifiedStroke !== undefined && specifiedStroke !== null) {
      if (specifiedStroke.toLowerCase() === 'inherit') {
        effectiveStroke = inheritedContext.stroke;
      } else {
        effectiveStroke = specifiedStroke;
      }
    }

    const currentContext = { fill: effectiveFill, stroke: effectiveStroke };

    // Elementos renderables de forma y geometrías
    const isShape = ['path', 'rect', 'circle', 'ellipse', 'polygon', 'polyline', 'line'].includes(tag);

    if (isShape) {
      let isDegenerate = false;

      if (tag === 'path') {
        const d = el.getAttribute('d') || '';
        if (!d.trim()) {
          isDegenerate = true;
        } else {
          try {
            const parsed = svgpath(d).abs().unshort();
            const drawingSegs = parsed.segments.filter(
              (s) => !['M', 'Z', 'm', 'z'].includes(s[0])
            );
            if (drawingSegs.length === 0) isDegenerate = true;
          } catch {
            isDegenerate = true;
          }
        }

        if (isDegenerate) {
          degenerateCount++;
        } else {
          pathsCount++;
          const endpoints = getPathEndpoints(d);
          for (const pt of endpoints) {
            anchors.push(applyMatrix(currentMatrix, pt.x, pt.y));
          }
        }
      } else if (tag === 'rect') {
        const w = parseNum(el.getAttribute('width'), 0);
        const h = parseNum(el.getAttribute('height'), 0);
        if (w <= 0 || h <= 0) {
          isDegenerate = true;
          degenerateCount++;
        } else {
          pathsCount++;
          const x = parseNum(el.getAttribute('x'), 0);
          const y = parseNum(el.getAttribute('y'), 0);
          anchors.push(applyMatrix(currentMatrix, x, y));
          anchors.push(applyMatrix(currentMatrix, x + w, y));
          anchors.push(applyMatrix(currentMatrix, x + w, y + h));
          anchors.push(applyMatrix(currentMatrix, x, y + h));
        }
      } else if (tag === 'circle') {
        const r = parseNum(el.getAttribute('r'), 0);
        if (r <= 0) {
          isDegenerate = true;
          degenerateCount++;
        } else {
          pathsCount++;
          const cx = parseNum(el.getAttribute('cx'), 0);
          const cy = parseNum(el.getAttribute('cy'), 0);
          anchors.push(applyMatrix(currentMatrix, cx, cy - r));
          anchors.push(applyMatrix(currentMatrix, cx + r, cy));
          anchors.push(applyMatrix(currentMatrix, cx, cy + r));
          anchors.push(applyMatrix(currentMatrix, cx - r, cy));
        }
      } else if (tag === 'ellipse') {
        const rx = parseNum(el.getAttribute('rx'), 0);
        const ry = parseNum(el.getAttribute('ry'), 0);
        if (rx <= 0 || ry <= 0) {
          isDegenerate = true;
          degenerateCount++;
        } else {
          pathsCount++;
          const cx = parseNum(el.getAttribute('cx'), 0);
          const cy = parseNum(el.getAttribute('cy'), 0);
          anchors.push(applyMatrix(currentMatrix, cx, cy - ry));
          anchors.push(applyMatrix(currentMatrix, cx + rx, cy));
          anchors.push(applyMatrix(currentMatrix, cx, cy + ry));
          anchors.push(applyMatrix(currentMatrix, cx - rx, cy));
        }
      } else if (tag === 'polygon' || tag === 'polyline') {
        const pointsAttr = el.getAttribute('points') || '';
        const numMatches = pointsAttr.match(NUM_REGEX) || [];
        if (numMatches.length < 4) {
          isDegenerate = true;
          degenerateCount++;
        } else {
          pathsCount++;
          for (let i = 0; i < numMatches.length - 1; i += 2) {
            const px = parseFloat(numMatches[i]);
            const py = parseFloat(numMatches[i + 1]);
            if (!isNaN(px) && !isNaN(py)) {
              anchors.push(applyMatrix(currentMatrix, px, py));
            }
          }
        }
      } else if (tag === 'line') {
        const x1 = parseNum(el.getAttribute('x1'), 0);
        const y1 = parseNum(el.getAttribute('y1'), 0);
        const x2 = parseNum(el.getAttribute('x2'), 0);
        const y2 = parseNum(el.getAttribute('y2'), 0);
        if (x1 === x2 && y1 === y2) {
          isDegenerate = true;
          degenerateCount++;
        } else {
          pathsCount++;
          anchors.push(applyMatrix(currentMatrix, x1, y1));
          anchors.push(applyMatrix(currentMatrix, x2, y2));
        }
      }

      // Si no es degenerada, cuenta sus colores efectivos
      if (!isDegenerate) {
        if (effectiveFill && effectiveFill !== 'none') {
          checkRefGradient(effectiveFill);
          const c = normalizeColor(effectiveFill);
          if (c) colorsSet.add(c);
        }
        if (effectiveStroke && effectiveStroke !== 'none') {
          checkRefGradient(effectiveStroke);
          const c = normalizeColor(effectiveStroke);
          if (c) colorsSet.add(c);
        }
      }
    } else if (tag === 'image') {
      // Elemento <image>: no cuenta como trazado ni nodos
      const x = parseNum(el.getAttribute('x'), 0);
      const y = parseNum(el.getAttribute('y'), 0);
      const w = parseNum(el.getAttribute('width'), 0);
      const h = parseNum(el.getAttribute('height'), 0);
      const href = el.getAttribute('href') || el.getAttribute('xlink:href') || '';

      // Vértices transformados con matriz compuesta
      const p1 = applyMatrix(currentMatrix, x, y);
      const p2 = applyMatrix(currentMatrix, x + w, y);
      const p3 = applyMatrix(currentMatrix, x + w, y + h);
      const p4 = applyMatrix(currentMatrix, x, y + h);

      const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
      const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
      const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
      const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

      const bboxWidth = Math.max(0, maxX - minX);
      const bboxHeight = Math.max(0, maxY - minY);
      const area = bboxWidth * bboxHeight;

      const hash = crypto.createHash('sha256').update(href).digest('hex');

      images.push({
        x: Math.round(minX * 100) / 100,
        y: Math.round(minY * 100) / 100,
        width: Math.round(bboxWidth * 100) / 100,
        height: Math.round(bboxHeight * 100) / 100,
        area: Math.round(area * 100) / 100,
        hash,
        hrefLength: href.length,
      });
    } else if (tag === 'use') {
      const href = el.getAttribute('href') || el.getAttribute('xlink:href') || '';
      const refId = href.replace(/^#/, '');
      if (refId && idMap.has(refId) && !useCycle.has(refId)) {
        const refEl = idMap.get(refId);
        const ux = parseNum(el.getAttribute('x'), 0);
        const uy = parseNum(el.getAttribute('y'), 0);
        const useOffset = parseTransform(`translate(${ux} ${uy})`);
        const useMatrix = multiplyMatrix(currentMatrix, useOffset);
        const nextCycle = new Set(useCycle);
        nextCycle.add(refId);
        walk(refEl, useMatrix, currentContext, true, nextCycle);
      }
    }

    // Recorrer hijos
    if (tag !== 'use') {
      const childCount = el.childNodes?.length || 0;
      for (let i = 0; i < childCount; i++) {
        walk(el.childNodes[i], currentMatrix, currentContext, isUseRef, useCycle);
      }
    }
  }

  // Contexto inicial en la raíz del documento:
  // En SVG, fill por defecto es #000000 y stroke es 'none'
  const rootStyleAttr = svgEl.getAttribute('style') || '';
  const rootSFill = rootStyleAttr.match(/fill\s*:\s*([^;]+)/i)?.[1]?.trim();
  const rootSStroke = rootStyleAttr.match(/stroke\s*:\s*([^;]+)/i)?.[1]?.trim();
  const rootAFill = svgEl.getAttribute('fill');
  const rootAStroke = svgEl.getAttribute('stroke');

  const initialContext = {
    fill: rootSFill || rootAFill || '#000000',
    stroke: rootSStroke || rootAStroke || 'none',
  };

  walk(svgEl, identityMatrix(), initialContext);

  // 4. Procesar stop-color de gradientes referenciados por elementos visibles
  for (const gid of referencedGradientIds) {
    const gradEl = idMap.get(gid);
    if (gradEl) {
      const stops = Array.from(gradEl.getElementsByTagName('stop'));
      for (const stop of stops) {
        const scAttr = stop.getAttribute('stop-color');
        if (scAttr) {
          const sc = normalizeColor(scAttr);
          if (sc) colorsSet.add(sc);
        }
        const sStyle = stop.getAttribute('style') || '';
        const styleMatch = sStyle.match(/stop-color\s*:\s*([^;]+)/i);
        if (styleMatch) {
          const sc = normalizeColor(styleMatch[1]);
          if (sc) colorsSet.add(sc);
        }
      }
    }
  }

  // 5. Dimensiones del artboard / viewBox
  let artboard = [800, 800];
  const viewBox = svgEl.getAttribute('viewBox');
  if (viewBox) {
    const parts = viewBox.trim().match(NUM_REGEX) || [];
    if (parts.length >= 4) {
      artboard = [Math.round(parseFloat(parts[2])), Math.round(parseFloat(parts[3]))];
    }
  } else {
    const w = parseNum(svgEl.getAttribute('width'), NaN);
    const h = parseNum(svgEl.getAttribute('height'), NaN);
    if (!isNaN(w) && !isNaN(h)) {
      artboard = [Math.round(w), Math.round(h)];
    }
  }

  return {
    doc,
    anchors,
    artboard,
    images,
    degenerateCount,
    stats: {
      paths: pathsCount,
      anchors: anchors.length,
      colors: colorsSet.size,
      artboard,
      rasters: images.length,
    },
  };
}

/**
 * Valida una pieza según las 10 reglas de calidad.
 *
 * @param {{
 *   slug: string,
 *   svgContent: string,
 *   originalMeta?: { width: number, height: number }
 * }} options
 * @returns {{
 *   status: 'OK' | 'AVISOS' | 'ERROR',
 *   errors: string[],
 *   warnings: string[],
 *   analysis: ReturnType<typeof analyzeSvg>
 * }}
 */
export function validateSvgPiece({
  slug,
  svgContent,
  originalMeta,
  originalFileName,
  inConfig = true,
}) {
  const errors = [];
  const warnings = [];

  // Aviso: Archivo original sin sufijo -original
  if (originalFileName && !originalFileName.includes('-original.')) {
    const ext = originalFileName.slice(originalFileName.lastIndexOf('.'));
    warnings.push(
      `Renombra source/${originalFileName} a ${slug}-original${ext}`
    );
  }

  // Aviso: Pieza en source/ que no está en vector.config.js
  if (inConfig === false) {
    warnings.push(
      `${slug} no está en vector.config.js: no aparecerá en la web hasta agregar su entrada.`
    );
  }

  // Regla 10: Validación del nombre del archivo (formato y espacios)
  const validSlug = /^(pieza|demo)-\d{2}$/.test(slug) && !/\s/.test(slug);
  if (!validSlug) {
    errors.push(
      `El nombre del archivo "${slug}.svg" no sigue 'pieza-NN' / 'demo-NN' o contiene espacios. Nombre esperado: ej. 'pieza-01.svg'.`
    );
  }

  // Regla 1: viewBox obligatorio en la raíz
  const viewBoxMatch = svgContent.match(/<svg\b[^>]*\bviewBox="([^"]+)"/i);
  if (!viewBoxMatch || !viewBoxMatch[1].trim()) {
    errors.push("No tiene viewBox. Exporta con 'Responsive' marcado y 'Use Artboards'.");
  }

  // Análisis unificado del SVG
  const analysis = analyzeSvg(svgContent);
  const { artboard, images, degenerateCount } = analysis;
  const [vbW, vbH] = artboard;
  const artboardArea = vbW * vbH;

  // Regla 2: Proporción del viewBox vs original difiere > 0.5%
  if (originalMeta && originalMeta.width && originalMeta.height) {
    const origW = originalMeta.width;
    const origH = originalMeta.height;
    const ratioVb = vbW / vbH;
    const ratioOrig = origW / origH;
    const diff = Math.abs(ratioVb - ratioOrig) / ratioOrig;
    if (diff > 0.005) {
      errors.push(
        `El artboard (${vbW}×${vbH}) y el original (${origW}×${origH}) no tienen la misma proporción: el slider no coincidirá. (Proporción artboard: ${ratioVb.toFixed(4)}, original: ${ratioOrig.toFixed(4)}, diferencia: ${(diff * 100).toFixed(2)}% > 0.5%).`
      );
    }
  }

  // Regla 3: <image> cubre >= 50% del área del artboard
  const hasLargeImage = images.some((img) => artboardArea > 0 && img.area / artboardArea >= 0.5);
  if (hasLargeImage) {
    errors.push(
      "Parece que el original quedó incrustado en el SVG. Borra esa capa en Illustrator y vuelve a exportar. (Una <image> cubre ≥ 50 % del área del artboard)."
    );
  }

  // Regla 4: <image> que cubren < 50%
  const smallImages = images.filter((img) => artboardArea > 0 && img.area / artboardArea < 0.5);
  if (smallImages.length > 0) {
    const details = smallImages
      .map(
        (i) =>
          `${Math.round(i.width)}×${Math.round(i.height)} px, ${((i.area / artboardArea) * 100).toFixed(1)}%`
      )
      .join('; ');
    warnings.push(
      `Contiene ${smallImages.length} imagen(es) raster (${details} del artboard); se mostrará el chip VECTOR + TRAMA RASTER y la trama atenuada en OUTLINE.`
    );
  }

  // Regla 5: <image> duplicadas (mismo hash)
  const hashCounts = new Map();
  for (const img of images) {
    hashCounts.set(img.hash, (hashCounts.get(img.hash) || 0) + 1);
  }
  let dupCount = 0;
  for (const count of hashCounts.values()) {
    if (count > 1) dupCount += count;
  }
  if (dupCount > 0) {
    warnings.push(`Hay ${dupCount} imágenes raster idénticas duplicadas (+KB innecesarios).`);
  }

  // Regla 6: contiene <text
  if (/<text\b/i.test(svgContent)) {
    warnings.push("Texto sin convertir a contornos; la fuente puede verse distinta.");
  }

  // Regla 7: contiene <style
  if (/<style\b/i.test(svgContent)) {
    warnings.push("Exportado con Internal CSS; se recomienda Presentation Attributes.");
  }

  // Regla 8: contiene data-name=
  if (/data-name=/i.test(svgContent)) {
    warnings.push("Exportado con Object IDs = Layer Names; se recomienda Minimal.");
  }

  // Regla 9: formas degeneradas ignoradas
  if (degenerateCount > 0) {
    warnings.push(
      `${degenerateCount} objetos vacíos (ancho/alto 0). En Illustrator: Object → Path → Clean Up.`
    );
  }

  let status = 'OK';
  if (errors.length > 0) {
    status = 'ERROR';
  } else if (warnings.length > 0) {
    status = 'AVISOS';
  }

  return {
    status,
    errors,
    warnings,
    analysis,
  };
}
