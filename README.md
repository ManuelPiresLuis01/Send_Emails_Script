# 📊 Send_Emails_Script

Este projeto tem como objetivo **gerar relatórios mensais automáticos** sobre os repositórios da sua empresa, extraindo informações via **API do GitLab**, organizando em planilhas Excel e enviando por **e-mail** diretamente para os code owners.

O foco é simples: transformar dados dispersos em **insights estratégicos** de forma prática e automática.

---

## 🚀 Requisitos

Antes de iniciar, você precisa ter instalado:

* [Node.js](https://nodejs.org/) v18.x ou v20.x
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## ⚙️ Passo a Passo de Configuração

### 1. Clone o repositório

```bash
git clone https://github.com/ManuelPiresLuis01/Send_Emails_Script.git
cd Send_Emails_Script
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Na raiz do projeto, crie um arquivo `.env` com o seguinte conteúdo:

```env
GITLAB_TOKEN=YOUR_GITLAB_TOKEN   # Token de acesso à API do GitLab (com permissão de leitura)
API_URL=https://gitlab.com/api/v4
SMTP_HOST=smtp.sempresa.com      # Host SMTP da sua empresa
SMTP_PORT=587                    # Porta SMTP
SMTP_USER=your.email@company.com # Usuário SMTP (seu e-mail)
SMTP_PASS=your_password_or_token # Senha ou token de acesso do SMTP
EMAIL_TO=destinatario@empresa.com
ANALIST_SYSTEM=Seu Nome Aqui     # Nome do responsável pelo relatório
```

> 🔑 **Dica:** para gerar o `GITLAB_TOKEN`, vá até o GitLab → `Settings` → `Access Tokens`.

---

### 4. Configure os grupos do GitLab

Crie um diretório chamado **`config`** na raiz do projeto e dentro dele um arquivo `groups.json`.
Nesse arquivo, adicione os **IDs dos grupos** do GitLab que você deseja monitorar:

```json
[
  {
    "id": 2,
    "name": "Group Name 1"
  },
  {
    "id": 273,
    "name": "Group Name 2"
  }
]
```

> Para descobrir o `id` de um grupo, basta acessar a URL do grupo no GitLab ou usar a API.

---

### 5. Configure os destinatários do relatório

Abra o arquivo **`src/mock/email.ts`** e adicione os code owners da sua empresa:

```ts
const emails: sendEmail[] = [
  {
    name: "John Doe",             // Nome do destinatário
    email: "johndoe@example.com"  // E-mail do destinatário
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com"
  }
  // Adicione quantos quiser, separados por vírgula.
];
```

---

## 📜 Como executar

Rodar o projeto em desenvolvimento:

```bash
npm run dev
```

Compilar para produção:

```bash
npm run build
```

Rodar a versão compilada:

```bash
npm start
```

> Ao executar, o script coleta os dados do GitLab, gera o relatório em Excel (`relatorio.xlsx`) e envia para os e-mails configurados.

---

## 📦 Principais Dependências

* **[dotenv](https://www.npmjs.com/package/dotenv)** → Carrega variáveis de ambiente do `.env`.
* **[exceljs](https://www.npmjs.com/package/exceljs)** → Cria planilhas Excel para os relatórios.
* **[nodemailer](https://www.npmjs.com/package/nodemailer)** → Envia e-mails para os destinatários.
* **[node-fetch](https://www.npmjs.com/package/node-fetch)** → Faz requisições HTTP para a API do GitLab.

---

## 📝 Fluxo de Uso

1. Configure `.env` com seu `GITLAB_TOKEN` e dados de SMTP.
2. Defina os grupos em `config/groups.json`.
3. Adicione os destinatários em `src/mock/email.ts`.
4. Rode `npm run dev` para testar.
5. Se tudo estiver certo, o ficheiro gerado estara na raiz do projecto e depois será enviado para os codeowners.

---

## 👨‍💻 Autor

Projeto desenvolvido por **Manuel Pires Luís**.

---

>Sinta-se a vontade para usar e contribuir
