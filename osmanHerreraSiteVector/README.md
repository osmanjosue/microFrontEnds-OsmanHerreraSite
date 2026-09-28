# Osman Herrera — Vector Work Showcase

Micro-frontend de alto rendimiento en **JavaScript puro** para la exhibición interactiva y técnica de ilustraciones vectoriales trazadas a mano (*raster-to-vector*).

Servido bajo la ruta `/vectorwork/` del sitio personal `osmanherrera.dev`.

---

## 1. Qué es este proyecto

**Vector Work** es un micro-frontend interactivo diseñado bajo la estética *Apex Dossier / Cyber Precision* (modo oscuro, paletas cian y ámbar, tipografías técnicas *Space Grotesk* y *JetBrains Mono*).
- **Comparador visual interactivo (antes/después):** Slider fluido con soporte para ratón, gestos táctiles y teclado (flechas ←/→) que permite contrastar el arte original rasterizado con su recreación vectorial de alta fidelidad.
- **Modos de visualización COLOR y OUTLINE:** Alternancia en tiempo real. En modo **OUTLINE**, los rellenos se transparentan, los trazados vectoriales se resaltan en cian (`#00f0ff`) y se dibujan los puntos de ancla reales (`#ffb703`) sobre fondo negro carbón (`#0d0e13`).
- **Telemetría y especificaciones técnicas:** Panel de inspección que muestra métricas calculadas del archivo SVG fuente (número exacto de trazados, anclas Bézier, paleta cromática y dimensiones del artboard) junto con tarjetas de proceso (Brief, Reto, Técnica y Resultado).
- **Protección de propiedad intelectual:** El SVG editable **nunca se publica en la web** ni se expone en el DOM. La aplicación web sirve exclusivamente imágenes rasterizadas optimizadas en formato WebP HD (2400 px) y números precalculados offline.

---

## 2. Desarrollo local

### Requisitos previos
- Node.js 18+ (recomendado Node 20+)
- Sharp y svgpath (instalados en las dependencias del workspace)

### Comandos de desarrollo
```bash
# Desde la raíz del repositorio:
npm run dev -w osmanHerreraSiteVector

# O directamente desde la carpeta del proyecto:
cd osmanHerreraSiteVector
npm run dev
```
El servidor Vite arrancará en `http://localhost:5175/`.

### Configuración local de títulos
Para ver los títulos reales y créditos de las piezas en desarrollo sin exponerlos en git:
```bash
# Copia la plantilla de ejemplo
cp osmanHerreraSiteVector/public/data/titles.example.json osmanHerreraSiteVector/public/data/titles.json
```
Si `titles.json` no existe o no está disponible, la aplicación recurre automáticamente a títulos genéricos por defecto (ej. *Estudio vectorial #01* / *Vector Study #01*).

---

## 3. Guía paso a paso: Agregar una nueva pieza

Sigue estos 7 pasos para incorporar una nueva ilustración al catálogo:

### Paso 1: Colocar los archivos fuente en `source/`
- `source/pieza-NN.svg`: Archivo vectorial exportado desde Illustrator (nombres neutros, en minúsculas, sin espacios ni caracteres especiales; ej: `pieza-01.svg`, `pieza-02.svg`).
- `source/pieza-NN-original.(png|jpg|jpeg|webp)`: Arte original rasterizado de referencia.
> **Nota sobre piezas reales y demos:**
> Las piezas con `demo: true` se excluyen automáticamente en compilaciones de producción (`import.meta.env.DEV || !w.demo`).
> **Regla de orden en `vector.config.js`:** Las piezas reales deben colocarse **SIEMPRE ANTES** que las demos en el arreglo `works`. Dado que el número `#NN` y el título por defecto (*Estudio vectorial #NN*) se calculan según el índice de la pieza en la lista disponible, situar las piezas reales al inicio garantiza que su numeración (#01, #02...) se conserve intacta tanto en desarrollo como en producción.

### Paso 2: Registrar la pieza en `src/content/vector.config.js`
Agrega una entrada en el arreglo `works`:
```javascript
{
  slug: 'pieza-01',
  category: 'characters', // 'characters' | 'creatures' | 'logos' | 'apparel'
  original: 'works/pieza-01/original.webp', // Formato corto relativo, sin barra inicial
  vector: 'works/pieza-01/vector.webp',
  outline: 'works/pieza-01/outline.webp',
  hours: 18, // Horas dedicadas (opcional)
  vectorBackground: '#ffffff', // Fondo opcional para aplanar el vector (por defecto transparente)
  outline: {
    anchors: 'auto', // 'auto' | 'on' | 'off'
    anchorSize: 16,  // Tamaño de anclas en píxeles en salida de 2400px (opcional)
    stroke: 6,       // Grosor de línea en salida de 2400px (opcional)
    rasters: 'dim',  // 'dim' (atenuada al 25% en escala de grises, por defecto) | 'hide' (oculta en outline)
  },
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
}
```

### Paso 3: Asignar título real y crédito en `public/data/titles.json`
Edita localmente `public/data/titles.json` (archivo protegido e ignorado por git):
```json
{
  "pieza-01": {
    "es": "Nombre Real en Español",
    "en": "Real Name in English",
    "credit": {
      "es": "Ilustración original por Nombre del Artista",
      "en": "Original illustration by Artist Name"
    }
  }
}
```
*El campo `credit` es opcional. Si se define, se muestra debajo del título principal con el prefijo traducido y marcado con `data-nosnippet`.*

### Paso 4: Construir los assets y validar la pieza
Ejecuta el script de construcción filtrando por la pieza:
```bash
npm run assets -w osmanHerreraSiteVector -- --only pieza-01
```
Revisa la consola: el script analizará el SVG, calculará trazados y anclas, generará los WebP a 2400 px, actualizará `src/content/stats.json` y emitirá el reporte de validación (OK / AVISOS / ERROR).

### Paso 5: Verificar en desarrollo
Inicia el entorno de desarrollo y comprueba:
- Coincidencia y alineación perfecta 1:1 entre el arte original y el vector al deslizar el comparador.
- Fidelidad de colores y correcta renderización del modo OUTLINE.

### Paso 6: Subir los assets al VPS vía SCP
Sube los archivos generados a la carpeta de assets del servidor (usando PowerShell o Windows OpenSSH):
```powershell
# Subir la carpeta de la pieza (vector.webp, outline.webp, original.webp)
scp -r osmanHerreraSiteVector/public/works/pieza-01 USUARIO@SERVIDOR:/var/www/vectorwork-assets/works/

# Subir el diccionario de títulos reales actualizado
scp osmanHerreraSiteVector/public/data/titles.json USUARIO@SERVIDOR:/var/www/vectorwork-assets/data/
```

### Paso 7: Reemplazo o actualización de arte publicado
Si con posterioridad necesitas reemplazar un arte ya publicado en producción:
1. Renombra el archivo en tu exportación o agrega versión (ej: `vector-v2.webp`).
2. Actualiza la ruta correspondiente en `src/content/vector.config.js`.
3. Vuelve a generar y subir el archivo.
*Esto invalida de inmediato la caché del navegador (`max-age=2592000`) de los usuarios que ya hayan visto la versión anterior.*

---

## 4. Despliegue de la aplicación

Para compilar la aplicación para producción:
```bash
# Compilar solo el micro-frontend vector
npm run build:vector

# O compilar todos los micro-frontends del monorepo
npm run build:all
```
> **Limpieza automática de seguridad:** En modo producción (`npm run build`), el plugin Vite elimina de inmediato `dist/works/` y `dist/data/`. La carpeta `dist/` resultante contiene exclusivamente el bundle minificado (`index.html` y `assets/`), garantizando que ningún arte o dato confidencial se publique con la app.

### Subir la aplicación compilada al servidor
```powershell
# Subir la carpeta dist completa a la ruta servida por Nginx (reemplaza la carpeta dist completa)
scp -r osmanHerreraSiteVector/dist USUARIO@SERVIDOR:/RUTA/AL/SITIO/osmanHerreraSiteVector/

# Subir robots.txt
scp osmanHerreraSiteVector/robots.txt USUARIO@SERVIDOR:/RUTA/AL/SITIO/osmanHerreraSiteVector/robots.txt
```
> **Nota sobre archivos anteriores con hash:** En el servidor remoto, los archivos estáticos con hash (`dist/assets/index-[hash].js`, `index-[hash].css`) de builds anteriores quedan en el servidor. Para limpiarlos y evitar acumular archivos obsoletos, se recomienda borrar `dist/assets` en el VPS antes de subir (por ejemplo, ejecutando vía SSH: `ssh USUARIO@SERVIDOR "rm -rf /RUTA/AL/SITIO/osmanHerreraSiteVector/dist/assets/*"`).

---

## 5. Preparación del arte en Adobe Illustrator

Para que el análisis automático y la generación de imágenes WebP y contornos sean perfectos, sigue rigurosamente esta guía de exportación:

### Configuración del documento
1. **Mesa de trabajo (Artboard):** Debe tener **EXACTAMENTE** la misma proporción que la imagen original de referencia (ideal: mismas dimensiones en píxeles o múltiplo exacto).
2. **Posición:** La imagen de referencia debe estar ubicada exactamente en `(0, 0)` ocupando toda la mesa de trabajo mientras se traza.
3. **Limpieza previa:** Antes de exportar:
   - Elimina la capa que contiene la imagen raster original de referencia.
   - Elimina capas ocultas y guías.
   - Ejecuta: **Object (Objeto) → Path (Trazado) → Clean Up (Limpiar...)** para eliminar puntos sueltos y formas vacías.
4. **Modo de color:** Archivo en **RGB**, perfil de color **sRGB**.
5. **Tipografías:** Todo texto debe convertirse a contornos (**Type → Create Outlines** o `Ctrl+Shift+O`).
6. **Fondo:** Si la ilustración requiere un fondo sólido, incluye un rectángulo en el arte o utiliza la propiedad `vectorBackground: '#ffffff'` en `vector.config.js`.

### Diálogo de exportación SVG
Selecciona **File (Archivo) → Export As... (Exportar como...)**, marca la casilla **"Use Artboards" (Usar mesas de trabajo)** y guarda como SVG.

En el cuadro de diálogo **SVG Options** que aparece a continuación, configura las opciones en inglés tal como figuran:
- **Styling: Presentation Attributes**
  *Por qué:* Aplica estilos como atributos nativos (`fill="..."`, `stroke="..."`) en lugar de clases CSS internas, facilitando la extracción fidedigna de colores y su neutralización en modo OUTLINE.
- **Font: Convert To Outlines**
  *Por qué:* Transforma cualquier carácter tipográfico en nodos geométricos Bézier, evitando discrepancias de fuentes en el servidor.
- **Images: Embed** *(idealmente ninguna)*
  *Por qué:* En caso de usar texturas raster imprescindibles, las incrusta en base64 para que Sharp pueda renderizarlas.
- **Object IDs: Minimal**
  *Por qué:* Genera IDs compactos y limpios sin contaminar el SVG con nombres de capas internos del diseñador.
- **Decimal: 2**
  *Por qué:* Precisión de dos decimales, óptima para escalabilidad vectorial nítida sin inflar innecesariamente el peso del archivo.
- **Minify: Desmarcado**
  *Por qué:* Conserva saltos de línea y estructura limpia requerida para el análisis e inserción segura de estilos.
- **Responsive: Marcado**
  *Por qué:* Obligatorio para que Illustrator escriba el atributo `viewBox` en lugar de dimensiones fijas estáticas.

### Botón "Show Code" (Inspección rápida)
Antes de presionar OK, pulsa **Show Code** y comprueba:
- Que exista el atributo `viewBox="0 0 W H"`.
- Que no existan etiquetas `<text` (significaría texto sin contornear).
- Que no existan etiquetas `<image` grandes (significaría que olvidaste borrar la imagen original).

### Limitaciones conocidas del pipeline
1. **Rasters incrustados (texturas de técnica mixta) y Mallas de degradado (*Gradient Meshes*):** No computan en el conteo de trazados Bézier ni en anclas. En modo OUTLINE se renderizan atenuadas al 25% de opacidad y escala de grises para priorizar la estructura vectorial (o pueden ocultarse declarando `outline: { rasters: 'hide' }` en la configuración de la pieza).
2. **Efectos de Illustrator y modos de fusión complejos:** Efectos rasterizados (sombras paralelas, desenfoques gaussianos) o modos de fusión no estándar pueden presentar diferencias sutiles al renderizarse vía *librsvg* en Sharp.
3. **Piezas extremadamente densas:** El outline se ajusta según la densidad de nodos para mantener un rendimiento visual óptimo:
   - **≤ 3 000 nodos:** Cuadros de ancla de 16 px, trazo de 6 px.
   - **3 001 a 20 000 nodos:** Cuadros de ancla de 6 px, trazo de 3 px.
   - **> 20 000 nodos:** Sin anclas (solo trazados de 2 px para evitar saturación de pantalla).

### Tabla de validaciones automáticas del script
El script `npm run assets` realiza 10 comprobaciones antes de procesar cada pieza:

| N° | Tipo | Condición | Diagnóstico y Acción requerida |
|---|---|---|---|
| 1 | **ERROR** | No tiene `viewBox` | Omitida. En Illustrator, exporta marcando *Responsive* y *Use Artboards*. |
| 2 | **ERROR** | Proporción viewBox vs original difiere > 0.5% | Omitida. Las dimensiones de la mesa de trabajo no guardan la misma proporción que el original. Ajusta la mesa en Illustrator. |
| 3 | **ERROR** | Una `<image>` cubre ≥ 50% del artboard | Omitida. La imagen original quedó incrustada en el SVG. Bórrala y vuelve a exportar. |
| 4 | **AVISO** | `<image>` cubren < 50% | Informativo. Pieza con técnica mixta (p. ej. tramas de semitonos). Se mostrará el chip **VECTOR + TRAMA RASTER** y la trama atenuada en OUTLINE. |
| 5 | **AVISO** | `<image>` duplicadas (mismo hash) | Informativo. Texturas repetidas aumentan el peso en KB innecesariamente. |
| 6 | **AVISO** | Contiene `<text` | Hay texto editable. Conviértelo a contornos (*Create Outlines*). |
| 7 | **AVISO** | Contiene `<style` | Exportado con *Internal CSS*. Se recomienda *Presentation Attributes*. |
| 8 | **AVISO** | Contiene `data-name=` | Exportado con *Object IDs = Layer Names*. Se recomienda *Minimal*. |
| 9 | **AVISO** | Formas degeneradas (ancho/alto 0) | Elementos vacíos ignorados. Ejecuta *Object → Path → Clean Up*. |
| 10 | **ERROR** | Nombre no cumple `pieza-NN`/`demo-NN` o tiene espacios | Omitida. Renombra los archivos siguiendo el patrón requerido sin espacios. |

---

## 6. Técnica mixta (Vector + Tramas raster incrustadas)

En el arte vectorial profesional y de serigrafía o merchandising textil, es habitual combinar trazados Bézier precisos con tramas de semitonos (*halftones*) o texturas granuladas generadas en Adobe Photoshop para enriquecer sombras y acabados tácticos sin multiplicar innecesariamente millones de nodos vectoriales.

### Cómo maneja el pipeline las piezas con técnica mixta:
1. **Validación automática de calidad:**
   - Si una imagen raster `<image>` cubre menos del 50% del área del artboard, el analizador la clasifica como textura raster legítima y emite un aviso informativo:
     `"Contiene N imagen(es) raster (... del artboard); se mostrará el chip VECTOR + TRAMA RASTER y la trama atenuada en OUTLINE."`
   - El número de imágenes raster visibles se registra en `src/content/stats.json` bajo la propiedad `rasters`.
2. **Visualización en la interfaz (UI):**
   - Cuando `stats[slug].rasters > 0`, la aplicación muestra junto al chip de categoría un chip táctico adicional:
     **`VECTOR + TRAMA RASTER`** (en inglés: **`VECTOR + RASTER TEXTURE`**), con borde ámbar tenue (`border-secondary/40 text-secondary`) y tooltip traducido:
     *«Incluye texturas raster (p. ej. semitonos) dentro del vector / Includes raster textures (e.g. halftones) inside the vector»*.
   - Si `rasters === 0`, el chip no se muestra.
3. **Comportamiento en modo OUTLINE:**
   - Dado que *librsvg* no aplica `filter: grayscale()` de CSS (la trama saldría con su color original atenuado), en `build-assets.mjs`, al generar el SVG temporal del outline, cada `<image href="data:...">` incrustada se decodifica, se transforma físicamente a escala de grises real con Sharp (`.grayscale()`), se vuelve a codificar en base64 y se reemplaza en el SVG; la opacidad tenue del 25% se gestiona vía CSS (`opacity: 0.25`). Si la etiqueta `<image>` utiliza un enlace externo (no data URI), se preserva únicamente la opacidad y se emite un aviso. Esto garantiza una inspección fidedigna de la composición sin que los colores del raster interfieran con los trazados vectoriales cian (`#00f0ff`) ni los nodos Bézier (`#ffb703`).
   - **Override configurable por pieza:** Si deseas ocultar por completo las imágenes raster en el modo OUTLINE de una pieza específica, puedes declararlo en `vector.config.js`:
     ```javascript
     outline: {
       rasters: 'hide', // 'dim' (por defecto: atenuada al 25% en escala de grises real) | 'hide' (oculta en outline)
     }
     ```
4. **Recomendación en la ficha técnica (`technique`):**
   Al documentar una pieza con técnica mixta en `src/content/vector.config.js`, se recomienda declarar explícitamente el uso de tramas en el bloque de técnica:
   ```javascript
   technique: {
     es: [
       'Trazado manual con pluma minimizando puntos de ancla',
       'Trama de semitonos rasterizada en Photoshop para optimizar peso',
       'Separación por planos cromáticos',
     ],
     en: [
       'Manual pen tool tracing minimizing anchor count',
       'Halftone texture rasterized in Photoshop to optimize file weight',
       'Color plane separation',
     ],
   },
   ```

---

## 7. Privacidad y Seguridad

Dado que el repositorio de GitHub es **PÚBLICO**:
1. **Los SVG fuente nunca se publican:** Contienen la autoría técnica, curvas de construcción completas e información de capas. Residen únicamente en el equipo local del autor en `source/` y están ignorados en git.
2. **Los WebP y `titles.json` nunca entran a git:** Se sirven exclusivamente desde el VPS (o Cloudflare R2 en el futuro). El `.gitignore` del repositorio bloquea cualquier subida accidental.
3. **No indexación de títulos y piezas:**
   - `titles.json` se entrega con cabecera HTTP `X-Robots-Tag: noindex, nofollow` y `Cache-Control: no-cache`.
   - `robots.txt` desautoriza explícitamente el rastreo de `/vectorwork/data/`.
   - En el HTML, el título renderizado y el crédito cuentan con el atributo `data-nosnippet`.
   - Los títulos reales nunca se interpolan en `<title>`, `meta description` ni atributos `alt`.
   - Los archivos WebP se sirven con `X-Robots-Tag: noindex` para evitar que aparezcan en Google Imágenes.
4. **Política anti-cloaking:** Nunca se sirve contenido distinto ni redirecciones basadas en el `User-Agent`. Si un bot o scraper no respeta `robots.txt` y consulta `titles.json`, el endpoint es accesible pero está claramente marcado con directivas `noindex`.

---

## 8. Configuración de Nginx en el VPS

Crea el directorio de almacenamiento en el VPS y otorga permisos de lectura al usuario de Nginx:
```bash
sudo mkdir -p /var/www/vectorwork-assets/{works,data}
sudo chown -R www-data:www-data /var/www/vectorwork-assets
sudo chmod -R 755 /var/www/vectorwork-assets
```

Fusiona las siguientes directivas en el archivo de configuración del virtual host en Nginx (`/etc/nginx/sites-available/...`):

```nginx
# robots.txt global (o fusionar la directiva Disallow si ya existe)
location = /robots.txt {
    alias /RUTA/AL/SITIO/osmanHerreraSiteVector/robots.txt;
}

# Redirección canónica con barra final
location = /vectorwork {
    return 301 /vectorwork/;
}

# 1. Títulos reales: protegidos contra indexación en buscadores
location /vectorwork/data/ {
    alias /var/www/vectorwork-assets/data/;
    add_header X-Robots-Tag "noindex, nofollow" always;
    add_header Cache-Control "no-cache" always;
}

# 2. Artes (WebP): excluidos de Google Imágenes (bloque a eliminar al migrar a R2)
location /vectorwork/works/ {
    alias /var/www/vectorwork-assets/works/;
    add_header X-Robots-Tag "noindex" always;
    add_header Cache-Control "public, max-age=2592000" always;
}

# 3. Aplicación Vector Work (SPA en micro-frontend)
location /vectorwork/ {
    alias /RUTA/AL/SITIO/osmanHerreraSiteVector/dist/;
    try_files $uri $uri/ /vectorwork/index.html;
}
```

*Nota técnica:* Nginx resuelve las peticiones evaluando los prefijos más largos primero (`longest prefix match`), por lo que `/vectorwork/data/` y `/vectorwork/works/` tienen prioridad sobre `/vectorwork/`.

---

## 9. Migración futura a Cloudflare R2

Cuando se active el almacenamiento en Cloudflare R2:
1. Sube el contenido de `public/works/` al bucket manteniendo la misma estructura:
   `vectorwork/works/pieza-NN/*.webp`
2. Configura los metadatos HTTP en el bucket:
   - `Content-Type: image/webp`
   - `Cache-Control: public, max-age=31536000, immutable`
3. Asocia un **dominio propio** al bucket (ej: `cdn.osmanherrera.dev`), evitando dominios compartidos `*.r2.dev`.
4. En el dashboard de Cloudflare, crea una **Transform Rule (Modify Response Header)** para ese hostname:
   - Nombre: `Noindex Vector Assets`
   - Cabecera: `X-Robots-Tag: noindex`
5. Configura en `osmanHerreraSiteVector/.env.production`:
   ```bash
   VITE_ASSETS_BASE_URL=https://cdn.osmanherrera.dev/vectorwork/
   ```
6. Elimina del bloque de Nginx la directiva `location /vectorwork/works/ { ... }` (los artes ahora se descargarán directamente desde Cloudflare CDN). El bloque de `location /vectorwork/data/` permanece en el VPS.
7. Al cargarse mediante etiquetas estándar `<img>` sin procesamiento canvas, no se requieren cabeceras CORS complejas.

---

## 10. Tests y Verificación de Calidad

### Suite de tests unitarios y de fixtures
Ejecuta la suite completa de pruebas:
```bash
npm run assets:test -w osmanHerreraSiteVector
```
Verifica:
- 11 casos unitarios del parser de SVG (deduplicación z, matrices compactas de Illustrator, arcos sin descomposición, relleno implícito negro, herencia de fill/stroke, formas degeneradas e imágenes raster).
- Comparativa 100% fidedigna de métricas contra el fixture real de Illustrator.
- Validación de las 10 reglas previas de control de calidad.

### Verificación de interfaz con Playwright headless
Para comprobar la renderización visual en viewports responsive sin abrir ventanas de navegador:
```bash
node osmanHerreraSiteVector/scripts/verify-ui.mjs
```
Captura pantallas a 375 px (móvil), 768 px (tablet) y 1440 px (escritorio), valida la ausencia de errores en consola y verifica la interacción del slider en modos COLOR y OUTLINE.
