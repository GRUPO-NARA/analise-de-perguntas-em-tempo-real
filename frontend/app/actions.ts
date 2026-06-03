'use server';

import { createClient } from '@supabase/supabase-js';

// Tipo para os dados de respostas
interface DadosRespostas {
  A: number;
  B: number;
  C: number;
  D: number;
}

/**
 * Server Action para buscar a contagem de respostas do Supabase
 * Agrupa e conta as respostas por alternativa (A, B, C, D)
 * 
 * @param {string} perguntaId - ID da pergunta no banco de dados
 * @returns {Promise<DadosRespostas>} Objeto com contagem de respostas por alternativa
 * 
 * @example
 * const dados = await obterRespostasAgrupadas('123');
 * // Retorna: { A: 150, B: 200, C: 120, D: 180 }
 */
export async function obterRespostasAgrupadas(
  perguntaId: string
): Promise<DadosRespostas> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Variáveis de ambiente do Supabase não configuradas');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Buscar todas as respostas para a pergunta especificada
    const { data, error } = await supabase
      .from('respostas') // Ajuste o nome da tabela conforme seu schema
      .select('alternativa')
      .eq('pergunta_id', perguntaId);

    if (error) {
      throw new Error(`Erro ao buscar respostas: ${error.message}`);
    }

    // Inicializar contadores
    const resultado: DadosRespostas = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
    };

    // Contar respostas por alternativa
    if (data) {
      data.forEach((row) => {
        const alternativa = row.alternativa?.toUpperCase() as 'A' | 'B' | 'C' | 'D' | undefined;
        if (alternativa && (alternativa === 'A' || alternativa === 'B' || alternativa === 'C' || alternativa === 'D')) {
          resultado[alternativa]++;
        }
      });
    }

    return resultado;
  } catch (error) {
    console.error('Erro ao processar respostas:', error);
    // Retornar dados vazios em caso de erro
    return { A: 0, B: 0, C: 0, D: 0 };
  }
}

/**
 * Server Action para obter respostas agrupadas de múltiplas perguntas
 * Útil para dashboards com vários gráficos
 * 
 * @param {string[]} perguntaIds - Array com IDs das perguntas
 * @returns {Promise<Record<string, DadosRespostas>>} Objeto com dados por pergunta
 */
export async function obterRespostasMultiplas(
  perguntaIds: string[]
): Promise<Record<string, DadosRespostas>> {
  const resultado: Record<string, DadosRespostas> = {};

  for (const id of perguntaIds) {
    resultado[id] = await obterRespostasAgrupadas(id);
  }

  return resultado;
}

/**
 * Server Action para obter a contagem total de respostas por categoria
 * Conta quantas vezes cada categoria (dados, ux, dev, seguranca) foi selecionada
 * 
 * @returns {Promise<{dados: number, ux: number, dev: number, seguranca: number}>}
 */
export async function obterContagemRespostas() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { dados: 0, ux: 0, dev: 0, seguranca: 0 };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Buscar todas as respostas da tabela
    const { data, error } = await supabase.from('Respostas').select('*');

    if (error) {
      console.error('Erro ao buscar respostas:', error);
      return { dados: 0, ux: 0, dev: 0, seguranca: 0 };
    }

    // Inicializar contadores
    const contadores = {
      dados: 0,
      ux: 0,
      dev: 0,
      seguranca: 0,
    };

    // Contar respostas por categoria
    if (data && Array.isArray(data)) {
      data.forEach((row: any) => {
        // Colunas de respostas conforme o schema real
        const respostas = [
          row.resposta_da_primeira_pergunta,
          row.resposta_da_segunda_pergunta,
          row.resposta_da_terceira_pergunta,
          row.resposta_da_quarta_pergunta,
          row.resposta_da_quinta_pergunta,
        ];

        // Contar cada resposta
        respostas.forEach((valor) => {
          if (valor && (valor === 'dados' || valor === 'ux' || valor === 'dev' || valor === 'seguranca')) {
            contadores[valor as keyof typeof contadores]++;
          }
        });
      });
    }

    return contadores;
  } catch (error) {
    console.error('Erro ao contar respostas:', error);
    return { dados: 0, ux: 0, dev: 0, seguranca: 0 };
  }
}

/**
 * Server Action para enviar e salvar as respostas do formulário no Supabase
 * 
 * @param {FormData} formData - Dados do formulário com as respostas
 * @returns {Promise<{sucesso: boolean, mensagem: string}>} Resultado da operação
 */
export async function enviarRespostasDoFormulario(formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      sucesso: false,
      mensagem: 'Variáveis de ambiente do Supabase não configuradas',
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Extrair respostas do formulário
    const pergunta1 = formData.get('pergunta1')?.toString() || '';
    const pergunta2 = formData.get('pergunta2')?.toString() || '';
    const pergunta3 = formData.get('pergunta3')?.toString() || '';
    const pergunta4 = formData.get('pergunta4')?.toString() || '';
    const pergunta5 = formData.get('pergunta5')?.toString() || '';

    // Validar que todas as perguntas foram respondidas
    if (!pergunta1 || !pergunta2 || !pergunta3 || !pergunta4 || !pergunta5) {
      return {
        sucesso: false,
        mensagem: 'Todas as perguntas devem ser respondidas',
      };
    }

    // Preparar dados para inserção (uma única linha com todas as respostas)
    const dadosParaInserir = {
      resposta_da_primeira_pergunta: pergunta1,
      resposta_da_segunda_pergunta: pergunta2,
      resposta_da_terceira_pergunta: pergunta3,
      resposta_da_quarta_pergunta: pergunta4,
      resposta_da_quinta_pergunta: pergunta5,
    };

    // Inserir respostas no Supabase
    const { error } = await supabase.from('Respostas').insert([dadosParaInserir]);

    if (error) {
      console.error('Erro ao salvar respostas:', error);
      return {
        sucesso: false,
        mensagem: `Erro ao salvar respostas: ${error.message}`,
      };
    }

    return {
      sucesso: true,
      mensagem: 'Respostas enviadas com sucesso!',
    };
  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    return {
      sucesso: false,
      mensagem: 'Erro ao processar o formulário',
    };
  }
}
