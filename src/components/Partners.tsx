"use client";

import { partners } from "@/lib/content";
import { LogoLoop } from "@/components/LogoLoop";
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
        <div className="mt-14">
          <LogoLoop items={partners} />
        </div>
      </div>
    </section>
  );
}
