import dotenv from "dotenv";

dotenv.config();

export const API_URL = process.env.API_URL;
export const TOKEN = process.env.GITLAB_TOKEN;
export const month = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];
