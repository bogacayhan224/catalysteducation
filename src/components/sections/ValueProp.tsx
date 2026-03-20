"use client";
import { useTranslations } from "next-intl";
import { School, Monitor, Award, Users } from "lucide-react";

const icons = [School, Monitor, Award, Users];
const featureKeys = ["international", "remote", "credible", "mentorship"] as const;
const iconContainerClasses = [
  "bg-brand-50 text-brand-500",
  "bg-info-100 text-[#3B7CB0]",
  "bg-trust-100 text-trust-500",
  "bg-warm-300/60 text-warm-700",
];

export function ValueProp() {
  const t = useTranslations("valueProp");
  return (
    <section id="diploma-benefits" className="w-full py-24 md:py-32 bg-warm-100 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-warm-800">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-lg lg:text-xl text-warm-700 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <div
                key={key}
                className="flex flex-col items-start p-8 bg-white rounded-3xl border border-warm-300 shadow-[0_2px_12px_rgba(31,29,26,0.05)] hover:shadow-[0_4px_20px_rgba(31,29,26,0.10)] transition-shadow group"
              >
                <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-105 ${iconContainerClasses[i]}`}>
                  <Icon size={26} />
                </div>
                <h3 className="text-lg font-bold mb-3 text-warm-800">{t(`features.${key}.title`)}</h3>
                <p className="text-warm-700 leading-relaxed text-sm">
                  {t(`features.${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
