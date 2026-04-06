import { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.catalysteducation.ca";

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
        "/wp-json/",
        "/xmlrpc.php",
        "/*?add-to-cart=",
        "/*?filter-category",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
