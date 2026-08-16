# Estilo "Lobster" no logo Popy da navbar — design

## Objetivo
Aplicar um estilo customizado (fonte cursiva "Lobster", laranja, levemente inclinada) ao texto "Popy" no logo da navbar, mantendo a pílula verde de fundo já existente.

## Fonte
Em `src/app/layout.tsx`, adicionar `Lobster` via `next/font/google`, mesmo padrão de `Baloo_2` e `Inter`, exposta como `--font-lobster`.

## CSS
Em `src/app/globals.css`, nova classe (valores escalados do CSS original de 140px para caber na navbar, mantendo as proporções — letter-spacing escalado de -5px/140px para -1px/32px):

```css
.logo-popy {
  font-family: var(--font-lobster), cursive;
  font-size: 32px;
  font-weight: 400;
  color: #f5681e;
  letter-spacing: -1px;
  line-height: 0.9;
  transform: skewX(-5deg);
}
```

## Integração
Em `src/components/Header.tsx`, o link do logo mantém a pílula verde (`bg-popy-green`, `rounded-full`, padding atual). A classe do `<a>` interno some `font-display text-2xl text-cream` e passa a incluir `logo-popy` (cor e fonte vêm da classe; o fundo verde continua vindo do link pai).

## Escopo
- Só o logo "Popy" da navbar (`Header.tsx`) é alterado. O logo "Popy" no Footer (`bg-popy-green`, `font-display text-lg text-cream`) não é tocado — fora do pedido.
