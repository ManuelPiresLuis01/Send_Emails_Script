import nodemailer from "nodemailer";
import dotenv from "dotenv";
import type{ sendEmail } from "../type/relatory.type.ts";
import { month } from "../var/var.ts";
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
    from: `"Manuel Pires Luis QA Mamboo" <${process.env.SMTP_USER}>`,
    to: emailTo?.email,
    subject: `📊 Relatório Mensal -GITLAB - Auditoria Mamboo do mês de ${month[new Date().getMonth()]}`,
    text: `Olá ${emailTo?.name},\n\n` +
        `Segue em anexo o relatório mensal detalhado dos repositórios do GitLab da Mamboo referente ao mês de ${month[new Date().getMonth()]}. ` +
        `Este relatório contém informações sobre commits, merges, branches ativas e inativas, merge requests abertas, issues abertas e status do CI/CD para cada projeto.\n\n` +
        `Por favor, revise o relatório e entre em contato caso haja alguma divergência ou dúvida.\n\n` +
        `Atenciosamente,\n` +
        `Manuel Pires Luis\nQA - Mamboo Tecnologia`,
    attachments: [
      {
        filename: "relatorio.xlsx",
        path: path.resolve(filePath),
      },
    ],
  });
}
