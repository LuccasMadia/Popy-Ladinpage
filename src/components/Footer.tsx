import { siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-brand-dark/10 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="font-display text-2xl text-brand-dark">{siteConfig.brand}</div>
            <p className="mt-3 max-w-xs text-sm text-brand-ink">
              {siteConfig.footer.description}
            </p>
          </div>

          {siteConfig.footer.columns.map((column) => (
            <div key={column.title}>
              <h4 className="font-display text-sm text-brand-dark">{column.title}</h4>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-brand-ink hover:text-brand-primary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-brand-dark/10 pt-6 text-xs text-brand-ink/70">
          © {new Date().getFullYear()} {siteConfig.brand}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
