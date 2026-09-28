import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const screenshotsDir = path.join(rootDir, '.screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function capture() {
  console.log('--- INICIANDO CAPTURAS HEADLESS PARA TÉCNICA MIXTA ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') console.error('Browser console error:', msg.text());
  });
  page.on('pageerror', (err) => console.error('Browser page error:', err));

  // 1. Cargar demo-02 en español
  await page.goto('http://localhost:5175/?lang=es#demo-02', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 2. Verificar que el chip VECTOR + TRAMA RASTER está visible en ES
  const chipLocatorEs = page.locator('text=VECTOR + TRAMA RASTER');
  const chipCountEs = await chipLocatorEs.count();
  console.log(`Chips 'VECTOR + TRAMA RASTER' (ES) encontrados: ${chipCountEs}`);

  if (chipCountEs > 0) {
    const chipText = await chipLocatorEs.first().innerText();
    const chipTitle = await chipLocatorEs.first().getAttribute('title');
    console.log(`✔ Chip ES verificado: "${chipText}" con tooltip: "${chipTitle}"`);
  } else {
    console.error('✖ Chip VECTOR + TRAMA RASTER no encontrado en ES');
  }

  // 3. Capturar detalle del header con el chip en ES
  const detailCard = page.locator('section').filter({ hasText: 'VECTOR + TRAMA RASTER' }).first();
  await detailCard.scrollIntoViewIfNeeded();
  const chipScreenshotPathEs = path.join(screenshotsDir, 'screenshot-demo-02-chip-es.png');
  await detailCard.screenshot({ path: chipScreenshotPathEs });
  console.log(`✔ Captura del chip ES guardada en: ${chipScreenshotPathEs}`);

  // Captura de página completa en modo COLOR (1440px)
  const fullColorPath = path.join(screenshotsDir, 'screenshot-demo-02-color-full-1440.png');
  await page.screenshot({ path: fullColorPath, fullPage: true });
  console.log(`✔ Captura completa COLOR 1440px guardada en: ${fullColorPath}`);

  // 4. Cambiar a modo OUTLINE
  const outlineBtn = page.locator('#mode-outline-btn');
  await outlineBtn.click();
  await page.waitForTimeout(400);

  // Mover el slider al 3% para ver completamente la capa OUTLINE
  const sliderInput = page.locator('#slider-range-input');
  if (await sliderInput.count() > 0) {
    await sliderInput.fill('3');
    await sliderInput.dispatchEvent('input');
    await page.waitForTimeout(300);
  }

  // 5. Capturar la vista del comparador en modo OUTLINE (mostrando la trama atenuada)
  const compareArea = page.locator('#split-slider-container');
  const outlineScreenshotPath = path.join(screenshotsDir, 'screenshot-demo-02-outline-dimmed.png');
  await compareArea.screenshot({ path: outlineScreenshotPath });
  console.log(`✔ Captura del OUTLINE con trama atenuada guardada en: ${outlineScreenshotPath}`);

  // 6. Captura completa a 1440px en modo OUTLINE
  const fullPagePath = path.join(screenshotsDir, 'screenshot-demo-02-outline-full-1440.png');
  await page.screenshot({ path: fullPagePath, fullPage: true });
  console.log(`✔ Captura completa OUTLINE 1440px guardada en: ${fullPagePath}`);

  // 7. Cambiar idioma a EN para verificar chip traducido
  const langBtn = page.locator('#btn-lang-toggle');
  if (await langBtn.count() > 0) {
    await langBtn.click();
    await page.waitForTimeout(300);
    const chipLocatorEn = page.locator('text=VECTOR + RASTER TEXTURE');
    const chipCountEn = await chipLocatorEn.count();
    console.log(`Chips 'VECTOR + RASTER TEXTURE' (EN) encontrados: ${chipCountEn}`);
    if (chipCountEn > 0) {
      const chipTitleEn = await chipLocatorEn.first().getAttribute('title');
      console.log(`✔ Chip EN verificado: tooltip: "${chipTitleEn}"`);
      const detailCardEn = page.locator('section').filter({ hasText: 'VECTOR + RASTER TEXTURE' }).first();
      const chipScreenshotPathEn = path.join(screenshotsDir, 'screenshot-demo-02-chip-en.png');
      await detailCardEn.screenshot({ path: chipScreenshotPathEn });
      console.log(`✔ Captura del chip EN guardada en: ${chipScreenshotPathEn}`);
    }
  }

  await browser.close();
  console.log('--- CAPTURAS COMPLETADAS EXITOSAMENTE ---');
}

capture().catch((err) => {
  console.error('Error durante la captura headless:', err);
  process.exit(1);
});
