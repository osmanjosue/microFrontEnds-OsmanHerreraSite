// ===========================================================================
// COMPONENTE: GRID (PANEL DE INVENTARIO Y FILTRO TÁCTICO)
// ===========================================================================
import { vectorConfig } from '../content/vector.config.js';
import { t } from '../i18n.js';
import { getDefaultTitle } from '../titles.js';
import { assetUrl } from '../assets-url.js';
import { escapeHtml } from '../escape.js';

/**
 * Renderiza el panel izquierdo de inventario con filtros por categoría y miniaturas accesibles.
 *
 * @param {{
 *   works: Array<any>,
 *   filteredWorks: Array<any>,
 *   activeSlug: string,
 *   activeCategory: string,
 *   activeIndexInFilter: number
 * }} props
 * @returns {string} HTML del aside de inventario
 */
export function renderGrid({
  works,
  filteredWorks,
  activeSlug,
  activeCategory,
  activeIndexInFilter,
}) {

  // Total de trabajos en el inventario completo
  const totalCount = works.length;
  // Índice de la pieza activa formateado a 2 dígitos
  const activeNumberStr = String(Math.max(1, activeIndexInFilter + 1)).padStart(2, '0');
  const counterText = t(vectorConfig.ui.worksCounter, {
    total: String(totalCount).padStart(2, '0'),
  });

  // Filtros de categoría con conteo real
  const categoriesHtml = vectorConfig.categories
    .map((cat) => {
      const isSelected = cat.id === activeCategory;
      const count =
        cat.id === 'all'
          ? works.length
          : works.filter((w) => w.category === cat.id).length;

      // Categorías con 0 piezas: no mostrarlas (ocultar el filtro, excepto "Todos")
      if (cat.id !== 'all' && count === 0) {
        return '';
      }

      // El usuario solicita explícitamente:
      // "La etiqueta de categoría debe mostrar el label traducido de categories, no el id."
      const translatedLabel = t(cat.label);
      const displayText = `${translatedLabel} (${count})`;

      const btnClasses = isSelected
        ? 'px-space-xs py-0.5 rounded bg-primary-container text-on-primary-container font-label-micro text-label-micro font-bold uppercase transition-all shadow-sm'
        : 'px-space-xs py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary font-label-micro text-label-micro uppercase transition-colors';

      return `
        <button
          type="button"
          class="category-filter-btn ${btnClasses}"
          data-category="${escapeHtml(cat.id)}"
          aria-pressed="${isSelected}"
        >
          ${escapeHtml(displayText)}
        </button>
      `;
    })
    .join('');

  // Cuadrícula de miniaturas accesibles
  const specimensHtml = filteredWorks
    .map((work) => {
      // Índice global de la pieza para su número #01
      const globalIndex = works.findIndex((w) => w.slug === work.slug);
      const indexNum = String(globalIndex + 1).padStart(2, '0');
      const isSelected = work.slug === activeSlug;
      const defaultTitle = getDefaultTitle(globalIndex);
      const thumbUrl = assetUrl(work.original);

      const itemCardClass = isSelected
        ? 'ring-2 ring-primary-container shadow-[0_0_18px_rgba(0,240,255,0.45)]'
        : 'hover:ring-1 hover:ring-primary-container';

      const selectedBadgeText = t(vectorConfig.ui.selectedBadge, { n: indexNum });
      const previewText = t(vectorConfig.ui.previewBadge);

      return `
        <button
          type="button"
          class="specimen-btn group relative aspect-square bg-surface-container rounded cursor-pointer overflow-hidden transition-all duration-200 text-left p-0 border-0 ${itemCardClass}"
          data-slug="${escapeHtml(work.slug)}"
          aria-label="${escapeHtml(defaultTitle)}"
          aria-current="${isSelected ? 'true' : 'false'}"
        >
          <img
            src="${escapeHtml(thumbUrl)}"
            alt="${escapeHtml(defaultTitle)}"
            loading="lazy"
            decoding="async"
            draggable="false"
            class="w-full h-full object-cover transition-opacity duration-300 select-none ${isSelected ? 'opacity-90' : 'group-hover:opacity-40'}"
            onerror="this.onerror=null; this.parentElement.classList.add('img-error');"
          />
          <div class="img-error-fallback hidden text-on-surface-variant font-stat-display text-stat-display items-center justify-center w-full h-full">
            —
          </div>

          <!-- Overlay al pasar el cursor (sólo para inactivos) -->
          ${
            !isSelected
              ? `
            <div class="absolute inset-0 bg-surface-container-lowest/80 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center p-1 text-center transition-opacity duration-200 pointer-events-none">
              <span class="font-label-micro text-label-micro text-primary font-bold">${escapeHtml(previewText)}</span>
              <span class="font-label-micro text-[8px] text-on-surface-variant">#${escapeHtml(indexNum)}</span>
            </div>
            <div class="absolute bottom-1 right-1 bg-surface-container-lowest/90 px-1 rounded font-label-micro text-[8px] text-on-surface-variant pointer-events-none">
              #${escapeHtml(indexNum)}
            </div>
          `
              : `
            <!-- Marcador de activo -->
            <div class="absolute top-1 left-1 bg-primary-container text-on-primary-container font-label-micro text-[8px] px-1 py-0.5 rounded font-bold tracking-tight shadow-sm flex items-center gap-0.5 pointer-events-none whitespace-nowrap">
              <span class="w-1 h-1 rounded-full bg-surface-container-lowest animate-pulse shrink-0"></span>
              <span class="sm:hidden">#${escapeHtml(indexNum)}</span>
              <span class="hidden sm:inline">${escapeHtml(selectedBadgeText)}</span>
            </div>
            <div class="absolute bottom-1 right-1 bg-surface-container-lowest/90 px-1 rounded font-label-micro text-[8px] text-primary pointer-events-none">
              #${escapeHtml(indexNum)}
            </div>
          `
          }
        </button>
      `;
    })
    .join('');

  return `
    <aside class="order-3 flex flex-col gap-space-sm bg-surface-container-lowest p-space-sm sm:p-space-md rounded-lg shadow-xl relative border border-surface-container-high/40 xl:bg-transparent xl:p-0 xl:rounded-none xl:shadow-none xl:border-0">
      <!-- Decoradores tácticos en móvil (< xl) -->
      <div class="xl:hidden absolute top-1.5 left-1.5 w-2 h-2 border-l border-t border-primary/40 pointer-events-none"></div>
      <div class="xl:hidden absolute top-1.5 right-1.5 w-2 h-2 border-r border-t border-primary/40 pointer-events-none"></div>

      <!-- Sub-barra & Controles de Matriz de Filtros -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-xs bg-surface-container-low p-space-xs rounded">
        <div class="flex items-center gap-space-xs shrink-0 whitespace-nowrap">
          <span class="font-stat-display text-stat-display text-primary-container">${escapeHtml(activeNumberStr)}</span>
          <span class="font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap">${escapeHtml(counterText)}</span>
        </div>
        <div class="flex items-center gap-space-xs flex-wrap" role="toolbar" aria-label="${escapeHtml(t(vectorConfig.ui.categoryFilterToolbar))}">
          ${categoriesHtml}
        </div>
      </div>

      <!-- Contenedor de la Cuadrícula -->
      <div
        class="grid grid-cols-4 sm:grid-cols-5 xl:grid-cols-4 gap-space-xs max-h-[740px] overflow-y-auto pr-0.5 select-none"
        id="specimen-grid"
        role="region"
        aria-label="${escapeHtml(t(vectorConfig.ui.inventoryLabel))}"
      >
        ${specimensHtml}
      </div>
    </aside>
  `;
}
