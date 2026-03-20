"use client";
import { useTranslations } from "next-intl";

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as { title: string; desc: string }[];

  return (
    <section id="how-it-works" className="w-full py-24 md:py-32 bg-info-50 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="flex flex-col items-center justify-center text-center mb-20 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-warm-800">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-lg lg:text-xl text-warm-700 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative border-l-2 border-warm-300 ml-4 md:ml-6 space-y-14 pb-8">
            {steps.map((s, i) => (
              <div key={i} className="relative pl-10 md:pl-16">
                <span className="absolute -left-5 md:-left-6 top-0 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-brand-500 text-white font-bold text-sm md:text-base shadow-md ring-8 ring-info-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-bold text-warm-800 mb-3 mt-1 md:mt-2">{s.title}</h3>
                <p className="text-warm-700 leading-relaxed max-w-xl text-base">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
