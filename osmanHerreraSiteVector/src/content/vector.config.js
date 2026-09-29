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
    hoursUnit: {
      es: { one: 'HR', other: 'HRS' },
      en: { one: 'HR', other: 'HRS' },
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
      thumb: 'works/pieza-01/thumb.webp',
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
      slug: 'pieza-02',
      category: 'characters',
      original: 'works/pieza-02/original.webp',
      vector: 'works/pieza-02/vector.webp',
      outline: 'works/pieza-02/outline.webp',
      thumb: 'works/pieza-02/thumb.webp',
      hours: 6,
      brief: {
        es: 'Recreación vectorial de {title} con acabado de cómic y trama de semitonos.',
        en: 'Vector recreation of {title} with a comic book finish and halftone texture.',
      },
      challenge: {
        es: 'Original de baja resolución (454 px) pintado digitalmente, con iluminación dramática, texturas de tela, cuero y metal, y una cadena en primer plano.',
        en: 'Low-resolution (454 px) digitally painted original, with dramatic lighting, cloth, leather and metal textures, and a chain in the foreground.',
      },
      technique: {
        es: [
          'Trazado manual con pluma de la figura, la ropa y la cadena',
          'Trama de semitonos generada en alta definición en Photoshop y convertida a vector en Illustrator',
          'Borde blanco tipo sticker y salpicadura dorada añadidos a la composición',
          'Paleta de tintas planas en marrones, dorados, rojos y grises',
        ],
        en: [
          'Manual pen tool tracing of the figure, clothing and chain',
          'Halftone texture generated in high resolution in Photoshop and converted to vector in Illustrator',
          'Sticker-style white border and golden splash added to the composition',
          'Flat-ink palette in browns, golds, reds and grays',
        ],
      },
      result: {
        es: 'Ilustración 100 % vectorial, incluida la trama, escalable para impresión en gran formato y stickers.',
        en: '100% vector illustration, halftone included, scalable for large-format printing and stickers.',
      },
      tools: ['Illustrator', 'Photoshop'],
    },
    {
      slug: 'pieza-03',
      category: 'characters',
      original: 'works/pieza-03/original.webp',
      vector: 'works/pieza-03/vector.webp',
      outline: 'works/pieza-03/outline.webp',
      thumb: 'works/pieza-03/thumb.webp',
      hours: 6,
      brief: {
        es: 'Recreación vectorial de {title}, una armadura de gran volumen con detalle mecánico denso.',
        en: 'Vector recreation of {title}, a heavy armor with dense mechanical detail.',
      },
      challenge: {
        es: 'Original de baja resolución (396 px) pintado digitalmente, con reflejos metálicos, degradados suaves y placas superpuestas.',
        en: 'Low-resolution (396 px) digitally painted original, with metallic reflections, soft gradients and overlapping plates.',
      },
      technique: {
        es: [
          'Trazado manual con pluma de cada placa, junta y pistón de la armadura',
          'Volumen metálico resuelto con cinco tintas planas: rojo, dorado, gris, blanco y negro',
          'Capa de sombras semitransparente para dar profundidad sin degradados',
          'Brillos especulares recreados con formas blancas de corte duro',
        ],
        en: [
          'Manual pen tool tracing of every armor plate, joint and piston',
          'Metallic volume built with five flat inks: red, gold, gray, white and black',
          'Semi-transparent shadow layer for depth without gradients',
          'Specular highlights recreated with hard-edged white shapes',
        ],
      },
      result: {
        es: 'Ilustración 100 % vectorial, sin rasters, escalable para impresión en gran formato o serigrafía por tintas.',
        en: '100% vector illustration, raster-free, scalable for large-format printing or spot-color screen printing.',
      },
      tools: ['Illustrator'],
    },
    {
      slug: 'pieza-04',
      category: 'creatures',
      original: 'works/pieza-04/original.webp',
      vector: 'works/pieza-04/vector.webp',
      outline: 'works/pieza-04/outline.webp',
      thumb: 'works/pieza-04/thumb.webp',
      hours: 2,
      brief: {
        es: 'Reinterpretación vectorial de {title} en formato de diseño para camiseta y póster.',
        en: 'Vector reinterpretation of {title} as a T-shirt and poster design.',
      },
      challenge: {
        es: 'Original de baja resolución (462 px) con pelaje muy denso: miles de mechones finos entre luces y sombras.',
        en: 'Low-resolution original (462 px) with very dense fur: thousands of fine strands between lights and shadows.',
      },
      technique: {
        es: [
          'Trazado manual con pluma de cada mechón del pelaje',
          'Paleta reducida a blanco, negro y grises por transparencia',
          'Ojos recoloreados en cian como punto focal',
          'Listón con textura desgastada y rotulación convertida a contornos',
        ],
        en: [
          'Manual pen tool tracing of every fur strand',
          'Palette reduced to white, black and transparency-based grays',
          'Eyes recolored in cyan as the focal point',
          'Distressed-texture ribbon and lettering converted to outlines',
        ],
      },
      result: {
        es: 'Diseño 100 % vectorial, sin rasters, listo para serigrafía textil y gran formato.',
        en: '100% vector design, raster-free, ready for textile screen printing and large format.',
      },
      tools: ['Illustrator'],
    },
    {
      slug: 'pieza-05',
      category: 'characters',
      original: 'works/pieza-05/original.webp',
      vector: 'works/pieza-05/vector.webp',
      outline: 'works/pieza-05/outline.webp',
      thumb: 'works/pieza-05/thumb.webp',
      hours: 1,
      brief: {
        es: 'Recreación vectorial de {title} con estética de cómic clásico de los noventa.',
        en: 'Vector recreation of {title} with a classic nineties comic book look.',
      },
      challenge: {
        es: 'Original de baja resolución (368 px), recortado en diagonal, con entintado y tramado de líneas muy fino.',
        en: 'Low-resolution original (368 px), cropped diagonally, with very fine inking and line hatching.',
      },
      technique: {
        es: [
          'Trazado manual con pluma de la figura y el entintado de cómic',
          'Tramado de líneas en piel y traje recreado trazo a trazo',
          'Figura completada fuera del recorte original: garras, hombro y brazo',
          'Paleta reducida a cinco tintas planas: azul, amarillo, piel, blanco y negro',
        ],
        en: [
          'Manual pen tool tracing of the figure and comic book inking',
          'Line hatching on skin and suit recreated stroke by stroke',
          'Figure completed beyond the original crop: claws, shoulder and arm',
          'Palette reduced to five flat inks: blue, yellow, skin, white and black',
        ],
      },
      result: {
        es: 'Ilustración 100 % vectorial, sin rasters, lista para serigrafía por tintas y gran formato.',
        en: '100% vector illustration, raster-free, ready for spot-color screen printing and large format.',
      },
      tools: ['Illustrator'],
    },
    {
      slug: 'pieza-06',
      category: 'characters',
      original: 'works/pieza-06/original.webp',
      vector: 'works/pieza-06/vector.webp',
      outline: 'works/pieza-06/outline.webp',
      thumb: 'works/pieza-06/thumb.webp',
      hours: 4,
      brief: {
        es: 'Rediseño vectorial de {title}: del casco original a un busto completo con ornamentación tribal geométrica.',
        en: 'Vector redesign of {title}: from the original helmet to a full bust with geometric tribal ornamentation.',
      },
      challenge: {
        es: 'Original de baja resolución (390 px) que solo muestra el casco, con superficies metálicas pulidas, luces de energía y grabados finos.',
        en: 'Low-resolution original (390 px) showing only the helmet, with polished metal surfaces, energy lights and fine engravings.',
      },
      technique: {
        es: [
          'Trazado manual con pluma del casco y sus grabados',
          'Collar de garras y patrones geométricos de diseño propio, creados a partir del casco',
          'Líneas de energía reinterpretadas en morado sobre gris metálico',
          'Tramas de puntos y líneas vectoriales para texturizar sin rasters',
        ],
        en: [
          'Manual pen tool tracing of the helmet and its engravings',
          'Claw necklace and geometric patterns of original design, built from the helmet',
          'Energy lines reinterpreted in purple over metallic gray',
          'Vector dot and line patterns for texture without rasters',
        ],
      },
      result: {
        es: 'Ilustración 100 % vectorial, sin rasters, lista para serigrafía por tintas y gran formato.',
        en: '100% vector illustration, raster-free, ready for spot-color screen printing and large format.',
      },
      tools: ['Illustrator'],
    },
    {
      slug: 'pieza-07',
      category: 'characters',
      original: 'works/pieza-07/original.webp',
      vector: 'works/pieza-07/vector.webp',
      outline: 'works/pieza-07/outline.webp',
      thumb: 'works/pieza-07/thumb.webp',
      hours: 4,
      brief: {
        es: 'Recreación vectorial de {title} con una composición nueva de estilo póster.',
        en: 'Vector recreation of {title} with a new poster-style composition.',
      },
      challenge: {
        es: 'Original de baja resolución (360 px) con sombreado de anime, equipo mecánico detallado, cables y un fondo con marco ornamental.',
        en: 'Low-resolution original (360 px) with anime cel shading, detailed mechanical gear, cables and an ornate framed background.',
      },
      technique: {
        es: [
          'Trazado manual con pluma del personaje, las espadas y el equipo mecánico',
          'Sombreado de anime por planos de color con texturas de líneas en ropa y capa',
          'Figura gigante de fondo y rotulación japonesa vectorizadas a partir de referencias de la obra',
          'Fondo y marco originales reemplazados por una composición de póster con contorno blanco',
        ],
        en: [
          'Manual pen tool tracing of the character, blades and mechanical gear',
          'Anime cel shading with flat color planes and line textures on clothing and cape',
          'Giant background figure and Japanese lettering vectorized from references of the original work',
          'Original background and frame replaced with a poster composition and white outline',
        ],
      },
      result: {
        es: 'Ilustración 100 % vectorial, sin rasters, lista para póster, serigrafía y gran formato.',
        en: '100% vector illustration, raster-free, ready for posters, screen printing and large format.',
      },
      tools: ['Illustrator'],
    },
    {
      slug: 'pieza-08',
      category: 'characters',
      original: 'works/pieza-08/original.webp',
      vector: 'works/pieza-08/vector.webp',
      outline: 'works/pieza-08/outline.webp',
      thumb: 'works/pieza-08/thumb.webp',
      hours: 8,
      brief: {
        es: 'Reinterpretación vectorial de {title}: un cráneo vikingo rearmado con armamento nórdico y medieval.',
        en: 'Vector reinterpretation of {title}: a Viking skull rearmed with Norse and medieval weaponry.',
      },
      challenge: {
        es: 'Original de baja resolución (383 px) fotografiado sobre una camiseta, con pliegues de tela y cientos de armas modernas pixeladas: rifles de asalto, escopetas, granadas y munición.',
        en: 'Low-resolution original (383 px) photographed on a T-shirt, with fabric folds and hundreds of pixelated modern weapons: assault rifles, shotguns, grenades and ammunition.',
      },
      technique: {
        es: [
          'Sustitución de todo el armamento moderno por armas nórdicas y medievales, documentadas y vectorizadas una a una',
          'Barba formada por hachas de doble filo y espadas, guiño al skeggøx ("hacha barbuda" en nórdico antiguo)',
          'Cresta de haces de flechas y trenza convertida en un mangual de cadena con bolas de púas',
          'Cráneo sombreado con tramado cruzado (cross-hatching), ornamentos grabados y vértebras detalladas',
        ],
        en: [
          'All modern weaponry replaced with Norse and medieval arms, researched and vectorized one by one',
          'Beard built from double-bladed axes and swords, a nod to the skeggøx (Old Norse for "bearded axe")',
          'Crest of arrow bundles and braid turned into a chain flail with spiked balls',
          'Skull shaded with cross-hatching, engraved ornaments and detailed vertebrae',
        ],
      },
      result: {
        es: 'Ilustración monocromática 100 % vectorial, lista para serigrafía a una sola tinta sobre prenda oscura.',
        en: '100% vector monochrome illustration, ready for single-ink screen printing on dark garments.',
      },
      tools: ['Illustrator'],
    },
  ],
};
