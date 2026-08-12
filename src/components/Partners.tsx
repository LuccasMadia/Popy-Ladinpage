"use client";

import { testimonials } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Partners() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section id="parceiros" ref={scope} className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2
          data-reveal
          className="text-center font-display text-4xl text-ink md:text-5xl"
        >
          Quem já é parceiro
        </h2>
        <div data-reveal-stagger className="mt-14 grid gap-8 md:grid-cols-2">
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="rounded-2xl border-2 border-popy-green/20 bg-white p-8"
            >
              <p className="text-lg italic text-ink/80">&ldquo;{item.quote}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-popy-green">
                {item.author} — {item.business}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
