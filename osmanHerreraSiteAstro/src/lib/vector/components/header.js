// ===========================================================================
// COMPONENTE: HEADER (CABECERA TÁCTICA APEX DOSSIER)
// ===========================================================================
import { siteConfig } from '@shared/content';
import { vectorConfig, t } from '@config';
import { escapeHtml } from '../escape.js';

/**
 * Renderiza la cabecera con marca compartida, disponibilidad, nav, ubicación y toggle ES/EN.
 *
 * @param {{ currentLang: string }} props
 * @returns {string} HTML del header
 */
export function renderHeader({ currentLang }) {
  const brandHighlight = siteConfig.brand?.highlight || 'Osman';
  const brandRest = siteConfig.brand?.rest || 'Herrera.dev';
  const brandText = `${brandHighlight}${brandRest}`;

  const subtitle = t(vectorConfig.ui.brandSubtitle);
  const availability = t(vectorConfig.ui.availability);
  const locationLabel = t(vectorConfig.ui.locationLabel);
  const locationValue = vectorConfig.ui.locationValue;

  const navVector = t(vectorConfig.ui.nav.vectorWork);
  const navDev = t(vectorConfig.ui.nav.devWork);
  const navContact = t(vectorConfig.ui.nav.contact);

  const toggleTarget = currentLang === 'es' ? 'EN' : 'ES';

  return `
    <header class="fixed top-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.4)] border-b border-surface-container-high/40">
      <div class="min-h-16 sm:h-16 py-2 sm:py-0 w-full max-w-[1720px] mx-auto px-3 sm:px-margin flex items-center justify-between gap-2">
        <!-- Identidad de Marca y Subtítulo -->
        <div class="flex items-center gap-space-sm sm:gap-space-lg min-w-0">
          <div class="flex flex-col min-w-0">
            <a href="/" class="font-headline-sm text-[16px] sm:text-headline-sm text-primary uppercase tracking-tight hover:opacity-90 transition-opacity whitespace-nowrap">
              ${escapeHtml(brandText)}
            </a>
            <span class="font-label-micro text-[8px] leading-tight sm:text-label-micro text-on-surface-variant uppercase max-w-[210px] sm:max-w-none break-words">
              ${escapeHtml(subtitle)}
            </span>
          </div>

          <!-- Badge de Disponibilidad Remota -->
          <div class="hidden xl:flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container text-primary-fixed-dim">
            <span class="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
            <span class="font-label-micro text-label-micro tracking-widest uppercase">
              ${escapeHtml(availability)}
            </span>
          </div>
        </div>

        <!-- Navegación entre aplicaciones del monorepo -->
        <nav class="hidden lg:flex items-center gap-space-xs shrink-0" aria-label="${escapeHtml(t(vectorConfig.ui.mainNavAria))}">
          <a
            aria-current="page"
            class="px-space-md py-space-xs rounded font-label-caps text-label-caps uppercase bg-primary-container text-on-primary-container font-bold shadow-sm transition-colors"
            href="${import.meta.env.BASE_URL}"
          >
            ${escapeHtml(navVector)}
          </a>
          <a
            class="px-space-md py-space-xs rounded font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors uppercase"
            href="/react/"
          >
            ${escapeHtml(navDev)}
          </a>
          <a
            class="px-space-md py-space-xs rounded font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors uppercase"
            href="/react/#contact"
          >
            ${escapeHtml(navContact)}
          </a>
        </nav>

        <!-- Ubicación y Botón de Toggle Idioma -->
        <div class="flex items-center gap-2 sm:gap-space-md shrink-0">
          <div class="hidden md:flex flex-col items-end">
            <span class="font-label-micro text-label-micro text-on-surface-variant uppercase">
              ${escapeHtml(locationLabel)}
            </span>
            <span class="font-label-caps text-label-caps text-primary-fixed font-bold tracking-widest">
              ${escapeHtml(locationValue)}
            </span>
          </div>

          <button
            id="lang-toggle-btn"
            type="button"
            class="px-2.5 sm:px-space-md py-1 border border-primary-container text-primary-container hover:bg-primary-container hover:text-on-primary-container font-label-caps text-label-caps font-bold transition-colors cursor-pointer shrink-0"
            aria-label="${escapeHtml(t(vectorConfig.ui.langToggleAria, { target: toggleTarget }))}"
          >
            ${escapeHtml(toggleTarget)}
          </button>
        </div>
      </div>
    </header>
  `;
}
