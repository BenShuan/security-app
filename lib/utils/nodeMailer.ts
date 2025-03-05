'use server'
import nodemailer from 'nodemailer';
import { requireAuth } from '../auth';

// Define an interface for email data
interface EmailData {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: process.env.EMAIL_SERVER_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SERVER_USER ,
    pass: process.env.EMAIL_SERVER_PASSWORD ,
  },
});

export const sendEmail = async (data: EmailData) => {
  try {
    const currentUser = await requireAuth();
    const info = await transporter.sendMail({
      from: `"ביטחון דקסל" <${currentUser.email}>`, // Sender address
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    return { success: true, message: `email sent to: ${data.to}` };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: 'Error sending email' };
  }
};
