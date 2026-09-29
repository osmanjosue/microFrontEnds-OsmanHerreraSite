// ===========================================================================
// CONFIGURACIÓN DE ASTRO — OSMAN HERRERA SITE
// ===========================================================================

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://osmanherrera.dev',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@config': fileURLToPath(new URL('../shared/config', import.meta.url)),
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
      },
    },
  },
});
