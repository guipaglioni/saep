"use client"

import { useEffect } from 'react';
import getCookies from '@/utils/getCookies';
const axios = require('axios');


export default function CadastroTurmas({ setShowModal, nomeTurma, setNomeTurma }) {
    let token = localStorage.getItem('token')

    function parseJwt(token) {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    token = parseJwt(token)
    useEffect(() => {
        const cheklogin = async () => {
            try {
                const login = await getCookies()
                localStorage.setItem('token', login)
                if (login == null) {
                    router.push('/login')
                }
            } catch (err) {
                console.log(err)
            }
        }
        cheklogin()
    }, []);

    const handleSubmitTurma = async (event) => {
        try {
            event.preventDefault()
            const response = await axios.post('http://localhost:8080/registerTurma', {
                nome_turma: nomeTurma,
                usuario_id: token['id']
            })
                .then(function (response) {
                    window.location.reload()
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });
        } catch (err) {
            console.log(err)
        }
        setShowModal(false);
    };

    return (
        <div className="modal">
            <h2>Cadastro de Turma</h2>
            <form >
                <input
                    type="text"
                    placeholder="Nome da Turma"
                    value={nomeTurma}
                    onChange={(e) => setNomeTurma(e.target.value)}
                />
                <button onClick={handleSubmitTurma}>Enviar</button>
            </form>
        </div>
    )
}