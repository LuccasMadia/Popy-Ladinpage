import { testimonials } from "@/lib/content";

export function Partners() {
  return (
    <section id="parceiros" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-4xl text-ink">Quem já é parceiro</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="rounded-2xl border border-ink/10 p-8">
              <p className="italic text-ink/80">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-sm text-ink/60">
                {item.author} — {item.business}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
