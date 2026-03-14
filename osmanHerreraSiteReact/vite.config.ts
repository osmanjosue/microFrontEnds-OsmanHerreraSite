import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Si mode es 'production' (npm run build), usa '/react/'
    // Si no, usa '/' para desarrollo local
    base: mode === 'production' ? '/react/' : '/',
  }
})
