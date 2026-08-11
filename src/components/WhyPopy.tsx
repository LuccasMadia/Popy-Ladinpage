import { differentiators } from "@/lib/content";

export function WhyPopy() {
  return (
    <section id="por-que-popy" className="bg-olive/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-serif text-4xl text-ink">Por que Popy</h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => (
            <div key={item.id} className="rounded-2xl bg-cream p-6 shadow-sm">
              <h3 className="font-serif text-xl text-terracotta">{item.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
