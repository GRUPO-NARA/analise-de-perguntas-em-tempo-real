import { enviarRespostasDoFormulario } from '../actions'

export default function FormularioComponent(){
    return (
       <section className="flex flex-col items-center gap-5 p-5 border border-gray-400 rounded-2xl m-5">
        <h2 className="text-2xl font-bold">Formulário</h2>
        <form className="flex flex-col gap-3 w-full " action={enviarRespostasDoFormulario}>
            
            {/* Pergunta 1 */}
            <label htmlFor="pergunta-1" className="text-lg font-semibold">1. Se você ganhasse um quebra-cabeça de 5.000 peças muito complexo, o que faria primeiro?</label>
            <select name="pergunta1" id="pergunta-1" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Separaria as peças por cores e bordas para achar um padrão lógico.</option>
                <option value="ux">B) Começaria pelas partes mais bonitas ou pelo que chama mais atenção visualmente.</option>
                <option value="dev">C) Olharia o manual e montaria peça por peça de forma sistemática.</option>
                <option value="seguranca">D) Procuraria peças faltando, defeitos ou formas de burlar o encaixe tradicional.</option>
            </select>

            {/* Pergunta 2 */}
            <label htmlFor="pergunta-2" className="text-lg font-semibold">2. Quando você usa um aplicativo novo no celular, o que mais te chama atenção?</label>
            <select name="pergunta2" id="pergunta-2" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) O algoritmo e como ele adivinha rápido o que eu gosto.</option>
                <option value="ux">B) O visual, as cores, as animações e a facilidade de encontrar os botões.</option>
                <option value="dev">C) A velocidade, o carregamento rápido e o funcionamento sem erros.</option>
                <option value="seguranca">D) A privacidade, as permissões pedidas e a segurança dos dados.</option>
            </select>

            {/* Pergunta 3 */}
            <label htmlFor="pergunta-3" className="text-lg font-semibold">3. Com qual dessas atividades você tem mais afinidade ou acha mais interessante?</label>
            <select name="pergunta3" id="pergunta-3" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Analisar gráficos, estatísticas ou probabilidade.</option>
                <option value="ux">B) Artes, psicologia, comportamento das pessoas ou criação de designs.</option>
                <option value="dev">C) Resolver equações, criar regras de jogos ou usar lógica pura.</option>
                <option value="seguranca">D) Entender como a internet funciona por trás e resolver enigmas.</option>
            </select>

            {/* Pergunta 4 */}
            <label htmlFor="pergunta-4" className="text-lg font-semibold">4. Se você fosse contratado por uma empresa de tecnologia futurista, qual seria sua missão dos sonhos?</label>
            <select name="pergunta4" id="pergunta-4" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Treinar um modelo de Inteligência Artificial para prever tendências ou curar doenças.</option>
                <option value="ux">B) Criar a interface holográfica que os humanos vão usar para controlar robôs.</option>
                <option value="dev">C) Escrever o código que faz as naves espaciais decolarem e pousarem sozinhas.</option>
                <option value="seguranca">D) Proteger o sistema central contra ataques de hackers.</option>
            </select>

            {/* Pergunta 5 */}
            <label htmlFor="pergunta-5" className="text-lg font-semibold">5. Se você pudesse ter um superpoder tecnológico hoje, qual seria?</label>
            <select name="pergunta5" id="pergunta-5" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Ler e interpretar milhões de dados e textos em um segundo.</option>
                <option value="ux">B) Entender exatamente o que os usuários querem em um site.</option>
                <option value="dev">C) Digitar códigos na velocidade da luz e criar qualquer aplicativo.</option>
                <option value="seguranca">D) Ser invisível na rede e encontrar vulnerabilidades em qualquer sistema.</option>
            </select>

            {/* Pergunta 6 (Nova - Escala) */}
            <label htmlFor="pergunta-6" className="text-lg font-semibold">6. O quanto você se considera uma pessoa curiosa que adora descobrir o "porquê" das coisas?</label>
            <select name="pergunta6" id="pergunta-6" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma nota de 1 a 5</option>
                <option value="1">1 - Nem um pouco curioso</option>
                <option value="2">2 - Pouco curioso</option>
                <option value="3">3 - Neutro</option>
                <option value="4">4 - Curioso</option>
                <option value="5">5 - Extremamente curioso, investigo tudo!</option>
            </select>

            {/* Pergunta 7 (Nova - Escala) */}
            <label htmlFor="pergunta-7" className="text-lg font-semibold">7. O quanto você escolheria Engenharia da Computação como o seu curso universitário?</label>
            <select name="pergunta7" id="pergunta-7" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma nota de 1 a 5</option>
                <option value="1">1 - Nenhuma chance</option>
                <option value="2">2 - Baixo interesse</option>
                <option value="3">3 - Médio interesse (Talvez)</option>
                <option value="4">4 - Alto interesse</option>
                <option value="5">5 - Minha escolha principal!</option>
            </select>

            {/* Pergunta 8 (Nova - Escala) */}
            <label htmlFor="pergunta-8" className="text-lg font-semibold">8. O quanto você saberia explicar para um amigo o que faz um Analista de Dados?</label>
            <select name="pergunta8" id="pergunta-8" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma nota de 1 a 5</option>
                <option value="1">1 - Não faço ideia</option>
                <option value="2">2 - Sei bem pouco</option>
                <option value="3">3 - Tenho uma noção básica</option>
                <option value="4">4 - Saberia explicar de forma geral</option>
                <option value="5">5 - Sei exatamente o que faz</option>
            </select>

            {/* Pergunta 9 (Nova - Escala) */}
            <label htmlFor="pergunta-9" className="text-lg font-semibold">9. Se ganhasse acesso ao histórico do YouTube da escola, o quanto acharia incrível analisar os dados para ver o vídeo mais amado/odiado?</label>
            <select name="pergunta9" id="pergunta-9" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma nota de 1 a 5</option>
                <option value="1">1 - Acharia chato / Sem interesse</option>
                <option value="2">2 - Ignoraria</option>
                <option value="3">3 - Olharia por curiosidade rápida</option>
                <option value="4">4 - Acharia bem interessante</option>
                <option value="5">5 - Acharia sensacional e passaria horas analisando!</option>
            </select>

            {/* Pergunta 10 (Nova - Escala) */}
            <label htmlFor="pergunta-10" className="text-lg font-semibold">10. O quanto você gostaria de dominar tecnologias que usam dados (como Spotify e Instagram) para prever tendências?</label>
            <select name="pergunta10" id="pergunta-10" className="p-2 border border-gray-400 rounded" defaultValue="">
                <option value="" disabled>Selecione uma nota de 1 a 5</option>
                <option value="1">1 - Prefiro apenas consumir as redes sociais</option>
                <option value="2">2 - Pouco interesse pelas tecnologias por trás</option>
                <option value="3">3 - Interesse moderado</option>
                <option value="4">4 - Alto interesse em entender como funciona</option>
                <option value="5">5 - Total interesse, quero aprender a dominar esses dados!</option>
            </select>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4">Enviar</button>
        </form>
       </section>
    )
}