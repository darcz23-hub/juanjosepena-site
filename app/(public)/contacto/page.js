import ContactoForm from "./ContactoForm";

export const metadata = {
  title: "Contacto · Juan José Peña",
};

export default function ContactoPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-marino mb-3">
        Contacto
      </h1>
      <p className="text-neutral-600 mb-10">
        ¿Tienes una inquietud sobre tu sector o quieres sumarte al equipo de
        campaña? Escríbenos.
      </p>
      <ContactoForm />
    </div>
  );
}
