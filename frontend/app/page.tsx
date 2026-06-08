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
    <>
      {/* Passando o estado e a função de mudança para o Header se atualizar visualmente */}
      <HeaderComponent abaAtiva={abaAtiva} setAbaAtiva={setAbaAtiva} />
      
      <main className="flex flex-col items-center justify-center p-4 md:p-12 bg-[#e6e6e6] w-full min-h-[20vh]">
        <div className="flex flex-col items-center gap-2 p-5 border border-gray-400 rounded-2xl bg-white max-w-xl w-full text-center shadow-sm">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            Análise de Perguntas em Tempo Real
          </h1>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wider">
            NARA • Núcleo de Análises e Recursos Analíticos
          </p>
        </div>
      </main>

      {/* RENDERIZAÇÃO CONDICIONAL: Só mostra na tela o componente da aba selecionada */}
      <div className="w-full bg-[#e6e6e6] pb-12">
        {abaAtiva === 'formulario' && <FormularioComponent />}
        {abaAtiva === 'graficos' && <GraficosComponent />}
        {abaAtiva === 'informacoes' && <InformacoesComponent />}
      </div>
    </>
  ) 
}