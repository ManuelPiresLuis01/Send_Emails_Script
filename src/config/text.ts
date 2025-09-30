import { month } from "../var/var.ts"

export default  function Text (name:string,analistSystem:string):string {

    return( 
        `Olá ${name},\n\n` +
        `Segue em anexo o relatório mensal detalhado dos repositórios do GitLab referente ao mês de ${month[new Date().getMonth()]}. ` +
        `Este relatório contém informações sobre commits, merges, branches ativas e inativas, merge requests abertas, issues abertas e status do CI/CD para cada projeto.\n\n` +
        `Por favor, revise o relatório e entre em contato caso haja alguma divergência ou dúvida.\n\n` +
        `Atenciosamente,\n` +
        `${analistSystem}\n`
        )
}