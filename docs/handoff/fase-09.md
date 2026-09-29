# Handoff Fase 9: Perfil público → Página /cv, Experiencia, Hero, Tecnologías y Proyectos

**Fecha:** 2026-09-29  
**Rama:** `chore/fase-8-limpieza` (continuación directa)  
**Fuente de datos:** `docs/perfil-publico.html` (actualizado 2026-09-28)

---

## 1. Resumen de lo ejecutado

Se implementó de forma completa la **Fase 9**, integrando el perfil público bilingüe del usuario en la arquitectura de Astro:
1. **Configuración y Tipado (`shared/config/`)**:
   - `shared/config/i18n.ts`: Añadida la ruta `'cv'` con `{ es: '/cv/', en: '/en/cv/' }`.
   - `shared/config/site.types.ts`: Incorporados campos `location`, `highlights` y `period: Localized` en `Experience`. Añadida la categoría `'datos'` en `ProjectCategory`, soporte para `caseStudy` en `Project`, y los tipos de la nueva clave `cv` (`CvConfig`, `CvWhatIDoItem`, `CvSkillGroup`, `CvLanguage`, `CvBriefProject`, `CvUiTexts`).
   - `shared/config/site.config.ts`:
     - Añadida constante `PHONE = '+504 8970-9021'` junto a `CONTACT_EMAIL` y actualizado el número en WhatsApp.
     - Añadidos `'React'`, `'PostgreSQL'`, `'Nginx'` y `'Linux'` a `TECHNOLOGIES`.
     - Actualizados `seo.title`, `seo.description`, `hero.subtitle`, `profile.focus`, `profile.badges` y `profile.bio` con el texto literal del perfil (resaltado en la 1ª frase).
     - Añadido el ítem `'cv'` al menú de navegación principal (`nav`).
     - Añadido el proyecto `night-audit-revenue-pipeline` en la categoría `datos` con sus datos de caso de estudio (Problema, Solución, Resultado).
     - Incorporados los 7 puestos laborales ordenados según el perfil con sus tecnologías y links.
     - Estructurado el objeto `cv` con las 10 secciones del perfil público.
2. **Iconos y Recursos Gráficos**:
   - Nuevos iconos SVG monocromos compatibles con `icon-mask` (Simple Icons CC0, `fill="currentColor"`):
     - `public/assets/icons/technologies-React.svg`
     - `public/assets/icons/technologies-PostgreSQL.svg`
     - `public/assets/icons/technologies-Nginx.svg`
     - `public/assets/icons/technologies-Linux.svg`
   - Placeholder SVG sobrio con estética Apex Dossier para el proyecto Night Audit:
     - `public/assets/images/projects/night-audit.svg` (1200×750).
3. **Página /cv y Vistas**:
   - `src/views/CvView.astro`: Implementación de las 10 secciones en orden, soporte para impresión `@media print` (fondo blanco, tipografía oscura, ocultación de menús, `break-inside: avoid`), botón de impresión rápida con `window.print()`.
   - `src/pages/cv/index.astro`: Ruta española `/cv/`.
   - `src/pages/en/cv/index.astro`: Ruta inglesa `/en/cv/`.
4. **Componentes y Navegación**:
   - `src/components/layout/Header.astro`: Soporte para enlaces con `route` o `target`; navegación con `#hash` que redirige correctamente al home desde `/cv/`.
   - `src/components/sections/Experience.astro`: Prop `maxHighlights?: number` para limitar viñetas en Home (`maxHighlights={3}`) y mostrar todas en `/cv/`. Marcador cian (`▸`) para viñetas y visualización de ubicación.
   - `src/components/sections/Hero.astro`: Añadido botón "Ver CV" enlazado a `/cv/` o `/en/cv/` junto a "Descargar CV".
   - `src/components/sections/Formation.astro`: Manejo seguro para certificados sin link o con fecha pendiente.

---

## 2. Tabla: Puesto → Viñetas en Home / en /cv

| # | Puesto / Empresa | Viñetas en Perfil | En Home (`maxHighlights={3}`) | En /cv (todas) | Manejo de `description` |
|---|---|:---:|:---:|:---:|---|
| 1 | **Freelance Web Developer & Automation Engineer**<br>Self-employed | 4 | 3 | 4 | Resumen tomado de la 1ª viñeta ("Gestiono cada proyecto de principio a fin...") |
| 2 | **Web Developer & Architect**<br>Fundación Prolancho | 4 | 3 | 4 | Resumen tomado de la 1ª viñeta ("Responsable técnico único de una plataforma...") |
| 3 | **Night Auditor & Manager on Duty**<br>Hyatt Place San Pedro Sula | 6 | 3 | 6 | Resumen tomado de la 1ª viñeta (pipeline ETL de 4 etapas con RPA y pandas) |
| 4 | **Co-founder & Graphic Designer**<br>Beo Shirts | 3 | 3 | 3 | Resumen tomado de la 1ª viñeta (diseño/ilustración y separación de color) |
| 5 | **Graphic Designer & Product Photographer**<br>Del Tropico Designs | 1 | 0 (como texto) | 0 (como texto) | Puesto de 1 viñeta; se muestra directamente en `description`, sin viñetas |
| 6 | **Customer Service Specialist → Tier 2 Supervisor**<br>Allied Global Technology Services | 1 | 0 (como texto) | 0 (como texto) | Puesto de 1 viñeta; se muestra directamente en `description`, sin viñetas |
| 7 | **Customer Service Representative**<br>Startek | 1 | 0 (como texto) | 0 (como texto) | Puesto de 1 viñeta; se muestra directamente en `description`, sin viñetas |

---

## 3. Traducciones y Textos a Revisar

Todos los textos de puestos, biografía, fortalezas, educación, taekwondo y casos de estudio provienen **literalmente** de `docs/perfil-publico.html`. Los únicos textos adaptados o complementados fueron:

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
   - `viewCode`: "Ver código" / "View code"
   - `problemLabel`, `solutionLabel`, `resultLabel`: "Problema", "Solución", "Resultado" / "Problem", "Solution", "Result".

---

## 4. Resultados de Verificación Técnica

- **Astro Check:** `npx astro check` → **0 errores**, **0 warnings**.
- **Build de Producción:** `npm run build` → Generadas **9 páginas estáticas** en `dist/`:
  - `/index.html`
  - `/en/index.html`
  - `/cv/index.html`
  - `/en/cv/index.html`
  - `/vectorwork/index.html`
  - `/en/vectorwork/index.html`
  - `/politicadeprivacidad/index.html`
  - `/en/privacy-policy/index.html`
  - `/404.html`
- **Tests de Assets Vectoriales:** `npm run assets:test` → **14/14 tests aprobados** (`✔ PASS`).
- **Pruebas Automatizadas con Playwright Headless (`scripts/vector/verify-fase-09.mjs`):**
  - Viewport 1440px y 390px probados en `/cv/`, `/en/cv/` y `/` (sección Experiencia).
  - Cero desbordes horizontales (`scrollWidth === clientWidth` en todos los casos).
  - Cero errores de consola.
  - Cero respuestas HTTP 4xx o 5xx.
  - Generación de PDF Letter y captura de impresión `@media print`:
    - Archivo: `osmanHerreraSiteAstro/scripts/vector/.screenshots/fase-09/cv-osman-herrera.pdf` (323.3 KB, ~7 páginas).
    - Capturas guardadas en `.screenshots/fase-09/` (ignorado por git).

---

## 5. Estado de Git y Siguiente Paso

- El orquestador **NO** fue ejecutado (cumplimiento estricto de Regla 7).
- Listo para commit en la rama `chore/fase-8-limpieza`.
