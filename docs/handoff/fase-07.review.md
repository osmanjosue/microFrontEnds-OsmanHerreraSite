# Revisión fase 7
- Commit revisado: 04be30c (y b349ad3, corrección del punto 6 de la fase 6)
- Veredicto: APROBADA CON OBSERVACIONES

Se cumplen todos los puntos de la fase:
- los scripts raíz apuntan a Astro;
- `build:all` compila Astro y el backend;
- `docs/nginx-astro.md` incluye todas las directivas pedidas;
- la 404 bilingüe sale del config;
- el servidor no se tocó.

No hay bloqueantes. Los detalles pendientes son de calidad en la 404 y en el bloque de Nginx.

## Verificación propia
- `git show --stat 04be30c`: 6 archivos, que coinciden con la tabla de "Cambios". No se tocaron las apps viejas, `shared/content/` ni el backend ✓.
- `git show b349ad3`: se quitaron los `|| x.es` de `detail.js` y el `if (!value) return ''` de `tc()`. En `vector.config.ts`, `brief`, `challenge`, `technique` y `result` son obligatorios, así que `tc()` no recibe `undefined` ✓. **Punto 6 de la fase 6 resuelto.**
- `npm run check --prefix osmanHerreraSiteAstro`: 0 errors, 0 warnings, 38 hints. Todos los hints vienen de `dist/_astro/*.js` (ver punto 7).
- `npm run build:all`: Astro genera 7 páginas (incluida `/404.html`) y `tsc` del backend termina sin errores ✓.
- Playwright sobre `dist/`, con un servidor propio en el puerto 4407 que devuelve `404.html` con status 404 y se cerró al terminar. Se probó `/ruta-inexistente` a 1440px y a 375px:
  - status 404, sin scroll horizontal, sin 4xx en recursos y sin errores de consola, salvo el del propio documento 404 (esperado);
  - las capturas se ven correctas, con las dos tarjetas ES/EN y los botones a `/` y `/en/`;
  - **hay 2 `<main>` anidados** (punto 1);
  - **el canonical apunta a `https://osmanherrera.dev/`**, hay `hreflang` del home y no hay `noindex` (punto 3).
- Comparación de `docs/nginx-astro.md` con la sección 8 de `osmanHerreraSiteVector/README.md` (puntos 4 a 6).

## Observaciones
1. [menor] `osmanHerreraSiteAstro/src/pages/404.astro:22`: la página abre un `<main>`, pero `BaseLayout.astro:55` ya envuelve el slot en otro `<main>`. Quedan dos `<main>` anidados, lo que es HTML inválido y lo penaliza Lighthouse/axe (`landmark-main-is-top-level`, `landmark-no-duplicate-main`). → Usar `<section>` o `<div>` en la 404.
2. [menor] `404.astro:50` y `:73`: `ES // ESPAÑOL` y `EN // ENGLISH` están escritos a mano, lo que incumple la regla de que todo texto visible sale del config. Además, `notFound.metaTitle` y `notFound.metaDescription` están en el config pero no se usan: `404.astro:17-18` arma el título y la descripción a mano. → Mover las etiquetas de idioma al config (p. ej. `notFound.langLabel: Localized`) y usar `metaTitle` y `metaDescription`, o eliminarlos del tipo y del config.
3. [menor] SEO y a11y de la 404: al pasar `route="home"`, la página emite `canonical` a `/` y `hreflang` del home, así que una página de error se declara como copia del home. → Agregar a `BaseLayout` una prop `noindex` que emita `<meta name="robots" content="noindex">` y omita el canonical y los `hreflang`, y usarla en la 404. Poner también `lang="en"` en la tarjeta en inglés, porque hoy los lectores de pantalla la leen con pronunciación española.
4. [menor] `docs/nginx-astro.md:114-126,152-156`: Nginx no hereda los `add_header` del `server` en un `location` que define los suyos. `/vectorwork/data/`, `/vectorwork/works/` y `/_astro/` pierden `X-Content-Type-Options`, `X-Frame-Options` y `Referrer-Policy`. → Repetirlas en esos bloques (o en un `include snippets/security-headers.conf`) y dejar una nota en el doc.
5. [menor] `docs/nginx-astro.md`: cambios no declarados respecto a la sección 8 del README de Vector Work:
   - `works/` ahora usa `immutable`, pero los archivos de `works/pieza-NN/` no tienen hash en el nombre, así que una obra reemplazada quedaría en caché 30 días sin revalidar;
   - `data/` pasó de `no-cache` a `no-cache, no-store, must-revalidate`;
   - se agregaron el bloque HTTPS, gzip, las cabeceras de seguridad y la caché de `_astro/`.

   → Quitar `immutable` de `works/` y declarar el resto en "Desviaciones".
6. [menor] `docs/nginx-astro.md`:
   - `root /var/www/osmanherrera-site/...` (:51, :193, :207) y las rutas de Certbot se presentan como reales, pero el README original usaba `/RUTA/AL/SITIO`. → Marcarlas como `TODO: confirmar` o como placeholder (anotado en `pendientes-contenido.md`).
   - `/react/politicadeprivacidad/`, con barra final, cae en `location /react/` y redirige a `/`, no a la política. → Usar `location ~ ^/react/politicadeprivacidad/?$`.
   - `listen 443 ssl http2` está obsoleto desde nginx 1.25.1. → Mencionar `http2 on;` como alternativa.
7. [info] `astro check` analiza `dist/`: el `include: ["**/*"]` de `osmanHerreraSiteAstro/tsconfig.json` no excluye `dist`, y los 38 hints vienen de los bundles minificados. → Agregar `"exclude": ["dist", "node_modules"]`.
8. [menor] Exactitud del reporte: `fase-07.md` dice "Desviaciones: Ninguna", pero hubo añadidos no pedidos (punto 5). → Corregirlo en `## Correcciones`.

Corregir los puntos 1 a 8 al inicio de la fase 8, o en un commit de correcciones antes de ella.

<!-- VEREDICTO: APROBADA CON OBSERVACIONES -->
