export const metadata = {
  title: "Propuestas · Juan José Peña",
};

// NOTA: estas son propuestas de EJEMPLO/placeholder generadas para poder
// construir el sitio ya mismo. Deben reemplazarse por los ejes reales del
// plan de gobierno del candidato antes de publicar la página en producción.
const EJES = [
  {
    eje: "Obra pública y ordenamiento territorial",
    puntos: [
      "Dar continuidad a las reformas del plan de ordenamiento territorial para agilizar permisos y regularizar predios.",
      "Priorizar el mantenimiento vial en parroquias urbanas y rurales del cantón.",
      "Mejorar el sistema de alcantarillado y drenaje pluvial en sectores propensos a inundación.",
    ],
  },
  {
    eje: "Servicios públicos y gestión municipal",
    puntos: [
      "Fortalecer el servicio de recolección de basura con rutas más eficientes y transparencia en el uso de la tasa municipal.",
      "Digitalizar trámites municipales para reducir tiempos de atención al ciudadano.",
      "Auditar y optimizar el gasto corriente del municipio.",
    ],
  },
  {
    eje: "Seguridad ciudadana",
    puntos: [
      "Ampliar la cobertura de cámaras de videovigilancia en puntos críticos.",
      "Coordinar con la Policía Nacional planes de patrullaje en sectores de mayor incidencia delictiva.",
      "Impulsar programas de prevención del delito con enfoque juvenil.",
    ],
  },
  {
    eje: "Desarrollo económico y empleo",
    puntos: [
      "Apoyar al comercio popular y a los emprendedores portovejenses con capacitación y acceso a microcréditos.",
      "Promover ferias comerciales y turísticas que dinamicen la economía local.",
      "Facilitar la formalización de negocios mediante trámites municipales simplificados.",
    ],
  },
  {
    eje: "Salud, educación y bienestar social",
    puntos: [
      "Gestionar convenios con el Ministerio de Salud para mejorar la atención primaria en el cantón.",
      "Invertir en espacios deportivos y culturales para niños y jóvenes.",
      "Fortalecer los programas municipales de atención a adultos mayores y grupos vulnerables.",
    ],
  },
];

export default function PropuestasPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-10">
        <span className="inline-block bg-acento/20 text-acento-dark font-semibold text-xs uppercase tracking-wide px-3 py-1 rounded-full mb-3">
          Plan de gobierno
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-marino mb-3">
          Propuestas para Portoviejo
        </h1>
        <p className="text-neutral-600 max-w-2xl">
          Estos son los ejes preliminares de trabajo para la Alcaldía de
          Portoviejo. El plan de gobierno completo se actualizará en esta
          sección conforme avance la campaña.
        </p>
      </div>

      <div className="space-y-10">
        {EJES.map((seccion) => (
          <div key={seccion.eje} className="border-l-4 border-acento pl-6">
            <h2 className="text-xl font-bold text-marino mb-3">{seccion.eje}</h2>
            <ul className="space-y-2">
              {seccion.puntos.map((punto) => (
                <li key={punto} className="text-neutral-700 leading-relaxed flex gap-2">
                  <span className="text-acento-dark mt-1">•</span>
                  <span>{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
