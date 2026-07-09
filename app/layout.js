import "./globals.css";

export const metadata = {
  title: "Juan José Peña · Alcalde de Portoviejo 2026",
  description:
    "Sitio oficial de campaña de Juan José Peña, precandidato a la Alcaldía de Portoviejo por Movimiento Amigo (Lista 16) y Sí Podemos (Lista 72). Elecciones Seccionales, 29 de noviembre de 2026.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-EC">
      <body className="min-h-screen flex flex-col bg-white text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
