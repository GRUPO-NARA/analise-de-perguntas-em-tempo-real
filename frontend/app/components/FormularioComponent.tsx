import { enviarRespostasDoFormulario } from '../actions'

export default function FormularioComponent(){
    return (
       <section className="flex flex-col items-center gap-5 p-5 border border-gray-400 rounded-2xl m-5">
        <h2 className="text-2xl font-bold">Formulário</h2>
        <form className="flex flex-col gap-3 w-full " action={enviarRespostasDoFormulario}>
            <label htmlFor="pergunta-1" className="text-lg font-semibold">1. Se você ganhasse um quebra-cabeça de 5.000 peças muito complexo, o que faria primeiro?</label>
            <select name="pergunta1" id="pergunta-1" className="p-2 border border-gray-400 rounded">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Separaria as peças por cores e bordas para achar um padrão lógico.</option>
                <option value="ux">B) Começaria pelas partes mais bonitas ou pelo que chama mais atenção visualmente.</option>
                <option value="dev">C) Olharia o manual e montaria peça por peça de forma sistemática.</option>
                <option value="seguranca">D) Procuraria peças faltando, defeitos ou formas de burlar o encaixe tradicional.</option>
            </select>
            <label htmlFor="pergunta-2" className="text-lg font-semibold">2. Quando você usa um aplicativo novo no celular, o que mais te chama atenção?</label>
            <select name="pergunta2" id="pergunta-2" className="p-2 border border-gray-400 rounded">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) O algoritmo e como ele adivinha rápido o que eu gosto.</option>
                <option value="ux">B) O visual, as cores, as animações e a facilidade de encontrar os botões.</option>
                <option value="dev">C) A velocidade, o carregamento rápido e o funcionamento sem erros.</option>
                <option value="seguranca">D) A privacidade, as permissões pedidas e a segurança dos dados.</option>
            </select>
            <label htmlFor="pergunta-3" className="text-lg font-semibold">3. Com qual dessas atividades você tem mais afinidade ou acha mais interessante?</label>
            <select name="pergunta3" id="pergunta-3" className="p-2 border border-gray-400 rounded">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Analisar gráficos, estatísticas ou probabilidade.</option>
                <option value="ux">B) Artes, psicologia, comportamento das pessoas ou criação de designs.</option>
                <option value="dev">C) Resolver equações, criar regras de jogos ou usar lógica pura.</option>
                <option value="seguranca">D) Entender como a internet funciona por trás e resolver enigmas.</option>
            </select>
            <label htmlFor="pergunta-4" className="text-lg font-semibold">4. Se você fosse contratado por uma empresa de tecnologia futurista, qual seria sua missão dos sonhos?</label>
            <select name="pergunta4" id="pergunta-4" className="p-2 border border-gray-400 rounded">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Treinar um modelo de Inteligência Artificial para prever tendências ou curar doenças.</option>
                <option value="ux">B) Criar a interface holográfica que os humanos vão usar para controlar robôs.</option>
                <option value="dev">C) Escrever o código que faz as naves espaciais decolarem e pousarem sozinhas.</option>
                <option value="seguranca">D) Proteger o sistema central contra ataques de hackers.</option>
            </select>
            <label htmlFor="pergunta-5" className="text-lg font-semibold">5. Se você pudesse ter um superpoder tecnológico hoje, qual seria?</label>
            <select name="pergunta5" id="pergunta-5" className="p-2 border border-gray-400 rounded">
                <option value="" disabled>Selecione uma opção</option>
                <option value="dados">A) Ler e interpretar milhões de dados e textos em um segundo.</option>
                <option value="ux">B) Entender exatamente o que os usuários querem em um site.</option>
                <option value="dev">C) Digitar códigos na velocidade da luz e criar qualquer aplicativo.</option>
                <option value="seguranca">D) Ser invisível na rede e encontrar vulnerabilidades em qualquer sistema.</option>
            </select>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Enviar</button>
        </form>
       </section>
    )
}