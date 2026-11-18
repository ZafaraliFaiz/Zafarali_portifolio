import React, { useRef, useCallback, useEffect } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareOpacity?: number;
}

/**
 * TiltCard
 * High-performance 3D tilt component powered by direct DOM updates + requestAnimationFrame.
 * Eliminates 60-144Hz React component tree re-renders during cursor hovering, ensuring
 * buttery-smooth 120 FPS micro-interactions.
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = "",
  maxTilt = 3.5,
  perspective = 1400,
  scale = 1.008,
  glare = true,
  glareOpacity = 0.08,
  style,
  ...rest
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || "ontouchstart" in window);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const normX = (e.clientX - rect.left) / rect.width; // 0 to 1
      const normY = (e.clientY - rect.top) / rect.height; // 0 to 1

      // Calculate 3D tilt angles
      const rotY = ((normX - 0.5) * (maxTilt * 2)).toFixed(2);
      const rotX = ((normY - 0.5) * -(maxTilt * 2)).toFixed(2);
      const gx = (normX * 100).toFixed(1);
      const gy = (normY * 100).toFixed(1);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (cardRef.current) {
          cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(${scale}, ${scale}, 1)`;
          cardRef.current.style.transition = "transform 0.1s cubic-bezier(0.16, 1, 0.3, 1)";
        }
        if (glareRef.current) {
          glareRef.current.style.opacity = "1";
          glareRef.current.style.background = `radial-gradient(550px circle at ${gx}% ${gy}%, rgba(255, 255, 255, ${glareOpacity * 1.6}), rgba(240, 249, 255, ${glareOpacity * 0.6}) 40%, transparent 75%)`;
        }
      });
    },
    [maxTilt, scale, perspective, glareOpacity, isMobile],
  );

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        cardRef.current.style.transition = "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
      }
      if (glareRef.current) {
        glareRef.current.style.opacity = "0";
      }
    });
  }, [perspective, isMobile]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isMobile) {
    return (
      <div ref={cardRef} className={className} style={style} {...rest}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
      {...rest}
    >
      {/* Refined Specular Sheen Layer */}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-20 transition-opacity duration-300 opacity-0"
          style={{
            background: `radial-gradient(550px circle at 50% 50%, rgba(255, 255, 255, ${glareOpacity * 1.6}), rgba(240, 249, 255, ${glareOpacity * 0.6}) 40%, transparent 75%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};
