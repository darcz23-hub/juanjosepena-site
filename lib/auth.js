const TOKEN_KEY = "jjp_admin_token";
const USUARIO_KEY = "jjp_admin_usuario";

export function guardarSesion(token, usuario) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
}

export function obtenerToken() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function obtenerUsuario() {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USUARIO_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function cerrarSesion() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USUARIO_KEY);
}
