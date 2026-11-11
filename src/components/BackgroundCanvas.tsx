import React, { useState, useEffect, useRef } from "react";
import { useMouseParallax, useScrollParallax } from "../hooks/useParallax";

// Section-specific color themes for dynamic background transitions across the website
interface SectionTheme {
  progress: number;
  name: string;
  primary: [number, number, number];    // RGB primary
  secondary: [number, number, number];  // RGB secondary
  accent: [number, number, number];     // RGB accent
}

const SECTION_THEMES: SectionTheme[] = [
  // 0.00: Hero (Electric Cyan & Royal Violet)
  {
    progress: 0.0,
    name: "Hero",
    primary: [14, 165, 233],   // Sky 500
    secondary: [99, 102, 241], // Indigo 500
    accent: [6, 182, 212],     // Cyan 500
  },
  // 0.14: Hanging ID & Intro
  {
    progress: 0.14,
    name: "Intro",
    primary: [99, 102, 241],   // Indigo 500
    secondary: [168, 85, 247], // Purple 500
    accent: [14, 165, 233],    // Sky 500
  },
  // 0.28: Journey (Horizontal Scrollytelling)
  {
    progress: 0.28,
    name: "Journey",
    primary: [79, 70, 229],    // Indigo 600
    secondary: [217, 70, 239], // Fuchsia 500
    accent: [6, 182, 212],     // Cyan 500
  },
  // 0.42: Architecture Visualizer (Quantum Azure & Bright Teal)
  {
    progress: 0.42,
    name: "Architecture",
    primary: [2, 132, 199],    // Sky 600
    secondary: [16, 185, 129], // Emerald 500
    accent: [20, 184, 166],    // Teal 500
  },
  // 0.56: Technical Showcase (Emerald Green & Vermillion / Warm Amber theme)
  {
    progress: 0.56,
    name: "Projects",
    primary: [5, 150, 105],    // Emerald 600
    secondary: [227, 66, 52],  // Vermillion
    accent: [245, 158, 11],    // Amber 500
  },
  // 0.70: Experience Deck (Celestial Sapphire & Mint)
  {
    progress: 0.70,
    name: "Experience",
    primary: [37, 99, 235],    // Blue 600
    secondary: [16, 185, 129], // Emerald 500
    accent: [99, 102, 241],    // Indigo 500
  },
  // 0.80: Verified Capabilities (Neon Emerald & Cyan)
  {
    progress: 0.80,
    name: "Skills",
    primary: [16, 185, 129],   // Emerald 500
    secondary: [6, 182, 212],  // Cyan 500
    accent: [245, 158, 11],    // Amber 500
  },
  // 0.88: Academic Research (Deep Amethyst & Quantum Magenta)
  {
    progress: 0.88,
    name: "Research",
    primary: [147, 51, 234],   // Purple 600
    secondary: [236, 72, 153], // Pink 500
    accent: [99, 102, 241],    // Indigo 500
  },
  // 0.94: Education Foundations (Emerald & Azure)
  {
    progress: 0.94,
    name: "Education",
    primary: [5, 150, 105],    // Emerald 600
    secondary: [2, 132, 199],  // Sky 600
    accent: [16, 185, 129],    // Emerald 500
  },
  // 1.00: Direct Contact & Footer (Hyper Azure & Electric Violet)
  {
    progress: 1.0,
    name: "Contact",
    primary: [14, 165, 233],   // Sky 500
    secondary: [99, 102, 241], // Indigo 500
    accent: [168, 85, 247],    // Purple 500
  },
];

// Linear interpolation helper between two RGB tuples
function lerpColor(
  c1: [number, number, number],
  c2: [number, number, number],
  t: number
): [number, number, number] {
  return [
    Math.round(c1[0] + (c2[0] - c1[0]) * t),
    Math.round(c1[1] + (c2[1] - c1[1]) * t),
    Math.round(c1[2] + (c2[2] - c1[2]) * t),
  ];
}

// Computes smoothly blended section color palette based on current document scroll progress
function getThemeForProgress(p: number) {
  const clamped = Math.max(0, Math.min(1, p));
  let start = SECTION_THEMES[0];
  let end = SECTION_THEMES[SECTION_THEMES.length - 1];

  for (let i = 0; i < SECTION_THEMES.length - 1; i++) {
    if (clamped >= SECTION_THEMES[i].progress && clamped <= SECTION_THEMES[i + 1].progress) {
      start = SECTION_THEMES[i];
      end = SECTION_THEMES[i + 1];
      break;
    }
  }

  const span = end.progress - start.progress;
  const t = span === 0 ? 0 : (clamped - start.progress) / span;

  return {
    name: t < 0.5 ? start.name : end.name,
    primary: lerpColor(start.primary, end.primary, t),
    secondary: lerpColor(start.secondary, end.secondary, t),
    accent: lerpColor(start.accent, end.accent, t),
  };
}

// Deep Space Star structure
interface DeepSpaceStar {
  xNorm: number;
  yNorm: number;
  size: number;
  brightness: number;
  color: string;
  twinkleSpeed: number;
  hasSpike: boolean;
}

// Fluid ink droplet structure for organic tear-through mask
interface InkDrop {
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  alpha: number;
  decay: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useMouseParallax(0.06);
  const { scrollProgress } = useScrollParallax();
  const scrollProgressRef = useRef(0);
  scrollProgressRef.current = scrollProgress;

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

    // Offscreen canvas 1: Deep pitch-black space + galaxy stars
    const spaceCanvas = document.createElement("canvas");
    spaceCanvas.width = width;
    spaceCanvas.height = height;
    const spaceCtx = spaceCanvas.getContext("2d");

    // Offscreen canvas 2: Fluid organic ink reveal mask
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = width;
    maskCanvas.height = height;
    const maskCtx = maskCanvas.getContext("2d");

    // Offscreen canvas 3: Masked composite reveal layer
    const revealCanvas = document.createElement("canvas");
    revealCanvas.width = width;
    revealCanvas.height = height;
    const revealCtx = revealCanvas.getContext("2d");

    const handleResize = () => {
      if (!canvas) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      if (Math.abs(newW - width) > 40 || Math.abs(newH - height) > 150) {
        width = canvas.width = spaceCanvas.width = maskCanvas.width = revealCanvas.width = newW;
        height = canvas.height = spaceCanvas.height = maskCanvas.height = revealCanvas.height = newH;
      }
    };

    window.addEventListener("resize", handleResize);

    // -----------------------------------------------------------------
    // 1. Constellation Network Particles (Disabled on Mobile for Maximum Smoothness)
    // -----------------------------------------------------------------
    const particleCount = isMobile
      ? 0 // Completely removed on mobile view
      : Math.min(Math.floor((width * height) / 16000), 75);

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
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        radius: Math.random() * 2.8 + 1.4,
        alpha: Math.random() * 0.5 + 0.45,
        depth: Math.random() * 0.8 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    // -----------------------------------------------------------------
    // 2. Universal Deep Space Field
    // -----------------------------------------------------------------
    const deepSpaceStars: DeepSpaceStar[] = [];
    const spectralColors = [
      "rgba(255, 255, 255, ",
      "rgba(224, 242, 254, ", // Cyan-white O/B class
      "rgba(254, 240, 138, ", // Amber-gold G class
      "rgba(216, 180, 254, ", // Violet stellar nebula
    ];

    const deepStarCount = isMobile ? 120 : 420;
    for (let i = 0; i < deepStarCount; i++) {
      const colorBase = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      deepSpaceStars.push({
        xNorm: Math.random(),
        yNorm: Math.random(),
        size: Math.random() < 0.85 ? Math.random() * 1.3 + 0.5 : Math.random() * 2.6 + 1.6,
        brightness: Math.random() * 0.6 + 0.4,
        color: colorBase,
        twinkleSpeed: Math.random() * 0.003 + 0.001,
        hasSpike: Math.random() < 0.04,
      });
    }

    // -----------------------------------------------------------------
    // 3. Fluid Ink Drops for Organic Tear-Through Reveal
    // -----------------------------------------------------------------
    const inkDrops: InkDrop[] = [];

    let mouseX = -1000;
    let mouseY = -1000;
    let smoothMouseNormX = 0;
    let smoothMouseNormY = 0;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let lastMoveTime = 0;

    // Trigger fluid ink droplet on pointer movement
    const triggerInkReveal = (clientX: number, clientY: number) => {
      const now = performance.now();
      const prevX = lastMouseX < 0 ? clientX : lastMouseX;
      const prevY = lastMouseY < 0 ? clientY : lastMouseY;
      const dx = clientX - prevX;
      const dy = clientY - prevY;
      const dist = Math.hypot(dx, dy);
      const dt = Math.max(1, now - lastMoveTime);
      const speed = Math.min(10, dist / dt);

      mouseX = clientX;
      mouseY = clientY;

      // Expand fluid ink reveal along pointer movement
      if (dist > 14 || inkDrops.length === 0) {
        lastMouseX = clientX;
        lastMouseY = clientY;
        lastMoveTime = now;

        const maxR = 320;
        const minR = 160;
        const targetRadius = Math.min(maxR, Math.max(minR, 160 + speed * 60));
        const steps = Math.min(5, Math.max(1, Math.floor(dist / 24)));

        for (let step = 1; step <= steps; step++) {
          const interpX = prevX + (clientX - prevX) * (step / steps);
          const interpY = prevY + (clientY - prevY) * (step / steps);

          inkDrops.push({
            x: interpX,
            y: interpY,
            radius: targetRadius * 0.45,
            targetRadius,
            alpha: 1.0,
            decay: 0.004,
          });

          if (inkDrops.length > 80) {
            inkDrops.shift();
          }
        }
      }
    };

    // On desktop, mouse movement drives fluid ink reveal
    const handleMouseMove = (e: MouseEvent) => {
      triggerInkReveal(e.clientX, e.clientY);
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    let lastScrollY = window.scrollY;
    let lastMainGrad = "";
    let lastMutedGrad = "";

    const setAdaptiveTextGradients = (main: string, muted: string) => {
      if (lastMainGrad !== main) {
        lastMainGrad = main;
        document.documentElement.style.setProperty("--ink-text-bg", main);
      }
      if (lastMutedGrad !== muted) {
        lastMutedGrad = muted;
        document.documentElement.style.setProperty("--ink-text-muted-bg", muted);
      }
    };

    // -----------------------------------------------------------------
    // MAIN RENDER LOOP (60 FPS)
    // -----------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const scrollDelta = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;

      // Current section's interpolated colors
      const currentTheme = getThemeForProgress(scrollProgressRef.current);
      const cp = currentTheme.primary;
      const cs = currentTheme.secondary;
      const ca = currentTheme.accent;

      // Smooth mouse normalized coordinates for multi-plane parallax drift
      const targetNormX = (mouseX > 0 ? mouseX / width - 0.5 : 0) * 2;
      const targetNormY = (mouseY > 0 ? mouseY / height - 0.5 : 0) * 2;
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.05;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.05;

      // Update and dissolve ink drops
      for (let i = inkDrops.length - 1; i >= 0; i--) {
        const drop = inkDrops[i];
        drop.radius += (drop.targetRadius - drop.radius) * 0.14;
        drop.alpha -= drop.decay;
        if (drop.alpha <= 0.02) {
          inkDrops.splice(i, 1);
        }
      }

      // Update Constellation Coordinates (Desktop only - removed on mobile view)
      if (!isMobile && particles.length > 0) {
        const renderedParticles = particles.map((p) => {
          p.x += p.vx;
          p.y += p.vy - scrollDelta * p.depth;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const px = p.x + smoothMouseNormX * 36 * p.depth;
          const py = p.y + smoothMouseNormY * 36 * p.depth;

          return { ...p, px, py };
        });

        // DRAW 1: Ambient Constellation on Normal Background (Desktop only)
        for (let i = 0; i < renderedParticles.length; i++) {
          const p1 = renderedParticles[i];
          p1.alpha += Math.sin(Date.now() * p1.pulseSpeed) * 0.005;
          const clampedAlpha = Math.max(0.18, Math.min(0.75, p1.alpha));

          for (let j = i + 1; j < renderedParticles.length; j++) {
            const p2 = renderedParticles[j];
            const dx = p1.px - p2.px;
            const dy = p1.py - p2.py;
            const dist = Math.hypot(dx, dy);

            if (dist < 150) {
              const lineAlpha = (1 - dist / 150) * 0.32;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.strokeStyle = `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, ${lineAlpha})`;
              ctx.lineWidth = Math.max(1.8, (1 - dist / 150) * 2.8);
              ctx.stroke();
            }
          }

          // Outer glow halo on ambient nodes
          ctx.beginPath();
          ctx.arc(p1.px, p1.py, p1.radius * p1.depth * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, ${clampedAlpha * 0.22})`;
          ctx.fill();

          // Node core
          ctx.beginPath();
          ctx.arc(p1.px, p1.py, p1.radius * p1.depth, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, ${clampedAlpha * 0.85})`;
          ctx.fill();
        }
      }

      // -------------------------------------------------------------
      // DRAW 2: RENDER DEEP SPACE & MILKY WAY GALAXY ON OFFSCREEN CANVAS
      // -------------------------------------------------------------
      if (spaceCtx && maskCtx && revealCtx && (isFullCosmosRef.current || inkDrops.length > 0)) {
        // 1. Fill spaceCanvas with true pitch-black deep space void
        spaceCtx.clearRect(0, 0, width, height);
        spaceCtx.fillStyle = "#010206";
        spaceCtx.fillRect(0, 0, width, height);

        // 2. Universal Ambient Starfield
        for (let i = 0; i < deepSpaceStars.length; i++) {
          const star = deepSpaceStars[i];
          const sx = star.xNorm * width + smoothMouseNormX * 18;
          const sy = star.yNorm * height + smoothMouseNormY * 18;
          const twinkle = Math.sin(Date.now() * star.twinkleSpeed + i) * 0.28 + star.brightness;
          const alpha = Math.max(0.2, Math.min(1.0, twinkle));

          spaceCtx.beginPath();
          spaceCtx.arc(sx, sy, star.size, 0, Math.PI * 2);
          spaceCtx.fillStyle = `${star.color}${alpha})`;
          spaceCtx.fill();

          if (star.hasSpike) {
            spaceCtx.beginPath();
            spaceCtx.moveTo(sx - star.size * 3.2, sy);
            spaceCtx.lineTo(sx + star.size * 3.2, sy);
            spaceCtx.moveTo(sx, sy - star.size * 3.2);
            spaceCtx.lineTo(sx, sy + star.size * 3.2);
            spaceCtx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            spaceCtx.lineWidth = 0.85;
            spaceCtx.stroke();
          }
        }

        // 3. Thick Luminous Constellation Inside Dark Space (Desktop only)
        if (!isMobile && particles.length > 0) {
          for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            const clampedAlpha = Math.max(0.45, Math.min(1.0, p1.alpha));

            for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.hypot(dx, dy);

              if (dist < 160) {
                const lineAlpha = (1 - dist / 160) * 0.95;
                spaceCtx.beginPath();
                spaceCtx.moveTo(p1.x, p1.y);
                spaceCtx.lineTo(p2.x, p2.y);
                spaceCtx.strokeStyle = `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, ${lineAlpha})`;
                spaceCtx.lineWidth = Math.max(2.4, (1 - dist / 160) * 4.0);
                spaceCtx.stroke();
              }
            }

            spaceCtx.beginPath();
            spaceCtx.arc(p1.x, p1.y, p1.radius * p1.depth * 3.2, 0, Math.PI * 2);
            spaceCtx.fillStyle = `rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, ${clampedAlpha * 0.55})`;
            spaceCtx.fill();

            spaceCtx.beginPath();
            spaceCtx.arc(p1.x, p1.y, (p1.radius * 1.5 + 0.8) * p1.depth, 0, Math.PI * 2);
            spaceCtx.fillStyle = `rgba(255, 255, 255, ${clampedAlpha * 0.98})`;
            spaceCtx.fill();
          }
        }

        // -------------------------------------------------------------
        // DRAW 3: COMPOSITE FLUID INK REVEAL (CLEAN - NO HUDS / NO BEAMS)
        // -------------------------------------------------------------
        maskCtx.clearRect(0, 0, width, height);

        if (isFullCosmosRef.current) {
          maskCtx.fillStyle = "rgba(0, 0, 0, 1)";
          maskCtx.fillRect(0, 0, width, height);
        } else {
          for (let s = 0; s < inkDrops.length; s++) {
            const drop = inkDrops[s];
            if (drop.alpha <= 0.02 || drop.radius <= 5) continue;

            const grad = maskCtx.createRadialGradient(
              drop.x,
              drop.y,
              0,
              drop.x,
              drop.y,
              drop.radius
            );
            grad.addColorStop(0, `rgba(0, 0, 0, ${drop.alpha})`);
            grad.addColorStop(0.55, `rgba(0, 0, 0, ${drop.alpha * 0.95})`);
            grad.addColorStop(0.82, `rgba(0, 0, 0, ${drop.alpha * 0.55})`);
            grad.addColorStop(1, "rgba(0, 0, 0, 0)");

            maskCtx.fillStyle = grad;
            maskCtx.beginPath();
            maskCtx.arc(drop.x, drop.y, drop.radius, 0, Math.PI * 2);
            maskCtx.fill();
          }
        }

        revealCtx.clearRect(0, 0, width, height);
        revealCtx.drawImage(spaceCanvas, 0, 0);
        revealCtx.globalCompositeOperation = "destination-in";
        revealCtx.drawImage(maskCanvas, 0, 0);
        revealCtx.globalCompositeOperation = "source-over";

        ctx.drawImage(revealCanvas, 0, 0);
      }

      // Manage adaptive text color: change text to white/cyan directly under active ink droplets and revert on decay
      if (isFullCosmosRef.current) {
        setAdaptiveTextGradients(
          "linear-gradient(#ffffff, #ffffff)",
          "linear-gradient(#e0f2fe, #e0f2fe)"
        );
      } else if (inkDrops.length > 0) {
        const activeDrops = inkDrops
          .filter((d) => d.alpha > 0.04 && d.radius > 15)
          .slice(-6);

        if (activeDrops.length > 0) {
          const mainGrads = activeDrops.map(
            (d) =>
              `radial-gradient(circle ${(d.radius * 1.35).toFixed(0)}px at ${d.x.toFixed(0)}px ${d.y.toFixed(0)}px, rgba(255, 255, 255, ${(d.alpha * 0.98).toFixed(2)}) 0%, rgba(224, 242, 254, ${(d.alpha * 0.92).toFixed(2)}) 60%, transparent 100%)`
          );
          mainGrads.push("linear-gradient(#0f172a, #0f172a)");

          const mutedGrads = activeDrops.map(
            (d) =>
              `radial-gradient(circle ${(d.radius * 1.35).toFixed(0)}px at ${d.x.toFixed(0)}px ${d.y.toFixed(0)}px, rgba(240, 249, 255, ${(d.alpha * 0.96).toFixed(2)}) 0%, rgba(186, 230, 253, ${(d.alpha * 0.90).toFixed(2)}) 60%, transparent 100%)`
          );
          mutedGrads.push("linear-gradient(#334155, #334155)");

          setAdaptiveTextGradients(mainGrads.join(", "), mutedGrads.join(", "));
        } else {
          setAdaptiveTextGradients(
            "linear-gradient(#0f172a, #0f172a)",
            "linear-gradient(#334155, #334155)"
          );
        }
      } else {
        setAdaptiveTextGradients(
          "linear-gradient(#0f172a, #0f172a)",
          "linear-gradient(#334155, #334155)"
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute smooth parallax offsets for DOM layers (Desktop only)
  const isTouchDevice = typeof window !== "undefined" && (window.innerWidth < 768 || "ontouchstart" in window);
  const mouseXOffset = isTouchDevice ? 0 : mouse.x * 35;
  const mouseYOffset = isTouchDevice ? 0 : mouse.y * 35;

  const currentTheme = getThemeForProgress(scrollProgress);
  const cp = currentTheme.primary;
  const cs = currentTheme.secondary;
  const ca = currentTheme.accent;

  const driftY1 = Math.sin(scrollProgress * Math.PI * 3) * 60;
  const driftY2 = Math.cos(scrollProgress * Math.PI * 3) * 60;

  useEffect(() => {
    document.documentElement.classList.toggle("cosmos-active", isFullCosmos);
  }, [isFullCosmos]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1. Dynamic Section Ambient Parallax Nebulas */}
        <div
          className={`absolute -top-32 -left-32 w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[48rem] lg:h-[48rem] rounded-full blur-[45px] sm:blur-[80px] lg:blur-[120px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            background: `radial-gradient(circle, rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, 0.28) 0%, rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.16) 50%, transparent 75%)`,
            transform: `translate3d(${mouseXOffset * 1.1}px, ${driftY1 + mouseYOffset * 0.9}px, 0)`,
          }}
        />

        <div
          className={`absolute top-1/3 -right-32 w-72 h-72 sm:w-[30rem] sm:h-[30rem] lg:w-[44rem] lg:h-[44rem] rounded-full blur-[45px] sm:blur-[75px] lg:blur-[115px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            background: `radial-gradient(circle, rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.26) 0%, rgba(${ca[0]}, ${ca[1]}, ${ca[2]}, 0.14) 50%, transparent 75%)`,
            transform: `translate3d(${-mouseXOffset * 0.9}px, ${driftY2 - mouseYOffset * 0.8}px, 0)`,
          }}
        />

        {/* 2. Subtle Cyber Grid with Mouse Tilt */}
        <div
          className={`absolute inset-0 bg-grid-pattern pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-20" : "opacity-60"
          }`}
          style={{
            transform: `translate3d(${mouseXOffset * 0.3}px, ${(scrollProgress * 40) + mouseYOffset * 0.3}px, 0)`,
          }}
        />

        {/* 3. Cosmic Canvas (Deep Space, Milky Way Galaxy & Constellation Math) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* 4. Floating Interactive Cosmos Mode Switcher */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 pointer-events-auto">
        <button
          id="cosmos-toggle-btn"
          onClick={() => setIsFullCosmos((prev) => !prev)}
          className={`group flex items-center gap-2.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 shadow-xl backdrop-blur-xl border cursor-pointer ${
            isFullCosmos
              ? "bg-slate-950/92 text-cyan-300 border-cyan-400/60 shadow-cyan-500/25 hover:border-cyan-300 hover:scale-105"
              : "bg-white/92 text-slate-800 border-slate-300/80 shadow-slate-900/10 hover:border-indigo-400 hover:text-indigo-600 hover:scale-105"
          }`}
          title="Toggle between Full Space Cosmos View and Fluid Ink Reveal"
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
