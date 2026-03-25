export const GTM_ID = 'GTM-TM9N9RNW';
export const GA4_ID = 'G-83F13WGM3D';

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}

export function pageview(url: string) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'pageview',
    page: url,
  });
}

/**
 * Push a custom event to the dataLayer.
 * page_location and page_title are automatically included.
 * Pass any additional parameters (button_text, section_name, etc.) alongside `action`.
 */
export function event({
  action,
  ...params
}: { action: string } & Record<string, unknown>) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: action,
    page_location: window.location.href,
    page_title: document.title,
    ...params,
  });
}
