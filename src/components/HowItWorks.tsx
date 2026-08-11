import { steps } from "@/lib/content";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-olive/10 px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center font-serif text-4xl text-ink">
          Como funciona a parceria
        </h2>
        <ol className="mt-14 space-y-10">
          {steps.map((step) => (
            <li key={step.id} className="flex gap-6">
              <span className="font-serif text-3xl text-terracotta">{step.number}</span>
              <div>
                <h3 className="font-serif text-xl text-ink">{step.title}</h3>
                <p className="mt-1 text-ink/70">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
