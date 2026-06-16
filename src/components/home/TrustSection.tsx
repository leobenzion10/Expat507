import GoldDivider from "@/components/ui/GoldDivider";
import { Shield, Users, Clock, Award } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Shield,
    title: "Información verificada",
    description:
      "Toda nuestra información es revisada por profesionales con experiencia en el sistema panameño.",
  },
  {
    icon: Users,
    title: "Red privada de aliados",
    description:
      "Te conectamos con abogados, agentes inmobiliarios y asesores financieros de confianza.",
  },
  {
    icon: Clock,
    title: "Actualizado regularmente",
    description:
      "Mantenemos nuestras guías al día con los cambios legislativos y del mercado panameño.",
  },
  {
    icon: Award,
    title: "Sin conflictos de interés",
    description:
      "Nuestro modelo de referidos garantiza que te conectemos con quien realmente es el mejor para tu caso.",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Gracias a Expat507 entendí exactamente qué visa necesitaba y cómo abrirme una cuenta bancaria. El proceso que parecía imposible lo completé en 3 meses.",
    name: "Michael R.",
    origin: "🇺🇸 Estados Unidos",
    objective: "Residente Pensionado",
  },
  {
    quote:
      "La consulta gratuita fue directa y honesta. Me dijeron exactamente qué esperarme y me conectaron con el abogado correcto. Muy profesional.",
    name: "Anna K.",
    origin: "🇩🇪 Alemania",
    objective: "Inversión Inmobiliaria",
  },
  {
    quote:
      "Llevaba meses buscando información confiable sobre la Visa de Nómada Digital. Expat507 tiene la guía más completa que encontré en todo internet.",
    name: "Carlos M.",
    origin: "🇪🇸 España",
    objective: "Nómada Digital",
  },
];

export default function TrustSection() {
  return (
    <section className="py-20 gradient-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
              Por qué confiar en nosotros
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            La diferencia Expat507
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            No somos una agencia de migración ni una inmobiliaria. Somos la
            guía que te da el contexto para tomar decisiones inteligentes.
          </p>
        </div>

        {/* Trust grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
            >
              <div className="w-12 h-12 bg-[#C9A84C]/20 rounded-xl flex items-center justify-center mb-4">
                <item.icon size={22} className="text-[#C9A84C]" />
              </div>
              <h3
                className="text-white font-bold mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {item.title}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <GoldDivider className="mb-16" />

        {/* Testimonials */}
        <div>
          <h3
            className="text-2xl font-bold text-white text-center mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Lo que dicen nuestros usuarios
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="text-[#C9A84C] text-3xl mb-3">&ldquo;</div>
                <p className="text-white/80 text-sm leading-relaxed mb-5 italic">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-10 h-10 bg-[#C9A84C]/20 rounded-full flex items-center justify-center text-lg">
                    {t.origin.split(" ")[0]}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.origin.split(" ").slice(1).join(" ")} · {t.objective}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
