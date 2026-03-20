"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { MessageCircle, ChevronDown, ShieldCheck, Globe, Monitor } from "lucide-react";
import { LeadForm } from "./LeadForm";

function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, properties);
  }
  // eslint-disable-next-line no-console
  console.log("[track]", name, properties);
}

export function Hero() {
  const t = useTranslations("hero");
  const whatsapp = useTranslations("whatsapp");
  const locale = useLocale();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905551234567";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsapp("message"))}`;

  return (
    <section className="relative overflow-hidden bg-warm-200 pt-14 pb-20 lg:pt-20 lg:pb-28">
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
              <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={56} height={25} className="flex-shrink-0" />
              <span className="h-3 w-px bg-warm-400 flex-shrink-0" />
              <span className="text-xs text-warm-600">{t("badge")}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15] text-warm-800">
              {t("title")}
              <br />
              <span className="text-brand-500">
                🇨🇦 {t("titleHighlight")}
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

          {/* RIGHT: Lead Form — 40% */}
          <div id="lead-form" className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
