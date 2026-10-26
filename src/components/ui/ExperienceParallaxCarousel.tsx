import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Play,
  Pause,
  ExternalLink,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Building,
  Smartphone,
  Flame,
  Radio,
  Wifi,
  WifiOff,
  RefreshCw,
  Layers,
  Sparkles,
  Sliders,
  Terminal as TerminalIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Experience } from "../../types/portfolio";
import { StoreBadges } from "../StoreBadges";

interface ExperienceParallaxCarouselProps {
  experiences: Experience[];
  onOpenProject: (projectId: string) => void;
  // Optional shared simulation states
  tainOnline?: boolean;
  tainQueue?: number;
  tainSyncStatus?: "idle" | "syncing" | "synced";
  onTainAddSurvey?: () => void;
  onTainToggleNetwork?: () => void;
  erpStock?: number;
  erpInvoiceId?: number;
  erpStatus?: "idle" | "processing" | "billed";
  onErpDispatch?: () => void;
  acidLog?: string;
  acidRunning?: boolean;
  onTestAcid?: () => void;
}

export const ExperienceParallaxCarousel: React.FC<
  ExperienceParallaxCarouselProps
> = ({
  experiences,
  onOpenProject,
  tainOnline: propTainOnline,
  tainQueue: propTainQueue,
  tainSyncStatus: propTainSyncStatus,
  onTainAddSurvey,
  onTainToggleNetwork,
  erpStock: propErpStock,
  erpInvoiceId: propErpInvoiceId,
  erpStatus: propErpStatus,
  onErpDispatch,
  acidLog: propAcidLog,
  acidRunning: propAcidRunning,
  onTestAcid,
}) => {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Fallback local simulation states if not provided
  const [localTainOnline, setLocalTainOnline] = useState(false);
  const [localTainQueue, setLocalTainQueue] = useState(3);
  const [localTainSyncStatus, setLocalTainSyncStatus] = useState<
    "idle" | "syncing" | "synced"
  >("idle");
  const [localErpStock, setLocalErpStock] = useState(480);
  const [localErpInvoiceId, setLocalErpInvoiceId] = useState(1088);
  const [localErpStatus, setLocalErpStatus] = useState<
    "idle" | "processing" | "billed"
  >("idle");
  const [localAcidLog, setLocalAcidLog] = useState<string>(
    "ACID Pool: 10 connections active. Zero thread starvation."
  );
  const [localAcidRunning, setLocalAcidRunning] = useState(false);

  const tainOnline = propTainOnline !== undefined ? propTainOnline : localTainOnline;
  const tainQueue = propTainQueue !== undefined ? propTainQueue : localTainQueue;
  const tainSyncStatus = propTainSyncStatus !== undefined ? propTainSyncStatus : localTainSyncStatus;
  const erpStock = propErpStock !== undefined ? propErpStock : localErpStock;
  const erpInvoiceId = propErpInvoiceId !== undefined ? propErpInvoiceId : localErpInvoiceId;
  const erpStatus = propErpStatus !== undefined ? propErpStatus : localErpStatus;
  const acidLog = propAcidLog !== undefined ? propAcidLog : localAcidLog;
  const acidRunning = propAcidRunning !== undefined ? propAcidRunning : localAcidRunning;

  const handleTainAddSurvey = () => {
    if (onTainAddSurvey) onTainAddSurvey();
    else setLocalTainQueue((prev) => prev + 1);
  };

  const handleTainToggleNetwork = () => {
    if (onTainToggleNetwork) onTainToggleNetwork();
    else {
      const next = !localTainOnline;
      setLocalTainOnline(next);
      if (next && localTainQueue > 0) {
        setLocalTainSyncStatus("syncing");
        setTimeout(() => {
          setLocalTainQueue(0);
          setLocalTainSyncStatus("synced");
          setTimeout(() => setLocalTainSyncStatus("idle"), 2000);
        }, 1200);
      }
    }
  };

  const handleErpDispatch = () => {
    if (onErpDispatch) onErpDispatch();
    else {
      setLocalErpStatus("processing");
      setTimeout(() => {
        setLocalErpStock((prev) => Math.max(0, prev - 20));
        setLocalErpInvoiceId((prev) => prev + 1);
        setLocalErpStatus("billed");
        setTimeout(() => setLocalErpStatus("idle"), 1500);
      }, 600);
    }
  };

  const handleTestAcid = () => {
    if (onTestAcid) onTestAcid();
    else {
      setLocalAcidRunning(true);
      setLocalAcidLog("START TRANSACTION → Checking supplier inventory lock...");
      setTimeout(() => {
        setLocalAcidLog("EXECUTING: Multi-batch insert with parameterized query [OK]");
        setTimeout(() => {
          setLocalAcidLog("COMMIT: Transaction finalized in 38ms. Winston logs rotated.");
          setLocalAcidRunning(false);
        }, 500);
      }, 500);
    }
  };

  const n = experiences.length;
  if (n === 0) return null;

  // Modulo index resolution
  const activeIndex = ((page % n) + n) % n;
  const leftIndex = (((page - 1) % n) + n) % n;
  const rightIndex = (((page + 1) % n) + n) % n;

  const activeExp = experiences[activeIndex];
  const leftExp = experiences[leftIndex];
  const rightExp = experiences[rightIndex];

  const paginate = useCallback(
    (newDirection: number) => {
      setDirection(newDirection);
      setPage((prev) => prev + newDirection);
    },
    []
  );

  const jumpTo = (targetIdx: number) => {
    if (targetIdx === activeIndex) return;
    // Calculate shortest circular direction
    let diff = targetIdx - activeIndex;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    paginate(diff >= 0 ? 1 : -1);
  };

  // Autoplay timer - runs continuously when isAutoPlaying is true (not blocked by mouse hover)
  useEffect(() => {
    if (!isAutoPlaying || isDragging) return;
    const interval = setInterval(() => {
      paginate(1);
    }, 2800);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, paginate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") paginate(-1);
      if (e.key === "ArrowRight") paginate(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [paginate]);

  // Center card transition variants for true 3D carousel motion
  const centerVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 360 : -360,
      scale: 0.88,
      rotateY: dir > 0 ? -16 : 16,
      opacity: 0,
      zIndex: 20,
    }),
    center: {
      x: 0,
      scale: 1,
      rotateY: 0,
      opacity: 1,
      zIndex: 30,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -360 : 360,
      scale: 0.88,
      rotateY: dir > 0 ? 16 : -16,
      opacity: 0,
      zIndex: 10,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* =====================================================================
          1. TOP NAVIGATION & CONTROLS BAR
         ===================================================================== */}
      <div className="w-full max-w-7xl flex flex-wrap items-center justify-between gap-4 mb-6 px-4 sm:px-6">
        {/* Left Status Badge */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-sky-400 border border-sky-500/40 text-xs font-mono font-bold shadow-xs">
            <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />
            <span className="uppercase tracking-wider">
              Infinite Parallax Deck
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-slate-600">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span>
              Deployment {activeIndex + 1} of {n}:{" "}
              <strong className="text-slate-900 font-black">
                {activeExp.company}
              </strong>
            </span>
          </div>
        </div>

        {/* Right Action Controls: Prev, Next & Autoplay */}
        <div className="flex items-center gap-2">
          {/* Autoplay Pause/Play button */}
          <button
            onClick={() => setIsAutoPlaying((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-xs ${
              isAutoPlaying
                ? "bg-white text-slate-800 border-slate-200 hover:border-slate-400"
                : "bg-amber-50 text-amber-800 border-amber-300"
            }`}
            title={isAutoPlaying ? "Pause autoplay loop" : "Resume autoplay loop"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden md:inline">Auto-loop ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden md:inline">Auto-loop Paused</span>
              </>
            )}
          </button>

          {/* Prev Arrow Button */}
          <button
            onClick={() => paginate(-1)}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 shadow-sm hover:scale-105 active:scale-95 transition-all group"
            aria-label="Previous Deployment (Infinite Loop)"
            title="Rotate to previous deployment (Left arrow key)"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={() => paginate(1)}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-400 text-slate-700 hover:text-slate-900 shadow-sm hover:scale-105 active:scale-95 transition-all group"
            aria-label="Next Deployment (Infinite Loop)"
            title="Rotate to next deployment (Right arrow key)"
          >
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* =====================================================================
          2. 3D PARALLAX STAGE (LEFT CARD + CENTER CARD + RIGHT CARD)
         ===================================================================== */}
      <div
        className="relative w-full max-w-7xl min-h-[760px] lg:min-h-[720px] flex items-center justify-center overflow-visible"
        style={{ perspective: "1600px" }}
      >
        {/* -----------------------------------------------------------------
            LEFT CARD (Flanking Preview Card - Always Visible on Left)
           ----------------------------------------------------------------- */}
        <div
          onClick={() => paginate(-1)}
          className="hidden lg:flex absolute left-0 xl:left-4 top-1/2 -translate-y-1/2 w-[310px] xl:w-[350px] h-[640px] z-10 cursor-pointer rounded-3xl border-2 border-slate-200/90 bg-gradient-to-b from-white via-white to-slate-50/90 p-6 flex-col justify-between shadow-xl transition-all duration-300 hover:scale-[0.91] hover:opacity-95 hover:border-slate-400 hover:shadow-2xl group"
          style={{
            transform: "rotateY(16deg) scale(0.86)",
            transformStyle: "preserve-3d",
            opacity: 0.68,
          }}
          title={`Click to focus: ${leftExp.company}`}
        >
          {/* Top Hairline with Company Brand Color */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ backgroundColor: leftExp.accentColor }}
          />

          {/* Quick Header */}
          <div>
            <div className="flex items-center justify-between mb-3 mt-1">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                {leftExp.type}
              </span>
              <span className="text-[10px] font-mono text-slate-500 font-bold">
                {leftExp.period.split("–")[0].trim()}
              </span>
            </div>

            <h4 className="text-xl font-black font-display text-slate-900 group-hover:text-slate-700 transition-colors leading-tight">
              {leftExp.company}
            </h4>
            <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-2">
              {leftExp.role}
            </p>

            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-4 p-3 rounded-2xl bg-slate-50/90 border border-slate-200 line-clamp-4">
              {leftExp.summary}
            </p>

            {/* Micro Highlight Pills */}
            <div className="mt-4 space-y-1.5">
              {leftExp.metrics && leftExp.metrics[0] && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[9px] font-mono uppercase text-slate-500 font-bold">
                    {leftExp.metrics[0].label}
                  </div>
                  <div
                    className="text-xs font-black font-display"
                    style={{ color: leftExp.accentColor }}
                  >
                    {leftExp.metrics[0].value}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Call-to-Action Badge */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-600 group-hover:text-slate-900">
            <span className="flex items-center gap-1.5">
              <ChevronLeft className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Rotate into Focus</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">Prev</span>
          </div>
        </div>

        {/* -----------------------------------------------------------------
            CENTER CARD (Active Hero Focus - Full Interactive Content)
           ----------------------------------------------------------------- */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={page}
            custom={direction}
            variants={centerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(e, { offset, velocity }) => {
              setIsDragging(false);
              const swipe = Math.abs(offset.x) * velocity.x;
              if (offset.x < -60 || swipe < -200) {
                paginate(1);
              } else if (offset.x > 60 || swipe > 200) {
                paginate(-1);
              }
            }}
            className="w-full max-w-3xl xl:max-w-4xl bg-gradient-to-b from-white via-white to-slate-50/90 rounded-3xl border-2 border-slate-200/90 shadow-2xl p-6 sm:p-9 relative overflow-hidden transition-colors"
          >
            {/* Top Accent Specular Hairline */}
            <div
              className="absolute top-0 left-0 right-0 h-1.5"
              style={{ backgroundColor: activeExp.accentColor }}
            />

            {/* Header: Badges & Actions */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className="text-xs font-mono px-3 py-1 rounded-full font-black text-white shadow-xs"
                    style={{ backgroundColor: activeExp.accentColor }}
                  >
                    {activeExp.type}
                  </span>
                  <span className="text-xs font-mono text-slate-600 font-bold flex items-center gap-1.5 bg-slate-100/90 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {activeExp.period}
                  </span>
                  <span className="text-xs font-mono text-slate-600 font-bold flex items-center gap-1.5 bg-slate-100/90 px-2.5 py-0.5 rounded-lg border border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {activeExp.location}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                  {activeExp.role}
                </h3>
                <div
                  className="text-base font-black mt-1 font-mono flex items-center gap-2"
                  style={{ color: activeExp.accentColor }}
                >
                  <Building className="w-4 h-4 stroke-[2.5]" />
                  <span>{activeExp.company}</span>
                </div>
              </div>

              {/* Store Badges & Action CTA */}
              <div className="flex flex-wrap items-center gap-2.5">
                {activeExp.storeLinks && (
                  <StoreBadges
                    appStoreUrl={activeExp.storeLinks.appStoreUrl}
                    playStoreUrl={activeExp.storeLinks.playStoreUrl}
                    variant="pill"
                  />
                )}

                {activeExp.associatedProject && (
                  <button
                    onClick={() => onOpenProject(activeExp.associatedProject!)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-black text-white shadow-md hover:shadow-lg transition-all active:scale-95"
                    style={{ backgroundColor: activeExp.accentColor }}
                  >
                    <span>Inspect Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                )}
              </div>
            </div>

            {/* Main Content Grid: Left Dossier + Right Telemetry Simulation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
              {/* Left Column (7 cols): Summary & Key Highlights */}
              <div className="lg:col-span-7 space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50/90 p-4 rounded-2xl border border-slate-200">
                  {activeExp.summary}
                </p>

                <div>
                  <h4 className="text-xs font-mono uppercase font-black tracking-wider text-slate-900 mb-2 flex items-center gap-1.5">
                    <CheckCircle2
                      className="w-4 h-4"
                      style={{ color: activeExp.accentColor }}
                    />
                    <span>Key Engineering Deliverables</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeExp.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                          style={{ backgroundColor: activeExp.accentColor }}
                        />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="pt-3 border-t border-slate-200/80">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold mb-1.5">
                    Production Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeExp.technologies.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-bold hover:border-slate-400 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (5 cols): Interactive Simulation & Challenge Spotlight */}
              <div className="lg:col-span-5 space-y-4">
                {/* 1. Interactive Simulation Pod (Tailored for each experience) */}
                {activeExp.id === "tain-electai" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-xs text-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
                        <Smartphone className="w-3.5 h-3.5 text-sky-600" />
                        <span>Live Device Telemetry</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200 font-bold">
                        AsyncStorage Write-Queue
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-600">NetInfo Status:</span>
                        <span
                          className={`font-black flex items-center gap-1 ${
                            tainOnline ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {tainOnline ? (
                            <>
                              <Wifi className="w-3 h-3" /> Online
                            </>
                          ) : (
                            <>
                              <WifiOff className="w-3 h-3" /> 0% (Offline-First)
                            </>
                          )}
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-600">Local Write-Queue:</span>
                        <span className="font-black text-sky-600">
                          {tainQueue} Surveys Buffered
                        </span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-600">Sync Worker:</span>
                        <span className="font-bold text-slate-700 flex items-center gap-1">
                          {tainSyncStatus === "syncing" && (
                            <RefreshCw className="w-3 h-3 animate-spin text-sky-600" />
                          )}
                          {tainSyncStatus === "syncing"
                            ? "Backoff Syncing..."
                            : tainSyncStatus === "synced"
                            ? "Reconciled to Supabase!"
                            : tainOnline
                            ? "Standing by"
                            : "Waiting for network"}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={handleTainAddSurvey}
                        className="py-1.5 px-2 rounded-xl bg-white text-slate-800 border border-slate-200 hover:border-slate-400 text-[11px] font-mono font-bold transition-all active:scale-95"
                      >
                        + Buffer Survey
                      </button>
                      <button
                        onClick={handleTainToggleNetwork}
                        className="py-1.5 px-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-[11px] font-mono font-bold transition-all active:scale-95"
                      >
                        {tainOnline ? "Simulate Offline" : "Reconnect Cellular"}
                      </button>
                    </div>
                  </div>
                )}

                {activeExp.id === "nebula-technology" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-xs text-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
                        <Layers className="w-3.5 h-3.5 text-emerald-600" />
                        <span>AgroStock ERP Simulator</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                        Redux Store + GST
                      </span>
                    </div>

                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-600">Inventory Stock:</span>
                        <span className="font-black text-emerald-600">
                          {erpStock} Units Available
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-slate-200">
                        <span className="text-slate-600">Active Tax Invoice:</span>
                        <span className="font-black text-slate-900">
                          #INV-2026-{erpInvoiceId} (18% GST)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleErpDispatch}
                      disabled={erpStatus === "processing"}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-mono font-bold active:scale-95 transition-all shadow-xs"
                    >
                      {erpStatus === "processing"
                        ? "Decrementing Stock & Generating jsPDF..."
                        : erpStatus === "billed"
                        ? "✓ Tax Invoice Generated"
                        : "+ Dispatch 20 Units & Generate Invoice"}
                    </button>
                  </div>
                )}

                {activeExp.id === "knowledge-keen" && (
                  <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-xs text-xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
                        <Radio className="w-3.5 h-3.5 text-purple-600" />
                        <span>MySQL Transaction Pool</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200 font-bold">
                        ACID Pool
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200 font-mono text-[10px] text-slate-700 break-words leading-relaxed">
                      {acidLog}
                    </div>

                    <button
                      onClick={handleTestAcid}
                      disabled={acidRunning}
                      className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-mono font-bold transition-all active:scale-95 shadow-xs"
                    >
                      {acidRunning
                        ? "Executing Parameterized Transaction..."
                        : "Test Atomic ACID Commit"}
                    </button>
                  </div>
                )}

                {/* 2. Challenge & Solution Spotlight */}
                {activeExp.engineeringChallenge && (
                  <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs space-y-2.5 shadow-md">
                    <div className="flex items-center gap-2 font-mono font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Hurdle & Solution</span>
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      <strong className="text-amber-300 font-bold">
                        Problem:
                      </strong>{" "}
                      {activeExp.engineeringChallenge.challenge}
                    </p>
                    <p className="text-slate-200 leading-relaxed">
                      <strong className="text-emerald-400 font-bold">
                        Solution:
                      </strong>{" "}
                      {activeExp.engineeringChallenge.solution}
                    </p>
                    <p className="text-sky-400 font-bold pt-2 border-t border-slate-800 flex items-center gap-1.5">
                      <span>Impact:</span>{" "}
                      <span className="text-slate-300 font-normal">
                        {activeExp.engineeringChallenge.impact}
                      </span>
                    </p>
                  </div>
                )}

                {/* 3. Verified Metrics Counters */}
                {activeExp.metrics && (
                  <div className="grid grid-cols-2 gap-2">
                    {activeExp.metrics.map((m, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200"
                      >
                        <div className="text-[10px] font-mono text-slate-500 uppercase font-bold truncate">
                          {m.label}
                        </div>
                        <div className="text-xs font-black font-display text-slate-900 mt-0.5 truncate">
                          {m.value}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* -----------------------------------------------------------------
            RIGHT CARD (Flanking Preview Card - Always Visible on Right)
           ----------------------------------------------------------------- */}
        <div
          onClick={() => paginate(1)}
          className="hidden lg:flex absolute right-0 xl:right-4 top-1/2 -translate-y-1/2 w-[310px] xl:w-[350px] h-[640px] z-10 cursor-pointer rounded-3xl border-2 border-slate-200/90 bg-gradient-to-b from-white via-white to-slate-50/90 p-6 flex-col justify-between shadow-xl transition-all duration-300 hover:scale-[0.91] hover:opacity-95 hover:border-slate-400 hover:shadow-2xl group"
          style={{
            transform: "rotateY(-16deg) scale(0.86)",
            transformStyle: "preserve-3d",
            opacity: 0.68,
          }}
          title={`Click to focus: ${rightExp.company}`}
        >
          {/* Top Hairline with Company Brand Color */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ backgroundColor: rightExp.accentColor }}
          />

          {/* Quick Header */}
          <div>
            <div className="flex items-center justify-between mb-3 mt-1">
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-bold">
                {rightExp.type}
              </span>
              <span className="text-[10px] font-mono text-slate-500 font-bold">
                {rightExp.period.split("–")[0].trim()}
              </span>
            </div>

            <h4 className="text-xl font-black font-display text-slate-900 group-hover:text-slate-700 transition-colors leading-tight">
              {rightExp.company}
            </h4>
            <p className="text-xs font-semibold text-slate-600 mt-1 line-clamp-2">
              {rightExp.role}
            </p>

            <p className="text-xs text-slate-700 font-medium leading-relaxed mt-4 p-3 rounded-2xl bg-slate-50/90 border border-slate-200 line-clamp-4">
              {rightExp.summary}
            </p>

            {/* Micro Highlight Pills */}
            <div className="mt-4 space-y-1.5">
              {rightExp.metrics && rightExp.metrics[0] && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="text-[9px] font-mono uppercase text-slate-500 font-bold">
                    {rightExp.metrics[0].label}
                  </div>
                  <div
                    className="text-xs font-black font-display"
                    style={{ color: rightExp.accentColor }}
                  >
                    {rightExp.metrics[0].value}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer Call-to-Action Badge */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono font-bold text-slate-600 group-hover:text-slate-900">
            <span className="text-[10px] text-slate-400 font-normal">Next</span>
            <span className="flex items-center gap-1.5">
              <span>Rotate into Focus</span>
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          3. BOTTOM CONTROLS & DIRECT MISSION JUMP BUTTONS
         ===================================================================== */}
      <div className="w-full max-w-4xl mt-8 flex flex-col items-center gap-4 px-4">
        {/* Quick Mission Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {experiences.map((exp, idx) => {
            const isCurrent = idx === activeIndex;
            return (
              <button
                key={exp.id}
                onClick={() => jumpTo(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
                  isCurrent
                    ? "bg-slate-900 text-white border-slate-900 shadow-sm scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isCurrent ? "#38bdf8" : exp.accentColor }}
                />
                <span>{exp.company}</span>
              </button>
            );
          })}
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {experiences.map((_, idx) => (
            <button
              key={idx}
              onClick={() => jumpTo(idx)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === idx
                  ? "w-8 h-2 bg-slate-900 shadow-xs"
                  : "w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
              title={`Go to mission ${idx + 1}`}
            />
          ))}
        </div>

        <p className="text-[11px] font-mono text-slate-500 text-center">
          ⚡ Infinite Loop Deck • Click side cards, use arrows, or swipe to rotate through production deployments
        </p>
      </div>
    </div>
  );
};
