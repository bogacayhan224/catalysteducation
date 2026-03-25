import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },

  async redirects() {
    return [
      // İçerik sayfaları
      { source: "/what-we-offer", destination: "/tr/diploma", permanent: true },
      { source: "/what-we-offer/", destination: "/tr/diploma", permanent: true },
      { source: "/what-we-offer-ossd", destination: "/tr/diploma", permanent: true },
      { source: "/our-program", destination: "/tr/diploma", permanent: true },
      { source: "/why-catalyst-education", destination: "/tr/about", permanent: true },
      { source: "/why-catalyst-education/", destination: "/tr/about", permanent: true },
      { source: "/contact-us", destination: "/tr/contact", permanent: true },
      { source: "/contact-us/", destination: "/tr/contact", permanent: true },
      { source: "/help-center", destination: "/tr/faq", permanent: true },
      { source: "/help-center/", destination: "/tr/faq", permanent: true },
      { source: "/how-to-apply", destination: "/tr/apply", permanent: true },
      { source: "/how-to-apply/", destination: "/tr/apply", permanent: true },
      { source: "/apply-now", destination: "/tr/apply", permanent: true },
      { source: "/apply-now/", destination: "/tr/apply", permanent: true },
      { source: "/privacy-policy", destination: "/tr/privacy", permanent: true },

      // Ders/kurs sayfaları
      { source: "/english-eae2d", destination: "/tr/diploma", permanent: true },
      { source: "/functions-and-applications-mcf3m", destination: "/tr/diploma", permanent: true },
      { source: "/biology-sbi4u", destination: "/tr/diploma", permanent: true },
      { source: "/physics-sph3u", destination: "/tr/diploma", permanent: true },

      // Blog ve blog yazıları
      { source: "/blog", destination: "/tr", permanent: true },
      { source: "/merhaba-dunya", destination: "/tr", permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
