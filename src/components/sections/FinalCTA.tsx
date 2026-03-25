"use client";

import { useTranslations, useLocale } from "next-intl";
import { MessageCircle } from "lucide-react";
import { LeadForm } from "./LeadForm";

function trackEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag("event", name, properties);
  }
  // eslint-disable-next-line no-console
  console.log("[track]", name, properties);
}

export function FinalCTA() {
  const t = useTranslations("finalCta");
  const whatsapp = useTranslations("whatsapp");
  const locale = useLocale();

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsapp("message"))}`;

  return (
    <section id="consultation" className="w-full py-20 md:py-28 bg-[#3A6EA5]">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: heading + WhatsApp */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight text-white">
                {t("title")}
              </h2>
              <p className="text-lg text-warm-400 leading-relaxed">
                {t("subtitle")}
              </p>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { source: "final_cta", locale })}
              className="inline-flex items-center gap-3 self-start h-14 rounded-2xl bg-trust-500 px-7 text-base font-semibold text-white hover:bg-trust-600 transition-colors shadow-lg"
            >
              <MessageCircle className="h-5 w-5 flex-shrink-0" />
              <div className="flex flex-col items-start leading-tight">
                <span>{t("whatsappText")}</span>
                <span className="text-xs font-normal text-white/70">{t("whatsappSub")}</span>
              </div>
            </a>
          </div>

          {/* Right: Full LeadForm */}
          <div>
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
