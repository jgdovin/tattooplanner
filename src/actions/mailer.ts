"use server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "email-smtp.us-west-2.amazonaws.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: {
  to: string;
  subject: string;
  text: string;
  html: string;
}) {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    return { info };
  } catch (e) {
    console.error(e);
  }
}
