"use client";

import { useLocale } from "next-intl";

const WHATSAPP_URL =
  "https://wa.me/905334702735?text=Merhaba,%20Catalyst%20Education%20programlar%C4%B1%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";

const TEXTS = {
  tr: "🎓 2026–2027 kayıt dönemi devam ediyor  •  Global eğitim sisteminin bir parçası olmak için şimdi bize ulaşın",
  en: "🎓 2026–2027 enrolment is ongoing  •  Contact us today to become part of a global education system",
};

const ARIA_LABELS = {
  tr: "Kayıt dönemi duyurusu",
  en: "Enrollment announcement",
};

export function AnnouncementBar() {
  const locale = useLocale();
  const text = TEXTS[locale as keyof typeof TEXTS] ?? TEXTS.en;
  const ariaLabel = ARIA_LABELS[locale as keyof typeof ARIA_LABELS] ?? ARIA_LABELS.en;

  return (
    <div
      role="banner"
      aria-label={ariaLabel}
      className="announcement-bar sticky top-0 z-[60] h-9 md:h-10 bg-brand-500 overflow-hidden cursor-pointer flex items-center"
      onClick={() => window.open(WHATSAPP_URL, "_blank", "noopener,noreferrer")}
    >
      <div className="flex whitespace-nowrap animate-ticker select-none" aria-hidden="true">
        <span className="text-white/95 text-[11px] md:text-xs font-medium tracking-wide px-14">
          {text}
        </span>
        <span className="text-white/95 text-[11px] md:text-xs font-medium tracking-wide px-14">
          {text}
        </span>
      </div>
      {/* Screen-reader accessible version */}
      <span className="sr-only">{text}</span>
    </div>
  );
}
