"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-navy">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #C9A84C,
              #C9A84C 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />
      </div>

      {/* Gold accent top right */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#C9A84C] opacity-[0.07] blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-[#C9A84C] opacity-[0.05] blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest uppercase">
              Tu guía insider
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vive, invierte y
            <br />
            <span className="text-gradient-gold">prospera en Panamá</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-10 max-w-2xl">
            Información privilegiada sobre migración, bienes raíces, banca y
            planificación patrimonial en Panamá. Para expatriados e
            inversionistas internacionales serios.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/consulta"
              className="inline-flex items-center justify-center gap-2 bg-[#C9A84C] hover:bg-[#A8883A] text-[#0A1628] font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-base"
            >
              Agenda Consulta Gratuita
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/guias"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base"
            >
              Explorar Guías
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-6 mt-12">
            <div className="flex -space-x-2">
              {["🇺🇸", "🇨🇦", "🇩🇪", "🇬🇧", "🇪🇸"].map((flag, i) => (
                <div
                  key={i}
                  className="w-9 h-9 rounded-full bg-[#122040] border-2 border-[#1a2d52] flex items-center justify-center text-base"
                >
                  {flag}
                </div>
              ))}
            </div>
            <div>
              <p className="text-white text-sm font-semibold">
                +500 expatriados e inversionistas
              </p>
              <p className="text-white/50 text-xs">ya confían en Expat507</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-12">
          {[
            { value: "50+", label: "Guías especializadas" },
            { value: "7", label: "Visas documentadas" },
            { value: "15+", label: "Años de experiencia" },
            { value: "100%", label: "Consultas gratuitas" },
          ].map((stat) => (
            <div key={stat.label}>
              <p
                className="text-3xl font-bold text-[#C9A84C] mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {stat.value}
              </p>
              <p className="text-white/50 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown size={24} className="text-white/30" />
      </div>
    </section>
  );
}
