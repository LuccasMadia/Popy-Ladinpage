# Nova Landing Page Popy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reconstruir a landing page da Popy do zero como uma página de captação de leads B2B (lojistas/distribuidores), na direção visual "Editorial Orgânico" descrita em `docs/superpowers/specs/2026-08-11-nova-landing-page-design.md`.

**Architecture:** Aplicação Next.js (App Router) de página única, composta por componentes de seção em `src/components/`, alimentados por dados tipados centralizados em `src/lib/content.ts`. Sem fotos de produto reais ainda — um componente `Blob` (SVG orgânico colorido) serve de placeholder visual reutilizável.

**Tech Stack:** Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4, fontes Fraunces (serif) e Inter (sans) via `next/font/google`.

## Global Constraints

- Idioma de todo o conteúdo textual: português (pt-BR).
- Stack obrigatória: Next.js (App Router) + TypeScript + Tailwind CSS v4, com alias de import `@/*` apontando para `src/*`.
- Paleta de cores (definida uma única vez em `src/app/globals.css`, consumida por todos os componentes): `cream #FAF6EF`, `terracotta #C1552C`, `olive #6B7A4F`, `ink #2B2620`.
- Tipografia: Fraunces para títulos (`font-serif`), Inter para corpo de texto (`font-sans`).
- Sem fotos de produto reais por enquanto — usar o componente `Blob` (SVG) colorido como placeholder visual em qualquer lugar que exibiria uma foto.
- O formulário de contato não tem integração de envio real — apenas validação client-side e um estado de confirmação na UI.
- Sem suíte de testes automatizados (decisão da spec) — verificação via `npx tsc --noEmit`, `npm run lint` e checagem manual no navegador.
- Todo conteúdo textual editável (sabores, diferenciais, depoimentos, passos) fica centralizado em `src/lib/content.ts`, nunca hardcoded dentro de JSX de componente.

---

### Task 1: Scaffold do projeto Next.js e limpeza dos arquivos antigos

O diretório do projeto hoje só tem `.git/`, `docs/` e um `readme.md` vazio (o projeto anterior foi apagado do disco intencionalmente, mas as deleções nunca foram commitadas). Este task recria o scaffold padrão do Next.js e resolve as deleções pendentes dos arquivos que não terão equivalente no novo design.

**Files:**
- Delete: `readme.md` (placeholder vazio; conflita com o `README.md` que o `create-next-app` gera)
- Create (via `create-next-app`): `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `.gitignore`, `next-env.d.ts`, `README.md`, `AGENTS.md`, `CLAUDE.md`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `public/*.svg`
- Stage deletion (arquivos do projeto anterior sem equivalente no novo design, já removidos do disco mas não commitados): `src/components/CtaBanner.tsx`, `src/components/Features.tsx`, `src/components/Flavors.tsx`, `src/components/icons.tsx`, `public/assets/abacaxi-com-hortela.png`, `public/assets/acerola.png`, `public/assets/laranja-com-acerola.png`

**Interfaces:**
- Consumes: nada (primeiro task)
- Produces: pipeline funcional de `npm run dev` / `npm run build`; Tailwind CSS v4 configurado; App Router em `src/app`; alias `@/*` → `src/*` em `tsconfig.json`. Tasks seguintes dependem desse scaffold existir.

- [ ] **Step 1: Remover o placeholder `readme.md`**

```bash
rm -f readme.md
```

- [ ] **Step 2: Rodar o scaffold do Next.js (não-interativo)**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
```

Expected: termina com `Success! Created ...` e nenhum prompt interativo (todas as opções foram passadas via flag).

- [ ] **Step 3: Verificar que o projeto compila**

```bash
npm run build
```

Expected: saída termina com `Compiled successfully` e exit code 0.

- [ ] **Step 4: Stage e commit do scaffold + limpeza dos arquivos antigos**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts eslint.config.mjs postcss.config.mjs .gitignore next-env.d.ts README.md AGENTS.md CLAUDE.md src/app public
git add src/components/CtaBanner.tsx src/components/Features.tsx src/components/Flavors.tsx src/components/icons.tsx public/assets/abacaxi-com-hortela.png public/assets/acerola.png public/assets/laranja-com-acerola.png
git commit -m "Recria o scaffold do projeto com Next.js 16 + TypeScript + Tailwind v4"
```

Expected: commit é criado. `git status` mostra como ainda pendentes de deleção apenas `src/components/Footer.tsx`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/Partners.tsx` e `src/lib/content.ts` — esses serão recriados com conteúdo novo nos próximos tasks.

---

### Task 2: Sistema de design (cores e tipografia)

**Files:**
- Modify: `src/app/globals.css` (substituir conteúdo gerado pelo scaffold)
- Modify: `src/app/layout.tsx` (substituir conteúdo gerado pelo scaffold)

**Interfaces:**
- Consumes: scaffold do Task 1
- Produces: utilitários Tailwind `bg-cream`, `text-cream`, `bg-terracotta`, `text-terracotta`, `bg-olive`, `text-olive`, `bg-ink`, `text-ink` (com suporte a modificador de opacidade, ex: `text-ink/70`, `bg-olive/10`, `border-ink/10`) e `font-serif` / `font-sans`, disponíveis para todos os componentes das próximas tasks.

- [ ] **Step 1: Substituir `src/app/globals.css`**

```css
@import "tailwindcss";

:root {
  --color-cream: #faf6ef;
  --color-terracotta: #c1552c;
  --color-olive: #6b7a4f;
  --color-ink: #2b2620;
}

@theme inline {
  --color-cream: var(--color-cream);
  --color-terracotta: var(--color-terracotta);
  --color-olive: var(--color-olive);
  --color-ink: var(--color-ink);
  --font-serif: var(--font-fraunces), serif;
  --font-sans: var(--font-inter), sans-serif;
}

body {
  background: var(--color-cream);
  color: var(--color-ink);
}
```

- [ ] **Step 2: Substituir `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Popy | Suco natural para o seu negócio",
  description:
    "A Popy produz sucos naturais sem conservantes. Torne-se um parceiro revendedor e leve esse sabor para o seu estabelecimento.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-cream text-ink">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verificar tipos e build**

```bash
npx tsc --noEmit
npm run build
```

Expected: ambos sem erro; `npm run build` termina com `Compiled successfully`.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "Define sistema de cores e tipografia (Editorial Orgânico)"
```

---

### Task 3: Camada de conteúdo (`src/lib/content.ts`)

**Files:**
- Create: `src/lib/content.ts`

**Interfaces:**
- Consumes: nada
- Produces: tipos `Flavor`, `Differentiator`, `Testimonial`, `Step` e os arrays `flavors: Flavor[]`, `differentiators: Differentiator[]`, `testimonials: Testimonial[]`, `steps: Step[]`, exportados de `@/lib/content`. Consumidos pelos Tasks 7, 8, 9 e 10.

- [ ] **Step 1: Criar `src/lib/content.ts`**

```ts
export interface Flavor {
  id: string;
  name: string;
  color: string;
  description: string;
}

export interface Differentiator {
  id: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  business: string;
}

export interface Step {
  id: string;
  number: number;
  title: string;
  description: string;
}

export const flavors: Flavor[] = [
  {
    id: "acerola",
    name: "Acerola",
    color: "#B4432E",
    description:
      "Suco puro de acerola, rico em vitamina C, com aquele azedinho que refresca na hora.",
  },
  {
    id: "laranja-com-acerola",
    name: "Laranja com Acerola",
    color: "#E2932F",
    description:
      "A doçura da laranja equilibrada pela acidez da acerola — o queridinho dos clientes.",
  },
  {
    id: "abacaxi-com-hortela",
    name: "Abacaxi com Hortelã",
    color: "#8FA85E",
    description:
      "Abacaxi maduro com um toque de hortelã fresca, leve e perfeito para dias quentes.",
  },
];

export const differentiators: Differentiator[] = [
  {
    id: "natural",
    title: "100% natural",
    description: "Sem açúcar adicionado nem ingredientes artificiais — só fruta de verdade.",
  },
  {
    id: "sem-conservantes",
    title: "Sem conservantes",
    description: "Processo pensado para manter o sabor da fruta sem precisar de químicos.",
  },
  {
    id: "producao-artesanal",
    title: "Produção artesanal",
    description: "Lotes pequenos, feitos com cuidado, para garantir a qualidade em cada garrafa.",
  },
  {
    id: "embalagem-sustentavel",
    title: "Embalagem sustentável",
    description: "Materiais recicláveis, pensados para reduzir o impacto ambiental do produto.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "mercadinho-boa-vista",
    quote:
      "Desde que passamos a vender Popy, os clientes voltam só para levar mais garrafinhas. Virou item fixo na geladeira.",
    author: "Renata Alves",
    business: "Mercadinho Boa Vista",
  },
  {
    id: "cafe-do-bairro",
    quote:
      "O sabor natural faz toda a diferença. É o suco que mais gira aqui na loja.",
    author: "Diego Martins",
    business: "Café do Bairro",
  },
];

export const steps: Step[] = [
  {
    id: "contato",
    number: 1,
    title: "Você entra em contato",
    description: "Preenche o formulário com os dados do seu negócio e a gente recebe o pedido.",
  },
  {
    id: "conversa",
    number: 2,
    title: "Conversamos sobre a parceria",
    description: "Nosso time entende o seu ponto de venda e monta uma proposta sob medida.",
  },
  {
    id: "primeira-entrega",
    number: 3,
    title: "Primeira entrega",
    description: "Combinamos os detalhes e sua primeira leva de sucos Popy chega prontinha pra vender.",
  },
];
```

- [ ] **Step 2: Verificar tipos**

```bash
npx tsc --noEmit
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content.ts
git commit -m "Adiciona camada de conteúdo tipada (sabores, diferenciais, depoimentos, passos)"
```

---

### Task 4: Componente `Blob` (placeholder visual orgânico)

**Files:**
- Create: `src/components/Blob.tsx`

**Interfaces:**
- Consumes: nada
- Produces: `Blob({ color, className }: { color: string; className?: string })`, exportado de `@/components/Blob`. Consumido pelos Tasks 6 (Hero) e 7 (FlavorShowcase).

- [ ] **Step 1: Criar `src/components/Blob.tsx`**

```tsx
interface BlobProps {
  color: string;
  className?: string;
}

export function Blob({ color, className }: BlobProps) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        fill={color}
        d="M45.3,-58.4C58.5,-49.6,68.5,-34.6,71.9,-18.1C75.3,-1.6,72.1,16.4,63.4,31.2C54.7,46,40.5,57.6,24.4,63.7C8.3,69.8,-9.7,70.4,-25.9,64.8C-42.1,59.2,-56.5,47.4,-64.8,32.1C-73.1,16.8,-75.3,-2,-70.3,-18.3C-65.3,-34.6,-53.1,-48.4,-38.7,-56.8C-24.3,-65.2,-12.1,-68.2,2.4,-71.2C16.9,-74.2,33.8,-77.2,45.3,-58.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/Blob.tsx
git commit -m "Adiciona componente Blob como placeholder visual orgânico"
```

---

### Task 5: Componente `Header`

**Files:**
- Create: `src/components/Header.tsx` (substitui o antigo, com conteúdo totalmente novo)

**Interfaces:**
- Consumes: tokens do Task 2 (`bg-cream`, `text-terracotta`, `font-serif`, `text-ink`)
- Produces: `Header()`, exportado de `@/components/Header`. Sem props. Consumido pelo Task 13 (page.tsx).

- [ ] **Step 1: Criar `src/components/Header.tsx`**

```tsx
const navLinks = [
  { href: "#sabores", label: "Sabores" },
  { href: "#por-que-popy", label: "Por que Popy" },
  { href: "#parceiros", label: "Parceiros" },
  { href: "#como-funciona", label: "Como funciona" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-serif text-2xl text-terracotta">
          Popy
        </a>
        <nav className="hidden gap-8 text-sm text-ink/80 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-terracotta"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="rounded-full bg-terracotta px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-terracotta/90"
        >
          Seja um parceiro
        </a>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/Header.tsx
git commit -m "Adiciona componente Header"
```

---

### Task 6: Componente `Hero`

**Files:**
- Create: `src/components/Hero.tsx` (substitui o antigo, com conteúdo totalmente novo)

**Interfaces:**
- Consumes: `Blob` (Task 4), tokens do Task 2
- Produces: `Hero()`, exportado de `@/components/Hero`. Sem props. Consumido pelo Task 13.

- [ ] **Step 1: Criar `src/components/Hero.tsx`**

```tsx
import { Blob } from "@/components/Blob";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-24 pt-40">
      <Blob
        color="#E2932F"
        className="absolute -right-32 -top-20 -z-10 h-[420px] w-[420px] opacity-30"
      />
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-serif text-5xl leading-tight text-ink md:text-6xl">
          Suco de verdade, direto da fruta para o seu ponto de venda
        </h1>
        <p className="mt-6 text-lg text-ink/70">
          A Popy produz sucos naturais, sem conservantes, prontos para encantar os
          clientes do seu estabelecimento. Vire um parceiro Popy e leve esse sabor
          para o seu negócio.
        </p>
        <a
          href="#contato"
          className="mt-10 inline-block rounded-full bg-terracotta px-8 py-3 text-base font-medium text-cream transition-colors hover:bg-terracotta/90"
        >
          Quero ser parceiro
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "Adiciona componente Hero"
```

---

### Task 7: Componente `FlavorShowcase`

**Files:**
- Create: `src/components/FlavorShowcase.tsx`

**Interfaces:**
- Consumes: `Blob` (Task 4), `flavors` de `@/lib/content` (Task 3)
- Produces: `FlavorShowcase()`, exportado de `@/components/FlavorShowcase`. Sem props. Consumido pelo Task 13.

- [ ] **Step 1: Criar `src/components/FlavorShowcase.tsx`**

```tsx
import { Blob } from "@/components/Blob";
import { flavors } from "@/lib/content";

export function FlavorShowcase() {
  return (
    <section id="sabores" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-4xl text-ink">Nossos sabores</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {flavors.map((flavor) => (
            <div key={flavor.id} className="text-center">
              <div className="relative mx-auto h-40 w-40">
                <Blob color={flavor.color} className="h-full w-full" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-ink">{flavor.name}</h3>
              <p className="mt-2 text-ink/70">{flavor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/FlavorShowcase.tsx
git commit -m "Adiciona componente FlavorShowcase"
```

---

### Task 8: Componente `WhyPopy`

**Files:**
- Create: `src/components/WhyPopy.tsx`

**Interfaces:**
- Consumes: `differentiators` de `@/lib/content` (Task 3)
- Produces: `WhyPopy()`, exportado de `@/components/WhyPopy`. Sem props. Consumido pelo Task 13.

- [ ] **Step 1: Criar `src/components/WhyPopy.tsx`**

```tsx
import { differentiators } from "@/lib/content";

export function WhyPopy() {
  return (
    <section id="por-que-popy" className="bg-olive/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-4xl text-ink">Por que Popy</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <div key={item.id} className="rounded-2xl bg-cream p-6 shadow-sm">
              <h3 className="font-serif text-xl text-terracotta">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/WhyPopy.tsx
git commit -m "Adiciona componente WhyPopy"
```

---

### Task 9: Componente `Partners`

**Files:**
- Create: `src/components/Partners.tsx` (substitui o antigo, com conteúdo totalmente novo)

**Interfaces:**
- Consumes: `testimonials` de `@/lib/content` (Task 3)
- Produces: `Partners()`, exportado de `@/components/Partners`. Sem props. Consumido pelo Task 13.

- [ ] **Step 1: Criar `src/components/Partners.tsx`**

```tsx
import { testimonials } from "@/lib/content";

export function Partners() {
  return (
    <section id="parceiros" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-4xl text-ink">Quem já é parceiro</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="rounded-2xl border border-ink/10 p-8">
              <p className="italic text-ink/80">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-ink/60">
                {item.author} — {item.business}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/Partners.tsx
git commit -m "Adiciona componente Partners"
```

---

### Task 10: Componente `HowItWorks`

**Files:**
- Create: `src/components/HowItWorks.tsx`

**Interfaces:**
- Consumes: `steps` de `@/lib/content` (Task 3)
- Produces: `HowItWorks()`, exportado de `@/components/HowItWorks`. Sem props. Consumido pelo Task 13.

- [ ] **Step 1: Criar `src/components/HowItWorks.tsx`**

```tsx
import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-olive/10 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-4xl text-ink">
          Como funciona a parceria
        </h2>
        <ol className="mt-14 space-y-10">
          {steps.map((step) => (
            <li key={step.id} className="flex gap-6">
              <span className="font-serif text-3xl text-terracotta">{step.number}</span>
              <div>
                <h3 className="font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-1 text-ink/70">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/HowItWorks.tsx
git commit -m "Adiciona componente HowItWorks"
```

---

### Task 11: Componente `ContactForm`

**Files:**
- Create: `src/components/ContactForm.tsx`

**Interfaces:**
- Consumes: tokens do Task 2
- Produces: `ContactForm()`, exportado de `@/components/ContactForm` (client component, `"use client"`). Sem props. Consumido pelo Task 13.

- [ ] **Step 1: Criar `src/components/ContactForm.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";

interface FormValues {
  nome: string;
  empresa: string;
  tipoEstabelecimento: string;
  telefone: string;
  cidade: string;
  mensagem: string;
}

const initialValues: FormValues = {
  nome: "",
  empresa: "",
  tipoEstabelecimento: "",
  telefone: "",
  cidade: "",
  mensagem: "",
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.nome.trim()) errors.nome = "Informe seu nome.";
  if (!values.empresa.trim()) errors.empresa = "Informe o nome da empresa.";
  if (!values.cidade.trim()) errors.cidade = "Informe a cidade.";
  if (!values.telefone.trim()) {
    errors.telefone = "Informe um telefone.";
  } else if (!PHONE_REGEX.test(values.telefone.trim())) {
    errors.telefone = "Informe um telefone válido, ex: (11) 91234-5678.";
  }
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof FormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section id="contato" className="px-6 py-24">
        <div className="mx-auto max-w-xl rounded-2xl bg-olive/10 p-10 text-center">
          <h2 className="font-serif text-3xl text-ink">Recebemos seu contato!</h2>
          <p className="mt-3 text-ink/70">
            Em breve nossa equipe vai falar com você sobre a parceria Popy.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="px-6 py-24">
      <div className="mx-auto max-w-xl">
        <h2 className="text-center font-serif text-4xl text-ink">Seja um parceiro</h2>
        <p className="mt-3 text-center text-ink/70">
          Preencha seus dados e nossa equipe entra em contato para falar sobre a
          parceria.
        </p>
        <form onSubmit={handleSubmit} noValidate className="mt-10 space-y-5">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-ink">
              Nome
            </label>
            <input
              id="nome"
              type="text"
              value={values.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-terracotta focus:outline-none"
            />
            {errors.nome && <p className="mt-1 text-sm text-red-700">{errors.nome}</p>}
          </div>
          <div>
            <label htmlFor="empresa" className="block text-sm font-medium text-ink">
              Empresa
            </label>
            <input
              id="empresa"
              type="text"
              value={values.empresa}
              onChange={(e) => handleChange("empresa", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-terracotta focus:outline-none"
            />
            {errors.empresa && (
              <p className="mt-1 text-sm text-red-700">{errors.empresa}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="tipoEstabelecimento"
              className="block text-sm font-medium text-ink"
            >
              Tipo de estabelecimento
            </label>
            <input
              id="tipoEstabelecimento"
              type="text"
              placeholder="Ex: mercado, conveniência, cafeteria"
              value={values.tipoEstabelecimento}
              onChange={(e) => handleChange("tipoEstabelecimento", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-terracotta focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-ink">
              Telefone/WhatsApp
            </label>
            <input
              id="telefone"
              type="tel"
              placeholder="(11) 91234-5678"
              value={values.telefone}
              onChange={(e) => handleChange("telefone", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-terracotta focus:outline-none"
            />
            {errors.telefone && (
              <p className="mt-1 text-sm text-red-700">{errors.telefone}</p>
            )}
          </div>
          <div>
            <label htmlFor="cidade" className="block text-sm font-medium text-ink">
              Cidade
            </label>
            <input
              id="cidade"
              type="text"
              value={values.cidade}
              onChange={(e) => handleChange("cidade", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-terracotta focus:outline-none"
            />
            {errors.cidade && (
              <p className="mt-1 text-sm text-red-700">{errors.cidade}</p>
            )}
          </div>
          <div>
            <label htmlFor="mensagem" className="block text-sm font-medium text-ink">
              Mensagem (opcional)
            </label>
            <textarea
              id="mensagem"
              rows={4}
              value={values.mensagem}
              onChange={(e) => handleChange("mensagem", e.target.value)}
              className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-terracotta focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-terracotta px-6 py-3 font-medium text-cream transition-colors hover:bg-terracotta/90"
          >
            Enviar contato
          </button>
        </form>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactForm.tsx
git commit -m "Adiciona componente ContactForm com validação client-side"
```

---

### Task 12: Componente `Footer`

**Files:**
- Create: `src/components/Footer.tsx` (substitui o antigo, com conteúdo totalmente novo)

**Interfaces:**
- Consumes: tokens do Task 2
- Produces: `Footer()`, exportado de `@/components/Footer`. Sem props. Consumido pelo Task 13.

- [ ] **Step 1: Criar `src/components/Footer.tsx`**

```tsx
export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-sm text-ink/60 md:flex-row md:justify-between">
        <span className="font-serif text-lg text-terracotta">Popy</span>
        <span>contato@popy.com.br · (11) 4000-0000</span>
        <span>&copy; {new Date().getFullYear()} Popy. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verificar tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Adiciona componente Footer"
```

---

### Task 13: Montar `src/app/page.tsx`

**Files:**
- Create: `src/app/page.tsx` (substitui o conteúdo gerado pelo scaffold)

**Interfaces:**
- Consumes: `Header` (Task 5), `Hero` (Task 6), `FlavorShowcase` (Task 7), `WhyPopy` (Task 8), `Partners` (Task 9), `HowItWorks` (Task 10), `ContactForm` (Task 11), `Footer` (Task 12)
- Produces: página completa em `/`

- [ ] **Step 1: Criar `src/app/page.tsx`**

```tsx
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FlavorShowcase } from "@/components/FlavorShowcase";
import { WhyPopy } from "@/components/WhyPopy";
import { Partners } from "@/components/Partners";
import { HowItWorks } from "@/components/HowItWorks";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <FlavorShowcase />
        <WhyPopy />
        <Partners />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Verificar tipos, lint e build completo**

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Expected: os três comandos terminam sem erro; `npm run build` termina com `Compiled successfully`.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "Monta a página inicial com todas as seções"
```

---

### Task 14: Verificação manual end-to-end

**Files:** nenhum (apenas verificação)

**Interfaces:**
- Consumes: página completa do Task 13
- Produces: confirmação de que o golden path funciona antes de considerar a página pronta

- [ ] **Step 1: Subir o servidor de desenvolvimento**

```bash
npm run dev
```

Expected: servidor sobe em `http://localhost:3000` sem erro no terminal.

- [ ] **Step 2: Checar o golden path no navegador**

Abrir `http://localhost:3000` e, na largura desktop:
- Confirmar que todas as seções aparecem na ordem: Header, Hero, Sabores, Por que Popy, Parceiros, Como funciona, Formulário de contato, Footer.
- Clicar em cada link do menu (Sabores, Por que Popy, Parceiros, Como funciona) e confirmar que rola até a seção correta.
- Tentar enviar o formulário vazio e confirmar que aparecem as mensagens de erro inline (nome, empresa, telefone, cidade).
- Preencher todos os campos obrigatórios com dados válidos (ex: telefone `(11) 91234-5678`) e enviar; confirmar que o formulário é substituído pela mensagem de confirmação.

- [ ] **Step 3: Checar responsividade mobile**

Redimensionar a janela/DevTools para ~375px de largura e confirmar que:
- O menu de navegação do Header colapsa (fica oculto, já que é `hidden md:flex`) sem quebrar o layout.
- Os grids de sabores, diferenciais e depoimentos empilham em coluna única.
- Nenhum texto ou elemento vaza horizontalmente da tela.

- [ ] **Step 4: Rodar checagem final de tipos e lint**

```bash
npx tsc --noEmit
npm run lint
```

Expected: sem erros.

- [ ] **Step 5: Encerrar o servidor de desenvolvimento**

Parar o processo do `npm run dev` (Ctrl+C ou encerrar o processo em background).

Nenhum commit neste task — é só verificação. Se algo falhar, corrigir no componente correspondente (task de origem) e recommitar lá.
