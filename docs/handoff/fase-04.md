# Fase 4: secciones del home y política de privacidad completa
- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `osmanHerreraSiteAstro/public/assets/` | creado / copiado | Copia íntegra de activos de `osmanHerreraSiteReact/public/assets/` (iconos y capturas de proyectos). |
| `osmanHerreraSiteAstro/src/styles/global.css` | modificado | Añadida la regla `.icon-mask` (máscara CSS para colorear SVG en cian neón) y `section[id] { scroll-margin-top: 80px; }`. |
| `osmanHerreraSiteAstro/src/components/ui/RichText.astro` | creado | Renderizador de fragmentos `RichText` con soporte de `highlight` (`text-primary-container`), `bold` y `href`. |
| `osmanHerreraSiteAstro/src/components/RichText.astro` | creado | Alias y re-export directo de `RichText` en `src/components/` para satisfacer la ruta descrita en las especificaciones. |
| `osmanHerreraSiteAstro/src/components/sections/Hero.astro` | creado | Sección `#hero`: contiene el único `<h1>` del home, kicker, título enriquecido, badges, bio con `RichText`, foto de perfil, stats telemétricos y CTAs. |
| `osmanHerreraSiteAstro/src/components/sections/Technologies.astro` | creado | Sección `#technologies`: rejilla de habilidades técnicas con SVGs coloreados con la técnica `.icon-mask` e índice `01`. |
| `osmanHerreraSiteAstro/src/components/sections/Projects.astro` | creado | Sección `#projects`: portafolio con filtro por categoría interactivo mediante script Astro (TS), contadores precalculados en build time, tarjetas con chamfer y soporte de enlaces internos (`linkHref` a Vector Work) y externos. Índice `02`. |
| `osmanHerreraSiteAstro/src/components/sections/Formation.astro` | creado | Sección `#formation`: tarjetas de educación superior formal y cuadrícula de certificaciones profesionales con enlaces verificables. Índice `03`. |
| `osmanHerreraSiteAstro/src/components/sections/Experience.astro` | creado | Sección `#experience`: cronología de puestos, roles con `RichText`, tecnologías empleadas y enlaces a repositorios y sitios web. Índice `04`. |
| `osmanHerreraSiteAstro/src/components/sections/Contact.astro` | creado | Sección `#contact`: canales directos de comunicación (LinkedIn, WhatsApp, correo, GitHub) y contenedor técnico preparado para la isla del formulario de Fase 5. Índice `05`. |
| `osmanHerreraSiteAstro/src/views/HomeView.astro` | modificado | Compone de forma limpia las 6 secciones (`Hero`, `Technologies`, `Projects`, `Formation`, `Experience`, `Contact`) bajo `BaseLayout`. |
| `osmanHerreraSiteAstro/src/views/PrivacyView.astro` | modificado | Migración completa de la política de privacidad de React con formateo dinámico de fechas mediante `Intl.DateTimeFormat(lang)`, secciones numeradas, tarjetas técnicas y canal de cierre. |

## Detalles de implementación

### 1. Secciones del Home y Anclas Hash
- Se implementaron las 6 secciones requeridas en `src/components/sections/` con sus IDs estables y universales: `hero`, `technologies`, `projects`, `formation`, `experience`, `contact`. Los IDs no se traducen para garantizar que los enlaces `#hash` funcionen de manera idéntica en español e inglés.
- Se configuró `scroll-margin-top: 80px` en `global.css` para compensar la altura del header fijo durante el desplazamiento fluido entre secciones.

### 2. Portafolio de Proyectos y Filtro Interactivo
- Los 4 proyectos definidos en `site.config.ts` se renderizan con tarjetas chamfered e interactividad:
  - **Fundación Prolancho — Sitio web** (`web`)
  - **Fundación Prolancho — Módulo de Reclutamiento** (`modulos`)
  - **francisherrera.com** (`web`)
  - **Vector Work** (`diseno`): enlaza internamente a `localizedPath('vectorwork', lang)` mediante la función `linkHref`.
- El filtro por categorías no requiere dependencias externas; un script cliente nativo en TypeScript gestiona la visibilidad (`hidden`) de los elementos `[data-category]` y actualiza el estado accesible `aria-pressed` de los botones de filtrado.
- Los contadores de cada categoría (`[Todos 4]`, `[Web 2]`, `[Módulos 1]`, `[Diseño 1]`) se precalculan durante el build de Astro.

### 3. Iconos y Estilos Técnicos
- Se migraron los 25 archivos de medios desde `osmanHerreraSiteReact/public/assets/` a `osmanHerreraSiteAstro/public/assets/`.
- La sección de tecnologías aplica la técnica `.icon-mask` vía CSS `mask-image` y variables CSS (`--icon-url`), tiñendo de cian neón (`#00f0ff`) los SVGs originales sin requerir inline SVGs ni fuentes adicionales.

### 4. Política de Privacidad Bilingüe
- Se migró toda la estructura de `PrivacyPolicy.tsx` a `PrivacyView.astro`.
- La fecha de actualización se genera dinámicamente mediante `Intl.DateTimeFormat(lang === 'es' ? 'es-HN' : 'en-US', ...)`.
- Se integraron las secciones de tarjetas de información técnica y viñetas con resaltado sintáctico mediante `RichText.astro`.

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
08:22:28 [build] 4 page(s) built in 1.28s
08:22:28 [build] Complete!

generating static routes 
  ├─ /en/privacy-policy/index.html (+17ms) 
  ├─ /en/index.html (+11ms) 
  ├─ /politicadeprivacidad/index.html (+5ms) 
  ├─ /index.html (+5ms) 
```

## Pendientes / Siguiente Fase (Fase 5)
- Desarrollar la isla interactiva `ContactForm.tsx` con React (`client:visible`), `react-hook-form` y conexión a la API backend.
- Mantener las descripciones pendientes con `TODO: confirmar` hasta que el usuario decida actualizarlas.
