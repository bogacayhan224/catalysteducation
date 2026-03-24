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

export default function CertificatesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
