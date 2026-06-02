'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function enviarRespostasDoFormulario(formData){
    const resposta1 = formData.get('pergunta1')
    const resposta2 = formData.get('pergunta2')
    const resposta3 = formData.get('pergunta3')
    const resposta4 = formData.get('pergunta4')
    const resposta5 = formData.get('pergunta5')


    const cookieStore = await cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
        .from("Respostas")
        .insert({
            'resposta-da-primeira-pergunta' : resposta1,
            'resposta-da-segunda-pergunta' : resposta2,
            'resposta-da-terceira-pergunta' : resposta3,
            'resposta-da-quarta-pergunta' : resposta4,
            'resposta-da-quinta-pergunta' : resposta5
        })
    
        if (error) {
            console.error('Erro ao inserir respostas:', error)
            return 
        }
}