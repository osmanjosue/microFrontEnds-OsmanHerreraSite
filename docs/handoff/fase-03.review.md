# Revisión fase 3
- Commit revisado: e5955a6
- Veredicto: APROBADA CON OBSERVACIONES

El layout, el header, el footer y los componentes UI cumplen la fase; los puntos 13 y 14 de la fase 2 y `contenido-usuario.md` quedaron aplicados. Las observaciones son menores: corrígelas **al inicio de la fase 4**, en un commit `Fase 3: corrige observaciones de revisión`, y respóndelas en `## Correcciones` de `fase-03.md`.

## Verificación propia
- `git show --stat e5955a6`: coincide con la tabla. No se tocaron las apps viejas ni `shared/content/`.
- `npx astro check`: 0 errors, 0 warnings, 30 hints. `npm run build`: 4 páginas.
- `contenido-usuario.md`: verificado línea por línea en `site.config.ts` (stats 3+/11+/`TECHNOLOGIES.length`, badges NUEVO/NEW, stack del módulo de reclutamiento y de francisherrera.com, las 12 traducciones). ✓
- Capturas con Playwright sobre `astro preview` (`/` y `/en/` a 1440px, `/` a 375px con el menú abierto, `/en/privacy-policy`):
  - sin scroll horizontal (`scrollWidth` igual al viewport en las 4);
  - sin errores de consola;
  - el toggle ES/EN, la ubicación Siguatepeque y el enlace amber de Vector Work se ven bien.

## Observaciones
1. [menor] `src/components/layout/Header.astro` (script del menú): al abrir el menú, `aria-label` sigue diciendo "Abrir menú de navegación"; `ui.menuCloseAria` no se usa en ningún sitio. Lo verifiqué con Playwright: `aria-expanded="true"` y el label sigue en "Abrir". → Alternar también el `aria-label`. Pasa los dos textos al script con `data-open-label` y `data-close-label`.
2. [menor] `src/components/ui/Button.astro` (variante primary): `text-on-primary-container` (#006970) sobre `#00f0ff` da un contraste de ≈3.9:1. Es menor que 4.5:1, el mínimo para texto de 10px, y hace fallar el criterio Lighthouse ≥ 95. → Usar `text-on-primary-fixed` (#002022) o casi negro, como indica DESIGN.md ("#090a0d black text"). Revisa también los chips y pills activos que usan la misma combinación.
3. [menor] Chamfer en elementos con borde (ghost `Button`, `Card`, `StatTile`): el `clip-path` corta el borde en la esquina y no dibuja la diagonal, así que el borde se ve roto. Se nota en el botón "Política de privacidad" de las capturas. → Agrega al preset una utilidad `.chamfer-border` que dibuje la diagonal con un pseudo-elemento (gradiente lineal de 1px en la esquina, del color del borde) y úsala en las variantes con borde.
4. [menor] `src/components/ui/SectionHeader.astro`: no soporta el formato `NN // TÍTULO` que pide el prompt y que muestra la maqueta ("01 // CAPACIDADES TÉCNICAS"). → Agregar la prop `index?: number` que renderice `String(index).padStart(2, '0') + ' // ' + title`.
5. [menor] `shared/config/i18n.ts` (`linkHref`): recibe un tipo suelto (`{ url?; route? }`) y devuelve `'#'` como respaldo, lo que anula la garantía de la unión `ExperienceLink`. → Tipar el parámetro como `ExperienceLink`, con import de tipo desde `site.types`, y quitar el `'#'`.
6. [menor] `src/components/ui/StatTile.astro`: repite a mano la marca L de esquina en lugar de reutilizar `CornerMarks`. → Agregar a `CornerMarks` una prop `corners?: ('tl'|'tr'|'bl'|'br')[]` y usarla aquí.
7. [menor] `src/views/PrivacyView.astro`: usa `hero.kicker` ("EXP_REF // DOSSIER PROFESIONAL") como kicker de la página de privacidad. → Agregar `privacyPolicy.kicker` al config, bilingüe, al portar la política completa en la fase 4.
8. [info] `HomeView.astro` y `PrivacyView.astro` siguen siendo andamio. En la fase 4:
   - el home debe tener **un único `<h1>`**, el título del hero; hoy la página no tiene ninguno;
   - la política debe mostrar todas sus secciones.
9. [info] El slot `header-actions` ya no hace falta: la fase 6 elimina el toggle propio de Vector Work. Si en la fase 6 sigue sin uso, quítalo.
10. [info] El nav no marca la sección activa, como sí hace la maqueta. Es opcional: un scroll-spy con `IntersectionObserver` en el mismo script del header, con `aria-current`.

## TODO para el usuario
- Módulo de reclutamiento: descripción y URL exacta.
- francisherrera.com: descripción.
- Confirmar si el sitio de Fundación Prolancho sigue en AWS EC2 o se mudó a Hetzner.
