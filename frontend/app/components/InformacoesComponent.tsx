'use client';

import Image from 'next/image';

export default function InformacoesComponent() {
  return (
    <section className="mx-auto my-6 w-full max-w-7xl px-4 sm:px-6">
      {/* CARD PRINCIPAL */}
      <div className="flex flex-col items-center gap-8 rounded-[2rem] border border-blue-100 bg-white/90 p-6 shadow-[0_24px_70px_-45px_rgba(30,64,175,0.7)] backdrop-blur sm:p-8 md:p-10 lg:flex-row">
        
        {/* COLUNA DA ESQUERDA: Textos institucionais */}
        <div className="flex-1 space-y-4 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
            Conheça o grupo
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#ffa928] sm:text-4xl">
            NARA
          </h2>
          <p className="-mt-2 text-sm font-semibold text-gray-800 sm:text-base">
            Núcleo de Análise e Recursos Analíticos
          </p>
          
          <p className="pt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
            O <strong>NARA</strong> é um grupo de pesquisa e desenvolvimento focado em engenharia de dados, infraestrutura backend e soluções analíticas aplicadas. Nosso objetivo é transformar dados brutos em inteligência visual e insights acionáveis em tempo real, fornecendo suporte tecnológico para tomadas de decisão e mapeamentos estruturais.
          </p>

          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Desenvolvemos desde pipelines de extração de dados (ETL) e dashboards preditivos robustos até arquiteturas escaláveis em containers de microsserviços para sistemas governamentais e educacionais.
          </p>
        </div>

        {/* COLUNA DA DIREITA: Foto do Grupo NARA */}
        <div className="w-full lg:w-[45%] flex flex-col items-center justify-center">
          <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-4 border-white bg-blue-50 shadow-xl shadow-blue-100">
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
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* CARD: Projetos em Destaque */}
        <div className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-[0_18px_50px_-38px_rgba(30,64,175,0.8)]">
          <div>
            <h3 className="mb-2 text-lg font-bold text-blue-950">Nossos Projetos</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Atuamos no desenvolvimento de software e análise de dados. Entre as nossas principais iniciativas destacam-se o <strong>Mapa Social do Maranhão</strong>, uma plataforma em Java Spring Boot voltada para infraestrutura governamental, e ecossistemas analíticos integrados ao Supabase e Aprendizado de Máquina.
            </p>
          </div>
          <div className="border-t pt-3 mt-4 text-xs text-gray-400 font-medium">
            Engenharia Aplicada & Desenvolvimento Backend
          </div>
        </div>

        {/* CARD: Links e Portfólio */}
        <div className="flex flex-col justify-between rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-[0_18px_50px_-38px_rgba(30,64,175,0.8)]">
          <div>
            <h3 className="mb-3 text-lg font-bold text-blue-950">Links e Recursos Úteis</h3>
            <div className="flex flex-col gap-2.5">
              
              <a 
                href="https://github.com/GRUPO-NARA" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 p-3 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Repositório NARA no GitHub</span>
                <span className="text-xs bg-white text-gray-500 px-2.5 py-1 rounded-md border group-hover:text-blue-600">Acessar ↗</span>
              </a>

              <a 
                href="https://www.instagram.com/lab.synapse/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/60 p-3 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:bg-blue-50"
              >
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600">Nos acompanhe no Instagram</span>
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
