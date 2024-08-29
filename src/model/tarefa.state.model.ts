import {ITarefa} from './tarefa.model'

export type entidadeType = ITarefa | undefined;

export interface ITarefaStore {
    lista: ITarefa[]
    entidade: entidadeType
}

export default class TarefaStore {
    lista: ITarefa[];
    entidade: entidadeType;

    constructor(lista: ITarefa[], entidade: entidadeType ){
        this.lista = lista;
        this.entidade = entidade;
    }
    
    static getTarefaStore():ITarefaStore {
        return new TarefaStore([], undefined);
    }
}