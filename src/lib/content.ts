// Single source of truth for on-page copy. Rebranding the site should
// mostly mean editing this file plus the tokens in globals.css/layout.tsx.

export const siteConfig = {
  brand: "Popy",
  tagline: "Suco de fruta de verdade, direto do pomar",
  domain: "popy.com.br",

  nav: [
    { label: "Sabores", href: "#sabores" },
    { label: "Por que Popy", href: "#beneficios" },
    { label: "Parceiros", href: "#parceiros" },
  ],

  hero: {
    seeMoreCta: "Ver mais",
    volume: "450 ML",
  },

  // Each flavor drives both the hero spotlight and the flavors grid below.
  // bgColorTop/bgColorBottom paint the gradient/swatch standing in for
  // flavors that don't have a product photo (`image`) yet.
  flavors: [
    {
      name: "Laranja",
      bgColorTop: "#AA2B00",
      bgColorBottom: "#D75401",
      description: "Suco de laranja 100% natural",
    },
    {
      name: "Acerola",
      bgColorTop: "#6C0201",
      bgColorBottom: "#940201",
      description: "Suco de acerola 100% natural",
    },
    {
      name: "Laranja com Acerola",
      bgColorTop: "#CE3000",
      bgColorBottom: "#E94201",
      description: "Suco de laranja com acerola 100% natural",
    },
    {
      name: "Abacaxi com Hortelã",
      bgColorTop: "#2C4C01",
      bgColorBottom: "#879302",
      description: "Suco de abacaxi com hortelã 100% natural",
    },
  ],

  features: [
    {
      title: "Infredientes frescos",
      description:
        "Nada de concentrado ou aroma artificial, só ingredientes 100% naturais da melhor qualidade.",
      icon: "leaf",
    },
    {
      title: "Baixa quantidae de açúcar",
      description:
        "Doçura equilibrada pela própria fruta e sem abusar do açúcar, para preservar sua saúde.",
      icon: "drop",
    },
    {
      title: "Sem conservantes",
      description:
        "Só fruta, água e açúcar. nada de aditivos para prolongar validade artificialmente.",
      icon: "bubble",
    },
  ],

  // Placeholder names until we have real partner/reseller logos to swap in.
  partners: [
    { name: "Parceiro 1" },
    { name: "Parceiro 2" },
    { name: "Parceiro 3" },
    { name: "Parceiro 4" },
  ],

  cta: {
    title: "Pronto para trocar o suco de caixinha?",
    subtitle: "Receba um pack degustação com os sabores Popy em casa.",
    button: "Quero meu pack degustação",
  },

  footer: {
    description:
    "Suco 100% natural de fruta. Feito para quem quer um suco natutal e refrescante sem excesso de açúcar.",
    columns: [
      {
        title: "Produto",
        links: ["Sabores", "Assinatura", "Onde encontrar"],
      },
      {
        title: "Empresa",
        links: ["Sobre", "Sustentabilidade", "Carreiras"],
      },
      {
        title: "Suporte",
        links: ["Contato", "Perguntas frequentes", "Trocas e devoluções"],
      },
    ],
  },
};

export type SiteConfig = typeof siteConfig;
