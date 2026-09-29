// ===========================================================================
// COMPONENTE: DETAIL (PANEL DE INSPECCIÓN TÉCNICA Y ESPECIFICACIONES)
// ===========================================================================
import { vectorConfig } from '../content/vector.config.js';
import { getLang, t } from '../i18n.js';
import { getTitle, getCredit } from '../titles.js';
import { escapeHtml } from '../escape.js';
import { renderCompareSliderHtml } from './compare-slider.js';
import statsData from '../content/stats.json';

/**
 * Renderiza el panel derecho de detalle técnico con slider interactivo,
 * métricas reales del SVG precalculadas, tarjetas técnicas y herramientas.
 *
 * @param {{
 *   work: any,
 *   workIndex: number,
 *   mode: 'color' | 'outline',
 *   sliderPos: number,
 *   titlesMap: Record<string, any>
 * }} props
 * @returns {string} HTML de la sección de detalle
 */
export function renderDetail({
  work,
  workIndex,
  mode,
  sliderPos,
  titlesMap,
}) {
  const currentLang = getLang();

  // 1. Título real o por defecto protegido contra indexación
  const rawTitle = getTitle(work, workIndex, titlesMap);
  const safeTitle = escapeHtml(rawTitle);

  // Crédito opcional del arte base
  const rawCredit = getCredit(work, titlesMap);
  const creditPrefix = t(vectorConfig.ui.originalArtPrefix);
  const creditHtml = rawCredit
    ? `<p class="font-label-micro text-label-micro text-on-surface-variant tracking-wider mt-0.5" data-nosnippet>${escapeHtml(creditPrefix)}<span class="font-semibold text-on-surface-variant">${escapeHtml(rawCredit)}</span></p>`
    : '';

  // 2. Etiqueta traducida de la categoría
  const categoryObj = vectorConfig.categories.find((c) => c.id === work.category);
  const categoryLabel = categoryObj ? t(categoryObj.label) : work.category;
  const safeCategory = escapeHtml(categoryLabel.toUpperCase());

  // 3. Métricas numéricas precalculadas (desde stats.json)
  const pieceStats = statsData[work.slug];

  // Chip de técnica mixta si tiene rasters incrustados (tramas de semitonos, etc.)
  const hasRasters =
    pieceStats && typeof pieceStats.rasters === 'number' && pieceStats.rasters > 0;
  const rasterChipHtml = hasRasters
    ? `<span class="px-space-xs py-0.5 rounded border border-secondary/40 bg-secondary/10 text-secondary font-label-caps text-label-caps font-bold tracking-wider cursor-help" title="${escapeHtml(t(vectorConfig.ui.vectorRasterTooltip))}">${escapeHtml(t(vectorConfig.ui.vectorRasterChip))}</span>`
    : '';

  // 4. Botones PREV / NEXT
  const prevLabel = t(vectorConfig.ui.prev);
  const nextLabel = t(vectorConfig.ui.next);

  // 4. Métricas numéricas precalculadas (desde stats.json)
  const pathsFormatted =
    pieceStats && typeof pieceStats.paths === 'number'
      ? pieceStats.paths.toLocaleString(currentLang)
      : '—';
  const anchorsFormatted =
    pieceStats && typeof pieceStats.anchors === 'number'
      ? pieceStats.anchors.toLocaleString(currentLang)
      : '—';
  const colorsFormatted =
    pieceStats && typeof pieceStats.colors === 'number'
      ? pieceStats.colors.toLocaleString(currentLang)
      : '—';

  let artboardVal = '—';
  if (pieceStats && Array.isArray(pieceStats.artboard) && pieceStats.artboard.length >= 2) {
    artboardVal = `${pieceStats.artboard[0]} × ${pieceStats.artboard[1]}`;
  }

  // Métrica opcional de horas
  const hoursUnitConfig = vectorConfig.ui.hoursUnit;
  const langUnit = hoursUnitConfig ? (hoursUnitConfig[currentLang] || hoursUnitConfig.es || hoursUnitConfig) : null;
  const hoursUnit = langUnit
    ? (work.hours === 1 ? langUnit.one : langUnit.other)
    : (work.hours === 1 ? 'HR' : 'HRS');

  const hoursMetric =
    typeof work.hours === 'number'
      ? `
    <div class="col-span-2 sm:col-span-1 bg-surface-container-low p-space-xs rounded flex flex-col">
      <span class="font-label-micro text-label-micro text-on-surface-variant uppercase">${escapeHtml(t(vectorConfig.ui.metrics.hours))}</span>
      <span class="font-stat-display text-stat-display text-secondary">${escapeHtml(work.hours.toLocaleString(currentLang))} ${escapeHtml(hoursUnit)}</span>
    </div>
  `
      : '';

  const metricsCols = typeof work.hours === 'number' ? 'grid-cols-2 sm:grid-cols-5' : 'grid-cols-2 sm:grid-cols-4';

  // 5. Slider interactivo HTML
  const sliderHtml = renderCompareSliderHtml({
    work,
    workIndex,
    mode,
    sliderPos,
  });

  // 6. Textos de las 4 tarjetas técnicas
  const briefTemplate = work.brief ? (work.brief[currentLang] || work.brief.es || '') : '';
  const challengeTemplate = work.challenge ? (work.challenge[currentLang] || work.challenge.es || '') : '';
  const resultTemplate = work.result ? (work.result[currentLang] || work.result.es || '') : '';

  const briefHasTitle = typeof briefTemplate === 'string' && briefTemplate.includes('{title}');
  const challengeHasTitle = typeof challengeTemplate === 'string' && challengeTemplate.includes('{title}');
  const resultHasTitle = typeof resultTemplate === 'string' && resultTemplate.includes('{title}');

  const briefText = t(work.brief, { title: rawTitle });
  const challengeText = t(work.challenge, { title: rawTitle });

  const rawTechniqueList = work.technique
    ? (Array.isArray(work.technique) ? work.technique : (work.technique[currentLang] || work.technique.es || []))
    : [];

  const techniqueListHtml = rawTechniqueList
    .map((item) => {
      const itemHasTitle = typeof item === 'string' && item.includes('{title}');
      const renderedItem = typeof item === 'string' ? item.replace(/\{title\}/g, rawTitle) : String(item);
      const noSnippetAttr = itemHasTitle ? ' data-nosnippet' : '';
      return `<li class="leading-tight"${noSnippetAttr}>${escapeHtml(renderedItem)}</li>`;
    })
    .join('');

  const resultText = t(work.result, { title: rawTitle });

  // 7. Herramientas usadas
  const toolsList = Array.isArray(work.tools) ? work.tools.join(' · ') : '';

  return `
    <section class="order-2 xl:col-span-7 flex flex-col gap-space-md bg-surface-container-lowest p-space-sm sm:p-space-md rounded-lg shadow-xl relative border border-surface-container-high/40 max-w-full overflow-hidden">
      <!-- Barra superior de metadatos de la pieza -->
      <div class="flex flex-col gap-space-xs pb-space-sm border-b border-surface-container-high/60">
        <div class="flex flex-wrap items-center justify-between gap-2">
          <!-- Chip de categoría traducido y chip de técnica mixta -->
          <div class="flex items-center gap-space-xs flex-wrap">
            <span class="px-space-xs py-0.5 rounded bg-primary-container/20 text-primary font-label-caps text-label-caps font-bold tracking-wider">
              ${safeCategory}
            </span>
            ${rasterChipHtml}
          </div>

          <!-- Controles de navegación de pieza (PREV / NEXT) -->
          <div class="flex items-center gap-1 sm:gap-space-xs shrink-0" role="toolbar" aria-label="${escapeHtml(t(vectorConfig.ui.navPiecesToolbar))}">
            <button
              id="btn-prev"
              type="button"
              class="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary font-label-caps text-label-caps flex items-center gap-1 transition-colors cursor-pointer"
              title="${escapeHtml(t(vectorConfig.ui.prevTitle))}"
            >
              <span class="material-symbols-outlined text-[14px]">arrow_back</span>
              <span>${escapeHtml(prevLabel)}</span> <span class="text-outline-variant font-normal hidden sm:inline">(←)</span>
            </button>
            <button
              id="btn-next"
              type="button"
              class="px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary font-label-caps text-label-caps flex items-center gap-1 transition-colors cursor-pointer"
              title="${escapeHtml(t(vectorConfig.ui.nextTitle))}"
            >
              <span>${escapeHtml(nextLabel)}</span> <span class="text-outline-variant font-normal hidden sm:inline">(→)</span>
              <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>

        <!-- Título principal con data-nosnippet -->
        <h2 class="font-headline-sm sm:font-headline-lg text-headline-sm sm:text-headline-lg text-primary tracking-tight" id="active-title" data-nosnippet>
          ${safeTitle}
        </h2>
        ${creditHtml}

        <!-- Telemetría y métricas del SVG -->
        <div class="grid ${metricsCols} gap-space-xs pt-space-xs">
          <div class="bg-surface-container-low p-space-xs rounded flex flex-col cursor-help" title="${escapeHtml(t(vectorConfig.ui.anchorsTooltip))}">
            <span class="font-label-micro text-label-micro text-on-surface-variant uppercase">${escapeHtml(t(vectorConfig.ui.metrics.anchors))}</span>
            <span class="font-stat-display text-stat-display text-primary-container" aria-label="${escapeHtml(t(vectorConfig.ui.anchorsTooltip))}">${anchorsFormatted !== '—' ? `≈${escapeHtml(anchorsFormatted)}` : '—'}</span>
          </div>
          <div class="bg-surface-container-low p-space-xs rounded flex flex-col">
            <span class="font-label-micro text-label-micro text-on-surface-variant uppercase">${escapeHtml(t(vectorConfig.ui.metrics.paths))}</span>
            <span class="font-stat-display text-stat-display text-primary">${escapeHtml(pathsFormatted)}</span>
          </div>
          <div class="bg-surface-container-low p-space-xs rounded flex flex-col">
            <span class="font-label-micro text-label-micro text-on-surface-variant uppercase">${escapeHtml(t(vectorConfig.ui.metrics.colors))}</span>
            <span class="font-stat-display text-stat-display text-secondary">${escapeHtml(colorsFormatted)}</span>
          </div>
          <div class="bg-surface-container-low p-space-xs rounded flex flex-col">
            <span class="font-label-micro text-label-micro text-on-surface-variant uppercase">${escapeHtml(t(vectorConfig.ui.metrics.artboard))}</span>
            <span class="font-stat-display text-stat-display text-primary-fixed">${escapeHtml(artboardVal)}</span>
          </div>
          ${hoursMetric}
        </div>
      </div>

      <!-- Slider interactivo de comparación antes / después -->
      ${sliderHtml}

      <!-- 4 Tarjetas técnicas estructuradas en rejilla 2x2 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-space-xs pt-1">
        <!-- 1. BRIEF -->
        <div class="bg-surface-container-low p-space-xs sm:p-space-sm rounded border border-surface-container-high/60 flex flex-col gap-0.5 chamfer">
          <div class="flex items-center gap-space-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            <span class="font-label-caps text-label-caps text-primary uppercase font-bold tracking-wider">${escapeHtml(t(vectorConfig.ui.cards.brief))}</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"${briefHasTitle ? ' data-nosnippet' : ''}>${escapeHtml(briefText)}</p>
        </div>

        <!-- 2. RETO -->
        <div class="bg-surface-container-low p-space-xs sm:p-space-sm rounded border border-surface-container-high/60 flex flex-col gap-0.5 chamfer">
          <div class="flex items-center gap-space-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            <span class="font-label-caps text-label-caps text-secondary uppercase font-bold tracking-wider">${escapeHtml(t(vectorConfig.ui.cards.challenge))}</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"${challengeHasTitle ? ' data-nosnippet' : ''}>${escapeHtml(challengeText)}</p>
        </div>

        <!-- 3. TÉCNICA (lista de viñetas) -->
        <div class="bg-surface-container-low p-space-xs sm:p-space-sm rounded border border-surface-container-high/60 flex flex-col gap-0.5 chamfer">
          <div class="flex items-center gap-space-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-fixed-dim"></span>
            <span class="font-label-caps text-label-caps text-primary-fixed-dim uppercase font-bold tracking-wider">${escapeHtml(t(vectorConfig.ui.cards.technique))}</span>
          </div>
          <ul class="font-body-sm text-body-sm text-on-surface-variant flex flex-col gap-0.5 pl-3 list-disc">
            ${techniqueListHtml}
          </ul>
        </div>

        <!-- 4. RESULTADO -->
        <div class="bg-surface-container-low p-space-xs sm:p-space-sm rounded border border-surface-container-high/60 flex flex-col gap-0.5 chamfer">
          <div class="flex items-center gap-space-xs">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            <span class="font-label-caps text-label-caps text-primary-container uppercase font-bold tracking-wider">${escapeHtml(t(vectorConfig.ui.cards.result))}</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed"${resultHasTitle ? ' data-nosnippet' : ''}>${escapeHtml(resultText)}</p>
        </div>
      </div>

      <!-- Fila inferior: Herramientas utilizadas -->
      <div class="mt-auto pt-space-xs border-t border-surface-container-high/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">
        <div class="flex items-center gap-space-xs text-on-surface-variant font-label-micro text-label-micro flex-wrap">
          <span class="material-symbols-outlined text-[16px] text-primary">terminal</span>
          <span>${escapeHtml(t(vectorConfig.ui.toolsLabel))} ${escapeHtml(toolsList)}</span>
        </div>
      </div>
    </section>
  `;
}
