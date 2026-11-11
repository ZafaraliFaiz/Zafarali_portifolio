import React, { useRef } from "react";
import { motion, useInView } from "motion/react";

export type ScatterDirection =
  | "left"
  | "right"
  | "bottom"
  | "top"
  | "random"
  | "tilt-left"
  | "tilt-right";

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
  className = "",
  direction = "bottom",
  delay = 0,
  duration = 0.55,
  threshold = 0.05,
  distance = 35,
  rotation = 2.5,
  scaleInitial = 0.96,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: "0px 0px -20px 0px",
  });

  // On mobile view, bypass all scatter & physics animations so scrolling is 100% native 120 FPS
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  // Calculate scattered initial offsets based on direction
  const getInitialTransforms = () => {
    switch (direction) {
      case "left":
        return {
          x: -distance,
          y: 0,
          rotate: -rotation,
          scale: scaleInitial,
        };
      case "right":
        return {
          x: distance,
          y: 0,
          rotate: rotation,
          scale: scaleInitial,
        };
      case "tilt-left":
        return {
          x: -distance * 0.35,
          y: distance,
          rotate: -rotation * 1.2,
          scale: scaleInitial,
        };
      case "tilt-right":
        return {
          x: distance * 0.35,
          y: distance,
          rotate: rotation * 1.2,
          scale: scaleInitial,
        };
      case "top":
        return { x: 0, y: -distance, rotate: 0, scale: scaleInitial };
      case "bottom":
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
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
