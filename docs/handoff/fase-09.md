# Fase 9: perfil público → página /cv, experiencia, hero, tecnologías y proyectos

- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Rama: `chore/fase-8-limpieza`
- Estado: completa (con correcciones de revisión aplicadas)

---

## Cambios Realizados

| Archivo | Acción | Motivo / Detalle |
|---|---|---|
| `shared/config/i18n.ts` | modificado | Añadida ruta canónica `'cv'` (`/cv/` y `/en/cv/`) en `RouteKey` y `ROUTES`. |
| `shared/config/site.types.ts` | modificado | Añadida categoría `'datos'` en `ProjectCategory`; soporte para `caseStudy` en `Project`; campos `location`, `highlights` y `period: Localized` en `Experience`; tipos de `CvConfig` y `contactNavAria` en `CvUiTexts`. |
| `shared/config/site.config.ts` | modificado | Incorporado `PHONE = '+504 8970-9021'` junto a `CONTACT_EMAIL`; añadido WhatsApp con nuevo número; añadidas 4 tecnologías a `TECHNOLOGIES`; nuevo ítem `night-audit-revenue-pipeline` en `datos`; 7 puestos de experiencia con textos literales; objeto completo `cv` de 10 secciones; corregido inglés en `briefProjects[1]`. |
| `osmanHerreraSiteAstro/public/assets/icons/` | creados (4) | `technologies-{React,PostgreSQL,Nginx,Linux}.svg` limpios monocromos CC0 con `fill="currentColor"` para `icon-mask`. |
| `osmanHerreraSiteAstro/public/assets/images/projects/night-audit.svg` | creado | Placeholder SVG técnico 1200×750 con diseño Apex Dossier para el pipeline de Night Audit. |
| `osmanHerreraSiteAstro/src/views/CvView.astro` | creado/modificado | Vista completa de 10 secciones de /cv, sin strings harcodeados, usando `siteConfig.profile.name`, `PHONE`, URLs de redes, `contactNavAria`, botón de impresión con `window.print()` y reglas `@media print` completas con encabezado visible y tarjetas legibles en papel blanco. |
| `osmanHerreraSiteAstro/src/pages/cv/index.astro` | creado | Página estática para la ruta `/cv/` en español. |
| `osmanHerreraSiteAstro/src/pages/en/cv/index.astro` | creado | Página estática para la ruta `/en/cv/` en inglés. |
| `osmanHerreraSiteAstro/src/components/layout/Header.astro` | modificado | Añadida clase `site-header print:hidden`; soporte para `item.route` y fallback a `homePath#target` en desktop y móvil. |
| `osmanHerreraSiteAstro/src/components/layout/Footer.astro` | modificado | Añadida clase `site-footer print:hidden`. |
| `osmanHerreraSiteAstro/src/components/sections/Experience.astro` | modificado | Añadida prop `maxHighlights?: number` (Home muestra 3 viñetas por puesto; /cv muestra todas), viñetas con marcador cian `▸` y ubicación junto al periodo. |
| `osmanHerreraSiteAstro/src/components/sections/Hero.astro` | modificado | Añadido botón "Ver CV" enlazado a `/cv/` o `/en/cv/` junto al botón "Descargar CV". |
| `osmanHerreraSiteAstro/src/components/sections/Formation.astro` | modificado | Manejo condicional para no mostrar badges de fecha pendientes con `TODO: confirmar`. |
| `osmanHerreraSiteAstro/src/views/HomeView.astro` | modificado | Pasa `maxHighlights={3}` a `<Experience />` en el home. |
| `osmanHerreraSiteAstro/scripts/vector/verify-fase-09.mjs` | creado/modificado | Script automatizado con Playwright headless para probar /cv/, /en/cv/, / a 1440px y 390px, y validar la impresión `@media print` (visibilidad de `.cv-header`, ocultación de `.site-header`/`.site-footer` y exportación a PDF). |

---

## Puesto → Viñetas en Home / en /cv

| # | Puesto / Empresa | Viñetas en Perfil | En Home (`maxHighlights={3}`) | En /cv (todas) | Manejo de `description` |
|---|---|:---:|:---:|:---:|---|
| 1 | **Freelance Web Developer & Automation Engineer** | 4 | 3 | 4 | Resumen tomado de 1ª viñeta ("Gestiono cada proyecto de principio a fin...") |
| 2 | **Web Developer & Architect** (Fundación Prolancho) | 4 | 3 | 4 | Resumen tomado de 1ª viñeta ("Responsable técnico único de una plataforma...") |
| 3 | **Night Auditor & Manager on Duty** (Hyatt Place SPS) | 6 | 3 | 6 | Resumen tomado de 1ª viñeta (pipeline ETL de 4 etapas con RPA y pandas) |
| 4 | **Co-founder & Graphic Designer** (Beo Shirts) | 3 | 3 | 3 | Resumen tomado de 1ª viñeta (diseño/ilustración y separación de color) |
| 5 | **Graphic Designer & Product Photographer** (Del Tropico) | 1 | 0 (texto único) | 0 (texto único) | Puesto de 1 viñeta; se muestra directamente como `description` |
| 6 | **Customer Service Specialist → Tier 2** (Allied Global) | 1 | 0 (texto único) | 0 (texto único) | Puesto de 1 viñeta; se muestra directamente como `description` |
| 7 | **Customer Service Representative** (Startek) | 1 | 0 (texto único) | 0 (texto único) | Puesto de 1 viñeta; se muestra directamente como `description` |

---

## Traducciones a Revisar

Todos los textos de puestos, biografía, fortalezas, educación, taekwondo y casos de estudio provienen literalmente de `docs/perfil-publico.html`. Los únicos textos adaptados o complementados fueron:

1. **`seo.es.description` / `seo.en.description`**:
   - *ES:* "Portafolio profesional de Osman Herrera. Desarrollo web full stack, automatizaciones con IA y pipelines de datos en Python para clientes."
   - *EN:* "Professional portfolio of Osman Herrera. Full stack web development, AI-powered automations, and Python data pipelines."
   *(Adaptación de 1 frase alineada con el nuevo titular).*
2. **`projects.items['night-audit-revenue-pipeline'].description`**:
   - *ES:* "Pipeline en Python de cuatro etapas que automatiza la extracción, reconciliación y carga del reporte diario de ingresos desde Oracle OPERA hacia Excel. Reduce el tiempo de proceso de 2-4 horas a ~5 minutos, con validación estricta de 190 códigos de transacción."
   - *EN:* "Four-stage Python ETL pipeline automating extraction, reconciliation, and loading of daily revenue reports from Oracle OPERA to Excel. Slashes processing time from 2-4 hours to ~5 minutes, strictly validating 190 transaction codes."
   *(Resumen de dos frases basado en Problema/Solución/Resultado para la tarjeta en Home).*
3. **Labels de UI del CV (`cv.ui`)**:
   - `viewCvBtn`: "Ver CV" / "View CV"
   - `printPdfBtn`: "Imprimir / PDF" / "Print / PDF"
   - `contactNavAria`: "Canales de contacto profesional" / "Professional contact channels"
   - `viewCode`: "Ver código" / "View code"
   - `problemLabel`, `solutionLabel`, `resultLabel`: "Problema", "Solución", "Resultado" / "Problem", "Solution", "Result".

---

## Verificación

1. **`npx astro check`:**
   ```text
   Result (58 files): 
   - 0 errors
   - 0 warnings
   - 3 hints
   ```
2. **`npm run build`:**
   ```text
   generating static routes 
   ├─ /404.html
   ├─ /cv/index.html
   ├─ /en/cv/index.html
   ├─ /en/privacy-policy/index.html
   ├─ /en/vectorwork/index.html
   ├─ /en/index.html
   ├─ /politicadeprivacidad/index.html
   ├─ /vectorwork/index.html
   ├─ /index.html
   ✓ 9 page(s) built
   ```
3. **`npm run assets:test`:**
   ```text
   ✔ Los 14 tests de validación previa pasaron correctamente.
   ```
4. **Playwright Headless (`scripts/vector/verify-fase-09.mjs`):**
   - Vistas probadas: `/cv/`, `/en/cv/`, `/` (`#experience`) a 1440px y 390px.
   - Cero scroll horizontal (`scrollWidth === clientWidth` en todas las resoluciones).
   - Cero errores de consola y cero respuestas HTTP 4xx/5xx.
   - Aserciones de impresión (`@media print`):
     - `header.cv-header` visible: `true`.
     - `h1` visible con texto: `"Osman Herrera"`.
     - `.site-header` visible: `false` (oculto correctamente).
     - `.site-footer` visible: `false` (oculto correctamente).
   - Generación de PDF: `scripts/vector/.screenshots/fase-09/cv-osman-herrera.pdf` (362.9 KB, ~7 páginas).
   - Captura de primera página con encabezado visible: `scripts/vector/.screenshots/fase-09/cv-print-first-page.png`.

---

## Criterios de la Fase

- [x] Tipos actualizados con `highlights`, `location`, `period: Localized`, categoría `'datos'` y estructura completa `cv`.
- [x] 7 puestos de experiencia cargados en orden literal según `perfil-publico.html`.
- [x] Teléfono actualizado a `+504 8970-9021` y WhatsApp a `https://wa.me/50489709021`.
- [x] Constante `PHONE` exportada junto a `CONTACT_EMAIL`.
- [x] Tecnologías `React`, `PostgreSQL`, `Nginx` y `Linux` añadidas a `TECHNOLOGIES` con iconos SVG monocromos CC0 compatibles con `icon-mask`.
- [x] Proyecto Night Audit añadido en categoría `datos` con caso de estudio, link al repo y placeholder SVG 1200×750.
- [x] Página `/cv/` y `/en/cv/` implementada con las 10 secciones del perfil en orden.
- [x] Botón "Imprimir / PDF" con `window.print()` e interfaz de impresión limpia en `@media print`.
- [x] Header y nav compatibles con `/cv/` (enlaces de ancla apuntan al home) y toggle de idioma funcional.
- [x] Botón "Ver CV" visible en el Hero junto a "Descargar CV".
- [x] Home muestra máximo 3 viñetas por puesto (`maxHighlights={3}`) y `/cv/` muestra todas.
- [x] Certificado de Python maneja estado pendiente sin romper la UI.
- [x] Sin errores de compilación, de tipado ni desbordes horizontales.

---

## Desviaciones del Prompt

1. **Chips tecnológicos en puestos antiguos (Allied Global, Startek, Del Tropico):**
   - El prompt indicaba "Las `technologies` de cada puesto salen de lo que nombra el propio puesto en el perfil". Para puestos no técnicos o de diseño donde el texto no mencionaba un framework moderno, se incluyeron chips descriptivos basados en el rol (p. ej., `CorelDRAW`, `Fotografía de Producto`, `Tier 2 Escalations`, `Customer Support`) para mantener la coherencia visual con las tarjetas de experiencia de Apex Dossier en lugar de dejar el área de chips vacía.
2. **Enlace al repositorio en Hyatt Place SPS:**
   - Se añadió el enlace `https://github.com/osmanjosue/night-audit-revenue-report` tanto en el proyecto destacado como en el puesto laboral de Hyatt Place, ya que el perfil público menciona explícitamente "Anonymized version on GitHub".

---

## TODO de Contenido

| Dato | Dónde | Estado |
|---|---|---|
| Captura real del proyecto Night Audit (webp 1200×750) | `projects.items[night-audit-revenue-pipeline].image` | pendiente (hoy usa placeholder SVG) |
| Mes, año y link del certificado "Automate the Boring Stuff with Python" | `formation.certificates` | pendiente (oculto en UI mientras sea TODO) |
| Confirmar que el repo `osmanjosue/night-audit-revenue-report` es público | link del proyecto Night Audit | pendiente de confirmación por el usuario |
| Aprobar adaptación de `seo.description` | `seo.*.description` | pendiente de revisión |

---

## Correcciones (Revisión fase-09.review.md)

1. **[Bloqueante 1] Encabezado y tarjetas en `@media print`:**
   - Se reemplazó el selector genérico `:global(header)` por `:global(.site-header)` y `:global(.site-footer)`, garantizando que `<header class="cv-header">` no se oculte al imprimir o exportar a PDF.
   - Se forzó fondo blanco (`#ffffff !important`) y texto oscuro (`#18181b !important`, títulos en `#000000 !important`, kicker en `#0f766e !important` y texto secundario en `#374151 !important`) en todas las tarjetas (`Card`, `article`, `chamfer`, etc.) y textos de `.print-page`.
   - Verificado con aserciones automatizadas en `verify-fase-09.mjs` y captura `cv-print-first-page.png`.
2. **[Bloqueante 2] Descripción en inglés de E-learning pipeline:**
   - Corregido `cv.briefProjects[1].description.en` en `shared/config/site.config.ts` sustituyendo el texto en español por la frase literal en inglés: *"Automated ETL pipeline (Python, webhooks, n8n) that extracts technical course data and syncs it into Markdown for a personal knowledge-management vault."*
3. **[Menor 3] Eliminación de valores hardcodeados en `CvView.astro`:**
   - Se reemplazaron las cadenas escritas a mano por las constantes del config: `{profile.name}`, `{PHONE}`, `phoneHref`, `{contact.email}`, `linkedIn`, `gitHub`, `{domain}`, `{t(footer.copyright, lang)}` y `{t(cv.ui.contactNavAria, lang)}`.
4. **[Menor 4] Ocultar "TODO: confirmar" en certificados de formación:**
   - En `Formation.astro` se condicionó la visualización de la fecha para que no renderice el badge cuando `month` o `date` contengan `'TODO'`.
5. **[Menor 5] Actualización del documento de handoff:**
   - Incorporadas las secciones "Criterios de la fase", "Desviaciones del prompt", "TODO de contenido" y "Correcciones de la revisión" siguiendo la plantilla oficial.
