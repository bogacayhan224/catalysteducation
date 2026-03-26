/**
 * Consent Management — storage & type definitions
 *
 * Version bump (CONSENT_VERSION) forces re-consent when the policy changes.
 * All reads/writes go through getStoredConsent() / storeConsent() so the
 * storage key & version are encapsulated here.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences';

export interface ConsentCategories {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface ConsentState {
  /** Bump this when cookie policy changes to force re-consent */
  version: number;
  /** Unix timestamp (ms) of when consent was recorded */
  timestamp: number;
  /** true once the user has actively made a choice (accept / reject / save) */
  given: boolean;
  categories: ConsentCategories;
}

const CONSENT_KEY = 'catalyst_consent';
const CONSENT_VERSION = 1;

export const DEFAULT_CATEGORIES: Omit<ConsentCategories, 'necessary'> = {
  analytics: false,
  marketing: false,
  preferences: false,
};

export function getStoredConsent(): ConsentState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    // Stale version → treat as no consent so banner re-appears
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function storeConsent(
  categories: Omit<ConsentCategories, 'necessary'>
): ConsentState {
  const state: ConsentState = {
    version: CONSENT_VERSION,
    timestamp: Date.now(),
    given: true,
    categories: { necessary: true, ...categories },
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  }
  return state;
}

export function clearConsent(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CONSENT_KEY);
  }
}
