# Prompt para el agente Gemini: migración a Astro + rediseño Apex Dossier

> Copia todo lo que está debajo de la línea al agente.

---

## Rol y forma de trabajo
Vas a implementar el rediseño de mi portafolio `osmanherrera.dev` en el monorepo `C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds`. Otro agente (Claude) revisará cada fase antes de pasar a la siguiente.

Reglas:
1. Trabaja en la rama `feat/astro-apex-dossier`, creada desde `main`. Haz un commit por fase, con mensaje en español (p. ej. `Fase 1: crea proyecto Astro y preset Tailwind compartido`).
2. **Al terminar cada fase, escribe el reporte en `docs/handoff/fase-NN.md`** (NN = 01…08) con la plantilla de abajo. Inclúyelo en el mismo commit de la fase. Luego **DETENTE** y responde en el chat solo con la ruta del reporte y el hash del commit. No avances sin aprobación.
   - Si la revisión pide correcciones:
     - aparecerán en `docs/handoff/fase-NN.review.md`;
     - corrígelas en un commit nuevo (`Fase N: corrige observaciones de revisión`);
     - agrega al final de tu `fase-NN.md` una sección `## Correcciones` que responda cada punto por su número.
   - No edites los archivos `.review.md`.

   **Plantilla de `docs/handoff/fase-NN.md`:**
   ```markdown
   # Fase N: <nombre>
   - Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
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
   Campos que quedaron como `TODO: confirmar`, con su ruta en el config.

   ## Traducciones a revisar
   Textos en inglés que tradujiste tú (ruta en el config). Si no hubo, escribe "Ninguna".

   ## Dudas / riesgos
   ```
3. No borres ni modifiques `osmanHerreraSite/` (Angular), `osmanHerreraSiteReact/`, `osmanHerreraSiteVector/` ni `shared/content/` hasta la fase 8. Solo se leen como referencia: las apps viejas siguen en producción durante la migración.
4. Mantén el estilo del repo: comentarios en español con encabezados `// ===...===`, TypeScript estricto y contenido centralizado en el config.
5. **Una sola fuente de datos, bilingüe.** Todo texto visible del sitio sale de `shared/config/` (ver fase 2), nunca escrito a mano en componentes. Cada texto existe en español e inglés.
6. **No inventes datos.** El diseño de Stitch trae contenido de relleno (lista abajo). Si falta un dato, pon `'TODO: confirmar'` en ambos idiomas y menciónalo en tu reporte. **Sí puedes traducir** al inglés los textos reales existentes, pero debes listarlos en "Traducciones a revisar".

7. **Ciclo automático con el revisor.** Después de cada commit de fase o de correcciones, ejecuta en la terminal:
   ```
   python C:\Users\05man\.claude\skills\delegar\orquestador.py --repo . --ide
   ```
   El script ejecuta la revisión de Claude y puede tardar hasta 25 minutos: **espera a que termine**, no lo canceles. Al final imprime un bloque `=== ORQUESTADOR ===` con una de dos líneas:
   - `SIGUIENTE: …` → sigue esa instrucción al pie de la letra en esta misma sesión (corregir o ejecutar la fase siguiente) y, al hacer commit, vuelve a ejecutar el script.
   - `DETENTE: …` → detente y muéstrale el mensaje al usuario.

   No ejecutes la fase 8 por tu cuenta. En las pruebas del formulario, simula la API: no envíes correos reales.

## Contexto
Hoy el sitio son 3 apps separadas, unidas solo por Nginx en producción:
- `osmanHerreraSite/`: Angular, servido en `/angular/`.
- `osmanHerreraSiteReact/`: React + Vite, servido en `/react/`. Es la versión principal.
- `osmanHerreraSiteVector/`: JavaScript sin framework + Vite + Tailwind 3, servido en `/vectorwork/`. Es la galería raster→vector con el sistema de diseño "Apex Dossier". Ya es bilingüe, con un toggle en el cliente.
- `osmanHerreraSiteBackend/`: API Express para el formulario de contacto. **No se toca.**
- `shared/content/`: `site.config.ts` y `site.types.ts`, el contenido en español que usan las apps viejas. Queda congelado hasta la fase 8.

**Objetivo:** un solo proyecto **Astro + TypeScript** (`osmanHerreraSiteAstro/`) que:
- sea **bilingüe** con rutas por idioma (tabla abajo);
- tome todos sus datos de **un config central** (`shared/config/site.config.ts`);
- use **React solo como isla** para el formulario de contacto;
- replique el diseño de Stitch.

| Página | Español (por defecto) | Inglés |
|---|---|---|
| Home | `/` | `/en/` |
| Privacidad | `/politicadeprivacidad` | `/en/privacy-policy` |
| Vector Work | `/vectorwork/` | `/en/vectorwork/` |

## Referencias de diseño (léelas completas antes de empezar)
- `docs/stitch_vector_portfolio_showcase_ui-main/code.html`: maqueta HTML con Tailwind. Es la referencia visual y de clases.
- `docs/stitch_vector_portfolio_showcase_ui-main/screen.png`: captura del resultado esperado.
- `docs/stitch_vector_portfolio_showcase_ui-main/DESIGN.md`: sistema de diseño Apex Dossier.
- `osmanHerreraSiteVector/tailwind.config.js`: **fuente de verdad de los tokens.** Si hay diferencias con la maqueta, gana este archivo. Por ejemplo, `borderRadius` es 0 aquí y no 0.25rem como en `code.html`.

### Contenido de relleno de Stitch que NO debe llegar al sitio
Estos datos se reemplazan por los reales o se dejan como `TODO: confirmar`:
- Stats del hero: "12+ años", "25+ proyectos" y "15 tecnologías". El 15 se calcula con `skills.technologies.length`; los otros dos son TODO.
- Tecnologías de francisherrera.com ("Next.js, React, TypeScript, TailwindCSS") y del módulo de reclutamiento. Son TODO.
- Texto extra de la bio ("Combino más de una década…"), "STATUS: DISPONIBLE PARA CONTRATACIÓN" y "ENFOQUE: …". Se usa la bio real; los textos nuevos van al config.
- IDs de credenciales (`CREDENTIAL #26-774`, etc.), "DETALLES +8", "BUILD_REF v2.6.4" y "ENCRYPT: TLS_v1.3". Se eliminan, o se dejan como decoración genérica sin números falsos.
- Enlaces sociales falsos (`wa.me/50400000000`, `linkedin.com`, `github.com`). Se usan los `socialIcons` reales.
- Imágenes con `data-alt` generadas por Stitch. Se usa la `profile.image` real; las capturas de proyectos serán placeholders en `public/images/projects/` hasta que yo las provea.
- Campo "Asunto / Tipo de proyecto" del formulario. **Se elimina**, porque el backend solo acepta `nombre`, `correoElectronico` y `content`.
- El script inline de `code.html` (filtros y envío simulado) **no se copia**: el filtro se reescribe y el envío es real.

---

## Fase 1: proyecto Astro y preset compartido (COMPLETADA, commit 7254702)
Ya está aprobada. Aplica las correcciones de `docs/handoff/fase-01.review.md` antes de empezar la fase 2.

## Fase 2: config central bilingüe y rutas por idioma
**Objetivo:** un único lugar donde editar los datos del sitio en los dos idiomas. TypeScript debe impedir compilar si falta una traducción.

1. Crea `shared/config/`:
   - `i18n.ts` con:
     - `export const LANGS = ['es', 'en'] as const`, `type Lang` y `DEFAULT_LANG = 'es'`;
     - `type Localized<T = string> = Record<Lang, T>`;
     - un helper `t<T>(value: Localized<T>, lang: Lang): T`;
     - `localizedPath(route: RouteKey, lang: Lang): string`, que usa la tabla de rutas del config.
   - `site.types.ts`: tipos del contenido, a partir de `shared/content/site.types.ts`. Todo texto visible es `Localized<string>` o `Localized<RichText>`; lo que no depende del idioma (URLs, iconos, imágenes, años, nombres de tecnologías) no se duplica. Elimina `FrameworkSwitch`.
   - `site.config.ts`: **el único archivo de datos del sitio.** Migra todo `shared/content/site.config.ts` a la forma bilingüe. Español = el texto actual; inglés = tu traducción, que va en "Traducciones a revisar". Agrega:
     - `routes: Record<RouteKey, Localized<string>>`, con `home`, `privacy` y `vectorwork`, según la tabla de arriba;
     - `ui`: textos de interfaz que hoy estarían escritos a mano (toggle de idioma, etiquetas de filtros, "Ver certificado", aria-labels, `DISPONIBLE PARA TRABAJO REMOTO`, ubicación, etc.);
     - `seo`: título, descripción y `ogLocale` por idioma;
     - `projects`, `hero.kicker`, `hero.location`, `hero.stats`, `profile.status` y `profile.focus`, como se detalla en la fase 4. En esta fase se definen con sus tipos y valores (TODO donde falte).
   - `index.ts`, que reexporta todo. El alias pasa a ser `@config` → `../shared/config`, en `tsconfig.json` y `astro.config.mjs`.
   - Deja un bloque de comentario al inicio de `site.config.ts` que explique cómo editar un texto, cómo agregar un proyecto y cómo agregar un idioma.
2. Configura el i18n de Astro en `astro.config.mjs`: `i18n: { locales: ['es','en'], defaultLocale: 'es', routing: { prefixDefaultLocale: false } }`.
3. **Páginas sin duplicar lógica:**
   - Cada vista vive en un componente (`src/views/HomeView.astro`, `PrivacyView.astro`) que recibe `lang`.
   - Las páginas son envoltorios de 3 líneas: `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/politicadeprivacidad.astro` y `src/pages/en/privacy-policy.astro`.
   - En esta fase, las vistas pueden ser mínimas: título y un texto del config, para probar las rutas.
4. **SEO bilingüe** (se usará en el layout de la fase 3; déjalo como helper en `src/lib/seo.ts`):
   - `<html lang>`;
   - `<link rel="alternate" hreflang="es|en|x-default">` con URLs absolutas a partir de `site`;
   - `og:locale` y `og:locale:alternate`.
5. **Sin redirección automática por idioma del navegador**, para que los buscadores indexen ambas versiones. El cambio de idioma es siempre un enlace a la página equivalente, que conserva el `#hash` mediante un script mínimo.
6. **Verifica:**
   - `astro check` y `build` sin errores.
   - `dist/` contiene `index.html`, `en/index.html`, `politicadeprivacidad/index.html` y `en/privacy-policy/index.html`.
   - Si borras la clave `en` de cualquier texto del config, `astro check` falla. Pruébalo y restáuralo; pega el error en el reporte.

## Fase 3: layout y componentes UI
Todos los componentes reciben `lang: Lang` (o lo leen de `Astro.currentLocale`) y toman sus textos del config con `t()`. **Ningún texto visible escrito a mano.**
- `src/styles/global.css`:
  - `@tailwind base/components/utilities`;
  - base de `html` y `body` como en `osmanHerreraSiteVector/src/style.css`;
  - `prefers-reduced-motion`.
  - `.chamfer` vive solo en el preset.
- `src/layouts/BaseLayout.astro`:
  - `<head>` con título y description del config según `lang`, más el helper SEO de la fase 2;
  - Google Fonts (Space Grotesk, Inter, JetBrains Mono) y Material Symbols Outlined, **limitados con `icon_names=`** a los iconos usados;
  - favicon `oherrera.ico`;
  - header y footer;
  - `<slot />`.
- `src/components/layout/Header.astro`, con marca, badge de disponibilidad, nav, ubicación, botón "VECTOR WORK" y **toggle ES/EN**, según `code.html`:
  - Los items del nav salen del config.
  - Los enlaces a secciones son `localizedPath('home', lang) + '#id'`, para que funcionen desde otras páginas.
  - El toggle enlaza a la misma página en el otro idioma; la página actual pasa su `RouteKey` al layout.
  - En móvil hay un menú desplegable (la maqueta no lo trae: impleméntalo en el mismo estilo, sin librerías).
  - **Se elimina la franja "Este sitio está hecho en React…".**
- `src/components/layout/Footer.astro`, con copyright, crédito y enlace a la política de privacidad en el idioma actual.
- `src/components/ui/`: `SectionHeader.astro` (kicker `// …`, título `NN // TÍTULO` y subtítulo), `Card.astro` (con variante chamfer y props para marcas de esquina), `CornerMarks.astro`, `Chip.astro` (variantes common, tactical y gold de DESIGN.md), `Button.astro` (primary y ghost; renderiza `<a>` o `<button>`) y `StatTile.astro`.
- Toda clase repetida se encapsula en estos componentes. Las secciones no deben repetir cadenas largas de clases.

## Fase 4: secciones del home
En `src/components/sections/`, un `.astro` por sección, con IDs `hero`, `technologies`, `projects`, `formation`, `experience` y `contact`. Los IDs no se traducen, para que los `#hash` funcionen igual en ambos idiomas. Agrega "Proyectos / Projects" al nav del config.
- **Datos nuevos en `shared/config/site.config.ts`** (definidos en la fase 2, aquí se usan):
  - `hero.kicker`, `hero.location` y `hero.stats: { value: string; label: Localized }[]`.
  - `profile.status` y `profile.focus`.
  - `projects: { title, subtitle, kicker, filters: {id, label: Localized}[], items: Project[] }`, con `Project = { id: string; category: 'web'|'modulos'|'diseno'; badge?: Localized; title: Localized; description: Localized; image: string; technologies: string[]; links: {label: Localized; url: string; icon: string}[]; featured?: boolean }`.
- **Los 4 proyectos:**
  1. **Fundación Prolancho — Sitio web** (`web`). Usa la descripción y tecnologías de la experiencia en Prolancho. Enlaces: `https://www.fundacionprolancho.org` y el repo.
  2. **Fundación Prolancho — Módulo de Reclutamiento** (`modulos`). Descripción y tecnologías `TODO: confirmar`; URL `https://www.fundacionprolancho.org` (ruta exacta TODO).
  3. **francisherrera.com** (`web`). Descripción y tecnologías `TODO: confirmar`; URL `https://francisherrera.com`.
  4. **Vector Work** (`diseno`). Enlace interno `localizedPath('vectorwork', lang)`.
- **Iconos de habilidades:** reutiliza los SVG existentes. Copia `osmanHerreraSiteReact/public/assets/` → `osmanHerreraSiteAstro/public/assets/` y usa la técnica `icon-mask` de `osmanHerreraSiteReact/src/App.css` para teñirlos de cian. Solo usa Material Symbols donde la maqueta los usa en la UI.
- **Filtro de proyectos:**
  - Un `<script>` de Astro (TS) que alterna `hidden` en `[data-category]` y marca con `aria-pressed` el botón activo.
  - Los contadores de cada filtro se calculan en el build.
- `src/components/RichText.astro`: equivalente de `osmanHerreraSiteReact/src/components/RichText.tsx`, para los campos `RichText`. Los `highlight` se muestran en `text-primary-container`.
- `PrivacyView.astro`: porta `osmanHerreraSiteReact/src/pages/PrivacyPolicy.tsx` con `privacyPolicy` del config (bilingüe), en el estilo nuevo. Las fechas se formatean con `Intl.DateTimeFormat(lang)`.

## Fase 5: isla del formulario de contacto
- `src/components/islands/ContactForm.tsx`, usado con `client:visible`.
- **Recibe por props solo los textos ya resueltos al idioma** (labels, placeholders, errores, alertas, botón). No importa el config completo, para no inflar el bundle del cliente.
- Porta la lógica de `osmanHerreraSiteReact/src/components/footer.tsx`, `src/hooks/useContactForm.ts` y `src/api/emailApi.ts`:
  - `react-hook-form`;
  - validaciones y mensajes del config;
  - `POST ${API}/email` con `{ nombre, correoElectronico, content }`.
- Variable de entorno `PUBLIC_EMAIL_API_URL`. `.env` apunta a `http://localhost:3000/api` y `.env.production` a `/api`.
- **Reemplaza `alert()` por un mensaje en línea** (éxito en cian, error en `error`), con `aria-live="polite"`.
- Estilo de inputs y botón según `code.html` (sin el campo Asunto).
- **Verifica** el envío en ambos idiomas contra el backend local (`npm run dev:backend`).

## Fase 6: migrar Vector Work a `/vectorwork/` y `/en/vectorwork/`
- Mueve `osmanHerreraSiteVector/src/content/vector.config.js` a `shared/config/vector.config.ts` (tipado, con el mismo patrón `Localized` de `i18n.ts`) y reexpórtalo desde `@config`. Sus textos ya están en `{ es, en }`.
- Copia `osmanHerreraSiteVector/src/{components,titles.js,assets-url.js,escape.js}` → `osmanHerreraSiteAstro/src/lib/vector/`.
- **i18n de Vector Work:** reemplaza `i18n.js` por el helper `t()` de `@config`.
  - El idioma se lee de `document.documentElement.lang`. Se eliminan `localStorage` (`vw-lang`) y la detección por navegador.
  - Compatibilidad: si llega `?lang=en` a `/vectorwork/`, redirige a `/en/vectorwork/` conservando el `#hash`; `?lang=es` en `/en/vectorwork/` redirige a `/vectorwork/`.
- Copia `public/works/` y `public/data/` → `osmanHerreraSiteAstro/public/vectorwork/works/` y `…/vectorwork/data/`. **Son compartidos por ambos idiomas**: `/en/vectorwork/` también usa `/vectorwork/works/…`.
- Ajusta `assetUrl()` y `loadTitles()` para que la base local sea `/vectorwork/` sin importar el idioma. Se respeta `VITE_ASSETS_BASE_URL`, que pasa a llamarse `PUBLIC_ASSETS_BASE_URL`. Actualiza `.env.production`.
- `VectorView.astro` recibe `lang` y usa `BaseLayout` con el título y la description de `vectorConfig` en ese idioma. Las páginas son `src/pages/vectorwork/index.astro` y `src/pages/en/vectorwork/index.astro`.
  - La vista tiene un `<div id="vector-app">` y un `<script>` que importa el `main` migrado.
- En el `main` migrado:
  - quita `renderHeader` y `renderFooter`, porque el layout ya los pone con el toggle global;
  - elimina el botón `lang-toggle-btn` propio;
  - el re-render solo reemplaza el contenido de `#vector-app`.
- `robots.txt` va a `osmanHerreraSiteAstro/public/robots.txt` con `Disallow: /vectorwork/data/`.
- Mantén el recorte de `works/` y `data/` en el build de producción (plugin `cleanProductionDistPlugin` de `osmanHerreraSiteVector/vite.config.js`), ahora sobre `dist/vectorwork/works` y `dist/vectorwork/data`.
- Mueve `osmanHerreraSiteVector/scripts/*` a `osmanHerreraSiteAstro/scripts/vector/`, ajusta sus rutas (`public/vectorwork/works` y el nuevo `vector.config.ts`) y los scripts npm `assets` y `assets:test`. Adapta `verify-ui.mjs` para probar `/vectorwork/` y `/en/vectorwork/`.
- **Verifica:**
  - en ambos idiomas funcionan el comparador, color/outline, filtros y anterior/siguiente con el teclado;
  - las imágenes y los títulos cargan en dev;
  - `?lang=en` redirige;
  - `npm run assets:test` pasa.

## Fase 7: build y despliegue
- En el `package.json` raíz:
  - `dev` y `build` apuntan a Astro;
  - `build:all` = `build:astro && build:backend`.
- Escribe `docs/nginx-astro.md` con el bloque de Nginx propuesto:
  - `root` → `dist` de Astro en `/`, con `try_files $uri $uri/ $uri.html =404`;
  - `location = /vectorwork` → 301 a `/vectorwork/`, y lo mismo para `/en` → `/en/` y `/en/vectorwork` → `/en/vectorwork/`;
  - alias de `/vectorwork/data/` y `/vectorwork/works/` hacia `/var/www/vectorwork-assets/`, como en la sección 8 de `osmanHerreraSiteVector/README.md`;
  - `location /api/` hacia el backend, sin cambios;
  - 301 de `/react/` y `/angular/` (y sus subrutas) → `/`; y de `/react/politicadeprivacidad` → `/politicadeprivacidad`;
  - `error_page 404` hacia una página 404 bilingüe (`src/pages/404.astro`, con textos del config).
- **No toques el servidor.** Solo la documentación.

## Fase 8: limpieza (aprobada por el usuario)
**Rama:** crea `chore/fase-8-limpieza` desde `main` actualizado (`git checkout main && git pull && git checkout -b chore/fase-8-limpieza`). El sitio nuevo **todavía no está desplegado**: no toques `main` directamente. **En esta fase no ejecutes el orquestador (regla 7).** Al terminar, detente y el usuario pedirá la revisión.

**0. Preservar archivos locales fuera de git (ANTES de borrar nada). Es obligatorio:**
- `osmanHerreraSiteVector/source/` (~37 MB) contiene los originales PNG y SVG de Illustrator de cada pieza. **Están ignorados por git y no existen en ningún otro lugar.** Si se borran, se pierden para siempre.
  1. **Muévelos** (no los copies ni los borres) a `osmanHerreraSiteAstro/scripts/vector/source/`.
  2. Verifica que la cantidad de archivos y el tamaño coinciden antes y después.
  3. Agrega `osmanHerreraSiteAstro/scripts/vector/source/*` al `.gitignore`.
  4. Actualiza `sourceDir` en `osmanHerreraSiteAstro/scripts/vector/build-assets.mjs:25`.
  5. Comprueba que `npm run assets -- --dry-run`, o el modo de validación que exista, encuentra las 8 piezas.
- `osmanHerreraSiteVector/public/works/` y `public/data/titles.json` ya están copiados en `osmanHerreraSiteAstro/public/vectorwork/` y son idénticos (verificado). Confírmalo con `diff -rq` antes de borrar.
- Lista en el reporte cualquier otro archivo ignorado de las carpetas a borrar (`git ls-files --others --ignored --exclude-standard <carpeta>`, sin contar `node_modules` ni `dist`) y qué hiciste con él. Los `.env` de React solo tienen la URL de la API y se pueden descartar.

**1. Borrar:**
- `osmanHerreraSite/`, `osmanHerreraSiteReact/`, `osmanHerreraSiteVector/` y `shared/content/`. Usa `git rm -r` para lo versionado y luego elimina las carpetas vacías.
- `ANGULAR_DESIGN_REPLICA.md` y `osmanHerreraSite.code-workspace`, si solo sirven a las apps viejas.
- En `shared/config/vector.config.ts`: `ui.availability` y cualquier otra clave que solo usaba el header viejo de Vector Work. Busca las claves que ya no se referencian desde `src/`.

**2. Actualizar referencias:**
- `package.json` raíz:
  - quita esas carpetas de `workspaces`;
  - quita los scripts `dev:angular`, `dev:react`, `dev:vector`, `start:*` y `build:angular/react/vector`;
  - deja `dev`, `build`, `dev:backend`, `build:backend`, `start:backend`, `build:all` y `assets:test`;
  - ejecuta `npm install` para regenerar `package-lock.json`.
- `.gitignore`: quita las entradas de las apps borradas.
- `osmanHerreraSiteAstro/scripts/vector/verify-all-ui.mjs:76-77`: quita la verificación de los `dist` de React y Angular.
- Comentarios que citan archivos borrados (`src/components/ui/RichText.astro:5`, `src/views/PrivacyView.astro:5`, `shared/tailwind.preset.js:5`, `shared/config/*`). Déjalos como referencia histórica en pasado ("Portado de …") o elimínalos.
- `osmanHerreraSiteBackend`:
  - `src/public/` es un build viejo de Angular servido con `express.static` (`src/app.ts:55`);
  - `package.json:7-8` apunta a rutas locales de la app vieja.

  Si `docs/nginx-astro.md` solo envía `/api/` al backend, elimina `src/public/`, la línea de `express.static` y esas dos entradas de `package.json`. Quita del CORS los orígenes `localhost:5173` y `localhost:4200`. **No cambies nada más del backend.** Verifica con `npm run build:backend`.
- `docs/handoff/orquestador.json`: cambia `protegidas` a `[]`, porque las rutas ya no existen.

**3. Documentación:** crea `osmanHerreraSiteAstro/README.md` con:
- estructura y comandos;
- **cómo editar textos y traducciones en `shared/config/site.config.ts`**;
- cómo agregar un proyecto al portafolio (incluidas las capturas: 1440×900 → WebP 1200×750 en `public/assets/images/projects/`);
- cómo agregar una pieza vectorial (fusiona la guía del README de Vector Work, con la nueva ruta de `source/`);
- por qué existe la dependencia `cookie`.

Actualiza también las referencias a `/vectorwork/` en `docs/nginx-astro.md` si alguna apuntaba al README viejo.

**4. Verificación:**
- `npm install`, `npm run build:all`, `npx astro check` (0 errors), `npm run assets:test` y `npm run dev`: comprobar las 6 rutas y la 404.
- `git grep -nE "osmanHerreraSite(React|Vector)?/|shared/content"`: solo pueden quedar menciones en `docs/handoff/` y `docs/gemini-prompt-astro.md`.
- Deja `docs/handoff/` tal cual: es el registro de la migración.

## Criterios de aceptación globales
- `npx astro check` sin errores y `npm run build` sin warnings nuevos.
- Un solo `npm run dev` sirve las 6 rutas de la tabla y todos los enlaces del nav y del toggle funcionan en local, en ambos idiomas.
- **Todo texto visible sale de `shared/config/`.** Una búsqueda de texto en español o inglés escrito a mano en `src/components`, `src/views` y `src/layouts` no debe encontrar nada; solo se permiten los separadores decorativos `//`.
- Falta una traducción → el build falla (lo garantiza el tipo `Localized`).
- La apariencia coincide con `screen.png` en desktop (1440px) y funciona en móvil (375px) sin scroll horizontal, en ambos idiomas; los textos en inglés más largos no rompen el layout.
- No hay contenido de relleno de Stitch.
- Lighthouse: accesibilidad ≥ 95. El HTML del home no carga JavaScript salvo la isla del formulario, el script del filtro y el del toggle.
