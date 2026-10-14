import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';

export type ScatterDirection = 'left' | 'right' | 'bottom' | 'top' | 'random' | 'tilt-left' | 'tilt-right';

// Global scroll direction tracker shared across all instances
let globalScrollDir: 'down' | 'up' = 'down';
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
const scrollListeners = new Set<(dir: 'down' | 'up') => void>();

if (typeof window !== 'undefined') {
  window.addEventListener(
    'scroll',
    () => {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY;
      if (Math.abs(diff) > 4) {
        const newDir = diff > 0 ? 'down' : 'up';
        if (newDir !== globalScrollDir) {
          globalScrollDir = newDir;
          scrollListeners.forEach((cb) => cb(newDir));
        }
        lastScrollY = currentY;
      }
    },
    { passive: true }
  );
}

interface ScrollAssembleProps {
  children: React.ReactNode;
  className?: string;
  direction?: ScatterDirection;
  delay?: number;
  duration?: number;
  threshold?: number;
  distance?: number;
  rotation?: number;
  scaleInitial?: number;
  once?: boolean;
}

export const ScrollAssemble: React.FC<ScrollAssembleProps> = ({
  children,
  className = '',
  direction = 'bottom',
  delay = 0,
  duration = 0.65,
  threshold = 0.08,
  distance = 45,
  rotation = 3.5,
  scaleInitial = 0.95,
  once = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollDir, setScrollDir] = useState<'down' | 'up'>(globalScrollDir);

  useEffect(() => {
    const handleDirChange = (dir: 'down' | 'up') => setScrollDir(dir);
    scrollListeners.add(handleDirChange);
    return () => {
      scrollListeners.delete(handleDirChange);
    };
  }, []);

  const isInView = useInView(ref, {
    once,
    amount: threshold,
    margin: '0px 0px -40px 0px',
  });

  // Calculate scattered initial offsets based on direction and current scroll direction
  const getInitialTransforms = () => {
    // If user is scrolling up, reverse the Y vector so cards slide DOWN into place from top
    const effectiveDistance = scrollDir === 'down' ? distance : -distance;
    const rotSign = scrollDir === 'down' ? 1 : -1;

    switch (direction) {
      case 'left':
        return { x: -distance, y: effectiveDistance * 0.35, rotate: -rotation * rotSign, scale: scaleInitial };
      case 'right':
        return { x: distance, y: effectiveDistance * 0.35, rotate: rotation * rotSign, scale: scaleInitial };
      case 'tilt-left':
        return { x: -distance * 0.35, y: effectiveDistance, rotate: -rotation * 1.2 * rotSign, scale: scaleInitial };
      case 'tilt-right':
        return { x: distance * 0.35, y: effectiveDistance, rotate: rotation * 1.2 * rotSign, scale: scaleInitial };
      case 'top':
        return { x: 0, y: -distance, rotate: 0, scale: scaleInitial };
      case 'bottom':
      default:
        return { x: 0, y: effectiveDistance, rotate: 0, scale: scaleInitial };
    }
  };

  const initial = {
    ...getInitialTransforms(),
    opacity: 0,
  };

  const assembled = {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? assembled : initial}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Apple-style cinematic ease-out
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
