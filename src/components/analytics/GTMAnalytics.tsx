'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pageview, event } from '@/lib/gtm';
import { onCLS, onINP, onLCP, onFCP, onTTFB } from 'web-vitals';

const SCROLL_DEPTHS = [50, 90];

function reportWebVitals() {
  const report = ({ name, value, id }: { name: string; value: number; id: string }) => {
    event({ action: 'web_vitals', metric_name: name, metric_value: Math.round(value), metric_id: id });
  };
  onCLS(report);
  onINP(report);
  onLCP(report);
  onFCP(report);
  onTTFB(report);
}

export function GTMAnalytics() {
  const pathname = usePathname();
  const firedDepths = useRef<Set<number>>(new Set());
  const vitalsFired = useRef(false);

  useEffect(() => {
    pageview(pathname);

    // GA4 direct pageview (send_page_view:false on init, so we fire manually)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    firedDepths.current = new Set();

    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);
      for (const depth of SCROLL_DEPTHS) {
        if (pct >= depth && !firedDepths.current.has(depth)) {
          firedDepths.current.add(depth);
          event({ action: 'scroll_depth', scroll_depth: `${depth}%` });
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  useEffect(() => {
    if (vitalsFired.current) return;
    vitalsFired.current = true;
    reportWebVitals();
  }, []);

  return null;
}
