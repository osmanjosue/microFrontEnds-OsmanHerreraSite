import React, { useMemo, useState, useEffect } from 'react';
import './App.css';
import { Footer } from './components/footer';

// ===========================================================================
// 1. INTERFACES Y DATOS
// ===========================================================================

interface Certificate {
  platform: string;
  title: string;
  month: string;
  date: number;
  link: string;
}

interface SocialIcon {
  title: string;
  icon: string;
  address: string;
}

interface Technology {
  title: string;
  icon: string;
}

const CERTIFICATES: Certificate[] = [
  {
    platform: 'Udemy',
    title: 'Master en JavaScript: Aprender JS, jQuery, Angular, NodeJS',
    month: 'Enero',
    date: 2024,
    link: 'https://www.udemy.com/certificate/UC-53ecf1b8-00d0-49a5-a948-ae2e6d2ecfd0/',
  },
  {
    platform: 'Udemy',
    title: 'Angular Avanzado: Lleva tus bases al siguiente nivel - MEAN',
    month: 'Agosto',
    date: 2023,
    link: 'https://www.udemy.com/certificate/UC-03475c4f-f50b-491c-a1e2-4975b8aab381/',
  },
  {
    platform: 'Devtalles',
    title: 'GIT+GitHub: Todo un sistema de control de versiones de cero',
    month: 'Abril',
    date: 2024,
    link: 'https://cursos.devtalles.com/certificates/zl0noyjvkn',
  },
  {
    platform: 'Udemy',
    title: 'Alojamiento de sitio web en modo serverless en Amazon AWS',
    month: 'Julio',
    date: 2022,
    link: 'https://www.udemy.com/certificate/UC-4840328a-96c0-47c9-afa4-04f65c37096d/',
  },
];

const SOCIAL_ICONS: SocialIcon[] = [
  {
    title: 'linkedin',
    icon: '/assets/icons/social1.svg',
    address: 'https://www.linkedin.com/in/osmanherrera/',
  },
  {
    title: 'whatsapp',
    icon: '/assets/icons/social2.svg',
    address: 'https://wa.me/50489709082',
  },
  {
    title: 'email',
    icon: '/assets/icons/social3.svg',
    address: 'mailto:contact@osmanherrera.dev',
  },
  {
    title: 'github',
    icon: '/assets/icons/social4.svg',
    address: 'https://github.com/osmanjosue',
  },
];

const TECH_NAMES: string[] = [
  'CSS',
  'HTML',
  'JavaScript',
  'TypeScript',
  'Angular',
  'NodeJS',
  'GitHub',
  'Git',
  'MongoDB',
  'Photoshop',
  'Illustrator',
  'JWT',
  'Python',
  'n8n',
  'Docker',
];

interface ExperienceLink {
  label: string;
  url: string;
  icon: string;
}

interface Experience {
  role: string;
  roleHighlight: string;
  roleSuffix?: string; // Para textos después del resaltado
  company: string;
  period: string;
  description: string;
  technologies: string[];
  links: ExperienceLink[];
}

const EXPERIENCES: Experience[] = [
  {
    role: 'Desarrollador',
    roleHighlight: 'web',
    company: 'Fundación Prolancho',
    period: '2023 - 2026',
    description:
      'Desarrollo del sitio web con Angular 15 en frontend y NodeJS para API backend. Base de datos MongoDB con Cloudinary para gestión de imágenes. Autenticación con JWT y validación de credenciales para panel administrativo. Alojado en AWS EC2 con Ubuntu, NGINX y PM2.',
    technologies: [
      'Angular 15',
      'NodeJS',
      'MongoDB',
      'JWT',
      'AWS EC2',
      'NGINX',
    ],
    links: [
      {
        label: 'Repositorio',
        url: 'https://github.com/osmanjosue/fundacionProlanchoSiteFrontAndBack',
        icon: '/assets/icons/technologies-GitHub.svg',
      },
      {
        label: 'Sitio Web',
        url: 'https://www.fundacionprolancho.org',
        icon: '/assets/icons/website.svg',
      },
    ],
  },
  {
    role: 'Diseñador',
    roleHighlight: 'Gráfico',
    roleSuffix: '& Coordinador de Productos',
    company: 'Empresa de Diseño y Estampado',
    period: '2012 - 2023',
    description:
      'Diseño y creación de ilustraciones profesionales. Separación de colores para serigrafía y sublimación. Coordinación de personal, cumplimiento de objetivos de producción, y lanzamiento de nuevos productos con fechas puntuales basados en metas establecidas.',
    technologies: [
      'Diseño Gráfico',
      'Photoshop',
      'Ilustrator',
      'Gestión de Equipos',
      'Serigrafía',
      'Sublimación',
    ],
    links: [
      {
        label: 'Página de Facebook',
        url: 'https://www.facebook.com/beomegusta/',
        icon: '/assets/icons/facebook.svg',
      },
    ],
  },
];

// ===========================================================================
// 2. COMPONENTE APP
// ===========================================================================

const App: React.FC = () => {
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

  // --- LÓGICA DE TECNOLOGÍAS ---
  const technologies = useMemo<Technology[]>(() => {
    return TECH_NAMES.map((name) => ({
      title: name,
      icon: `/assets/icons/technologies-${name}.svg`,
    }));
  }, []);

  return (
    <div
      className="w-full min-h-screen transition-colors duration-700"
      style={{ '--variant': variantColor } as React.CSSProperties}>
      {/* ================= STICKY HEADER ================= */}
      <header className="header-sticky">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <i className="OHicono w-10 h-10"></i>
            <h1 className="text-2xl font-bold">
              <span className="color-variant">Osman</span>Herrera.dev
            </h1>
          </div>

          <nav className="hidden md:flex gap-8">
            <a
              href="#hero"
              className="text-sm font-semibold hover:color-variant transition">
              Inicio
            </a>
            <a
              href="#technologies"
              className="text-sm font-semibold hover:color-variant transition">
              Habilidades
            </a>
            <a
              href="#formation"
              className="text-sm font-semibold hover:color-variant transition">
              Formación
            </a>
            <a
              href="#experience"
              className="text-sm font-semibold hover:color-variant transition">
              Experiencia
            </a>
            <a
              href="#contact"
              className="text-sm font-semibold hover:color-variant transition">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      <section
        id="hero"
        className="min-h-[80vh] flex items-center justify-center pt-20">
        <div className="text-center px-4 max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            Desarrollo web con <span className="color-variant">lógica</span> y{' '}
            <span className="color-variant">pasión</span>.
          </h2>
          <p className="text-xl opacity-80 mb-8">
            FullStack Developer | Graphic Designer
          </p>
          <a href="#contact" className="cv-button px-8 py-3 text-lg">
            Hablemos de tu proyecto
          </a>
        </div>
      </section>

      {/* ================= PROFILE SECTION ================= */}
      <section className="w-full py-20 px-4 bg-black/50">
        <div className="max-w-4xl mx-auto">
          <div className="profile-card">
            <div className="profile-image">
              <img
                src="/assets/images/IMG_20230209_080358.jpg"
                alt="Osman Herrera"
              />
            </div>

            <div className="profile-info text-center">
              <h2 className="profile-name">Osman Herrera</h2>
              <div className="profile-badges">
                <span className="badge">Desarrollador FullStack</span>
                <span className="badge">Diseñador Gráfico</span>
              </div>

              <div className="social-buttons">
                {SOCIAL_ICONS.map((icon, i) => (
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
                href="https://raw.githubusercontent.com/osmanjosue/pdfCv/main/CV_oherrera_dev_eng_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-button mb-6 inline-flex">
                <span
                  className="icon-mask w-6 h-6 mr-2"
                  style={
                    {
                      '--icon-url': 'url("/assets/icons/Download_icon.svg")',
                    } as React.CSSProperties
                  }></span>
                Descargar CV
              </a>

              <div className="text-base leading-relaxed opacity-90 max-w-2xl mx-auto mt-4">
                <p>
                  ¡Hola! Soy{' '}
                  <span className="color-variant font-semibold">
                    desarrollador web independiente
                  </span>{' '}
                  y un{' '}
                  <span className="color-variant font-semibold">
                    eterno aprendiz
                  </span>
                  . Mi fortaleza es una lógica sólida para hacer realidad
                  cualquier proyecto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGIES SECTION ================= */}
      <section id="technologies" className="technologies-section">
        <div className="max-w-6xl mx-auto px-4">
          <div className="section-header">
            <h2 className="section-title">Habilidades Técnicas</h2>
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
          <h2 className="section-title mb-12">Formación</h2>
          <div className="certificates-container">
            <div className="certificate-card">
              <div className="certificate-platform">UNIVERSIDAD</div>
              <h3 className="certificate-title">
                Técnico Universitario en Desarrollo de Aplicaciones
                Computacionales
              </h3>
              <p className="certificate-date">UTH • Estudiando Actualmente</p>
            </div>
            {CERTIFICATES.map((cert, i) => (
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
                  Ver Certificado →
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
            <h2 className="section-title mb-12">Experiencia Profesional</h2>
            <p className="section-subtitle">
              Proyectos y roles que he desempeñado
            </p>
          </div>
          <div className="experience-container">
            {EXPERIENCES.map((exp, index) => (
              <div key={index} className="experience-card">
                {/* Header */}
                <div className="experience-header">
                  <div>
                    <h3 className="experience-title">
                      {exp.role}{' '}
                      <span className="color-variant">{exp.roleHighlight}</span>{' '}
                      {exp.roleSuffix}
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
          <h2 className="section-title mb-12 text-center">Contacto</h2>
          <div className="contact-container grid md:grid-cols-2 gap-12 items-start">
            <div className="contact-info flex flex-col gap-6">
              {SOCIAL_ICONS.map((icon, i) => (
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
            <Footer />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer py-12 border-t border-white/10 text-center opacity-60 text-sm">
        <div className="footer-content">
          <p className="footer-credit">
            © 2026 Osman Herrera. Todos los derechos reservados.
          </p>
          <p className="footer-credit">
            Diseñado y desarrollado con ❤️ por Osman Herrera
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
