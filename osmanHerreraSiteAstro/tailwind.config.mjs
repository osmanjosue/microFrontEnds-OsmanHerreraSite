// ===========================================================================
// CONFIGURACIÓN DE TAILWIND CSS — OSMAN HERRERA SITE (ASTRO)
// ===========================================================================

import sharedPreset from '../shared/tailwind.preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  presets: [sharedPreset],
  darkMode: 'class',
  plugins: [],
};
