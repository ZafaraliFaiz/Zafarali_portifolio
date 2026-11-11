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
  // 0.82: Skills Matrix (Neon Violet & Electric Amethyst)
  {
    progress: 0.82,
    name: "Skills",
    primary: [139, 92, 246],   // Violet 500
    secondary: [236, 72, 153], // Pink 500
    accent: [14, 165, 233],    // Sky 500
  },
  // 0.92: Research & Education (Supernova Gold & Cosmic Purple)
  {
    progress: 0.92,
    name: "Education",
    primary: [217, 119, 6],    // Amber 600
    secondary: [147, 51, 234], // Purple 600
    accent: [234, 88, 12],     // Orange 600
  },
  // 1.00: Contact & Footer (Celestial Emerald & Deep Cyan Aurora)
  {
    progress: 1.0,
    name: "Contact",
    primary: [5, 150, 105],    // Emerald 600
    secondary: [14, 165, 233], // Sky 500
    accent: [20, 184, 166],    // Teal 500
  },
];

// Smoothly interpolate RGB between two stops
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

// Get interpolated palette for any scroll progress (0 to 1)
function getThemeForProgress(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  for (let i = 0; i < SECTION_THEMES.length - 1; i++) {
    const t1 = SECTION_THEMES[i];
    const t2 = SECTION_THEMES[i + 1];
    if (p >= t1.progress && p <= t2.progress) {
      const span = t2.progress - t1.progress || 1;
      const t = (p - t1.progress) / span;
      return {
        primary: lerpColor(t1.primary, t2.primary, t),
        secondary: lerpColor(t1.secondary, t2.secondary, t),
        accent: lerpColor(t1.accent, t2.accent, t),
      };
    }
  }
  const last = SECTION_THEMES[SECTION_THEMES.length - 1];
  return {
    primary: last.primary,
    secondary: last.secondary,
    accent: last.accent,
  };
}

// Fluid organic ink reveal droplet
interface InkDrop {
  x: number;
  y: number;
  radius: number;
  targetRadius: number;
  alpha: number;
  decay: number;
}

// Shooting star / meteor in deep space
interface SpaceMeteor {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  alpha: number;
  decay: number;
}

// Deep cosmic field ambient star
interface DeepSpaceStar {
  xNorm: number; // 0 to 1 across screen width
  yNorm: number; // 0 to 1 across screen height
  size: number;
  brightness: number;
  twinkleSpeed: number;
  color: string;
  hasSpike?: boolean;
}

// Spiral galaxy star along logarithmic arms
interface SpiralArmStar {
  armIndex: number;
  theta: number; // Angle along spiral
  radiusOffset: number; // Dispersion from arm center
  size: number;
  brightness: number;
  twinkleSpeed: number;
  color: string;
}

// Milky Way galaxy star particle along celestial river
interface MilkyWayStar {
  distNorm: number;     // Distance along galactic diagonal
  crossNorm: number;    // Perpendicular distance from galactic axis (-1 to 1)
  size: number;
  brightness: number;
  isBrightCluster: boolean;
  colorType: "coreGold" | "cyanHot" | "violet" | "white";
  twinkleSpeed: number;
}

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isFullCosmos, setIsFullCosmos] = useState(false);
  const isFullCosmosRef = useRef(isFullCosmos);
  isFullCosmosRef.current = isFullCosmos;

  const mouse = useMouseParallax(0.06);
  const { scrollY, scrollProgress } = useScrollParallax();

  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 1. Offscreen Canvas for rendering the deep space universe
    const spaceCanvas = document.createElement("canvas");
    const spaceCtx = spaceCanvas.getContext("2d");
    if (!spaceCtx) return;

    // 2. Offscreen Canvas for smooth, organic feathered fluid ink mask
    const maskCanvas = document.createElement("canvas");
    const maskCtx = maskCanvas.getContext("2d");
    if (!maskCtx) return;

    // 3. Offscreen Canvas for compositing space with the feathered ink mask
    const revealCanvas = document.createElement("canvas");
    const revealCtx = revealCanvas.getContext("2d");
    if (!revealCtx) return;

    let animationFrameId: number;
    let width = (canvas.width = spaceCanvas.width = maskCanvas.width = revealCanvas.width = window.innerWidth);
    let height = (canvas.height = spaceCanvas.height = maskCanvas.height = revealCanvas.height = window.innerHeight);

    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      if (!canvas) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      // On mobile browsers, vertical address bar collapse/expansion triggers continuous resize events.
      // Only re-allocate canvas buffers when width changes (rotation/resize) or major height change (> 150px)
      if (Math.abs(newW - width) > 40 || Math.abs(newH - height) > 150) {
        width = canvas.width = spaceCanvas.width = maskCanvas.width = revealCanvas.width = newW;
        height = canvas.height = spaceCanvas.height = maskCanvas.height = revealCanvas.height = newH;
      }
    };

    window.addEventListener("resize", handleResize);

    // -----------------------------------------------------------------
    // 1. Constellation Network Particles (Optimized for Mobile)
    // -----------------------------------------------------------------
    const particleCount = isMobile
      ? Math.min(Math.floor((width * height) / 22000), 24)
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
    // 2. Universal Deep Space Field (Optimized for Mobile)
    // -----------------------------------------------------------------
    const deepSpaceStars: DeepSpaceStar[] = [];
    const spectralColors = [
      "rgba(255, 255, 255, ",
      "rgba(224, 242, 254, ", // Cyan-white O/B class
      "rgba(254, 240, 138, ", // Amber-gold G class
      "rgba(216, 180, 254, ", // Violet stellar nebula
    ];

    const deepStarCount = isMobile ? 140 : 420;
    for (let i = 0; i < deepStarCount; i++) {
      const colorBase = spectralColors[Math.floor(Math.random() * spectralColors.length)];
      deepSpaceStars.push({
        xNorm: Math.random(),
        yNorm: Math.random(),
        size: Math.random() < 0.08 ? Math.random() * 2.2 + 1.2 : Math.random() * 1.3 + 0.5,
        brightness: Math.random() * 0.55 + 0.45,
        twinkleSpeed: Math.random() * 0.035 + 0.01,
        color: colorBase,
        hasSpike: Math.random() < 0.04,
      });
    }

    // -----------------------------------------------------------------
    // 3. The Majestic Spiral Galaxy (Barred/Logarithmic Spiral Arms)
    // -----------------------------------------------------------------
    const spiralStars: SpiralArmStar[] = [];
    const spiralStarCount = isMobile ? 120 : 380;
    for (let i = 0; i < spiralStarCount; i++) {
      const armIndex = i % 2; // 2 primary spiral arms
      const theta = (Math.random() * 3.2 + 0.4) * Math.PI; // 0.4pi to 3.6pi
      const radiusOffset = (Math.random() - 0.5) * 45 * Math.pow(theta / 4, 0.7);
      const isCore = theta < Math.PI * 0.9;

      let color = "rgba(255, 255, 255, ";
      if (isCore) {
        color = "rgba(253, 224, 71, "; // Warm golden core
      } else if (Math.random() < 0.4) {
        color = "rgba(103, 232, 249, "; // Cyan hot star clusters
      } else if (Math.random() < 0.25) {
        color = "rgba(236, 72, 153, "; // Pink/magenta H II emission nebulae
      }

      spiralStars.push({
        armIndex,
        theta,
        radiusOffset,
        size: Math.random() * 2.2 + 0.8,
        brightness: Math.random() * 0.5 + 0.5,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
        color,
      });
    }

    // -----------------------------------------------------------------
    // 4. The Milky Way Celestial River (Diagonal Galaxy Band)
    // -----------------------------------------------------------------
    const milkyWayStarCount = isMobile ? 100 : 340;
    const milkyWayStars: MilkyWayStar[] = [];
    for (let i = 0; i < milkyWayStarCount; i++) {
      const distNorm = Math.random();
      const u1 = Math.random();
      const u2 = Math.random();
      const randStdNormal = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
      const crossNorm = randStdNormal * 0.24;

      const isCore = Math.abs(distNorm - 0.52) < 0.22 && Math.abs(crossNorm) < 0.22;
      const isBright = Math.random() < 0.12;

      let colorType: "coreGold" | "cyanHot" | "violet" | "white" = "white";
      if (isCore && Math.random() < 0.5) {
        colorType = "coreGold";
      } else if (Math.random() < 0.35) {
        colorType = "cyanHot";
      } else if (Math.random() < 0.25) {
        colorType = "violet";
      }

      milkyWayStars.push({
        distNorm,
        crossNorm,
        size: isBright ? Math.random() * 2.6 + 1.4 : Math.random() * 1.5 + 0.5,
        brightness: Math.random() * 0.5 + 0.5,
        isBrightCluster: isBright,
        colorType,
        twinkleSpeed: Math.random() * 0.03 + 0.01,
      });
    }

    // -----------------------------------------------------------------
    // 5. Dynamic Fluid Organic Ink Reveal Droplets (Mouse & Touch Enabled)
    // -----------------------------------------------------------------
    const inkDrops: InkDrop[] = [];
    const meteors: SpaceMeteor[] = [];
    let lastMeteorTime = performance.now();

    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let smoothMouseNormX = 0;
    let smoothMouseNormY = 0;
    let lastMoveTime = performance.now();

    const triggerInkReveal = (clientX: number, clientY: number) => {
      const prevX = lastMouseX > 0 ? lastMouseX : clientX;
      const prevY = lastMouseY > 0 ? lastMouseY : clientY;
      mouseX = clientX;
      mouseY = clientY;

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTime);
      const dist = Math.hypot(clientX - prevX, clientY - prevY);
      const speed = dist / dt;

      // Expand fluid ink reveal along pointer movement
      if (dist > 12 || inkDrops.length === 0) {
        lastMouseX = clientX;
        lastMouseY = clientY;
        lastMoveTime = now;

        const maxR = isMobile ? 220 : 320;
        const minR = isMobile ? 120 : 160;
        const targetRadius = Math.min(maxR, Math.max(minR, 160 + speed * 60));
        const maxSteps = isMobile ? 3 : 5;
        const steps = Math.min(maxSteps, Math.max(1, Math.floor(dist / 24)));

        for (let step = 1; step <= steps; step++) {
          const interpX = prevX + (clientX - prevX) * (step / steps);
          const interpY = prevY + (clientY - prevY) * (step / steps);

          inkDrops.push({
            x: interpX,
            y: interpY,
            radius: targetRadius * 0.45,
            targetRadius,
            alpha: 1.0,
            decay: isMobile ? 0.007 : 0.0035,
          });

          if (inkDrops.length > (isMobile ? 35 : 90)) {
            inkDrops.shift();
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      triggerInkReveal(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        triggerInkReveal(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let lastScrollY = window.scrollY;

    // -----------------------------------------------------------------
    // MAIN RENDER LOOP (60 FPS)
    // -----------------------------------------------------------------
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const currentScrollY = window.scrollY;
      const scrollDelta = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;

      // Current section's interpolated colors
      const theme = getThemeForProgress(scrollProgressRef.current);
      const cp = theme.primary;
      const cs = theme.secondary;
      const ca = theme.accent;

      // Smooth mouse normalized coordinates for multi-plane parallax drift
      const targetNormX = (mouseX > 0 ? mouseX / width - 0.5 : 0) * 2;
      const targetNormY = (mouseY > 0 ? mouseY / height - 0.5 : 0) * 2;
      smoothMouseNormX += (targetNormX - smoothMouseNormX) * 0.05;
      smoothMouseNormY += (targetNormY - smoothMouseNormY) * 0.05;

      // Update Fluid Ink Drops
      for (let i = inkDrops.length - 1; i >= 0; i--) {
        const drop = inkDrops[i];
        drop.radius += (drop.targetRadius - drop.radius) * 0.09;
        drop.alpha -= drop.decay;

        if (drop.alpha <= 0.01) {
          inkDrops.splice(i, 1);
        }
      }

      // Spawn deep space meteors
      const nowTime = performance.now();
      if (nowTime - lastMeteorTime > 3200 && meteors.length < 2 && Math.random() < 0.6) {
        lastMeteorTime = nowTime;
        const angle = (Math.PI / 180) * (36 + Math.random() * 18);
        const speed = 20 + Math.random() * 8;
        meteors.push({
          x: Math.random() * (width * 0.8),
          y: Math.random() * (height * 0.4),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          length: 130 + Math.random() * 70,
          alpha: 1.0,
          decay: 0.022,
        });
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.vx;
        m.y += m.vy;
        m.alpha -= m.decay;
        if (m.alpha <= 0.02 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
        }
      }

      // Update Constellation Coordinates
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

      // -------------------------------------------------------------
      // DRAW 1: Ambient Constellation on Normal Background (Noticeably Thicker)
      // -------------------------------------------------------------
      for (let i = 0; i < renderedParticles.length; i++) {
        const p1 = renderedParticles[i];
        p1.alpha += Math.sin(Date.now() * p1.pulseSpeed) * 0.005;
        const clampedAlpha = Math.max(0.18, Math.min(0.75, p1.alpha));

        for (let j = i + 1; j < renderedParticles.length; j++) {
          const p2 = renderedParticles[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            const lineAlpha = (1 - dist / 150) * 0.32;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.strokeStyle = `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, ${lineAlpha})`;
            // Thicker ambient lines: 1.8px - 2.8px
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

      // -------------------------------------------------------------
      // DRAW 2: RENDER DEEP SPACE & MILKY WAY GALAXY ON OFFSCREEN CANVAS
      // -------------------------------------------------------------
      // Render spaceCanvas when Full Cosmos Mode is active OR ink drops are revealing space
      if (isFullCosmosRef.current || inkDrops.length > 0) {
        // 1. Fill spaceCanvas with true pitch-black deep space void
        // "mostly in dark black like in the space"
        spaceCtx.clearRect(0, 0, width, height);
        spaceCtx.fillStyle = "#010206"; // Deepest cosmic black void
        spaceCtx.fillRect(0, 0, width, height);

        // 2. Universal Ambient Starfield (Hundreds of stars scattered everywhere in space)
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

        // 3. The Majestic Milky Way Celestial River (Diagonal Galaxy Band)
        const gStartX = width * 0.08 + smoothMouseNormX * 38;
        const gStartY = -100 + smoothMouseNormY * 38;
        const gEndX = width * 0.92 + smoothMouseNormX * 38;
        const gEndY = height + 100 + smoothMouseNormY * 38;
        const gDirX = gEndX - gStartX;
        const gDirY = gEndY - gStartY;
        const gLen = Math.hypot(gDirX, gDirY);
        const gNormX = -gDirY / gLen;
        const gNormY = gDirX / gLen;

        // Galactic Core Center (Sagittarius A* / Luminous Bulge)
        const coreCenterX = gStartX + gDirX * 0.48;
        const coreCenterY = gStartY + gDirY * 0.48;
        const coreRadius = 160;

        // Luminous Milky Way Core Bulge Gradient
        const coreGrad = spaceCtx.createRadialGradient(
          coreCenterX,
          coreCenterY,
          0,
          coreCenterX,
          coreCenterY,
          coreRadius
        );
        coreGrad.addColorStop(0, "rgba(255, 255, 255, 0.96)"); // Radiant core
        coreGrad.addColorStop(0.2, "rgba(254, 240, 138, 0.65)"); // Warm golden starlight
        coreGrad.addColorStop(0.5, `rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.35)`); // Deep violet/magenta nebulae
        coreGrad.addColorStop(0.8, `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, 0.16)`); // Electric cyan interstellar gas
        coreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        spaceCtx.beginPath();
        spaceCtx.arc(coreCenterX, coreCenterY, coreRadius, 0, Math.PI * 2);
        spaceCtx.fillStyle = coreGrad;
        spaceCtx.fill();

        // Soft Galactic Band Dust along the Milky Way Axis (Confined 220px band in black space)
        const bandWidth = 220;
        spaceCtx.save();
        spaceCtx.beginPath();
        spaceCtx.moveTo(gStartX - gNormX * (bandWidth * 0.5), gStartY - gNormY * (bandWidth * 0.5));
        spaceCtx.lineTo(gEndX - gNormX * (bandWidth * 0.5), gEndY - gNormY * (bandWidth * 0.5));
        spaceCtx.lineTo(gEndX + gNormX * (bandWidth * 0.5), gEndY + gNormY * (bandWidth * 0.5));
        spaceCtx.lineTo(gStartX + gNormX * (bandWidth * 0.5), gStartY + gNormY * (bandWidth * 0.5));
        spaceCtx.closePath();

        const bandGrad = spaceCtx.createLinearGradient(
          coreCenterX - gNormX * (bandWidth * 0.5),
          coreCenterY - gNormY * (bandWidth * 0.5),
          coreCenterX + gNormX * (bandWidth * 0.5),
          coreCenterY + gNormY * (bandWidth * 0.5)
        );
        bandGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
        bandGrad.addColorStop(0.25, `rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.22)`);
        bandGrad.addColorStop(0.5, "rgba(240, 245, 255, 0.42)"); // Dense celestial dust
        bandGrad.addColorStop(0.75, `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, 0.22)`);
        bandGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        spaceCtx.fillStyle = bandGrad;
        spaceCtx.fill();
        spaceCtx.restore();

        // Render Milky Way Celestial River Stars
        for (let i = 0; i < milkyWayStars.length; i++) {
          const star = milkyWayStars[i];
          const starX = gStartX + gDirX * star.distNorm + gNormX * (star.crossNorm * 220);
          const starY = gStartY + gDirY * star.distNorm + gNormY * (star.crossNorm * 220);

          const twinkle = Math.sin(Date.now() * star.twinkleSpeed + i) * 0.25 + star.brightness;
          const alpha = Math.max(0.25, Math.min(1.0, twinkle));

          spaceCtx.beginPath();
          spaceCtx.arc(starX, starY, star.size, 0, Math.PI * 2);

          if (star.colorType === "coreGold") {
            spaceCtx.fillStyle = `rgba(253, 224, 71, ${alpha * 0.98})`;
          } else if (star.colorType === "cyanHot") {
            spaceCtx.fillStyle = `rgba(103, 232, 249, ${alpha * 0.95})`;
          } else if (star.colorType === "violet") {
            spaceCtx.fillStyle = `rgba(216, 180, 254, ${alpha * 0.92})`;
          } else {
            spaceCtx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.98})`;
          }
          spaceCtx.fill();

          if (star.isBrightCluster) {
            spaceCtx.beginPath();
            spaceCtx.moveTo(starX - star.size * 3.6, starY);
            spaceCtx.lineTo(starX + star.size * 3.6, starY);
            spaceCtx.moveTo(starX, starY - star.size * 3.6);
            spaceCtx.lineTo(starX, starY + star.size * 3.6);
            spaceCtx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.7})`;
            spaceCtx.lineWidth = 0.9;
            spaceCtx.stroke();
          }
        }

        // 4. "A Certain Type of Milky Galaxy" - Majestic 3D Tilted Spiral Galaxy
        // Positioned gracefully at center-right so tearing reveals the spiral galaxy structure!
        const spiralCenterX = width * 0.58 + smoothMouseNormX * 45;
        const spiralCenterY = height * 0.46 + smoothMouseNormY * 45;
        const spiralTilt = (-26 * Math.PI) / 180; // 26 deg tilt
        const spiralEccentricity = 0.46; // 3D oblique viewing perspective

        spaceCtx.save();
        spaceCtx.translate(spiralCenterX, spiralCenterY);
        spaceCtx.rotate(spiralTilt);
        spaceCtx.scale(1, spiralEccentricity);

        // Spiral Galactic Nucleus Glow
        const spiralCoreGrad = spaceCtx.createRadialGradient(0, 0, 0, 0, 0, 85);
        spiralCoreGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        spiralCoreGrad.addColorStop(0.2, "rgba(254, 240, 138, 0.75)"); // Golden bulge
        spiralCoreGrad.addColorStop(0.5, "rgba(168, 85, 247, 0.32)"); // Purple nebular gas
        spiralCoreGrad.addColorStop(0.85, "rgba(6, 182, 212, 0.14)"); // Cyan outer dust
        spiralCoreGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        spaceCtx.beginPath();
        spaceCtx.arc(0, 0, 85, 0, Math.PI * 2);
        spaceCtx.fillStyle = spiralCoreGrad;
        spaceCtx.fill();

        // Render Spiral Arms Stars and Clusters
        for (let i = 0; i < spiralStars.length; i++) {
          const sStar = spiralStars[i];
          const armAngleOffset = sStar.armIndex * Math.PI; // 2 opposite arms
          const currentTheta = sStar.theta + armAngleOffset;
          // Logarithmic spiral: r = a * e^(b * theta)
          const baseRadius = 18 * Math.exp(0.28 * sStar.theta) + sStar.radiusOffset;
          const armX = Math.cos(currentTheta) * baseRadius;
          const armY = Math.sin(currentTheta) * baseRadius;

          const twinkle = Math.sin(Date.now() * sStar.twinkleSpeed + i) * 0.25 + sStar.brightness;
          const alpha = Math.max(0.25, Math.min(1.0, twinkle));

          spaceCtx.beginPath();
          spaceCtx.arc(armX, armY, sStar.size, 0, Math.PI * 2);
          spaceCtx.fillStyle = `${sStar.color}${alpha})`;
          spaceCtx.fill();
        }

        spaceCtx.restore();

        // 5. Shooting Stars (Meteors) Streaking Across Deep Black Space
        for (let m = 0; m < meteors.length; m++) {
          const meteor = meteors[m];
          const tailX = meteor.x - (meteor.vx / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;
          const tailY = meteor.y - (meteor.vy / Math.hypot(meteor.vx, meteor.vy)) * meteor.length;

          const mGrad = spaceCtx.createLinearGradient(tailX, tailY, meteor.x, meteor.y);
          mGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
          mGrad.addColorStop(0.65, `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, ${meteor.alpha * 0.85})`);
          mGrad.addColorStop(1, `rgba(255, 255, 255, ${meteor.alpha})`);

          spaceCtx.beginPath();
          spaceCtx.moveTo(tailX, tailY);
          spaceCtx.lineTo(meteor.x, meteor.y);
          spaceCtx.strokeStyle = mGrad;
          spaceCtx.lineWidth = 2.4;
          spaceCtx.lineCap = "round";
          spaceCtx.stroke();
        }

        // 6. THICK & LUMINOUS CONSTELLATION MATH INSIDE DARK SPACE
        // "we already have constellation amth in the backgrund just make it a little bit thick"
        for (let i = 0; i < renderedParticles.length; i++) {
          const p1 = renderedParticles[i];
          const clampedAlpha = Math.max(0.45, Math.min(1.0, p1.alpha));

          for (let j = i + 1; j < renderedParticles.length; j++) {
            const p2 = renderedParticles[j];
            const dx = p1.px - p2.px;
            const dy = p1.py - p2.py;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 160) {
              const lineAlpha = (1 - dist / 160) * 0.95;
              spaceCtx.beginPath();
              spaceCtx.moveTo(p1.px, p1.py);
              spaceCtx.lineTo(p2.px, p2.py);
              // Vivid neon cyan / electric indigo line
              spaceCtx.strokeStyle = `rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, ${lineAlpha})`;
              // Noticeably thicker constellation lines (2.4px to 4.0px)
              spaceCtx.lineWidth = Math.max(2.4, (1 - dist / 160) * 4.0);
              spaceCtx.stroke();
            }
          }

          // Double glowing halo around constellation nodes
          spaceCtx.beginPath();
          spaceCtx.arc(p1.px, p1.py, p1.radius * p1.depth * 3.2, 0, Math.PI * 2);
          spaceCtx.fillStyle = `rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, ${clampedAlpha * 0.55})`;
          spaceCtx.fill();

          spaceCtx.beginPath();
          spaceCtx.arc(p1.px, p1.py, (p1.radius * 1.5 + 0.8) * p1.depth, 0, Math.PI * 2);
          spaceCtx.fillStyle = `rgba(255, 255, 255, ${clampedAlpha * 0.98})`;
          spaceCtx.fill();

          // Magnetic beam to cursor inside the tear
          const mdx = p1.px - mouseX;
          const mdy = p1.py - mouseY;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 220) {
            const mouseLineAlpha = (1 - mdist / 220) * 0.95;
            spaceCtx.beginPath();
            spaceCtx.moveTo(p1.px, p1.py);
            spaceCtx.lineTo(mouseX, mouseY);
            spaceCtx.strokeStyle = `rgba(${ca[0]}, ${ca[1]}, ${ca[2]}, ${mouseLineAlpha})`;
            spaceCtx.lineWidth = Math.max(3.2, (1 - mdist / 220) * 5.2); // Extra thick neon magnetic connection beam
            spaceCtx.stroke();
          }
        }

        // -------------------------------------------------------------
        // DRAW 3: COMPOSITE FLUID INK REVEAL (NO GEOMETRIC TEAR)
        // -------------------------------------------------------------
        // Step A: Draw soft, feathered fluid ink mask onto maskCanvas
        maskCtx.clearRect(0, 0, width, height);

        if (isFullCosmosRef.current) {
          // If Full Cosmos Mode is active, mask is completely open everywhere!
          maskCtx.fillStyle = "rgba(0, 0, 0, 1)";
          maskCtx.fillRect(0, 0, width, height);
        } else {
          // Render fluid organic ink drops with smooth Gaussian radial feathering
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

        // Step B: Mask spaceCanvas with maskCanvas using GPU destination-in
        revealCtx.clearRect(0, 0, width, height);
        revealCtx.drawImage(spaceCanvas, 0, 0);
        revealCtx.globalCompositeOperation = "destination-in";
        revealCtx.drawImage(maskCanvas, 0, 0);
        revealCtx.globalCompositeOperation = "source-over";

        // Step C: Draw the silky smooth, feathered space reveal onto main canvas
        ctx.drawImage(revealCanvas, 0, 0);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Compute smooth parallax offsets for DOM layers
  const mouseXOffset = mouse.x * 35;
  const mouseYOffset = mouse.y * 35;

  // Active section palette for DOM glowing ambient layers
  const theme = getThemeForProgress(scrollProgress);
  const cp = theme.primary;
  const cs = theme.secondary;
  const ca = theme.accent;

  // Dynamic persistent ambient drift
  const driftY1 = Math.sin(scrollProgress * Math.PI * 3) * 60;
  const driftY2 = Math.cos(scrollProgress * Math.PI * 3) * 60;
  const driftY3 = Math.sin(scrollProgress * Math.PI * 4 + 1.2) * 65;
  const driftY4 = Math.cos(scrollProgress * Math.PI * 4 + 1.8) * 65;

  useEffect(() => {
    document.documentElement.classList.toggle("cosmos-active", isFullCosmos);
  }, [isFullCosmos]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1. Dynamic Section Ambient Parallax Nebulas (Scaled & GPU-optimized for Mobile) */}
        <div
          className={`absolute -top-32 -left-32 w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[48rem] lg:h-[48rem] rounded-full blur-[45px] sm:blur-[80px] lg:blur-[120px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            background: `radial-gradient(circle, rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, 0.32) 0%, rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.18) 50%, transparent 75%)`,
            transform: `translate3d(${-mouseXOffset * 1.2}px, ${driftY1 - mouseYOffset * 0.9}px, 0)`,
          }}
        />

        <div
          className={`absolute top-10 -right-36 w-72 h-72 sm:w-[30rem] sm:h-[30rem] lg:w-[46rem] lg:h-[46rem] rounded-full blur-[45px] sm:blur-[80px] lg:blur-[120px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            background: `radial-gradient(circle, rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.32) 0%, rgba(${ca[0]}, ${ca[1]}, ${ca[2]}, 0.18) 50%, transparent 75%)`,
            transform: `translate3d(${mouseXOffset * 1.4}px, ${driftY2 + mouseYOffset * 0.9}px, 0)`,
          }}
        />

        <div
          className={`absolute top-[38%] -left-36 w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[48rem] lg:h-[48rem] rounded-full blur-[50px] sm:blur-[80px] lg:blur-[130px] pointer-events-none will-change-transform transition-opacity duration-700 hidden sm:block ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            background: `radial-gradient(circle, rgba(${ca[0]}, ${ca[1]}, ${ca[2]}, 0.30) 0%, rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, 0.18) 50%, transparent 75%)`,
            transform: `translate3d(${-mouseXOffset * 0.9}px, ${driftY3 - mouseYOffset * 0.7}px, 0)`,
          }}
        />

        <div
          className={`absolute top-[45%] -right-36 w-72 h-72 sm:w-[30rem] sm:h-[30rem] lg:w-[46rem] lg:h-[46rem] rounded-full blur-[50px] sm:blur-[80px] lg:blur-[130px] pointer-events-none will-change-transform transition-opacity duration-700 hidden sm:block ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            background: `radial-gradient(circle, rgba(${cp[0]}, ${cp[1]}, ${cp[2]}, 0.30) 0%, rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.20) 50%, transparent 75%)`,
            transform: `translate3d(${mouseXOffset * 1.1}px, ${driftY4 + mouseYOffset * 0.7}px, 0)`,
          }}
        />

        <div
          className={`absolute -bottom-28 left-[10%] sm:left-[20%] w-80 h-80 sm:w-[36rem] sm:h-[36rem] lg:w-[52rem] lg:h-[52rem] rounded-full blur-[50px] sm:blur-[85px] lg:blur-[135px] pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-10" : "opacity-100"
          }`}
          style={{
            background: `radial-gradient(circle, rgba(${cs[0]}, ${cs[1]}, ${cs[2]}, 0.26) 0%, rgba(${ca[0]}, ${ca[1]}, ${ca[2]}, 0.16) 50%, transparent 75%)`,
            transform: `translate3d(${mouseXOffset * 0.8}px, ${(Math.sin(scrollProgress * Math.PI * 2.5 + 2) * 50) + mouseYOffset * 0.6}px, 0)`,
          }}
        />

        {/* 2. Parallax Floating Cyber Crosshairs & Tech Glyphs */}
        <div
          className="absolute top-28 left-4 lg:left-8 text-sky-700/70 font-mono text-[11px] font-bold tracking-wider select-none will-change-transform hidden sm:block bg-sky-100/70 px-2.5 py-1 rounded-md border border-sky-300/70 shadow-xs backdrop-blur-xs"
          style={{
            transform: `translate3d(${-mouseXOffset * 1.2}px, ${(Math.sin(scrollProgress * Math.PI * 2) * 35) - mouseYOffset * 0.8}px, 0)`,
          }}
        >
          + 01_PARALLAX_GRID
        </div>

        <div
          className="absolute top-1/2 right-6 lg:right-12 text-indigo-700/70 font-mono text-[11px] font-bold tracking-wider select-none will-change-transform hidden sm:block bg-indigo-100/70 px-2.5 py-1 rounded-md border border-indigo-300/70 shadow-xs backdrop-blur-xs"
          style={{
            transform: `translate3d(${mouseXOffset * 1.2}px, ${(Math.cos(scrollProgress * Math.PI * 2) * 40) + mouseYOffset * 0.8}px, 0)`,
          }}
        >
          ◈ // REACT_19_ENGINE
        </div>

        <div
          className="absolute bottom-20 left-1/4 text-emerald-700/70 font-mono text-xs font-bold tracking-wider select-none will-change-transform hidden sm:block bg-emerald-100/70 px-2.5 py-1 rounded-md border border-emerald-300/70 shadow-xs backdrop-blur-xs"
          style={{
            transform: `translate3d(${-mouseXOffset * 1.1}px, ${(Math.sin(scrollProgress * Math.PI * 3) * 35) - mouseYOffset * 0.7}px, 0)`,
          }}
        >
          ◆ OFFLINE_FIRST_ACTIVE
        </div>

        {/* 3. Subtle Cyber Grid with Mouse Tilt */}
        <div
          className={`absolute inset-0 bg-grid-pattern pointer-events-none will-change-transform transition-opacity duration-700 ${
            isFullCosmos ? "opacity-20" : "opacity-60"
          }`}
          style={{
            transform: `translate3d(${mouseXOffset * 0.3}px, ${(scrollProgress * 40) + mouseYOffset * 0.3}px, 0)`,
          }}
        />

        {/* 4. Cosmic Canvas (Deep Space, Milky Way Galaxy & Constellation Math) */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* 5. Floating Interactive Cosmos Mode Switcher (True z-50 outside z-0) */}
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
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                isFullCosmos ? "bg-cyan-400 opacity-80" : "bg-indigo-400 opacity-60"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                isFullCosmos ? "bg-cyan-400" : "bg-indigo-600"
              }`}
            />
          </span>
          <span className="tracking-wide">
            {isFullCosmos ? "🌌 FULL COSMOS: ON" : "💧 INK REVEAL: ON"}
          </span>
        </button>
      </div>
    </>
  );
};
