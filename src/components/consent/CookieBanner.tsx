'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useConsent } from '@/contexts/ConsentContext';

export function CookieBanner() {
  const { showBanner, showPreferences, acceptAll, rejectAll, openPreferences } =
    useConsent();
  const t = useTranslations('cookieConsent');

  // Hide banner when the preferences modal is open to avoid overlap
  if (showPreferences) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          key="cookie-banner"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          role="dialog"
          aria-live="polite"
          aria-label={t('bannerTitle')}
          className="fixed bottom-0 left-0 right-0 z-50 bg-warm-800 border-t border-warm-700 shadow-2xl"
        >
          <div className="container mx-auto px-4 md:px-6 max-w-[1280px] py-4 md:py-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-warm-100 mb-1">
                  {t('bannerTitle')}
                </p>
                <p className="text-xs text-warm-400 leading-relaxed">
                  {t('bannerDescription')}{' '}
                  <button
                    onClick={openPreferences}
                    className="underline text-warm-300 hover:text-warm-100 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warm-300 rounded"
                  >
                    {t('managePreferences')}
                  </button>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-2 md:flex-nowrap md:shrink-0">
                <button
                  onClick={rejectAll}
                  className="text-xs text-warm-400 hover:text-warm-200 transition-colors px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warm-400"
                >
                  {t('rejectAll')}
                </button>
                <button
                  onClick={openPreferences}
                  className="text-xs text-warm-300 hover:text-warm-100 border border-warm-600 hover:border-warm-400 transition-colors px-3 py-2 rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-warm-300"
                >
                  {t('managePreferences')}
                </button>
                <button
                  onClick={acceptAll}
                  className="text-xs font-semibold bg-brand-500 hover:bg-brand-400 text-white px-4 py-2 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                >
                  {t('acceptAll')}
                </button>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
