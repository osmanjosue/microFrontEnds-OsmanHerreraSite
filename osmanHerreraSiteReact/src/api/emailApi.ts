const BASE_URL = import.meta.env.VITE_EMAIL_API_URL; // O tu variable de entorno

export const sendContactEmail = async (data: { nombre: string; correoElectronico: string; content: string }) => {
  const response = await fetch(`${BASE_URL}/email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error al enviar el correo');
  return response.json();
};