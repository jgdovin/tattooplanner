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
export async function GET() {
  console.log(process.env.EMAIL_USER);
  console.log(process.env.EMAIL_PASS);
  const info = await transporter.sendMail({
    from: "joshgdovin@gmail.com",
    to: "josh@dookingdesign.com",
    subject: "From NextJS",
    text: "Hello from NextJS",
    html: "<b>Hello from NextJS</b>",
  });
  return Response.json({
    info,
  });
}
