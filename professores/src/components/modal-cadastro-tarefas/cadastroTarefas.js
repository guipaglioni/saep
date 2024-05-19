"use client"

import { useEffect } from 'react';
import getCookies from '@/utils/getCookies';
const axios = require('axios');


export default function CadastroTarefa({ closeModalTarefa, descricaoTarefa ,setDescricaoTarefa ,id_turma, handleListaDeTarefas }) {
    
    

    const handleSubmitTarefa = async (event) => {
        try {
            event.preventDefault()
            await axios.post('http://localhost:8080/createAtividade', {
                descricao: descricaoTarefa,
                turma_id: id_turma
            })
                .then(function (response) {
                    handleListaDeTarefas(id_turma)
                })
                .catch(function (error) {
                    console.error(error);
                });
        } catch (err) {
            console.log(err)
        }
        closeModalTarefa();
    };

    return (
        <div className="modal">
            <h2>Cadastro de Tarefa</h2>
            <form >
                <input
                    type="text"
                    placeholder="Descrição da Tarefa"
                    value={descricaoTarefa}
                    onChange={(e) => setDescricaoTarefa(e.target.value)}
                />
                <button onClick={handleSubmitTarefa}>Enviar</button>
            </form>
        </div>
    )
}