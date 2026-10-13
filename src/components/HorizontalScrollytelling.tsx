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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b-2 border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-800 text-[11px] font-mono uppercase tracking-wider font-bold shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  <span>Horizontal Scrollytelling Experience</span>
                </span>
                <span className="text-slate-400 font-mono text-xs hidden sm:inline">•</span>
                <span className="text-xs font-mono text-slate-700 font-bold hidden sm:inline">
                  Chapter 0{activeChapter + 1} of 05
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-1 tracking-tight">
                The Engineering Journey & Architectural Narrative
              </h2>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="text-[11px] font-mono text-slate-600 hidden md:inline font-semibold">
                Scroll down or click arrows:
              </span>
              <button
                onClick={handlePrev}
                disabled={activeChapter === 0}
                className="p-2.5 rounded-xl bg-white border-2 border-slate-300 text-slate-700 hover:text-sky-600 hover:border-sky-500 disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-400 transition-all shadow-sm"
                title="Previous Chapter"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                disabled={activeChapter === 4}
                className="p-2.5 rounded-xl bg-white border-2 border-slate-300 text-slate-700 hover:text-sky-600 hover:border-sky-500 disabled:opacity-40 disabled:hover:border-slate-300 disabled:hover:text-slate-400 transition-all shadow-sm"
                title="Next Chapter"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Interactive Chapter Timeline Pills */}
          <div className="flex items-center gap-2 overflow-x-auto py-2.5 scrollbar-none">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => scrollToChapter(idx)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap shrink-0 border-2 ${
                  activeChapter === idx
                    ? 'bg-sky-600 text-white font-bold border-sky-600 shadow-md shadow-sky-500/30 scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-sky-400 hover:text-sky-700 font-semibold shadow-sm'
                }`}
              >
                <span className="opacity-90 text-[10px] font-black">{ch.num}</span>
                <span>{ch.shortTitle}</span>
              </button>
            ))}
          </div>

          {/* Glowing Horizontal Progress Track */}
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden mt-1 relative border border-slate-300">
            <div
              className="h-full bg-gradient-to-r from-sky-500 via-emerald-500 via-purple-500 to-indigo-600 transition-all duration-75"
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
                <div className="p-6 sm:p-8 rounded-3xl border-2 border-emerald-400/90 shadow-2xl relative overflow-hidden bg-white">
                  {/* Top saturated color bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400" />
                  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4 mt-1">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border-2 border-emerald-300 font-extrabold shadow-sm">
                      CHAPTER 01 // FOUNDATIONS
                    </span>
                    <span className="text-xs font-mono text-emerald-800 font-bold">
                      Savitribai Phule Pune University
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                    Algorithmic Rigor & Double 9.05 CGPA Distinction
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-2 leading-relaxed">
                    Engineering production resilience starts with core computer science foundations. Achieved a 
                    <strong className="text-emerald-700 font-extrabold"> 9.05 CGPA in M.Sc. Computer Science</strong> and a 
                    <strong className="text-emerald-700 font-extrabold"> 9.05 CGPA in B.Sc. Computer Science</strong>, mastering computational complexity,
                    data structures, and distributed systems.
                  </p>

                  {/* Core Metrics & Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
                    <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 shadow-sm">
                      <div className="flex items-center gap-2 text-emerald-700 font-mono font-black text-2xl">
                        <GraduationCap className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                        <span>9.05 CGPA</span>
                      </div>
                      <div className="text-xs font-black text-slate-900 mt-1">M.Sc. Computer Science</div>
                      <div className="text-[11px] font-medium text-slate-600">2023 - 2025 • SPPU Pune</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/70 border-2 border-emerald-200 shadow-sm">
                      <div className="flex items-center gap-2 text-emerald-700 font-mono font-black text-2xl">
                        <GraduationCap className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                        <span>9.05 CGPA</span>
                      </div>
                      <div className="text-xs font-black text-slate-900 mt-1">B.Sc. Computer Science</div>
                      <div className="text-[11px] font-medium text-slate-600">2020 - 2023 • SPPU Pune</div>
                    </div>

                    <div className="p-4 rounded-2xl bg-sky-50/70 border-2 border-sky-200 shadow-sm">
                      <div className="flex items-center gap-2 text-sky-700 font-mono font-black text-2xl">
                        <Zap className="w-6 h-6 text-sky-600 stroke-[2.5]" />
                        <span>Top 1%</span>
                      </div>
                      <div className="text-xs font-black text-slate-900 mt-1">Theoretical Mastery</div>
                      <div className="text-[11px] font-medium text-slate-600">OOP, ACID DBs, Distributed Systems</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-700 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Certified Academic Foundation for Mission-Critical Engineering</span>
                    </div>
                    <button
                      onClick={onOpenResume}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 border-2 border-emerald-500"
                    >
                      <FileDown className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>View Academic Record</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* CHAPTER 02: Enterprise ERP Billing & Dynamic Stock Reconciliation */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="p-6 sm:p-8 rounded-3xl border-2 border-sky-400/90 shadow-2xl relative overflow-hidden bg-white">
                  {/* Top saturated color bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-blue-600 to-cyan-400" />
                  <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4 mt-1">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-100 text-sky-900 border-2 border-sky-300 font-extrabold shadow-sm">
                      CHAPTER 02 // ENTERPRISE ARCHITECTURE
                    </span>
                    <span className="text-xs font-mono text-sky-800 font-bold">
                      AgroStock ERP & Greentop Systems
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                    High-Throughput ERP Billing & Dynamic Stock Reconciliation
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-2 leading-relaxed">
                    Designed complex multi-warehouse inventory pipelines and B2B wholesale workflows. Built atomic
                    stock deduction routines that prevent overselling across wholesale counters, compute tiered pricing
                    with automated 18% GST calculation, update ledger balances, and generate vector PDF invoices instantly.
                  </p>

                  {/* Interactive ERP Order Dispatch Simulator */}
                  <div className="mt-5 p-4 rounded-2xl bg-sky-50/60 border-2 border-sky-200 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-700 font-bold">Warehouse Stock (SKU-WHT-300):</span>
                        <span className={`text-xs font-mono font-black px-2.5 py-0.5 rounded-lg border-2 ${
                          erpStockCount > 100
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : erpStockCount > 25
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}>
                          {erpStockCount} Units Available
                        </span>
                        {erpDispatchStatus !== 'idle' && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-600 text-white font-black animate-pulse shadow-sm">
                            {erpDispatchStatus === 'deducting' ? 'DEDUCTING STOCK...' : 'BILLED & POSTED ✓'}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleDispatchOrder}
                        disabled={erpDispatchStatus === 'deducting'}
                        className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-mono font-bold transition-all disabled:opacity-50 flex items-center gap-1.5 shadow-md shadow-sky-600/30 border-2 border-sky-500"
                      >
                        <Zap className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Dispatch B2B Order (-25 Bags)</span>
                      </button>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-400 bg-slate-950 p-3 rounded-xl border-2 border-slate-800 shadow-inner">
                      &gt; {erpLog}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200">
                      <div className="text-xs font-medium text-slate-600">SKU Inventory Scale</div>
                      <div className="text-lg font-black text-sky-600 font-mono mt-0.5">10,000+ Items</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200">
                      <div className="text-xs font-medium text-slate-600">Stock Overselling Rate</div>
                      <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">0.00% Zero-Loss</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200">
                      <div className="text-xs font-medium text-slate-600">Vector PDF Generation</div>
                      <div className="text-lg font-black text-indigo-600 font-mono mt-0.5">&lt; 150ms jsPDF</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* CHAPTER 03: Offline-First Mobile Resilience */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="p-6 sm:p-8 rounded-3xl border-2 border-blue-400/90 shadow-2xl relative overflow-hidden bg-white">
                  {/* Top saturated color bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-500" />
                  <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4 mt-1">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-100 text-blue-900 border-2 border-blue-300 font-extrabold shadow-sm">
                      CHAPTER 03 // MOBILE ENGINEERING
                    </span>
                    <span className="text-xs font-mono text-blue-800 font-bold">
                      TAIN Elect AI
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                    Offline-First Field Resilience & Published Mobile App
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-2 leading-relaxed">
                    Designed for field election teams operating in zero-connectivity rural zones. Built on React Native
                    (Expo Router) with a local SQLite/AsyncStorage write-queue. Successfully published live under 
                    <strong className="text-slate-900 font-bold"> Apple iOS Unlisted App Distribution</strong> and orchestrated 
                    <strong className="text-slate-900 font-bold"> Google Play Closed Testing</strong> through to production release on the 
                    <strong className="text-slate-900 font-bold"> Google Play Store via Google Play Console</strong>.
                  </p>

                  {/* Interactive Network Simulator */}
                  <div className="mt-5 p-4 rounded-2xl bg-blue-50/60 border-2 border-blue-200 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        {simOnline ? (
                          <div className="flex items-center gap-1.5 text-emerald-800 font-mono text-xs font-black">
                            <Wifi className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                            <span>ONLINE (Syncing with Cloud API)</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-amber-800 font-mono text-xs font-black">
                            <WifiOff className="w-4 h-4 text-amber-600 stroke-[2.5]" />
                            <span>OFFLINE (Zero Connection, Local SQLite Active)</span>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={handleToggleOnline}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border-2 shadow-sm ${
                          simOnline
                            ? 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                        }`}
                      >
                        {simOnline ? 'Cut Network (Go Offline)' : 'Restore Network (Go Online)'}
                      </button>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-white border-2 border-slate-200 text-xs font-mono">
                      <span className="text-slate-700 font-bold">Local Unsynced SQLite Queue:</span>
                      <span className="text-blue-700 font-black">
                        {offlineQueueCount} voter updates pending sync
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200">
                      <div className="text-xs font-medium text-slate-600">iOS Distribution</div>
                      <div className="text-lg font-black text-sky-600 font-mono mt-0.5">Apple Unlisted Live</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200">
                      <div className="text-xs font-medium text-slate-600">Android Release</div>
                      <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">Play Console Live</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200">
                      <div className="text-xs font-medium text-slate-600">Architecture</div>
                      <div className="text-lg font-black text-indigo-600 font-mono mt-0.5">Expo + Offline Sync</div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>

            {/* CHAPTER 04: Applied Gen-AI & Peer-Reviewed Research */}
            <div className="w-[88vw] max-w-[960px] min-w-[340px] shrink-0">
              <TiltCard maxTilt={6} scale={1.01} glareOpacity={0.12}>
                <div className="p-6 sm:p-8 rounded-3xl border-2 border-purple-400/90 shadow-2xl relative overflow-hidden bg-white">
                  {/* Top saturated color bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
                  <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4 mt-1">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-100 text-purple-900 border-2 border-purple-300 font-extrabold shadow-sm">
                      CHAPTER 04 // AI & RESEARCH
                    </span>
                    <span className="text-xs font-mono text-purple-800 font-bold">
                      International Research Journal
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                    Peer-Reviewed Gen-AI Research & LangChain Agents
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-2 leading-relaxed">
                    Published original empirical research investigating Generative AI systems, prompt optimization,
                    and autonomous reasoning models (ISSN: 2582-8436). Engineered LangChain autonomous agents,
                    structured LLM schema validation, and multi-provider failover routing between Gemini 2.5 and OpenAI GPT-4o.
                  </p>

                  {/* Research Paper Citation Box */}
                  <div className="mt-5 p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-200 shadow-sm">
                    <div className="text-xs font-mono text-purple-800 font-black uppercase mb-1">
                      Published Paper Citation (030117.pdf):
                    </div>
                    <p className="text-xs sm:text-sm text-slate-900 font-display italic font-bold">
                      &ldquo;A Study on Generative AI&rdquo;
                    </p>
                    <div className="text-[11px] font-mono text-slate-700 mt-1 font-semibold">
                      Authors: Zafarali Faizahmed Inamdar, Dr. Jyoti Malhotra • Vol. 13, Issue 1, 2026
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-purple-900 font-bold">
                      <BookOpen className="w-4 h-4 text-purple-600 stroke-[2.5]" />
                      <span>Empirical methodology backed by peer-reviewed publication</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="/research-paper-genai-inamdar-2026.pdf"
                        download="GenAI_Research_Paper_Inamdar_2026.pdf"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-600/30 border-2 border-purple-500"
                      >
                        <FileDown className="w-3.5 h-3.5 stroke-[2.5]" />
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
                <div className="p-6 sm:p-8 rounded-3xl border-2 border-indigo-400/90 shadow-2xl relative overflow-hidden bg-white">
                  {/* Top saturated color bar */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-sky-500" />
                  <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex items-center justify-between gap-3 mb-4 mt-1">
                    <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 border-2 border-indigo-300 font-extrabold shadow-sm">
                      CHAPTER 05 // SCALE & DELIVERY
                    </span>
                    <span className="text-xs font-mono text-indigo-800 font-bold">
                      AWS, Docker & CI/CD
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
                    Cloud DevOps, 99.9% Reliability & Immediate Impact
                  </h3>
                  <p className="text-slate-700 text-xs sm:text-sm mt-2 leading-relaxed">
                    Code only creates value when it reliably runs in production. Deployed on AWS EC2 with Docker multi-stage
                    containers, automated GitHub Actions CI/CD, NGINX SSL reverse proxying, and Prometheus-ready health checks.
                    Ready to accelerate your engineering organization today.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-center">
                      <div className="text-[10px] text-slate-600 font-mono font-semibold">AVAILABILITY</div>
                      <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">99.9% Uptime</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-center">
                      <div className="text-[10px] text-slate-600 font-mono font-semibold">CONTAINERS</div>
                      <div className="text-lg font-black text-sky-600 font-mono mt-0.5">Docker Multi-Stage</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-center">
                      <div className="text-[10px] text-slate-600 font-mono font-semibold">AUTOMATION</div>
                      <div className="text-lg font-black text-indigo-600 font-mono mt-0.5">GitHub Actions</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-center">
                      <div className="text-[10px] text-slate-600 font-mono font-semibold">RESPONSE TIME</div>
                      <div className="text-lg font-black text-purple-600 font-mono mt-0.5">&lt; 24h Contact</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-xs text-slate-700 font-mono">
                      Direct WhatsApp: <strong className="text-emerald-700 font-black">{PERSONAL_INFO.phone}</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20reviewed%20your%20engineering%20scrollytelling%20journey%20and%20would%20like%20to%20connect."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 border-2 border-emerald-500"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                        <span>Chat on WhatsApp</span>
                      </a>

                      <button
                        onClick={onOpenTerminal}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-sky-800 border-2 border-sky-300 hover:bg-sky-50 text-xs font-mono font-bold transition-all shadow-sm"
                      >
                        <Terminal className="w-3.5 h-3.5 text-sky-600 stroke-[2.5]" />
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
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pt-2 border-t border-slate-200 z-30 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span className="text-[11px] text-slate-600">
              Scroll down or drag track horizontally to advance through narrative
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-sky-700 font-bold">
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
