# Animação barra → bolha em "Por que Popy" — design

## Objetivo
Na seção "Por que Popy" (`WhyPopy.tsx`), cada card de diferencial hoje é uma única `div` com `border-t-4` colorida no topo, revelada em bloco via `data-reveal-stagger`. O pedido: a barra colorida aparece primeiro, e a bolha de texto "sai de dentro" dela, crescendo para baixo — um card de cada vez, com leve atraso entre eles (não espera um terminar 100% pra começar o próximo).

## Markup
Cada item do grid passa a ter dois elementos empilhados em vez de uma única div com borda:

```tsx
<div key={item.id} data-why-card>
  <span
    data-why-bar
    className="block h-2 w-full rounded-full"
    style={{ backgroundColor: accents[index % accents.length] }}
  />
  <div
    data-why-bubble
    className="-mt-1 rounded-2xl bg-cream p-6 shadow-sm"
  >
    <h3 className="font-display text-xl" style={{ color: accents[index % accents.length] }}>
      {item.title}
    </h3>
    <p className="mt-2 text-sm text-ink/70">{item.description}</p>
  </div>
</div>
```

O container do grid troca `data-reveal-stagger` por `data-why-grid` (a animação genérica do hook `useScrollReveal` não serve mais para este grid — ver seção Animação).

## Animação
Implementada com GSAP diretamente em `WhyPopy.tsx` (via `useGSAP`), não pelo hook genérico `useScrollReveal`, pois precisa de uma sequência de duas fases por item mais stagger entre itens — o hook só suporta fade+slide simples ou stagger uniforme.

- Trigger único: `scrollTrigger` no elemento `data-why-grid`, `start: "top 85%"`, `toggleActions: "play none none reverse"` (mesmo padrão do resto do site).
- Para cada `data-why-card` (via `gsap.utils.toArray`), numa timeline mestre:
  1. `data-why-bar`: `gsap.fromTo(bar, { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.25, ease: "power2.out", transformOrigin: "left" })`.
  2. `data-why-bubble`: `gsap.fromTo(bubble, { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.45, ease: "power3.out", transformOrigin: "top" })`, inserido na timeline com posição `"-=0.1"` relativa ao passo anterior (começa um pouco antes da barra terminar).
  3. Cada card é inserido na timeline mestre com offset incremental de `0.2s` a partir do início do card anterior (ex.: card 2 começa em `0.2s`, card 3 em `0.4s`, card 4 em `0.6s`), usando posição absoluta ou label por card — dá o efeito "um de cada vez" sem esperar o card anterior terminar.

## Escopo
- Só afeta o grid de diferenciais em `WhyPopy.tsx`. Nenhuma outra seção ou uso do hook `useScrollReveal` é alterado.
- Cores dos accents (`accents` array) e conteúdo (`differentiators`) não mudam.
