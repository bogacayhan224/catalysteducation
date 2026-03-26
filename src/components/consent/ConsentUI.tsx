'use client';

/**
 * ConsentUI — convenience wrapper that renders both the banner and the modal.
 * Drop this anywhere inside <ConsentProvider> + <NextIntlClientProvider>.
 */

import { CookieBanner } from './CookieBanner';
import { CookiePreferencesModal } from './CookiePreferencesModal';

export function ConsentUI() {
  return (
    <>
      <CookieBanner />
      <CookiePreferencesModal />
    </>
  );
}
