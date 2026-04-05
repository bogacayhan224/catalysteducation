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
  Users,
  FileText,
  ClipboardList,
  Award,
} from "lucide-react";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

const PAGE_URL_TR = `${SITE_URL}/tr/kanada-lise-diplomasi-nasil-alinir`;
const PAGE_URL_EN = `${SITE_URL}/en/how-to-get-canadian-high-school-diploma`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "How to Get a Canadian High School Diploma | Catalyst Education",
      alternates: { canonical: PAGE_URL_EN },
    };
  }

  const title =
    "Kanada Lise Diploması Nasıl Alınır? Adım Adım OSSD Süreci (2026)";
  const description =
    "Türkiye'den Kanada lise diploması (OSSD) almak isteyen öğrenciler için başvuru, ders seçimi ve mezuniyet sürecini adım adım öğrenin.";

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
    question: "Türkiye'de okurken Kanada lise diploması alınabilir mi?",
    answer:
      "Evet. Türkiye'deki öğrenciler, mevcut okul düzenlerine devam ederken eş zamanlı olarak OSSD diploması alabilir. Program tamamen online yürütüldüğünden taşınmak veya mevcut eğitimi bırakmak gerekmez.",
  },
  {
    question: "OSSD başvurusunda ilk adım nedir?",
    answer:
      "Süreç, öğrencinin akademik geçmişinin değerlendirilmesiyle başlar. Transkriptler ve daha önce tamamlanan dersler incelenerek öğrencinin sınıf seviyesi ve tamamlaması gereken krediler belirlenir.",
  },
  {
    question: "Başvuru süreci ne kadar sürer?",
    answer:
      "Çoğu durumda başvuru süreci — belgelerin paylaşılmasından derslerin başlamasına kadar — 1 ila 2 hafta içinde tamamlanabilir.",
  },
  {
    question: "Kanada lise diploması kaç yılda alınır?",
    answer:
      "Süre öğrencinin mevcut akademik seviyesine bağlıdır. 9. sınıf seviyesindeki öğrenciler için genellikle 2–4 yıl, 12. sınıf seviyesindeki öğrenciler için 6–18 ay sürebilir. Önceki derslerden kredi tanınması toplam süreyi önemli ölçüde kısaltabilir.",
  },
  {
    question: "Program tamamen online mı?",
    answer:
      "Evet. OSSD programı tamamen online yürütülür. Öğrenciler ders içeriklerine dijital ortamda erişir, ödevlerini platform üzerinden teslim eder ve öğretmenlerinden birebir geri bildirim alır.",
  },
  {
    question: "OSSD almak için mevcut okuldan ayrılmak gerekiyor mu?",
    answer:
      "Hayır. Birçok öğrenci OSSD'yi mevcut okul eğitimiyle eş zamanlı olarak yürütür. Önceki dersler OSSD kredisi olarak sayılabildiğinden toplam süre de kısalabilir.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "Kanada Lise Diploması Nasıl Alınır? Adım Adım OSSD Süreci",
  description:
    "Türkiye'den Kanada lise diploması (OSSD) almak isteyen öğrenciler için başvuru, ders seçimi ve mezuniyet sürecini adım adım öğrenin.",
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
    {
      "@type": "ListItem",
      position: 3,
      name: "Kanada Lise Diploması Nasıl Alınır?",
      item: PAGE_URL_TR,
    },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "ossd-nedir-kisa", label: "OSSD Nedir?" },
  { id: "kimler-basvurabilir", label: "Kimler Başvurabilir?" },
  { id: "adim-1", label: "Adım 1: Başvuru ve Değerlendirme" },
  { id: "adim-2", label: "Adım 2: Akademik Yerleştirme" },
  { id: "adim-3", label: "Adım 3: Online Dersler" },
  { id: "adim-4", label: "Adım 4: Değerlendirme ve Takip" },
  { id: "adim-5", label: "Adım 5: Mezuniyet ve Diploma" },
  { id: "kac-yilda", label: "Kaç Yılda Alınır?" },
  { id: "basvuru-sureci", label: "Başvuru Süreci Ne Kadar Sürer?" },
  { id: "avantajlar", label: "Almanın Avantajları" },
  { id: "sss", label: "Sık Sorulan Sorular" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function KanadaLiseDiplomasiNasilAlinirPage() {
  const locale = await getLocale();
  if (locale === "en") {
    redirect("/en/how-to-get-canadian-high-school-diploma");
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
                  <span className="text-warm-800 font-medium">Kanada Lise Diploması Nasıl Alınır?</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                  <BookOpen className="h-4 w-4 text-brand-500" />
                  <span className="text-xs text-warm-600">
                    Adım Adım Rehber · 2026
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                  Kanada Lise Diploması{" "}
                  <span className="text-brand-500">Nasıl Alınır?</span>{" "}
                  Adım Adım OSSD Süreci
                </h1>
                <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                  Türkiye&apos;den Kanada lise diploması almanın pratik adımlarını
                  öğrenin — uygunluk değerlendirmesinden kredi tanımaya,
                  diploma mezuniyetine kadar tüm süreç.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />10 dk okuma
                  </span>
                  <span>·</span>
                  <span>5 Nisan 2026</span>
                  <span>·</span>
                  <span>Catalyst Education</span>
                </div>
              </div>

              {/* Right: Hero image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ossd-hero.png"
                    alt="Kanada lise diploması (OSSD) nasıl alınır — adım adım rehber"
                    className="object-cover w-full h-full"
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
                      Kısa Cevap: Kanada Lise Diploması Nasıl Alınır?
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    <strong>Kanada lise diploması (OSSD — Ontario Secondary School Diploma)</strong>,
                    Kanada&apos;nın uluslararası geçerliliğe sahip resmi lise
                    diplomasıdır. Türkiye&apos;deki öğrenciler, mevcut okul
                    düzenlerini bozmadan tamamen online olarak bu diplomayı
                    alabilir.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "Uluslararası geçerlilik" },
                      { icon: Monitor, label: "Tamamen online" },
                      { icon: Clock, label: "1–2 haftalık başvuru" },
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

                {/* ── Section: OSSD Nedir? ── */}
                <div id="ossd-nedir-kisa" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Kanada Lise Diploması (OSSD) Nedir?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Ontario Secondary School Diploma (OSSD), Kanada&apos;nın
                    Ontario eyaletinde verilen resmi lise diplomasıdır ve
                    uluslararası geçerliliğe sahiptir.
                  </p>
                  <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
                    <p className="text-warm-700 leading-relaxed">
                      OSSD hakkında daha ayrıntılı bilgi almak için:
                    </p>
                    <Link
                      href="/tr/ossd-nedir"
                      className="inline-flex items-center gap-2 mt-3 text-brand-500 font-semibold hover:text-brand-600 transition-colors group"
                    >
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      OSSD Nedir? Kanada Lise Diploması Hakkında Detaylı Rehber
                    </Link>
                  </div>
                </div>

                {/* ── Section: Kimler Başvurabilir ── */}
                <div id="kimler-basvurabilir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Kimler Kanada Lise Diploması Alabilir?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Genellikle şu öğrenciler OSSD programına başvurabilir:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        icon: Users,
                        text: "Ortaokul veya lise öğrencileri",
                      },
                      {
                        icon: BookOpen,
                        text: "Türkiye'de eğitimine devam eden öğrenciler",
                      },
                      {
                        icon: Globe,
                        text: "Yurtdışında üniversite hedefi olan öğrenciler",
                      },
                      {
                        icon: GraduationCap,
                        text: "İngilizce akademik becerilerini geliştirmek isteyen öğrenciler",
                      },
                      {
                        icon: Award,
                        text: "Uluslararası bir diploma ile akademik profilini güçlendirmek isteyen öğrenciler",
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
                    Program, öğrencinin mevcut eğitim geçmişine göre
                    kişiselleştirilir. Öğrencilerin sıfırdan başlaması
                    gerekmez.
                  </p>
                </div>

                {/* ── Step-by-Step Header ── */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-3 pb-3 border-b border-warm-300">
                    Kanada Lise Diploması Nasıl Alınır? (Adım Adım)
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    Süreç beş net aşamadan oluşur — ilk değerlendirmeden
                    diploma mezuniyetine kadar.
                  </p>
                </div>

                {/* ── Adım 1 ── */}
                <div id="adim-1" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Başvuru ve Ön Değerlendirme
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      Süreç genellikle öğrencinin akademik geçmişinin incelenmesiyle başlar.
                    </p>
                    <div className="bg-warm-100 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {[
                          "Transkriptler incelenir",
                          "Öğrencinin sınıf seviyesi belirlenir",
                          "Hangi dersleri alması gerektiği planlanır",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-trust-500" />
                            </div>
                            <span className="text-warm-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ── Adım 2 ── */}
                <div id="adim-2" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Akademik Yerleştirme ve Ders Planı
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      Bu aşamada önceki akademik başarılar değerlendirilir ve
                      kişiselleştirilmiş bir çalışma planı oluşturulur.
                    </p>
                    <div className="bg-warm-100 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {[
                          "Daha önce alınan dersler değerlendirilir",
                          "Gerekli kredi sayısı belirlenir",
                          "Öğrenci için kişisel bir ders planı hazırlanır",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-trust-500" />
                            </div>
                            <span className="text-warm-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ── Adım 3 ── */}
                <div id="adim-3" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Online Derslerin Başlaması
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      OSSD programı tamamen online bir eğitim modeline sahiptir.
                    </p>
                    <div className="bg-warm-100 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {[
                          "Ders içeriklerine internet üzerinden erişir",
                          "Ödevlerini dijital ortamda teslim eder",
                          "Öğretmenlerinden birebir geri bildirim alır",
                        ].map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Monitor className="h-3 w-3 text-trust-500" />
                            </div>
                            <span className="text-warm-700 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 bg-brand-50 border border-brand-200 rounded-2xl p-5">
                      <p className="text-warm-700 text-sm leading-relaxed">
                        <strong className="text-warm-800">Esneklik:</strong>{" "}
                        Öğrenciler mevcut okullarına devam ederken OSSD
                        derslerini kendi temposunda sürdürebilir. Her iki
                        eğitim kolu çakışmadan paralel yürütülebilir.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Adım 4 ── */}
                <div id="adim-4" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Değerlendirme ve Başarı Takibi
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      Her ders boyunca öğrencinin performansı düzenli olarak
                      değerlendirilir.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: FileText, label: "Ödevler" },
                        { icon: ClipboardList, label: "Projeler" },
                        { icon: BookOpen, label: "Sınavlar" },
                        { icon: Award, label: "Final Değerlendirmeleri" },
                      ].map(({ icon: Icon, label }) => (
                        <div
                          key={label}
                          className="flex items-center gap-3 bg-warm-50 border border-warm-200 rounded-xl px-5 py-4"
                        >
                          <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                            <Icon className="h-4 w-4 text-brand-500" />
                          </div>
                          <span className="font-medium text-warm-700 text-sm">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Adım 5 ── */}
                <div id="adim-5" className="scroll-mt-24 mb-14">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-trust-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Mezuniyet ve Diploma
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      Gerekli kredi sayısı tamamlandığında öğrenci Ontario
                      Secondary School Diploma almaya hak kazanır.
                    </p>
                    <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                      <h4 className="font-bold text-warm-800 mb-4">
                        Bu diploma üniversite başvurularında kullanılabilir:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { flag: "🇨🇦", label: "Kanada" },
                          { flag: "🇬🇧", label: "İngiltere" },
                          { flag: "🇪🇺", label: "Avrupa" },
                          { flag: "🇺🇸", label: "ABD" },
                          { flag: "🌍", label: "Birçok ülkede" },
                        ].map(({ flag, label }) => (
                          <div
                            key={label}
                            className="flex items-center gap-3 bg-white/70 rounded-xl px-4 py-3"
                          >
                            <span className="text-xl">{flag}</span>
                            <span className="font-medium text-warm-700 text-sm">{label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Section: Kaç Yılda ── */}
                <div id="kac-yilda" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Kanada Lise Diploması Kaç Yılda Alınır?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Bu süre öğrencinin mevcut eğitim durumuna bağlıdır. Genel olarak:
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-warm-300 mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-warm-100 border-b border-warm-300">
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Öğrenci Seviyesi
                          </th>
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Tahmini Süre
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-200">
                        {[
                          { level: "9. sınıfta başlayan öğrenciler", duration: "2–4 yıl" },
                          { level: "10. sınıfta başlayan öğrenciler", duration: "1.5–3 yıl" },
                          { level: "11. sınıfta başlayan öğrenciler", duration: "1–2 yıl" },
                          { level: "12. sınıfta başlayan öğrenciler", duration: "6–18 ay" },
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
                    Daha önce tamamlanan dersler kredi olarak sayılabildiğinden
                    toplam süre önemli ölçüde kısalabilir. Bu değerlendirme
                    başvuru sürecinde bireysel olarak yapılır.
                  </p>
                </div>

                {/* ── Section: Başvuru Süreci ── */}
                <div id="basvuru-sureci" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Kanada Lise Diploması Başvuru Süreci Ne Kadar Sürer?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Kanada lise diploması (OSSD) başvuru süreci genellikle kısa
                    ve öngörülebilir bir zaman diliminde tamamlanır. Süreç
                    şu adımları kapsar:
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      "Başvuru formunun tamamlanması",
                      "Akademik belgelerin paylaşılması",
                      "Akademik değerlendirme yapılması",
                      "Ders planının oluşturulması",
                      "Programın başlatılması",
                    ].map((item, i) => (
                      <div
                        key={item}
                        className="flex items-center gap-4 bg-warm-50 border border-warm-200 rounded-xl px-5 py-4"
                      >
                        <div className="h-7 w-7 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold text-brand-500">{i + 1}</span>
                        </div>
                        <span className="text-warm-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-7 text-center">
                    <p className="text-warm-700 text-lg leading-relaxed">
                      Bu adımlar çoğu durumda tamamlanabilir:
                    </p>
                    <p className="text-3xl font-bold text-warm-800 mt-3">
                      1 ila 2 hafta içinde
                    </p>
                  </div>
                </div>

                {/* ── Section: Avantajlar ── */}
                <div id="avantajlar" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Kanada Lise Diploması Almanın Avantajları
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    OSSD sahibi öğrenciler:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Uluslararası geçerliliğe sahip bir diplomaya sahip olur",
                      "Üniversite başvurularında avantaj elde eder",
                      "Akademik İngilizce becerilerini geliştirir",
                      "Küresel eğitim sistemine uyum sağlar",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="h-3.5 w-3.5 text-trust-500" />
                        </div>
                        <span className="text-warm-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-brand-50 border border-brand-200 rounded-2xl p-6">
                    <p className="text-warm-700 leading-relaxed mb-3">
                      OSSD&apos;nin avantajları hakkında daha fazla bilgi almak için:
                    </p>
                    <Link
                      href="/tr/ossd-avantajlari"
                      className="inline-flex items-center gap-2 text-brand-500 font-semibold hover:text-brand-600 transition-colors group"
                    >
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      OSSD Avantajları Nelerdir?
                    </Link>
                  </div>
                </div>

                {/* ── Section: Sonuç ── */}
                <div className="bg-warm-100 border border-warm-300 rounded-2xl p-7 mb-14">
                  <h3 className="font-bold text-warm-800 mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-brand-500" />
                    Sonuç
                  </h3>
                  <p className="text-warm-700 leading-relaxed">
                    Kanada lise diploması almak, öğrencinin akademik
                    yolculuğunda güçlü bir adım olabilir. Doğru planlama ile
                    öğrenciler mevcut eğitim düzenlerini bozmadan uluslararası
                    bir diploma elde edebilir.
                  </p>
                </div>

                {/* ── Section: SSS ── */}
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
                        href: "/tr/diploma",
                        label: "Kanada Lise Diploması Programı — Catalyst Education",
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
