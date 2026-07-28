import { siteConfig } from "@/lib/content";
import { featureIcons } from "@/components/icons";

export function Features() {
  return (
    <section id="beneficios" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-display text-3xl text-brand-dark sm:text-4xl">Por que escolher os produtos Popy</h2>
          <p className="mt-4 text-brand-ink">
            Nossos produtos são feitos para quem quer um suco natural e refrescante de verdade, sem abrir mão do sabor.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {siteConfig.features.map((feature) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons];
            return (
              <div key={feature.title} className="text-center sm:text-left">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary sm:mx-0">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl text-brand-dark">{feature.title}</h3>
                <p className="mt-2 text-sm text-brand-ink">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
