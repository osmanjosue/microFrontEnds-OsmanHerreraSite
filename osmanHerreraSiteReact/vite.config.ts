import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    resolve: {
      // Contenido compartido con la versión Angular (../shared)
      alias: {
        '@shared': fileURLToPath(new URL('../shared', import.meta.url)),
      },
    },
    // Si mode es 'production' (npm run build), usa '/react/'
    // Si no, usa '/' para desarrollo local
    base: mode === 'production' ? '/react/' : '/',
  }
})
