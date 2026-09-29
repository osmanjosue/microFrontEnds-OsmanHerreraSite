// ===========================================================================
// VERIFICACIÓN AUTOMATIZADA FASE 9 CON PLAYWRIGHT
// ===========================================================================
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../../dist');
const outputDir = path.join(__dirname, '.screenshots/fase-09');

fs.mkdirSync(outputDir, { recursive: true });

// 1. Servidor HTTP estático nativo para dist/
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0].split('#')[0];
  let filePath = path.join(distDir, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath)) {
    // Probar .html
    if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
});

const PORT = 4333;
await new Promise((resolve) => server.listen(PORT, resolve));
console.log(`[Test Server] Servidor local escuchando en http://localhost:${PORT}`);

const baseUrl = `http://localhost:${PORT}`;
const browser = await chromium.launch({ headless: true });

const results = [];
const consoleErrors = [];
const failedResponses = [];

async function testPage(urlPath, width, height, name, options = {}) {
  const context = await browser.newContext({
    viewport: { width, height },
    isMobile: width < 768,
  });
  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push({ url: urlPath, text: msg.text() });
    }
  });

  page.on('response', (res) => {
    if (res.status() >= 400) {
      failedResponses.push({ url: res.url(), status: res.status() });
    }
  });

  await page.goto(`${baseUrl}${urlPath}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Comprobar scroll horizontal
  const overflow = await page.evaluate(() => {
    return {
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    };
  });

  // Captura de pantalla
  const screenshotPath = path.join(outputDir, `${name}.png`);
  if (options.selector) {
    const el = await page.$(options.selector);
    if (el) {
      await el.screenshot({ path: screenshotPath });
    } else {
      await page.screenshot({ path: screenshotPath, fullPage: true });
    }
  } else {
    await page.screenshot({ path: screenshotPath, fullPage: true });
  }

  results.push({
    name,
    url: urlPath,
    viewport: `${width}x${height}`,
    overflow: overflow.hasOverflow ? 'FAIL' : 'PASS',
    clientWidth: overflow.clientWidth,
    scrollWidth: overflow.scrollWidth,
  });

  await context.close();
}

try {
  console.log('--- Probando páginas en desktop (1440px) y móvil (390px) ---');
  // 1. /cv/
  await testPage('/cv/', 1440, 900, 'cv-es-1440px');
  await testPage('/cv/', 390, 844, 'cv-es-390px');

  // 2. /en/cv/
  await testPage('/en/cv/', 1440, 900, 'cv-en-1440px');
  await testPage('/en/cv/', 390, 844, 'cv-en-390px');

  // 3. / (Experiencia)
  await testPage('/', 1440, 900, 'home-es-experience-1440px', { selector: '#experience' });
  await testPage('/', 390, 844, 'home-es-experience-390px', { selector: '#experience' });

  // 4. Print / PDF de /cv/
  console.log('--- Generando PDF y captura de impresión de /cv/ ---');
  const printContext = await browser.newContext();
  const printPage = await printContext.newPage();
  await printPage.goto(`${baseUrl}/cv/`, { waitUntil: 'networkidle' });
  await printPage.emulateMedia({ media: 'print' });
  await printPage.waitForTimeout(300);

  const printScreenshotPath = path.join(outputDir, 'cv-print-preview.png');
  await printPage.screenshot({ path: printScreenshotPath, fullPage: true });

  const pdfPath = path.join(outputDir, 'cv-osman-herrera.pdf');
  const pdfBuffer = await printPage.pdf({
    format: 'Letter',
    printBackground: true,
    margin: { top: '0.4in', right: '0.4in', bottom: '0.4in', left: '0.4in' },
  });
  fs.writeFileSync(pdfPath, pdfBuffer);

  // Leer número de páginas del PDF
  // En PDFs, /Type /Page o /Count indica páginas
  const pdfText = pdfBuffer.toString('latin1');
  const pageMatches = pdfText.match(/\/Type\s*\/Page\b/g);
  const pageCount = pageMatches ? pageMatches.length : 'indeterminado';

  console.log(`[PDF Generado] ${pdfPath} (${(pdfBuffer.length / 1024).toFixed(1)} KB, ~${pageCount} páginas)`);

  await printContext.close();

  console.table(results);

  if (consoleErrors.length > 0) {
    console.error('Errores en consola detectados:', consoleErrors);
  } else {
    console.log('✔ Cero errores de consola detectados.');
  }

  if (failedResponses.length > 0) {
    console.error('Respuestas HTTP >= 400:', failedResponses);
  } else {
    console.log('✔ Cero respuestas HTTP 4xx/5xx.');
  }

  const anyOverflow = results.some((r) => r.overflow === 'FAIL');
  if (anyOverflow) {
    throw new Error('Fallo: Se detectó desborde horizontal en alguna vista.');
  }
  console.log('✔ Todas las pruebas de UI pasaron con éxito.');
} finally {
  await browser.close();
  server.close();
}
