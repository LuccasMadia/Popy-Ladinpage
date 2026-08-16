# Animação barra → bolha em WhyPopy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Na seção "Por que Popy", cada card de diferencial anima em duas fases — a barra colorida aparece primeiro, depois a bolha de texto cresce para baixo saindo de dentro dela — com leve atraso escalonado entre os 4 cards.

**Architecture:** Split do card único (hoje `border-t-4`) em dois elementos DOM (`data-why-bar` e `data-why-bubble`), animados por uma timeline GSAP construída diretamente em `WhyPopy.tsx` via `useGSAP`, disparada por um único `ScrollTrigger` no grid.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4, GSAP 3 + `@gsap/react` (já usados no projeto, ver `Hero.tsx` e `useScrollReveal.ts` para o padrão de `useGSAP`/`ScrollTrigger` já estabelecido). Sem framework de testes — verificação por `npm run lint`, `npm run build` e checagem visual no navegador.

## Global Constraints

- Só o grid de diferenciais em `WhyPopy.tsx` é alterado; nenhuma outra seção ou o hook `useScrollReveal` (usado por outras seções) é tocado.
- Cores dos accents (`accents` array) e conteúdo (`differentiators`) permanecem os mesmos.
- Barra: `fromTo({ opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.25, ease: "power2.out" })`, `transformOrigin: "left"`.
- Bolha: `fromTo({ opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: 0.45, ease: "power3.out" })`, `transformOrigin: "top"`, inserida na timeline em `"-=0.1"` relativo à barra.
- Offset entre cards: 0.2s a partir do início do card anterior.
- `ScrollTrigger`: trigger no elemento `data-why-grid`, `start: "top 85%"`, `toggleActions: "play none none reverse"`.

---

### Task 1: Reestruturar markup e implementar a animação em WhyPopy

**Files:**
- Modify: `src/components/WhyPopy.tsx` (arquivo inteiro — componente pequeno, ~44 linhas)

**Interfaces:**
- Nenhuma interface exportada muda. `WhyPopy` continua um componente sem props, usado em `src/app/page.tsx`.

- [ ] **Step 1: Reescrever o componente**

Substituir todo o conteúdo de `src/components/WhyPopy.tsx` por:

```tsx
"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { differentiators } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const accents = ["#1F6D3A", "#D81E2C", "#F2711C", "#8BC53F"];

export function WhyPopy() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-reveal]",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      const grid = scope.current?.querySelector("[data-why-grid]");
      if (!grid) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-why-card]", grid);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card, index) => {
        const bar = card.querySelector<HTMLElement>("[data-why-bar]");
        const bubble = card.querySelector<HTMLElement>("[data-why-bubble]");
        if (!bar || !bubble) return;

        tl.fromTo(
          bar,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.25,
            ease: "power2.out",
            transformOrigin: "left",
          },
          index * 0.2,
        ).fromTo(
          bubble,
          { opacity: 0, scaleY: 0 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.45,
            ease: "power3.out",
            transformOrigin: "top",
          },
          "-=0.1",
        );
      });
    },
    { scope },
  );

  return (
    <section id="por-que-popy" ref={scope} className="bg-popy-green/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="text-center font-display text-4xl text-ink md:text-5xl"
        >
          Por que Popy
        </h2>
        <div
          data-why-grid
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {differentiators.map((item, index) => (
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
                <h3
                  className="font-display text-xl"
                  style={{ color: accents[index % accents.length] }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

Nota: o `data-reveal` do `<h2>` deixa de ser tratado pelo hook `useScrollReveal` (que não é mais usado neste componente) e passa a ser animado diretamente aqui, com a mesma configuração (`opacity 0→1`, `y: 36→0`, `duration: 0.9`, `power3.out`, `start: "top 88%"`) para manter o comportamento idêntico ao de antes.

- [ ] **Step 2: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 3: Lint**

Run: `npm run lint`
Expected: sem erros novos.

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build concluído sem erros.

- [ ] **Step 5: Verificar visualmente**

Rodar `npm run dev`, abrir a seção "Por que Popy" no navegador (`#por-que-popy`), rolar até ela a partir do topo (para o ScrollTrigger disparar do estado inicial) e confirmar:
- As 4 barras coloridas aparecem antes das respectivas bolhas de texto.
- Cada bolha cresce visualmente para baixo, saindo de baixo da barra.
- Os 4 cards entram em sequência, com leve atraso entre eles (não simultâneos, não um esperando o outro terminar 100%).
- O título "Por que Popy" continua com o mesmo fade/slide de antes.

- [ ] **Step 6: Commit**

```bash
git add src/components/WhyPopy.tsx
git commit -m "Anima barra e bolha em sequência na seção Por que Popy"
```
