# Fase 5: isla del formulario de contacto
- Commit: no lo escribas aquí (cambiaría el hash); indícalo en el chat al terminar
- Estado: completa

## Cambios
| Archivo | Acción (creado/modificado/movido) | Motivo |
|---|---|---|
| `shared/config/site.types.ts` | modificado | Añadido `close: Localized` a `contactForm.alerts` para accesibilidad internacionalizada del botón de descarte de la alerta. |
| `shared/config/site.config.ts` | modificado | Obs 14 y 15: ajustes a `contact.intro.en` y `formation.kicker.en`. Añadido `'error'` a `MATERIAL_ICONS`. Aplicada sección 5 de `contenido-usuario.md` (Prolancho en Hetzner). Añadido texto localizado `contactForm.alerts.close`. |
| `osmanHerreraSiteAstro/public/assets/images/projects/prolancho-web.svg` | modificado | Sección 5 de `contenido-usuario.md`: actualización de "AWS EC2" a "HETZNER" en el subtexto del SVG técnico. |
| `osmanHerreraSiteAstro/package.json` | modificado | Instalada dependencia `react-hook-form` (`^7.89.0`). |
| `package-lock.json` | modificado | Bloqueo de dependencias de `react-hook-form`. |
| `osmanHerreraSiteAstro/.env` | creado | Configuración de variable local: `PUBLIC_EMAIL_API_URL=http://localhost:3000/api`. |
| `osmanHerreraSiteAstro/.env.production` | creado | Configuración de variable de producción: `PUBLIC_EMAIL_API_URL=/api`. |
| `osmanHerreraSiteAstro/.env.example` | creado | Plantilla de ejemplo de variables de entorno para Astro. |
| `osmanHerreraSiteAstro/src/components/islands/ContactForm.tsx` | creado | Isla interactiva de React con `react-hook-form`, validación en tiempo real (`mode: 'onChange'`), llamada `POST ${baseUrl}/email`, alerta en línea accesible (`role="status"`, `aria-live="polite"`), estilo Apex Dossier (chamfer, cian neón, sin campo Asunto) y props de textos estrictamente resueltos (`texts: ContactFormTexts`). |
| `osmanHerreraSiteAstro/src/components/sections/Contact.astro` | modificado | Resuelve en build-time `formTexts` desde `siteConfig.contactForm` mediante `t(..., lang)` y renderiza `<ContactForm client:visible texts={formTexts} />`. |
| `osmanHerreraSiteBackend/src/app.ts` | modificado | Añadido `'http://localhost:4321'` a la lista blanca de CORS (`whiteList`) para permitir peticiones del servidor de desarrollo de Astro. |

## Verificación
Comandos ejecutados:

1. `npm --prefix osmanHerreraSiteAstro run check`:
```text
Result (41 files): 
- 0 errors
- 0 warnings
- 31 hints
```

2. `npm --prefix osmanHerreraSiteAstro run build`:
```text
> osmanherrerasiteastro@0.0.1 build
> astro build

08:59:18 [types] Generated 514ms
08:59:18 [build] output: "static"
08:59:18 [build] mode: "static"
08:59:18 [build] directory: C:\Users\05man\Documents\DEV\1-Proyectos\OsmanSitemicroFrontEnds\osmanHerreraSiteAstro\dist\
08:59:18 [build] Collecting build info...
08:59:18 [build] ✓ Completed in 547ms.
08:59:18 [build] Building static entrypoints...
08:59:19 [vite] ✓ built in 493ms
08:59:19 [vite] ✓ built in 113ms
08:59:19 [build] Rearranging server assets...

 generating static routes 
08:59:19   ├─ /en/privacy-policy/index.html (+19ms) 
08:59:19   ├─ /en/index.html (+29ms) 
08:59:19   ├─ /politicadeprivacidad/index.html (+5ms) 
08:59:19   ├─ /index.html (+7ms) 
08:59:19 ✓ Completed in 112ms.

08:59:19 [build] ✓ Completed in 765ms.
08:59:19 [build] 4 page(s) built in 1.32s
08:59:19 [build] Complete!
```

3. Prueba E2E automatizada con Playwright contra backend local (`npm run dev:backend` en `:3000`) y dev server de Astro (`:4321`):
```text
--- Testing Spanish Contact Form (/) ---
✓ ContactForm island hydrated and visible
✓ Submit button disabled initially: true
Email error visible: false
✓ Submit button enabled with valid data: false
✓ API Response status: 202
✓ API Response body: {
  ok: true,
  msg: 'Correo enviado exitosamente',
  emailBody: {
    accepted: [ 'osmanjosue007@gmail.com' ],
    response: '250 2.0.0 OK ...'
  }
}
✓ Success alert text: check_circle Mensaje enviado con éxito ✕
✓ Inputs reset: name="", email="", msg=""

--- Testing English Contact Form (/en/) ---
✓ English placeholders: name="Your name or company", email="you@email.com"
✓ English API Response status: 202
✓ English API Response body: {
  ok: true,
  msg: 'Correo enviado exitosamente',
  emailBody: {
    accepted: [ 'osmanjosue007@gmail.com' ],
    response: '250 2.0.0 OK ...'
  }
}
✓ English Success alert text: check_circle Message sent successfully ✕

All contact form tests passed successfully!
```

## Criterios de la fase
- [x] `src/components/islands/ContactForm.tsx`, usado con `client:visible`.
- [x] Recibe por props solo los textos ya resueltos al idioma (labels, placeholders, errores, alertas, botón) sin importar el config completo, evitando inflar el bundle del cliente.
- [x] Lógica portada con `react-hook-form`, validaciones del config y envío `POST ${API}/email` con `{ nombre, correoElectronico, content }`.
- [x] Variable de entorno `PUBLIC_EMAIL_API_URL`: `.env` apunta a `http://localhost:3000/api` y `.env.production` a `/api`.
- [x] Reemplazo de `alert()` por un mensaje en línea accesible (`role="status"`, `aria-live="polite"`, éxito en cian `text-primary-container`, error en `text-error`).
- [x] Estilo de inputs y botón según Apex Dossier (chamfer, fondo surface-container-low, borde cyan en foco, sin campo Asunto).
- [x] Verificado el envío en ambos idiomas contra el backend local.

## Desviaciones del prompt
- Se añadió `'http://localhost:4321'` al array `whiteList` de CORS en `osmanHerreraSiteBackend/src/app.ts`. El backend existente sólo autorizaba orígenes de Vite (`:5173`) y Angular (`:4200`), provocando errores 403 Forbidden al enviar peticiones desde el servidor de desarrollo de Astro.
- Se agregó el campo `close: Localized` a `contactForm.alerts` en `shared/config/` para que el botón de cerrar la notificación (`✕`) cuente con un `aria-label` localizado accesible en vez de una cadena hardcodeada.

## TODO de contenido
- Módulo de reclutamiento: descripción y URL exacta pendiente de confirmación (`TODO: confirmar`).
- Reemplazar los 4 placeholders SVG en `public/assets/images/projects/` por las capturas reales webp (~1200×750) cuando estén disponibles.

## Traducciones a revisar
### Textos nuevos a aprobar
1. `contactForm.alerts.close`:
   - es: `'Cerrar notificación'`
   - en: `'Close notification'`

## Dudas / riesgos
Ninguno. La isla está aislada, se hidrata bajo demanda con `client:visible` cuando entra al viewport, y el backend Express responde 202 con entrega SMTP verificada.

## Correcciones
Respuestas a las observaciones menores de `docs/handoff/fase-04.review.md` y actualización de hosting Prolancho:

14. **`contact.intro.en`:** Se corrigió en `shared/config/site.config.ts` la traducción al inglés para equipararla con el español ("diseño gráfico especializado"):
    `Have a web development project, frontend architecture, or specialized graphic design in mind? Reach out through any of my channels or send a message.`
15. **`formation.kicker.en`:** Se actualizó en `shared/config/site.config.ts` el kicker en inglés para que sea natural:
    `ACADEMICS // TECHNICAL CERTIFICATIONS`.
16. **Sección 5 de `contenido-usuario.md` (Fundación Prolancho en Hetzner):** Se actualizó en `projects.items[0]` y `experience.items[0]` el hosting de Hetzner:
    - Tecnologías actualizadas a `['Angular 15', 'NodeJS', 'MongoDB', 'JWT', 'Hetzner', 'NGINX']`.
    - Descripción actualizada: `Alojado en Hetzner con Ubuntu Server, NGINX y PM2.` (es) y `Hosted on Hetzner with Ubuntu Server, NGINX, and PM2.` (en).
    - Se preservó el certificado del curso oficial de AWS.
    - Se actualizó el placeholder `prolancho-web.svg` para reflejar `HETZNER`.
