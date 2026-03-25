"use client";

import { useTranslations, useLocale } from "next-intl";
import { MapPin, Phone, Mail, Instagram, Linkedin, Globe, Clock, CheckCircle2, MessageSquare, ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/sections/ContactForm";

export default function ContactPage() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const mapsUrl = "https://maps.google.com/?q=173+Kingston+Rd+Toronto+ON+M4L+1T4+Canada";
  const mapsEmbedUrl = `https://www.google.com/maps?q=173+Kingston+Rd+Toronto+ON+M4L+1T4+Canada&output=embed&z=16&hl=${locale}`;
  const linkedinUrl = "https://www.linkedin.com/company/catalyst-education-tr/";
  const instagramUrl = "https://www.instagram.com/thecatalysteducation/";
  const phoneRaw = "+905334702735";

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">

        {/* ── 1. Hero ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden text-white py-10 lg:py-14 text-center" style={{ background: 'linear-gradient(135deg, #5A0F1A 0%, #8B1E2D 60%, #B33A4A 100%)' }}>
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D0D14_1px,transparent_1px),linear-gradient(to_bottom,#3D0D14_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_70%,transparent_100%)]" />
          {/* Soft glow blobs */}
          <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-white/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1280px]">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/75 mb-5 backdrop-blur-sm">
              <Globe className="h-3.5 w-3.5 flex-shrink-0" />
              {t("heroBadge")}
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              {t("heroTitle")}
            </h1>
            <p className="max-w-[560px] mx-auto text-white/75 text-base md:text-lg leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </section>

        {/* ── 2. Contact Info Cards ────────────────────────────── */}
        <section className="py-14 lg:py-18 bg-warm-200">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px]">
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

              {/* Address */}
              <div className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(31,29,26,0.07)] border border-warm-300 flex flex-col gap-4 hover:shadow-[0_4px_20px_rgba(31,29,26,0.10)] transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-brand-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-warm-500 uppercase tracking-widest mb-2">
                    {t("addressCardTitle")}
                  </p>
                  <p className="text-sm font-medium text-warm-800 leading-relaxed">
                    {t("addressLine1")}<br />
                    {t("addressLine2")}<br />
                    {t("addressLine3")}
                  </p>
                </div>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
                >
                  {t("mapOpenLink")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Phone */}
              <div className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(31,29,26,0.07)] border border-warm-300 flex flex-col gap-4 hover:shadow-[0_4px_20px_rgba(31,29,26,0.10)] transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-trust-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-trust-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-warm-500 uppercase tracking-widest mb-2">
                    {t("phoneCardTitle")}
                  </p>
                  <p className="text-sm font-medium text-warm-800">{t("phoneNumber")}</p>
                </div>
                <a
                  href={`tel:${phoneRaw}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-trust-500 hover:text-trust-600 transition-colors"
                >
                  {t("phoneCallCta")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Email */}
              <div className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(31,29,26,0.07)] border border-warm-300 flex flex-col gap-4 hover:shadow-[0_4px_20px_rgba(31,29,26,0.10)] transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-info-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-warm-600" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-warm-500 uppercase tracking-widest mb-2">
                    {t("emailCardTitle")}
                  </p>
                  <p className="text-sm font-medium text-warm-800 break-all">{t("emailAddress")}</p>
                </div>
                <a
                  href={`mailto:${t("emailAddress")}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-600 hover:text-warm-800 transition-colors"
                >
                  {t("emailSendCta")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* LinkedIn */}
              <div className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(31,29,26,0.07)] border border-warm-300 flex flex-col gap-4 hover:shadow-[0_4px_20px_rgba(31,29,26,0.10)] transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-info-100 flex items-center justify-center flex-shrink-0">
                  <Linkedin className="h-5 w-5 text-[#3B7CB0]" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-warm-500 uppercase tracking-widest mb-2">
                    {t("linkedinCardTitle")}
                  </p>
                  <p className="text-sm font-medium text-warm-800">{t("linkedinHandle")}</p>
                  <p className="text-xs text-warm-500 mt-1">{t("linkedinCta")}</p>
                </div>
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B7CB0] hover:text-[#2d6391] transition-colors"
                >
                  {t("linkedinFollowCta")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Instagram */}
              <div className="group bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(31,29,26,0.07)] border border-warm-300 flex flex-col gap-4 hover:shadow-[0_4px_20px_rgba(31,29,26,0.10)] transition-shadow">
                <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Instagram className="h-5 w-5 text-brand-500" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-semibold text-warm-500 uppercase tracking-widest mb-2">
                    {t("instagramCardTitle")}
                  </p>
                  <p className="text-sm font-medium text-warm-800">{t("instagramHandle")}</p>
                  <p className="text-xs text-warm-500 mt-1">{t("instagramCta")}</p>
                </div>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:text-brand-600 transition-colors"
                >
                  {t("instagramFollowCta")}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* ── 3. Form + Map ────────────────────────────────────── */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px]">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">

              {/* Left: Form */}
              <div>
                <div className="mb-7">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 tracking-tight">
                    {t("formTitle")}
                  </h2>
                  <p className="text-warm-600 mt-2 leading-relaxed">{t("formSubtitle")}</p>
                </div>
                <ContactForm />
              </div>

              {/* Right: Map (sticky on desktop) */}
              <div className="lg:sticky lg:top-28 flex flex-col gap-5">
                <div>
                  <h2 className="text-xl font-bold text-warm-800 tracking-tight">{t("mapTitle")}</h2>
                  <p className="text-sm text-warm-600 mt-1.5 leading-relaxed">{t("mapDesc")}</p>
                </div>

                {/* Map iframe */}
                <div className="rounded-2xl overflow-hidden border border-warm-300 shadow-[0_2px_12px_rgba(31,29,26,0.07)]">
                  <iframe
                    src={mapsEmbedUrl}
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Catalyst Education Office — Toronto"
                    className="block"
                  />
                </div>

                {/* Address reminder + CTA */}
                <div className="bg-warm-100 rounded-2xl border border-warm-300 p-5 flex flex-col gap-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white border border-warm-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="h-4 w-4 text-brand-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-warm-500 uppercase tracking-wider mb-1">
                        {t("addressCardTitle")}
                      </p>
                      <p className="text-sm text-warm-800 leading-relaxed">
                        {t("addressLine1")}, {t("addressLine2")}, {t("addressLine3")}
                      </p>
                    </div>
                  </div>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full h-10 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white text-sm font-medium text-warm-700 hover:bg-warm-200 hover:text-warm-800 transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    {t("mapOpenLink")}
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── 4. Trust Area ────────────────────────────────────── */}
        <section className="py-14 lg:py-20 bg-warm-200 border-t border-warm-300">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px]">
            <div className="max-w-xl mx-auto text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-warm-800 tracking-tight">
                {t("trustTitle")}
              </h2>
              <p className="text-warm-600 mt-3 leading-relaxed">{t("trustDesc")}</p>
            </div>

            <div className="grid sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl p-5 text-center border border-warm-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-full bg-trust-100 flex items-center justify-center mx-auto mb-3">
                  <Clock className="h-5 w-5 text-trust-500" />
                </div>
                <p className="text-sm font-semibold text-warm-800">{t("trustItem1")}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center border border-warm-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-full bg-trust-100 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="h-5 w-5 text-trust-500" />
                </div>
                <p className="text-sm font-semibold text-warm-800">{t("trustItem2")}</p>
              </div>
              <div className="bg-white rounded-2xl p-5 text-center border border-warm-300 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 w-10 rounded-full bg-trust-100 flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="h-5 w-5 text-trust-500" />
                </div>
                <p className="text-sm font-semibold text-warm-800">{t("trustItem3")}</p>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
