// ===========================================================================
// VERIFICACIÓN AUTOMATIZADA DE UI CON PLAYWRIGHT HEADLESS
// Capturas: 375px, 768px, 1440px, 1440px OUTLINE, y verificación bilingüe (/en/vectorwork/)
// ===========================================================================
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { vectorConfig } from '../../../shared/config/vector.config.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, '.screenshots');

const baseUrl = process.env.BASE_URL || 'http://localhost:4321';

// Slugs de las dos primeras piezas del config
const [firstSlug, secondSlug] = vectorConfig.works.map((w) => w.slug);

fs.mkdirSync(screenshotsDir, { recursive: true });

const consoleLogs = [];
const pageErrors = [];
const requestedPieceSvgUrls = [];

const browser = await chromium.launch({ headless: true });

async function verifyViewport(urlPath, width, height, filename, options = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    isMobile: width < 768,
  });
  const page = await context.newPage();

  page.on('console', (msg) => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message || String(err));
  });

  page.on('request', (req) => {
    const url = req.url();
    // Detectar si se intenta descargar algún SVG fuente de las obras
    if (url.includes('/works/') && url.includes('.svg')) {
      requestedPieceSvgUrls.push(url);
    }
  });

  const fullUrl = `${baseUrl}${urlPath}`;
  await page.goto(fullUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const screenshotPath = path.join(screenshotsDir, filename);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`[Playwright Headless] Captura guardada: ${filename} (${width}x${height}) en ${urlPath}`);

  // Verificar desborde horizontal
  const overflow = await page.evaluate(() => {
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasHorizontalOverflow:
        document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  console.log(
    `[Playwright Headless ${width}px] clientWidth: ${overflow.clientWidth}, scrollWidth: ${overflow.scrollWidth}, hasOverflow: ${overflow.hasHorizontalOverflow}`
  );

  if (overflow.hasHorizontalOverflow) {
    throw new Error(`Desborde horizontal detectado en ${width}px en ${urlPath}!`);
  }

  // Comprobaciones funcionales detalladas si isDetailed === true
  if (options.isDetailed) {
    // 1. Verificar ausencia de SVG de piezas en el DOM
    const pieceSvgCount = await page.evaluate(() => {
      const slot = document.querySelector('#vector-render-slot');
      return slot ? slot.querySelectorAll('svg').length : 0;
    });
    console.log(
      `[Playwright Headless] SVGs de piezas en #vector-render-slot: ${pieceSvgCount} (debe ser 0)`
    );
    if (pieceSvgCount > 0) {
      throw new Error(`Se encontró SVG en #vector-render-slot (${pieceSvgCount})`);
    }

    // 2. Verificar filtrado de categorías con 0 piezas (apparel oculto)
    const categoriesRendered = await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('.category-filter-btn'));
      return buttons.map((b) => b.getAttribute('data-category'));
    });
    console.log(`[Playwright Headless] Categorías mostradas: ${categoriesRendered.join(', ')}`);
    if (categoriesRendered.includes('apparel')) {
      throw new Error('La categoría "apparel" con 0 piezas no debería mostrarse');
    }

    // 3. Probar cambio a modo OUTLINE (crossfade y badge OUTLINE)
    await page.click('#mode-outline-btn');
    await page.waitForTimeout(400);

    const outlineState = await page.evaluate(() => {
      const out = document.querySelector('#outline-image');
      const vec = document.querySelector('#vector-image');
      const badge = document.querySelector('#vector-badge-text');
      return {
        outOpacity100: out?.classList.contains('opacity-100'),
        vecOpacity0: vec?.classList.contains('opacity-0'),
        badgeText: badge ? badge.textContent.trim() : '',
      };
    });
    console.log(
      `[Playwright Headless] Modo OUTLINE activado -> outline opacity-100: ${outlineState.outOpacity100}, badgeText: "${outlineState.badgeText}"`
    );
    if (outlineState.badgeText !== 'OUTLINE') {
      throw new Error(
        `Badge en modo outline esperado "OUTLINE", pero fue "${outlineState.badgeText}"`
      );
    }

    // Capturar screenshot en modo OUTLINE (slider al 50%)
    await page.screenshot({ path: path.join(screenshotsDir, 'screenshot-1440px-outline.png') });
    console.log('[Playwright Headless] Captura modo OUTLINE guardada');

    // Probar slider al 5% en modo OUTLINE
    await page.evaluate(() => {
      const input = document.querySelector('#slider-range-input');
      if (input) {
        input.value = '5';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(300);

    // Restaurar slider al 50%
    await page.evaluate(() => {
      const input = document.querySelector('#slider-range-input');
      if (input) {
        input.value = '50';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(200);

    // 4. Probar foco en #slider-range-input y verificar que ArrowRight NO navega de pieza
    await page.focus('#slider-range-input');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    const hashAfterRangeArrow = await page.evaluate(() => window.location.hash);
    if (hashAfterRangeArrow && hashAfterRangeArrow !== `#${firstSlug}`) {
      throw new Error(`El foco en slider-range-input cambió la pieza a ${hashAfterRangeArrow}`);
    }

    // 5. Quitar el foco y verificar que ArrowRight sí navega de pieza normalmente
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);
    const hashAfterGlobalArrow = await page.evaluate(() => window.location.hash);
    console.log(
      `[Playwright Headless] Sin foco en controles, tras ArrowRight hash es: "${hashAfterGlobalArrow}" (debe ser #${secondSlug})`
    );
    if (hashAfterGlobalArrow !== `#${secondSlug}`) {
      throw new Error(
        `Navegación global por teclado esperada #${secondSlug}, pero fue "${hashAfterGlobalArrow}"`
      );
    }

    // 6. Probar ArrowLeft para volver a firstSlug
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(400);
    const hashAfterLeftArrow = await page.evaluate(() => window.location.hash);
    if (hashAfterLeftArrow !== `#${firstSlug}`) {
      throw new Error(`Navegación con ArrowLeft esperada #${firstSlug}, pero fue "${hashAfterLeftArrow}"`);
    }
  }

  await context.close();
}

console.log(`Iniciando verificación con Playwright Chromium Headless sobre ${baseUrl}...`);

// 1. Mobile Español (375 px)
await verifyViewport('/vectorwork/', 375, 812, 'screenshot-es-375px.png');

// 2. Desktop Español (1440 px) con pruebas interactivas completas
await verifyViewport('/vectorwork/', 1440, 900, 'screenshot-es-1440px.png', { isDetailed: true });

// 3. Desktop Inglés (1440 px)
await verifyViewport('/en/vectorwork/', 1440, 900, 'screenshot-en-1440px.png', { isDetailed: true });

// 4. Verificación de redirecciones por parámetro ?lang=
console.log('\n--- VERIFICACIÓN DE REDIRECCIONES ?lang= ---');
const redirectContext = await browser.newContext();
const redirectPage = await redirectContext.newPage();

// ?lang=en en /vectorwork/ debe redirigir a /en/vectorwork/ conservando el hash
await redirectPage.goto(`${baseUrl}/vectorwork/?lang=en#pieza-02`, { waitUntil: 'networkidle' });
await redirectPage.waitForTimeout(500);
const redirectedToEn = redirectPage.url();
console.log(`✓ /vectorwork/?lang=en#pieza-02 -> ${redirectedToEn}`);
if (!redirectedToEn.includes('/en/vectorwork/#pieza-02')) {
  throw new Error(`Redirección a inglés falló. URL final: ${redirectedToEn}`);
}

// ?lang=es en /en/vectorwork/ debe redirigir a /vectorwork/ conservando el hash
await redirectPage.goto(`${baseUrl}/en/vectorwork/?lang=es#pieza-03`, { waitUntil: 'networkidle' });
await redirectPage.waitForTimeout(500);
const redirectedToEs = redirectPage.url();
console.log(`✓ /en/vectorwork/?lang=es#pieza-03 -> ${redirectedToEs}`);
if (!redirectedToEs.includes('/vectorwork/#pieza-03')) {
  throw new Error(`Redirección a español falló. URL final: ${redirectedToEs}`);
}

await redirectContext.close();
await browser.close();

console.log('\n--- REVISIÓN DE RED (PETICIONES SVG DE PIEZAS) ---');
console.log('Peticiones SVG capturadas en Network:', requestedPieceSvgUrls);

console.log('\n--- REVISIÓN DE CONSOLA ---');
const realErrors = consoleLogs.filter((l) => l.type === 'error');
console.log('Total logs:', consoleLogs.length);
console.log('Logs de error:', realErrors);
console.log('Excepciones no capturadas:', pageErrors);

if (requestedPieceSvgUrls.length > 0) {
  console.error('\nERROR: Se detectaron peticiones a archivos .svg de obras!', requestedPieceSvgUrls);
  process.exit(1);
}

if (pageErrors.length > 0 || realErrors.length > 0) {
  console.error('\nERROR: Se detectaron errores en la consola del navegador!');
  process.exit(1);
}

console.log('\nÉXITO: Todas las pruebas de Vector Work pasaron correctamente.');
