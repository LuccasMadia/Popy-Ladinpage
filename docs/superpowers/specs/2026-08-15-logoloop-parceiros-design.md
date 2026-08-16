# LogoLoop na seção "Quem já é parceiro" — design

## Objetivo
Substituir os cards de depoimento em texto (`Partners.tsx`) por um carrossel infinito horizontal ("logo loop") com os nomes/logos dos clientes. Como ainda não há arquivos de logo reais, usa placeholders de texto (nome da empresa em caixa), fáceis de trocar por `<Image>` depois.

## Dados
Em `src/lib/content.ts`, remove a interface `Testimonial` e o array `testimonials` (nada mais os consome depois desta mudança — evita código morto; recuperável via git history se precisar). Adiciona:

```ts
export const partners = [
  "Mercadinho Boa Vista",
  "Café do Bairro",
  "Empório Verde",
  "Padaria Sol Nascente",
  "Mercado Bom Preço",
  "Lanchonete da Praça",
];
```

Os 2 primeiros já existiam como clientes reais nos depoimentos antigos; os outros 4 são placeholder de preenchimento.

## Componente `LogoLoop`
Novo arquivo `src/components/LogoLoop.tsx`, reutilizável, props:

```ts
interface LogoLoopProps {
  items: string[];
}
```

- Renderiza a lista duas vezes seguidas (`[...items, ...items]`) dentro de uma trilha (`track`) que anima `translateX(0%) → translateX(-50%)`, `linear`, `infinite` — como as duas metades são idênticas, o loop parece contínuo.
- Animação via CSS puro (`@keyframes logo-loop` em `globals.css` + classe utilitária), não GSAP — é uma animação de estado único e contínua, sem necessidade de scroll-trigger nem timeline.
- Duração: `30s` (ajustável depois conforme quantidade de itens).
- `animation-play-state: paused` no `:hover` do container.
- Cada item: `<span>` com `rounded-xl border border-ink/10 bg-white px-6 py-4 shadow-sm font-display text-lg text-ink/70 whitespace-nowrap`.
- Container externo com `overflow: hidden` e `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)` (+ prefixo `-webkit-mask-image`) para fade nas bordas esquerda/direita.

## Integração
Em `src/components/Partners.tsx`:
- Remove o import de `testimonials` e o grid de `blockquote`.
- Importa `partners` de `@/lib/content` e `LogoLoop` de `@/components/LogoLoop`.
- Renderiza `<LogoLoop items={partners} />` dentro da `<section id="parceiros">`, no lugar do grid antigo.
- Mantém o `<h2 data-reveal>` "Quem já é parceiro" como está.

## Escopo
- Não adiciona imagens reais de logo — isso fica para uma iteração futura, quando os arquivos existirem (troca do placeholder de texto por `<Image>` dentro do mesmo `LogoLoop`).
- Nenhuma outra seção é alterada.
