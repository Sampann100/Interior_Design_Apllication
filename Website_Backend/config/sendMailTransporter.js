import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async ({ to, subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Interior App <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
    return data;
  } catch (err) {
    console.error("Error sending email via Resend:", err);
  }
};
