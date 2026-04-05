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
  Award,
} from "lucide-react";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

const PAGE_URL_TR = `${SITE_URL}/tr/ossd-avantajlari`;
const PAGE_URL_EN = `${SITE_URL}/en/ossd-benefits`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "OSSD Benefits | Catalyst Education",
      alternates: { canonical: PAGE_URL_EN },
    };
  }

  const title =
    "OSSD Avantajları Nelerdir? Kanada Lise Diplomasının 10 Önemli Faydası (2026)";
  const description =
    "Kanada lise diploması (OSSD) almanın üniversite başvurusu, akademik gelişim ve uluslararası eğitim fırsatları açısından sağladığı avantajları keşfedin.";

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
    question: "OSSD hangi ülkelerdeki üniversitelere kabul edilir?",
    answer:
      "OSSD, Kanada, İngiltere, Avrupa ülkeleri, ABD ve dünyanın pek çok farklı ülkesindeki üniversiteler tarafından tanınan resmi bir lise diplomasıdır. Kabul şartları kuruma ve ülkeye göre farklılık gösterebilir.",
  },
  {
    question: "Türkiye'de okurken OSSD avantajlarından yararlanabilir miyim?",
    answer:
      "Evet. OSSD programı tamamen online yürütüldüğü için öğrenciler kendi okullarına devam ederken aynı zamanda Kanada lise diploması alabilir. Bu model, hem sosyal çevrenin korunmasını hem de akademik esnekliği destekler.",
  },
  {
    question: "OSSD diploması üniversite kabulünü garanti eder mi?",
    answer:
      "Hayır. Hiçbir lise diploması üniversite kabulünü garanti etmez. Ancak OSSD, akademik başvuru sürecini güçlendirir, uluslararası başvurularda avantaj sağlar ve üniversite hazırlığını destekler.",
  },
  {
    question: "OSSD programını tamamlamak ne kadar sürer?",
    answer:
      "Süre, öğrencinin mevcut eğitim geçmişine bağlıdır. Grade 12 seviyesindeki bir öğrenci için 6–12 ay, daha düşük seviyedeki bir öğrenci için 2–4 yıl sürebilir. Daha önce tamamlanan dersler kredi olarak sayılabildiğinden süre önemli ölçüde kısalabilir.",
  },
  {
    question: "OSSD hangi öğrenciler için en uygun programdır?",
    answer:
      "OSSD; yurt dışında üniversite hedefi olan, akademik İngilizce seviyesini geliştirmek isteyen, uluslararası bir diploma sahibi olmak isteyen veya eğitim seçeneklerini çeşitlendirmek isteyen öğrenciler için özellikle uygundur.",
  },
  {
    question: "OSSD almak için İngilizce seviyem ne olmalı?",
    answer:
      "Resmi bir İngilizce sertifikası zorunlu değildir. Ancak öğrencinin dersleri takip edebilecek temel düzeyde akademik İngilizce bilgisine sahip olması beklenir. Program aynı zamanda öğrencinin İngilizce becerilerini geliştirmesine de yardımcı olur.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "OSSD Avantajları Nelerdir? Kanada Lise Diplomasının 10 Önemli Faydası",
  description:
    "Kanada lise diploması (OSSD) almanın üniversite başvurusu, akademik gelişim ve uluslararası eğitim fırsatları açısından sağladığı avantajlar.",
  author: { "@type": "Organization", name: "Catalyst Education", url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: "Catalyst Education",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-04-05",
  dateModified: "2026-04-05",
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
    { "@type": "ListItem", position: 3, name: "OSSD Avantajları", item: PAGE_URL_TR },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "ossd-nedir-kisaca", label: "OSSD Nedir?" },
  { id: "uluslararasi-gecerlilik", label: "Uluslararası Tanınırlık" },
  { id: "akademik-profil", label: "Akademik Profil ve İngilizce" },
  { id: "online-esnek", label: "Online ve Esnek Model" },
  { id: "universite-hazirlik", label: "Üniversite Hazırlığı" },
  { id: "kimler-icin", label: "Kimler İçin Uygundur?" },
  { id: "kabul-garantisi", label: "Üniversite Kabulü" },
  { id: "sss", label: "Sık Sorulan Sorular" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function OssdAvantajlariPage() {
  const locale = await getLocale();
  if (locale === "en") {
    redirect("/en/ossd-benefits");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, OSSD avantajları hakkında bilgi almak istiyorum."
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
                  <span className="text-warm-800 font-medium">OSSD Avantajları</span>
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
                OSSD Avantajları Nelerdir?{" "}
                <span className="text-brand-500">Kanada Lise Diplomasının</span>{" "}
                10 Önemli Faydası
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                Kanada lise diploması (OSSD), öğrencilerin akademik ve kariyer
                yolculuğunda önemli fırsatlar sunan uluslararası geçerliliğe
                sahip bir diplomadır. Bu rehberde OSSD&apos;nin sağladığı en
                önemli avantajları ele alıyoruz.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />6 dk okuma
                </span>
                <span>·</span>
                <span>5 Nisan 2026</span>
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
                      <Award className="h-5 w-5 text-trust-500" />
                    </div>
                    <h2 className="font-bold text-warm-800 text-lg leading-snug">
                      Kısa Cevap: OSSD Neden Değerlidir?
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    <strong>OSSD (Ontario Secondary School Diploma)</strong>,
                    Kanada&apos;nın Ontario eyaletinde verilen uluslararası
                    geçerliliğe sahip resmi lise diplomasıdır. Öğrencilere
                    dünya genelindeki üniversitelere başvuru hakkı tanır,
                    akademik İngilizce becerilerini geliştirir ve tamamen online
                    yürütüldüğü için Türkiye&apos;deki eğitimlerine devam
                    ederken alınabilir.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "Uluslararası tanınırlık" },
                      { icon: Monitor, label: "Tamamen online" },
                      { icon: GraduationCap, label: "Esnek program" },
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

                {/* ── Section 1: OSSD Nedir Kısaca? ── */}
                <div id="ossd-nedir-kisaca" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Nedir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      Ontario Secondary School Diploma (OSSD), Kanada&apos;nın
                      Ontario eyaletinde verilen resmi lise diplomasıdır ve
                      dünya genelinde tanınmaktadır.
                    </p>
                    <p>
                      OSSD hakkında daha detaylı bilgi almak için şu rehberimizi
                      inceleyebilirsiniz:
                    </p>
                  </div>
                  <div className="mt-5 bg-warm-100 border border-warm-300 rounded-xl p-5">
                    <Link
                      href="/tr/ossd-nedir"
                      className="flex items-center gap-2 text-brand-500 font-semibold hover:text-brand-600 transition-colors group"
                    >
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      OSSD Nedir? Kanada Lise Diploması Hakkında Detaylı Rehber
                    </Link>
                  </div>
                </div>

                {/* ── Section 2: Uluslararası Geçerlilik ── */}
                <div id="uluslararasi-gecerlilik" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Uluslararası Tanınırlık ve Üniversite Başvuruları
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD, Kanada başta olmak üzere birçok ülkede tanınan resmi
                    bir lise diplomasıdır. Bu diploma ile öğrenciler aşağıdaki
                    ülkelerdeki üniversitelere başvuru yapabilir:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { flag: "🇨🇦", label: "Kanada üniversiteleri" },
                      { flag: "🇬🇧", label: "İngiltere üniversiteleri" },
                      { flag: "🇪🇺", label: "Avrupa ülkeleri" },
                      { flag: "🇺🇸", label: "ABD üniversiteleri" },
                      { flag: "🌍", label: "Diğer uluslararası kurumlar" },
                    ].map(({ flag, label }) => (
                      <div
                        key={label}
                        className="flex items-center gap-3 bg-warm-50 border border-warm-200 rounded-xl px-5 py-4"
                      >
                        <span className="text-2xl">{flag}</span>
                        <span className="font-medium text-warm-700">{label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Uluslararası bir diploma, öğrencinin akademik profilini
                    güçlendirir ve yurt dışı üniversite başvurularında önemli
                    bir avantaj sağlar.
                  </p>
                </div>

                {/* ── Section 3: Akademik Profil ve İngilizce ── */}
                <div id="akademik-profil" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Akademik Profil ve İngilizce Gelişimi
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD programı İngilizce yürütülen akademik derslerden
                    oluşur. Bu süreçte öğrenciler pek çok değerli akademik
                    beceri kazanır:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Akademik yazma becerilerini geliştirir",
                      "İngilizce okuma ve analiz yeteneklerini artırır",
                      "Akademik terminolojiye hakim olur",
                      "Eleştirel düşünme becerisi kazanır",
                      "Problem çözme yeteneklerini geliştirir",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-trust-500" />
                        </div>
                        <span className="text-warm-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    Kanada eğitim sistemi, proje ve araştırma temelli öğrenme
                    modeline dayanır. Bu model sayesinde öğrenciler bağımsız
                    çalışma alışkanlığı da edinir ve üniversite hayatına çok
                    daha hazırlıklı başlar.
                  </p>
                </div>

                {/* ── Section 4: Online ve Esnek Model ── */}
                <div id="online-esnek" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Türkiye&apos;de Devam Ederken Online Diploma
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD programı tamamen online yürütüldüğü için öğrenciler
                    mevcut okul düzenlerini bozmadan programa katılabilir.
                  </p>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6 mb-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Bu Modelin Sağladığı Avantajlar
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Sosyal çevrenin korunmasını sağlar",
                        "Akademik sürekliliği destekler",
                        "Eğitim planını esnek hale getirir",
                        "Türkiye'deki okul ve OSSD dersleri eş zamanlı sürdürülebilir",
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
                  <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
                    <p className="text-warm-700 leading-relaxed">
                      <strong className="text-warm-800">Önemli Not:</strong>{" "}
                      Öğrencilerin daha önce tamamladığı dersler, OSSD için
                      kredi olarak değerlendirilebilir. Bu durum program
                      süresini önemli ölçüde kısaltır.
                    </p>
                  </div>
                </div>

                {/* ── Section 5: Üniversite Hazırlığı ── */}
                <div id="universite-hazirlik" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Üniversiteye Erken Hazırlık ve Akademik Özgüven
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD programı öğrencilerin üniversiteye daha hazırlıklı
                    başlamasına yardımcı olur. Uluslararası bir programda başarı
                    elde etmek, öğrencinin akademik özgüvenini de artırır.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        icon: GraduationCap,
                        title: "Akademik Disiplin",
                        text: "Öğrenciler zaman yönetimi ve sorumluluk alma alışkanlığı edinir.",
                      },
                      {
                        icon: Globe,
                        title: "Küresel Perspektif",
                        text: "Farklı eğitim standartlarına uyum sağlama ve uluslararası iletişim becerileri gelişir.",
                      },
                      {
                        icon: Award,
                        title: "Akademik Özgüven",
                        text: "Uluslararası bir programda başarı elde etmek, üniversite ve kariyer süreçlerinde pozitif etki yaratır.",
                      },
                      {
                        icon: BookOpen,
                        title: "Alternatif Akademik Yol",
                        text: "OSSD, akademik seçeneklerini genişletmek isteyen öğrenciler için değerli bir alternatif sunar.",
                      },
                    ].map(({ icon: Icon, title, text }) => (
                      <div
                        key={title}
                        className="flex items-start gap-3 bg-warm-50 border border-warm-200 rounded-xl p-5"
                      >
                        <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-brand-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-warm-800 text-sm mb-1">{title}</p>
                          <p className="text-warm-600 text-sm leading-relaxed">{text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4 py-1 text-base">
                    OSSD yalnızca bir eğitim programı değil, aynı zamanda uzun
                    vadeli bir akademik yatırım olarak değerlendirilebilir.
                  </p>
                </div>

                {/* ── Section 6: Kimler İçin? ── */}
                <div id="kimler-icin" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Programı Kimler İçin Uygundur?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD programı özellikle şu öğrenciler için uygundur:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Yurt dışında üniversite hedefi olan öğrenciler",
                      "Akademik İngilizce seviyesini geliştirmek isteyen öğrenciler",
                      "Uluslararası bir diploma sahibi olmak isteyen öğrenciler",
                      "Eğitim seçeneklerini çeşitlendirmek isteyen öğrenciler",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-trust-500" />
                        </div>
                        <span className="text-warm-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Bu program yalnızca akademik olarak en üst seviyedeki
                    öğrenciler için değildir. Doğru planlama ve rehberlik ile
                    birçok öğrenci başarıyla tamamlayabilir.
                  </p>
                </div>

                {/* ── Section 7: Üniversite Kabulü ── */}
                <div id="kabul-garantisi" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Almak Üniversiteye Kabulü Garantiler mi?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Hayır. Hiçbir lise diploması üniversite kabulünü garanti
                      etmez.
                    </p>
                    <p>Ancak OSSD:</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Akademik başvuru sürecini güçlendirir",
                      "Uluslararası başvurularda avantaj sağlar",
                      "Üniversite hazırlığını destekler",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-trust-500" />
                        </div>
                        <span className="text-warm-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-warm-100 border border-warm-300 rounded-xl p-5">
                    <p className="text-warm-700 leading-relaxed text-sm">
                      Doğru planlama ile OSSD, öğrencinin geleceğine yapılan
                      önemli bir yatırım olabilir. Uluslararası eğitim
                      fırsatlarını artırır, kariyer seçeneklerini genişletir ve
                      akademik esnekliği destekler.
                    </p>
                  </div>
                </div>

                {/* ── Section 8: SSS ── */}
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
                    Devam Eden Rehberler
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        href: "/tr/ossd-nedir",
                        label: "OSSD Nedir? Kanada Lise Diploması Hakkında Detaylı Rehber",
                        live: true,
                      },
                      {
                        href: "/tr/kanada-lise-diplomasi-nasil-alinir",
                        label: "Kanada Lise Diploması Nasıl Alınır?",
                        live: true,
                      },
                      {
                        href: "/tr/diploma",
                        label: "Kanada Lise Diploması Programı — Catalyst Education",
                        live: true,
                      },
                      {
                        href: "/tr/contact",
                        label: "İletişim — Bilgi Alın",
                        live: true,
                      },
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
                          title="Yakında yayında"
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
                      OSSD süreci hakkında uzman rehberlik alın.
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
                Kanada Lise Diploması Yolculuğunuzu Başlatın
              </h2>
              <p className="text-warm-700 text-lg leading-relaxed">
                OSSD programının size sağladığı avantajlar hakkında ayrıntılı
                bilgi almak, başvuru koşullarını değerlendirmek ve kişisel bir
                yol haritası oluşturmak için bizimle iletişime geçin.
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
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white px-8 text-base font-medium text-warm-700 hover:bg-warm-50 transition-colors"
                >
                  İletişim Formu
                </Link>
              </div>
              <p className="text-sm text-warm-500">
                TVO ILC iş birliğiyle sunulan Ontario onaylı program
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
