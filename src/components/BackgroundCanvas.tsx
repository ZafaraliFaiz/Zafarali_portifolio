import React, { useEffect, useRef } from 'react';
import { useMouseParallax, useScrollParallax } from '../hooks/useParallax';

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useMouseParallax(0.06);
  const { scrollY } = useScrollParallax();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle nodes for cyber constellation
    const particleCount = Math.min(Math.floor((width * height) / 20000), 65);
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      depth: number;
      pulseSpeed: number;
    }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.2,
        depth: Math.random() * 0.8 + 0.2, // Layer depth multiplier
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let lastScrollY = window.scrollY;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const scrollDelta = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;

      // Draw subtle connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Apply velocities + scroll parallax offset
        p1.x += p1.vx;
        p1.y += p1.vy - scrollDelta * p1.depth;

        // Wrap around boundaries
        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        p1.alpha += Math.sin(Date.now() * p1.pulseSpeed) * 0.005;
        const clampedAlpha = Math.max(0.12, Math.min(0.7, p1.alpha));

        // Draw particle with depth coloring
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius * p1.depth, 0, Math.PI * 2);
        ctx.fillStyle = p1.depth > 0.6 
          ? `rgba(56, 189, 248, ${clampedAlpha})` 
          : `rgba(129, 140, 248, ${clampedAlpha * 0.8})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 135) {
            const lineAlpha = (1 - dist / 135) * 0.15;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Mouse interaction line & gentle push
        const mdx = p1.x - mouseX;
        const mdy = p1.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 150) {
          const mouseLineAlpha = (1 - mdist / 150) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(168, 85, 247, ${mouseLineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute smooth parallax offsets for DOM layers
  const mouseXOffset = mouse.x * 35;
  const mouseYOffset = mouse.y * 35;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Interactive Cursor Ambient Spotlight */}
      {!mouse.isTouch && mouse.rawX > 0 && (
        <div
          aria-hidden="true"
          className="absolute rounded-full transition-opacity duration-500 pointer-events-none"
          style={{
            left: `${mouse.rawX}px`,
            top: `${mouse.rawY}px`,
            width: '700px',
            height: '700px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, rgba(99, 102, 241, 0.04) 45%, transparent 75%)',
          }}
        />
      )}

      {/* 2. Parallax Nebula Glows reacting to scroll & mouse depth */}
      {/* Top Left Cyan Glow */}
      <div
        className="absolute -top-40 -left-40 w-[36rem] h-[36rem] bg-cyan-500/12 rounded-full blur-[110px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${-mouseXOffset * 1.2}px, ${(-scrollY * 0.12) - mouseYOffset * 1.1}px, 0)`,
        }}
      />

      {/* Top Right Violet Glow */}
      <div
        className="absolute top-20 -right-40 w-[34rem] h-[34rem] bg-indigo-600/15 rounded-full blur-[120px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mouseXOffset * 1.5}px, ${(-scrollY * 0.18) + mouseYOffset * 1.3}px, 0)`,
        }}
      />

      {/* Mid-Page Purple / Sky Glow */}
      <div
        className="absolute top-1/2 left-1/3 w-[42rem] h-[42rem] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${-mouseXOffset * 0.8}px, ${(-scrollY * 0.25) - mouseYOffset * 0.9}px, 0)`,
        }}
      />

      {/* Bottom Emerald Glow */}
      <div
        className="absolute bottom-10 right-1/4 w-[32rem] h-[32rem] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mouseXOffset * 1.1}px, ${(-scrollY * 0.2) + mouseYOffset}px, 0)`,
        }}
      />

      {/* 3. Parallax Floating Cyber Crosshairs & Tech Glyphs */}
      <div
        className="absolute top-28 left-16 text-cyan-500/20 font-mono text-sm select-none will-change-transform hidden sm:block"
        style={{
          transform: `translate3d(${-mouseXOffset * 1.8}px, ${(-scrollY * 0.35) - mouseYOffset * 1.5}px, 0)`,
        }}
      >
        + 01_PARALLAX_GRID
      </div>

      <div
        className="absolute top-1/3 right-24 text-indigo-400/20 font-mono text-xs select-none will-change-transform hidden sm:block"
        style={{
          transform: `translate3d(${mouseXOffset * 2.2}px, ${(-scrollY * 0.4) + mouseYOffset * 1.8}px, 0)`,
        }}
      >
        ◈ // REACT_19_ENGINE
      </div>

      <div
        className="absolute top-2/3 left-1/4 text-emerald-400/20 font-mono text-xs select-none will-change-transform hidden sm:block"
        style={{
          transform: `translate3d(${-mouseXOffset * 1.4}px, ${(-scrollY * 0.3) - mouseYOffset * 1.2}px, 0)`,
        }}
      >
        ◆ OFFLINE_FIRST_ACTIVE
      </div>

      {/* 4. Subtle Cyber Grid with Mouse Tilt */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-55 pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mouseXOffset * 0.3}px, ${(scrollY * 0.05) + mouseYOffset * 0.3}px, 0)`,
        }}
      />

      {/* 5. Interactive Physics Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
