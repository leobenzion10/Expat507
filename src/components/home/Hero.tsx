"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLocale } from "@/components/providers/LocaleProvider";
import { motion } from "framer-motion";
import CountUp from "@/components/motion/CountUp";
import PanamaSkyline from "@/components/home/PanamaSkyline";

export default function Hero() {
  const { dict } = useLocale();
  const t = dict.hero;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden gradient-navy grain">
      {/* Giant "507" graphic */}
      <div
        aria-hidden="true"
        className="hero-507 absolute -top-10 right-0 sm:right-[-2vw] text-white/[0.05] select-none pointer-events-none"
      >
        507
      </div>

      {/* Gold + tropical ambient glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#B8935A] opacity-[0.08] blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-64 h-64 rounded-full bg-[#1F6F50] opacity-[0.10] blur-3xl" />

      {/* Cinematic skyline */}
      <PanamaSkyline className="absolute bottom-0 left-0 w-full h-[42vh] sm:h-[48vh]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-12 bg-[#B8935A]" />
            <span className="text-[#B8935A] text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase">
              {t.eyebrow}
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-display text-white mb-7">
            {t.headlineLine1}
            <br />
            <span className="text-gradient-gold">{t.headlineLine2}</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg lg:text-xl text-white/65 leading-relaxed mb-10 max-w-2xl">
            {t.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/consulta"
              className="inline-flex items-center justify-center gap-2 bg-[#B8935A] hover:bg-[#96763F] text-[#0B1A17] font-bold px-8 py-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl text-base"
            >
              {t.ctaPrimary}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/guias"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-8 py-4 rounded-lg transition-all duration-200 text-base"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </motion.div>

        {/* Trusted-by line, small caps, no flags */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] uppercase text-white/35 max-w-xl"
        >
          {t.trustedLine}
        </motion.p>

        {/* Stats */}
        <motion.div
          className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/10 pt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {t.stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-semibold text-[#B8935A] mb-1" style={{ fontFamily: "var(--font-display)" }}>
                <CountUp value={stat.value} />
              </p>
              <p className="text-white/45 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <ChevronDown size={24} className="text-white/30" />
      </div>
    </section>
  );
}
