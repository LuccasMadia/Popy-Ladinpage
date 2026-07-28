"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/content";
import { UserIcon, BagIcon, MenuIcon, CloseIcon } from "@/components/icons";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 md:px-10 md:py-6">
        <a href="#" className="font-display text-lg text-white sm:text-xl">
          {siteConfig.brand}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/85 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 text-white">
          <UserIcon className="hidden h-5 w-5 sm:block" />
          <div className="relative">
            <BagIcon className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-secondary text-[10px] font-semibold text-white">
              2
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className="ml-1 md:hidden"
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="mx-4 mt-1 flex flex-col gap-1 rounded-2xl bg-brand-dark/90 p-4 backdrop-blur md:hidden">
          {siteConfig.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/90 transition-colors hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
