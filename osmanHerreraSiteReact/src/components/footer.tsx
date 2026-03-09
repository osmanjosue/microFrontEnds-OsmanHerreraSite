import { useForm } from 'react-hook-form';
import { useContactForm } from '../hooks/useContactForm';
import '../App.css';

interface ContactFormData {
  nombre: string;
  correoElectronico: string;
  content: string;
}

export const Footer = () => {
  const { isSending, sendEmail } = useContactForm();

  // Configuración del formulario (equivalente a FormBuilder)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormData>({
    mode: 'onChange',
  });

  const onSubmit = async (data: ContactFormData) => {
    const success = await sendEmail(data);
    if (success) reset();
  };

  return (
    <footer className="footerSections">
      <div className="footerSection footerSection-first">
        <h3>Ponte en Contacto</h3>
        <p style={{ margin: '10px' }}>
          Aquí tienes varias maneras de conocerme o ponerte en contacto:
        </p>

        {/* Email - Usa mailto: para abrir el gestor de correos */}
        <a href="mailto:contact@osmanherrera.dev" className="contactMethod">
          <span
            className="contactLogo2 icon-mask"
            style={
              {
                '--icon-url': 'url(/assets/icons/social3.svg)',
              } as React.CSSProperties
            }></span>
          <p>contact@osmanherrera.dev</p>
        </a>

        {/* LinkedIn - Abrir en pestaña nueva */}
        <a
          href="https://www.linkedin.com/in/osmanherrera/"
          target="_blank"
          rel="noopener noreferrer"
          className="contactMethod">
          <span
            className="contactLogo2 icon-mask"
            style={
              {
                '--icon-url': 'url(/assets/icons/social1.svg)',
              } as React.CSSProperties
            }></span>
          <p>linkedin.com/in/osmanherrera/</p>
        </a>

        {/* GitHub - Abrir en pestaña nueva */}
        <a
          href="https://github.com/osmanjosue"
          target="_blank"
          rel="noopener noreferrer"
          className="contactMethod">
          <span
            className="contactLogo2 icon-mask"
            style={
              {
                '--icon-url': 'url(/assets/icons/social4.svg)',
              } as React.CSSProperties
            }></span>
          <p>github.com/osmanjosue</p>
        </a>
      </div>

      {/* Condición de clase inhabilitarDiv similar a [class.inhabilitarDiv] */}
      <div
        className={`footerSection footerSection-second ${isSending ? 'inhabilitarDiv' : ''}`}>
        <form className="formFlex" onSubmit={handleSubmit(onSubmit)}>
          <div className="formFields">
            <label htmlFor="name">Nombre/Empresa:</label>
            <input
              type="text"
              placeholder="nombre"
              {...register('nombre', { required: true })}
            />
          </div>

          <div className="formFields">
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              placeholder="correo"
              {...register('correoElectronico', {
                required: 'El correo es obligatorio',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'El formato de correo no es válido',
                },
              })}
            />
            {errors.correoElectronico && (
              <span className="error-message">
                {errors.correoElectronico.message}
              </span>
            )}
          </div>

          <div className="formFields">
            <label htmlFor="content">Cuerpo Mensaje:</label>
            <textarea
              rows={10}
              placeholder="Mensaje a enviar"
              {...register('content', { required: true })}></textarea>

            {!isValid && (
              <small>
                El botón se habilita al tener los campos correctos para su envío
              </small>
            )}
          </div>

          <button
            className="formButton"
            type="submit"
            disabled={!isValid || isSending}>
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </div>
    </footer>
  );
};
