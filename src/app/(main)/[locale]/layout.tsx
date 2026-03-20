import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Montserrat, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live";
import type { Metadata } from "next";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Catalyst Education | Canadian High School Diploma in Türkiye",
  description:
    "A structured pathway to obtain a Canadian Ontario Secondary School Diploma (OSSD) remotely, with local guidance.",
};

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
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          <SanityLive />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
