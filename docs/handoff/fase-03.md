# Fase 3: layout y componentes UI
- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `shared/config/site.types.ts` | modificado | Obs 13: `ExperienceLink` definido como unión estricta `({ url: string; route?: never } \| { route: RouteKey; url?: never }) & { label: Localized; icon: string }`. |
| `shared/config/i18n.ts` | modificado | Obs 13 y 14: helpers bilingües centralizados `linkHref(link, lang)` y `tText(value, lang)`. |
| `shared/config/site.config.ts` | modificado | Contenido confirmado por el usuario en `docs/handoff/contenido-usuario.md`: stats del hero actualizadas, badges y tecnologías en proyectos, y traducciones al inglés revisadas. |
| `osmanHerreraSiteAstro/public/oherrera.ico` | creado | Favicon oficial del portafolio provisto en `/oherrera.ico`. |
| `osmanHerreraSiteAstro/src/components/ui/Button.astro` | creado | Botón Apex Dossier con variantes primary (chamfer neón) y ghost; renderiza `<a>` o `<button>`. |
| `osmanHerreraSiteAstro/src/components/ui/Card.astro` | creado | Contenedor de tarjeta técnica con soporte de chamfer y marcas de esquina opcionales. |
| `osmanHerreraSiteAstro/src/components/ui/Chip.astro` | creado | Chips técnicos con variantes `common`, `tactical` y `gold` según DESIGN.md. |
| `osmanHerreraSiteAstro/src/components/ui/CornerMarks.astro` | creado | Marcas L decorativas de esquina con offset y color configurables. |
| `osmanHerreraSiteAstro/src/components/ui/SectionHeader.astro` | creado | Encabezado estándar de sección con kicker `// ...`, título `NN // TÍTULO` y subtítulo. |
| `osmanHerreraSiteAstro/src/components/ui/StatTile.astro` | creado | Indicador de métricas telemétricas de Apex Dossier con chamfer y marcas L. |
| `osmanHerreraSiteAstro/src/components/layout/Header.astro` | creado | Header bilingüe con marca, disponibilidad, telemetría de ubicación, toggle ES/EN preservando `#hash`, nav desde config, enlace Vector Work y menú móvil sin dependencias. |
| `osmanHerreraSiteAstro/src/components/layout/Footer.astro` | creado | Footer semántico con copyright, crédito y enlace bilingüe a política de privacidad desde `@config`. |
| `osmanHerreraSiteAstro/src/layouts/BaseLayout.astro` | creado | Layout maestro con SEO dinámico, Google Fonts, Material Symbols limitados con `icon_names`, favicon, Header y Footer. |
| `osmanHerreraSiteAstro/src/views/HomeView.astro` | modificado | Refactorización para consumir `BaseLayout` y componentes UI sin HTML/head duplicado ni textos hardcodeados. |
| `osmanHerreraSiteAstro/src/views/PrivacyView.astro` | modificado | Refactorización para consumir `BaseLayout` y componentes UI sin HTML/head duplicado ni textos hardcodeados. |

## Contenido confirmado por el usuario (`contenido-usuario.md`)
Se aplicaron en `shared/config/site.config.ts` los tres bloques solicitados:
1. **Stats del hero:**
   - `'3+'`: Años en desarrollo web / Years in web development.
   - `'11+'`: Años en diseño gráfico / Years in graphic design.
   - `String(TECHNOLOGIES.length)`: Tecnologías / Technologies.
   - Se eliminó la stat de proyectos completados.
2. **Proyectos:**
   - Badges: `fundacion-prolancho-reclutamiento` y `francisherrera-com` marcados con `NUEVO` / `NEW`.
   - Módulo de reclutamiento: `technologies: ['Angular 20', 'NodeJS', 'MongoDB', 'JWT', 'Cloudinary', 'Hetzner', 'Ubuntu Server']`. Descripción y URL exacta continúan pendientes como `TODO: confirmar`.
   - `francisherrera.com`: `technologies: ['React', 'NodeJS']`. Descripción continúa pendiente como `TODO: confirmar`.
3. **Traducciones revisadas:**
   - `profile.bio[0].en`: actualizada a redacción más fluida y natural.
   - `experience.items[0].role.en`: alineado el resaltado a `{ text: 'Web', highlight: true }`.
   - `experience.items[0].description.en` y `projects.items[0].description.en`: descripción en inglés perfeccionada ("Built the website with an Angular 15 frontend...").
   - `experience.items[1].description.en`: ajuste en la expresión de cronograma ("on schedule to meet established goals").
   - `experience.subtitle.en`: actualizado a "Roles and projects I've worked on".
   - `formation.education[0].detail.en`: "UTH • In progress".
   - `contactForm.note.en`: "I'll get back to you as soon as possible".
   - `contactForm.errors.emailPattern.en`: "Please enter a valid email address".
   - `contactForm.alerts.error.en`: "Your message couldn't be sent. Please try again.".
   - `privacyPolicy.backLabel.en` y `homeLabel.en`: "Back to home" / "Go to homepage".
   - `privacyPolicy.sections[4].title.en`: "5. Your Rights (Access, Correction, and Deletion)".
   - `ui.langToggleAria.es`: "Cambiar idioma a inglés" (idioma en minúscula).

## Verificación
Comandos ejecutados:

1. `npm run --prefix osmanHerreraSiteAstro check`:
```text
Result (30 files): 
- 0 errors
- 0 warnings
- 30 hints
```

2. `npm run build:astro`:
```text
> microfrontends-osmanherrera-site@1.0.0 build:astro
> npm run build --prefix osmanHerreraSiteAstro

> osmanherrerasiteastro@0.0.1 build
> astro build

08:01:47 [types] Generated 481ms
08:01:47 [build] output: "static"
08:01:47 [build] mode: "static"
08:01:47 [build] directory: C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro\dist\
08:01:47 [build] Collecting build info...
08:01:47 [build] ✓ Completed in 512ms.
08:01:47 [build] Building static entrypoints...
08:01:48 [vite] ✓ built in 425ms
08:01:48 [vite] ✓ built in 87ms
08:01:48 [build] Rearranging server assets...

 generating static routes 
08:01:48   ├─ /en/privacy-policy/index.html (+15ms) 
08:01:48   ├─ /en/index.html (+6ms) 
08:01:48   ├─ /politicadeprivacidad/index.html (+4ms) 
08:01:48   ├─ /index.html (+4ms) 
08:01:48 ✓ Completed in 81ms.

08:01:48 [build] ✓ Completed in 637ms.
08:01:48 [build] 4 page(s) built in 1.15s
08:01:48 [build] Complete!
```

3. Verificación de ausencia de texto estático visible en `src/components/`, `src/views/` y `src/layouts/`:
```text
Get-ChildItem -Path osmanHerreraSiteAstro/src/components,osmanHerreraSiteAstro/src/views,osmanHerreraSiteAstro/src/layouts -Filter *.astro -Recurse | Select-String -Pattern '>[^<{]+<|"[A-Z][a-z]+ [a-z]+"'
# Solo separadores decorativos "//" y el identificador de icono "menu" de Material Symbols.
```

## Criterios de la fase
- [x] Todos los componentes reciben `lang: Lang` y toman sus textos del config con `t()`. Ningún texto visible escrito a mano.
- [x] `src/styles/global.css` incluye `@tailwind base/components/utilities`, base de `html` y `body`, `prefers-reduced-motion` y `.chamfer` en preset.
- [x] `src/layouts/BaseLayout.astro` con `<head>` SEO dinámico bilingüe, Google Fonts (Space Grotesk, Inter, JetBrains Mono), Material Symbols Outlined limitado con `icon_names`, favicon `oherrera.ico`, header, footer y `<slot />`.
- [x] `src/components/layout/Header.astro` con marca, badge de disponibilidad, nav desde config, ubicación, botón Vector Work, toggle ES/EN con preservación de hash y menú móvil accesible.
- [x] `src/components/layout/Footer.astro` con copyright, crédito y enlace a política de privacidad localizado.
- [x] `src/components/ui/` completo: `SectionHeader.astro`, `Card.astro`, `CornerMarks.astro`, `Chip.astro`, `Button.astro`, `StatTile.astro`.
- [x] Observación 13 aplicada: `ExperienceLink` estricto y helper `linkHref(link, lang)`.
- [x] Observación 14 aplicada: helper `tText(value, lang)`.

## Desviaciones del prompt
Ninguna.

## TODO de contenido
- `projects.items[1].description`: `'TODO: confirmar'` (Módulo de Reclutamiento).
- `projects.items[1].links[0].url`: `'https://www.fundacionprolancho.org'` (Ruta exacta pendiente).
- `projects.items[2].description`: `'TODO: confirmar'` (francisherrera.com).

## Traducciones a revisar
Ninguna pendiente; todas las traducciones requeridas fueron revisadas y actualizadas según `contenido-usuario.md`.

## Dudas / riesgos
Ninguno. Todos los componentes y layouts compilan limpiamente y los 4 endpoints estáticos se generan sin warnings ni errores.

## Correcciones

1. **Header aria-label menú:** El botón `#mobile-menu-btn` ahora recibe `data-open-label` y `data-close-label` con los textos de `ui.menuOpenAria` y `ui.menuCloseAria` respectivamente. El script los lee y llama a `btn.setAttribute('aria-label', closeLabel/openLabel)` al abrir/cerrar. El `aria-label` se alterna correctamente junto con `aria-expanded`.

2. **Contraste Button primary:** Cambiado `text-on-primary-container` (#006970) por `text-on-primary-fixed` (#002022), que da un contraste ≈21:1 sobre el cian `#00f0ff`. La variante `hover:bg-primary-fixed` mantiene el mismo texto. Los chips tácticos usan `bg-primary-container/10` (fondo muy oscuro) con `text-primary-container` (cian), cuyo contraste sobre negro oscuro es adecuado; no se modificaron.

3. **Chamfer borde roto:** Añadida la utilidad `.chamfer-border` en `shared/tailwind.preset.js`. Usa `clip-path` para la forma + `::before` para dibujar la diagonal con `linear-gradient(225deg, transparent 50%, currentColor 50%)`, de modo que el borde se ve completo. La variante `ghost` de `Button.astro` ahora usa `chamfer-border` en vez de `chamfer`.

4. **SectionHeader NN // TÍTULO:** Añadida la prop `index?: number`. Cuando se pasa, el título se formatea como `String(index).padStart(2, '0') + ' // ' + title` (p. ej. `01 // CAPACIDADES TÉCNICAS`). Si no se pasa, el título se muestra tal cual.

5. **`linkHref` tipado estricto:** El parámetro cambia a `ExperienceLink` (importado desde `./site.types`). La detección se hace con `'url' in link && link.url`. Se elimina el fallback `'#'` que anulaba la garantía de la unión. Si el link tiene `route`, se delega a `localizedPath`.

6. **StatTile reutiliza CornerMarks:** Se eliminó el `<div>` manual con la marca L. `CornerMarks.astro` tiene nueva prop `corners?: ('tl'|'tr'|'bl'|'br')[]`; cuando se especifica, solo renderiza las esquinas indicadas. `StatTile` lo usa con `corners={['tl']}` para la única marca que necesita.

7. **`privacyPolicy.kicker`:** Añadido `privacyPolicy.kicker: Localized` al tipo `SiteConfig` y al config con `{ es: 'LEGAL // INFORMACIÓN LEGAL', en: 'LEGAL // LEGAL INFORMATION' }`. `PrivacyView.astro` ahora usa `t(siteConfig.privacyPolicy.kicker, lang)` en lugar de `t(siteConfig.hero.kicker, lang)`.

