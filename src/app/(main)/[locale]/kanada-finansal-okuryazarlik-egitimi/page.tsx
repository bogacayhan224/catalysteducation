import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpen, ChevronRight, Clock } from "lucide-react";
import { SimpleFAQAccordion } from "@/components/ui/SimpleFAQAccordion";
import { TurkishGuideCard } from "@/components/ui/TurkishGuideCard";
import { TurkishGuideCTA } from "@/components/sections/TurkishGuideCTA";
import { financialLiteracyGuide as guide, turkishGuides } from "@/lib/turkish-guides";
import { faqItems, introduction, references, sections } from "./content";

const siteUrl = "https://www.catalysteducation.ca";
const pageUrl = `${siteUrl}${guide.href}`;
const title = "Kanada'da Finansal Okuryazarlık Eğitimi | OSSD & TVO";
const headline = "Kanada'da Lisede Finansal Okuryazarlık: OSSD'nin 2026–2027 Yeniliği";
const description =
  "Kanada'da finansal okuryazarlık OSSD mezuniyet şartı oldu. TVO'nun geliştirdiği modülleri, 10. sınıf uygulamasını ve öğrencilere katkılarını keşfedin.";
const author = "Catalyst Education";
const image = {
  path: "/og/finansal-okuryazarlik.webp",
  width: 1200,
  height: 630,
  alt: "Bütçe grafiği açık bir dizüstü bilgisayar, planlama defteri ve madeni paralar",
};

export const metadata: Metadata = {
  title,
  description,
  authors: [{ name: author }],
  alternates: { canonical: pageUrl, languages: { tr: pageUrl } },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: pageUrl,
    siteName: author,
    type: "article",
    locale: "tr_TR",
    publishedTime: guide.datePublished,
    images: [{ url: siteUrl + image.path, width: image.width, height: image.height, alt: image.alt }],
  },
  twitter: { card: "summary_large_image", title, description, images: [siteUrl + image.path] },
};

const breadcrumbs = [
  { name: "Ana Sayfa", href: "/tr" },
  { name: "Rehberler", href: "/tr/rehberler" },
  { name: "Finansal Okuryazarlık Eğitimi", href: guide.href },
];
const organization = { "@type": "Organization", name: author, url: siteUrl };
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
      inLanguage: "tr-TR",
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

const facts = [
  { value: "2026–2027", label: "Yeni OSSD mezuniyet gerekliliği" },
  { value: "%70", label: "Gerekliliği tamamlamak için başarı eşiği" },
  { value: "TVO", label: "Öğrenme ve değerlendirme modüllerini geliştiren kurum" },
];
const relatedPaths = ["/tr/ossd-nedir", "/tr/tvo-ve-tvo-ilc-nedir", "/tr/kanada-lise-diplomasi-nasil-alinir"];
const relatedGuides = relatedPaths.flatMap((href) => turkishGuides.filter((item) => item.href === href));
const tocItems = [
  ...sections,
  { id: "sss", title: "Sık Sorulan Sorular" },
  { id: "resmi-kaynaklar", title: "Resmi Kaynaklar" },
];
const headingClass = "mb-5 border-b border-warm-300 pb-3 text-2xl font-bold text-warm-800 md:text-3xl";
const linkClass = "font-semibold text-brand-500 underline decoration-brand-200 underline-offset-4 hover:decoration-brand-500";
const anchorClass = "scroll-mt-36";

function TableOfContents() {
  return (
    <nav aria-label="İçindekiler" className="rounded-2xl border border-warm-300 bg-warm-100 p-6">
      <p className="mb-4 flex items-center gap-2 font-bold text-warm-800">
        <BookOpen aria-hidden="true" className="h-4 w-4 text-brand-500" /> İçindekiler
      </p>
      <ol className="list-decimal space-y-2 pl-5 text-sm text-warm-700">
        {tocItems.map(({ id, title }) => (
          <li key={id}>
            <a href={`#${id}`} className="block py-0.5 hover:text-brand-500 hover:underline">{title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default async function FinancialLiteracyPage({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "tr") redirect("/en/guides");

  const [summary, ...body] = sections;

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <article>
        <header className="border-b border-warm-300 bg-warm-200 py-12 md:py-16">
          <div className="container mx-auto max-w-[1280px] px-4 md:px-6">
            <nav aria-label="Sayfa yolu" className="mb-6">
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
                alt={image.alt}
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
            <ul className="mb-10 grid gap-3 sm:grid-cols-3" aria-label="Öne çıkan bilgiler">
              {facts.map(({ value, label }) => (
                <li key={value} className="rounded-2xl border border-warm-300 bg-warm-100 p-5">
                  <strong className="block text-2xl font-bold text-brand-500">{value}</strong>
                  <span className="mt-2 block text-sm leading-relaxed text-warm-700">{label}</span>
                </li>
              ))}
            </ul>
            <div className="mb-12 lg:hidden"><TableOfContents /></div>

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
                  {id === "turkiyedeki-ogrenciler" && (
                    <p>
                      <Link className={linkClass} href="/tr/diploma">Kanada Lise Diploması Programı</Link> hakkında bilgi almak ve öğrencinizin durumunu görüşmek için{" "}
                      <Link className={linkClass} href="/tr/contact">ekibimizle iletişime geçebilirsiniz</Link>.
                    </p>
                  )}
                </div>
              </section>
            ))}

            <section id="sss" className={`${anchorClass} mb-12`}>
              <h2 className={headingClass}>Sık Sorulan Sorular</h2>
              <SimpleFAQAccordion items={faqItems} headingLevel="h3" />
            </section>
            <section id="resmi-kaynaklar" className={anchorClass}>
              <h2 className={headingClass}>Resmi Kaynaklar</h2>
              <ul className="list-disc space-y-3 pl-6 text-warm-700">
                {references.map(({ label, href }) => <li key={href}><a className={linkClass} href={href}>{label}</a></li>)}
              </ul>
            </section>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-36"><TableOfContents /></div>
          </aside>
        </div>

        <section className="border-t border-warm-300 bg-white py-12 md:py-16">
          <div className="container mx-auto max-w-[1280px] px-4 md:px-6">
            <h2 className="mb-6 text-2xl font-bold text-warm-800 md:text-3xl">İlgili Rehberler</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((item) => <TurkishGuideCard key={item.href} guide={item} heading="h3" />)}
            </div>
          </div>
        </section>
      </article>
      <TurkishGuideCTA
        title="Kanada Lise Diploması Yolculuğunuzu Planlayın"
        description="Ontario Lise Diploması programı, akademik yerleştirme ve öğrencinize özel eğitim planı hakkında bilgi almak için Catalyst Education ekibiyle iletişime geçin."
        whatsappLabel="WhatsApp ile Bilgi Al"
        trackWhatsApp
      />
    </main>
  );
}
