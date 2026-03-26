'use client';

/**
 * ConsentAwareScripts
 *
 * Renders GTM + GA4 Script tags ONLY when the user has consented to analytics.
 * Moving these scripts here (vs. unconditionally in layout.tsx) is the core
 * mechanism that prevents tracking before consent is given.
 *
 * To add a new script (e.g. Meta Pixel, HubSpot Pixel):
 *   1. Add a consent check for the appropriate category
 *   2. Render the <Script> tag inside that block
 */

import Script from 'next/script';
import { useConsent } from '@/contexts/ConsentContext';
import { GTM_ID, GA4_ID } from '@/lib/gtm';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export function ConsentAwareScripts() {
  const { consent, isReady } = useConsent();

  // Wait until localStorage has been checked to avoid a race condition
  // where scripts flash-load before we know the user's preference.
  if (!isReady) return null;

  const analyticsAllowed = consent?.categories.analytics === true;

  return (
    <>
      {/* ── Analytics (GTM + GA4) ──────────────────────────────────────── */}
      {analyticsAllowed && (
        <>
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          {IS_PRODUCTION && (
            <>
              <Script
                id="ga4-script"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
              />
              <Script
                id="ga4-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}',{send_page_view:false});`,
                }}
              />
            </>
          )}
        </>
      )}

      {/* ── Marketing (Meta Pixel, HubSpot Pixel, etc.) ───────────────── */}
      {/* When adding marketing scripts, gate them on:
          consent?.categories.marketing === true
          Example:
          {consent?.categories.marketing && (
            <Script id="meta-pixel" strategy="afterInteractive" ... />
          )} */}
    </>
  );
}
