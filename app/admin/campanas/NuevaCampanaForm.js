"use client";

import { useEffect, useState } from "react";
import { api, ApiError } from "@/lib/api";

const VACIO = {
  nombre: "",
  plantillaNombre: "",
  plantillaIdioma: "es_EC",
  mensajePreview: "",
  filtroCanton: "",
  filtroParroquia: "",
  filtroSector: "",
  soloTelefonoValido: true,
};

export default function NuevaCampanaForm({ onCreada, onCancelar }) {
  const [form, setForm] = useState(VACIO);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [plantillas, setPlantillas] = useState([]);
  const [plantillaElegidaId, setPlantillaElegidaId] = useState("");

  useEffect(() => {
    api
      .listarPlantillas({ activa: true })
      .then((data) => setPlantillas(Array.isArray(data) ? data : data?.registros || []))
      .catch(() => setPlantillas([]));
  }, []);

  function set(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
  }

  function onElegirPlantilla(id) {
    setPlantillaElegidaId(id);
    if (!id) return;
    const p = plantillas.find((x) => String(x.id) === String(id));
    if (!p) return;
    setForm((f) => ({
      ...f,
      plantillaNombre: p.plantillaWhatsapp || f.plantillaNombre,
      mensajePreview: p.contenido || f.mensajePreview,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const payload = {
        nombre: form.nombre,
        plantillaNombre: form.plantillaNombre,
        plantillaIdioma: form.plantillaIdioma || undefined,
        mensajePreview: form.mensajePreview || undefined,
        filtroCanton: form.filtroCanton || undefined,
        filtroParroquia: form.filtroParroquia || undefined,
        filtroSector: form.filtroSector || undefined,
        soloTelefonoValido: form.soloTelefonoValido,
      };
      const creada = await api.crearCampana(payload);
      onCreada(creada);
      setForm(VACIO);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo crear la campaña");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4">
      <h2 className="font-semibold text-marino">Nueva campaña</h2>

      {plantillas.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Usar plantilla guardada (opcional)
          </label>
          <select
            value={plantillaElegidaId}
            onChange={(e) => onElegirPlantilla(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
          >
            <option value="">— Escribir manualmente —</option>
            {plantillas.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre}
              </option>
            ))}
          </select>
          <p className="text-xs text-neutral-400 mt-1">
            Autocompleta el nombre de plantilla de Meta y el mensaje de referencia. Puedes ajustarlos después.
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Nombre de la campaña</label>
          <input
            required
            value={form.nombre}
            onChange={(e) => set("nombre", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Ej. Convocatoria cierre de campaña"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Nombre de la plantilla aprobada en Meta
          </label>
          <input
            required
            value={form.plantillaNombre}
            onChange={(e) => set("plantillaNombre", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Ej. convocatoria_cierre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">Idioma de la plantilla</label>
          <input
            value={form.plantillaIdioma}
            onChange={(e) => set("plantillaIdioma", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
          />
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-neutral-700">
            <input
              type="checkbox"
              checked={form.soloTelefonoValido}
              onChange={(e) => set("soloTelefonoValido", e.target.checked)}
            />
            Solo enviar a celulares válidos (09XXXXXXXX)
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">
          Mensaje (referencia interna, no se envía tal cual)
        </label>
        <textarea
          value={form.mensajePreview}
          onChange={(e) => set("mensajePreview", e.target.value)}
          rows={2}
          className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
        />
      </div>

      <div>
        <p className="text-sm font-medium text-neutral-700 mb-2">
          Segmentación de destinatarios (dejar en blanco = todos)
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <input
            value={form.filtroCanton}
            onChange={(e) => set("filtroCanton", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Cantón"
          />
          <input
            value={form.filtroParroquia}
            onChange={(e) => set("filtroParroquia", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Parroquia"
          />
          <input
            value={form.filtroSector}
            onChange={(e) => set("filtroSector", e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-marino"
            placeholder="Sector"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={guardando}
          className="bg-marino hover:bg-marino-light transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg disabled:opacity-60"
        >
          {guardando ? "Guardando..." : "Guardar borrador"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
          className="text-sm text-neutral-500 hover:text-neutral-700 px-5 py-2.5"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
