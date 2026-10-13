import React, { useRef, useState, useCallback } from 'react';

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
  className = '',
  maxTilt = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
  glareOpacity = 0.15,
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

      // Calculate 3D tilt angles
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
    [maxTilt, scale]
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
        transformStyle: 'preserve-3d',
        transform: `perspective(${perspective}px) rotateX(${transform.rotateX.toFixed(2)}deg) rotateY(${transform.rotateY.toFixed(2)}deg) scale3d(${transform.scale}, ${transform.scale}, 1)`,
        transition: transform.isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        ...style,
      }}
      {...rest}
    >
      {/* Glare Sheen Layer */}
      {glare && (
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none rounded-[inherit] overflow-hidden z-20 transition-opacity duration-300"
          style={{
            opacity: transform.isHovered ? 1 : 0,
            background: `radial-gradient(circle 320px at ${transform.glareX}% ${transform.glareY}%, rgba(56, 189, 248, ${glareOpacity}), rgba(129, 140, 248, ${glareOpacity * 0.5}) 40%, transparent 80%)`,
          }}
        />
      )}
      {children}
    </div>
  );
};
