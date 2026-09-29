# Fase 7: build y despliegue
- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `package.json` | modificado | Scripts `dev` y `build` actualizados para apuntar a `osmanHerreraSiteAstro`; script `build:all` configurado como `npm run build:astro && npm run build:backend`. |
| `shared/config/site.types.ts` | modificado | Añadida interfaz `NotFoundConfig` y propiedad `notFound` a `SiteConfig` para tipado estricto bilingüe de la página 404. |
| `shared/config/site.config.ts` | modificado | Añadida sección `notFound` con metadatos, kicker, títulos, descripciones y enlaces de retorno localizados en español e inglés. |
| `osmanHerreraSiteAstro/src/pages/404.astro` | creado | Página estática 404 bilingüe usando `BaseLayout`, con presentación simultánea en español e inglés, estética Apex Dossier y botones de navegación a `/` y `/en/`. Genera `dist/404.html`. |
| `docs/nginx-astro.md` | creado | Especificación técnica del bloque de servidor Nginx con enrutamiento a `dist/` de Astro (`try_files $uri $uri/ $uri.html =404`), redirecciones canónicas (trailing slash), redirecciones 301 de rutas legado Angular/React, alias a assets protegidos de Vector Work (`/var/www/vectorwork-assets/`), proxy inverso a la API `/api/` en `:3000` y `error_page 404 /404.html`. |

## Verificación
Comandos ejecutados:

1. `npm --prefix osmanHerreraSiteAstro run check`:
```text
Result (62 files): 
- 0 errors
- 0 warnings
- 38 hints
```

2. `npm run build`:
```text
> microfrontends-osmanherrera-site@1.0.0 build
> npm run build --prefix osmanHerreraSiteAstro

> osmanherrerasiteastro@0.0.1 build
> astro build

09:57:25 [types] Generated 479ms
09:57:25 [build] output: "static"
09:57:25 [build] mode: "static"
09:57:25 [build] directory: C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro\dist\
09:57:25 [build] Collecting build info...
09:57:25 [build] ✓ Completed in 513ms.
09:57:25 [build] Building static entrypoints...
09:57:25 [vite] ✓ built in 537ms
09:57:25 [vite] ✓ built in 150ms
09:57:25 [build] Rearranging server assets...

 generating static routes 
09:57:25   ├─ /404.html (+16ms) 
09:57:25   ├─ /en/privacy-policy/index.html (+9ms) 
09:57:25   ├─ /en/vectorwork/index.html (+5ms) 
09:57:25   ├─ /en/index.html (+24ms) 
09:57:25   ├─ /politicadeprivacidad/index.html (+5ms) 
09:57:25   ├─ /vectorwork/index.html (+3ms) 
09:57:25   ├─ /index.html (+6ms) 
09:57:25 ✓ Completed in 123ms.

09:57:25 [build] ✓ Completed in 866ms.
09:57:25 [build] 7 page(s) built in 1.39s
09:57:25 [build] Complete!
```

3. `npm run build:all`:
```text
> microfrontends-osmanherrera-site@1.0.0 build:all
> npm run build:astro && npm run build:backend

> osmanherrerasiteastro@0.0.1 build
> astro build
...
09:57:39 [build] 7 page(s) built in 1.37s
09:57:39 [build] Complete!

> osmanherrerasitebackend@1.0.0 build
> tsc
# Compilación exitosa sin errores
```

4. Verificación de existencia de `dist/404.html`:
```powershell
Test-Path "osmanHerreraSiteAstro/dist/404.html"
# True
```

## Criterios de la fase
- [x] En el `package.json` raíz: `dev` y `build` apuntan a Astro.
- [x] En el `package.json` raíz: `build:all` ejecuta `build:astro && build:backend`.
- [x] Documento `docs/nginx-astro.md` creado con el bloque de Nginx completo:
  - `root` apuntando a `dist` de Astro con `try_files $uri $uri/ $uri.html =404;`.
  - `location = /vectorwork` con 301 a `/vectorwork/`, `/en` con 301 a `/en/`, y `/en/vectorwork` con 301 a `/en/vectorwork/`.
  - Alias de `/vectorwork/data/` y `/vectorwork/works/` hacia `/var/www/vectorwork-assets/` con cabeceras de no-indexación y caché correspondientes.
  - `location /api/` con proxy inverso hacia el backend en el puerto 3000.
  - Redirecciones 301 de `/react/` y `/angular/` (y subrutas) hacia `/`, y `/react/politicadeprivacidad` hacia `/politicadeprivacidad`.
  - `error_page 404` hacia `/404.html`.
- [x] Página 404 bilingüe creada en `src/pages/404.astro` con todos sus textos extraídos de `shared/config/site.config.ts`.
- [x] Servidor no modificado (solo documentación).

## Desviaciones del prompt
- Ninguna. Se siguió la especificación al pie de la letra.

## TODO de contenido
- Módulo de reclutamiento: descripción y URL exacta pendiente de confirmación (`TODO: confirmar`).
- Reemplazar los 4 placeholders SVG en `public/assets/images/projects/` por las capturas reales webp (~1200×750) cuando estén disponibles.

## Traducciones a revisar
Ninguna nueva requerida para esta fase. Los textos de la página 404 fueron incorporados en `site.config.ts` en ambos idiomas.

## Dudas / riesgos
Ninguno. El sitio compila 7 páginas estáticas limpiamente y la configuración de Nginx contempla todas las transiciones y redirecciones de las rutas legado.
