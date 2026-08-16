# Design: trocar seções escuras por tons claros

## Contexto

O site usa `--color-ink` (`#191507`) como fundo em 4 seções — Header, Hero,
HowItWorks e Footer — com texto `cream` por cima. O restante das seções
(FlavorShowcase, WhyPopy, Partners, ContactForm) já usa fundos claros
(`cream`, `white`, `popy-green/10`). O pedido é eliminar os fundos escuros
mantendo variação de tom entre seções, para preservar o ritmo visual da
página.

## Mudança de fundo por seção (ordem de aparição)

| Seção | Fundo atual | Novo fundo |
|---|---|---|
| Header (fixo) | `bg-ink/95` | `bg-cream/95` + `border-b border-ink/10` |
| Hero | `bg-ink` | `bg-white` |
| FlavorShowcase | `bg-cream` | *(sem mudança)* |
| WhyPopy | `bg-popy-green/10` | *(sem mudança)* |
| Partners | `bg-cream` | *(sem mudança)* |
| HowItWorks | `bg-ink` | `bg-popy-orange/10` |
| ContactForm | `bg-popy-green/10` | *(sem mudança)* |
| Footer | `bg-ink` | `bg-cream` + `border-t border-ink/10` |

`HowItWorks` recebe um tom diferente de `WhyPopy`/`ContactForm` (que já usam
`popy-green/10`) para não repetir o mesmo tom em seções próximas.

Header e Footer ganham uma borda sutil (`border-ink/10`) porque, com fundo
claro, não há mais contraste de cor natural que os separe do conteúdo
adjacente.

## Mudança de texto

Nas mesmas 4 seções, todas as ocorrências de `text-cream` (e variantes de
opacidade `/60`, `/70`, `/80`) tornam-se `text-ink` na mesma opacidade, para
manter contraste sobre os novos fundos claros.

## O que NÃO muda

- Botões e badges (`bg-popy-red`, `bg-popy-green`) continuam com
  `text-cream` — já são cores saturadas o suficiente para contraste.
- O overlay de texto sobre as fotos em `FlavorShowcase`
  (`text-cream` sobre gradiente colorido por sabor) fica como está: não é
  fundo de seção, é contraste sobre foto/gradiente.
- Os blobs decorativos do Hero (`#F2711C`, `#1F6D3A` com opacidade) ficam
  como estão — já funcionam sobre fundo claro.

## Arquivos afetados

- `src/components/Header.tsx`
- `src/components/Hero.tsx`
- `src/components/HowItWorks.tsx`
- `src/components/Footer.tsx`

Nenhuma mudança em `globals.css` ou nas variáveis de cor — só troca de
classes Tailwind nos componentes.
