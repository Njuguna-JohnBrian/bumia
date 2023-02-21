import * as nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

interface IEmailOptions {
  email: string;
  subject: string;
  message: string;
}

const sendEmail = async (options: IEmailOptions) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  } as SMTPTransport.Options);

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(message);
};

export { sendEmail };
