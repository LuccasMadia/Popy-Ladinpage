// Single source of truth for on-page copy. Rebranding the site should
// mostly mean editing this file plus the tokens in globals.css/layout.tsx.

export const siteConfig = {
  brand: "Popy",
  tagline: "Suco de fruta de verdade, direto do pomar",
  domain: "popy.com.br",

  nav: [
    { label: "Sabores", href: "#sabores" },
    { label: "Por que Popy", href: "#beneficios" },
    { label: "Depoimentos", href: "#depoimentos" },
  ],

  hero: {
    seeMoreCta: "Ver mais",
    volume: "450 ML",
  },

  // Each flavor drives both the hero spotlight and the flavors grid below.
  // bgColor is a fallback shown while `image` loads (and behind the Flavors
  // grid thumbnail), so keep it close to the photo's dominant tone.
  flavors: [
    {
      name: "Laranja",
      image: "/flavors/laranja.png",
      bgColor: "#F2900C",
      description: "Suco de laranja 100% natural",
    },
    {
      name: "Acerola",
      image: "/flavors/acerola.png",
      bgColor: "#C31F27",
      description: "Suco de acerola 100% natural.",
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

  testimonials: [
    {
      quote:
        "Trocamos os sucos de caixinha do escritório pela Popy e ninguém sentiu falta do açúcar de antes.",
      name: "Marina Alves",
      role: "Gerente de RH",
    },
    {
      quote: "O suco de laranja é o mais equilibrado que já experimentei nessa categoria.",
      name: "Diego Ferreira",
      role: "Cliente desde 2024",
    },
    {
      quote:
        "Rótulo, sabor, tudo combina. Virou item fixo da geladeira aqui de casa.",
      name: "Bia Nogueira",
      role: "Assinante do clube Popy",
    },
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
