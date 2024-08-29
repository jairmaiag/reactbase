import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import {  selectorListaTarefa, 
          actionAddTarefa,
          actionEditarTarefa,
          actionRemoveTarefa } from './redux/slice/tarefaSlice';
import Tarefa, {ITarefa} from './model/tarefa.model'
import './App.css'

const inicialState:ITarefa = new Tarefa(0,'')

function App() {
  const [tarefaAtiva, setTarefaAtiva] = useState<ITarefa>(inicialState);
  const listaTarefas = useSelector(selectorListaTarefa);
  const dispatch = useDispatch();
 
  const focus = ()=> {
    const inputDescricao = document.getElementById('descricao')
    inputDescricao?.focus();
  }

  const salvar = () => {
    if(tarefaAtiva.id === 0){
      dispatch(actionAddTarefa(tarefaAtiva));
    }else{
      dispatch(actionEditarTarefa(tarefaAtiva))
    }
    setTarefaAtiva(inicialState);
    focus();
  }

  const selectTarefa = (tarefa: ITarefa) => {
    setTarefaAtiva(tarefa);
    focus();
  }
  const removeTarefa = (idTarefa: number)=> {
    dispatch(actionRemoveTarefa(idTarefa));
    setTarefaAtiva(inicialState);
    focus();
  }
  return (
    <div style={{textAlign: 'center'}}>
      <div style={{paddingBottom: '15px'}}>
        <label htmlFor="descricao">Tarefa: 
          <input type="text"
            value={tarefaAtiva.descricao}
            onChange={(event)=> setTarefaAtiva({id:tarefaAtiva.id, descricao:event.target.value}) }
            name="descricao" 
            id="descricao" 
            autoFocus />
        </label>
        <button type="button" onClick={salvar}>Salvar</button>
        <p>Quantidade de tarefas: {listaTarefas.length}</p>
      </div>
      {listaTarefas.length > 0 &&      
        <div style={{overflowX: 'auto'}}>
          <table className="tabela">
            <thead>
              <tr>
                <th className="id">Id</th>
                <th>Descrição</th>
                <th colSpan={2} className="acao">Ação</th>
              </tr>
            </thead>
            <tbody>
              {
                listaTarefas.map((tarefa: ITarefa) => 
                  <tr key={tarefa.id}>
                    <td>{tarefa.id}</td>
                    <td>{tarefa.descricao}</td>
                    <td><button type="button" onClick={() => selectTarefa(tarefa)}>Editar</button></td>
                    <td><button type="button" onClick={() => removeTarefa(tarefa.id)}>Excluir</button></td>
                  </tr>
              )
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  );
}

export default App;
