import fs from "fs/promises";
import setupExcel from "./lib/Lib-excel.ts";
import type { GitlabGroup, GitlabProject, sendEmail } from "./type/relatory.type.ts";
import { API_URL } from "./var/var.ts";
import Order from "./order/order.ts";
import { sendReport } from "./config/sendEmail.ts";
import emails from "./mock/email.ts";

const order = new Order();
const groups: GitlabGroup[] = JSON.parse(
  await fs.readFile(new URL("../config/groups.json", import.meta.url), "utf8")
);
const { workbook, sheet } = setupExcel();

console.log("📑 Gerando relatorio...");
console.log("📑 Pode demorar alguns minutos...");

for (const group of groups) {
  console.log(`📊 Coletando dados do grupo: ${group.name} (${group.id})`);
  const projects = await order.fetchAll<GitlabProject>(
    `${API_URL}/groups/${group.id}/projects?include_subgroups=true`
  );

  for (const project of projects) {
    const data = await order.getProjectData(group, project);
    const row = sheet.addRow(data);

    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      cell.alignment = { vertical: "middle", horizontal: "left" };
      if (row.number % 2 === 0) {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "F2F2F2" } };
      }
    });

    console.log(`   ✅ Repositorio: ${project.name}`);
  }
}

try {
  await workbook.xlsx.writeFile("relatorio.xlsx");
  console.log("📑 Relatório Excel gerado com sucesso!");
} catch (error:unknown) {
    if (error instanceof Error) 
      console.error("❌ Erro ao gerar o relatório Excel:", error.message);
    else 
      console.error("❌ Erro desconhecido ao gerar o relatório Excel");

  process.exit(1);
}

console.log("📑 Iniciando processo de envio do relatorio por email...");

for(const email of emails) {
  try {
    await sendReport("relatorio.xlsx", email);
    console.log(`     ✅ Relatorio Enviado para ${email.name} com sucesso!`);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(`❌ Falha ao enviar para ${email.name}:`, err.message);
    } else {
      console.error(`❌ Falha desconhecida ao enviar para ${email.name}`);
    }
  }
}

console.log("📑 Processo de envio finalizado");
