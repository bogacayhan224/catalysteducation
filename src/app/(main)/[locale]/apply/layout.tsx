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
    ? "Apply Now — Enroll in the OSSD Program | Catalyst Education"
    : "Başvuru Formu — OSSD Programına Kayıt | Catalyst Education";
  const description = isEn
    ? "Start your application for the Ontario Secondary School Diploma (OSSD) program. Complete the form and our team will contact you within 24 hours."
    : "Ontario Secondary School Diploma (OSSD) programına başvurun. Formu doldurun, ekibimiz 24 saat içinde sizinle iletişime geçsin.";
  const url = `${SITE_URL}/${locale}/apply`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/apply`, en: `${SITE_URL}/en/apply` },
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

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
