import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

export type ScatterDirection = 'left' | 'right' | 'bottom' | 'top' | 'random' | 'tilt-left' | 'tilt-right';

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
}

export const ScrollAssemble: React.FC<ScrollAssembleProps> = ({
  children,
  className = '',
  direction = 'bottom',
  delay = 0,
  duration = 0.7,
  threshold = 0.15,
  distance = 50,
  rotation = 4,
  scaleInitial = 0.94,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: false,
    amount: threshold,
  });

  // Calculate scattered initial offsets based on direction
  const getInitialTransforms = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: distance * 0.4, rotate: -rotation, scale: scaleInitial };
      case 'right':
        return { x: distance, y: distance * 0.4, rotate: rotation, scale: scaleInitial };
      case 'tilt-left':
        return { x: -distance * 0.5, y: distance, rotate: -rotation * 1.5, scale: scaleInitial };
      case 'tilt-right':
        return { x: distance * 0.5, y: distance, rotate: rotation * 1.5, scale: scaleInitial };
      case 'top':
        return { x: 0, y: -distance, rotate: 0, scale: scaleInitial };
      case 'bottom':
      default:
        return { x: 0, y: distance, rotate: 0, scale: scaleInitial };
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
      className={className}
    >
      {children}
    </motion.div>
  );
};
