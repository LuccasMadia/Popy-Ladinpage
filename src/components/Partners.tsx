import { siteConfig } from "@/lib/content";

export function Partners() {
  return (
    <section id="parceiros" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl text-brand-dark sm:text-4xl">
          Nossos parceiros e revendedores
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
        {siteConfig.partners.map((partner) => (
          <div
            key={partner.name}
            className="flex h-24 items-center justify-center rounded-2xl bg-white px-4 text-center ring-1 ring-brand-dark/5"
          >
            <span className="font-display text-brand-ink/60">{partner.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
