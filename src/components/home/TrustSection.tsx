import { Shield, Users, Clock, Award } from "lucide-react";
import { getLocale } from "@/lib/i18n/locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

const ICONS = [Shield, Users, Clock, Award];

export default async function TrustSection() {
  const locale = await getLocale();
  const t = getDictionary(locale).trustSection;
  const TRUST_ITEMS = t.items.map((item, i) => ({ ...item, icon: ICONS[i] }));

  return (
    <section className="py-20 gradient-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-semibold tracking-widest uppercase">
              {t.eyebrow}
            </span>
            <div className="h-px w-10 bg-[#C9A84C]" />
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {t.title}
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            {t.subtitle}
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
      </div>
    </section>
  );
}
