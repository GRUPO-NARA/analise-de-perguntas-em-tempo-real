'use server'

export async function testeGetInformacoes(formData){
    const nome = formData.get('name')
    console.log(nome)
}