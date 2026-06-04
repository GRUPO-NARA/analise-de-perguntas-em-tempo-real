
"use client"

import FormularioComponent from "./components/FormularioComponent"
import HeaderComponent from "./components/HeaderComponent"
import GraficosComponent from "./components/GraficosComponent"


export default function Home() {
  return (
    <>
    <HeaderComponent />
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[#e6e6e6] w-full">
        <div className="flex flex-col items-center gap-3 p-5 border border-gray-400 rounded-2xl ">
            <h1 className="text-4xl font-bold">Análise de Perguntas em Tempo Real</h1>
            <p className="text-xl font-semibold text-gray-600">projeto prático de análise de dados</p>
        </div>
    </main>
    <FormularioComponent />
    <GraficosComponent />
    </>
  ) 
}