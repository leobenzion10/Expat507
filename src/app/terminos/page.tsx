import type { Metadata } from "next";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Términos de Uso",
  description: "Términos y condiciones de uso de la plataforma Expat507.",
};

const LAST_UPDATED = "16 de junio de 2025";

export default function TerminosPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Términos de Uso
        </h1>
        <p className="text-white/50 text-sm">Última actualización: {LAST_UPDATED}</p>
      </div>

      <GoldDivider />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose-expat">
        <h2>1. Aceptación de los términos</h2>
        <p>
          Al acceder y usar Expat507 (expat507.com), aceptas estos términos de uso. Si no estás
          de acuerdo con alguna parte de ellos, por favor no uses la plataforma.
        </p>

        <h2>2. Naturaleza del servicio</h2>
        <p>
          Expat507 es una plataforma de contenido educativo e informativo sobre vida, inversión
          y migración en Panamá. Todo el contenido publicado, incluyendo guías, artículos y las
          respuestas del asistente IA, tiene carácter <strong>informativo y educativo general</strong>.
        </p>
        <p>
          <strong>Expat507 no es una firma de abogados, asesoría financiera, ni agencia
          inmobiliaria o migratoria.</strong> El contenido de la plataforma no constituye
          asesoría legal, fiscal, financiera ni de inversión. Siempre consulta con un profesional
          calificado antes de tomar decisiones basadas en información de esta plataforma.
        </p>

        <h2>3. Asistente IA</h2>
        <p>
          El asistente de inteligencia artificial de Expat507 proporciona información general
          y educativa. Sus respuestas pueden contener errores o estar desactualizadas. No debes
          basar decisiones legales, financieras o migratorias exclusivamente en las respuestas
          del asistente.
        </p>

        <h2>4. Servicio de referidos</h2>
        <p>
          Cuando conectamos usuarios con profesionales de nuestra red privada, actuamos como
          intermediario de referido. No somos parte de la relación de servicio entre el usuario
          y el profesional, y no asumimos responsabilidad por los servicios que el profesional
          provea.
        </p>

        <h2>5. Propiedad intelectual</h2>
        <p>
          Todo el contenido de Expat507 —textos, diseños, imágenes y código— es propiedad de
          Expat507 o sus licenciantes. Queda prohibida su reproducción, distribución o uso
          comercial sin autorización escrita previa.
        </p>

        <h2>6. Limitación de responsabilidad</h2>
        <p>
          Expat507 no será responsable por daños directos, indirectos, incidentales o
          consecuentes derivados del uso o incapacidad de usar la plataforma, o de decisiones
          tomadas basándose en el contenido publicado.
        </p>

        <h2>7. Cambios al servicio</h2>
        <p>
          Nos reservamos el derecho de modificar, suspender o discontinuar cualquier parte de
          la plataforma en cualquier momento sin notificación previa.
        </p>

        <h2>8. Ley aplicable</h2>
        <p>
          Estos términos se rigen por las leyes de la República de Panamá. Cualquier disputa
          será sometida a los tribunales competentes de la Ciudad de Panamá.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Para preguntas sobre estos términos, escríbenos a{" "}
          <a href="mailto:hola@expat507.com" className="text-[#C9A84C]">
            hola@expat507.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
