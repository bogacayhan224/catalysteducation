"use client";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import {
  Cpu, Link2, Factory, GraduationCap,
  Users, Clock, Check, ArrowRight, Lightbulb, Award
} from "lucide-react";
import { LeadForm } from "@/components/sections/LeadForm";

const whyItems = [
  { key: "why1", icon: Award },
  { key: "why2", icon: GraduationCap },
  { key: "why3", icon: Clock },
  { key: "why4", icon: Users },
  { key: "why5", icon: Lightbulb },
  { key: "why6", icon: ArrowRight },
] as const;

const programs = [
  {
    key: "prog1",
    icon: Cpu,
    iconClass: "bg-info-100 text-[#3B7CB0]",
    badgeClass: "bg-info-100 text-[#3B7CB0]",
    learnItems: ["prog1Learn1", "prog1Learn2", "prog1Learn3"] as const,
  },
  {
    key: "prog2",
    icon: Link2,
    iconClass: "bg-brand-50 text-brand-500",
    badgeClass: "bg-brand-100 text-brand-700",
    learnItems: ["prog2Learn1", "prog2Learn2", "prog2Learn3"] as const,
  },
  {
    key: "prog3",
    icon: Factory,
    iconClass: "bg-trust-50 text-trust-500",
    badgeClass: "bg-trust-50 text-trust-600",
    learnItems: ["prog3Learn1", "prog3Learn2", "prog3Learn3"] as const,
  },
] as const;

const journeySteps = ["journey1", "journey2", "journey3", "journey4", "journey5", "journey6"] as const;
const certItems = ["certItem1", "certItem2", "certItem3", "certItem4"] as const;

export default function CertificatesPage() {
  const t = useTranslations("certificatesPage");
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-info-50 pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-warm-300">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B7CB0]/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 pointer-events-none" />
          <div className="container relative z-10 px-4 md:px-6 mx-auto max-w-[1280px]">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#3B7CB0]/25 bg-[#3B7CB0]/8 px-4 py-1.5 mb-8">
                <span className="text-xs font-semibold text-[#3B7CB0]">{t("badge")}</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.15] text-warm-800 mb-4">
                {t("heroTitle")}
                <br />
                <span className="text-[#3B7CB0]">{t("heroHighlight")}</span>
              </h1>
              <p className="text-base font-semibold text-warm-500 tracking-wide mb-6">
                {t("heroSubheadline")}
              </p>
              <p className="text-lg md:text-xl text-warm-700 leading-relaxed mb-3 max-w-2xl">
                {t("heroSubtitle")}
              </p>
              <p className="text-sm text-[#3B7CB0] font-medium mb-8">
                {t("heroNote")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#programs"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-500 px-8 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
                >
                  {t("heroCTA")}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Partner logos */}
            <div className="flex flex-row lg:flex-col items-center justify-center gap-4">
              {locale !== "tr" && (
                <p className="text-[10px] font-semibold text-warm-400 uppercase tracking-widest mb-1">Backed by</p>
              )}
              <div className="bg-white/80 rounded-2xl px-6 py-4 border border-warm-200 shadow-sm">
                <Image
                  src="/ontario-tech-logo.png"
                  alt="Ontario Tech University"
                  width={148}
                  height={50}
                  className="object-contain opacity-90"
                />
              </div>
              <div className="bg-white/80 rounded-2xl px-6 py-4 border border-warm-200 shadow-sm">
                <Image
                  src="/brilliant-catalyst-logo.png"
                  alt="Brilliant Catalyst"
                  width={148}
                  height={40}
                  className="object-contain opacity-90"
                />
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ── ABOUT BRILLIANT CATALYST ── */}
        <section className="hidden w-full py-16 md:py-20 bg-[#3A6EA5] text-white border-b border-white/20">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{t("aboutTitle")}</h2>
                <p className="text-white/75 leading-relaxed text-lg">{t("aboutDesc")}</p>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {(["1", "2", "3"] as const).map((n) => (
                  <div key={n} className="text-center p-5 bg-white/8 rounded-2xl border border-white/12">
                    <p className="text-3xl md:text-4xl font-bold text-white mb-1">
                      {t(`aboutStat${n}Value` as Parameters<typeof t>[0])}
                    </p>
                    <p className="text-xs text-white/60 leading-snug">
                      {t(`aboutStat${n}Label` as Parameters<typeof t>[0])}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY CHOOSE ── */}
        <section id="why-choose" className="w-full py-20 md:py-28 bg-white border-b border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">{t("whyTitle")}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyItems.map(({ key, icon: Icon }) => (
                <div key={key} className="flex flex-col gap-4 p-7 bg-warm-100 rounded-2xl border border-warm-200 hover:shadow-md transition-shadow">
                  <div className="h-11 w-11 rounded-xl bg-[#3B7CB0]/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#3B7CB0]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-warm-800 mb-2">{t(`${key}Title` as Parameters<typeof t>[0])}</h3>
                    <p className="text-warm-700 text-sm leading-relaxed">{t(`${key}Desc` as Parameters<typeof t>[0])}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROGRAMS ── */}
        <section id="programs" className="w-full py-24 md:py-32 bg-warm-100 border-b border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-5 space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-800">{t("programsTitle")}</h2>
            </div>
            <p className="text-center text-warm-600 text-sm mb-12 max-w-xl mx-auto">{t("programNote")}</p>
            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {programs.map(({ key, icon: Icon, iconClass, badgeClass, learnItems }) => (
                <div key={key} className="flex flex-col bg-white rounded-3xl border border-warm-200 p-8 hover:shadow-lg transition-all duration-300 group">
                  <div className={`h-13 w-13 rounded-2xl flex items-center justify-center mb-5 ${iconClass} transition-transform group-hover:scale-105`}>
                    <Icon size={24} />
                  </div>
                  <span className={`inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold mb-3 ${badgeClass}`}>
                    {t(`${key}Badge` as Parameters<typeof t>[0])}
                  </span>
                  <h3 className="text-xl font-bold text-warm-800 mb-3">{t(`${key}Title` as Parameters<typeof t>[0])}</h3>
                  <p className="text-warm-700 text-sm leading-relaxed mb-5">{t(`${key}Desc` as Parameters<typeof t>[0])}</p>

                  {/* What you'll learn */}
                  <div className="border-t border-warm-200 pt-4 mb-4 flex-1">
                    <p className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-3">{t("learnLabel")}</p>
                    <div className="space-y-2">
                      {learnItems.map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <Check className="h-3.5 w-3.5 text-trust-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-warm-700">{t(item)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Audience */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-warm-500 uppercase tracking-wide mb-1">{t("audienceLabel")}</p>
                    <p className="text-xs text-warm-600">{t(`${key}Audience` as Parameters<typeof t>[0])}</p>
                  </div>

                  {/* Meta + CTA */}
                  <div className="pt-4 border-t border-warm-200 flex items-center justify-between">
                    <p className="text-xs text-warm-500 flex items-center gap-1.5">
                      <GraduationCap className="h-3.5 w-3.5 flex-shrink-0" />
                      {t("progMeta")}
                    </p>
                    <Link
                      href={`/${locale}/contact`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-warm-800 hover:text-brand-500 transition-colors whitespace-nowrap ml-3"
                    >
                      {t("progCTA")}
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LEARNING FORMAT ── */}
        <section className="hidden w-full py-20 md:py-28 bg-white border-b border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-14 space-y-3">
              <h2 className="text-3xl md:text-4xl font-bold text-warm-800">{t("formatTitle")}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Self-paced */}
              <div className="flex flex-col gap-4 p-8 bg-warm-100 rounded-3xl border border-warm-200">
                <div className="h-11 w-11 rounded-xl bg-white border border-warm-200 flex items-center justify-center shadow-sm">
                  <Clock className="h-5 w-5 text-warm-700" />
                </div>
                <h3 className="text-xl font-bold text-warm-800">{t("format1Title")}</h3>
                <p className="text-warm-700 text-sm leading-relaxed flex-1">{t("format1Desc")}</p>
              </div>
              {/* Instructor-led */}
              <div className="flex flex-col gap-4 p-8 bg-[#3A6EA5] text-white rounded-3xl border border-white/20">
                <div className="h-11 w-11 rounded-xl bg-white/15 flex items-center justify-center">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold">{t("format2Title")}</h3>
                <p className="text-white/75 text-sm leading-relaxed flex-1">{t("format2Desc")}</p>
                <p className="text-xs text-brand-300 font-semibold">{t("format2Extra")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── COHORT JOURNEY ── */}
        <section id="cohort-journey" className="w-full py-24 md:py-32 bg-info-50 border-b border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="text-center mb-16 space-y-3">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-warm-800">{t("journeyTitle")}</h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="relative border-l-2 border-warm-300 ml-4 md:ml-6 space-y-12 pb-8">
                {journeySteps.map((key, i) => (
                  <div key={key} className="relative pl-10 md:pl-16">
                    <span className="absolute -left-5 md:-left-6 top-0 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#3B7CB0] text-white font-bold text-sm md:text-base shadow-md ring-8 ring-info-50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold text-warm-800 mb-2 mt-1 md:mt-2">{t(`${key}Title` as Parameters<typeof t>[0])}</h3>
                    <p className="text-warm-700 leading-relaxed text-sm max-w-xl">{t(`${key}Desc` as Parameters<typeof t>[0])}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CERTIFICATION ── */}
        <section className="w-full py-20 md:py-28 bg-[#3A6EA5] text-white border-b border-white/20">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-5">{t("certTitle")}</h2>
                <p className="text-white/75 leading-relaxed text-lg mb-8">{t("certDesc")}</p>
                <div className="space-y-3">
                  {certItems.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-white" />
                      </div>
                      <span className="text-white/85 text-sm">{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/8 border border-white/15 rounded-3xl p-8 space-y-5">
                <h3 className="font-semibold text-lg mb-2">{t("detailsTitle")}</h3>
                {[
                  { label: t("detailCohortFreqLabel"), value: t("detailCohortFreqValue") },
                  { label: t("detailJoinWindowLabel"), value: t("detailJoinWindowValue") },
                  { label: t("detailCoursesLabel"), value: t("detailCoursesValue") },
                  { label: t("detailDeliveryLabel"), value: t("detailDeliveryValue") },
                  { label: t("detailBackedByLabel"), value: t("detailBackedByValue") },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-white/60 text-sm">{label}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="w-full py-20 md:py-24 bg-warm-100 border-t border-warm-300">
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px]">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-warm-800 mb-4">{t("ctaTitle")}</h2>
                <p className="text-warm-700 text-lg leading-relaxed">{t("ctaSubtitle")}</p>
              </div>
              <div>
                <LeadForm compact />
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
