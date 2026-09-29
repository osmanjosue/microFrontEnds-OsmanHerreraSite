// ===========================================================================
// SCRIPT DE CONSTRUCCIÓN DE ASSETS — RASTER A WEBP Y MÉTRICAS
// ===========================================================================
// Este script se ejecuta en local. NUNCA publica los SVG fuente.
// Genera:
//   - vector.webp (máx 2400px lado largo, calidad 90)
//   - outline.webp (trazados cian adaptativos #00f0ff + anclas #ffb703 sobre fondo #0d0e13, máx 2400px, calidad 90)
//   - original.webp (máx 2400px lado largo, calidad 85, withoutEnlargement: true)
//   - thumb.webp (cuadrada 320×320 a partir de vector.webp, fit: contain, calidad 85)
//   - src/content/stats.json (métricas numéricas precalculadas + outlineAnchors)
// ===========================================================================

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { analyzeSvg, validateSvgPiece } from './svg-analyzer.mjs';
import { vectorConfig } from '../src/content/vector.config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const sourceDir = path.join(rootDir, 'source');
const publicWorksDir = path.join(rootDir, 'public', 'works');
const statsFilePath = path.join(rootDir, 'src', 'content', 'stats.json');

// Parsear argumento --only
const args = process.argv.slice(2);
let onlySlug = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === '--only' && args[i + 1]) {
    onlySlug = args[i + 1];
    i++;
  } else if (args[i].startsWith('--only=')) {
    onlySlug = args[i].split('=')[1];
  }
}

/**
 * Busca el archivo original en source/ con extensiones soportadas.
 */
function findOriginalFile(slug) {
  const extensions = ['.webp', '.jpg', '.jpeg', '.png'];
  for (const ext of extensions) {
    const p = path.join(sourceDir, `${slug}-original${ext}`);
    if (fs.existsSync(p)) {
      return { path: p, isLegacySuffix: false, fileName: `${slug}-original${ext}` };
    }
  }
  for (const ext of extensions) {
    const p = path.join(sourceDir, `${slug}${ext}`);
    if (fs.existsSync(p)) {
      return { path: p, isLegacySuffix: true, fileName: `${slug}${ext}` };
    }
  }
  return null;
}

/**
 * Convierte las imágenes raster incrustadas en base64 a escala de grises real mediante Sharp
 * para asegurar que librsvg las dibuje desaturadas en el modo OUTLINE.
 */
async function convertSvgImagesToGrayscale(svgString, slug) {
  const imageRegex = /<image\b([^>]*?)>/gi;
  let matches = [];
  let m;
  while ((m = imageRegex.exec(svgString)) !== null) {
    matches.push({ full: m[0], attrs: m[1] });
  }

  if (matches.length === 0) return svgString;

  let result = svgString;
  for (const match of matches) {
    const hrefMatch = match.attrs.match(/\b(?:href|xlink:href)="([^"]*)"/i);
    if (!hrefMatch) continue;

    const href = hrefMatch[1];
    if (href.startsWith('data:image/')) {
      try {
        const commaIdx = href.indexOf(',');
        if (commaIdx !== -1) {
          const base64Data = href.slice(commaIdx + 1);
          const inputBuf = Buffer.from(base64Data, 'base64');
          const grayBuf = await sharp(inputBuf).grayscale().png().toBuffer();
          const newHref = `data:image/png;base64,${grayBuf.toString('base64')}`;
          const updatedTag = match.full.replace(href, newHref);
          result = result.replace(match.full, updatedTag);
        }
      } catch (err) {
        console.warn(`[AVISO] Pieza "${slug}": no se pudo desaturar imagen raster: ${err.message}`);
      }
    } else {
      console.warn(
        `[AVISO] Pieza "${slug}": la imagen raster "${href}" es un enlace externo y no data URI; se aplicará solo opacidad .25 en OUTLINE.`
      );
    }
  }

  return result;
}

async function main() {
  console.log('═════════════════════════════════════════════════════════════════');
  console.log('  CONSTRUCTOR DE ASSETS — VECTOR WORK (WEBP + STATS)');
  console.log('═════════════════════════════════════════════════════════════════\n');

  if (!fs.existsSync(sourceDir)) {
    console.error(`Error: Carpeta source/ no encontrada en ${sourceDir}`);
    process.exit(1);
  }

  // Cargar estadísticas previas si existen
  let statsData = {};
  if (fs.existsSync(statsFilePath)) {
    try {
      statsData = JSON.parse(fs.readFileSync(statsFilePath, 'utf8'));
    } catch {
      statsData = {};
    }
  }

  // Descubrir todas las piezas disponibles en source/ y en vectorConfig
  const sourceSvgFiles = fs.readdirSync(sourceDir).filter((f) => f.endsWith('.svg'));
  const allSlugsSet = new Set();

  for (const f of sourceSvgFiles) {
    allSlugsSet.add(f.replace(/\.svg$/i, ''));
  }
  for (const w of vectorConfig.works) {
    allSlugsSet.add(w.slug);
  }

  const slugsToProcess = Array.from(allSlugsSet).filter((s) => {
    if (onlySlug) return s === onlySlug;
    return true;
  });

  if (slugsToProcess.length === 0) {
    console.warn(`No se encontraron piezas para procesar${onlySlug ? ` con slug "${onlySlug}"` : ''}.`);
    return;
  }

  const results = [];
  const validationIssues = [];
  let hasErrors = false;

  for (const slug of slugsToProcess) {
    const pieceConfig = vectorConfig.works.find((w) => w.slug === slug) || { slug };
    const svgPath = path.join(sourceDir, `${slug}.svg`);
    const origInfo = findOriginalFile(slug);
    const originalPath = origInfo ? origInfo.path : null;
    const originalFileName = origInfo ? origInfo.fileName : null;
    const inConfig = vectorConfig.works.some((w) => w.slug === slug);

    if (!fs.existsSync(svgPath)) {
      console.warn(`[AVISO] Se omitió "${slug}": falta el archivo SVG fuente en ${svgPath}`);
      continue;
    }

    console.log(`Evaluando pieza: ${slug}...`);
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    // Obtener metadatos de la imagen original si existe
    let originalMeta = null;
    if (originalPath) {
      try {
        originalMeta = await sharp(originalPath).metadata();
      } catch {
        originalMeta = null;
      }
    }

    // 1. Ejecutar validaciones previas de calidad
    const validation = validateSvgPiece({
      slug,
      svgContent,
      originalMeta,
      originalFileName,
      inConfig,
      pieceConfig,
      outline: pieceConfig.outline,
      thumb: pieceConfig.thumb,
    });

    const isError = validation.status === 'ERROR';
    if (isError) {
      hasErrors = true;
    }

    if (validation.errors.length > 0 || validation.warnings.length > 0) {
      validationIssues.push({
        slug,
        status: validation.status,
        errors: validation.errors,
        warnings: validation.warnings,
      });
    }

    // Si hubo ERROR, se omite la generación de assets para esta pieza
    if (isError) {
      console.error(`  ✖ [ERROR] Pieza "${slug}" omitida por errores de validación.`);
      results.push({
        slug,
        paths: '—',
        anchors: '—',
        colors: '—',
        artboard: '—',
        vectorSize: '—',
        thumbSize: '—',
        outlineSize: '—',
        origSize: '—',
        Validación: 'ERROR',
      });
      continue;
    }

    if (!originalPath) {
      console.warn(`[AVISO] Se omitió "${slug}": falta el archivo original en source/${slug}-original.{webp,jpg,jpeg,png}`);
      results.push({
        slug,
        paths: validation.analysis.stats.paths,
        anchors: validation.analysis.stats.anchors,
        colors: validation.analysis.stats.colors,
        artboard: `${validation.analysis.artboard[0]}×${validation.analysis.artboard[1]}`,
        vectorSize: '—',
        thumbSize: '—',
        outlineSize: '—',
        origSize: '—',
        Validación: 'ERROR',
      });
      hasErrors = true;
      continue;
    }

    // 2. Procesamiento de assets para piezas válidas
    const { stats, anchors, artboard } = validation.analysis;
    const [vbW, vbH] = artboard;
    const longSide = Math.max(vbW, vbH) || 800;

    // Calcular dimensiones de salida (máx 2400 en el lado largo)
    let targetW = 2400;
    let targetH = 2400;
    if (vbW >= vbH) {
      targetW = 2400;
      targetH = Math.max(1, Math.round(2400 * (vbH / vbW)));
    } else {
      targetH = 2400;
      targetW = Math.max(1, Math.round(2400 * (vbW / vbH)));
    }

    // Densidad para renderizar nítido a 2400px en sharp (librsvg)
    const density = Math.max(72, Math.round((2400 / longSide) * 72));

    // Directorio de salida
    const outDir = path.join(publicWorksDir, slug);
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    // 2.1 vector.webp
    const vectorSvg = svgContent.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
      let cleaned = attrs.replace(/\bwidth="[^"]*"/gi, '').replace(/\bheight="[^"]*"/gi, '');
      return `<svg width="${targetW}" height="${targetH}" ${cleaned}>`;
    });

    const vectorOutPath = path.join(outDir, 'vector.webp');
    let vectorPipeline = sharp(Buffer.from(vectorSvg), { density }).resize(targetW, targetH);
    if (pieceConfig.vectorBackground) {
      vectorPipeline = vectorPipeline.flatten({ background: pieceConfig.vectorBackground });
    }
    await vectorPipeline.webp({ quality: 90 }).toFile(vectorOutPath);

    // 2.2 thumb.webp (cuadrada 320×320 a partir de vector.webp, fit: contain, fondo transparente)
    const thumbOutPath = path.join(outDir, 'thumb.webp');
    await sharp(vectorOutPath)
      .resize(320, 320, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 85 })
      .toFile(thumbOutPath);

    // 2.3 outline.webp adaptativo según densidad
    const totalAnchors = stats.anchors;
    let defAnchors = 'on';
    let defAnchorSize = 16;
    let defStroke = 6;

    if (totalAnchors > 20000) {
      defAnchors = 'off';
      defAnchorSize = 0;
      defStroke = 2;
    } else if (totalAnchors > 3000) {
      defAnchors = 'on';
      defAnchorSize = 6;
      defStroke = 3;
    }

    // Override opcional en vector.config.js: { outlineOptions: { anchors, anchorSize, stroke, rasters } }
    const outlineCfg = pieceConfig.outlineOptions || {};
    const anchorsMode = outlineCfg.anchors || 'auto';
    const drawAnchors =
      anchorsMode === 'on' ? true : anchorsMode === 'off' ? false : defAnchors === 'on';
    const finalAnchorSize =
      typeof outlineCfg.anchorSize === 'number' ? outlineCfg.anchorSize : defAnchorSize;
    const finalStroke =
      typeof outlineCfg.stroke === 'number' ? outlineCfg.stroke : defStroke;
    const rastersMode = outlineCfg.rasters || 'dim'; // 'dim' | 'hide'

    const scaleFactor = 2400 / longSide;
    const strokeWidthInVb = Math.max(0.5, (finalStroke / scaleFactor).toFixed(3));
    const anchorSizeInVb = Math.max(1, (finalAnchorSize / scaleFactor).toFixed(3));

    // Dibujar anclas si corresponde
    let anchorRects = '';
    if (drawAnchors && anchors.length > 0) {
      const halfAnchor = anchorSizeInVb / 2;
      for (const v of anchors) {
        const rx = (v.x - halfAnchor).toFixed(2);
        const ry = (v.y - halfAnchor).toFixed(2);
        anchorRects += `<rect class="anchor-node" x="${rx}" y="${ry}" width="${anchorSizeInVb}" height="${anchorSizeInVb}" fill="#ffb703" stroke="none" />`;
      }
    }

    // En el outline, las <image> se dibujan ATENUADAS por defecto (o se ocultan si rasters: 'hide')
    const imageStyle =
      rastersMode === 'hide'
        ? 'image{display:none!important;}'
        : 'image{opacity:.25!important;}';

    const outlineStyle = `<style>*:not(.anchor-node):not(image){fill:none!important;stroke:#00f0ff!important;stroke-width:${strokeWidthInVb}px!important;stroke-opacity:1!important;vector-effect:non-scaling-stroke;}${imageStyle}.anchor-node{fill:#ffb703!important;stroke:none!important;opacity:1!important;}</style>`;

    let outlineSvgContent = vectorSvg.replace(/(<svg\b[^>]*>)/i, `$1${outlineStyle}`);
    if (anchorRects) {
      outlineSvgContent = outlineSvgContent.replace(
        /<\/svg>/i,
        `<g class="anchor-nodes-group">${anchorRects}</g></svg>`
      );
    }

    if (rastersMode !== 'hide') {
      outlineSvgContent = await convertSvgImagesToGrayscale(outlineSvgContent, slug);
    }

    const outlineOutPath = path.join(outDir, 'outline.webp');
    await sharp(Buffer.from(outlineSvgContent), { density })
      .resize(targetW, targetH)
      .flatten({ background: '#0d0e13' })
      .webp({ quality: 90 })
      .toFile(outlineOutPath);

    // 2.3 original.webp (withoutEnlargement: true)
    const originalOutPath = path.join(outDir, 'original.webp');
    await sharp(originalPath)
      .resize(2400, 2400, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 85 })
      .toFile(originalOutPath);

    // Actualizar stats.json con la métrica outlineAnchors
    statsData[slug] = {
      ...stats,
      outlineAnchors: drawAnchors,
    };

    results.push({
      slug,
      paths: stats.paths,
      anchors: stats.anchors,
      colors: stats.colors,
      rasters: stats.rasters,
      artboard: `${stats.artboard[0]}×${stats.artboard[1]}`,
      vectorSize: (fs.statSync(vectorOutPath).size / 1024).toFixed(1) + ' KB',
      thumbSize: (fs.statSync(thumbOutPath).size / 1024).toFixed(1) + ' KB',
      outlineSize: (fs.statSync(outlineOutPath).size / 1024).toFixed(1) + ' KB',
      origSize: (fs.statSync(originalOutPath).size / 1024).toFixed(1) + ' KB',
      Validación: validation.status,
    });
  }

  // Ordenar claves de stats.json según el orden de vectorConfig.works (y alfabéticamente las restantes)
  const sortedStatsData = {};
  const configSlugs = (vectorConfig.works || []).map((w) => w.slug);
  for (const slug of configSlugs) {
    if (statsData[slug]) {
      sortedStatsData[slug] = statsData[slug];
    }
  }
  const remainingSlugs = Object.keys(statsData)
    .filter((slug) => !configSlugs.includes(slug))
    .sort();
  for (const slug of remainingSlugs) {
    sortedStatsData[slug] = statsData[slug];
  }

  // Guardar src/content/stats.json
  fs.writeFileSync(statsFilePath, JSON.stringify(sortedStatsData, null, 2), 'utf8');
  console.log(`\n✔ src/content/stats.json actualizado con ${Object.keys(sortedStatsData).length} pieza(s).`);

  // Imprimir tabla resumen
  console.log('\n--- TABLA RESUMEN DE ASSETS GENERADOS ---');
  console.table(results);

  // Listar avisos y errores debajo de la tabla
  if (validationIssues.length > 0) {
    console.log('\n--- DETALLE DE VALIDACIONES ---');
    for (const issue of validationIssues) {
      console.log(`\n[${issue.status}] Pieza: "${issue.slug}"`);
      for (const err of issue.errors) {
        console.log(`  ✖ ERROR: ${err}`);
      }
      for (const warn of issue.warnings) {
        console.log(`  ⚠ AVISO: ${warn}`);
      }
    }
  }

  console.log('\n═════════════════════════════════════════════════════════════════');
  console.log('  RECORDATORIO PARA PRODUCCIÓN:');
  for (const r of results.filter((r) => r.Validación !== 'ERROR')) {
    console.log(`  Sube public/works/${r.slug}/*.webp a VPS o R2 en vectorwork/works/${r.slug}/`);
  }
  console.log('═════════════════════════════════════════════════════════════════\n');

  if (hasErrors) {
    console.error('✖ Proceso finalizado con código 1 debido a errores de validación.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error fatal durante la construcción de assets:', err);
  process.exit(1);
});
