'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useConsent } from '@/contexts/ConsentContext';
import type { ConsentCategories } from '@/lib/consent';

// ─── Toggle Switch ────────────────────────────────────────────────────────────

interface ToggleProps {
  id: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}

function Toggle({ id, checked, disabled, onChange }: ToggleProps) {
  return (
    <button
      id={id}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={[
        'relative inline-flex h-5 w-9 shrink-0 rounded-full border-2 border-transparent',
        'transition-colors duration-200',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
        disabled
          ? 'cursor-not-allowed bg-trust-500'
          : checked
            ? 'cursor-pointer bg-brand-500'
            : 'cursor-pointer bg-warm-400',
      ].join(' ')}
    >
      <span
        className={[
          'pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-sm',
          'ring-0 transition-transform duration-200',
          checked || disabled ? 'translate-x-4' : 'translate-x-0',
        ].join(' ')}
      />
    </button>
  );
}

// ─── Category Row ─────────────────────────────────────────────────────────────

interface CategoryRowProps {
  label: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  toggleId: string;
  alwaysActiveLabel: string;
  onChange: (value: boolean) => void;
}

function CategoryRow({
  label,
  description,
  checked,
  disabled,
  toggleId,
  alwaysActiveLabel,
  onChange,
}: CategoryRowProps) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-warm-300 last:border-0">
      <div className="flex-1 min-w-0">
        <label
          htmlFor={toggleId}
          className="text-sm font-semibold text-warm-800 block cursor-pointer"
        >
          {label}
        </label>
        <p className="text-xs text-warm-600 mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="shrink-0 mt-0.5 flex items-center gap-2">
        {disabled ? (
          <span className="text-xs font-medium text-trust-500 whitespace-nowrap">
            {alwaysActiveLabel}
          </span>
        ) : (
          <Toggle
            id={toggleId}
            checked={checked}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export function CookiePreferencesModal() {
  const { consent, showPreferences, acceptAll, rejectAll, savePreferences, closePreferences } =
    useConsent();
  const t = useTranslations('cookieConsent');
  const locale = useLocale();

  const [local, setLocal] = useState<Omit<ConsentCategories, 'necessary'>>({
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Sync toggles with current consent whenever the modal opens
  useEffect(() => {
    if (showPreferences) {
      setLocal({
        analytics: consent?.categories.analytics ?? false,
        marketing: consent?.categories.marketing ?? false,
        preferences: consent?.categories.preferences ?? false,
      });
    }
  }, [showPreferences, consent]);

  const handleSave = () => savePreferences(local);

  // Close on Escape
  useEffect(() => {
    if (!showPreferences) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closePreferences();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [showPreferences, closePreferences]);

  return (
    <AnimatePresence>
      {showPreferences && (
        <>
          {/* Backdrop */}
          <motion.div
            key="consent-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePreferences}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="consent-modal"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            role="dialog"
            aria-modal="true"
            aria-label={t('modalTitle')}
            className={[
              'fixed z-50 bg-warm-50 rounded-2xl shadow-2xl overflow-hidden',
              'inset-x-4 top-1/2 -translate-y-1/2',
              'md:left-1/2 md:-translate-x-1/2 md:inset-x-auto md:w-full md:max-w-lg',
            ].join(' ')}
          >
            {/* Header */}
            <div className="flex items-start justify-between px-6 py-4 border-b border-warm-300">
              <div>
                <h2 className="font-semibold text-warm-800 text-base">
                  {t('modalTitle')}
                </h2>
                <p className="text-xs text-warm-600 mt-0.5">{t('modalDescription')}</p>
              </div>
              <button
                onClick={closePreferences}
                aria-label="Close"
                className="ml-4 shrink-0 text-warm-500 hover:text-warm-800 transition-colors p-1 rounded-full hover:bg-warm-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-400"
              >
                <X size={18} />
              </button>
            </div>

            {/* Categories */}
            <div className="px-6 py-0 max-h-[55vh] overflow-y-auto">
              <CategoryRow
                toggleId="consent-necessary"
                label={t('necessary')}
                description={t('necessaryDescription')}
                checked={true}
                disabled={true}
                alwaysActiveLabel={t('alwaysActive')}
                onChange={() => {}}
              />
              <CategoryRow
                toggleId="consent-analytics"
                label={t('analytics')}
                description={t('analyticsDescription')}
                checked={local.analytics}
                alwaysActiveLabel={t('alwaysActive')}
                onChange={(v) => setLocal((prev) => ({ ...prev, analytics: v }))}
              />
              <CategoryRow
                toggleId="consent-marketing"
                label={t('marketing')}
                description={t('marketingDescription')}
                checked={local.marketing}
                alwaysActiveLabel={t('alwaysActive')}
                onChange={(v) => setLocal((prev) => ({ ...prev, marketing: v }))}
              />
              <CategoryRow
                toggleId="consent-preferences"
                label={t('preferences')}
                description={t('preferencesDescription')}
                checked={local.preferences}
                alwaysActiveLabel={t('alwaysActive')}
                onChange={(v) => setLocal((prev) => ({ ...prev, preferences: v }))}
              />
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-warm-300 flex flex-wrap items-center justify-between gap-3">
              <a
                href={`/${locale}/privacy`}
                className="text-xs text-warm-500 hover:text-brand-500 transition-colors underline"
              >
                {t('privacyPolicy')}
              </a>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={rejectAll}
                  className="text-xs text-warm-600 hover:text-warm-800 border border-warm-300 hover:border-warm-500 transition-colors px-3 py-1.5 rounded-lg"
                >
                  {t('rejectAll')}
                </button>
                <button
                  onClick={acceptAll}
                  className="text-xs text-warm-600 hover:text-warm-800 border border-warm-300 hover:border-warm-500 transition-colors px-3 py-1.5 rounded-lg"
                >
                  {t('acceptAll')}
                </button>
                <button
                  onClick={handleSave}
                  className="text-xs font-semibold bg-brand-500 hover:bg-brand-400 text-white px-4 py-1.5 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                >
                  {t('savePreferences')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
