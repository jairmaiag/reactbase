export interface ITarefa {
    id:number
    descricao: string
}
export default class Tarefa implements ITarefa {
    id:number
    descricao: string

    constructor(id: number, descricao: string){
        this.id = id;
        this.descricao = descricao;
    }

    toString() {
        return `${this.id} - ${this.descricao}`;
    }
}