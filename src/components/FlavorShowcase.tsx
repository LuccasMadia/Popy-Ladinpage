"use client";

import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { flavors, sizes } from "@/lib/content";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function FlavorShowcase() {
  const scope = useScrollReveal<HTMLElement>();

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-flavor-card]");
      if (cards.length === 0) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: scope.current,
          start: "top 80%",
          once: true,
        },
      });

      cards.forEach((card, index) => {
        tl.to(
          card,
          { scale: 1.08, duration: 0.4, ease: "power2.out" },
          index === 0 ? undefined : "+=0.15",
        );
      });

      tl.to(
        cards,
        { scale: 1, duration: 0.5, ease: "power2.inOut", clearProps: "transform" },
        "+=0.2",
      );
    },
    { scope },
  );

  return (
    <section id="sabores" ref={scope} className="bg-cream px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2
          data-reveal
          className="text-center font-display text-4xl text-ink md:text-5xl"
        >
          Nossos sabores
        </h2>
        <p data-reveal className="mx-auto mt-3 max-w-xl text-center text-ink/70">
          Três sabores, uma só promessa: fruta de verdade em cada garrafa.
        </p>
        <div data-reveal-stagger className="mt-14 grid gap-8 md:grid-cols-3">
          {flavors.map((flavor) => (
            <div
              key={flavor.id}
              data-flavor-card
              className="group relative overflow-hidden rounded-3xl shadow-lg transition-transform hover:-translate-y-2"
              style={{ backgroundColor: flavor.colorSoft }}
            >
              <div data-reveal-image className="relative aspect-[3/4] w-full">
                <Image
                  src={flavor.image}
                  alt={`Garrafa Popy sabor ${flavor.name}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div
                className="absolute inset-x-0 bottom-0 p-6"
                style={{
                  background: `linear-gradient(to top, ${flavor.colorSoft} 10%, transparent 90%)`,
                }}
              >
                <h3 className="font-display text-2xl text-cream">{flavor.name}</h3>
                <p className="mt-2 text-sm text-cream/85">{flavor.description}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="rounded-full border border-cream/40 bg-cream/10 px-3 py-1 text-xs text-cream"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
