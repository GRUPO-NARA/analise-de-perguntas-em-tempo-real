'use server';

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

type RespostaArea = 'dados' | 'ux' | 'dev' | 'seguranca';

interface ContagemRespostas {
  dados: number;
  ux: number;
  dev: number;
  seguranca: number;
}

interface PontoBubble {
  x: number;
  y: number;
  r: number;
}

export interface EstadoEnvioFormulario {
  status: 'idle' | 'sucesso' | 'erro' | 'ja-enviado';
  mensagem: string;
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

function normalizeArea(value: unknown): RespostaArea | undefined {
  const resposta = String(value || '').trim().toLowerCase();
  if (resposta === 'dados' || resposta === 'ux' || resposta === 'dev' || resposta === 'seguranca') {
    return resposta;
  }
  return undefined;
}

export async function enviarRespostasDoFormulario(
  _estadoAnterior: EstadoEnvioFormulario,
  formData: FormData
): Promise<EstadoEnvioFormulario> {

  const resposta1 = formData.get('pergunta1')?.toString().trim() || '';
  const resposta2 = formData.get('pergunta2')?.toString().trim() || '';
  const resposta3 = formData.get('pergunta3')?.toString().trim() || '';
  const resposta4 = formData.get('pergunta4')?.toString().trim() || '';
  const resposta5 = formData.get('pergunta5')?.toString().trim() || '';
  
  const resposta6 = parseInt(formData.get('pergunta6')?.toString() || '', 10);
  const resposta7 = parseInt(formData.get('pergunta7')?.toString() || '', 10);
  const resposta8 = parseInt(formData.get('pergunta8')?.toString() || '', 10);
  const resposta9 = parseInt(formData.get('pergunta9')?.toString() || '', 10);
  const resposta10 = parseInt(formData.get('pergunta10')?.toString() || '', 10);

  const respostasDeArea = [resposta1, resposta2, resposta3, resposta4, resposta5];
  const respostasNumericas = [resposta6, resposta7, resposta8, resposta9, resposta10];

  if (
    respostasDeArea.some((resposta) => !normalizeArea(resposta)) ||
    respostasNumericas.some((resposta) => !Number.isInteger(resposta) || resposta < 1 || resposta > 5)
  ) {
    return {
      status: 'erro',
      mensagem: 'Responda as 10 perguntas antes de enviar.',
    };
  }

  const supabase = createClient(await cookies());
  const payload = {
    'resposta-da-primeira-pergunta': resposta1,
    'resposta-da-segunda-pergunta': resposta2,
    'resposta-da-terceira-pergunta': resposta3,
    'resposta-da-quarta-pergunta': resposta4,
    'resposta-da-quinta-pergunta': resposta5,
    'resposta-da-sexta-pergunta': resposta6,
    'resposta-da-setima-pergunta': resposta7,
    'resposta-da-oitava-pergunta': resposta8,
    'resposta-da-nona-pergunta': resposta9,
    'resposta-da-decima-pergunta': resposta10,
  };

  const { error } = await supabase
    .from('Respostas')
    .insert(payload)
    .setHeader('Cache-Control', 'no-store');

  if (error) {
    console.error('Erro ao inserir respostas:', error.message);
    return {
      status: 'erro',
      mensagem: 'Não foi possível enviar agora. Tente novamente.',
    };
  }

  revalidatePath('/');

  return {
    status: 'sucesso',
    mensagem: 'Respostas enviadas com sucesso. Obrigado por participar!',
  };
}

export async function obterContagemRespostas(): Promise<ContagemRespostas> {
  const supabase = await getSupabaseClient();

  try {
    const { data: linhas, error } = await supabase
      .from('Respostas')
      .select(
        'resposta-da-primeira-pergunta,resposta-da-segunda-pergunta,resposta-da-terceira-pergunta,resposta-da-quarta-pergunta,resposta-da-quinta-pergunta'
      )
      .setHeader('no-cache', 'no-store');

    if (error) {
      throw error;
    }

    const contagem: ContagemRespostas = { ...CONTAS_PADRAO };

    if (!linhas || linhas.length === 0) {
      return contagem;
    }

    const colunas = [
      'resposta-da-primeira-pergunta',
      'resposta-da-segunda-pergunta',
      'resposta-da-terceira-pergunta',
      'resposta-da-quarta-pergunta',
      'resposta-da-quinta-pergunta',
    ];

    linhas.forEach((linha: any) => {
      // Cria um contador de intenções local para o aluno da vez
      const contagemLocal: Record<string, number> = { dados: 0, ux: 0, dev: 0, seguranca: 0 };

      colunas.forEach((coluna) => {
        const area = normalizeArea(linha[coluna]);
        if (area) {
          contagemLocal[area]++;
        }
      });

      // Avalia qual das categorias teve a maior recorrência nas 5 respostas deste aluno
      let perfilVencedor: RespostaArea | null = null;
      let maiorVoto = -1;

      for (const perfil in contagemLocal) {
        if (contagemLocal[perfil] > maiorVoto) {
          maiorVoto = contagemLocal[perfil];
          perfilVencedor = perfil as RespostaArea;
        }
      }

      // Soma única e exclusivamente 1 ponto ao perfil que ganhou a preferência deste aluno
      if (perfilVencedor) {
        contagem[perfilVencedor]++;
      }
    });

    return contagem;
  } catch (error) {
    console.error('Erro ao processar contagem de respostas:', error);
    return { ...CONTAS_PADRAO };
  }
}

export async function obterDadosCruzadosBubble(): Promise<PontoBubble[]> {
  const supabase = await getSupabaseClient();

  try {
    const { data: linhas, error } = await supabase
      .from('Respostas')
      .select('resposta-da-sexta-pergunta,resposta-da-setima-pergunta,resposta-da-nona-pergunta,resposta-da-decima-pergunta')
      .setHeader('Cache-Control', 'no-store');

    if (error) {
      throw error;
    }

    if (!linhas || linhas.length === 0) {
      return [];
    }

    const frequenciaPontos: Record<string, number> = {};

    linhas.forEach((linha: any) => {
      const q6 = Number(linha['resposta-da-sexta-pergunta']);
      const q7 = Number(linha['resposta-da-setima-pergunta']);
      const q9 = Number(linha['resposta-da-nona-pergunta']);
      const q10 = Number(linha['resposta-da-decima-pergunta']);

      if (!Number.isFinite(q6) || !Number.isFinite(q7) || !Number.isFinite(q9) || !Number.isFinite(q10)) {
        return;
      }

      const eixoX = Math.round((q6 + q9 + q10) / 3);
      const eixoY = q7;

      const chaveCoordenada = `${eixoX}_${eixoY}`;
      frequenciaPontos[chaveCoordenada] = (frequenciaPontos[chaveCoordenada] || 0) + 1;
    });

    return Object.keys(frequenciaPontos).map((chave) => {
      const [x, y] = chave.split('_').map(Number);
      const quantidade = frequenciaPontos[chave];

      return {
        x,
        y,
        r: quantidade * 2, // Ajustado de 5 para 2: crescimento visual mais contido e realista
      };
    });

  } catch (error) {
    console.error('Erro ao buscar dados para o gráfico bubble:', error);
    return [];
  }
}
