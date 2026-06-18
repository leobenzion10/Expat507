"use client";

import { useState } from "react";
import { ArrowRight, Mail, MessageCircle, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";
import GoldDivider from "@/components/ui/GoldDivider";
import HoneypotField from "@/components/ui/HoneypotField";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useHoneypot } from "@/lib/useHoneypot";

export default function ContactoPage() {
  const { locale, dict } = useLocale();
  const t = dict.contacto;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const honeypot = useHoneypot();

  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waEnabled = process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true" && !!waNumber;
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale, source: "contacto", website: honeypot.website, ts: honeypot.ts }),
      });
      if (res.ok) {
        setDone(true);
      } else {
        toast.error(t.toastError);
      }
    } catch {
      toast.error(t.toastConnError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="pt-20 min-h-screen">
      <HoneypotField value={honeypot.website} onChange={honeypot.setWebsite} />
      {/* Header */}
      <div className="gradient-navy pt-12 pb-16 px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#B8935A]" />
          <span className="text-[#B8935A] text-xs font-semibold tracking-widest uppercase">
            {t.badge}
          </span>
          <div className="h-px w-10 bg-[#B8935A]" />
        </div>
        <h1
          className="text-4xl sm:text-5xl font-bold text-white mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t.title}
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      <GoldDivider />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact options */}
          <div className="space-y-5">
            <h2
              className="text-lg font-bold text-[#0B1A17]"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t.otherWaysTitle}
            </h2>

            {waEnabled && (
              <a
                href={`https://wa.me/${waNumber}?text=${encodeURIComponent(t.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#F4F6F9] hover:bg-[#E8ECF2] rounded-xl p-4 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B1A17] group-hover:text-[#B8935A] transition-colors">
                    {t.whatsappTitle}
                  </p>
                  <p className="text-xs text-[#6B7280]">{t.whatsappDesc}</p>
                </div>
              </a>
            )}

            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-center gap-3 bg-[#F4F6F9] hover:bg-[#E8ECF2] rounded-xl p-4 transition-colors group"
              >
                <div className="w-10 h-10 bg-[#B8935A]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail size={18} className="text-[#B8935A]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B1A17] group-hover:text-[#B8935A] transition-colors">
                    {t.emailTitle}
                  </p>
                  <p className="text-xs text-[#6B7280]">{contactEmail}</p>
                </div>
              </a>
            )}

            <div className="bg-[#FBF6EC] border border-[#B8935A]/30 rounded-xl p-4">
              <p className="text-xs text-[#6B7280] leading-relaxed">
                <strong className="text-[#0B1A17]">{t.noteLabel}</strong> {t.notePrefix}
                <a href="/consulta" className="text-[#B8935A] hover:underline">
                  {t.noteLink}
                </a>
                {t.noteSuffix}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {done ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-[#FBF6EC] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-[#B8935A]" />
                </div>
                <h3
                  className="text-xl font-bold text-[#0B1A17] mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t.success.title}
                </h3>
                <p className="text-[#6B7280]">
                  {t.success.textPrefix}<strong>{form.email}</strong>{t.success.textSuffix}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1A17] mb-2">
                      {t.fields.name}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder={t.fields.namePlaceholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#0B1A17] mb-2">
                      {t.fields.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder={t.fields.emailPlaceholder}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1A17] mb-2">
                    {t.fields.subject}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    placeholder={t.fields.subjectPlaceholder}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0B1A17] mb-2">
                    {t.fields.message}
                  </label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder={t.fields.messagePlaceholder}
                    rows={5}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-[#0B1A17] placeholder-gray-400 focus:outline-none focus:border-[#B8935A] focus:ring-2 focus:ring-[#B8935A]/20 transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#B8935A] hover:bg-[#96763F] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1A17] font-bold py-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? t.submitLoading : t.submitIdle}
                  {!loading && <ArrowRight size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
