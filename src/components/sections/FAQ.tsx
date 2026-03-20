import { getTranslations, getLocale } from "next-intl/server";
import { getFaqsByLocale } from "@/sanity/lib/queries";
import { FAQAccordion } from "./FAQAccordion";

export async function FAQ() {
  const t = await getTranslations("faq");
  const locale = await getLocale();

  // Fetch Sanity FAQs for current locale; fall back to translation items if empty
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

  return (
    <section id="faqs" className="w-full py-16 md:py-24 bg-warm-200 border-t border-warm-300">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="flex flex-col items-center justify-center text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-warm-800">
            {t("title")}
          </h2>
          <p className="max-w-[600px] text-lg text-warm-700 leading-relaxed">
            {t("subtitle")}
          </p>
        </div>

        <FAQAccordion items={items} />

        <div className="mt-14 text-center bg-white p-8 rounded-3xl border border-warm-300 shadow-[0_2px_12px_rgba(31,29,26,0.05)]">
          <h3 className="text-xl font-bold text-warm-800 mb-2">{t("stillHaveQuestions")}</h3>
          <p className="text-warm-700 mb-6 max-w-lg mx-auto">{t("contactPrompt")}</p>
          <a href={`/${locale}/contact`} className="inline-flex h-12 items-center justify-center rounded-full bg-brand-500 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600">
            {t("contactButton")}
          </a>
        </div>
      </div>
    </section>
  );
}
