'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

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

    revalidatePath('/')
}

export async function obterContagemRespostas() {
    // 1. Força o Next.js a tratar essa Server Action como puramente dinâmica toda vez que for chamada
    const cookieStore = await cookies();
    
    try {
        const supabase = createClient(cookieStore);

        // 2. Adicione essa configuração extra no select para desativar o cache do fetch do Supabase
        const { data: linhas, error } = await supabase
            .from("Respostas")
            .select("resposta-da-primeira-pergunta,resposta-da-segunda-pergunta,resposta-da-terceira-pergunta,resposta-da-quarta-pergunta,resposta-da-quinta-pergunta")
            .setHeader('Cache-Control', 'no-store'); // <--- Linha nova crucial!

        if (error) throw error;

        const contagem = {
            dados: 0,
            ux: 0,
            dev: 0,
            seguranca: 0,
        };

        if (!linhas || linhas.length === 0) {
            return contagem;
        }

        const colunas = [
            'resposta-da-primeira-pergunta',
            'resposta-da-segunda-pergunta',
            'resposta-da-terceira-pergunta',
            'resposta-da-quarta-pergunta',
            'resposta-da-quinta-pergunta'
        ];

        linhas.forEach((linha) => {
            colunas.forEach((coluna) => {
                const valor = linha[coluna];
                
                if (valor === 'dados') contagem.dados++;
                if (valor === 'ux') contagem.ux++;
                if (valor === 'dev') contagem.dev++;
                if (valor === 'seguranca') contagem.seguranca++;
            });
        });

        return contagem;

    } catch (err) {
        console.error('Erro ao processar contagem no servidor:', err);
        return { dados: 0, ux: 0, dev: 0, seguranca: 0 };
    }
}