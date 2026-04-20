import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Montserrat, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { AnnouncementBar } from "@/components/ui/AnnouncementBar";
import { GTMAnalytics } from "@/components/analytics/GTMAnalytics";
import { ConsentProvider } from "@/contexts/ConsentContext";
import { ConsentAwareScripts } from "@/components/consent/ConsentAwareScripts";
import { ConsentUI } from "@/components/consent/ConsentUI";
import type { Metadata } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    metadataBase: new URL(SITE_URL),
    icons: { icon: "/minilogo.png", apple: "/minilogo.png" },
    // Individual pages override title, description, alternates, openGraph, twitter.
    // This export exists solely to set metadataBase and icons as a shared fallback.
    title: locale === "en"
      ? "Catalyst Education | Canadian High School Diploma in Turkey"
      : "Catalyst Education | Ontario Lise Diploması (OSSD) Türkiye",
    description: locale === "en"
      ? "Earn an Ontario Secondary School Diploma (OSSD) from Turkey. Official TVO ILC support, 100% online."
      : "Türkiye'den Ontario Secondary School Diploma (OSSD) alın. TVO ILC yetkili temsilcisi, %100 online.",
    openGraph: {
      images: [
        {
          url: `${SITE_URL}/og/kanada-lise-diplomasi.jpg`,
          width: 1200,
          height: 633,
          alt: "Catalyst Education — Kanada Lise Diploması (OSSD)",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [`${SITE_URL}/og/kanada-lise-diplomasi.jpg`],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ConsentProvider>
          {/* Scripts load only after analytics consent is confirmed */}
          <ConsentAwareScripts />
          <NextIntlClientProvider messages={messages}>
            <GTMAnalytics />
            <AnnouncementBar />
            <Navbar />
            {children}
            <Footer />
            <WhatsAppFloat />
            {/* Cookie banner + preferences modal */}
            <ConsentUI />
          </NextIntlClientProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
