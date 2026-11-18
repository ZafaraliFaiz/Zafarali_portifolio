import React, { useState, useEffect, useRef } from "react";
import { useMouseParallax, useScrollParallax } from "../hooks/useParallax";

// Deep Space Star structure
interface DeepSpaceStar {
  xNorm: number;
  yNorm: number;
  size: number;
  brightness: number;
  color: string;
  hasSpike: boolean;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useMouseParallax(0.06);
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;
  const { scrollY } = useScrollParallax();

  // Toggle for Full Cosmos Mode
  const [isFullCosmos, setIsFullCosmos] = useState(false);
  const isFullCosmosRef = useRef(false);
  isFullCosmosRef.current = isFullCosmos;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Pre-rendered offscreen space canvas (allocated once)
    const spaceCanvas = document.createElement("canvas");
    spaceCanvas.width = width;
    spaceCanvas.height = height;
    const spaceCtx = spaceCanvas.getContext("2d");

    // -----------------------------------------------------------------
    // 1. Constellation Network Particles (Disabled on Mobile, 45 on Desktop)
    // -----------------------------------------------------------------
    const particleCount = isMobile ? 0 : 45;

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
        radius: Math.random() * 2.0 + 0.8,
        alpha: Math.random() * 0.45 + 0.25,
        depth: Math.random() * 0.8 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    // -----------------------------------------------------------------
    // 2. Universal Deep Space Field (Pre-rendered for Cosmos Mode)
    // -----------------------------------------------------------------
    const deepSpaceStars: DeepSpaceStar[] = [];
    const spectralColors = [
      "rgba(255, 255, 255, ",
      "rgba(224, 242, 254, ", // Cyan-white O/B class
      "rgba(254, 240, 138, ", // Amber-gold G class
      "rgba(216, 180, 254, ", // Violet stellar nebula
    ];

    const deepStarCount = isMobile ? 80 : 260;
    for (let i = 0; i < deepStarCount; i++) {
      const colorBase = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      deepSpaceStars.push({
        xNorm: Math.random(),
        yNorm: Math.random(),
        size: Math.random() < 0.88 ? Math.random() * 1.1 + 0.4 : Math.random() * 2.2 + 1.2,
        brightness: Math.random() * 0.5 + 0.5,
        color: colorBase,
        hasSpike: Math.random() < 0.03,
      });
    }

    // Pre-render the deep cosmic starfield once into spaceCanvas
    const drawSpaceCanvas = () => {
      if (!spaceCtx) return;
      spaceCtx.fillStyle = "#010206";
      spaceCtx.fillRect(0, 0, width, height);

      // Deep galactic dust radial gradient
      const dustGrad = spaceCtx.createRadialGradient(
        width * 0.5, height * 0.45, 60,
        width * 0.5, height * 0.45, Math.max(width, height) * 0.65
      );
      dustGrad.addColorStop(0, "rgba(30, 27, 75, 0.4)");
      dustGrad.addColorStop(0.45, "rgba(15, 23, 42, 0.3)");
      dustGrad.addColorStop(1, "rgba(1, 2, 6, 0.98)");
      spaceCtx.fillStyle = dustGrad;
      spaceCtx.fillRect(0, 0, width, height);

      // Stars
      for (let i = 0; i < deepSpaceStars.length; i++) {
        const star = deepSpaceStars[i];
        const sx = star.xNorm * width;
        const sy = star.yNorm * height;

        spaceCtx.beginPath();
        spaceCtx.arc(sx, sy, star.size, 0, Math.PI * 2);
        spaceCtx.fillStyle = `${star.color}${star.brightness})`;
        spaceCtx.fill();

        if (star.hasSpike) {
          spaceCtx.beginPath();
          spaceCtx.moveTo(sx - star.size * 2.8, sy);
          spaceCtx.lineTo(sx + star.size * 2.8, sy);
          spaceCtx.moveTo(sx, sy - star.size * 2.8);
          spaceCtx.lineTo(sx, sy + star.size * 2.8);
          spaceCtx.strokeStyle = "rgba(255, 255, 255, 0.65)";
          spaceCtx.lineWidth = 0.75;
          spaceCtx.stroke();
        }
      }
    };

    drawSpaceCanvas();

    const handleResize = () => {
      if (!canvas) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      if (Math.abs(newW - width) > 40 || Math.abs(newH - height) > 150) {
        width = canvas.width = spaceCanvas.width = newW;
        height = canvas.height = spaceCanvas.height = newH;
        drawSpaceCanvas();
      }
    };

    window.addEventListener("resize", handleResize);

    let lastScrollY = window.scrollY;

    // -----------------------------------------------------------------
    // MAIN RENDER LOOP (Hardware-Accelerated 120 FPS)
    // -----------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const scrollDelta = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;

      // If full cosmos mode is active, draw the deep space background
      if (isFullCosmosRef.current) {
        ctx.drawImage(spaceCanvas, 0, 0);
      }

      // Constellation Network Particles (Desktop only - 45 particles for locked 120 FPS)
      if (!isMobile && particles.length > 0) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;

        const renderedParticles = particles.map((p) => {
          p.x += p.vx;
          p.y += p.vy - scrollDelta * p.depth;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const px = p.x + mx * 34 * p.depth;
          const py = p.y + my * 34 * p.depth;

          return { ...p, px, py };
        });

        for (let i = 0; i < renderedParticles.length; i++) {
          const p1 = renderedParticles[i];
          p1.alpha += Math.sin(Date.now() * p1.pulseSpeed) * 0.005;
          const clampedAlpha = Math.max(0.18, Math.min(0.8, p1.alpha));

          // Draw particle node with vivid depth coloring
          ctx.beginPath();
          ctx.arc(p1.px, p1.py, p1.radius * p1.depth, 0, Math.PI * 2);
          ctx.fillStyle =
            p1.depth > 0.6
              ? `rgba(2, 132, 199, ${clampedAlpha * 1.35})`
              : `rgba(99, 102, 241, ${clampedAlpha * 1.25})`;
          ctx.fill();

          // Connect nearby particles with luminous cyan lines
          for (let j = i + 1; j < renderedParticles.length; j++) {
            const p2 = renderedParticles[j];
            const dx = p1.px - p2.px;
            const dy = p1.py - p2.py;
            const dist = Math.hypot(dx, dy);

            if (dist < 140) {
              const lineAlpha = (1 - dist / 140) * 0.3;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.strokeStyle = `rgba(14, 165, 233, ${lineAlpha})`;
              ctx.lineWidth = 1.0;
              ctx.stroke();
            }
          }

          // Magnetic mouse aura beam (Desktop only)
          if (mouseRef.current.rawX > 0) {
            const mdx = p1.px - mouseRef.current.rawX;
            const mdy = p1.py - mouseRef.current.rawY;
            const mdist = Math.hypot(mdx, mdy);
            if (mdist < 165) {
              const mouseLineAlpha = (1 - mdist / 165) * 0.45;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(mouseRef.current.rawX, mouseRef.current.rawY);
              ctx.strokeStyle = `rgba(147, 51, 234, ${mouseLineAlpha})`;
              ctx.lineWidth = 1.2;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      spaceCanvas.width = spaceCanvas.height = 0;
    };
  }, []);

  // Compute smooth parallax offsets for DOM layers (Desktop only)
  const isTouchDevice = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);
  const mouseXOffset = isTouchDevice ? 0 : mouse.x * 35;
  const mouseYOffset = isTouchDevice ? 0 : mouse.y * 35;

  useEffect(() => {
    document.documentElement.classList.toggle("cosmos-active", isFullCosmos);
  }, [isFullCosmos]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1. Interactive Cursor Ambient Spotlight */}
        {!isTouchDevice && mouse.rawX > 0 && (
          <div
            aria-hidden="true"
            className={`absolute rounded-full transition-opacity duration-300 pointer-events-none ${
              isFullCosmos ? "opacity-0" : "opacity-100"
            }`}
            style={{
              left: `${mouse.rawX}px`,
              top: `${mouse.rawY}px`,
              width: "800px",
              height: "800px",
              transform: "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, rgba(14, 165, 233, 0.24) 0%, rgba(99, 102, 241, 0.14) 40%, rgba(217, 70, 239, 0.06) 60%, transparent 75%)",
            }}
          />
        )}

        {/* 2. Parallax Nebula Glows reacting to scroll & mouse depth */}
        {/* Top Left Electric Blue & Sky Glow (Hero) */}
        <div
          className={`absolute -top-40 -left-40 w-[44rem] h-[44rem] bg-gradient-to-br from-cyan-400/35 via-sky-500/30 to-blue-600/20 rounded-full blur-[110px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${-mouseXOffset * 1.3}px, ${-scrollY * 0.12 - mouseYOffset * 1.1}px, 0)`,
          }}
        />

        {/* Top Right Royal Violet & Indigo Glow (Hero) */}
        <div
          className={`absolute top-10 -right-40 w-[42rem] h-[42rem] bg-gradient-to-bl from-indigo-500/35 via-purple-500/30 to-pink-500/20 rounded-full blur-[120px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${mouseXOffset * 1.6}px, ${-scrollY * 0.18 + mouseYOffset * 1.3}px, 0)`,
          }}
        />

        {/* Mid-Page Vibrant Azure Glow */}
        <div
          className={`absolute top-1/2 left-1/4 w-[48rem] h-[48rem] bg-gradient-to-r from-blue-400/30 via-indigo-400/25 to-sky-300/25 rounded-full blur-[130px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${-mouseXOffset * 0.9}px, ${-scrollY * 0.25 - mouseYOffset * 0.9}px, 0)`,
          }}
        />

        {/* Bottom Emerald & Cyan Glow */}
        <div
          className={`absolute bottom-10 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-tr from-emerald-400/35 via-teal-400/30 to-cyan-400/25 rounded-full blur-[110px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${mouseXOffset * 1.2}px, ${-scrollY * 0.2 + mouseYOffset}px, 0)`,
          }}
        />

        {/* 3. Parallax Floating Cyber Crosshairs & Tech Glyphs */}
        <div
          className={`absolute top-80 sm:top-50 left-4 lg:left-8 text-sky-700/60 font-mono text-[11px] font-bold tracking-wider select-none will-change-transform hidden sm:block bg-sky-100/60 px-2 py-0.5 rounded border border-sky-300/60 transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${-mouseXOffset * 1.5}px, ${-scrollY * 0.28 - mouseYOffset * 1.2}px, 0)`,
          }}
        >
          + 01_PARALLAX_GRID
        </div>

        <div
          className={`absolute top-1/2 right-6 lg:right-12 text-indigo-700/60 font-mono text-[11px] font-bold tracking-wider select-none will-change-transform hidden sm:block bg-indigo-100/60 px-2 py-0.5 rounded border border-indigo-300/60 transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${mouseXOffset * 1.5}px, ${-scrollY * 0.32 + mouseYOffset * 1.2}px, 0)`,
          }}
        >
          ◈ // REACT_19_ENGINE
        </div>

        <div
          className={`absolute top-2/3 left-1/4 text-emerald-700/60 font-mono text-xs font-bold tracking-wider select-none will-change-transform hidden sm:block bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300/60 transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${-mouseXOffset * 1.4}px, ${-scrollY * 0.3 - mouseYOffset * 1.2}px, 0)`,
          }}
        >
          ◆ OFFLINE_FIRST_ACTIVE
        </div>

        {/* 4. Subtle Cyber Grid with Mouse Tilt */}
        <div
          className={`absolute inset-0 bg-grid-pattern pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-20" : "opacity-65"
          }`}
          style={{
            transform: `translate3d(${mouseXOffset * 0.3}px, ${scrollY * 0.05 + mouseYOffset * 0.3}px, 0)`,
          }}
        />

        {/* 5. Cosmic Canvas (Constellation Math & Deep Space Toggle) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Floating Interactive Cosmos Mode Switcher */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
        <button
          id="cosmos-toggle-btn"
          onClick={() => setIsFullCosmos((prev) => !prev)}
          className={`group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 shadow-xl backdrop-blur-xl border cursor-pointer ${
            isFullCosmos
              ? "bg-slate-950/92 text-cyan-300 border-cyan-400/60 shadow-cyan-500/25 hover:border-cyan-300 hover:scale-105"
              : "bg-white/92 text-slate-800 border-slate-300/80 shadow-slate-900/10 hover:border-indigo-400 hover:text-indigo-600 hover:scale-105"
          }`}
          title="Toggle Deep Space Cosmos View"
        >
          <span
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              isFullCosmos
                ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse"
                : "bg-indigo-600"
            }`}
          />
          <span>{isFullCosmos ? "Cosmos Active" : "Cosmos Mode"}</span>
          <span className="text-[10px] opacity-60">✨</span>
        </button>
      </div>
    </>
  );
};
