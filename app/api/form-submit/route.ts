import { validateContactForm } from '@/app/utils/validator/contact-form';
import { getMailTemplate } from '@/lib/mail-template';
import { NextResponse } from 'next/server';
import nodemailer, { Transporter } from "nodemailer";

interface ContactForm {
    name:string,
    surname:string,
    email:string,
    subject:string,
    message:string
}

export async function POST(request: Request) {
  const data:ContactForm = await request.json();

  if(!validateContactForm(data)){
    return NextResponse.json(
        { message: "Bad Request" }, 
        { status: 400 }
    );
  }
  await sendMail(data);
  return NextResponse.json(
    { message: "Veri başarıyla oluşturuldu" }, 
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json(
    { message: "Veri başarıyla oluşturuldu" }, 
    { status: 201 }
  );
}

async function sendMail(data:ContactForm) {
  const transporter: Transporter = getTransporter();
  const mailTemplate = getMailTemplate(data);
  await transporter.sendMail({
    from: data.email,
    to: process.env.TARGET_MAIL,
    subject: data.subject,
    html: mailTemplate
  })
}

function getTransporter() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
}