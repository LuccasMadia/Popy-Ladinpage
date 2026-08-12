"use client";

import { differentiators } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

const accents = ["#1F6D3A", "#D81E2C", "#F2711C", "#8BC53F"];

export function WhyPopy() {
  const scope = useScrollReveal<HTMLElement>();

  return (
    <section id="por-que-popy" ref={scope} className="bg-popy-green/10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="text-center font-display text-4xl text-ink md:text-5xl"
        >
          Por que Popy
        </h2>
        <div
          data-reveal-stagger
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {differentiators.map((item, index) => (
            <div
              key={item.id}
              className="rounded-2xl border-t-4 bg-cream p-6 shadow-sm"
              style={{ borderColor: accents[index % accents.length] }}
            >
              <h3
                className="font-display text-xl"
                style={{ color: accents[index % accents.length] }}
              >
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
