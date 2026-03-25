import type { Metadata } from "next";
import { ogImage } from "@/lib/og";

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
    ? "Future Skills Certificates — Ontario Tech | Catalyst Education"
    : "Future Skills Sertifikaları — Ontario Tech | Catalyst Education";
  const description = isEn
    ? "Earn industry-recognized Future Skills certificates from Ontario Tech University and Brilliant Catalyst. 100% online, available from Turkey."
    : "Ontario Tech Üniversitesi ve Brilliant Catalyst iş birliğiyle geliştirilen Future Skills sertifikalarını Türkiye'den %100 online edinin.";
  const url = `${SITE_URL}/${locale}/certificates`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/certificates`, en: `${SITE_URL}/en/certificates` },
    },
    openGraph: {
      title, description, url,
      siteName: "Catalyst Education",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: ogImage(title),
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage(title)[0].url] },
  };
}

export default async function CertificatesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isEn = locale === "en";

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: isEn ? "Future Skills Certificates" : "Future Skills Sertifikaları",
    description: isEn
      ? "Industry-recognized online certificates from Ontario Tech University and Brilliant Catalyst, available from Turkey."
      : "Ontario Tech Üniversitesi ve Brilliant Catalyst iş birliğiyle geliştirilen, Türkiye'den alınabilecek sektör tarafından tanınan online sertifikalar.",
    provider: {
      "@type": "Organization",
      name: "Catalyst Education",
      url: SITE_URL,
    },
    courseMode: "online",
    inLanguage: isEn ? "en" : "tr",
    url: `${SITE_URL}/${locale}/certificates`,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: isEn ? "Home" : "Ana Sayfa", item: `${SITE_URL}/${locale}` },
      { "@type": "ListItem", position: 2, name: isEn ? "Future Skills Certificates" : "Future Skills Sertifikaları", item: `${SITE_URL}/${locale}/certificates` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
