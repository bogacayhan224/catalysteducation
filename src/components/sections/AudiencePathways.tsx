"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { GraduationCap, Lightbulb, ArrowRight } from "lucide-react";

const cards = [
  {
    key: "card1",
    icon: GraduationCap,
    href: "/diploma",
    accentClass: "bg-brand-50 text-brand-500",
    badgeClass: "bg-brand-500 text-white",
    borderClass: "border-brand-200 hover:border-brand-300 shadow-lg",
    ctaClass: "text-brand-600 hover:text-brand-700",
    extraDescKeys: ["card1Desc2", "card1Desc3"] as const,
  },
  {
    key: "card2",
    icon: Lightbulb,
    href: "/certificates",
    accentClass: "bg-info-100 text-[#3B7CB0]",
    badgeClass: "bg-[#3B7CB0] text-white",
    borderClass: "border-warm-200 hover:border-[#3B7CB0]/30",
    ctaClass: "text-[#3B7CB0] hover:text-[#2d6090]",
    extraDescKeys: ["card2Desc2"] as const,
  },
] as const;

export function AudiencePathways() {
  const t = useTranslations("pathways");
  const locale = useLocale();
  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <section className="w-full py-16 md:py-24 bg-warm-50 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-warm-800">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-warm-700 max-w-2xl mx-auto leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        {/* 2-card grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto">
          {cards.map(({ key, icon: Icon, href, accentClass, badgeClass, borderClass, ctaClass, extraDescKeys }) => (
            <div
              key={key}
              className={`relative flex flex-col p-8 bg-white rounded-3xl border-2 ${borderClass} transition-all duration-300 hover:shadow-xl group`}
            >
              {/* Badge on border — both cards */}
              <div className="absolute -top-3 left-8">
                <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${badgeClass}`}>
                  {t(`${key}Tag` as Parameters<typeof t>[0])}
                </span>
              </div>

              {/* Icon */}
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 mt-2 ${accentClass} transition-transform group-hover:scale-105`}>
                <Icon size={26} />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 gap-3">
                <h3 className="text-xl font-bold text-warm-800 leading-snug">
                  {t(`${key}Title` as Parameters<typeof t>[0])}
                </h3>
                <p className="text-sm text-warm-600 font-medium whitespace-pre-line">
                  {t(`${key}Subtitle` as Parameters<typeof t>[0])}
                </p>
                <div className="flex flex-col gap-2 flex-1">
                  <p className="text-warm-700 leading-relaxed text-sm">
                    {t(`${key}Desc` as Parameters<typeof t>[0])}
                  </p>
                  {extraDescKeys.map((dk) => (
                    <p key={dk} className="text-warm-700 leading-relaxed text-sm">
                      {t(dk as Parameters<typeof t>[0])}
                    </p>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <Link
                href={localePath(href)}
                className={`inline-flex items-center gap-1.5 mt-6 text-sm font-semibold ${ctaClass} transition-colors group/link`}
              >
                {t(`${key}CTA` as Parameters<typeof t>[0])}
                <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
