import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import FadeInUp from "@/components/motion/FadeInUp";

export default async function GuideDownloadCTA() {
  const locale = await getLocale();
  const t = getDictionary(locale).guiaCompleta.ctaHome;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="gradient-navy grain rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="w-16 h-16 bg-[#B8935A]/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Download size={28} className="text-[#B8935A]" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase mb-2">
                {t.eyebrow}
              </p>
              <h2
                className="text-2xl sm:text-3xl font-semibold text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {t.title}
              </h2>
              <p className="text-white/60 max-w-xl">{t.description}</p>
            </div>
            <Link
              href="/guia-completa"
              className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-7 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              {t.button}
              <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
