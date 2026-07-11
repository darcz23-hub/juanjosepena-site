"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/lib/api";
import CategoriaBadge from "../CategoriaBadge";

const CATEGORIAS = [
  { value: "saludo", label: "Saludo" },
  { value: "plan_gobierno", label: "Plan de gobierno" },
  { value: "recordatorio", label: "Recordatorio" },
  { value: "convocatoria", label: "Convocatoria" },
  { value: "agradecimiento", label: "Agradecimiento" },
  { value: "otro", label: "Otro" },
];

export default function PlantillaDetallePage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [plantilla, setPlantilla] = useState(null);
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("saludo");
  const [contenido, setContenido] = useState("");
  const [plantillaWhatsapp, setPlantillaWhatsapp] = useState("");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensajeOk, setMensajeOk] = useState("");

  async function cargar() {
    setError("");
    try {
      const p = await api.obtenerPlantilla(id);
      setPlantilla(p);
      setNombre(p.nombre);
      setCategoria(p.categoria);
      setContenido(p.contenido);
      setPlantillaWhatsapp(p.plantillaWhatsapp || "");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor");
    }
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function onGuardar(e) {
    e.preventDefault();
    setError("");
    setMensajeOk("");
    setGuardando(true);
    try {
      const actualizada = await api.actualizarPlantilla(id, {
        nombre,
        categoria,
        contenido,
        plantillaWhatsapp: plantillaWhatsapp || undefined,
      });
      setPlantilla(actualizada);
      setMensajeOk("Cambios guardados.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo guardar la plantilla");
    } finally {
      setGuardando(false);
    }
  }

  async function onDesactivar() {
    if (!window.confirm("¿Desactivar esta plantilla? Dejará de aparecer en la biblioteca.")) return;
    setError("");
    try {
      await api.eliminarPlantilla(id);
      router.push("/admin/plantillas");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo desactivar la plantilla");
    }
  }

  if (error && !plantilla) {
    return <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>;
  }

  if (!plantilla) {
    return <p className="text-sm text-neutral-400">Cargando...</p>;
  }

  return (
    <div>
      <Link href="/admin/plantillas" className="text-sm text-marino hover:underline">
        ← Volver a plantillas
      </Link>

      <div className="flex items-center justify-between mt-4 mb-6">
        <h1 className="text-xl font-bold text-marino">{plantilla.nombre}</h1>
        <CategoriaBadge categoria={plantilla.categoria} />
      </div>

      <form onSubmit={onGuardar} className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4 max-w-3xl">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre interno</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
            >
              {CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Contenido del mensaje</label>
          <textarea
            required
            rows={6}
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
          />
          <p className="text-xs text-neutral-400 mt-1">
            Tip: usa <span className="font-mono">{"{{nombre}}"}</span> u otras variables entre llaves dobles para personalizar el envío.
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Nombre de plantilla aprobada en Meta (opcional)
          </label>
          <input
            type="text"
            value={plantillaWhatsapp}
            onChange={(e) => setPlantillaWhatsapp(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
        )}
        {mensajeOk && (
          <p className="text-sm text-green-700 bg-green-50 border border-green-100 rounded-lg px-4 py-3">{mensajeOk}</p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={guardando}
            className="bg-marino hover:bg-marino-light transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-60"
          >
            {guardando ? "Guardando..." : "Guardar cambios"}
          </button>
          <button
            type="button"
            onClick={onDesactivar}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50"
          >
            Desactivar plantilla
          </button>
        </div>
      </form>
    </div>
  );
}
