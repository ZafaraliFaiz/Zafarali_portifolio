import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Layers, 
  Smartphone, 
  Cpu, 
  Server, 
  Wifi, 
  WifiOff, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  FileDown, 
  BookOpen, 
  Sparkles, 
  MessageCircle, 
  Check, 
  Database,
  ShieldCheck,
  Zap,
  Terminal
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { PERSONAL_INFO } from '../data/portfolioData';

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
  const [erpDispatchStatus, setErpDispatchStatus] = useState<'idle' | 'deducting' | 'billed'>('idle');
  const [erpLog, setErpLog] = useState('Inventory state healthy: SKU-WHT-300 batch #24B verified at 450 units.');

  // Chapter 3 interactive simulation: TAIN Elect AI offline state
  const [simOnline, setSimOnline] = useState(false);
  const [offlineQueueCount, setOfflineQueueCount] = useState(3);

  // Chapters Meta
  const chapters = [
    {
      id: 'foundation',
      num: '01',
      title: 'Academic Rigor & Algorithmic Foundations',
      shortTitle: 'Academic Rigor',
      theme: 'emerald',
      tag: 'Double 9.05 CGPA Distinction',
    },
    {
      id: 'enterprise',
      num: '02',
      title: 'High-Throughput ERP Billing & Dynamic Inventory Reconciliation',
      shortTitle: 'Enterprise ERP',
      theme: 'cyan',
      tag: 'AgroStock & Greentop Systems',
    },
    {
      id: 'mobile',
      num: '03',
      title: 'Offline-First Mobile Resilience & Local Sync',
      shortTitle: 'Offline Mobile',
      theme: 'sky',
      tag: 'TAIN Elect AI React Native / Expo',
    },
    {
      id: 'genai',
      num: '04',
      title: 'Applied Gen-AI & Peer-Reviewed Research',
      shortTitle: 'Gen-AI Research',
      theme: 'purple',
      tag: 'Published Journal Paper 2026',
    },
    {
      id: 'devops',
      num: '05',
      title: 'Cloud DevOps & Production Scaling',
      shortTitle: 'DevOps & Scale',
      theme: 'indigo',
      tag: 'Docker, AWS & CI/CD Delivery',
    },
  ];

  // Measure track width and calculate maximum horizontal travel
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewWidth = window.innerWidth;
      // Extra cushion so the final chapter settles gracefully
      const maxDist = Math.max(0, trackWidth - viewWidth + 80);
      setMaxTranslate(maxDist);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Jump to specific chapter via vertical scroll positioning
  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollableDist = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = window.scrollY + rect.top + (index / 4.2) * scrollableDist;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
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
      setErpLog('⚠️ Reorder alert triggered! Stock at critical threshold (< 25 units). Replenishing demo batch to 450...');
      setErpStockCount(450);
      return;
    }
    setErpDispatchStatus('deducting');
    setErpLog(`Dispatching B2B Order #INV-${erpInvoiceNum}... Verifying batch SKU-WHT-300.`);
    setTimeout(() => {
      const deduction = 25;
      const newStock = erpStockCount - deduction;
      const nextInv = erpInvoiceNum + 1;
      setErpStockCount(newStock);
      setErpInvoiceNum(nextInv);
      setErpDispatchStatus('billed');
      setErpLog(`✓ Invoiced ₹38,500 (+18% GST). Stock deducted: ${deduction} units (Balance: ${newStock}). jsPDF invoice generated & ledger updated.`);
      setTimeout(() => setErpDispatchStatus('idle'), 1200);
    }, 700);
  };

  const handleToggleOnline = () => {
    setSimOnline((prev) => {
      const next = !prev;
      if (next) {
        // Syncing queue
        setTimeout(() => setOfflineQueueCount(0), 700);
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
      style={{ height: '420vh' }}
    >
      {/* Sticky Fullscreen Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-8 z-20">
        
        {/* Scrollytelling Top HUD Header */}
        <div className="w-full max-w-7xl mx-auto z-30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Horizontal Scrollytelling Experience</span>
                </span>
                <span className="text-slate-500 font-mono text-xs hidden sm:inline">•</span>
                <span className="text-xs font-mono text-slate-400 hidden sm:inline">
                  Chapter 0{activeChapter + 1} of 05
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
                The Engineering Journey & Architectural Narrative
              </h2>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
                Scroll down or click arrows:
              </span>
              <button
                onClick={handlePrev}
                disabled={activeChapter === 0}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 disabled:opacity-40 disabled:hover:border-slate-700 disabled:hover:text-slate-300 transition-colors"
                title="Previous Chapter"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeChapter === 4}
                className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-300 hover:border-cyan-400 disabled:opacity-40 disabled:hover:border-slate-700 disabled:hover:text-slate-300 transition-colors"
                title="Next Chapter"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Chapter Timeline Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(idx)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap shrink-0 border ${
                  activeChapter === idx
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-950/70 text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-slate-200'
                }`}
              >
                <span className="opacity-70 text-[10px] font-bold">{ch.num}</span>
                <span>{ch.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Glowing Horizontal Progress Track */}
          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-1 relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 via-purple-400 to-indigo-500 transition-all duration-75"
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
            
            {/* CHAPTER 01: Academic Rigor & Foundations */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#071318]/90 to-[#070b14]/90">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                      CHAPTER 01 // FOUNDATIONS
                    </span>
                    <span className="text-xs font-mono text-emerald-400">
                      Savitribai Phule Pune University
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Algorithmic Rigor & Double 9.05 CGPA Distinction
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    Engineering production resilience starts with core computer science foundations. Achieved a 
                    <strong className="text-emerald-400"> 9.05 CGPA in M.Sc. Computer Science</strong> and a 
                    <strong className="text-emerald-400"> 9.05 CGPA in B.Sc. Computer Science</strong>, mastering computational complexity,
                    data structures, and distributed systems.
                  </p>

                  {/* Core Metrics & Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xl">
                        <GraduationCap className="w-5 h-5 text-emerald-400" />
                        <span>9.05 CGPA</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">M.Sc. Computer Science</div>
                      <div className="text-[11px] text-slate-400">2023 - 2025 • SPPU Pune</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="flex items-center gap-2 text-emerald-400 font-mono font-bold text-xl">
                        <GraduationCap className="w-5 h-5 text-emerald-400" />
                        <span>9.05 CGPA</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">B.Sc. Computer Science</div>
                      <div className="text-[11px] text-slate-400">2020 - 2023 • SPPU Pune</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                      <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xl">
                        <Zap className="w-5 h-5 text-cyan-400" />
                        <span>Top 1%</span>
                      </div>
                      <div className="text-xs font-bold text-white mt-1">Theoretical Mastery</div>
                      <div className="text-[11px] text-slate-400">OOP, ACID DBs, Distributed Systems</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Certified Academic Foundation for Mission-Critical Engineering</span>
                    </div>
                    <button
                      onClick={onOpenResume}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 text-xs font-bold hover:bg-emerald-400 transition-colors shadow-md"
                    >
                      <FileDown className="w-3.5 h-3.5" />
                      <span>View Academic Record</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* CHAPTER 02: Enterprise ERP Billing & Dynamic Stock Reconciliation */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#06121f]/90 to-[#070b14]/90">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold">
                      CHAPTER 02 // ENTERPRISE ARCHITECTURE
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      AgroStock ERP & Greentop Systems
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    High-Throughput ERP Billing & Dynamic Stock Reconciliation
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    Designed complex multi-warehouse inventory pipelines and B2B wholesale workflows. Built atomic
                    stock deduction routines that prevent overselling across wholesale counters, compute tiered pricing
                    with automated 18% GST calculation, update ledger balances, and generate vector PDF invoices instantly.
                  </p>

                  {/* Interactive ERP Order Dispatch Simulator */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
                    <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">Warehouse Stock (SKU-WHT-300):</span>
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          erpStockCount > 100
                            ? 'bg-emerald-500/20 text-emerald-400'
                            : erpStockCount > 25
                            ? 'bg-amber-500/20 text-amber-400'
                            : 'bg-rose-500/20 text-rose-400'
                        }`}>
                          {erpStockCount} Units Available
                        </span>
                        {erpDispatchStatus !== 'idle' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 animate-pulse">
                            {erpDispatchStatus === 'deducting' ? 'DEDUCTING STOCK...' : 'BILLED & POSTED ✓'}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleDispatchOrder}
                        disabled={erpDispatchStatus === 'deducting'}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 text-xs font-mono font-semibold transition-all disabled:opacity-50 flex items-center gap-1.5"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Dispatch B2B Order (-25 Bags)</span>
                      </button>
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                      &gt; {erpLog}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="text-xs text-slate-400">SKU Inventory Scale</div>
                      <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">10,000+ Items</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="text-xs text-slate-400">Stock Overselling Rate</div>
                      <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">0.00% Zero-Loss</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="text-xs text-slate-400">Vector PDF Generation</div>
                      <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">&lt; 150ms jsPDF</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* CHAPTER 03: Offline-First Mobile Resilience */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#061222]/90 to-[#070b14]/90">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
                      CHAPTER 03 // MOBILE ENGINEERING
                    </span>
                    <span className="text-xs font-mono text-sky-400">
                      TAIN Elect AI
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Offline-First Field Resilience & SQLite Sync
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    Designed for field election teams operating in zero-connectivity rural zones. Built on React Native
                    (Expo Router) with a local SQLite transactional store. Field workers log surveys, voter verifications,
                    and polling updates without lag; changes auto-sync in batches the instant network connects.
                  </p>

                  {/* Interactive Network Simulator */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {simOnline ? (
                          <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold">
                            <Wifi className="w-4 h-4" />
                            <span>ONLINE (Syncing with Cloud API)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-400 font-mono text-xs font-bold">
                            <WifiOff className="w-4 h-4" />
                            <span>OFFLINE (Zero Connection, Local SQLite Active)</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleToggleOnline}
                        className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all border ${
                          simOnline
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500 hover:text-slate-950'
                            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950'
                        }`}
                      >
                        {simOnline ? 'Cut Network (Go Offline)' : 'Restore Network (Go Online)'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono">
                      <span className="text-slate-400">Local Unsynced SQLite Queue:</span>
                      <span className="text-sky-300 font-bold">
                        {offlineQueueCount} voter updates pending sync
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="text-xs text-slate-400">Offline Availability</div>
                      <div className="text-base font-bold text-sky-400 font-mono mt-0.5">100% Operational</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="text-xs text-slate-400">Data Loss Rate</div>
                      <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">0% Guaranteed</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
                      <div className="text-xs text-slate-400">Stack</div>
                      <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">Expo + SQLite</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* CHAPTER 04: Applied Gen-AI & Peer-Reviewed Research */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#12071d]/90 to-[#070b14]/90">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                      CHAPTER 04 // AI & RESEARCH
                    </span>
                    <span className="text-xs font-mono text-purple-400">
                      International Research Journal
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Peer-Reviewed Gen-AI Research & LangChain Agents
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    Published original empirical research investigating Generative AI systems, prompt optimization,
                    and autonomous reasoning models (ISSN: 2582-8436). Engineered LangChain autonomous agents,
                    structured LLM schema validation, and multi-provider failover routing between Gemini 2.5 and OpenAI GPT-4o.
                  </p>

                  {/* Research Paper Citation Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-slate-950/90 border border-purple-500/30">
                    <div className="text-xs font-mono text-purple-400 font-bold uppercase mb-1">
                      Published Paper Citation (030117.pdf):
                    </div>
                    <p className="text-xs sm:text-sm text-white font-display italic">
                      &ldquo;A Study on Generative AI&rdquo;
                    </p>
                    <div className="text-[11px] font-mono text-slate-400 mt-1">
                      Authors: Zafarali Faizahmed Inamdar, Dr. Jyoti Malhotra • Vol. 13, Issue 1, 2026
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                      <BookOpen className="w-4 h-4 text-purple-400" />
                      <span>Empirical methodology backed by peer-reviewed publication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="/research-paper-genai-inamdar-2026.pdf"
                        download="GenAI_Research_Paper_Inamdar_2026.pdf"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-bold hover:bg-purple-500 transition-colors shadow-md"
                      >
                        <FileDown className="w-3.5 h-3.5" />
                        <span>Download Paper (030117.pdf)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* CHAPTER 05: Cloud Infrastructure & Next Step */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-2xl relative overflow-hidden bg-gradient-to-br from-[#0c0c24]/90 to-[#070b14]/90">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
                      CHAPTER 05 // SCALE & DELIVERY
                    </span>
                    <span className="text-xs font-mono text-indigo-400">
                      AWS, Docker & CI/CD
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                    Cloud DevOps, 99.9% Reliability & Immediate Impact
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                    Code only creates value when it reliably runs in production. Deployed on AWS EC2 with Docker multi-stage
                    containers, automated GitHub Actions CI/CD, NGINX SSL reverse proxying, and Prometheus-ready health checks.
                    Ready to accelerate your engineering organization today.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-mono">AVAILABILITY</div>
                      <div className="text-base font-bold text-emerald-400 font-mono mt-0.5">99.9% Uptime</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-mono">CONTAINERS</div>
                      <div className="text-base font-bold text-cyan-400 font-mono mt-0.5">Docker Multi-Stage</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-mono">AUTOMATION</div>
                      <div className="text-base font-bold text-indigo-400 font-mono mt-0.5">GitHub Actions</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center">
                      <div className="text-[10px] text-slate-400 font-mono">RESPONSE TIME</div>
                      <div className="text-base font-bold text-purple-400 font-mono mt-0.5">&lt; 24h Contact</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-300 font-mono">
                      Direct WhatsApp: <strong className="text-emerald-400 font-bold">{PERSONAL_INFO.phone}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20reviewed%20your%20engineering%20scrollytelling%20journey%20and%20would%20like%20to%20connect."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-slate-950 text-xs font-bold hover:brightness-110 transition-all shadow-md"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-slate-950" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <button
                        onClick={onOpenTerminal}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-cyan-300 border border-cyan-500/40 hover:bg-slate-800 text-xs font-mono font-semibold transition-all"
                      >
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Run CLI</span>
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

          </div>
        </div>

        {/* Scrollytelling Bottom Flow Navigation Footer */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-slate-800/60 z-30 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-[11px] text-slate-300">
              Scroll down or drag track horizontally to advance through narrative
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-cyan-400 font-bold">
              {Math.round(progress * 100)}% Narrative Completed
            </span>
            <a
              href="#projects"
              className="text-[11px] text-slate-400 hover:text-white underline"
            >
              Skip to Projects ↓
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
