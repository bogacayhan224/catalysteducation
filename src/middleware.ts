import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { financialLiteracyPaths } from "@/lib/financial-literacy-paths";

const localize = createMiddleware({
  locales: ["en", "tr"],
  defaultLocale: "tr",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const trSlug = financialLiteracyPaths.tr.slice(3);
  const enSlug = financialLiteracyPaths.en.slice(3);
  const destination = pathname === trSlug || pathname === `/tr${enSlug}`
    ? financialLiteracyPaths.tr
    : pathname === enSlug || pathname === `/en${trSlug}`
      ? financialLiteracyPaths.en
      : undefined;

  if (destination) {
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 308);
  }

  const response = localize(request);
  if (pathname === financialLiteracyPaths.tr || pathname === financialLiteracyPaths.en) {
    // The localized pages declare the correct alternate slugs in their metadata.
    response.headers.delete("link");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|studio|api|.*\\..*).*)"]
};
