export default function Footer() {
  return (
    <footer className="bg-marino-dark text-white/80 text-sm mt-16">
      <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>
          © {new Date().getFullYear()} Juan José Peña · Alcalde de Portoviejo.
          Movimiento Amigo (Lista 16) · Sí Podemos (Lista 72).
        </p>
        <p className="text-white/60">Elecciones Seccionales · 29 de noviembre de 2026</p>
      </div>
    </footer>
  );
}
