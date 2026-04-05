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

  if (locale === "tr") {
    return {
      title: "Kanada Lise Diploması Nasıl Alınır? | Catalyst Education",
      alternates: { canonical: PAGE_URL_TR },
    };
  }

  const title =
    "How to Get a Canadian High School Diploma (OSSD): Step-by-Step Guide (2026)";
  const description =
    "Learn how students can earn the Ontario Secondary School Diploma (OSSD) while studying in Türkiye. Step-by-step guide covering application, credit assessment, online courses, and graduation.";

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
    question: "Can students in Türkiye get a Canadian high school diploma?",
    answer:
      "Yes. Students in Türkiye can earn the Ontario Secondary School Diploma (OSSD) while continuing their current local education. The program runs entirely online, so there is no need to relocate or interrupt existing schooling.",
  },
  {
    question: "What is the first step to getting an OSSD?",
    answer:
      "The process begins with an academic evaluation. Transcripts and previous coursework are reviewed to determine the student's grade level and which credits they still need to complete.",
  },
  {
    question: "How long does the application process take?",
    answer:
      "In most cases, the application process — from submitting documents to starting courses — takes 1 to 2 weeks.",
  },
  {
    question: "How long does it take to complete the OSSD?",
    answer:
      "The timeline depends on the student's current academic level. Grade 9-level students typically need 2–4 years, while Grade 12-level students may complete the program in 6–18 months. Credit recognition from previous studies can significantly shorten the overall duration.",
  },
  {
    question: "Is the OSSD program fully online?",
    answer:
      "Yes. The OSSD program is delivered entirely online. Students access course materials digitally, submit assignments through the platform, and receive individual feedback from their teachers.",
  },
  {
    question: "Do students need to quit their current school to earn an OSSD?",
    answer:
      "No. Many students pursue the OSSD simultaneously with their local school education. Previous coursework may be recognized as OSSD credits, reducing the overall time needed.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "How to Get a Canadian High School Diploma (OSSD): Step-by-Step Guide",
  description:
    "Learn how students can earn the Ontario Secondary School Diploma (OSSD) while studying in Türkiye. Step-by-step guide from application to graduation.",
  author: { "@type": "Organization", name: "Catalyst Education", url: SITE_URL },
  publisher: {
    "@type": "Organization",
    name: "Catalyst Education",
    logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
  },
  datePublished: "2026-04-05",
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
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/en/guides` },
    {
      "@type": "ListItem",
      position: 3,
      name: "How to Get a Canadian High School Diploma",
      item: PAGE_URL_EN,
    },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "who-can-apply", label: "Who Can Apply?" },
  { id: "step-1", label: "Step 1: Application & Evaluation" },
  { id: "step-2", label: "Step 2: Credit Assessment" },
  { id: "step-3", label: "Step 3: Starting Online Courses" },
  { id: "step-4", label: "Step 4: Continuous Assessment" },
  { id: "step-5", label: "Step 5: Graduation & Diploma" },
  { id: "how-long", label: "How Long Does It Take?" },
  { id: "application-timeline", label: "Application Process Timeline" },
  { id: "faq", label: "Frequently Asked Questions" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function HowToGetCanadianDiplomaPage() {
  const locale = await getLocale();
  if (locale === "tr") {
    redirect("/tr/kanada-lise-diplomasi-nasil-alinir");
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
                  <span className="text-warm-800 font-medium">How to Get a Canadian High School Diploma</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm mb-5">
                  <BookOpen className="h-4 w-4 text-brand-500" />
                  <span className="text-xs text-warm-600">
                    Step-by-Step Guide · 2026
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] text-warm-800 mb-5">
                  How to Get a{" "}
                  <span className="text-brand-500">Canadian High School Diploma</span>{" "}
                  (OSSD)
                </h1>
                <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                  A practical step-by-step guide to earning the Ontario Secondary
                  School Diploma — from the initial assessment through to
                  graduation, without leaving Türkiye.
                </p>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />10 min read
                  </span>
                  <span>·</span>
                  <span>April 5, 2026</span>
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
                    alt="Student learning how to get a Canadian high school diploma online"
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
                      Quick Answer: How to Get a Canadian High School Diploma
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    The <strong>Ontario Secondary School Diploma (OSSD)</strong> is
                    Canada&apos;s internationally recognized high school diploma.
                    Students in Türkiye can earn it while continuing their current
                    education — entirely online, without relocating.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "Internationally recognized" },
                      { icon: Monitor, label: "Fully online" },
                      { icon: Clock, label: "1–2 week application" },
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

                {/* ── Section 1: Who Can Apply ── */}
                <div id="who-can-apply" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Who Can Get a Canadian High School Diploma?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Students who typically apply include:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        icon: Users,
                        text: "Middle school or high school students",
                      },
                      {
                        icon: BookOpen,
                        text: "Students continuing education in Türkiye",
                      },
                      {
                        icon: Globe,
                        text: "Students planning to study abroad",
                      },
                      {
                        icon: GraduationCap,
                        text: "Students aiming to improve academic English",
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
                    The program is personalized based on the student&apos;s
                    existing academic background. Students do not need to start
                    from zero.
                  </p>
                </div>

                {/* ── Step-by-Step Header ── */}
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-3 pb-3 border-b border-warm-300">
                    Step-by-Step: How to Get a Canadian High School Diploma
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    The process follows five clear stages — from initial
                    assessment through to diploma graduation.
                  </p>
                </div>

                {/* ── Step 1 ── */}
                <div id="step-1" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Application and Academic Evaluation
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      The process begins with reviewing academic records.
                    </p>
                    <div className="bg-warm-100 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {[
                          "Transcripts and academic records are reviewed",
                          "The student's grade level is determined",
                          "Which courses are still needed is mapped out",
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

                {/* ── Step 2 ── */}
                <div id="step-2" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Credit Assessment and Course Planning
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      Previous academic achievements are evaluated and a
                      personalized study plan is created.
                    </p>
                    <div className="bg-warm-100 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {[
                          "Previously completed courses are assessed for credit recognition",
                          "The number of remaining credits is determined",
                          "A personalized course plan is prepared for the student",
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

                {/* ── Step 3 ── */}
                <div id="step-3" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Starting Online Courses
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      The OSSD program is delivered entirely online.
                    </p>
                    <div className="bg-warm-100 rounded-2xl p-6">
                      <ul className="space-y-3">
                        {[
                          "Course content is accessed through a digital learning platform",
                          "Assignments are submitted online",
                          "Students receive individual feedback from their teachers",
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
                        <strong className="text-warm-800">Flexibility:</strong>{" "}
                        Students can continue attending their local school while
                        completing OSSD courses at their own pace. Both
                        education tracks run in parallel without conflict.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ── Step 4 ── */}
                <div id="step-4" className="scroll-mt-24 mb-10">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Continuous Assessment
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      Student performance is evaluated throughout the course.
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {[
                        { icon: FileText, label: "Assignments" },
                        { icon: ClipboardList, label: "Projects" },
                        { icon: BookOpen, label: "Quizzes & Tests" },
                        { icon: Award, label: "Final Evaluations" },
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

                {/* ── Step 5 ── */}
                <div id="step-5" className="scroll-mt-24 mb-14">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="h-10 w-10 rounded-2xl bg-trust-500 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white font-bold text-sm">5</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-warm-800 leading-snug pt-1">
                      Graduation and Diploma
                    </h3>
                  </div>
                  <div className="pl-14">
                    <p className="text-warm-700 leading-relaxed text-lg mb-5">
                      Once all required credits are completed, the student
                      receives the Ontario Secondary School Diploma.
                    </p>
                    <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                      <h4 className="font-bold text-warm-800 mb-4">
                        The OSSD diploma is accepted for university applications in:
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {[
                          { flag: "🇨🇦", label: "Canada" },
                          { flag: "🇬🇧", label: "United Kingdom" },
                          { flag: "🇪🇺", label: "Europe" },
                          { flag: "🇺🇸", label: "United States" },
                          { flag: "🌍", label: "Many other countries" },
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

                {/* ── Section: How Long ── */}
                <div id="how-long" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Long Does It Take to Get a Canadian High School Diploma?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The timeline depends on the student&apos;s academic level.
                  </p>
                  <div className="overflow-x-auto rounded-2xl border border-warm-300 mb-6">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-warm-100 border-b border-warm-300">
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Student Level
                          </th>
                          <th className="text-left px-6 py-4 font-bold text-warm-800">
                            Typical Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-200">
                        {[
                          { level: "Grade 9", duration: "2–4 years" },
                          { level: "Grade 10", duration: "1.5–3 years" },
                          { level: "Grade 11", duration: "1–2 years" },
                          { level: "Grade 12", duration: "6–18 months" },
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
                    credits, the overall duration can be significantly shortened.
                    This is assessed individually during the application process.
                  </p>
                </div>

                {/* ── Section: Application Timeline ── */}
                <div id="application-timeline" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Long Does the Application Process Take?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    In most cases, the application process covers:
                  </p>
                  <div className="space-y-3 mb-8">
                    {[
                      "Completing the application form",
                      "Sharing academic documents",
                      "Academic evaluation",
                      "Creating a course plan",
                      "Starting the program",
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
                      These steps can be completed in most cases within:
                    </p>
                    <p className="text-3xl font-bold text-warm-800 mt-3">
                      1 to 2 weeks
                    </p>
                  </div>
                </div>

                {/* ── Section: Final Thoughts ── */}
                <div className="bg-brand-50 border border-brand-200 rounded-2xl p-7 mb-14">
                  <h3 className="font-bold text-warm-800 mb-3 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-brand-500" />
                    Final Thoughts
                  </h3>
                  <p className="text-warm-700 leading-relaxed">
                    With proper planning, students can earn an internationally
                    recognized diploma without interrupting their current
                    education. The OSSD pathway is designed to fit around
                    existing commitments — flexible, fully online, and
                    accessible from Türkiye.
                  </p>
                </div>

                {/* ── Section: FAQ ── */}
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
                        href: "/en/what-is-ossd",
                        label: "What Is OSSD? Complete Guide to the Ontario Secondary School Diploma",
                        live: true,
                      },
                      {
                        href: "/en/diploma",
                        label: "Canadian High School Diploma Program — Catalyst Education",
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
