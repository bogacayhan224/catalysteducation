import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, getLocale } from "next-intl/server";

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
    ? "Ontario Secondary School Diploma (OSSD) Program | Catalyst Education"
    : "OSSD Nedir? Kanada Lise Diploması Programı | Catalyst Education";
  const description = isEn
    ? "Learn everything about the Ontario Secondary School Diploma (OSSD) and how to earn it from Turkey through Catalyst Education's official TVO ILC program."
    : "OSSD (Ontario Secondary School Diploma) nedir, nasıl alınır? Türkiye'den Catalyst Education aracılığıyla resmi TVO ILC programıyla Kanada lise diploması edinin.";
  const url = `${SITE_URL}/${locale}/diploma`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/diploma`, en: `${SITE_URL}/en/diploma` },
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
import {
  ShieldCheck, Globe, Monitor, Users, GraduationCap,
  ArrowRight, Check, Info, MessageCircle, MapPin
} from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";
import { FAQ } from "@/components/sections/FAQ";
import { Process } from "@/components/sections/Process";

const whyItems = ["diplomaValue1", "diplomaValue2", "diplomaValue3", "diplomaValue4"] as const;
const whyIcons = [Globe, Monitor, ShieldCheck, GraduationCap];
const whyIconClasses = [
  "bg-brand-50 text-brand-500",
  "bg-info-100 text-[#3B7CB0]",
  "bg-trust-50 text-trust-500",
  "bg-warm-200 text-warm-700",
];

const forWhoItems = ["forWhoItem1", "forWhoItem2", "forWhoItem3"] as const;
const supportItems = [
  "support1", "support2", "support3", "support4", "support5", "support6"
] as const;

export default async function DiplomaPage() {
  const t = await getTranslations("diplomaPage");
  const whatsapp = await getTranslations("whatsapp");
  const locale = await getLocale();
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsapp("message"))}`;
  const isEn = locale === "en";

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Ontario Secondary School Diploma (OSSD)",
    description: isEn
      ? "Earn a recognized Canadian high school diploma fully online from Turkey. Official TVO ILC authorized program with local Turkish support."
      : "Türkiye'den tamamen online olarak tanınan bir Kanada lise diploması edinin. Yerel Türkçe destek ile resmi TVO ILC yetkili programı.",
    provider: {
      "@type": "Organization",
      name: "Catalyst Education",
      url: SITE_URL,
    },
    educationalCredentialAwarded: "Ontario Secondary School Diploma (OSSD)",
    courseMode: "online",
    inLanguage: isEn ? "en" : "tr",
    url: `${SITE_URL}/${locale}/diploma`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Ana Sayfa", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "Ontario Diploma (OSSD)" : "Ontario Diploması (OSSD)", item: `${SITE_URL}/${locale}/diploma` },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-warm-200 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-brand-100/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-info-100/60 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none" />

          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1280px]">
            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">

              {/* Left */}
              <div className="flex flex-col gap-7">
                <div className="inline-flex items-center self-start gap-2.5 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
                  <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={52} height={23} className="flex-shrink-0" />
                  <span className="h-3 w-px bg-warm-400 flex-shrink-0" />
                  <span className="text-xs text-warm-600">{t("badge")}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15] text-warm-800">
                  {t("heroTitle")}
                  <br />
                  <span className="text-brand-500">{t("heroHighlight")}</span>
                </h1>

                <p className="text-lg md:text-xl text-warm-700 leading-relaxed max-w-lg">
                  {t("heroSubtitle")}
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white/70 px-7 text-base font-medium text-warm-800 hover:bg-white transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-5 w-5" />
                    {t("ctaWhatsApp")}
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-warm-300">
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <ShieldCheck className="h-4 w-4 text-trust-500" />
                    <span>{t("trustBar1")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <Globe className="h-4 w-4 text-trust-500" />
                    <span>{t("trustBar2")}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <Monitor className="h-4 w-4 text-trust-500" />
                    <span>{t("trustBar3")}</span>
                  </div>
                </div>
              </div>

              {/* Right: Lead Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT IS THE OSSD ── */}
        <section id="what-is-ossd" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-6">{t("whatTitle")}</h2>
                <div className="space-y-5 text-warm-700 leading-relaxed text-lg">
                  <p>{t("whatDesc1")}</p>
                  <p>{t("whatDesc2")}</p>
                  <p>{t("whatDesc3")}</p>
                  <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4">{t("whatDesc4")}</p>
                </div>
                <Link
                  href={isEn ? "/en/what-is-ossd" : "/tr/ossd-nedir"}
                  className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  {isEn ? "Read the complete OSSD guide →" : "OSSD hakkında kapsamlı rehberi oku →"}
                </Link>
              </div>
              <div className="bg-warm-100 border border-warm-300 rounded-3xl p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-warm-800 text-lg">{t("glanceTitle")}</h3>
                </div>
                {([
                  { label: "glanceLabel1", value: "glanceValue1" },
                  { label: "glanceLabel2", value: "glanceValue2" },
                  { label: "glanceLabel3", value: "glanceValue3", sub: "glanceSub3" },
                  { label: "glanceLabel4", value: "glanceValue4", sub: "glanceSub4" },
                  { label: "glanceLabel5", value: "glanceValue5", highlight: true },
                  { label: "glanceLabel6", value: "glanceValue6" },
                ] as { label: string; value: string; sub?: string; highlight?: boolean }[]).map(({ label, value, sub, highlight }) => (
                  highlight ? (
                    <div key={label} className="flex flex-col gap-1 py-3 border-b border-warm-300 last:border-0 bg-trust-50 -mx-2 px-2 rounded-xl">
                      <span className="text-xs font-semibold text-trust-600 uppercase tracking-wide">{t(label)}</span>
                      <span className="text-sm font-semibold text-trust-700 leading-snug">{t(value)}</span>
                    </div>
                  ) : (
                    <div key={label} className="flex flex-col gap-0.5 py-3 border-b border-warm-300 last:border-0">
                      <span className="text-xs font-semibold text-warm-500 uppercase tracking-wide">{t(label)}</span>
                      <span className="text-sm font-medium text-warm-800">{t(value)}</span>
                      {sub && <span className="text-xs text-warm-500 mt-0.5">{t(sub as Parameters<typeof t>[0])}</span>}
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOR WHO ── */}
        <section className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">{t("forWhoTitle")}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {forWhoItems.map((key) => (
                <div key={key} className="bg-white rounded-3xl border border-warm-200 p-8 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                    <Users className="h-5 w-5 text-brand-500" />
                  </div>
                  <h3 className="font-bold text-warm-800 mb-3">{t(`${key}Title` as Parameters<typeof t>[0])}</h3>
                  <p className="text-warm-700 text-sm leading-relaxed">{t(`${key}Desc` as Parameters<typeof t>[0])}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <div id="how-it-works"><Process /></div>

        {/* ── WHY THE OSSD MATTERS ── */}
        <section id="why-ossd-matters" className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">{t("diplomaValueTitle")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyItems.map((key, i) => {
                const Icon = whyIcons[i];
                return (
                  <div key={key} className="bg-white rounded-3xl border border-warm-200 p-7 hover:shadow-md transition-shadow">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-5 ${whyIconClasses[i]}`}>
                      <Icon size={22} />
                    </div>
                    <h3 className="font-bold text-warm-800 mb-2">{t(`${key}Title` as Parameters<typeof t>[0])}</h3>
                    <p className="text-warm-700 text-sm leading-relaxed">{t(`${key}Desc` as Parameters<typeof t>[0])}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── HOW CATALYST SUPPORTS YOU ── */}
        <section id="catalyst-difference" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-4">{t("supportTitle")}</h2>
                <p className="text-warm-700 leading-relaxed text-lg mb-8">{t("supportDesc")}</p>
                <ul className="space-y-3">
                  {supportItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-trust-500" />
                      </div>
                      <span className="text-warm-700 text-sm">{t(item as Parameters<typeof t>[0])}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Advantage card */}
              <div className="rounded-3xl border border-trust-200 bg-trust-50 p-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-trust-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-trust-500" />
                  </div>
                  <h3 className="font-bold text-warm-800">{t("advantageTitle")}</h3>
                </div>
                <p className="text-warm-700 text-sm leading-relaxed">{t("advantageDesc")}</p>
                <ul className="space-y-2">
                  {(["advantageBullet1", "advantageBullet2", "advantageBullet3"] as const).map((key) => (
                    <li key={key} className="flex items-start gap-2.5">
                      <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-trust-500" />
                      </div>
                      <span className="text-warm-700 text-sm">{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <FAQ />

        {/* ── FINAL CTA ── */}
        <section className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-warm-800">{t("ctaTitle")}</h2>
                <p className="text-warm-700 text-lg leading-relaxed">{t("ctaSubtitle")}</p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 self-start items-center gap-2 rounded-full border border-warm-400 bg-warm-200 px-7 text-sm font-medium text-warm-800 hover:bg-warm-300 transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t("ctaWhatsApp")}
                </a>
                <div className="flex items-center gap-3 pt-2">
                  <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={60} height={28} className="opacity-70" />
                  <span className="text-xs text-warm-500">Authorized Administrative Representative</span>
                </div>
              </div>
              <div>
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
