"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { differentiators } from "@/lib/content";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const accents = ["#1F6D3A", "#D81E2C", "#F2711C", "#8BC53F"];

export function WhyPopy() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-reveal]", {
        opacity: 0,
        y: 36,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "[data-reveal]",
          start: "top 88%",
          toggleActions: "play none none reverse",
        },
      });

      const grid = scope.current?.querySelector("[data-why-grid]");
      if (!grid) return;

      const cards = gsap.utils.toArray<HTMLElement>("[data-why-card]", grid);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      cards.forEach((card, index) => {
        const bar = card.querySelector<HTMLElement>("[data-why-bar]");
        const bubble = card.querySelector<HTMLElement>("[data-why-bubble]");
        if (!bar || !bubble) return;

        tl.fromTo(
          bar,
          { opacity: 0, scaleX: 0 },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.35,
            ease: "power2.out",
            transformOrigin: "left",
          },
          index * 0.28,
        ).fromTo(
          bubble,
          { opacity: 0, scaleY: 0 },
          {
            opacity: 1,
            scaleY: 1,
            duration: 0.6,
            ease: "power3.out",
            transformOrigin: "top",
          },
          "-=0.15",
        );
      });
    },
    { scope },
  );

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
          data-why-grid
          className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {differentiators.map((item, index) => (
            <div key={item.id} data-why-card>
              <span
                data-why-bar
                className="block h-2 w-full rounded-full"
                style={{ backgroundColor: accents[index % accents.length] }}
              />
              <div
                data-why-bubble
                className="-mt-1 rounded-2xl bg-cream p-6 shadow-sm"
              >
                <h3
                  className="font-display text-xl"
                  style={{ color: accents[index % accents.length] }}
                >
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-ink/70">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
