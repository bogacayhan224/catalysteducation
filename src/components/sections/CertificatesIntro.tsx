"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Check, Clock } from "lucide-react";

const features = ["feature1", "feature2", "feature3", "feature4", "feature5", "feature6"] as const;

export function CertificatesIntro() {
  const t = useTranslations("certificatesIntro");
  const locale = useLocale();

  return (
    <section className="w-full py-12 md:py-16 bg-info-50 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">

        {/* Badge */}
        <div className="flex justify-center mb-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#3B7CB0]/25 bg-[#3B7CB0]/8 px-4 py-1.5">
            <span className="text-xs font-semibold text-[#3B7CB0]">{t("badge")}</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8 space-y-3">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-warm-800">
            {t("title")}
          </h2>
          <p className="text-sm md:text-base text-warm-600 font-semibold tracking-wide uppercase">
            {t("subtitle")}
          </p>
          <p className="text-warm-700 leading-relaxed max-w-xl mx-auto text-base">
            {t("desc")}
          </p>
        </div>

        {/* Urgency line */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 border border-brand-200 px-4 py-2">
            <Clock className="h-3.5 w-3.5 text-brand-500 flex-shrink-0" />
            <span className="text-xs font-semibold text-brand-700">{t("urgency")}</span>
          </div>
        </div>

        {/* Features grid */}
        <div className="bg-white rounded-2xl border border-warm-200 px-8 py-6 mb-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="h-5 w-5 rounded-full bg-[#3B7CB0]/10 flex items-center justify-center flex-shrink-0">
                  <Check className="h-3 w-3 text-[#3B7CB0]" />
                </div>
                <span className="text-sm text-warm-700 font-medium">{t(f)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href={`/${locale}/certificates`}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
