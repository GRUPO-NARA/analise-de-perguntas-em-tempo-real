
export default function HeaderComponent(){
    return (
        <header className="flex justify-between items-center p-5 bg-gray-500 text-white">
            <div className="flex items-center gap-2">
                <img src="logo-Nara.png" alt="" className="h-15" />
                <h1 className="text-xl font-bold">NARA</h1>
            </div>
            <nav>
                <ul className="invisible lg:visible flex gap-5 ">
                    <li className="hover:text-gray-300 cursor-pointer">Formulário</li>
                    <li className="hover:text-gray-300 cursor-pointer">Gráficos</li>
                    <li className="hover:text-gray-300 cursor-pointer">Informações</li>
                </ul>   
            </nav>
        </header>
    )
}