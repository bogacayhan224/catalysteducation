import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/studio/",
        "/kurslar/",
        "/ders-kategori/",
        "/product-category/",
        "/tag/",
        "/category/",
        "/feed/",
        "/page/",
        "/*?add-to-cart=",
        "/*?filter-category",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
