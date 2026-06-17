"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

export default function Navbar() {
  const { dict } = useLocale();
  const NAV_LINKS = [
    { href: "/guias", label: dict.nav.guias },
    { href: "/asistente", label: dict.nav.asistente },
    { href: "/sobre-nosotros", label: dict.nav.nosotros },
    { href: "/contacto", label: dict.nav.contacto },
  ];
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navBg = isHome
    ? scrolled
      ? "bg-[#0A1628]/98 backdrop-blur-md shadow-lg"
      : "bg-transparent"
    : "bg-[#0A1628] shadow-md";

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        navBg
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex flex-col leading-none">
              <span
                className="text-xl font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Expat<span className="text-[#C9A84C]">507</span>
              </span>
              <span className="text-[10px] text-[#C9A84C] tracking-widest uppercase font-medium opacity-80">
                {dict.nav.panama}
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 hover:text-[#C9A84C]",
                  pathname === link.href
                    ? "text-[#C9A84C]"
                    : "text-white/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <Link
              href="/consulta"
              className="bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] text-sm font-semibold px-5 py-2.5 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              {dict.nav.cta}
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A1628] border-t border-white/10">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-[#C9A84C]/20 text-[#C9A84C]"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/consulta"
                className="block w-full text-center bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] text-sm font-semibold px-5 py-3 rounded-lg transition-colors"
              >
                {dict.nav.cta}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
