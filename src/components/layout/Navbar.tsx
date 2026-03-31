"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Globe, ChevronDown, GraduationCap, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { event } from "@/lib/gtm";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [diplomaOpen, setDiplomaOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);
  const [mobileDiplomaOpen, setMobileDiplomaOpen] = useState(false);
  const [mobileCertOpen, setMobileCertOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const certDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDiplomaOpen(false);
      }
      if (certDropdownRef.current && !certDropdownRef.current.contains(e.target as Node)) {
        setCertOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const switchLocale = () => {
    const nextLocale = locale === "en" ? "tr" : "en";
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.push(newPath);
  };

  const localePath = (href: string) => `/${locale}${href}`;
  const navLink = "text-warm-700 hover:text-warm-800 transition-colors whitespace-nowrap text-sm font-medium";

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

        {/* Logo */}
        <Link href={localePath("/")} className="flex items-center flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Catalyst Education"
            width={180}
            height={54}
            className="h-16 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">

          {/* Kanada Lise Diploması dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDiplomaOpen((p) => !p)}
              className={cn(
                "inline-flex items-center gap-1 text-warm-700 hover:text-warm-800 transition-colors whitespace-nowrap",
                diplomaOpen && "text-warm-800"
              )}
            >
              {t("diplomaProgram")}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", diplomaOpen && "rotate-180")} />
            </button>

            {diplomaOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 rounded-2xl bg-white border border-warm-200 shadow-xl p-2 z-50">
                <Link
                  href={localePath("/diploma#what-is-ossd")}
                  onClick={() => setDiplomaOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-4 w-4 text-brand-500" />
                  </div>
                  <span className="text-sm font-medium text-warm-800">{t("whatIsOssd")}</span>
                </Link>
                <Link
                  href={localePath("/diploma#how-it-works")}
                  onClick={() => setDiplomaOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-4 w-4 text-brand-500" />
                  </div>
                  <span className="text-sm font-medium text-warm-800">{t("howItWorks")}</span>
                </Link>
                <Link
                  href={localePath("/diploma#why-ossd-matters")}
                  onClick={() => setDiplomaOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-4 w-4 text-brand-500" />
                  </div>
                  <span className="text-sm font-medium text-warm-800">{t("whyOssdMatters")}</span>
                </Link>
                <Link
                  href={localePath("/diploma#catalyst-difference")}
                  onClick={() => setDiplomaOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group"
                >
                  <div className="h-8 w-8 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-4 w-4 text-brand-500" />
                  </div>
                  <span className="text-sm font-medium text-warm-800">{t("catalystDifference")}</span>
                </Link>
                <div className="border-t border-warm-200 mt-1 pt-1">
                  <Link
                    href={localePath("/diploma")}
                    onClick={() => setDiplomaOpen(false)}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-brand-50 transition-colors group"
                  >
                    <span className="text-sm font-semibold text-brand-500">{t("viewDiplomaProgram")}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-brand-500 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Certificates dropdown */}
          <div className="relative" ref={certDropdownRef}>
            <button
              onClick={() => setCertOpen((p) => !p)}
              className={cn("inline-flex items-center gap-1 text-warm-700 hover:text-warm-800 transition-colors whitespace-nowrap", certOpen && "text-warm-800")}
            >
              {t("certificatesProgram")}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", certOpen && "rotate-180")} />
            </button>
            {certOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 rounded-2xl bg-white border border-warm-200 shadow-xl p-2 z-50">
                <Link href={localePath("/certificates#why-choose")} onClick={() => setCertOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group">
                  <div className="h-8 w-8 rounded-lg bg-info-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-4 w-4 text-[#3B7CB0]" />
                  </div>
                  <span className="text-sm font-medium text-warm-800">{t("certWhyChoose")}</span>
                </Link>
                <Link href={localePath("/certificates#programs")} onClick={() => setCertOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group">
                  <div className="h-8 w-8 rounded-lg bg-info-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-4 w-4 text-[#3B7CB0]" />
                  </div>
                  <span className="text-sm font-medium text-warm-800">{t("certPrograms")}</span>
                </Link>
                <Link href={localePath("/certificates#cohort-journey")} onClick={() => setCertOpen(false)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-warm-100 transition-colors group">
                  <div className="h-8 w-8 rounded-lg bg-info-100 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="h-4 w-4 text-[#3B7CB0]" />
                  </div>
                  <span className="text-sm font-medium text-warm-800">{t("certCohort")}</span>
                </Link>
                <div className="border-t border-warm-200 mt-1 pt-1">
                  <Link href={localePath("/certificates")} onClick={() => setCertOpen(false)} className="flex items-center justify-between p-3 rounded-xl hover:bg-info-100 transition-colors group">
                    <span className="text-sm font-semibold text-[#3B7CB0]">{t("viewCertProgram")}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#3B7CB0] group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link href={localePath("/about")} className={navLink}>{t("aboutUs")}</Link>
          <Link href={localePath("/faq")} className={navLink}>{t("faqs")}</Link>
          <Link href={localePath("/contact")} className={navLink}>{t("contact")}</Link>
        </nav>

        {/* Right: CTA + locale */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link
            href={localePath("/contact#contact-form")}
            className="inline-flex h-10 items-center justify-center rounded-full border border-warm-400 bg-transparent px-4 text-sm font-semibold text-warm-700 transition-all hover:bg-warm-200 whitespace-nowrap"
          >
            {t("getInfo")}
          </Link>
          <Link
            href={localePath("/apply")}
            onClick={() => event({ action: 'apply_click', button_text: t('applyNow'), section_name: 'Navbar' })}
            className="inline-flex h-10 items-center justify-center rounded-full bg-brand-500 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-600 hover:shadow-md whitespace-nowrap"
          >
            {t("applyNow")}
          </Link>
          <button
            onClick={switchLocale}
            className="inline-flex items-center gap-1 text-sm font-medium text-warm-500 hover:text-warm-800 transition-colors ml-1"
          >
            <Globe size={15} />
            {locale === "en" ? "TR" : "EN"}
          </button>
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
          isOpen ? "max-h-[800px] border-t border-warm-300 opacity-100 bg-white" : "max-h-0 opacity-0 bg-transparent"
        )}
      >
        <div className="px-4 py-4 flex flex-col gap-1">

          {/* Diploma accordion */}
          <button
            onClick={() => setMobileDiplomaOpen((p) => !p)}
            className="flex items-center justify-between w-full text-sm font-medium text-warm-700 hover:text-warm-800 py-3 border-b border-warm-300"
          >
            {t("diplomaProgram")}
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileDiplomaOpen && "rotate-180")} />
          </button>

          {mobileDiplomaOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-1 border-b border-warm-300">
              <Link href={localePath("/diploma#what-is-ossd")} className="py-2.5 text-sm text-warm-700 hover:text-warm-800" onClick={() => { setIsOpen(false); setMobileDiplomaOpen(false); }}>{t("whatIsOssd")}</Link>
              <Link href={localePath("/diploma#how-it-works")} className="py-2.5 text-sm text-warm-700 hover:text-warm-800" onClick={() => { setIsOpen(false); setMobileDiplomaOpen(false); }}>{t("howItWorks")}</Link>
              <Link href={localePath("/diploma#why-ossd-matters")} className="py-2.5 text-sm text-warm-700 hover:text-warm-800" onClick={() => { setIsOpen(false); setMobileDiplomaOpen(false); }}>{t("whyOssdMatters")}</Link>
              <Link href={localePath("/diploma#catalyst-difference")} className="py-2.5 text-sm text-warm-700 hover:text-warm-800" onClick={() => { setIsOpen(false); setMobileDiplomaOpen(false); }}>{t("catalystDifference")}</Link>
              <Link href={localePath("/diploma")} className="py-2.5 text-sm font-semibold text-brand-500 hover:text-brand-600" onClick={() => { setIsOpen(false); setMobileDiplomaOpen(false); }}>{t("viewDiplomaProgram")} →</Link>
            </div>
          )}

          {/* Certificates accordion */}
          <button
            onClick={() => setMobileCertOpen((p) => !p)}
            className="flex items-center justify-between w-full text-sm font-medium text-warm-700 hover:text-warm-800 py-3 border-b border-warm-300"
          >
            {t("certificatesProgram")}
            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", mobileCertOpen && "rotate-180")} />
          </button>

          {mobileCertOpen && (
            <div className="pl-4 flex flex-col gap-1 pb-1 border-b border-warm-300">
              <Link href={localePath("/certificates#why-choose")} className="py-2.5 text-sm text-warm-700 hover:text-warm-800" onClick={() => { setIsOpen(false); setMobileCertOpen(false); }}>{t("certWhyChoose")}</Link>
              <Link href={localePath("/certificates#programs")} className="py-2.5 text-sm text-warm-700 hover:text-warm-800" onClick={() => { setIsOpen(false); setMobileCertOpen(false); }}>{t("certPrograms")}</Link>
              <Link href={localePath("/certificates#cohort-journey")} className="py-2.5 text-sm text-warm-700 hover:text-warm-800" onClick={() => { setIsOpen(false); setMobileCertOpen(false); }}>{t("certCohort")}</Link>
              <Link href={localePath("/certificates")} className="py-2.5 text-sm font-semibold text-[#3B7CB0] hover:text-[#2d6091]" onClick={() => { setIsOpen(false); setMobileCertOpen(false); }}>{t("viewCertProgram")} →</Link>
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
              href={localePath("/contact#contact-form")}
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
