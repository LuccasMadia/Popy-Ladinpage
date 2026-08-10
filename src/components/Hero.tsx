"use client";

import { useState } from "react";
import Image from "next/image";
import { siteConfig } from "@/lib/content";
import { Header } from "@/components/Header";
import { ChevronIcon, ArrowDownIcon } from "@/components/icons";

export function Hero() {
  const { flavors } = siteConfig;
  const [index, setIndex] = useState(0);
  const flavor = flavors[index];

  const goTo = (delta: number) => {
    setIndex((current) => (current + delta + flavors.length) % flavors.length);
  };

  return (
    <section
      className="relative flex min-h-screen min-h-[100svh] flex-col overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, ${flavor.bgColorTop}, ${flavor.bgColorBottom})`,
      }}
    >
      {/* Product photo as background, when the flavor has one. Photos are
          shot at the iPhone SE viewport ratio, so a full-bleed cover fills
          the screen edge-to-edge with negligible cropping. */}
      {flavor.image && (
        <Image
          key={flavor.image}
          src={flavor.image}
          alt={`Popy ${flavor.name}`}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      )}

      <Header />

      {/* Legibility scrims — sit above the photo, below the overlaid content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/35 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-72 bg-gradient-to-t from-black/60 to-transparent"
      />

      {/* Flavor spotlight copy — mt-auto pins it to the bottom of the section
          now that the background photo is absolutely positioned and no
          longer occupies flex flow space. */}
      <div className="relative z-20 mt-auto px-4 pb-32 sm:px-6 sm:pb-28 md:px-16 md:pb-16">
        <div className="max-w-xs">
          <span className="inline-flex items-center rounded-full bg-white/90 px-4 py-1.5 text-xs font-semibold text-brand-dark">
            {flavor.name} · {siteConfig.hero.volume}
          </span>
          <p className="mt-4 text-sm text-white/90">{flavor.description}</p>
          <a
            href="#sabores"
            className="mt-5 inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-brand-dark transition-transform hover:-translate-y-0.5"
          >
            {siteConfig.hero.seeMoreCta}
          </a>
        </div>
      </div>

      {/* Carousel controls */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-4 sm:bottom-8">
        <button
          type="button"
          onClick={() => goTo(-1)}
          aria-label="Sabor anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
        >
          <ChevronIcon className="h-4 w-4" direction="left" />
        </button>
        <button
          type="button"
          onClick={() => goTo(1)}
          aria-label="Próximo sabor"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35"
        >
          <ChevronIcon className="h-4 w-4" direction="right" />
        </button>
      </div>

      {/* Scroll down */}
      <a
        href="#sabores"
        className="absolute bottom-8 right-6 z-20 hidden h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/35 sm:flex md:right-16"
        aria-label="Rolar para baixo"
      >
        <ArrowDownIcon className="h-5 w-5" />
      </a>
    </section>
  );
}
