import React, { useState, useEffect, useRef } from "react";
import {
  GraduationCap,
  Layers,
  Smartphone,
  Cpu,
  Server,
  Wifi,
  WifiOff,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FileDown,
  BookOpen,
  Sparkles,
  MessageCircle,
  Zap,
  Terminal,
  ShieldCheck,
  Check,
  ExternalLink,
} from "lucide-react";
import { TiltCard } from "./TiltCard";
import { StoreBadges } from "./StoreBadges";
import { scrollToTarget } from "./SmoothScroll";
import { PERSONAL_INFO } from "../data/portfolioData";

interface HorizontalScrollytellingProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export const HorizontalScrollytelling: React.FC<HorizontalScrollytellingProps> = ({
  onOpenResume,
  onOpenTerminal,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  const [progress, setProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [maxTranslate, setMaxTranslate] = useState(0);

  // Chapter 2 interactive simulation: ERP Sales Order Dispatch & Stock Deduction
  const [erpStockCount, setErpStockCount] = useState<number>(450);
  const [erpInvoiceNum, setErpInvoiceNum] = useState<number>(1042);
  const [erpDispatchStatus, setErpDispatchStatus] = useState<
    "idle" | "deducting" | "billed"
  >("idle");
  const [erpLog, setErpLog] = useState(
    "SKU-WHT-300 batch #24B verified at 450 units. Ledger online.",
  );

  // Chapter 3 interactive simulation: TAIN Elect AI offline state
  const [simOnline, setSimOnline] = useState(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState(3);

  // Chapters Meta
  const chapters = [
    {
      id: "foundation",
      num: "01",
      title: "Academic Rigor & Algorithmic Foundations",
      shortTitle: "Academic Rigor",
      tag: "Double 9.05 CGPA Distinction",
    },
    {
      id: "enterprise",
      num: "02",
      title: "High-Throughput ERP Billing & Inventory Reconciliation",
      shortTitle: "Enterprise ERP",
      tag: "AgroStock & Greentop Systems",
    },
    {
      id: "mobile",
      num: "03",
      title: "Offline-First Mobile Resilience & Local Sync",
      shortTitle: "Offline Mobile",
      tag: "TAIN Elect AI React Native",
    },
    {
      id: "genai",
      num: "04",
      title: "Applied Gen-AI & Peer-Reviewed Research",
      shortTitle: "Gen-AI Research",
      tag: "Published Journal Paper 2026",
    },
    {
      id: "devops",
      num: "05",
      title: "Cloud DevOps & Production Scaling",
      shortTitle: "DevOps & Scale",
      tag: "Docker, AWS & CI/CD Delivery",
    },
  ];

  // Measure track width and calculate maximum horizontal travel
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewWidth = window.innerWidth;
      const maxDist = Math.max(0, trackWidth - viewWidth + 60);
      setMaxTranslate(maxDist);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Sync vertical scroll to horizontal progress
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollableDist <= 0) return;

      const scrolled = -rect.top;
      const normProgress = Math.max(0, Math.min(1, scrolled / scrollableDist));
      setProgress(normProgress);

      const chapterIdx = Math.min(4, Math.floor(normProgress * 5));
      setActiveChapter(chapterIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Jump to specific chapter via vertical scroll positioning
  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + (index / 4.2) * scrollableDist;
    scrollToTarget(targetScrollY, { duration: 1.15 });
  };

  const handlePrev = () => {
    if (activeChapter > 0) scrollToChapter(activeChapter - 1);
  };

  const handleNext = () => {
    if (activeChapter < 4) scrollToChapter(activeChapter + 1);
  };

  // Simulation helpers
  const handleDispatchOrder = () => {
    if (erpStockCount <= 25) {
      setErpLog("⚠️ Reorder alert: Stock < 25 units. Replenishing demo batch to 450...");
      setErpStockCount(450);
      return;
    }
    setErpDispatchStatus("deducting");
    setErpLog(`Dispatching B2B Order #INV-${erpInvoiceNum}... Verifying batch SKU-WHT-300.`);
    setTimeout(() => {
      const deduction = 25;
      const newStock = erpStockCount - deduction;
      const nextInv = erpInvoiceNum + 1;
      setErpStockCount(newStock);
      setErpInvoiceNum(nextInv);
      setErpDispatchStatus("billed");
      setErpLog(`✓ Invoiced ₹38,500 (+18% GST). Deducted ${deduction} units (Balance: ${newStock}). jsPDF invoice generated.`);
      setTimeout(() => setErpDispatchStatus("idle"), 1200);
    }, 600);
  };

  const handleToggleOnline = () => {
    setSimOnline((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => setOfflineQueueCount(0), 600);
      } else {
        setOfflineQueueCount(3);
      }
      return next;
    });
  };

  const translateX = progress * maxTranslate;

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full"
      style={{ height: "420vh" }}
    >
      {/* Sticky Fullscreen Scrollytelling Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between px-4 sm:px-8 py-5 sm:py-6 bg-[#f8fafc]/95 backdrop-blur-sm z-10">
        
        {/* Scrollytelling Header */}
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-2 z-30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-[11px] font-mono uppercase tracking-wider font-bold shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Engineering Journey</span>
                </span>
                <span className="text-slate-300 font-mono text-xs hidden sm:inline">•</span>
                <span className="text-xs font-mono text-slate-500 font-semibold hidden sm:inline">
                  Chapter 0{activeChapter + 1} of 05
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1 tracking-tight">
                Architectural Storytelling &amp; Technical Milestones
              </h2>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
                Scroll down or navigate:
              </span>
              <button
                onClick={handlePrev}
                disabled={activeChapter === 0}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all shadow-2xs active:scale-95"
                title="Previous Chapter"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeChapter === 4}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-400 transition-all shadow-2xs active:scale-95"
                title="Next Chapter"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chapter Timeline Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap shrink-0 border ${
                  activeChapter === idx
                    ? "bg-slate-900 text-white font-bold border-slate-900 shadow-sm scale-[1.02]"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900 font-medium"
                }`}
              >
                <span className="opacity-70 text-[10px] font-bold">{ch.num}</span>
                <span>{ch.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Slender Progress Track */}
          <div className="w-full h-1 bg-slate-200/80 rounded-full overflow-hidden mt-0.5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-sky-500 via-blue-500 to-indigo-600 transition-all duration-75"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        {/* The Horizontal Scrolling Track */}
        <div className="w-full overflow-visible my-auto z-10 py-2">
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-8 will-change-transform transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(-${translateX}px, 0, 0)`,
            }}
          >
            
            {/* ======================================================== */}
            {/* CHAPTER 01: Academic Rigor & CS Foundations              */}
            {/* ======================================================== */}
            <div className="w-[86vw] max-w-[900px] min-w-[320px] shrink-0">
              <TiltCard maxTilt={3.5} scale={1.008} glareOpacity={0.06}>
                <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/75 hover:border-slate-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] overflow-hidden transition-all duration-300 group">
                  {/* Slender Top Gradient Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500/80 via-teal-400/60 to-transparent" />
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7 items-center">
                    {/* Left Column: Narrative & Credentials */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>CH-01 · FOUNDATIONS</span>
                          </span>
                          <span className="text-slate-300 font-mono text-xs">•</span>
                          <span className="text-[11px] font-mono text-slate-500 font-medium truncate">
                            SPPU Pune
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-snug">
                          Algorithmic Rigor &amp; Double 9.05 CGPA
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                          Engineering resilience begins with computer science fundamentals.
                          Secured a <strong className="text-emerald-700 font-bold">9.05 CGPA in M.Sc. Computer Science</strong> and a{" "}
                          <strong className="text-emerald-700 font-bold">9.05 CGPA in B.Sc. Computer Science</strong>, mastering computational complexity,
                          ACID transactional guarantees, OOP design patterns, and distributed architectures.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          <span>Academic Distinction</span>
                        </div>
                        <button
                          onClick={onOpenResume}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-600 text-white text-xs font-medium transition-all shadow-sm active:scale-95"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>View Transcript</span>
                        </button>
                      </div>
                    </div>

                    {/* Right Column: Decent Sleek Metric Pods */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-emerald-300/80 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">M.SC. COMP SCI</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                          <div className="text-2xl font-black font-display text-emerald-600">
                            9.05 <span className="text-xs font-mono text-slate-400 font-medium">CGPA</span>
                          </div>
                          <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                            2023 - 2025 · First Class Distinction
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-200/70 hover:border-emerald-300/80 transition-colors">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">B.SC. COMP SCI</span>
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                          </div>
                          <div className="text-2xl font-black font-display text-emerald-600">
                            9.05 <span className="text-xs font-mono text-slate-400 font-medium">CGPA</span>
                          </div>
                          <div className="text-[11px] font-medium text-slate-500 mt-0.5">
                            2020 - 2023 · First Class Distinction
                          </div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50/60 border border-slate-200/60 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center font-bold">
                            <Zap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-800">Top 1% Theoretical Foundations</div>
                            <div className="text-[11px] text-slate-500">ACID DBs, Complexity, Data Structures</div>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold border border-emerald-200/60">
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* ======================================================== */}
            {/* CHAPTER 02: Enterprise ERP Billing & Inventory           */}
            {/* ======================================================== */}
            <div className="w-[86vw] max-w-[900px] min-w-[320px] shrink-0">
              <TiltCard maxTilt={3.5} scale={1.008} glareOpacity={0.06}>
                <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/75 hover:border-slate-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] overflow-hidden transition-all duration-300 group">
                  {/* Slender Top Gradient Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-cyan-500/80 via-sky-400/60 to-transparent" />
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7 items-center">
                    {/* Left Column: Narrative & Metrics */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200/80 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            <span>CH-02 · ENTERPRISE</span>
                          </span>
                          <span className="text-slate-300 font-mono text-xs">•</span>
                          <span className="text-[11px] font-mono text-slate-500 font-medium truncate">
                            AgroStock ERP
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-snug">
                          High-Throughput ERP &amp; Stock Reconciliation
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                          Engineered multi-warehouse inventory pipelines with atomic stock deduction
                          routines that prevent overselling across simultaneous wholesale counters, compute tiered pricing
                          with automated 18% GST calculation, and generate instant client-ready vector PDF invoices.
                        </p>
                      </div>

                      {/* 3 Clean Metrics */}
                      <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-slate-100">
                        <div className="p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-mono font-medium">CATALOG</div>
                          <div className="text-sm font-black font-mono text-slate-800">10,000+</div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-mono font-medium">DISCREPANCY</div>
                          <div className="text-sm font-black font-mono text-emerald-600">0.00%</div>
                        </div>
                        <div className="p-2 rounded-xl bg-slate-50/70 border border-slate-100">
                          <div className="text-[10px] text-slate-400 font-mono font-medium">PDF LATENCY</div>
                          <div className="text-sm font-black font-mono text-cyan-600">&lt;150ms</div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Sleek Interactive Simulator Terminal */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
                      <div className="p-4 rounded-xl bg-slate-900 text-white shadow-md border border-slate-800">
                        {/* Terminal Header */}
                        <div className="flex items-center justify-between pb-2.5 border-b border-slate-800">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                            <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                            <span className="text-[10px] font-mono text-slate-400 ml-1.5">
                              dispatch-daemon // SKU-WHT-300
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold ${
                            erpStockCount > 100
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          }`}>
                            {erpStockCount} Units In Stock
                          </span>
                        </div>

                        {/* Inventory Progress Bar */}
                        <div className="my-2.5">
                          <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                            <span>Warehouse Fill Level</span>
                            <span>{Math.round((erpStockCount / 450) * 100)}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-300"
                              style={{ width: `${(erpStockCount / 450) * 100}%` }}
                            />
                          </div>
                        </div>

                        {/* Interactive Dispatch Button */}
                        <div className="flex items-center justify-between gap-2 my-2">
                          <button
                            onClick={handleDispatchOrder}
                            disabled={erpDispatchStatus === "deducting"}
                            className="w-full py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-sm active:scale-98"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>
                              {erpDispatchStatus === "deducting" ? "Deducting Stock..." : "Dispatch B2B Order (-25 Bags)"}
                            </span>
                          </button>
                        </div>

                        {/* Live Telemetry Log */}
                        <div className="text-[11px] font-mono text-emerald-400 bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 truncate">
                          &gt; {erpLog}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* ======================================================== */}
            {/* CHAPTER 03: Offline-First Mobile Resilience & Published  */}
            {/* ======================================================== */}
            {/* ======================================================== */}
            {/* CHAPTER 03: Offline-First Mobile Resilience & Published  */}
            {/* ======================================================== */}
            <div className="w-[86vw] max-w-[900px] min-w-[320px] shrink-0">
              <TiltCard maxTilt={3.5} scale={1.008} glareOpacity={0.06}>
                <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/75 hover:border-slate-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] overflow-hidden transition-all duration-300 group">
                  {/* Slender Top Gradient Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-600/80 via-sky-400/60 to-transparent" />
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7 items-center">
                    {/* Left Column: Narrative & Store Badges */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200/80 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            <span>CH-03 · MOBILE</span>
                          </span>
                          <span className="text-slate-300 font-mono text-xs">•</span>
                          <span className="text-[11px] font-mono text-slate-500 font-medium truncate">
                            TAIN Elect AI
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-snug">
                          Offline-First Field Resilience &amp; Store Releases
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                          Engineered for field operations in zero-connectivity rural zones. Built on React Native
                          (Expo Router) with a deterministic local SQLite write-queue. Published under
                          <strong className="text-slate-900 font-bold"> Apple iOS Unlisted Distribution</strong> and deployed to production via the
                          <strong className="text-slate-900 font-bold"> Google Play Store</strong>.
                        </p>
                      </div>

                      {/* Store Badges Row */}
                      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <span className="text-xs font-mono text-slate-500 font-medium">Store Publications:</span>
                        <StoreBadges
                          appStoreUrl="https://apps.apple.com/us/app/tain-electai/id6807301293"
                          playStoreUrl="https://play.google.com/store/apps/details?id=com.elitespro.BEMS&pcampaignid=web_share"
                          variant="compact"
                        />
                      </div>
                    </div>

                    {/* Right Column: Network Cockpit */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
                      <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            {simOnline ? (
                              <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-xs font-bold">
                                <Wifi className="w-4 h-4 text-emerald-500" />
                                <span>ONLINE (Cloud Sync Active)</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1.5 text-amber-700 font-mono text-xs font-bold">
                                <WifiOff className="w-4 h-4 text-amber-500" />
                                <span>OFFLINE (Local SQLite Active)</span>
                              </div>
                            )}
                          </div>

                          <button
                            onClick={handleToggleOnline}
                            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                              simOnline
                                ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                            }`}
                          >
                            {simOnline ? "Cut Network" : "Restore Network"}
                          </button>
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-slate-200/80 flex items-center justify-between text-xs font-mono">
                          <span className="text-slate-600">Pending Write Queue:</span>
                          <span className={`font-bold ${offlineQueueCount === 0 ? "text-emerald-600" : "text-blue-600"}`}>
                            {offlineQueueCount === 0 ? "✓ 0 Records (Synced)" : `${offlineQueueCount} updates buffered`}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="p-2 rounded-lg bg-white border border-slate-200/60">
                            <div className="text-[10px] text-slate-400 font-mono">IOS</div>
                            <div className="font-bold text-slate-800 mt-0.5">Apple Unlisted</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-slate-200/60">
                            <div className="text-[10px] text-slate-400 font-mono">ANDROID</div>
                            <div className="font-bold text-emerald-700 mt-0.5">Play Console</div>
                          </div>
                          <div className="p-2 rounded-lg bg-white border border-slate-200/60">
                            <div className="text-[10px] text-slate-400 font-mono">STACK</div>
                            <div className="font-bold text-slate-800 mt-0.5">Expo + SQLite</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* ======================================================== */}
            {/* CHAPTER 04: Applied Gen-AI & Peer-Reviewed Research      */}
            {/* ======================================================== */}
            <div className="w-[86vw] max-w-[900px] min-w-[320px] shrink-0">
              <TiltCard maxTilt={3.5} scale={1.008} glareOpacity={0.06}>
                <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/75 hover:border-slate-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] overflow-hidden transition-all duration-300 group">
                  {/* Slender Top Gradient Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500/80 via-pink-400/60 to-transparent" />
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7 items-center">
                    {/* Left Column: Narrative & Paper Download */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200/80 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            <span>CH-04 · AI RESEARCH</span>
                          </span>
                          <span className="text-slate-300 font-mono text-xs">•</span>
                          <span className="text-[11px] font-mono text-slate-500 font-medium truncate">
                            ISSN: 2582-8436
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-snug">
                          Peer-Reviewed Gen-AI Research &amp; LangChain Agents
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                          Published original empirical research investigating Generative AI systems, prompt optimization,
                          and autonomous reasoning models. Engineered LangChain agent systems with structured JSON schema
                          validation and multi-provider failover routing between Gemini 2.5 and OpenAI GPT-4o.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-medium">
                          <BookOpen className="w-4 h-4 text-purple-500" />
                          <span>Peer-Reviewed Journal</span>
                        </div>
                        <a
                          href="/research-paper-genai-inamdar-2026.pdf"
                          download="GenAI_Research_Paper_Inamdar_2026.pdf"
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all shadow-sm active:scale-95"
                        >
                          <FileDown className="w-3.5 h-3.5" />
                          <span>Download Paper PDF</span>
                        </a>
                      </div>
                    </div>

                    {/* Right Column: Decent Scientific Dossier Preview */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
                      <div className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-200/60">
                          <span className="uppercase font-bold text-purple-700">CITATION PREVIEW · 030117.PDF</span>
                          <span>VOL. 13 · ISSUE 1 · 2026</span>
                        </div>

                        <div className="text-sm font-display italic font-bold text-slate-900">
                          &ldquo;A Study on Generative AI&rdquo;
                        </div>

                        <div className="text-[11px] font-mono text-slate-600">
                          Authors: Zafarali Faizahmed Inamdar, Dr. Jyoti Malhotra
                        </div>

                        <div className="p-2.5 rounded-lg bg-white border border-slate-200/60 flex items-center justify-between text-xs">
                          <span className="font-mono text-slate-500 text-[11px]">Provider Routing:</span>
                          <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-mono font-bold text-[10px] border border-purple-200/60">
                            Gemini 2.5 ⇄ GPT-4o
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* ======================================================== */}
            {/* CHAPTER 05: Cloud Infrastructure & Scale                 */}
            {/* ======================================================== */}
            <div className="w-[86vw] max-w-[900px] min-w-[320px] shrink-0">
              <TiltCard maxTilt={3.5} scale={1.008} glareOpacity={0.06}>
                <div className="relative rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/75 hover:border-slate-300 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.06),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_-12px_rgba(15,23,42,0.12)] overflow-hidden transition-all duration-300 group">
                  {/* Slender Top Gradient Hairline */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-indigo-500/80 via-purple-400/60 to-transparent" />
                  <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-7 items-center">
                    {/* Left Column: Narrative & Action Channels */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2.5">
                          <span className="text-[10px] font-mono tracking-widest uppercase font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200/80 flex items-center gap-1.5 shadow-2xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                            <span>CH-05 · INFRASTRUCTURE</span>
                          </span>
                          <span className="text-slate-300 font-mono text-xs">•</span>
                          <span className="text-[11px] font-mono text-slate-500 font-medium truncate">
                            AWS &amp; Docker
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 tracking-tight leading-snug">
                          Cloud DevOps &amp; 99.9% Production Delivery
                        </h3>

                        <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                          Code creates enterprise value when it reliably runs in production. Deployed on AWS EC2
                          with Docker multi-stage containers, automated GitHub Actions CI/CD pipelines, NGINX SSL,
                          and Prometheus-ready health telemetry. Available for immediate engineering impact.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                        <div className="text-xs text-slate-500 font-mono">
                          WhatsApp: <strong className="text-emerald-700 font-bold">{PERSONAL_INFO.phone}</strong>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20reviewed%20your%20engineering%20journey%20and%20would%20like%20to%20connect."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-all shadow-sm active:scale-95"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                          <button
                            onClick={onOpenTerminal}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono transition-all shadow-sm active:scale-95"
                          >
                            <Terminal className="w-3.5 h-3.5 text-sky-400" />
                            <span>CLI</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: 4 Minimalist Telemetry Tiles */}
                    <div className="lg:col-span-6 flex flex-col justify-center space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-center">
                          <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">AVAILABILITY</div>
                          <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">99.9% Uptime</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">SLA Guaranteed</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-center">
                          <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">CONTAINERS</div>
                          <div className="text-lg font-black text-sky-600 font-mono mt-0.5">Docker Multi</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Minimal Images</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-center">
                          <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">AUTOMATION</div>
                          <div className="text-lg font-black text-indigo-600 font-mono mt-0.5">GitHub CI/CD</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Zero-Downtime</div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/70 text-center">
                          <div className="text-[10px] text-slate-400 font-mono font-bold uppercase">RESPONSE</div>
                          <div className="text-lg font-black text-purple-600 font-mono mt-0.5">&lt; 24h</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Direct Inquiry</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>

        {/* Scrollytelling Bottom Flow Navigation Footer */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-slate-200/80 z-30 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
            <span className="text-[11px] text-slate-500">
              Scroll down or drag horizontally to advance through narrative
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-700 font-bold">
              {Math.round(progress * 100)}% Narrative Completed
            </span>
            <a
              href="#projects"
              className="text-[11px] text-slate-600 hover:text-slate-900 underline font-semibold"
            >
              Skip to Projects ↓
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
