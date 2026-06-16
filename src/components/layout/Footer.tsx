import Link from "next/link";
import GoldDivider from "@/components/ui/GoldDivider";

const LINKS = {
  recursos: [
    { href: "/guias", label: "Centro de Conocimiento" },
    { href: "/guias?category=migracion", label: "Migración" },
    { href: "/guias?category=bienes-raices", label: "Bienes Raíces" },
    { href: "/guias?category=banca", label: "Banca" },
    { href: "/guias?category=legal", label: "Legal" },
  ],
  servicios: [
    { href: "/consulta", label: "Consulta Gratuita" },
    { href: "/asistente", label: "Asistente IA" },
    { href: "/newsletter", label: "Newsletter" },
  ],
  empresa: [
    { href: "/sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] text-white">
      <GoldDivider className="pt-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Expat<span className="text-[#C9A84C]">507</span>
              </span>
              <p className="text-xs text-[#C9A84C] tracking-widest uppercase mt-1 opacity-80">
                Panamá
              </p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Tu guía insider para vivir, invertir y establecerte en Panamá con
              claridad y confianza.
            </p>
            <Link
              href="/consulta"
              className="inline-block bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              Agenda Consulta Gratuita
            </Link>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-4">
              Recursos
            </h4>
            <ul className="space-y-2.5">
              {LINKS.recursos.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-4">
              Servicios
            </h4>
            <ul className="space-y-2.5">
              {LINKS.servicios.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {LINKS.empresa.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <h4 className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-3">
                Newsletter
              </h4>
              <p className="text-white/60 text-xs mb-3">
                Recibe insights exclusivos cada semana.
              </p>
              <Link
                href="/newsletter"
                className="text-[#C9A84C] text-sm hover:underline font-medium"
              >
                Suscribirme →
              </Link>
            </div>
          </div>
        </div>

        <GoldDivider />

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            © {year} Expat507. Todos los derechos reservados. La información
            publicada es de carácter informativo y no constituye asesoría legal
            o financiera.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Privacidad
            </Link>
            <Link href="/terminos" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
