import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.catalysteducation.ca";

const locales = ["tr", "en"] as const;

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/diploma", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/certificates", priority: 0.9, changeFrequency: "monthly" as const },
  // { path: "/corporate", priority: 0.8, changeFrequency: "monthly" as const }, // page disabled (notFound)
  { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/apply", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const symmetric = locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          tr: `${SITE_URL}/tr${path}`,
          en: `${SITE_URL}/en${path}`,
        },
      },
    }))
  );

  // Blog pillar pages — locale-specific slugs (TR ≠ EN)
  const pillarPages: MetadataRoute.Sitemap = [
    // Guide hubs
    {
      url: `${SITE_URL}/tr/rehberler`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/rehberler`, en: `${SITE_URL}/en/guides` } },
    },
    {
      url: `${SITE_URL}/en/guides`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/rehberler`, en: `${SITE_URL}/en/guides` } },
    },
    // OSSD Nedir / What Is OSSD
    {
      url: `${SITE_URL}/tr/ossd-nedir`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/ossd-nedir`, en: `${SITE_URL}/en/what-is-ossd` } },
    },
    {
      url: `${SITE_URL}/en/what-is-ossd`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/ossd-nedir`, en: `${SITE_URL}/en/what-is-ossd` } },
    },
    // Kanada Lise Diploması Nasıl Alınır / How to Get
    {
      url: `${SITE_URL}/tr/kanada-lise-diplomasi-nasil-alinir`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: `${SITE_URL}/tr/kanada-lise-diplomasi-nasil-alinir`,
          en: `${SITE_URL}/en/how-to-get-canadian-high-school-diploma`,
        },
      },
    },
    {
      url: `${SITE_URL}/en/how-to-get-canadian-high-school-diploma`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: {
          tr: `${SITE_URL}/tr/kanada-lise-diplomasi-nasil-alinir`,
          en: `${SITE_URL}/en/how-to-get-canadian-high-school-diploma`,
        },
      },
    },
    // TVO ve TVO ILC Nedir / What Is TVO and TVO ILC
    {
      url: `${SITE_URL}/tr/tvo-ve-tvo-ilc-nedir`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/tvo-ve-tvo-ilc-nedir`, en: `${SITE_URL}/en/what-is-tvo-and-tvo-ilc` } },
    },
    {
      url: `${SITE_URL}/en/what-is-tvo-and-tvo-ilc`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/tvo-ve-tvo-ilc-nedir`, en: `${SITE_URL}/en/what-is-tvo-and-tvo-ilc` } },
    },
    // OSSD Çift Diploma / OSSD Dual Diploma
    {
      url: `${SITE_URL}/tr/ossd-cift-diploma`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/ossd-cift-diploma`, en: `${SITE_URL}/en/ossd-dual-diploma` } },
    },
    {
      url: `${SITE_URL}/en/ossd-dual-diploma`,
      lastModified: new Date("2026-04-07"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/ossd-cift-diploma`, en: `${SITE_URL}/en/ossd-dual-diploma` } },
    },
    // OSSD Avantajları / OSSD Benefits
    {
      url: `${SITE_URL}/tr/ossd-avantajlari`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/ossd-avantajlari`, en: `${SITE_URL}/en/ossd-benefits` } },
    },
    {
      url: `${SITE_URL}/en/ossd-benefits`,
      lastModified: new Date("2026-04-05"),
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: { languages: { tr: `${SITE_URL}/tr/ossd-avantajlari`, en: `${SITE_URL}/en/ossd-benefits` } },
    },
  ];

  return [...symmetric, ...pillarPages];
}
