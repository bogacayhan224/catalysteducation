import type { Metadata } from "next";
import { ogImage } from "@/lib/og";
import { getTranslations, getLocale } from "next-intl/server";
import { HelpCircle } from "lucide-react";
import { getFaqsByLocale } from "@/sanity/lib/queries";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

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
    ? "FAQ — OSSD Program Questions Answered | Catalyst Education"
    : "Sık Sorulan Sorular — OSSD ve Program Süreci | Catalyst Education";
  const description = isEn
    ? "Find answers to the most common questions about the Ontario Secondary School Diploma (OSSD), enrollment, duration, recognition, and costs."
    : "OSSD programı hakkında en çok sorulan soruların cevapları: kayıt süreci, program süresi, MEB denkliği, maliyetler ve daha fazlası.";
  const url = `${SITE_URL}/${locale}/faq`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { tr: `${SITE_URL}/tr/faq`, en: `${SITE_URL}/en/faq` },
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

export default async function FAQPage() {
  const t = await getTranslations("faq");
  const locale = await getLocale();

  const sanityFaqs = await getFaqsByLocale(locale);
  const items =
    sanityFaqs.length > 0
      ? sanityFaqs.map((f) => ({ question: f.question, answer: f.answer }))
      : (t.raw("items") as { question: string; answer: string }[]).map((item, i) => ({
          question: item.question,
          answer: [
            {
              _type: "block" as const,
              _key: `fallback-${i}`,
              style: "normal" as const,
              markDefs: [],
              children: [{ _type: "span", _key: `span-${i}`, text: item.answer, marks: [] }],
            },
          ],
        }));

  // Plain-text pairs for FAQPage JSON-LD schema
  const faqPlainItems =
    sanityFaqs.length > 0
      ? sanityFaqs.map((f) => ({
          question: f.question,
          answer: (f.answer as Array<{ children?: Array<{ text?: string }> }>)
            .flatMap((b) => b.children ?? [])
            .map((s) => s.text ?? "")
            .join(" "),
        }))
      : (t.raw("items") as { question: string; answer: string }[]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPlainItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex-1">

        {/* Hero */}
        <section
          className="relative overflow-hidden text-white py-16 lg:py-24 text-center"
          style={{ background: "linear-gradient(135deg, #5A0F1A 0%, #8B1E2D 60%, #B33A4A 100%)" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#3D0D14_1px,transparent_1px),linear-gradient(to_bottom,#3D0D14_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
          <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-white/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[360px] h-[360px] bg-white/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4 pointer-events-none" />

          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs text-white/75 mb-5 backdrop-blur-sm">
              <HelpCircle className="h-3.5 w-3.5 flex-shrink-0" />
              {t("title")}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-[1.1]">
              {t("title")}
            </h1>
            <p className="max-w-[560px] mx-auto text-white/75 text-base md:text-lg leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="w-full py-16 md:py-24 bg-warm-200">
          <div className="container mx-auto px-4 md:px-6 max-w-3xl">
            <FAQAccordion items={items} />

            <div className="mt-14 text-center bg-white p-8 rounded-3xl border border-warm-300 shadow-[0_2px_12px_rgba(31,29,26,0.05)]">
              <h3 className="text-xl font-bold text-warm-800 mb-2">{t("stillHaveQuestions")}</h3>
              <p className="text-warm-700 mb-6 max-w-lg mx-auto">{t("contactPrompt")}</p>
              <a
                href={`/${locale}/contact`}
                className="inline-flex h-12 items-center justify-center rounded-full bg-brand-500 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
              >
                {t("contactButton")}
              </a>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
