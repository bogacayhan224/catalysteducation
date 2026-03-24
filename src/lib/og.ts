const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://catalyst-education-web.vercel.app";

export function ogImage(title: string) {
  return [
    {
      url: `${SITE_URL}/api/og?title=${encodeURIComponent(title)}`,
      width: 1200,
      height: 630,
      alt: title,
    },
  ];
}
