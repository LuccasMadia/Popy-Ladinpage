export interface Flavor {
  id: string;
  name: string;
  color: string;
  colorSoft: string;
  image: string;
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
    color: "#D81E2C",
    colorSoft: "#7A0E14",
    image: "/images/acerola.webp",
    description:
      "Suco puro de acerola, rico em vitamina C, com aquele azedinho que refresca na hora.",
  },
  {
    id: "laranja-com-acerola",
    name: "Laranja com Acerola",
    color: "#F2711C",
    colorSoft: "#D81E2C",
    image: "/images/laranja-acerola.webp",
    description:
      "A doçura da laranja equilibrada pela acidez da acerola — o queridinho dos clientes.",
  },
  {
    id: "abacaxi-com-hortela",
    name: "Abacaxi com Hortelã",
    color: "#8BC53F",
    colorSoft: "#1F6D3A",
    image: "/images/abacaxi-hortela.webp",
    description:
      "Abacaxi maduro com um toque de hortelã fresca, leve e perfeito para dias quentes.",
  },
];

export const sizes = ["300ml", "450ml", "900ml", "1700ml"];

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
