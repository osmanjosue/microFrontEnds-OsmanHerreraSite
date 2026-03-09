import { useState } from 'react';
import { sendContactEmail } from '../api/emailApi';

export const useContactForm = () => {
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (data: any) => {
    setIsSending(true);
    try {
      await sendContactEmail(data);
      alert("Mensaje enviado con éxito");
      return true; // Para indicar éxito y resetear el form
    } catch (error) {
      alert("No se pudo enviar el mensaje");
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendEmail };
};