import { configureStore } from '@reduxjs/toolkit';
import tarefaReduce from '../slice/tarefaSlice';

const store = configureStore({
    reducer: {
        tarefas: tarefaReduce
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>; // Usado para tipar os states onde for preciso
export type AppDispatch = typeof store.dispatch;
