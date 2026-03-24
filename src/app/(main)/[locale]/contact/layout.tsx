import type { Metadata } from "next";

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
    ? "Contact Us — Get Information About OSSD | Catalyst Education"
    : "İletişim — OSSD Hakkında Bilgi Alın | Catalyst Education";
  const description = isEn
    ? "Have questions about the OSSD program? Contact Catalyst Education — Turkey's official TVO ILC representative. We respond within 24 hours."
    : "OSSD programı hakkında sorularınız mı var? Türkiye'nin resmi TVO ILC temsilcisi Catalyst Education ile iletişime geçin. 24 saat içinde yanıt veriyoruz.";
  const url = `${SITE_URL}/${locale}/contact`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/contact`, en: `${SITE_URL}/en/contact` },
    },
    openGraph: {
      title, description, url,
      siteName: "Catalyst Education",
      type: "website",
      locale: isEn ? "en_US" : "tr_TR",
      images: [{ url: "/logo.png", width: 300, height: 200, alt: "Catalyst Education" }],
    },
    twitter: { card: "summary", title, description, images: ["/logo.png"] },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
