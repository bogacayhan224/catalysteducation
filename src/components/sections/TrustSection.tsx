"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";

export function TrustSection() {
  const t = useTranslations("trustSection");

  return (
    <section className="w-full py-10 md:py-14 bg-[#F5F1EB] border-t border-warm-200">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-warm-200 bg-white px-4 py-1.5 shadow-sm">
            <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={48} height={22} className="flex-shrink-0" />
            <span className="h-3 w-px bg-warm-200 flex-shrink-0" />
            <span className="text-xs text-warm-600 font-medium">{t("badge")}</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight max-w-3xl mx-auto text-warm-800">
            {t("title")}
          </h2>
          <p className="text-warm-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
          <p className="text-warm-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {t("subtitleP2")}
          </p>
        </div>

      </div>
    </section>
  );
}
