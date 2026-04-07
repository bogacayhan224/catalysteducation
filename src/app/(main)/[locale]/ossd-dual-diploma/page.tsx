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

  if (locale === "tr") {
    return {
      title: "OSSD Çift Diploma | Catalyst Education",
      alternates: { canonical: PAGE_URL_TR },
    };
  }

  const title =
    "What Is the OSSD Dual Diploma? Earning a Canadian High School Diploma While Studying in Turkey";
  const description =
    "Learn how the OSSD dual diploma program lets students in Turkey earn an official Canadian high school diploma without leaving their school. Authorized TVO ILC representative.";

  return {
    title,
    description,
    alternates: {
      canonical: PAGE_URL_EN,
      languages: { en: PAGE_URL_EN, tr: PAGE_URL_TR },
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
    question: "What is the OSSD dual diploma?",
    answer:
      "The OSSD dual diploma is an international education model that allows students to continue at their school in Turkey while simultaneously earning Ontario's official Canadian high school diploma (OSSD). Students graduate with both their Turkish diploma and the OSSD.",
  },
  {
    question: "Can students in Turkey earn a Canadian high school diploma?",
    answer:
      "Yes. Because the program is delivered entirely online, students can earn a Canadian high school diploma without leaving Turkey or leaving their current school.",
  },
  {
    question: "In which countries is the OSSD diploma recognized?",
    answer:
      "The OSSD is an official diploma issued by the Ontario Ministry of Education. It is recognized for university admissions in Canada, the USA, the UK, European Union countries, and over 100 countries worldwide.",
  },
  {
    question: "How long does the Canadian dual diploma program take?",
    answer:
      "Duration varies based on the student's starting grade and credit transfer results. Most students complete the program in 1 to 4 years.",
  },
  {
    question: "What is TVO ILC, and how does it relate to Catalyst Education?",
    answer:
      "TVO ILC is Ontario's largest accredited distance education provider, authorized by the Ontario Ministry of Education. Catalyst Education is TVO ILC's sole authorized administrative representative in Turkey. The OSSD dual diploma program is delivered through Catalyst Education via the TVO ILC platform.",
  },
  {
    question: "How do I apply for the OSSD dual diploma program?",
    answer:
      "The process begins with an academic assessment. The Catalyst Education advisory team reviews the student's current transcript and prepares a personalized education plan.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline:
    "What Is the OSSD Dual Diploma? Earning a Canadian High School Diploma While Studying in Turkey",
  description:
    "Learn how the OSSD dual diploma program lets students in Turkey earn an official Canadian high school diploma without leaving their school.",
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
      text: item.answer,
    },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/en` },
    { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/en/guides` },
    { "@type": "ListItem", position: 3, name: "OSSD Dual Diploma", item: PAGE_URL_EN },
  ],
};

/* ─── TOC ───────────────────────────────────────────────── */

const tocItems = [
  { id: "what-is", label: "What Is the OSSD Dual Diploma?" },
  { id: "how-it-works", label: "How the Program Works" },
  { id: "students-in-turkey", label: "Can Students in Turkey Apply?" },
  { id: "who-can-apply", label: "Who Can Apply?" },
  { id: "duration", label: "How Long Does It Take?" },
  { id: "graduation-requirements", label: "Graduation Requirements" },
  { id: "benefits", label: "What Does It Give Students?" },
  { id: "faq", label: "Frequently Asked Questions" },
];

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function OssdDualDiplomaPage() {
  const locale = await getLocale();
  if (locale === "tr") {
    redirect("/tr/ossd-cift-diploma");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to learn more about the OSSD dual diploma program."
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
                  <span className="text-warm-800 font-medium">OSSD Dual Diploma</span>
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
                What Is the OSSD Dual Diploma?{" "}
                <span className="text-brand-500">Earning a Canadian High School Diploma</span>{" "}
                While Studying in Turkey
              </h1>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-6">
                Is it possible to earn a Canadian high school diploma while continuing at your school in Turkey? Yes — and it&apos;s called the OSSD dual diploma program.
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-warm-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />5 min read
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
                      <GraduationCap className="h-5 w-5 text-trust-500" />
                    </div>
                    <h2 className="font-bold text-warm-800 text-lg leading-snug">
                      Quick Answer: What Is the OSSD Dual Diploma?
                    </h2>
                  </div>
                  <p className="text-warm-700 leading-relaxed mb-5">
                    The <strong>OSSD dual diploma</strong> is an international education model that allows
                    students to complete Ontario&apos;s official high school curriculum in parallel with their
                    existing school enrollment in Turkey — earning an official{" "}
                    <strong>Canadian high school diploma</strong> alongside their Turkish diploma.
                  </p>
                  <div className="grid sm:grid-cols-3 gap-3">
                    {[
                      { icon: Globe, label: "Recognized in 100+ countries" },
                      { icon: Monitor, label: "Fully online" },
                      { icon: GraduationCap, label: "Two official diplomas" },
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

                {/* ── Section 1: What Is the OSSD Dual Diploma? ── */}
                <div id="what-is" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Is the OSSD Dual Diploma?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg">
                    <p>
                      The <strong>OSSD dual diploma</strong> is an international education model
                      that allows students to complete Ontario&apos;s official high school curriculum
                      in parallel with their existing school enrollment in Turkey — earning an
                      official <strong>Canadian high school diploma</strong> alongside their Turkish
                      diploma.
                    </p>
                    <p>
                      &ldquo;Dual diploma&rdquo; means exactly this: the student graduates with two diplomas —
                      a Turkish high school diploma and an OSSD — each valid within its respective
                      education system.
                    </p>
                    <p>In this model, the student:</p>
                    <ul className="space-y-2 ml-4">
                      {[
                        "Continues attending their Turkish school under the national curriculum",
                        "Simultaneously completes Ontario-aligned courses through an accredited online platform",
                        "Receives the official Canadian high school diploma (OSSD) upon meeting all credit and graduation requirements",
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
                      The OSSD is recognized for university admissions in Canada, the USA, the UK,
                      European Union countries, and over 100 nations worldwide.
                    </p>
                  </div>
                  <div className="mt-5 text-sm text-warm-600">
                    <Link
                      href="/en/what-is-ossd"
                      className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                    >
                      Learn more: What is OSSD? →
                    </Link>
                  </div>
                </div>

                {/* ── Section 2: How the Program Works ── */}
                <div id="how-it-works" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Does the Canadian Dual Diploma Program Work?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-8">
                    <p>
                      The <strong>Canadian dual diploma</strong> model is built on the student
                      running two education systems in parallel without disrupting either. The process
                      begins with a personalized academic assessment.
                    </p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {[
                      {
                        step: "1",
                        title: "Academic evaluation",
                        desc: "The student's current transcript and course history are reviewed.",
                      },
                      {
                        step: "2",
                        title: "Credit mapping",
                        desc: "Courses already taken in Turkey are matched to OSSD credit equivalents.",
                      },
                      {
                        step: "3",
                        title: "Gap analysis",
                        desc: "Remaining Ontario courses to be completed are identified.",
                      },
                      {
                        step: "4",
                        title: "Online coursework",
                        desc: "The student completes outstanding credits through the TVO ILC platform.",
                      },
                      {
                        step: "5",
                        title: "Diploma",
                        desc: "Upon meeting all graduation requirements, the official OSSD diploma is issued.",
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
                          <p className="text-sm text-warm-600">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-warm-700 leading-relaxed text-lg">
                    Thanks to credit mapping, many students need fewer additional courses than they
                    initially expect — making the program both time- and cost-efficient.
                  </p>
                  <div className="mt-5 text-sm">
                    <Link
                      href="/en/how-to-get-canadian-high-school-diploma"
                      className="text-brand-500 underline underline-offset-2 hover:text-brand-600"
                    >
                      Full application steps: How to get a Canadian high school diploma →
                    </Link>
                  </div>
                </div>

                {/* ── Section 3: Can Students in Turkey Apply? ── */}
                <div id="students-in-turkey" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Can Students in Turkey Really Earn a Canadian High School Diploma?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Yes. This is the defining feature of the OSSD dual diploma program.
                    </p>
                    <p>
                      The program runs <strong>entirely online</strong>. Students do not need to
                      leave Turkey, change schools, or disrupt their academic routine. Courses are
                      accessible from anywhere with an internet connection and are designed with
                      schedule flexibility in mind.
                    </p>
                    <p>
                      Students can carry both their Turkish school workload and their Ontario
                      coursework within their existing daily routine. This flexibility makes the
                      program practically achievable even for students with demanding academic
                      schedules.
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6">
                    <h3 className="font-bold text-warm-800 mb-4">
                      Key Program Features
                    </h3>
                    <ul className="space-y-2">
                      {[
                        "No need to leave Turkey",
                        "Turkish school enrollment and Turkish diploma are maintained",
                        "Fully online, flexible course schedule",
                        "Accessible from anywhere with an internet connection",
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

                {/* ── Section 4: Who Can Apply? ── */}
                <div id="who-can-apply" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    Who Can Apply for the OSSD Dual Diploma Program?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      The <strong>OSSD dual diploma program</strong> is particularly well-suited for:
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    {[
                      "Middle or high school students aiming to study abroad after graduation",
                      "Students planning to apply to universities in Canada, the USA, the UK, or Europe",
                      "Students looking to build academic English proficiency and an international academic foundation",
                      "Students who want to strengthen their university application with an internationally recognized credential",
                      "Students who wish to earn an additional international diploma without changing their current school",
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
                    Admission is assessed based on the student&apos;s academic background and goals.
                    Each student receives a personalized education plan tailored to their specific
                    situation.
                  </p>
                </div>

                {/* ── Section 5: Duration ── */}
                <div id="duration" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    How Long Does the Program Take?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      The duration of the <strong>OSSD dual diploma</strong> depends on two factors:
                      the grade level at which the student enrolls, and how many credits transfer
                      through the mapping process.
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { grade: "Grade 9", duration: "3–4 years" },
                      { grade: "Grade 10", duration: "2–3 years" },
                      { grade: "Grade 11", duration: "1–2 years" },
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
                    These are average figures. Students with a high number of credit transfers may
                    complete the program faster. The exact timeline is determined after the academic
                    assessment.
                  </p>
                </div>

                {/* ── Section 6: Graduation Requirements ── */}
                <div id="graduation-requirements" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Are the OSSD Graduation Requirements?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      To earn the <strong>Canadian high school diploma (OSSD)</strong>, students must
                      meet the graduation criteria set by the Ontario Ministry of Education:
                    </p>
                  </div>
                  <div className="bg-trust-50 border border-trust-200 rounded-2xl p-6 mb-6">
                    <ul className="space-y-3">
                      {[
                        "Complete 30 credits (18 compulsory + 12 elective)",
                        "Successfully complete the compulsory English course (Grade 12 English)",
                        "Complete 40 hours of community involvement activities",
                        "Pass the Ontario Secondary School Literacy Test (OSSLT) or obtain an exemption",
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
                    Once all requirements are fulfilled, the student receives the official{" "}
                    <strong>Canadian high school diploma</strong> issued by the Ontario Ministry of
                    Education.
                  </p>
                </div>

                {/* ── Section 7: Benefits ── */}
                <div id="benefits" className="scroll-mt-24 mb-14">
                  <h2 className="text-2xl md:text-3xl font-bold text-warm-800 mb-5 pb-3 border-b border-warm-300">
                    What Does the OSSD Dual Diploma Give Students?
                  </h2>
                  <div className="space-y-4 text-warm-700 leading-relaxed text-lg mb-6">
                    <p>
                      Earning a <strong>Canadian dual diploma</strong> gives students more than an
                      additional credential — it builds a measurable academic profile that creates
                      real advantages in university applications and beyond.
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-5">
                    {[
                      {
                        title: "Academic Advantages",
                        items: [
                          "Direct application eligibility to universities in Canada, the USA, the UK, and Europe",
                          "OSSD grades and courses recognized by international admissions offices",
                          "Development of academic English writing and critical thinking skills",
                        ],
                      },
                      {
                        title: "Career Advantages",
                        items: [
                          "An internationally recognized educational background",
                          "Adaptability to multicultural and multilingual academic environments",
                          "Access to global professional networks and opportunities",
                        ],
                      },
                      {
                        title: "Practical Advantages",
                        items: [
                          "No need to leave Turkey",
                          "Turkish school enrollment and Turkish diploma are maintained",
                          "Fully online, flexible course schedule",
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
                    Related Guides
                  </h3>
                  <div className="space-y-3">
                    {[
                      { href: "/en/what-is-ossd", label: "What Is OSSD? — Ontario Secondary School Diploma Guide", live: true },
                      { href: "/en/how-to-get-canadian-high-school-diploma", label: "How to Get a Canadian High School Diploma", live: true },
                      { href: "/en/ossd-benefits", label: "OSSD Benefits — Why Students Choose a Canadian Diploma", live: true },
                      { href: "/en/what-is-tvo-and-tvo-ilc", label: "What Is TVO and TVO ILC? — OSSD & Canadian Dual Diploma Guide", live: true },
                      { href: "/en/diploma", label: "Canadian High School Diploma Program — Catalyst Education", live: true },
                      { href: "/en/contact", label: "Contact Us — Get Guidance", live: true },
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
                Get a Free Consultation About the OSSD Dual Diploma
              </h2>
              <p className="text-warm-700 leading-relaxed">
                Find out which grade your child can start from, how many credits are required,
                and what the estimated completion timeline looks like. Get in touch with the
                Catalyst Education team.
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
