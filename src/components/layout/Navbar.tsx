"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "tr" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const localePath = (href: string) => `/${locale}${href}`;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-300"
          : "bg-warm-200/90 backdrop-blur-sm border-b border-warm-300/50"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between max-w-[1280px]">
        <Link href={localePath("/")} className="flex items-center">
          <Image
            src="/logo.jpg"
            alt="Catalyst Education"
            width={180}
            height={54}
            className="h-11 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href={localePath("/#how-it-works")} className="text-warm-700 hover:text-warm-800 transition-colors">{t("howItWorks")}</Link>
          <Link href={localePath("/#diploma-benefits")} className="text-warm-700 hover:text-warm-800 transition-colors">{t("theDiploma")}</Link>
          <Link href={localePath("/#faqs")} className="text-warm-700 hover:text-warm-800 transition-colors">{t("faqs")}</Link>
          <Link href={localePath("/about")} className="text-warm-700 hover:text-warm-800 transition-colors">{t("aboutUs")}</Link>
          <Link href={localePath("/contact")} className="text-warm-700 hover:text-warm-800 transition-colors">{t("contact")}</Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={switchLocale}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-warm-600 hover:text-warm-800 transition-colors"
          >
            <Globe size={16} />
            {locale === "en" ? "TR" : "EN"}
          </button>

          <Link
            href={localePath("/apply")}
            className="inline-flex h-10 items-center justify-center rounded-full bg-brand-500 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md"
          >
            {t("applyNow")}
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-warm-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[440px] border-t border-warm-300 opacity-100 bg-white" : "max-h-0 opacity-0 bg-transparent"
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-4">
          <Link href={localePath("/#how-it-works")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-2 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("howItWorks")}</Link>
          <Link href={localePath("/#diploma-benefits")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-2 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("theDiploma")}</Link>
          <Link href={localePath("/#faqs")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-2 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("faqs")}</Link>
          <Link href={localePath("/about")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-2 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("aboutUs")}</Link>
          <Link href={localePath("/contact")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-2 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("contact")}</Link>

          <div className="flex flex-col gap-3 mt-2">
            <Link
              href={localePath("/apply")}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-brand-500 px-4 text-sm font-semibold text-white shadow transition-colors hover:bg-brand-600"
              onClick={() => setIsOpen(false)}
            >
              {t("applyNow")}
            </Link>
            <button
              onClick={() => { switchLocale(); setIsOpen(false); }}
              className="inline-flex items-center gap-1.5 h-11 w-full justify-center rounded-full text-sm font-medium text-warm-700 border border-warm-300 hover:bg-warm-200 transition-colors"
            >
              <Globe size={16} />
              {locale === "en" ? "Türkçe" : "English"}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
