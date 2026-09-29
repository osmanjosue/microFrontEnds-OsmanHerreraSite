# Prompt para el agente Gemini: migración a Astro + rediseño Apex Dossier

> Copia todo lo que está debajo de la línea al agente.

---

## Rol y forma de trabajo
Vas a implementar el rediseño de mi portafolio `osmanherrera.dev` en el monorepo `C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds`. Otro agente (Claude) revisará cada fase antes de pasar a la siguiente.

Reglas:
1. Trabaja en la rama `feat/astro-apex-dossier`, creada desde `main`. Haz un commit por fase, con mensaje en español (p. ej. `Fase 1: crea proyecto Astro y preset Tailwind compartido`).
2. **Al terminar cada fase, escribe el reporte en `docs/handoff/fase-NN.md`** (NN = 01…07) con la plantilla de abajo. Inclúyelo en el mismo commit de la fase. Luego **DETENTE** y responde en el chat solo con la ruta del reporte y el hash del commit. No avances sin aprobación.
   - Si la revisión pide correcciones:
     - aparecerán en `docs/handoff/fase-NN.review.md`;
     - corrígelas en un commit nuevo (`Fase N: corrige observaciones de revisión`);
     - agrega al final de tu `fase-NN.md` una sección `## Correcciones` que responda cada punto por su número.
   - No edites los archivos `.review.md`.

   **Plantilla de `docs/handoff/fase-NN.md`:**
   ```markdown
   # Fase N: <nombre>
   - Commit: <hash corto>
   - Estado: completa | parcial (explica qué falta)

   ## Cambios
   | Archivo | Acción (creado/modificado/movido) | Motivo |
   |---|---|---|

   ## Verificación
   Comandos ejecutados, con las últimas líneas relevantes de la salida (errores y warnings incluidos, sin resumir).

   ## Criterios de la fase
   - [x] / [ ] cada punto de la fase en este prompt, con una nota si no se cumplió.

   ## Desviaciones del prompt
   Qué hiciste distinto y por qué. Si no hubo, escribe "Ninguna".

   ## TODO de contenido
   Campos que quedaron como `TODO: confirmar`, con su ruta en site.config.ts.

   ## Dudas / riesgos
   ```
3. No borres ni modifiques `osmanHerreraSite/` (Angular), `osmanHerreraSiteReact/` ni `osmanHerreraSiteVector/` hasta la fase 7. Solo se leen como referencia.
4. Mantén el estilo del repo: comentarios en español con encabezados `// ===...===`, TypeScript estricto y contenido centralizado en `shared/content`.
5. **No inventes datos.** El diseño de Stitch trae contenido de relleno (lista abajo). Todo texto real sale de `shared/content/site.config.ts`. Si falta un dato, agrega el campo en el config con el valor `'TODO: confirmar'` y menciónalo en tu reporte.

## Contexto
Hoy el sitio son 3 apps separadas, unidas solo por Nginx en producción:
- `osmanHerreraSite/`: Angular, servido en `/angular/`.
- `osmanHerreraSiteReact/`: React + Vite, servido en `/react/`. Es la versión principal.
- `osmanHerreraSiteVector/`: JavaScript sin framework + Vite + Tailwind 3, servido en `/vectorwork/`. Es la galería raster→vector con el sistema de diseño "Apex Dossier".
- `osmanHerreraSiteBackend/`: API Express para el formulario de contacto. **No se toca.**
- `shared/content/`: `site.config.ts`, `site.types.ts`, `scroll-color.ts` e `index.ts`. Es el contenido compartido, importado con el alias `@shared`.

**Objetivo:** un solo proyecto **Astro + TypeScript** (`osmanHerreraSiteAstro/`) que:
- sirva `/`, `/politicadeprivacidad` y `/vectorwork/`;
- use **React solo como isla** para el formulario de contacto;
- replique el diseño de Stitch.

## Referencias de diseño (léelas completas antes de empezar)
- `docs/stitch_vector_portfolio_showcase_ui-main/code.html`: maqueta HTML con Tailwind. Es la referencia visual y de clases.
- `docs/stitch_vector_portfolio_showcase_ui-main/screen.png`: captura del resultado esperado.
- `docs/stitch_vector_portfolio_showcase_ui-main/DESIGN.md`: sistema de diseño Apex Dossier.
- `osmanHerreraSiteVector/tailwind.config.js`: **fuente de verdad de los tokens.** Si hay diferencias con la maqueta, gana este archivo. Por ejemplo, `borderRadius` es 0 aquí y no 0.25rem como en `code.html`.

### Contenido de relleno de Stitch que NO debe llegar al sitio
Estos datos se reemplazan por los reales o se dejan como `TODO: confirmar`:
- Stats del hero: "12+ años", "25+ proyectos" y "15 tecnologías". El 15 se calcula con `skills.technologies.length`; los otros dos son TODO.
- Tecnologías de francisherrera.com ("Next.js, React, TypeScript, TailwindCSS") y del módulo de reclutamiento. Son TODO.
- Texto extra de la bio ("Combino más de una década…"), "STATUS: DISPONIBLE PARA CONTRATACIÓN" y "ENFOQUE: …". Se usa `profile.bio` real; los textos nuevos van al config.
- IDs de credenciales (`CREDENTIAL #26-774`, etc.), "DETALLES +8", "BUILD_REF v2.6.4" y "ENCRYPT: TLS_v1.3". Se eliminan, o se dejan como decoración genérica sin números falsos.
- Enlaces sociales falsos (`wa.me/50400000000`, `linkedin.com`, `github.com`). Se usa `socialIcons` real.
- Imágenes con `data-alt` generadas por Stitch. Se usa `profile.image` real; las capturas de proyectos serán placeholders en `public/images/projects/` hasta que yo las provea.
- Campo "Asunto / Tipo de proyecto" del formulario. **Se elimina**, porque el backend solo acepta `nombre`, `correoElectronico` y `content`.
- El script inline de `code.html` (filtros y envío simulado) **no se copia**: el filtro se reescribe y el envío es real.

---

## Fase 1: proyecto Astro y preset compartido
1. Crea `shared/tailwind.preset.js` (ESM) con el `theme.extend` completo de `osmanHerreraSiteVector/tailwind.config.js`: colores, radios, spacing, fontFamily y fontSize. Agrega la utilidad `.chamfer` como plugin, o documenta que va en el CSS global.
2. Crea `osmanHerreraSiteAstro/` con:
   - Última versión de `astro`, `@astrojs/react`, `react`, `react-dom`, `typescript` y `@astrojs/check`.
   - **Tailwind 3 vía PostCSS:** `tailwindcss@^3.4`, `postcss` y `autoprefixer`, con `postcss.config.mjs` y `tailwind.config.mjs` que usan `presets: [require/import del preset]`. **No uses `@astrojs/tailwind`**, porque no soporta la versión actual de Astro. Verifica los peers con `npm view <pkg> peerDependencies`.
   - `tsconfig.json` que extiende `astro/tsconfigs/strict`, con el alias `@shared/*` → `../shared/*`. Agrega también el alias en `vite.resolve.alias` de `astro.config.mjs`.
   - `output: 'static'` y `site: 'https://osmanherrera.dev'`.
3. Agrega `osmanHerreraSiteAstro` a los `workspaces` del `package.json` raíz y los scripts `dev:astro` y `build:astro`. No cambies todavía los demás scripts.
4. Crea una página mínima que importe `siteConfig` y renderice `brand`. Así se prueba que el alias y el preset funcionan.
5. **Verifica:** `npm install`, `npm run dev:astro`, `npx astro check` y `npm run build:astro` terminan sin errores.

## Fase 2: layout y componentes UI
- `src/styles/global.css`:
  - `@tailwind base/components/utilities`;
  - base de `html` y `body` como en `osmanHerreraSiteVector/src/style.css`;
  - `.chamfer`;
  - `prefers-reduced-motion`.
- `src/layouts/BaseLayout.astro`:
  - `<head>` con título y description por prop;
  - Google Fonts (Space Grotesk, Inter, JetBrains Mono) y Material Symbols Outlined, **limitados con `icon_names=`** a los iconos usados;
  - favicon `oherrera.ico`;
  - header y footer;
  - `<slot />`;
  - un slot con nombre `header-actions` para acciones por página (lo usará Vector Work para su botón ES/EN).
- `src/components/layout/Header.astro`, con marca, badge "DISPONIBLE PARA TRABAJO REMOTO", nav, ubicación y botón "VECTOR WORK", según `code.html`:
  - Los items del nav salen de `siteConfig.nav` y `vectorWorkLink`.
  - Los enlaces a secciones son `/#id` para que funcionen desde otras páginas.
  - En móvil hay un menú desplegable (la maqueta no lo trae: impleméntalo en el mismo estilo, sin librerías).
  - **Se elimina la franja "Este sitio está hecho en React…"** y `frameworkSwitch` sale del config y de los tipos.
- `src/components/layout/Footer.astro`, con copyright, crédito y enlace a `/politicadeprivacidad`.
- `src/components/ui/`: `SectionHeader.astro` (kicker `// …`, título `NN // TÍTULO` y subtítulo), `Card.astro` (con variante chamfer y props para marcas de esquina), `CornerMarks.astro`, `Chip.astro` (variantes common, tactical y gold de DESIGN.md), `Button.astro` (primary y ghost; renderiza `<a>` o `<button>`) y `StatTile.astro`.
- Toda clase repetida se encapsula en estos componentes. Las secciones no deben repetir cadenas largas de clases.

## Fase 3: secciones del home
En `src/components/sections/`, un `.astro` por sección, con IDs `hero`, `technologies`, `projects`, `formation`, `experience` y `contact`. Usa los `target` de `siteConfig.nav` y agrega `{ label: 'Proyectos', target: 'projects' }`.
- **Contenido nuevo en `shared/content/site.types.ts` y `site.config.ts`:**
  - `hero.kicker`, `hero.location` y `hero.stats: { value: string; label: string }[]`.
  - `profile.status` y `profile.focus`.
  - `projects: { title, subtitle, kicker, filters: {id,label}[], items: Project[] }`, con `Project = { id: string; category: 'web'|'modulos'|'diseno'; badge?: string; title: string; description: string; image: string; technologies: string[]; links: ExperienceLink[]; featured?: boolean }`.
- **Los 4 proyectos:**
  1. **Fundación Prolancho — Sitio web** (`web`). Usa la descripción y tecnologías de `experience.items[0]`. Enlaces: `https://www.fundacionprolancho.org` y el repo.
  2. **Fundación Prolancho — Módulo de Reclutamiento** (`modulos`). Descripción y tecnologías `TODO: confirmar`; URL `https://www.fundacionprolancho.org` (ruta exacta TODO).
  3. **francisherrera.com** (`web`). Descripción y tecnologías `TODO: confirmar`; URL `https://francisherrera.com`.
  4. **Vector Work** (`diseno`). Enlace interno `/vectorwork/`.
- **Iconos de habilidades:** reutiliza los SVG existentes. Copia `osmanHerreraSiteReact/public/assets/` → `osmanHerreraSiteAstro/public/assets/` y usa la técnica `icon-mask` de `osmanHerreraSiteReact/src/App.css` para teñirlos de cian. Solo usa Material Symbols donde la maqueta los usa en la UI.
- **Filtro de proyectos:**
  - Un `<script>` de Astro (TS) que alterna `hidden` en `[data-category]` y marca con `aria-pressed` el botón activo.
  - Los contadores de cada filtro se calculan en el build.
- `src/components/RichText.astro`: equivalente de `osmanHerreraSiteReact/src/components/RichText.tsx`, para los campos `RichText`. Los `highlight` se muestran en `text-primary-container`.
- `src/pages/politicadeprivacidad.astro`: porta `osmanHerreraSiteReact/src/pages/PrivacyPolicy.tsx` con `siteConfig.privacyPolicy`, en el estilo nuevo.

## Fase 4: isla del formulario de contacto
- `src/components/islands/ContactForm.tsx`, usado con `client:visible`.
- Porta la lógica de `osmanHerreraSiteReact/src/components/footer.tsx`, `src/hooks/useContactForm.ts` y `src/api/emailApi.ts`:
  - `react-hook-form`;
  - validaciones y mensajes de `siteConfig.contactForm`;
  - `POST ${API}/email` con `{ nombre, correoElectronico, content }`.
- Variable de entorno `PUBLIC_EMAIL_API_URL`. `.env` apunta a `http://localhost:3000/api` y `.env.production` a `/api`.
- **Reemplaza `alert()` por un mensaje en línea** (éxito en cian, error en `error`), con `aria-live="polite"`.
- Estilo de inputs y botón según `code.html` (sin el campo Asunto).

## Fase 5: migrar Vector Work a `/vectorwork/`
- Copia `osmanHerreraSiteVector/src/{content,components,i18n.js,titles.js,assets-url.js,escape.js}` → `osmanHerreraSiteAstro/src/lib/vector/`.
- Copia `public/works/` y `public/data/` → `osmanHerreraSiteAstro/public/vectorwork/works/` y `…/vectorwork/data/`, para que las URLs públicas no cambien.
- Ajusta `assetUrl()` y `loadTitles()` para que la base local sea `${import.meta.env.BASE_URL}vectorwork/`. Se respeta `VITE_ASSETS_BASE_URL`, que pasa a llamarse `PUBLIC_ASSETS_BASE_URL`. Actualiza `.env.production`.
- `src/pages/vectorwork/index.astro`:
  - usa `BaseLayout` con título y description de `vectorConfig.ui.pageTitle` y `metaDescription`;
  - tiene un `<div id="vector-app">`;
  - tiene un `<script>` que importa el `main` migrado.
- En el `main` migrado:
  - quita `renderHeader` y `renderFooter`, porque el layout ya los pone;
  - el botón ES/EN va en el slot `header-actions` del layout;
  - el listener se engancha con `document.getElementById('lang-toggle-btn')`;
  - el re-render solo reemplaza el contenido de `#vector-app`.
- `robots.txt` va a `osmanHerreraSiteAstro/public/robots.txt`, con el mismo contenido.
- Mantén el recorte de `works/` y `data/` en el build de producción (plugin `cleanProductionDistPlugin` de `osmanHerreraSiteVector/vite.config.js`), ahora sobre `dist/vectorwork/works` y `dist/vectorwork/data`.
- Mueve `osmanHerreraSiteVector/scripts/*` a `osmanHerreraSiteAstro/scripts/vector/`, ajusta sus rutas (`public/vectorwork/works`) y los scripts npm `assets` y `assets:test`. Adapta `verify-ui.mjs` para apuntar a `/vectorwork/`.
- **Verifica:**
  - comparador, color/outline, filtros, anterior/siguiente con el teclado y ES/EN funcionan;
  - las imágenes y los títulos cargan en dev;
  - `npm run assets:test` pasa.

## Fase 6: build y despliegue
- En el `package.json` raíz:
  - `dev` y `build` apuntan a Astro;
  - `build:all` = `build:astro && build:backend`.
- Escribe `docs/nginx-astro.md` con el bloque de Nginx propuesto:
  - `root` → `dist` de Astro en `/`, con `try_files $uri $uri/ $uri.html =404`;
  - `location = /vectorwork` → 301 a `/vectorwork/`;
  - alias de `/vectorwork/data/` y `/vectorwork/works/` hacia `/var/www/vectorwork-assets/`, como en la sección 8 de `osmanHerreraSiteVector/README.md`;
  - `location /api/` hacia el backend, sin cambios;
  - 301 de `/react/` y `/angular/` (y sus subrutas) → `/`; y de `/react/politicadeprivacidad` → `/politicadeprivacidad`.
- **No toques el servidor.** Solo la documentación.

## Fase 7: limpieza (solo cuando yo lo apruebe)
- Quita `osmanHerreraSite`, `osmanHerreraSiteReact` y `osmanHerreraSiteVector` de `workspaces` y borra sus carpetas. El historial queda en git. Borra también `ANGULAR_DESIGN_REPLICA.md` si ya no aplica.
- Crea `osmanHerreraSiteAstro/README.md` con estructura, comandos, cómo agregar un proyecto al portafolio y cómo agregar una pieza vectorial (fusiona la guía del README de Vector Work).
- Actualiza los comentarios de `shared/content` que mencionan "Angular y React".
- Deja `docs/handoff/` tal cual: es el registro de la migración.

## Criterios de aceptación globales
- `npx astro check` sin errores y `npm run build` sin warnings nuevos.
- Un solo `npm run dev` sirve `/`, `/politicadeprivacidad` y `/vectorwork/`, y todos los enlaces del nav funcionan en local.
- La apariencia coincide con `screen.png` en desktop (1440px) y funciona en móvil (375px) sin scroll horizontal.
- Todo texto visible sale de `shared/content` o de `vectorConfig`; no hay contenido de relleno de Stitch.
- Lighthouse: accesibilidad ≥ 95. El HTML del home no carga JavaScript salvo la isla del formulario y el script del filtro.
