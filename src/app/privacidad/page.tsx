import type { Metadata } from "next";
import GoldDivider from "@/components/ui/GoldDivider";

export const metadata: Metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad y tratamiento de datos de Expat507.",
};

const LAST_UPDATED = "16 de junio de 2025";

export default function PrivacidadPage() {
  return (
    <div className="pt-20 min-h-screen">
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <h1
          className="text-3xl sm:text-4xl font-bold text-white mb-3"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Política de Privacidad
        </h1>
        <p className="text-white/50 text-sm">Última actualización: {LAST_UPDATED}</p>
      </div>

      <GoldDivider />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 prose-expat">
        <h2>1. Información que recopilamos</h2>
        <p>
          Recopilamos información que tú nos proporcionas directamente, como nombre y dirección de
          email cuando te suscribes a nuestro newsletter, completas el formulario de consulta o
          nos contactas. También recopilamos automáticamente cierta información cuando visitas
          nuestro sitio (datos de navegación, páginas visitadas) a través de herramientas de
          analítica como Vercel Analytics.
        </p>

        <h2>2. Cómo usamos tu información</h2>
        <p>Usamos la información recopilada para:</p>
        <ul>
          <li>Enviarte el newsletter y contenido educativo sobre Panamá que solicitaste</li>
          <li>Responder a tus consultas y conectarte con profesionales de nuestra red cuando aplique</li>
          <li>Mejorar el contenido y funcionamiento de la plataforma</li>
          <li>Cumplir con obligaciones legales aplicables</li>
        </ul>

        <h2>3. Compartición de información</h2>
        <p>
          No vendemos ni alquilamos tu información personal a terceros. Podemos compartir tu
          información con profesionales de nuestra red privada únicamente cuando nos hayas
          solicitado expresamente ser conectado con ellos, y siempre con tu consentimiento previo.
        </p>

        <h2>4. Servicios de terceros</h2>
        <p>
          Utilizamos los siguientes servicios de terceros para operar la plataforma:
        </p>
        <ul>
          <li><strong>Supabase</strong> — Almacenamiento de datos (servidores en EE.UU.)</li>
          <li><strong>Resend</strong> — Envío de correos transaccionales</li>
          <li><strong>Vercel</strong> — Hosting y analítica</li>
          <li><strong>Anthropic</strong> — Procesamiento del asistente IA (las conversaciones no se almacenan de forma identificable)</li>
        </ul>

        <h2>5. Cookies y tecnologías similares</h2>
        <p>
          Utilizamos cookies técnicas esenciales para el funcionamiento del sitio y cookies de
          analítica anónima para entender cómo se usa la plataforma. No usamos cookies de
          publicidad ni rastreo de terceros.
        </p>

        <h2>6. Tus derechos</h2>
        <p>
          Tienes derecho a acceder, corregir o eliminar tu información personal. Para ejercer
          cualquiera de estos derechos, escríbenos a{" "}
          <a href="mailto:hola@expat507.com" className="text-[#C9A84C]">
            hola@expat507.com
          </a>
          . Responderemos en un plazo máximo de 30 días.
        </p>

        <h2>7. Cancelar suscripción</h2>
        <p>
          Puedes cancelar el newsletter en cualquier momento usando el enlace de cancelación
          incluido en cada email, o enviándonos un correo a hola@expat507.com.
        </p>

        <h2>8. Cambios a esta política</h2>
        <p>
          Podemos actualizar esta política ocasionalmente. Cuando lo hagamos, actualizaremos la
          fecha de última modificación en esta página. Para cambios significativos, notificaremos
          a los suscriptores por email.
        </p>

        <h2>9. Contacto</h2>
        <p>
          Si tienes preguntas sobre esta política de privacidad, contáctanos en{" "}
          <a href="mailto:hola@expat507.com" className="text-[#C9A84C]">
            hola@expat507.com
          </a>
          .
        </p>
      </div>
    </div>
  );
}
