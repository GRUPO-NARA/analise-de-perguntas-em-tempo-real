'use client';

import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import {
    enviarRespostasDoFormulario,
    verificarSeJaRespondeu,
    type EstadoEnvioFormulario,
} from '../actions'

const estadoInicial: EstadoEnvioFormulario = {
    status: 'idle',
    mensagem: '',
};

function BotaoEnviar() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="mt-3 w-full self-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-10 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-200 disabled:cursor-not-allowed disabled:from-slate-400 disabled:to-slate-400 disabled:shadow-none md:w-auto"
        >
            {pending ? 'Enviando...' : 'Enviar Respostas'}
        </button>
    );
}

export default function FormularioComponent(){
    const [estado, formAction] = useActionState(enviarRespostasDoFormulario, estadoInicial);
    const [jaRespondeu, setJaRespondeu] = useState(false);

    useEffect(() => {
        verificarSeJaRespondeu().then(setJaRespondeu);
    }, []);

    const envioBloqueado =
        jaRespondeu || estado.status === 'sucesso' || estado.status === 'ja-enviado';

    return (
       <section className="mx-auto my-4 flex w-[calc(100%-2rem)] max-w-4xl flex-col items-center gap-6 rounded-[2rem] border border-blue-100 bg-white/90 p-4 shadow-[0_24px_70px_-45px_rgba(30,64,175,0.7)] backdrop-blur sm:p-7">
        <div className="w-full text-center">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-blue-500">Sua participação</span>
            <h2 className="mt-1 text-2xl font-black text-blue-950 sm:text-3xl">Formulário</h2>
            <p className="mt-2 text-sm text-slate-500">Escolha a alternativa que mais combina com você.</p>
        </div>
        {envioBloqueado ? (
            <div className="w-full max-w-xl rounded-xl border border-green-300 bg-green-50 p-5 text-center text-green-800">
                <p className="font-semibold">
                    {estado.mensagem || 'Este dispositivo já enviou uma resposta.'}
                </p>
                <p className="mt-1 text-sm">É permitido apenas um envio por participante.</p>
            </div>
        ) : (
        <form className="questionnaire flex w-full flex-col gap-4 sm:gap-5" action={formAction}>
            
            {/* Pergunta 1 */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-1" className="text-base font-semibold text-gray-800">
                    1. Se você ganhasse um quebra-cabeça de 5.000 peças muito complexo, o que faria primeiro?
                </label>
                <div className="text-sm text-gray-600 flex flex-col gap-1.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p><strong>A)</strong> Separaria as peças por cores e bordas para achar um padrão lógico.</p>
                    <p><strong>B)</strong> Começaria pelas partes mais bonitas ou pelo que chama mais atenção visualmente.</p>
                    <p><strong>C)</strong> Olharia o manual e montaria peça por peça de forma sistemática.</p>
                    <p><strong>D)</strong> Procuraria peças faltando, defeitos ou formas de burlar o encaixe tradicional.</p>
                </div>
                <select name="pergunta1" id="pergunta-1" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione a sua alternativa</option>
                    <option value="dados">Alternativa A</option>
                    <option value="ux">Alternativa B</option>
                    <option value="dev">Alternativa C</option>
                    <option value="seguranca">Alternativa D</option>
                </select>
            </div>

            {/* Pergunta 2 */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-2" className="text-base font-semibold text-gray-800">
                    2. Quando você usa um aplicativo novo no celular, o que mais te chama atenção?
                </label>
                <div className="text-sm text-gray-600 flex flex-col gap-1.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p><strong>A)</strong> O algoritmo e como ele adivinha rápido o que eu gosto.</p>
                    <p><strong>B)</strong> O visual, as cores, as animações e a facilidade de encontrar os botões.</p>
                    <p><strong>C)</strong> A velocidade, o carregamento rápido e o funcionamento sem erros.</p>
                    <p><strong>D)</strong> A privacidade, as permissões pedidas e a segurança dos dados.</p>
                </div>
                <select name="pergunta2" id="pergunta-2" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione a sua alternativa</option>
                    <option value="dados">Alternativa A</option>
                    <option value="ux">Alternativa B</option>
                    <option value="dev">Alternativa C</option>
                    <option value="seguranca">Alternativa D</option>
                </select>
            </div>

            {/* Pergunta 3 */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-3" className="text-base font-semibold text-gray-800">
                    3. Com qual dessas atividades você tem mais afinidade ou acha mais interessante?
                </label>
                <div className="text-sm text-gray-600 flex flex-col gap-1.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p><strong>A)</strong> Analisar gráficos, estatísticas ou probabilidade.</p>
                    <p><strong>B)</strong> Artes, psicologia, comportamento das pessoas ou criação de designs.</p>
                    <p><strong>C)</strong> Resolver equações, criar regras de jogos ou usar lógica pura.</p>
                    <p><strong>D)</strong> Entender como a internet funciona por trás e resolver enigmas.</p>
                </div>
                <select name="pergunta3" id="pergunta-3" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione a sua alternativa</option>
                    <option value="dados">Alternativa A</option>
                    <option value="ux">Alternativa B</option>
                    <option value="dev">Alternativa C</option>
                    <option value="seguranca">Alternativa D</option>
                </select>
            </div>

            {/* Pergunta 4 */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-4" className="text-base font-semibold text-gray-800">
                    4. Se você fosse contratado por uma empresa de tecnologia futurista, qual seria sua missão dos sonhos?
                </label>
                <div className="text-sm text-gray-600 flex flex-col gap-1.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p><strong>A)</strong> Treinar um modelo de Inteligência Artificial para prever tendências ou curar doenças.</p>
                    <p><strong>B)</strong> Criar a interface holográfica que os humanos vão usar para controlar robôs.</p>
                    <p><strong>C)</strong> Escrever o código que faz as naves espaciais decolarem e pousarem sozinhas.</p>
                    <p><strong>D)</strong> Proteger o sistema central contra ataques de hackers.</p>
                </div>
                <select name="pergunta4" id="pergunta-4" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione a sua alternativa</option>
                    <option value="dados">Alternativa A</option>
                    <option value="ux">Alternativa B</option>
                    <option value="dev">Alternativa C</option>
                    <option value="seguranca">Alternativa D</option>
                </select>
            </div>

            {/* Pergunta 5 */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-5" className="text-base font-semibold text-gray-800">
                    5. Se você pudesse ter um superpoder tecnológico hoje, qual seria?
                </label>
                <div className="text-sm text-gray-600 flex flex-col gap-1.5 bg-gray-50 p-3 rounded-lg border border-gray-200">
                    <p><strong>A)</strong> Ler e interpretar milhões de dados e textos em um segundo.</p>
                    <p><strong>B)</strong> Entender exatamente o que os usuários querem em um site.</p>
                    <p><strong>C)</strong> Digitar códigos na velocidade da luz e criar qualquer aplicativo.</p>
                    <p><strong>D)</strong> Ser invisível na rede e encontrar vulnerabilidades em qualquer sistema.</p>
                </div>
                <select name="pergunta5" id="pergunta-5" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione a sua alternativa</option>
                    <option value="dados">Alternativa A</option>
                    <option value="ux">Alternativa B</option>
                    <option value="dev">Alternativa C</option>
                    <option value="seguranca">Alternativa D</option>
                </select>
            </div>

            {/* Pergunta 6 (Escala) */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-6" className="text-base font-semibold text-gray-800">
                    6. O quanto você se considera uma pessoa curiosa que adora descobrir o &quot;porquê&quot; das coisas?
                </label>
                <select name="pergunta6" id="pergunta-6" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione uma nota de 1 a 5</option>
                    <option value="1">1 - Nem um pouco curioso</option>
                    <option value="2">2 - Pouco curioso</option>
                    <option value="3">3 - Neutro</option>
                    <option value="4">4 - Curioso</option>
                    <option value="5">5 - Extremamente curioso, investigo tudo!</option>
                </select>
            </div>

            {/* Pergunta 7 (Escala) */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-7" className="text-base font-semibold text-gray-800">
                    7. O quanto você escolheria Engenharia da Computação como o seu curso universitário?
                </label>
                <select name="pergunta7" id="pergunta-7" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione uma nota de 1 a 5</option>
                    <option value="1">1 - Nenhuma chance</option>
                    <option value="2">2 - Baixo interesse</option>
                    <option value="3">3 - Médio interesse (Talvez)</option>
                    <option value="4">4 - Alto interesse</option>
                    <option value="5">5 - Minha escolha principal!</option>
                </select>
            </div>

            {/* Pergunta 8 (Escala) */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-8" className="text-base font-semibold text-gray-800">
                    8. O quanto você saberia explicar para um amigo o que faz um Analista de Dados?
                </label>
                <select name="pergunta8" id="pergunta-8" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione uma nota de 1 a 5</option>
                    <option value="1">1 - Não faço ideia</option>
                    <option value="2">2 - Sei bem pouco</option>
                    <option value="3">3 - Tenho uma noção básica</option>
                    <option value="4">4 - Saberia explicar de forma geral</option>
                    <option value="5">5 - Sei exatamente o que faz</option>
                </select>
            </div>

            {/* Pergunta 9 (Escala) */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-9" className="text-base font-semibold text-gray-800">
                    9. Se ganhasse acesso ao histórico do YouTube da escola, o quanto acharia incrível analisar os dados para ver o vídeo mais amado/odiado?
                </label>
                <select name="pergunta9" id="pergunta-9" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione uma nota de 1 a 5</option>
                    <option value="1">1 - Acharia chato / Sem interesse</option>
                    <option value="2">2 - Ignoraria</option>
                    <option value="3">3 - Olharia por curiosidade rápida</option>
                    <option value="4">4 - Acharia bem interessante</option>
                    <option value="5">5 - Acharia sensacional e passaria horas analisando!</option>
                </select>
            </div>

            {/* Pergunta 10 (Escala) */}
            <div className="flex flex-col gap-2 w-full">
                <label htmlFor="pergunta-10" className="text-base font-semibold text-gray-800">
                    10. O quanto você gostaria de dominar tecnologias que usam dados (como Spotify e Instagram) para prever tendências?
                </label>
                <select name="pergunta10" id="pergunta-10" className="p-2.5 border border-gray-400 rounded bg-white font-medium" defaultValue="" required>
                    <option value="" disabled>Selecione uma nota de 1 a 5</option>
                    <option value="1">1 - Prefiro apenas consumir as redes sociais</option>
                    <option value="2">2 - Pouco interesse pelas tecnologias por trás</option>
                    <option value="3">3 - Interesse moderado</option>
                    <option value="4">4 - Alto interesse em entender como funciona</option>
                    <option value="5">5 - Total interesse, quero aprender a dominar esses dados!</option>
                </select>
            </div>

            {estado.status === 'erro' && (
                <p role="alert" className="rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm font-medium text-red-700">
                    {estado.mensagem}
                </p>
            )}

            <BotaoEnviar />
        </form>
        )}
       </section>
    )
}
