'use server'
import { cookies } from 'next/headers'


export default async function setCookies (cookie) {
        cookies().set('authorization', cookie)
}
