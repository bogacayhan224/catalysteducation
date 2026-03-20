"use client";
import { useTranslations } from "next-intl";
import { ShieldCheck, BookOpen, Globe, Users } from "lucide-react";
import Image from "next/image";

const icons = [ShieldCheck, BookOpen, Globe, Users];
const itemKeys = ["item1", "item2", "item3", "item4"] as const;

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
        </div>

        {/* 4-column trust grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {itemKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <div
                key={key}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-warm-200 shadow-[0_2px_12px_rgba(31,29,26,0.05)] hover:shadow-[0_4px_20px_rgba(31,29,26,0.08)] transition-shadow"
              >
                <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-5 w-5 text-brand-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1 text-warm-800">{t(`${key}Title`)}</h3>
                  <p className="text-warm-600 text-xs leading-relaxed">{t(`${key}Desc`)}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
