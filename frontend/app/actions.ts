'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

// Tipo para os dados de respostas
interface DadosRespostas {
  A: number;
  B: number;
  C: number;
  D: number;
}

interface ContagemRespostas {
  dados: number;
  ux: number;
  dev: number;
  seguranca: number;
}

const CONTAS_PADRAO: ContagemRespostas = {
  dados: 0,
  ux: 0,
  dev: 0,
  seguranca: 0,
};

async function getSupabaseClient() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function obterRespostasAgrupadas(
  perguntaId: string
): Promise<DadosRespostas> {
  const supabase = await getSupabaseClient();

  try {
    const { data, error } = await supabase
      .from('respostas')
      .select('alternativa')
      .eq('pergunta_id', perguntaId);

    if (error) {
      throw new Error(`Erro ao buscar respostas: ${error.message}`);
    }

    const resultado: DadosRespostas = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };

    if (data) {
      data.forEach((row: any) => {
        const alternativa = row.alternativa?.toUpperCase() as
          | 'A'
          | 'B'
          | 'C'
          | 'D'
          | undefined;
        if (alternativa && ['A', 'B', 'C', 'D'].includes(alternativa)) {
          resultado[alternativa]++;
        }
      });
    }

    return resultado;
  } catch (error) {
    console.error('Erro ao processar respostas:', error);
    return { A: 0, B: 0, C: 0, D: 0 };
  }
}

export async function obterRespostasMultiplas(
  perguntaIds: string[]
): Promise<Record<string, DadosRespostas>> {
  const resultado: Record<string, DadosRespostas> = {};

  for (const id of perguntaIds) {
    resultado[id] = await obterRespostasAgrupadas(id);
  }

  return resultado;
}

export async function obterContagemRespostas(): Promise<ContagemRespostas> {
  const supabase = await getSupabaseClient();

  try {
    const { data: linhas, error } = await supabase
      .from('Respostas')
      .select(
        'resposta-da-primeira-pergunta,resposta-da-segunda-pergunta,resposta-da-terceira-pergunta,resposta-da-quarta-pergunta,resposta-da-quinta-pergunta'
      )
      .setHeader('Cache-Control', 'no-store');

    if (error) {
      console.error('Erro ao buscar respostas:', error);
      return { ...CONTAS_PADRAO };
    }

    if (!linhas || linhas.length === 0) {
      return { ...CONTAS_PADRAO };
    }

    const contadores: ContagemRespostas = { ...CONTAS_PADRAO };
    const colunas = [
      'resposta-da-primeira-pergunta',
      'resposta-da-segunda-pergunta',
      'resposta-da-terceira-pergunta',
      'resposta-da-quarta-pergunta',
      'resposta-da-quinta-pergunta',
    ];

    linhas.forEach((linha: any) => {
      colunas.forEach((coluna) => {
        const valor = linha[coluna];
        if (valor === 'dados') contadores.dados++;
        if (valor === 'ux') contadores.ux++;
        if (valor === 'dev') contadores.dev++;
        if (valor === 'seguranca') contadores.seguranca++;
      });
    });

    return contadores;
  } catch (error) {
    console.error('Erro ao contar respostas:', error);
    return { ...CONTAS_PADRAO };
  }
}

export async function enviarRespostasDoFormulario(formData: FormData): Promise<void> {
  const supabase = await getSupabaseClient();

  try {
    const resposta1 = formData.get('pergunta1')?.toString() || '';
    const resposta2 = formData.get('pergunta2')?.toString() || '';
    const resposta3 = formData.get('pergunta3')?.toString() || '';
    const resposta4 = formData.get('pergunta4')?.toString() || '';
    const resposta5 = formData.get('pergunta5')?.toString() || '';

    if (!resposta1 || !resposta2 || !resposta3 || !resposta4 || !resposta5) {
      console.error('Todas as perguntas devem ser respondidas');
      return;
    }

    const dadosParaInserir = {
      'resposta-da-primeira-pergunta': resposta1,
      'resposta-da-segunda-pergunta': resposta2,
      'resposta-da-terceira-pergunta': resposta3,
      'resposta-da-quarta-pergunta': resposta4,
      'resposta-da-quinta-pergunta': resposta5,
    };

    const { error } = await supabase.from('Respostas').insert([dadosParaInserir]);

    if (error) {
      console.error('Erro ao inserir respostas:', error);
      return;
    }

    revalidatePath('/');
  } catch (error) {
    console.error('Erro ao processar formulário:', error);
  }
}
