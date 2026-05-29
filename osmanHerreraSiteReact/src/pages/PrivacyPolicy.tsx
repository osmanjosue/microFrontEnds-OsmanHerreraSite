import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

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
              <span className="transition-transform group-hover:-translate-x-1">←</span> Volver al Inicio
            </Link>
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              Política de <span className="color-variant">Privacidad</span>
            </h2>
            <p className="text-sm opacity-60 mt-1">Osman Josue Herrera Perez</p>
          </div>
          
          <Link to="/" className="cv-button px-6 py-2 text-sm">
            Ir al Inicio
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
              Última actualización: 28 de mayo de 2026
            </div>
            <p className="leading-relaxed opacity-95">
              En <span className="font-semibold color-variant">Osman Josue Herrera Perez</span>, nos tomamos muy en serio la privacidad de tus datos. Esta Política de Privacidad describe cómo recopilamos, utilizamos y compartimos la información cuando interactúas con nuestra aplicación y servicios a través de la API de WhatsApp, de conformidad con las buenas prácticas de protección de datos y la legislación aplicable en Honduras.
            </p>
          </section>

          {/* 1. Información que recopilamos */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold border-b border-white/10 pb-2">
              1. Información que recopilamos
            </h3>
            <p className="leading-relaxed opacity-90">
              Cuando te comunicas con nosotros o utilizas nuestra aplicación a través de WhatsApp, podemos recopilar la siguiente información:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="glass-dark p-6 border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--variant)]/20 color-variant mb-3">
                    Perfil de WhatsApp
                  </span>
                  <p className="text-xs opacity-90 leading-relaxed">
                    Tu número de teléfono y el nombre de perfil público que tienes configurado en WhatsApp.
                  </p>
                </div>
              </div>
              <div className="glass-dark p-6 border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--variant)]/20 color-variant mb-3">
                    Mensajes y contenido
                  </span>
                  <p className="text-xs opacity-90 leading-relaxed">
                    El texto de los mensajes, imágenes u otros archivos que envíes directamente a nuestro sistema o cuenta de WhatsApp Business para procesar tus solicitudes.
                  </p>
                </div>
              </div>
              <div className="glass-dark p-6 border border-white/5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[var(--variant)]/20 color-variant mb-3">
                    Datos técnicos
                  </span>
                  <p className="text-xs opacity-90 leading-relaxed">
                    Información básica sobre las interacciones, comandos y respuestas que se ejecutan dentro de la aplicación.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 2. Cómo utilizamos tu información */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold border-b border-white/10 pb-2">
              2. Cómo utilizamos tu información
            </h3>
            <p className="leading-relaxed opacity-90">
              Utilizamos la información recopilada exclusivamente para los siguientes fines:
            </p>
            <ul className="list-disc pl-6 space-y-2 opacity-90 leading-relaxed">
              <li>Proporcionar, operar y mantener las funciones de nuestra aplicación y servicios de automatización.</li>
              <li>Responder a tus consultas, comandos y mensajes de manera automatizada o personalizada.</li>
              <li>Mejorar la experiencia de usuario y la calidad de nuestro servicio de atención.</li>
              <li>
                <strong>Envío de notificaciones y alertas:</strong> Enviar alertas automatizadas, recordatorios, actualizaciones del servicio o información relevante que hayas solicitado o que forme parte de la interacción con nuestros sistemas.
              </li>
            </ul>
          </section>

          {/* 3. Uso de proveedores de servicios de terceros */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold border-b border-white/10 pb-2">
              3. Uso de proveedores de servicios de terceros (Meta/WhatsApp)
            </h3>
            <p className="leading-relaxed opacity-90">
              Nuestra aplicación utiliza la API de WhatsApp Business, un servicio proporcionado por Meta Platforms, Inc. El procesamiento de tus mensajes está sujeto a las condiciones de servicio y políticas de privacidad de WhatsApp. No vendemos, alquilamos ni compartimos tu información personal con fines comerciales con ningún otro tercero.
            </p>
          </section>

          {/* 4. Retención y seguridad de los datos */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold border-b border-white/10 pb-2">
              4. Retención y seguridad de los datos
            </h3>
            <p className="leading-relaxed opacity-90">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos de accesos no autorizados, alteraciones o divulgaciones. Los mensajes e información recopilada se almacenan únicamente durante el tiempo necesario para cumplir con la finalidad para la que fueron solicitados o para cumplir con obligaciones legales.
            </p>
          </section>

          {/* 5. Tus derechos */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold border-b border-white/10 pb-2">
              5. Tus derechos (Acceso, Rectificación y Cancelación)
            </h3>
            <p className="leading-relaxed opacity-90">
              Tienes derecho a conocer qué información tenemos sobre ti, solicitar su corrección en caso de ser errónea o pedir que la eliminemos por completo de nuestros registros. Para ejercer estos derechos, puedes ponerte en contacto directamente a través del correo electrónico:{' '}
              <a href="mailto:contact@osmanherrera.dev" className="color-variant underline font-semibold hover:opacity-85">
                contact@osmanherrera.dev
              </a>
              .
            </p>
          </section>

          {/* 6. Cambios a esta Política de Privacidad */}
          <section className="space-y-4">
            <h3 className="text-2xl font-bold border-b border-white/10 pb-2">
              6. Cambios a esta Política de Privacidad
            </h3>
            <p className="leading-relaxed opacity-90">
              Nos reservamos el derecho de actualizar esta política en cualquier momento para adaptarla a novedades legislativas o mejoras en nuestros servicios de automatización. Te recomendamos revisar esta página periódicamente para estar al tanto de cualquier cambio.
            </p>
          </section>
        </div>

        {/* ================= FINAL ACTION ================= */}
        <div className="mt-12 text-center">
          <p className="text-sm opacity-60 mb-4">
            ¿Tienes alguna consulta sobre el manejo de tus datos de WhatsApp o alertas automatizadas?
          </p>
          <a
            href="mailto:contact@osmanherrera.dev"
            className="inline-flex items-center gap-2 font-bold color-variant hover:underline"
          >
            Contáctame a contact@osmanherrera.dev
          </a>
        </div>
      </div>
    </div>
  );
};
