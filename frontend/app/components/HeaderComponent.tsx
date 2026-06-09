"use client"

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
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 text-sm font-black tracking-tight text-white shadow-lg shadow-blue-200">
            N
          </div>
          <div>
            <p className="text-base font-extrabold tracking-[0.18em] text-blue-950">NARA</p>
            <p className="hidden text-[10px] font-medium uppercase tracking-wider text-blue-500 sm:block">
              Análises em tempo real
            </p>
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
