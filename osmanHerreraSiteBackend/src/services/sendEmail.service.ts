import nodemailer, { SentMessageInfo } from 'nodemailer';
import 'dotenv/config';
import { EmailAttachment } from '../interfaces/email.interface';
// import { lista } from './listaDeCorreos';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Importante: usar true para el puerto 465
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_SECRET_KEY
    }
});

export const sendEmail = async (options: { nombre: string, correoElectronico: string, content: string, attachments?: EmailAttachment[] | undefined }): Promise<SentMessageInfo> => {

    const { nombre: subject, correoElectronico: replyTo, content: html, attachments = [] } = options;

    try {
        const dataToSend = await transporter.sendMail({
            from: `osmanherrera.dev <osmanherrera.dev>`,
            to: ['osmanjosue007@gmail.com'],
            replyTo,
            subject,
            html,
            attachments
        });
        return dataToSend;
    }
    catch (error) {
        // 🛠️ EL CAMBIO CRUCIAL:
        console.error("Error detectado en el transporte de correo:", error);
        throw error; // Al usar throw, el controlador detecta el fallo automáticamente
    }
}
