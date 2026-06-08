"use client"

// Definindo a interface para receber o estado compartilhado da Home
interface HeaderProps {
  abaAtiva: 'formulario' | 'graficos' | 'informacoes';
  setAbaAtiva: (aba: 'formulario' | 'graficos' | 'informacoes') => void;
}

export default function HeaderComponent({ abaAtiva, setAbaAtiva }: HeaderProps) {
  return (
    <header className="flex justify-between items-center p-4 sm:p-5 bg-gray-500 text-white sticky top-0 z-50 shadow-md">
      {/* Bloco da Logo e Nome */}
      <div className="flex items-center gap-3">
        {/* Lembre-se de salvar a logo dentro da pasta /public com o nome "logo-Nara.png" */}
        <img src="logo-Nara.png" alt="Logo NARA" className="h-10 sm:h-12 object-contain" />
        <h1 className="text-lg sm:text-xl font-bold tracking-wider">NARA</h1>
      </div>
      
      {/* Menu de Navegação Interativo */}
      <nav>
        {/* Ajustado para ocultar no mobile e virar flexbox a partir de telas médias (md) */}
        <ul className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm sm:text-base">
          
          {/* Aba: Formulário */}
          <li 
            onClick={() => setAbaAtiva('formulario')}
            className={`cursor-pointer transition-colors pb-1 border-b-2 ${
              abaAtiva === 'formulario' 
                ? 'text-blue-300 border-blue-300 font-bold' 
                : 'border-transparent hover:text-gray-300'
            }`}
          >
            Formulário
          </li>

          {/* Aba: Gráficos */}
          <li 
            onClick={() => setAbaAtiva('graficos')}
            className={`cursor-pointer transition-colors pb-1 border-b-2 ${
              abaAtiva === 'graficos' 
                ? 'text-blue-300 border-blue-300 font-bold' 
                : 'border-transparent hover:text-gray-300'
            }`}
          >
            Gráficos
          </li>

          {/* Aba: Informações */}
          <li 
            onClick={() => setAbaAtiva('informacoes')}
            className={`cursor-pointer transition-colors pb-1 border-b-2 ${
              abaAtiva === 'informacoes' 
                ? 'text-blue-300 border-blue-300 font-bold' 
                : 'border-transparent hover:text-gray-300'
            }`}
          >
            Informações
          </li>

        </ul>   
      </nav>
    </header>
  )
}