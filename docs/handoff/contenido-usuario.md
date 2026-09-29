# Contenido confirmado por el usuario

Gemini: aplica estos cambios en `shared/config/site.config.ts` durante la fase 3 y reporta cada bloque en `fase-03.md`. Los datos marcados **PENDIENTE** siguen como `TODO: confirmar` hasta que este archivo se actualice.

## 1. Stats del hero
Reemplaza el arreglo `hero.stats` por:

| value | es | en |
|---|---|---|
| `'3+'` | Años en desarrollo web | Years in web development |
| `'11+'` | Años en diseño gráfico | Years in graphic design |
| `String(TECHNOLOGIES.length)` | Tecnologías | Technologies |

Se **elimina** la stat de proyectos completados.

## 2. Proyectos
- **Etiquetas (badges):**
  - `fundacion-prolancho-web`: `EN PRODUCCIÓN` / `IN PRODUCTION` (ya está);
  - `fundacion-prolancho-reclutamiento` y `francisherrera-com`: `NUEVO` / `NEW`;
  - `vector-work`: sin cambio.
- **Módulo de reclutamiento:**
  - `technologies: ['Angular 20', 'NodeJS', 'MongoDB', 'JWT', 'Cloudinary', 'Hetzner', 'Ubuntu Server']`;
  - descripción y URL: **PENDIENTE**.
- **francisherrera.com:**
  - `technologies: ['React', 'NodeJS']`;
  - descripción: **PENDIENTE**;
  - el sitio fue un trabajo **freelance**: la descripción puede empezar con "Proyecto freelance…" / "Freelance project…".

## 3. Traducciones revisadas (reemplazar el `en` indicado)
| Ruta en el config | Actual | Nuevo |
|---|---|---|
| `profile.bio[0].en` | `Hello! I am an` … `. My strength is strong logic to bring any project to life.` | `Hi! I'm an ` … `independent web developer` … ` and a ` … `lifelong learner` … `. My strength is solid logical thinking that brings any project to life.` |
| `experience.items[0].role.en` | `['Web ', {Developer, highlight}]` | `[{ text: 'Web', highlight: true }, ' Developer']`, para resaltar la misma palabra que en español |
| `experience.items[0].description.en` y `projects.items[0].description.en` | `Website development using Angular 15 frontend and Node.js backend API. …` | `Built the website with an Angular 15 frontend and a Node.js backend API. MongoDB database with Cloudinary for image management. JWT authentication and credential validation for the admin panel. Hosted on AWS EC2 with Ubuntu, NGINX, and PM2.` |
| `experience.items[1].description.en` | `… and launching new products on punctual schedules based on established goals.` | `… and launching new products on schedule to meet established goals.` |
| `experience.subtitle.en` | `Projects and roles I have held` | `Roles and projects I've worked on` |
| `formation.education[0].detail.en` | `UTH • Currently Studying` | `UTH • In progress` |
| `contactForm.note.en` | `I will respond as soon as possible` | `I'll get back to you as soon as possible` |
| `contactForm.errors.emailPattern.en` | `Invalid email format` | `Please enter a valid email address` |
| `contactForm.alerts.error.en` | `Could not send message` | `Your message couldn't be sent. Please try again.` |
| `privacyPolicy.backLabel.en` / `homeLabel.en` | `Back to Home` / `Go to Home` | `Back to home` / `Go to homepage` |
| `privacyPolicy.sections[4].title.en` | `5. Your Rights (Access, Rectification, and Cancellation)` | `5. Your Rights (Access, Correction, and Deletion)` |
| `ui.langToggleAria.es` (español) | `Cambiar idioma a Inglés` | `Cambiar idioma a inglés`: en español los idiomas van en minúscula |

El resto de las traducciones se revisó y queda como está.
