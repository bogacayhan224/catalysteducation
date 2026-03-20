"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { GraduationCap, Lightbulb, Building2, ArrowRight } from "lucide-react";

const funnels = [
  {
    key: "funnel1",
    icon: GraduationCap,
    href: "/diploma",
    ctaHref: "/apply",
    iconBg: "bg-brand-100",
    iconColor: "text-brand-500",
    ctaClass: "bg-brand-500 hover:bg-brand-600 text-white",
    isPrimary: true,
  },
  {
    key: "funnel2",
    icon: Lightbulb,
    href: "/certificates",
    ctaHref: "/certificates",
    iconBg: "bg-info-100",
    iconColor: "text-[#3B7CB0]",
    ctaClass: "bg-[#3B7CB0] hover:bg-[#2d6090] text-white",
    isPrimary: false,
  },
  {
    key: "funnel3",
    icon: Building2,
    href: "/corporate",
    ctaHref: "/contact",
    iconBg: "bg-trust-50",
    iconColor: "text-trust-500",
    ctaClass: "bg-trust-600 hover:bg-trust-700 text-white",
    isPrimary: false,
  },
] as const;

export function HomeFinalCTA() {
  const t = useTranslations("homeFinalCta");
  const locale = useLocale();
  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <section className="w-full py-16 md:py-24 bg-warm-200 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">

        {/* Header */}
        <div className="text-center mb-14 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-warm-800">
            {t("title")}
          </h2>
          <p className="text-lg text-warm-700 max-w-xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 3-funnel cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {funnels.map(({ key, icon: Icon, ctaHref, iconBg, iconColor, ctaClass, isPrimary }) => (
            <div
              key={key}
              className={`flex flex-col gap-5 p-8 rounded-3xl border ${isPrimary ? "bg-white border-brand-200 shadow-lg" : "bg-white/70 border-warm-200"} hover:shadow-xl transition-all duration-300`}
            >
              <div className={`h-13 w-13 rounded-2xl flex items-center justify-center ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-warm-800 mb-2">{t(`${key}Title`)}</h3>
                <p className="text-warm-700 text-sm leading-relaxed">{t(`${key}Desc`)}</p>
              </div>
              <Link
                href={localePath(ctaHref)}
                className={`inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold shadow-sm transition-colors ${ctaClass}`}
              >
                {t(`${key}CTA`)}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
