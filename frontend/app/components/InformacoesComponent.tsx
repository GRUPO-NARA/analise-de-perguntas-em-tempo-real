'use client';

import Image from 'next/image';

export default function InformacoesComponent() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 my-8">
      {/* CARD PRINCIPAL */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8 md:p-10 flex flex-col lg:flex-row gap-8 items-center">
        
        {/* COLUNA DA ESQUERDA: Textos institucionais */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            📈​ Conheça o Grupo
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            NARA
          </h2>
          <p className="text-sm sm:text-base font-semibold text-blue-600 -mt-2">
            Núcleo de Análises e Recursos Analíticos
          </p>
          
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed pt-2">
            O <strong>NARA</strong> é um grupo de pesquisa e desenvolvimento focado em engenharia de dados, infraestrutura backend e soluções analíticas aplicadas. Nosso objetivo é transformar dados brutos em inteligência visual e insights acionáveis em tempo real, fornecendo suporte tecnológico para tomadas de decisão e mapeamentos estruturais.
          </p>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            Desenvolvemos desde pipelines de extração de dados (ETL) e dashboards preditivos robustos até arquiteturas escaláveis em containers de microsserviços para sistemas governamentais e educacionais.
          </p>
        </div>

        {/* COLUNA DA DIREITA: Foto do Grupo NARA */}
        <div className="w-full lg:w-[45%] flex flex-col items-center justify-center">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 group">
            {/* SUBSTITUA O COMPORTAMENTO/CAMINHO DA IMAGEM ABAIXO PELA FOTO REAL DO SEU GRUPO */}
            <Image
              src="/grupo-nara.jpeg" // Coloque a imagem na pasta /public com este nome
              alt="Equipe do Núcleo de Análises e Recursos Analíticos - NARA"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-w-768px) 100vw, 45vw"
              priority
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 italic text-center">
            Equipe NARA - Laboratório de Engenharia Aplicada
          </p>
        </div>

      </div>

      {/* SEÇÃO INFERIOR: Projetos e Links Úteis */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* CARD: Projetos em Destaque */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">🚀 Nossos Projetos</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Atuamos na vanguarda do desenvolvimento de software e análise de dados. Entre as nossas principais iniciativas destacam-se o <strong>Mapa Social do Maranhão</strong>, uma plataforma em Java Spring Boot voltada para infraestrutura governamental, e ecossistemas analíticos integrados ao Supabase e Inteligência Artificial.
            </p>
          </div>
          <div className="border-t pt-3 mt-4 text-xs text-gray-400 font-medium">
            Engenharia Aplicada & Desenvolvimento Backend
          </div>
        </div>

        {/* CARD: Links e Portfólio */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">🔗 Links e Recursos Úteis</h3>
            <div className="flex flex-col gap-2.5">
              
              <a 
                href="https://github.com/GRUPO-NARA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all group"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Repositório NARA no GitHub</span>
                <span className="text-xs bg-white text-gray-500 px-2.5 py-1 rounded-md border group-hover:text-blue-600">Acessar ↗</span>
              </a>

              <a 
                href="https://github.com/GRUPO-NARA/mapa-social-do-maranhao" // Adicione aqui o link para o portfólio Streamlit se necessário
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-300 rounded-xl transition-all group"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Repositório Mapa Social no GitHub</span>
                <span className="text-xs bg-white text-gray-500 px-2.5 py-1 rounded-md border group-hover:text-blue-600">Visualizar ↗</span>
              </a>

            </div>
          </div>
          <div className="text-xs text-gray-400 italic text-center md:text-right mt-4">
            Módulo NARA • Soluções em Dados
          </div>
        </div>

      </div>
    </section>
  );
}