import Link from "next/link";
import { ArrowRight, Calendar, MessageSquare } from "lucide-react";
import GoldDivider from "@/components/ui/GoldDivider";

export default function ConsultaCTA() {
  return (
    <section className="py-20 bg-white">
      <GoldDivider className="mb-0 -mt-px" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-10 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
                Siguiente Paso
              </span>
            </div>
            <h2
              className="text-3xl sm:text-4xl font-bold text-[#0A1628] mb-5 leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Habla con un experto.
              <br />
              <span className="text-gradient-gold">Sin costo, sin compromiso.</span>
            </h2>
            <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
              Completarás un formulario de 2 minutos para que podamos entender
              tu situación. Luego agendas una llamada directa con nosotros, y te
              conectamos con los aliados correctos de nuestra red privada.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Formulario de calificación (2 min)",
                "Llamada estratégica de 30 minutos",
                "Conexión con especialistas de tu área",
                "Sin ningún costo ni compromiso",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#FBF6EC] border border-[#C9A84C]/30 flex items-center justify-center text-[#C9A84C] text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <span className="text-[#374151] text-sm">{step}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/consulta"
                className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Calendar size={18} />
                Agendar Consulta
              </Link>
              <Link
                href="/asistente"
                className="inline-flex items-center justify-center gap-2 bg-[#F4F6F9] hover:bg-[#E8ECF2] text-[#0A1628] font-semibold px-7 py-4 rounded-xl transition-all duration-200"
              >
                <MessageSquare size={18} />
                Preguntar al Asistente IA
              </Link>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="gradient-navy rounded-3xl p-8 text-white">
              <div className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase mb-6">
                Proceso simplificado
              </div>
              <div className="space-y-6">
                {[
                  {
                    step: "01",
                    title: "Cuéntanos tu caso",
                    desc: "Completa el formulario de calificación online.",
                  },
                  {
                    step: "02",
                    title: "Agenda tu llamada",
                    desc: "Selecciona el horario que mejor te convenga.",
                  },
                  {
                    step: "03",
                    title: "Recibe orientación",
                    desc: "Conversamos sobre tu objetivo específico.",
                  },
                  {
                    step: "04",
                    title: "Conéctamos con el aliado correcto",
                    desc: "Te presentamos al profesional adecuado de nuestra red.",
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="text-[#C9A84C] text-2xl font-bold opacity-40 w-8 flex-shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <p className="font-semibold mb-0.5">{item.title}</p>
                      <p className="text-white/50 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
                <ArrowRight size={18} className="text-[#C9A84C]" />
                <span className="text-white/70 text-sm">
                  Tiempo total: menos de 48 horas hasta tener respuestas concretas.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
