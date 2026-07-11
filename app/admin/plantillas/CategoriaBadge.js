const ETIQUETAS = {
  saludo: "Saludo",
  plan_gobierno: "Plan de gobierno",
  recordatorio: "Recordatorio",
  convocatoria: "Convocatoria",
  agradecimiento: "Agradecimiento",
  otro: "Otro",
};

const ESTILOS = {
  saludo: "bg-blue-50 text-blue-700",
  plan_gobierno: "bg-marino/10 text-marino",
  recordatorio: "bg-amber-50 text-amber-700",
  convocatoria: "bg-acento/10 text-acento-dark",
  agradecimiento: "bg-green-50 text-green-700",
  otro: "bg-neutral-100 text-neutral-600",
};

export default function CategoriaBadge({ categoria }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
        ESTILOS[categoria] || ESTILOS.otro
      }`}
    >
      {ETIQUETAS[categoria] || categoria}
    </span>
  );
}

export { ETIQUETAS };
