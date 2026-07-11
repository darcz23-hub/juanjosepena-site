"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import CategoriaBadge from "./CategoriaBadge";
import NuevaPlantillaForm from "./NuevaPlantillaForm";

const FILTROS = [
  { value: "", label: "Todas" },
  { value: "saludo", label: "Saludo" },
  { value: "plan_gobierno", label: "Plan de gobierno" },
  { value: "recordatorio", label: "Recordatorio" },
  { value: "convocatoria", label: "Convocatoria" },
  { value: "agradecimiento", label: "Agradecimiento" },
  { value: "otro", label: "Otro" },
];

export default function PlantillasPage() {
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [categoria, setCategoria] = useState("");

  async function cargar() {
    setError("");
    try {
      const params = { activa: "true" };
      if (categoria) params.categoria = categoria;
      const data = await api.listarPlantillas(params);
      setDatos(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor");
    }
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoria]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-marino">Plantillas de mensajes</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Biblioteca de saludos, plan de gobierno, convocatorias y demás contenidos para usar en las campañas.
          </p>
        </div>
        {!mostrarForm && (
          <button
            onClick={() => setMostrarForm(true)}
            className="bg-marino hover:bg-marino-light transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg whitespace-nowrap"
          >
            + Nueva plantilla
          </button>
        )}
      </div>

      {mostrarForm && (
        <div className="mb-8">
          <NuevaPlantillaForm
            onCreada={() => {
              setMostrarForm(false);
              cargar();
            }}
            onCancelar={() => setMostrarForm(false)}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {FILTROS.map((f) => (
          <button
            key={f.value}
            onClick={() => setCategoria(f.value)}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${
              categoria === f.value
                ? "bg-marino text-white border-marino"
                : "border-neutral-300 text-neutral-600 hover:bg-neutral-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

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
                <th className="text-left px-4 py-3 font-medium">Nombre</th>
                <th className="text-left px-4 py-3 font-medium">Categoría</th>
                <th className="text-left px-4 py-3 font-medium">Contenido</th>
                <th className="text-left px-4 py-3 font-medium">Actualizada</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {datos.registros.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-neutral-400">
                    Aún no hay plantillas en esta categoría.
                  </td>
                </tr>
              )}
              {datos.registros.map((p) => (
                <tr key={p.id} className="border-t border-neutral-100 align-top">
                  <td className="px-4 py-3 font-medium text-neutral-800">{p.nombre}</td>
                  <td className="px-4 py-3">
                    <CategoriaBadge categoria={p.categoria} />
                  </td>
                  <td className="px-4 py-3 text-neutral-600 max-w-md">
                    <span className="line-clamp-2">{p.contenido}</span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500 whitespace-nowrap">
                    {new Date(p.actualizadoEn).toLocaleDateString("es-EC")}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <Link href={`/admin/plantillas/${p.id}`} className="text-marino hover:underline font-medium">
                      Editar
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
