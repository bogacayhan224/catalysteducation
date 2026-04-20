import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
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

const PAGE_URL_EN = `${SITE_URL}/en/canadian-high-school-diploma`;
const PAGE_URL_TR = `${SITE_URL}/tr/kanada-lise-diplomasi`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (locale === "tr") {
    return {
      title: "Kanada Lise Diploması (OSSD) Türkiye'den Online Al | Catalyst Education",
      alternates: { canonical: PAGE_URL_TR },
    };
  }

  const title =
    "Canadian High School Diploma (OSSD) Online from Turkey | Catalyst Education";
  const description =
    "Earn a Canadian High School Diploma (OSSD) while continuing your education in Turkey. Study online and graduate with an official Canadian diploma through TVO ILC.";

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

/* ─── FAQ DATA ──────────────────────────────────────────── */

const faqItems = [
  {
    question: "What is the Canadian High School Diploma (OSSD)?",
    answer:
      "The Ontario Secondary School Diploma (OSSD) is the official high school diploma issued by the Ontario Ministry of Education in Canada. It is internationally recognized and accepted by universities in Canada, the US, UK, Europe, and beyond.",
  },
  {
    question: "Can students in Turkey earn a Canadian diploma without leaving?",
    answer:
      "Yes. The program is delivered entirely online through TVO ILC's platform. Students continue attending their current school in Turkey while completing the Canadian curriculum in parallel — no relocation required.",
  },
  {
    question: "What is Catalyst Education's role in the OSSD program?",
    answer:
      "Catalyst Education is the authorized administrative representative of TVO ILC in Turkey. We handle enrollment, transcript evaluation, course planning, and ongoing support. The diploma is issued by TVO ILC — we manage the entire process on your behalf.",
  },
  {
    question: "How long does the program take to complete?",
    answer:
      "The duration depends on the student's current grade level. Grade 9 students typically need 2–4 years, while Grade 11–12 students may complete the program in 1–2 years. Previously completed coursework may be recognized as credits, shortening the total timeline.",
  },
  {
    question: "Is the OSSD recognized for university applications?",
    answer:
      "Yes. The OSSD is widely accepted by universities in Canada, the United States, the United Kingdom, Europe, Australia, and many other countries. It is a strong credential for international university applications.",
  },
  {
    question: "What is the cost of the program?",
    answer:
      "The program cost is 15,000 CAD. This covers all courses, academic evaluation, and the diploma process. A detailed payment plan is shared during the enrollment process. Book a free initial consultation to learn more.",
  },
];

/* ─── JSON-LD SCHEMAS ───────────────────────────────────── */

const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Canadian High School Diploma (Ontario Secondary School Diploma — OSSD)",
  description:
    "Earn an internationally recognized Canadian high school diploma fully online from Turkey. Official TVO ILC authorized program managed by Catalyst Education.",
  provider: {
    "@type": "Organization",
    name: "Catalyst Education",
    url: SITE_URL,
  },
  educationalCredentialAwarded: "Ontario Secondary School Diploma (OSSD)",
  courseMode: "online",
  inLanguage: "en",
  url: PAGE_URL_EN,
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
    "Authorized administrative representative of TVO ILC in Turkey. Supporting students from enrollment through graduation for the Canadian High School Diploma (OSSD).",
  url: SITE_URL,
  areaServed: "TR",
  knowsAbout: ["Ontario Secondary School Diploma", "OSSD", "Canadian High School Diploma"],
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
    {
      "@type": "ListItem",
      position: 2,
      name: "Canadian High School Diploma (OSSD)",
      item: PAGE_URL_EN,
    },
  ],
};

/* ─── PAGE ──────────────────────────────────────────────── */

export default async function CanadianHighSchoolDiplomaPage() {
  const locale = await getLocale();
  if (locale === "tr") {
    redirect("/tr/kanada-lise-diplomasi");
  }

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "905334702735";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hello, I would like to get information about the Canadian High School Diploma (OSSD) program."
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
                  <Link href="/en" className="hover:text-warm-700 transition-colors">
                    Home
                  </Link>
                </li>
                <li><ChevronRight className="h-3.5 w-3.5" /></li>
                <li aria-current="page">
                  <span className="text-warm-800 font-medium">Canadian High School Diploma</span>
                </li>
              </ol>
            </nav>

            <div className="grid lg:grid-cols-[3fr_2fr] gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <div className="flex flex-col gap-7">
                <div className="inline-flex items-center self-start gap-2.5 rounded-full border border-warm-300 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
                  <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={52} height={23} className="flex-shrink-0" />
                  <span className="h-3 w-px bg-warm-400 flex-shrink-0" />
                  <span className="text-xs text-warm-600">TVO ILC Authorized Representative in Türkiye</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15] text-warm-800">
                  Canadian High School Diploma
                  <br />
                  <span className="text-brand-500">Study Online from Turkey</span>
                </h1>

                <p className="text-lg md:text-xl text-warm-700 leading-relaxed max-w-lg">
                  Earn the <strong>Ontario Secondary School Diploma (OSSD)</strong> while continuing
                  your education in Turkey — fully online, officially through TVO ILC,
                  without relocating or changing schools.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  <Link
                    href="/en/apply"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    Apply Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-300 bg-white/70 px-7 text-base font-medium text-warm-800 hover:bg-white transition-colors shadow-sm"
                  >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp Quick Info
                  </a>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-3 pt-4 border-t border-warm-300">
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <ShieldCheck className="h-4 w-4 text-trust-500" />
                    <span>Official Ontario Education Diploma</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <Globe className="h-4 w-4 text-trust-500" />
                    <span>Recognized Worldwide</span>
                  </div>
                  <div className="flex items-center gap-2 text-base text-warm-700">
                    <Monitor className="h-4 w-4 text-trust-500" />
                    <span>100% Online & Flexible</span>
                  </div>
                </div>
              </div>

              {/* Right: Form */}
              <div className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto">
                <LeadForm />
              </div>
            </div>
          </div>
        </section>

        {/* ── WHAT IS THE OSSD ── */}
        <section id="what-is-ossd" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-6">
                  What Is the Canadian High School Diploma (OSSD)?
                </h2>
                <div className="space-y-5 text-warm-700 leading-relaxed text-lg">
                  <p>
                    The Ontario Secondary School Diploma (OSSD) is the official high school
                    diploma issued by the Ontario Ministry of Education in Canada. It is an
                    internationally recognized academic credential accepted by universities
                    around the world.
                  </p>
                  <p>
                    The OSSD demonstrates that a student has successfully completed the Ontario
                    high school curriculum to Canadian academic standards. It is the same
                    diploma earned by students studying in Ontario, Canada.
                  </p>
                  <p className="font-medium text-warm-800 border-l-4 border-trust-400 pl-4">
                    Catalyst Education is the authorized administrative representative of TVO ILC
                    in Turkey. The diploma is issued by TVO ILC — Catalyst manages the entire
                    process from enrollment through to graduation.
                  </p>
                </div>
                <Link
                  href="/en/what-is-ossd"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  Read the complete OSSD guide →
                </Link>
              </div>

              {/* Requirements card */}
              <div className="bg-warm-100 border border-warm-300 rounded-3xl p-8 space-y-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold text-warm-800 text-lg">OSSD Requirements</h3>
                </div>
                {[
                  { label: "Diploma", value: "Ontario Secondary School Diploma (OSSD)" },
                  { label: "Issuing Body", value: "TVO ILC — Ontario Ministry of Education" },
                  { label: "Required Credits", value: "Minimum 30 credits", sub: "Compulsory and elective courses" },
                  { label: "Literacy Requirement", value: "Ontario Secondary School Literacy Test (OSSLT)" },
                  { label: "Community Involvement", value: "40 hours of community activity", highlight: true },
                  { label: "Delivery Mode", value: "100% Online" },
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

        {/* ── WHO CAN APPLY ── */}
        <section id="who-can-apply" className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">
                Who Can Apply for the Canadian High School Diploma?
              </h2>
              <p className="text-warm-700 text-lg max-w-2xl mx-auto">
                The program is personalized based on the student&apos;s current academic background.
                Students at different grade levels can enroll.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "High School Students (Grades 9–12)",
                  desc: "Students can continue their current school in Turkey while earning a Canadian diploma in parallel. Two high school diplomas — one educational journey.",
                  icon: GraduationCap,
                },
                {
                  title: "Students Planning to Study Abroad",
                  desc: "The OSSD opens doors to universities in Canada, the US, UK, Europe, and beyond. It is a strong credential for international university applications.",
                  icon: Globe,
                },
                {
                  title: "High School Graduates",
                  desc: "Students who have already completed their Turkish high school but want to gain an internationally recognized diploma can also enroll in the program.",
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

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">
                How to Get a Canadian High School Diploma
              </h2>
              <p className="text-warm-700 text-lg max-w-2xl mx-auto">
                A structured and transparent process — from your first consultation through to graduation.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Initial Application",
                  desc: "Student academic information and current school status are reviewed. The first consultation is free and without obligation.",
                },
                {
                  step: "2",
                  title: "Transcript Evaluation",
                  desc: "Previous academic records are analyzed. The number of credits to be granted, the courses required, and the graduation plan are mapped out.",
                },
                {
                  step: "3",
                  title: "Personalized Course Plan",
                  desc: "A customized academic plan is prepared for the student — fully tailored to their existing grade level and academic history.",
                },
                {
                  step: "4",
                  title: "Enrollment & Program Start",
                  desc: "Official enrollment is completed through TVO ILC. The course schedule is confirmed and the academic journey begins.",
                },
                {
                  step: "5",
                  title: "Online Learning",
                  desc: "All courses are delivered online through TVO ILC's Brightspace platform. Students can continue their Turkish school at the same time.",
                },
                {
                  step: "6",
                  title: "Graduation",
                  desc: "Once all required credits are completed, the student receives the Ontario Secondary School Diploma (OSSD) from TVO ILC.",
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
                href="/en/how-to-get-canadian-high-school-diploma"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                See the complete step-by-step process →
              </Link>
            </div>
          </div>
        </section>

        {/* ── RECOGNITION & BENEFITS ── */}
        <section id="recognition" className="w-full py-20 md:py-28 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-4">
                  Benefits of the Canadian High School Diploma
                </h2>
                <p className="text-warm-700 leading-relaxed text-lg mb-8">
                  The OSSD provides students with concrete advantages for their academic and career journey.
                  It is recognized by universities worldwide and opens doors that a local diploma alone cannot.
                </p>
                <ul className="space-y-3">
                  {[
                    "Apply to universities in Canada, the US, UK, Europe, and beyond",
                    "Earn a dual diploma without leaving your current school in Turkey",
                    "Fully online and flexible — study on your own schedule",
                    "Academic English development — all courses taught in English",
                    "Project-based learning focused on critical thinking and research skills",
                    "Official Ontario diploma issued through TVO ILC, backed by the Ontario Ministry of Education",
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
                  href="/en/ossd-benefits"
                  className="inline-flex items-center gap-2 mt-7 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors group"
                >
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  Explore all OSSD benefits →
                </Link>
              </div>

              {/* Recognition card */}
              <div className="rounded-3xl border border-trust-200 bg-trust-50 p-8 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-trust-100 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-trust-500" />
                  </div>
                  <h3 className="font-bold text-warm-800">International Recognition</h3>
                </div>
                <p className="text-warm-700 text-sm leading-relaxed">
                  The OSSD is an official academic credential accepted for university
                  applications in many countries, including:
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { flag: "🇨🇦", label: "Canada" },
                    { flag: "🇺🇸", label: "United States" },
                    { flag: "🇬🇧", label: "United Kingdom" },
                    { flag: "🇪🇺", label: "Europe" },
                    { flag: "🇦🇺", label: "Australia" },
                    { flag: "🌍", label: "Many other countries" },
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

        {/* ── TUITION & PROCESS ── */}
        <section id="tuition" className="w-full py-20 md:py-28 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-6">
                  Program Duration and Tuition
                </h2>
                <p className="text-warm-700 text-lg leading-relaxed mb-8">
                  Duration and cost are personalized based on the student&apos;s current academic level.
                  Each student receives an individual assessment before enrollment.
                </p>
                <div className="space-y-4">
                  <h3 className="font-bold text-warm-800 mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-brand-500" />
                    Estimated Program Duration
                  </h3>
                  <div className="overflow-x-auto rounded-2xl border border-warm-300">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-warm-100 border-b border-warm-300">
                          <th className="text-left px-6 py-4 font-bold text-warm-800">Student Level</th>
                          <th className="text-left px-6 py-4 font-bold text-warm-800">Typical Duration</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-warm-200">
                        {[
                          { level: "Grade 9", duration: "2–4 years" },
                          { level: "Grade 10", duration: "1.5–3 years" },
                          { level: "Grade 11", duration: "1–2 years" },
                          { level: "Grade 12 / Graduate", duration: "6–18 months" },
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
                    Previously completed coursework may be recognized as credits, which can significantly reduce the total duration.
                  </p>
                </div>
              </div>

              <div className="bg-warm-100 border border-warm-300 rounded-3xl p-8 flex flex-col gap-6">
                <h3 className="font-bold text-warm-800 text-lg">Program Fee</h3>
                <div className="text-center py-6 border border-warm-300 rounded-2xl bg-white">
                  <p className="text-4xl font-bold text-warm-800">15,000 CAD</p>
                  <p className="text-warm-500 text-sm mt-2">Approximate total program cost</p>
                </div>
                <div className="space-y-3">
                  <p className="font-semibold text-warm-800 text-sm">This fee covers:</p>
                  {[
                    "All courses through TVO ILC",
                    "Academic evaluation and credit recognition",
                    "Diploma process and graduation support",
                    "Catalyst Education advisory services",
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
                  A detailed payment plan is shared during the enrollment process. Book a free initial consultation to get started.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-500 px-7 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Get Free Consultation
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
                  Let&apos;s Plan Your Student&apos;s Pathway Together
                </h2>
                <p className="text-warm-400 text-base max-w-xl">
                  In a free initial consultation, our expert team evaluates the student&apos;s
                  grade level, credit situation, and graduation plan.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/en/apply"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-sm font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-600 bg-warm-700/50 px-7 text-sm font-medium text-white hover:bg-warm-700 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="w-full py-20 md:py-28 bg-warm-200 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <div className="mb-12 space-y-3">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-warm-800">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-warm-700 leading-relaxed">
                Honest answers to the most common questions about the Canadian High School Diploma.
              </p>
            </div>

            <SimpleFAQAccordion items={faqItems} />

            <div className="mt-14 text-center bg-white p-8 rounded-3xl border border-warm-300 shadow-[0_2px_12px_rgba(31,29,26,0.05)]">
              <h3 className="text-xl font-bold text-warm-800 mb-2">Still have questions?</h3>
              <p className="text-warm-700 mb-6 max-w-lg mx-auto">
                Our team is ready to evaluate your student&apos;s specific situation and walk you
                through every step of the process.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/en/faq"
                  className="inline-flex h-11 items-center justify-center rounded-full border border-warm-300 bg-warm-100 px-7 text-sm font-medium text-warm-800 hover:bg-warm-200 transition-colors"
                >
                  View All FAQs
                </Link>
                <Link
                  href="/en/contact"
                  className="inline-flex h-11 items-center justify-center rounded-full bg-brand-500 px-7 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
                >
                  Get Information Now
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED PAGES ── */}
        <section className="w-full py-12 bg-white border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <h3 className="font-bold text-warm-800 mb-6 flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-brand-500" />
              Continue Reading
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { href: "/en/diploma", label: "Diploma Program", desc: "Everything about the OSSD program" },
                { href: "/en/ossd-benefits", label: "OSSD Benefits", desc: "Why choose a Canadian diploma?" },
                { href: "/en/ossd-dual-diploma", label: "Dual Diploma", desc: "Two high school diplomas at once" },
                { href: "/en/faq", label: "FAQs", desc: "All questions and answers" },
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
                  Start Your Canadian Diploma Journey Today
                </h2>
                <p className="text-warm-700 text-lg leading-relaxed">
                  Request a free initial consultation. Our advisors will explain the program
                  step by step and evaluate your student&apos;s situation together with you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/en/apply"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-base font-semibold text-white hover:bg-brand-600 transition-colors shadow-sm"
                  >
                    Fill in the Application Form
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-warm-400 bg-warm-200 px-7 text-sm font-medium text-warm-800 hover:bg-warm-300 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Connect on WhatsApp
                  </a>
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <Image src="/tvo-ilc-logo.svg" alt="TVO ILC" width={60} height={28} className="opacity-70" />
                  <span className="text-xs text-warm-500">Authorized Administrative Representative of TVO ILC</span>
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
