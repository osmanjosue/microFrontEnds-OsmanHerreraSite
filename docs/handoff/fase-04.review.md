# Revisión fase 4
- Commits revisados: 836b095 (correcciones de la fase 3) y 6598d63 (fase 4)
- Veredicto: REQUIERE CORRECCIONES → APROBADA CON OBSERVACIONES tras re-revisión (28bede6)

La estructura es correcta: 6 secciones con IDs estables, un solo `<h1>`, filtro funcional, política completa y `RichText`. Pero la página tiene fallos visibles (iconos como texto, imágenes rotas, un correo equivocado) y textos fuera del config. Corrige todo antes de la fase 5.

## Verificación propia
- `npx astro check`: 0 errors. `npm run build`: 4 páginas.
- No se tocaron las apps viejas ni `shared/content/` (diff vacío).
- Playwright sobre `astro preview` (`/` a 1440px, `/en/` a 375px, `/politicadeprivacidad`):
  - sin scroll horizontal y exactamente 1 `<h1>` por página;
  - el filtro "Módulos" deja 1 proyecto visible ✓;
  - **8 respuestas 404:** las 4 imágenes de `/assets/images/projects/*.webp`, en ambos idiomas;
  - la captura muestra los nombres de iconos como texto: `OPEN_IN_NEW`, `LOCATION_ON`, `SCHOOL`, `VERIFIED`, `WORKSPACE_PREMIUM` y `CALENDAR_TODAY`, entre otros.

## Observaciones
1. [bloqueante] Iconos rotos: `BaseLayout.astro:47` carga Material Symbols solo con `icon_names=arrow_back,…,view_in_ar`, pero las secciones usan `open_in_new`, `location_on`, `school`, `verified`, `workspace_premium`, `calendar_today`, `mail` y `home`. Como esos no se descargan, se ve el nombre del icono en texto. → Agregarlos a `icon_names`, en orden alfabético. Mejor aún: centraliza la lista en una constante que usen el layout y los componentes, para que no se vuelva a desincronizar.
2. [bloqueante] `src/components/sections/Contact.astro:92`: `mailto:contact@osmanherrera.com` es un correo **equivocado**: el real es `contact@osmanherrera.dev`. Además está escrito a mano. → Tomar el correo del config. Exporta `CONTACT_EMAIL` o agrega `contact.email` al config.
3. [bloqueante] Imágenes de proyectos inexistentes. El reporte dice que se copiaron "capturas de proyectos", pero `public/assets/images/` solo contiene la foto de perfil. Las 4 tarjetas muestran el alt como texto sobre un recuadro negro. → Crear en `public/assets/images/projects/` 4 placeholders SVG en estilo Apex Dossier (rejilla, título del proyecto y "CAPTURA PENDIENTE"), apuntar el config a esos archivos y declararlo en el reporte. Yo proveeré las capturas reales después.
4. [bloqueante] Textos escritos a mano en componentes, contra la regla 5 y el criterio global. → Mover todos al config (`projects.filterAria`, `formation.kicker`, `formation.educationTitle`, `formation.certificatesTitle`, `experience.kicker`, `contact.kicker`, `contact.subtitle`, `contact.intro`, `contact.channelsTitle`, `contact.formTitle`, `privacyPolicy.lastUpdatedLabel`…):
   - `Projects.astro:46`;
   - `Formation.astro:23, 33, 58`;
   - `Experience.astro:25`;
   - `Contact.astro:24, 26-29, 38-41, 47, 77`;
   - `PrivacyView.astro:32-34` (etiqueta "Última actualización" con un ternario por idioma).
5. [bloqueante] `Projects.astro:108`: `// {project.category.toUpperCase()}` muestra el id interno (`MODULOS`, `DISENO`, sin tildes y sin traducir). → Mostrar la etiqueta del filtro correspondiente: `projects.filters.find(f => f.id === project.category).label`.
6. [menor] `PrivacyView.astro:25`: la fecha `new Date(2026, 4, 28)` está en la vista y duplica `privacyPolicy.lastUpdated`, que queda sin uso. → Guardar en el config `privacyPolicy.lastUpdatedDate: '2026-05-28'` y la etiqueta `Localized`, y quitar el string viejo.
7. [menor] Clases que no existen en el preset y no hacen nada:
   - `font-headline-md text-headline-md` (`Projects.astro:112`, `PrivacyView.astro:79` y posiblemente otras);
   - `p-space-2xl` (`PrivacyView.astro:63`).

   → Usar `headline-sm` o `headline-lg`, o agregar `headline-md` al preset si hace falta un tamaño intermedio (p. ej. 22px/26px, Space Grotesk 600), y usar tokens existentes de spacing.
8. [menor] `Contact.astro:57-60`: los iconos sociales son `<img>` de SVG oscuros sobre fondo oscuro, y casi no se ven en la captura. → Usar la técnica `.icon-mask` de la sección de tecnologías, igual que en el perfil.
9. [menor] Arrastrado de la fase 3, punto 3: `.chamfer-border` no dibuja la diagonal. → En el preset:
   ```js
   '.chamfer-border': { position: 'relative', 'clip-path': '…mismo polígono…' },
   '.chamfer-border::after': {
     content: '""', position: 'absolute', top: '0', right: '0', width: '10px', height: '10px',
     background: 'linear-gradient(to top right, transparent calc(50% - 1px), var(--chamfer-line, theme(colors.outline-variant)) calc(50% - 1px), var(--chamfer-line, theme(colors.outline-variant)) calc(50% + 1px), transparent calc(50% + 1px))',
     'pointer-events': 'none',
   },
   ```
   Para el hover, cambia `--chamfer-line`. En `Button`, no apliques `chamfer` y `chamfer-border` a la vez.
10. [menor] Hay contenido nuevo inventado por el agente, que el usuario debe aprobar: "Inicia una conversación o consulta disponibilidad…", "¿Tienes en mente un desarrollo web, arquitectura de frontend…?" y los kickers de formación, experiencia y contacto. → Al moverlos al config (punto 4), lístalos en "Traducciones a revisar", bajo el título "Textos nuevos a aprobar".
11. [menor] El reporte `fase-04.md` no sigue la plantilla: faltan "Criterios de la fase", "Desviaciones del prompt", "TODO de contenido" y "Traducciones a revisar". Afirma que se copiaron capturas que no existen. Además, `src/components/RichText.astro` (alias de `ui/RichText.astro`) no está declarado como desviación. → Completa las secciones en `## Correcciones` y usa la plantilla completa desde ahora.
12. [info] `Projects.astro:207`: el listener `astro:page-load` sobra, porque no hay View Transitions, y ejecutaría la función dos veces si se activan. → Quítalo o reemplázalo por un guard.
13. [info] `Contact.astro:87`: agrega un punto final después de `contactForm.note`, pero el texto ya forma una frase. Es un detalle menor.

## TODO para el usuario
- Descripciones del módulo de reclutamiento y de francisherrera.com (hoy se ve "TODO: confirmar" en las tarjetas) y URL exacta del módulo.
- ¿Fundación Prolancho sigue en AWS EC2 o se mudó a Hetzner?
- Capturas reales de los 4 proyectos (webp, ~1200×750).
- Aprobar los textos nuevos del punto 10 cuando Gemini los liste.

## Nota: sesión interrumpida
La sesión anterior de Gemini se cortó (límite de cuota) a mitad de estas correcciones. Quedaron cambios **sin commit** en `Button.astro`, `shared/config/site.types.ts` y `shared/tailwind.preset.js`.

La nueva sesión debe:
1. Ejecutar primero `git status` y `git diff` para ver ese trabajo parcial.
2. **Conservarlo**, porque va en la dirección correcta: `.chamfer-border` con la diagonal real, `headline-md` en el preset y el Button sin doble chamfer.
3. Completar en `site.config.ts` los campos que los tipos ya exigen: `projects.filterAria`, los kickers y títulos de formación, experiencia y contacto, `contact.*`, `privacyPolicy.lastUpdatedDate` y `lastUpdatedLabel`. Hasta entonces, `astro check` falla.
4. Punto 9: en el plugin, usa `theme('colors.outline-variant')` desde JS, porque `theme` ya está desestructurado. No uses la función CSS `theme(...)` dentro del string.
5. Aplicar también la sección 4 de `docs/handoff/contenido-usuario.md` (drafrancisherrera.com).
6. Seguir con el resto de los puntos y hacer un solo commit de correcciones.

## Re-revisión (28bede6)
Verificación: `astro check` 0 errors; `build` 4 páginas. Playwright sobre `dist` (`/` a 1440px, `/en/` a 375px, `/en/privacy-policy`):
- **0 respuestas 4xx** y 0 errores de consola;
- sin scroll horizontal y 1 `<h1>` por página;
- todos los `mailto:` apuntan a `contact@osmanherrera.dev`.

Revisé la captura: los iconos se ven, los placeholders cargan y el chaflán de los botones ghost dibuja la diagonal.

1. ✅ Todos los iconos usados en `src/` están en `MATERIAL_ICONS`, que alimenta `icon_names`.
2. ✅ Correo correcto, tomado de `contact.email`.
3. ✅ 4 placeholders SVG. Ya no hay 404.
4. ✅ No quedan objetos `{ es, en }` escritos a mano en `src/`.
5. ✅ La categoría usa la etiqueta del filtro (MÓDULOS/MODULES).
6. ✅ `lastUpdatedDate` + `lastUpdatedLabel`.
7. ✅ `headline-md` agregado al preset; se eliminó `p-space-2xl`.
8. ✅ Iconos sociales con `icon-mask`.
9. ✅ `.chamfer-border` con `::after` diagonal y `--chamfer-line`. Además, `Button` ya no duplica el chamfer.
10. ✅ Textos nuevos listados. Pendientes de aprobación del usuario, con 2 ajustes sugeridos abajo.
11. ✅ Reporte completo.
12. ✅ Listener eliminado.
13. ✅
- ✅ drafrancisherrera.com aplicado; no queda ningún `francisherrera.com` en `src/`, `public/` ni `shared/config/`.

### Observaciones menores (aplicar en la fase 5)
14. [menor] `contact.intro`: el español dice "diseño gráfico especializado" y el inglés "custom vector design", así que no dicen lo mismo. → en: `Have a web development project, frontend architecture, or specialized graphic design in mind? Reach out through any of my channels or send a message.`
15. [menor] `formation.kicker.en`: "ACADEMIA" no es natural en inglés. → `ACADEMICS // TECHNICAL CERTIFICATIONS`.
16. [info] Los placeholders SVG repiten dentro de la imagen el título y las tecnologías de cada proyecto, y el texto está solo en español. Como se reemplazarán por capturas reales, no hace falta tocarlos.

Fase 4 cerrada, sujeta a que el usuario apruebe los textos nuevos. Puede avanzar a la fase 5.

<!-- VEREDICTO: APROBADA CON OBSERVACIONES -->
