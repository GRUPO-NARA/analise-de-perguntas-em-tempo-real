
"use client"

import { testeGetInformacoes } from './actions'
export default function Home() {
  return (
    // action e para onde o form vai enviar os dados, method e o tipo de envio, get ou post
    <form action={testeGetInformacoes}>
      <input type="text" name="name" placeholder="Digite seu nome" />
      <button type="submit">Enviar</button>
    </form>
  ) 
}