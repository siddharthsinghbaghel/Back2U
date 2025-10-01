import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config(); // Ensure your env vars are loaded

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    const result = await resend.emails.send({
      from: 'Lost No More <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};
