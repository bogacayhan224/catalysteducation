"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { TrendingUp, ArrowRight, Check } from "lucide-react";

const items = ["item1", "item2", "item3", "item4"] as const;

export function CorporateIntro() {
  const t = useTranslations("corporateIntro");
  const locale = useLocale();

  return (
    <section className="w-full py-14 md:py-20 bg-warm-100 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: copy */}
          <div className="flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center self-start gap-2 rounded-full border border-trust-200 bg-trust-50 px-4 py-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-trust-500" />
              <span className="text-xs font-semibold text-trust-700">{t("badge")}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-warm-800 leading-tight">
              {t("title")}
            </h2>
            <p className="text-warm-600 text-lg font-medium leading-relaxed">
              {t("subtitle")}
            </p>
            <p className="text-warm-700 leading-relaxed">
              {t("desc")}
            </p>

            {/* Feature list */}
            <ul className="flex flex-col gap-3 mt-2">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 text-trust-500" />
                  </div>
                  <span className="text-warm-700 text-sm">{t(item)}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link
                href={`/${locale}/corporate`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-trust-600 px-7 text-sm font-semibold text-white shadow-sm hover:bg-trust-700 transition-colors"
              >
                {t("cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white px-7 text-sm font-medium text-warm-700 hover:bg-warm-50 transition-colors"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>

          {/* Right: visual callout */}
          <div className="relative">
            <div className="rounded-3xl bg-[#3A6EA5] p-10 text-white">
              <div className="space-y-6">
                <div className="flex items-center gap-3 pb-6 border-b border-white/12">
                  <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-white/60 font-medium">Program Tracks</p>
                    <p className="text-sm font-semibold">3 Focus Areas</p>
                  </div>
                </div>
                {["AI & Entrepreneurship", "Blockchain & AI", "Advanced Manufacturing"].map((track) => (
                  <div key={track} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-brand-400 flex-shrink-0" />
                    <span className="text-sm text-white/85">{track}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-white/12 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Delivery</span>
                    <span className="font-medium">100% Online</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Cohort Frequency</span>
                    <span className="font-medium">Every 4 Months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Backed By</span>
                    <span className="font-medium">Ontario Tech University</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
