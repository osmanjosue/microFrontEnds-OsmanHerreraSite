// ===========================================================================
// SUITE DE TESTS: SVG ANALYZER Y FIXTURE DE ILLUSTRATOR
// ===========================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { analyzeSvg, validateSvgPiece } from './svg-analyzer.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const fixturePath = path.join(rootDir, 'scripts', 'fixtures', 'illustrator-sample.svg');
const outDir = path.join(rootDir, 'scripts', 'fixtures', 'out');
const screenshotsDir = path.join(rootDir, '.screenshots');

// ---------------------------------------------------------------------------
// 1. TESTS UNITARIOS (6 CASOS ESPECÍFICOS)
// ---------------------------------------------------------------------------
function runUnitTests() {
  console.log('═════════════════════════════════════════════════════════════════');
  console.log('  TESTS UNITARIOS: CASOS TÍPICOS DE ILLUSTRATOR (6 CASOS)');
  console.log('═════════════════════════════════════════════════════════════════\n');

  const unitResults = [];

  // Caso 1: Trazado cerrado Illustrator con duplicado inicial antes de z
  // Debe descartar el endpoint duplicado al cerrar con z -> 4 nodos reales
  const u1Svg = `<svg viewBox="0 0 500 500"><path d="M100,100c0-27.6,22.4-50,50-50s50,22.4,50,50s-22.4,50-50,50S100,127.6,100,100z"/></svg>`;
  const u1 = analyzeSvg(u1Svg);
  const u1Pass = u1.stats.anchors === 4 && u1.stats.paths === 1;
  unitResults.push({
    Caso: '1. Trazado cerrado Illustrator (deduplicación z)',
    Esperado: 'anchors: 4, paths: 1',
    Obtenido: `anchors: ${u1.stats.anchors}, paths: ${u1.stats.paths}`,
    Resultado: u1Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 2: Grupo con translate y path con Z
  const u2Svg = `<svg viewBox="0 0 500 500"><g transform="translate(300 300)"><path d="M10.5,20.2l40.5.5-20,30.5z"/></g></svg>`;
  const u2 = analyzeSvg(u2Svg);
  const u2First = u2.anchors[0] || { x: 0, y: 0 };
  const u2Pass =
    u2.stats.anchors === 3 &&
    Math.abs(u2First.x - 310.5) < 0.01 &&
    Math.abs(u2First.y - 320.2) < 0.01;
  unitResults.push({
    Caso: '2. Grupo translate + path (vértice transformado)',
    Esperado: 'anchors: 3, primer ancla: (310.5, 320.2)',
    Obtenido: `anchors: ${u2.stats.anchors}, primer ancla: (${u2First.x.toFixed(1)}, ${u2First.y.toFixed(1)})`,
    Resultado: u2Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 3: Path con arco 'a' (sin unarc, un arco = 1 nodo)
  const u3Svg = `<svg viewBox="0 0 800 800"><path d="M600,100a50,50 0 0 1 100,0"/></svg>`;
  const u3 = analyzeSvg(u3Svg);
  const u3Pass = u3.stats.anchors === 2;
  unitResults.push({
    Caso: '3. Path con arco (sin desglose, 1 arco = 1 ancla)',
    Esperado: 'anchors: 2',
    Obtenido: `anchors: ${u3.stats.anchors}`,
    Resultado: u3Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 4: Rect con matrix compacta sin espacios entre signos
  const u4Svg = `<svg viewBox="0 0 500 500"><rect x="0" y="0" width="100" height="50" transform="matrix(1 0 0 1-50-20)"/></svg>`;
  const u4 = analyzeSvg(u4Svg);
  const u4First = u4.anchors[0] || { x: 0, y: 0 };
  const u4Pass =
    u4.stats.anchors === 4 &&
    Math.abs(u4First.x - (-50)) < 0.01 &&
    Math.abs(u4First.y - (-20)) < 0.01;
  unitResults.push({
    Caso: '4. Rect con matrix compacta (1 0 0 1-50-20)',
    Esperado: 'anchors: 4, primer ancla: (-50, -20)',
    Obtenido: `anchors: ${u4.stats.anchors}, primer ancla: (${u4First.x.toFixed(1)}, ${u4First.y.toFixed(1)})`,
    Resultado: u4Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 5: clipPath en defs con rect + g con polygon visible + g con display:none
  const u5Svg = `<svg viewBox="0 0 500 500">
    <defs><clipPath id="c"><rect x="0" y="0" width="50" height="50"/></clipPath></defs>
    <g clip-path="url(#c)"><polygon points="0,0 10,0 10,10"/></g>
    <g style="display:none"><circle cx="20" cy="20" r="10"/></g>
  </svg>`;
  const u5 = analyzeSvg(u5Svg);
  const u5Pass = u5.stats.anchors === 3 && u5.stats.paths === 1;
  unitResults.push({
    Caso: '5. Filtrado defs/clipPath y display:none',
    Esperado: 'anchors: 3, paths: 1',
    Obtenido: `anchors: ${u5.stats.anchors}, paths: ${u5.stats.paths}`,
    Resultado: u5Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 6: Normalización de colores CSS, hex y nombres
  const u6Svg = `<svg viewBox="0 0 500 500">
    <style>.st0{fill:#FFFFFF;}.st1{fill:#E63946;}</style>
    <path class="st0" d="M0,0L1,1"/>
    <path fill="#fff" d="M2,2L3,3"/>
    <path style="fill:white" d="M4,4L5,5"/>
    <path class="st1" d="M6,6L7,7"/>
  </svg>`;
  const u6 = analyzeSvg(u6Svg);
  const u6Pass = u6.stats.colors === 2;
  unitResults.push({
    Caso: '6. Normalización de colores (#FFFFFF, #fff, white = 1 color)',
    Esperado: 'colors: 2',
    Obtenido: `colors: ${u6.stats.colors}`,
    Resultado: u6Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 7: 3 paths: uno con fill="#fff", dos sin fill -> colors 2 (#ffffff, #000000)
  const u7Svg = `<svg viewBox="0 0 500 500">
    <path fill="#fff" d="M0,0L10,10"/>
    <path d="M10,10L20,20"/>
    <path d="M20,20L30,30"/>
  </svg>`;
  const u7 = analyzeSvg(u7Svg);
  const u7Pass = u7.stats.colors === 2 && u7.stats.paths === 3;
  unitResults.push({
    Caso: '7. Relleno implícito negro (1 con fill="#fff", 2 sin fill -> 2 colores)',
    Esperado: 'colors: 2 (#ffffff, #000000), paths: 3',
    Obtenido: `colors: ${u7.stats.colors}, paths: ${u7.stats.paths}`,
    Resultado: u7Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 8: <g fill="none"><path d="M0,0h1v1z"/></g> sin stroke -> colors 0
  const u8Svg = `<svg viewBox="0 0 500 500">
    <g fill="none"><path d="M0,0h1v1z"/></g>
  </svg>`;
  const u8 = analyzeSvg(u8Svg);
  const u8Pass = u8.stats.colors === 0 && u8.stats.paths === 1;
  unitResults.push({
    Caso: '8. Herencia fill="none" sin stroke (colors: 0)',
    Esperado: 'colors: 0, paths: 1',
    Obtenido: `colors: ${u8.stats.colors}, paths: ${u8.stats.paths}`,
    Resultado: u8Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 9: <g fill="red"><path d="M0,0h1v1z"/></g> -> colors 1
  const u9Svg = `<svg viewBox="0 0 500 500">
    <g fill="red"><path d="M0,0h1v1z"/></g>
  </svg>`;
  const u9 = analyzeSvg(u9Svg);
  const u9Pass = u9.stats.colors === 1 && u9.stats.paths === 1;
  unitResults.push({
    Caso: '9. Herencia fill="red" desde ancestro <g> (colors: 1)',
    Esperado: 'colors: 1, paths: 1',
    Obtenido: `colors: ${u9.stats.colors}, paths: ${u9.stats.paths}`,
    Resultado: u9Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 10: rect width="0" + rect normal -> paths 1, anchors 4
  const u10Svg = `<svg viewBox="0 0 500 500">
    <rect x="0" y="0" width="0" height="100"/>
    <rect x="10" y="10" width="50" height="50"/>
  </svg>`;
  const u10 = analyzeSvg(u10Svg);
  const u10Pass = u10.stats.paths === 1 && u10.stats.anchors === 4 && u10.degenerateCount === 1;
  unitResults.push({
    Caso: '10. Forma degenerada rect width="0" ignorada (paths: 1, anchors: 4)',
    Esperado: 'paths: 1, anchors: 4, degenerate: 1',
    Obtenido: `paths: ${u10.stats.paths}, anchors: ${u10.stats.anchors}, degenerate: ${u10.degenerateCount}`,
    Resultado: u10Pass ? '✔ PASS' : '✖ FAIL',
  });

  // Caso 11: <image> pequeña + path -> paths 1, images 1, rasters 1 y área 1200
  const u11Svg = `<svg viewBox="0 0 500 500">
    <image x="10" y="10" width="40" height="30" href="data:image/png;base64,iVBORw0KGgo="/>
    <path d="M0,0h1v1z"/>
  </svg>`;
  const u11 = analyzeSvg(u11Svg);
  const u11Img = u11.images[0];
  const u11Pass =
    u11.stats.paths === 1 &&
    u11.images.length === 1 &&
    u11.stats.rasters === 1 &&
    u11Img &&
    Math.abs(u11Img.area - 1200) < 0.1;
  unitResults.push({
    Caso: '11. <image> pequeña -> stats.rasters = 1, paths = 1 y área 1200',
    Esperado: 'paths: 1, images: 1, rasters: 1, área: 1200',
    Obtenido: `paths: ${u11.stats.paths}, images: ${u11.images.length}, rasters: ${u11.stats.rasters}, área: ${u11Img ? u11Img.area : 'null'}`,
    Resultado: u11Pass ? '✔ PASS' : '✖ FAIL',
  });

  console.table(unitResults);

  const allUnitPassed = unitResults.every((r) => r.Resultado === '✔ PASS');
  if (!allUnitPassed) {
    console.error('\nERROR: Al menos un test unitario falló.');
    process.exit(1);
  }
  console.log('✔ Los 11 tests unitarios pasaron correctamente.\n');
}

// ---------------------------------------------------------------------------
// 2. TEST DEL FIXTURE DE ILLUSTRATOR COMPLETO
// ---------------------------------------------------------------------------
// RECALCULO A MANO DE LOS VALORES ESPERADOS:
// 1. paths: 6
//    - path (compact numbers): 1
//    - path (grupo translate con arco A): 1
//    - rect (con matrix): 1
//    - polygon (en grupo rotate): 1
//    - circle (en grupo rotate): 1
//    - use (instancia #reusable-star): 1
//    (defs, template oculto y display:none ignorados)
//
// 2. anchors: 27
//    - compact path (M, C, L, H): 4
//    - arc path (M, A, L, L; Z no agrega nodo extra): 4 (el arco cuenta como 1 solo nodo de llegada)
//    - matrix rect (4 esquinas): 4
//    - polygon (3 vértices): 3
//    - circle (4 puntos cardinales): 4
//    - use reusable-star (estrella de 8 puntas): 8
//    Total = 4 + 4 + 4 + 3 + 4 + 8 = 27
//
// 3. colors: 5
//    - #118ab2 (fill st0)
//    - #073b4c (stroke st0)
//    - #ef476f (fill st1)
//    - #06d6a0 (fill st2)
//    - #ffd166 (fill st3)
//
// 4. artboard: [800, 800]
// ---------------------------------------------------------------------------
const EXPECTED_FIXTURE = {
  paths: 6,
  anchors: 27,
  colors: 5,
  artboard: [800, 800],
};

async function runFixtureTest() {
  console.log('═════════════════════════════════════════════════════════════════');
  console.log('  TEST DE VALIDACIÓN: FIXTURE COMPLETO DE ILLUSTRATOR');
  console.log('═════════════════════════════════════════════════════════════════\n');

  if (!fs.existsSync(fixturePath)) {
    console.error(`Error: Fixture no encontrado en ${fixturePath}`);
    process.exit(1);
  }

  const svgContent = fs.readFileSync(fixturePath, 'utf8');
  const { stats, anchors, artboard } = analyzeSvg(svgContent);

  const [vbW, vbH] = artboard;
  const longSide = Math.max(vbW, vbH);
  const targetW = 2400;
  const targetH = 2400;
  const scaleFactor = 2400 / longSide;
  const density = Math.round((2400 / longSide) * 72);

  // Anclas: 16px en salida de 2400px
  // Trazo: 6px en salida de 2400px en color #00f0ff puro
  const strokeWidthInVb = Math.max(0.5, (6 / scaleFactor).toFixed(3));
  const anchorSizeInVb = Math.max(1, (16 / scaleFactor).toFixed(3));
  const halfAnchor = anchorSizeInVb / 2;

  let anchorRects = '';
  for (const pt of anchors) {
    const rx = (pt.x - halfAnchor).toFixed(2);
    const ry = (pt.y - halfAnchor).toFixed(2);
    anchorRects += `<rect class="anchor-node" x="${rx}" y="${ry}" width="${anchorSizeInVb}" height="${anchorSizeInVb}" fill="#ffb703" stroke="none" />`;
  }

  const outlineStyle = `<style>*:not(.anchor-node){fill:none!important;stroke:#00f0ff!important;stroke-width:${strokeWidthInVb}px!important;stroke-opacity:1!important;vector-effect:non-scaling-stroke;}.anchor-node{fill:#ffb703!important;stroke:none!important;opacity:1!important;}</style>`;

  let outlineSvg = svgContent.replace(/<svg\b([^>]*)>/i, (m, attrs) => {
    let cleaned = attrs.replace(/\bwidth="[^"]*"/gi, '').replace(/\bheight="[^"]*"/gi, '');
    return `<svg width="${targetW}" height="${targetH}" ${cleaned}>${outlineStyle}`;
  });

  if (anchorRects) {
    outlineSvg = outlineSvg.replace(/<\/svg>/i, `<g class="anchor-nodes-group">${anchorRects}</g></svg>`);
  }

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const outlineWebpPath = path.join(outDir, 'outline.webp');
  await sharp(Buffer.from(outlineSvg), { density })
    .resize(targetW, targetH)
    .flatten({ background: '#0d0e13' })
    .webp({ quality: 90 })
    .toFile(outlineWebpPath);

  // Renderizar también vector.webp
  const vectorSvg = svgContent.replace(/<svg\b([^>]*)>/i, (m, attrs) => {
    let cleaned = attrs.replace(/\bwidth="[^"]*"/gi, '').replace(/\bheight="[^"]*"/gi, '');
    return `<svg width="${targetW}" height="${targetH}" ${cleaned}>`;
  });
  const vectorWebpPath = path.join(outDir, 'vector.webp');
  await sharp(Buffer.from(vectorSvg), { density })
    .resize(targetW, targetH)
    .webp({ quality: 90 })
    .toFile(vectorWebpPath);

  // Generar ampliación (crop 800x800 centrado en los trazados con arco, matrix y rotate)
  // para verificar visualmente que cada ancla cae exactamente sobre un vértice sin duplicados
  const zoomCropPath = path.join(screenshotsDir, 'screenshot-fixture-zoom.png');
  await sharp(outlineWebpPath)
    .extract({ left: 300, top: 150, width: 1200, height: 1200 })
    .resize(800, 800)
    .png()
    .toFile(zoomCropPath);

  console.log('Comparativa de Métricas del Fixture:');
  const comparison = [
    { Métrica: 'Paths (trazados)', Esperado: EXPECTED_FIXTURE.paths, Calculado: stats.paths, OK: stats.paths === EXPECTED_FIXTURE.paths ? '✔' : '✖' },
    { Métrica: 'Anchors (anclas)', Esperado: EXPECTED_FIXTURE.anchors, Calculado: stats.anchors, OK: stats.anchors === EXPECTED_FIXTURE.anchors ? '✔' : '✖' },
    { Métrica: 'Colors (colores)', Esperado: EXPECTED_FIXTURE.colors, Calculado: stats.colors, OK: stats.colors === EXPECTED_FIXTURE.colors ? '✔' : '✖' },
    { Métrica: 'Artboard', Esperado: EXPECTED_FIXTURE.artboard.join('×'), Calculado: stats.artboard.join('×'), OK: stats.artboard.join('×') === EXPECTED_FIXTURE.artboard.join('×') ? '✔' : '✖' },
  ];
  console.table(comparison);

  console.log(`\nArchivos generados en ${outDir}:`);
  console.log(`- ${path.basename(vectorWebpPath)} (${(fs.statSync(vectorWebpPath).size / 1024).toFixed(1)} KB)`);
  console.log(`- ${path.basename(outlineWebpPath)} (${(fs.statSync(outlineWebpPath).size / 1024).toFixed(1)} KB)`);
  console.log(`Ampliación visual guardada en:`);
  console.log(`- .screenshots/screenshot-fixture-zoom.png`);

  const allPassed = comparison.every((c) => c.OK === '✔');
  if (!allPassed) {
    console.error('\nERROR: Una o más métricas del fixture no coinciden con los valores esperados.');
    process.exit(1);
  }

  console.log('\n✔ TEST DE FIXTURE COMPLETADO CON ÉXITO: 100% de métricas coincidentes.');
}

// ---------------------------------------------------------------------------
// 3. TESTS DE VALIDACIONES PREVIAS (10 REGLAS DE CONTROL DE CALIDAD)
// ---------------------------------------------------------------------------
function runValidationTests() {
  console.log('\n═════════════════════════════════════════════════════════════════');
  console.log('  TESTS DE VALIDACIÓN: 10 REGLAS PREVIAS DE CONTROL DE CALIDAD');
  console.log('═════════════════════════════════════════════════════════════════\n');

  const vResults = [];

  // V1: Sin viewBox -> ERROR
  const v1 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg width="100" height="100"><rect width="10" height="10"/></svg>',
  });
  const v1Pass = v1.status === 'ERROR' && v1.errors.some((e) => e.includes('viewBox'));
  vResults.push({
    Regla: '1. Sin viewBox',
    Esperado: 'ERROR (viewBox faltante)',
    Obtenido: `${v1.status} (${v1.errors[0] || 'sin mensaje'})`,
    Resultado: v1Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V2: Proporción difiere > 0.5% -> ERROR
  const v2 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><rect width="10" height="10"/></svg>',
    originalMeta: { width: 100, height: 120 },
  });
  const v2Pass = v2.status === 'ERROR' && v2.errors.some((e) => e.includes('misma proporción'));
  vResults.push({
    Regla: '2. Proporción viewBox vs original > 0.5%',
    Esperado: 'ERROR (desalineación de proporción)',
    Obtenido: `${v2.status} (${v2.errors[0] || 'sin mensaje'})`,
    Resultado: v2Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V3: <image> cubre >= 50% -> ERROR
  const v3 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><image x="0" y="0" width="80" height="80" href="data:image/png;base64,abc"/><rect width="10" height="10"/></svg>',
  });
  const v3Pass = v3.status === 'ERROR' && v3.errors.some((e) => e.includes('original quedó incrustado'));
  vResults.push({
    Regla: '3. <image> cubre >= 50% artboard',
    Esperado: 'ERROR (original incrustado detectado)',
    Obtenido: `${v3.status} (${v3.errors[0] || 'sin mensaje'})`,
    Resultado: v3Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V4: <image> cubre < 50% -> AVISO (técnica mixta: chip y outline atenuado)
  const v4 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><image x="0" y="0" width="20" height="20" href="data:image/png;base64,abc"/><rect width="10" height="10"/></svg>',
  });
  const v4Pass =
    v4.status === 'AVISOS' &&
    v4.analysis.stats.rasters === 1 &&
    v4.warnings.some(
      (w) => w.includes('VECTOR + TRAMA RASTER') && w.includes('atenuada en OUTLINE')
    );
  vResults.push({
    Regla: '4. <image> cubre < 50% artboard (técnica mixta)',
    Esperado: 'AVISOS (chip VECTOR + TRAMA RASTER y trama atenuada en OUTLINE)',
    Obtenido: `${v4.status} (${v4.warnings[0] || 'sin mensaje'})`,
    Resultado: v4Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V5: <image> duplicadas -> AVISO
  const v5 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><image x="0" y="0" width="10" height="10" href="data:image/png;base64,duplicate"/><image x="20" y="20" width="10" height="10" href="data:image/png;base64,duplicate"/><rect width="10" height="10"/></svg>',
  });
  const v5Pass = v5.status === 'AVISOS' && v5.warnings.some((w) => w.includes('duplicadas'));
  vResults.push({
    Regla: '5. <image> idénticas duplicadas',
    Esperado: 'AVISOS (duplicadas detectadas)',
    Obtenido: `${v5.status} (${v5.warnings.find((w) => w.includes('duplicadas')) || 'sin mensaje'})`,
    Resultado: v5Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V6: Contiene <text -> AVISO
  const v6 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><text x="10" y="10">ABC</text></svg>',
  });
  const v6Pass = v6.status === 'AVISOS' && v6.warnings.some((w) => w.includes('Texto sin convertir'));
  vResults.push({
    Regla: '6. Contiene <text',
    Esperado: 'AVISOS (fuente sin contornear)',
    Obtenido: `${v6.status} (${v6.warnings[0] || 'sin mensaje'})`,
    Resultado: v6Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V7: Contiene <style -> AVISO
  const v7 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><style>.cls{fill:red;}</style><rect class="cls" width="10" height="10"/></svg>',
  });
  const v7Pass = v7.status === 'AVISOS' && v7.warnings.some((w) => w.includes('Internal CSS'));
  vResults.push({
    Regla: '7. Contiene <style',
    Esperado: 'AVISOS (Internal CSS vs Presentation Attributes)',
    Obtenido: `${v7.status} (${v7.warnings[0] || 'sin mensaje'})`,
    Resultado: v7Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V8: Contiene data-name= -> AVISO
  const v8 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><g data-name="Layer 1"><rect width="10" height="10"/></g></svg>',
  });
  const v8Pass = v8.status === 'AVISOS' && v8.warnings.some((w) => w.includes('Object IDs = Layer Names'));
  vResults.push({
    Regla: '8. Contiene data-name=',
    Esperado: 'AVISOS (Layer Names vs Minimal)',
    Obtenido: `${v8.status} (${v8.warnings[0] || 'sin mensaje'})`,
    Resultado: v8Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V9: Formas degeneradas ignoradas -> AVISO
  const v9 = validateSvgPiece({
    slug: 'demo-01',
    svgContent: '<svg viewBox="0 0 100 100"><rect width="0" height="10"/><rect width="10" height="10"/></svg>',
  });
  const v9Pass = v9.status === 'AVISOS' && v9.warnings.some((w) => w.includes('objetos vacíos'));
  vResults.push({
    Regla: '9. Formas degeneradas (ancho/alto 0)',
    Esperado: 'AVISOS (Clean Up recomendado)',
    Obtenido: `${v9.status} (${v9.warnings[0] || 'sin mensaje'})`,
    Resultado: v9Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V10: Nombre no sigue pieza-NN / demo-NN o con espacios -> ERROR
  const v10 = validateSvgPiece({
    slug: 'mi arte final',
    svgContent: '<svg viewBox="0 0 100 100"><rect width="10" height="10"/></svg>',
  });
  const v10Pass = v10.status === 'ERROR' && v10.errors.some((e) => e.includes('no sigue'));
  vResults.push({
    Regla: '10. Nombre inválido o con espacios',
    Esperado: 'ERROR (formato no cumple pieza-NN/demo-NN)',
    Obtenido: `${v10.status} (${v10.errors[0] || 'sin mensaje'})`,
    Resultado: v10Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V11: Original sin sufijo -original -> AVISO
  const v11 = validateSvgPiece({
    slug: 'pieza-02',
    svgContent: '<svg viewBox="0 0 100 100"><rect width="10" height="10"/></svg>',
    originalFileName: 'pieza-02.png',
  });
  const v11Pass =
    v11.status === 'AVISOS' &&
    v11.warnings.some((w) => w === 'Renombra source/pieza-02.png a pieza-02-original.png');
  vResults.push({
    Regla: '11. Original sin sufijo -original',
    Esperado: 'AVISOS (Renombra source/pieza-NN.png a pieza-NN-original.png)',
    Obtenido: `${v11.status} (${v11.warnings.find((w) => w.includes('Renombra source/')) || 'sin mensaje'})`,
    Resultado: v11Pass ? '✔ PASS' : '✖ FAIL',
  });

  // V12: Pieza en source/ que no está en vector.config.js -> AVISO
  const v12 = validateSvgPiece({
    slug: 'pieza-02',
    svgContent: '<svg viewBox="0 0 100 100"><rect width="10" height="10"/></svg>',
    inConfig: false,
  });
  const v12Pass =
    v12.status === 'AVISOS' &&
    v12.warnings.some(
      (w) =>
        w ===
        'pieza-02 no está en vector.config.js: no aparecerá en la web hasta agregar su entrada.'
    );
  vResults.push({
    Regla: '12. Pieza ausente en vector.config.js',
    Esperado: 'AVISOS (pieza-NN no está en vector.config.js)',
    Obtenido: `${v12.status} (${v12.warnings.find((w) => w.includes('no está en vector.config.js')) || 'sin mensaje'})`,
    Resultado: v12Pass ? '✔ PASS' : '✖ FAIL',
  });

  console.table(vResults);

  const allVPassed = vResults.every((r) => r.Resultado === '✔ PASS');
  if (!allVPassed) {
    console.error('\nERROR: Al menos un test de validación falló.');
    process.exit(1);
  }
  console.log(`✔ Los ${vResults.length} tests de validación previa pasaron correctamente.\n`);
}

async function main() {
  runUnitTests();
  await runFixtureTest();
  runValidationTests();
}

main().catch((err) => {
  console.error('Error fatal durante los tests:', err);
  process.exit(1);
});
