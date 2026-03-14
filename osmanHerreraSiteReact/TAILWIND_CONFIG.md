# ⚙️ Configuración Detallada - Tailwind CSS & Variables

## 📋 Contenido

1. [tailwind.config.js](#tailwindconfigjs)
2. [Mapeado de Variables CSS](#mapeado-de-variables-css)
3. [Clases Personalizadas Disponibles](#clases-personalizadas-disponibles)
4. [Ejemplos de Uso](#ejemplos-de-uso)

---

## `tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mapeando variables CSS a Tailwind
        'app-bg': 'var(--background)',      // #000000
        'app-front': 'var(--front)',        // #ffffff
        'app-variant': 'var(--variant)',    // #ff5e00
        'app-card': 'var(--card)',          // #e8e8e8
        
        // Extensiones para glasmorphism
        'glass-light': 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(0, 0, 0, 0.1)',
      },
      backdropFilter: {
        'glass': 'blur(10px)',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.08)',
        'glass-dark': 'rgba(0, 0, 0, 0.3)',
      },
      borderColor: {
        'glass': 'rgba(255, 255, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 94, 0, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 94, 0, 0.6)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.8s ease-out',
        'glow': 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
```

---

## Mapeado de Variables CSS

### 🎨 Colores Principales

| Variable CSS     | Tailwind Class | Color Hex | Uso                  |
|-----------------|---|-----------|---------------------|
| `--background`  | `app-bg` | #000000 | Fondos principales    |
| `--front`       | `app-front` | #ffffff | Texto principal       |
| `--variant`     | `app-variant` | #ff5e00 | Acentos (naranja)    |
| `--card`        | `app-card` | #e8e8e8 | Fondos secundarios   |

### 🔮 Glassmorphism

| Clase Tailwind | Valor CSS | Propósito |
|---|---|---|
| `bg-glass` | `rgba(255, 255, 255, 0.08)` | Fondo frosted light |
| `bg-glass-dark` | `rgba(0, 0, 0, 0.3)` | Fondo frosted dark |
| `border-glass` | `rgba(255, 255, 255, 0.2)` | Borde glassmorphism |
| `backdrop-glass` | `blur(10px)` | Efecto blur |

---

## Clases Personalizadas Disponibles

### 🏗️ Utilidades Base

```css
/* Glasmorphism completo */
.glass {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid var(--glass-border);
  border-radius: 1.5rem;
}

.glass-dark {
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: var(--glass-backdrop);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
}
```

### 🎬 Animaciones

```css
.animate-fade-in    /* Aparición suave vertical */
.animate-slide-up   /* Deslizamiento hacia arriba */
.animate-glow       /* Efecto glow pulsante (variant color) */
.animate-pulse-glow /* Pulso suave de opacidad */
```

### 🎯 Componentes

```css
.header-sticky      /* Header pegajoso con efecto */
.hero-section       /* Sección Hero con gradientes */
.hero-title         /* Título con gradiente de color */
.profile-card       /* Tarjeta de perfil glassmorphism */
.badge              /* Badges de habilidades */
.social-btn         /* Botones sociales */
.cv-button          /* Botón de descargar CV */
.technologies-grid  /* Grid de tecnologías */
.tech-card          /* Tarjeta individual de tech */
.certificate-card   /* Tarjeta de certificados */
.experience-card    /* Tarjeta de experiencia */
.contact-method     /* Métodos de contacto */
.form-glass         /* Formulario glassmorphism */
```

---

## Ejemplos de Uso

### 1️⃣ Usar Colores Mapeados

```jsx
// Texto
<p className="text-app-front">Texto blanco</p>
<p className="text-app-variant">Texto naranja</p>

// Fondo
<div className="bg-app-bg">Fondo negro</div>
<div className="bg-app-card">Fondo gris claro</div>

// Bordes
<div className="border border-app-variant">Borde naranja</div>

// Hover
<button className="bg-app-bg hover:bg-app-variant transition">
  Botón con hover
</button>
```

### 2️⃣ Glasmorphism Base

```jsx
// Componente glasmorphism simple
<div className="glass p-6">
  <h3 className="text-app-front">Contenido Frosted</h3>
</div>

// Con animación
<div className="glass animate-fade-in p-8">
  <p>Aparece suavemente</p>
</div>

// Oscuro
<div className="glass-dark p-6">
  <p className="text-app-front">Glasmorphism oscuro</p>
</div>
```

### 3️⃣ Grid de Tecnologías

```jsx
<div className="technologies-grid">
  {technologies.map((tech, i) => (
    <div key={i} className="tech-card">
      <span
        className="tech-icon icon-mask"
        style={{ '--icon-url': `url(${tech.icon})` }}
      />
      <p className="tech-name">{tech.title}</p>
    </div>
  ))}
</div>
```

### 4️⃣ Formulario Glasmorphism

```jsx
<form className="form-glass">
  <div className="form-group">
    <label className="form-label">Tu Nombre</label>
    <input
      type="text"
      className="form-input"
      placeholder="Ingresa tu nombre"
    />
  </div>
  
  <div className="form-group">
    <label className="form-label">Mensaje</label>
    <textarea
      className="form-textarea"
      placeholder="Tu mensaje..."
    />
  </div>
  
  <button type="submit" className="form-button w-full">
    Enviar
  </button>
</form>
```

### 5️⃣ Animaciones

```jsx
// Fade in
<div className="animate-fade-in">Aparición suave</div>

// Slide up
<div className="hero-content">Slide up 0.8s</div>

// Glow (requiere animación CSS)
<a className="cv-button animate-glow">
  Botón destacado con glow
</a>

// Pulse
<div className="animate-pulse-glow">Pulsa suavemente</div>
```

### 6️⃣ Badge de Habilidades

```jsx
<div className="profile-badges">
  <span className="badge">React</span>
  <span className="badge">TypeScript</span>
  <span className="badge">Tailwind CSS</span>
</div>

// Estilos
.badge {
  @apply px-4 py-2 rounded-full text-sm font-semibold;
  background: rgba(255, 94, 0, 0.2);
  border: 1px solid var(--variant);
  color: var(--variant);
}

.badge:hover {
  background: var(--variant);
  color: var(--background);
}
```

### 7️⃣ Header Pegajoso

```jsx
<header className="header-sticky">
  <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <h1 className="text-2xl font-bold">
        <span className="color-variant">Osman</span>Herrera.dev
      </h1>
    </div>
    
    <nav className="hidden md:flex gap-8">
      <a href="#hero" className="hover:color-variant">
        Inicio
      </a>
    </nav>
  </div>
</header>
```

### 8️⃣ Hero Section

```jsx
<section className="hero-section">
  <div className="hero-content">
    <h2 className="hero-title">
      Desarrollador Web & Diseñador
    </h2>
    <p className="hero-subtitle">
      Transformo ideas en experiencias digitales
    </p>
    
    {/* Lottie Container */}
    <div id="lottie-hero" className="lottie-container">
      {/* Aquí irá tu animación Lottie */}
    </div>
    
    <a href="#contact" className="cv-button animate-glow">
      Conectar Conmigo
    </a>
  </div>
</section>
```

### 9️⃣ Cards con Hover

```jsx
<div className="certificate-card">
  <div className="certificate-platform">UDEMY</div>
  <h3 className="certificate-title">
    Master en JavaScript
  </h3>
  <p className="certificate-date">Enero 2024</p>
  <a href="#" className="certificate-link">
    Ver Certificado →
  </a>
</div>

// Los estilos incluyen:
// - Fondo glassmorphism
// - Transiciones suaves
// - Escala al hover (scale-105)
// - Sombra glow
```

### 🔟 Formulario con Validación Visual

```jsx
<div className="form-group">
  <label className="form-label">Email</label>
  <input
    type="email"
    className="form-input"
    placeholder="tu@email.com"
  />
  {error && (
    <span className="form-error">{error}</span>
  )}
</div>

// Estados:
.form-input          // Estado normal
.form-input:focus    // Borde naranja + glow
.form-input::placeholder // Texto semi-transparente
.form-error          // Texto rojo
.form-button:disabled // Opacidad 50%
```

---

## 🎨 Gradientes útiles

### Gradient Naranja (Variant)

```jsx
<h1 className="text-transparent bg-clip-text bg-gradient-to-r from-app-front to-app-variant">
  Título con gradiente
</h1>
```

### Gradient Fondo

```jsx
<section className="bg-gradient-to-b from-black to-transparent">
  Sección con gradiente
</section>
```

---

## ✨ Combinaciones Recomendadas

### Botón Primario
```jsx
<button className="bg-app-variant text-app-bg hover:scale-105 hover:shadow-lg transition-all">
  Botón
</button>
```

### Botón Secundario
```jsx
<button className="border-2 border-app-variant text-app-variant hover:bg-app-variant hover:text-app-bg transition">
  Secundario
</button>
```

### Card Completa
```jsx
<div className="glass p-8 hover:scale-105 transition-all animate-fade-in">
  <h3 className="text-app-front text-xl font-bold">Título</h3>
  <p className="text-app-front opacity-80">Descripción</p>
</div>
```

---

## 📱 Responsive Utilities

```jsx
// Textos responsivos
className="text-3xl md:text-5xl lg:text-7xl"

// Grid responsivo
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Padding responsivo
className="p-4 md:p-8 lg:p-12"

// Flexbox responsivo
className="flex flex-col md:flex-row items-center"
```

---

## 🚨 Importante: No Ulicanzar

❌ Colores hardcodeados (usa las variables)
❌ Tailwind classes que no existan
❌ `@apply` sin `@layer components` (ya está configurado)
❌ Efectos glassmorphism sin backdrop-filter

---

## 🔍 Debugging

### Ver valores compilados
```bash
npm run build && cat dist/assets/index-*.css | grep "glass"
```

### Verificar si clase existe
- Abre DevTools
- Inspecciona el elemento
- Busca la clase en computed styles

### Problemas comunes
1. **Estilos no aplican** → Tailwind content path mal
2. **Glass blur no funciona** → Chequea supporto del navegador
3. **Animación congelada** → Verifica keyframes en CSS

---

## 📚 Cheat Sheet Rápido

```jsx
// Tipografía
className="font-bold text-xl"
className="text-app-variant color-variant"

// Espaciado
className="p-4 md:p-8"    // Padding
className="m-2 md:m-4"    // Margin
className="gap-4"          // Gap (flex/grid)

// Posicionamiento
className="fixed top-0 right-0 z-50"
className="absolute bottom-4 left-1/2"

// Display
className="flex items-center justify-between"
className="grid grid-cols-3 gap-4"
className="hidden md:block"

// Efectos
className="opacity-50 hover:opacity-100"
className="scale-105 translate-y-1"
className="shadow-lg rounded-lg"

// Transiciones
className="transition-all duration-300"
className="hover:scale-110 hover:text-app-variant"
```

---

**Última Actualización:** 2026-03-14
**Versión:** Tailwind CSS v3.x
