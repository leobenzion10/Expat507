import Link from "next/link";
import GoldDivider from "@/components/ui/GoldDivider";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Nosotros",
  description:
    "Expat507 es la plataforma de referencia para expatriados e inversionistas que quieren establecerse o invertir en Panamá con claridad y confianza.",
};

export default function SobreNosotrosPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#C9A84C]" />
          <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
            Nuestra Historia
          </span>
          <div className="h-px w-10 bg-[#C9A84C]" />
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sobre Expat507
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Nacimos de la frustración de no encontrar información honesta y
          actualizada sobre Panamá para extranjeros.
        </p>
      </div>

      <GoldDivider />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        {/* Story */}
        <div className="prose-expat max-w-none mb-16">
          <h2
            className="text-2xl font-bold text-[#0A1628] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Por qué existe Expat507?
          </h2>
          <p className="text-[#374151] leading-relaxed mb-5">
            Panamá es uno de los destinos más atractivos del mundo para
            expatriados, inversionistas y familias que buscan estabilidad,
            calidad de vida y un sistema tributario favorable. Sin embargo, la
            información disponible en internet es fragmentada, desactualizada o
            directamente incorrecta.
          </p>
          <p className="text-[#374151] leading-relaxed mb-5">
            Expat507 nació para cambiar eso. Creamos una plataforma donde
            encontrarás información real, actualizada y contextualizada sobre
            todos los aspectos de vivir e invertir en Panamá: desde qué visa
            aplica a tu caso hasta qué banco es más fácil para no residentes,
            qué barrio se adapta a tu estilo de vida o cómo estructurar tu
            patrimonio de manera eficiente.
          </p>
          <p className="text-[#374151] leading-relaxed">
            Nuestro modelo es simple: te damos la información para que puedas
            tomar decisiones inteligentes, y cuando estés listo para dar el
            siguiente paso, te conectamos con los profesionales correctos de
            nuestra red privada de aliados: abogados, agentes inmobiliarios,
            asesores financieros y bancarios con trayectoria probada.
          </p>
        </div>

        <GoldDivider className="mb-16" />

        {/* Values */}
        <div className="mb-16">
          <h2
            className="text-2xl font-bold text-[#0A1628] mb-8 text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lo que nos diferencia
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🔍",
                title: "Información verificada",
                desc: "Toda nuestra información pasa por revisión de profesionales activos en el mercado panameño.",
              },
              {
                icon: "🤝",
                title: "Sin conflictos de interés",
                desc: "No somos una agencia de migración ni una inmobiliaria. Nuestro interés es que tomes la mejor decisión.",
              },
              {
                icon: "🔄",
                title: "Actualización constante",
                desc: "Panamá cambia. Nuestras guías se actualizan con cada cambio legislativo relevante.",
              },
              {
                icon: "🌐",
                title: "Red privada de aliados",
                desc: "Cuando necesites un profesional, te conectamos con quien conocemos personalmente y en quien confiamos.",
              },
            ].map((v) => (
              <div
                key={v.title}
                className="bg-[#F4F6F9] rounded-2xl p-6"
              >
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3
                  className="font-bold text-[#0A1628] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <GoldDivider className="mb-16" />

        {/* Model */}
        <div className="mb-16">
          <h2
            className="text-2xl font-bold text-[#0A1628] mb-5"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Nuestro modelo de negocio
          </h2>
          <div className="bg-[#FBF6EC] border border-[#C9A84C]/30 rounded-2xl p-7">
            <p className="text-[#374151] leading-relaxed mb-4">
              Expat507 funciona como una plataforma de contenido y referidos. No
              cobramos ni membresías ni honorarios a los usuarios. La plataforma
              es gratuita para todos.
            </p>
            <p className="text-[#374151] leading-relaxed mb-4">
              Cuando conectamos a un usuario con un profesional de nuestra red
              privada y se concreta una relación de servicio, el profesional
              comparte con nosotros una comisión de referido. Esto nos permite
              mantener la plataforma libre de costo para los usuarios.
            </p>
            <p className="text-[#374151] leading-relaxed">
              <strong className="text-[#0A1628]">¿Afecta esto a los profesionales que recomendamos?</strong>{" "}
              No. Solo trabajamos con profesionales que han demostrado calidad en
              su trabajo, independientemente de cualquier acuerdo comercial.
              Nuestra reputación depende de que la gente que conectamos haga un
              buen trabajo.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="gradient-navy rounded-3xl p-10 text-center">
          <h3
            className="text-2xl font-bold text-white mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Listo para empezar?
          </h3>
          <p className="text-white/60 mb-6">
            Agenda una consulta gratuita o explora nuestras guías para empezar
            a entender el panorama.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/consulta"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] font-bold px-6 py-3.5 rounded-xl transition-colors"
            >
              Consulta Gratuita
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/guias"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3.5 rounded-xl transition-colors"
            >
              Explorar Guías
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
