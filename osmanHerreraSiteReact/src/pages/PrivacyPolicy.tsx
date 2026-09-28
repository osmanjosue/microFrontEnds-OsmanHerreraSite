import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@shared/content';
import { RichText } from '../components/RichText';
import '../App.css';

const policy = siteConfig.privacyPolicy;

export const PrivacyPolicy: React.FC = () => {
  // Aseguramos que la página cargue al tope cuando se renderice
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, []);

  return (
    <div className="w-full min-h-screen py-16 px-4 md:py-24 animate-slide-up flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* ================= HEADER CARD ================= */}
        <div className="mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
          <div className="text-center sm:text-left">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold color-variant hover:opacity-80 transition mb-3 group"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span> {policy.backLabel}
            </Link>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              <RichText value={policy.title} />
            </h2>
            <p className="text-sm opacity-60 mt-1">{policy.owner}</p>
          </div>

          <Link to="/" className="cv-button px-6 py-2 text-sm">
            {policy.homeLabel}
          </Link>
        </div>

        {/* ================= CONTENT CARD ================= */}
        <div className="glass p-8 md:p-12 space-y-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Fondo gradiente sutil detrás del cristal */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--variant)] opacity-[0.03] rounded-full blur-[100px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600 opacity-[0.02] rounded-full blur-[100px] pointer-events-none"></div>

          {/* Encabezado / Introducción */}
          <section className="space-y-4">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--variant)]/20 color-variant mb-1">
              {policy.lastUpdated}
            </div>
            <p className="leading-relaxed opacity-95">
              <RichText value={policy.intro} />
            </p>
          </section>

          {/* Secciones numeradas */}
          {policy.sections.map((section) => (
            <section key={section.title} className="space-y-4">
              <h3 className="text-2xl font-bold border-b border-white/10 pb-2">
                {section.title}
              </h3>

              {section.paragraphs?.map((paragraph, i) => (
                <p key={i} className="leading-relaxed opacity-90">
                  <RichText value={paragraph} />
                </p>
              ))}

              {section.cards && (
                <div className="grid md:grid-cols-3 gap-4 mt-4">
                  {section.cards.map((card) => (
                    <div
                      key={card.title}
                      className="glass-dark p-6 border border-white/5 rounded-xl flex flex-col justify-between"
                    >
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--variant)]/20 color-variant mb-3">
                          {card.title}
                        </span>
                        <p className="text-xs opacity-90 leading-relaxed">{card.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="list-disc pl-6 space-y-2 opacity-90 leading-relaxed">
                  {section.bullets.map((bullet, i) => (
                    <li key={i}>
                      <RichText value={bullet} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* ================= FINAL ACTION ================= */}
        <div className="mt-12 text-center">
          <p className="text-sm opacity-60 mb-4">{policy.closing.question}</p>
          <a
            href={policy.closing.href}
            className="inline-flex items-center gap-2 font-bold color-variant hover:underline"
          >
            {policy.closing.linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
};
