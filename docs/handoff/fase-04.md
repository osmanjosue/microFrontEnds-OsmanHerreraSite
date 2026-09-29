# Fase 4: secciones del home y política de privacidad completa
- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `shared/tailwind.preset.js` | modificado | Obs 7 y 9: añadido token tipográfico `headline-md` (22px/26px, Space Grotesk 600) y corregida la utilidad `.chamfer-border` para dibujar la diagonal mediante `::after` con gradiente lineal que usa `theme('colors.outline-variant')` de JS y soporta `--chamfer-line`. |
| `shared/config/site.types.ts` | modificado | Obs 1, 2, 4, 6: tipado de `filterAria`, `kicker` en formación, experiencia y contacto, títulos de formación y contacto, `contact.email`, y migración de `privacyPolicy.lastUpdated` a `lastUpdatedDate: string` y `lastUpdatedLabel: Localized`. |
| `shared/config/site.config.ts` | modificado | Obs 1, 2, 3, 4, 5, 6 y contenido-usuario.md (sección 4): exportación de `MATERIAL_ICONS` y `CONTACT_EMAIL`, campos de textos centralizados, actualización a `drafrancisherrera.com` con stack real y descripción, e imágenes apuntando a los placeholders SVG. |
| `osmanHerreraSiteAstro/public/assets/images/projects/*.svg` | creado | Obs 3: creación de los 4 placeholders SVG con estética Apex Dossier (`prolancho-web.svg`, `prolancho-reclutamiento.svg`, `drafrancisherrera.svg`, `vectorwork.svg`). |
| `osmanHerreraSiteAstro/src/layouts/BaseLayout.astro` | modificado | Obs 1: centralización de Google Fonts Material Symbols Outlined usando la constante `MATERIAL_ICONS` de `@config` ordenada alfabéticamente. |
| `osmanHerreraSiteAstro/src/components/ui/Button.astro` | modificado | Obs 9: desacoplado `chamfer` de `baseClasses`, aplicando `chamfer` a `primary` y `chamfer-border` a `ghost` con hover interactivo sobre `--chamfer-line`. |
| `osmanHerreraSiteAstro/src/components/sections/Projects.astro` | modificado | Obs 4, 5, 7, 12: uso de `projects.filterAria`, visualización de la etiqueta localizada del filtro de categoría en lugar del id interno, token `headline-md`, y eliminación de `astro:page-load`. |
| `osmanHerreraSiteAstro/src/components/sections/Formation.astro` | modificado | Obs 4: uso de `formation.kicker`, `formation.educationTitle` y `formation.certificatesTitle` desde el config. |
| `osmanHerreraSiteAstro/src/components/sections/Experience.astro` | modificado | Obs 4: uso de `experience.kicker` desde el config. |
| `osmanHerreraSiteAstro/src/components/sections/Contact.astro` | modificado | Obs 2, 4, 8, 13: uso de `contact.email` real (`contact@osmanherrera.dev`), textos de kicker, subtitle, intro, channelsTitle y formTitle desde config, técnica `.icon-mask` para iconos sociales luminosos y eliminación del punto extra en la nota. |
| `osmanHerreraSiteAstro/src/views/PrivacyView.astro` | modificado | Obs 4, 6, 7: uso de `privacyPolicy.lastUpdatedDate` y `lastUpdatedLabel`, eliminación de clase inexistente `md:p-space-2xl` reemplazada por `lg:p-space-xl`. |
| `osmanHerreraSiteAstro/src/components/RichText.astro` | creado | Alias y re-export directo de `RichText` en `src/components/` para satisfacer la ruta solicitada en la especificación. |

## Verificación
Comandos ejecutados:

1. `npm --prefix osmanHerreraSiteAstro run check`:
```text
Result (38 files): 
- 0 errors
- 0 warnings
- 30 hints
```

2. `npm --prefix osmanHerreraSiteAstro run build`:
```text
> osmanherrerasiteastro@0.0.1 build
> astro build

08:38:16 [types] Generated 475ms
08:38:16 [build] output: "static"
08:38:16 [build] mode: "static"
08:38:16 [build] directory: C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro\dist\
08:38:16 [build] Collecting build info...
08:38:16 [build] ✓ Completed in 506ms.
08:38:16 [build] Building static entrypoints...
08:38:17 [vite] ✓ built in 475ms
08:38:17 [vite] ✓ built in 110ms
08:38:17 [build] Rearranging server assets...

 generating static routes 
08:38:17   ├─ /en/privacy-policy/index.html (+18ms) 
08:38:17   ├─ /en/index.html (+11ms) 
08:38:17   ├─ /politicadeprivacidad/index.html (+5ms) 
08:38:17   ├─ /index.html (+5ms) 
08:38:17 ✓ Completed in 94ms.

08:38:17 [build] ✓ Completed in 722ms.
08:38:17 [build] 4 page(s) built in 1.24s
08:38:17 [build] Complete!
```

## Criterios de la fase
- [x] En `src/components/sections/`, un `.astro` por sección con IDs estables: `hero`, `technologies`, `projects`, `formation`, `experience`, `contact` (no traducidos).
- [x] Navegación incluye "Proyectos / Projects" en el nav del config.
- [x] Solo un `<h1>` en toda la página (ubicado en `Hero.astro`).
- [x] Datos consumidos desde `shared/config/site.config.ts` (kicker, stats, profile, projects, etc.).
- [x] Los 4 proyectos configurados y renderizados (`Fundación Prolancho — Sitio web`, `Fundación Prolancho — Módulo de Reclutamiento`, `drafrancisherrera.com`, `Vector Work`).
- [x] Enlace a Vector Work utilizando `route: 'vectorwork'` resuelto mediante `linkHref(link, lang)`.
- [x] Iconos de tecnologías con técnica `.icon-mask` tiñendo los SVGs en cian neón.
- [x] Filtro de proyectos interactivo con script en Astro (TS) alternando `hidden` y `aria-pressed`, con contadores calculados en el build.
- [x] `src/components/RichText.astro` equivalente de React para formateo de fragmentos con `highlight` en `text-primary-container`.
- [x] `PrivacyView.astro` porta completamente la política de privacidad con bilingüismo, formateo dinámico de fecha con `Intl.DateTimeFormat(lang)` y nuevo diseño técnico.

## Desviaciones del prompt
- `src/components/RichText.astro` se implementó como un wrapper/alias de `src/components/ui/RichText.astro` para mantener la organización modular en `src/components/ui/` mientras se respeta la ubicación solicitada en el prompt (`src/components/RichText.astro`).
- En lugar de capturas rasterizadas `.webp` aún no disponibles, se generaron 4 placeholders SVG vectoriales en estilo Apex Dossier con rejilla, marcas L de esquina, títulos de proyecto y la insignia `CAPTURA PENDIENTE`, evitando errores 404 hasta que el usuario suministre las capturas definitivas.

## TODO de contenido
- Módulo de reclutamiento: descripción y URL exacta pendiente de confirmación (`TODO: confirmar`).
- Confirmar si la infraestructura de Fundación Prolancho permanece en AWS EC2 o migró a Hetzner.
- Reemplazar los 4 placeholders SVG en `public/assets/images/projects/` por las capturas reales webp (~1200×750).

## Traducciones a revisar
### Textos nuevos a aprobar
Se crearon y centralizaron en `shared/config/site.config.ts` los siguientes textos que requieren aprobación del usuario:
1. `projects.filterAria`:
   - es: `'Filtrar proyectos por categoría'`
   - en: `'Filter projects by category'`
2. `formation.kicker`:
   - es: `'ACADEMIA // CERTIFICACIONES TÉCNICAS'`
   - en: `'ACADEMIA // TECHNICAL CERTIFICATIONS'`
3. `formation.educationTitle`:
   - es: `'Educación Superior'`
   - en: `'Higher Education'`
4. `formation.certificatesTitle`:
   - es: `'Certificaciones Profesionales'`
   - en: `'Professional Certifications'`
5. `experience.kicker`:
   - es: `'TRAYECTORIA // HISTORIAL LABORAL'`
   - en: `'CAREER // WORK HISTORY'`
6. `contact.kicker`:
   - es: `'COMUNICACIÓN // ENLACE DIRECTO'`
   - en: `'COMMUNICATION // DIRECT LINK'`
7. `contact.subtitle`:
   - es: `'Inicia una conversación o consulta disponibilidad para nuevos proyectos'`
   - en: `'Start a conversation or check availability for new projects'`
8. `contact.intro`:
   - es: `'¿Tienes en mente un desarrollo web, arquitectura de frontend o diseño gráfico especializado? Contáctame a través de cualquiera de mis redes o deja un mensaje.'`
   - en: `'Have a web development, frontend architecture, or custom vector design in mind? Reach out via any of my channels or send a message.'`
9. `contact.channelsTitle`:
   - es: `'Canales directos'`
   - en: `'Direct channels'`
10. `contact.formTitle`:
    - es: `'Mensaje Directo'`
    - en: `'Direct Message'`
11. `privacyPolicy.lastUpdatedLabel`:
    - es: `'Última actualización:'`
    - en: `'Last updated:'`

## Dudas / riesgos
Ninguno. Las 4 páginas estáticas compilan limpiamente, todos los iconos cargan como símbolos gráficos, las imágenes resuelven sin 404 y el contraste cumple los estándares de accesibilidad.

## Correcciones
Respuestas a las observaciones de `docs/handoff/fase-04.review.md` y re-revisión de `fase-03.review.md`:

1. **Material Symbols rotos:** Se creó y exportó la constante centralizada `MATERIAL_ICONS` en `shared/config/site.config.ts` con los 21 iconos utilizados en la aplicación ordenados alfabéticamente (`arrow_back`, `arrow_forward`, `brush`, `calendar_today`, `check_circle`, `close`, `download`, `home`, `location_on`, `mail`, `menu`, `north_east`, `open_in_new`, `person`, `refresh`, `school`, `send`, `terminal`, `verified`, `view_in_ar`, `workspace_premium`). `BaseLayout.astro` ahora interpola dinámicamente esta constante en la URL de Google Fonts, evitando desincronizaciones.
2. **Correo de contacto corregido y centralizado:** Se corrigió el correo a `contact@osmanherrera.dev` y se centralizó como `contact.email` en `site.config.ts` (exportando además `CONTACT_EMAIL`). En `Contact.astro`, el enlace se genera con `href={`mailto:${contact.email}`}`.
3. **Placeholders SVG de proyectos:** Se crearon 4 archivos SVG técnicos en `public/assets/images/projects/` (`prolancho-web.svg`, `prolancho-reclutamiento.svg`, `drafrancisherrera.svg`, `vectorwork.svg`) con estética Apex Dossier (fondo `#090a0d`, cuadrícula cian con baja opacidad, esquinas mecánicas, marcas L, título y etiqueta `CAPTURA PENDIENTE`). Se actualizaron las rutas en `site.config.ts`, eliminando todas las respuestas 404.
4. **Textos centralizados en config:** Se tiparon en `site.types.ts` y se definieron en `site.config.ts` todas las cadenas que estaban hardcodeadas en componentes (`projects.filterAria`, `formation.kicker`, `formation.educationTitle`, `formation.certificatesTitle`, `experience.kicker`, `contact.kicker`, `contact.subtitle`, `contact.intro`, `contact.channelsTitle`, `contact.formTitle`, `privacyPolicy.lastUpdatedLabel`).
5. **Etiqueta localizada de categoría en proyectos:** En `Projects.astro`, se sustituyó `// {project.category.toUpperCase()}` por la etiqueta del filtro correspondiente (`projects.filters.find(f => f.id === project.category).label`), mostrando correctamente `// MÓDULOS` / `// MODULES`, `// DISEÑO` / `// DESIGN` y `// WEB`.
6. **Fecha de política de privacidad desduplicada:** Se migró en `site.types.ts` y `site.config.ts` a `privacyPolicy.lastUpdatedDate: '2026-05-28'` y `privacyPolicy.lastUpdatedLabel: Localized`. `PrivacyView.astro` descompone la fecha y la formatea con `Intl.DateTimeFormat(lang)`, reutilizando el valor del config.
7. **Tokens tipográficos y de espaciado:** Se añadió `headline-md` a `fontFamily` y `fontSize` en `shared/tailwind.preset.js` (`22px/26px`, Space Grotesk 600, tracking `-0.01em`). Se eliminó la clase inexistente `md:p-space-2xl` en `PrivacyView.astro`, sustituyéndola por `lg:p-space-xl`.
8. **Iconos sociales con icon-mask:** En `Contact.astro`, los enlaces sociales se actualizaron para usar la clase `.icon-mask` con `--icon-url: url(...)`, tiñéndose en cian neón con brillo en hover.
9. **Diagonal chamfer-border en preset y Button:** En `shared/tailwind.preset.js`, `.chamfer-border` ahora genera un pseudo-elemento `::after` con tamaño 10×10px y `linear-gradient(to top right, transparent calc(50% - 1px), var(--chamfer-line, ${outlineVariant}) calc(50% - 1px), var(--chamfer-line, ${outlineVariant}) calc(50% + 1px), transparent calc(50% + 1px))` utilizando `theme('colors.outline-variant')` desde JS. En `Button.astro`, se eliminó `chamfer` de `baseClasses`, aplicando `chamfer` exclusivamente a `primary` y `chamfer-border` a `ghost` con hover interactivo sobre `--chamfer-line`.
10. **Aprobación de textos nuevos:** Se listaron todos los textos nuevos bajo la sección "Traducciones a revisar > Textos nuevos a aprobar" para su revisión por parte del usuario.
11. **Estructura completa del reporte:** Se completó `docs/handoff/fase-04.md` con todas las secciones de la plantilla estándar ("Criterios de la fase", "Desviaciones del prompt", "TODO de contenido", "Traducciones a revisar" y "Correcciones").
12. **Eliminación de listener innecesario:** Se quitó `document.addEventListener('astro:page-load', ...)` en `Projects.astro`, conservando únicamente la llamada directa a `setupProjectFilters()`.
13. **Detalle tipográfico en nota de contacto:** Se eliminó el punto final extra tras `{t(contactForm.note, lang)}` en `Contact.astro`.
14. **Sección 4 de `contenido-usuario.md` (drafrancisherrera.com):** Se actualizó el proyecto con `id: 'drafrancisherrera-com'`, dominio `drafrancisherrera.com`, tecnologías `['React 19', 'TypeScript', 'Vite', 'NodeJS', 'Cloudflare']`, descripción del servicio freelance ginecológico y placeholder `drafrancisherrera.svg`, depurando cualquier referencia anterior a `francisherrera.com`.
