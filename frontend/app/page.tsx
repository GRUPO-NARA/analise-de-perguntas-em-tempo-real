"use client"

import { useState } from "react"
import FormularioComponent from "./components/FormularioComponent"
import HeaderComponent from "./components/HeaderComponent"
import GraficosComponent from "./components/GraficosComponent"
import InformacoesComponent from "./components/InformacoesComponent" // Importando o novo componente

// Definindo os tipos válidos de abas no TypeScript
type AbaTipo = 'formulario' | 'graficos' | 'informacoes';

export default function Home() {
  // Estado que gerencia qual tela está visível. Começa no formulário por padrão.
  const [abaAtiva, setAbaAtiva] = useState<AbaTipo>('formulario');

  return (
    <div className="min-h-screen">
      <HeaderComponent abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
      
      <main className="mx-auto w-full max-w-7xl px-4 pb-5 pt-8 sm:px-6 sm:pt-12">
        <div className="relative overflow-hidden rounded-3xl bg-white border border-blue-100 px-6 py-10 text-center sm:px-10 sm:py-14 md:bg-[url('/logo.png')] bg-no-repeat bg-[length:200px] bg-[position:calc(100%_-_1rem)_calc(100%_-_1rem)]">
          <p className="relative text-xs font-bold uppercase tracking-[0.16em] text-sky-800 sm:text-sm">
            Pesquisa interativa
          </p>
          <h1 className="relative mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight text-gray-800 sm:text-4xl md:text-5xl">
            Análise de Perguntas em Tempo Real
          </h1>
          <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Responda ao questionário e acompanhe os resultados coletivos ganhando forma ao vivo.
          </p>
          <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#ffa928] sm:mt-6 sm:text-sm">
            NARA • Núcleo de Análise e Recursos Analíticos
          </p>
        </div>
      </main>

      <div className="w-full pb-12">
        {abaAtiva === 'formulario' && <FormularioComponent />}
        {abaAtiva === 'graficos' && <GraficosComponent />}
        {abaAtiva === 'informacoes' && <InformacoesComponent />}
      </div>
    </div>
  ) 
}
