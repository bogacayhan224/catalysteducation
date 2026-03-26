'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  getStoredConsent,
  storeConsent,
  type ConsentCategories,
  type ConsentState,
} from '@/lib/consent';

interface ConsentContextValue {
  /** Current consent state; null until localStorage has been checked */
  consent: ConsentState | null;
  /** true once the client-side localStorage check is complete */
  isReady: boolean;
  /** Whether the cookie banner should be visible */
  showBanner: boolean;
  /** Whether the preferences modal should be visible */
  showPreferences: boolean;
  /** Accept all optional categories */
  acceptAll: () => void;
  /** Reject all optional categories */
  rejectAll: () => void;
  /** Save granular category preferences */
  savePreferences: (categories: Omit<ConsentCategories, 'necessary'>) => void;
  /** Open the preferences modal (e.g. from the footer link) */
  openPreferences: () => void;
  /** Close the preferences modal without saving */
  closePreferences: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Read persisted consent once on mount (client-only)
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setConsent(stored);
    } else {
      setShowBanner(true);
    }
    setIsReady(true);
  }, []);

  const acceptAll = useCallback(() => {
    const state = storeConsent({ analytics: true, marketing: true, preferences: true });
    setConsent(state);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const rejectAll = useCallback(() => {
    const state = storeConsent({ analytics: false, marketing: false, preferences: false });
    setConsent(state);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const savePreferences = useCallback(
    (categories: Omit<ConsentCategories, 'necessary'>) => {
      const state = storeConsent(categories);
      setConsent(state);
      setShowBanner(false);
      setShowPreferences(false);
    },
    []
  );

  const openPreferences = useCallback(() => setShowPreferences(true), []);
  const closePreferences = useCallback(() => setShowPreferences(false), []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        isReady,
        showBanner,
        showPreferences,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within <ConsentProvider>');
  return ctx;
}
