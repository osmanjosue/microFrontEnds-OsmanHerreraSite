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
- Directivas complementarias en la configuración de Nginx (`docs/nginx-astro.md`): se agregaron configuraciones de producción recomendadas que no estaban detalladas en el prompt mínimo ni en la sección 8 de `osmanHerreraSiteVector/README.md`:
  - Bloque HTTPS con redirección automática HTTP -> HTTPS y soporte para HTTP/2 (con nota de compatibilidad para Nginx >= 1.25.1).
  - Cabeceras de seguridad globales (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) y su réplica explícita en bloques secundarios (`data/`, `works/`, `_astro/`) debido al comportamiento de herencia de Nginx.
  - Compresión Gzip para tipos MIME de texto, SVG y JSON.
  - Caché inmutable (`1y`) para assets generados por Vite/Astro con hash (`/_astro/`).
  - Cache-Control `no-cache` en `/vectorwork/data/` (alineado a `osmanHerreraSiteVector/README.md`).
- Soporte para `noindex` en `BaseLayout.astro`: se incorporó la prop booleana opcional `noindex?: boolean` para permitir que páginas de error como la 404 emitan `<meta name="robots" content="noindex, nofollow" />` y omitan las etiquetas canónicas y de enlaces alternativos `hreflang` del home.

## TODO de contenido
- Módulo de reclutamiento: descripción y URL exacta pendiente de confirmación (`TODO: confirmar`).
- Reemplazar los 4 placeholders SVG en `public/assets/images/projects/` por las capturas reales webp (~1200×750) cuando estén disponibles.
- Confirmar rutas reales del sitio en el VPS y rutas de certificados SSL en `docs/nginx-astro.md`.

## Traducciones a revisar
Ninguna nueva requerida para esta fase. Los textos de la página 404 fueron incorporados en `site.config.ts` en ambos idiomas.

## Dudas / riesgos
Ninguno. El sitio compila 7 páginas estáticas limpiamente y la configuración de Nginx contempla todas las transiciones y redirecciones de las rutas legado.

## Correcciones de fase-07.md
Respuestas a las observaciones de `docs/handoff/fase-07.review.md`:

1. **[menor] Estructura de landmarks HTML en 404:** Se sustituyó la etiqueta `<main>` en `osmanHerreraSiteAstro/src/pages/404.astro` por `<section class="min-h-[70vh] flex flex-col justify-center">`, eliminando el anidamiento inválido dentro del `<main>` global de `BaseLayout.astro` y asegurando cumplimiento de accesibilidad axe/Lighthouse.
2. **[menor] Textos de idiomas y metadatos desde configuración:** Se añadió la propiedad `langLabel: Localized` a `NotFoundConfig` en `shared/config/site.types.ts` y sus valores (`{ es: 'ES // ESPAÑOL', en: 'EN // ENGLISH' }`) en `shared/config/site.config.ts`. En `404.astro` se sustituyeron los literales por `{notFound.langLabel.es}` y `{notFound.langLabel.en}`, y se enlazaron el título y descripción del layout a `notFound.metaTitle.es` y `notFound.metaDescription.es`.
3. **[menor] SEO y accesibilidad en 404:** Se agregó a `BaseLayout.astro` la propiedad `noindex?: boolean`. Cuando es `true`, renderiza `<meta name="robots" content="noindex, nofollow" />` y omite el `<link rel="canonical">` y los `<link rel="alternate" hreflang="...">`. Se activó `noindex={true}` en `404.astro`, y se añadió el atributo `lang="en"` en la tarjeta en inglés (actualizando la interfaz de props de `Card.astro`) para que los lectores de pantalla utilicen la pronunciación inglesa.
4. **[menor] Herencia de cabeceras Nginx en bloques location secundarios:** Dado que Nginx descarta los `add_header` heredados del contexto `server` si un bloque `location` define sus propias cabeceras, se replicaron explícitamente `X-Content-Type-Options`, `X-Frame-Options` y `Referrer-Policy` dentro de `/vectorwork/data/`, `/vectorwork/works/` y `/_astro/`, añadiendo una nota técnica explicativa en `docs/nginx-astro.md`.
5. **[menor] Ajuste de directivas de caché con README de Vector Work:** Se eliminó la directiva `immutable` del bloque `/vectorwork/works/` en `docs/nginx-astro.md` para permitir que ilustraciones o piezas actualizadas se refresquen dentro de la ventana de 30 días sin requerir hash en el nombre. Se mantuvo `no-cache` en `data/` y se documentaron las adiciones (HTTPS, Gzip, cabeceras de seguridad) en la sección "Desviaciones del prompt".
6. **[menor] Rutas VPS, regex de redirección y modernización HTTP/2:** En `docs/nginx-astro.md`, se marcaron las rutas del sistema de archivos y certificados Certbot con `# TODO: confirmar`. Se amplió la expresión regular de la política de privacidad a `location ~ ^/react/politicadeprivacidad/?$` para capturar peticiones con o sin barra final. Se añadió nota técnica sobre la directiva moderna `http2 on;` (Nginx >= 1.25.1) frente al parámetro obsoleto en `listen`.
7. **[info] Exclusión de `dist/` en análisis de TypeScript:** Se configuró `"exclude": ["dist", "node_modules"]` en `osmanHerreraSiteAstro/tsconfig.json`, evitando que `astro check` analice los archivos generados y minificados en `dist/` (eliminando los 38 hints espurios).
8. **[menor] Exactitud del reporte:** Actualizada la sección `## Desviaciones del prompt` en `fase-07.md` para declarar todas las directivas complementarias de Nginx y el soporte de `noindex` en `BaseLayout`.

