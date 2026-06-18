"use client";

import { useLocale } from "@/components/providers/LocaleProvider";

export default function LanguageSwitcher({ dark = true }: { dark?: boolean }) {
  const { locale, setLocale } = useLocale();

  const base = "text-xs font-semibold px-2 py-1 rounded-md transition-colors";
  const activeClass = dark ? "bg-[#B8935A] text-[#0B1A17]" : "bg-[#0B1A17] text-white";
  const inactiveClass = dark ? "text-white/60 hover:text-white" : "text-[#0B1A17]/60 hover:text-[#0B1A17]";

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language selector">
      <button
        onClick={() => setLocale("es")}
        className={`${base} ${locale === "es" ? activeClass : inactiveClass}`}
        aria-pressed={locale === "es"}
      >
        ES
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`${base} ${locale === "en" ? activeClass : inactiveClass}`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
    </div>
  );
}
