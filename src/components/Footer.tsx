import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-ink px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-sm text-cream/60 md:flex-row md:justify-between">
        <Image
          src="/images/popy-logo.png"
          alt="Popy Sucos"
          width={176}
          height={88}
          className="h-9 w-auto"
        />
        <span>contato@popy.com.br · (11) 4000-0000</span>
        <span>&copy; {new Date().getFullYear()} Popy. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
