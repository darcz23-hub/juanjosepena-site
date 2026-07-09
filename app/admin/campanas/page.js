"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import EstadoBadge from "./EstadoBadge";
import NuevaCampanaForm from "./NuevaCampanaForm";

export default function CampanasPage() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  async function cargar() {
    setError("");
    try {
      const data = await api.listarCampanas();
      setDatos(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor");
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-marino">Campañas de WhatsApp</h1>
        {!mostrarForm && (
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-marino hover:bg-marino-light transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg"
          >
            + Nueva campaña
          </button>
        )}
      </div>

      {mostrarForm && (
        <div className="mb-8">
          <NuevaCampanaForm
            onCreada={() => {
              setMostrarForm(false);
              cargar();
            }}
            onCancelar={() => setMostrarForm(false)}
          />
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">
          {error}
        </p>
      )}

      {!datos && !error && <p className="text-sm text-neutral-400">Cargando...</p>}

      {datos && (
        <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Campaña</th>
                <th className="text-left px-4 py-3 font-medium">Estado</th>
                <th className="text-left px-4 py-3 font-medium">Destinatarios</th>
                <th className="text-left px-4 py-3 font-medium">Creada</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {datos.registros.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">
                    Aún no hay campañas creadas.
                  </td>
                </tr>
              )}
              {datos.registros.map((c) => (
                <tr key={c.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 font-medium text-neutral-800">{c.nombre}</td>
                  <td className="px-4 py-3">
                    <EstadoBadge estado={c.estado} />
                  </td>
                  <td className="px-4 py-3 text-neutral-600">{c.totalDestinatarios}</td>
                  <td className="px-4 py-3 text-neutral-500">
                    {new Date(c.creadoEn).toLocaleDateString("es-EC")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link href={`/admin/campanas/${c.id}`} className="text-marino hover:underline font-medium">
                      Ver
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
