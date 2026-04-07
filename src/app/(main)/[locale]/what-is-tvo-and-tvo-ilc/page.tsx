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

  if (locale === "tr") {
    return {
      title: "TVO ve TVO ILC Nedir? | Catalyst Education",
      alternates: { canonical: PAGE_URL_TR },
    };
  }

  const title =
    "What Is TVO and TVO ILC? OSSD and Canadian Dual Diploma Guide | Catalyst Education";
  const description =
    "Learn what TVO and TVO ILC are, how the OSSD works, and how the Canadian dual diploma model supports international students pursuing an Ontario high school diploma.";

  return {
    title,
    description,
    alternates: {
      canonical: PAGE_URL_EN,
      languages: { tr: PAGE_URL_TR, en: PAGE_URL_EN },
    },
    openGraph: {
      title,
      description,
      url: PAGE_URL_EN,
      siteName: "Catalyst Education",
      type: "article",
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

/* ─── FAQ DATA ─────────────────────────────────────────── */

const faqItems = [
  {
    question: "What is TVO ILC?",
    answer:
      "TVO ILC is an official online high school operating within Ontario's education system. It provides secondary school credits and the Ontario Secondary School Diploma (OSSD), and is widely recognized as one of the largest online high schools in Ontario.",
  },
  {
    question: "What is the OSSD?",
    answer:
      "The OSSD (Ontario Secondary School Diploma) is the official high school diploma issued by the province of Ontario, Canada. It is internationally recognized and allows students to apply to universities across Canada, the UK, Europe, and beyond.",
  },
  {
    question: "What is a Canadian dual diploma program?",
    answer:
      "A Canadian dual diploma program allows students to earn a Canadian high school diploma (OSSD) while continuing their education in their home country. Students remain enrolled in their local school, study Ontario curriculum courses online, and graduate with two diplomas.",
  },
  {
    question: "Is the TVO ILC diploma recognized internationally?",
    answer:
      "Yes. The OSSD issued through TVO ILC is internationally recognized and accepted by universities in Canada, the United Kingdom, Europe, the United States, and many other countries.",
  },
  {
    question: "Is TVO ILC reliable?",
    answer:
      "Yes. TVO ILC operates under TVO, a publicly governed educational organization in Ontario. It is part of Ontario's official education system, holds the authority to issue recognized diplomas, and has a track record dating back to 1926.",
  },
  {
    question: "What is the difference between TVO and TVO ILC?",
    answer:
      "TVO is a publicly funded educational organization in Ontario that develops digital learning solutions and educational content. TVO ILC is the secondary school arm of TVO — the specific institution through which students earn OSSD credits and the diploma.",
  },
  {
    question: "How do students earn a Canadian high school diploma through TVO ILC?",
    answer:
      "A student's academic background is assessed and a personalized course plan is created. The student completes Ontario-curriculum courses online, meets the graduation requirements (30 credits, literacy requirement, and community hours), and earns the OSSD diploma. Catalyst Education supports students throughout this process.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "What Is TVO and TVO ILC? OSSD and the Canadian Dual Diploma Model",
  description:
    "Learn what TVO and TVO ILC are, how the OSSD works, and how the Canadian dual diploma model supports international students.",
  author: { "@type": "Organization", name: "Catalyst Education", url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: "Catalyst Education",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-04-07",
  dateModified: "2026-04-07",
  url: PAGE_URL_EN,
  inLanguage: "en",
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL_EN },
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
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/en/guides` },
    { "@type": "ListItem", position: 3, name: "What Is TVO and TVO ILC?", item: PAGE_URL_EN },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "what-is-tvo", label: "What Is TVO?" },
  { id: "what-is-tvo-ilc", label: "What Is TVO ILC?" },
  { id: "what-is-ossd", label: "What Is the OSSD?" },
  { id: "dual-diploma", label: "What Is the Canadian Dual Diploma Program?" },
  { id: "history", label: "The History of TVO ILC" },
  { id: "scale", label: "The Scale and Reach of TVO ILC" },
  { id: "how-to-earn", label: "How to Earn a Canadian High School Diploma" },
  { id: "reliability", label: "Why Is TVO ILC Reliable?" },
  { id: "catalyst-role", label: "How Catalyst Education Supports Students" },
  { id: "faq", label: "Frequently Asked Questions" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function WhatIsTvoAndTvoIlcPage() {
  const locale = await getLocale();
  if (locale === "tr") {
    redirect("/tr/tvo-ve-tvo-ilc-nedir");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to learn more about TVO ILC and the Canadian high school diploma."
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
                  <Link href="/en" className="hover:text-warm-700 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link href="/en/guides" className="hover:text-warm-700 transition-colors">
                    Guides
                  </Link>
                </li>
                <li>
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page">
                  <span className="text-warm-800 font-medium">What Is TVO and TVO ILC?</span>
                </li>
              </ol>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                <BookOpen className="h-4 w-4 text-brand-500" />
                <span className="text-xs text-warm-600">
                  Education Guide · 2026
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                What Is TVO and TVO ILC?{" "}
                <span className="text-brand-500">OSSD and the Canadian Dual Diploma</span>{" "}
                Model
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                Families researching Canadian high school diploma programs often ask:
                What is TVO? What is TVO ILC? Is this institution reliable? This guide
                explains the structure, history, and role of TVO and TVO ILC within
                Ontario&apos;s official education system.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />10 min read
                </span>
                <span>·</span>
                <span>April 7, 2026</span>
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
                      Quick Answer: TVO and TVO ILC
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    <strong>TVO</strong> is a publicly funded educational organization in
                    Ontario, Canada. <strong>TVO ILC</strong> is the official online high
                    school within TVO — the institution through which students earn the{" "}
                    <Link
                      href="/en/what-is-ossd"
                      className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                    >
                      OSSD (Ontario Secondary School Diploma)
                    </Link>
                    .
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Building2, label: "Publicly governed" },
                      { icon: Globe, label: "Students in 90+ countries" },
                      { icon: Shield, label: "Official diploma authority" },
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
                    Table of Contents
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

                {/* ── Section 1: What Is TVO? ── */}
                <div id="what-is-tvo" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Is TVO?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      <strong>TVO</strong> is a public educational organization in the
                      province of Ontario, Canada. As one of Ontario&apos;s official
                      educational institutions, TVO develops digital learning solutions,
                      produces educational content, supports lifelong learning, and
                      provides public education services.
                    </p>
                    <p>
                      TVO is not simply a media organization — it is a publicly supported
                      institution active in educational technology and digital learning.
                    </p>
                    <p>
                      Today, TVO houses several educational services. One of the most
                      significant is <strong>TVO ILC</strong>, its secondary school
                      division.
                    </p>
                  </div>
                </div>

                {/* ── Section 2: What Is TVO ILC? ── */}
                <div id="what-is-tvo-ilc" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Is TVO ILC?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      <strong>TVO ILC</strong> (Independent Learning Centre) is an official
                      online high school operating within Ontario&apos;s education system.
                    </p>
                    <p>
                      TVO ILC provides secondary school credits, offers pathways to the{" "}
                      <Link
                        href="/en/what-is-ossd"
                        className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        Ontario Secondary School Diploma (OSSD)
                      </Link>
                      , and follows the Ontario curriculum. It is widely recognized as one
                      of the <strong>largest online high schools in Ontario</strong>, playing
                      a significant role in the Ministry of Education&apos;s distance
                      learning model.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Key Features of TVO ILC
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Official secondary school within Ontario's education system",
                        "Authorized to issue the OSSD diploma",
                        "Follows the Ontario curriculum for all courses",
                        "Accessible to international students",
                        "Flexible, self-paced learning model",
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

                {/* ── Section 3: What Is the OSSD? ── */}
                <div id="what-is-ossd" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Is the OSSD and Why Does It Matter?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      The{" "}
                      <Link
                        href="/en/what-is-ossd"
                        className="font-semibold text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        OSSD (Ontario Secondary School Diploma)
                      </Link>{" "}
                      is the official high school diploma issued by the province of Ontario,
                      Canada. Internationally recognized, it supports university applications
                      across Canada, the UK, Europe, the United States, and many other
                      countries.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7 mb-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      OSSD Graduation Requirements
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Complete at least 30 credits",
                        "Meet the Ontario literacy requirement (OSSLT)",
                        "Complete 40 hours of community involvement",
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
                  <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4 py-1 text-lg">
                    The OSSD is not just a graduation certificate — it is a strategic
                    academic credential that broadens a student&apos;s global education
                    options.
                  </p>
                </div>

                {/* ── Section 4: Dual Diploma ── */}
                <div id="dual-diploma" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Is the Canadian Dual Diploma Program?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      A Canadian dual diploma program allows students to earn a{" "}
                      <Link
                        href="/en/how-to-get-canadian-high-school-diploma"
                        className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        Canadian high school diploma
                      </Link>{" "}
                      while continuing their education in their home country. Students
                      remain enrolled in their local school, study Ontario curriculum courses
                      online, and graduate with two diplomas.
                    </p>
                    <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4 py-1">
                      This model provides a strong academic advantage for students with
                      international education goals.
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      How the Dual Diploma Model Works
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Student remains enrolled in their home-country school",
                        "Simultaneously studies TVO ILC courses online",
                        "Previously completed courses may be counted as credits",
                        "Graduates with both the local diploma and the OSSD",
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

                {/* ── Section 5: History ── */}
                <div id="history" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    The History of TVO ILC
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      TVO ILC&apos;s roots extend back to 1926, when Ontario first developed
                      distance learning systems for secondary education.
                    </p>
                    <p>
                      This history demonstrates that TVO ILC is not a short-term initiative
                      — it is the continuation of a long-established educational model.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7">
                    <h3 className="font-bold text-warm-800 mb-5">Key Milestones</h3>
                    <div className="space-y-4">
                      {[
                        { year: "1926", desc: "Ontario begins developing distance learning programs for secondary education" },
                        { year: "1984", desc: "The Independent Learning Centre (ILC) name is formally established" },
                        { year: "2002", desc: "ILC responsibility is transferred to TVO" },
                        { year: "2019", desc: "Courses migrate to a modern digital learning platform" },
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

                {/* ── Section 6: Scale ── */}
                <div id="scale" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    The Scale and Reach of TVO ILC
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    According to independent education reports, TVO ILC operates at
                    significant scale within Ontario and internationally.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { icon: Building2, stat: "250+", label: "Partner private schools" },
                      { icon: Globe, stat: "90+", label: "Countries reached" },
                      { icon: Monitor, stat: "Thousands", label: "Students per year" },
                      { icon: GraduationCap, stat: "Ontario", label: "All school boards connected" },
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
                    These figures confirm that TVO ILC is not a niche platform — it is a
                    large-scale, established educational institution with proven
                    international reach.
                  </p>
                </div>

                {/* ── Section 7: How to Earn ── */}
                <div id="how-to-earn" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Students Earn a{" "}
                    <Link
                      href="/en/how-to-get-canadian-high-school-diploma"
                      className="text-brand-500 hover:text-brand-600"
                    >
                      Canadian High School Diploma
                    </Link>{" "}
                    Through TVO ILC
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Earning a Canadian high school diploma through TVO ILC follows a
                    structured process.
                  </p>
                  <div className="space-y-4 mb-6">
                    {[
                      { step: "1", title: "Academic Assessment", desc: "The student's existing academic background and transcripts are reviewed." },
                      { step: "2", title: "Course Planning", desc: "Required courses are identified and a personalized course plan is created." },
                      { step: "3", title: "Online Course Completion", desc: "The student completes Ontario-curriculum courses through the TVO ILC platform." },
                      { step: "4", title: "Meeting Graduation Requirements", desc: "30 credits, the literacy requirement, and community involvement hours are completed." },
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
                    To learn more about the application process, visit our{" "}
                    <Link href="/en/apply" className="text-brand-500 underline underline-offset-2 hover:text-brand-600">
                      application page
                    </Link>
                    .
                  </p>
                </div>

                {/* ── Section 8: Reliability ── */}
                <div id="reliability" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Why Is TVO ILC Considered a Reliable Education Model?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The credibility of an educational institution rests on its governance
                    structure, official status, academic standards, history, and scale.
                    TVO ILC meets all of these criteria.
                  </p>
                  <div className="space-y-3 mb-6">
                    {[
                      "Governed by a publicly accountable educational organization",
                      "Part of Ontario's official education system",
                      "Authorized to issue the OSSD — a recognized, government-issued diploma",
                      "Uses standardized, Ontario-curriculum assessment processes",
                      "A continuous educational tradition dating back to 1926",
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
                    TVO ILC is not simply an online course platform. It is Ontario&apos;s
                    established digital high school model.
                  </p>
                </div>

                {/* ── Section 9: Catalyst Role ── */}
                <div id="catalyst-role" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Does Catalyst Education Support Students?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Catalyst Education operates as a support partner within the TVO
                      collaboration framework, helping students navigate the entire
                      enrollment and academic planning process.
                    </p>
                    <p>
                      Through this model, students are not left alone with an online
                      platform — they receive structured, guided support throughout
                      their journey.
                    </p>
                  </div>
                  <div className="bg-warm-100 rounded-2xl p-7 mb-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Catalyst Education Support
                    </h3>
                    <ul className="space-y-3">
                      {[
                        "Student enrollment process management",
                        "Academic planning and course selection",
                        "Ongoing guidance and advisory support",
                        "Parent and student communication coordination",
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
                    Ready to learn more?{" "}
                    <Link href="/en/contact" className="text-brand-500 underline underline-offset-2 hover:text-brand-600">
                      Contact us
                    </Link>{" "}
                    to get started.
                  </p>
                </div>

                {/* ── Section 10: FAQ ── */}
                <div id="faq" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Frequently Asked Questions
                  </h2>
                  <SimpleFAQAccordion items={faqItems} />
                </div>

                {/* Internal Links */}
                <div className="bg-warm-100 border border-warm-300 rounded-2xl p-7">
                  <h3 className="font-bold text-warm-800 mb-5 flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-brand-500" />
                    Related Guides
                  </h3>
                  <div className="space-y-3">
                    {[
                      { href: "/en/what-is-ossd", label: "What Is OSSD? — Ontario Secondary School Diploma Guide", live: true },
                      { href: "/en/how-to-get-canadian-high-school-diploma", label: "How to Get a Canadian High School Diploma", live: true },
                      { href: "/en/ossd-benefits", label: "OSSD Benefits — Why Students Choose the Canadian Diploma", live: true },
                      { href: "/en/diploma", label: "Canadian High School Diploma Program — Catalyst Education", live: true },
                      { href: "/en/contact", label: "Contact Us — Learn More", live: true },
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
                          <span className="ml-auto text-xs bg-warm-200 text-warm-500 px-2 py-0.5 rounded-full">Coming soon</span>
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
                    Table of Contents
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
                      Get expert guidance on TVO ILC and the Canadian high school diploma.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full h-10 items-center justify-center gap-2 rounded-full bg-trust-500 px-5 text-sm font-medium text-white hover:bg-trust-600 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Get in Touch
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
                Learn More About the Canadian High School Diploma
              </h2>
              <p className="text-warm-700 text-lg leading-relaxed">
                Contact us to learn more about the OSSD, Canadian high school diploma
                pathways, and the dual diploma model.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Inquiry
                </a>
                <Link
                  href="/en/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-white px-8 text-base font-medium text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  Contact Form
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm text-warm-500">
                Free initial consultation · Personalized roadmap · Expert support
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
