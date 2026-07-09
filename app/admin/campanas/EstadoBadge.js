const ESTILOS = {
  borrador: "bg-neutral-200 text-neutral-700",
  enviando: "bg-blue-100 text-blue-700",
  pausada: "bg-amber-100 text-amber-700",
  completada: "bg-green-100 text-green-700",
  cancelada: "bg-red-100 text-red-700",
};

export default function EstadoBadge({ estado }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
        ESTILOS[estado] || "bg-neutral-200 text-neutral-700"
      }`}
    >
      {estado}
    </span>
  );
}
