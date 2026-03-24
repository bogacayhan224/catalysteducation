import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { Hero } from "@/components/sections/Hero";
import { TrustSection } from "@/components/sections/TrustSection";
import { ValueProp } from "@/components/sections/ValueProp";
import { Process } from "@/components/sections/Process";
import { AudiencePathways } from "@/components/sections/AudiencePathways";
import { CertificatesIntro } from "@/components/sections/CertificatesIntro";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";
  const title = isEn
    ? "Canadian High School Diploma in Turkey | Catalyst Education"
    : "Ontario Lise Diploması (OSSD) Türkiye | Catalyst Education";
  const description = isEn
    ? "Earn an Ontario Secondary School Diploma (OSSD) from Turkey with official TVO ILC support. 100% online, government-recognized Canadian diploma."
    : "Türkiye'den %100 online Ontario Secondary School Diploma (OSSD) alın. TVO ILC'nin Türkiye yetkili temsilcisi. Kanada hükümeti onaylı lise diploması.";
  const url = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr`, en: `${SITE_URL}/en` },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Catalyst Education",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: ogImage(title),
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage(title)[0].url] },
  };
}

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Catalyst Education",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "TVO ILC yetkili temsilcisi olarak Türkiye'den Ontario lise diploması (OSSD) imkânı sunan eğitim kurumu.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: ["Turkish", "English"],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <main className="flex-1">
        {/* 1. Hero — OSSD diploma, primary offer, lead form */}
        <Hero />

        {/* 2. Trust — TVO ILC authorization & credibility */}
        <TrustSection />

        {/* 3. Value Props — diploma benefits */}
        <ValueProp />

        {/* 4. Process — how the diploma pathway works */}
        <Process />

        {/* 5. Student Outcomes / Testimonials — CMS-driven, fallback if empty */}
        <TestimonialsSection />

        {/* 6. Audience Pathways — 2-card segment selector */}
        <AudiencePathways />

        {/* 6. Certificates Intro — Ontario Tech / Brilliant Catalyst programs */}
        <CertificatesIntro />
      </main>
    </div>
  );
}
