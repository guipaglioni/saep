"use client"
import { useState, } from 'react';
import styles from '../login/login.module.css';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import Card from '@/components/card/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import setCookies from '@/utils/setCookies';
const axios = require('axios');

export default function Cadastro() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const router = useRouter()

    const cheklogin = async () => {
        try {
            const login = await getCookies()
            if (login !== null) {
                router.push('/')
            }
        } catch {
        }
    }

    cheklogin()
    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value

        })
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await axios.post('http://localhost:8080/register', {
                body: formData
            })
                .then(function (response) {
                    setCookies(response.data)
                    router.push('/')
                    console.log(response);
                })
                .catch(function (error) {
                    console.error(error);
                });

            const json = await response.json()
            console.log(response)
            console.log(json)

        } catch (err) {

        }
    }

    return (
        <div className={styles.background}>
            <Card title='Crie sua conta'>
                <form onSubmit={handleForm} className={styles.form}>
                    <Input type="text" placeholder="Seu nome" required value={formData.name} onChange={(e) => { handleFormEdit(e, 'name') }}></Input>
                    <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={(e) => { handleFormEdit(e, 'email') }}></Input>
                    <Input type="password" placeholder="Sua senha" required value={formData.senha} onChange={(e) => { handleFormEdit(e, 'password') }}></Input>
                    <Button>Cadastrar</Button>
                    <Link href='/login'> Já possui uma conta?</Link>
                </form>
            </Card>
        </div>
    )
}