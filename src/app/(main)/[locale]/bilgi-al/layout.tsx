import type { Metadata } from "next";
import { ogImage } from "@/lib/og";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Kanada Lise Diploması Hakkında Bilgi Al | Catalyst Education";
  const description =
    "Kanada Lise Diploması ve çift diploma programı hakkında bilgi almak için formu doldurun. Ekibimiz sizinle en kısa sürede iletişime geçsin.";
  const url = `${SITE_URL}/tr/bilgi-al`;

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Catalyst Education",
      type: "website",
      locale: "tr_TR",
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

export default function BilgiAlLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
