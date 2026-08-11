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
