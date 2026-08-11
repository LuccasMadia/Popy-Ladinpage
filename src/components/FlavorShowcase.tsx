import { Blob } from "@/components/Blob";
import { flavors } from "@/lib/content";

export function FlavorShowcase() {
  return (
    <section id="sabores" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-4xl text-ink">Nossos sabores</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {flavors.map((flavor) => (
            <div key={flavor.id} className="text-center">
              <div className="relative mx-auto h-40 w-40">
                <Blob color={flavor.color} className="h-full w-full" />
              </div>
              <h3 className="mt-6 font-serif text-2xl text-ink">{flavor.name}</h3>
              <p className="mt-2 text-ink/70">{flavor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
