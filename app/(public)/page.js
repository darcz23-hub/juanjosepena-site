import Link from "next/link";

const LOGROS = [
  {
    titulo: "Ordenamiento territorial e infraestructura",
    detalle:
      "Presidente de la Comisión Permanente de Ordenamiento Territorial, Infraestructura y Servicios Públicos del Concejo de Portoviejo; coordinó reformas al plan de ordenamiento que destrabaron la situación regulatoria de cerca de 3.500 predios.",
  },
  {
    titulo: "Planificación estratégica y presupuesto",
    detalle:
      "Vicepresidente de la Comisión Permanente de Planificación Estratégica y Presupuesto, e impulsor de la aplicación de la tasa de recolección de basura como mecanismo de financiamiento sostenible del servicio municipal.",
  },
];

const FORMACION = [
  "Odontólogo",
  "Especialista en Implantología",
  "Especialista en Cirugía y Traumatología Bucomaxilofacial",
  "Magíster en Pedagogía, mención Docencia e Innovación Educativa",
  "Magíster en Administración Pública",
  "Doctorando PhD en Ciencias Biomédicas",
];

const TRAYECTORIA_POLITICA = [
  "Concejal de Portoviejo",
  "Presidente de la Comisión Permanente de Ordenamiento Territorial, Infraestructura y Servicios Públicos",
  "Vicepresidente de la Comisión Permanente de Planificación Estratégica y Presupuesto",
];

export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-marino via-marino to-marino-dark text-white">
        <div className="max-w-5xl mx-auto px-4 py-20 md:py-28 flex flex-col items-start gap-6">
          <span className="inline-block bg-acento text-marino-dark font-semibold text-xs uppercase tracking-wide px-3 py-1 rounded-full">
            Precandidato 2026
          </span>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight max-w-2xl">
            Juan José Peña, experiencia técnica al servicio de Portoviejo
          </h1>
          <p className="text-white/85 max-w-xl text-lg">
            37 años, odontólogo, docente universitario y Concejal de
            Portoviejo. Precandidato rumbo a las Elecciones Seccionales
            del 29 de noviembre de 2026.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/propuestas"
              className="bg-acento hover:bg-acento-dark transition-colors text-marino-dark font-semibold px-6 py-3 rounded-lg"
            >
              Ver propuestas
            </Link>
            <Link
              href="/contacto"
              className="border border-white/40 hover:bg-white/10 transition-colors font-semibold px-6 py-3 rounded-lg"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-marino mb-4">Quién es Juan José Peña</h2>
        <p className="text-neutral-700 leading-relaxed max-w-3xl mb-10">
          Juan José Peña, 37 años, es odontólogo, especialista en
          Implantología y en Cirugía y Traumatología Bucomaxilofacial,
          docente e investigador de la Universidad San Gregorio de
          Portoviejo, Concejal del cantón y precandidato en las
          Elecciones Seccionales de 2026, enfocado en dar continuidad al
          desarrollo técnico del cantón.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-semibold text-marino mb-3">Formación académica</h3>
            <ul className="space-y-2">
              {FORMACION.map((item) => (
                <li key={item} className="text-sm text-neutral-700 flex gap-2">
                  <span className="text-acento mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-marino mb-3">Trayectoria política</h3>
            <ul className="space-y-2">
              {TRAYECTORIA_POLITICA.map((item) => (
                <li key={item} className="text-sm text-neutral-700 flex gap-2">
                  <span className="text-acento mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-marino mb-8">Trayectoria y logros</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {LOGROS.map((logro) => (
              <div key={logro.titulo} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-100">
                <h3 className="font-semibold text-marino mb-2">{logro.titulo}</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">{logro.detalle}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-neutral-400 mt-8">
            Fuentes: material oficial de campaña; El Diario (eldiario.ec), Primicias (primicias.ec).
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-marino mb-3">
          Súmate a esta candidatura
        </h2>
        <p className="text-neutral-600 max-w-xl mx-auto mb-6">
          Conoce el plan de gobierno o ponte en contacto con el equipo de
          campaña de Juan José Peña.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/propuestas"
            className="bg-marino hover:bg-marino-light transition-colors text-white font-semibold px-6 py-3 rounded-lg"
          >
            Plan de gobierno
          </Link>
          <Link
            href="/contacto"
            className="border border-marino text-marino hover:bg-marino hover:text-white transition-colors font-semibold px-6 py-3 rounded-lg"
          >
            Escríbenos
          </Link>
        </div>
      </section>
    </div>
  );
}
