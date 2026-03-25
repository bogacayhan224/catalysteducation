import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    // Her eski URL için 3 varyant: bare, /tr/ prefix, /en/ prefix
    // Sebep: next-intl middleware (localePrefix: "always") bazen /tr/eski-url şeklinde
    // yönlendirme yapıyor. Her iki durumu da yakalamak için tüm varyantlar tanımlandı.
    return [
      // ── Ana sayfa ──────────────────────────────────────────────
      { source: "/",               destination: "/tr",         permanent: false },

      // ── Program / Diploma ──────────────────────────────────────
      { source: "/what-we-offer",              destination: "/tr/diploma", permanent: true },
      { source: "/what-we-offer/",             destination: "/tr/diploma", permanent: true },
      { source: "/tr/what-we-offer",           destination: "/tr/diploma", permanent: true },
      { source: "/en/what-we-offer",           destination: "/en/diploma", permanent: true },
      { source: "/what-we-offer-ossd",         destination: "/tr/diploma", permanent: true },
      { source: "/tr/what-we-offer-ossd",      destination: "/tr/diploma", permanent: true },
      { source: "/en/what-we-offer-ossd",      destination: "/en/diploma", permanent: true },
      { source: "/our-program",                destination: "/tr/diploma", permanent: true },
      { source: "/tr/our-program",             destination: "/tr/diploma", permanent: true },
      { source: "/en/our-program",             destination: "/en/diploma", permanent: true },

      // ── Hakkımızda ─────────────────────────────────────────────
      { source: "/why-catalyst-education",     destination: "/tr/about",   permanent: true },
      { source: "/why-catalyst-education/",    destination: "/tr/about",   permanent: true },
      { source: "/tr/why-catalyst-education",  destination: "/tr/about",   permanent: true },
      { source: "/en/why-catalyst-education",  destination: "/en/about",   permanent: true },

      // ── İletişim ───────────────────────────────────────────────
      { source: "/contact-us",                 destination: "/tr/contact", permanent: true },
      { source: "/contact-us/",                destination: "/tr/contact", permanent: true },
      { source: "/tr/contact-us",              destination: "/tr/contact", permanent: true },
      { source: "/en/contact-us",              destination: "/en/contact", permanent: true },

      // ── SSS / Yardım ───────────────────────────────────────────
      { source: "/help-center",                destination: "/tr/faq",     permanent: true },
      { source: "/help-center/",               destination: "/tr/faq",     permanent: true },
      { source: "/tr/help-center",             destination: "/tr/faq",     permanent: true },
      { source: "/en/help-center",             destination: "/en/faq",     permanent: true },

      // ── Başvuru ────────────────────────────────────────────────
      { source: "/how-to-apply",               destination: "/tr/apply",   permanent: true },
      { source: "/how-to-apply/",              destination: "/tr/apply",   permanent: true },
      { source: "/tr/how-to-apply",            destination: "/tr/apply",   permanent: true },
      { source: "/en/how-to-apply",            destination: "/en/apply",   permanent: true },
      { source: "/apply-now",                  destination: "/tr/apply",   permanent: true },
      { source: "/apply-now/",                 destination: "/tr/apply",   permanent: true },
      { source: "/tr/apply-now",               destination: "/tr/apply",   permanent: true },
      { source: "/en/apply-now",               destination: "/en/apply",   permanent: true },

      // ── Gizlilik ───────────────────────────────────────────────
      { source: "/privacy-policy",             destination: "/tr/privacy", permanent: true },
      { source: "/tr/privacy-policy",          destination: "/tr/privacy", permanent: true },
      { source: "/en/privacy-policy",          destination: "/en/privacy", permanent: true },

      // ── Kurs sayfaları ─────────────────────────────────────────
      { source: "/english-eae2d",                       destination: "/tr/diploma", permanent: true },
      { source: "/tr/english-eae2d",                    destination: "/tr/diploma", permanent: true },
      { source: "/functions-and-applications-mcf3m",    destination: "/tr/diploma", permanent: true },
      { source: "/tr/functions-and-applications-mcf3m", destination: "/tr/diploma", permanent: true },
      { source: "/biology-sbi4u",                       destination: "/tr/diploma", permanent: true },
      { source: "/tr/biology-sbi4u",                    destination: "/tr/diploma", permanent: true },
      { source: "/physics-sph3u",                       destination: "/tr/diploma", permanent: true },
      { source: "/tr/physics-sph3u",                    destination: "/tr/diploma", permanent: true },

      // ── Blog ───────────────────────────────────────────────────
      { source: "/blog",                       destination: "/tr",         permanent: true },
      { source: "/tr/blog",                    destination: "/tr",         permanent: true },
      { source: "/merhaba-dunya",              destination: "/tr",         permanent: true },
      { source: "/tr/merhaba-dunya",           destination: "/tr",         permanent: true },

      // ── WordPress sitemap URL'leri → Next.js sitemap ───────────
      { source: "/wp-sitemap.xml",                         destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap_index.xml",                      destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml",                       destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml",                       destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-posts-post-1.xml",            destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-posts-page-1.xml",            destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-taxonomies-category-1.xml",   destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-taxonomies-post_tag-1.xml",   destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-users-1.xml",                 destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
