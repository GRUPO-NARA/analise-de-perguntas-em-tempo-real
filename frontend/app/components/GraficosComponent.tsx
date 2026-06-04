'use client';

import { Bar, Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { obterContagemRespostas } from '../actions';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

interface ContagemRespostas {
  dados: number;
  ux: number;
  dev: number;
  seguranca: number;
}

export default function GraficosComponent() {
  const [contagem, setContagem] = useState<ContagemRespostas>({
    dados: 0,
    ux: 0,
    dev: 0,
    seguranca: 0,
  });
  const [carregando, setCarregando] = useState(true);
  
  // Estado alterado para saber QUAL gráfico expandir: null, 'pizza' ou 'barras'
  const [graficoExpandido, setGraficoExpandido] = useState<'pizza' | 'barras' | null>(null);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await obterContagemRespostas();
        setContagem(dados);
      } catch (error) {
        console.error('Erro ao carregar contagem:', error);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();

    const intervalo = setInterval(() => {
      carregarDados();
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const total = contagem.dados + contagem.ux + contagem.dev + contagem.seguranca;

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
    maintainAspectRatio: false,
    onClick: () => {
      setGraficoExpandido('pizza');
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          boxWidth: 12,
          padding: 10,
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

  // Opções da pizza expandida (Legendas maiores para leitura à distância)
  const bigPizzaOptions: ChartOptions<'doughnut'> = {
    ...pizzaOptions,
    onClick: undefined,
    plugins: {
      ...pizzaOptions.plugins,
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          boxWidth: 20,
          padding: 20,
          font: { size: 16, weight: 600 },
          color: '#1F2937',
        },
      },
    },
  };

  const chartData = {
    labels: ['Dados', 'UX', 'Dev', 'Segurança'],
    datasets: [
      {
        label: 'Respostas',
        data: [contagem.dados, contagem.ux, contagem.dev, contagem.seguranca],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 0,
        borderRadius: 6,
        maxBarThickness: 32,
      },
    ],
  };

  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    onClick: () => {
      setGraficoExpandido('barras');
    },
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { beginAtZero: true, ticks: { color: '#9CA3AF' } },
      y: { grid: { display: false }, ticks: { color: '#374151', font: { weight: 500 } } },
    },
  };

  const bigBarOptions: ChartOptions<'bar'> = {
    ...chartOptions,
    onClick: undefined,
    scales: {
      x: { beginAtZero: true, ticks: { color: '#9CA3AF', font: { size: 16 } } },
      y: { grid: { display: false }, ticks: { color: '#374151', font: { weight: 600, size: 18 } } },
    },
  };

  if (carregando) {
    return (
      <div className="w-full h-[350px] flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        <p className="mt-3 text-sm text-gray-500">Buscando métricas no Supabase...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-5 my-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* CARD DA ESQUERDA (Pizza): Agora também é clicável e interativo */}
        <div 
          onClick={() => setGraficoExpandido('pizza')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-[350px] flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Perfil Predominante</h3>
              <p className="text-xs text-gray-400">Distribuição percentual das áreas</p>
            </div>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">Ampliar 🔍</span>
          </div>
          <div className="flex-1 h-[200px] my-2">
            {total > 0 ? (
              <Doughnut data={pizzaData} options={pizzaOptions} />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs bg-gray-50 rounded-xl">
                Nenhum voto registrado ainda
              </div>
            )}
          </div>
          <div className="text-center text-xs text-gray-500 border-t pt-2">
            Total acumulado: <span className="font-bold text-blue-600">{total}</span> alunos
          </div>
        </div>

        {/* CARD DO CENTRO (Barras) */}
        <div 
          onClick={() => setGraficoExpandido('barras')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-[350px] flex flex-col justify-between cursor-pointer hover:shadow-md hover:border-gray-300 transition-all group"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-bold text-gray-800 group-hover:text-blue-600 transition-colors">Respostas por Categoria</h3>
              <p className="text-xs text-gray-400">Volume absoluto de votos por área</p>
            </div>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">Ampliar 🔍</span>
          </div>
          <div className="flex-1 h-[200px] my-2">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs text-green-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Atualizando em tempo real
          </div>
        </div>

        {/* CARD DA DIREITA (Bubble) */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm h-[350px] flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-gray-800">Cruzamento Numérico</h3>
            <p className="text-xs text-gray-400">Análise de dispersão das perguntas numéricas</p>
          </div>
          <div className="flex-1 bg-gray-50 rounded-xl my-2 flex items-center justify-center text-gray-400 text-xs">
            <span>[Gráfico Bubble]</span>
          </div>
          <div className="text-center text-xs text-gray-400 italic">
            Módulo Analítico NARA
          </div>
        </div>

      </div>

      {/* MODAL DE AMPLIAÇÃO DINÂMICO */}
      {graficoExpandido !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 md:p-10" style={{ zIndex: 9999 }}>
          <div className="bg-white w-full max-w-5xl h-[80vh] rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col justify-between">
            
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {graficoExpandido === 'pizza' ? 'Perfil Predominante' : 'Respostas por Categoria'}
                </h2>
                <p className="text-sm text-gray-500">Visualização expandida em tempo real</p>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setGraficoExpandido(null);
                }}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Fechar ✕
              </button>
            </div>

            <div className="flex-1 my-6 min-h-0 flex items-center justify-center">
              {graficoExpandido === 'pizza' ? (
                <Doughnut data={pizzaData} options={bigPizzaOptions} />
              ) : (
                <Bar data={chartData} options={bigBarOptions} />
              )}
            </div>

            <div className="flex justify-between items-center text-sm border-t pt-4 text-gray-500">
              <div>Total acumulado: <span className="font-bold text-blue-600 text-lg">{total}</span> alunos</div>
              <div className="flex items-center gap-1.5 text-green-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                Modo de Exibição Ativo
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}