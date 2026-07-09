# juanjosepena-site

Sitio de campaña de Juan José Peña (Alcaldía de Portoviejo, Elecciones Seccionales 2026).

Next.js 14 (App Router, JavaScript) + Tailwind CSS.

## Estructura

- `app/(public)/` — sitio público: inicio, `/propuestas`, `/contacto`.
- `app/admin/` — panel privado de campañas de WhatsApp (login + gestión), protegido con JWT contra la API de `simpatizantes-backend`.
- `lib/api.js` — cliente fetch hacia la API (usa `NEXT_PUBLIC_API_URL`).
- `lib/auth.js` — manejo de sesión (token JWT en localStorage).

## Desarrollo local

```bash
npm install
cp .env.example .env.local   # y ajustar NEXT_PUBLIC_API_URL si hace falta
npm run dev
```

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_API_URL` | URL base de la API backend (ej. `https://simpatizantes-backend.onrender.com/api`) |

## Despliegue (Vercel)

1. Importar este repo en Vercel.
2. Configurar `NEXT_PUBLIC_API_URL` en Project Settings > Environment Variables.
3. Conectar el dominio `juanjosepena.com` en Project Settings > Domains.
4. En el backend (Render), agregar `https://juanjosepena.com` a `CORS_ORIGINS`.

## Pendientes conocidos

- Contenido de `/propuestas` es un placeholder generado como punto de partida; reemplazar por el plan de gobierno real.
- Colores tomados del logo oficial de campaña (azul/rojo); falta incorporar el logo/fotos oficiales como archivos de imagen en `public/`.
- Formulario de `/contacto` usa enlaces `wa.me` / `mailto` (sin backend propio); actualizar el número de WhatsApp placeholder en `app/(public)/contacto/ContactoForm.js`.
