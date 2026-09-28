import React, { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../App.css';
import { siteConfig, type Technology } from '@shared/content';
import { Footer as ContactForm } from '../components/footer';
import { RichText } from '../components/RichText';

const { hero, profile, socialIcons, skills, formation, experience, contact } =
  siteConfig;

export const Home: React.FC = () => {
  const { hash } = useLocation();

  // --- EFECTO DE SCROLL SUAVE A SECCIONES MEDIANTE EL HASH ---
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  // --- LÓGICA DE TECNOLOGÍAS ---
  const technologies = useMemo<Technology[]>(() => {
    return skills.technologies.map((name) => ({
      title: name,
      icon: `/assets/icons/technologies-${name}.svg`,
    }));
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="min-h-[80vh] flex items-center justify-center pt-20">
        <div className="text-center px-4 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <RichText value={hero.title} />
          </h2>
          <p className="text-xl opacity-80 mb-8">{hero.subtitle}</p>
          <a
            href={`#${hero.cta.target}`}
            className="cv-button px-8 py-3 text-lg">
            {hero.cta.label}
          </a>
        </div>
      </section>

      {/* ================= PROFILE SECTION ================= */}
      <section className="w-full py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <div className="profile-card">
            <div className="profile-image">
              <img src={profile.image} alt={profile.imageAlt} />
            </div>

            <div className="profile-info text-center">
              <h2 className="profile-name">{profile.name}</h2>
              <div className="profile-badges">
                {profile.badges.map((badge) => (
                  <span key={badge} className="badge">
                    {badge}
                  </span>
                ))}
              </div>

              <div className="social-buttons">
                {socialIcons.map((icon, i) => (
                  <a
                    key={i}
                    href={icon.address}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title={icon.title}>
                    <span
                      className="icon-mask"
                      style={
                        {
                          '--icon-url': `url(${icon.icon})`,
                        } as React.CSSProperties
                      }></span>
                  </a>
                ))}
              </div>

              <a
                href={profile.cv.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cv-button mb-6 inline-flex">
                <span
                  className="icon-mask w-6 h-6 mr-2"
                  style={
                    {
                      '--icon-url': `url("${profile.cv.icon}")`,
                    } as React.CSSProperties
                  }></span>
                {profile.cv.label}
              </a>

              <div className="text-base leading-relaxed opacity-90 max-w-2xl mx-auto mt-4">
                {profile.bio.map((paragraph, i) => (
                  <p key={i} className={i > 0 ? 'mt-4' : undefined}>
                    <RichText value={paragraph} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGIES SECTION ================= */}
      <section id="technologies" className="technologies-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-header">
            <h2 className="section-title">{skills.title}</h2>
            {skills.subtitle && (
              <p className="section-subtitle">{skills.subtitle}</p>
            )}
          </div>
          <div className="technologies-grid">
            {technologies.map((tech, i) => (
              <div key={i} className="tech-card">
                <span
                  className="tech-icon icon-mask"
                  style={
                    { '--icon-url': `url(${tech.icon})` } as React.CSSProperties
                  }></span>
                <p className="tech-name">{tech.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORMATION SECTION ================= */}
      <section id="formation" className="formation-section">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title mb-12">{formation.title}</h2>
          {formation.subtitle && (
            <p className="section-subtitle">{formation.subtitle}</p>
          )}
          <div className="certificates-container">
            {formation.education.map((edu, i) => (
              <div key={i} className="certificate-card">
                <div className="certificate-platform">{edu.platform}</div>
                <h3 className="certificate-title">{edu.title}</h3>
                <p className="certificate-date">{edu.detail}</p>
              </div>
            ))}
            {formation.certificates.map((cert, i) => (
              <div key={i} className="certificate-card">
                <div className="certificate-platform">{cert.platform}</div>
                <h3 className="certificate-title">{cert.title}</h3>
                <p className="certificate-date">
                  {cert.month} {cert.date}
                </p>
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-link">
                  {formation.certificateLinkLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= EXPERIENCE SECTION ================= */}
      <section id="experience" className="experience-section">
        <div className="max-w-5xl mx-auto">
          <div className="section-header mb-12">
            <h2 className="section-title mb-12">{experience.title}</h2>
            {experience.subtitle && (
              <p className="section-subtitle">{experience.subtitle}</p>
            )}
          </div>
          <div className="experience-container">
            {experience.items.map((exp, index) => (
              <div key={index} className="experience-card">
                {/* Header */}
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">
                      <RichText value={exp.role} />
                    </h3>
                    <p className="text-lg opacity-70">{exp.company}</p>
                  </div>
                  <span className="experience-date">{exp.period}</span>
                </div>

                {/* Description */}
                <p className="experience-description">{exp.description}</p>

                {/* Tech Badges */}
                <div className="experience-tech">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links Dinámicos */}
                <div className="mt-6 flex flex-wrap gap-4">
                  {exp.links.map((link, lIndex) => (
                    <a
                      key={lIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold color-variant hover:opacity-80">
                      <span
                        className="icon-mask w-4 h-4"
                        style={
                          {
                            '--icon-url': `url(${link.icon})`,
                          } as React.CSSProperties
                        }></span>
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="contact-section py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="section-title mb-12 text-center">{contact.title}</h2>
          <div className="contact-container grid md:grid-cols-2 gap-12 items-start">
            <div className="contact-info flex flex-col gap-6">
              {socialIcons.map((icon, i) => (
                <a
                  key={i}
                  href={icon.address}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-method flex items-center gap-4 group">
                  <span
                    className="contact-icon icon-mask w-10 h-10 group-hover:scale-110 transition"
                    style={
                      {
                        '--icon-url': `url(${icon.icon})`,
                      } as React.CSSProperties
                    }></span>
                  <span className="contact-text text-lg capitalize">
                    {icon.title}
                  </span>
                </a>
              ))}
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};
