import { useState } from 'react';
import { siteConfig } from '@shared/content';
import { sendContactEmail } from '../api/emailApi';

const { alerts } = siteConfig.contactForm;

export const useContactForm = () => {
  const [isSending, setIsSending] = useState(false);

  const sendEmail = async (data: any) => {
    setIsSending(true);
    try {
      await sendContactEmail(data);
      alert(alerts.success);
      return true; // Para indicar éxito y resetear el form
    } catch (error) {
      alert(alerts.error);
      return false;
    } finally {
      setIsSending(false);
    }
  };

  return { isSending, sendEmail };
};