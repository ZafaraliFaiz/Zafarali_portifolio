import React, { useRef, useState, useCallback } from "react";

interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
  glareOpacity?: number;
}

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
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    glareX: 50,
    glareY: 50,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const normX = (e.clientX - rect.left) / rect.width; // 0 to 1
      const normY = (e.clientY - rect.top) / rect.height; // 0 to 1

      // Calculate 3D tilt angles with subtle non-linear response
      const rotY = (normX - 0.5) * (maxTilt * 2);
      const rotX = (normY - 0.5) * -(maxTilt * 2);

      setTransform({
        rotateX: rotX,
        rotateY: rotY,
        scale,
        glareX: normX * 100,
        glareY: normY * 100,
        isHovered: true,
      });
    },
    [maxTilt, scale],
  );

  const handleMouseLeave = useCallback(() => {
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      glareX: 50,
      glareY: 50,
      isHovered: false,
    });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative will-change-transform ${className}`}
      style={{
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        transform: `perspective(${perspective}px) rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`,
        transition: transform.isHovered
          ? "transform 0.12s cubic-bezier(0.16, 1, 0.3, 1)"
          : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
      {...rest}
    >
      {/* Refined Specular Sheen Layer */}
      {glare && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-20 transition-opacity duration-300"
          style={{
            opacity: transform.isHovered ? 1 : 0,
            background: `radial-gradient(550px circle at ${transform.glareX}% ${transform.glareY}%, rgba(255, 255, 255, ${glareOpacity * 1.6}), rgba(240, 249, 255, ${glareOpacity * 0.6}) 40%, transparent 75%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};
