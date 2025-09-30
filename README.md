# 📊 Send_Emails_Script

Este projeto tem como objetivo gerar relatórios mensais sobre os repositórios de uma sitema de versionamento remoto , extraindo informações via **API** e exportando os dados em formato estruturado (Excel).

Ele foi desenvolvido em **TypeScript**, utiliza **ESM (ECMAScript Modules)** e está preparado tanto para execução em ambiente de desenvolvimento quanto para compilação em produção.

---

## 🚀 Requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

* [Node.js](https://nodejs.org/) v18.x ou v20.x
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
---

## ⚙️ Configuração do Ambiente

1. **Clone o repositório**:

```bash
git clone https://github.com/ManuelPiresLuis01/Send_Emails_Script.git
cd Send_Emails_Script
```

2. **Instale as dependências**:

```bash
npm install
```

3. **Configure as variáveis de ambiente**:
   Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
GITLAB_TOKEN=STRING_YOUR_GITLAB_TOKEN_HERE
API_URL=https://gitlab.com/api/v4
SMTP_HOST=smtp.sempresa.com
SMTP_PORT=587
SMTP_USER=teu.email@empresa.com
SMTP_PASS=sua_senha_ou_token
EMAIL_TO=destinatario@empresa.com
```

> 🔑 O token precisa ter permissões de leitura nos repositórios que serão auditados.

---

## 📜 Scripts Disponíveis

* **Desenvolvimento**

  ```bash
  npm run dev
  ```

  Executa o projeto com **ts-node** diretamente em TypeScript.

## 📦 Dependências Principais

* **[dotenv](https://www.npmjs.com/package/dotenv)** → Carrega variáveis de ambiente do `.env`.
* **[exceljs](https://www.npmjs.com/package/exceljs)** → Gera planilhas Excel com os relatórios.
* **[node-fetch](https://www.npmjs.com/package/node-fetch)** → Faz requisições HTTP para a API do GitLab.

---

## 📝 Fluxo de Uso

1. Configure o `.env` com seu `GITLAB_TOKEN`.
2. Rode `npm run dev` para testar em TypeScript.
3. Se tudo estiver ok, execute `npm run build`.
4. Rode `npm start` para consumir a versão compilada.
5. O relatório será exportado em formato Excel (ex.: `relatorio.xlsx`).

---

## 👨‍💻 Autor

Projeto desenvolvido por **Manuel Pires Luís** .
---
