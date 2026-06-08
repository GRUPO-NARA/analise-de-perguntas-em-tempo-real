'use client';

import { useEffect, useState } from 'react';
import { Bar, Doughnut, Bubble } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { obterContagemRespostas, obterDadosCruzadosBubble } from '../actions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

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

export default function GraficosComponent() {
  const [contagem, setContagem] = useState<ContagemRespostas>({ dados: 0, ux: 0, dev: 0, seguranca: 0 });
  const [dadosBubble, setDadosBubble] = useState<PontoBubble[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [graficoExpandido, setGraficoExpandido] = useState<'pizza' | 'barras' | 'bubble' | null>(null);

  useEffect(() => {
    let ativo = true;
    let timeoutId: NodeJS.Timeout;

    async function carregarDados() {
      try {
        const [dadosContagem, dadosCruzados] = await Promise.all([
          obterContagemRespostas(),
          obterDadosCruzadosBubble()
        ]);

        if (ativo) {
          setContagem(dadosContagem);
          setDadosBubble(dadosCruzados);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do painel:', error);
      } finally {
        if (ativo) {
          timeoutId = setTimeout(carregarDados, 8000);
        }
        setCarregando(false);
      }
    }

    carregarDados();

    return () => {
      ativo = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const total = contagem.dados + contagem.ux + contagem.dev + contagem.seguranca;

  // ==========================================
  // CONFIGURAÇÕES DE DADOS E OPÇÕES - DOUGHNUT (PIZZA)
  // ==========================================
  const pizzaData = {
    labels: ['Dados', 'UX', 'Dev', 'Segurança'],
    datasets: [
      {
        data: [contagem.dados, contagem.ux, contagem.dev, contagem.seguranca],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    ],
  };

  const pizzaOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false, // CRUCIAL para esticar no mobile
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          boxWidth: 10,
          padding: 8,
          font: { size: 11, weight: 500 },
          color: '#4B5563',
        },
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const valor = context.raw || 0;
            const porcentagem = total > 0 ? ((valor / total) * 100).toFixed(1) : 0;
            return ` ${context.label}: ${valor} (${porcentagem}%)`;
          },
        },
      },
    },
  };

  const bigPizzaOptions: ChartOptions<'doughnut'> = {
    ...pizzaOptions,
    plugins: {
      ...pizzaOptions.plugins,
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: { boxWidth: 20, padding: 20, font: { size: 16, weight: 600 }, color: '#1F2937' },
      },
    },
  };

  // ==========================================
  // CONFIGURAÇÕES DE DADOS E OPÇÕES - BARRAS
  // ==========================================
  const chartData = {
    labels: ['Dados', 'UX', 'Dev', 'Segurança'],
    datasets: [
      {
        label: 'Respostas',
        data: [contagem.dados, contagem.ux, contagem.dev, contagem.seguranca],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
        borderRadius: 6,
        maxBarThickness: 28,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { beginAtZero: true, ticks: { color: '#9CA3AF', font: { size: 10 } } },
      y: { grid: { display: false }, ticks: { color: '#374151', font: { weight: 500, size: 11 } } },
    },
  };

  const bigBarOptions: ChartOptions<'bar'> = {
    ...chartOptions,
    scales: {
      x: { beginAtZero: true, ticks: { color: '#9CA3AF', font: { size: 14 } } },
      y: { grid: { display: false }, ticks: { color: '#374151', font: { weight: 600, size: 16 } } },
    },
  };

  // ==========================================
  // CONFIGURAÇÕES DE DADOS E OPÇÕES - BUBBLE
  // ==========================================
  const bubbleData = {
    datasets: [
      {
        label: 'Alunos Analisados',
        data: dadosBubble,
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
    ],
  };

  const bubbleOptions: ChartOptions<'bubble'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: {
        min: 0,
        max: 6,
        ticks: { stepSize: 1, color: '#9CA3AF', font: { size: 10 } },
        title: { display: true, text: 'Instinto Analítico', color: '#4B5563', font: { weight: 'bold', size: 11 } }
      },
      y: {
        min: 0,
        max: 6,
        ticks: { stepSize: 1, color: '#9CA3AF', font: { size: 10 } },
        title: { display: true, text: 'Interesse no Curso', color: '#4B5563', font: { weight: 'bold', size: 11 } }
      },
    },
  };

  const bigBubbleOptions: ChartOptions<'bubble'> = {
    ...bubbleOptions,
    scales: {
      x: {
        min: 0,
        max: 6,
        ticks: { stepSize: 1, color: '#4B5563', font: { size: 13 } },
        title: { display: true, text: 'Instinto Analítico (Média de Investigação)', color: '#1F2937', font: { size: 15, weight: 'bold' } }
      },
      y: {
        min: 0,
        max: 6,
        ticks: { stepSize: 1, color: '#4B5563', font: { size: 13 } },
        title: { display: true, text: 'Interesse em Engenharia da Computação', color: '#1F2937', font: { size: 15, weight: 'bold' } }
      },
    },
  };

  if (carregando) {
    return (
      <div className="w-full h-[280px] sm:h-[350px] flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm mx-auto my-4 max-w-7xl">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="mt-3 text-sm text-gray-500">Buscando métricas ao vivo...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-4">
      {/* GRID RESPONSIVO: 1 coluna no mobile, 3 colunas em telas grandes (lg) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* CARD 1: Pizza */}
        <div 
          onClick={() => setGraficoExpandido('pizza')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm h-[320px] sm:h-[350px] flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Perfil Predominante</h3>
              <p className="text-[11px] text-gray-400">Distribuição percentual das áreas</p>
            </div>
            <span className="text-[9px] sm:text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">Ampliar 🔍</span>
          </div>
          {/* DIV Pai com altura controlada e relativa para o Chart.js obedecer */}
          <div className="flex-1 h-[180px] sm:h-[200px] relative my-2 flex items-center justify-center">
            {total > 0 ? (
              <Doughnut data={pizzaData} options={pizzaOptions} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-50 rounded-xl">
                Nenhum voto registrado ainda
              </div>
            )}
          </div>
          <div className="text-center text-[11px] sm:text-xs text-gray-500 border-t pt-2">
            Total acumulado: <span className="font-bold text-blue-600">{total}</span> alunos
          </div>
        </div>

        {/* CARD 2: Barras */}
        <div 
          onClick={() => setGraficoExpandido('barras')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm h-[320px] sm:h-[350px] flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Respostas por Categoria</h3>
              <p className="text-[11px] text-gray-400">Volume absoluto de votos por área</p>
            </div>
            <span className="text-[9px] sm:text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">Ampliar 🔍</span>
          </div>
          <div className="flex-1 h-[180px] sm:h-[200px] relative my-2">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-green-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Atualizando em tempo real
          </div>
        </div>

        {/* CARD 3: Bubble */}
        <div 
          onClick={() => setGraficoExpandido('bubble')}
          className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-sm h-[320px] sm:h-[350px] flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Cruzamento Numérico</h3>
              <p className="text-[11px] text-gray-400">Análise de dispersão das perguntas de escala</p>
            </div>
            <span className="text-[9px] sm:text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">Ampliar 🔍</span>
          </div>
          <div className="flex-1 h-[180px] sm:h-[200px] relative my-2">
            {dadosBubble.length > 0 ? (
              <Bubble data={bubbleData} options={bubbleOptions} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-50 rounded-xl">
                Aguardando cruzamento de dados...
              </div>
            )}
          </div>
          <div className="text-center text-[11px] sm:text-xs text-gray-400 italic border-t pt-2">
            Módulo Analítico NARA
          </div>
        </div>

      </div>

      {/* MODAL DE AMPLIAÇÃO DINÂMICO - Fica em tela cheia no Mobile e Desktop */}
      {graficoExpandido !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-3 sm:p-6 md:p-10" style={{ zIndex: 9999 }}>
          <div className="bg-white w-full max-w-5xl h-[85vh] sm:h-[80vh] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between">
            
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                  {graficoExpandido === 'pizza' && 'Perfil Predominante'}
                  {graficoExpandido === 'barras' && 'Respostas por Categoria'}
                  {graficoExpandido === 'bubble' && 'Análise de Dispersão Geral'}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">Visualização expandida ao vivo</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setGraficoExpandido(null);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl transition-colors"
              >
                Fechar ✕
              </button>
            </div>

            {/* DIV de Canvas do Modal altamente flexível e com posição relativa */}
            <div className="flex-1 my-4 sm:my-6 min-h-0 relative flex items-center justify-center w-full">
              {graficoExpandido === 'pizza' && <Doughnut data={pizzaData} options={bigPizzaOptions} />}
              {graficoExpandido === 'barras' && <Bar data={chartData} options={bigBarOptions} />}
              {graficoExpandido === 'bubble' && <Bubble data={bubbleData} options={bigBubbleOptions} />}
            </div>

            <div className="flex justify-between items-center text-xs sm:text-sm border-t pt-3 text-gray-500">
              <div>Total acumulado: <span className="font-bold text-blue-600 text-sm sm:text-lg">{total}</span> alunos</div>
              <div className="flex items-center gap-1.5 text-green-600 font-medium">
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                Modo Display Ativo
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}