# Contenido pendiente (se completa al final de la migración)

Mientras tanto se quedan como `TODO: confirmar` o placeholder. No bloquean ninguna fase.

| Dato | Dónde | Estado |
|---|---|---|
| Descripción del módulo de reclutamiento (es/en) | `projects.items[1].description` | ✅ completado (texto del usuario; inglés traducido por Claude) |
| URL exacta del módulo de reclutamiento | `projects.items[1].links[0].url` | ✅ completado (`https://fundacionprolancho.org/trabaja-con-nosotros`) |
| Capturas reales de los 4 proyectos (webp ~1200×750) | `public/assets/images/projects/` | ✅ completado (capturas 1440×900 @2x con Playwright → WebP 1200×750; originales PNG en `docs/capturas/`, fuera de git) |
| Aprobar textos nuevos de Gemini | `formation.kicker`, `experience.kicker`, `contact.*`, `contactForm.alerts.close` | pendiente de revisión |
| Aprobar textos de la 404 (es/en) | `notFound.*` en `shared/config/site.config.ts` | pendiente de revisión |
| Ruta real del sitio en el VPS y rutas de certificados SSL | `docs/nginx-astro.md` (`root`, `ssl_certificate*`) | pendiente (hoy `/var/www/osmanherrera-site/...` supuesto) |
