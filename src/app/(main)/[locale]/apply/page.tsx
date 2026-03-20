"use client";

import { useTranslations } from "next-intl";
import Script from "next/script";

export default function ApplyPage() {
  const t = useTranslations("apply");

  return (
    <div className="flex flex-col min-h-screen bg-zinc-50">
      <main className="flex-1 pb-24">
        {/* Header Section */}
        <section className="bg-white border-b border-zinc-200 py-16 text-center">
          <div className="container px-4 md:px-6 mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
              {t("title")}
            </h1>
            <p className="max-w-[700px] mx-auto text-lg text-zinc-600">
              {t("subtitle")}
            </p>
          </div>
        </section>

        {/* Tally Embed Section */}
        <section className="container px-4 md:px-6 mx-auto mt-12">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden min-h-[600px] relative">
            <iframe
              data-tally-src="https://tally.so/embed/YOUR_FORM_ID?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="400"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Application Form"
              className="absolute inset-0 w-full h-full"
            ></iframe>
            
            {/* Tally Script */}
            <Script id="tally-js" strategy="lazyOnload">
              {`
                var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
              `}
            </Script>
            
            <div className="absolute inset-0 flex items-center justify-center -z-10 bg-zinc-50">
              <div className="flex flex-col items-center gap-3 text-zinc-400">
                <svg className="h-8 w-8 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm font-medium">{t("loading")}</span>
              </div>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto mt-8 p-6 bg-brand-50 border border-brand-100 rounded-xl text-center">
            <h3 className="font-semibold text-brand-900 mb-2">Notice for the Admin</h3>
            <p className="text-brand-800 text-sm">
              Please replace <code>YOUR_FORM_ID</code> in <code>src/app/[locale]/apply/page.tsx</code> with the actual Tally form ID after creating it on Tally.so.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
