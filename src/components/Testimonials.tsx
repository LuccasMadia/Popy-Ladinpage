import { siteConfig } from "@/lib/content";

export function Testimonials() {
  return (
    <section id="depoimentos" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="font-display text-3xl text-brand-dark sm:text-4xl">
          Quem experimentou, ficou
        </h2>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {siteConfig.testimonials.map((testimonial) => (
          <figure
            key={testimonial.name}
            className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-brand-dark/5"
          >
            <blockquote className="text-brand-ink">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-5">
              <div className="font-display text-brand-dark">{testimonial.name}</div>
              <div className="text-sm text-brand-ink/70">{testimonial.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
