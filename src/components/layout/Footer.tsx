"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useConsent } from "@/contexts/ConsentContext";

export function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const localePath = (href: string) => `/${locale}${href}`;
  const { openPreferences } = useConsent();

  return (
    <footer className="w-full bg-warm-100 border-t border-warm-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-[1280px] grid gap-8 md:grid-cols-4">

        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Image
            src="/logo.png"
            alt="Catalyst Education"
            width={180}
            height={54}
            className="h-16 w-auto"
          />
          <p className="text-sm text-warm-600 max-w-xs leading-relaxed">
            {t("description")}
          </p>
          <p className="text-xs text-warm-500 font-medium">{t("trustLine")}</p>
        </div>

        {/* Programs */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-warm-800">{t("programs")}</h3>
          <Link href={localePath("/diploma")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("programLinks.diploma")}</Link>
          <Link href={localePath("/certificates")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("programLinks.certificates")}</Link>
          <h3 className="font-semibold text-warm-800 mt-2">{t("guides")}</h3>
          <Link
            href={locale === "tr" ? "/tr/rehberler" : "/en/guides"}
            className="text-sm text-warm-600 hover:text-brand-500 transition-colors"
          >
            {t("guideLinks.allGuides")}
          </Link>
          <Link
            href={locale === "tr" ? "/tr/ossd-nedir" : "/en/what-is-ossd"}
            className="text-sm text-warm-600 hover:text-brand-500 transition-colors"
          >
            {t("guideLinks.whatIsOssd")}
          </Link>
          <Link
            href={locale === "tr" ? "/tr/kanada-lise-diplomasi-nasil-alinir" : "/en/how-to-get-canadian-high-school-diploma"}
            className="text-sm text-warm-600 hover:text-brand-500 transition-colors"
          >
            {t("guideLinks.howToGet")}
          </Link>
          <Link
            href={locale === "tr" ? "/tr/ossd-avantajlari" : "/en/ossd-benefits"}
            className="text-sm text-warm-600 hover:text-brand-500 transition-colors"
          >
            {t("guideLinks.ossdBenefits")}
          </Link>
        </div>

        {/* Organization */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-warm-800">{t("organization")}</h3>
          <Link href={localePath("/about")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("orgLinks.about")}</Link>
          <Link href={localePath("/contact")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("orgLinks.contact")}</Link>
          <Link href={localePath("/apply")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("links.university")}</Link>
        </div>

        {/* Legal */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-warm-800">{t("legal")}</h3>
          <Link href={localePath("/privacy")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("legalLinks.privacy")}</Link>
          <Link href={localePath("/terms")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("legalLinks.terms")}</Link>
          {locale === "tr" && (
            <Link href={localePath("/kvkk")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("legalLinks.kvkk")}</Link>
          )}
          <Link href={localePath("/cookie-notice")} className="text-sm text-warm-600 hover:text-brand-500 transition-colors">{t("legalLinks.cookieNotice")}</Link>
          <button onClick={openPreferences} className="text-sm text-warm-600 hover:text-brand-500 transition-colors text-left">{t("legalLinks.cookiePreferences")}</button>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-[1280px] mt-10 pt-8 border-t border-warm-300 space-y-4">
        <p className="text-xs text-warm-500 leading-relaxed max-w-3xl">
          {t("disclaimer")}
        </p>
        <p className="text-center text-sm text-warm-500">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
