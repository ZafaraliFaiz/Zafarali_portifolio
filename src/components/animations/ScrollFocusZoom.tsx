import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

interface ScrollFocusZoomProps {
  children: React.ReactNode;
  className?: string;
  minScale?: number;
  maxScale?: number;
  enableGlow?: boolean;
  glowColor?: string;
}

export const ScrollFocusZoom: React.FC<ScrollFocusZoomProps> = ({
  children,
  className = '',
  minScale = 0.94,
  maxScale = 1.03,
  enableGlow = false,
  glowColor = 'rgba(14, 165, 233, 0.15)',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Scale curve:
  // 0.0 (entering viewport): minScale (e.g. 0.94)
  // 0.5 (dead center in viewport): maxScale (e.g. 1.03)
  // 1.0 (exiting viewport): minScale
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [minScale, 1.0, maxScale, 1.0, minScale * 1.02]
  );

  // Smooth spring physics for organic, non-linear feel
  const scale = useSpring(rawScale, {
    stiffness: 120,
    damping: 24,
    mass: 0.8,
  });

  // Dynamic opacity curve
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.75, 1, 1, 0.8]
  );

  const opacity = useSpring(rawOpacity, {
    stiffness: 120,
    damping: 24,
  });

  return (
    <motion.div
      ref={containerRef}
      style={{
        scale,
        opacity,
        boxShadow: enableGlow ? `0 20px 50px -10px ${glowColor}` : undefined,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
