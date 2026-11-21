import React, { useState, useEffect, useRef } from "react";
import { useMouseParallax } from "../hooks/useParallax";

// Deep Space Star structure
interface DeepSpaceStar {
  xNorm: number;
  yNorm: number;
  size: number;
  brightness: number;
  color: string;
  hasSpike: boolean;
}

// Bright Spiral Galaxy Star structure
interface GalaxyStar {
  rNorm: number;
  baseAngle: number;
  scatterXNorm: number;
  scatterYNorm: number;
  size: number;
  brightness: number;
  color: string;
  hasSpike: boolean;
  twinkleSpeed: number;
}

// Glowing Interstellar Nebula Gas Cloud structure
interface NebulaCloud {
  rNorm: number;
  baseAngle: number;
  scatterXNorm: number;
  scatterYNorm: number;
  radiusNorm: number;
  color: string;
  alpha: number;
  pulseSpeed: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useMouseParallax(0.06);
  const mouseRef = useRef(mouse);
  mouseRef.current = mouse;

  // Toggle for Full Cosmos Mode with localStorage persistence
  const [isFullCosmos, setIsFullCosmos] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    try {
      return localStorage.getItem("portfolio-cosmos-mode") === "true";
    } catch {
      return false;
    }
  });

  const isFullCosmosRef = useRef(isFullCosmos);
  isFullCosmosRef.current = isFullCosmos;

  const toggleCosmos = () => {
    setIsFullCosmos((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("portfolio-cosmos-mode", String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.classList.toggle("cosmos-active", isFullCosmos);
    return () => {
      document.documentElement.classList.remove("cosmos-active");
    };
  }, [isFullCosmos]);

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
    // 1. Constellation Network Particles (Active in Normal Mode, Desktop only)
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

    // -----------------------------------------------------------------
    // 3. Normalized Grand Spiral Galaxy Model (Resolution-Independent)
    // -----------------------------------------------------------------
    const galaxyStars: GalaxyStar[] = [];
    const nebulaClouds: NebulaCloud[] = [];

    const galaxyStarCount = isMobile ? 320 : 880;
    const nebulaCount = isMobile ? 18 : 36;

    const galaxyColors = [
      "rgba(255, 255, 255, ", // Brilliant core diamond
      "rgba(254, 240, 138, ", // Solar gold
      "rgba(251, 146, 60, ",  // Warm amber
      "rgba(244, 114, 182, ", // Radiant magenta/rose
      "rgba(192, 132, 252, ", // Luminous violet
      "rgba(56, 189, 248, ",  // Electric cyan
      "rgba(96, 165, 250, ",  // Celestial azure
    ];

    // Generate Luminous Interstellar Gas Clouds along Spiral Arms (Normalized)
    for (let i = 0; i < nebulaCount; i++) {
      const armIdx = i % 2;
      const armOffset = armIdx * Math.PI;
      const distFraction = Math.pow((i + 1) / nebulaCount, 0.85);
      const rNorm = distFraction * 0.95;
      const spiralAngle = Math.pow(rNorm, 0.72) * 4.4;
      const baseAngle = armOffset + spiralAngle;
      const spreadNorm = (1 - rNorm) * 0.18 + 0.02;
      const scatterXNorm = (Math.random() - 0.5) * spreadNorm;
      const scatterYNorm = (Math.random() - 0.5) * spreadNorm;

      let color = "rgba(56, 189, 248, ";
      if (rNorm < 0.22) {
        color = "rgba(254, 240, 138, ";
      } else if (rNorm < 0.55) {
        color = i % 2 === 0 ? "rgba(236, 72, 153, " : "rgba(168, 85, 247, ";
      } else {
        color = i % 2 === 0 ? "rgba(56, 189, 248, " : "rgba(99, 102, 241, ";
      }

      nebulaClouds.push({
        rNorm,
        baseAngle,
        scatterXNorm,
        scatterYNorm,
        radiusNorm: Math.random() * 0.07 + 0.08,
        color,
        alpha: Math.random() * 0.10 + 0.08,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Generate Stars along Major Spiral Arms and Inter-arm Spurs (Normalized)
    const arms = 4;
    for (let i = 0; i < galaxyStarCount; i++) {
      const isMajorArm = i % 4 < 2;
      const armIdx = i % arms;
      const armOffset = (armIdx * 2 * Math.PI) / arms;

      const distExp = isMajorArm ? 1.6 : 1.3;
      const distFraction = Math.pow(Math.random(), distExp);
      const maxRNorm = isMajorArm ? 1.0 : 0.80;
      const rNorm = distFraction * maxRNorm;

      // Logarithmic spiral angle calculation
      const spiralAngle = Math.pow(rNorm, 0.72) * 4.4;
      const baseAngle = armOffset + spiralAngle;

      const spreadCoeff = isMajorArm ? 0.22 : 0.30;
      const spreadNorm = (1 - rNorm) * spreadCoeff + 0.015;
      const scatterXNorm = (Math.random() - 0.5) * spreadNorm;
      const scatterYNorm = (Math.random() - 0.5) * spreadNorm;

      let color = galaxyColors[0];
      if (rNorm < 0.16) {
        color = Math.random() < 0.6 ? galaxyColors[0] : galaxyColors[1];
      } else if (rNorm < 0.38) {
        color = Math.random() < 0.5 ? galaxyColors[1] : galaxyColors[2];
      } else if (rNorm < 0.68) {
        color = Math.random() < 0.5 ? galaxyColors[3] : galaxyColors[4];
      } else {
        color = Math.random() < 0.5 ? galaxyColors[5] : galaxyColors[6];
      }

      const isCore = rNorm < 0.14;
      const size = isCore
        ? Math.random() * 2.0 + 1.0
        : Math.random() < 0.08
          ? Math.random() * 1.8 + 1.1 // Prominent bright supergiant
          : Math.random() * 1.3 + 0.5; // Normal field star
      const brightness = isCore
        ? Math.random() * 0.25 + 0.65
        : Math.random() * 0.40 + 0.35;

      galaxyStars.push({
        rNorm,
        baseAngle,
        scatterXNorm,
        scatterYNorm,
        size,
        brightness,
        color,
        hasSpike: isCore ? Math.random() < 0.16 : Math.random() < 0.02,
        twinkleSpeed: Math.random() * 0.035 + 0.015,
      });
    }

    let galaxyRotation = 0;
    const galaxyTilt = -0.42; // ~-24 deg tilt
    const cosTilt = Math.cos(galaxyTilt);
    const sinTilt = Math.sin(galaxyTilt);

    const handleResize = () => {
      if (!canvas) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      width = canvas.width = spaceCanvas.width = newW;
      height = canvas.height = spaceCanvas.height = newH;
      drawSpaceCanvas();
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

      // ===============================================================
      // A. FULL COSMOS MODE: Deep Space Starfield & Revolving Galaxy
      // ===============================================================
      if (isFullCosmosRef.current) {
        ctx.drawImage(spaceCanvas, 0, 0);

        // Responsive galaxy radius based on current viewport
        const baseDim = Math.max(width * 0.54, Math.min(width, height) * 0.70);
        const galaxyRadius = baseDim * (isMobile ? 0.54 : 0.60);

        // Center coordinates for the rotating galaxy with scroll and mouse parallax
        const gcx = width * 0.52 + mouseRef.current.x * 24;
        const gcy = height * 0.44 - currentScrollY * 0.12 + mouseRef.current.y * 18;

        // 1. Draw Multi-Layered Radiant Galactic Bulge & Ambient Halo
        ctx.save();
        ctx.translate(gcx, gcy);
        ctx.rotate(galaxyTilt);
        ctx.scale(1, 0.52);

        // a. Soft Outer Galactic Halo
        const outerHalo = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxyRadius * 0.90);
        outerHalo.addColorStop(0, "rgba(99, 102, 241, 0.16)");
        outerHalo.addColorStop(0.35, "rgba(56, 189, 248, 0.11)");
        outerHalo.addColorStop(0.65, "rgba(147, 51, 234, 0.06)");
        outerHalo.addColorStop(1, "rgba(1, 2, 6, 0)");
        ctx.beginPath();
        ctx.arc(0, 0, galaxyRadius * 0.90, 0, Math.PI * 2);
        ctx.fillStyle = outerHalo;
        ctx.fill();

        // b. Mid-Disc Luminous Nebula Glow
        const discGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxyRadius * 0.55);
        discGlow.addColorStop(0, "rgba(254, 240, 138, 0.52)");
        discGlow.addColorStop(0.18, "rgba(244, 114, 182, 0.38)");
        discGlow.addColorStop(0.42, "rgba(56, 189, 248, 0.28)");
        discGlow.addColorStop(0.72, "rgba(99, 102, 241, 0.12)");
        discGlow.addColorStop(1, "rgba(1, 2, 6, 0)");
        ctx.beginPath();
        ctx.arc(0, 0, galaxyRadius * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = discGlow;
        ctx.fill();

        // c. Refined Core Bulge
        const coreBulge = ctx.createRadialGradient(0, 0, 0, 0, 0, galaxyRadius * 0.22);
        coreBulge.addColorStop(0, "rgba(255, 255, 255, 0.88)");
        coreBulge.addColorStop(0.18, "rgba(254, 240, 138, 0.76)");
        coreBulge.addColorStop(0.45, "rgba(251, 146, 60, 0.52)");
        coreBulge.addColorStop(0.75, "rgba(236, 72, 153, 0.30)");
        coreBulge.addColorStop(1, "rgba(1, 2, 6, 0)");
        ctx.beginPath();
        ctx.arc(0, 0, galaxyRadius * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = coreBulge;
        ctx.fill();

        ctx.restore();

        galaxyRotation += 0.0008;
        const now = Date.now();

        // 2. Draw Rotating Interstellar Nebula Gas Clouds along the Spiral Arms
        for (let i = 0; i < nebulaClouds.length; i++) {
          const cloud = nebulaClouds[i];
          const curAngle = cloud.baseAngle + galaxyRotation;
          const cloudR = cloud.rNorm * galaxyRadius;
          const rawX = Math.cos(curAngle) * cloudR + cloud.scatterXNorm * galaxyRadius;
          const rawY = Math.sin(curAngle) * cloudR + cloud.scatterYNorm * galaxyRadius;

          const tiltedX = rawX * cosTilt - (rawY * 0.52) * sinTilt;
          const tiltedY = rawX * sinTilt + (rawY * 0.52) * cosTilt;

          const cx = gcx + tiltedX;
          const cy = gcy + tiltedY;

          const pulse = Math.sin(now * cloud.pulseSpeed + i) * 0.03;
          const cloudAlpha = Math.max(0.04, Math.min(0.22, cloud.alpha + pulse));
          const cloudRadius = cloud.radiusNorm * galaxyRadius;

          const cloudGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cloudRadius);
          cloudGrad.addColorStop(0, `${cloud.color}${cloudAlpha})`);
          cloudGrad.addColorStop(0.5, `${cloud.color}${cloudAlpha * 0.4})`);
          cloudGrad.addColorStop(1, `${cloud.color}0)`);

          ctx.beginPath();
          ctx.arc(cx, cy, cloudRadius, 0, Math.PI * 2);
          ctx.fillStyle = cloudGrad;
          ctx.fill();
        }

        // 3. Draw Revolving Stars along Spiral Arms
        for (let i = 0; i < galaxyStars.length; i++) {
          const star = galaxyStars[i];
          const curAngle = star.baseAngle + galaxyRotation;
          const starR = star.rNorm * galaxyRadius;
          const rawX = Math.cos(curAngle) * starR + star.scatterXNorm * galaxyRadius;
          const rawY = Math.sin(curAngle) * starR + star.scatterYNorm * galaxyRadius;

          const tiltedX = rawX * cosTilt - (rawY * 0.52) * sinTilt;
          const tiltedY = rawX * sinTilt + (rawY * 0.52) * cosTilt;

          const sx = gcx + tiltedX;
          const sy = gcy + tiltedY;

          const twinkle = Math.sin(now * star.twinkleSpeed + i) * 0.18;
          const alpha = Math.max(0.18, Math.min(0.95, star.brightness + twinkle));

          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${alpha})`;
          ctx.fill();

          if (star.hasSpike) {
            ctx.beginPath();
            ctx.moveTo(sx - star.size * 2.8, sy);
            ctx.lineTo(sx + star.size * 2.8, sy);
            ctx.moveTo(sx, sy - star.size * 2.8);
            ctx.lineTo(sx, sy + star.size * 2.8);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // 4. Draw Tasteful Core Diffraction Lens Flare
        const coreFlareAlpha = 0.65 + Math.sin(now * 0.002) * 0.08;
        ctx.save();
        ctx.translate(gcx, gcy);

        // Core central starburst flare
        ctx.beginPath();
        ctx.moveTo(-28, 0);
        ctx.lineTo(28, 0);
        ctx.moveTo(0, -28);
        ctx.lineTo(0, 28);
        ctx.strokeStyle = `rgba(255, 255, 255, ${coreFlareAlpha * 0.55})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Diagonal soft flare
        ctx.beginPath();
        ctx.moveTo(-14, -14);
        ctx.lineTo(14, 14);
        ctx.moveTo(-14, 14);
        ctx.lineTo(14, -14);
        ctx.strokeStyle = `rgba(254, 240, 138, ${coreFlareAlpha * 0.4})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      }

      // ===============================================================
      // B. NORMAL LIGHT MODE: Constellation Network Particles & Beams
      // (Desktop only, automatically paused in Cosmos Mode)
      // ===============================================================
      if (!isFullCosmosRef.current && !isMobile && particles.length > 0) {
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

  const isTouchDevice = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1. Hardware-Accelerated Cosmic Canvas (Space, Galaxy & Constellations) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

        {/* 2. Interactive Cursor Ambient Spotlight (Normal Mode) */}
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

        {/* 3. Parallax Nebula Glows (Normal Mode) */}
        <div
          className={`absolute -top-40 -left-40 w-[44rem] h-[44rem] bg-gradient-to-br from-cyan-400/35 via-sky-500/30 to-blue-600/20 rounded-full blur-[110px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${-mouse.x * 40}px, ${-mouse.y * 35}px, 0)`,
          }}
        />

        <div
          className={`absolute top-10 -right-40 w-[42rem] h-[42rem] bg-gradient-to-bl from-indigo-500/35 via-purple-500/30 to-pink-500/20 rounded-full blur-[120px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${mouse.x * 45}px, ${mouse.y * 40}px, 0)`,
          }}
        />

        <div
          className={`absolute top-1/2 left-1/4 w-[48rem] h-[48rem] bg-gradient-to-r from-blue-400/30 via-indigo-400/25 to-sky-300/25 rounded-full blur-[130px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${-mouse.x * 30}px, ${-mouse.y * 30}px, 0)`,
          }}
        />

        <div
          className={`absolute bottom-10 right-1/4 w-[40rem] h-[40rem] bg-gradient-to-tr from-emerald-400/35 via-teal-400/30 to-cyan-400/25 rounded-full blur-[110px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
          style={{
            transform: `translate3d(${mouse.x * 35}px, ${mouse.y * 30}px, 0)`,
          }}
        />

        {/* 4. Parallax Floating Cyber Crosshairs & Tech Glyphs (Normal Mode) */}
        <div
          className={`absolute top-80 sm:top-50 left-4 lg:left-8 text-sky-700/60 font-mono text-[11px] font-bold tracking-wider select-none will-change-transform hidden sm:block bg-sky-100/60 px-2 py-0.5 rounded border border-sky-300/60 transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
        >
          + 01_PARALLAX_GRID
        </div>

        <div
          className={`absolute top-1/2 right-6 lg:right-12 text-indigo-700/60 font-mono text-[11px] font-bold tracking-wider select-none will-change-transform hidden sm:block bg-indigo-100/60 px-2 py-0.5 rounded border border-indigo-300/60 transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
        >
          ◈ // REACT_19_ENGINE
        </div>

        <div
          className={`absolute top-2/3 left-1/4 text-emerald-700/60 font-mono text-xs font-bold tracking-wider select-none will-change-transform hidden sm:block bg-emerald-100/60 px-2 py-0.5 rounded border border-emerald-300/60 transition-opacity duration-700 ${
            isFullCosmos ? "opacity-0" : "opacity-100"
          }`}
        >
          ◆ OFFLINE_FIRST_ACTIVE
        </div>

        {/* 5. Subtle Cyber Grid */}
        <div
          className={`absolute inset-0 bg-grid-pattern pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-15" : "opacity-60"
          }`}
        />
      </div>

      {/* Floating Interactive Cosmos Mode Switcher */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
        <button
          id="cosmos-toggle-btn"
          onClick={toggleCosmos}
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
