# Tamanhos por sabor — design

## Objetivo
Exibir os tamanhos de embalagem disponíveis (300ml, 450ml, 900ml, 1700ml) dentro de cada card de sabor na seção "Nossos sabores".

## Dados
Em `src/lib/content.ts`, adicionar uma constante única e reaproveitada pelos 3 sabores (os tamanhos são os mesmos para todos):

```ts
export const sizes = ["300ml", "450ml", "900ml", "1700ml"];
```

Não é adicionado um campo `sizes` por `Flavor`, já que o conjunto é idêntico para os três — evita repetição de dados.

## Visual
Em `src/components/FlavorShowcase.tsx`, dentro do overlay de cada card (onde já ficam `name` e `description`), adicionar uma linha de chips abaixo da descrição:

- Uma pílula por tamanho: `rounded-full`, `border border-cream/40`, `bg-cream/10`, `text-cream`, texto pequeno (`text-xs`).
- Container: `flex flex-wrap gap-2`, com uma margem superior (`mt-3`) separando da descrição.
- Reaproveita o mesmo estilo de pílula já usado no badge do Hero ("Suco 100% natural"), mantendo consistência visual.

## Escopo
- Não altera a paleta de cores das seções (pedido de troca de cores foi descartado nesta rodada).
- Não adiciona seleção de tamanho no formulário de contato nem seção dedicada — só exibição informativa nos cards de sabor.
