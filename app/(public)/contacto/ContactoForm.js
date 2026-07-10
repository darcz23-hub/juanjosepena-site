"use client";

import { useState } from "react";

const WHATSAPP_CAMPANA = "593992101743";
const EMAIL_CAMPANA = "drjuanjosepenavera@gmail.com";

export default function ContactoForm() {
    const [nombre, setNombre] = useState("");
    const [sector, setSector] = useState("");
    const [mensaje, setMensaje] = useState("");

  const textoWhatsapp = encodeURIComponent(
        `Hola, soy ${nombre || "___"} del sector ${sector || "___"}. ${mensaje || ""}`
      );
    const asuntoEmail = encodeURIComponent("Contacto - Campaña Juan José Peña");
    const cuerpoEmail = encodeURIComponent(
          `Nombre: ${nombre}\nSector: ${sector}\n\n${mensaje}`
        );

  return (
        <form
        className="space-y-4 bg-white border border-neutral-100 rounded-xl p-6 shadow-sm"
        onSubmit={(e) => e.preventDefault()}
      >
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Tu nombre"
          />
              </div>
        <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Sector / parroquia
              </label>
          <input
            type="text"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Ej. Colón, Andrés de Vera..."
          />
              </div>
        <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Mensaje
              </label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Escribe tu mensaje..."
          />
              </div>
        <div className="flex flex-wrap gap-3 pt-2">
                      <a
            href={`https://wa.me/${WHATSAPP_CAMPANA}?text=${textoWhatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
                        className="bg-marino hover:bg-marino-light transition-colors text-white font-semibold px-5 py-2.5 rounded-lg text-sm"
        >
                                    Enviar por WhatsApp
                          </a>
        <a
          href={`mailto:${EMAIL_CAMPANA}?subject=${asuntoEmail}&body=${cuerpoEmail}`}
          className="border border-marino text-marino hover:bg-marino hover:text-white transition-colors font-semibold px-5 py-2.5 rounded-lg text-sm"
        >
                      Enviar por correo
            </a>
            </div>
            </form>
  );
}
