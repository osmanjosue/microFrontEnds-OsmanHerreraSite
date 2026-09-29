# Revisión fase 2
- Commit revisado: c359ad6 (el reporte dice `60989d8`, que es el commit anterior al `--amend`)
- Veredicto: REQUIERE CORRECCIONES

La estructura está bien resuelta: `Localized`, rutas, SEO y vistas por idioma. Pero `site.config.ts` tiene un dato inventado y textos en español sin traducir. La fase 3 se construye sobre este config, así que hay que corregirlo antes de avanzar.

## Verificación propia
- `git show --stat c359ad6`: los 14 archivos coinciden con la tabla. No se tocaron las apps viejas ni `shared/content/`. ✓
- `npx astro check`: 0 errors, 0 warnings, 30 hints.
- `npm run build`: 4 páginas: `/index.html`, `/en/index.html`, `/politicadeprivacidad/index.html` y `/en/privacy-policy/index.html`. ✓
- `dist/en/privacy-policy/index.html`: `<html lang="en">`, canonical y `hreflang` es/en/x-default con URLs absolutas correctas. ✓
- Re-revisión de la fase 1: todos los puntos corregidos (ver `fase-01.review.md`).

## Observaciones
1. [bloqueante] `shared/config/site.config.ts:75-76, 137-138`: la ubicación "Tegucigalpa, Honduras • UTC-6" es **inventada**. El dato real está en `osmanHerreraSiteVector/src/content/vector.config.js:32`: `SIGUATEPEQUE, HN · GMT-6`. → Corregir. Además, `ui.locationLabel` debe ser la etiqueta (`UBICACIÓN` / `LOCATION`) y el valor debe vivir en un solo lugar (`hero.location`), no duplicado.
2. [bloqueante] `shared/config/site.config.ts:382`: el enlace del proyecto Vector Work es `url: '/vectorwork/'` fijo, así que en `/en/` lleva a la versión en español. → Permitir en el tipo del link `route?: RouteKey` como alternativa a `url`, y usar `route: 'vectorwork'`. `vectorWorkLink` ya lo hace bien con `targetRoute`.
3. [bloqueante] Hay textos visibles que no son `Localized` y saldrían en español en `/en/`. → Pasarlos a `Localized`:
   - `formation.education[].platform` (`'UNIVERSIDAD'`);
   - `experience.items[].company` (`'Empresa de Diseño y Estampado'`);
   - `experience.items[1].technologies` (`'Diseño Gráfico'`, `'Gestión de Equipos'`, `'Serigrafía'`, `'Sublimación'`): cambia el tipo a `(string | Localized)[]` o a `Localized<string[]>`;
   - de paso, corrige la errata `'Ilustrator'` → `'Illustrator'`.

   Los títulos de los certificados son nombres oficiales de cursos: se quedan en su idioma original, con `string`.
4. [menor] `site.config.ts` (`hero.stats[2].value: '15'`): el valor está escrito a mano. El prompt pide calcularlo. → Define `const TECHNOLOGIES = [...]` arriba, úsalo en `skills.technologies` y en el stat pon `String(TECHNOLOGIES.length)`.
5. [menor] En inglés, "Prolancho Foundation" traduce un nombre propio. → Usa "Fundación Prolancho" en ambos idiomas. En la descripción inglesa puede decir "Fundación Prolancho (non-profit)" si hace falta contexto.
6. [menor] `theme.scrollColors` es del diseño viejo, con el gradiente naranja→morado. Apex Dossier no lo usa. → Eliminarlo del config y de los tipos.
7. [menor] Hay textos duplicados en el config: `ui.allFilterLabel` repite `projects.filters[0].label`, y `ui.viewCertificate` repite `formation.certificateLinkLabel`. → Dejar uno solo de cada par. La meta es una fuente por dato.
8. [menor] `src/lib/seo.ts:31`: `baseUrl` está escrito a mano. → Usar `import.meta.env.SITE`, que Astro toma de `site` en `astro.config.mjs`, para no tener la URL en dos sitios.
9. [menor] `ROUTES` está en `i18n.ts` y no en `site.config.ts`, como pedía el prompt; el config lo reexporta. Es razonable, porque `localizedPath()` lo necesita, pero no está declarado. → Anotarlo en Desviaciones.
10. [info] `HomeView.astro` y `PrivacyView.astro` duplican el `<head>`, el toggle y el script del hash, y tienen el texto `Apex Dossier //` escrito a mano. Es aceptable como andamio de esta fase. → En la fase 3 todo eso debe pasar a `BaseLayout.astro` y no debe quedar texto escrito a mano.
11. [info] Los meses de los certificados son `Localized` escritos a mano. Es válido. Alternativa más limpia para la fase 4: guardar `month: 1..12` y formatear con `Intl.DateTimeFormat(lang, { month: 'long' })`. Es opcional.
12. [proceso] Hash del reporte: el `--amend` cambió el hash de `60989d8` a `c359ad6`. → Desde ahora, **no escribas el hash en el reporte**; indícalo solo en el chat (ya actualicé la plantilla del prompt). No hace falta corregir `fase-02.md`.

## TODO para el usuario
- **Stats del hero:** años de experiencia y cantidad de proyectos.
- **Módulo de reclutamiento:** descripción, tecnologías y URL exacta.
- **francisherrera.com:** descripción y tecnologías.
- **Badges inventados por el agente, por confirmar:** `CLIENTE` para francisherrera.com, `MÓDULO INTERNO` para reclutamiento y la etiqueta "Tecnologías **Dominadas**" / "Technologies **Mastered**". Si no aplican, usar algo neutro ("Tecnologías").
- **Revisar las traducciones al inglés** (lista completa en `fase-02.md`, "Traducciones a revisar"). Las más visibles:
  - bio: "My strength is strong logic to bring any project to life";
  - título universitario: "Associate Degree in Computer Application Development";
  - rol: "Web Developer".
