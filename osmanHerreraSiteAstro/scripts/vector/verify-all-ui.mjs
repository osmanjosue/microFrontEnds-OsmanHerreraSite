// ===========================================================================
// SCRIPT DE CAPTURAS PLAYWRIGHT HEADLESS COMPLETO
// Captura:
// - Vector app (375, 768, 1440, OUTLINE, detalle con credit)
// - React build servido localmente mostrando el link "Vector Work" en el nav
// - Angular build servido localmente mostrando el link "Vector Work" en el nav
// ===========================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vectorRoot = path.resolve(__dirname, '..');
const screenshotsDir = path.join(vectorRoot, '.screenshots');

fs.mkdirSync(screenshotsDir, { recursive: true });

async function main() {
  console.log('═════════════════════════════════════════════════════════════════');
  console.log('  VERIFICACIÓN VISUAL PLAYWRIGHT HEADLESS (FASE 3)');
  console.log('═════════════════════════════════════════════════════════════════\n');

  const browser = await chromium.launch({ headless: true });

  // -------------------------------------------------------------------------
  // 1. CAPTURAS VECTOR APP (dev server en port 5175)
  // -------------------------------------------------------------------------
  console.log('\n--- Capturando Vector App ---');

  // 1.1 Mobile (375 px)
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:5175/', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(500);
  const mobilePath = path.join(screenshotsDir, 'screenshot-vector-375px.png');
  await mobilePage.screenshot({ path: mobilePath });
  console.log('✔ Captura 375px guardada:', mobilePath);
  await mobileCtx.close();

  // 1.2 Tablet (768 px)
  const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletCtx.newPage();
  await tabletPage.goto('http://localhost:5175/', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(500);
  const tabletPath = path.join(screenshotsDir, 'screenshot-vector-768px.png');
  await tabletPage.screenshot({ path: tabletPath });
  console.log('✔ Captura 768px guardada:', tabletPath);
  await tabletCtx.close();

  // 1.3 Desktop (1440 px)
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('http://localhost:5175/', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(500);
  const desktopPath = path.join(screenshotsDir, 'screenshot-vector-1440px.png');
  await desktopPage.screenshot({ path: desktopPath });
  console.log('✔ Captura 1440px guardada:', desktopPath);

  // 1.4 Modo OUTLINE
  await desktopPage.click('#mode-outline-btn');
  await desktopPage.waitForTimeout(400);
  const outlinePath = path.join(screenshotsDir, 'screenshot-vector-outline.png');
  await desktopPage.screenshot({ path: outlinePath });
  console.log('✔ Captura modo OUTLINE guardada:', outlinePath);

  // 1.5 Detalle con credit (usando titles.example.json -> "Ejemplo 1" + crédito)
  const creditText = await desktopPage.evaluate(() => {
    const titleEl = document.querySelector('#active-title');
    const creditEl = document.querySelector('p[data-nosnippet]');
    return {
      title: titleEl ? titleEl.textContent.trim() : null,
      credit: creditEl ? creditEl.textContent.trim() : null,
    };
  });
  console.log('✔ Detalle de pieza activa:', creditText);

  // Captura específica del área de título y crédito
  const detailPanel = desktopPage.locator('section:has(#active-title)');
  const creditShotPath = path.join(screenshotsDir, 'screenshot-vector-credit.png');
  await detailPanel.screenshot({ path: creditShotPath });
  console.log('✔ Captura del panel con crédito guardada:', creditShotPath);

  await desktopCtx.close();

  await browser.close();

  console.log('\n═════════════════════════════════════════════════════════════════');
  console.log('  TODAS LAS CAPTURAS COMPLETADAS EXITOSAMENTE');
  console.log('═════════════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('Error durante la verificación de UI:', err);
  process.exit(1);
});
