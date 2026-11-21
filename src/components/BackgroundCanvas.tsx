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

interface TechGlyphConfig {
  label: string;
  initialTop: number;
  scrollRate: number;
  mouseXMult: number;
  mouseYMult: number;
  horizontalPos: string;
  colorClasses: string;
  hasPulse?: boolean;
}

const TECH_GLYPHS: TechGlyphConfig[] = [
  // 1. Hero Section (scrollY 0 - 1400px)
  {
    label: "+ 01_PARALLAX_GRID",
    initialTop: 180,
    scrollRate: 0.28,
    mouseXMult: -1.5,
    mouseYMult: -1.2,
    horizontalPos: "left-4 lg:left-8",
    colorClasses: "text-sky-800 bg-sky-50/90 border-sky-300 shadow-sky-500/10",
    hasPulse: false,
  },
  // {
  //   label: "+ 01_PARALLAX_GRID",
  //   initialTop: 280,
  //   scrollRate: 0.29,
  //   mouseXMult: 1.3,
  //   mouseYMult: 1.1,
  //   horizontalPos: "left-1/3",
  //   colorClasses:
  //     "text-cyan-800 bg-cyan-50/90 border-cyan-300 shadow-cyan-500/10",
  //   hasPulse: false,
  // },
  {
    label: "◈ // REACT_19_NATIVE_CONCURRENCY",
    initialTop: 460,
    scrollRate: 0.32,
    mouseXMult: 1.5,
    mouseYMult: 1.2,
    horizontalPos: "right-6 lg:right-12",
    colorClasses:
      "text-indigo-800 bg-indigo-50/90 border-indigo-300 shadow-indigo-500/10",
    hasPulse: false,
  },
  {
    label: "● LIVE // OPEN_TO_GLOBAL_ROLES",
    initialTop: 620,
    scrollRate: 0.27,
    mouseXMult: -1.2,
    mouseYMult: -1.0,
    horizontalPos: "right-1/4",
    colorClasses:
      "text-emerald-800 bg-emerald-50/90 border-emerald-300 shadow-emerald-500/10",
    hasPulse: true,
  },
  {
    label: "◆ OFFLINE_FIRST_ACTIVE",
    initialTop: 780,
    scrollRate: 0.3,
    mouseXMult: -1.4,
    mouseYMult: -1.2,
    horizontalPos: "left-1/4",
    colorClasses:
      "text-teal-800 bg-teal-50/90 border-teal-300 shadow-teal-500/10",
    hasPulse: false,
  },
  {
    label: "★ TOP_1%_FULL_STACK_TALENT",
    initialTop: 940,
    scrollRate: 0.31,
    mouseXMult: 1.4,
    mouseYMult: 1.2,
    horizontalPos: "left-8 lg:left-16",
    colorClasses:
      "text-amber-800 bg-amber-50/90 border-amber-300 shadow-amber-500/10",
    hasPulse: false,
  },

  // 2. Journey & Story Section (scrollY 1400 - 3200px)
  {
    label: "+ 02_EVENT_DRIVEN_FLOW",
    initialTop: 1120,
    scrollRate: 0.28,
    mouseXMult: 1.3,
    mouseYMult: 1.0,
    horizontalPos: "right-1/3",
    colorClasses:
      "text-cyan-800 bg-cyan-50/90 border-cyan-300 shadow-cyan-500/10",
    hasPulse: false,
  },
  {
    label: "⚡ <50ms_P99_RESPONSE_TIME",
    initialTop: 1280,
    scrollRate: 0.33,
    mouseXMult: -1.5,
    mouseYMult: -1.2,
    horizontalPos: "left-6 lg:left-12",
    colorClasses:
      "text-rose-800 bg-rose-50/90 border-rose-300 shadow-rose-500/10",
    hasPulse: true,
  },
  {
    label: "◈ // DOCKER_MICROSERVICES_MESH",
    initialTop: 1460,
    scrollRate: 0.3,
    mouseXMult: 1.2,
    mouseYMult: 1.1,
    horizontalPos: "left-1/3",
    colorClasses: "text-sky-800 bg-sky-50/90 border-sky-300 shadow-sky-500/10",
    hasPulse: false,
  },
  {
    label: "▲ 35+_ENTERPRISE_RELEASES",
    initialTop: 1640,
    scrollRate: 0.29,
    mouseXMult: 1.5,
    mouseYMult: 1.3,
    horizontalPos: "right-8 lg:right-16",
    colorClasses:
      "text-blue-800 bg-blue-50/90 border-blue-300 shadow-blue-500/10",
    hasPulse: false,
  },
  {
    label: "◆ SUPABASE_POSTGRES_ROW_SECURITY",
    initialTop: 1820,
    scrollRate: 0.31,
    mouseXMult: -1.3,
    mouseYMult: -1.0,
    horizontalPos: "right-1/4",
    colorClasses:
      "text-emerald-800 bg-emerald-50/90 border-emerald-300 shadow-emerald-500/10",
    hasPulse: false,
  },

  // 3. Architecture & System Design (scrollY 3200 - 5000px)
  {
    label: "⚡ 99.99%_ENTERPRISE_UPTIME_SLA",
    initialTop: 2000,
    scrollRate: 0.28,
    mouseXMult: -1.4,
    mouseYMult: -1.1,
    horizontalPos: "left-6 lg:left-14",
    colorClasses:
      "text-emerald-800 bg-emerald-50/90 border-emerald-300 shadow-emerald-500/10",
    hasPulse: true,
  },
  {
    label: "+ 03_TANSTACK_QUERY_CACHE",
    initialTop: 2180,
    scrollRate: 0.3,
    mouseXMult: 1.3,
    mouseYMult: 1.0,
    horizontalPos: "left-1/4",
    colorClasses:
      "text-rose-800 bg-rose-50/90 border-rose-300 shadow-rose-500/10",
    hasPulse: false,
  },
  {
    label: "◈ // LANGCHAIN_AGENTIC_PIPELINE",
    initialTop: 2360,
    scrollRate: 0.32,
    mouseXMult: 1.6,
    mouseYMult: 1.3,
    horizontalPos: "right-6 lg:right-12",
    colorClasses:
      "text-purple-800 bg-purple-50/90 border-purple-300 shadow-purple-500/10",
    hasPulse: false,
  },
  {
    label: "✦ ZERO_DOWNTIME_CI_CD_DEPLOY",
    initialTop: 2540,
    scrollRate: 0.29,
    mouseXMult: -1.3,
    mouseYMult: -1.1,
    horizontalPos: "right-1/3",
    colorClasses:
      "text-teal-800 bg-teal-50/90 border-teal-300 shadow-teal-500/10",
    hasPulse: false,
  },
  {
    label: "◆ EAS_BUILD_DISTRIBUTION_EXPO",
    initialTop: 2720,
    scrollRate: 0.31,
    mouseXMult: -1.5,
    mouseYMult: -1.2,
    horizontalPos: "left-8 lg:left-16",
    colorClasses:
      "text-indigo-800 bg-indigo-50/90 border-indigo-300 shadow-indigo-500/10",
    hasPulse: false,
  },

  // 4. Projects Showcase (scrollY 5000 - 7000px)
  {
    label: "★ 10K+_ACTIVE_PRODUCTION_USERS",
    initialTop: 2920,
    scrollRate: 0.28,
    mouseXMult: 1.4,
    mouseYMult: 1.1,
    horizontalPos: "right-8 lg:right-16",
    colorClasses:
      "text-amber-800 bg-amber-50/90 border-amber-300 shadow-amber-500/10",
    hasPulse: true,
  },
  {
    label: "+ 04_AGROSTOCK_ENTERPRISE_ERP",
    initialTop: 3100,
    scrollRate: 0.3,
    mouseXMult: -1.4,
    mouseYMult: -1.1,
    horizontalPos: "left-6 lg:left-12",
    colorClasses:
      "text-emerald-800 bg-emerald-50/90 border-emerald-300 shadow-emerald-500/10",
    hasPulse: false,
  },
  {
    label: "⚡ 1.2M+_API_CALLS_PROCESSED",
    initialTop: 3280,
    scrollRate: 0.32,
    mouseXMult: 1.3,
    mouseYMult: 1.0,
    horizontalPos: "left-1/3",
    colorClasses:
      "text-cyan-800 bg-cyan-50/90 border-cyan-300 shadow-cyan-500/10",
    hasPulse: false,
  },
  {
    label: "◈ // MULTI_MODAL_GENAI_STUDIO",
    initialTop: 3460,
    scrollRate: 0.29,
    mouseXMult: 1.5,
    mouseYMult: 1.2,
    horizontalPos: "right-6 lg:right-14",
    colorClasses:
      "text-purple-800 bg-purple-50/90 border-purple-300 shadow-purple-500/10",
    hasPulse: false,
  },
  {
    label: "✓ 100%_CROSS_PLATFORM_MOBILE",
    initialTop: 3640,
    scrollRate: 0.31,
    mouseXMult: -1.3,
    mouseYMult: -1.0,
    horizontalPos: "right-1/4",
    colorClasses:
      "text-blue-800 bg-blue-50/90 border-blue-300 shadow-blue-500/10",
    hasPulse: false,
  },

  // 5. Experience & Research (scrollY 7000 - 9000px)
  {
    label: "✦ IEEE_PEER_REVIEWED_GENAI_PAPER",
    initialTop: 3840,
    scrollRate: 0.28,
    mouseXMult: -1.4,
    mouseYMult: -1.1,
    horizontalPos: "left-6 lg:left-14",
    colorClasses:
      "text-fuchsia-800 bg-fuchsia-50/90 border-fuchsia-300 shadow-fuchsia-500/10",
    hasPulse: false,
  },
  {
    label: "★ GOLD_MEDALIST_FOOTBALL_PLAYER",
    initialTop: 4020,
    scrollRate: 0.3,
    mouseXMult: 1.3,
    mouseYMult: 1.1,
    horizontalPos: "right-1/3",
    colorClasses:
      "text-amber-800 bg-amber-50/90 border-amber-300 shadow-amber-500/10",
    hasPulse: true,
  },
  {
    label: "◈ // PRODUCTION_HARDENED_SECURITY",
    initialTop: 4200,
    scrollRate: 0.32,
    mouseXMult: -1.5,
    mouseYMult: -1.2,
    horizontalPos: "left-1/4",
    colorClasses:
      "text-teal-800 bg-teal-50/90 border-teal-300 shadow-teal-500/10",
    hasPulse: false,
  },
  {
    label: "▲ FULL_STACK_AGILE_LEAD",
    initialTop: 4380,
    scrollRate: 0.29,
    mouseXMult: 1.4,
    mouseYMult: 1.2,
    horizontalPos: "right-8 lg:right-16",
    colorClasses: "text-sky-800 bg-sky-50/90 border-sky-300 shadow-sky-500/10",
    hasPulse: false,
  },

  // 6. Education, Contact & Hire Me (scrollY 9000 - 12000px)
  {
    label: "⚡ SECURE_TUNNEL_ESTABLISHED",
    initialTop: 4560,
    scrollRate: 0.28,
    mouseXMult: -1.3,
    mouseYMult: -1.1,
    horizontalPos: "left-6 lg:left-12",
    colorClasses:
      "text-cyan-800 bg-cyan-50/90 border-cyan-300 shadow-cyan-500/10",
    hasPulse: false,
  },
  {
    label: "● LIVE: ACCEPTING_HIGH_IMPACT_ROLES",
    initialTop: 4740,
    scrollRate: 0.31,
    mouseXMult: 1.4,
    mouseYMult: 1.2,
    horizontalPos: "right-6 lg:right-14",
    colorClasses:
      "text-emerald-800 bg-emerald-50/90 border-emerald-300 shadow-emerald-500/10",
    hasPulse: true,
  },
  {
    label: "◈ // PRODUCTION_DEPLOYED_v2026",
    initialTop: 4920,
    scrollRate: 0.3,
    mouseXMult: -1.4,
    mouseYMult: -1.0,
    horizontalPos: "left-1/3",
    colorClasses: "text-sky-800 bg-sky-50/90 border-sky-300 shadow-sky-500/10",
    hasPulse: false,
  },
  {
    label: "✦ FAST_TRACK_ONBOARDING_READY",
    initialTop: 5100,
    scrollRate: 0.32,
    mouseXMult: 1.5,
    mouseYMult: 1.3,
    horizontalPos: "right-1/4",
    colorClasses:
      "text-indigo-800 bg-indigo-50/90 border-indigo-300 shadow-indigo-500/10",
    hasPulse: false,
  },
  {
    label: "★ LET'S_BUILD_SOMETHING_EXTRAORDINARY",
    initialTop: 5280,
    scrollRate: 0.29,
    mouseXMult: -1.3,
    mouseYMult: -1.1,
    horizontalPos: "left-8 lg:left-16",
    colorClasses:
      "text-amber-800 bg-amber-50/90 border-amber-300 shadow-amber-500/10",
    hasPulse: false,
  },
];

export const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glyphRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      const colorBase =
        spectralColors[Math.floor(Math.random() * spectralColors.length)];
      deepSpaceStars.push({
        xNorm: Math.random(),
        yNorm: Math.random(),
        size:
          Math.random() < 0.88
            ? Math.random() * 1.1 + 0.4
            : Math.random() * 2.2 + 1.2,
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
        width * 0.5,
        height * 0.45,
        60,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.65,
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
      "rgba(251, 146, 60, ", // Warm amber
      "rgba(244, 114, 182, ", // Radiant magenta/rose
      "rgba(192, 132, 252, ", // Luminous violet
      "rgba(56, 189, 248, ", // Electric cyan
      "rgba(96, 165, 250, ", // Celestial azure
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
        alpha: Math.random() * 0.1 + 0.08,
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
      const maxRNorm = isMajorArm ? 1.0 : 0.8;
      const rNorm = distFraction * maxRNorm;

      // Logarithmic spiral angle calculation
      const spiralAngle = Math.pow(rNorm, 0.72) * 4.4;
      const baseAngle = armOffset + spiralAngle;

      const spreadCoeff = isMajorArm ? 0.22 : 0.3;
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
        : Math.random() * 0.4 + 0.35;

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
        const baseDim = Math.max(width * 0.54, Math.min(width, height) * 0.7);
        const galaxyRadius = baseDim * (isMobile ? 0.54 : 0.6);

        // Center coordinates for the rotating galaxy with scroll and mouse parallax
        const gcx = width * 0.52 + mouseRef.current.x * 24;
        const gcy =
          height * 0.44 - currentScrollY * 0.12 + mouseRef.current.y * 18;

        // 1. Draw Multi-Layered Radiant Galactic Bulge & Ambient Halo
        ctx.save();
        ctx.translate(gcx, gcy);
        ctx.rotate(galaxyTilt);
        ctx.scale(1, 0.52);

        // a. Soft Outer Galactic Halo
        const outerHalo = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          galaxyRadius * 0.9,
        );
        outerHalo.addColorStop(0, "rgba(99, 102, 241, 0.16)");
        outerHalo.addColorStop(0.35, "rgba(56, 189, 248, 0.11)");
        outerHalo.addColorStop(0.65, "rgba(147, 51, 234, 0.06)");
        outerHalo.addColorStop(1, "rgba(1, 2, 6, 0)");
        ctx.beginPath();
        ctx.arc(0, 0, galaxyRadius * 0.9, 0, Math.PI * 2);
        ctx.fillStyle = outerHalo;
        ctx.fill();

        // b. Mid-Disc Luminous Nebula Glow
        const discGlow = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          galaxyRadius * 0.55,
        );
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
        const coreBulge = ctx.createRadialGradient(
          0,
          0,
          0,
          0,
          0,
          galaxyRadius * 0.22,
        );
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
          const rawX =
            Math.cos(curAngle) * cloudR + cloud.scatterXNorm * galaxyRadius;
          const rawY =
            Math.sin(curAngle) * cloudR + cloud.scatterYNorm * galaxyRadius;

          const tiltedX = rawX * cosTilt - rawY * 0.52 * sinTilt;
          const tiltedY = rawX * sinTilt + rawY * 0.52 * cosTilt;

          const cx = gcx + tiltedX;
          const cy = gcy + tiltedY;

          const pulse = Math.sin(now * cloud.pulseSpeed + i) * 0.03;
          const cloudAlpha = Math.max(
            0.04,
            Math.min(0.22, cloud.alpha + pulse),
          );
          const cloudRadius = cloud.radiusNorm * galaxyRadius;

          const cloudGrad = ctx.createRadialGradient(
            cx,
            cy,
            0,
            cx,
            cy,
            cloudRadius,
          );
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
          const rawX =
            Math.cos(curAngle) * starR + star.scatterXNorm * galaxyRadius;
          const rawY =
            Math.sin(curAngle) * starR + star.scatterYNorm * galaxyRadius;

          const tiltedX = rawX * cosTilt - rawY * 0.52 * sinTilt;
          const tiltedY = rawX * sinTilt + rawY * 0.52 * cosTilt;

          const sx = gcx + tiltedX;
          const sy = gcy + tiltedY;

          const twinkle = Math.sin(now * star.twinkleSpeed + i) * 0.18;
          const alpha = Math.max(
            0.18,
            Math.min(0.95, star.brightness + twinkle),
          );

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

      // Parallax Floating Cyber Crosshairs & Tech Glyphs (Slow Multi-Section Background Drift)
      const glyphMouseX = mouseRef.current.x * 35;
      const glyphMouseY = mouseRef.current.y * 35;
      const winHeight = window.innerHeight;

      for (let i = 0; i < TECH_GLYPHS.length; i++) {
        const el = glyphRefs.current[i];
        if (!el) continue;
        const cfg = TECH_GLYPHS[i];
        const py =
          cfg.initialTop -
          currentScrollY * cfg.scrollRate +
          glyphMouseY * cfg.mouseYMult;

        // Offscreen culling: hide when above or below viewport
        if (py < -120 || py > winHeight + 120) {
          if (el.style.display !== "none") {
            el.style.display = "none";
          }
          continue;
        }

        if (el.style.display !== "flex") {
          el.style.display = "flex";
        }
        const px = glyphMouseX * cfg.mouseXMult;
        el.style.transform = `translate3d(${px}px, ${py}px, 0)`;
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

  const isTouchDevice =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 || "ontouchstart" in window);

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

        {/* 4. Parallax Floating Marketing & Tech Glyphs (Slow Multi-Section Drift) */}
        {TECH_GLYPHS.map((glyph, index) => (
          <div
            key={glyph.label}
            ref={(el) => {
              glyphRefs.current[index] = el;
            }}
            className={`absolute top-0 ${glyph.horizontalPos} ${glyph.colorClasses} font-mono text-[11px] font-bold tracking-wider select-none will-change-transform hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border shadow-xs backdrop-blur-[2px] transition-opacity duration-700 pointer-events-none ${
              isFullCosmos ? "opacity-0" : "opacity-100"
            }`}
            style={{
              display: "none",
            }}
          >
            {glyph.hasPulse && (
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
              </span>
            )}
            <span className="whitespace-nowrap">{glyph.label}</span>
          </div>
        ))}

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
