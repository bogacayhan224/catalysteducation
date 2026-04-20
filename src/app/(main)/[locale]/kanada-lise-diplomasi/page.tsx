import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import {
  ShieldCheck,
  Globe,
  Monitor,
  GraduationCap,
  MessageCircle,
  Check,
  ArrowRight,
  ChevronRight,
  Users,
  Clock,
  MapPin,
} from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

const PAGE_URL_TR = `${SITE_URL}/tr/kanada-lise-diplomasi`;
const PAGE_URL_EN = `${SITE_URL}/en/canadian-high-school-diploma`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Canadian High School Diploma (OSSD) Online from Turkey | Catalyst Education",
      alternates: { canonical: PAGE_URL_EN },
    };
  }

  const title =
    "Kanada Lise Diploması (OSSD) Türkiye'den Online Al | Catalyst Education";
  const description =
    "Türkiye'deki lisene devam ederken Kanada lise diploması (OSSD) al. TVO ILC yetkili temsilcisi Catalyst Education ile resmi Kanada devlet diplomasına sahip ol.";

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
      type: "website",
      locale: "tr_TR",
      images: [
        {
          url: `${SITE_URL}/og/kanada-lise-diplomasi.jpg`,
          width: 1200,
          height: 633,
          alt: "Kanada Lise Diploması — Türkiye'den Online OSSD Programı | Catalyst Education",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og/kanada-lise-diplomasi.jpg`],
    },
  };
}

/* ─── FAQ VERİSİ ────────────────────────────────────────── */

const faqItems = [
  {
    question: "Kanada lise diploması ne işe yarar?",
    answer:
      "Kanada lise diploması (OSSD), öğrencinin Kanada, Amerika, Avrupa ve dünyanın pek çok ülkesindeki üniversitelere başvurmasına olanak tanır. Uluslararası tanınırlığı olan resmi bir Ontario eyaleti diplomasıdır.",
  },
  {
    question: "Türkiye'deki liseden ayrılmak gerekiyor mu?",
    answer:
      "Hayır. Program tamamen online yürütülür ve öğrenciler mevcut Türk liselerine devam ederek aynı anda Kanada diploması alabilir. Çift diploma avantajı bu programın en önemli özelliğidir.",
  },
  {
    question: "Dersler hangi dilde yapılır?",
    answer:
      "Tüm dersler İngilizce olarak yürütülür. Resmi bir İngilizce sertifikası zorunlu değildir, ancak dersleri takip edebilmek için belirli bir İngilizce seviyesi gerekir.",
  },
  {
    question: "Program kaç yılda tamamlanır?",
    answer:
      "Program süresi öğrencinin mevcut sınıf seviyesine bağlıdır. 9. sınıf öğrencileri için 2-4 yıl, 11-12. sınıf öğrencileri için 1-2 yıl sürebilir. Daha önce tamamlanan dersler kredi olarak tanınabilir.",
  },
  {
    question: "Catalyst Education'ın rolü nedir?",
    answer:
      "Catalyst Education, TVO ILC'nin Türkiye'deki yetkili idari temsilcisidir. Kayıt, transkript değerlendirmesi, ders planlaması ve süreç yönetimini üstlenir. Diplomayı Catalyst değil, TVO ILC verir.",
  },
  {
    question: "Program ücreti nedir?",
    answer:
      "Program maliyeti 15.000 CAD'dir. Bu ücret dersler, akademik değerlendirme ve diploma sürecini kapsar. Ödeme planı kayıt sürecinde paylaşılır.",
  },
];

/* ─── ŞEMALAR ───────────────────────────────────────────── */

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Kanada Lise Diploması (Ontario Secondary School Diploma — OSSD)",
  description:
    "Türkiye'den tamamen online olarak alınabilen, uluslararası tanınırlığa sahip Kanada lise diploması. TVO ILC yetkili temsilcisi Catalyst Education aracılığıyla.",
  provider: {
    "@type": "Organization",
    name: "Catalyst Education",
    url: SITE_URL,
  },
  educationalCredentialAwarded: "Ontario Secondary School Diploma (OSSD)",
  courseMode: "online",
  inLanguage: "tr",
  url: PAGE_URL_TR,
  offers: {
    "@type": "Offer",
    price: "15000",
    priceCurrency: "CAD",
  },
};

const educationalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Catalyst Education",
  description:
    "TVO ILC'nin Türkiye'deki resmi yetkili temsilcisi. Kanada lise diploması (OSSD) sürecinde öğrencilere kayıttan mezuniyete kadar destek sağlar.",
  url: SITE_URL,
  areaServed: "TR",
  knowsAbout: ["Ontario Secondary School Diploma", "OSSD", "Kanada Lise Diploması"],
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Kanada Lise Diploması (OSSD)",
      item: PAGE_URL_TR,
    },
  ],
};

/* ─── SAYFA ─────────────────────────────────────────────── */

export default async function KanadaLiseDiplomasiPage() {
  const locale = await getLocale();
  if (locale === "en") {
    redirect("/en/canadian-high-school-diploma");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, Kanada lise diploması (OSSD) hakkında bilgi almak istiyorum."
  )}`;

  return (
    <div className="flex flex-col min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(educationalOrgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-warm-200 pt-8 pb-20 lg:pt-12 lg:pb-28">
          <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-brand-100/50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-info-100/60 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 pointer-events-none" />

          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1280px]">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex items-center gap-2 text-sm text-warm-500">
                <li>
                  <Link href="/tr" className="hover:text-warm-700 transition-colors">
                    Ana Sayfa
                  </Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li aria-current="page">
                  <span className="text-warm-800 font-medium">Kanada Lise Diploması</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
              {/* Sol: Metin */}
              <div className="flex flex-col gap-7">
                <div className="inline-flex items-center self-start gap-2.5 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
                  <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={52} height={23} className="flex-shrink-0" />
                  <span className="h-3 w-px bg-warm-400 flex-shrink-0" />
                  <span className="text-xs text-warm-600">TVO ILC Türkiye Yetkili Temsilcisi</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15] text-warm-800">
                  Kanada Lise Diploması
                  <br />
                  <span className="text-brand-500">Türkiye&apos;den Online, Resmi Kanada Devlet Diploması</span>
                </h1>

                <p className="text-lg md:text-xl text-warm-700 leading-relaxed max-w-lg">
                  Türkiye&apos;deki lisene devam ederken aynı anda <strong>Kanada Lise Diploması (OSSD)</strong> al.
                  Ontario eyaletinin resmi uzaktan eğitim kurumu TVO ILC aracılığıyla, tamamen online.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Link
                    href="/tr/apply"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    Şimdi Başvur
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white/70 px-7 text-base font-medium text-warm-800 hover:bg-white transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp ile Bilgi Al
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-warm-300">
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <ShieldCheck className="h-4 w-4 text-trust-500" />
                    <span>Resmi Ontario Eğitim Diploması</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <Globe className="h-4 w-4 text-trust-500" />
                    <span>Dünya Genelinde Tanınan</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <Monitor className="h-4 w-4 text-trust-500" />
                    <span>%100 Online & Esnek</span>
                  </div>
                </div>
              </div>

              {/* Sağ: Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── OSSD NEDİR ── */}
        <section id="ossd-nedir" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-6">
                  Kanada Lise Diploması (OSSD) Nedir?
                </h2>
                <div className="space-y-5 text-warm-700 leading-relaxed text-lg">
                  <p>
                    Kanada Lise Diploması, Ontario eyaletinin resmi lise diplomasıdır.
                    Ontario Secondary School Diploma (OSSD) olarak da bilinen bu belge,
                    dünya genelindeki üniversiteler tarafından tanınan uluslararası bir
                    akademik yeterliliktir.
                  </p>
                  <p>
                    Bu diploma, öğrencinin Kanada eğitim sistemine göre lise eğitimini
                    başarıyla tamamladığını gösterir ve Ontario Eğitim Bakanlığı tarafından
                    verilir.
                  </p>
                  <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4">
                    Catalyst Education, Ontario&apos;nun resmi uzaktan eğitim kurumu TVO ILC&apos;nin
                    Türkiye&apos;deki yetkili idari temsilcisidir.
                  </p>
                </div>
                <Link
                  href="/tr/ossd-nedir"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  OSSD hakkında kapsamlı rehberi oku →
                </Link>
              </div>

              {/* Gereklilikler kartı */}
              <div className="bg-warm-100 border border-warm-300 rounded-3xl p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-warm-800 text-lg">OSSD Gereklilikleri</h3>
                </div>
                {[
                  { label: "Diploma", value: "Ontario Secondary School Diploma (OSSD)" },
                  { label: "Veren Kurum", value: "TVO ILC — Ontario Eğitim Bakanlığı Yetkili Kurumu" },
                  { label: "Gerekli Kredi", value: "Minimum 30 kredi", sub: "Zorunlu ve seçmeli dersler" },
                  { label: "Okuryazarlık", value: "Ontario Lise Okuryazarlık Sınavı (OSSLT)" },
                  { label: "Toplumsal Katılım", value: "40 saatlik gönüllü faaliyet", highlight: true },
                  { label: "Eğitim Yöntemi", value: "Tamamen online" },
                ].map(({ label, value, sub, highlight }) =>
                  highlight ? (
                    <div key={label} className="flex flex-col gap-1 py-3 border-b border-warm-300 last:border-0 bg-trust-50 -mx-2 px-2 rounded-xl">
                      <span className="text-xs font-semibold text-trust-600 uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-semibold text-trust-700 leading-snug">{value}</span>
                    </div>
                  ) : (
                    <div key={label} className="flex flex-col gap-0.5 py-3 border-b border-warm-300 last:border-0">
                      <span className="text-xs font-semibold text-warm-500 uppercase tracking-wide">{label}</span>
                      <span className="text-sm font-medium text-warm-800">{value}</span>
                      {sub && <span className="text-xs text-warm-500 mt-0.5">{sub}</span>}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── KİMLER ALABİLİR ── */}
        <section id="kimler-alabilir" className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">
                Kimler Kanada Lise Diploması Alabilir?
              </h2>
              <p className="text-warm-700 text-lg max-w-2xl mx-auto">
                Program, öğrencinin mevcut eğitim durumuna göre planlanır.
                Farklı sınıf seviyelerindeki öğrenciler başvurabilir.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Lise Öğrencileri (9–12. Sınıf)",
                  desc: "Türkiye'deki liselerine devam ederken paralel olarak Kanada diploması alabilirler. İki lise diploması birden — tek eğitim yolculuğu.",
                  icon: GraduationCap,
                },
                {
                  title: "Yurt Dışı Üniversite Hedefleyenler",
                  desc: "Kanada, Amerika, İngiltere veya Avrupa'daki üniversitelere başvurmak isteyen öğrenciler için uluslararası tanınırlık sağlar.",
                  icon: Globe,
                },
                {
                  title: "Mezun Öğrenciler",
                  desc: "Türk lisesini bitirmiş ancak uluslararası geçerliliğe sahip bir diploma almak isteyen mezun öğrenciler de programa katılabilir.",
                  icon: Users,
                },
              ].map(({ title, desc, icon: Icon }) => (
                <div key={title} className="bg-white rounded-3xl border border-warm-200 p-8 hover:shadow-md transition-shadow">
                  <div className="h-10 w-10 rounded-xl bg-brand-50 flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-brand-500" />
                  </div>
                  <h3 className="font-bold text-warm-800 mb-3">{title}</h3>
                  <p className="text-warm-700 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NASIL ALINIR ── */}
        <section id="nasil-alinir" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">
                Kanada Lise Diploması Nasıl Alınır?
              </h2>
              <p className="text-warm-700 text-lg max-w-2xl mx-auto">
                Sistematik bir akademik planlama süreciyle ilerleyen, net ve şeffaf bir yol haritası.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Ön Başvuru",
                  desc: "Öğrencinin akademik bilgileri ve mevcut okul durumu değerlendirilir. İlk görüşme ücretsizdir.",
                },
                {
                  step: "2",
                  title: "Transkript ve Akademik Değerlendirme",
                  desc: "Geçmiş eğitim bilgileri analiz edilir. Verilecek kredi sayısı, alınması gereken dersler ve mezuniyet planı netleştirilir.",
                },
                {
                  step: "3",
                  title: "Ders Planının Oluşturulması",
                  desc: "Öğrenciye özel akademik plan hazırlanır. Plan, mevcut sınıf seviyesine ve akademik geçmişe göre tamamen kişiselleştirilir.",
                },
                {
                  step: "4",
                  title: "Kayıt ve Program Başlangıcı",
                  desc: "TVO ILC üzerinden resmi kayıt gerçekleştirilir. Ders takvimi onaylanır ve akademik yolculuk başlar.",
                },
                {
                  step: "5",
                  title: "Online Dersler",
                  desc: "Tüm dersler Kanada eğitim sistemi kapsamında TVO ILC'nin dijital platformu üzerinden online yürütülür.",
                },
                {
                  step: "6",
                  title: "Mezuniyet",
                  desc: "Gerekli tüm dersler tamamlandığında öğrenci Ontario Lise Diploması'na (OSSD) hak kazanır.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-5">
                  <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <span className="text-white font-bold text-sm">{step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-warm-800 mb-2">{title}</h3>
                    <p className="text-warm-700 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/tr/kanada-lise-diplomasi-nasil-alinir"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                Adım adım sürecin tamamını gör →
              </Link>
            </div>
          </div>
        </section>

        {/* ── TÜRKİYE'DE GEÇERLİ Mİ / NEDEN OSSD ── */}
        <section id="neden-ossd" className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-4">
                  Kanada Lise Diploması&apos;nın Avantajları
                </h2>
                <p className="text-warm-700 leading-relaxed text-lg mb-8">
                  OSSD, öğrencilerin akademik ve kariyer yolculuğunda somut avantajlar sağlar.
                  Türkiye&apos;de tanınan, yurt dışında üniversite başvurularında kabul gören resmi bir belgedir.
                </p>
                <ul className="space-y-3">
                  {[
                    "Kanada, Amerika, İngiltere ve Avrupa üniversitelerine başvuru imkânı",
                    "Türk lisesinden ayrılmadan çift diploma avantajı",
                    "Tamamen online, esneklik sağlayan eğitim sistemi",
                    "Akademik İngilizce gelişimi — tüm dersler İngilizce",
                    "Proje bazlı öğrenme ve eleştirel düşünme becerileri",
                    "TVO ILC üzerinden verilen, Ontario Eğitim Bakanlığı onaylı diploma",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3.5 w-3.5 text-trust-500" />
                      </div>
                      <span className="text-warm-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/tr/ossd-avantajlari"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  OSSD avantajlarının tamamını incele →
                </Link>
              </div>

              {/* Tanınırlık kartı */}
              <div className="rounded-3xl border border-trust-200 bg-trust-50 p-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-trust-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-trust-500" />
                  </div>
                  <h3 className="font-bold text-warm-800">Uluslararası Tanınırlık</h3>
                </div>
                <p className="text-warm-700 text-sm leading-relaxed">
                  Kanada lise diploması dünya genelinde geçerliliğe sahip resmi bir akademik belgedir.
                  Aşağıdaki ülkelerdeki üniversite başvurularında kullanılabilir:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { flag: "🇨🇦", label: "Kanada" },
                    { flag: "🇺🇸", label: "Amerika" },
                    { flag: "🇬🇧", label: "İngiltere" },
                    { flag: "🇪🇺", label: "Avrupa" },
                    { flag: "🇦🇺", label: "Avustralya" },
                    { flag: "🌍", label: "Dünyanın pek çok ülkesi" },
                  ].map(({ flag, label }) => (
                    <div key={label} className="flex items-center gap-2 bg-white/70 rounded-xl px-4 py-3">
                      <span className="text-lg">{flag}</span>
                      <span className="font-medium text-warm-700 text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FİYAT VE SÜREÇ ── */}
        <section id="fiyat" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-6">
                  Program Süresi ve Fiyatı
                </h2>
                <p className="text-warm-700 text-lg leading-relaxed mb-8">
                  Program süresi ve maliyeti öğrencinin mevcut akademik durumuna göre kişiselleştirilir.
                  Her öğrenci için ayrı bir değerlendirme yapılır.
                </p>
                <div className="space-y-4">
                  <h3 className="font-bold text-warm-800 mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-500" />
                    Tahmini Program Süresi
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-warm-300">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-warm-100 border-b border-warm-300">
                          <th className="text-left px-6 py-4 font-bold text-warm-800">Sınıf Seviyesi</th>
                          <th className="text-left px-6 py-4 font-bold text-warm-800">Tahmini Süre</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-200">
                        {[
                          { level: "9. Sınıf", duration: "2–4 yıl" },
                          { level: "10. Sınıf", duration: "1,5–3 yıl" },
                          { level: "11. Sınıf", duration: "1–2 yıl" },
                          { level: "12. Sınıf veya Mezun", duration: "6–18 ay" },
                        ].map(({ level, duration }) => (
                          <tr key={level} className="bg-white hover:bg-warm-50 transition-colors">
                            <td className="px-6 py-4 text-warm-700">{level}</td>
                            <td className="px-6 py-4 font-semibold text-warm-800">{duration}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-warm-500 text-xs leading-relaxed">
                    Daha önce tamamlanan dersler kredi olarak tanınabilir; bu durum toplam süreyi önemli ölçüde kısaltabilir.
                  </p>
                </div>
              </div>

              <div className="bg-warm-100 border border-warm-300 rounded-3xl p-8 flex flex-col gap-6">
                <h3 className="font-bold text-warm-800 text-lg">Program Ücreti</h3>
                <div className="text-center py-6 border border-warm-300 rounded-2xl bg-white">
                  <p className="text-4xl font-bold text-warm-800">15.000 CAD</p>
                  <p className="text-warm-500 text-sm mt-2">Yaklaşık program maliyeti</p>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-warm-800 text-sm">Bu ücret kapsamında:</p>
                  {[
                    "TVO ILC üzerinden alınan tüm dersler",
                    "Akademik değerlendirme ve denklik işlemleri",
                    "Diploma süreci ve mezuniyet desteği",
                    "Catalyst Education danışmanlık hizmetleri",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="h-5 w-5 rounded-full bg-trust-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="h-3 w-3 text-trust-500" />
                      </div>
                      <span className="text-warm-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-warm-500 text-xs">
                  Detaylı ödeme planı kayıt sürecinde paylaşılır. Ücretsiz ilk görüşme için başvurun.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-7 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ücretsiz Danışmanlık Al
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── MID-PAGE CTA ── */}
        <section className="w-full py-16 bg-warm-800 border-t border-warm-700">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex flex-col gap-3 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Öğrencinizin Sürecini Birlikte Planlayalım
                </h2>
                <p className="text-warm-400 text-base max-w-xl">
                  Ücretsiz ilk görüşmede uzman ekibimiz öğrencinin sınıf seviyesini,
                  kredi durumunu ve mezuniyet planını birlikte değerlendirir.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/tr/apply"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  Şimdi Başvur
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-600 bg-warm-700/50 px-7 text-sm font-medium text-white hover:bg-warm-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp&apos;tan Yaz
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── SSS ── */}
        <section id="sss" className="w-full py-20 md:py-28 bg-warm-200 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mb-12 space-y-3">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-warm-800">
                Sık Sorulan Sorular
              </h2>
              <p className="text-lg text-warm-700 leading-relaxed">
                Kanada lise diploması hakkında en çok sorulan soruların net yanıtları.
              </p>
            </div>

            <SimpleFAQAccordion items={faqItems} />

            <div className="mt-14 text-center bg-white p-8 rounded-3xl border border-warm-300 shadow-[0_2px_12px_rgba(31,29,26,0.05)]">
              <h3 className="text-xl font-bold text-warm-800 mb-2">Aklınızda başka sorular mı var?</h3>
              <p className="text-warm-700 mb-6 max-w-lg mx-auto">
                Ekibimiz öğrencinizin özel durumunu değerlendirmeye hazır.
                Ücretsiz görüşme için iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/tr/faq"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-warm-300 bg-warm-100 px-7 text-sm font-medium text-warm-800 hover:bg-warm-200 transition-colors"
                >
                  Tüm SSS&apos;leri Gör
                </Link>
                <Link
                  href="/tr/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-brand-500 px-7 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
                >
                  Bilgi Al
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── BAĞLANTILI SAYFALAR ── */}
        <section className="w-full py-12 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <h3 className="font-bold text-warm-800 mb-6 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-brand-500" />
              İlgili Sayfalar
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/tr/diploma", label: "Diploma Programı", desc: "OSSD programı hakkında her şey" },
                { href: "/tr/ossd-avantajlari", label: "OSSD Avantajları", desc: "Neden Kanada diploması?" },
                { href: "/tr/ossd-cift-diploma", label: "Çift Diploma", desc: "İki lise diploması birden" },
                { href: "/tr/faq", label: "Sık Sorulan Sorular", desc: "Tüm soru ve cevaplar" },
              ].map(({ href, label, desc }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex flex-col gap-1.5 p-5 rounded-2xl border border-warm-200 bg-warm-50 hover:border-brand-200 hover:bg-brand-50/30 transition-colors group"
                >
                  <span className="font-semibold text-warm-800 text-sm group-hover:text-brand-600 transition-colors flex items-center gap-1.5">
                    {label}
                    <ChevronRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-warm-500 text-xs">{desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="flex flex-col gap-6">
                <h2 className="text-3xl md:text-4xl font-bold leading-tight text-warm-800">
                  Kanada Lise Diploması için Doğru Adımı Atın
                </h2>
                <p className="text-warm-700 text-lg leading-relaxed">
                  Ücretsiz ilk görüşme talep edin. Uzman ekibimiz programı adım adım
                  açıklayacak ve öğrencinin durumunu birlikte değerlendirecektir.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/tr/apply"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    Başvuru Formunu Doldur
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-warm-200 px-7 text-sm font-medium text-warm-800 hover:bg-warm-300 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp ile Bağlan
                  </a>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={60} height={28} className="opacity-70" />
                  <span className="text-xs text-warm-500">TVO ILC Türkiye Yetkili Temsilcisi</span>
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
