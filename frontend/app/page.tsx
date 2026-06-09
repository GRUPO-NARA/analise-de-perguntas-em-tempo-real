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
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-gradient-to-br from-white via-blue-50 to-blue-100/70 px-6 py-10 text-center shadow-[0_24px_70px_-40px_rgba(30,64,175,0.65)] sm:px-10 sm:py-14">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-sky-200/30 blur-3xl" />
          <span className="relative inline-flex rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-blue-600">
            Pesquisa interativa
          </span>
          <h1 className="relative mx-auto mt-4 max-w-3xl text-3xl font-black tracking-tight text-blue-950 sm:text-4xl md:text-5xl">
            Análise de Perguntas em Tempo Real
          </h1>
          <p className="relative mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Responda ao questionário e acompanhe os resultados coletivos ganhando forma ao vivo.
          </p>
          <p className="relative mt-5 text-xs font-bold uppercase tracking-[0.16em] text-blue-500">
            NARA • Núcleo de Análises e Recursos Analíticos
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
