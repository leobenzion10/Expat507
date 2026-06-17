import Link from "next/link";
import GoldDivider from "@/components/ui/GoldDivider";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function Footer() {
  const locale = await getLocale();
  const dict = getDictionary(locale).footer;
  const LINKS = {
    recursos: dict.recursos,
    servicios: dict.servicios,
    empresa: dict.empresa,
  };
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
              {dict.tagline}
            </p>
            <Link
              href="/consulta"
              className="inline-block bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              {dict.ctaButton}
            </Link>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="text-[#C9A84C] text-xs font-semibold uppercase tracking-widest mb-4">
              {dict.recursosTitle}
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
              {dict.serviciosTitle}
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
              {dict.empresaTitle}
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
                {dict.newsletterTitle}
              </h4>
              <p className="text-white/60 text-xs mb-3">
                {dict.newsletterDesc}
              </p>
              <Link
                href="/newsletter"
                className="text-[#C9A84C] text-sm hover:underline font-medium"
              >
                {dict.newsletterCta}
              </Link>
            </div>
          </div>
        </div>

        <GoldDivider />

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs text-center sm:text-left">
            {dict.copyright.replace("{year}", String(year))}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacidad" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              {dict.privacidad}
            </Link>
            <Link href="/terminos" className="text-white/40 hover:text-white/60 text-xs transition-colors">
              {dict.terminos}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
