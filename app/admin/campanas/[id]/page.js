"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import EstadoBadge from "../EstadoBadge";

const ENVIO_ESTILOS = {
  pendiente: "bg-neutral-100 text-neutral-600",
  enviado: "bg-blue-50 text-blue-700",
  entregado: "bg-green-50 text-green-700",
  leido: "bg-green-100 text-green-800",
  fallido: "bg-red-50 text-red-700",
  opt_out: "bg-amber-50 text-amber-700",
};

export default function CampanaDetallePage({ params }) {
  const { id } = params;

  const [campana, setCampana] = useState(null);
  const [envios, setEnvios] = useState(null);
  const [error, setError] = useState("");
  const [accionando, setAccionando] = useState(false);

  async function cargar() {
    setError("");
    try {
      const [c, e] = await Promise.all([api.obtenerCampana(id), api.listarEnvios(id, { pageSize: 50 })]);
      setCampana(c);
      setEnvios(e);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo conectar con el servidor");
    }
  }

  useEffect(() => {
    cargar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function ejecutar(accion) {
    setAccionando(true);
    setError("");
    try {
      await accion();
      await cargar();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "No se pudo completar la acción");
    } finally {
      setAccionando(false);
    }
  }

  if (error && !campana) {
    return <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3">{error}</p>;
  }

  if (!campana) {
    return <p className="text-sm text-neutral-400">Cargando...</p>;
  }

  const conteos = campana.envios || {};

  return (
    <div>
      <Link href="/admin/campanas" className="text-sm text-marino hover:underline">
        ← Volver a campañas
      </Link>

      <div className="flex items-center justify-between mt-4 mb-6">
        <div>
          <h1 className="text-xl font-bold text-marino">{campana.nombre}</h1>
          <p className="text-sm text-neutral-500 mt-1">
            Plantilla: <span className="font-mono">{campana.plantillaNombre}</span> ({campana.plantillaIdioma})
          </p>
        </div>
        <EstadoBadge estado={campana.estado} />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-4 py-3 mb-4">{error}</p>
      )}

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <Metrica etiqueta="Destinatarios" valor={campana.totalDestinatarios} />
        <Metrica etiqueta="Enviados" valor={conteos.enviado || 0} />
        <Metrica etiqueta="Entregados" valor={conteos.entregado || 0} />
        <Metrica etiqueta="Fallidos" valor={conteos.fallido || 0} />
      </div>

      <div className="flex gap-3 mb-8">
        {["borrador", "pausada"].includes(campana.estado) && (
          <BotonAccion
            texto="Lanzar campaña"
            disabled={accionando}
            onClick={() => ejecutar(() => api.lanzarCampana(id))}
            className="bg-marino hover:bg-marino-light text-white"
          />
        )}
        {campana.estado === "enviando" && (
          <BotonAccion
            texto="Pausar"
            disabled={accionando}
            onClick={() => ejecutar(() => api.pausarCampana(id))}
            className="bg-amber-500 hover:bg-amber-600 text-white"
          />
        )}
        {["borrador", "enviando", "pausada"].includes(campana.estado) && (
          <BotonAccion
            texto="Cancelar"
            disabled={accionando}
            onClick={() => ejecutar(() => api.cancelarCampana(id))}
            className="border border-red-300 text-red-600 hover:bg-red-50"
          />
        )}
      </div>

      <h2 className="font-semibold text-marino mb-3">Envíos</h2>
      <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-neutral-500 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Simpatizante</th>
              <th className="text-left px-4 py-3 font-medium">Teléfono</th>
              <th className="text-left px-4 py-3 font-medium">Estado</th>
              <th className="text-left px-4 py-3 font-medium">Intentos</th>
            </tr>
          </thead>
          <tbody>
            {envios && envios.registros.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-400">
                  Sin envíos todavía.
                </td>
              </tr>
            )}
            {envios &&
              envios.registros.map((e) => (
                <tr key={e.id} className="border-t border-neutral-100">
                  <td className="px-4 py-3 text-neutral-800">{e.simpatizante?.nombre}</td>
                  <td className="px-4 py-3 text-neutral-600">{e.telefono}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                        ENVIO_ESTILOS[e.estado] || "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {e.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{e.intentos}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {envios && envios.total > envios.registros.length && (
        <p className="text-xs text-neutral-400 mt-2">
          Mostrando {envios.registros.length} de {envios.total} envíos.
        </p>
      )}
    </div>
  );
}

function Metrica({ etiqueta, valor }) {
  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4">
      <p className="text-xs text-neutral-500 uppercase tracking-wide">{etiqueta}</p>
      <p className="text-2xl font-bold text-marino mt-1">{valor}</p>
    </div>
  );
}

function BotonAccion({ texto, onClick, disabled, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors disabled:opacity-60 ${className}`}
    >
      {texto}
    </button>
  );
}

