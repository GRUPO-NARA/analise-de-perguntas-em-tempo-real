"use client"

import Image from 'next/image';

// Definindo a interface para receber o estado compartilhado da Home
interface HeaderProps {
  abaAtiva: 'formulario' | 'graficos' | 'informacoes';
  setAbaAtiva: (aba: 'formulario' | 'graficos' | 'informacoes') => void;
}

export default function HeaderComponent({ abaAtiva, setAbaAtiva }: HeaderProps) {
  const abas = [
    { id: 'formulario', nome: 'Formulário' },
    { id: 'graficos', nome: 'Gráficos' },
    { id: 'informacoes', nome: 'Informações' },
  ] as const;

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/80 bg-white/90 shadow-[0_8px_30px_-22px_rgba(30,64,175,0.6)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        
        {/* Container da Logo Minimalista */}
        <div className="flex items-center justify-center sm:justify-start">
          <div className="relative h-14 w-28 select-none transition-transform hover:scale-105 active:scale-95">
            <Image 
              src="/logo-NARA.png" 
              alt="Logo Oficial NARA"
              fill
              className="object-contain object-left" 
              priority 
            />
          </div>
        </div>

        <nav aria-label="Navegação principal">
          <ul className="grid grid-cols-3 gap-1 rounded-xl bg-blue-50 p-1 text-xs font-semibold sm:flex sm:text-sm">
            {abas.map((aba) => (
              <li key={aba.id}>
                <button
                  type="button"
                  onClick={() => setAbaAtiva(aba.id)}
                  className={`w-full rounded-lg px-3 py-2 transition-all sm:px-4 ${
                    abaAtiva === aba.id
                      ? 'bg-white text-blue-700 shadow-sm ring-1 ring-blue-100'
                      : 'text-slate-500 hover:bg-white/60 hover:text-blue-700'
                  }`}
                >
                  {aba.nome}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}