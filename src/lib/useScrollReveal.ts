"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-reveal animations for a section, driven by data attributes so
 * markup stays declarative:
 *  - [data-reveal]         fades/slides a single element in
 *  - [data-reveal-image]   scales/fades an image-like element in
 *  - [data-reveal-stagger] animates its direct children in with a stagger
 */
export function useScrollReveal<T extends HTMLElement>(): RefObject<T | null> {
  const scope = useRef<T>(null);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-image]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          scale: 0.9,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((group) => {
        gsap.from(group.children, {
          opacity: 0,
          y: 36,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: group,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope },
  );

  return scope;
}
