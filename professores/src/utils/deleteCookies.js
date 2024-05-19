'use server'
import { cookies } from 'next/headers'

export default async function deleteCookies() {
    const cookieStore = cookies();
    try {
        const theme = cookieStore.delete('authorization');
        return theme.value;
    } catch (error) {
        // Trate o erro aqui, se necessário
        console.error('Erro ao obter o cookie:', error);
        return null;
    }
}

