// ===========================================================================
// CONFIGURACIÓN DE VITE PARA OSMAN HERRERA SITE VECTOR
// ===========================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanProductionDistPlugin(mode) {
  let resolvedOutDir = null;
  return {
    name: 'clean-production-dist',
    configResolved(config) {
      resolvedOutDir = path.resolve(config.root, config.build.outDir);
    },
    closeBundle() {
      if (mode === 'production' && resolvedOutDir) {
        const distWorks = path.resolve(resolvedOutDir, 'works');
        const distData = path.resolve(resolvedOutDir, 'data');
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

export default defineConfig(({ mode }) => {
  return {
    plugins: [cleanProductionDistPlugin(mode)],
    resolve: {
      // Alias hacia el contenido compartido en ../shared
      alias: {
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
      },
    },
    // En producción se sirve bajo /vectorwork/, en desarrollo en la raíz
    base: mode === 'production' ? '/vectorwork/' : '/',
    server: {
      port: 5175,
    },
  };
});
