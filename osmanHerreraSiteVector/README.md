# Osman Herrera — Vector Work Showcase

Micro-frontend de alto rendimiento en **JavaScript puro** para la exhibición interactiva y técnica de ilustraciones vectoriales trazadas a mano (*raster-to-vector*).

Servido bajo la ruta `/vectorwork/` del sitio personal `osmanherrera.dev`.

---

## 1. Qué es este proyecto

**Vector Work** es un micro-frontend interactivo diseñado bajo la estética *Apex Dossier / Cyber Precision* (modo oscuro, paletas cian y ámbar, tipografías técnicas *Space Grotesk* y *JetBrains Mono*).
- **Comparador visual interactivo (antes/después):** Slider fluido con soporte para ratón, gestos táctiles y teclado (flechas ←/→) que permite contrastar el arte original rasterizado con su recreación vectorial de alta fidelidad.
- **Modos de visualización COLOR y OUTLINE:** Alternancia en tiempo real. En modo **OUTLINE**, los rellenos se transparentan, los trazados vectoriales se resaltan en cian (`#00f0ff`) y se dibujan los puntos de ancla reales (`#ffb703`) sobre fondo negro carbón (`#0d0e13`) según la densidad de nodos del arte (ver umbrales en sección 5).
- **Telemetría y especificaciones técnicas:** Panel de inspección que muestra métricas calculadas del archivo SVG fuente (número exacto de trazados, conteo aproximado de anclas Bézier mostrado con "≈", paleta cromática y dimensiones del artboard) junto con tarjetas de proceso (Brief, Reto, Técnica y Resultado).
- **Protección de propiedad intelectual:** El SVG editable **nunca se publica en la web** ni se expone en el DOM. La aplicación web sirve exclusivamente imágenes rasterizadas optimizadas en formato WebP HD (2400 px) y números precalculados offline.

---

## 2. Desarrollo local

### Requisitos previos
- Node.js 18+ (recomendado Node 20+)
- Dependencias del pipeline y scripts (instaladas en las dependencias del workspace): `sharp`, `svgpath`, `@xmldom/xmldom`, `color-name` y `playwright` (para `verify-ui`)

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
# Copia la plantilla de ejemplo (en Bash o en PowerShell mediante alias):
cp osmanHerreraSiteVector/public/data/titles.example.json osmanHerreraSiteVector/public/data/titles.json

# O de forma explícita en PowerShell:
Copy-Item osmanHerreraSiteVector/public/data/titles.example.json osmanHerreraSiteVector/public/data/titles.json
```
Si `titles.json` no existe o no está disponible, la aplicación recurre automáticamente a títulos genéricos por defecto (ej. *Estudio vectorial #01* / *Vector Study #01*).

### Notas del entorno local
- **Piezas demo en desarrollo:** En entorno de desarrollo (`npm run dev`) se cargan todas las piezas, incluidas las marcadas con `demo: true` para facilitar pruebas locales. En compilaciones de producción (`npm run build:vector`), las demos se excluyen automáticamente del catálogo.
- **Limitación en `vite preview`:** Al ejecutar `vite preview`, la interfaz no mostrará imágenes de artes WebP ni títulos reales, dado que la carpeta `dist/` no incluye `works/` ni `data/` por motivos de seguridad. En el servidor VPS de producción, dichos archivos se sirven directamente desde `/var/www/vectorwork-assets/` a través de los alias configurados en Nginx.
- **Navegación entre micro-frontends:** Los enlaces de navegación cruzada hacia otras aplicaciones (`/react/`, `/angular/`, `/vectorwork/`) solo operan de manera integrada detrás del proxy inverso de Nginx configurado en el servidor web.
- **Liberación de puertos locales (5175):** Si el puerto 5175 ya se encuentra ocupado por otra instancia o terminal en segundo plano, Vite asignará automáticamente el siguiente puerto disponible (5176, 5177...). Para liberar el puerto 5175 cerrando el proceso anterior:
  ```powershell
  # 1. Encontrar el ProcessId (PID) que ocupa el puerto 5175:
  Get-NetTCPConnection -LocalPort 5175 | Select-Object -ExpandProperty OwningProcess

  # 2. Detener el proceso con el PID obtenido:
  Stop-Process -Id <PID>
  ```

---

## 3. Guía paso a paso: Agregar una nueva pieza (Checklist de 9 pasos)

Sigue rigurosamente esta lista de verificación de 9 pasos para incorporar una nueva ilustración al catálogo sin comprometer datos privados ni romper la compilación:

### Paso 1: Preparar en Adobe Illustrator
- Ajusta la mesa de trabajo (Artboard) a la proporción exacta de la imagen raster de referencia.
- Ubica la referencia en `(0, 0)` durante el calcado y elimínala SIEMPRE antes de exportar: cualquier `<image>` que quede en el SVG se renderizará dentro de `vector.webp` (el umbral del 50 % es solo la regla de detección automática del script para detener el proceso, no una tolerancia).
- Convierte todas las fuentes a contornos (*Type → Create Outlines* o `Ctrl+Shift+O`) y limpia trazados vacíos (*Object → Path → Clean Up*).
- Exporta en formato SVG con **Use Artboards**, **Presentation Attributes**, **Convert to Outlines**, **Minimal IDs** y **Responsive** activado.
- Consulta todos los requisitos técnicos detallados en la [Sección 5: Preparación del arte en Adobe Illustrator](#5-preparación-del-arte-en-adobe-illustrator).

### Paso 2: Copiar archivos a `source/`
Copia los dos archivos fuente en la carpeta local `osmanHerreraSiteVector/source/`:
- `source/pieza-NN.svg`: Vector exportado (ej: `pieza-02.svg`), usando siempre dos dígitos, minúsculas, sin espacios ni nombres propios de personajes/marcas.
- `source/pieza-NN-original.(png|jpg|jpeg|webp)`: Imagen de referencia con su resolución real y el sufijo estricto `-original` (ej: `pieza-02-original.png`).

### Paso 3: Registrar en `src/content/vector.config.js`
> **DÓNDE PEGAR:** Inserta la nueva entrada en el arreglo `works` **inmediatamente después de la última pieza real y ANTES de las demos** (`demo-01..03`). Las piezas reales deben colocarse siempre primero para que su numeración (#01, #02...) e índice permanezcan estables tanto en desarrollo como en producción.
> **ADVERTENCIA DE PRIVACIDAD:** Este archivo es **100% público** y se compila dentro del bundle JS. **NUNCA** coloques nombres de personajes con copyright ni nombres de artistas aquí; utiliza el comodín `{title}` en los textos.

```javascript
{
  slug: 'pieza-02',
  category: 'characters',
  original: 'works/pieza-02/original.webp', // Ruta corta relativa sin barra inicial
  vector: 'works/pieza-02/vector.webp',
  outline: 'works/pieza-02/outline.webp',   // Solo string con la ruta (NUNCA un objeto)
  hours: 14,
  // vectorBackground: '#ffffff', // Opcional: fondo si el SVG requiere aplanado
  // outlineOptions: {            // Opcional: opciones del visor OUTLINE
  //   anchors: 'auto',          // 'auto' | 'on' | 'off'
  //   anchorSize: 16,           // Tamaño de anclas en píxeles (salida 2400px)
  //   stroke: 6,                // Grosor de trazado en píxeles (salida 2400px)
  //   rasters: 'dim',           // 'dim' (atenuada al 25% en escala de grises) | 'hide'
  // },
  brief: {
    es: 'Recreación vectorial para impresión a gran formato de {title}.',
    en: 'Vector recreation for large-format printing of {title}.',
  },
  challenge: {
    es: 'Imagen raster inicial de baja resolución con entintado denso y texturas finas.',
    en: 'Low-resolution initial raster image with dense inking and fine textures.',
  },
  technique: {
    es: [
      'Trazado manual con herramienta pluma minimizando puntos de ancla',
      'Separación de sombras y luces en capas independientes',
      'Paleta cromática reducida a tintas planas',
    ],
    en: [
      'Manual pen tool tracing minimizing anchor count on curves',
      'Highlights and shadows separated into independent layers',
      'Color palette reduced to flat spot inks',
    ],
  },
  result: {
    es: 'Arte final 100% escalable y listo para serigrafía e impresión de alta calidad.',
    en: '100% scalable final artwork ready for silkscreen and high-grade printing.',
  },
  tools: ['Illustrator', 'Photoshop'],
}
```

#### Descripción de campos en `vector.config.js`
| Campo | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `slug` | `string` | Sí | Identificador único en formato `pieza-NN` (dos dígitos, minúsculas, sin espacios). |
| `category` | `string` | Sí | Categoría (`'characters'` \| `'creatures'` \| `'logos'` \| `'apparel'`). |
| `original` | `string` | Sí | Ruta relativa a la imagen original (`'works/pieza-NN/original.webp'`). |
| `vector` | `string` | Sí | Ruta relativa a la imagen vectorial (`'works/pieza-NN/vector.webp'`). |
| `outline` | `string` | Sí | Ruta relativa al outline (`'works/pieza-NN/outline.webp'`). **Solo string.** |
| `hours` | `number` | No | Horas de trabajo dedicadas al trazado. |
| `vectorBackground` | `string` | No | Color CSS de fondo si el vector tiene transparencias y se desea aplanar (ej. `'#ffffff'`). |
| `outlineOptions` | `object` | No | Opciones del visor OUTLINE (`anchors`, `anchorSize`, `stroke`, `rasters`). |
| `brief` | `{ es, en }` | Sí | Resumen del encargo (soporta `{title}` para interpolación en runtime). |
| `challenge` | `{ es, en }` | Sí | Reto técnico que presentaba el arte original o la resolución. |
| `technique` | `{ es, en }` | Sí | Lista de decisiones técnicas y metodológicas tomadas durante el trazado. |
| `result` | `{ es, en }` | Sí | Resultado final y destino de producción del arte. |
| `tools` | `string[]` | Sí | Herramientas utilizadas (ej. `['Illustrator', 'Photoshop']`). |
| `demo` | `boolean` | No | Solo para piezas de muestra (`true`). Las piezas reales omiten este campo. |

### Paso 4: Configurar `public/data/titles.json`
Edita localmente `osmanHerreraSiteVector/public/data/titles.json` (archivo privado ignorado en git). Añade la entrada para la pieza nueva entre las existentes:

```json
{
  "pieza-01": {
    "es": "Nombre Real Pieza 01",
    "en": "Real Name Piece 01",
    "credit": {
      "es": "Ilustración original por Artista 1",
      "en": "Original illustration by Artist 1"
    }
  },
  "pieza-02": {
    "es": "Nombre Real Pieza 02",
    "en": "Real Name Piece 02",
    "credit": {
      "es": "Ilustración original por Nombre del Artista",
      "en": "Original illustration by Artist Name"
    }
  }
}
```

> **Reglas estrictas de sintaxis JSON:**
> 1. Usa exclusivamente **comillas dobles** `"` para todas las claves y textos (las comillas simples son inválidas en JSON).
> 2. Separa cada objeto con una **coma**, pero **NO dejes una coma final (*trailing comma*)** después de la última propiedad o del último objeto.
> 3. **Prohibido incluir comentarios:** JSON estándar no admite líneas con `//` ni bloques `/* */`.
> 4. **Comportamiento ante error de sintaxis:** Si `titles.json` contiene errores de sintaxis, la aplicación no lanzará una excepción visible en pantalla, sino que recurrirá silenciosamente a los títulos genéricos por defecto (*Estudio vectorial #NN*).

### Paso 5: Generar assets y verificar validaciones
Ejecuta el script generador indicando el slug de la nueva pieza:
```bash
npm run assets -w osmanHerreraSiteVector -- --only pieza-02
```

**Diagnóstico del resultado:**
- **OK:** Todos los assets WebP (`vector.webp`, `outline.webp`, `original.webp`) se generaron en `public/works/pieza-NN/` y las métricas numéricas se calcularon en `src/content/stats.json`. Pasa al siguiente paso.
- **AVISOS:** Se generaron los WebP pero el analizador detectó detalles a revisar (ej: formas degeneradas, texto sin contornear o imagen secundaria). Revisa el desglose; si se trata de técnica mixta intencional, puedes continuar; si no, corrígelo en Illustrator y repite.
- **ERROR:** El proceso se detiene y **NO genera assets** (ej: falta viewBox, proporción desalineada con el original > 0.5%, imagen original incrustada al 50%+ o clave `outline` definida como objeto). Corrige el problema indicado y vuelve a ejecutar.

### Paso 6: Revisar en el entorno local
Inicia el servidor de desarrollo y abre la pieza directamente con su hash:
```bash
npm run dev -w osmanHerreraSiteVector
```
Navega a `http://localhost:5175/#pieza-02` y comprueba:
1. **Alineación 1:1:** Al arrastrar el slider de división, los bordes del original y del vector deben coincidir con precisión milimétrica sin saltos.
2. **Fidelidad de color:** Trazo, degradados y opacidades fieles al original.
3. **Modo OUTLINE:** Al activar OUTLINE, los trazados deben verse en cian `#00f0ff` con nodos ámbar según la densidad de la pieza (ver umbrales en la sección 5; en piezas de más de 20 000 nodos no se dibujan), y cualquier trama raster debe quedar atenuada en gris.
4. **Bilingüismo:** Cambia entre **ES** y **EN** en la cabecera; comprueba que el título real (proveniente de `titles.json`), los créditos y las 4 tarjetas técnicas se traduzcan correctamente.

### Paso 7: Commit seguro a Git (PowerShell)
Dado que el repositorio es público, versiona únicamente los metadatos necesarios y verifica la ausencia total de nombres privados:

```powershell
# 1. Agregar solo los dos archivos de configuración y métricas:
git add osmanHerreraSiteVector/src/content/vector.config.js osmanHerreraSiteVector/src/content/stats.json

# 2. Comprobar que ningún archivo privado o imagen esté en staging (debe salir VACÍO):
git diff --cached --name-only | Select-String "titles\.json$|source/pieza|works/pieza"

# 3. Comprobar que ningún texto del commit contenga nombres de personajes ni artistas (debe salir VACÍO):
git grep --cached -il -e "NOMBRE-PERSONAJE" -e "NOMBRE-ARTISTA"

# 4. Crear el commit:
git commit -m "Agrega pieza-NN a Vector Work"
```
*(En el comando `git grep`, sustituye `"NOMBRE-PERSONAJE"` y `"NOMBRE-ARTISTA"` por los nombres reales de la ilustración para garantizar que no se hayan escrito en `vector.config.js`).*

### Paso 8: Publicar en el VPS (Orden estricto)
Sube los archivos al servidor remoto **EN ESTE ORDEN EXACTO**:

1. **Subir los WebP generados:**
   ```powershell
   scp -r osmanHerreraSiteVector/public/works/pieza-02 USUARIO@SERVIDOR:/var/www/vectorwork-assets/works/
   ```
2. **Subir el diccionario de títulos reales:**
   ```powershell
   scp osmanHerreraSiteVector/public/data/titles.json USUARIO@SERVIDOR:/var/www/vectorwork-assets/data/
   ```
3. **Compilar y subir la aplicación web:**
   ```powershell
   npm run build:vector
   scp -r osmanHerreraSiteVector/dist USUARIO@SERVIDOR:/RUTA/AL/SITIO/osmanHerreraSiteVector/
   ```

> **Por qué este orden:** La entrada de la pieza en `vector.config.js` se compila directamente dentro del bundle JS (`dist/assets/index-[hash].js`), por lo que la pieza no existirá en la web de producción hasta ejecutar el paso 3. Si subieras 3 antes que 1, los visitantes verían la pieza con enlaces rotos durante los segundos que tarde en transferirse la carpeta de imágenes.

### Paso 9: Reemplazar un arte ya publicado
Si con posterioridad necesitas sustituir o actualizar los trazados de una pieza ya publicada en producción:
1. Exporta el nuevo arte y genera los WebP versionando los nombres o actualizando el archivo (ej: `vector-v2.webp`).
2. Actualiza la ruta en `src/content/vector.config.js` (`vector: 'works/pieza-NN/vector-v2.webp'`).
3. Vuelve a generar los assets y sigue el orden de subida del Paso 8.
*El cambio de ruta invalida de inmediato la caché del navegador (`max-age=2592000`) para todos los usuarios.*

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
1. **Rasters incrustados (texturas de técnica mixta) y Mallas de degradado (*Gradient Meshes*):** No computan en el conteo de trazados Bézier ni en anclas. En modo OUTLINE se renderizan atenuadas al 25% de opacidad y escala de grises para priorizar la estructura vectorial (o pueden ocultarse declarando `outlineOptions: { rasters: 'hide' }` en la configuración de la pieza).
2. **Efectos de Illustrator y modos de fusión complejos:** Efectos rasterizados (sombras paralelas, desenfoques gaussianos) o modos de fusión no estándar pueden presentar diferencias sutiles al renderizarse vía *librsvg* en Sharp.
3. **Piezas extremadamente densas:** El outline se ajusta según la densidad de nodos para mantener un rendimiento visual óptimo:
   - **≤ 3 000 nodos:** Cuadros de ancla de 16 px, trazo de 6 px.
   - **3 001 a 20 000 nodos:** Cuadros de ancla de 6 px, trazo de 3 px.
   - **> 20 000 nodos:** Sin anclas (solo trazados de 2 px para evitar saturación de pantalla).

### Tabla de validaciones automáticas del script
El script `npm run assets` realiza 13 comprobaciones antes de procesar cada pieza:

| N° | Tipo | Condición | Diagnóstico y Acción requerida |
|---|---|---|---|
| 1 | **ERROR** | No tiene `viewBox` | Omitida. En Illustrator, exporta marcando *Responsive* y *Use Artboards*. |
| 2 | **ERROR** | Proporción viewBox vs original difiere > 0.5% | Omitida. Las dimensiones de la mesa de trabajo no guardan la misma proporción que el original. Ajusta la mesa en Illustrator. |
| 3 | **ERROR** | Una `<image>` cubre ≥ 50% del artboard | Omitida. La imagen original de referencia quedó incrustada en el SVG. Bórrala y vuelve a exportar. |
| 4 | **AVISO** | `<image>` cubren < 50% | Informativo. Pieza con técnica mixta (p. ej. tramas de semitonos). Se mostrará el chip **VECTOR + TRAMA RASTER** y la trama atenuada en OUTLINE. |
| 5 | **AVISO** | `<image>` duplicadas (mismo hash) | Informativo. Texturas repetidas aumentan el peso en KB innecesariamente. |
| 6 | **AVISO** | Contiene `<text` | Hay texto editable. Conviértelo a contornos (*Create Outlines*). |
| 7 | **AVISO** | Contiene `<style` | Exportado con *Internal CSS*. Se recomienda *Presentation Attributes*. |
| 8 | **AVISO** | Contiene `data-name=` | Exportado con *Object IDs = Layer Names*. Se recomienda *Minimal*. |
| 9 | **AVISO** | Formas degeneradas (ancho/alto 0) | Elementos vacíos ignorados. Ejecuta *Object → Path → Clean Up*. |
| 10 | **ERROR** | Nombre no cumple `pieza-NN`/`demo-NN` o tiene espacios | Omitida. Renombra los archivos siguiendo el patrón requerido sin espacios. |
| 11 | **AVISO** | Archivo original sin sufijo `-original` | Informativo. Renombra `source/pieza-NN.ext` a `pieza-NN-original.ext`. |
| 12 | **AVISO** | Pieza en `source/` que no está en `vector.config.js` | Informativo. La pieza no aparecerá en la web hasta agregar su entrada en `works`. |
| 13 | **ERROR** | Clave `outline` no es string (objeto de opciones) | Omitida. Usa `outline` para la ruta de la imagen WebP y `outlineOptions` para las opciones del comparador. |

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
     outlineOptions: {
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
- Validación de las 13 reglas previas de control de calidad.

### Verificación de interfaz con Playwright headless
Para comprobar la renderización visual en viewports responsive sin abrir ventanas de navegador:
```bash
node osmanHerreraSiteVector/scripts/verify-ui.mjs
```
Captura pantallas a 375 px (móvil), 768 px (tablet) y 1440 px (escritorio), valida la ausencia de errores en consola y verifica la interacción del slider en modos COLOR y OUTLINE.
