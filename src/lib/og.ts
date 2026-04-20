const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

interface OgImageOptions {
  /** Short display title for the image — overrides the SEO title */
  ogTitle?: string;
  /** Optional subtitle line shown below the main title */
  subtitle?: string;
  /** Locale for badge and trust text ('en' | 'tr', defaults to 'tr') */
  locale?: string;
}

export function ogImage(title: string, options?: OgImageOptions) {
  const displayTitle = options?.ogTitle ?? title;
  const params = new URLSearchParams({ title: displayTitle });
  if (options?.subtitle) params.set("subtitle", options.subtitle);
  if (options?.locale) params.set("locale", options.locale);

  return [
    {
      url: `${SITE_URL}/api/og?${params.toString()}`,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];
}
