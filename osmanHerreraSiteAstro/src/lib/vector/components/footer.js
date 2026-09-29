// ===========================================================================
// COMPONENTE: FOOTER (PIE DE PÁGINA TÁCTICO APEX DOSSIER)
// ===========================================================================
import { vectorConfig, t } from '@config';
import { escapeHtml } from '../escape.js';

/**
 * Renderiza el pie de página con información de pipeline, copyright y enlace a privacidad.
 *
 * @returns {string} HTML del footer
 */
export function renderFooter() {
  const currentYear = new Date().getFullYear();
  const pipelineText = t(vectorConfig.ui.footer.pipeline);
  const precisionText = t(vectorConfig.ui.footer.precision);
  const copyrightText = t(vectorConfig.ui.footer.copyright, { year: currentYear });
  const privacyLabel = t(vectorConfig.ui.footer.privacyLink);
  const privacyHref = siteConfig.footer?.privacyLink?.external || '/react/politicadeprivacidad';

  return `
    <footer class="w-full bg-surface-container-lowest border-t border-surface-container-high/40 py-space-lg mt-auto">
      <div class="max-w-[1720px] mx-auto px-margin flex flex-col md:flex-row items-center justify-between gap-space-md font-label-micro text-label-micro text-on-surface-variant">
        <div class="flex items-center gap-space-md flex-wrap justify-center md:justify-start">
          <span class="uppercase tracking-widest text-primary-fixed-dim">${escapeHtml(pipelineText)}</span>
          <span class="text-outline-variant hidden md:inline">//</span>
          <span class="uppercase">${escapeHtml(precisionText)}</span>
        </div>

        <div class="flex items-center gap-space-lg flex-wrap justify-center md:justify-end">
          <a
            href="${escapeHtml(privacyHref)}"
            class="hover:text-primary transition-colors underline underline-offset-4"
          >
            ${escapeHtml(privacyLabel)}
          </a>
          <span class="text-outline-variant hidden md:inline">//</span>
          <span>${escapeHtml(copyrightText)}</span>
        </div>
      </div>
    </footer>
  `;
}
