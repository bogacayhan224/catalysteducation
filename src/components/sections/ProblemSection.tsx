"use client";

import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

export function ProblemSection() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section className="w-full py-20 bg-zinc-900 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-800 px-4 py-1.5 text-sm text-zinc-300">
            <AlertTriangle className="h-4 w-4 text-accent-500" />
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
              className="flex flex-col gap-3 p-6 rounded-xl bg-zinc-800/60 border border-zinc-700/50"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-700 text-zinc-400 text-sm font-bold">
                {i + 1}
              </div>
              <h3 className="font-bold text-white text-base leading-snug">{item.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
