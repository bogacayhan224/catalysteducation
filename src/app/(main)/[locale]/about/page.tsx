"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("about");
  const locale = useLocale();

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* About Hero */}
        <section className="bg-brand-900 text-white py-20 lg:py-28 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[#162a66] opacity-50 bg-[linear-gradient(to_right,#1b327b_1px,transparent_1px),linear-gradient(to_bottom,#1b327b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="container relative z-10 px-4 md:px-6 mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">{t("heroTitle")}</h1>
            <p className="max-w-[700px] mx-auto text-brand-100 text-lg md:text-xl leading-relaxed">
              {t("heroSubtitle")}
            </p>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl font-bold text-zinc-900 mb-6">{t("missionTitle")}</h2>
                <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
                  <p>{t("mission1")}</p>
                  <p>{t("mission2")}</p>
                  <p>{t("mission3")}</p>
                </div>
              </div>
              <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-2xl relative">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-accent-500 text-white p-3 rounded-full shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-brand-900 mb-4">{t("differenceTitle")}</h3>
                <ul className="space-y-4 text-zinc-600">
                  {(t.raw("differenceItems") as string[]).map((item: string, i: number) => (
                    <li key={i} className="flex items-start">
                      <span className="h-6 w-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mr-3 mt-0.5 shrink-0 text-sm font-bold">{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="py-20 bg-zinc-50 border-t border-zinc-200">
          <div className="container px-4 md:px-6 mx-auto max-w-4xl">
            <h2 className="text-3xl font-bold text-zinc-900 mb-12 text-center">{t("leadershipTitle")}</h2>
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-zinc-100 flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="aspect-square bg-zinc-200 rounded-xl overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center text-zinc-400 font-medium bg-zinc-100">
                    {t("photoPlaceholder")}
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-zinc-900">{t("leaderName")}</h3>
                <p className="text-brand-600 font-medium mb-4">{t("leaderRole")}</p>
                <div className="space-y-4 text-zinc-600 leading-relaxed text-base">
                  <p>{t("leaderBio1")}</p>
                  <p>{t("leaderBio2")}</p>
                  <p>{t("leaderBio3")}</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Link
                href={`/${locale}/#consultation`}
                className="inline-flex h-12 items-center justify-center rounded-md bg-brand-600 px-8 text-base font-bold text-white shadow-sm transition-transform hover:bg-brand-500 hover:-translate-y-0.5"
              >
                {t("ctaButton")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
