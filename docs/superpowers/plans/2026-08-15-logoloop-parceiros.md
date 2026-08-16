# LogoLoop na seção Parceiros Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A seção "Quem já é parceiro" mostra um carrossel infinito horizontal (logo loop) com nomes de clientes em placeholders de texto, no lugar dos cards de depoimento atuais.

**Architecture:** Um componente reutilizável `LogoLoop` recebe uma lista de strings e renderiza uma trilha duplicada animada via CSS `@keyframes` (loop contínuo, sem JS). `Partners.tsx` passa a usá-lo com uma nova constante `partners` de `content.ts`, que substitui o array `testimonials` removido.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4 (CSS puro para a animação, sem GSAP — é uma animação de estado único contínua). Sem framework de testes — verificação por `npm run lint`, `npm run build` e checagem visual no navegador.

## Global Constraints

- Interface `Testimonial` e array `testimonials` são removidos de `src/lib/content.ts` (nada mais os usa depois desta mudança).
- `partners`: `["Mercadinho Boa Vista", "Café do Bairro", "Empório Verde", "Padaria Sol Nascente", "Mercado Bom Preço", "Lanchonete da Praça"]`.
- Animação: `translateX(0%)` → `translateX(-50%)`, `linear`, `infinite`, duração `30s`, pausa no `:hover`.
- Cada item placeholder: `rounded-xl border border-ink/10 bg-white px-6 py-4 shadow-sm font-display text-lg text-ink/70 whitespace-nowrap`.
- Fade nas bordas via `mask-image`/`-webkit-mask-image` no container externo.

---

### Task 1: Dados e keyframe CSS

**Files:**
- Modify: `src/lib/content.ts:16-98` (remove `Testimonial`/`testimonials`, adiciona `partners`)
- Modify: `src/app/globals.css` (adiciona keyframe no final do arquivo)

**Interfaces:**
- Produces: `export const partners: string[]` em `content.ts`, usado no Task 2.
- Produces: classe CSS `.animate-logo-loop` (ou equivalente) em `globals.css`, usada no Task 2.

- [ ] **Step 1: Remover Testimonial/testimonials e adicionar partners**

Em `src/lib/content.ts`, remover a interface `Testimonial` (linhas 16-21) e o array `testimonials` (linhas 83-98). Adicionar, no lugar onde estava o array `testimonials`:

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

- [ ] **Step 2: Adicionar o keyframe da animação**

No final de `src/app/globals.css`, adicionar:

```css
@keyframes logo-loop {
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-50%);
  }
}

.animate-logo-loop {
  animation: logo-loop 30s linear infinite;
}

.animate-logo-loop:hover {
  animation-play-state: paused;
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: erros apontando `src/components/Partners.tsx` referenciando `testimonials` (esperado — corrigido no Task 2). Se houver algum outro erro fora de `Partners.tsx`, investigar antes de prosseguir.

- [ ] **Step 4: Commit**

```bash
git add src/lib/content.ts src/app/globals.css
git commit -m "Troca testimonials por lista de partners e adiciona keyframe de logo loop"
```

---

### Task 2: Componente LogoLoop e integração em Partners

**Files:**
- Create: `src/components/LogoLoop.tsx`
- Modify: `src/components/Partners.tsx`

**Interfaces:**
- Consumes: `partners: string[]` e classe `.animate-logo-loop` (produzidos no Task 1).
- Produces: `export function LogoLoop({ items }: { items: string[] })`, usado por `Partners.tsx`.

- [ ] **Step 1: Criar o componente LogoLoop**

Criar `src/components/LogoLoop.tsx`:

```tsx
interface LogoLoopProps {
  items: string[];
}

export function LogoLoop({ items }: LogoLoopProps) {
  const track = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div className="animate-logo-loop flex w-max gap-6">
        {track.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="whitespace-nowrap rounded-xl border border-ink/10 bg-white px-6 py-4 font-display text-lg text-ink/70 shadow-sm"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Atualizar Partners.tsx**

Substituir todo o conteúdo de `src/components/Partners.tsx` por:

```tsx
"use client";

import { partners } from "@/lib/content";
import { LogoLoop } from "@/components/LogoLoop";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Partners() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section id="parceiros" ref={scope} className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2
          data-reveal
          className="text-center font-display text-4xl text-ink md:text-5xl"
        >
          Quem já é parceiro
        </h2>
        <div className="mt-14">
          <LogoLoop items={partners} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: sem erros novos.

- [ ] **Step 5: Build**

Run: `npm run build`
Expected: build concluído sem erros.

- [ ] **Step 6: Verificar visualmente**

Rodar `npm run dev`, abrir `#parceiros` no navegador e confirmar:
- As caixas com nomes das empresas deslizam continuamente da direita para a esquerda, em loop (sem salto perceptível na volta).
- As bordas esquerda/direita têm fade suave (itens não "cortam" abruptamente).
- Passar o mouse sobre a trilha pausa a animação.
- Nenhum depoimento antigo aparece mais na seção.

- [ ] **Step 7: Commit**

```bash
git add src/components/LogoLoop.tsx src/components/Partners.tsx
git commit -m "Adiciona LogoLoop de clientes na seção Parceiros"
```
