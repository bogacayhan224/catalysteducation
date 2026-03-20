"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

export function ProblemSection() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section className="w-full py-20 text-white" style={{ background: 'linear-gradient(135deg, #5A0F1A 0%, #8B1E2D 60%, #B33A4A 100%)' }}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/80">
            <AlertTriangle className="h-4 w-4 text-white/70" />
            {t("title")}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl">
            {t("subtitle")}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 p-6 rounded-xl bg-white/10 border border-white/15"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20 text-white text-sm font-bold">
                {i + 1}
              </div>
              <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
              <p className="text-sm text-white/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
