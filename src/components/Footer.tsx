export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-sm text-ink/60 md:flex-row md:justify-between">
        <span className="font-serif text-lg text-terracotta">Popy</span>
        <span>contato@popy.com.br · (11) 4000-0000</span>
        <span>&copy; {new Date().getFullYear()} Popy. Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}
