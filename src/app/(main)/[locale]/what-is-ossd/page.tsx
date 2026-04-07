import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import Image from "next/image";
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

  if (locale === "tr") {
    return {
      title: "OSSD Nedir? | Catalyst Education",
      alternates: { canonical: PAGE_URL_TR },
    };
  }

  const title =
    "What Is OSSD? Complete Guide to the Ontario Secondary School Diploma (2026)";
  const description =
    "What is OSSD? Learn how the Ontario Secondary School Diploma works, how students earn it, how long it takes, and which universities they can apply to.";

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
    question: "What is OSSD?",
    answer:
      "OSSD (Ontario Secondary School Diploma) is the official high school diploma granted in the province of Ontario, Canada. It is internationally recognized and allows students to apply to universities worldwide.",
  },
  {
    question: "How many credits are required for OSSD?",
    answer:
      "Students must complete at least 30 credits to earn the OSSD. Additional graduation requirements include passing the Ontario Secondary School Literacy Test (OSSLT) and completing 40 hours of community involvement.",
  },
  {
    question: "How long does it take to complete OSSD?",
    answer:
      "The timeline depends on the student's prior academic background. It typically ranges from 6–12 months for Grade 12-equivalent students to 3–4 years for Grade 9 students. Credit recognition from previous studies can significantly shorten the overall timeline.",
  },
  {
    question: "Can students earn a Canadian diploma while studying in Türkiye?",
    answer:
      "Yes. Many students continue their local education while simultaneously working toward an OSSD diploma. This is commonly referred to as the Dual Diploma Program. It allows students to expand their academic options and access international education pathways.",
  },
  {
    question: "Is English required for OSSD?",
    answer:
      "An official English certificate is not always required. However, students are expected to have a working level of English to follow the coursework effectively.",
  },
  {
    question: "Which universities can students apply to with OSSD?",
    answer:
      "OSSD is accepted by universities in Canada, the UK, Europe, the US, and many other countries. Specific admission requirements vary by institution, but the OSSD is widely recognized as a strong academic qualification.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "What Is OSSD? Complete Guide to the Ontario Secondary School Diploma",
  description:
    "What is OSSD? Learn how the Ontario Secondary School Diploma works, how students earn it, how long it takes, and which universities they can apply to.",
  author: { "@type": "Organization", name: "Catalyst Education", url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: "Catalyst Education",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-04-03",
  dateModified: "2026-04-05",
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
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/en` },
    {
      "@type": "ListItem",
      position: 3,
      name: "What Is OSSD?",
      item: PAGE_URL_EN,
    },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "what-is-ossd", label: "What Is OSSD?" },
  { id: "what-ossd-does", label: "What Does the OSSD Do?" },
  { id: "how-to-earn", label: "How to Earn an OSSD" },
  { id: "who-is-it-for", label: "Who Is It For?" },
  { id: "is-it-online", label: "Is It Online?" },
  { id: "how-long", label: "How Long Does It Take?" },
  { id: "universities", label: "Which Universities Accept OSSD?" },
  { id: "study-in-turkey", label: "Study in Türkiye + Canadian Diploma?" },
  { id: "faq", label: "Frequently Asked Questions" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function WhatIsOssdPage() {
  const locale = await getLocale();
  if (locale === "tr") {
    redirect("/tr/ossd-nedir");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to learn more about the OSSD program."
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
                  <span className="text-warm-800 font-medium">What Is OSSD?</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                  <BookOpen className="h-4 w-4 text-brand-500" />
                  <span className="text-xs text-warm-600">
                    Education Guide · 2026
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                  What Is OSSD? Complete Guide to the{" "}
                  <span className="text-brand-500">Ontario Secondary School Diploma</span>
                </h1>
                <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                  Everything you need to know about the Ontario Secondary School
                  Diploma — how it works, how students earn it, how long it takes,
                  and which universities worldwide recognize it.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />8 min read
                  </span>
                  <span>·</span>
                  <span>April 3, 2026</span>
                  <span>·</span>
                  <span>Catalyst Education</span>
                </div>
              </div>

              {/* Right: Hero image */}
              <div className="relative hidden lg:block">
                <div className="relative rounded-3xl overflow-hidden shadow-lg aspect-[4/3]">
                  <Image
                    src="/ossd-hero.png"
                    alt="Student and parent learning about the OSSD Canadian high school diploma"
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
                      Quick Answer: What Is OSSD?
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    <strong>OSSD (Ontario Secondary School Diploma)</strong> is
                    the official high school diploma granted in the province of
                    Ontario, Canada. It is an internationally recognized academic
                    qualification that enables students to apply to universities
                    in Canada, the United Kingdom, Europe, and beyond.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "Internationally recognized" },
                      { icon: Monitor, label: "Fully online" },
                      { icon: GraduationCap, label: "30 credit requirement" },
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

                {/* ── Section 1: What Is OSSD? ── */}
                <div id="what-is-ossd" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Is OSSD?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      <strong>OSSD (Ontario Secondary School Diploma)</strong> is
                      the official high school diploma issued in the province of
                      Ontario, Canada. Governed by the standards of the Ontario
                      education system, the program is designed to build
                      academic, language, and critical thinking skills.
                    </p>
                    <p>
                      Because it is recognized by universities worldwide, the
                      OSSD opens doors to higher education in Canada, the United
                      Kingdom, Europe, the United States, and many other
                      countries.
                    </p>
                    <p>
                      One of the program&apos;s defining strengths is its
                      flexible structure. Students can progress at their own
                      pace and continue their existing education while pursuing
                      the diploma at the same time.
                    </p>
                    <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4 py-1">
                      OSSD is not simply a graduation certificate — it is a
                      strategic academic pathway that expands a student&apos;s
                      future education options.
                    </p>
                  </div>
                </div>

                {/* ── Section 2: What Does OSSD Do? ── */}
                <div id="what-ossd-does" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Does the OSSD Diploma Do?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The OSSD provides students with a strong academic foundation
                    for international education pathways. With an OSSD diploma,
                    students can:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Earn an internationally recognized high school diploma",
                      "Apply to universities in Canada and around the world",
                      "Strengthen academic English skills",
                      "Adapt early to a global education system",
                      "Build a more competitive university application profile",
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
                    Today, many students choose the OSSD pathway to expand their
                    future academic options and prepare for international higher
                    education.
                  </p>
                </div>

                {/* ── Section 3: How to Earn ── */}
                <div id="how-to-earn" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Can Students Earn an OSSD?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    To earn the Ontario Secondary School Diploma, students must
                    meet specific academic graduation requirements.
                  </p>
                  <div className="bg-warm-100 rounded-2xl p-7 mb-6">
                    <h3 className="font-bold text-warm-800 mb-5">
                      Graduation Requirements
                    </h3>
                    <div className="space-y-1">
                      {[
                        {
                          label: "Credits",
                          value: "At least 30 credits",
                          note: "Compulsory and elective courses combined",
                        },
                        {
                          label: "Literacy",
                          value: "Pass the OSSLT",
                          note: "Ontario Secondary School Literacy Test",
                        },
                        {
                          label: "Community",
                          value: "40 hours of community involvement",
                          note: "Required for graduation",
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
                      <strong className="text-warm-800">Important:</strong>{" "}
                      Students do not always start from zero. During the
                      application process, a student&apos;s previous academic
                      history is evaluated, and courses already completed may be
                      counted as credits toward the diploma. This ensures
                      students begin at the right level and can optimize their
                      path to graduation.
                    </p>
                  </div>
                </div>

                {/* ── Section 4: Who Is It For? ── */}
                <div id="who-is-it-for" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Who Is the OSSD Program Suitable For?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The OSSD program is particularly well-suited for students who:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        icon: Globe,
                        text: "Plan to study at a university outside their home country",
                      },
                      {
                        icon: BookOpen,
                        text: "Want to strengthen their academic English skills",
                      },
                      {
                        icon: GraduationCap,
                        text: "Want to earn a second diploma while continuing local education",
                      },
                      {
                        icon: Users,
                        text: "Aim to adapt early to the Canadian education system",
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
                    This program is not exclusively for top-performing students.
                    With proper planning and guidance, many students can
                    successfully complete it.
                  </p>
                </div>

                {/* ── Section 5: Online? ── */}
                <div id="is-it-online" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Is the OSSD Program Online?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      Yes. The OSSD program can be delivered fully online.
                      Students access their courses through a digital learning
                      platform and manage their studies according to their own
                      schedule.
                    </p>
                    <p>
                      One of the biggest advantages of this model is that
                      students can continue their local education while earning
                      an internationally recognized diploma at the same time.
                    </p>
                  </div>
                  <div className="mt-6 bg-info-50 border border-info-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                      <Monitor className="h-5 w-5 text-[#3B7CB0] flex-shrink-0 mt-0.5" />
                      <p className="text-warm-700 text-sm leading-relaxed">
                        <strong>Flexibility:</strong> Students progress at their
                        own pace. Course scheduling can be arranged around
                        existing school commitments, so both education tracks
                        can run in parallel without conflict.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Section 6: How Long? ── */}
                <div id="how-long" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Long Does It Take to Complete OSSD?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    There is no single answer. The timeline depends on the
                    student&apos;s existing academic background.
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-warm-300 mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-warm-100 border-b border-warm-300">
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Student Level
                          </th>
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Estimated Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-200">
                        {[
                          { level: "Grade 9", duration: "3–4 years" },
                          { level: "Grade 10", duration: "2–3 years" },
                          { level: "Grade 11", duration: "1.5–2 years" },
                          { level: "Grade 12", duration: "6–12 months" },
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
                    Because previously completed coursework may be recognized as
                    credits, the time to graduation can be significantly
                    shortened. This is assessed individually during the
                    application process.
                  </p>
                </div>

                {/* ── Section 7: Universities ── */}
                <div id="universities" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Which Universities Accept the OSSD?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The OSSD diploma is recognized by universities worldwide.
                    With an OSSD diploma, students can apply to:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { flag: "🇨🇦", label: "Canadian universities" },
                      { flag: "🇬🇧", label: "UK universities" },
                      { flag: "🇪🇺", label: "European universities" },
                      { flag: "🇺🇸", label: "US universities" },
                      { flag: "🌍", label: "International private universities" },
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
                    Admission requirements vary by institution and country. The
                    OSSD is widely recognized as a strong academic qualification,
                    though specific equivalency and entry criteria differ.
                  </p>
                </div>

                {/* ── Section 8: Study in Turkey ── */}
                <div id="study-in-turkey" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Can Students Study in Türkiye While Earning a Canadian
                    Diploma?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Yes. Many students continue their education in their local
                      schools while simultaneously working toward an OSSD
                      diploma.
                    </p>
                    <p>
                      This model is commonly known as the{" "}
                      <strong>Dual Diploma Program</strong>. It allows students
                      to expand their academic opportunities and access
                      international education pathways — without interrupting
                      their existing schooling.
                    </p>
                    <p>
                      <Link
                        href="/en/ossd-dual-diploma"
                        className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                      >
                        Want to earn OSSD from Turkey? Read our dual diploma guide →
                      </Link>
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      How the Dual Diploma Model Works
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Student continues attending their school in Türkiye",
                        "Simultaneously pursues OSSD courses online",
                        "Existing coursework may be recognized as OSSD credits",
                        "Completes the requirements for both diplomas",
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

                {/* ── Section 9: FAQ ── */}
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
                    Continue Reading
                  </h3>
                  <div className="space-y-3">
                    {[
                      {
                        href: "/en/ossd-dual-diploma",
                        label: "OSSD Dual Diploma — Earn a Canadian Diploma While Studying in Turkey",
                        live: true,
                      },
                      {
                        href: "/en/diploma",
                        label: "Canadian High School Diploma Program — Catalyst Education",
                        live: true,
                      },
                      {
                        href: "/en/how-to-get-canadian-high-school-diploma",
                        label: "How to Get a Canadian High School Diploma",
                        live: true,
                      },
                      {
                        href: "/en/ossd-benefits",
                        label: "OSSD Benefits — Why Students Choose a Canadian Diploma",
                        live: true,
                      },
                      {
                        href: "/en/contact",
                        label: "Contact Us — Get Guidance",
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
                          title="Coming soon"
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
                      Get expert guidance on your OSSD pathway.
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
                Plan Your Canadian Diploma Pathway
              </h2>
              <p className="text-warm-700 text-lg leading-relaxed">
                Contact us to learn more about the OSSD process, evaluate your
                eligibility, and build a personal roadmap toward your Canadian
                diploma.
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
                  href="/en/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-white px-8 text-base font-medium text-warm-800 hover:bg-warm-100 transition-colors"
                >
                  Contact Form
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="text-sm text-warm-500">
                Free initial assessment · Personal roadmap · Expert support
              </p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
