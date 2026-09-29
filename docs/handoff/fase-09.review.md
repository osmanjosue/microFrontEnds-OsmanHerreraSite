# Revisión fase 9
- Commit revisado: 9cd4744
- Veredicto: REQUIERE CORRECCIONES

## Verificación propia
- `git show --stat 9cd4744`: 18 archivos. Coinciden con el reporte. No se tocó nada fuera del alcance.
- `npm run build`: 9 páginas (se agregan `/cv/` y `/en/cv/`). `npx astro check`: 0 errors, 0 warnings. `npm run assets:test`: los 14 tests pasan.
- **Textos literales:** con un script (jiti + `siteConfig`), comparé cada string ≥25 caracteres de `experience`, `cv`, `profile`, `hero` y del proyecto Night Audit con el texto de `docs/perfil-publico.html`.
  - Todo es literal, salvo lo declarado en el reporte (`seo.description`, la descripción corta de Night Audit y las etiquetas de la UI) y el punto 2.
  - Las diferencias que marcó el script en los textos con apóstrofo son falsos positivos (el HTML usa `&#x27;`).
- **Experiencia:** los 7 puestos en el orden pedido, con los periodos y ubicaciones del perfil. Se conservan los links de Prolancho y Beo Shirts, y se agregó drafrancisherrera.com en Freelance.
- **Datos:**
  - WhatsApp: `https://wa.me/50489709021`.
  - `TECHNOLOGIES`: incluye React, PostgreSQL, Nginx y Linux (19 en total).
  - Categoría `datos` y el proyecto Night Audit con `caseStudy`.
- **Playwright** sobre `dist/`, servido desde el mismo script: `/cv/`, `/en/cv/`, `/` y `/en/` a 1440 y 390 px.
  - 0 px de scroll horizontal, 0 errores de consola y 0 respuestas 4xx.
  - hreflang y canonical correctos en /cv. El nav desde /cv apunta a `/#seccion` y el toggle lleva a `/en/cv/`.
  - Viñetas: 12 en el home (3 por puesto con viñetas) y 17 en /cv (todas).
  - El Hero tiene "Ver CV" junto a "Descargar CV".
- **Impresión** (`emulateMedia print` + `page.pdf` Letter): 6 páginas. Ver el punto 1.

## Observaciones
1. [bloqueante] `osmanHerreraSiteAstro/src/views/CvView.astro:336-341`: `@media print` oculta `:global(header)`, lo que esconde también el `<header class="cv-header">` del propio CV. **El PDF sale sin nombre, título ni datos de contacto.** Además, solo se aclaran las tarjetas `.cv-card`: las tarjetas de Experiencia (componente `Card`), Night Audit, Habilidades y Taekwondo siguen con fondo oscuro, y los textos `text-primary` y `text-on-surface-variant` quedan gris claro sobre blanco en Perfil y Sobre mí (poco legibles).
   → Ocultar solo el header y el footer globales del layout (p. ej. `body > header`, o una clase `site-header`/`site-footer` en `Header.astro`/`Footer.astro`) y nunca `.cv-header`. En impresión, forzar fondo blanco y texto oscuro en todas las tarjetas y textos de /cv (p. ej. `.print-page *` con `background: transparent`/`color: #18181b`, y un borde gris claro para las tarjetas). Verificarlo con una captura de `emulateMedia print` en la que se vea el nombre en la primera página.
2. [bloqueante] `shared/config/site.config.ts:1125`: `cv.briefProjects[1].description.en` mezcla idiomas: "Automated ETL pipeline (Python, webhooks, n8n) **que extrae contenido de cursos técnicos…**". Se ve en `/en/cv/`.
   → Usar el texto del perfil: "Automated ETL pipeline (Python, webhooks, n8n) that extracts technical course data and syncs it into Markdown for a personal knowledge-management vault."
3. [menor] `CvView.astro:45,65-96,329`: el nombre, el teléfono, las URLs de LinkedIn, GitHub y el sitio, y el "© 2026 Osman Herrera" están escritos a mano en el componente, y no se usa la constante `PHONE` (regla 5). El `aria-label="Contacto CV"` tampoco está localizado.
   → Tomarlos de `siteConfig` (`profile.name`, `PHONE`, `socialIcons`/`cv`), con el `aria-label` en `cv.ui`.
4. [menor] `Formation.astro:67-71`: el certificado "Automate the Boring Stuff" muestra "TODO: confirmar TODO: confirmar" en el home (y "TODO: confirm TODO: confirmar" en inglés, con el año sin traducir).
   → Mientras sea TODO, no mostrar la fecha (misma lógica que el link). El dato real ya está en `pendientes-contenido.md`.
5. [menor] `docs/handoff/fase-09.md` no sigue la plantilla: le faltan "Criterios de la fase", "Desviaciones del prompt" y "TODO de contenido".
   → Agregarlas en la sección `## Correcciones`. Declarar como desviación los chips derivados de Allied, Startek y Del Tropico, y el link al repo en el puesto de Hyatt, que son razonables.

<!-- VEREDICTO: REQUIERE CORRECCIONES -->

## Re-revisión (4aa191c)
Verificación: `npm run build` genera 9 páginas y `astro check` da 0 errors, 0 warnings. Volví a correr la comparación de textos contra el perfil: solo quedan las diferencias aceptadas (chips derivados y ubicación con el cliente). Volví a correr Playwright en /cv, /en/cv, / y /en a 1440 y 390 px: 0 px de scroll horizontal, 0 errores de consola y 0 respuestas 4xx. Generé el PDF Letter (7 páginas) y lo convertí a PNG con PyMuPDF.

1. **Resuelto.** El PDF abre con nombre, título, ubicación y contacto. Las tarjetas salen con fondo blanco y borde gris y el texto es legible. Queda un matiz (menor, punto 6).
2. **Resuelto.** `cv.briefProjects[1].description.en` es literal del perfil.
3. **Resuelto.** `CvView.astro` toma el nombre, `PHONE`, el correo, los enlaces y el copyright del config, y el `aria-label` está localizado.
4. **Resuelto.** El home ya no muestra "TODO" en el certificado.
5. **Resuelto.** El reporte tiene criterios, desviaciones y TODO de contenido.

### Observaciones nuevas (menores, pulido opcional de la impresión)
6. [menor] `CvView.astro` (`@media print`): con "Gráficos de fondo" activado en el diálogo de impresión (o `printBackground: true`), las tarjetas de `Card` vuelven a salir gris oscuro con texto oscuro encima: se ve en la captura de `emulateMedia('print')` en "Qué hago", Night Audit, Educación y Taekwondo. Con la opción por defecto el PDF sale bien.
   → Forzar `background: #fff !important` también en el fondo real de `Card` (el elemento o pseudo-elemento que pinta `bg-surface-container*`).
7. [menor] En el PDF, los títulos de los puestos (`text-primary`) salen gris claro y el resaltado cian tiene poco contraste sobre blanco. Además, el encabezado "// EXPERIENCIA" queda solo al final de la página 1, porque la primera tarjeta salta a la página 2.
   → En print: títulos `#111`, resaltado `#0f766e`, y `break-after: avoid` en los encabezados de sección.

<!-- VEREDICTO: APROBADA CON OBSERVACIONES -->
