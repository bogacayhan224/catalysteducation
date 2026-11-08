import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, ChevronRight, Clock } from "lucide-react";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";
import { TurkishGuideCard } from "@/components/ui/TurkishGuideCard";
import { TurkishGuideCTA } from "@/components/sections/TurkishGuideCTA";
import { financialLiteracyGuide as turkishGuide, turkishGuides } from "@/lib/turkish-guides";
import { financialLiteracyGuide as englishGuide, englishGuides } from "@/lib/english-guides";
import { financialLiteracyPaths } from "@/lib/financial-literacy-paths";
import * as tr from "./content-tr";
import * as en from "./content-en";
import { references } from "./references";

type Locale = keyof typeof financialLiteracyPaths;

const siteUrl = "https://www.catalysteducation.ca";
const languages = {
  tr: siteUrl + financialLiteracyPaths.tr,
  en: siteUrl + financialLiteracyPaths.en,
};
const copy = {
  tr: {
    ...tr,
    guide: turkishGuide,
    title: "Kanada'da Finansal Okuryazarlık Eğitimi | OSSD & TVO",
    headline: "Kanada'da Lisede Finansal Okuryazarlık: OSSD'nin 2026–2027 Yeniliği",
    description: "Kanada'da finansal okuryazarlık OSSD mezuniyet şartı oldu. TVO'nun geliştirdiği modülleri, 10. sınıf uygulamasını ve öğrencilere katkılarını keşfedin.",
    imageAlt: "Bütçe grafiği açık bir dizüstü bilgisayar, planlama defteri ve madeni paralar",
    home: "Ana Sayfa",
    guides: "Rehberler",
    guidesPath: "/tr/rehberler",
    breadcrumb: "Finansal Okuryazarlık Eğitimi",
    breadcrumbLabel: "Sayfa yolu",
    contents: "İçindekiler",
    highlights: "Öne çıkan bilgiler",
    facts: [
      { value: "2026–2027", label: "Yeni OSSD mezuniyet gerekliliği" },
      { value: "%70", label: "Gerekliliği tamamlamak için başarı eşiği" },
      { value: "TVO", label: "Öğrenme ve değerlendirme modüllerini geliştiren kurum" },
    ],
    studentSection: "turkiyedeki-ogrenciler",
    faq: { id: "sss", title: "Sık Sorulan Sorular" },
    sources: { id: "resmi-kaynaklar", title: "Resmi Kaynaklar" },
    related: "İlgili Rehberler",
    relatedGuides: ["/tr/ossd-nedir", "/tr/tvo-ve-tvo-ilc-nedir", "/tr/kanada-lise-diplomasi-nasil-alinir"]
      .flatMap((path) => turkishGuides.filter(({ href }) => href === path)),
    cta: {
      title: "Kanada Lise Diploması Yolculuğunuzu Planlayın",
      description: "Ontario Lise Diploması programı, akademik yerleştirme ve öğrencinize özel eğitim planı hakkında bilgi almak için Catalyst Education ekibiyle iletişime geçin.",
      whatsappLabel: "WhatsApp ile Bilgi Al",
    },
  },
  en: {
    ...en,
    guide: englishGuide,
    title: "Financial Literacy in Ontario High Schools | OSSD & TVO",
    headline: "Financial Literacy in Ontario High Schools: The 2026–2027 OSSD Requirement",
    description: "Learn who must meet Ontario’s new OSSD financial literacy requirement, how it works in Grade 10 Career Studies and what it means for TVO ILC students in Türkiye.",
    imageAlt: "A laptop displaying a budget chart beside a planning notebook and coins",
    home: "Home",
    guides: "Guides",
    guidesPath: "/en/guides",
    breadcrumb: "Financial Literacy in Ontario",
    breadcrumbLabel: "Breadcrumb",
    contents: "Contents",
    highlights: "Key facts",
    facts: [
      { value: "2026–2027", label: "New OSSD graduation requirement" },
      { value: "70%", label: "Minimum score to meet the requirement" },
      { value: "TVO", label: "Developer of the learning modules and assessment questions" },
    ],
    studentSection: "students-in-turkiye",
    faq: { id: "faq", title: "Frequently Asked Questions" },
    sources: { id: "official-sources", title: "Official Sources" },
    related: "Related Guides",
    relatedGuides: ["/en/what-is-ossd", "/en/what-is-tvo-and-tvo-ilc", "/en/how-to-get-canadian-high-school-diploma"]
      .flatMap((path) => englishGuides.filter(({ href }) => href === path)),
    cta: {
      title: "Plan Your Path to a Canadian High School Diploma",
      description: "Contact Catalyst Education to learn about the Ontario Secondary School Diploma program, academic placement and a study plan tailored to your student.",
      whatsappLabel: "Ask Us on WhatsApp",
    },
  },
};

const author = "Catalyst Education";
const image = {
  path: "/og/finansal-okuryazarlik.webp",
  width: 1200,
  height: 630,
};

export function financialLiteracyMetadata(locale: Locale): Metadata {
  const { title, description, guide, imageAlt } = copy[locale];
  const pageUrl = languages[locale];
  return {
    title,
    description,
    authors: [{ name: author }],
    alternates: { canonical: pageUrl, languages },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: author,
      type: "article",
      locale: locale === "tr" ? "tr_TR" : "en_CA",
      alternateLocale: [locale === "tr" ? "en_CA" : "tr_TR"],
      publishedTime: guide.datePublished,
      images: [{ url: siteUrl + image.path, width: image.width, height: image.height, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title, description, images: [siteUrl + image.path] },
  };
}

const organization = { "@type": "Organization", name: author, url: siteUrl };
const headingClass = "mb-5 border-b border-warm-300 pb-3 text-2xl font-bold text-warm-800 md:text-3xl";
const linkClass = "font-semibold text-brand-500 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-500";
const anchorClass = "scroll-mt-36";

function TableOfContents({ label, items }: { label: string; items: { id: string; title: string }[] }) {
  return (
    <nav aria-label={label} className="rounded-2xl border border-warm-300 bg-warm-100 p-6">
      <p className="mb-4 flex items-center gap-2 font-bold text-warm-800">
        <BookOpen aria-hidden="true" className="h-4 w-4 text-brand-500" /> {label}
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-warm-700">
        {items.map(({ id, title }) => (
          <li key={id}>
            <a href={`#${id}`} className="block py-0.5 hover:text-brand-500 hover:underline">{title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function FinancialLiteracyArticle({ locale }: { locale: Locale }) {
  const article = copy[locale];
  const { guide, headline, description, introduction, faqItems, facts, relatedGuides } = article;
  const pageUrl = languages[locale];
  const [summary, ...body] = article.sections;
  const tocItems = [...article.sections, article.faq, article.sources];
  const breadcrumbs = [
    { name: article.home, href: `/${locale}` },
    { name: article.guides, href: article.guidesPath },
    { name: article.breadcrumb, href: guide.href },
  ];
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline,
        description,
        image: siteUrl + image.path,
        datePublished: guide.datePublished,
        author: organization,
        publisher: { ...organization, logo: { "@type": "ImageObject", url: siteUrl + "/logo.png" } },
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        inLanguage: locale === "tr" ? "tr-TR" : "en-CA",
        articleSection: guide.tag,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map(({ name, href }, index) => ({
          "@type": "ListItem", position: index + 1, name, item: siteUrl + href,
        })),
      },
    ],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <article>
        <header className="border-b border-warm-300 bg-warm-200 py-12 md:py-16">
          <div className="container mx-auto max-w-[1280px] px-4 md:px-6">
            <nav aria-label={article.breadcrumbLabel} className="mb-6">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-warm-700">
                {breadcrumbs.map(({ href, name }, index) => (
                  <li key={href} className="flex items-center gap-2" aria-current={index === 2 ? "page" : undefined}>
                    {index > 0 && <ChevronRight aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />}
                    {index === 2 ? <span className="font-medium text-warm-800">{name}</span> : <Link className="hover:underline" href={href}>{name}</Link>}
                  </li>
                ))}
              </ol>
            </nav>
            <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-1.5 text-xs font-semibold text-brand-500">
                  <BookOpen aria-hidden="true" className="h-4 w-4" /> {guide.tag}
                </span>
                <h1 className="mb-5 text-3xl leading-tight font-bold tracking-tight text-warm-800 md:text-4xl xl:text-5xl">{headline}</h1>
                <p className="text-base leading-relaxed text-warm-700 md:text-lg">{introduction[0]}</p>
                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-warm-700">
                  <span className="inline-flex items-center gap-1.5"><Clock aria-hidden="true" className="h-4 w-4" /> {guide.readTime}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={guide.datePublished}>{guide.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{author}</span>
                </div>
              </div>
              <Image
                src={image.path}
                width={image.width}
                height={image.height}
                alt={article.imageAlt}
                sizes="(min-width: 1280px) 592px, (min-width: 1024px) 48vw, 100vw"
                preload
                className="h-auto w-full rounded-3xl border border-warm-300"
              />
            </div>
          </div>
        </header>

        <div className="container mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">
            <div className="mb-8 space-y-4 text-base leading-relaxed text-warm-700 md:text-lg">
              {introduction.slice(1).map((text) => <p key={text}>{text}</p>)}
            </div>
            <section id={summary.id} className={`${anchorClass} mb-8 rounded-2xl border border-brand-100 bg-brand-50 p-5 md:p-7`}>
              <h2 className="mb-4 text-xl font-bold text-warm-800 md:text-2xl">{summary.title}</h2>
              <div className="space-y-3 leading-relaxed text-warm-700">
                {summary.blocks.map((block) => block.kind === "paragraph" && <p key={block.text}>{block.text}</p>)}
              </div>
            </section>
            <ul className="mb-10 grid gap-3 sm:grid-cols-3" aria-label={article.highlights}>
              {facts.map(({ value, label }) => (
                <li key={value} className="rounded-2xl border border-warm-300 bg-warm-100 p-5">
                  <strong className="block text-2xl font-bold text-brand-500">{value}</strong>
                  <span className="mt-2 block text-sm leading-relaxed text-warm-700">{label}</span>
                </li>
              ))}
            </ul>
            <div className="mb-12 lg:hidden"><TableOfContents label={article.contents} items={tocItems} /></div>

            {body.map(({ id, title, blocks }) => (
              <section key={id} id={id} className={`${anchorClass} mb-12`}>
                <h2 className={headingClass}>{title}</h2>
                <div className="space-y-4 text-base leading-relaxed text-warm-700 md:text-lg">
                  {blocks.map((block) => {
                    if (block.kind === "list") {
                      return <ul key={block.items[0]} className="list-disc space-y-2 pl-6">{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
                    }
                    return <p key={block.text}>{block.text}</p>;
                  })}
                  {id === article.studentSection && (
                    locale === "tr" ? (
                      <p>
                        <Link className={linkClass} href="/tr/diploma">Kanada Lise Diploması Programı</Link> hakkında bilgi almak ve öğrencinizin durumunu görüşmek için{" "}
                        <Link className={linkClass} href="/tr/contact">ekibimizle iletişime geçebilirsiniz</Link>.
                      </p>
                    ) : (
                      <p>
                        <Link className={linkClass} href="/en/contact">Contact our team</Link> to discuss your student’s situation and learn more about the{" "}
                        <Link className={linkClass} href="/en/diploma">Canadian High School Diploma program</Link>.
                      </p>
                    )
                  )}
                </div>
              </section>
            ))}

            <section id={article.faq.id} className={`${anchorClass} mb-12`}>
              <h2 className={headingClass}>{article.faq.title}</h2>
              <SimpleFAQAccordion items={faqItems} headingLevel="h3" />
            </section>
            <section id={article.sources.id} className={anchorClass}>
              <h2 className={headingClass}>{article.sources.title}</h2>
              <ul className="list-disc space-y-3 pl-6 text-warm-700">
                {references.map(({ label, href }) => <li key={href}><a className={linkClass} href={href}>{label}</a></li>)}
              </ul>
            </section>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-36"><TableOfContents label={article.contents} items={tocItems} /></div>
          </aside>
        </div>

        <section className="border-t border-warm-300 bg-white py-12 md:py-16">
          <div className="container mx-auto max-w-[1280px] px-4 md:px-6">
            <h2 className="mb-6 text-2xl font-bold text-warm-800 md:text-3xl">{article.related}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((item) => <TurkishGuideCard key={item.href} guide={item} heading="h3" locale={locale} />)}
            </div>
          </div>
        </section>
      </article>
      <TurkishGuideCTA {...article.cta} locale={locale} trackWhatsApp />
    </main>
  );
}
