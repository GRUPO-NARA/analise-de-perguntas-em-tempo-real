# Guia de Instalação - BarChartRespostas

## 📦 Instalação de Dependências

Para usar o componente `BarChartRespostas`, você precisará instalar as seguintes dependências:

```bash
npm install react-chartjs-2 chart.js
```

Ou com yarn:

```bash
yarn add react-chartjs-2 chart.js
```

## 📋 O que foi criado

### 1. **BarChartRespostas.tsx** (`app/components/BarChartRespostas.tsx`)
   - Componente funcional que renderiza um Horizontal Bar Chart
   - Utiliza `react-chartjs-2` e `chart.js`
   - Recebe dados via props do tipo `DadosRespostas`
   - Estilizado com Tailwind CSS (card branco, sombra, bordas arredondadas, altura 340px)
   - Opções customizáveis: título e cor da barra

### 2. **Server Actions** (`app/actions.ts`)
   - `obterRespostasAgrupadas(perguntaId)`: Busca e agrupa respostas do Supabase por pergunta
   - `obterRespostasMultiplas(perguntaIds)`: Busca respostas de múltiplas perguntas
   - Utiliza `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. **Componente de Exemplo** (`app/components/ExemploGraficos.tsx`)
   - Demonstra como integrar o `BarChartRespostas` em uma página
   - Mostra como chamar a Server Action
   - Exemplos com dados hardcoded e dinâmicos
   - Demonstra grid responsivo com Tailwind CSS

## 🚀 Como Usar

### Uso Básico

```tsx
import BarChartRespostas from '@/app/components/BarChartRespostas';

const dados = {
  A: 150,
  B: 200,
  C: 120,
  D: 180
};

export default function MinhaPage() {
  return (
    <BarChartRespostas 
      dados={dados}
      titulo="Distribuição de Respostas"
      corBarra="#3B82F6"
    />
  );
}
```

### Com Server Action (Dados do Banco)

```tsx
'use client';

import { useEffect, useState } from 'react';
import BarChartRespostas from '@/app/components/BarChartRespostas';
import { obterRespostasAgrupadas } from '@/app/actions';

export default function GraficoComDados() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    async function carregar() {
      const resultado = await obterRespostasAgrupadas('pergunta-id');
      setDados(resultado);
    }
    carregar();
  }, []);

  if (!dados) return <div>Carregando...</div>;

  return <BarChartRespostas dados={dados} titulo="Respostas" />;
}
```

## ⚙️ Configuração do Banco de Dados

Certifique-se de que sua tabela `respostas` no Supabase tem a seguinte estrutura:

```sql
CREATE TABLE respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta_id VARCHAR(255) NOT NULL,
  alternativa VARCHAR(1) NOT NULL, -- 'A', 'B', 'C' ou 'D'
  criado_em TIMESTAMP DEFAULT now()
);

-- Criar índice para melhor performance
CREATE INDEX idx_respostas_pergunta ON respostas(pergunta_id);
```

## 🎨 Propriedades do Componente

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|---|---|---|---|---|
| `dados` | `DadosRespostas` | ✅ Sim | - | Objeto com contagem: `{ A: number, B: number, C: number, D: number }` |
| `titulo` | `string` | ❌ Não | `'Distribuição de Respostas'` | Título do gráfico |
| `corBarra` | `string` | ❌ Não | `'#3B82F6'` | Cor das barras em formato hex |

## 🎯 Características do Gráfico

- ✅ Barras horizontais (`indexAxis: 'y'`)
- ✅ Card com fundo branco e bordas arredondadas (`rounded-xl`)
- ✅ Sombra leve (`shadow-sm`)
- ✅ Altura fixa de 340px
- ✅ Responsive e responsivo
- ✅ Tooltips customizados
- ✅ Grid com cores suaves
- ✅ Tipagem TypeScript completa

## 📝 Notas Importantes

1. **Variáveis de Ambiente**: Certifique-se de que `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY` estão configuradas no seu `.env.local`

2. **"use client"**: O componente `BarChartRespostas.tsx` é um Client Component (por isso começa com `'use client'`), necessário para renderizar gráficos interativos

3. **Server Actions**: O arquivo `actions.ts` contém Server Actions que rodam no servidor, mantendo suas chaves de API seguras

4. **Customização de Cores**: Use cores Tailwind CSS ou valores hex customizados na propriedade `corBarra`:
   - Azul: `#3B82F6`
   - Verde: `#10B981`
   - Âmbar: `#F59E0B`
   - Púrpura: `#8B5CF6`
   - Vermelho: `#EF4444`

## 🔗 Recursos

- [react-chartjs-2 Docs](https://react-chartjs-2.js.org/)
- [Chart.js Docs](https://www.chartjs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Supabase Docs](https://supabase.com/docs)
