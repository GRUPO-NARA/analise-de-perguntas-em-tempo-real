'use client';

import { Bar } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { obterContagemRespostas } from '../actions';

// Registrar os componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

/**
 * Interface para tipificar os dados de contagem
 */
interface ContagemRespostas {
  dados: number;
  ux: number;
  dev: number;
  seguranca: number;
}

/**
 * Componente Principal: GraficosComponent
 * Exibe um gráfico horizontal com a contagem de respostas por categoria
 */
export default function GraficosComponent() {
  const [contagem, setContagem] = useState<ContagemRespostas>({
    dados: 0,
    ux: 0,
    dev: 0,
    seguranca: 0,
  });
  const [carregando, setCarregando] = useState(true);

  // Buscar dados do banco ao montar o componente
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
  }, []);

  // Preparar dados para o Chart.js
  const chartData = {
    labels: ['Dados', 'UX', 'Dev', 'Segurança'],
    datasets: [
      {
        label: 'Total de Respostas',
        data: [contagem.dados, contagem.ux, contagem.dev, contagem.seguranca],
        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'],
        borderWidth: 1,
        borderRadius: 6,
        barThickness: 40,
      },
    ],
  };

  // Opções do Chart.js com indexAxis 'y' para barras horizontais
  const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          font: {
            size: 12,
            family: 'system-ui, -apple-system, sans-serif',
          },
          padding: 16,
          color: '#6B7280',
        },
      },
      title: {
        display: true,
        text: 'Análise de Respostas por Categoria Profissional',
        font: {
          size: 14,
          weight: 'bold',
          family: 'system-ui, -apple-system, sans-serif',
        },
        color: '#1F2937',
        padding: {
          top: 12,
          bottom: 16,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        cornerRadius: 6,
        displayColors: true,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        callbacks: {
          label: function (context: any) {
            return `${context.raw} respostas`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          font: {
            size: 11,
          },
          color: '#9CA3AF',
        },
        grid: {
          color: 'rgba(209, 213, 219, 0.5)',
        },
      },
      y: {
        ticks: {
          font: {
            size: 12,
            weight: 500,
          },
          color: '#374151',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Carregando gráficos...</p>
        </div>
      </div>
    );
  }

  const total =
    contagem.dados + contagem.ux + contagem.dev + contagem.seguranca;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            📊 Análise de Respostas em Tempo Real
          </h1>
          <p className="text-gray-600">
            Visualização das respostas acumuladas por categoria profissional
          </p>
        </div>

        {/* Gráfico Principal */}
        <div className="mb-8">
          <div className="w-full h-[400px] bg-white rounded-xl shadow-sm p-6">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              📊 Dados
            </h3>
            <p className="text-3xl font-bold text-blue-600">{contagem.dados}</p>
            <p className="text-xs text-gray-500 mt-2">
              {total > 0
                ? `${((contagem.dados / total) * 100).toFixed(1)}% do total`
                : 'Nenhuma resposta'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              🎨 UX/Design
            </h3>
            <p className="text-3xl font-bold text-green-600">{contagem.ux}</p>
            <p className="text-xs text-gray-500 mt-2">
              {total > 0
                ? `${((contagem.ux / total) * 100).toFixed(1)}% do total`
                : 'Nenhuma resposta'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-amber-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              💻 Desenvolvimento
            </h3>
            <p className="text-3xl font-bold text-amber-600">{contagem.dev}</p>
            <p className="text-xs text-gray-500 mt-2">
              {total > 0
                ? `${((contagem.dev / total) * 100).toFixed(1)}% do total`
                : 'Nenhuma resposta'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-red-500">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              🔒 Segurança
            </h3>
            <p className="text-3xl font-bold text-red-600">
              {contagem.seguranca}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {total > 0
                ? `${((contagem.seguranca / total) * 100).toFixed(1)}% do total`
                : 'Nenhuma resposta'}
            </p>
          </div>
        </div>

        {/* Total de Respostas */}
        <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
          <p className="text-sm text-blue-900">
            📈 <strong>Total de Respostas:</strong> {total} usuários responderam
            o formulário
          </p>
        </div>
      </div>
    </div>
  );
}
