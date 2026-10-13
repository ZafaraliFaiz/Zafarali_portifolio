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
    let smoothMouseNormX = 0;
    let smoothMouseNormY = 0;

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

      // Smooth mouse normalized coordinates for multi-plane parallax drift
      const targetNormX = (mouseX > 0 ? (mouseX / width) - 0.5 : 0) * 2;
      const targetNormY = (mouseY > 0 ? (mouseY / height) - 0.5 : 0) * 2;
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.05;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.05;

      // Compute rendered coordinates with individual layer-depth mouse parallax
      const renderedParticles = particles.map((p) => {
        // Base velocity + vertical scroll offset
        p.x += p.vx;
        p.y += p.vy - scrollDelta * p.depth;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // 3D Parallax offset based on particle depth layer
        const px = p.x + smoothMouseNormX * 36 * p.depth;
        const py = p.y + smoothMouseNormY * 36 * p.depth;

        return { ...p, px, py };
      });

      // Draw constellation connections and nodes
      for (let i = 0; i < renderedParticles.length; i++) {
        const p1 = renderedParticles[i];

        p1.alpha += Math.sin(Date.now() * p1.pulseSpeed) * 0.005;
        const clampedAlpha = Math.max(0.15, Math.min(0.8, p1.alpha));

        // Draw particle node with vivid depth coloring for bright background
        ctx.beginPath();
        ctx.arc(p1.px, p1.py, p1.radius * p1.depth, 0, Math.PI * 2);
        ctx.fillStyle = p1.depth > 0.6 
          ? `rgba(2, 132, 199, ${clampedAlpha * 1.35})` 
          : `rgba(99, 102, 241, ${clampedAlpha * 1.25})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < renderedParticles.length; j++) {
          const p2 = renderedParticles[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const lineAlpha = (1 - dist / 140) * 0.28;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(14, 165, 233, ${lineAlpha})`;
            ctx.lineWidth = 0.95;
            ctx.stroke();
          }
        }

        // Mouse connection beam & magnetic aura
        const mdx = p1.px - mouseX;
        const mdy = p1.py - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 170) {
          const mouseLineAlpha = (1 - mdist / 170) * 0.5;
          ctx.beginPath();
          ctx.moveTo(p1.px, p1.py);
          ctx.lineTo(mouseX, mouseY);
          ctx.strokeStyle = `rgba(147, 51, 234, ${mouseLineAlpha})`;
          ctx.lineWidth = 1.3;
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
            width: '720px',
            height: '720px',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12) 0%, rgba(99, 102, 241, 0.06) 45%, transparent 75%)',
          }}
        />
      )}

      {/* 2. Parallax Nebula Glows reacting to scroll & mouse depth */}
      {/* Top Left Cyan Glow */}
      <div
        className="absolute -top-40 -left-40 w-[38rem] h-[38rem] bg-sky-400/22 rounded-full blur-[120px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${-mouseXOffset * 1.2}px, ${(-scrollY * 0.12) - mouseYOffset * 1.1}px, 0)`,
        }}
      />

      {/* Top Right Violet Glow */}
      <div
        className="absolute top-20 -right-40 w-[36rem] h-[36rem] bg-indigo-400/18 rounded-full blur-[130px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mouseXOffset * 1.5}px, ${(-scrollY * 0.18) + mouseYOffset * 1.3}px, 0)`,
        }}
      />

      {/* Mid-Page Purple / Sky Glow */}
      <div
        className="absolute top-1/2 left-1/3 w-[42rem] h-[42rem] bg-purple-400/15 rounded-full blur-[140px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${-mouseXOffset * 0.8}px, ${(-scrollY * 0.25) - mouseYOffset * 0.9}px, 0)`,
        }}
      />

      {/* Bottom Emerald Glow */}
      <div
        className="absolute bottom-10 right-1/4 w-[34rem] h-[34rem] bg-emerald-400/16 rounded-full blur-[120px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mouseXOffset * 1.1}px, ${(-scrollY * 0.2) + mouseYOffset}px, 0)`,
        }}
      />

      {/* 3. Parallax Floating Cyber Crosshairs & Tech Glyphs */}
      <div
        className="absolute top-28 left-16 text-sky-700/35 font-mono text-sm select-none will-change-transform hidden sm:block"
        style={{
          transform: `translate3d(${-mouseXOffset * 1.8}px, ${(-scrollY * 0.35) - mouseYOffset * 1.5}px, 0)`,
        }}
      >
        + 01_PARALLAX_GRID
      </div>

      <div
        className="absolute top-1/3 right-24 text-indigo-700/35 font-mono text-xs select-none will-change-transform hidden sm:block"
        style={{
          transform: `translate3d(${mouseXOffset * 2.2}px, ${(-scrollY * 0.4) + mouseYOffset * 1.8}px, 0)`,
        }}
      >
        ◈ // REACT_19_ENGINE
      </div>

      <div
        className="absolute top-2/3 left-1/4 text-emerald-700/35 font-mono text-xs select-none will-change-transform hidden sm:block"
        style={{
          transform: `translate3d(${-mouseXOffset * 1.4}px, ${(-scrollY * 0.3) - mouseYOffset * 1.2}px, 0)`,
        }}
      >
        ◆ OFFLINE_FIRST_ACTIVE
      </div>

      {/* 4. Subtle Cyber Grid with Mouse Tilt */}
      <div 
        className="absolute inset-0 bg-grid-pattern opacity-65 pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(${mouseXOffset * 0.3}px, ${(scrollY * 0.05) + mouseYOffset * 0.3}px, 0)`,
        }}
      />

      {/* 5. Interactive Physics Constellation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};
