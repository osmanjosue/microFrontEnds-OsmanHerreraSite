# Fase 2: Config central bilingüe y rutas por idioma
- Commit: 60989d8
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `shared/config/i18n.ts` | creado | Constantes de idiomas (`LANGS`, `DEFAULT_LANG`), tipo `Localized<T>`, tabla `ROUTES` y helpers `t()` y `localizedPath()` |
| `shared/config/site.types.ts` | creado | Definición estricta de tipos de contenido bilingüe (`Localized<string>`, `Localized<RichText>`), eliminando `FrameworkSwitch` y agregando `Project`, `UiTexts`, `SeoItem`, etc. |
| `shared/config/site.config.ts` | creado | Fuente única de verdad bilingüe (ES/EN) con guía de mantenimiento al inicio (cómo editar texto, agregar proyecto, agregar idioma) |
| `shared/config/index.ts` | creado | Reexporta utilidades, tipos y datos para acceso unificado |
| `osmanHerreraSiteAstro/src/lib/seo.ts` | creado | Helper `getSeoMetadata()` para tags canónicos, alternate hreflang (es, en, x-default) y og:locale |
| `osmanHerreraSiteAstro/src/views/HomeView.astro` | creado | Componente de vista de Home bilingüe parametrizado por `lang`, con metadatos SEO y script de preservación de `#hash` |
| `osmanHerreraSiteAstro/src/views/PrivacyView.astro` | creado | Componente de vista de Privacidad bilingüe parametrizado por `lang`, con metadatos SEO y script de preservación de `#hash` |
| `osmanHerreraSiteAstro/src/pages/index.astro` | modificado | Envoltorio mínimo (3 líneas) que renderiza `<HomeView lang="es" />` en `/` |
| `osmanHerreraSiteAstro/src/pages/en/index.astro` | creado | Envoltorio mínimo (3 líneas) que renderiza `<HomeView lang="en" />` en `/en/` |
| `osmanHerreraSiteAstro/src/pages/politicadeprivacidad.astro` | creado | Envoltorio mínimo (3 líneas) que renderiza `<PrivacyView lang="es" />` en `/politicadeprivacidad` |
| `osmanHerreraSiteAstro/src/pages/en/privacy-policy.astro` | creado | Envoltorio mínimo (3 líneas) que renderiza `<PrivacyView lang="en" />` en `/en/privacy-policy` |
| `osmanHerreraSiteAstro/astro.config.mjs` | modificado | Configura `i18n` (`locales: ['es', 'en']`, `defaultLocale: 'es'`, `routing.prefixDefaultLocale: false`) y alias `@config` |
| `osmanHerreraSiteAstro/tsconfig.json` | modificado | Registra alias `@config` y `@config/*` hacia `../shared/config` |
| `docs/handoff/fase-02.md` | creado | Reporte de entrega de la Fase 2 |

## Verificación
Comandos ejecutados, con las últimas líneas relevantes de la salida (errores y warnings incluidos, sin resumir).

- `npx astro check`:
```text
Result (21 files): 
- 0 errors
- 0 warnings
- 30 hints
```

- `npm run build:astro`:
```text
> microfrontends-osmanherrera-site@1.0.0 build:astro
> npm run build --prefix osmanHerreraSiteAstro


> osmanherrerasiteastro@0.0.1 build
> astro build

07:33:01 [types] Generated 501ms
07:33:01 [build] output: "static"
07:33:01 [build] mode: "static"
07:33:01 [build] directory: C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro\dist\
07:33:01 [build] Collecting build info...
07:33:01 [build] ✓ Completed in 532ms.
07:33:01 [build] Building static entrypoints...
Browserslist: browsers data (caniuse-lite) is 7 months old. Please run:
  npx update-browserslist-db@latest
  Why you should do it regularly: https://github.com/browserslist/update-db#readme
07:33:01 [vite] ✓ built in 379ms
07:33:01 [vite] ✓ built in 81ms
07:33:01 [build] Rearranging server assets...

 generating static routes 
07:33:01   ├─ /en/privacy-policy/index.html (+14ms) 
07:33:01   ├─ /en/index.html (+6ms) 
07:33:01   ├─ /politicadeprivacidad/index.html (+4ms) 
07:33:01   ├─ /index.html (+4ms) 
07:33:01 ✓ Completed in 87ms.

07:33:01 [build] ✓ Completed in 589ms.
07:33:01 [build] 4 page(s) built in 1.12s
07:33:01 [build] Complete!
```

- Verificación de archivos generados en `dist/`:
```text
dist/index.html true
dist/en/index.html true
dist/politicadeprivacidad/index.html true
dist/en/privacy-policy/index.html true
```

- Prueba de tipado estricto al remover clave `en` en `shared/config/site.config.ts`:
```text
../shared/config/site.config.ts:70:5 - error ts(2741): Property 'en' is missing in type '{ es: string; }' but required in type 'Localized'.

70     availableBadge: {
       ~~~~~~~~~~~~~~

Result (21 files): 
- 1 error
- 0 warnings
- 30 hints
```
*(Tras registrar el error, la clave `en` fue restaurada de inmediato y `astro check` volvió a 0 errores).*

- `npm run dev:astro`:
```text
> microfrontends-osmanherrera-site@1.0.0 dev:astro
> npm run dev --prefix osmanHerreraSiteAstro


> osmanherrerasiteastro@0.0.1 dev
> astro dev

{"message":"connected.","label":"vite","level":"info"}
{"message":"Generated 1ms","label":"types","level":"info"}
{"message":"connected.","label":"vite","level":"info"}
{"message":"Re-optimizing dependencies because vite config has changed","label":"vite","level":"info"}
{"message":" astro  v7.3.5 ready in 911 ms\n┃ Local    http://localhost:4321/\n┃ Network  use --host to expose","label":"SKIP_FORMAT","level":"info"}
{"message":"watching for file changes...","label":null,"level":"info"}
```

## Criterios de la fase
- [x] Crear `shared/config/` con `i18n.ts`, `site.types.ts`, `site.config.ts` e `index.ts`.
- [x] `i18n.ts` define `LANGS`, `type Lang`, `DEFAULT_LANG`, `type Localized<T>`, `t()` y `localizedPath()`.
- [x] `site.types.ts` modela todo el contenido con `Localized`, sin `FrameworkSwitch`, e integra `Project`, `UiTexts`, etc.
- [x] `site.config.ts` migra el contenido completo a bilingüe, incluye bloque inicial de guía, define `routes`, `ui`, `seo`, `projects`, etc.
- [x] Alias `@config` configurado en `tsconfig.json` y `astro.config.mjs`.
- [x] Configuración i18n de Astro en `astro.config.mjs` con `locales: ['es', 'en']`, `defaultLocale: 'es'` y `routing.prefixDefaultLocale: false`.
- [x] Vistas en `src/views/HomeView.astro` y `PrivacyView.astro` recibiendo `lang`.
- [x] Páginas mínimas de 3 líneas para `/`, `/en/`, `/politicadeprivacidad` y `/en/privacy-policy`.
- [x] Helper SEO bilingüe en `src/lib/seo.ts` con `<html lang>`, canonical, hreflang alternos (es, en, x-default) y og:locale.
- [x] Enlaces de idioma sin redirección automática que conservan el `#hash`.
- [x] `astro check` y `build` pasan sin errores, generando las 4 rutas en `dist/`.
- [x] Prueba de fallo de `astro check` al faltar una traducción completada y documentada.

## Desviaciones del prompt
Ninguna.

## TODO de contenido
- `siteConfig.hero.stats[0].value`: `'TODO: confirmar'` (Años de experiencia)
- `siteConfig.hero.stats[1].value`: `'TODO: confirmar'` (Proyectos completados)
- `siteConfig.projects.items[1].description`: `'TODO: confirmar'` (Fundación Prolancho — Módulo de Reclutamiento)
- `siteConfig.projects.items[1].technologies`: `['TODO: confirmar']`
- `siteConfig.projects.items[2].description`: `'TODO: confirmar'` (francisherrera.com)
- `siteConfig.projects.items[2].technologies`: `['TODO: confirmar']`

## Traducciones a revisar
- `siteConfig.seo.en.description`
- `siteConfig.ui.*` (`availableBadge`, `locationLabel`, `langToggleAria`, `viewCertificate`, `menuOpenAria`, `menuCloseAria`, `allFilterLabel`, `viewDetails`)
- `siteConfig.nav.*.label.en`
- `siteConfig.hero.kicker.en`, `hero.stats.*.label.en`, `hero.title.en`, `hero.cta.label.en`
- `siteConfig.profile.status.en`, `profile.focus.en`, `profile.badges.*.en`, `profile.cv.label.en`, `profile.bio[0].en`
- `siteConfig.skills.title.en`
- `siteConfig.projects.title.en`, `projects.subtitle.en`, `projects.kicker.en`, `projects.filters.*.label.en`
- `siteConfig.projects.items[0].badge.en`, `title.en`, `description.en`, `links.*.label.en`
- `siteConfig.projects.items[1].badge.en`, `title.en`, `links.*.label.en`
- `siteConfig.projects.items[2].badge.en`, `links.*.label.en`
- `siteConfig.projects.items[3].badge.en`, `description.en`, `links.*.label.en`
- `siteConfig.formation.title.en`, `formation.certificateLinkLabel.en`
- `siteConfig.formation.education[0].title.en`, `formation.education[0].detail.en`
- `siteConfig.formation.certificates.*.month.en`
- `siteConfig.experience.title.en`, `experience.subtitle.en`
- `siteConfig.experience.items[0].role.en`, `description.en`, `links.*.label.en`
- `siteConfig.experience.items[1].role.en`, `description.en`, `links.*.label.en`
- `siteConfig.contact.title.en`
- `siteConfig.contactForm.name.*.en`, `email.*.en`, `message.*.en`, `errors.*.en`, `submit.en`, `sending.en`, `note.en`, `alerts.*.en`
- `siteConfig.footer.copyright.en`, `credit.en`, `privacyLink.label.en`
- `siteConfig.privacyPolicy.title.en`, `backLabel.en`, `homeLabel.en`, `lastUpdated.en`, `intro.en`
- `siteConfig.privacyPolicy.sections.*.title.en`, `paragraphs.en`, `cards.*.title.en`, `cards.*.text.en`, `bullets.en`
- `siteConfig.privacyPolicy.closing.question.en`, `closing.linkLabel.en`

## Dudas / riesgos
Ninguno. Todas las rutas estáticas y el sistema de tipado bilingüe funcionan según lo esperado.
