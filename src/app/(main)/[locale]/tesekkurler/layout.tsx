import type { Metadata } from "next";
import { ogImage } from "@/lib/og";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Başvurunuz Alındı | Catalyst Education";
  const description =
    "Bilgi talebiniz başarıyla alındı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.";
  const url = `${SITE_URL}/tr/tesekkurler`;

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

export default function TesekkurlerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
