# Tamanhos por sabor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Exibir os 4 tamanhos de embalagem (300ml, 450ml, 900ml, 1700ml) como pílulas dentro de cada card de sabor na seção "Nossos sabores".

**Architecture:** Uma constante `sizes` única em `src/lib/content.ts`, renderizada como uma lista de chips (`flex flex-wrap`) dentro do overlay de cada card em `FlavorShowcase.tsx`, abaixo da descrição do sabor.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 4. Sem framework de testes no projeto (verificação por `npm run lint`, `npm run build` e checagem visual no navegador — não há Jest/Vitest configurado).

## Global Constraints

- Os 4 tamanhos (300ml, 450ml, 900ml, 1700ml) são idênticos para os 3 sabores — uma única lista reaproveitada, sem campo `sizes` por `Flavor`.
- Estilo de pílula: `rounded-full`, `border border-cream/40`, `bg-cream/10`, `text-cream`, `text-xs`, consistente com o badge já existente no Hero.
- Não alterar cores de seção nem nenhum outro conteúdo fora do escopo desta spec.

---

### Task 1: Adicionar constante `sizes` em content.ts

**Files:**
- Modify: `src/lib/content.ts:58` (logo após o array `flavors`)

**Interfaces:**
- Produces: `export const sizes: string[]` — usado pelo Task 2 em `FlavorShowcase.tsx`.

- [ ] **Step 1: Adicionar a constante**

Em `src/lib/content.ts`, logo após o fechamento do array `flavors` (linha 58, `];`), adicionar:

```ts
export const sizes = ["300ml", "450ml", "900ml", "1700ml"];
```

- [ ] **Step 2: Verificar tipos**

Run: `npx tsc --noEmit`
Expected: sem erros novos relacionados a `content.ts`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "Adiciona constante de tamanhos de embalagem"
```

---

### Task 2: Renderizar pílulas de tamanho nos cards de sabor

**Files:**
- Modify: `src/components/FlavorShowcase.tsx:6` (import) e `src/components/FlavorShowcase.tsx:71-79` (overlay do card)

**Interfaces:**
- Consumes: `sizes: string[]` de `@/lib/content` (produzido no Task 1).

- [ ] **Step 1: Importar `sizes`**

Em `src/components/FlavorShowcase.tsx:6`, alterar:

```ts
import { flavors } from "@/lib/content";
```

para:

```ts
import { flavors, sizes } from "@/lib/content";
```

- [ ] **Step 2: Adicionar os chips no overlay do card**

Em `src/components/FlavorShowcase.tsx`, dentro do bloco do overlay (linhas 71-79), após o `<p>` da descrição, adicionar a lista de chips:

```tsx
              <div
                className="absolute inset-x-0 bottom-0 p-6"
                style={{
                  background: `linear-gradient(to top, ${flavor.colorSoft} 10%, transparent 90%)`,
                }}
              >
                <h3 className="font-display text-2xl text-cream">{flavor.name}</h3>
                <p className="mt-2 text-sm text-cream/85">{flavor.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-cream/40 bg-cream/10 px-3 py-1 text-xs text-cream"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
```

- [ ] **Step 3: Rodar lint**

Run: `npm run lint`
Expected: sem erros novos em `FlavorShowcase.tsx`.

- [ ] **Step 4: Rodar build**

Run: `npm run build`
Expected: build concluído sem erros.

- [ ] **Step 5: Verificar visualmente**

Rodar `npm run dev`, abrir a seção "Nossos sabores" no navegador e confirmar que cada um dos 3 cards mostra as 4 pílulas (300ml, 450ml, 900ml, 1700ml) abaixo da descrição, legíveis sobre o gradiente colorido do card.

- [ ] **Step 6: Commit**

```bash
git add src/components/FlavorShowcase.tsx
git commit -m "Exibe tamanhos de embalagem nos cards de sabor"
```
