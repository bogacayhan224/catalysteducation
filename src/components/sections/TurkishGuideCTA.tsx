"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, MessageCircle } from "lucide-react";
import { event } from "@/lib/gtm";

export function TurkishGuideCTA({
  title = "Kanada diploması yolculuğunuza başlamaya hazır mısınız?",
  description = "Ekibimizden ücretsiz değerlendirme alın ve OSSD programının öğrencinizin mevcut eğitimine nasıl uyduğunu öğrenin.",
  whatsappLabel = "WhatsApp'tan Yazın",
  trackWhatsApp = false,
  locale = "tr",
}: {
  title?: string;
  description?: string;
  whatsappLabel?: string;
  trackWhatsApp?: boolean;
  locale?: "tr" | "en";
}) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    locale === "tr" ? "Merhaba, OSSD hakkında bilgi almak istiyorum." : "Hi, I would like to learn more about the OSSD."
  )}`;

  return (
    <section className="w-full py-16 md:py-20 bg-warm-100 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-brand-500" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-warm-800 leading-tight">
            {title}
          </h2>
          <p className="text-warm-700 leading-relaxed">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappUrl}
              onClick={trackWhatsApp ? () => event({ action: "whatsapp_click", button_text: whatsappLabel, source: "guide_cta", locale }) : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
            >
              <MessageCircle className="h-5 w-5" />
              {whatsappLabel}
            </a>
            <Link
              href={`/${locale}/diploma`}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-white px-8 text-base font-medium text-warm-800 hover:bg-warm-100 transition-colors"
            >
              {locale === "tr" ? "Programı İncele" : "Explore the Program"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
