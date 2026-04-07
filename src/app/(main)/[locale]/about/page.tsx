import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { getTranslations, getLocale } from "next-intl/server";
import { Calendar, Users, MapPin, Check, ArrowRight, Shield, Globe, GraduationCap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
  const locale = await getLocale();
  const isEn = locale === "en";

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Ana Sayfa", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "About Us" : "Hakkımızda", item: `${SITE_URL}/${locale}/about` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="text-white py-20 lg:py-28 text-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #5A0F1A 0%, #8B1E2D 60%, #B33A4A 100%)' }}>
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src="/about-hero-bg.png"
              alt=""
              fill
              className="object-cover object-center opacity-25"
              priority
            />
          </div>
          {/* Dark gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3D0D14]/70 via-[#5A0F1A]/60 to-[#3D0D14]/80" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D0D14_1px,transparent_1px),linear-gradient(to_bottom,#3D0D14_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
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
        <section className="py-20 bg-white border-b border-warm-200 relative overflow-hidden">
          {/* Subtle background image */}
          <div className="absolute inset-0">
            <Image
              src="/about-mission-img.png"
              alt=""
              fill
              className="object-cover object-right opacity-[0.07]"
            />
          </div>
          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1280px]">
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
              <div className="bg-white/80 backdrop-blur-sm border border-warm-300 rounded-3xl p-8">
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

        {/* ── TVO ILC SECTION ── */}
        <section className="py-20 bg-white border-b border-warm-200">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px]">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
              {/* Left: Text + facts */}
              <div className="flex flex-col gap-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-trust-200 bg-trust-50 px-4 py-1.5 mb-5">
                    <Shield className="h-3.5 w-3.5 text-trust-500" />
                    <span className="text-xs font-semibold text-trust-500">
                      {isEn ? "Our Education Partner" : "Eğitim Ortağımız"}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-warm-800 mb-5">
                    {isEn
                      ? "TVO ILC: Ontario's Official Online High School"
                      : "TVO ILC: Ontario'nun Resmî Online Lisesi"}
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed mb-8">
                    <p>
                      {isEn
                        ? "TVO ILC (Independent Learning Centre) is an official online high school within Ontario's publicly governed education system. It provides secondary school credits and the Ontario Secondary School Diploma (OSSD) — the same diploma recognized by universities across Canada and the world."
                        : "TVO ILC (Independent Learning Centre), Ontario eyaletinin kamuya bağlı eğitim sistemi bünyesinde faaliyet gösteren resmî bir online lise yapısıdır. Ontario müfredatına göre lise kredisi ve OSSD diploması verir; bu diploma Kanada ve dünya genelindeki üniversiteler tarafından tanınır."}
                    </p>
                    <p>
                      {isEn
                        ? "Catalyst Education acts as TVO's authorized administrative representative in Turkey — guiding students through enrollment, course planning, and the full diploma process with structured local support."
                        : "Catalyst Education, TVO'nun Türkiye'deki yetkili idari temsilcisi olarak öğrencilere kayıt, ders planlaması ve diploma sürecinin tamamında yapılandırılmış yerel destek sağlar."}
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-3 mb-8">
                    {[
                      { icon: Shield, label: isEn ? "Publicly governed" : "Kamuya bağlı kurum" },
                      { icon: Globe, label: isEn ? "Students in 90+ countries" : "90+ ülkeden öğrenci" },
                      { icon: GraduationCap, label: isEn ? "Official OSSD authority" : "Resmî diploma yetkisi" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 bg-trust-50 border border-trust-100 rounded-xl px-4 py-3">
                        <Icon className="h-4 w-4 text-trust-500 flex-shrink-0" />
                        <span className="text-xs font-medium text-warm-700">{label}</span>
                      </div>
                    ))}
                  </div>
                  <Link
                    href={isEn ? "/en/what-is-tvo-and-tvo-ilc" : "/tr/tvo-ve-tvo-ilc-nedir"}
                    className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
                  >
                    {isEn ? "Read the full TVO ILC guide" : "TVO ILC hakkında detaylı rehberi okuyun"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Key facts */}
                <div className="bg-warm-50 border border-warm-300 rounded-2xl p-6">
                  <h3 className="font-bold text-warm-800 mb-5 text-base">
                    {isEn ? "Why TVO ILC Is Trusted" : "TVO ILC Neden Güvenilir?"}
                  </h3>
                  <div className="space-y-3.5">
                    {(isEn ? [
                      { title: "Established in 1926", desc: "One of Ontario's oldest distance learning institutions." },
                      { title: "Ontario Ministry of Education", desc: "Part of Ontario's official education system." },
                      { title: "Largest online high school in Ontario", desc: "Serves students across more than 90 countries." },
                      { title: "OSSD diploma authority", desc: "Authorized to issue the Ontario Secondary School Diploma." },
                    ] : [
                      { title: "1926'dan bu yana", desc: "Ontario'nun en köklü uzaktan eğitim kurumlarından biri." },
                      { title: "Ontario Eğitim Bakanlığı bünyesinde", desc: "Resmî Ontario eğitim sisteminin parçası." },
                      { title: "Ontario'nun en büyük online lisesi", desc: "90'dan fazla ülkede öğrencilere ulaşmaktadır." },
                      { title: "Resmî OSSD diploma yetkisi", desc: "Ontario Lise Diplomasını verme yetkisine sahiptir." },
                    ]).map(({ title, desc }) => (
                      <div key={title} className="flex items-start gap-3">
                        <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3 w-3 text-trust-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-warm-800 text-sm">{title}</p>
                          <p className="text-xs text-warm-500 leading-relaxed mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Authorization letter only */}
              <div className="relative">
                <div className="bg-white border border-warm-300 rounded-2xl shadow-md overflow-hidden">
                  {/* Header bar */}
                  <div className="flex items-center justify-between px-5 py-3 bg-warm-50 border-b border-warm-200">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-brand-400" />
                      <span className="text-xs font-semibold text-warm-600">
                        {isEn ? "Letter of Authorization — TVO ILC" : "Yetki Belgesi — TVO ILC"}
                      </span>
                    </div>
                    <span className="text-xs text-warm-400">Aug 25, 2023</span>
                  </div>
                  {/* Letter image — full document, natural ratio */}
                  <Image
                    src="/tvo-authorization-letter.webp"
                    alt={isEn
                      ? "TVO ILC Letter of Authorization confirming Catalyst Education as authorized representative"
                      : "TVO ILC Yetki Belgesi — Catalyst Education'ın yetkili temsilci olduğunu teyit eden resmî mektup"}
                    width={2188}
                    height={2636}
                    sizes="(max-width: 768px) 100vw, 560px"
                    className="w-full h-auto"
                  />
                </div>
                {/* Trust badge */}
                <div className="absolute -bottom-3 -right-3 bg-trust-500 text-white rounded-xl px-3 py-2 shadow-md flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">
                    {isEn ? "Verified" : "Resmî Belge"}
                  </span>
                </div>
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
