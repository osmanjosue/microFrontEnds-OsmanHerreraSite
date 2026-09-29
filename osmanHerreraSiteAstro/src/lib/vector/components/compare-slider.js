// ===========================================================================
// COMPONENTE: COMPARE SLIDER (COMPARADOR VECTOR / RASTER CON POINTER EVENTS)
// ===========================================================================
import { vectorConfig, t } from '@config';
import { getDefaultTitle } from '../titles.js';
import { assetUrl } from '../assets-url.js';
import { escapeHtml } from '../escape.js';
import statsData from '../stats.json';

let sliderAbortController = null;

/**
 * Renderiza la estructura HTML del slider de comparación antes/después.
 * La capa inferior utiliza dos imágenes WebP apiladas (vector.webp y outline.webp)
 * con transición de opacidad (crossfade) para el modo OUTLINE.
 *
 * @param {{
 *   work: any,
 *   workIndex: number,
 *   mode: 'color' | 'outline',
 *   sliderPos: number
 * }} props
 * @returns {string} HTML del slider y su barra de controles
 */
export function renderCompareSliderHtml({
  work,
  workIndex,
  mode,
  sliderPos,
}) {
  const pieceStats = statsData[work?.slug];
  let artboardW = 1;
  let artboardH = 1;
  if (pieceStats && Array.isArray(pieceStats.artboard) && pieceStats.artboard.length >= 2) {
    const [w, h] = pieceStats.artboard;
    if (w > 0 && h > 0) {
      artboardW = w;
      artboardH = h;
    }
  }
  const aspectRatioStr = `${artboardW} / ${artboardH}`;

  const safeDefaultTitle = escapeHtml(getDefaultTitle(workIndex));
  const originalUrl = escapeHtml(assetUrl(work.original));
  const vectorUrl = escapeHtml(assetUrl(work.vector));
  const outlineUrl = escapeHtml(assetUrl(work.outline));

  const colorLabel = t(vectorConfig.ui.colorMode);
  const outlineLabel = t(vectorConfig.ui.outlineMode);
  const dragLabel = t(vectorConfig.ui.dragToCompare);
  const originalBadge = t(vectorConfig.ui.originalBadge);
  const vectorBadge = t(vectorConfig.ui.vectorBadge);
  const outlineBadge = t(vectorConfig.ui.outlineBadge);
  const resolutionBadge = t(vectorConfig.ui.resolutionBadge);

  const viewModeToolbar = t(vectorConfig.ui.viewModeToolbar);
  const viewOutlineTitle = t(vectorConfig.ui.viewOutlineTitle);
  const sliderRegionLabel = t(vectorConfig.ui.sliderRegionLabel);
  const sliderRangeAria = t(vectorConfig.ui.sliderRangeAria);

  const isColor = mode === 'color';
  const colorBtnClasses = isColor
    ? 'bg-primary-container text-on-primary-container font-bold'
    : 'bg-surface-container text-on-surface-variant hover:text-primary';

  const outlineBtnClasses = !isColor
    ? 'bg-primary-container text-on-primary-container font-bold'
    : 'bg-surface-container text-on-surface-variant hover:text-primary';

  const clampedPos = Math.max(3, Math.min(97, sliderPos || 50));
  const rightInset = (100 - clampedPos).toFixed(2);

  return `
    <div class="flex flex-col gap-space-xs" id="compare-slider-wrapper">
      <!-- Barra de herramientas de control de vista -->
      <div class="flex items-center justify-between bg-surface-container-low px-space-sm py-space-xs rounded">
        <div class="flex items-center gap-space-xs" role="toolbar" aria-label="${escapeHtml(viewModeToolbar)}">
          <button
            type="button"
            id="mode-color-btn"
            class="px-space-xs py-0.5 rounded font-label-caps text-label-caps transition-all ${colorBtnClasses}"
            aria-pressed="${isColor}"
          >
            ${escapeHtml(colorLabel)}
          </button>
          <button
            type="button"
            id="mode-outline-btn"
            class="px-space-xs py-0.5 rounded font-label-caps text-label-caps transition-all ${outlineBtnClasses}"
            aria-pressed="${!isColor}"
            title="${escapeHtml(viewOutlineTitle)}"
          >
            ${escapeHtml(outlineLabel)}
          </button>
        </div>

        <div class="flex items-center gap-space-xs font-label-micro text-label-micro text-on-surface-variant">
          <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span>${escapeHtml(resolutionBadge)}</span>
        </div>
      </div>

      <!-- Contenedor del Viewport Interactivo -->
      <div class="w-full flex justify-center items-center">
        <div
          class="slider-viewport relative mx-auto w-full max-w-full bg-surface rounded overflow-hidden select-none touch-none cursor-ew-resize border border-surface-container-high/60"
          id="split-slider-container"
          role="region"
          aria-label="${escapeHtml(sliderRegionLabel)}"
          style="aspect-ratio: ${aspectRatioStr}; max-height: var(--slider-max-h); width: min(100%, calc(var(--slider-max-h) * (${artboardW} / ${artboardH})));"
        >
        <!-- CAPA INFERIOR: Vector WebP y Outline WebP apilados con crossfade -->
        <div
          class="relative w-full h-full bg-surface-container-lowest flex items-center justify-center p-3"
          id="vector-render-slot"
        >
          <img
            src="${vectorUrl}"
            alt="${safeDefaultTitle}"
            draggable="false"
            id="vector-image"
            class="absolute inset-0 w-full h-full object-contain p-3 select-none transition-opacity duration-300 ease-in-out ${isColor ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
            onerror="this.onerror=null; this.parentElement.classList.add('img-error');"
          />
          <img
            src="${outlineUrl}"
            alt="${safeDefaultTitle} — Outline"
            draggable="false"
            id="outline-image"
            class="absolute inset-0 w-full h-full object-contain p-3 select-none transition-opacity duration-300 ease-in-out ${!isColor ? 'opacity-100' : 'opacity-0 pointer-events-none'}"
            onerror="this.onerror=null; this.parentElement.classList.add('img-error');"
          />
          <div class="img-error-fallback hidden text-on-surface-variant font-stat-display text-stat-display items-center justify-center w-full h-full border border-dashed border-outline-variant/40 rounded">
            —
          </div>
        </div>

        <!-- Badge de Vector / Outline (esquina superior derecha, fuera de capas recortadas) -->
        <div
          id="badge-vector"
          class="absolute top-3 right-3 bg-surface-container-lowest/85 backdrop-blur-md px-space-xs py-1 rounded text-primary border border-primary-container/30 font-label-caps text-label-caps font-bold flex items-center gap-1 shadow-md select-none pointer-events-none z-30 transition-opacity duration-150"
        >
          <span class="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
          <span id="vector-badge-text">${escapeHtml(isColor ? vectorBadge : outlineBadge)}</span>
        </div>

        <!-- Badge de Original (esquina superior izquierda, fuera de capas recortadas) -->
        <div
          id="badge-original"
          class="absolute top-3 left-3 bg-surface-container-lowest/85 backdrop-blur-md px-space-xs py-1 rounded text-secondary border border-secondary/30 font-label-caps text-label-caps font-bold flex items-center gap-1 shadow-md select-none pointer-events-none z-30 transition-opacity duration-150"
        >
          <span class="material-symbols-outlined text-[14px]">brush</span>
          <span>${escapeHtml(originalBadge)}</span>
        </div>

        <!-- CAPA SUPERIOR: Raster original recortado con clip-path -->
        <div
          class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-10"
          id="raster-layer"
          style="clip-path: inset(0 ${rightInset}% 0 0);"
        >
          <div class="relative w-full h-full flex items-center justify-center p-3">
            <img
              src="${originalUrl}"
              alt="${safeDefaultTitle} — Original"
              draggable="false"
              class="w-full h-full object-contain filter contrast-105 brightness-95 select-none"
              onerror="this.onerror=null; this.parentElement.classList.add('img-error');"
            />
            <div class="img-error-fallback hidden text-on-surface-variant font-stat-display text-stat-display items-center justify-center w-full h-full border border-dashed border-outline-variant/40 rounded">
              —
            </div>
          </div>
        </div>

        <!-- MANEJADOR ARRASTRABLE CON POINTER EVENTS -->
        <div
          class="absolute top-0 bottom-0 w-0.5 bg-primary-container shadow-[0_0_12px_#00f0ff] -translate-x-1/2 flex items-center justify-center cursor-ew-resize z-20 touch-none"
          id="slider-handle"
          style="left: ${clampedPos}%;"
        >
          <div class="w-7 h-11 sm:w-8 sm:h-12 bg-surface-container-lowest border-2 border-primary-container rounded-full flex items-center justify-center text-primary-container shadow-[0_0_15px_rgba(0,240,255,0.6)]">
            <span class="font-label-caps text-[10px] tracking-tight font-bold select-none">&lt;&nbsp;&gt;</span>
          </div>
        </div>

        <!-- Input range sincronizado para accesibilidad por teclado y lectores de pantalla -->
        <input
          type="range"
          id="slider-range-input"
          min="3"
          max="97"
          value="${clampedPos}"
          class="sr-only"
          aria-label="${escapeHtml(sliderRangeAria)}"
        />

        <!-- Overlay informativo inferior -->
        <div class="absolute bottom-2 left-3 z-30 pointer-events-none font-label-micro text-label-micro text-on-surface-variant/80 bg-surface-container-lowest/95 px-1.5 py-0.5 rounded">
          ${escapeHtml(dragLabel)}
        </div>
      </div>
    </div>
  </div>
  `;
}

/**
 * Inicializa el comportamiento de arrastre táctil y con mouse utilizando Pointer Events.
 * Utiliza AbortController para limpiar los listeners en re-renders y evitar fugas de memoria.
 *
 * @param {HTMLElement} containerEl - Contenedor principal de la app o wrapper del slider
 * @param {{
 *   onPositionChange?: (percent: number) => void,
 *   onModeChange?: (mode: 'color' | 'outline') => void
 * }} callbacks
 */
export function attachSliderEvents(containerEl, { onPositionChange, onModeChange }) {
  if (sliderAbortController) {
    sliderAbortController.abort();
  }
  sliderAbortController = new AbortController();
  const { signal } = sliderAbortController;

  const sliderContainer = containerEl.querySelector('#split-slider-container');
  const rasterLayer = containerEl.querySelector('#raster-layer');
  const sliderHandle = containerEl.querySelector('#slider-handle');
  const rangeInput = containerEl.querySelector('#slider-range-input');

  const colorBtn = containerEl.querySelector('#mode-color-btn');
  const outlineBtn = containerEl.querySelector('#mode-outline-btn');
  const vectorImg = containerEl.querySelector('#vector-image');
  const outlineImg = containerEl.querySelector('#outline-image');
  const vectorBadgeText = containerEl.querySelector('#vector-badge-text');

  function setModeUi(mode) {
    const isColor = mode === 'color';
    if (colorBtn) {
      colorBtn.setAttribute('aria-pressed', String(isColor));
      colorBtn.className = `px-space-xs py-0.5 rounded font-label-caps text-label-caps transition-all ${
        isColor
          ? 'bg-primary-container text-on-primary-container font-bold'
          : 'bg-surface-container text-on-surface-variant hover:text-primary'
      }`;
    }
    if (outlineBtn) {
      outlineBtn.setAttribute('aria-pressed', String(!isColor));
      outlineBtn.className = `px-space-xs py-0.5 rounded font-label-caps text-label-caps transition-all ${
        !isColor
          ? 'bg-primary-container text-on-primary-container font-bold'
          : 'bg-surface-container text-on-surface-variant hover:text-primary'
      }`;
    }
    if (vectorImg && outlineImg) {
      if (isColor) {
        vectorImg.classList.remove('opacity-0', 'pointer-events-none');
        vectorImg.classList.add('opacity-100');
        outlineImg.classList.remove('opacity-100');
        outlineImg.classList.add('opacity-0', 'pointer-events-none');
      } else {
        vectorImg.classList.remove('opacity-100');
        vectorImg.classList.add('opacity-0', 'pointer-events-none');
        outlineImg.classList.remove('opacity-0', 'pointer-events-none');
        outlineImg.classList.add('opacity-100');
      }
    }
    if (vectorBadgeText) {
      vectorBadgeText.textContent = isColor
        ? t(vectorConfig.ui.vectorBadge)
        : t(vectorConfig.ui.outlineBadge);
    }
  }

  if (colorBtn && onModeChange) {
    colorBtn.addEventListener(
      'click',
      () => {
        setModeUi('color');
        onModeChange('color');
      },
      { signal }
    );
  }
  if (outlineBtn && onModeChange) {
    outlineBtn.addEventListener(
      'click',
      () => {
        setModeUi('outline');
        onModeChange('outline');
      },
      { signal }
    );
  }

  if (!sliderContainer || !rasterLayer || !sliderHandle) return;

  const badgeOriginal = containerEl.querySelector('#badge-original');
  const badgeVector = containerEl.querySelector('#badge-vector');

  function updateBadgesVisibility(percentage, containerWidth) {
    if (!badgeOriginal || !badgeVector) return;
    const width = containerWidth || sliderContainer.getBoundingClientRect().width;
    if (!width) return;

    const sliderX = (percentage / 100) * width;
    const leftWidth = sliderX;
    const rightWidth = width - sliderX;

    const origWidth = badgeOriginal.offsetWidth || 90;
    const vecWidth = badgeVector.offsetWidth || 90;

    // Fade-out (opacity 0, transición 150ms) cuando su lado mida menos que el ancho del badge + 16 px
    if (leftWidth < origWidth + 16) {
      badgeOriginal.classList.remove('opacity-100');
      badgeOriginal.classList.add('opacity-0');
    } else {
      badgeOriginal.classList.remove('opacity-0');
      badgeOriginal.classList.add('opacity-100');
    }

    if (rightWidth < vecWidth + 16) {
      badgeVector.classList.remove('opacity-100');
      badgeVector.classList.add('opacity-0');
    } else {
      badgeVector.classList.remove('opacity-0');
      badgeVector.classList.add('opacity-100');
    }
  }

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = sliderContainer.getBoundingClientRect();
    if (!rect.width) return;

    let percentage = ((clientX - rect.left) / rect.width) * 100;
    if (percentage < 3) percentage = 3;
    if (percentage > 97) percentage = 97;

    const rightInset = (100 - percentage).toFixed(2);
    rasterLayer.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
    sliderHandle.style.left = `${percentage}%`;

    updateBadgesVisibility(percentage, rect.width);

    if (rangeInput) {
      rangeInput.value = String(Math.round(percentage));
    }

    if (onPositionChange) {
      onPositionChange(percentage);
    }
  }

  // Pointer Events: mouse, touch, stylus unificados
  const onPointerDown = (e) => {
    isDragging = true;
    try {
      sliderHandle.setPointerCapture(e.pointerId);
    } catch {}
    updateSlider(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  };

  const onPointerUp = (e) => {
    if (!isDragging) return;
    isDragging = false;
    try {
      sliderHandle.releasePointerCapture(e.pointerId);
    } catch {}
  };

  sliderHandle.addEventListener('pointerdown', onPointerDown, { signal });
  sliderContainer.addEventListener(
    'pointerdown',
    (e) => {
      if (e.target !== sliderHandle && !sliderHandle.contains(e.target)) {
        onPointerDown(e);
      }
    },
    { signal }
  );

  sliderHandle.addEventListener('pointermove', onPointerMove, { signal });
  sliderContainer.addEventListener('pointermove', onPointerMove, { signal });

  sliderHandle.addEventListener('pointerup', onPointerUp, { signal });
  sliderHandle.addEventListener('pointercancel', onPointerUp, { signal });
  window.addEventListener('pointerup', onPointerUp, { signal });

  // Sincronización del input range para accesibilidad
  if (rangeInput) {
    rangeInput.addEventListener(
      'input',
      (e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) {
          const rightInset = (100 - val).toFixed(2);
          rasterLayer.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
          sliderHandle.style.left = `${val}%`;
          updateBadgesVisibility(val, sliderContainer.getBoundingClientRect().width);
          if (onPositionChange) {
            onPositionChange(val);
          }
        }
      },
      { signal }
    );
  }

  // Sincronizar visibilidad inicial de los badges
  requestAnimationFrame(() => {
    const initialPos = parseFloat(rangeInput?.value || 50);
    updateBadgesVisibility(initialPos, sliderContainer.getBoundingClientRect().width);
  });
}
