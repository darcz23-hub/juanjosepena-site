"use client";

import { useState } from "react";
import { api, ApiError } from "@/lib/api";

const CATEGORIAS = [
  { value: "saludo", label: "Saludo" },
  { value: "plan_gobierno", label: "Plan de gobierno" },
  { value: "recordatorio", label: "Recordatorio" },
  { value: "convocatoria", label: "Convocatoria" },
  { value: "agradecimiento", label: "Agradecimiento" },
  { value: "otro", label: "Otro" },
];

export default function NuevaPlantillaForm({ onCreada, onCancelar }) {
  const [nombre, setNombre] = useState("");
  const [categoria, setCategoria] = useState("saludo");
  const [contenido, setContenido] = useState("");
  const [plantillaWhatsapp, setPlantillaWhatsapp] = useState("");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      await api.crearPlantilla({
        nombre,
        categoria,
        contenido,
        plantillaWhatsapp: plantillaWhatsapp || undefined,
      });
      onCreada();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear la plantilla");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-4"
    >
      <h2 className="font-semibold text-marino">Nueva plantilla de mensaje</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre interno</label>
          <input
            type="text"
            required
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Saludo de bienvenida"
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
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Contenido del mensaje
        </label>
        <textarea
          required
          rows={5}
          value={contenido}
          onChange={(e) => setContenido(e.target.value)}
          placeholder="Escribe el mensaje. Puedes usar {{nombre}} para personalizarlo por simpatizante."
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
          placeholder="Ej. saludo_bienvenida_es"
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-marino"
        />
        <p className="text-xs text-neutral-400 mt-1">
          Solo si ya existe una plantilla equivalente aprobada en WhatsApp Business Platform. Si no, déjalo en blanco por ahora.
        </p>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={guardando}
          className="bg-marino hover:bg-marino-light transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-60"
        >
          {guardando ? "Guardando..." : "Guardar plantilla"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="text-sm font-semibold px-5 py-2.5 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
