import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import {
  BookOpen,
  Clock,
  ArrowRight,
  ChevronRight,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "en") {
    return {
      title: "Guides | Catalyst Education",
      alternates: { canonical: `${SITE_URL}/en/guides` },
    };
  }

  const title = "Rehberler — OSSD ve Kanada Lise Diploması | Catalyst Education";
  const description =
    "OSSD nedir, nasıl alınır, avantajları nelerdir? Türkiye'den Kanada lise diploması almak isteyen öğrenciler ve aileler için kapsamlı rehberler.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/tr/rehberler`,
      languages: {
        tr: `${SITE_URL}/tr/rehberler`,
        en: `${SITE_URL}/en/guides`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/tr/rehberler`,
      siteName: "Catalyst Education",
      type: "website",
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

/* ─── GUIDE CARDS ─────────────────────────────────────────── */

const guides = [
  {
    tag: "OSSD Temelleri",
    title: "OSSD Nedir? Kanada Lise Diploması Hakkında Detaylı Rehber",
    description:
      "OSSD nedir, nasıl alınır, kaç yılda tamamlanır ve hangi üniversitelere başvuru yapılabilir? Bu rehberde tüm sorularınıza kapsamlı yanıtlar bulacaksınız.",
    href: "/tr/ossd-nedir",
    readTime: "8 dk okuma",
    date: "3 Nisan 2026",
    live: true,
  },
  {
    tag: "Adım Adım",
    title: "Kanada Lise Diploması Nasıl Alınır?",
    description:
      "Türkiye'den OSSD diploması almanın pratik adımlarını öğrenin — uygunluk değerlendirmesinden kredi tanımaya, diploma mezuniyetine kadar tüm süreç.",
    href: "/tr/kanada-lise-diplomasi-nasil-alinir",
    readTime: "10 dk okuma",
    date: "5 Nisan 2026",
    live: true,
  },
  {
    tag: "Neden OSSD",
    title: "OSSD Avantajları — Kanada Diploması Neden Tercih Edilir?",
    description:
      "Ontario Secondary School Diploma'nın Türkiye'deki ve dünyadaki öğrencilere sağladığı akademik, kariyer ve uluslararası avantajları keşfedin.",
    href: "/tr/ossd-avantajlari",
    readTime: "6 dk okuma",
    date: "5 Nisan 2026",
    live: true,
  },
  {
    tag: "TVO ILC",
    title: "TVO ve TVO ILC Nedir? OSSD ve Kanada Çift Diploma Rehberi",
    description:
      "TVO nedir, TVO ILC nedir, bu kurum güvenilir mi? Ontario'nun resmî online lisesini, OSSD diplomasını ve çift diploma programını detaylıca anlatan kapsamlı rehber.",
    href: "/tr/tvo-ve-tvo-ilc-nedir",
    readTime: "10 dk okuma",
    date: "7 Nisan 2026",
    live: true,
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: `${SITE_URL}/tr` },
    { "@type": "ListItem", position: 2, name: "Rehberler", item: `${SITE_URL}/tr/rehberler` },
  ],
};

/* ─── PAGE ──────────────────────────────────────────────────── */

export default async function RehberlerPage() {
  const locale = await getLocale();
  if (locale === "en") {
    redirect("/en/guides");
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Merhaba, OSSD hakkında bilgi almak istiyorum."
  )}`;

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-warm-200 pt-16 pb-14 lg:pt-20 lg:pb-16">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-100/40 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-trust-100/30 rounded-full blur-3xl -translate-x-1/4 translate-y-1/3 pointer-events-none" />

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
                <li aria-current="page">
                  <span className="text-warm-800 font-medium">Rehberler</span>
                </li>
              </ol>
            </nav>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                <BookOpen className="h-4 w-4 text-brand-500" />
                <span className="text-xs text-warm-600">Eğitim Rehberleri · Catalyst Education</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                <span className="text-brand-500">Kanada Diploması</span>{" "}
                ve OSSD Rehberleri
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed">
                Ontario Secondary School Diploma&apos;yı anlamak isteyen öğrenciler ve
                aileler için net, pratik rehberler — nasıl çalışır, nasıl alınır
                ve neden önemlidir.
              </p>
            </div>
          </div>
        </section>

        {/* ── GUIDE CARDS ── */}
        <section className="bg-white border-t border-warm-300 py-16 md:py-20">
          <div className="container px-4 md:px-6 mx-auto max-w-[1280px]">

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) =>
                guide.live ? (
                  <Link
                    key={guide.href}
                    href={guide.href}
                    className="group flex flex-col bg-white border border-warm-300 rounded-3xl p-7 hover:shadow-md hover:border-warm-400 transition-all"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 border border-brand-100 px-3 py-1 text-xs font-semibold text-brand-500">
                        <BookOpen className="h-3 w-3" />
                        {guide.tag}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-warm-400">
                        <Clock className="h-3 w-3" />
                        {guide.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-warm-800 leading-snug mb-3 group-hover:text-brand-500 transition-colors">
                      {guide.title}
                    </h2>

                    <p className="text-sm text-warm-600 leading-relaxed flex-1 mb-6">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-warm-200">
                      <span className="text-xs text-warm-400">{guide.date}</span>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-500 group-hover:gap-2 transition-all">
                        Rehberi oku
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ) : (
                  <div
                    key={guide.href}
                    className="flex flex-col bg-warm-50 border border-warm-200 rounded-3xl p-7 opacity-70"
                  >
                    <div className="flex items-center justify-between mb-5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-warm-200 border border-warm-300 px-3 py-1 text-xs font-semibold text-warm-500">
                        <BookOpen className="h-3 w-3" />
                        {guide.tag}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-warm-200 px-2.5 py-1 text-xs text-warm-500 font-medium">
                        Yakında
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-warm-600 leading-snug mb-3">
                      {guide.title}
                    </h2>

                    <p className="text-sm text-warm-500 leading-relaxed flex-1 mb-6">
                      {guide.description}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-warm-200">
                      <span className="text-xs text-warm-400">{guide.date}</span>
                    </div>
                  </div>
                )
              )}
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
                Kanada diploması yolculuğunuza başlamaya hazır mısınız?
              </h2>
              <p className="text-warm-700 leading-relaxed">
                Ekibimizden ücretsiz değerlendirme alın ve OSSD programının
                öğrencinizin mevcut eğitimine nasıl uyduğunu öğrenin.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp&apos;tan Yazın
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
