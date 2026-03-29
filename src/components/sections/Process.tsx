"use client";
import { useTranslations } from "next-intl";

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; desc1: string; desc2: string }[];

  return (
    <section id="how-it-works" className="w-full py-12 md:py-14 bg-info-50 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="flex flex-col items-center justify-center text-center mb-8 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-warm-800">
            {t("title")}
          </h2>
          <p className="max-w-[640px] text-base lg:text-lg text-warm-700 leading-relaxed">
            {t("subtitle")}
          </p>
          <p className="text-sm font-medium text-trust-600">{t("subtitleNote")}</p>
        </div>

        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((s, i) => {
            return (
              <div
                key={i}
                className="bg-white rounded-xl border border-warm-200 p-5 shadow-sm flex gap-4 items-start"
              >
                <span className="flex-shrink-0 mt-0.5 h-9 w-9 rounded-full bg-brand-500 text-white font-bold text-sm flex items-center justify-center shadow-sm">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-warm-800 text-sm leading-snug mb-1.5">{s.title}</h3>
                  <p className="text-warm-700 text-sm leading-relaxed">{s.desc1}</p>
                  {s.desc2 && <p className="text-warm-600 text-sm leading-relaxed mt-1">{s.desc2}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
