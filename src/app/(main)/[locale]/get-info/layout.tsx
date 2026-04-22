import type { Metadata } from "next";
import { ogImage } from "@/lib/og";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Get Information About the Canadian High School Diploma | Catalyst Education";
  const description =
    "Fill in the form to receive information about the Canadian High School Diploma programme. Our team will get in touch with you as soon as possible.";
  const url = `${SITE_URL}/en/get-info`;

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

export default function GetInfoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
