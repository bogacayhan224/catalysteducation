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
} from "lucide-react";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.catalysteducation.ca";

const PAGE_URL_TR = `${SITE_URL}/tr/ossd-cift-diploma`;
const PAGE_URL_EN = `${SITE_URL}/en/ossd-dual-diploma`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "OSSD Dual Diploma | Catalyst Education",
      alternates: { canonical: PAGE_URL_EN },
    };
  }

  const title =
    "OSSD Çift Diploma Nedir? Türkiye'de Okurken Kanada Lise Diploması Alma Rehberi";
  const description =
    "Türkiye'de okurken OSSD çift diploma ile Kanada lise diploması alabilirsiniz. TVO ILC yetkili temsilcisi Catalyst Education ile başvuru süreci hakkında bilgi alın.";

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
    question: "OSSD çift diploma nedir?",
    answer:
      "OSSD çift diploma, öğrencinin Türkiye'deki okuluna devam ederken eş zamanlı olarak Ontario eyaletinin resmi Kanada lise diplomasını (OSSD) almasını sağlayan uluslararası bir eğitim modelidir. Öğrenci hem Türk diplomasını hem de OSSD'yi kazanır.",
  },
  {
    question: "Türkiye'de okurken Kanada lise diploması alınabilir mi?",
    answer:
      "Evet. Program tamamen çevrim içi yürütüldüğü için öğrenciler Türkiye'den ayrılmadan, mevcut okullarını bırakmadan Kanada lise diploması alabilir.",
  },
  {
    question: "OSSD diploması hangi ülkelerde geçerlidir?",
    answer:
      "OSSD diploması Ontario Eğitim Bakanlığı tarafından verilen resmi bir belgedir. Kanada, ABD, İngiltere, Avrupa Birliği ülkeleri ve 100'den fazla ülkede üniversite başvurularında tanınmaktadır.",
  },
  {
    question: "Kanada çift diploma programı ne kadar sürer?",
    answer:
      "Süre öğrencinin başladığı sınıfa ve kredi eşleştirme sonucuna göre değişir. Genellikle 1 ila 4 yıl arasında tamamlanır.",
  },
  {
    question: "TVO ILC nedir, Catalyst Education ile ilişkisi nedir?",
    answer:
      "TVO ILC, Ontario Eğitim Bakanlığı tarafından yetkilendirilmiş Ontario'nun en büyük resmi uzaktan eğitim kuruluşudur. Catalyst Education, TVO ILC'nin Türkiye'deki tek yetkili idari temsilcisidir. OSSD çift diploma programı, Catalyst Education aracılığıyla TVO ILC üzerinden yürütülür.",
  },
  {
    question: "OSSD çift diploma için başvuru nasıl yapılır?",
    answer:
      "Başvuru süreci akademik değerlendirme ile başlar. Catalyst Education danışmanlık ekibi, öğrencinin mevcut not dökümünü inceleyerek kişisel bir eğitim planı hazırlar.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "OSSD Çift Diploma Nedir? Türkiye'de Okurken Kanada Lise Diploması Alma Rehberi",
  description:
    "Türkiye'de okurken OSSD çift diploma ile Kanada lise diploması alabilirsiniz. TVO ILC yetkili temsilcisi Catalyst Education ile başvuru süreci hakkında bilgi alın.",
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
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/tr` },
    { "@type": "ListItem", position: 2, name: "Rehberler", item: `${SITE_URL}/tr/rehberler` },
    { "@type": "ListItem", position: 3, name: "OSSD Çift Diploma Nedir?", item: PAGE_URL_TR },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "nedir", label: "OSSD Çift Diploma Nedir?" },
  { id: "nasil-calisir", label: "Kanada Çift Diploma Nasıl Çalışır?" },
  { id: "turkiyeden", label: "Türkiye'den Alınabilir mi?" },
  { id: "kimler-basvurabilir", label: "Kim Başvurabilir?" },
  { id: "sure", label: "Program Ne Kadar Sürer?" },
  { id: "mezuniyet", label: "Mezuniyet Şartları" },
  { id: "kazanimlari", label: "Ne Kazandırır?" },
  { id: "sss", label: "Sık Sorulan Sorular" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function OssdCiftDiplomaPage() {
  const locale = await getLocale();
  if (locale === "en") {
    redirect("/en/ossd-dual-diploma");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, OSSD çift diploma hakkında bilgi almak istiyorum."
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
                  <span className="text-warm-800 font-medium">OSSD Çift Diploma</span>
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
                OSSD Çift Diploma Nedir?{" "}
                <span className="text-brand-500">Türkiye&apos;de Okurken Kanada Lise Diploması</span>{" "}
                Alma Rehberi
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                Türkiye&apos;deki okuluna devam ederken aynı anda Kanada lise diploması almak mümkün mü? Evet — ve buna OSSD çift diploma programı deniyor.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />5 dk okuma
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
                      <GraduationCap className="h-5 w-5 text-trust-500" />
                    </div>
                    <h2 className="font-bold text-warm-800 text-lg leading-snug">
                      Kısa Cevap: OSSD Çift Diploma Nedir?
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    <strong>OSSD çift diploma</strong>, öğrencinin Türkiye&apos;deki okul kaydını sürdürürken paralel olarak{" "}
                    Ontario&apos;nun resmi lise müfredatını tamamlamasına ve{" "}
                    <strong>Kanada lise diploması</strong> kazanmasına olanak tanıyan uluslararası bir eğitim modelidir.
                    Öğrenci hem Türk diplomasını hem de OSSD&apos;yi alır.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "100+ ülkede geçerli" },
                      { icon: Monitor, label: "Tamamen online" },
                      { icon: GraduationCap, label: "İki resmi diploma" },
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

                {/* ── Section 1: OSSD Çift Diploma Nedir? ── */}
                <div id="nedir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Çift Diploma Nedir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      <strong>OSSD çift diploma</strong>, öğrencinin Türkiye&apos;deki okul kaydını
                      sürdürürken paralel olarak Ontario eyaletinin resmi lise müfredatını
                      tamamlamasına ve <strong>Kanada lise diploması</strong> kazanmasına
                      olanak tanıyan uluslararası bir eğitim modelidir.
                    </p>
                    <p>
                      &ldquo;Çift diploma&rdquo; ifadesi tam olarak şunu anlatır: öğrenci, Türk lise
                      diplomasının yanı sıra OSSD diplomasını da alır. İki diploma, iki farklı
                      eğitim sisteminde geçerliliği olan iki ayrı akademik belge anlamına gelir.
                    </p>
                    <p>
                      Bu sistemde öğrenci:
                    </p>
                    <ul className="space-y-2 ml-4">
                      {[
                        "Mevcut okulunda Türk müfredatına göre eğitimine devam eder",
                        "Eş zamanlı olarak Kanada müfredatına uygun dersleri çevrim içi olarak tamamlar",
                        "Gerekli kredi ve mezuniyet şartlarını sağladığında resmi Kanada lise diploması (OSSD) alır",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-trust-500" />
                          </div>
                          <span className="text-warm-700 text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p>
                      OSSD diploması; Kanada, ABD, İngiltere, Avrupa Birliği ülkeleri ve
                      dünyanın dört bir yanındaki 100&apos;den fazla ülkede üniversite başvurularında
                      geçerlidir.
                    </p>
                  </div>
                  <div className="mt-5 text-sm text-warm-600">
                    <Link
                      href="/tr/ossd-nedir"
                      className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                    >
                      OSSD nedir? Detaylı bilgi için tıklayın →
                    </Link>
                  </div>
                </div>

                {/* ── Section 2: Kanada Çift Diploma Sistemi Nasıl Çalışır? ── */}
                <div id="nasil-calisir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Kanada Çift Diploma Sistemi Nasıl Çalışır?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-8">
                    <p>
                      <strong>Kanada çift diploma</strong> modeli, öğrencinin iki eğitim sistemini
                      aynı anda ve birbirini aksatmadan yürütmesine dayanır. Süreç
                      kişiselleştirilmiş bir akademik planlama ile başlar.
                    </p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {[
                      {
                        step: "1",
                        title: "Akademik değerlendirme",
                        desc: "Öğrencinin mevcut not dökümü ve ders geçmişi incelenir.",
                      },
                      {
                        step: "2",
                        title: "Kredi eşleştirmesi",
                        desc: "Türkiye&apos;de alınan dersler OSSD kredilerine karşılık getirilir.",
                      },
                      {
                        step: "3",
                        title: "Eksik kredi tespiti",
                        desc: "Tamamlanması gereken Ontario dersleri belirlenir.",
                      },
                      {
                        step: "4",
                        title: "Çevrim içi eğitim",
                        desc: "Öğrenci eksik dersleri TVO ILC platformu üzerinden tamamlar.",
                      },
                      {
                        step: "5",
                        title: "Diploma",
                        desc: "Mezuniyet şartları karşılandığında resmi OSSD diploması verilir.",
                      },
                    ].map((item) => (
                      <div
                        key={item.step}
                        className="flex gap-4 items-start bg-warm-50 border border-warm-200 rounded-2xl p-5"
                      >
                        <div className="h-8 w-8 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0 text-white text-sm font-bold">
                          {item.step}
                        </div>
                        <div>
                          <p className="font-bold text-warm-800 mb-1">{item.title}</p>
                          <p
                            className="text-sm text-warm-600"
                            dangerouslySetInnerHTML={{ __html: item.desc }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    Kredi eşleştirmesi sayesinde birçok öğrenci başlangıçta beklenenden daha az
                    ek ders almak zorunda kalır. Bu, programın hem zaman hem de maliyet
                    açısından verimli olmasını sağlar.
                  </p>
                  <div className="mt-5 text-sm">
                    <Link
                      href="/tr/kanada-lise-diplomasi-nasil-alinir"
                      className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                    >
                      Başvuru adımlarının tamamı için: Kanada lise diploması nasıl alınır? →
                    </Link>
                  </div>
                </div>

                {/* ── Section 3: Türkiye'den Alınabilir mi? ── */}
                <div id="turkiyeden" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Türkiye&apos;de Okurken Kanada Lise Diploması Alınabilir mi?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Evet. Bu, OSSD çift diploma programının temel özelliğidir.
                    </p>
                    <p>
                      Program <strong>tamamen çevrim içi</strong> yürütülür. Öğrencilerin
                      Türkiye&apos;den ayrılmasına, okul değiştirmesine ya da eğitim hayatını
                      aksatmasına gerek yoktur. İnternet bağlantısı olan her yerden derse
                      erişilebilir; dersler zaman esnekliğiyle planlanır.
                    </p>
                    <p>
                      Öğrenciler hem Türk okul programlarını hem de Kanada müfredatını günlük
                      rutinleriyle uyumlu şekilde sürdürebilir. Bu esneklik, programı özellikle
                      yoğun akademik temposu olan lise öğrencileri için uygulanabilir kılar.
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Programın Temel Özellikleri
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Türkiye'den ayrılmaya gerek yok",
                        "Mevcut okul kaydı ve Türk diploması korunur",
                        "Tamamen çevrim içi, esnek ders programı",
                        "İnternet bağlantısı olan her yerden erişilebilir",
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

                {/* ── Section 4: Kim Başvurabilir? ── */}
                <div id="kimler-basvurabilir" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Hangi Öğrenciler OSSD Çift Diploma Programına Başvurabilir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      <strong>OSSD çift diploma programı</strong> özellikle şu öğrenci
                      profillerine uygundur:
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      "Yurt dışında üniversite okumayı hedefleyen ortaokul veya lise öğrencileri",
                      "Kanada, ABD, İngiltere veya Avrupa'daki üniversitelere başvurmayı planlayan öğrenciler",
                      "Akademik İngilizce yetkinlik ve altyapı kazanmak isteyenler",
                      "Uluslararası geçerliliği olan bir diploma ile başvuru dosyasını güçlendirmek isteyen öğrenciler",
                      "Mevcut okul düzenini korurken ek bir uluslararası belge edinmek isteyenler",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 bg-warm-50 border border-warm-200 rounded-xl p-4"
                      >
                        <Users className="h-4 w-4 text-brand-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-warm-700">{item}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    Programa kabul öğrencinin akademik geçmişi ve hedefleri doğrultusunda
                    değerlendirilir; her öğrenci için kişiselleştirilmiş bir eğitim planı
                    hazırlanır.
                  </p>
                </div>

                {/* ── Section 5: Program Ne Kadar Sürer? ── */}
                <div id="sure" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Program Ne Kadar Sürer?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      OSSD çift diploma süresini doğrudan belirleyen iki faktör vardır:
                      öğrencinin kaçıncı sınıfta başladığı ve önceki derslerden kaç kredinin
                      eşleştiği.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { grade: "9. sınıf", duration: "3–4 yıl" },
                      { grade: "10. sınıf", duration: "2–3 yıl" },
                      { grade: "11. sınıf", duration: "1–2 yıl" },
                    ].map((row) => (
                      <div
                        key={row.grade}
                        className="bg-warm-50 border border-warm-200 rounded-2xl p-5 text-center"
                      >
                        <p className="text-sm font-semibold text-warm-500 mb-2">{row.grade}</p>
                        <p className="text-2xl font-bold text-brand-500">{row.duration}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-600 text-sm leading-relaxed">
                    Bu süreler ortalama değerlerdir. Kredi eşleştirmesi yüksek olan öğrenciler
                    daha kısa sürede mezun olabilir. Kesin süre, akademik değerlendirme
                    sonrasında netleşir.
                  </p>
                </div>

                {/* ── Section 6: Mezuniyet Şartları ── */}
                <div id="mezuniyet" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Diploması İçin Mezuniyet Şartları Nelerdir?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      <strong>Kanada lise diploması (OSSD)</strong> alabilmek için öğrencilerin
                      Ontario Eğitim Bakanlığı&apos;nın belirlediği mezuniyet gerekliliklerini
                      karşılaması gerekir:
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6 mb-6">
                    <ul className="space-y-3">
                      {[
                        "30 kredi tamamlamak (18 zorunlu + 12 seçmeli)",
                        "Zorunlu İngilizce dersini (Grade 12 English) başarıyla bitirmek",
                        "40 saatlik toplum hizmeti çalışmasını tamamlamak",
                        "Ontario Okuryazarlık Sınavı'nı geçmek veya muafiyet almak",
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
                  <p className="text-warm-700 leading-relaxed text-lg">
                    Bu şartların tamamı sağlandığında öğrenci, Ontario Eğitim Bakanlığı
                    tarafından verilen resmi <strong>Kanada lise diplomasına</strong> hak
                    kazanır.
                  </p>
                </div>

                {/* ── Section 7: Ne Kazandırır? ── */}
                <div id="kazanimlari" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    OSSD Çift Diploma Öğrencilere Ne Kazandırır?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Bir <strong>Kanada çift diploma</strong> almak, öğrenciye yalnızca ek bir
                      belge değil; üniversite başvurusunda ölçülebilir avantajlar sağlayan bir
                      akademik profil kazandırır.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-5">
                    {[
                      {
                        title: "Akademik Avantajlar",
                        items: [
                          "Kanada, ABD, İngiltere ve Avrupa üniversitelerine doğrudan başvuru hakkı",
                          "OSSD notu ve dersleri uluslararası değerlendirme komisyonları tarafından tanınır",
                          "İngilizce akademik yazma ve düşünme becerisi gelişir",
                        ],
                      },
                      {
                        title: "Kariyer Avantajları",
                        items: [
                          "Uluslararası iş ortamlarında tanınan bir eğitim geçmişi",
                          "Çok kültürlü ve çok dilli akademik ortama uyum kapasitesi",
                          "Küresel bağlantı ve network fırsatları",
                        ],
                      },
                      {
                        title: "Pratik Avantajlar",
                        items: [
                          "Türkiye'den ayrılmaya gerek yok",
                          "Mevcut okul kaydı ve Türk diploması korunur",
                          "Tamamen çevrim içi, esnek ders programı",
                        ],
                      },
                    ].map((group) => (
                      <div
                        key={group.title}
                        className="bg-warm-50 border border-warm-200 rounded-2xl p-5"
                      >
                        <h3 className="font-bold text-warm-800 mb-4 text-sm">{group.title}</h3>
                        <ul className="space-y-2">
                          {group.items.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <Check className="h-3.5 w-3.5 text-trust-500 flex-shrink-0 mt-1" />
                              <span className="text-xs text-warm-600 leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
                    İlgili Rehberler
                  </h3>
                  <div className="space-y-3">
                    {[
                      { href: "/tr/ossd-nedir", label: "OSSD Nedir? — Kanada Lise Diploması Hakkında Detaylı Rehber", live: true },
                      { href: "/tr/kanada-lise-diplomasi-nasil-alinir", label: "Kanada Lise Diploması Nasıl Alınır?", live: true },
                      { href: "/tr/ossd-avantajlari", label: "OSSD Avantajları — Kanada Diploması Neden Tercih Edilir?", live: true },
                      { href: "/tr/tvo-ve-tvo-ilc-nedir", label: "TVO ve TVO ILC Nedir? — OSSD ve Kanada Çift Diploma Rehberi", live: true },
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
                </div>
              </aside>

            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ── */}
        <section className="w-full py-16 md:py-20 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
              <div className="h-12 w-12 rounded-2xl bg-brand-50 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-brand-500" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-warm-800 leading-tight">
                OSSD Çift Diploma Hakkında Ücretsiz Danışmanlık Alın
              </h2>
              <p className="text-warm-700 leading-relaxed">
                Öğrencinin hangi sınıftan programa katılabileceğini, kaç kredi gerektiğini
                ve tahmini tamamlanma süresini öğrenmek için Catalyst Education danışmanlık
                ekibiyle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp&apos;tan Bilgi Al
                </a>
                <Link
                  href="/tr/diploma"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-white px-8 text-base font-medium text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  Programı İncele
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
