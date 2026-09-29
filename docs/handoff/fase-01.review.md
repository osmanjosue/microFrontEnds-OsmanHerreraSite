# Revisión fase 1
- Commit revisado: 7254702
- Veredicto: APROBADA CON OBSERVACIONES

Ningún punto bloquea la fase 2. Corrige los puntos 1 a 5 en el primer commit de la fase 2, o en un commit aparte `Fase 1: corrige observaciones de revisión`, y respóndelos en `## Correcciones` de `fase-01.md`.

## Verificación propia
- `git show --stat 7254702`: los 14 archivos coinciden con la tabla de "Cambios". Árbol limpio, sin archivos sin versionar.
- `npx astro check` (en `osmanHerreraSiteAstro/`): 0 errors, 0 warnings, 30 hints.
- `npm run build` (Astro): `1 page(s) built`, Complete.
- Regresión por el nuevo `shared/package.json` (`"type": "module"`):
  - `npm run build:react`: ✓ built.
  - `npm run build:vector`: ✓ built.
  - `npm run build:angular`: Application bundle generation complete.
- Dependencia `cookie`: `node_modules/astro/node_modules/cookie` ya trae la 2.x, pero el prerender resuelve `cookie` desde la raíz del proyecto Astro, donde está hoisteada la 0.7.2. La dependencia directa `cookie@^2.0.1` en el workspace está justificada.
- El preset (`shared/tailwind.preset.js`) coincide token por token con `osmanHerreraSiteVector/tailwind.config.js`: colors, borderRadius 0, spacing, fontFamily y fontSize.
- Las apps viejas (Angular, React y Vector) no se tocaron. ✓
- No hay contenido inventado: solo se usa `siteConfig.brand`. ✓

## Observaciones
1. [menor] `docs/handoff/fase-01.md:2`: `Commit: HEAD` no identifica el commit. → Usar el hash corto real (`7254702`). En las siguientes fases, escribe el hash después de commitear, con un `git commit --amend` del reporte o en el commit de correcciones.
2. [menor] `package.json:16-24`: se agregaron los scripts `dev:angular`, `dev:react`, `dev:vector`, `dev:backend`, `start:angular`, `start:react` y `start:vector`, y se movió `start:backend`. No aparece en "Desviaciones". → Se pueden quedar, pero decláralo en `## Correcciones`. Recordatorio: toda modificación fuera de lo pedido va en Desviaciones.
3. [menor] `osmanHerreraSiteAstro/src/styles/global.css:26-31`: `.chamfer` está duplicado en el CSS global y en el plugin del preset. → Déjalo solo en el preset (`shared/tailwind.preset.js`), para que cualquier app que use el preset lo tenga, y bórralo de `global.css`.
4. [menor] `osmanHerreraSiteAstro/package.json:15`: `@astrojs/check` está en `dependencies`. → Moverlo a `devDependencies`: es una herramienta de verificación, no de runtime.
5. [menor] `shared/package.json:2`: el nombre `@shared/content` es engañoso, porque el paquete ahora también contiene el preset de Tailwind. → Renombrar a `@osmanherrera/shared`. No afecta al alias `@shared`, que se resuelve por ruta.
6. [info] `.gitignore`: con el nuevo patrón `docs/*`, las maquetas de Stitch (`docs/stitch_*`) siguen fuera de git y solo se versionan `docs/*.md` y `docs/handoff/`. Es correcto. No requiere acción.
7. [info] `npm install` reporta 76 vulnerabilidades (3 críticas). Ya existían por el monorepo (Angular, Karma, Express) y quedan fuera del alcance de esta fase. → Ejecutar `npm audit` después de la fase 8, cuando se hayan retirado las apps viejas.
8. [info] La dependencia `cookie@^2.0.1` es una solución a un conflicto de hoisting. → En la fase 8, documentarlo en `osmanHerreraSiteAstro/README.md` para que nadie la quite pensando que sobra.

## TODO para el usuario
Ninguno en esta fase.

## Re-revisión (a943558)
1. ✅ El hash aparece en el reporte. Nota: al hacer `--amend` el hash cambia, así que desde la fase 2 el hash ya no se escribe en el reporte (ver `fase-02.review.md`, punto 12).
2. ✅ Scripts declarados en `## Correcciones`.
3. ✅ `.chamfer` eliminado de `global.css`; solo queda en el preset.
4. ✅ `@astrojs/check` está en `devDependencies`.
5. ✅ `shared/package.json` renombrado a `@osmanherrera/shared`.

Fase 1 cerrada.
