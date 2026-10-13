import { useState, useEffect, useRef } from 'react';

/**
 * useMouseParallax Hook
 * Returns smoothed, normalized coordinates (-1 to 1) from the center of the viewport.
 * Uses requestAnimationFrame with linear interpolation (lerp) for cinematic smoothness.
 */
export function useMouseParallax(damping = 0.08) {
  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
    rawX: 0,
    rawY: 0,
    isTouch: false,
  });

  const targetRef = useRef({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Check if touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setMouse((prev) => ({ ...prev, isTouch: true }));
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const halfWidth = window.innerWidth / 2;
      const halfHeight = window.innerHeight / 2;
      
      targetRef.current = {
        rawX: e.clientX,
        rawY: e.clientY,
        x: (e.clientX - halfWidth) / halfWidth,
        y: (e.clientY - halfHeight) / halfHeight,
      };
    };

    const update = () => {
      const target = targetRef.current;
      const current = currentRef.current;

      // Linear interpolation
      current.x += (target.x - current.x) * damping;
      current.y += (target.y - current.y) * damping;

      setMouse({
        x: current.x,
        y: current.y,
        rawX: target.rawX,
        rawY: target.rawY,
        isTouch: false,
      });

      rafId.current = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [damping]);

  return mouse;
}

/**
 * useScrollParallax Hook
 * Tracks scroll position and normalized progress (0 to 1) of the document.
 */
export function useScrollParallax() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    scrollProgress: 0,
    direction: 'down' as 'down' | 'up',
  });

  const lastScrollY = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafId.current) return;

      rafId.current = requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const maxScroll = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight
        );
        const progress = Math.min(1, Math.max(0, currentY / maxScroll));
        const dir = currentY >= lastScrollY.current ? 'down' : 'up';

        lastScrollY.current = currentY;
        setScrollData({
          scrollY: currentY,
          scrollProgress: progress,
          direction: dir,
        });

        rafId.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return scrollData;
}
