// ===========================================================================
// PRESET COMPARTIDO DE TAILWIND CSS — DESIGN SYSTEM APEX DOSSIER
// ===========================================================================
// Fuente de verdad de los tokens de diseño compartidos entre microfrontends.
// Basado en osmanHerreraSiteVector/tailwind.config.js y DESIGN.md.
// ===========================================================================

import plugin from 'tailwindcss/plugin.js';

export default {
  theme: {
    extend: {
      colors: {
        'on-secondary-fixed': '#271900',
        tertiary: '#e9f9ff',
        'surface-tint': '#00dbe9',
        'on-primary-fixed-variant': '#004f54',
        error: '#ffb4ab',
        'on-primary-fixed': '#002022',
        'inverse-on-surface': '#2f3036',
        'on-secondary-container': '#694900',
        'surface-bright': '#38393e',
        'primary-fixed': '#7df4ff',
        'on-background': '#e3e1e9',
        'surface-container': '#1e1f25',
        'on-tertiary': '#003642',
        'on-error': '#690005',
        'primary-container': '#00f0ff',
        'on-primary': '#00363a',
        'inverse-primary': '#006970',
        'tertiary-container': '#96e5ff',
        'outline-variant': '#3b494b',
        'primary-fixed-dim': '#00dbe9',
        'on-primary-container': '#006970',
        'on-surface-variant': '#b9cacb',
        'tertiary-fixed-dim': '#4cd6fb',
        'error-container': '#93000a',
        'surface-container-highest': '#34343a',
        primary: '#dbfcff',
        'surface-dim': '#121318',
        'on-surface': '#e3e1e9',
        'on-secondary': '#422c00',
        outline: '#849495',
        'surface-container-low': '#1a1b20',
        'on-tertiary-container': '#00687e',
        'on-error-container': '#ffdad6',
        surface: '#121318',
        'surface-container-high': '#292a2f',
        'tertiary-fixed': '#b3ebff',
        'secondary-fixed-dim': '#ffba27',
        'on-tertiary-fixed': '#001f27',
        'inverse-surface': '#e3e1e9',
        'surface-container-lowest': '#0d0e13',
        'secondary-container': '#fbb400',
        'surface-variant': '#34343a',
        background: '#121318',
        'secondary-fixed': '#ffdea9',
        secondary: '#ffd795',
        'on-secondary-fixed-variant': '#5e4100',
        'on-tertiary-fixed-variant': '#004e5f',
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px',
      },
      spacing: {
        'margin-mobile': '0.75rem',
        gutter: '0.75rem',
        'space-xs': '0.25rem',
        'space-md': '0.75rem',
        margin: '1.5rem',
        'space-lg': '1rem',
        'gutter-mobile': '0.5rem',
        'space-sm': '0.5rem',
        'space-xl': '1.5rem',
      },
      fontFamily: {
        'headline-xl-mobile': ['Space Grotesk', 'sans-serif'],
        'label-micro': ['JetBrains Mono', 'monospace'],
        'body-md': ['Inter', 'sans-serif'],
        'label-caps': ['JetBrains Mono', 'monospace'],
        'headline-sm': ['Space Grotesk', 'sans-serif'],
        'headline-xl': ['Space Grotesk', 'sans-serif'],
        'body-sm': ['Inter', 'sans-serif'],
        'headline-lg': ['Space Grotesk', 'sans-serif'],
        'stat-display': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'headline-xl-mobile': ['30px', { lineHeight: '34px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'label-micro': ['9px', { lineHeight: '10px', letterSpacing: '0.15em', fontWeight: '500' }],
        'body-md': ['13px', { lineHeight: '18px', letterSpacing: '0em', fontWeight: '400' }],
        'label-caps': ['10px', { lineHeight: '12px', letterSpacing: '0.12em', fontWeight: '600' }],
        'headline-sm': ['18px', { lineHeight: '22px', letterSpacing: '0.02em', fontWeight: '600' }],
        'headline-xl': ['44px', { lineHeight: '48px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'body-sm': ['11px', { lineHeight: '15px', letterSpacing: '0.01em', fontWeight: '400' }],
        'headline-lg': ['28px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '700' }],
        'stat-display': ['20px', { lineHeight: '20px', letterSpacing: '-0.03em', fontWeight: '700' }],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        // Chaflán mecánico en la esquina superior derecha (Apex Dossier)
        // También disponible en el CSS global como fallback
        '.chamfer': {
          'clip-path': 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
        },
        // Variante con borde: usa posición relativa + ::before para dibujar la diagonal
        // sin clip-path (que cortaría el borde). El color del borde se hereda de currentColor.
        '.chamfer-border': {
          position: 'relative',
          'clip-path': 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '0',
            right: '0',
            width: '14px',
            height: '1px',
            background:
              'linear-gradient(225deg, transparent 50%, currentColor 50%)',
            'pointer-events': 'none',
          },
        },
      });
    }),
  ],
};
