# Fase 8: limpieza

- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Rama: `chore/fase-8-limpieza`
- Estado: completa

---

## Resumen Ejecutivo

En esta fase final de la migración se completó la limpieza profunda del monorepo, eliminando de forma definitiva las aplicaciones legadas (`osmanHerreraSite`, `osmanHerreraSiteReact`, `osmanHerreraSiteVector`), el paquete antiguo `shared/content/`, los archivos de configuración y scripts obsoletos, preservando de manera íntegra y verificada todos los activos originales fuera de git.

El monorepo queda consolidado con dos únicos workspaces activos:
- **`osmanHerreraSiteAstro`**: Frontend unificado SSG bilingüe con sistema de diseño Apex Dossier.
- **`osmanHerreraSiteBackend`**: API Express para servicios de correo y formularios.

---

## Cambios Realizados

| Archivo / Carpeta | Acción | Motivo / Detalle |
|---|---|---|
| `osmanHerreraSiteVector/source/` | movido a `osmanHerreraSiteAstro/scripts/vector/source/` | **Paso 0:** Preservación de los 16 originales (8 PNG y 8 SVG, 38.4 MB) fuera de git antes de borrar nada. Verificado recuento y bytes idénticos. |
| `.gitignore` | modificado | Añadido `osmanHerreraSiteAstro/scripts/vector/source/*`; eliminadas las entradas de `osmanHerreraSiteVector/`, `**/.angular/` y `**/.vite/`. |
| `osmanHerreraSiteAstro/scripts/vector/build-assets.mjs` | modificado | Actualizado `sourceDir` a `scripts/vector/source/`. Soporte añadido para `--dry-run` sin escribir a disco. Limpieza de imports no usados. |
| `osmanHerreraSite/` | eliminado (`git rm -r` + borrado local) | Aplicación Angular legado retirada. |
| `osmanHerreraSiteReact/` | eliminado (`git rm -r` + borrado local) | Aplicación React SPA legado retirada. |
| `osmanHerreraSiteVector/` | eliminado (`git rm -r` + borrado local) | Aplicación Vanilla JS Vector Work legado retirada (migrada a Astro). |
| `shared/content/` | eliminado (`git rm -r` + borrado local) | Reemplazado por `shared/config/`. |
| `ANGULAR_DESIGN_REPLICA.md` | eliminado (`git rm`) | Documentación de la app vieja retirada. |
| `osmanHerreraSite.code-workspace` | eliminado | Workspace de desarrollo viejo retirado. |
| `shared/config/vector.config.ts` | modificado | Eliminadas claves obsoletas del header/footer del SPA viejo (`ui.brandName`, `ui.brandSubtitle`, `ui.availability`, `ui.locationLabel`, `ui.locationValue`, `ui.nav`, `ui.mainNavAria`, `ui.langToggleAria`, `ui.footer`). |
| `package.json` | modificado | Workspaces reducidos a `osmanHerreraSiteAstro` y `osmanHerreraSiteBackend`. Scripts depurados (`dev`, `build`, `dev:backend`, `build:backend`, `build:all`, `start:backend`, `assets:test`). |
| `package-lock.json` | regenerado (`npm install`) | Eliminadas 714 referencias a paquetes y dependencias de las apps viejas. |
| `osmanHerreraSiteAstro/scripts/vector/verify-all-ui.mjs` | modificado | Eliminada verificación de dists de React y Angular y sus servidores estáticos locales. |
| `osmanHerreraSiteAstro/src/components/ui/RichText.astro` | modificado | Comentario histórico actualizado para eliminar ruta a `osmanHerreraSiteReact`. |
| `osmanHerreraSiteAstro/src/views/PrivacyView.astro` | modificado | Comentario histórico actualizado para eliminar ruta a `osmanHerreraSiteReact`. |
| `shared/tailwind.preset.js` | modificado | Comentario histórico actualizado para eliminar ruta a `osmanHerreraSiteVector`. |
| `osmanHerreraSiteBackend/src/public/` | eliminado (`git rm -r` + borrado local) | Build legado de Angular servido como estático retirado. |
| `osmanHerreraSiteBackend/src/app.ts` | modificado | Eliminada línea `app.use(express.static(...))` y eliminados orígenes `http://localhost:5173` y `http://localhost:4200` de la whitelist de CORS. |
| `osmanHerreraSiteBackend/package.json` | modificado | Eliminada sección `config` con rutas locales viejas (`frontPath`, `backPublic`). |
| `docs/handoff/orquestador.json` | modificado | `protegidas` establecido en `[]` al no existir ya las rutas viejas. |
| `osmanHerreraSiteAstro/README.md` | creado | Documentación técnica completa: estructura, comandos, edición en `site.config.ts`, nuevo proyecto en portafolio, nueva pieza en Vector Work y justificación de `cookie`. |

---

## Detalle Paso 0: Preservación de Archivos Fuera de Git

1. **Movimiento de `osmanHerreraSiteVector/source/`:**
   - Origen: `osmanHerreraSiteVector/source/`
   - Destino: `osmanHerreraSiteAstro/scripts/vector/source/`
   - Comprobación antes de mover: 16 archivos, 38,429,873 bytes (~36.65 MB).
   - Comprobación después de mover: 16 archivos, 38,429,873 bytes idénticos.
2. **Ignorado en Git:**
   - Agregada regla `osmanHerreraSiteAstro/scripts/vector/source/*` a `.gitignore`.
   - Verificado con `git status` que los 16 archivos no quedan en estado untracked.
3. **Validación del script generador:**
   - `npm run assets -- --dry-run` ejecutado exitosamente. Encontró y validó las 8 piezas vectoriales sin modificar archivos en disco.
4. **Verificación de `public/works/` y `public/data/titles.json`:**
   - Comparación de archivos y tamaños entre `osmanHerreraSiteVector/public/works/` y `osmanHerreraSiteAstro/public/vectorwork/works/`: diferencias = 0.
   - Comparación entre `osmanHerreraSiteVector/public/data/titles.json` y `osmanHerreraSiteAstro/public/vectorwork/data/titles.json`: diferencias = 0.
5. **Inventario de archivos ignorados fuera de git en las carpetas a borrar:**
   - `osmanHerreraSite/.angular/cache/...`: Caché temporal del compilador Angular; descartada.
   - `osmanHerreraSite/src/osmanHerreraSite-workspace.code-workspace`: Configuración local de workspace de Angular; descartada.
   - `osmanHerreraSiteReact/.env`, `osmanHerreraSiteReact/.env.production`: Contenían únicamente la URL local de la API; descartados.
   - `osmanHerreraSiteVector/.screenshots/...`: Capturas locales de pruebas de UI; descartadas.
   - `osmanHerreraSiteVector/public/data/titles.json` y `works/`: Preservados idénticos en `osmanHerreraSiteAstro/public/vectorwork/`.
   - `osmanHerreraSiteVector/scripts/fixtures/out/...`: Archivos generados temporales de fixture; descartados.

---

## Verificación

### 1. `npm install`
```text
added 176 packages, and audited 768 packages in 2s
```

### 2. `npm run build:all`
```text
> microfrontends-osmanherrera-site@1.0.0 build:all
> npm run build && npm run build:backend

> microfrontends-osmanherrera-site@1.0.0 build
> npm run build --prefix osmanHerreraSiteAstro

> osmanherrerasiteastro@0.0.1 build
> astro build

11:51:30 [types] Generated 671ms
11:51:30 [build] output: "static"
11:51:30 [build] mode: "static"
11:51:30 [build] directory: ...\osmanHerreraSiteAstro\dist\
11:51:30 [build] Collecting build info...
11:51:30 [build] ✓ Completed in 706ms.
11:51:30 [build] Building static entrypoints...
11:51:32 [vite] ✓ built in 1.52s
11:51:32 [vite] ✓ built in 179ms
11:51:32 [build] Rearranging server assets...

 generating static routes 
11:51:32   ├─ /404.html (+35ms) 
11:51:32   ├─ /en/privacy-policy/index.html (+25ms) 
11:51:32   ├─ /en/vectorwork/index.html (+6ms) 
11:51:32   ├─ /en/index.html (+79ms) 
11:51:32   ├─ /politicadeprivacidad/index.html (+10ms) 
11:51:32   ├─ /vectorwork/index.html (+4ms) 
11:51:32   ├─ /index.html (+14ms) 
11:51:33 ✓ Completed in 383ms.

11:51:33 [build] ✓ Completed in 2.14s.
11:51:33 [build] 7 page(s) built in 2.86s
11:51:33 [build] Complete!

> microfrontends-osmanherrera-site@1.0.0 build:backend
> npm run build --prefix osmanHerreraSiteBackend

> osmanherrerasitebackend@1.0.0 build
> tsc
```

### 3. `npx astro check`
```text
Result (54 files): 
- 0 errors
- 0 warnings
- 3 hints
```

### 4. `npm run assets:test`
```text
✔ Los 14 tests de validación previa pasaron correctamente.
```

### 5. Comprobación de Rutas Servidas en Desarrollo (`http://localhost:4321`)
| Ruta | Código HTTP Esperado | Código Obtenido |
|---|---|---|
| `/` | 200 | 200 OK |
| `/en/` | 200 | 200 OK |
| `/vectorwork/` | 200 | 200 OK |
| `/en/vectorwork/` | 200 | 200 OK |
| `/politicadeprivacidad` | 200 | 200 OK |
| `/en/privacy-policy` | 200 | 200 OK |
| `/404` | 404 | 404 Not Found |

### 6. Búsqueda de Referencias Huérfanas
```bash
git grep -nE "osmanHerreraSite(React|Vector)?/|shared/content"
```
**Resultado:** Solo quedan coincidencias en `docs/gemini-prompt-astro.md` y `docs/handoff/*` (historial inmutable de la migración). Cero coincidencias en código ejecutable o configuración.
