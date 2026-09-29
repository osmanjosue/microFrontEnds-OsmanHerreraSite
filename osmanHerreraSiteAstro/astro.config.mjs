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
  integrations: [react()],
  vite: {
    resolve: {
      alias: {
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
      },
    },
  },
});
