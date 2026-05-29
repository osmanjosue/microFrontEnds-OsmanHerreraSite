import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';

export const Layout: React.FC = () => {
  // --- ESTADO PARA EL COLOR DINÁMICO ---
  const [variantColor, setVariantColor] = useState('#ff5e00');

  // --- LÓGICA DE SCROLL (Cambio de color Naranja -> Morado) ---
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll <= 0) return;

      const percentage = offset / maxScroll;

      // Si pasamos del 50% de la página, cambiamos a RebecaPurple
      if (percentage > 0.5) {
        setVariantColor('#663399');
      } else {
        setVariantColor('#ff5e00'); // Naranja original
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="w-full min-h-screen transition-colors duration-700 flex flex-col items-center"
      style={{ '--variant': variantColor } as React.CSSProperties}>
      
      {/* ================= STICKY HEADER ================= */}
      <header className="header-sticky">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition">
            <i className="OHicono w-10 h-10"></i>
            <h1 className="text-2xl font-bold">
              <span className="color-variant">Osman</span>Herrera.dev
            </h1>
          </Link>

          <nav className="hidden md:flex gap-8">
            <Link
              to="/#hero"
              className="text-sm font-semibold hover:color-variant transition">
              Inicio
            </Link>
            <Link
              to="/#technologies"
              className="text-sm font-semibold hover:color-variant transition">
              Habilidades
            </Link>
            <Link
              to="/#formation"
              className="text-sm font-semibold hover:color-variant transition">
              Formación
            </Link>
            <Link
              to="/#experience"
              className="text-sm font-semibold hover:color-variant transition">
              Experiencia
            </Link>
            <Link
              to="/#contact"
              className="text-sm font-semibold hover:color-variant transition">
              Contacto
            </Link>
          </nav>
        </div>
        
        <div className="w-full bg-[var(--variant)] border-y border-transparent transition-all duration-300 hover:bg-[var(--background)] hover:border-[var(--variant)] group">
          <div className="max-w-7xl mx-auto flex justify-center items-center py-2 px-4">
            <a
              href="/angular"
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-[var(--background)] transition-colors duration-300 group-hover:text-[var(--variant)]">
              <span>
                Este sitio está hecho en React, pulsa aquí para ver la versión
                en Angular
              </span>

              {/* El icono también debe cambiar su color de fondo para que se vea el SVG */}
              <span
                className="icon-mask w-4 h-4 bg-[var(--background)] transition-all duration-300 group-hover:bg-[var(--variant)] group-hover:scale-110"
                style={
                  { '--icon-url': 'url(/assets/icons/angular-logo.svg)' } as any
                }></span>
            </a>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="w-full flex-grow">
        <Outlet />
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer py-12 border-t border-white/10 text-center opacity-60 text-sm w-full">
        <div className="footer-content flex flex-col md:flex-row justify-between items-center gap-4 max-w-7xl mx-auto px-4">
          <div className="flex flex-col items-center md:items-start">
            <p className="footer-credit">
              © 2026 Osman Herrera. Todos los derechos reservados.
            </p>
            <p className="footer-credit">
              Diseñado y desarrollado con ❤️ por Osman Herrera
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to="/politicadeprivacidad" 
              className="text-xs font-semibold hover:color-variant transition underline underline-offset-4 decoration-white/20 hover:decoration-[var(--variant)]"
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
