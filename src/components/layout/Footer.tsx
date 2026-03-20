"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <footer className="w-full bg-warm-100 border-t border-warm-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px] grid gap-8 md:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Image
            src="/logo.jpg"
            alt="Catalyst Education"
            width={180}
            height={54}
            className="h-11 w-auto"
          />
          <p className="text-sm text-warm-600 max-w-xs leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-warm-800">{t("pathway")}</h3>
          <Link href={localePath("/#diploma-benefits")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("links.theDiploma")}</Link>
          <Link href={localePath("/#how-it-works")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("links.equivalency")}</Link>
          <Link href={localePath("/#consultation")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("links.university")}</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-warm-800">{t("organization")}</h3>
          <Link href={localePath("/about")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("orgLinks.about")}</Link>
          <Link href={localePath("/contact")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("orgLinks.contact")}</Link>
          <Link href="#" className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("orgLinks.schools")}</Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-warm-800">{t("legal")}</h3>
          <Link href="#" className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("legalLinks.privacy")}</Link>
          <Link href="#" className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("legalLinks.terms")}</Link>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-[1280px] mt-12 pt-8 border-t border-warm-300">
        <p className="text-center text-sm text-warm-500">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
