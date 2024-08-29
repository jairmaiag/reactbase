import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITarefa } from '../../model/tarefa.model';
import TarefaStore, { ITarefaStore } from '../../model/tarefa.state.model'

const initialState: ITarefaStore = TarefaStore.getTarefaStore();

const tarefaSlice = createSlice({
    name: 'tarefas',
    initialState,
    reducers: {
        actionTarefaEntidade: (state: ITarefaStore, {payload}: PayloadAction<number>): ITarefaStore => {
            return {...state, entidade: state.lista.find((tarefa: ITarefa) => tarefa.id === payload)};
        },
        actionAddTarefa:(state: ITarefaStore, {payload}: PayloadAction<ITarefa>): ITarefaStore => {
            let id = payload.id;
            if(id === 0) {
              if(state.lista.length === 0){
                id = 1;
              }else{
                id = state.lista[state.lista.length - 1].id + 1;
              }
            }
            payload.id = id;
            return {...state, lista: [...state.lista, payload]};
        },
        actionRemoveTarefa:(state: ITarefaStore, {payload}: PayloadAction<number>): ITarefaStore => {
            return {...state, lista: state.lista.filter((tarefa: ITarefa) => tarefa.id !== payload)};
        },
        actionEditarTarefa:(state: ITarefaStore, {payload}: PayloadAction<ITarefa>): ITarefaStore => {           
            return {...state, lista: state.lista.map((tarefa: ITarefa) => {
                if(tarefa.id === payload.id){
                    return {...tarefa, descricao: payload.descricao};
                }
                return tarefa;
                })
            };
        },
    }
});

export default tarefaSlice.reducer; // Obejto que será usado na propriedade 'reducer' da store.
export const { actionTarefaEntidade, actionAddTarefa, actionRemoveTarefa, actionEditarTarefa } = tarefaSlice.actions; // As actions que serão disparadas.
export const selectorListaTarefa = (state: any) => {
    return state.tarefas.lista as ITarefa[];
}
export const selectorEntidadeTarefa = (state: any) => {
    return state.tarefas.entidade as ITarefa;
}

// actionAdicionaTarefa: (state, {payload}: PayloadAction<ITarefa>) => {
//     return { ...state, lista[...state.lista, payload] };
// },
