import ExcelJS from "exceljs";

export default function setupExcel() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Relatório Mensal");

  sheet.columns = [
    { header: "Grupo", key: "grupo", width: 30 },
    { header: "Repositorio", key: "repo", width: 50 },
    { header: "Owners", key: "owners", width: 50 },
    { header: "Commits", key: "commits", width: 15 },
    { header: "Merges", key: "merges", width: 15 },
    { header: "Ultimo Commit", key: "lastCommit", width: 30 },
    { header: "Branches", key: "branches", width: 15 },
    { header: "Branches Ativas", key: "activeBranches", width: 15 },
    { header: "Branches Inativas", key: "inactiveBranches", width: 15 },
    { header: "MRs Abertas", key: "mrs", width: 15 },
    { header: "Issues Abertas", key: "issues", width: 15 },
    { header: "CI", key: "ci", width: 10 },
  ];


  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  return { workbook, sheet };
}
