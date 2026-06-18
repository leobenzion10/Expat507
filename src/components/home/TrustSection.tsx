import { Shield, Users, Clock, Award } from "lucide-react";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import FadeInUp from "@/components/motion/FadeInUp";

const ICONS = [Shield, Users, Clock, Award];

export default async function TrustSection() {
  const locale = await getLocale();
  const t = getDictionary(locale).trustSection;
  const TRUST_ITEMS = t.items.map((item, i) => ({ ...item, icon: ICONS[i] }));

  return (
    <section className="py-20 gradient-navy grain">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <FadeInUp className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#B8935A]" />
            <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-[#B8935A]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-semibold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </FadeInUp>

        {/* Trust grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {TRUST_ITEMS.map((item, i) => (
            <FadeInUp key={item.title} delay={i * 0.08}>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#B8935A]/50 hover:bg-white/[0.07] transition-all duration-300">
                <div className="w-12 h-12 bg-[#B8935A]/20 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={22} className="text-[#B8935A]" />
                </div>
                <h3
                  className="text-white font-semibold mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </FadeInUp>
          ))}
        </div>

        <FadeInUp>
          <div className="border border-dashed border-white/15 rounded-2xl p-8 text-center max-w-2xl mx-auto">
            <span className="inline-block text-[#B8935A] text-xs font-semibold tracking-widest uppercase mb-3 border border-[#B8935A]/30 rounded-full px-3 py-1">
              {t.testimonialsPlaceholder.badge}
            </span>
            <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {t.testimonialsPlaceholder.title}
            </h3>
            <p className="text-white/45 text-sm leading-relaxed">{t.testimonialsPlaceholder.text}</p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
