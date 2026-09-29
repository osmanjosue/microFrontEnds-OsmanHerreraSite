// ===========================================================================
// SCRIPT DE CAPTURAS PLAYWRIGHT HEADLESS COMPLETO
// Captura:
// - Vector app (375, 768, 1440, OUTLINE, detalle con credit)
// - React build servido localmente mostrando el link "Vector Work" en el nav
// - Angular build servido localmente mostrando el link "Vector Work" en el nav
// ===========================================================================
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vectorRoot = path.resolve(__dirname, '..');
const repoRoot = path.resolve(vectorRoot, '..');
const screenshotsDir = path.join(vectorRoot, '.screenshots');

fs.mkdirSync(screenshotsDir, { recursive: true });

/**
 * Servidor HTTP estático simple para servir carpetas dist locales sin dependencias externas.
 */
function createStaticServer(distPath, port, base = '/') {
  const mimeTypes = {
    '.html': 'text/html; charset=UTF-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.json': 'application/json',
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0];
    if (base !== '/' && reqPath.startsWith(base)) {
      reqPath = reqPath.slice(base.length);
    }
    if (reqPath.startsWith('/')) reqPath = reqPath.slice(1);
    if (!reqPath || reqPath === '') reqPath = 'index.html';

    let filePath = path.join(distPath, reqPath);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      filePath = path.join(distPath, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    try {
      const content = fs.readFileSync(filePath);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch {
      res.writeHead(404);
      res.end('Not Found');
    }
  });

  return new Promise((resolve) => {
    server.listen(port, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

async function main() {
  console.log('═════════════════════════════════════════════════════════════════');
  console.log('  VERIFICACIÓN VISUAL PLAYWRIGHT HEADLESS (FASE 3)');
  console.log('═════════════════════════════════════════════════════════════════\n');

  // Iniciar servidores estáticos para React y Angular
  const reactDist = path.join(repoRoot, 'osmanHerreraSiteReact', 'dist');
  const angularDist = path.join(repoRoot, 'osmanHerreraSite', 'dist', 'osman-herrera-dev', 'browser');

  const reactServer = await createStaticServer(reactDist, 4173, '/react/');
  console.log('✔ Servidor React dist iniciado en http://127.0.0.1:4173/react/');

  const angularServer = await createStaticServer(angularDist, 4174, '/angular/');
  console.log('✔ Servidor Angular dist iniciado en http://127.0.0.1:4174/angular/');

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

  // -------------------------------------------------------------------------
  // 2. CAPTURA REACT BUILD (con enlace "Vector Work" en el nav)
  // -------------------------------------------------------------------------
  console.log('\n--- Capturando React Build ---');
  const reactCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const reactPage = await reactCtx.newPage();
  await reactPage.goto('http://127.0.0.1:4173/react/', { waitUntil: 'networkidle' });
  await reactPage.waitForTimeout(500);

  const reactNavCheck = await reactPage.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a'));
    return links.map((l) => ({ text: l.textContent.trim(), href: l.getAttribute('href'), tag: l.tagName.toLowerCase() }));
  });
  console.log('✔ Enlaces nav React:', reactNavCheck);

  const headerReact = reactPage.locator('header');
  const reactShotPath = path.join(screenshotsDir, 'screenshot-react-nav.png');
  await headerReact.screenshot({ path: reactShotPath });
  console.log('✔ Captura nav React guardada:', reactShotPath);
  await reactCtx.close();

  // -------------------------------------------------------------------------
  // 3. CAPTURA ANGULAR BUILD (con enlace "Vector Work" en el nav)
  // -------------------------------------------------------------------------
  console.log('\n--- Capturando Angular Build ---');
  const angularCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const angularPage = await angularCtx.newPage();
  await angularPage.goto('http://127.0.0.1:4174/angular/', { waitUntil: 'networkidle' });
  await angularPage.waitForTimeout(500);

  const angularNavCheck = await angularPage.evaluate(() => {
    const links = Array.from(document.querySelectorAll('header nav a'));
    return links.map((l) => ({ text: l.textContent.trim(), href: l.getAttribute('href'), tag: l.tagName.toLowerCase() }));
  });
  console.log('✔ Enlaces nav Angular:', angularNavCheck);

  const headerAngular = angularPage.locator('header');
  const angularShotPath = path.join(screenshotsDir, 'screenshot-angular-nav.png');
  await headerAngular.screenshot({ path: angularShotPath });
  console.log('✔ Captura nav Angular guardada:', angularShotPath);
  await angularCtx.close();

  await browser.close();
  reactServer.close();
  angularServer.close();

  console.log('\n═════════════════════════════════════════════════════════════════');
  console.log('  TODAS LAS CAPTURAS COMPLETADAS EXITOSAMENTE');
  console.log('═════════════════════════════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('Error durante la verificación de UI:', err);
  process.exit(1);
});
