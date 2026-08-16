"use client";

import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Blob } from "@/components/Blob";

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-hero-badge]", { opacity: 0, y: -16, duration: 0.6 })
        .from(
          "[data-hero-title] > span",
          { opacity: 0, y: 40, duration: 0.9, stagger: 0.12 },
          "-=0.3",
        )
        .from("[data-hero-copy]", { opacity: 0, y: 24, duration: 0.8 }, "-=0.5")
        .from("[data-hero-cta]", { opacity: 0, y: 16, duration: 0.6 }, "-=0.5")
        .from(
          "[data-hero-image]",
          { opacity: 0, scale: 0.85, rotate: -8, duration: 1.1 },
          "-=0.9",
        );

      gsap.to("[data-hero-image]", {
        y: -14,
        duration: 2.6,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: tl.duration(),
      });
    },
    { scope },
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const timer = setTimeout(() => {
      video.play().catch(() => {});
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="top"
      ref={scope}
      className="relative overflow-hidden bg-ink px-6 pb-20 pt-32 md:pt-40"
    >
      <Blob
        color="#F2711C"
        className="absolute -left-40 top-0 -z-0 h-[420px] w-[420px] opacity-20"
      />
      <Blob
        color="#1F6D3A"
        className="absolute -right-32 bottom-0 -z-0 h-[460px] w-[460px] opacity-25"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span
            data-hero-badge
            className="inline-block rounded-full bg-popy-red px-4 py-1 text-xs font-bold uppercase tracking-wide text-cream"
          >
            Suco 100% natural
          </span>
          <h1
            data-hero-title
            className="mt-6 font-display text-5xl leading-[1.05] text-cream md:text-6xl"
          >
            <span className="block">Suco de verdade, direto da fruta</span>
            <span className="block">para o seu ponto de venda</span>
          </h1>
          <p data-hero-copy className="mt-6 text-lg text-cream/70">
            A Popy produz sucos naturais, sem conservantes, prontos para encantar os
            clientes do seu estabelecimento. Vire um parceiro Popy e leve esse sabor
            para o seu negócio.
          </p>
          <a
            data-hero-cta
            href="#contato"
            className="mt-10 inline-block rounded-full bg-popy-green px-8 py-3 text-base font-semibold text-cream transition-transform hover:scale-105 hover:bg-popy-green-light"
          >
            Quero ser parceiro
          </a>
        </div>
        <div className="relative mx-auto w-full max-w-xs md:max-w-sm">
          <div
            data-hero-image
            className="aspect-[9/16] rotate-3 overflow-hidden rounded-[2rem] shadow-2xl shadow-black/50 transition-transform hover:rotate-0"
          >
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              muted
              playsInline
              preload="auto"
              aria-label="Splash de suco Popy sabor Acerola"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
