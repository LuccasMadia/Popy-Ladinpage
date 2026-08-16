import Image from "next/image";

const navLinks = [
  { href: "#sabores", label: "Sabores" },
  { href: "#por-que-popy", label: "Por que Popy" },
  { href: "#parceiros", label: "Parceiros" },
  { href: "#como-funciona", label: "Como funciona" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-ink/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <a href="#top">
          <Image
            src="/images/popy-logo.png"
            alt="Popy Sucos"
            width={176}
            height={88}
            className="h-11 w-auto"
          />
        </a>
        <nav className="hidden gap-8 text-sm font-medium text-cream/80 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-popy-orange"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="rounded-full bg-popy-red px-5 py-2 text-sm font-semibold text-cream transition-colors hover:bg-popy-red-dark"
        >
          Seja um parceiro
        </a>
      </div>
    </header>
  );
}
