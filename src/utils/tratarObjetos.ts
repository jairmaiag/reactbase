export function serializar(objeto: object){
    if(objeto){
        return JSON.parse(JSON.stringify(objeto));
    }
    return objeto;
}