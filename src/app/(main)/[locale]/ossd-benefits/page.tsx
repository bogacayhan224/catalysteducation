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

  if (locale === "tr") {
    return {
      title: "OSSD Avantajları | Catalyst Education",
      alternates: { canonical: PAGE_URL_TR },
    };
  }

  const title =
    "What Are the Benefits of OSSD? 10 Key Advantages of a Canadian High School Diploma (2026)";
  const description =
    "Discover the academic, university admission, and global education benefits of earning the Ontario Secondary School Diploma (OSSD).";

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
    question: "Which universities accept the OSSD?",
    answer:
      "The OSSD is recognized by universities in Canada, the UK, Europe, the US, and many other countries. Specific admission requirements vary by institution, but the OSSD is widely accepted as a strong academic qualification.",
  },
  {
    question: "Can students earn OSSD benefits while continuing school in Türkiye?",
    answer:
      "Yes. Because the OSSD program is delivered entirely online, students can continue their current school while simultaneously working toward a Canadian high school diploma. This model preserves students' social lives while expanding their academic options.",
  },
  {
    question: "Does OSSD guarantee university admission?",
    answer:
      "No. No high school diploma guarantees university admission. However, the OSSD strengthens academic applications, provides an advantage in international university applications, and supports university preparation.",
  },
  {
    question: "How long does it take to complete the OSSD program?",
    answer:
      "The timeline depends on the student's prior academic background. It typically ranges from 6–12 months for Grade 12-equivalent students to 2–4 years for those starting at a lower level. Credit recognition from previous studies can significantly reduce the overall timeline.",
  },
  {
    question: "Who is the OSSD program best suited for?",
    answer:
      "The OSSD is particularly suitable for students who plan to study abroad, want to improve their academic English, seek an internationally recognized diploma, or want to expand their academic options — without disrupting their current education.",
  },
  {
    question: "Is an English certificate required for OSSD?",
    answer:
      "An official English certificate is not always required. However, students are expected to have a working level of English to follow the coursework. The program also helps students improve their academic English skills over time.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "What Are the Benefits of OSSD? 10 Key Advantages of a Canadian High School Diploma",
  description:
    "Discover the academic, university admission, and global education benefits of earning the Ontario Secondary School Diploma (OSSD).",
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
    { "@type": "ListItem", position: 3, name: "OSSD Benefits", item: PAGE_URL_EN },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "what-is-ossd", label: "What Is OSSD?" },
  { id: "international-recognition", label: "International Recognition" },
  { id: "academic-profile", label: "Academic Profile & English Skills" },
  { id: "online-flexible", label: "Online & Flexible Model" },
  { id: "university-prep", label: "University Preparation" },
  { id: "who-is-it-for", label: "Who Is It For?" },
  { id: "university-admission", label: "University Admission" },
  { id: "faq", label: "Frequently Asked Questions" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function OssdBenefitsPage() {
  const locale = await getLocale();
  if (locale === "tr") {
    redirect("/tr/ossd-avantajlari");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to learn more about the OSSD program benefits."
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
                  <span className="text-warm-800 font-medium">OSSD Benefits</span>
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
                What Are the Benefits of OSSD?{" "}
                <span className="text-brand-500">10 Key Advantages</span>{" "}
                of a Canadian High School Diploma
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                The Ontario Secondary School Diploma (OSSD) is an internationally
                recognized high school diploma that offers students valuable
                academic and career opportunities. In this guide, we explore the
                key advantages of earning a Canadian high school diploma.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />6 min read
                </span>
                <span>·</span>
                <span>April 5, 2026</span>
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
                      Quick Answer: Why Is OSSD Valuable?
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    The <strong>Ontario Secondary School Diploma (OSSD)</strong> is
                    Canada&apos;s official high school credential from Ontario,
                    recognized by universities worldwide. It strengthens students&apos;
                    academic profiles, develops academic English skills, and — since
                    it is delivered entirely online — can be earned while continuing
                    local education in Türkiye.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "Internationally recognized" },
                      { icon: Monitor, label: "Fully online" },
                      { icon: GraduationCap, label: "Flexible program" },
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
                      The Ontario Secondary School Diploma (OSSD) is the official
                      high school diploma awarded in Ontario, Canada and recognized
                      worldwide.
                    </p>
                    <p>
                      For a detailed overview of how the program works, visit our
                      complete guide:
                    </p>
                  </div>
                  <div className="mt-5 bg-warm-100 border border-warm-300 rounded-xl p-5">
                    <Link
                      href="/en/what-is-ossd"
                      className="flex items-center gap-2 text-brand-500 font-semibold hover:text-brand-600 transition-colors group"
                    >
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      What Is OSSD? Complete Guide to the Ontario Secondary School Diploma
                    </Link>
                  </div>
                </div>

                {/* ── Section 2: International Recognition ── */}
                <div id="international-recognition" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Internationally Recognized Diploma
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The OSSD is recognized by universities and institutions around
                    the world. Students can apply to universities in:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { flag: "🇨🇦", label: "Canadian universities" },
                      { flag: "🇬🇧", label: "United Kingdom" },
                      { flag: "🇪🇺", label: "Europe" },
                      { flag: "🇺🇸", label: "United States" },
                      { flag: "🌍", label: "Many other countries" },
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
                  <p className="text-warm-700 leading-relaxed text-lg">
                    An international diploma strengthens a student&apos;s academic
                    profile and provides a meaningful advantage when applying to
                    universities abroad.
                  </p>
                </div>

                {/* ── Section 3: Academic Profile & English Skills ── */}
                <div id="academic-profile" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Academic Profile and English Skills Development
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The OSSD program is delivered in English and focuses on
                    academic learning. Students develop a range of valuable skills:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Academic writing skills",
                      "Reading comprehension and analytical thinking",
                      "Familiarity with academic terminology",
                      "Critical thinking and problem-solving",
                      "Independent learning habits",
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
                    The Canadian education model emphasizes project-based and
                    research-based learning. This approach helps students develop
                    the academic habits they need for a successful university
                    experience.
                  </p>
                </div>

                {/* ── Section 4: Online & Flexible ── */}
                <div id="online-flexible" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Earn a Diploma While Continuing School in Türkiye
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    Because the OSSD program is delivered entirely online, students
                    can work toward their Canadian diploma without disrupting their
                    current education.
                  </p>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6 mb-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      What This Model Allows
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "Continuity in school life and social environment",
                        "Flexibility in academic planning",
                        "Reduced disruption to daily routines",
                        "Local school and OSSD courses can run simultaneously",
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
                      <strong className="text-warm-800">Important:</strong>{" "}
                      Credits from previously completed coursework can often be
                      applied toward the OSSD, significantly reducing the time
                      needed to complete the program.
                    </p>
                  </div>
                </div>

                {/* ── Section 5: University Preparation ── */}
                <div id="university-prep" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    University Preparation and Academic Confidence
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The OSSD helps students build strong academic habits before
                    university. Succeeding in an international academic environment
                    also builds confidence and independence.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      {
                        icon: GraduationCap,
                        title: "Academic Discipline",
                        text: "Students develop time management skills and a sense of academic responsibility.",
                      },
                      {
                        icon: Globe,
                        title: "Global Perspective",
                        text: "Students gain international education experience and develop global academic awareness.",
                      },
                      {
                        icon: Award,
                        title: "Academic Confidence",
                        text: "Achieving success in an international program has a positive effect on university and career prospects.",
                      },
                      {
                        icon: BookOpen,
                        title: "Alternative Pathway",
                        text: "The OSSD provides an additional academic route for students planning international education.",
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
                    The OSSD is not only a diploma — it is a long-term investment in
                    a student&apos;s academic and career future.
                  </p>
                </div>

                {/* ── Section 6: Who Is It For? ── */}
                <div id="who-is-it-for" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Who Should Consider the OSSD?
                  </h2>
                  <p className="text-warm-700 leading-relaxed text-lg mb-6">
                    The program is particularly suitable for students who:
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Plan to study abroad",
                      "Want to improve their academic English skills",
                      "Seek an internationally recognized diploma",
                      "Want to expand their academic and career options",
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
                    The OSSD is not exclusive to the highest-performing students.
                    With the right planning and guidance, many students can complete
                    the program successfully.
                  </p>
                </div>

                {/* ── Section 7: University Admission ── */}
                <div id="university-admission" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Does OSSD Guarantee University Admission?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>No. No high school diploma guarantees university admission.</p>
                    <p>However, the OSSD:</p>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {[
                      "Strengthens academic applications",
                      "Provides an advantage in international university applications",
                      "Supports university preparation",
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
                      With proper planning, the OSSD can be a meaningful investment
                      in a student&apos;s future. It expands international education
                      opportunities, broadens career options, and supports long-term
                      academic flexibility.
                    </p>
                  </div>
                </div>

                {/* ── Section 8: FAQ ── */}
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
                        href: "/en/how-to-get-canadian-high-school-diploma",
                        label: "How to Get a Canadian High School Diploma",
                        live: true,
                      },
                      {
                        href: "/en/diploma",
                        label: "Canadian High School Diploma Program — Catalyst Education",
                        live: true,
                      },
                      {
                        href: "/en/contact",
                        label: "Contact — Get Information",
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
                      Get expert guidance on the OSSD process.
                    </p>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full h-10 items-center justify-center gap-2 rounded-full bg-trust-500 px-5 text-sm font-medium text-white hover:bg-trust-600 transition-colors"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Get Information
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
                Start Your Canadian Diploma Journey
              </h2>
              <p className="text-warm-700 text-lg leading-relaxed">
                Learn how the OSSD program can benefit your academic future.
                Get in touch to evaluate your eligibility and build a personal
                roadmap.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  Get Information via WhatsApp
                </a>
                <Link
                  href="/en/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white px-8 text-base font-medium text-warm-700 hover:bg-warm-50 transition-colors"
                >
                  Contact Form
                </Link>
              </div>
              <p className="text-sm text-warm-500">
                Ontario-certified program delivered in partnership with TVO ILC
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
