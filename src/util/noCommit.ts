export default function noCommitDate(str:string):string {
    if (str === "NaN/NaN/NaN - NaN:NaN:NaN") 
         return "------------"
    return str
}
