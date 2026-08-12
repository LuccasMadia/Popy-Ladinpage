export function Footer() {
  return (
    <footer className="bg-ink px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-sm text-cream/60 md:flex-row md:justify-between">
        <span className="rounded-full bg-popy-green px-4 py-1 font-display text-lg text-cream">
          Popy
        </span>
        <span>contato@popy.com.br · (11) 4000-0000</span>
        <span>&copy; {new Date().getFullYear()} Popy. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
