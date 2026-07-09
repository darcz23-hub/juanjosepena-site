import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-marino text-white sticky top-0 z-40 shadow-md">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="font-bold text-lg tracking-tight">
          Juan José <span className="text-acento">Peña</span>
          <span className="block text-xs font-normal text-white/70">
            Alcalde de Portoviejo 2026
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-acento transition-colors">
            Inicio
          </Link>
          <Link href="/propuestas" className="hover:text-acento transition-colors">
            Propuestas
          </Link>
          <Link href="/contacto" className="hover:text-acento transition-colors">
            Contacto
          </Link>
        </nav>
      </div>
    </header>
  );
}
