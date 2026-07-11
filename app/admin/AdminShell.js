"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { obtenerToken, obtenerUsuario, cerrarSesion } from "@/lib/auth";

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [listo, setListo] = useState(false);
  const [usuario, setUsuario] = useState(null);

  const esLogin = pathname === "/admin/login";

  useEffect(() => {
    if (esLogin) {
      setListo(true);
      return;
    }
    const token = obtenerToken();
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setUsuario(obtenerUsuario());
    setListo(true);
  }, [esLogin, router]);

  if (esLogin) return children;

  if (!listo) {
    return (
      <div className="min-h-screen flex items-center justify-center text-neutral-400 text-sm">
        Cargando...
      </div>
    );
  }

  const NAV_LINKS = [
    { href: "/admin/campanas", label: "Campañas" },
    { href: "/admin/plantillas", label: "Plantillas" },
  ];

  return (
    <div className="min-h-screen bg-neutral-100">
      <header className="bg-marino text-white">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin/campanas" className="font-semibold text-sm">
              Panel de campaña · Juan José Peña
            </Link>
            <nav className="hidden sm:flex items-center gap-4 text-sm">
              {NAV_LINKS.map((link) => {
                const activo = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={activo ? "text-acento font-semibold" : "text-white/70 hover:text-white"}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {usuario && <span className="text-white/70">{usuario.nombre}</span>}
            <button
              onClick={() => {
                cerrarSesion();
                router.replace("/admin/login");
              }}
              className="text-acento hover:underline"
            >
              Salir
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
