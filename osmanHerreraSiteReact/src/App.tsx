import React, { useMemo } from 'react';
import './App.css';
import { Footer } from './components/footer';

// ===========================================================================
// 1. INTERFACES Y DATOS (Fuera de App para evitar redeclaraciones)
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
  { title: 'linkedin', icon: '/assets/icons/social1.svg', address: 'https://www.linkedin.com/in/osmanherrera/' },
  { title: 'whatsapp', icon: '/assets/icons/social2.svg', address: 'https://wa.me/50489709082' },
  { title: 'email', icon: '/assets/icons/social3.svg', address: 'mailto:contact@osmanherrera.dev' },
  { title: 'github', icon: '/assets/icons/social4.svg', address: 'https://github.com/osmanjosue' },
];

const TECH_NAMES: string[] = [
  'CSS', 'HTML', 'JavaScript', 'TypeScript', 'Angular', 'NodeJS', 'GitHub', 
  'Git', 'MongoDB', 'Photoshop', 'Illustrator', 'JWT', 'Python', 'n8n', 'Docker'
];


// ===========================================================================
// 2. COMPONENTE APP
// ===========================================================================

const App: React.FC = () => {
  // --- LÓGICA DE TRANSFORMACIÓN (USEMEMO) ---
  const technologies = useMemo<Technology[]>(() => {
    return TECH_NAMES.map((name) => ({
      title: name,
      icon: `/assets/icons/technologies-${name}.svg`,
    }));
  }, []);

  return (
    <div className="w-full">
      {/* ================= STICKY HEADER ================= */}
      <header className="header-sticky">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <i className="OHicono w-10 h-10"></i>
            <h1 className="text-2xl font-bold">
              <span className="color-variant">Osman</span>Herrera.dev
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex gap-8">
            <a href="#hero" className="text-sm font-semibold hover:color-variant transition">
              Inicio
            </a>
            <a href="#technologies" className="text-sm font-semibold hover:color-variant transition">
              Habilidades
            </a>
            <a href="#formation" className="text-sm font-semibold hover:color-variant transition">
              Formación
            </a>
            <a href="#experience" className="text-sm font-semibold hover:color-variant transition">
              Experiencia
            </a>
            <a href="#contact" className="text-sm font-semibold hover:color-variant transition">
              Contacto
            </a>
          </nav>
        </div>
      </header>

      {/* ================= HERO SECTION ================= */}
      

      {/* ================= PROFILE SECTION ================= */}
      <section className="w-full py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <div className="profile-card">
            {/* Profile Image */}
            <div className="profile-image">
              <img
                src="/assets/images/IMG_20230209_080358.jpg"
                alt="Osman Herrera"
              />
            </div>

            {/* Profile Info */}
            <div className="profile-info">
              <h2 className="profile-name">Osman Herrera</h2>

              {/* Badges */}
              <div className="profile-badges">
                <span className="badge">Desarrollador FullStack</span>
                <span className="badge">Diseñador Gráfico</span>
                <span className="badge">Eterno Aprendiz</span>
              </div>

              {/* Social Buttons */}
              <div className="social-buttons">
                {SOCIAL_ICONS.map((icon, i) => (
                  <a
                    key={i}
                    href={icon.address}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn"
                    title={icon.title}
                  >
                    <span
                      className="icon-mask"
                      style={
                        {
                          '--icon-url': `url(${icon.icon})`,
                        } as React.CSSProperties
                      }
                    ></span>
                  </a>
                ))}
              </div>

              {/* CV Button */}
              <a
                href="https://raw.githubusercontent.com/osmanjosue/pdfCv/d3122180d29d9b5bf0b7acca4c33b7af8264304e/CV_oherrera_dev_eng_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="cv-button mb-6 inline-flex"
              >
                <span
                  className="icon-mask w-6 h-6 mr-2"
                  style={
                    {
                      '--icon-url': 'url("/assets/icons/Download_icon.svg")',
                    } as React.CSSProperties
                  }
                ></span>
                Descargar CV
              </a>

              {/* About Me */}
              <div className="text-base leading-relaxed opacity-90 max-w-2xl mx-auto">
                <p>
                  ¡Hola! Soy <span className="color-variant font-semibold">desarrollador web independiente</span> y me considero un
                  <span className="color-variant font-semibold"> eterno aprendiz</span>. Más allá de dominar una herramienta específica,
                  mi verdadera fortaleza es una lógica de programación sólida y la
                  capacidad de aprender lo que sea necesario para hacer realidad
                  tu proyecto.
                </p>
                <p className="mt-4">
                  Me mantengo siempre actualizado para ofrecerte
                  <span className="color-variant font-semibold"> soluciones ágiles, funcionales y modernas</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGIES SECTION ================= */}
      <section id="technologies" className="technologies-section">
        <div className="max-w-6xl mx-auto">
          <div className="section-header">
            <h2 className="section-title">Habilidades Técnicas</h2>
            <p className="section-subtitle">
              Tecnologías y herramientas que domino
            </p>
          </div>

          <div className="technologies-grid">
            {technologies.map((tech, i) => (
              <div key={i} className="tech-card">
                <span
                  className="tech-icon icon-mask"
                  style={
                    { '--icon-url': `url(${tech.icon})` } as React.CSSProperties
                  }
                ></span>
                <p className="tech-name">{tech.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FORMATION SECTION ================= */}
      <section id="formation" className="formation-section">
        <div className="max-w-4xl mx-auto">
          <div className="section-header mb-12">
            <h2 className="section-title">Formación</h2>
            <p className="section-subtitle">Educación y Certificaciones</p>
          </div>

          <div className="certificates-container">
            {/* Universidad */}
            <div className="certificate-card">
              <div className="certificate-platform">UNIVERSIDAD</div>
              <h3 className="certificate-title">
                Técnico Universitario en Desarrollo de Aplicaciones Computacionales
              </h3>
              <p className="certificate-date">Universidad Tecnológica de Honduras • Estudiando Actualmente</p>
            </div>

            {/* Certificados */}
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
                  className="certificate-link"
                >
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
            <h2 className="section-title">Experiencia Profesional</h2>
            <p className="section-subtitle">Proyectos y roles que he desempeñado</p>
          </div>

          <div className="experience-container">
            {/* Experience Card 1 */}
            <div className="experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">
                    Desarrollador <span className="color-variant">web</span>
                  </h3>
                  <p className="text-lg opacity-70">Fundación Prolancho</p>
                </div>
                <span className="experience-date">2023 - 2026</span>
              </div>

              <p className="experience-description">
                Desarrollo del sitio web con Angular 15 en frontend y NodeJS para API backend.
                Base de datos MongoDB con Cloudinary para gestión de imágenes. Autenticación con JWT
                y validación de credenciales para panel administrativo. Alojado en AWS EC2 con Ubuntu,
                NGINX y PM2.
              </p>

              <div className="experience-tech">
                <span className="tech-badge">Angular 15</span>
                <span className="tech-badge">NodeJS</span>
                <span className="tech-badge">MongoDB</span>
                <span className="tech-badge">JWT</span>
                <span className="tech-badge">AWS EC2</span>
                <span className="tech-badge">NGINX</span>
              </div>

              <div className="mt-6 flex gap-4">
                <a
                  href="https://github.com/osmanjosue/fundacionProlanchoSiteFrontAndBack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold color-variant hover:opacity-80"
                >
                  <span
                    className="icon-mask w-4 h-4"
                    style={
                      {
                        '--icon-url':
                          'url(/assets/icons/technologies-GitHub.svg)',
                      } as React.CSSProperties
                    }
                  ></span>
                  Repositorio
                </a>
                <a
                  href="https://www.fundacionprolancho.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold color-variant hover:opacity-80"
                >
                  <span
                    className="icon-mask w-4 h-4"
                    style={
                      {
                        '--icon-url': 'url(/assets/icons/website.svg)',
                      } as React.CSSProperties
                    }
                  ></span>
                  Sitio Web
                </a>
              </div>
            </div>

            {/* Experience Card 2 */}
            <div className="experience-card">
              <div className="experience-header">
                <div>
                  <h3 className="experience-title">
                    Diseñador <span className="color-variant">Gráfico</span> & Coordinador de Productos
                  </h3>
                  <p className="text-lg opacity-70">Empresa de Diseño y Estampado</p>
                </div>
                <span className="experience-date">2012 - 2023</span>
              </div>

              <p className="experience-description">
                Diseño y creación de ilustraciones profesionales. Separación de colores para serigrafía
                y sublimación. Coordinación de personal, cumplimiento de objetivos de producción,
                y lanzamiento de nuevos productos con fechas puntuales basados en metas establecidas.
              </p>

              <div className="experience-tech">
                <span className="tech-badge">Diseño Gráfico</span>
                <span className="tech-badge">Photoshop</span>
                <span className="tech-badge">Ilustrator</span>
                <span className="tech-badge">Gestión de Equipos</span>
                <span className="tech-badge">Serigrafía</span>
                <span className="tech-badge">Sublimación</span>
              </div>

              <div className="mt-6">
                <a
                  href="https://www.facebook.com/beomegusta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold color-variant hover:opacity-80"
                >
                  <span
                    className="icon-mask w-4 h-4"
                    style={
                      {
                        '--icon-url': 'url(/assets/icons/facebook.svg)',
                      } as React.CSSProperties
                    }
                  ></span>
                  Página de Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CONTACT SECTION ================= */}
      <section id="contact" className="contact-section">
        <div className="max-w-4xl mx-auto">
          <div className="section-header mb-12">
            <h2 className="section-title">Ponte en Contacto</h2>
            <p className="section-subtitle">
              Varias formas de conectar conmigo
            </p>
          </div>

          <div className="contact-container">
            {/* Contact Methods */}
            <div className="contact-info">
              <h3 className="contact-title mb-8">Contacta Conmigo</h3>
              <div className="contact-methods">
                {SOCIAL_ICONS.map((icon, i) => (
                  <a
                    key={i}
                    href={icon.address}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-method"
                  >
                    <span
                      className="contact-icon icon-mask"
                      style={
                        {
                          '--icon-url': `url(${icon.icon})`,
                        } as React.CSSProperties
                      }
                    ></span>
                    <span className="contact-text">{icon.title}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <Footer />
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="footer">
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