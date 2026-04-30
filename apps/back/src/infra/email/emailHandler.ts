import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type enviarEmailProps = {
    to:string,
    subject:string,
    html:string,
}

export async function enviarEmail(email:enviarEmailProps) {
    
    const remetente = process.env.EMAIL_SENDER || 'onboarding@resend.dev';
    const destinatario = process.env.EMAIL_SENDER ? email.to : 'delivered@resend.dev';

    await resend.emails.send({
        from: `BeachQuadra <${remetente}>`,
        to: destinatario,
        subject: email.subject,
        html: email.html,
    });
};