const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

const DEFAULT_OG_IMAGE = `${SITE_URL}/og/kanada-lise-diplomasi.jpg`;

interface OgImageOptions {
  /** Short display title for the image — used if a custom dynamic image is needed */
  ogTitle?: string;
  /** Optional subtitle line */
  subtitle?: string;
  /** Locale for badge and trust text ('en' | 'tr', defaults to 'tr') */
  locale?: string;
}

export function ogImage(title: string, _options?: OgImageOptions) {
  return [
    {
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 633,
      alt: title,
    },
  ];
}
