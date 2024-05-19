"use client"
import './Navbar.css'; // Importe o arquivo CSS
import deleteCookies from '@/utils/deleteCookies';

export default function Navbar ({ professorNome, handleLogout }) {
    handleLogout = () => {
        deleteCookies()
        handleForm()
        localStorage.clear()
        window.location.assign('/login');
    }

    const handleForm = async (event) => {
        try {
            event.preventDefault()
            const response = await axios.get('http://localhost:8080/logout')
                .then(function (response) {
                    console.log(response.data);
                })
                .catch(function (error) {
                    console.error(error);
                });
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <nav>
            <h1>Bem-vindo, {professorNome}!</h1>
            <button onClick={handleLogout}>Sair</button>
        </nav>
    );
};

