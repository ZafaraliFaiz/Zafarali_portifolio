import React, { useState, useEffect, useRef } from "react";
import { useMouseParallax } from "../hooks/useParallax";

// Deep Space Star structure with parallax layer
interface DeepSpaceStar {
  xNorm: number;
  yNorm: number;
  size: number;
  brightness: number;
  color: string;
  hasSpike: boolean;
  layer: number; // 0: distant, 1: mid, 2: foreground
  twinkleSpeed: number;
  twinkleOffset: number;
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
  twinkleOffset: number;
  isBarStar?: boolean;
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

// Complete Multi-Galaxy Profile
interface GalaxyDefinition {
  id: string;
  name: string;
  targetScrollY: number;
  xRatio: number;
  radiusRatio: number;
  tilt: number;
  scaleY: number;
  rotSpeed: number;
  arms: number;
  hasBar?: boolean;
  hasFlare?: boolean;
  haloColors: {
    outer: string[];
    disc: string[];
    core: string[];
  };
  stars: GalaxyStar[];
  nebulae: NebulaCloud[];
}

// Dynamic Shooting Star / Meteor structure
interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  size: number;
  alpha: number;
  decay: number;
  headColor: string;
  tailColor: string;
  sparks: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
  }[];
}

// Modular Orbital Deep Space Station
interface SpaceStation {
  targetScrollY: number;
  xRatio: number;
  scale: number;
  rotation: number;
  rotSpeed: number;
  ringAngle: number;
  ringSpeed: number;
}

// Tactical Recon Space Jet Cruiser
interface SpaceJet {
  x: number;
  y: number;
  baseAngle: number;
  angle: number;
  targetAngle: number;
  speed: number;
  scale: number;
  exhaustParticles: {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
    color: string;
  }[];
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
    // 2. Universal Deep Space Field (3D Multi-Layer Parallax Starfield)
    // -----------------------------------------------------------------
    const deepSpaceStars: DeepSpaceStar[] = [];
    const spectralColors = [
      "rgba(255, 255, 255, ",
      "rgba(224, 242, 254, ", // Cyan-white O/B class
      "rgba(254, 240, 138, ", // Amber-gold G class
      "rgba(216, 180, 254, ", // Violet stellar nebula
    ];

    const deepStarCount = isMobile ? 110 : 280;
    for (let i = 0; i < deepStarCount; i++) {
      const colorBase =
        spectralColors[Math.floor(Math.random() * spectralColors.length)];
      // Layers: 0 = Distant (slow), 1 = Mid (moderate), 2 = Foreground (fast)
      const layer = Math.random() < 0.6 ? 0 : Math.random() < 0.85 ? 1 : 2;
      const isForeground = layer === 2;
      deepSpaceStars.push({
        xNorm: Math.random(),
        yNorm: Math.random(),
        size: isForeground
          ? Math.random() * 1.8 + 1.2
          : Math.random() < 0.85
            ? Math.random() * 0.9 + 0.35
            : Math.random() * 1.4 + 0.8,
        brightness: Math.random() * 0.45 + 0.55,
        color: colorBase,
        hasSpike: isForeground ? Math.random() < 0.35 : Math.random() < 0.02,
        layer,
        twinkleSpeed: Math.random() * 0.03 + 0.015,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    // -----------------------------------------------------------------
    // 3. Multi-Galaxy Universe System (5 Distinct Galactic Anchors)
    // -----------------------------------------------------------------
    const helperGenerateGalaxy = (
      arms: number,
      starCount: number,
      nebulaCount: number,
      colors: string[],
      hasBar: boolean = false,
    ): { stars: GalaxyStar[]; nebulae: NebulaCloud[] } => {
      const stars: GalaxyStar[] = [];
      const nebulae: NebulaCloud[] = [];

      // Interstellar Gas Clouds
      for (let i = 0; i < nebulaCount; i++) {
        const armIdx = i % arms;
        const armOffset = (armIdx * 2 * Math.PI) / arms;
        const distFraction = Math.pow((i + 1) / nebulaCount, 0.85);
        const rNorm = distFraction * 0.95;
        const spiralAngle = Math.pow(rNorm, 0.72) * 4.4;
        const baseAngle = armOffset + spiralAngle;
        const spreadNorm = (1 - rNorm) * 0.18 + 0.02;
        const scatterXNorm = (Math.random() - 0.5) * spreadNorm;
        const scatterYNorm = (Math.random() - 0.5) * spreadNorm;

        let col = colors[1];
        if (rNorm < 0.22) col = colors[0];
        else if (rNorm < 0.55) col = colors[2] || colors[1];
        else col = colors[3] || colors[2] || colors[1];

        nebulae.push({
          rNorm,
          baseAngle,
          scatterXNorm,
          scatterYNorm,
          radiusNorm: Math.random() * 0.07 + 0.08,
          color: col,
          alpha: Math.random() * 0.1 + 0.08,
          pulseSpeed: Math.random() * 0.02 + 0.01,
        });
      }

      // Revolving Stars
      for (let i = 0; i < starCount; i++) {
        const isBarStar = hasBar && i < starCount * 0.18;

        if (isBarStar) {
          // Stars aligned along the luminous central galactic bar
          const barDist = (Math.random() - 0.5) * 2; // -1 to 1 along bar
          stars.push({
            rNorm: Math.abs(barDist),
            baseAngle: barDist >= 0 ? 0 : Math.PI,
            scatterXNorm: (Math.random() - 0.5) * 0.06,
            scatterYNorm: (Math.random() - 0.5) * 0.06,
            size: Math.random() * 1.5 + 0.8,
            brightness: Math.random() * 0.3 + 0.7,
            color: colors[0],
            hasSpike: Math.random() < 0.08,
            twinkleSpeed: Math.random() * 0.035 + 0.015,
            twinkleOffset: Math.random() * Math.PI * 2,
            isBarStar: true,
          });
          continue;
        }

        const isMajorArm = i % arms < 2;
        const armIdx = i % arms;
        const armOffset = (armIdx * 2 * Math.PI) / arms;

        const distExp = isMajorArm ? 1.6 : 1.3;
        const distFraction = Math.pow(Math.random(), distExp);
        const maxRNorm = isMajorArm ? 1.0 : 0.85;
        const rNorm = distFraction * maxRNorm;

        const spiralAngle = Math.pow(rNorm, 0.72) * 4.4;
        const baseAngle = armOffset + spiralAngle;

        const spreadCoeff = isMajorArm ? 0.22 : 0.3;
        const spreadNorm = (1 - rNorm) * spreadCoeff + 0.015;
        const scatterXNorm = (Math.random() - 0.5) * spreadNorm;
        const scatterYNorm = (Math.random() - 0.5) * spreadNorm;

        let col = colors[0];
        if (rNorm < 0.16) col = colors[0];
        else if (rNorm < 0.38) col = colors[1] || colors[0];
        else if (rNorm < 0.68) col = colors[2] || colors[1];
        else col = colors[3] || colors[2];

        const isCore = rNorm < 0.14;
        const size = isCore
          ? Math.random() * 2.0 + 1.0
          : Math.random() < 0.08
            ? Math.random() * 1.8 + 1.1
            : Math.random() * 1.3 + 0.5;
        const brightness = isCore
          ? Math.random() * 0.25 + 0.65
          : Math.random() * 0.4 + 0.35;

        stars.push({
          rNorm,
          baseAngle,
          scatterXNorm,
          scatterYNorm,
          size,
          brightness,
          color: col,
          hasSpike: isCore ? Math.random() < 0.16 : Math.random() < 0.02,
          twinkleSpeed: Math.random() * 0.035 + 0.015,
          twinkleOffset: Math.random() * Math.PI * 2,
        });
      }

      return { stars, nebulae };
    };

    const gStarCount = isMobile ? 120 : 260;
    const gNebulaCount = isMobile ? 10 : 22;

    // Galaxy 1: Andromeda Prime (Hero Section)
    const andromedaData = helperGenerateGalaxy(
      4,
      gStarCount,
      gNebulaCount,
      [
        "rgba(255, 255, 255, ",
        "rgba(254, 240, 138, ",
        "rgba(244, 114, 182, ",
        "rgba(56, 189, 248, ",
      ],
      false,
    );

    // Galaxy 2: Sombrero Lenticular Disc (Journey Section)
    const sombreroData = helperGenerateGalaxy(
      2,
      Math.floor(gStarCount * 0.85),
      Math.floor(gNebulaCount * 0.8),
      [
        "rgba(255, 255, 255, ",
        "rgba(167, 243, 208, ",
        "rgba(56, 189, 248, ",
        "rgba(20, 184, 166, ",
      ],
      false,
    );

    // Galaxy 3: Triangulum Starburst Pinwheel (Architecture & Projects)
    const triangulumData = helperGenerateGalaxy(
      3,
      gStarCount,
      gNebulaCount,
      [
        "rgba(255, 255, 255, ",
        "rgba(244, 114, 182, ",
        "rgba(192, 132, 252, ",
        "rgba(99, 102, 241, ",
      ],
      false,
    );

    // Galaxy 4: Cygnus Stellar Ring (Experience & Research)
    const cygnusData = helperGenerateGalaxy(
      2,
      Math.floor(gStarCount * 0.9),
      Math.floor(gNebulaCount * 0.85),
      [
        "rgba(255, 255, 255, ",
        "rgba(186, 230, 253, ",
        "rgba(96, 165, 250, ",
        "rgba(147, 51, 234, ",
      ],
      false,
    );

    // Galaxy 5: Centaurus Mega Barred Spiral (Education & Contact)
    const centaurusData = helperGenerateGalaxy(
      4,
      Math.floor(gStarCount * 1.1),
      Math.floor(gNebulaCount * 1.1),
      [
        "rgba(255, 255, 255, ",
        "rgba(254, 240, 138, ",
        "rgba(251, 146, 60, ",
        "rgba(236, 72, 153, ",
      ],
      true, // Central luminous stellar bar
    );

    const galaxies: GalaxyDefinition[] = [
      {
        id: "andromeda",
        name: "Andromeda Prime",
        targetScrollY: 150,
        xRatio: 0.54,
        radiusRatio: 1.0,
        tilt: -0.42,
        scaleY: 0.52,
        rotSpeed: 0.0007,
        arms: 4,
        hasFlare: true,
        haloColors: {
          outer: [
            "rgba(99, 102, 241, 0.16)",
            "rgba(56, 189, 248, 0.11)",
            "rgba(147, 51, 234, 0.06)",
          ],
          disc: [
            "rgba(254, 240, 138, 0.50)",
            "rgba(244, 114, 182, 0.36)",
            "rgba(56, 189, 248, 0.26)",
            "rgba(99, 102, 241, 0.10)",
          ],
          core: [
            "rgba(255, 255, 255, 0.90)",
            "rgba(254, 240, 138, 0.76)",
            "rgba(251, 146, 60, 0.50)",
            "rgba(236, 72, 153, 0.28)",
          ],
        },
        stars: andromedaData.stars,
        nebulae: andromedaData.nebulae,
      },
      {
        id: "sombrero",
        name: "Sombrero Lenticular",
        targetScrollY: 2600,
        xRatio: 0.28,
        radiusRatio: 0.88,
        tilt: -0.68,
        scaleY: 0.36,
        rotSpeed: -0.0006,
        arms: 2,
        hasFlare: true,
        haloColors: {
          outer: [
            "rgba(16, 185, 129, 0.15)",
            "rgba(6, 182, 212, 0.10)",
            "rgba(15, 23, 42, 0)",
          ],
          disc: [
            "rgba(167, 243, 208, 0.48)",
            "rgba(56, 189, 248, 0.35)",
            "rgba(20, 184, 166, 0.22)",
            "rgba(16, 185, 129, 0.08)",
          ],
          core: [
            "rgba(255, 255, 255, 0.92)",
            "rgba(224, 242, 254, 0.80)",
            "rgba(45, 212, 191, 0.55)",
            "rgba(16, 185, 129, 0.25)",
          ],
        },
        stars: sombreroData.stars,
        nebulae: sombreroData.nebulae,
      },
      {
        id: "triangulum",
        name: "Triangulum Starburst",
        targetScrollY: 5200,
        xRatio: 0.74,
        radiusRatio: 1.05,
        tilt: 0.38,
        scaleY: 0.58,
        rotSpeed: 0.0008,
        arms: 3,
        hasFlare: false,
        haloColors: {
          outer: [
            "rgba(168, 85, 247, 0.16)",
            "rgba(236, 72, 153, 0.10)",
            "rgba(15, 23, 42, 0)",
          ],
          disc: [
            "rgba(244, 114, 182, 0.48)",
            "rgba(192, 132, 252, 0.36)",
            "rgba(99, 102, 241, 0.24)",
            "rgba(236, 72, 153, 0.08)",
          ],
          core: [
            "rgba(255, 255, 255, 0.90)",
            "rgba(253, 224, 71, 0.75)",
            "rgba(244, 114, 182, 0.52)",
            "rgba(168, 85, 247, 0.26)",
          ],
        },
        stars: triangulumData.stars,
        nebulae: triangulumData.nebulae,
      },
      {
        id: "cygnus",
        name: "Cygnus Stellar Ring",
        targetScrollY: 7800,
        xRatio: 0.28,
        radiusRatio: 0.92,
        tilt: -0.22,
        scaleY: 0.65,
        rotSpeed: 0.0007,
        arms: 2,
        hasFlare: true,
        haloColors: {
          outer: [
            "rgba(56, 189, 248, 0.15)",
            "rgba(99, 102, 241, 0.10)",
            "rgba(15, 23, 42, 0)",
          ],
          disc: [
            "rgba(186, 230, 253, 0.48)",
            "rgba(96, 165, 250, 0.35)",
            "rgba(147, 51, 234, 0.22)",
            "rgba(56, 189, 248, 0.08)",
          ],
          core: [
            "rgba(255, 255, 255, 0.92)",
            "rgba(224, 242, 254, 0.78)",
            "rgba(129, 140, 248, 0.52)",
            "rgba(217, 70, 239, 0.26)",
          ],
        },
        stars: cygnusData.stars,
        nebulae: cygnusData.nebulae,
      },
      {
        id: "centaurus",
        name: "Centaurus Mega Barred",
        targetScrollY: 10400,
        xRatio: 0.68,
        radiusRatio: 1.12,
        tilt: 0.48,
        scaleY: 0.50,
        rotSpeed: 0.0008,
        arms: 4,
        hasBar: true,
        hasFlare: true,
        haloColors: {
          outer: [
            "rgba(251, 146, 60, 0.15)",
            "rgba(244, 114, 182, 0.10)",
            "rgba(15, 23, 42, 0)",
          ],
          disc: [
            "rgba(254, 240, 138, 0.50)",
            "rgba(251, 146, 60, 0.38)",
            "rgba(56, 189, 248, 0.25)",
            "rgba(244, 114, 182, 0.10)",
          ],
          core: [
            "rgba(255, 255, 255, 0.92)",
            "rgba(254, 240, 138, 0.80)",
            "rgba(249, 115, 22, 0.55)",
            "rgba(236, 72, 153, 0.30)",
          ],
        },
        stars: centaurusData.stars,
        nebulae: centaurusData.nebulae,
      },
    ];

    const galaxyRotations: number[] = [0, 0, 0, 0, 0];

    // -----------------------------------------------------------------
    // 4. Dynamic Cosmic Meteors & Shooting Stars
    // -----------------------------------------------------------------
    const meteors: ShootingStar[] = [];
    let framesUntilNextMeteor = 40;

    // -----------------------------------------------------------------
    // 5. Orbital Deep Space Station ("Aegis Orbital Outpost")
    // -----------------------------------------------------------------
    const spaceStation: SpaceStation = {
      targetScrollY: 1400,
      xRatio: 0.82,
      scale: isMobile ? 0.68 : 0.95,
      rotation: -0.15,
      rotSpeed: 0.0002,
      ringAngle: 0,
      ringSpeed: 0.008,
    };

    // -----------------------------------------------------------------
    // 6. Tactical Recon Space Jet ("Vanguard Recon-1")
    // -----------------------------------------------------------------
    const spaceJet: SpaceJet = {
      x: -60,
      y: height * 0.32,
      baseAngle: 0.28,
      angle: 0.28,
      targetAngle: 0.28,
      speed: 2.2,
      scale: isMobile ? 0.8 : 1.0,
      exhaustParticles: [],
    };

    const handleResize = () => {
      if (!canvas) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      width = canvas.width = spaceCanvas.width = newW;
      height = canvas.height = spaceCanvas.height = newH;
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
      // A. FULL COSMOS MODE: Full Universe Across Portfolio
      // ===============================================================
      if (isFullCosmosRef.current) {
        const now = Date.now();

        // 1. Deep Cosmic Space Void & Dynamic Ambient Dust
        ctx.fillStyle = "#010206";
        ctx.fillRect(0, 0, width, height);

        const cosmicDustGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          60,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.75,
        );
        cosmicDustGrad.addColorStop(0, "rgba(24, 20, 60, 0.45)");
        cosmicDustGrad.addColorStop(0.4, "rgba(10, 15, 35, 0.3)");
        cosmicDustGrad.addColorStop(1, "rgba(1, 2, 6, 0.98)");
        ctx.fillStyle = cosmicDustGrad;
        ctx.fillRect(0, 0, width, height);

        // 2. 3D Multi-Layer Parallax Starfield (Continuous Seamless Wrap)
        for (let i = 0; i < deepSpaceStars.length; i++) {
          const star = deepSpaceStars[i];
          const parallaxSpeed =
            star.layer === 0 ? 0.05 : star.layer === 1 ? 0.16 : 0.32;
          const rawY =
            (star.yNorm * height - currentScrollY * parallaxSpeed) % height;
          const sy = rawY < 0 ? rawY + height : rawY;
          const sx =
            (star.xNorm * width +
              mouseRef.current.x * (star.layer + 1) * 8) %
            width;
          const finalSx = sx < 0 ? sx + width : sx;

          const twinkle =
            Math.sin(now * star.twinkleSpeed + star.twinkleOffset) * 0.2;
          const alpha = Math.max(0.2, Math.min(1.0, star.brightness + twinkle));

          ctx.beginPath();
          ctx.arc(finalSx, sy, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${alpha})`;
          ctx.fill();

          if (star.hasSpike) {
            ctx.beginPath();
            ctx.moveTo(finalSx - star.size * 2.8, sy);
            ctx.lineTo(finalSx + star.size * 2.8, sy);
            ctx.moveTo(finalSx, sy - star.size * 2.8);
            ctx.lineTo(finalSx, sy + star.size * 2.8);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.75})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // 3. Multi-Galaxy System Rendering (Viewport Culled)
        const baseDim = Math.max(width * 0.54, Math.min(width, height) * 0.7);
        const galaxyParallax = 0.45;

        for (let g = 0; g < galaxies.length; g++) {
          const gal = galaxies[g];
          const galaxyRadius =
            baseDim * (isMobile ? 0.48 : 0.58) * gal.radiusRatio;

          // Parallax position for this galaxy
          const gcy =
            height * 0.48 +
            (gal.targetScrollY - currentScrollY) * galaxyParallax +
            mouseRef.current.y * 18;
          const gcx = width * gal.xRatio + mouseRef.current.x * 24;

          // Viewport culling: only calculate and render visible galaxies!
          if (
            gcy < -galaxyRadius * 1.5 ||
            gcy > height + galaxyRadius * 1.5
          ) {
            continue;
          }

          // a. Luminous Core Bulge & Multi-Stop Ambient Halo
          ctx.save();
          ctx.translate(gcx, gcy);
          ctx.rotate(gal.tilt);
          ctx.scale(1, gal.scaleY);

          // Outer halo
          const outerHalo = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            galaxyRadius * 0.95,
          );
          outerHalo.addColorStop(0, gal.haloColors.outer[0]);
          outerHalo.addColorStop(0.38, gal.haloColors.outer[1]);
          outerHalo.addColorStop(0.72, gal.haloColors.outer[2]);
          outerHalo.addColorStop(1, "rgba(1, 2, 6, 0)");
          ctx.beginPath();
          ctx.arc(0, 0, galaxyRadius * 0.95, 0, Math.PI * 2);
          ctx.fillStyle = outerHalo;
          ctx.fill();

          // Mid disc glow
          const discGlow = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            galaxyRadius * 0.55,
          );
          discGlow.addColorStop(0, gal.haloColors.disc[0]);
          discGlow.addColorStop(0.22, gal.haloColors.disc[1]);
          discGlow.addColorStop(0.5, gal.haloColors.disc[2]);
          discGlow.addColorStop(0.78, gal.haloColors.disc[3]);
          discGlow.addColorStop(1, "rgba(1, 2, 6, 0)");
          ctx.beginPath();
          ctx.arc(0, 0, galaxyRadius * 0.55, 0, Math.PI * 2);
          ctx.fillStyle = discGlow;
          ctx.fill();

          // Refined Core Bulge
          const coreBulge = ctx.createRadialGradient(
            0,
            0,
            0,
            0,
            0,
            galaxyRadius * 0.22,
          );
          coreBulge.addColorStop(0, gal.haloColors.core[0]);
          coreBulge.addColorStop(0.2, gal.haloColors.core[1]);
          coreBulge.addColorStop(0.48, gal.haloColors.core[2]);
          coreBulge.addColorStop(0.76, gal.haloColors.core[3]);
          coreBulge.addColorStop(1, "rgba(1, 2, 6, 0)");
          ctx.beginPath();
          ctx.arc(0, 0, galaxyRadius * 0.22, 0, Math.PI * 2);
          ctx.fillStyle = coreBulge;
          ctx.fill();

          // Central stellar bar (if barred spiral galaxy)
          if (gal.hasBar) {
            const barGrad = ctx.createLinearGradient(
              -galaxyRadius * 0.35,
              0,
              galaxyRadius * 0.35,
              0,
            );
            barGrad.addColorStop(0, "rgba(254, 240, 138, 0)");
            barGrad.addColorStop(0.3, "rgba(254, 240, 138, 0.45)");
            barGrad.addColorStop(0.5, "rgba(255, 255, 255, 0.75)");
            barGrad.addColorStop(0.7, "rgba(254, 240, 138, 0.45)");
            barGrad.addColorStop(1, "rgba(254, 240, 138, 0)");
            ctx.fillStyle = barGrad;
            ctx.fillRect(
              -galaxyRadius * 0.35,
              -galaxyRadius * 0.05,
              galaxyRadius * 0.7,
              galaxyRadius * 0.1,
            );
          }

          ctx.restore();

          // Update rotation for this galaxy
          galaxyRotations[g] += gal.rotSpeed;
          const curRot = galaxyRotations[g];
          const cosTilt = Math.cos(gal.tilt);
          const sinTilt = Math.sin(gal.tilt);

          // b. Draw Rotating Interstellar Nebula Clouds
          for (let i = 0; i < gal.nebulae.length; i++) {
            const cloud = gal.nebulae[i];
            const curAngle = cloud.baseAngle + curRot;
            const cloudR = cloud.rNorm * galaxyRadius;
            const rawX =
              Math.cos(curAngle) * cloudR +
              cloud.scatterXNorm * galaxyRadius;
            const rawY =
              Math.sin(curAngle) * cloudR +
              cloud.scatterYNorm * galaxyRadius;

            const tiltedX = rawX * cosTilt - rawY * gal.scaleY * sinTilt;
            const tiltedY = rawX * sinTilt + rawY * gal.scaleY * cosTilt;

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

          // c. Draw Revolving Stars along Spiral Arms
          for (let i = 0; i < gal.stars.length; i++) {
            const star = gal.stars[i];
            let rawX = 0;
            let rawY = 0;

            if (star.isBarStar) {
              const curAngle = star.baseAngle + curRot;
              const barR = star.rNorm * (galaxyRadius * 0.35);
              rawX =
                Math.cos(curAngle) * barR +
                star.scatterXNorm * (galaxyRadius * 0.08);
              rawY =
                Math.sin(curAngle) * (barR * 0.25) +
                star.scatterYNorm * (galaxyRadius * 0.08);
            } else {
              const curAngle = star.baseAngle + curRot;
              const starR = star.rNorm * galaxyRadius;
              rawX =
                Math.cos(curAngle) * starR +
                star.scatterXNorm * galaxyRadius;
              rawY =
                Math.sin(curAngle) * starR +
                star.scatterYNorm * galaxyRadius;
            }

            const tiltedX = rawX * cosTilt - rawY * gal.scaleY * sinTilt;
            const tiltedY = rawX * sinTilt + rawY * gal.scaleY * cosTilt;

            const sx = gcx + tiltedX;
            const sy = gcy + tiltedY;

            const twinkle =
              Math.sin(now * star.twinkleSpeed + star.twinkleOffset) * 0.18;
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

          // d. Core Diffraction Lens Flare
          if (gal.hasFlare) {
            const coreFlareAlpha = 0.65 + Math.sin(now * 0.002 + g) * 0.08;
            ctx.save();
            ctx.translate(gcx, gcy);

            ctx.beginPath();
            ctx.moveTo(-28, 0);
            ctx.lineTo(28, 0);
            ctx.moveTo(0, -28);
            ctx.lineTo(0, 28);
            ctx.strokeStyle = `rgba(255, 255, 255, ${coreFlareAlpha * 0.55})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();

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
        }

        // 4. Dynamic Cosmic Meteors & Shooting Stars
        framesUntilNextMeteor--;
        if (framesUntilNextMeteor <= 0) {
          framesUntilNextMeteor = Math.floor(Math.random() * 65) + 45;
          if (meteors.length < 5) {
            const startX = Math.random() * (width * 0.9) + width * 0.1;
            const startY = Math.random() * (height * 0.6);
            const speed = Math.random() * 8 + 14;
            const angle =
              (Math.PI / 180) * (Math.random() * 20 + 205); // ~205-225 deg (down-left)
            const meteorColors = [
              { head: "#ffffff", tail: "rgba(56, 189, 248, " }, // Cyan
              { head: "#ffffff", tail: "rgba(244, 114, 182, " }, // Rose
              { head: "#ffffff", tail: "rgba(254, 240, 138, " }, // Gold
              { head: "#ffffff", tail: "rgba(192, 132, 252, " }, // Violet
            ];
            const col =
              meteorColors[Math.floor(Math.random() * meteorColors.length)];

            meteors.push({
              x: startX,
              y: startY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              length: Math.random() * 70 + 90,
              size: Math.random() * 1.5 + 1.2,
              alpha: 1.0,
              decay: Math.random() * 0.018 + 0.015,
              headColor: col.head,
              tailColor: col.tail,
              sparks: [],
            });
          }
        }

        for (let i = meteors.length - 1; i >= 0; i--) {
          const m = meteors[i];
          m.x += m.vx;
          m.y += m.vy;
          m.alpha -= m.decay;

          // Shed burning sparks
          if (Math.random() < 0.35 && m.sparks.length < 8) {
            m.sparks.push({
              x: m.x + (Math.random() - 0.5) * 4,
              y: m.y + (Math.random() - 0.5) * 4,
              vx: (Math.random() - 0.5) * 1.5,
              vy: (Math.random() - 0.5) * 1.5,
              alpha: m.alpha * 0.8,
              size: Math.random() * 1.2 + 0.6,
            });
          }

          for (let s = m.sparks.length - 1; s >= 0; s--) {
            const spark = m.sparks[s];
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.alpha -= 0.05;
            if (spark.alpha <= 0) {
              m.sparks.splice(s, 1);
              continue;
            }
            ctx.beginPath();
            ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${spark.alpha})`;
            ctx.fill();
          }

          if (m.alpha <= 0 || m.x < -100 || m.y > height + 100) {
            meteors.splice(i, 1);
            continue;
          }

          const vMag = Math.hypot(m.vx, m.vy);
          const dirX = m.vx / vMag;
          const dirY = m.vy / vMag;
          const tailX = m.x - dirX * m.length;
          const tailY = m.y - dirY * m.length;

          // Tapered ion tail
          const tailGrad = ctx.createLinearGradient(m.x, m.y, tailX, tailY);
          tailGrad.addColorStop(0, `${m.headColor}`);
          tailGrad.addColorStop(0.2, `${m.tailColor}${m.alpha * 0.85})`);
          tailGrad.addColorStop(0.6, `${m.tailColor}${m.alpha * 0.35})`);
          tailGrad.addColorStop(1, `${m.tailColor}0)`);

          ctx.beginPath();
          ctx.moveTo(m.x, m.y);
          ctx.lineTo(tailX, tailY);
          ctx.strokeStyle = tailGrad;
          ctx.lineWidth = m.size * 1.5;
          ctx.lineCap = "round";
          ctx.stroke();

          // Radiant head aura
          const headGrad = ctx.createRadialGradient(
            m.x,
            m.y,
            0,
            m.x,
            m.y,
            m.size * 4,
          );
          headGrad.addColorStop(0, `rgba(255, 255, 255, ${m.alpha})`);
          headGrad.addColorStop(0.4, `${m.tailColor}${m.alpha * 0.6})`);
          headGrad.addColorStop(1, `${m.tailColor}0)`);

          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = headGrad;
          ctx.fill();

          // White-hot nucleus
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${m.alpha})`;
          ctx.fill();
        }

        // 5. Orbital Deep Space Station ("Aegis Orbital Outpost")
        const station = spaceStation;
        station.rotation += station.rotSpeed;
        station.ringAngle += station.ringSpeed;

        const stationParallax = 0.42;
        const stScreenY =
          height * 0.42 +
          (station.targetScrollY - currentScrollY) * stationParallax +
          mouseRef.current.y * 12;
        const stScreenX = width * station.xRatio + mouseRef.current.x * 16;

        // Viewport culling (station radius ~130px)
        if (
          stScreenY > -140 &&
          stScreenY < height + 140 &&
          stScreenX > -140 &&
          stScreenX < width + 140
        ) {
          ctx.save();
          ctx.translate(stScreenX, stScreenY);
          ctx.scale(station.scale, station.scale);
          ctx.rotate(station.rotation);

          // a. Twin Solar Photovoltaic Wing Arrays
          // Structural cross truss
          ctx.fillStyle = "#334155";
          ctx.fillRect(-92, -3, 184, 6);
          ctx.strokeStyle = "#64748b";
          ctx.lineWidth = 1;
          ctx.strokeRect(-92, -3, 184, 6);

          // Solar panels (2 pairs left, 2 pairs right)
          const drawSolarWing = (startX: number, endX: number) => {
            const w = Math.abs(endX - startX);
            const minX = Math.min(startX, endX);

            // Top panel bank
            const topGrad = ctx.createLinearGradient(minX, -30, minX, -7);
            topGrad.addColorStop(0, "#0369a1");
            topGrad.addColorStop(0.5, "#0284c7");
            topGrad.addColorStop(1, "#082f49");
            ctx.fillStyle = topGrad;
            ctx.fillRect(minX, -30, w, 23);
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 0.8;
            ctx.strokeRect(minX, -30, w, 23);

            // Photovoltaic cell grid lines
            ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
            ctx.lineWidth = 0.5;
            for (let gx = minX + 8; gx < minX + w; gx += 9) {
              ctx.beginPath();
              ctx.moveTo(gx, -30);
              ctx.lineTo(gx, -7);
              ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(minX, -18.5);
            ctx.lineTo(minX + w, -18.5);
            ctx.stroke();

            // Bottom panel bank
            const btmGrad = ctx.createLinearGradient(minX, 7, minX, 30);
            btmGrad.addColorStop(0, "#082f49");
            btmGrad.addColorStop(0.5, "#0284c7");
            btmGrad.addColorStop(1, "#0369a1");
            ctx.fillStyle = btmGrad;
            ctx.fillRect(minX, 7, w, 23);
            ctx.strokeStyle = "#38bdf8";
            ctx.lineWidth = 0.8;
            ctx.strokeRect(minX, 7, w, 23);

            // Photovoltaic cell grid lines
            for (let gx = minX + 8; gx < minX + w; gx += 9) {
              ctx.beginPath();
              ctx.moveTo(gx, 7);
              ctx.lineTo(gx, 30);
              ctx.stroke();
            }
            ctx.beginPath();
            ctx.moveTo(minX, 18.5);
            ctx.lineTo(minX + w, 18.5);
            ctx.stroke();

            // Gold bus bar / insulation edge
            ctx.fillStyle = "#f59e0b";
            ctx.fillRect(minX, -6, w, 1.5);
            ctx.fillRect(minX, 4.5, w, 1.5);
          };

          drawSolarWing(-88, -26);
          drawSolarWing(26, 88);

          // b. Rotating Toroidal Centrifuge Habitat Ring
          ctx.save();
          ctx.rotate(0.35); // Stationary orbital tilt
          ctx.scale(1, 0.36); // Elliptical projection

          // Outer centrifuge torus ring
          ctx.beginPath();
          ctx.arc(0, 0, 48, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(148, 163, 184, 0.75)";
          ctx.lineWidth = 4.5;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(0, 0, 48, 0, Math.PI * 2);
          ctx.strokeStyle = "rgba(226, 232, 240, 0.9)";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Rotating habitat ring spokes (3 spokes)
          for (let sp = 0; sp < 3; sp++) {
            const spAngle = station.ringAngle + (sp * Math.PI * 2) / 3;
            const sx = Math.cos(spAngle) * 48;
            const sy = Math.sin(spAngle) * 48;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(sx, sy);
            ctx.strokeStyle = "rgba(100, 116, 139, 0.85)";
            ctx.lineWidth = 2.0;
            ctx.stroke();

            // Illuminated cabin observation pods moving with the ring
            ctx.beginPath();
            ctx.arc(sx, sy, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = "#fef08a"; // Warm interior cabin light
            ctx.fill();
          }

          // Windows along habitat ring circumference
          for (let w = 0; w < 12; w++) {
            const wAngle = station.ringAngle + (w * Math.PI * 2) / 12;
            const wx = Math.cos(wAngle) * 48;
            const wy = Math.sin(wAngle) * 48;
            ctx.beginPath();
            ctx.arc(wx, wy, 1.2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(254, 240, 138, 0.85)";
            ctx.fill();
          }

          ctx.restore();

          // c. Central Pressurized Command Core
          const coreGrad = ctx.createLinearGradient(-12, 0, 12, 0);
          coreGrad.addColorStop(0, "#f8fafc");
          coreGrad.addColorStop(0.3, "#cbd5e1");
          coreGrad.addColorStop(0.7, "#475569");
          coreGrad.addColorStop(1, "#1e293b");
          ctx.fillStyle = coreGrad;
          ctx.fillRect(-12, -28, 24, 56);
          ctx.strokeStyle = "#94a3b8";
          ctx.lineWidth = 1;
          ctx.strokeRect(-12, -28, 24, 56);

          // Hull panel seam lines
          ctx.strokeStyle = "rgba(30, 41, 59, 0.6)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(-12, -14);
          ctx.lineTo(12, -14);
          ctx.moveTo(-12, 0);
          ctx.lineTo(12, 0);
          ctx.moveTo(-12, 14);
          ctx.lineTo(12, 14);
          ctx.stroke();

          // Observation Cupola Dome (Top)
          ctx.beginPath();
          ctx.arc(0, -28, 7.5, Math.PI, 0);
          ctx.fillStyle = "#0284c7";
          ctx.fill();
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1.2;
          ctx.stroke();

          // Golden cupola interior glow
          ctx.beginPath();
          ctx.arc(0, -28, 4, Math.PI, 0);
          ctx.fillStyle = "rgba(254, 240, 138, 0.9)";
          ctx.fill();

          // Docking Port (Bottom)
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(-6, 28, 12, 7);
          ctx.strokeStyle = "#64748b";
          ctx.lineWidth = 1;
          ctx.strokeRect(-6, 28, 12, 7);

          // Communications Dish (Upper Right Truss)
          ctx.save();
          ctx.translate(16, -20);
          ctx.rotate(-0.55);
          ctx.beginPath();
          ctx.arc(0, 0, 9, Math.PI * 0.4, Math.PI * 1.6);
          ctx.strokeStyle = "#e2e8f0";
          ctx.lineWidth = 1.5;
          ctx.stroke();
          // Feedhorn probe
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-6, 0);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.restore();

          // d. Navigation Strobes & Beacons
          const beaconNow = now * 0.003;
          const redBlink = Math.sin(beaconNow * 2) > 0.4 ? 1 : 0.15;
          const greenBlink = Math.sin(beaconNow * 2 + Math.PI) > 0.4 ? 1 : 0.15;
          const whiteFlash = Math.sin(beaconNow * 3.5) > 0.75 ? 1 : 0.1;

          // Port red beacon (left wingtip)
          ctx.beginPath();
          ctx.arc(-91, 0, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(239, 68, 68, ${redBlink})`;
          ctx.fill();
          if (redBlink > 0.5) {
            ctx.beginPath();
            ctx.arc(-91, 0, 7, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(239, 68, 68, 0.3)";
            ctx.fill();
          }

          // Starboard green beacon (right wingtip)
          ctx.beginPath();
          ctx.arc(91, 0, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34, 197, 94, ${greenBlink})`;
          ctx.fill();
          if (greenBlink > 0.5) {
            ctx.beginPath();
            ctx.arc(91, 0, 7, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(34, 197, 94, 0.3)";
            ctx.fill();
          }

          // Apex docking beacon (pulsing white diamond)
          ctx.beginPath();
          ctx.arc(0, -37, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${whiteFlash})`;
          ctx.fill();
          if (whiteFlash > 0.5) {
            ctx.beginPath();
            ctx.arc(0, -37, 6, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(56, 189, 248, 0.45)";
            ctx.fill();
          }

          ctx.restore();
        }

        // 6. Tactical Recon Space Jet ("Vanguard Recon-1")
        const jet = spaceJet;

        // Autonomous flight dynamics
        jet.targetAngle = jet.baseAngle + Math.sin(now * 0.0018) * 0.18;
        jet.angle += (jet.targetAngle - jet.angle) * 0.04;

        jet.x += Math.cos(jet.angle) * jet.speed;
        jet.y += Math.sin(jet.angle) * jet.speed - scrollDelta * 0.06;

        // Screen wraparound & respawn logic
        const jetMargin = 120;
        if (
          jet.x > width + jetMargin ||
          jet.y > height + jetMargin ||
          jet.x < -jetMargin ||
          jet.y < -jetMargin
        ) {
          const spawnLeft = Math.random() < 0.55;
          if (spawnLeft) {
            jet.x = -80;
            jet.y = Math.random() * (height * 0.65) + 60;
            jet.baseAngle = 0.22 + Math.random() * 0.35; // Down-right
          } else {
            jet.x = width + 80;
            jet.y = Math.random() * (height * 0.5) + 40;
            jet.baseAngle = Math.PI - 0.22 - Math.random() * 0.35; // Down-left
          }
          jet.angle = jet.baseAngle;
          jet.targetAngle = jet.baseAngle;
          jet.speed = 2.2 + Math.random() * 0.8;
          jet.exhaustParticles = [];
        }

        // Spawn trailing ion exhaust particles from twin engines
        const cosA = Math.cos(jet.angle);
        const sinA = Math.sin(jet.angle);
        const jScale = jet.scale;

        const leftEngX = jet.x - cosA * (22 * jScale) - sinA * (6 * jScale);
        const leftEngY = jet.y - sinA * (22 * jScale) + cosA * (6 * jScale);
        const rightEngX = jet.x - cosA * (22 * jScale) + sinA * (6 * jScale);
        const rightEngY = jet.y - sinA * (22 * jScale) - cosA * (6 * jScale);

        if (Math.random() < 0.65 && jet.exhaustParticles.length < 24) {
          const eng =
            Math.random() < 0.5
              ? { x: leftEngX, y: leftEngY }
              : { x: rightEngX, y: rightEngY };
          jet.exhaustParticles.push({
            x: eng.x,
            y: eng.y,
            vx: -cosA * (1.5 + Math.random()) + (Math.random() - 0.5) * 0.6,
            vy: -sinA * (1.5 + Math.random()) + (Math.random() - 0.5) * 0.6,
            alpha: 0.85,
            size: Math.random() * 2.2 + 1.0,
            color:
              Math.random() < 0.7
                ? "rgba(56, 189, 248, "
                : "rgba(129, 140, 248, ",
          });
        }

        // Render and decay exhaust particles
        for (let p = jet.exhaustParticles.length - 1; p >= 0; p--) {
          const ep = jet.exhaustParticles[p];
          ep.x += ep.vx;
          ep.y += ep.vy;
          ep.alpha -= 0.035;
          if (ep.alpha <= 0) {
            jet.exhaustParticles.splice(p, 1);
            continue;
          }
          ctx.beginPath();
          ctx.arc(ep.x, ep.y, ep.size, 0, Math.PI * 2);
          ctx.fillStyle = `${ep.color}${ep.alpha})`;
          ctx.fill();
        }

        // Draw Space Jet Vessel
        ctx.save();
        ctx.translate(jet.x, jet.y);
        ctx.scale(jScale, jScale);
        ctx.rotate(jet.angle);

        // 1. Dual Plasma Ion Thruster Flames
        const flameLen = 14 + Math.sin(now * 0.08) * 4;
        const drawThruster = (ey: number) => {
          const thrusterGrad = ctx.createLinearGradient(
            -22,
            ey,
            -22 - flameLen,
            ey,
          );
          thrusterGrad.addColorStop(0, "#ffffff");
          thrusterGrad.addColorStop(0.25, "rgba(56, 189, 248, 0.9)");
          thrusterGrad.addColorStop(0.7, "rgba(99, 102, 241, 0.45)");
          thrusterGrad.addColorStop(1, "rgba(147, 51, 234, 0)");

          ctx.beginPath();
          ctx.moveTo(-22, ey - 2.5);
          ctx.lineTo(-22 - flameLen, ey);
          ctx.lineTo(-22, ey + 2.5);
          ctx.closePath();
          ctx.fillStyle = thrusterGrad;
          ctx.fill();

          // Engine nozzle outer ring
          ctx.fillStyle = "#1e293b";
          ctx.fillRect(-23, ey - 3.5, 3, 7);
          ctx.strokeStyle = "#38bdf8";
          ctx.lineWidth = 0.8;
          ctx.strokeRect(-23, ey - 3.5, 3, 7);
        };

        drawThruster(-6);
        drawThruster(6);

        // 2. Main Aerodynamic Stealth Fuselage & Swept Delta Wings
        const hullGrad = ctx.createLinearGradient(0, -18, 0, 18);
        hullGrad.addColorStop(0, "#e2e8f0");
        hullGrad.addColorStop(0.3, "#94a3b8");
        hullGrad.addColorStop(0.7, "#334155");
        hullGrad.addColorStop(1, "#0f172a");

        ctx.beginPath();
        ctx.moveTo(28, 0); // Needle nose
        ctx.lineTo(8, -5); // Upper chine
        ctx.lineTo(-14, -20); // Port wingtip
        ctx.lineTo(-19, -17);
        ctx.lineTo(-16, -7); // Wing root
        ctx.lineTo(-21, -6); // Left engine nacelle
        ctx.lineTo(-21, -2);
        ctx.lineTo(-16, 0); // Fuselage aft center
        ctx.lineTo(-21, 2); // Right engine nacelle
        ctx.lineTo(-21, 6);
        ctx.lineTo(-16, 7);
        ctx.lineTo(-19, 17);
        ctx.lineTo(-14, 20); // Starboard wingtip
        ctx.lineTo(8, 5); // Lower chine
        ctx.closePath();

        ctx.fillStyle = hullGrad;
        ctx.fill();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.65)";
        ctx.lineWidth = 1.0;
        ctx.stroke();

        // Wing panel lines & accents
        ctx.strokeStyle = "rgba(14, 165, 233, 0.5)";
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(4, -3);
        ctx.lineTo(-14, -15);
        ctx.moveTo(4, 3);
        ctx.lineTo(-14, 15);
        ctx.stroke();

        // 3. Glowing Cockpit Visor / Canopy
        const canopyGrad = ctx.createLinearGradient(4, 0, 18, 0);
        canopyGrad.addColorStop(0, "rgba(56, 189, 248, 0.4)");
        canopyGrad.addColorStop(0.5, "rgba(56, 189, 248, 0.95)");
        canopyGrad.addColorStop(1, "#ffffff");

        ctx.beginPath();
        ctx.moveTo(6, -2.5);
        ctx.lineTo(19, 0);
        ctx.lineTo(6, 2.5);
        ctx.closePath();
        ctx.fillStyle = canopyGrad;
        ctx.fill();
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        // 4. Twin Canted Vertical Stabilizers (Fins)
        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 0.8;

        // Left canted fin
        ctx.beginPath();
        ctx.moveTo(-11, -7);
        ctx.lineTo(-18, -12);
        ctx.lineTo(-20, -7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right canted fin
        ctx.beginPath();
        ctx.moveTo(-11, 7);
        ctx.lineTo(-18, 12);
        ctx.lineTo(-20, 7);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 5. Wingtip Strobe Beacons
        const jetStrobe = Math.sin(now * 0.007) > 0.3 ? 1 : 0.15;
        // Port red
        ctx.beginPath();
        ctx.arc(-14, -20, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(239, 68, 68, ${jetStrobe})`;
        ctx.fill();
        // Starboard green
        ctx.beginPath();
        ctx.arc(-14, 20, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 197, 94, ${jetStrobe})`;
        ctx.fill();

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
