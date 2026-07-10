import "./globals.css";

export const metadata = {
  title: "Juan José Peña · Precandidato 2026",
  description:
    "Sitio oficial de Juan José Peña, precandidato en las Elecciones Seccionales del 29 de noviembre de 2026.",
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
