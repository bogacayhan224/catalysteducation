import { permanentRedirect } from "next/navigation";
import { FinancialLiteracyArticle, financialLiteracyMetadata } from "@/components/guides/financial-literacy/Article";
import { financialLiteracyPaths } from "@/lib/financial-literacy-paths";

export const metadata = financialLiteracyMetadata("en");

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  if ((await params).locale !== "en") permanentRedirect(financialLiteracyPaths.tr);
  return <FinancialLiteracyArticle locale="en" />;
}
