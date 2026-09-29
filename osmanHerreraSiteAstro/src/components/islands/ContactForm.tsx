// ===========================================================================
// ISLA REACT: CONTACT FORM (ISLAND CON CLIENT:VISIBLE)
// ===========================================================================
// Formulario de contacto interactivo que consume react-hook-form y envía
// las peticiones POST al backend de Express (${API}/email).
// Recibe por props exclusivamente los textos resueltos en el idioma actual,
// evitando empaquetar la configuración completa en el bundle del cliente.
// Reemplaza alert() por alertas en línea accesibles (aria-live="polite").

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface ContactFormTexts {
  name: {
    label: string;
    placeholder: string;
  };
  email: {
    label: string;
    placeholder: string;
  };
  message: {
    label: string;
    placeholder: string;
  };
  minMessageLength: number;
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailPattern: string;
    messageRequired: string;
    messageMinLength: string;
    formInvalid: string;
  };
  submit: string;
  sending: string;
  note: string;
  alerts: {
    success: string;
    error: string;
    close: string;
  };
}

export interface ContactFormProps {
  texts: ContactFormTexts;
}

interface FormData {
  nombre: string;
  correoElectronico: string;
  content: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ texts }) => {
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormData) => {
    setIsSending(true);
    setStatusMessage(null);

    const baseUrl = import.meta.env.PUBLIC_EMAIL_API_URL || '/api';

    try {
      const response = await fetch(`${baseUrl}/email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Server returned error response');
      }

      const result = await response.json();
      if (result.ok === false) {
        throw new Error(result.msg || 'Error al enviar');
      }

      setStatusMessage({
        type: 'success',
        text: texts.alerts.success,
      });
      reset();
    } catch {
      setStatusMessage({
        type: 'error',
        text: texts.alerts.error,
      });
    } finally {
      setIsSending(false);
    }
  };

  const onError = () => {
    setStatusMessage({
      type: 'error',
      text: texts.errors.formInvalid,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="space-y-space-md"
      noValidate
    >
      {/* Alerta en línea con aria-live="polite" */}
      {statusMessage && (
        <div
          role="status"
          aria-live="polite"
          className={`p-space-md chamfer flex items-start gap-space-sm font-body-sm transition-all duration-300 ${
            statusMessage.type === 'success'
              ? 'bg-primary-container/10 border border-primary-container text-primary-container'
              : 'bg-error-container/20 border border-error text-error'
          }`}
        >
          <span className="material-symbols-outlined text-base mt-0.5 select-none" aria-hidden="true">
            {statusMessage.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <p className="flex-1 font-semibold">{statusMessage.text}</p>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-xs opacity-70 hover:opacity-100 uppercase tracking-wider ml-auto select-none"
            aria-label={texts.alerts.close}
          >
            ✕
          </button>
        </div>
      )}

      {/* Campo: Nombre */}
      <div className="space-y-1">
        <label
          htmlFor="contact-name"
          className="block font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant font-semibold"
        >
          {texts.name.label}
        </label>
        <input
          id="contact-name"
          type="text"
          placeholder={texts.name.placeholder}
          disabled={isSending}
          aria-invalid={!!errors.nombre}
          aria-describedby={errors.nombre ? 'contact-name-error' : undefined}
          className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-space-sm text-on-surface font-body-md placeholder:text-on-surface-variant/40 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all chamfer disabled:opacity-60"
          {...register('nombre', {
            required: texts.errors.nameRequired,
          })}
        />
        {errors.nombre && (
          <p id="contact-name-error" className="font-label-micro text-label-micro text-error mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs" aria-hidden="true">error</span>
            <span>{errors.nombre.message}</span>
          </p>
        )}
      </div>

      {/* Campo: Correo Electrónico */}
      <div className="space-y-1">
        <label
          htmlFor="contact-email"
          className="block font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant font-semibold"
        >
          {texts.email.label}
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder={texts.email.placeholder}
          disabled={isSending}
          aria-invalid={!!errors.correoElectronico}
          aria-describedby={errors.correoElectronico ? 'contact-email-error' : undefined}
          className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-space-sm text-on-surface font-body-md placeholder:text-on-surface-variant/40 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all chamfer disabled:opacity-60"
          {...register('correoElectronico', {
            required: texts.errors.emailRequired,
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: texts.errors.emailPattern,
            },
          })}
        />
        {errors.correoElectronico && (
          <p id="contact-email-error" className="font-label-micro text-label-micro text-error mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs" aria-hidden="true">error</span>
            <span>{errors.correoElectronico.message}</span>
          </p>
        )}
      </div>

      {/* Campo: Mensaje */}
      <div className="space-y-1">
        <label
          htmlFor="contact-message"
          className="block font-label-caps text-label-caps uppercase tracking-wider text-on-surface-variant font-semibold"
        >
          {texts.message.label}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={texts.message.placeholder}
          disabled={isSending}
          aria-invalid={!!errors.content}
          aria-describedby={errors.content ? 'contact-message-error' : undefined}
          className="w-full bg-surface-container-low border border-outline-variant/60 px-space-md py-space-sm text-on-surface font-body-md placeholder:text-on-surface-variant/40 focus:border-primary-container focus:outline-none focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all chamfer resize-y min-h-[120px] disabled:opacity-60"
          {...register('content', {
            required: texts.errors.messageRequired,
            minLength: {
              value: texts.minMessageLength,
              message: texts.errors.messageMinLength,
            },
          })}
        />
        {errors.content && (
          <p id="contact-message-error" className="font-label-micro text-label-micro text-error mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs" aria-hidden="true">error</span>
            <span>{errors.content.message}</span>
          </p>
        )}
      </div>

      {/* Botón de Envío */}
      <div className="pt-space-xs">
        <button
          type="submit"
          disabled={isSending}
          className="chamfer bg-primary-container text-on-primary-fixed font-bold hover:shadow-[0_0_24px_rgba(0,240,255,0.65)] hover:bg-primary-fixed py-space-md px-space-xl font-label-caps text-label-caps uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed w-full flex items-center justify-center gap-space-sm cursor-pointer select-none"
        >
          {isSending ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-on-primary-fixed border-t-transparent rounded-full animate-spin" aria-hidden="true" />
              <span>{texts.sending}</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base" aria-hidden="true">send</span>
              <span>{texts.submit}</span>
            </>
          )}
        </button>
      </div>

      {/* Nota de respuesta */}
      <p className="font-body-sm text-on-surface-variant text-center opacity-80 pt-space-xs">
        {texts.note}
      </p>
    </form>
  );
};

export default ContactForm;
