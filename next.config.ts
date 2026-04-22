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
      // ── www canonical zorunluluğu ───────────────────────────────
      // non-www → www yönlendirmesi (Google'ın seçtiği canonical ile tutarlılık)
      {
        source: "/:path*",
        has: [{ type: "host", value: "catalysteducation.ca" }],
        destination: "https://www.catalysteducation.ca/:path*",
        permanent: true,
      },

      // ── Locale'siz URL'ler → /tr (Google'ın crawl ettiği eski URL'ler için 301)
      // next-intl middleware bunları 307 ile redirect eder; explicit 301 Google için daha temiz.
      { source: "/diploma",      destination: "/tr/diploma",      permanent: true },
      { source: "/certificates", destination: "/tr/certificates", permanent: true },
      { source: "/corporate",    destination: "/tr/corporate",    permanent: true },
      { source: "/about",        destination: "/tr/about",        permanent: true },
      { source: "/faq",          destination: "/tr/faq",          permanent: true },
      { source: "/apply",        destination: "/tr/bilgi-al",     permanent: true },
      { source: "/contact",      destination: "/tr/contact",      permanent: true },

      // ── Ana sayfa ──────────────────────────────────────────────
      { source: "/",               destination: "/tr",         permanent: true },

      // ── Eski Dil Uzantıları (Migration Cleanup) ────────────────
      // Gelen istek /en/fa, /en/fr gibi 2 harfli eski dil yollarıysa ana dile yönlendiriyoruz.
      // Sitenin geçerli /en/diploma, /tr/faq gibi gerçek sayfaları bozulmaz!
      { source: "/en/:oldLang([a-z]{2})", destination: "/en", permanent: true },
      { source: "/tr/:oldLang([a-z]{2})", destination: "/tr", permanent: true },

      // Legacy language root redirects (/ru, /fr, /fa) -> /en
      { source: "/ru/:path*", destination: "/en", permanent: true },
      { source: "/fr/:path*", destination: "/en", permanent: true },
      { source: "/fa/:path*", destination: "/en", permanent: true },

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

      // ── Başvuru → Bilgi Al yönlendirmeleri ────────────────────
      { source: "/tr/apply",                   destination: "/tr/bilgi-al", permanent: true },
      { source: "/en/apply",                   destination: "/en/get-info", permanent: true },
      { source: "/en/bilgi-al",                destination: "/en/get-info", permanent: true },
      { source: "/how-to-apply",               destination: "/tr/bilgi-al", permanent: true },
      { source: "/how-to-apply/",              destination: "/tr/bilgi-al", permanent: true },
      { source: "/tr/how-to-apply",            destination: "/tr/bilgi-al", permanent: true },
      { source: "/en/how-to-apply",            destination: "/en/get-info", permanent: true },
      { source: "/apply-now",                  destination: "/tr/bilgi-al", permanent: true },
      { source: "/apply-now/",                 destination: "/tr/bilgi-al", permanent: true },
      { source: "/tr/apply-now",               destination: "/tr/bilgi-al", permanent: true },
      { source: "/en/apply-now",               destination: "/en/get-info", permanent: true },

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

      // ── Blog Pillar Pages — cross-locale redirects ─────────────
      // Ensures canonical slugs: TR uses /tr/ossd-nedir, EN uses /en/what-is-ossd
      { source: "/ossd-nedir",                 destination: "/tr/ossd-nedir",   permanent: true },
      { source: "/en/ossd-nedir",              destination: "/en/what-is-ossd", permanent: true },
      { source: "/what-is-ossd",               destination: "/en/what-is-ossd", permanent: true },
      { source: "/tr/what-is-ossd",            destination: "/tr/ossd-nedir",   permanent: true },

      // ── WordPress sitemap URL'leri → Next.js sitemap ───────────
      // Wildcard: wp-sitemap.xml ve tüm alt sitemap varyantları
      { source: "/wp-sitemap.xml",        destination: "/sitemap.xml", permanent: true },
      { source: "/wp-sitemap-:slug.xml",  destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap_index.xml",     destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml",      destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml",      destination: "/sitemap.xml", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
