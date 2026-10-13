import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  decimals?: number;
  duration?: number; // milliseconds
  prefix?: string;
  suffix?: string;
  className?: string;
  requireScroll?: boolean;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  from = 0,
  to,
  decimals = 0,
  duration = 1800,
  prefix = '',
  suffix = '',
  className = '',
  requireScroll = true,
}) => {
  const [currentValue, setCurrentValue] = useState<number>(from);
  const [hasScrolledDown, setHasScrolledDown] = useState<boolean>(!requireScroll);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Detect scroll down before allowing counter to fire
  useEffect(() => {
    if (!requireScroll) {
      setHasScrolledDown(true);
      return;
    }

    const checkScroll = () => {
      if (window.scrollY > 30) {
        setHasScrolledDown(true);
      }
    };

    // If page was loaded already scrolled
    if (window.scrollY > 30) {
      setHasScrolledDown(true);
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, [requireScroll]);

  const startAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth deceleration curve
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = from + (to - from) * easeProgress;

      setCurrentValue(val);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(to);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (!hasScrolledDown) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          // Reset to initial 'from' when completely scrolled out of view, so it animates when scrolling back in
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          setCurrentValue(from);
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -30px 0px' }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasScrolledDown, from, to, duration]);

  const formattedValue = decimals > 0 
    ? currentValue.toFixed(decimals) 
    : Math.round(currentValue).toString();

  return (
    <span ref={elementRef} className={className}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};
