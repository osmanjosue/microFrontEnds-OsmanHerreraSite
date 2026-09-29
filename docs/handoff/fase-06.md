# Fase 6: migrar Vector Work a `/vectorwork/` y `/en/vectorwork/`
- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `.gitignore` | modificado | Añadidas exclusiones para que las obras y el archivo de títulos de Vector Work en Astro (`osmanHerreraSiteAstro/public/vectorwork/works/*`, `osmanHerreraSiteAstro/public/vectorwork/data/titles.json`, `.screenshots/`, `fixtures/out/`) no se suban al repositorio público. |
| `shared/config/vector.config.ts` | creado | Configuración fuertemente tipada de Vector Work (`VectorConfig`, `VectorUI`, `VectorPiece`, `VectorCategory`) con el patrón `Localized` de `i18n.ts`. |
| `shared/config/index.ts` | modificado | Re-exportación de `* from './vector.config'` desde `@config`. |
| `shared/config/i18n.ts` | modificado | Mantiene estricto `t(value, lang)` sin valores por defecto ni lectura de DOM para preservar la garantía de tipos en compilación. |
| `osmanHerreraSiteAstro/src/styles/global.css` | modificado | Añadidas reglas de `.slider-viewport` (`--slider-max-h` y media query sm) y de fallback de error de imágenes (`.img-error > img` y `.img-error > .img-error-fallback`). |
| `osmanHerreraSiteAstro/public/robots.txt` | creado | Regla `Disallow: /vectorwork/data/` para impedir la indexación de `titles.json` por motores de búsqueda. |
| `osmanHerreraSiteAstro/public/vectorwork/` | creado | Copiadas carpetas `works/` y `data/` (`titles.example.json` y `titles.json`), compartidas por `/vectorwork/` y `/en/vectorwork/`. |
| `osmanHerreraSiteAstro/.env.production` & `.env.example` | modificado | Añadida variable `PUBLIC_ASSETS_BASE_URL=` para soporte de CDN / Cloudflare R2 en producción. |
| `osmanHerreraSiteAstro/src/lib/vector/assets-url.js` | creado | Ajustadas `assetUrl()` y `assetsOrigin()` para usar la base local fija `/vectorwork/` o `PUBLIC_ASSETS_BASE_URL`. |
| `osmanHerreraSiteAstro/src/lib/vector/i18n-client.js` | creado | Helper del lado del cliente `tc(value, vars?)` y `getLang()` leyendo `document.documentElement.lang` con interpolación `{key}`. |
| `osmanHerreraSiteAstro/src/lib/vector/titles.js` | creado | Carga de títulos desde `/vectorwork/data/titles.json` y consumo de `vectorConfig` y `tc` / `getLang`. |
| `osmanHerreraSiteAstro/src/lib/vector/components/*` | creado / limpiado | Componentes (`compare-slider.js`, `detail.js`, `grid.js`, `intro.js`) adaptados para consumir `tc`, `@config`, `stats.json` y `escape.js`. Eliminados los no utilizados (`header.js`, `footer.js`). |
| `osmanHerreraSiteAstro/src/lib/vector/main.js` | creado | Migrado punto de entrada: eliminados `renderHeader` y `renderFooter` (provistos por `BaseLayout`), eliminado botón propio de cambio de idioma, acotado el re-render a `#vector-app` y añadida redirección de compatibilidad para `?lang=en` y `?lang=es`. |
| `osmanHerreraSiteAstro/src/views/VectorView.astro` | creado | Vista que recibe `lang`, configura metadatos con `BaseLayout` (`route="vectorwork"`, título y descripción de `vectorConfig`), contenedor `<div id="vector-app">` y script de inicialización. |
| `osmanHerreraSiteAstro/src/pages/vectorwork/index.astro` | creado | Ruta en español para Vector Work (`/vectorwork/`). |
| `osmanHerreraSiteAstro/src/pages/en/vectorwork/index.astro` | creado | Ruta en inglés para Vector Work (`/en/vectorwork/`). |
| `osmanHerreraSiteAstro/astro.config.mjs` | modificado | Integración `cleanProductionDistIntegration` y plugin `cleanProductionDistPlugin` para recortar `works/` y `data/` de `dist/` en el build de producción. |
| `osmanHerreraSiteAstro/scripts/vector/*` | creado | Migrados scripts de Vector (`build-assets.mjs`, `capture-mixed-technique.mjs`, `svg-analyzer.mjs`, `test-assets-fixture.mjs`, `verify-all-ui.mjs`, `verify-ui.mjs`, `fixtures/`). Ajustadas rutas a `vector.config.ts`, `public/vectorwork/works` y adaptado `verify-ui.mjs` para `/vectorwork/` y `/en/vectorwork/` con aserciones de tamaño mínimo de visor (>200px) e imagen original visible. |
| `osmanHerreraSiteAstro/package.json` | modificado | Añadidos scripts `assets`, `assets:test`, `verify:ui` y dependencias de análisis y pruebas vectoriales con `playwright: ^1.63.0` alineado al monorepo. |
| `package.json` | modificado | Script `assets:test` actualizado para apuntar a `osmanHerreraSiteAstro`. |

## Verificación
Comandos ejecutados:

1. `npm --prefix osmanHerreraSiteAstro run check`:
```text
Result (61 files): 
- 0 errors
- 0 warnings
- 38 hints
```

2. `npm --prefix osmanHerreraSiteAstro run build`:
```text
> osmanherrerasiteastro@0.0.1 build
> astro build

09:48:14 [types] Generated 479ms
09:48:14 [build] output: "static"
09:48:14 [build] mode: "static"
09:48:14 [build] directory: C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro\dist\
09:48:14 [build] Collecting build info...
09:48:14 [build] ✓ Completed in 513ms.
09:48:14 [build] Building static entrypoints...
09:48:16 [vite] ✓ built in 1.48s
09:48:16 [vite] ✓ built in 281ms
09:48:16 [build] Rearranging server assets...

 generating static routes 
09:48:16   ├─ /en/privacy-policy/index.html (+22ms) 
09:48:16   ├─ /en/vectorwork/index.html (+5ms) 
09:48:17   ├─ /en/index.html (+56ms) 
09:48:17   ├─ /politicadeprivacidad/index.html (+4ms) 
09:48:17   ├─ /vectorwork/index.html (+4ms) 
09:48:17   ├─ /index.html (+6ms) 
09:48:17 ✓ Completed in 340ms.

09:48:17 [build] ✓ Completed in 2.16s.
09:48:17 [build] 6 page(s) built in 2.68s
09:48:17 [build] Complete!
```

3. Verificación de recorte de producción (`dist/vectorwork/works` y `dist/vectorwork/data`):
```powershell
Test-Path "osmanHerreraSiteAstro/dist/vectorwork/works", "osmanHerreraSiteAstro/dist/vectorwork/data"
# False, False (ambas carpetas recortadas limpiamente de dist en producción)
```

4. `npm run assets:test`:
```text
✔ Los 14 tests de validación previa pasaron correctamente.
✔ Tests unitarios: 6/6 casos pasaron.
```

5. Verificación automatizada con Playwright (`node osmanHerreraSiteAstro/scripts/vector/verify-ui.mjs`):
```text
Iniciando verificación con Playwright Chromium Headless sobre http://localhost:4321...
[Playwright Headless 375px] clientWidth: 375, scrollWidth: 375, hasOverflow: false
[Playwright Headless 375px] .slider-viewport: 333.0x492.8px, original img naturalWidth: 450, visible: true
[Playwright Headless] Captura guardada: screenshot-es-375px.png (375x812) en /vectorwork/
[Playwright Headless 1440px] clientWidth: 1440, scrollWidth: 1440, hasOverflow: false
[Playwright Headless 1440px] .slider-viewport: 415.5x615.0px, original img naturalWidth: 450, visible: true
[Playwright Headless] Captura guardada: screenshot-es-1440px.png (1440x900) en /vectorwork/
[Playwright Headless] SVGs de piezas en #vector-render-slot: 0 (debe ser 0)
[Playwright Headless] Categorías mostradas: all, characters, creatures
[Playwright Headless] Modo OUTLINE activado -> outline opacity-100: true, badgeText: "OUTLINE"
[Playwright Headless] Captura modo OUTLINE guardada
[Playwright Headless] Sin foco en controles, tras ArrowRight hash es: "#pieza-02" (debe ser #pieza-02)
[Playwright Headless 1440px] clientWidth: 1440, scrollWidth: 1440, hasOverflow: false
[Playwright Headless 1440px] .slider-viewport: 415.5x615.0px, original img naturalWidth: 450, visible: true
[Playwright Headless] Captura guardada: screenshot-en-1440px.png (1440x900) en /en/vectorwork/
[Playwright Headless] SVGs de piezas en #vector-render-slot: 0 (debe ser 0)
[Playwright Headless] Categorías mostradas: all, characters, creatures
[Playwright Headless] Modo OUTLINE activado -> outline opacity-100: true, badgeText: "OUTLINE"
[Playwright Headless] Captura modo OUTLINE guardada
[Playwright Headless] Sin foco en controles, tras ArrowRight hash es: "#pieza-02" (debe ser #pieza-02)

--- VERIFICACIÓN DE REDIRECCIONES ?lang= ---
✓ /vectorwork/?lang=en#pieza-02 -> http://localhost:4321/en/vectorwork/#pieza-02
✓ /en/vectorwork/?lang=es#pieza-03 -> http://localhost:4321/vectorwork/#pieza-03

--- REVISIÓN DE RED (PETICIONES SVG DE PIEZAS) ---
Peticiones SVG capturadas en Network: []

--- REVISIÓN DE CONSOLA ---
Total logs: 6
Logs de error: []
Excepciones no capturadas: []

ÉXITO: Todas las pruebas de Vector Work pasaron correctamente.
```

## Criterios de la fase
- [x] `osmanHerreraSiteVector/src/content/vector.config.js` migrado a `shared/config/vector.config.ts` (fuertemente tipado con `Localized`) y re-exportado desde `@config`.
- [x] `osmanHerreraSiteVector/src/{components,titles.js,assets-url.js,escape.js}` copiados y adaptados en `osmanHerreraSiteAstro/src/lib/vector/`.
- [x] i18n de Vector Work en cliente resuelto vía `tc()` y `getLang()` leyendo `document.documentElement.lang`, preservando `t()` de `@config` estrictamente tipado sin fallback en SSR. Eliminados `localStorage` y detección por navegador.
- [x] Compatibilidad de redirección: `?lang=en` en `/vectorwork/` redirige a `/en/vectorwork/` conservando `#hash`; `?lang=es` en `/en/vectorwork/` redirige a `/vectorwork/`.
- [x] `public/works/` y `public/data/` disponibles en `osmanHerreraSiteAstro/public/vectorwork/` compartidos para ambos idiomas (`/en/vectorwork/` también consume `/vectorwork/works/…`).
- [x] `assetUrl()` y `loadTitles()` configurados para que la base local sea `/vectorwork/` sin importar el idioma, respetando `PUBLIC_ASSETS_BASE_URL`.
- [x] `VectorView.astro` recibe `lang` y usa `BaseLayout` con título y descripción de `vectorConfig`. Páginas `src/pages/vectorwork/index.astro` y `src/pages/en/vectorwork/index.astro`.
- [x] En el `main` migrado: removidos `renderHeader` y `renderFooter`, eliminado `lang-toggle-btn` propio, y el re-render actualiza únicamente `#vector-app`.
- [x] `robots.txt` en `osmanHerreraSiteAstro/public/robots.txt` con `Disallow: /vectorwork/data/`.
- [x] Recorte de `dist/vectorwork/works` y `dist/vectorwork/data` activo en build de producción mediante integración y plugin de Vite en `astro.config.mjs`.
- [x] Scripts movidos a `osmanHerreraSiteAstro/scripts/vector/`, rutas ajustadas a `vector.config.ts`, scripts npm configurados (`assets`, `assets:test`, `verify:ui`) y `verify-ui.mjs` adaptado para ambos idiomas con aserciones de visor (>200px) e imagen original visible.
- [x] Comparador, modo color/outline, filtros y anterior/siguiente por teclado funcionando en ambos idiomas.
- [x] Carga de imágenes y títulos en desarrollo verificada.
- [x] `npm run assets:test` pasa 100%.

## Desviaciones del prompt
- Creación de helper específico para el cliente `tc()` y `getLang()` en `src/lib/vector/i18n-client.js`: para no debilitar el helper `t(value, lang)` en `shared/config/i18n.ts` (que requiere estrictamente el parámetro `lang` garantizando tipado estricto en SSR/build-time), la lógica de cliente que lee `document.documentElement.lang` e interpola variables `{key}` en componentes DOM de Vector Work se encapsuló en `i18n-client.js`.
- Alineación de dependencias: se actualizó `playwright` en `osmanHerreraSiteAstro/package.json` a `^1.63.0` para coincidir exactamente con el resto del monorepo (`osmanHerreraSiteVector`).

## TODO de contenido
- Módulo de reclutamiento: descripción y URL exacta pendiente de confirmación (`TODO: confirmar`).
- Reemplazar los 4 placeholders SVG en `public/assets/images/projects/` por las capturas reales webp (~1200×750) cuando estén disponibles.

## Traducciones a revisar
Ninguna nueva requerida para esta fase. Las traducciones de Vector Work ya se encontraban completas y auditadas en `vector.config.ts`.

## Dudas / riesgos
Ninguno. Vector Work se compila estáticamente con 6 rutas totales en el sitio, hidratando la lógica del catálogo en `#vector-app` con pleno aislamiento, visor responsivo dimensionado correctamente y cero errores de consola.

## Correcciones de fase-06.md
Respuestas a las observaciones de `docs/handoff/fase-06.review.md`:

1. **[bloqueante] Reglas CSS del visor responsivo y fallback de imágenes:** Portadas a `osmanHerreraSiteAstro/src/styles/global.css` las reglas de `.slider-viewport` (`--slider-max-h: 70vh` y en `@media (min-width: 640px)` `max(360px, min(calc(100vh - 285px), 900px))`) y las reglas de `.img-error > img` y `.img-error > .img-error-fallback`. Se añadieron aserciones a `scripts/vector/verify-ui.mjs` que validan que `.slider-viewport` mida >200px de ancho y alto (verificado en pruebas: 333×492px a 375px y 415×615px a 1440px), y que la imagen original tenga `naturalWidth > 0` (450px) y esté visible.
2. **[bloqueante] Restauración estricta de `t()` y helper de cliente `tc()`:** Se restauró en `shared/config/i18n.ts` la firma estricta `t<T = string>(value: Localized<T>, lang: Lang): T` sin valores por defecto ni lectura de DOM para evitar que componentes de Astro olviden el idioma en compilación. Se creó `osmanHerreraSiteAstro/src/lib/vector/i18n-client.js` con `tc(value, vars?)` y `getLang()`, migrando todos los componentes de `src/lib/vector/**` a su uso.
3. **[menor] Limpieza de archivos sin uso:** Eliminados `osmanHerreraSiteAstro/src/lib/vector/components/header.js` y `footer.js`.
4. **[menor] Exactitud del reporte y alineación de Playwright:** Añadidas las respuestas a las observaciones de la fase 5 en `fase-05.md`, documentadas las desviaciones en `fase-06.md` y actualizada la versión de `playwright` a `^1.63.0` en `osmanHerreraSiteAstro/package.json`.
