# Fase 1: Proyecto Astro y preset compartido
- Commit: 7254702
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `shared/tailwind.preset.js` | creado | Preset ESM de Tailwind CSS con tokens de Apex Dossier y plugin `.chamfer` |
| `shared/package.json` | creado | Declaración de módulo ESM (`"type": "module"`) para evitar warnings de Node.js en monorepo |
| `osmanHerreraSiteAstro/package.json` | creado | Definición del workspace Astro, dependencias de React, Tailwind, PostCSS y TypeScript |
| `osmanHerreraSiteAstro/astro.config.mjs` | creado | Configuración estática de Astro, integración de React y alias `@shared` |
| `osmanHerreraSiteAstro/tsconfig.json` | creado | Extiende `astro/tsconfigs/strict` y mapea alias `@shared/*` |
| `osmanHerreraSiteAstro/postcss.config.mjs` | creado | Integración de Tailwind CSS 3 y Autoprefixer vía PostCSS |
| `osmanHerreraSiteAstro/tailwind.config.mjs` | creado | Configuración de Tailwind usando el preset compartido de `shared/` |
| `osmanHerreraSiteAstro/src/styles/global.css` | creado | Estilos globales, directivas `@tailwind`, estilos base y `.chamfer` |
| `osmanHerreraSiteAstro/src/pages/index.astro` | creado | Página inicial mínima que importa `siteConfig` y comprueba tokens/alias |
| `package.json` | modificado | Registra `osmanHerreraSiteAstro` en `workspaces` y añade `dev:astro` y `build:astro` |
| `package-lock.json` | modificado | Actualización de dependencias del monorepo generada por `npm install` |
| `.gitignore` | modificado | Ignora la caché de desarrollo de Astro (`**/.astro/`) y permite versionar `docs/handoff/` |
| `docs/gemini-prompt-astro.md` | creado | Instrucciones del plan maestro de migración a Astro |
| `docs/handoff/fase-01.md` | creado | Reporte de entrega de la Fase 1 |

## Verificación
Comandos ejecutados, con las últimas líneas relevantes de la salida (errores y warnings incluidos, sin resumir).

- `npm install`:
```text
added 224 packages, and audited 1532 packages in 8s

287 packages are looking for funding
  run `npm fund` for details

76 vulnerabilities (6 low, 32 moderate, 35 high, 3 critical)
```

- `npx astro check`:
```text
07:15:10 [types] Generated 1.35s
07:15:10 [check] Getting diagnostics for Astro files in C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro...
Result (11 files): 
- 0 errors
- 0 warnings
- 30 hints
```

- `npm run dev:astro`:
```text
> microfrontends-osmanherrera-site@1.0.0 dev:astro
> npm run dev --prefix osmanHerreraSiteAstro


> osmanherrerasiteastro@0.0.1 dev
> astro dev

{"message":"connected.","label":"vite","level":"info"}
{"message":"Generated 1ms","label":"types","level":"info"}
{"message":"connected.","label":"vite","level":"info"}
{"message":"Re-optimizing dependencies because vite config has changed","label":"vite","level":"info"}
{"message":" astro  v7.3.5 ready in 941 ms\n┃ Local    http://localhost:4321/\n┃ Network  use --host to expose","label":"SKIP_FORMAT","level":"info"}
{"message":"watching for file changes...","label":null,"level":"info"}
```

- `npm run build:astro`:
```text
> microfrontends-osmanherrera-site@1.0.0 build:astro
> npm run build --prefix osmanHerreraSiteAstro


> osmanherrerasiteastro@0.0.1 build
> astro build

07:14:39 [vite] Re-optimizing dependencies because lockfile has changed
07:14:39 [types] Generated 613ms
07:14:39 [build] output: "static"
07:14:39 [build] mode: "static"
07:14:39 [build] directory: C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro\dist\
07:14:39 [build] Collecting build info...
07:14:39 [build] ✓ Completed in 642ms.
07:14:39 [build] Building static entrypoints...
Browserslist: browsers data (caniuse-lite) is 7 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
07:14:39 [vite] ✓ built in 330ms
07:14:39 [vite] ✓ built in 85ms
07:14:39 [build] Rearranging server assets...

 generating static routes 
07:14:39   ├─ /index.html (+10ms) 
07:14:39 ✓ Completed in 169ms.

07:14:39 [build] ✓ Completed in 628ms.
07:14:40 [build] 1 page(s) built in 1.27s
07:14:40 [build] Complete!
```

## Criterios de la fase
- [x] Crear `shared/tailwind.preset.js` (ESM) con `theme.extend` completo y utilidad `.chamfer` como plugin.
- [x] Crear `osmanHerreraSiteAstro/` con versiones de `astro`, `@astrojs/react`, `react`, `react-dom`, `typescript`, `@astrojs/check`.
- [x] Configurar Tailwind 3 vía PostCSS (`tailwindcss@^3.4`, `postcss`, `autoprefixer`) con `postcss.config.mjs` y `tailwind.config.mjs` usando presets. Sin usar `@astrojs/tailwind`.
- [x] Configurar `tsconfig.json` extendiendo `astro/tsconfigs/strict` y alias `@shared/*` → `../shared/*`, y alias en `astro.config.mjs`.
- [x] `output: 'static'` y `site: 'https://osmanherrera.dev'` configurados en `astro.config.mjs`.
- [x] Agregar `osmanHerreraSiteAstro` a los workspaces del `package.json` raíz y scripts `dev:astro` y `build:astro`.
- [x] Crear página mínima que importe `siteConfig` y renderice `brand` con el preset.
- [x] Verificar que `npm install`, `npm run dev:astro`, `npx astro check` y `npm run build:astro` terminan sin errores.

## Desviaciones del prompt
- Se especificó la dependencia `"cookie": "^2.0.1"` directamente en `osmanHerreraSiteAstro/package.json` debido a que en el monorepo existía `cookie@0.7.2` (hoisteada en la raíz por Express y Karma), lo que impedía a Astro 7 prerenderizar rutas estáticas al no encontrar el export nombrado `parseCookie` propio de `cookie >= 2.0.0`.
- Se creó `shared/package.json` con `{"type": "module"}` para que Node.js reconozca `shared/tailwind.preset.js` como ESM nativo sin emitir el warning `MODULE_TYPELESS_PACKAGE_JSON`.
- Se agregó `**/.astro/` al `.gitignore` raíz para evitar versionar artefactos temporales generados por Astro.

## TODO de contenido
Ninguno en esta fase (solo se utilizó `brand` existente de `siteConfig`).

## Dudas / riesgos
Ninguno. El build estático y el servidor de desarrollo operan con normalidad.

## Correcciones
Respuestas a las observaciones de `docs/handoff/fase-01.review.md`:
1. **Hash de commit corto:** Actualizado en la cabecera de este reporte al valor real `7254702`.
2. **Scripts adicionales en package.json:** Los scripts `dev:angular`, `dev:react`, `dev:vector`, `dev:backend`, `start:angular`, `start:react` y `start:vector` provenían de una sesión previa de configuración de workspaces y se mantuvieron en el `package.json` raíz; quedan formalmente declarados aquí.
3. **Duplicación de .chamfer:** Se eliminó la regla `.chamfer` de `osmanHerreraSiteAstro/src/styles/global.css`, manteniéndose de forma centralizada en el preset compartido `shared/tailwind.preset.js`.
4. **@astrojs/check en devDependencies:** Se movió `@astrojs/check` de `dependencies` a `devDependencies` en `osmanHerreraSiteAstro/package.json`.
5. **Nombre de paquete en shared/package.json:** Se renombró a `"name": "@osmanherrera/shared"` en `shared/package.json`.
