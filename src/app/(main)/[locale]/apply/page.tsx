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
        <section className="container px-4 md:px-6 mx-auto mt-12 mb-12">
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-zinc-200 overflow-hidden p-2">
            <iframe
              data-tally-src="https://tally.so/embed/Y5d6zz?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
              loading="lazy"
              width="100%"
              height="0"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              title="Application Form"
            ></iframe>
          </div>

          {/* Tally Script */}
          <Script id="tally-js" strategy="afterInteractive">
            {`
              var d=document,w="https://tally.so/widgets/embed.js",v=function(){"undefined"!=typeof Tally?Tally.loadEmbeds():d.querySelectorAll("iframe[data-tally-src]:not([src])").forEach((function(e){e.src=e.dataset.tallySrc}))};if("undefined"!=typeof Tally)v();else if(d.querySelector('script[src="'+w+'"]')==null){var s=d.createElement("script");s.src=w,s.onload=v,s.onerror=v,d.body.appendChild(s);}
            `}
          </Script>
        </section>
      </main>
    </div>
  );
}
