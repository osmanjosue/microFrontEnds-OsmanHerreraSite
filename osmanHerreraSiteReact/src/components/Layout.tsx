import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { siteConfig, colorAtProgress, scrollProgress } from '@shared/content';

const { theme, brand, nav, vectorWorkLink, frameworkSwitch, footer } = siteConfig;

export const Layout: React.FC = () => {
  // --- ESTADO PARA EL COLOR DINÁMICO ---
  const [variantColor, setVariantColor] = useState(() =>
    colorAtProgress(theme.scrollColors, 0),
  );

  // --- LÓGICA DE SCROLL (interpola gradualmente entre los colores del tema) ---
  useEffect(() => {
    const handleScroll = () => {
      setVariantColor(colorAtProgress(theme.scrollColors, scrollProgress()));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center"
      style={{ '--variant': variantColor } as React.CSSProperties}>
      
      {/* ================= STICKY HEADER ================= */}
      <header className="header-sticky">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-95 transition">
            <i className="OHicono w-10 h-10"></i>
            <h1 className="text-2xl font-bold">
              <span className="color-variant">{brand.highlight}</span>{brand.rest}
            </h1>
          </Link>

          <nav className="hidden md:flex gap-8">
            {nav.map((item) => (
              <Link
                key={item.target}
                to={`/#${item.target}`}
                className="text-sm font-semibold hover:color-variant transition">
                {item.label}
              </Link>
            ))}
            {vectorWorkLink && (
              <a
                href={vectorWorkLink.href}
                className="text-sm font-semibold hover:color-variant transition">
                {vectorWorkLink.label}
              </a>
            )}
          </nav>
        </div>
        
        <div className="w-full bg-[var(--variant)] border-y border-transparent transition-all duration-300 hover:bg-[var(--background)] hover:border-[var(--variant)] group">
          <div className="max-w-7xl mx-auto flex justify-center items-center py-2 px-4">
            <a
              href={frameworkSwitch.react.href}
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-[var(--background)] transition-colors duration-300 group-hover:text-[var(--variant)]">
              <span>{frameworkSwitch.react.text}</span>

              {/* El icono también debe cambiar su color de fondo para que se vea el SVG */}
              <span
                className="icon-mask w-4 h-4 bg-[var(--background)] transition-all duration-300 group-hover:bg-[var(--variant)] group-hover:scale-110"
                style={
                  { '--icon-url': `url(${frameworkSwitch.react.icon})` } as React.CSSProperties
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
            <p className="footer-credit">{footer.copyright}</p>
            <p className="footer-credit">{footer.credit}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              to={footer.privacyLink.internal} 
              className="text-xs font-semibold hover:color-variant transition underline underline-offset-4 decoration-white/20 hover:decoration-[var(--variant)]"
            >
              {footer.privacyLink.label}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
