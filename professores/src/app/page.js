'use client'
import CadastroTarefa from "@/components/modal-cadastro-tarefas/cadastroTarefas";
import CadastroTurmas from "@/components/modal-cadastro-turmas/cadastroTurmas";
import Navbar from "@/components/navbar/navbar";
import getCookies from "@/utils/getCookies";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const axios = require('axios');

export default function Home() {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false);
  const [showModalTarefa, setShowModalTarefa ] = useState(false);
  const [nomeTurma, setNomeTurma] = useState('');
  const [descricaoTarefa, setDescricaoTarefa] = useState('')
  const [alunos, setAlunos] = useState([])
  const [token, setToken] = useState('');
  const [professorNome, setProfessorNome] = useState('')
  const [tarefas, setTarefas] = useState(false)
  const [listaDeTarefas, setListaDeTarefas ] = useState([])
  const [idTurma, setIdTurma] = useState('')

  function parseJwt(token) {
    if (!token) { return; }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }


  useEffect(() => {
    let localToken = window.localStorage.getItem('token');
    localToken = parseJwt(localToken)
    setProfessorNome(localToken.name)

    axios.get(`http://localhost:8080/getTurmas/${localToken.id}`)
      .then(function (response) {
        setAlunos(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

    if (localToken) {
      setToken(localToken);
    }

    const cheklogin = async () => {
      try {
        const login = await getCookies()
        if (login == null) {
          router.push('/login')
        }
      } catch (err) {
        console.log(err)
      }
    }

    cheklogin()
  }, []);

  const handleCadastroTurma = () => {
    setShowModal(true);
  };

  const handleCadastroTarefa = () => {
    setShowModalTarefa(true);
  };


  const handleDeleteTurma = async (id) => {
    if (window.confirm('Caso a turma tenha atividades cadastradas voce não podera excluir a turma. \n Você quer mesmo deletar a turma?')) {
      try {
        await axios.delete(`http://localhost:8080/deleteTurma/${id}`)
          .then(function (response) {
            location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (err) {
        console.log(err);
      }
    }
  }

  const handleListaDeTarefas = (event) => {
    try{
      axios.get(`http://localhost:8080/getAtividades/${event}`)
        .then(function (response) {
          setListaDeTarefas(response.data)
          setTarefas(true)
          setIdTurma(event)
        })
        .catch(function (error) {
          console.log(error);
          setTarefas(true)
          setListaDeTarefas([])
          setIdTurma(event)
        });
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmitTurma = async (event) => {
    try {
      event.preventDefault()
      const response = await axios.post('http://localhost:8080/registerTurma', {
        headers: {
          Authorization: `Bearer ${login}`
        },
        nomeTurma
      })
        .then(function (response) {
          setCookies(response.data)
        })
        .catch(function (error) {
          console.error(error);
        });


    } catch (err) {
      console.log(err)
    }
    setShowModal(false);
  };
  
  const closeModalTarefa =() => {
    setShowModalTarefa(false)
  }

  return (
    <div>
      <Navbar professorNome={professorNome}></Navbar>
      {tarefas == false ?
        <>
          <h2>Listagem de Turmas:</h2>
          <button onClick={() => handleCadastroTurma()}>Cadastro de Turma</button>
          <div onClick={handleSubmitTurma}>
            <ul className="turma-list">
              {alunos.map((turma) => (
                <li key={turma.id} className="turma-item">
                  <span className="turma-info">Turma {turma.id} - {turma.nome_turma}</span>
                  <div className="turma-buttons">
                    <button className="action-button" onClick={() => handleDeleteTurma(turma.id)}>Excluir</button>
                    <button className="action-button" onClick={() => handleListaDeTarefas(turma.id)}>Visualizar</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </> :
        <>
          <h2>Listagem de Tarefas:</h2>
          <button onClick={handleCadastroTarefa}>Cadastro de Tarefa</button>
          <button onClick={()=>{setTarefas(false)}}>voltar</button>
          <div onClick={closeModalTarefa}>
            <ul className="turma-list">
              {listaDeTarefas.map((tarefa) => (
                <li key={tarefa.id} className="turma-item">
                  <span className="turma-info">Tarefa: {tarefa.descricao}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      }

      {showModal && (
        <CadastroTurmas setShowModal={setShowModal} nomeTurma={nomeTurma} setNomeTurma={setNomeTurma}></CadastroTurmas>
      )}
      {showModalTarefa && (
        <CadastroTarefa handleListaDeTarefas={handleListaDeTarefas} closeModalTarefa={closeModalTarefa} id_turma={idTurma} descricaoTarefa={descricaoTarefa} setDescricaoTarefa={setDescricaoTarefa}></CadastroTarefa>
      )}

    </div>
  );
}
