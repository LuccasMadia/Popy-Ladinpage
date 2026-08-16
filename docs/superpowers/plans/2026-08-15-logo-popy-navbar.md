# Estilo Lobster no logo Popy da navbar Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** O texto "Popy" na navbar usa a fonte cursiva "Lobster", laranja (`#f5681e`) e levemente inclinada, dentro da pílula verde que já existe.

**Architecture:** Fonte carregada via `next/font/google` em `layout.tsx` (mesmo padrão de `Baloo_2`/`Inter`), classe CSS `.logo-popy` em `globals.css`, aplicada ao link do logo em `Header.tsx`.

**Tech Stack:** Next.js 16 (`next/font/google`), Tailwind CSS 4. Sem framework de testes — verificação por `npm run lint`, `npm run build` e checagem visual no navegador.

## Global Constraints

- Só o logo da navbar (`Header.tsx`) muda; o logo do Footer não é tocado.
- Valores da classe `.logo-popy`: `font-size: 32px`, `font-weight: 400`, `color: #f5681e`, `letter-spacing: -1px`, `line-height: 0.9`, `transform: skewX(-5deg)`.
- A pílula verde (`bg-popy-green`, `rounded-full`, padding) do link permanece.

---

### Task 1: Fonte, CSS e integração no Header

**Files:**
- Modify: `src/app/layout.tsx` (adiciona import/uso de `Lobster`)
- Modify: `src/app/globals.css` (adiciona `.logo-popy`)
- Modify: `src/components/Header.tsx` (aplica a classe no logo)

**Interfaces:**
- Produces: CSS var `--font-lobster` (via `next/font/google`) e classe `.logo-popy`, consumidas dentro do próprio Task.

- [ ] **Step 1: Adicionar a fonte Lobster em layout.tsx**

Em `src/app/layout.tsx`, alterar o import:

```ts
import { Baloo_2, Inter } from "next/font/google";
```

para:

```ts
import { Baloo_2, Inter, Lobster } from "next/font/google";
```

Adicionar, após a declaração de `inter`:

```ts
const lobster = Lobster({
  variable: "--font-lobster",
  weight: "400",
  subsets: ["latin"],
});
```

E incluir `lobster.variable` na `className` do `<html>`:

```tsx
className={`${baloo.variable} ${inter.variable} ${lobster.variable} h-full antialiased`}
```

- [ ] **Step 2: Adicionar a classe .logo-popy em globals.css**

No final de `src/app/globals.css`, adicionar:

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

- [ ] **Step 3: Aplicar a classe no logo do Header**

Em `src/components/Header.tsx`, trocar:

```tsx
        <a
          href="#top"
          className="rounded-full bg-popy-green px-4 py-1.5 font-display text-2xl text-cream"
        >
          Popy
        </a>
```

por:

```tsx
        <a
          href="#top"
          className="logo-popy rounded-full bg-popy-green px-4 py-1.5"
        >
          Popy
        </a>
```

- [ ] **Step 4: Type-check**

Run: `npx tsc --noEmit`
Expected: sem erros.

- [ ] **Step 5: Lint**

Run: `npm run lint`
Expected: sem erros novos.

- [ ] **Step 6: Build**

Run: `npm run build`
Expected: build concluído sem erros.

- [ ] **Step 7: Verificar visualmente**

Rodar `npm run dev`, abrir a página no navegador e confirmar:
- O texto "Popy" na navbar usa a fonte cursiva Lobster, cor laranja, levemente inclinado.
- A pílula verde de fundo continua do mesmo tamanho/formato de antes, sem cortar o texto.
- O logo do Footer continua com a fonte/estilo antigos (não foi alterado).

- [ ] **Step 8: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css src/components/Header.tsx
git commit -m "Estiliza o logo Popy da navbar com fonte Lobster"
```
