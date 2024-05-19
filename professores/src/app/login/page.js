"use client"
import { useState } from "react"
import Card from "@/components/card/card"
import Input from "@/components/input/input"
import Button from "@/components/button/button"
import styles from './login.module.css'
import Link from "next/link"
import setCookies from "@/utils/setCookies"
import { useRouter } from "next/navigation"
import getCookies from "@/utils/getCookies"

const axios = require('axios');

export default function Login() {


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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleFormEdit = (event, name) => {
        setFormData({
            ...formData,
            [name]: event.target.value

        })
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await axios.post('http://localhost:8080/login', {
                formData
            })
                .then(function (response) {
                    setCookies(response.data)
                    localStorage.setItem("token",response.data);
                    router.push('/')
                })
                .catch(function (error) {
                    console.error(error);
                });

            const json = await response.json()
            console.log(response)
            console.log(json)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.background}>
            <Card title='Entre em sua conta'>
                <form onSubmit={handleForm} className={styles.form}>
                    <Input type="email" placeholder="Seu e-mail" required value={formData.email} onChange={(e) => { handleFormEdit(e, 'email') }}></Input>
                    <Input type="password" placeholder="Sua senha" required value={formData.password} onChange={(e) => { handleFormEdit(e, 'password') }}></Input>
                    <Button>Entrar</Button>
                    <Link href='/cadastro'>Ainda não possui cadastro?</Link>
                </form>
            </Card>
        </div>
    )
}