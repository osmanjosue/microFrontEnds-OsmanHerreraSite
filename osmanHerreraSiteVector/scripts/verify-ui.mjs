// ===========================================================================
// VERIFICACIÓN AUTOMATIZADA DE UI CON PLAYWRIGHT HEADLESS
// Capturas: 375, 768, 1440, 1440 OUTLINE, 1440 STICKY con scroll a tarjetas
// ===========================================================================
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const screenshotsDir = path.join(projectRoot, '.screenshots');

fs.mkdirSync(screenshotsDir, { recursive: true });

const consoleLogs = [];
const pageErrors = [];
const requestedSvgUrls = [];

const browser = await chromium.launch({ headless: true });

async function verifyViewport(width, height, filename) {
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
    if (url.includes('.svg')) {
      requestedSvgUrls.push(url);
    }
  });

  await page.goto('http://localhost:5175/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const screenshotPath = path.join(screenshotsDir, filename);
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log(`[Playwright Headless] Captura guardada: ${filename} (${width}x${height})`);

  // Verificar desborde horizontal
  const overflow = await page.evaluate(() => {
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  console.log(`[Playwright Headless ${width}px] clientWidth: ${overflow.clientWidth}, scrollWidth: ${overflow.scrollWidth}, hasOverflow: ${overflow.hasHorizontalOverflow}`);

  if (overflow.hasHorizontalOverflow) {
    throw new Error(`Desborde horizontal detectado en ${width}px!`);
  }

  // Comprobación específica para móvil (375px): Subtítulo multilínea sin truncar
  if (width === 375) {
    const subtitleCheck = await page.evaluate(() => {
      const el = document.querySelector('header span.font-label-micro');
      return {
        text: el ? el.textContent.trim() : '',
        hasEllipsis: el ? el.textContent.includes('…') : false,
        height: el ? el.clientHeight : 0,
      };
    });
    console.log(`[Playwright Headless 375px] Header Subtitle: "${subtitleCheck.text}", hasEllipsis: ${subtitleCheck.hasEllipsis}, height: ${subtitleCheck.height}px`);
    if (subtitleCheck.hasEllipsis) {
      throw new Error('El subtítulo en 375px tiene puntos suspensivos (…)');
    }
  }

  // Comprobaciones funcionales en 1440px
  if (width === 1440) {
    // 1. Verificar ausencia de SVG de piezas en el DOM
    const pieceSvgCount = await page.evaluate(() => {
      const slot = document.querySelector('#vector-render-slot');
      return slot ? slot.querySelectorAll('svg').length : 0;
    });
    console.log(`[Playwright Headless] SVGs de piezas en #vector-render-slot: ${pieceSvgCount} (debe ser 0)`);
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

    // 3. Verificar enlaces de marca y nav
    const navCheck = await page.evaluate(() => {
      const logo = document.querySelector('header a');
      const activeNav = document.querySelector('header nav a[aria-current="page"]');
      return {
        logoHref: logo ? logo.getAttribute('href') : null,
        activeNavHref: activeNav ? activeNav.getAttribute('href') : null,
        activeNavClasses: activeNav ? activeNav.className : '',
      };
    });
    console.log(`[Playwright Headless] Logo href: ${navCheck.logoHref} (esperado "/")`);
    console.log(`[Playwright Headless] Nav activo href: ${navCheck.activeNavHref}`);
    if (navCheck.logoHref !== '/') {
      throw new Error(`Logo href esperado "/", pero fue "${navCheck.logoHref}"`);
    }

    // 4. Verificar métrica de nodos con '≈' y tooltip
    const anchorsInfo = await page.evaluate(() => {
      const card = document.querySelector('div[title*="original"]');
      const span = card ? card.querySelector('.font-stat-display') : null;
      return {
        title: card ? card.getAttribute('title') : null,
        text: span ? span.textContent.trim() : null,
      };
    });
    console.log(`[Playwright Headless] Métrica nodos: text="${anchorsInfo.text}", tooltip="${anchorsInfo.title}"`);
    if (!anchorsInfo.text || !anchorsInfo.text.startsWith('≈')) {
      throw new Error(`Métrica de nodos debería iniciar con "≈", texto: "${anchorsInfo.text}"`);
    }

    // 5. Probar cambio a modo OUTLINE (crossfade y badge OUTLINE)
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
    console.log(`[Playwright Headless] Modo OUTLINE activado -> outline opacity-100: ${outlineState.outOpacity100}, badgeText: "${outlineState.badgeText}"`);
    if (outlineState.badgeText !== 'OUTLINE') {
      throw new Error(`Badge en modo outline esperado "OUTLINE", pero fue "${outlineState.badgeText}"`);
    }

    // Capturar screenshot en modo OUTLINE (slider al 50%)
    await page.screenshot({ path: path.join(screenshotsDir, 'screenshot-1440px-outline.png') });
    console.log('[Playwright Headless] Captura modo OUTLINE guardada: screenshot-1440px-outline.png');

    // Probar slider al 5% en modo OUTLINE (badge Original debe tener fade-out)
    await page.evaluate(() => {
      const input = document.querySelector('#slider-range-input');
      if (input) {
        input.value = '5';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(300);
    const badgeAt5 = await page.evaluate(() => {
      const orig = document.querySelector('#badge-original');
      const vec = document.querySelector('#badge-vector');
      return {
        origOpacity0: orig?.classList.contains('opacity-0'),
        vecOpacity100: vec?.classList.contains('opacity-100'),
      };
    });
    console.log(`[Playwright Headless] Slider al 5%: Original fade-out=${badgeAt5.origOpacity0}, Vector visible=${badgeAt5.vecOpacity100}`);
    await page.screenshot({ path: path.join(screenshotsDir, 'screenshot-1440px-outline-slider-5.png') });

    // Probar slider al 95% en modo OUTLINE (badge Vector debe tener fade-out)
    await page.evaluate(() => {
      const input = document.querySelector('#slider-range-input');
      if (input) {
        input.value = '95';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(300);
    const badgeAt95 = await page.evaluate(() => {
      const orig = document.querySelector('#badge-original');
      const vec = document.querySelector('#badge-vector');
      return {
        origOpacity100: orig?.classList.contains('opacity-100'),
        vecOpacity0: vec?.classList.contains('opacity-0'),
      };
    });
    console.log(`[Playwright Headless] Slider al 95%: Original visible=${badgeAt95.origOpacity100}, Vector fade-out=${badgeAt95.vecOpacity0}`);
    await page.screenshot({ path: path.join(screenshotsDir, 'screenshot-1440px-outline-slider-95.png') });

    // Restaurar slider al 50%
    await page.evaluate(() => {
      const input = document.querySelector('#slider-range-input');
      if (input) {
        input.value = '50';
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
    await page.waitForTimeout(200);

    // 6. Probar comportamiento Sticky en Escritorio haciendo scroll hacia abajo hasta las tarjetas
    await page.evaluate(() => {
      window.scrollTo(0, 480);
    });
    await page.waitForTimeout(400);

    const stickyCheck = await page.evaluate(() => {
      const header = document.querySelector('header');
      const aside = document.querySelector('aside');
      const headerRect = header.getBoundingClientRect();
      const asideRect = aside.getBoundingClientRect();
      return {
        headerBottom: headerRect.bottom,
        asideTop: asideRect.top,
        gap: asideRect.top - headerRect.bottom,
        isStickyVisible: asideRect.top > 0,
      };
    });
    console.log(`[Playwright Headless Sticky] Header bottom: ${stickyCheck.headerBottom}px, Aside top: ${stickyCheck.asideTop}px, Gap: ${stickyCheck.gap}px`);
    if (stickyCheck.asideTop < stickyCheck.headerBottom) {
      throw new Error(`El inventario sticky se solapa con el header! Top aside: ${stickyCheck.asideTop}, bottom header: ${stickyCheck.headerBottom}`);
    }

    // Capturar screenshot con scroll (para ver el sticky)
    await page.screenshot({ path: path.join(screenshotsDir, 'screenshot-1440px-sticky.png') });
    console.log('[Playwright Headless] Captura sticky guardada: screenshot-1440px-sticky.png');

    // 7. Probar foco en #slider-range-input y verificar que ArrowRight NO navega de pieza
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    await page.focus('#slider-range-input');
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(300);
    const hashAfterRangeArrow = await page.evaluate(() => window.location.hash);
    console.log(`[Playwright Headless] Con foco en #slider-range-input, tras ArrowRight hash es: "${hashAfterRangeArrow}" (no cambia de pieza)`);
    if (hashAfterRangeArrow && hashAfterRangeArrow !== '#demo-01') {
      throw new Error(`El foco en slider-range-input cambió la pieza a ${hashAfterRangeArrow}`);
    }

    // 8. Quitar el foco y verificar que ArrowRight sí navega de pieza normalmente
    await page.evaluate(() => document.activeElement && document.activeElement.blur());
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(400);
    const hashAfterGlobalArrow = await page.evaluate(() => window.location.hash);
    console.log(`[Playwright Headless] Sin foco en controles, tras ArrowRight hash es: "${hashAfterGlobalArrow}" (debe ser #demo-02)`);
    if (hashAfterGlobalArrow !== '#demo-02') {
      throw new Error(`Navegación global por teclado esperada #demo-02, pero fue "${hashAfterGlobalArrow}"`);
    }
  }

  await context.close();
}

console.log('Iniciando verificación con Playwright Chromium Headless...');

// 1. Mobile (375 px)
await verifyViewport(375, 812, 'screenshot-375px.png');

// 2. Tablet (768 px)
await verifyViewport(768, 1024, 'screenshot-768px.png');

// 3. Desktop (1440 px)
await verifyViewport(1440, 900, 'screenshot-1440px.png');

await browser.close();

console.log('\n--- REVISIÓN DE RED (PETICIONES SVG) ---');
console.log('Peticiones SVG capturadas en Network:', requestedSvgUrls);

console.log('\n--- REVISIÓN DE CONSOLA ---');
console.log('Total eventos de consola capturados:', consoleLogs.length);
console.log('Logs info/warn/log:', consoleLogs.filter((l) => l.type !== 'error'));
console.log('Logs de error (console.error):', consoleLogs.filter((l) => l.type === 'error'));
console.log('Excepciones no capturadas (pageerror):', pageErrors);

if (requestedSvgUrls.length > 0) {
  console.error('\nERROR: Se detectaron peticiones a archivos .svg en la red!', requestedSvgUrls);
  process.exit(1);
}

if (pageErrors.length > 0 || consoleLogs.filter((l) => l.type === 'error').length > 0) {
  console.error('\nERROR: Se detectaron errores en la consola del navegador!');
  process.exit(1);
} else {
  console.log('\nÉXITO: Cero peticiones SVG, cero errores en consola. Todas las capturas fueron generadas correctamente.');
}
