// ===========================================================================
// CONFIGURACIÓN DE ASTRO — OSMAN HERRERA SITE
// ===========================================================================

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Recorta works/ y data/ en el build de producción para evitar subirlos al repo/dist,
 * ya que se sirven desde CDN o ruta específica de VPS.
 */
function cleanProductionDistIntegration() {
  return {
    name: 'clean-production-dist',
    hooks: {
      'astro:build:done': ({ dir }) => {
        const outDir = fileURLToPath(dir);
        const distWorks = path.resolve(outDir, 'vectorwork/works');
        const distData = path.resolve(outDir, 'vectorwork/data');
        if (fs.existsSync(distWorks)) {
          fs.rmSync(distWorks, { recursive: true, force: true });
        }
        if (fs.existsSync(distData)) {
          fs.rmSync(distData, { recursive: true, force: true });
        }
      },
    },
  };
}

function cleanProductionDistPlugin() {
  let resolvedOutDir = null;
  return {
    name: 'clean-production-dist-vite',
    configResolved(config) {
      resolvedOutDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      if (resolvedOutDir) {
        const distWorks = path.resolve(resolvedOutDir, 'vectorwork/works');
        const distData = path.resolve(resolvedOutDir, 'vectorwork/data');
        if (fs.existsSync(distWorks)) {
          fs.rmSync(distWorks, { recursive: true, force: true });
        }
        if (fs.existsSync(distData)) {
          fs.rmSync(distData, { recursive: true, force: true });
        }
      }
    },
  };
}

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://osmanherrera.dev',
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [react(), cleanProductionDistIntegration()],
  vite: {
    plugins: [cleanProductionDistPlugin()],
    resolve: {
      alias: {
        '@config': fileURLToPath(new URL('../shared/config', import.meta.url)),
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
      },
    },
  },
});
