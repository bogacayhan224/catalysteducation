"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown, GraduationCap, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { event } from "@/lib/gtm";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const programItems = [
  { key: "diplomaProgram", href: "/diploma", icon: GraduationCap, accent: "text-brand-500" },
  { key: "certificatesProgram", href: "/certificates", icon: Lightbulb, accent: "text-[#3B7CB0]" },
] as const;

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
        "sticky top-9 md:top-10 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-300"
          : "bg-warm-200/90 backdrop-blur-sm border-b border-warm-300/50"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between max-w-[1280px]">
        <Link href={localePath("/")} className="flex items-center">
          <Image
            src="/logo.png"
            alt="Catalyst Education"
            width={180}
            height={54}
            className="h-16 w-auto"
            unoptimized
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

          {/* Programs Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProgramsOpen((p) => !p)}
              className={cn(
                "inline-flex items-center gap-1 text-warm-700 hover:text-warm-800 transition-colors",
                programsOpen && "text-warm-800"
              )}
            >
              {t("programs")}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", programsOpen && "rotate-180")} />
            </button>

            {/* Dropdown panel */}
            {programsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 rounded-2xl bg-white border border-warm-200 shadow-xl p-2 z-50">
                {programItems.map(({ key, href, icon: Icon, accent }) => (
                  <Link
                    key={key}
                    href={localePath(href)}
                    onClick={() => setProgramsOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group"
                  >
                    <div className={cn("h-8 w-8 rounded-lg bg-warm-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform", accent)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-medium text-warm-800">{t(key)}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href={localePath("/about")} className="text-warm-700 hover:text-warm-800 transition-colors">{t("aboutUs")}</Link>
          <Link href={localePath("/faq")} className="text-warm-700 hover:text-warm-800 transition-colors">{t("faqs")}</Link>
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
            href={localePath("/contact")}
            className="inline-flex h-10 items-center justify-center rounded-full border border-warm-400 bg-transparent px-6 text-sm font-semibold text-warm-700 transition-all hover:bg-warm-200"
          >
            {t("getInfo")}
          </Link>
          <Link
            href={localePath("/apply")}
            onClick={() => event({ action: 'apply_click', button_text: t('applyNow'), section_name: 'Navbar' })}
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
          isOpen ? "max-h-[560px] border-t border-warm-300 opacity-100 bg-white" : "max-h-0 opacity-0 bg-transparent"
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-1">

          {/* Programs accordion */}
          <button
            onClick={() => setMobileProgramsOpen((p) => !p)}
            className="flex items-center justify-between w-full text-sm font-medium text-warm-700 hover:text-warm-800 py-3 border-b border-warm-300"
          >
            {t("programs")}
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileProgramsOpen && "rotate-180")} />
          </button>

          {mobileProgramsOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-1 border-b border-warm-300">
              {programItems.map(({ key, href, icon: Icon, accent }) => (
                <Link
                  key={key}
                  href={localePath(href)}
                  className="flex items-center gap-2.5 py-2.5 text-sm text-warm-700 hover:text-warm-800"
                  onClick={() => { setIsOpen(false); setMobileProgramsOpen(false); }}
                >
                  <Icon className={cn("h-4 w-4 flex-shrink-0", accent)} />
                  {t(key)}
                </Link>
              ))}
            </div>
          )}

          <Link href={localePath("/about")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-3 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("aboutUs")}</Link>
          <Link href={localePath("/faq")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-3 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("faqs")}</Link>
          <Link href={localePath("/contact")} className="text-sm font-medium text-warm-700 hover:text-warm-800 py-3 border-b border-warm-300" onClick={() => setIsOpen(false)}>{t("contact")}</Link>

          <div className="flex flex-col gap-3 mt-3">
            <Link
              href={localePath("/apply")}
              className="inline-flex h-11 w-full items-center justify-center rounded-full bg-brand-500 px-4 text-sm font-semibold text-white shadow transition-colors hover:bg-brand-600"
              onClick={() => { setIsOpen(false); event({ action: 'apply_click', button_text: t('applyNow'), section_name: 'Navbar Mobile' }); }}
            >
              {t("applyNow")}
            </Link>
            <Link
              href={localePath("/contact")}
              className="inline-flex h-11 w-full items-center justify-center rounded-full border border-warm-400 bg-transparent px-4 text-sm font-semibold text-warm-700 transition-colors hover:bg-warm-200"
              onClick={() => setIsOpen(false)}
            >
              {t("getInfo")}
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
