export function FormarDate(date:string){
    const setDate=new Date(date)
    return `${setDate.getDate()}/${setDate.getMonth()}/${setDate.getFullYear()}`
}