import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type{ sendEmail } from "../type/relatory.type.ts";
import { month } from "../var/var.ts";
import Text from "./text.ts";
import path from "path";

dotenv.config();

export async function sendReport(filePath: string,emailTo?: sendEmail) {
  if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS || !process.env.EMAIL_TO) 
      return console.warn("⚠️  Configuração de email incompleta. Verifique as variáveis de ambiente.");

  if(!filePath || !emailTo?.email || !emailTo?.name)
    return console.warn("⚠️  Erro ao enviar emails.");

  console.log(` 📧 Enviando relatório para : ${emailTo?.name}...`);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false, 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `${process.env.ANALIST_SYSTEM ? process.env.ANALIST_SYSTEM : "Analista de Sistemas"} <${process.env.SMTP_USER}>`,
    to: emailTo?.email,
    subject: `📊 Relatório Mensal - GITLAB | do mês de ${month[new Date().getMonth()]}`,
    text:Text(emailTo?.name,process.env.ANALIST_SYSTEM || "Analista de Sistemas"),
    attachments: [
      {
        filename: "relatorio.xlsx",
        path: path.resolve(filePath),
      },
    ],
  });
}
