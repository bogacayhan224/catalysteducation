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

  if (locale === "tr") {
    return {
      title: "Rehberler | Catalyst Education",
      alternates: { canonical: `${SITE_URL}/tr/rehberler` },
    };
  }

  const title = "Guides — OSSD & Canadian High School Diploma | Catalyst Education";
  const description =
    "Free guides on the Ontario Secondary School Diploma (OSSD): what it is, how to earn it, its benefits, and how students in Turkey can get a Canadian high school diploma.";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/en/guides`,
      languages: {
        en: `${SITE_URL}/en/guides`,
        tr: `${SITE_URL}/tr/rehberler`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/en/guides`,
      siteName: "Catalyst Education",
      type: "website",
      locale: "en_US",
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
    tag: "OSSD Basics",
    title: "What Is OSSD? Complete Guide to the Ontario Secondary School Diploma",
    description:
      "Everything you need to know about the Ontario Secondary School Diploma — how it works, how students earn it, how long it takes, and which universities worldwide recognize it.",
    href: "/en/what-is-ossd",
    readTime: "8 min read",
    date: "April 3, 2026",
    live: true,
  },
  {
    tag: "Step-by-Step",
    title: "How to Get a Canadian High School Diploma",
    description:
      "A practical step-by-step guide to earning the OSSD from Turkey — from eligibility assessment and credit recognition through to diploma graduation.",
    href: "/en/how-to-get-canadian-high-school-diploma",
    readTime: "10 min read",
    date: "April 5, 2026",
    live: true,
  },
  {
    tag: "Why OSSD",
    title: "OSSD Benefits — Why Students Choose a Canadian Diploma",
    description:
      "Discover the academic, career, and international advantages of the Ontario Secondary School Diploma for students in Turkey and beyond.",
    href: "/en/ossd-benefits",
    readTime: "6 min read",
    date: "April 5, 2026",
    live: true,
  },
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/en/guides` },
  ],
};

/* ─── PAGE ──────────────────────────────────────────────────── */

export default async function GuidesPage() {
  const locale = await getLocale();
  if (locale === "tr") {
    redirect("/tr/rehberler");
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to learn more about the OSSD program."
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
                  <Link href="/en" className="hover:text-warm-700 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page">
                  <span className="text-warm-800 font-medium">Guides</span>
                </li>
              </ol>
            </nav>

            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                <BookOpen className="h-4 w-4 text-brand-500" />
                <span className="text-xs text-warm-600">Education Guides · Catalyst Education</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                Guides on the{" "}
                <span className="text-brand-500">Canadian Diploma</span>{" "}
                &amp; OSSD
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed">
                Clear, practical guides for students and parents looking to understand
                the Ontario Secondary School Diploma — how it works, how to earn it,
                and why it matters.
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
                        Read guide
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
                        Coming soon
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
                Ready to start your Canadian diploma journey?
              </h2>
              <p className="text-warm-700 leading-relaxed">
                Get a free assessment from our team and find out how the OSSD
                program fits your student&apos;s current education.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
                <Link
                  href="/en/diploma"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-white px-8 text-base font-medium text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  View Program
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
