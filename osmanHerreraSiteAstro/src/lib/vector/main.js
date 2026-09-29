// ===========================================================================
// PUNTO DE ENTRADA PRINCIPAL MIGRADO — VECTOR WORK EN ASTRO
// ===========================================================================
import { vectorConfig } from '@config';
import { loadTitles } from './titles.js';
import { assetUrl, assetsOrigin } from './assets-url.js';
import { renderIntro } from './components/intro.js';
import { renderGrid } from './components/grid.js';
import { renderDetail } from './components/detail.js';
import { attachSliderEvents } from './components/compare-slider.js';

// ===========================================================================
// 1. REDIRECCIÓN DE COMPATIBILIDAD POR PARÁMETRO ?lang=
// ===========================================================================
// Si llega ?lang=en a /vectorwork/, redirige a /en/vectorwork/ conservando el #hash
// Si llega ?lang=es a /en/vectorwork/, redirige a /vectorwork/
if (typeof window !== 'undefined' && window.location) {
  const searchParams = new URLSearchParams(window.location.search);
  const paramLang = searchParams.get('lang')?.toLowerCase().slice(0, 2);
  const pathname = window.location.pathname;
  const hash = window.location.hash || '';

  if (paramLang === 'en' && !pathname.startsWith('/en/')) {
    window.location.replace('/en/vectorwork/' + hash);
  } else if (paramLang === 'es' && pathname.startsWith('/en/')) {
    window.location.replace('/vectorwork/' + hash);
  }
}

const app = document.getElementById('vector-app');

// ===========================================================================
// LISTA DISPONIBLE DE PIEZAS
// ===========================================================================
const works = vectorConfig.works;

// ===========================================================================
// ESTADO GLOBAL DE LA APLICACIÓN
// ===========================================================================
const state = {
  activeCategory: 'all',
  activeSlug: works[0]?.slug || 'pieza-01',
  mode: 'outline', // 'color' | 'outline' (OUTLINE por defecto: las miniaturas ya muestran el color)
  sliderPos: 50,
  titles: {},
};

// ===========================================================================
// PRECONNECT A ORIGEN DE ASSETS
// ===========================================================================
function setupPreconnect() {
  const origin = assetsOrigin();
  if (origin && !document.querySelector(`link[rel="preconnect"][href="${origin}"]`)) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = '';
    document.head.appendChild(link);
  }
}

// ===========================================================================
// PRECARGA DE LA SIGUIENTE PIEZA EN REPOSO (IDLE) — SUS 3 WEBP
// ===========================================================================
function schedulePreloadNext() {
  const runPreload = () => {
    const filtered = getFilteredWorks();
    const currentIndex = filtered.findIndex((w) => w.slug === state.activeSlug);
    if (currentIndex === -1 || filtered.length <= 1) return;

    const nextIndex = (currentIndex + 1) % filtered.length;
    const nextWork = filtered[nextIndex];
    if (!nextWork) return;

    // Precargar las 3 imágenes WebP de la pieza siguiente
    const imgOrig = new Image();
    imgOrig.src = assetUrl(nextWork.original);
    const imgVec = new Image();
    imgVec.src = assetUrl(nextWork.vector);
    const imgOut = new Image();
    imgOut.src = assetUrl(nextWork.outline);
  };

  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(runPreload, { timeout: 2000 });
  } else {
    setTimeout(runPreload, 800);
  }
}

// ===========================================================================
// HELPERS DE FILTRADO Y NAVEGACIÓN
// ===========================================================================
function getFilteredWorks() {
  if (state.activeCategory === 'all') {
    return works;
  }
  return works.filter((w) => w.category === state.activeCategory);
}

function setActiveSlug(newSlug) {
  if (state.activeSlug === newSlug) return;
  state.activeSlug = newSlug;

  // Actualizar hash en la URL sin recargar la página
  if (window.history && typeof window.history.replaceState === 'function') {
    window.history.replaceState(null, '', `#${newSlug}`);
  }

  renderApp();
}

function navigatePrev() {
  const filtered = getFilteredWorks();
  if (filtered.length <= 1) return;
  const currentIndex = filtered.findIndex((w) => w.slug === state.activeSlug);
  const prevIndex = (currentIndex - 1 + filtered.length) % filtered.length;
  setActiveSlug(filtered[prevIndex].slug);
}

function navigateNext() {
  const filtered = getFilteredWorks();
  if (filtered.length <= 1) return;
  const currentIndex = filtered.findIndex((w) => w.slug === state.activeSlug);
  const nextIndex = (currentIndex + 1) % filtered.length;
  setActiveSlug(filtered[nextIndex].slug);
}

// ===========================================================================
// RENDERIZADO PRINCIPAL DE LA APLICACIÓN (#vector-app)
// ===========================================================================
function renderApp() {
  if (!app) return;

  const filteredWorks = getFilteredWorks();

  // Validar que la pieza activa exista dentro del filtro actual
  let activeWork = filteredWorks.find((w) => w.slug === state.activeSlug);
  if (!activeWork && filteredWorks.length > 0) {
    activeWork = filteredWorks[0];
    state.activeSlug = activeWork.slug;
  } else if (!activeWork) {
    activeWork = works[0];
    state.activeSlug = activeWork.slug;
  }

  const workIndex = works.findIndex((w) => w.slug === activeWork.slug);
  const activeIndexInFilter = filteredWorks.findIndex((w) => w.slug === activeWork.slug);

  const introHtml = renderIntro();

  const gridHtml = renderGrid({
    works,
    filteredWorks,
    activeSlug: state.activeSlug,
    activeCategory: state.activeCategory,
    activeIndexInFilter,
  });

  const detailHtml = renderDetail({
    work: activeWork,
    workIndex,
    mode: state.mode,
    sliderPos: state.sliderPos,
    titlesMap: state.titles,
  });

  // Re-render que sustituye exclusivamente el contenido de #vector-app
  app.innerHTML = `
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-space-sm sm:gap-gutter items-start">
      <div class="contents xl:flex xl:flex-col xl:col-span-5 xl:sticky xl:top-[5rem] xl:self-start xl:gap-space-sm xl:bg-surface-container-lowest xl:p-space-md xl:rounded-lg xl:shadow-xl xl:relative xl:border xl:border-surface-container-high/40">
        <!-- Decoradores tácticos en escritorio (xl) -->
        <div class="hidden xl:block absolute top-1.5 left-1.5 w-2 h-2 border-l border-t border-primary/40 pointer-events-none"></div>
        <div class="hidden xl:block absolute top-1.5 right-1.5 w-2 h-2 border-r border-t border-primary/40 pointer-events-none"></div>

        ${introHtml}
        ${gridHtml}
      </div>

      ${detailHtml}
    </div>
  `;

  // Vincular eventos interactivos del DOM
  attachEventListeners();

  // Programar precarga de las 3 imágenes WebP de la siguiente pieza
  schedulePreloadNext();
}

// ===========================================================================
// VINCULACIÓN DE EVENTOS DEL DOM
// ===========================================================================
function attachEventListeners() {
  if (!app) return;

  // 1. Filtros por categoría
  const filterBtns = app.querySelectorAll('.category-filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const catId = btn.getAttribute('data-category');
      if (catId && state.activeCategory !== catId) {
        state.activeCategory = catId;
        renderApp();
      }
    });
  });

  // 2. Selección de pieza desde la cuadrícula de miniaturas
  const specimenBtns = app.querySelectorAll('.specimen-btn');
  specimenBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-slug');
      if (slug) {
        setActiveSlug(slug);
      }
    });
  });

  // 3. Botones PREV / NEXT en el detalle
  const prevBtn = app.querySelector('#btn-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', navigatePrev);
  }

  const nextBtn = app.querySelector('#btn-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', navigateNext);
  }

  // 4. Comparador antes/después (Pointer Events y Modo OUTLINE con crossfade)
  attachSliderEvents(app, {
    onPositionChange: (pos) => {
      state.sliderPos = pos;
    },
    onModeChange: (newMode) => {
      state.mode = newMode;
    },
  });
}

// ===========================================================================
// NAVEGACIÓN GLOBAL POR TECLADO (FLECHAS IZQUIERDA / DERECHA)
// ===========================================================================
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

    // Ignorar si el foco está en un elemento interactivo
    const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
    const isInteractiveActive =
      activeTag === 'input' ||
      activeTag === 'button' ||
      activeTag === 'textarea' ||
      activeTag === 'select' ||
      document.activeElement?.id === 'slider-range-input';

    if (isInteractiveActive) {
      return;
    }

    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      navigatePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      navigateNext();
    }
  });

  // ===========================================================================
  // RESPUESTA A CAMBIOS DE HASH EN LA URL (HISTORIAL DEL NAVEGADOR)
  // ===========================================================================
  window.addEventListener('hashchange', () => {
    const hashSlug = window.location.hash.replace(/^#/, '');
    if (hashSlug && hashSlug !== state.activeSlug) {
      const exists = works.some((w) => w.slug === hashSlug);
      if (exists) {
        state.activeSlug = hashSlug;
        renderApp();
      } else {
        const fallbackSlug = works[0]?.slug || '';
        state.activeSlug = fallbackSlug;
        if (window.history && typeof window.history.replaceState === 'function' && fallbackSlug) {
          window.history.replaceState(null, '', `#${fallbackSlug}`);
        }
        renderApp();
      }
    }
  });
}

// ===========================================================================
// ARRANQUE DE LA APLICACIÓN
// ===========================================================================
if (app) {
  setupPreconnect();

  // 1. Inicializar pieza activa a partir del #hash si existe y corregir si es inválido
  const initialHashSlug = typeof window !== 'undefined' ? window.location.hash.replace(/^#/, '') : '';
  if (initialHashSlug) {
    const exists = works.some((w) => w.slug === initialHashSlug);
    if (exists) {
      state.activeSlug = initialHashSlug;
    } else {
      const fallbackSlug = works[0]?.slug || '';
      state.activeSlug = fallbackSlug;
      if (typeof window !== 'undefined' && window.history && typeof window.history.replaceState === 'function' && fallbackSlug) {
        window.history.replaceState(null, '', `#${fallbackSlug}`);
      }
    }
  }

  // 2. Renderizado inicial inmediato con títulos por defecto
  renderApp();

  // 3. Carga asíncrona de títulos reales en runtime (no indexables)
  loadTitles()
    .then((titles) => {
      state.titles = titles || {};
      renderApp();
    })
    .catch(() => {
      // Si falla, se conservan los títulos por defecto
    });
}
