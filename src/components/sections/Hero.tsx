"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const flagStyle = {
  display: 'inline-block',
  width: '52px',
  height: '35px',
  overflow: 'hidden',
  borderRadius: '6px',
  boxShadow: '0 2px 6px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.08)',
  flexShrink: 0,
  alignSelf: 'center',
};

function TurkeyFlag({ className }: { className?: string }) {
  return (
    <span className={className} style={flagStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -30000 90000 60000" width="52" height="35" preserveAspectRatio="none" aria-label="Türk Bayrağı" role="img">
        <path fill="#e30a17" d="m0-30000h90000v60000H0z"/>
        <path fill="#fff" d="m41750 0 13568-4408-8386 11541V-7133l8386 11541zm925 8021a15000 15000 0 1 1 0-16042 12000 12000 0 1 0 0 16042z"/>
      </svg>
    </span>
  );
}

function CanadaFlag({ className }: { className?: string }) {
  return (
    <span className={className} style={flagStyle}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9600 4800" width="52" height="35" preserveAspectRatio="none" aria-label="Kanada Bayrağı" role="img">
        <path fill="#d52b1e" d="m0 0h2400l99 99h4602l99-99h2400v4800h-2400l-99-99h-4602l-99 99H0z"/>
        <path fill="#fff" d="m2400 0h4800v4800h-4800zm2490 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z"/>
      </svg>
    </span>
  );
}
import { MessageCircle, ChevronDown, ShieldCheck, Globe, Monitor, GraduationCap } from "lucide-react";

function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, properties);
  }
  // eslint-disable-next-line no-console
  console.log("[track]", name, properties);
}

export function Hero() {
  const t = useTranslations("hero");
  const dp = useTranslations("diplomaPage");
  const whatsapp = useTranslations("whatsapp");
  const locale = useLocale();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsapp("message"))}`;

  const glanceItems = [
    { label: dp("glanceLabel1"), value: dp("glanceValue1"), sub: undefined, highlight: false },
    { label: dp("glanceLabel2"), value: dp("glanceValue2"), sub: undefined, highlight: false },
    { label: dp("glanceLabel3"), value: dp("glanceValue3"), sub: dp("glanceSub3"), highlight: false },
    { label: dp("glanceLabel4"), value: dp("glanceValue4"), sub: dp("glanceSub4"), highlight: false },
    { label: dp("glanceLabel5"), value: dp("glanceValue5"), sub: undefined, highlight: true },
    { label: dp("glanceLabel6"), value: dp("glanceValue6"), sub: undefined, highlight: false },
  ];

  return (
    <section className="relative overflow-hidden bg-warm-200 pt-8 pb-10 lg:pt-10 lg:pb-14">
      {/* Soft organic blobs */}
      <div className="absolute top-0 right-0 w-[640px] h-[640px] bg-brand-100/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[520px] h-[520px] bg-info-100/60 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[360px] h-[360px] bg-warm-100/60 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1280px]">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">

          {/* LEFT: copy — 60% */}
          <div className="flex flex-col gap-7">

            {/* Authority Badge */}
            <div className="inline-flex items-center self-start gap-2.5 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={56} height={25} className="flex-shrink-0" loading="eager" priority />
              <span className="h-3 w-px bg-warm-400 flex-shrink-0" />
              <span className="text-xs text-warm-600">{t("badge")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15] text-warm-800">
              <span className="inline-flex items-center gap-3">
                <TurkeyFlag className="animate-[flagFloat_3s_ease-in-out_infinite] hover:scale-110 transition-transform duration-300" />
                {t("title")}
              </span>
              <br />
              <span className="text-brand-500 inline-flex items-center gap-3">
                <CanadaFlag className="animate-[flagFloat_3s_ease-in-out_infinite_0.4s] hover:scale-110 transition-transform duration-300" />
                {t("titleHighlight")}
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-lg md:text-xl text-warm-700 leading-relaxed max-w-lg">
              {t("subtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { source: "hero", locale })}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white/70 px-7 text-base font-medium text-warm-800 hover:bg-white transition-colors shadow-sm"
              >
                <MessageCircle className="h-5 w-5" />
                {t("ctaWhatsApp")}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-warm-600 hover:text-warm-800 transition-colors"
              >
                {t("ctaSecondary")}
                <ChevronDown className="h-4 w-4" />
              </a>
            </div>

            {/* Trust Bar */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-warm-300">
              <div className="flex items-center gap-2 text-xs text-warm-700">
                <ShieldCheck className="h-4 w-4 text-trust-500 flex-shrink-0" />
                <span>{t("trustItem1")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-warm-700">
                <Globe className="h-4 w-4 text-trust-500 flex-shrink-0" />
                <span>{t("trustItem2")}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-warm-700">
                <Monitor className="h-4 w-4 text-trust-500 flex-shrink-0" />
                <span>{t("trustItem3")}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: OSSD Glance Card — 40% */}
          <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="bg-white border border-warm-300 rounded-3xl p-6 shadow-sm">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-warm-800 text-base">{dp("glanceTitle")}</h3>
              </div>

              {/* Definition */}
              <p className="text-xs text-warm-500 leading-relaxed mb-3 pb-3 border-b border-warm-200">
                {dp("glanceDefinition")}
              </p>

              {/* Rows */}
              <div className="space-y-0">
                {glanceItems.map(({ label, value, sub, highlight }) =>
                  highlight ? (
                    <div key={label} className="flex flex-col gap-1 py-3 border-b border-warm-200 last:border-0 bg-trust-50 -mx-2 px-2 rounded-xl">
                      <span className="text-[10px] font-semibold text-trust-600 uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-semibold text-trust-700 leading-snug">{value}</span>
                    </div>
                  ) : (
                    <div key={label} className="flex flex-col gap-0.5 py-3 border-b border-warm-200 last:border-0">
                      <span className="text-[10px] font-semibold text-warm-500 uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-medium text-warm-800">{value}</span>
                      {sub && <span className="text-xs text-warm-500 mt-0.5">{sub}</span>}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
