# Nova landing page Popy — Editorial Orgânico

Data: 2026-08-11

## Contexto

O projeto anterior (Next.js) foi intencionalmente zerado para reconstrução do zero. A marca é a Popy, suco natural com três sabores: Acerola, Laranja com Acerola e Abacaxi com Hortelã. O último estado anterior (commit `7006d0a` no histórico do git) tinha uma seção de parceiros/depoimentos — reaproveitamos a ideia, não o código.

## Objetivo

Landing page cujo objetivo principal é **captação de leads B2B**: lojistas e distribuidores que querem revender os sucos Popy deixam contato através de um formulário. Não é uma página de venda direta ao consumidor final nem puramente institucional.

## Direção de design: Editorial Orgânico

Formas orgânicas (blobs), tipografia serif + sans, paleta terracota/oliva/creme, scroll-reveal sutil. Escolhida entre três opções (Editorial Orgânico, Grid Minimalista, Bento/Colagem) por equilibrar identidade visual forte com viabilidade sem fotografia de produto real ainda, e por priorizar clareza/confiança — importante numa página de conversão B2B.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Fonts via `next/font/google`: uma serif com personalidade para títulos (ex: Fraunces), uma sans neutra para corpo (ex: Inter ou Manrope)
- Página única (`src/app/page.tsx`) composta por componentes de seção em `src/components/`
- Dados de conteúdo (sabores, diferenciais, depoimentos, passos) tipados em `src/lib/content.ts`, injetados via props — permite editar copy sem tocar em JSX

## Sistema visual

- **Paleta:** fundo creme/off-white; terracota como cor primária (CTAs, acentos); oliva/verde-musgo como secundária; tom de tinta escura (não preto puro) para texto.
- **Formas:** sem fotos de produto por enquanto — cada sabor usa uma blob SVG customizada na cor associada à fruta (vermelho-acerola, laranja, verde-abacaxi/hortelã) como placeholder visual, substituível por `<Image>` depois sem alterar o layout. Divisores de seção usam curvas orgânicas em vez de linhas retas.
- **Ícones:** simples, desenhados à mão (inline SVG), não biblioteca de ícones genérica — mantém consistência com as blobs.

## Estrutura de página e componentes

1. **Header** — logo/wordmark, nav com âncoras (Sabores, Por que Popy, Parceiros, Como funciona), CTA "Seja um parceiro" que rola até o formulário. Sticky, fundo transparente que ganha cor ao rolar.
2. **Hero** — headline + subheadline (proposta: suco natural + parceria de revenda), CTA primário para o formulário, blob decorativa de fundo.
3. **FlavorShowcase** — grid de 3 cards (Acerola, Laranja com Acerola, Abacaxi com Hortelã), blob colorida + nome + descrição curta por sabor.
4. **WhyPopy** — 3-4 diferenciais (100% natural, sem conservantes, produção artesanal, embalagem sustentável), ícone + texto curto, em grid.
5. **Partners** — logos/depoimentos de parceiros que já revendem (estrutura de dados com espaço para citação + nome + estabelecimento).
6. **HowItWorks** — linha do tempo com 3-4 passos do processo de parceria (ex: Contato → Conversa/proposta → Primeira entrega).
7. **ContactForm** — campos: nome, empresa, tipo de estabelecimento, telefone/WhatsApp, cidade, mensagem.
8. **Footer** — logo, contato, redes sociais, copyright.

## Conteúdo/copy

Copy inicial em português escrita como parte da implementação (headline, descrições de sabor, diferenciais, passos, depoimentos placeholder), tom direto e caloroso voltado a lojista/distribuidor. Não é copy final de marketing — fica centralizada em `content.ts` para fácil revisão e ajuste posterior pelo usuário.

## Comportamento do formulário

- Validação client-side: nome, empresa, telefone e cidade são obrigatórios e bloqueiam o envio com mensagem de erro inline por campo; telefone valida formato básico.
- Sem integração de envio real (decisão explícita do usuário: "só UI por enquanto"). Ao submeter com sucesso na validação, a página troca o formulário por um estado de confirmação ("Recebemos seu contato, em breve falamos com você").
- A função de submit fica isolada para que plugar um backend real (Resend, Formspree, etc.) no futuro seja uma troca localizada, não um redesenho.

## Fora de escopo

- Fotografia real de produto (fica para depois, quando o usuário fornecer)
- Integração de envio de formulário com backend/e-mail real
- Testes automatizados (suíte de unit/e2e) — não se justifica para uma página de marketing estática

## Verificação

- `tsc` (checagem de tipos) e `eslint` sem erros
- Checagem visual manual rodando o dev server: percorrer todas as seções, preencher e enviar o formulário (golden path + validação de erro), e verificar responsividade em desktop e mobile
