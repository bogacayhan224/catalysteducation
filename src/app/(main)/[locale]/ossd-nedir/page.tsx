import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import Link from "next/link";
import Image from "next/image";
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
  Users,
} from "lucide-react";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

const PAGE_URL_TR = `${SITE_URL}/tr/ossd-nedir`;
const PAGE_URL_EN = `${SITE_URL}/en/what-is-ossd`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "What Is OSSD? | Catalyst Education",
      alternates: { canonical: PAGE_URL_EN },
    };
  }

  const title =
    "OSSD Nedir? Kanada Lise Diploması Hakkında Detaylı Rehber (2026)";
  const description =
    "OSSD nedir? Kanada lise diploması nasıl alınır, kaç yılda tamamlanır ve hangi üniversitelere başvuru yapılabilir? 2026 için güncel ve detaylı rehber.";

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
    question: "OSSD nedir?",
    answer:
      "OSSD (Ontario Secondary School Diploma), Kanada'nın Ontario eyaletinde verilen resmi lise diplomasıdır. Uluslararası geçerliliğe sahip bu diploma, dünya genelindeki üniversitelere başvuru yapılmasını sağlar.",
  },
  {
    question: "OSSD almak için kaç kredi gerekir?",
    answer:
      "OSSD diploması için en az 30 kredi tamamlanması gerekmektedir. Bunun yanı sıra okuryazarlık gerekliliği (OSSLT) ve 40 saat toplum hizmeti de mezuniyet kriterleri arasında yer alır.",
  },
  {
    question: "OSSD kaç yılda tamamlanır?",
    answer:
      "Süre, öğrencinin mevcut eğitim geçmişine bağlıdır. Grade 9 seviyesindeki bir öğrenci için 3–4 yıl, Grade 12 seviyesindeki bir öğrenci için 6–12 ay sürebilir. Daha önce tamamlanan dersler kredi olarak sayılabildiğinden süre önemli ölçüde kısalabilir.",
  },
  {
    question: "Türkiye'de okurken Kanada lise diploması alınabilir mi?",
    answer:
      "Evet. Birçok öğrenci kendi okuluna devam ederken eş zamanlı olarak OSSD diploması alabilir. Bu modele genellikle Çift Diploma Programı denir. Öğrencinin akademik seçeneklerini genişletir ve uluslararası eğitim fırsatlarına erişimini kolaylaştırır.",
  },
  {
    question: "OSSD için İngilizce şart mı?",
    answer:
      "Resmi bir İngilizce sertifikası genellikle zorunlu değildir. Ancak öğrencinin dersleri takip edebilecek temel düzeyde İngilizce bilgisine sahip olması beklenir.",
  },
  {
    question: "OSSD ile hangi üniversitelere başvurulabilir?",
    answer:
      "OSSD, Kanada, İngiltere, Avrupa, ABD ve pek çok ülkedeki üniversiteler tarafından kabul görmektedir. Başvuru şartları kuruma göre farklılık gösterebilir.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "OSSD Nedir? Kanada Lise Diploması Hakkında Detaylı Rehber",
  description:
    "OSSD nedir? Kanada lise diploması nasıl alınır, kaç yılda tamamlanır ve hangi üniversitelere başvuru yapılabilir?",
  author: { "@type": "Organization", name: "Catalyst Education", url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: "Catalyst Education",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-04-03",
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
    { "@type": "ListItem", position: 2, name: "Rehberler", item: `${SITE_URL}/tr` },
    { "@type": "ListItem", position: 3, name: "OSSD Nedir?", item: PAGE_URL_TR },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "ossd-nedir", label: "OSSD Nedir?" },
  { id: "ossd-avantajlari", label: "OSSD Diploması Ne İşe Yarar?" },
  { id: "nasil-alinir", label: "OSSD Nasıl Alınır?" },
  { id: "kimler-icin", label: "Kim İçin Uygundur?" },
  { id: "online-egitim", label: "Online Eğitim mi?" },
  { id: "sure", label: "Kaç Yılda Tamamlanır?" },
  { id: "universiteler", label: "Hangi Üniversitelere Başvurulabilir?" },
  { id: "turkiyeden", label: "Türkiye'den Alınabilir mi?" },
  { id: "sss", label: "Sık Sorulan Sorular" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function OssdNedirPage() {
  const locale = await getLocale();
  if (locale === "en") {
    redirect("/en/what-is-ossd");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, OSSD hakkında bilgi almak istiyorum."
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
                  <span className="text-warm-800 font-medium">OSSD Nedir?</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                  <BookOpen className="h-4 w-4 text-brand-500" />
                  <span className="text-xs text-warm-600">
                    Eğitim Rehberi · 2026
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                  OSSD Nedir?{" "}
                  <span className="text-brand-500">Kanada Lise Diploması</span>{" "}
                  Hakkında Detaylı Rehber
                </h1>
                <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                  OSSD nedir, nasıl alınır, kaç yılda tamamlanır ve hangi
                  üniversitelere başvuru yapılabilir? Bu rehberde tüm sorularınıza
                  kapsamlı yanıtlar bulacaksınız.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />8 dk okuma
                  </span>
                  <span>·</span>
                  <span>3 Nisan 2026</span>
                  <span>·</span>
                  <span>Catalyst Education</span>
                </div>
              </div>

              {/* Right: Hero image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
                  <Image
                    src="/ossd-hero.png"
                    alt="OSSD Kanada lise diploması hakkında bilgi alan öğrenci ve aile"
                    fill
                    sizes="(max-width: 1280px) 420px, 420px"
                    className="object-cover"
                    priority
                  />
                </div>
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
                      <GraduationCap className="h-5 w-5 text-trust-500" />
                    </div>
                    <h2 className="font-bold text-warm-800 text-lg leading-snug">
                      Kısa Cevap: OSSD Nedir?
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    <strong>OSSD (Ontario Secondary School Diploma)</strong>,
                    Kanada&apos;nın Ontario eyaletinde verilen resmi lise
                    diplomasıdır. Uluslararası geçerliliğe sahip olan bu diploma,
                    öğrencilerin Kanada, İngiltere, Avrupa ve dünyanın birçok
                    farklı ülkesindeki üniversitelere başvurabilmesini sağlar.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "Uluslararası geçerlilik" },
                      { icon: Monitor, label: "Tamamen online" },
                      { icon: GraduationCap, label: "30 kredi gereksinimi" },
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

                {/* ── Section 1: OSSD Nedir? ── */}
                <div id="ossd-nedir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Nedir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      <strong>OSSD (Ontario Secondary School Diploma)</strong>,
                      Kanada&apos;nın Ontario eyaletinde resmi olarak verilen lise
                      diplomasıdır. Ontario eğitim sisteminin standartlarına göre
                      yapılandırılmış olan bu diploma, akademik, dilsel ve
                      analitik becerileri geliştirmeyi hedefler.
                    </p>
                    <p>
                      Dünya genelinde üniversiteler tarafından tanınan OSSD,
                      öğrencilere Kanada, İngiltere, Avrupa ve pek çok farklı
                      ülkedeki yükseköğretim kurumlarına başvurabilme imkânı
                      sunar.
                    </p>
                    <p>
                      Programın en önemli özelliklerinden biri esnek yapısıdır.
                      Öğrenciler kendi hızlarında ilerleyebilir; mevcut eğitim
                      hayatlarına devam ederken aynı anda OSSD sürecini
                      yürütebilirler.
                    </p>
                    <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4 py-1">
                      OSSD yalnızca bir mezuniyet belgesi değil; öğrencinin
                      gelecekteki eğitim seçeneklerini genişleten stratejik bir
                      akademik adımdır.
                    </p>
                  </div>
                </div>

                {/* ── Section 2: Ne İşe Yarar? ── */}
                <div id="ossd-avantajlari" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Diploması Ne İşe Yarar?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD diploması, öğrencilerin uluslararası eğitim
                    yolculuğunda önemli bir avantaj sağlar. Bu diploma sayesinde
                    öğrenciler:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Uluslararası geçerliliğe sahip bir lise diploması elde eder",
                      "Kanada ve dünya genelindeki üniversitelere başvuru yapabilir",
                      "Akademik İngilizce becerilerini geliştirir",
                      "Global eğitim sistemine erken yaşta adapte olur",
                      "Üniversite başvurularında rekabet avantajı kazanır",
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
                    Bugün birçok öğrenci, gelecekteki eğitim seçeneklerini
                    genişletmek için OSSD programını tercih etmektedir.
                  </p>
                </div>

                {/* ── Section 3: Nasıl Alınır? ── */}
                <div id="nasil-alinir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Diploması Nasıl Alınır?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Ontario lise diplomasını almak için öğrencilerin belirli
                    akademik gereklilikleri tamamlaması gerekir.
                  </p>
                  <div className="bg-warm-100 rounded-2xl p-7 mb-6">
                    <h3 className="font-bold text-warm-800 mb-5">
                      Mezuniyet Gereklilikleri
                    </h3>
                    <div className="space-y-1">
                      {[
                        {
                          label: "Kredi",
                          value: "En az 30 kredi",
                          note: "Zorunlu ve seçmeli dersler dahil",
                        },
                        {
                          label: "Okuryazarlık",
                          value: "OSSLT sınavını geçmek",
                          note: "Ontario Secondary School Literacy Test",
                        },
                        {
                          label: "Toplum Hizmeti",
                          value: "40 saat toplum katılımı",
                          note: "Mezuniyet için zorunlu",
                        },
                      ].map(({ label, value, note }) => (
                        <div
                          key={label}
                          className="flex flex-col sm:flex-row sm:items-center gap-2 py-4 border-b border-warm-200 last:border-0"
                        >
                          <span className="text-xs font-bold text-warm-500 uppercase tracking-wide w-36 flex-shrink-0">
                            {label}
                          </span>
                          <div>
                            <span className="font-medium text-warm-800 block">
                              {value}
                            </span>
                            <span className="text-sm text-warm-500">{note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
                    <p className="text-warm-700 leading-relaxed">
                      <strong className="text-warm-800">Önemli Not:</strong>{" "}
                      Öğrenciler genellikle sıfırdan başlamaz. Başvuru sürecinde
                      öğrencinin mevcut eğitim geçmişi değerlendirilir ve daha
                      önce tamamladığı dersler diploma kredisi olarak
                      sayılabilir. Bu süreç, öğrencinin doğru seviyeden
                      başlamasını ve mezuniyet süresinin optimize edilmesini
                      sağlar.
                    </p>
                  </div>
                </div>

                {/* ── Section 4: Kim İçin? ── */}
                <div id="kimler-icin" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Programı Kim İçin Uygundur?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD programı özellikle şu öğrenciler için uygundur:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        icon: Globe,
                        text: "Yurt dışında üniversite okumayı hedefleyen öğrenciler",
                      },
                      {
                        icon: BookOpen,
                        text: "İngilizce akademik altyapısını güçlendirmek isteyenler",
                      },
                      {
                        icon: GraduationCap,
                        text: "Eğitimine devam ederken ikinci bir diploma almak isteyenler",
                      },
                      {
                        icon: Users,
                        text: "Kanada eğitim sistemine erken yaşta adapte olmak isteyenler",
                      },
                    ].map(({ icon: Icon, text }) => (
                      <div
                        key={text}
                        className="flex items-start gap-3 bg-warm-50 border border-warm-200 rounded-xl p-5"
                      >
                        <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-4 w-4 text-brand-500" />
                        </div>
                        <span className="text-warm-700 text-sm leading-relaxed">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Bu program yalnızca akademik olarak en üst seviyedeki
                    öğrenciler için değildir. Doğru planlama ve rehberlik ile
                    birçok öğrenci başarıyla tamamlayabilir.
                  </p>
                </div>

                {/* ── Section 5: Online mi? ── */}
                <div id="online-egitim" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Programı Online mı?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      Evet. OSSD programı tamamen online olarak yürütülebilir.
                      Öğrenciler derslerine internet üzerinden erişir ve eğitim
                      sürecini kendi programlarına uygun şekilde sürdürebilir.
                    </p>
                    <p>
                      Bu modelin en önemli avantajlarından biri, öğrencinin
                      mevcut okuluna devam ederken aynı zamanda uluslararası bir
                      diploma alabilmesidir.
                    </p>
                  </div>
                  <div className="mt-6 bg-info-50 border border-info-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-[#3B7CB0] flex-shrink-0 mt-0.5" />
                      <p className="text-warm-700 text-sm leading-relaxed">
                        <strong>Esneklik:</strong> Öğrenciler kendi hızlarında
                        ilerleyebilir. Ders planlaması mevcut okul programına
                        göre düzenlenebilir; bu sayede iki eğitim süreci
                        birbirine engel olmaz.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Section 6: Süre ── */}
                <div id="sure" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Kaç Yılda Tamamlanır?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Bu sorunun tek bir cevabı yoktur. Süre, öğrencinin mevcut
                    eğitim geçmişine bağlıdır.
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-warm-300 mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-warm-100 border-b border-warm-300">
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Öğrenci Seviyesi
                          </th>
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Ortalama Süre
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-200">
                        {[
                          { level: "Grade 9 öğrencisi", duration: "3–4 yıl" },
                          { level: "Grade 10 öğrencisi", duration: "2–3 yıl" },
                          { level: "Grade 11 öğrencisi", duration: "1.5–2 yıl" },
                          { level: "Grade 12 öğrencisi", duration: "6–12 ay" },
                        ].map(({ level, duration }) => (
                          <tr
                            key={level}
                            className="bg-white hover:bg-warm-50 transition-colors"
                          >
                            <td className="px-6 py-4 text-warm-700">{level}</td>
                            <td className="px-6 py-4 font-semibold text-warm-800">
                              {duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Daha önce tamamlanan dersler diploma kredisi olarak
                    sayılabildiğinden, öğrencinin mezuniyet süresi önemli ölçüde
                    kısalabilir. Bireysel değerlendirme sürecinde bu durum
                    ayrıntılı olarak ele alınır.
                  </p>
                </div>

                {/* ── Section 7: Üniversiteler ── */}
                <div id="universiteler" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD ile Hangi Üniversitelere Başvurulabilir?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD diploması, dünya genelinde birçok üniversite tarafından
                    kabul edilmektedir. Bu diploma ile öğrenciler geniş bir
                    akademik yelpazeye başvuru yapabilir:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { flag: "🇨🇦", label: "Kanada üniversiteleri" },
                      { flag: "🇬🇧", label: "İngiltere üniversiteleri" },
                      { flag: "🇪🇺", label: "Avrupa üniversiteleri" },
                      { flag: "🇺🇸", label: "ABD üniversiteleri" },
                      { flag: "🌍", label: "Uluslararası özel üniversiteler" },
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
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Kabul şartları kuruma ve ülkeye göre farklılık
                    gösterebilir. OSSD diploması geniş çapta tanınan güçlü bir
                    akademik yeterlilik olarak değerlendirilmektedir.
                  </p>
                </div>

                {/* ── Section 8: Türkiye'den ── */}
                <div id="turkiyeden" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Türkiye&apos;de Okurken Kanada Lise Diploması Alınabilir mi?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Evet. Birçok öğrenci kendi okuluna devam ederken eş
                      zamanlı olarak OSSD diploması alabilir.
                    </p>
                    <p>
                      Bu modele genellikle{" "}
                      <strong>Çift Diploma Programı</strong> veya{" "}
                      <strong>Dual Diploma Programı</strong> denir. Bu sistem,
                      öğrencinin akademik seçeneklerini genişletir ve
                      uluslararası eğitim fırsatlarına erişimini kolaylaştırır.
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Çift Diploma Modeli — Nasıl İşler?
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Öğrenci Türkiye'deki okuluna devam eder",
                        "Eş zamanlı olarak OSSD derslerini online sürdürür",
                        "Mevcut dersleri kredi olarak değerlendirilebilir",
                        "Her iki diplomanın gerekliliklerini tamamlar",
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

                {/* ── Section 9: SSS ── */}
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
                        href: "/tr/diploma",
                        label: "Kanada Lise Diploması Programı — Catalyst Education",
                        live: true,
                      },
                      {
                        href: "/tr/kanada-lise-diplomasi-nasil-alinir",
                        label: "Kanada Lise Diploması Nasıl Alınır?",
                        live: true,
                      },
                      {
                        href: "/tr/ossd-avantajlari",
                        label: "OSSD Avantajları — Kanada Diploması Neden Tercih Edilir?",
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
                Kanada Lise Diploması Yolculuğunuzu Planlayın
              </h2>
              <p className="text-warm-700 text-lg leading-relaxed">
                OSSD süreci hakkında ayrıntılı bilgi almak, başvuru koşullarını
                değerlendirmek ve kişisel bir yol haritası oluşturmak için
                bizimle iletişime geçin.
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
