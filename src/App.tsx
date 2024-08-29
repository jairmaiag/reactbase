import { useState } from "react";
import './App.css'

interface ITarefa {
  id:number
  descricao: string
}
const inicialState:ITarefa = {id:0,descricao:''}

function App() {
  const [listaTarefas, setlistaTarefas] = useState<Array<ITarefa>>([]);
  const [tarefaAtiva, setTarefaAtiva] = useState<ITarefa>(inicialState);
  const focus = ()=> {
    const inputDescricao = document.getElementById('descricao')
    inputDescricao?.focus();
  }

  const salvar = () => {
    let id = tarefaAtiva.id;
    if(id === 0) {
      if(listaTarefas.length === 0){
        id = 1;
      }else{
        id = listaTarefas[listaTarefas.length - 1].id + 1;
      }
    }

    const tarefaOfLista: ITarefa = {id, descricao: tarefaAtiva.descricao};
    if(tarefaAtiva.id === 0){
      setlistaTarefas([...listaTarefas, tarefaOfLista]);
    }else{
      setlistaTarefas(listaTarefas.map(tarefa => {
        if(tarefa.id === id){
          tarefa.descricao = tarefaOfLista.descricao;
        }
        return tarefa;
      }));
    }
    setTarefaAtiva(inicialState);
    focus();
  }

  const selectTarefa = (tarefa: ITarefa) => {
    setTarefaAtiva(tarefa);
    focus();
  }
  const removeTarefa = (idTarefa: number)=> {
    setlistaTarefas(listaTarefas.filter(tarefaOfLista => tarefaOfLista.id !== idTarefa));
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
