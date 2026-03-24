'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pageview, event } from '@/lib/gtm';

const SCROLL_DEPTHS = [50, 90];

export function GTMAnalytics() {
  const pathname = usePathname();
  const firedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    pageview(pathname);
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

  return null;
}
