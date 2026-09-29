# Revisión fase 6
- Commit revisado: e1b97e1 (y 6e81d62, correcciones de la fase 5)
- Veredicto: REQUIERE CORRECCIONES

La migración está bien estructurada. Funcionan las 6 rutas, las etiquetas `hreflang` son correctas, el toggle ES/EN enlaza a la página equivalente, las obras y los títulos siguen fuera de git, el recorte de `dist/` funciona y `assets:test` pasa. Pero **el visor comparador no muestra la ilustración**, que es la función principal de Vector Work.

## Verificación propia
- `astro check` 0 errors; `build` 6 páginas; `dist/vectorwork/` solo contiene `index.html` (obras y datos recortados) ✓.
- `npm run assets:test`: los 14 tests pasan ✓.
- Bundle de Vector: 50 KB; no incluye `site.config` (sin textos del home) ✓.
- Obras y `titles.json` fuera de git; solo se versiona `titles.example.json` ✓.
- Playwright sobre `dist` + `public` (`/vectorwork/` a 1440px y `/en/vectorwork/` a 375px):
  - 0 errores y 0 respuestas 4xx; `lang`, título, `hreflang` y toggle correctos; 11 imágenes cargadas; sin scroll horizontal;
  - **en la captura, el visor aparece colapsado:** solo se ve el control del slider, de ~20px de ancho, sin el arte original ni el vector, en ambos idiomas.

## Observaciones
1. [bloqueante] Faltan en `osmanHerreraSiteAstro/src/styles/global.css` las reglas de `osmanHerreraSiteVector/src/style.css:26-49`:
   - `.slider-viewport`, que define `--slider-max-h` y su media query `sm`;
   - `.img-error > img` y `.img-error > .img-error-fallback`.

   `compare-slider.js:106-110` usa `max-height: var(--slider-max-h)` y calcula el ancho con esa variable. Como no está definida, el visor queda sin tamaño. → Portar esas reglas (en `@layer utilities` y como CSS normal, igual que en el original). Luego **agregar a `scripts/vector/verify-ui.mjs` una aserción**: el `.slider-viewport` mide más de 200px de ancho y de alto, y la imagen original tiene `naturalWidth > 0` y está visible. El script pasó con el visor roto, así que hoy no lo detecta.
2. [bloqueante] `shared/config/i18n.ts`: `t()` pasó de `t(value, lang)` a `lang` opcional, que por defecto lee `document.documentElement.lang` y en el servidor devuelve `'es'`. Además, `value ? … : ''` oculta valores faltantes. Así se pierde la garantía de la fase 2: un componente `.astro` que olvide pasar `lang` renderizaría español en `/en/` sin error de TypeScript. **No está declarado como desviación.** → Restaurar `t(value: Localized<T>, lang: Lang): T`, estricto y sin respaldo. Crear en `src/lib/vector/i18n-client.js` (o como `tClient` en `i18n.ts`) un helper para el cliente, `tc(value, vars?)`, que lea `document.documentElement.lang` e interpole `{key}`, y usarlo en `src/lib/vector/**`.
3. [menor] `src/lib/vector/components/header.js` y `footer.js` quedaron copiados pero no se usan (`renderHeader`/`renderFooter` ya no se importan). → Eliminarlos.
4. [menor] Exactitud del reporte:
   - `fase-05.md` no tiene respuestas a los puntos 1-4 de `fase-05.review.md` (su `## Correcciones` responde a la fase 4), aunque los cambios sí están aplicados (verificado);
   - `fase-06.md` dice "Desviaciones: Ninguna", pero cambió la firma de `t()` y agregó `playwright ^1.50.0` como devDependency de Astro, mientras la raíz usa 1.63.

   → Agregar las respuestas a `fase-05.md`, corregir las desviaciones de `fase-06.md` y alinear la versión de Playwright con la raíz.
5. [info] El contenido de Vector Work se renderiza solo en el cliente: `#vector-app` llega vacío en el HTML, como en la app original. Es aceptable por ahora. Si en el futuro importa el SEO de la galería, se puede prerenderizar la pieza inicial en el `.astro`.

<!-- VEREDICTO: REQUIERE CORRECCIONES -->

## Re-revisión (659f927)
- Veredicto: APROBADA CON OBSERVACIONES

### Verificación propia
- `astro check`: 0 errors, 0 warnings. `astro build`: 6 páginas. `dist/vectorwork/` solo contiene `index.html` ✓.
- `test-assets-fixture.mjs`: los 14 tests pasan ✓.
- `git diff e1b97e1^ HEAD -- shared/config/i18n.ts`: `t(value, lang)` queda igual que en la fase 2 (solo cambian el JSDoc y el `T = string` por defecto) ✓.
- Playwright sobre `dist` + `public` (servidor propio en el puerto 4399, cerrado al terminar):
  - `/vectorwork/` a 1440px: visor de 416×615, `--slider-max-h` aplicado; imagen original con `naturalWidth` 450, visible; la captura muestra el comparador completo, con el original, el vector y el control;
  - `/en/vectorwork/` a 375px: visor de 333×493, `--slider-max-h: 70vh`; textos en inglés;
  - `/vectorwork/?lang=en#pieza-02` redirige a `/en/vectorwork/#pieza-02` y muestra la pieza 2;
  - en los 3 casos: 0 errores de consola, 0 respuestas 4xx, sin scroll horizontal.

### Estado de los puntos
1. ✅ `global.css` incluye `.slider-viewport` y `.img-error`, idénticos a `osmanHerreraSiteVector/src/style.css:26-49`. `verify-ui.mjs` comprueba el tamaño del visor (>200px) y la imagen original (`naturalWidth > 0` y visible) antes de la captura.
2. ✅ `t()` es estricto otra vez. `src/lib/vector/i18n-client.js` expone `tc()` y `getLang()`, y `src/lib/vector/**` ya no importa `t` ni `getLang` de `@config`. La desviación está declarada.
3. ✅ `header.js` y `footer.js` eliminados.
4. ✅ `fase-05.md` ya responde a la revisión de la fase 5; `fase-06.md` declara las desviaciones; Playwright usa `^1.63.0`.
5. Info, sin cambios (se acepta el render solo en el cliente).

### Observaciones nuevas
6. [menor] `osmanHerreraSiteAstro/src/lib/vector/components/detail.js:83,109-111,121` resuelve textos con `x[currentLang] || x.es`. Si falta la traducción, muestra español en `/en/` sin avisar, que es el patrón que el punto 2 quiso evitar. `tc()` hace algo parecido: con `!value` devuelve `''` (`i18n-client.js:28`). → Usar `tc()` (o `value[getLang()]`) sin respaldo a `.es` y dejar que `vector.config.ts` garantice con sus tipos que existen ambos idiomas. Corregir al inicio de la fase 7.

<!-- VEREDICTO: APROBADA CON OBSERVACIONES -->
