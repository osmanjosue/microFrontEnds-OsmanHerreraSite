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
    <div className="w-full">
      <form
        className={`form-glass transition-all ${
          isSending ? 'blur-state' : ''
        }`}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Nombre */}
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">
            Nombre / Empresa
          </label>
          <input
            id="nombre"
            type="text"
            className="form-input"
            placeholder="Tu nombre o empresa"
            {...register('nombre', {
              required: 'El nombre es obligatorio',
            })}
          />
          {errors.nombre && (
            <span className="form-error">{errors.nombre.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="correoElectronico" className="form-label">
            Correo Electrónico
          </label>
          <input
            id="correoElectronico"
            type="email"
            className="form-input"
            placeholder="tu@email.com"
            {...register('correoElectronico', {
              required: 'El correo es obligatorio',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'El formato de correo no es válido',
              },
            })}
          />
          {errors.correoElectronico && (
            <span className="form-error">
              {errors.correoElectronico.message}
            </span>
          )}
        </div>

        {/* Mensaje */}
        <div className="form-group">
          <label htmlFor="content" className="form-label">
            Mensaje
          </label>
          <textarea
            id="content"
            className="form-textarea"
            placeholder="Tu mensaje aquí..."
            {...register('content', {
              required: 'El mensaje es obligatorio',
              minLength: {
                value: 10,
                message: 'El mensaje debe tener al menos 10 caracteres',
              },
            })}
          />
          {errors.content && (
            <span className="form-error">{errors.content.message}</span>
          )}
        </div>

        {/* Validación Info */}
        {!isValid && (
          <p className="form-error mb-4">
            ℹ️ Completa correctamente todos los campos
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isValid || isSending}
          className="form-button w-full mb-3"
        >
          {isSending ? (
            <span className="inline-flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-transparent border-t-2 rounded-full animate-spin"></span>
              Enviando...
            </span>
          ) : (
            'Enviar Mensaje'
          )}
        </button>

        <p className="text-xs opacity-70 text-center">
          Responderé lo antes posible
        </p>
      </form>
    </div>
  );
};
