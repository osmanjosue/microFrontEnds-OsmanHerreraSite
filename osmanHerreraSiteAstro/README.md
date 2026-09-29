# Osman Herrera Site — Astro SSG

Sitio web personal y portafolio profesional unificado de Osman Herrera, construido con **Astro 7 (SSG)**, **TypeScript** y **Tailwind CSS 3** con el sistema de diseño técnico **Apex Dossier**.

---

## 1. Estructura del Proyecto

```text
osmanHerreraSiteAstro/
├── public/                      # Assets estáticos servidos directamente
│   ├── assets/                  # Iconos y capturas del portafolio web
│   │   ├── icons/               # SVGs de tecnologías y redes
│   │   └── images/projects/     # Capturas optimizadas WebP de proyectos
│   └── vectorwork/              # Assets estáticos de Vector Work
│       ├── data/titles.json     # Títulos reales protegidos (fuera de git)
│       └── works/               # WebPs generados (vector, thumb, outline, original)
├── scripts/
│   └── vector/                  # Pipeline de procesamiento de arte vectorial
│       ├── source/              # Fuentes editables SVG + PNG/JPG (ignorado por git)
│       ├── build-assets.mjs     # Generador de WebP (2400px, thumb, outline) y stats
│       ├── svg-analyzer.mjs     # Analizador de trazados, anclas, colores y artboard
│       ├── test-assets-fixture.mjs # Suite de pruebas de análisis SVG
│       └── verify-all-ui.mjs    # Pruebas visuales automatizadas Playwright
├── src/
│   ├── components/              # Componentes de UI, layout, secciones y React island
│   │   ├── islands/             # ContactForm.tsx (isla interactiva hidratada)
│   │   ├── layout/              # Header, Footer, MobileNav
│   │   ├── sections/            # Hero, Experience, Projects, Skills, Contact
│   │   └── ui/                  # Button, Card, Chip, RichText, Toast
│   ├── layouts/                 # BaseLayout.astro (metadatos, fuentes, tema, SEO)
│   ├── lib/
│   │   ├── contact/             # Cliente de envío hacia la API de correo
│   │   └── vector/              # Visor interactivo de Vector Work (slider, grid, stats)
│   ├── pages/                   # Enrutamiento estático bilingüe de Astro
│   │   ├── [lang]/              # Rutas dinámicas bilingües (/ y /en/)
│   │   ├── 404.astro            # Página 404 estática con fallback bilingüe
│   │   ├── index.astro          # Raíz en español
│   │   ├── politicadeprivacidad.astro # Política de privacidad (ES)
│   │   └── vectorwork/          # Catálogo Vector Work (/vectorwork/)
│   ├── styles/                  # global.css y tokens Apex Dossier
│   └── views/                   # HomeView, VectorView, PrivacyView
├── astro.config.mjs             # Configuración de Astro e internacionalización
├── package.json                 # Scripts y dependencias del workspace
└── tsconfig.json                # Configuración de TypeScript con alias @shared y @config
```

---

## 2. Comandos Disponibles

Desde la raíz del monorepo o dentro de `osmanHerreraSiteAstro/`:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:4321/` |
| `npm run build` | Compila el sitio estático para producción en `dist/` |
| `npm run preview` | Previsualiza el contenido compilado de `dist/` localmente |
| `npm run check` | Ejecuta `astro check` para validar tipado estricto en `.astro` y `.ts` |
| `npm run assets` | Procesa las fuentes vectoriales en `scripts/vector/source/` y genera los WebP |
| `npm run assets -- --dry-run` | Valida las piezas vectoriales sin modificar archivos en disco |
| `npm run assets:test` | Ejecuta la suite de pruebas unitarias y fixtures del analizador SVG |
| `npm run verify:ui` | Ejecuta capturas visuales automatizadas con Playwright en modo headless |

---

## 3. Edición de Textos y Traducciones en `shared/config/site.config.ts`

**`shared/config/site.config.ts` es la única fuente de verdad para todo el texto visible del sitio web principal.**

### 3.1. Tipado Bilingüe Obligatorio (`Localized<T>`)
Todo texto visible se define como un objeto con soporte para los idiomas declarados (`es` y `en`):

```typescript
// Texto plano
title: {
  es: 'Desarrollo web con lógica y pasión',
  en: 'Web development with logic and passion',
}
```

> **Garantía en tiempo de compilación:** Si agregas una clave en español y olvidas la correspondiente en inglés (o viceversa), TypeScript y `npm run check` fallarán de inmediato impidiendo el despliegue.

### 3.2. Textos Enriquecidos (`RichText`)
Para fragmentos de texto con formato (resaltados en cian, negritas o enlaces interactivos), se utilizan arrays de segmentos:

```typescript
bio: [
  {
    es: [
      '¡Hola! Soy ',
      { text: 'desarrollador web independiente', highlight: true, bold: true },
      '. Mi fortaleza es una lógica sólida.',
    ],
    en: [
      'Hi! I\'m an ',
      { text: 'independent web developer', highlight: true, bold: true },
      '. My strength is solid logical thinking.',
    ],
  },
]
```

- `{ highlight: true }`: Aplica el color de acento cian (`text-primary-container`).
- `{ bold: true }`: Aplica grosor de fuente semibold (`font-semibold`).
- `{ href: '...' }`: Renderiza un elemento `<a>` interactivo con subrayado.

### 3.3. Uso en Componentes
Para consumir los textos en plantillas Astro:
```astro
---
import { siteConfig, t } from '@config';
const { lang } = Astro.props;
---
<h1>{t(siteConfig.hero.title, lang)}</h1>
```

---

## 4. Cómo Agregar un Proyecto al Portafolio

Para incorporar un nuevo proyecto a la galería técnica de la página principal:

### Paso 1: Generar la Captura WebP
1. Toma una captura limpia del proyecto en resolución **1440 × 900 px** en pantalla de escritorio.
2. Redimensiona y optimiza la imagen a formato **WebP 1200 × 750 px** (relación 16:10). Puedes usar Sharp:
   ```bash
   npx sharp-cli -i captura-original.png -o public/assets/images/projects/mi-proyecto.webp resize 1200 750 --webp-quality 85
   ```
3. Guarda el archivo resultante en `osmanHerreraSiteAstro/public/assets/images/projects/`.

### Paso 2: Registrar el Proyecto en `site.config.ts`
Abre `shared/config/site.config.ts` y añade el nuevo objeto en la lista `projects.items`:

```typescript
{
  id: 'mi-proyecto',
  category: 'web', // 'web' | 'modulos' | 'diseno'
  badge: {
    es: 'PROYECTO DESTACADO',
    en: 'FEATURED PROJECT',
  },
  title: {
    es: 'Nombre del Proyecto',
    en: 'Project Name',
  },
  description: {
    es: 'Descripción breve de la arquitectura, objetivo y desafíos resueltos...',
    en: 'Brief description of architecture, objective, and challenges solved...',
  },
  image: '/assets/images/projects/mi-proyecto.webp',
  technologies: ['Astro', 'TypeScript', 'Tailwind CSS'],
  links: [
    {
      label: { es: 'Demo en Vivo', en: 'Live Demo' },
      url: 'https://mi-proyecto.com',
      icon: '/assets/icons/website.svg',
    },
    {
      label: { es: 'Código Fuente', en: 'Source Code' },
      url: 'https://github.com/osmanjosue/...',
      icon: '/assets/icons/technologies-GitHub.svg',
    },
  ],
  featured: true, // Si es true, aparecerá destacado en el filtro principal
}
```

---

## 5. Cómo Agregar una Pieza a Vector Work

La sección **Vector Work** (`/vectorwork/`) presenta recreaciones vectoriales trazadas a mano comparadas con su imagen raster original.

### Paso 1: Preparar los Archivos Fuente
Guarda los archivos originales en la carpeta local protegida:
`osmanHerreraSiteAstro/scripts/vector/source/` (esta carpeta está ignorada por git y contiene los originales de alta fidelidad):
- **`${slug}.svg`**: SVG exportado de Adobe Illustrator (preferentemente Object IDs = Minimal, trazado manual sin auto-trace).
- **`${slug}-original.{png,jpg,webp}`**: Captura o arte raster original de referencia.

### Paso 2: Generar y Validar los Activos WebP
Ejecuta el script generador desde la raíz o desde la carpeta de Astro:
```bash
# Validar sin escribir archivos en disco (comprueba nodos, colores y arte)
npm run assets -- --dry-run

# Procesar y escribir los WebP optimizados y actualizar stats.json
npm run assets
```
El script generará automáticamente en `public/vectorwork/works/${slug}/`:
- `vector.webp`: Renderizado en alta densidad a 2400px en el lado largo.
- `thumb.webp`: Miniatura cuadrada 320 × 320 px para la cuadrícula del inventario.
- `outline.webp`: Renderizado de la estructura de nodos y curvas Bézier (fondo oscuro `#0d0e13`, trazados cian `#00f0ff` y anclas `#ffb703`).
- `original.webp`: Imagen raster de referencia ajustada para el visor comparativo.
- Actualización de `src/lib/vector/stats.json` con conteos exactos de trazados, anclas y dimensiones de artboard.

### Paso 3: Registrar la Ficha Técnica en `shared/config/vector.config.ts`
Agrega la pieza a la lista `vectorConfig.works`:
```typescript
{
  slug: 'mi-pieza',
  category: 'characters', // 'characters' | 'creatures' | 'logos' | 'apparel'
  original: 'works/mi-pieza/original.webp',
  vector: 'works/mi-pieza/vector.webp',
  outline: 'works/mi-pieza/outline.webp',
  thumb: 'works/mi-pieza/thumb.webp',
  hours: 6,
  brief: {
    es: 'Recreación vectorial de {title} a partir de...',
    en: 'Vector recreation of {title} from...',
  },
  challenge: {
    es: 'Baja resolución original con detalles densos...',
    en: 'Low-resolution original with dense details...',
  },
  technique: {
    es: ['Trazado manual con pluma', 'Separación de tintas planas'],
    en: ['Manual pen tool tracing', 'Spot color ink separation'],
  },
  result: {
    es: 'Ilustración escalable lista para impresión en gran formato.',
    en: 'Scalable illustration ready for large-format printing.',
  },
  tools: ['Illustrator', 'Photoshop'],
}
```

### Paso 4: Título Real Protegido en `titles.json`
> **Importante para SEO y Privacidad:** Para evitar indexación indeseada de nombres o marcas comerciales por motores de búsqueda, los títulos reales **nunca** se colocan en `vector.config.ts`. Residen exclusivamente en el archivo de datos:
> `osmanHerreraSiteAstro/public/vectorwork/data/titles.json`
```json
{
  "mi-pieza": "Nombre Real de la Pieza o Personaje"
}
```
Este archivo y la carpeta `works/` son servidos por Nginx con cabeceras `X-Robots-Tag: noindex` y `Cache-Control: no-cache`.

---

## 6. Por Qué Existe la Dependencia `cookie` en `package.json`

En `osmanHerreraSiteAstro/package.json` se encuentra declarada explícitamente:
```json
"dependencies": {
  "cookie": "^2.0.1"
}
```

### Justificación Técnica:
1. **Conflicto de Hoisting en el Monorepo:** En monorepos basados en npm workspaces, paquetes compartidos o herramientas heredadas (como Express en el backend) dependen de versiones antiguas de `cookie` (p. ej. `cookie@0.7.2`). Al instalar dependencias en la raíz, npm colocaba la versión 0.7.2 en `node_modules/cookie`.
2. **Requerimiento del Prerender de Astro 7:** Durante el proceso de compilación y prerenderizado estático (`astro build`), Astro 7 importa utilidades modernas de manejo de cookies que requieren exports nombrados (como `parseCookie`), disponibles a partir de `cookie >= 2.0.0`. Si Astro resolvía la versión hoisteada en la raíz, el proceso de compilación fallaba con un error de importación.
3. **Resolución:** Declarar `"cookie": "^2.0.1"` como dependencia directa en `osmanHerreraSiteAstro/package.json` garantiza que Astro resuelva la versión moderna compatible en su propio entorno de ejecución sin entrar en conflicto con otras dependencias del repositorio. **No elimines esta dependencia.**
