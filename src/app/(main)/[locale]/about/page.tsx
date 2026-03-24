import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { getTranslations } from "next-intl/server";
import { Calendar, Users, MapPin, Check } from "lucide-react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn
    ? "About Us — Authorized TVO ILC Representative in Turkey | Catalyst Education"
    : "Hakkımızda — TVO ILC Türkiye Yetkili Temsilcisi | Catalyst Education";
  const description = isEn
    ? "Catalyst Education is Turkey's official TVO ILC representative, helping students earn an Ontario Secondary School Diploma (OSSD) with local support."
    : "Catalyst Education, Türkiye'nin resmi TVO ILC temsilcisidir. Öğrencilerin Ontario Secondary School Diploma (OSSD) almasına yerel destek sağlıyoruz.";
  const url = `${SITE_URL}/${locale}/about`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/about`, en: `${SITE_URL}/en/about` },
    },
    openGraph: {
      title, description, url,
      siteName: "Catalyst Education",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: ogImage(title),
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage(title)[0].url] },
  };
}
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="text-white py-20 lg:py-28 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5A0F1A 0%, #8B1E2D 60%, #B33A4A 100%)' }}>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D0D14_1px,transparent_1px),linear-gradient(to_bottom,#3D0D14_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {t("heroTitle")}
            </h1>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
              {t("heroSubtitle")}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm text-white/90">
                <Check className="h-4 w-4 text-trust-400 flex-shrink-0" />
                {t("heroCredential1")}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-5 py-2 text-sm text-white/90">
                <Check className="h-4 w-4 text-trust-400 flex-shrink-0" />
                {t("heroCredential2")}
              </span>
            </div>
          </div>
        </section>

        {/* ── MISSION + CATALYST FARKI ── */}
        <section className="py-20 bg-white border-b border-warm-200">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px]">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl font-bold text-warm-800 mb-6">{t("missionTitle")}</h2>
                <div className="space-y-5 text-warm-700 leading-relaxed">
                  <p>{t("mission1")}</p>
                  <p>{t("mission2")}</p>
                  <p>{t("mission3")}</p>
                  <p>{t("mission4")}</p>
                </div>
              </div>
              <div className="bg-warm-100 border border-warm-300 rounded-3xl p-8">
                <h3 className="text-xl font-bold text-warm-800 mb-6">{t("differenceTitle")}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">1</span>
                    <div>
                      <p className="font-semibold text-warm-800 mb-1">{t("diff1Title")}</p>
                      <p className="text-sm text-warm-600 leading-relaxed">{t("diff1Desc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">2</span>
                    <div>
                      <p className="font-semibold text-warm-800 mb-1">{t("diff2Title")}</p>
                      <p className="text-sm text-warm-600 leading-relaxed">{t("diff2Desc")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="h-8 w-8 rounded-full bg-brand-500 text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">3</span>
                    <div>
                      <p className="font-semibold text-warm-800 mb-1">{t("diff3Title")}</p>
                      <p className="text-sm text-warm-600 leading-relaxed">{t("diff3Desc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="py-20 bg-warm-50 border-b border-warm-200">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px]">
            <h2 className="text-3xl font-bold text-warm-800 text-center mb-12">{t("statsTitle")}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-warm-300 rounded-3xl p-8 text-center">
                <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-6 w-6 text-brand-500" />
                </div>
                <p className="text-3xl font-bold text-warm-800 mb-1">{t("stat1Value")}</p>
                <p className="text-sm font-semibold text-warm-600 mb-3">{t("stat1Label")}</p>
                <p className="text-sm text-warm-600 leading-relaxed">{t("stat1Desc")}</p>
              </div>
              <div className="bg-white border border-warm-300 rounded-3xl p-8 text-center">
                <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-brand-500" />
                </div>
                <p className="text-3xl font-bold text-warm-800 mb-1">{t("stat2Value")}</p>
                <p className="text-sm font-semibold text-warm-600 mb-3">{t("stat2Label")}</p>
                <p className="text-sm text-warm-600 leading-relaxed">{t("stat2Desc")}</p>
              </div>
              <div className="bg-white border border-warm-300 rounded-3xl p-8 text-center">
                <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-brand-500" />
                </div>
                <p className="text-3xl font-bold text-warm-800 mb-1">{t("stat3Value")}</p>
                <p className="text-sm font-semibold text-warm-600 mb-3">{t("stat3Label")}</p>
                <p className="text-sm text-warm-600 leading-relaxed">{t("stat3Desc")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS — CMS-driven, fallback if empty ── */}
        <TestimonialsSection />

      </main>
    </div>
  );
}
