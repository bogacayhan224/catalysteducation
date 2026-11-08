import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { financialLiteracyGuide } from "@/lib/turkish-guides";

const localize = createMiddleware({
  locales: ["en", "tr"],
  defaultLocale: "tr",
  localePrefix: "always",
});

export default function middleware(request: NextRequest) {
  const articlePath = financialLiteracyGuide.href.slice(3);
  const { pathname } = request.nextUrl;
  if (pathname === articlePath || pathname === `/en${articlePath}`) {
    const destination = pathname === articlePath ? financialLiteracyGuide.href : "/en/guides";
    const url = request.nextUrl.clone();
    url.pathname = destination;
    return NextResponse.redirect(url, 308);
  }

  const response = localize(request);
  if (pathname === financialLiteracyGuide.href) {
    // There is no English translation of this guide.
    response.headers.delete("link");
  }
  return response;
}

export const config = {
  matcher: [
    "/((?!_next|studio|api|.*\\..*).*)"]
};
