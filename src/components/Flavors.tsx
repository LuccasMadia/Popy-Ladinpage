import { siteConfig } from "@/lib/content";

export function Flavors() {
  return (
    <section id="sabores" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl text-brand-dark sm:text-4xl">
          Sabores Disponivéis
        </h2>
      </div>

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:mt-12 sm:gap-6">
        {siteConfig.flavors.map((flavor) => (
          <div
            key={flavor.name}
            className="group overflow-hidden rounded-3xl text-center shadow-sm ring-1 ring-brand-dark/5 transition-transform hover:-translate-y-1 hover:shadow-md"
            style={{ backgroundColor: flavor.bgColorTop }}
          >
            <div
              className="h-56 w-full transition-transform group-hover:scale-105"
              style={{ backgroundColor: flavor.bgColorTop }}
            />
            <div className="bg-white p-5">
              <h3 className="font-display text-lg text-brand-dark">{flavor.name}</h3>
              <p className="mt-2 text-sm text-brand-ink">{flavor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
