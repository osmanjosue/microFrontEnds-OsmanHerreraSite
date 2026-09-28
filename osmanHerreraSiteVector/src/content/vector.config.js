// ===========================================================================
// CONFIGURACIÓN DE CONTENIDO — VECTOR WORK (FUENTE ÚNICA DE VERDAD)
// ===========================================================================
// NOTA IMPORTANTE:
// Los títulos reales de las piezas NO se colocan en este archivo para evitar
// que sean indexados por motores de búsqueda. Los títulos reales residen
// exclusivamente en public/data/titles.json (bloqueado por robots.txt).
// ===========================================================================

export const vectorConfig = {
  ui: {
    // Título genérico por defecto para motores de búsqueda y visitas iniciales
    defaultTitle: {
      es: 'Estudio vectorial #{n}',
      en: 'Vector study #{n}',
    },

    // Identidad y cabecera
    brandName: 'osmanherrera.dev',
    brandSubtitle: {
      es: 'ILUSTRACIÓN VECTORIAL · ILLUSTRATOR Y PHOTOSHOP',
      en: 'VECTOR ILLUSTRATION · ILLUSTRATOR & PHOTOSHOP',
    },
    availability: {
      es: 'DISPONIBLE PARA TRABAJO REMOTO',
      en: 'AVAILABLE FOR REMOTE WORK',
    },
    locationLabel: {
      es: 'UBICACIÓN',
      en: 'LOCATION',
    },
    locationValue: 'SIGUATEPEQUE, HN · GMT-6',

    // Navegación
    nav: {
      vectorWork: { es: 'Vector Work', en: 'Vector Work' },
      devWork: { es: 'Dev Work', en: 'Dev Work' },
      contact: { es: 'Contacto', en: 'Contact' },
    },

    // Encabezado principal del catálogo
    pageTitle: {
      es: 'Vector Work — De Raster a Vector | Osman Herrera',
      en: 'Vector Work — Raster to Vector | Osman Herrera',
    },
    pageHeading: {
      es: 'Vector Work — De Raster a Vector',
      en: 'Vector Work — Raster to Vector',
    },
    pageSubtitle: {
      es: 'Ilustraciones vectoriales trazadas a mano. Selecciona una pieza para comparar el arte original y su versión vectorial.',
      en: 'Hand-traced vector illustrations. Select a piece to compare original and vector.',
    },
    metaDescription: {
      es: 'Portafolio de ilustración vectorial y recreación raster a vector trazada a mano por Osman Herrera.',
      en: 'Vector illustration and hand-traced raster-to-vector showcase by Osman Herrera.',
    },

    // Badges técnicos
    badgeHandTraced: {
      es: 'TRAZADO A MANO · RASTER → VECTOR',
      en: 'HAND-TRACED · RASTER → VECTOR',
    },
    badgeNoAi: {
      es: 'SIN AUTO-TRACE · SIN IA',
      en: 'NO AUTO-TRACE · NO AI',
    },
    vectorRasterChip: {
      es: 'VECTOR + TRAMA RASTER',
      en: 'VECTOR + RASTER TEXTURE',
    },
    vectorRasterTooltip: {
      es: 'Incluye texturas raster (p. ej. semitonos) dentro del vector',
      en: 'Includes raster textures (e.g. halftones) inside the vector',
    },

    // Contador y selecciones
    worksCounter: {
      es: '/ {total} TRABAJOS',
      en: '/ {total} WORKS',
    },
    selectedBadge: {
      es: '#{n} SELECCIONADO',
      en: '#{n} SELECTED',
    },
    previewBadge: {
      es: 'VISTA PREVIA',
      en: 'PREVIEW',
    },

    // Navegación de piezas (PREV / NEXT)
    prev: {
      es: 'ANTERIOR',
      en: 'PREV',
    },
    next: {
      es: 'SIGUIENTE',
      en: 'NEXT',
    },

    // Modos de visualización y slider
    colorMode: {
      es: '● COLOR',
      en: '● COLOR',
    },
    outlineMode: {
      es: '○ OUTLINE',
      en: '○ OUTLINE',
    },
    dragToCompare: {
      es: 'ARRASTRA PARA COMPARAR',
      en: 'DRAG TO COMPARE',
    },
    originalBadge: {
      es: 'ORIGINAL',
      en: 'ORIGINAL',
    },
    vectorBadge: {
      es: 'VECTOR',
      en: 'VECTOR',
    },
    resolutionBadge: {
      es: 'WEBP HD · 2400PX',
      en: 'WEBP HD · 2400PX',
    },
    outlineBadge: {
      es: 'OUTLINE',
      en: 'OUTLINE',
    },
    originalArtPrefix: {
      es: 'Arte original: ',
      en: 'Original art: ',
    },

    // Accesibilidad y tooltips del slider
    viewModeToolbar: {
      es: 'Modo de visualización',
      en: 'Display mode',
    },
    viewOutlineTitle: {
      es: 'Ver trazados vectoriales',
      en: 'View vector paths',
    },
    sliderRegionLabel: {
      es: 'Comparador visual interactivo',
      en: 'Interactive visual comparison',
    },
    sliderRangeAria: {
      es: 'Arrastra para comparar arte original y vector',
      en: 'Drag to compare original and vector',
    },

    // Accesibilidad y tooltips de navegación de piezas
    navPiecesToolbar: {
      es: 'Navegación de piezas',
      en: 'Piece navigation',
    },
    prevTitle: {
      es: 'Pieza anterior (Flecha izquierda)',
      en: 'Previous piece (Left arrow)',
    },
    nextTitle: {
      es: 'Pieza siguiente (Flecha derecha)',
      en: 'Next piece (Right arrow)',
    },

    // Accesibilidad de inventario y cabecera
    inventoryLabel: {
      es: 'Inventario de estudios vectoriales',
      en: 'Vector studies inventory',
    },
    categoryFilterToolbar: {
      es: 'Filtros por categoría',
      en: 'Category filters',
    },
    mainNavAria: {
      es: 'Navegación principal',
      en: 'Main navigation',
    },
    langToggleAria: {
      es: 'Cambiar idioma a {target}',
      en: 'Switch language to {target}',
    },
    anchorsTooltip: {
      es: 'Conteo aproximado de nodos del archivo original',
      en: 'Approximate anchor count from the original file',
    },

    // Métricas analizadas del SVG
    metrics: {
      anchors: {
        es: 'Nodos',
        en: 'Anchor Points',
      },
      paths: {
        es: 'Trazados',
        en: 'Paths',
      },
      colors: {
        es: 'Colores',
        en: 'Colors',
      },
      artboard: {
        es: 'Artboard',
        en: 'Artboard',
      },
      hours: {
        es: 'Horas',
        en: 'Hours',
      },
    },

    // Títulos de las 4 tarjetas técnicas
    cards: {
      brief: {
        es: '1. BRIEF',
        en: '1. BRIEF',
      },
      challenge: {
        es: '2. RETO',
        en: '2. CHALLENGE',
      },
      technique: {
        es: '3. TÉCNICA',
        en: '3. TECHNIQUE',
      },
      result: {
        es: '4. RESULTADO',
        en: '4. RESULT',
      },
    },

    // Fila inferior de herramientas
    toolsLabel: {
      es: 'HERRAMIENTAS:',
      en: 'TOOLS:',
    },

    // Footer
    footer: {
      pipeline: {
        es: 'FLUJO DE TRABAJO DE RASTER A VECTORES ESCALABLES',
        en: 'PRECISION RASTER-TO-SCALABLE VECTOR PIPELINE',
      },
      precision: {
        es: '100% PRECISIÓN BÉZIER',
        en: '100% BEZIER PRECISION',
      },
      copyright: {
        es: '© {year} Osman Herrera. Todos los derechos reservados.',
        en: '© {year} Osman Herrera. All rights reserved.',
      },
      privacyLink: {
        es: 'Política de Privacidad',
        en: 'Privacy Policy',
      },
    },
  },

  categories: [
    { id: 'all', label: { es: 'Todos', en: 'All' } },
    { id: 'characters', label: { es: 'Personajes', en: 'Characters' } },
    { id: 'creatures', label: { es: 'Criaturas', en: 'Creatures' } },
    { id: 'logos', label: { es: 'Logos', en: 'Logos' } },
    { id: 'apparel', label: { es: 'Ropa / Textil', en: 'Apparel' } },
  ],

  // Las piezas NO tienen campo title; los títulos reales residen en titles.json
  works: [
    {
      slug: 'pieza-01',
      category: 'characters',
      original: 'works/pieza-01/original.webp',
      vector: 'works/pieza-01/vector.webp',
      outline: 'works/pieza-01/outline.webp',
      hours: 8,
      brief: {
        es: 'Recreación vectorial de {title} a partir de una ilustración de cómic.',
        en: 'Vector recreation of {title} from a comic book illustration.',
      },
      challenge: {
        es: 'Original de baja resolución (450 px) con entintado denso, salpicaduras y texturas finas.',
        en: 'Low-resolution original (450 px) with dense inking, splatters and fine textures.',
      },
      technique: {
        es: [
          'Trazado manual con pluma de cada forma y salpicadura',
          'Trama de semitonos rasterizada en Photoshop para optimizar peso',
          'Paleta reducida a tintas planas',
        ],
        en: [
          'Manual pen tool tracing of every shape and splatter',
          'Halftone texture rasterized in Photoshop to optimize file weight',
          'Palette reduced to flat inks',
        ],
      },
      result: {
        es: 'Ilustración escalable lista para impresión en gran formato.',
        en: 'Scalable illustration ready for large-format printing.',
      },
      tools: ['Illustrator', 'Photoshop'],
    },
    {
      slug: 'demo-01',
      demo: true,
      category: 'characters',
      original: 'works/demo-01/original.webp',
      vector: 'works/demo-01/vector.webp',
      outline: 'works/demo-01/outline.webp',
      hours: 18,
      brief: {
        es: 'Recreación vectorial para impresión a gran formato de {title}.',
        en: 'Vector recreation for large-format printing of {title}.',
      },
      challenge: {
        es: 'Imagen raster inicial de baja resolución con bordes difusos y degradados complejos.',
        en: 'Low-resolution initial raster image with blurry edges and complex gradients.',
      },
      technique: {
        es: [
          'Trazado manual con herramienta pluma minimizando puntos de ancla',
          'Luces y sombras recreadas con formas sólidas y degradados lineales limpios',
          'Organización modular por capas de color',
        ],
        en: [
          'Manual pen tool tracing minimizing anchor count on curves',
          'Highlights and shadows built with solid geometry and clean linear gradients',
          'Modular color layer organization',
        ],
      },
      result: {
        es: 'Arte final 100% escalable y listo para producción sin artefactos de compresión.',
        en: '100% scalable final artwork ready for production without compression artifacts.',
      },
      tools: ['Illustrator', 'Photoshop'],
    },
    {
      slug: 'demo-02',
      demo: true,
      category: 'creatures',
      original: 'works/demo-02/original.webp',
      vector: 'works/demo-02/vector.webp',
      outline: 'works/demo-02/outline.webp',
      hours: 24,
      brief: {
        es: 'Vectorización precisa y definición geométrica para {title}.',
        en: 'Precise vectorization and geometric definition for {title}.',
      },
      challenge: {
        es: 'Detalles intrincados en textura y contraste lumínico sobre fondo oscuro.',
        en: 'Intricate texture details and luminous contrast over dark background.',
      },
      technique: {
        es: [
          'Ajuste de simetría y curvatura con curvas Bézier de alta precisión',
          'Trama de semitonos rasterizada en Photoshop para optimizar peso y acabado táctico',
          'Separación de planos de profundidad para facilitar serigrafía o estampado',
          'Paleta cromática optimizada y reducida a tonos directos',
        ],
        en: [
          'Symmetry and curvature tuning with high-precision Bézier curves',
          'Halftone texture rasterized in Photoshop to optimize file weight and tactical shading',
          'Depth plane separation for silkscreen and apparel printing',
          'Optimized spot-color palette',
        ],
      },
      result: {
        es: 'Trazados cerrados limpios con optimización de nodos para corte y serigrafía.',
        en: 'Clean closed paths optimized for vinyl cutting and screen printing.',
      },
      tools: ['Illustrator', 'Photoshop'],
    },
    {
      slug: 'demo-03',
      demo: true,
      category: 'logos',
      original: 'works/demo-03/original.webp',
      vector: 'works/demo-03/vector.webp',
      outline: 'works/demo-03/outline.webp',
      hours: 12,
      brief: {
        es: 'Redibujado vectorial de identidad gráfica y emblema para {title}.',
        en: 'Vector redrawing of brand emblem and identity for {title}.',
      },
      challenge: {
        es: 'Logotipo rasterizado extraído de documento escaneado con ruido y distorsión.',
        en: 'Rasterized logo extracted from a scanned document with noise and distortion.',
      },
      technique: {
        es: [
          'Construcción geométrica con guías axiales y compás digital',
          'Uso intensivo de Buscatrazos (Pathfinder) para uniones booleanas exactas',
          'Normalización de grosores de línea y esquinas',
        ],
        en: [
          'Geometric construction using axial guides and digital compass',
          'Intensive Pathfinder boolean operations for exact seams',
          'Stroke weight and corner radius normalization',
        ],
      },
      result: {
        es: 'Emblema geométricamente perfecto, escalable desde favicon hasta vallas publicitarias.',
        en: 'Geometrically perfect emblem, scalable from favicon to billboard.',
      },
      tools: ['Illustrator'],
    },
  ],
};
