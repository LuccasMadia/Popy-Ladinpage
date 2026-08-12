"use client";

import { steps } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function HowItWorks() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section id="como-funciona" ref={scope} className="bg-ink px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2
          data-reveal
          className="text-center font-display text-4xl text-cream md:text-5xl"
        >
          Como funciona a parceria
        </h2>
        <ol data-reveal-stagger className="mt-14 space-y-10">
          {steps.map((step) => (
            <li key={step.id} className="flex gap-6">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-popy-red font-display text-2xl text-cream">
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-xl text-cream">{step.title}</h3>
                <p className="mt-1 text-cream/70">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
