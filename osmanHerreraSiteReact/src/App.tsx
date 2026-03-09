import React, { useState, useEffect, useMemo } from 'react';
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

// --- FUNCIONES DE UTILIDAD ---
const lerp = (start: number, end: number, t: number): number =>
  Math.round(start + (end - start) * t);

// ===========================================================================
// 2. COMPONENTE APP
// ===========================================================================

const App: React.FC = () => {
  // --- ESTADO ---
  const [colorDinamico, setColorDinamico] = useState<string>('rgb(255, 94, 0)');

  // --- LÓGICA DE TRANSFORMACIÓN (USEMEMO) ---
  const technologies = useMemo<Technology[]>(() => {
    return TECH_NAMES.map((name) => ({
      title: name,
      icon: `/assets/icons/technologies-${name}.svg`,
    }));
  }, []);

  // --- EFECTO DE SCROLL ---
  useEffect(() => {
    const colors = [
      { r: 255, g: 94, b: 0 },
      { r: 102, g: 51, b: 153 },
      { r: 255, g: 0, b: 0 },
    ];

    const handleScroll = (): void => {
      const scrollHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollTotal = scrollHeight - windowHeight;

      if (scrollTotal <= 0) return;

      const percent = Math.min(Math.max(window.scrollY / scrollTotal, 0), 1);
      let r: number, g: number, b: number;

      if (percent <= 0.5) {
        const subPercent = percent * 2;
        r = lerp(colors[0].r, colors[1].r, subPercent);
        g = lerp(colors[0].g, colors[1].g, subPercent);
        b = lerp(colors[0].b, colors[1].b, subPercent);
      } else {
        const subPercent = (percent - 0.5) * 2;
        r = lerp(colors[1].r, colors[2].r, subPercent);
        g = lerp(colors[1].g, colors[2].g, subPercent);
        b = lerp(colors[1].b, colors[2].b, subPercent);
      }
      setColorDinamico(`rgb(${r}, ${g}, ${b})`);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (// Aplicamos la variable de CSS tipada como objeto de estilos
    <div style={{ '--variant': colorDinamico } as React.CSSProperties}>
      {/* Navbar */}
      <section className="navbar">
        <div className="navbarContainer">
          <div className="icono-n-name">
            <i className="OHicono"></i>
            <h2 className="navbarOsmanDev">osmanherrera.dev</h2>
          </div>
          <h2 className="navbarOsmanDev">Bienvenido</h2>
        </div>
      </section>

      <section style={{ position: 'relative', width: '100%' }}>
        <p className="introMessage">
          Me encuentro trabajando en proyectos que iré agregando a este sitio.
        </p>
      </section>

      {/* Perfil */}
      <section className="profile">
        <div className="cardProfile">
          <div className="profilePicture__iconButtons">
            <div className="profilePicture">
              <img
                src="/assets/images/IMG_20230209_080358.jpg"
                alt="Osman Herrera"
              />
            </div>
            <div className="iconButtons">
              {SOCIAL_ICONS.map((icon, i) => (
                <a
                  key={i}
                  href={icon.address}
                  target="_blank"
                  rel="noopener noreferrer">
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
          </div>

          <div className="sectionTitle">
            <h2>Osman Herrera</h2>
            <div className="sectionTitle_name_CV">
              <div>
                <div className="label_icon">
                  <p>Desarrollador FullStack!</p>
                </div>
                <div className="label_icon">
                  <p>Diseñador Gráfico!</p>
                </div>
              </div>
              <div
                className="CV_button"
                title="Este es mi currículo actualizado en formato PDF">
                <a
                  href="https://raw.githubusercontent.com/osmanjosue/pdfCv/d3122180d29d9b5bf0b7acca4c33b7af8264304e/CV_oherrera_dev_eng_2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-cv">
                  <span
                    className="icon-mask"
                    style={
                      {
                        '--icon-url': 'url("/assets/icons/Download_icon.svg")',
                      } as React.CSSProperties
                    }></span>
                </a>
              </div>
            </div>
            <hr style={{ width: '100%' }} />
            <div className="aboutMe">
              <p>
                ¡Hola! Soy desarrollador web independiente y me considero un
                eterno aprendiz. Más allá de dominar una herramienta específica,
                mi verdadera fortaleza es una lógica de programación sólida y la
                capacidad de aprender lo que sea necesario para hacer realidad
                tu proyecto. Me mantengo siempre actualizado para ofrecerte
                soluciones ágiles, funcionales y modernas.
              </p>
            </div>
          </div>
          <hr className="linea-hr" />
        </div>
      </section>

      {/* Habilidades */}
      <section className="webSections">
        <div className="sectionCurriculum sectionTitle">
          <h2>Habilidades</h2>
        </div>
        <div className="technologies">
          {technologies.map((tech, i) => (
            <a key={i}>
              <span
                className="skillLogo icon-mask"
                style={
                  { '--icon-url': `url(${tech.icon})` } as React.CSSProperties
                }></span>
              <p className="technologyName">{tech.title}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Formación */}
      <section className="webSections">
        <div className="sectionCurriculum sectionTitle">
          <h2>Formación</h2>
        </div>
        <div className="allFormation">
          <p>Universidad Tecnológica de Honduras</p>
          <div className="formation-n-date">
            <li>
              Técnico Universitario en Desarrollo de Aplicaciones
              Computacionales.
            </li>
            <p>(Estudiando Actualmente)</p>
          </div>
        </div>
        {CERTIFICATES.map((cert, i) => (
          <div className="allFormation" key={i}>
            <div className="certificatePlatform">
              <p>Certificado {cert.platform}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer">
                <span
                  className="colorTheme linkExterno icon-mask"
                  style={
                    {
                      '--icon-url': 'url(/assets/icons/linkExterno.svg)',
                    } as React.CSSProperties
                  }></span>
              </a>
            </div>
            <div className="formation-n-date">
              <li>{cert.title}</li>
              <p>
                <span className="colorTheme">{cert.month}-</span>
                <span>{cert.date}</span>
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* =========================== Experience start =========================== */}
      <section>
        <div className="sectionCurriculum sectionTitle">
          <h2>Experiencia</h2>
        </div>

        <div className="experiences">
          {/* TARJETA 1: FUNDACIÓN PROLANCHO */}
          <div className="experience_card">
            <div className="experience">
              <p>
                Desarrollador <span className="colorTheme">web</span> en
                Fundación Prolancho
              </p>
              <p className="colorTheme">2023-2026</p>
            </div>

            <div className="iconButtons__experience">
              <div className="label_icon">
                <p>Repositorio del Proyecto</p>
                <a
                  href="https://github.com/osmanjosue/fundacionProlanchoSiteFrontAndBack"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span
                    className="icon-mask"
                    style={
                      {
                        '--icon-url':
                          'url(/assets/icons/technologies-GitHub.svg)',
                      } as React.CSSProperties
                    }></span>
                </a>
              </div>
              <div className="label_icon">
                <p>Sitio Web</p>
                <a
                  href="https://www.fundacionprolancho.org"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span
                    className="contactLogo colorTheme icon-mask"
                    style={
                      {
                        '--icon-url': 'url(/assets/icons/website.svg)',
                      } as React.CSSProperties
                    }></span>
                </a>
              </div>
            </div>

            <ul className="experienceDetails padding-ul">
              <li>
                Desarrollo del sitio web con Angular15 de frontEnd y NodeJs
                para el desarrollo de su API, base de datos con MongoDB y
                utilizando cloudinary para el manejo de las imágenes.
              </li>
              <li>
                Autenticado con JWT desde el lado del servidor y validación de
                credenciales para envío de un menú diferente para su
                administración.
              </li>
              <li>
                Pagina alojada en una capa EC2 en AWS usando:
                <ul className="padding-ul">
                  <li>Ubuntu como S.O.</li>
                  <li>
                    NGINX como servidor web gestionando las solicitudes HTTP
                    entrantes.
                  </li>
                  <li>
                    PM2 como administrador de procesos de la aplicación de
                    NodeJS.
                  </li>
                </ul>
              </li>
              <li>
                Actualmente trabajando en nuevas características a pedido de la
                organización.
              </li>
            </ul>
          </div>
        </div>

        <div className="experiences">
          {/* TARJETA 2: DISEÑADOR GRÁFICO */}
          <div className="experience_card">
            <div className="experience">
              <p>
                Diseñador <span className="colorTheme">Gráfico</span>/ Coordinar
                de lanzamiento de <span className="colorTheme">Productos</span>
              </p>
              <p className="colorTheme">2012-2023</p>
            </div>

            <div className="iconButtons__experience">
              <div className="label_icon">
                <p>Pagina de Facebook</p>
                <a
                  href="https://www.facebook.com/beomegusta/"
                  target="_blank"
                  rel="noopener noreferrer">
                  <span
                    className="contactLogo icon-mask"
                    style={
                      {
                        '--icon-url': 'url(/assets/icons/facebook.svg)',
                      } as React.CSSProperties
                    }></span>
                </a>
              </div>

              <div className="label_icon">
                <p>Sitio Web</p>
                <a>
                  <span
                    className="contactLogo colorTheme icon-mask"
                    style={
                      {
                        '--icon-url': 'url(/assets/icons/website.svg)',
                      } as React.CSSProperties
                    }></span>
                </a>
              </div>
            </div>

            <ul className="experienceDetails padding-ul">
              <li>
                Encargado del diseño, creación y desarrollo de ilustraciones.
              </li>
              <li>
                Separación de colores para técnicas de estampado (serigrafía y
                sublimación).
              </li>
              <li>
                Coordinación y manejo del personal para:
                <ul className="padding-ul">
                  <li>Cumplimiento de los objetivos de producción.</li>
                  <li>
                    Lanzamiento de nuevos productos con fechas puntuales basados
                    en metas pre-establecidas entre los colaboradores de la
                    empresa.
                  </li>
                </ul>
              </li>
              <li>
                Actualmente trabajando en nuevas características a pedido de la
                organización.
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* =========================== Experience end =========================== */}

      {/* Sección Contacto */}
      <section>
        <h2 className="sectionCurriculum sectionTitle">Contacto</h2>
        {/* <Footer /> */}
        <Footer />
        <div className="final"></div>
      </section>
    </div>
  );
};

export default App;