import { obtenerToken, cerrarSesion } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

class ApiError extends Error {
  constructor(mensaje, status) {
    super(mensaje);
    this.status = status;
  }
}

/**
 * Wrapper de fetch para la API del panel de administración. Agrega el
 * token JWT guardado en localStorage y normaliza los errores del backend
 * (que responde { error: "mensaje" }) en un ApiError con .status.
 */
async function apiFetch(path, { method = "GET", body, auth = true } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = obtenerToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401 && auth) {
    cerrarSesion();
    if (typeof window !== "undefined") window.location.href = "/admin/login";
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    throw new ApiError(data?.error || `Error ${res.status}`, res.status);
  }

  return data;
}

export const api = {
  login: (email, password) =>
    apiFetch("/auth/login", { method: "POST", body: { email, password }, auth: false }),

  listarCampanas: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/campanas${qs ? `?${qs}` : ""}`);
  },
  obtenerCampana: (id) => apiFetch(`/campanas/${id}`),
  crearCampana: (data) => apiFetch("/campanas", { method: "POST", body: data }),
  actualizarCampana: (id, data) => apiFetch(`/campanas/${id}`, { method: "PUT", body: data }),
  lanzarCampana: (id) => apiFetch(`/campanas/${id}/lanzar`, { method: "POST" }),
  pausarCampana: (id) => apiFetch(`/campanas/${id}/pausar`, { method: "POST" }),
  reanudarCampana: (id) => apiFetch(`/campanas/${id}/reanudar`, { method: "POST" }),
  cancelarCampana: (id) => apiFetch(`/campanas/${id}/cancelar`, { method: "POST" }),
  listarEnvios: (id, params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return apiFetch(`/campanas/${id}/envios${qs ? `?${qs}` : ""}`);
  },
};

export { ApiError };
