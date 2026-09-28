import { useForm } from 'react-hook-form';
import { useContactForm } from '../hooks/useContactForm';
import { siteConfig } from '@shared/content';
import '../App.css';

const form = siteConfig.contactForm;

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
            {form.name.label}
          </label>
          <input
            id="nombre"
            type="text"
            className="form-input"
            placeholder={form.name.placeholder}
            {...register('nombre', {
              required: form.errors.nameRequired,
            })}
          />
          {errors.nombre && (
            <span className="form-error">{errors.nombre.message}</span>
          )}
        </div>

        {/* Email */}
        <div className="form-group">
          <label htmlFor="correoElectronico" className="form-label">
            {form.email.label}
          </label>
          <input
            id="correoElectronico"
            type="email"
            className="form-input"
            placeholder={form.email.placeholder}
            {...register('correoElectronico', {
              required: form.errors.emailRequired,
              pattern: {
                value: /^\S+@\S+$/i,
                message: form.errors.emailPattern,
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
            {form.message.label}
          </label>
          <textarea
            id="content"
            className="form-textarea"
            placeholder={form.message.placeholder}
            {...register('content', {
              required: form.errors.messageRequired,
              minLength: {
                value: form.minMessageLength,
                message: form.errors.messageMinLength,
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
            {form.errors.formInvalid}
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
              {form.sending}
            </span>
          ) : (
            form.submit
          )}
        </button>

        <p className="text-xs opacity-70 text-center">
          {form.note}
        </p>
      </form>
    </div>
  );
};
