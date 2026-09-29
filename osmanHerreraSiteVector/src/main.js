// ===========================================================================
// PUNTO DE ENTRADA PRINCIPAL — OSMAN HERRERA VECTOR WORK
// ===========================================================================
import './style.css';
import { vectorConfig } from './content/vector.config.js';
import { getLang, setLang, t } from './i18n.js';
import { loadTitles } from './titles.js';
import { assetUrl, assetsOrigin } from './assets-url.js';
import { renderHeader } from './components/header.js';
import { renderIntro } from './components/intro.js';
import { renderGrid } from './components/grid.js';
import { renderDetail } from './components/detail.js';
import { attachSliderEvents } from './components/compare-slider.js';
import { renderFooter } from './components/footer.js';

const app = document.getElementById('app');

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
  mode: 'color', // 'color' | 'outline'
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
// METADATOS GENÉRICOS (SEO Y PESTAÑA DEL NAVEGADOR)
// ===========================================================================
function updateDocumentMeta() {
  const currentLang = getLang();
  document.documentElement.lang = currentLang;
  document.title = t(vectorConfig.ui.pageTitle);

  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', t(vectorConfig.ui.metaDescription));
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
// RENDERIZADO PRINCIPAL DE LA APLICACIÓN
// ===========================================================================
function renderApp() {
  updateDocumentMeta();
  const currentLang = getLang();

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

  // Construir HTML de componentes principales
  const headerHtml = renderHeader({ currentLang });
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

  const footerHtml = renderFooter();

  if (!app) return;

  app.innerHTML = `
    <div class="min-h-screen flex flex-col bg-surface text-on-surface overflow-x-clip">
      ${headerHtml}

      <main class="w-full pt-16 sm:pt-[4.3125rem] bg-surface min-h-[calc(100vh-5rem)] flex-1">
        <div class="w-full px-3 sm:px-margin py-space-sm sm:py-space-md max-w-[1720px] mx-auto">
          <!-- Grilla Maestra de 12 Columnas en XL (En móvil: Intro -> Detalle -> Grilla; en XL: Columna izquierda sticky con Intro+Grilla y Columna derecha con Detalle) -->
          <div class="grid grid-cols-1 xl:grid-cols-12 gap-space-sm sm:gap-gutter items-start">
            <div class="contents xl:flex xl:flex-col xl:col-span-5 xl:sticky xl:top-[4.25rem] xl:self-start xl:gap-space-sm xl:bg-surface-container-lowest xl:p-space-md xl:rounded-lg xl:shadow-xl xl:relative xl:border xl:border-surface-container-high/40">
              <!-- Decoradores tácticos en escritorio (xl) -->
              <div class="hidden xl:block absolute top-1.5 left-1.5 w-2 h-2 border-l border-t border-primary/40 pointer-events-none"></div>
              <div class="hidden xl:block absolute top-1.5 right-1.5 w-2 h-2 border-r border-t border-primary/40 pointer-events-none"></div>

              ${introHtml}
              ${gridHtml}
            </div>

            ${detailHtml}
          </div>
        </div>
      </main>

      ${footerHtml}
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

  // 1. Botón de Toggle de Idioma en el Header
  const langBtn = app.querySelector('#lang-toggle-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const current = getLang();
      setLang(current === 'es' ? 'en' : 'es');
    });
  }

  // 2. Filtros por categoría
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

  // 3. Selección de pieza desde la cuadrícula de miniaturas
  const specimenBtns = app.querySelectorAll('.specimen-btn');
  specimenBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const slug = btn.getAttribute('data-slug');
      if (slug) {
        setActiveSlug(slug);
      }
    });
  });

  // 4. Botones PREV / NEXT en el detalle
  const prevBtn = app.querySelector('#btn-prev');
  if (prevBtn) {
    prevBtn.addEventListener('click', navigatePrev);
  }

  const nextBtn = app.querySelector('#btn-next');
  if (nextBtn) {
    nextBtn.addEventListener('click', navigateNext);
  }

  // 5. Comparador antes/después (Pointer Events y Modo OUTLINE con crossfade)
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
window.addEventListener('keydown', (e) => {
  if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

  // Ignorar si el foco está en un elemento interactivo (input, slider-range, button, textarea, select)
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

// ===========================================================================
// RESPUESTA AL CAMBIO DE IDIOMA
// ===========================================================================
window.addEventListener('langchange', () => {
  renderApp();
});

// ===========================================================================
// ARRANQUE DE LA APLICACIÓN
// ===========================================================================
setupPreconnect();

// 1. Inicializar pieza activa a partir del #hash si existe y corregir si es inválido
const initialHashSlug = window.location.hash.replace(/^#/, '');
if (initialHashSlug) {
  const exists = works.some((w) => w.slug === initialHashSlug);
  if (exists) {
    state.activeSlug = initialHashSlug;
  } else {
    const fallbackSlug = works[0]?.slug || '';
    state.activeSlug = fallbackSlug;
    if (window.history && typeof window.history.replaceState === 'function' && fallbackSlug) {
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
    // Actualizar títulos en el DOM sin recargar la página
    renderApp();
  })
  .catch(() => {
    // Si falla, se conservan los títulos por defecto
  });
