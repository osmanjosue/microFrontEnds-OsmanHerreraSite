// ===========================================================================
// COMPONENTE: INTRO (ENCABEZADO DE SECCIÓN Y BADGES DE AUTENTICIDAD)
// ===========================================================================
import { vectorConfig } from '../content/vector.config.js';
import { t } from '../i18n.js';
import { escapeHtml } from '../escape.js';

/**
 * Renderiza el bloque de introducción (badges HAND-TRACED / NO AUTO-TRACE, h1 y subtítulo).
 * En móvil (< xl) se muestra PRIMERO (order-1) con diseño de tarjeta táctica.
 * En desktop (xl) se integra de forma transparente como cabecera de la columna izquierda sticky.
 *
 * @returns {string} HTML del bloque de introducción
 */
export function renderIntro() {
  const badgeHandTraced = t(vectorConfig.ui.badgeHandTraced);
  const badgeNoAi = t(vectorConfig.ui.badgeNoAi);
  const pageHeading = t(vectorConfig.ui.pageHeading);
  const pageSubtitle = t(vectorConfig.ui.pageSubtitle);

  return `
    <div class="order-1 flex flex-col gap-space-xs bg-surface-container-lowest p-space-sm sm:p-space-md rounded-lg shadow-xl relative border border-surface-container-high/40 xl:bg-transparent xl:p-0 xl:rounded-none xl:shadow-none xl:border-0 xl:pb-space-xs xl:border-b xl:border-surface-container-high/60">
      <!-- Decoradores tácticos en móvil (< xl) -->
      <div class="xl:hidden absolute top-1.5 left-1.5 w-2 h-2 border-l border-t border-primary/40 pointer-events-none"></div>
      <div class="xl:hidden absolute top-1.5 right-1.5 w-2 h-2 border-r border-t border-primary/40 pointer-events-none"></div>

      <div class="flex items-center justify-between gap-2 flex-wrap">
        <span class="font-label-micro text-label-micro text-primary-fixed-dim uppercase tracking-widest flex items-center gap-space-xs">
          <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-ping"></span>
          ${escapeHtml(badgeHandTraced)}
        </span>
        <span class="font-label-caps text-label-caps px-space-xs py-0.5 rounded bg-surface-container text-secondary font-bold">
          ${escapeHtml(badgeNoAi)}
        </span>
      </div>
      <h1 class="font-headline-lg text-headline-lg text-primary tracking-tight">
        ${escapeHtml(pageHeading)}
      </h1>
      <p class="font-body-sm text-body-sm text-on-surface-variant">
        ${escapeHtml(pageSubtitle)}
      </p>
    </div>
  `;
}
