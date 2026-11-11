import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  isModalOpen?: boolean;
}

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Global helper to trigger smooth scrolls via Lenis or fallback gracefully
 */
export function scrollToTarget(
  target: number | string | HTMLElement,
  options?: { offset?: number; duration?: number; immediate?: boolean }
) {
  if (typeof window !== 'undefined' && window.__lenis) {
    window.__lenis.scrollTo(target, {
      offset: options?.offset ?? -70,
      duration: options?.duration ?? 1.15,
      immediate: options?.immediate ?? false,
    });
  } else if (typeof window !== 'undefined') {
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' });
    } else if (typeof target === 'string') {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export const SmoothScroll: React.FC<SmoothScrollProps> = ({ isModalOpen = false }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with tuned physics for both trackpad momentum and mouse wheel increments
    const lenis = new Lenis({
      duration: 1.15, // Perfect sweet spot: not sluggish, yet silky smooth
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential deceleration
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true, // Smooths discrete notched mouse wheel ticks
      wheelMultiplier: 0.95, // Balanced wheel sensitivity
      touchMultiplier: 1.25, // Natural touchpad gesture response
      infinite: false,
      prevent: (node) => {
        // Prevent smooth scrolling when event is within an element marked with data-lenis-prevent
        return node.closest('[data-lenis-prevent]') !== null;
      },
    });

    lenisRef.current = lenis;
    window.__lenis = lenis;

    // Animation frame loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Intercept in-page hash links for unified Lenis scroll easing
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -70,
            duration: 1.2,
          });
        }
      } else if (href === '#') {
        e.preventDefault();
        lenis.scrollTo(0, { duration: 1.2 });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      delete window.__lenis;
    };
  }, []);

  // Handle modal open/close states
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isModalOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isModalOpen]);

  return null;
};
