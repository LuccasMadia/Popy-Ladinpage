# Logo em imagem na navbar — design

## Objetivo
Substituir o texto "Popy" (fonte Lobster) e a pílula verde da navbar por uma imagem de logo fornecida pelo usuário (script "Popy" + "SUCOS" + folha, laranja/verde).

## Asset
Imagem original tinha fundo preto sólido (sem transparência). Processada:
- Fundo preto removido via flood-fill a partir das bordas (preserva traços pretos internos das letras, que não são conectados ao fundo externo).
- Recortada para a bounding box do conteúdo opaco (1568×786px, sem margens transparentes).
- Salva em `public/images/popy-logo.png`.

## Header.tsx
O `<a href="#top">` que hoje tem `className="logo-popy rounded-full bg-popy-green px-4 py-1.5"` e o texto "Popy" passa a conter um `next/image`:

```tsx
<a href="#top">
  <Image src="/images/popy-logo.png" alt="Popy Sucos" width={176} height={88} className="h-11 w-auto" />
</a>
```

Sem pílula, sem padding, sem cor de fundo — só a imagem, em `h-11` (44px de altura, largura proporcional automática via `w-auto`).

## Limpeza de código morto
Depois da troca, nada mais usa a fonte `Lobster` nem a classe `.logo-popy`:
- Remove `Lobster` de `src/app/layout.tsx` (import, declaração `lobster`, uso em `className`).
- Remove `.logo-popy` de `src/app/globals.css`.

## Escopo
- Só o logo da navbar (`Header.tsx`) muda. O logo em texto do Footer não é tocado.
