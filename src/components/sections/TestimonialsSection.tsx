import { getLocale } from "next-intl/server";
import { getTestimonials } from "@/sanity/lib/queries";
import type { Testimonial } from "@/sanity/lib/queries";
import { BookOpen, Target, GraduationCap, Quote } from "lucide-react";

// ─────────────────────────────────────────────
// STATIC CONTENT
// ─────────────────────────────────────────────

const FALLBACK = {
  tr: {
    title: "Öğrencilerimiz Bu Programla Neler Kazanıyor?",
    subtitle:
      "Program sürecinde öğrencilerimizin akademik planlama, diploma tamamlama ve üniversite başvuru yolculuğunda elde edebileceği kazanımlardan örnekler.",
    cards: [
      {
        icon: BookOpen,
        title: "Akademik Esneklik",
        text: "Türkiye'de okuluna devam ederken Kanada lise diplomasını planlı şekilde tamamlayabilir ve uluslararası üniversite başvurularında güçlü bir akademik avantaj elde edebilir.",
      },
      {
        icon: Target,
        title: "Planlı İlerleme",
        text: "Program sürecinde düzenli akademik yönlendirme ile ders planlamasını daha sağlıklı yönetebilir, diploma gerekliliklerini adım adım tamamlayabilir.",
      },
      {
        icon: GraduationCap,
        title: "Güçlü Üniversite Hazırlığı",
        text: "Mevcut okul düzenini bozmadan ikinci diploma hedefini sürdürebilir ve üniversite başvuru sürecini daha güvenli ve organize şekilde yürütebilir.",
      },
    ],
  },
  en: {
    title: "What Students Gain From This Program",
    subtitle:
      "Examples of what students can achieve during their academic planning, diploma completion, and university application journey.",
    cards: [
      {
        icon: BookOpen,
        title: "Academic Flexibility",
        text: "Students can complete the Ontario high school diploma program while continuing at their school in Turkey, gaining a strong academic advantage in international university applications.",
      },
      {
        icon: Target,
        title: "Planned Progress",
        text: "With regular academic guidance throughout the program, students can manage course planning more effectively and complete diploma requirements step by step.",
      },
      {
        icon: GraduationCap,
        title: "Strong University Preparation",
        text: "Students can pursue their second diploma goal without disrupting their current school schedule, and navigate the university application process with greater confidence.",
      },
    ],
  },
} as const;

const REAL_LABELS = {
  tr: {
    title: "Öğrencilerimizin Deneyimleri",
    subtitle:
      "Programı tamamlayan öğrencilerimizin deneyimlerinden ve eğitim yolculuklarından örnekler.",
  },
  en: {
    title: "Student Experiences",
    subtitle:
      "Experiences from students who completed the program and examples from their educational journeys.",
  },
} as const;

type Locale = "tr" | "en";

// ─────────────────────────────────────────────
// FALLBACK — outcome / benefit cards
// ─────────────────────────────────────────────

function FallbackOutcomes({ locale }: { locale: Locale }) {
  const content = FALLBACK[locale] ?? FALLBACK.tr;

  return (
    <section className="w-full py-16 md:py-24 bg-warm-200 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-warm-800 max-w-2xl mx-auto leading-tight">
            {content.title}
          </h2>
          <p className="text-warm-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {content.cards.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="bg-white rounded-2xl p-7 border border-warm-300 shadow-[0_2px_12px_rgba(31,29,26,0.06)] hover:shadow-[0_6px_24px_rgba(31,29,26,0.09)] transition-shadow flex flex-col gap-5"
            >
              <div className="h-11 w-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-brand-500" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-base text-warm-800">{title}</h3>
                <p className="text-sm text-warm-600 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// REAL TESTIMONIALS — CMS-driven quote cards
// ─────────────────────────────────────────────

function RealTestimonials({
  items,
  locale,
}: {
  items: Testimonial[];
  locale: Locale;
}) {
  const labels = REAL_LABELS[locale] ?? REAL_LABELS.tr;

  const gridClass =
    items.length === 1
      ? "md:grid-cols-1 max-w-lg mx-auto"
      : items.length === 2
      ? "md:grid-cols-2 max-w-3xl mx-auto"
      : "md:grid-cols-3";

  return (
    <section className="w-full py-16 md:py-24 bg-warm-800">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-tight">
            {labels.title}
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            {labels.subtitle}
          </p>
        </div>

        <div className={`grid gap-6 ${gridClass}`}>
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 border border-white/15 rounded-2xl p-7 flex flex-col gap-5 hover:bg-white/15 transition-colors"
            >
              <Quote className="h-6 w-6 text-brand-300 flex-shrink-0" />
              <p className="text-white/90 text-sm leading-relaxed flex-1">
                {item.quote}
              </p>
              <div className="border-t border-white/10 pt-4">
                <p className="text-white font-semibold text-sm">{item.parentName}</p>
                {item.studentInfo && (
                  <p className="text-white/50 text-xs mt-0.5">{item.studentInfo}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// MAIN EXPORT — server component
// ─────────────────────────────────────────────

export async function TestimonialsSection() {
  const locale = await getLocale();
  const testimonials = await getTestimonials(locale);

  if (testimonials.length > 0) {
    return <RealTestimonials items={testimonials} locale={locale as Locale} />;
  }

  return <FallbackOutcomes locale={locale as Locale} />;
}
