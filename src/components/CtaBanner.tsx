import { siteConfig } from "@/lib/content";

export function CtaBanner() {
  const { cta } = siteConfig;

  return (
    <section id="comprar" className="mx-auto max-w-6xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-brand-dark px-6 py-12 text-center sm:rounded-[2.5rem] sm:px-16 sm:py-16">
        <div
          aria-hidden
          className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-brand-primary/30 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -right-10 -bottom-10 h-56 w-56 rounded-full bg-brand-accent/20 blur-3xl"
        />

        <div className="relative mx-auto max-w-xl">
          <h2 className="font-display text-3xl text-brand-cream sm:text-4xl">{cta.title}</h2>
          <p className="mt-4 text-brand-cream/80">{cta.subtitle}</p>
          <a
            href="#"
            className="mt-8 inline-flex rounded-full bg-brand-cream px-8 py-3.5 text-base font-semibold text-brand-dark transition-transform hover:-translate-y-0.5"
          >
            {cta.button}
          </a>
        </div>
      </div>
    </section>
  );
}
