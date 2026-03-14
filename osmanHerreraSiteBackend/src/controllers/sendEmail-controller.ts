import { Request, Response } from "express";
import { sendEmail } from "../services/sendEmail.service";
import { NodeMailerResponse } from "../interfaces/nodeMailerResponse.interface";

export const sendEmailController = async (req: Request, res: Response) => {
    const { ...emailData } = req.body;

    try {
        const emailBody = await sendEmail(emailData);

        // 🛡️ VALIDACIÓN DE SEGURIDAD:
        // Verificamos si emailBody es un error o si no tiene la propiedad rejected
        if (!emailBody || emailBody instanceof Error || !emailBody.rejected) {
            console.error("El servicio de email devolvió un error:", emailBody);
            throw new Error('El servicio de correo no respondió correctamente');
        }

        if (emailBody.rejected.length === 0) {
            return res.status(202).json({
                ok: true,
                msg: 'Correo enviado exitosamente',
                emailBody
            });
        } else {
            console.log({ Aceptados: emailBody.accepted });
            console.log({ Rechazados: emailBody.rejected });
            throw new Error('Error al enviar correo: destinatario rechazado');
        }

    } catch (err: any) {
        console.error("[CONTROLLER ERROR]:", err.message);
        return res.status(400).json({
            ok: false,
            msg: err.message || 'Error al enviar el correo',
        });
    }
}