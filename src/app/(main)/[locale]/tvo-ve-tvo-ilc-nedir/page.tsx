import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import {
  GraduationCap,
  Globe,
  Monitor,
  MessageCircle,
  Check,
  ArrowRight,
  ChevronRight,
  BookOpen,
  Clock,
  Building2,
  Shield,
} from "lucide-react";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

const PAGE_URL_TR = `${SITE_URL}/tr/tvo-ve-tvo-ilc-nedir`;
const PAGE_URL_EN = `${SITE_URL}/en/what-is-tvo-and-tvo-ilc`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "What Is TVO and TVO ILC? | Catalyst Education",
      alternates: { canonical: PAGE_URL_EN },
    };
  }

  const title =
    "TVO ve TVO ILC Nedir? OSSD ve Kanada Çift Diploma Rehberi | Catalyst Education";
  const description =
    "TVO ve TVO ILC nedir? OSSD, Kanada lise diploması ve çift diploma programı hakkında detaylı rehber. Resmî eğitim modeli ve başvuru sürecini öğrenin.";

  return {
    title,
    description,
    alternates: {
      canonical: PAGE_URL_TR,
      languages: { tr: PAGE_URL_TR, en: PAGE_URL_EN },
    },
    openGraph: {
      title,
      description,
      url: PAGE_URL_TR,
      siteName: "Catalyst Education",
      type: "article",
      locale: "tr_TR",
      images: ogImage(title),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage(title)[0].url],
    },
  };
}

/* ─── FAQ DATA ─────────────────────────────────────────── */

const faqItems = [
  {
    question: "TVO ILC nedir?",
    answer:
      "TVO ILC, Ontario eyaletinde faaliyet gösteren resmî bir online lise kurumudur. Ontario eğitim sistemine bağlı olan TVO ILC, öğrencilere lise kredisi ve OSSD diploması kazandırır.",
  },
  {
    question: "OSSD nedir?",
    answer:
      "OSSD (Ontario Secondary School Diploma), Kanada'nın Ontario eyaletine ait resmî lise diplomasıdır. Uluslararası geçerliliğe sahip olan bu diploma, dünya genelindeki üniversitelere başvuru yapılmasını sağlar.",
  },
  {
    question: "Kanada çift diploma programı nedir?",
    answer:
      "Kanada çift diploma programı, öğrencinin Türkiye'deki eğitimine devam ederken aynı zamanda Kanada lise diploması (OSSD) almasını sağlayan eğitim modelidir. Öğrenci iki ayrı diploma ile mezun olur.",
  },
  {
    question: "TVO ILC diploması geçerli mi?",
    answer:
      "Evet. OSSD diploması uluslararası geçerliliğe sahiptir ve Kanada, İngiltere, Avrupa ve dünyanın pek çok ülkesindeki üniversiteler tarafından kabul görmektedir.",
  },
  {
    question: "TVO ILC güvenilir mi?",
    answer:
      "Evet. TVO ILC, kamuya bağlı bir eğitim yapısı olan TVO bünyesinde faaliyet gösterir. Ontario eğitim sistemine bağlıdır, resmî diploma verme yetkisine sahiptir ve kökleri 1926 yılına uzanan bir eğitim geleneğine dayanmaktadır.",
  },
  {
    question: "TVO ile TVO ILC arasındaki fark nedir?",
    answer:
      "TVO, Ontario eyaletine bağlı kamuya ait bir eğitim kuruluşudur; dijital öğrenme çözümleri geliştirir ve çeşitli eğitim hizmetleri sunar. TVO ILC ise TVO bünyesindeki lise düzeyinde faaliyet gösteren online eğitim yapısıdır. OSSD diploması TVO ILC aracılığıyla kazanılır.",
  },
  {
    question: "TVO ILC ile Kanada lise diploması nasıl alınır?",
    answer:
      "Öğrencinin akademik geçmişi değerlendirilerek kişisel ders planı oluşturulur. Öğrenci online derslerini tamamlar, mezuniyet şartlarını karşılar ve OSSD diplomasını alır. Catalyst Education bu süreçte kayıt, planlama ve rehberlik desteği sağlar.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "TVO ve TVO ILC Nedir? OSSD ve Kanada Çift Diploma Rehberi",
  description:
    "TVO ve TVO ILC nedir? OSSD, Kanada lise diploması ve çift diploma programı hakkında detaylı rehber.",
  author: { "@type": "Organization", name: "Catalyst Education", url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: "Catalyst Education",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-04-07",
  dateModified: "2026-04-07",
  url: PAGE_URL_TR,
  inLanguage: "tr",
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL_TR },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: Array.isArray(item.answer) ? item.answer.join(" ") : item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/tr` },
    { "@type": "ListItem", position: 2, name: "Rehberler", item: `${SITE_URL}/tr/rehberler` },
    { "@type": "ListItem", position: 3, name: "TVO ve TVO ILC Nedir?", item: PAGE_URL_TR },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "tvo-nedir", label: "TVO Nedir?" },
  { id: "tvo-ilc-nedir", label: "TVO ILC Nedir?" },
  { id: "ossd-nedir", label: "OSSD Nedir ve Neden Önemlidir?" },
  { id: "cift-diploma", label: "Kanada Çift Diploma Programı Nedir?" },
  { id: "tarihce", label: "TVO ILC'nin Tarihçesi" },
  { id: "olcek", label: "TVO ILC'nin Ölçeği ve Gücü" },
  { id: "nasil-alinir", label: "Kanada Lise Diploması Nasıl Alınır?" },
  { id: "neden-guvenilir", label: "Neden Güvenilir Bir Model?" },
  { id: "catalyst-rolu", label: "Catalyst Education'ın Rolü" },
  { id: "sss", label: "Sık Sorulan Sorular" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function TvoVeTvoIlcNedirPage() {
  const locale = await getLocale();
  if (locale === "en") {
    redirect("/en/what-is-tvo-and-tvo-ilc");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, TVO ILC ve Kanada lise diploması hakkında bilgi almak istiyorum."
  )}`;

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-warm-200 pt-16 pb-14 lg:pt-20 lg:pb-16">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1280px]">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-2 text-sm text-warm-500">
                <li>
                  <Link href="/tr" className="hover:text-warm-700 transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href="/tr/rehberler" className="hover:text-warm-700 transition-colors">
                    Rehberler
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page">
                  <span className="text-warm-800 font-medium">TVO ve TVO ILC Nedir?</span>
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                <BookOpen className="h-4 w-4 text-brand-500" />
                <span className="text-xs text-warm-600">
                  Eğitim Rehberi · 2026
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                TVO ve TVO ILC Nedir?{" "}
                <span className="text-brand-500">OSSD ve Kanada Çift Diploma</span>{" "}
                Rehberi
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                Kanada lise diploması araştıran aileler sıklıkla soruyor: TVO nedir,
                TVO ILC nedir, bu kurum güvenilir mi? Bu rehberde TVO ILC&apos;nin yapısını,
                tarihçesini ve Ontario eğitim sistemindeki rolünü detaylıca ele alıyoruz.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />10 dk okuma
                </span>
                <span>·</span>
                <span>7 Nisan 2026</span>
                <span>·</span>
                <span>Catalyst Education</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="bg-white border-t border-warm-300">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px] py-12 md:py-16">
            <div className="grid lg:grid-cols-[1fr_300px] gap-12 lg:gap-16 items-start">

              {/* ── Article ── */}
              <article className="min-w-0">

                {/* Featured Snippet */}
                <div
                  id="featured-snippet"
                  className="bg-trust-50 border border-trust-200 rounded-2xl p-7 mb-10"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="h-9 w-9 rounded-xl bg-trust-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="h-5 w-5 text-trust-500" />
                    </div>
                    <h2 className="font-bold text-warm-800 text-lg leading-snug">
                      Kısa Cevap: TVO ve TVO ILC
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    <strong>TVO</strong>, Ontario eyaletine bağlı kamuya ait bir eğitim
                    kuruluşudur. <strong>TVO ILC</strong> ise TVO bünyesindeki resmî online
                    lise yapısıdır; öğrencilere{" "}
                    <Link href="/tr/ossd-nedir" className="text-brand-500 underline underline-offset-2 hover:text-brand-600">
                      OSSD (Ontario Secondary School Diploma)
                    </Link>{" "}
                    kazandırır.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Building2, label: "Kamuya bağlı kurum" },
                      { icon: Globe, label: "90+ ülkeden öğrenci" },
                      { icon: Shield, label: "Resmî diploma yetkisi" },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-2 bg-white/70 rounded-xl px-4 py-3"
                      >
                        <Icon className="h-4 w-4 text-trust-500 flex-shrink-0" />
                        <span className="text-sm font-medium text-warm-700">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mobile TOC */}
                <div className="lg:hidden bg-warm-100 border border-warm-300 rounded-2xl p-6 mb-10">
                  <h3 className="font-bold text-warm-800 mb-4 flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-brand-500" />
                    İçindekiler
                  </h3>
                  <ol className="space-y-2">
                    {tocItems.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-center gap-2 text-sm text-warm-600 hover:text-brand-500 transition-colors"
                        >
                          <span className="text-xs text-warm-400 w-5 flex-shrink-0">
                            {i + 1}.
                          </span>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* ── Section 1: TVO Nedir? ── */}
                <div id="tvo-nedir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    TVO Nedir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      <strong>TVO</strong>, Kanada&apos;nın Ontario eyaletine bağlı,
                      kamuya ait bir eğitim kuruluşudur. Ontario eğitim sisteminin
                      resmî kurumlarından biri olan TVO; dijital öğrenme çözümleri
                      geliştirir, eğitim içerikleri üretir ve öğrencilere çeşitli
                      öğrenme fırsatları sunar.
                    </p>
                    <p>
                      TVO yalnızca bir medya kuruluşu değil; eğitim teknolojileri ve
                      dijital öğrenme alanında faaliyet gösteren, kamu tarafından
                      desteklenen bir eğitim kurumudur.
                    </p>
                    <p>
                      TVO bünyesinde farklı eğitim hizmetleri bulunmaktadır. Bu
                      hizmetlerin en önemlilerinden biri, lise düzeyindeki eğitim
                      modeli olan <strong>TVO ILC</strong>&apos;dir.
                    </p>
                  </div>
                </div>

                {/* ── Section 2: TVO ILC Nedir? ── */}
                <div id="tvo-ilc-nedir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    TVO ILC Nedir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      <strong>TVO ILC</strong> (Independent Learning Centre), Ontario
                      eyaletinde faaliyet gösteren resmî bir online lise yapısıdır.
                    </p>
                    <p>
                      TVO ILC; Ontario eğitim sistemi içinde yer alır, resmî lise
                      kredisi ve diploma sağlar, Ontario müfredatına göre eğitim verir
                      ve öğrencilere{" "}
                      <Link
                        href="/tr/ossd-nedir"
                        className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        OSSD (Ontario Secondary School Diploma)
                      </Link>{" "}
                      kazandırır.
                    </p>
                    <p>
                      Bağımsız eğitim raporlarında TVO ILC,{" "}
                      <strong>Ontario&apos;nun en büyük online lisesi</strong> olarak
                      gösterilmektedir. Ontario Eğitim Bakanlığı&apos;nın uzaktan eğitim
                      modelinde önemli bir rol üstlenen bu yapı, öğrencilere esneklik
                      ve kaliteli akademik içerik sunar.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7">
                    <h3 className="font-bold text-warm-800 mb-4">
                      TVO ILC&apos;nin Temel Özellikleri
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Ontario eğitim sistemine bağlı resmî lise yapısı",
                        "OSSD diploması verme yetkisine sahip",
                        "Ontario müfredatına uygun online dersler",
                        "Uluslararası öğrencilere erişim imkânı",
                        "Esnek ders programı ve kendi hızında ilerleme",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3.5 w-3.5 text-trust-500" />
                          </div>
                          <span className="text-warm-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ── Section 3: OSSD Nedir? ── */}
                <div id="ossd-nedir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Nedir ve Neden Önemlidir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      <Link
                        href="/tr/ossd-nedir"
                        className="font-semibold text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        OSSD (Ontario Secondary School Diploma)
                      </Link>
                      , Kanada&apos;nın Ontario eyaletine ait resmî lise diplomasıdır.
                      Uluslararası geçerliliğe sahip olan bu diploma; Kanada, İngiltere,
                      Avrupa ve dünyanın pek çok ülkesindeki üniversitelere başvuru
                      yapılmasını sağlar.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7 mb-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      OSSD Diploması İçin Mezuniyet Gereklilikleri
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "En az 30 kredi tamamlanması",
                        "Okuryazarlık şartının yerine getirilmesi (OSSLT)",
                        "40 saat toplum hizmeti tamamlanması",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3.5 w-3.5 text-trust-500" />
                          </div>
                          <span className="text-warm-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    OSSD, öğrencilerin uluslararası üniversite başvurularında güçlü bir
                    akademik profil oluşturmasını sağlar. Bu diploma, yalnızca bir mezuniyet
                    belgesi değil; öğrencinin gelecekteki eğitim seçeneklerini genişleten
                    stratejik bir akademik adımdır.
                  </p>
                </div>

                {/* ── Section 4: Çift Diploma ── */}
                <div id="cift-diploma" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Kanada Çift Diploma Programı Nedir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Kanada çift diploma programı, öğrencinin Türkiye&apos;deki eğitimine
                      devam ederken aynı zamanda{" "}
                      <Link
                        href="/tr/kanada-lise-diplomasi-nasil-alinir"
                        className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        Kanada lise diploması
                      </Link>{" "}
                      almasını sağlayan bir eğitim modelidir.
                    </p>
                    <p>
                      Bu modelde öğrenci; mevcut okuluna devam eder, online dersler alır,
                      Ontario müfredatına göre eğitim görür ve iki diploma ile mezun olur.
                    </p>
                    <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4 py-1">
                      Çift diploma programı, uluslararası eğitim hedefi olan öğrenciler için
                      güçlü bir akademik avantaj sağlar.
                    </p>
                    <p>
                      <Link
                        href="/tr/ossd-cift-diploma"
                        className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        OSSD çift diploma nedir? →
                      </Link>
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Çift Diploma Modeli — Nasıl İşler?
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Öğrenci Türkiye'deki okuluna devam eder",
                        "Eş zamanlı olarak TVO ILC derslerini online sürdürür",
                        "Mevcut dersleri kredi olarak değerlendirilebilir",
                        "Her iki diplomanın gerekliliklerini tamamlayarak mezun olur",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-trust-500" />
                          </div>
                          <span className="text-warm-700 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* ── Section 5: Tarihçe ── */}
                <div id="tarihce" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    TVO ILC&apos;nin Tarihçesi
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      TVO ILC&apos;nin kökleri 1926 yılına kadar uzanmaktadır. Bu dönemde
                      Ontario eyaletinde uzaktan eğitim sistemleri geliştirilmeye
                      başlanmıştır.
                    </p>
                    <p>
                      Bu süreç, TVO ILC&apos;nin kısa vadeli bir girişim değil; uzun yıllara
                      dayanan bir eğitim modelinin devamı olduğunu göstermektedir.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7">
                    <h3 className="font-bold text-warm-800 mb-5">Önemli Kilometre Taşları</h3>
                    <div className="space-y-4">
                      {[
                        { year: "1926", desc: "Ontario'da uzaktan eğitim uygulamalarının başlaması" },
                        { year: "1984", desc: "Independent Learning Centre (ILC) adının resmî hale gelmesi" },
                        { year: "2002", desc: "ILC sorumluluğunun TVO'ya devredilmesi" },
                        { year: "2019", desc: "Derslerin modern dijital öğrenme platformuna taşınması" },
                      ].map(({ year, desc }) => (
                        <div key={year} className="flex gap-4 items-start">
                          <div className="flex-shrink-0 w-14 h-8 rounded-lg bg-brand-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-brand-600">{year}</span>
                          </div>
                          <p className="text-warm-700 text-sm leading-relaxed pt-1">{desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Section 6: Ölçek ── */}
                <div id="olcek" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    TVO ILC&apos;nin Ölçeği ve Gücü
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Bağımsız eğitim raporlarına göre TVO ILC, uluslararası ölçekte faaliyet
                    gösteren büyük bir eğitim yapısıdır.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: Building2, stat: "250+", label: "Partner özel okul" },
                      { icon: Globe, stat: "90+", label: "Ülkeden öğrenci" },
                      { icon: Monitor, stat: "Binlerce", label: "Öğrenci / yıl" },
                      { icon: GraduationCap, stat: "Ontario", label: "Tüm okul bölgeleriyle ilişkili" },
                    ].map(({ icon: Icon, stat, label }) => (
                      <div key={label} className="flex items-center gap-4 bg-warm-50 border border-warm-200 rounded-2xl px-5 py-4">
                        <div className="h-10 w-10 rounded-xl bg-trust-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-trust-500" />
                        </div>
                        <div>
                          <div className="font-bold text-warm-800 text-lg leading-none mb-0.5">{stat}</div>
                          <div className="text-sm text-warm-600">{label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    Bu göstergeler, TVO ILC&apos;nin uluslararası öğrencilere erişim sunan
                    büyük ve köklü bir eğitim yapısı olduğunu ortaya koymaktadır.
                  </p>
                </div>

                {/* ── Section 7: Nasıl Alınır? ── */}
                <div id="nasil-alinir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    TVO ILC ile{" "}
                    <Link
                      href="/tr/kanada-lise-diplomasi-nasil-alinir"
                      className="text-brand-500 hover:text-brand-600"
                    >
                      Kanada Lise Diploması
                    </Link>{" "}
                    Nasıl Alınır?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    TVO ILC aracılığıyla Kanada lise diploması alma süreci belirli adımlardan
                    oluşur.
                  </p>
                  <div className="space-y-4 mb-6">
                    {[
                      { step: "1", title: "Akademik Değerlendirme", desc: "Öğrencinin mevcut eğitim geçmişi ve ders notları değerlendirilir." },
                      { step: "2", title: "Ders Planı Oluşturma", desc: "Mezuniyet için gerekli dersler belirlenir ve kişisel ders planı hazırlanır." },
                      { step: "3", title: "Online Derslerin Tamamlanması", desc: "Öğrenci TVO ILC platformu üzerinden Ontario müfredatına uygun derslerini alır." },
                      { step: "4", title: "Mezuniyet Şartlarının Karşılanması", desc: "30 kredi, okuryazarlık şartı ve toplum hizmeti saatleri tamamlanır." },
                    ].map(({ step, title, desc }) => (
                      <div key={step} className="flex gap-4 items-start">
                        <div className="flex-shrink-0 h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center">
                          <span className="text-sm font-bold text-brand-600">{step}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-warm-800 mb-1">{title}</h3>
                          <p className="text-warm-600 text-sm leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Başvuru süreci ve detaylar hakkında bilgi almak için{" "}
                    <Link href="/tr/apply" className="text-brand-500 underline underline-offset-2 hover:text-brand-600">
                      başvuru sayfamızı
                    </Link>{" "}
                    inceleyebilirsiniz.
                  </p>
                </div>

                {/* ── Section 8: Neden Güvenilir? ── */}
                <div id="neden-guvenilir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    TVO ILC Neden Güvenilir Bir Eğitim Modelidir?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Bir eğitim kurumunun güvenilirliğini belirleyen temel unsurlar;
                    kurumsal yapı, resmî statü, akademik standart, tarihçe ve ölçektir.
                    TVO ILC bu unsurların tamamına sahiptir.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      "Kamuya bağlı bir eğitim yapısı tarafından yönetilmesi",
                      "Ontario eğitim sistemine bağlı olması ve resmî statüye sahip bulunması",
                      "Resmî diploma verme yetkisine sahip olması",
                      "Standart değerlendirme süreçleri kullanması",
                      "1926'dan bu yana süregelen köklü bir eğitim geleneği",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-trust-500" />
                        </div>
                        <span className="text-warm-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4 py-1 text-lg">
                    TVO ILC yalnızca bir online eğitim platformu değil; Ontario&apos;nun
                    resmî ve köklü dijital lise modelidir.
                  </p>
                </div>

                {/* ── Section 9: Catalyst Rolü ── */}
                <div id="catalyst-rolu" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Catalyst Education Bu Süreçte Nasıl Rol Oynar?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Catalyst Education, TVO ile yapılan iş birliği kapsamında
                      öğrencilerin eğitim süreçlerini destekleyen bir yapı olarak
                      faaliyet göstermektedir.
                    </p>
                    <p>
                      Bu sayede öğrenciler yalnızca bir online sisteme değil; planlı ve
                      destekli bir eğitim sürecine dahil olur.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7 mb-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Catalyst Education Desteği
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Öğrenci kayıt sürecinin yönetimi",
                        "Akademik planlama ve ders seçimi",
                        "Süreç boyunca rehberlik ve danışmanlık",
                        "Veli ve öğrenci iletişiminin koordinasyonu",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3.5 w-3.5 text-trust-500" />
                          </div>
                          <span className="text-warm-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-warm-600 text-sm">
                    Daha fazla bilgi almak için{" "}
                    <Link href="/tr/contact" className="text-brand-500 underline underline-offset-2 hover:text-brand-600">
                      bizimle iletişime geçin
                    </Link>
                    .
                  </p>
                </div>

                {/* ── Section 10: SSS ── */}
                <div id="sss" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Sık Sorulan Sorular
                  </h2>
                  <SimpleFAQAccordion items={faqItems} />
                </div>

                {/* Internal Links */}
                <div className="bg-warm-100 border border-warm-300 rounded-2xl p-7">
                  <h3 className="font-bold text-warm-800 mb-5 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-brand-500" />
                    İlgili Rehberler
                  </h3>
                  <div className="space-y-3">
                    {[
                      { href: "/tr/ossd-cift-diploma", label: "OSSD Çift Diploma Nedir? — Türkiye'den Kanada Lise Diploması", live: true },
                      { href: "/tr/ossd-nedir", label: "OSSD Nedir? — Kanada Lise Diploması Rehberi", live: true },
                      { href: "/tr/kanada-lise-diplomasi-nasil-alinir", label: "Kanada Lise Diploması Nasıl Alınır?", live: true },
                      { href: "/tr/ossd-avantajlari", label: "OSSD Avantajları — Kanada Diploması Neden Tercih Edilir?", live: true },
                      { href: "/tr/diploma", label: "Kanada Lise Diploması Programı — Catalyst Education", live: true },
                      { href: "/tr/contact", label: "İletişim — Bilgi Alın", live: true },
                    ].map(({ href, label, live }) =>
                      live ? (
                        <Link
                          key={href}
                          href={href}
                          className="flex items-center gap-2 text-sm text-warm-600 hover:text-brand-500 transition-colors group"
                        >
                          <ChevronRight className="h-4 w-4 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          {label}
                        </Link>
                      ) : (
                        <div
                          key={href}
                          className="flex items-center gap-2 text-sm text-warm-400"
                        >
                          <ChevronRight className="h-4 w-4 flex-shrink-0" />
                          <span>{label}</span>
                          <span className="ml-auto text-xs bg-warm-200 text-warm-500 px-2 py-0.5 rounded-full">Yakında</span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </article>

              {/* ── Sticky Sidebar TOC (desktop) ── */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 bg-warm-100 border border-warm-300 rounded-2xl p-6">
                  <h3 className="font-bold text-warm-800 mb-4 flex items-center gap-2 text-sm">
                    <BookOpen className="h-4 w-4 text-brand-500" />
                    İçindekiler
                  </h3>
                  <ol className="space-y-2">
                    {tocItems.map((item, i) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className="flex items-start gap-2 text-sm text-warm-600 hover:text-brand-500 transition-colors py-0.5"
                        >
                          <span className="text-xs text-warm-400 w-5 flex-shrink-0 pt-0.5">
                            {i + 1}.
                          </span>
                          <span className="leading-snug">{item.label}</span>
                        </a>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-6 pt-6 border-t border-warm-300">
                    <p className="text-xs text-warm-600 mb-4 leading-relaxed">
                      TVO ILC ve Kanada lise diploması hakkında uzman rehberlik alın.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full h-10 items-center justify-center gap-2 rounded-full bg-trust-500 px-5 text-sm font-medium text-white hover:bg-trust-600 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Bilgi Al
                    </a>
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="w-full py-16 md:py-24 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
              <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-brand-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800 leading-tight">
                Kanada Lise Diploması Hakkında Bilgi Alın
              </h2>
              <p className="text-warm-700 text-lg leading-relaxed">
                OSSD, Kanada lise diploması ve çift diploma programı hakkında daha fazla
                bilgi almak için bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp ile Bilgi Al
                </a>
                <Link
                  href="/tr/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-white px-8 text-base font-medium text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  İletişim Formu
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm text-warm-500">
                Ücretsiz ön değerlendirme · Kişisel yol haritası · Uzman destek
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
