import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building, 
  Sparkles, 
  ArrowRight, 
  Smartphone, 
  Server, 
  ShieldCheck, 
  ExternalLink,
  Award,
  Zap,
  Code2,
  Database,
  Flame,
  LayoutGrid,
  GitCommit,
  Radio,
  Wifi,
  WifiOff,
  RefreshCw,
  FileText,
  Lock,
  Layers,
  ChevronRight,
  Sliders,
  Terminal as TerminalIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../data/portfolioData';
import { StoreBadges } from './StoreBadges';
import { ScrollAssemble } from './animations/ScrollAssemble';
import { ScrollFocusZoom } from './animations/ScrollFocusZoom';

interface ExperienceSectionProps {
  onOpenProject: (projectId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenProject }) => {
  const [activeTabId, setActiveTabId] = useState<string>('tain-electai');
  const [viewLayout, setViewLayout] = useState<'command-deck' | 'all-deployments'>('command-deck');

  // Interactive Live Telemetry Simulation States for TAIN Elect AI
  const [tainOnline, setTainOnline] = useState(false);
  const [tainQueue, setTainQueue] = useState(3);
  const [tainSyncStatus, setTainSyncStatus] = useState<'idle' | 'syncing' | 'synced'>('idle');

  // Interactive ERP Simulation for AgroStock
  const [erpStock, setErpStock] = useState(480);
  const [erpInvoiceId, setErpInvoiceId] = useState(1088);
  const [erpStatus, setErpStatus] = useState<'idle' | 'processing' | 'billed'>('idle');

  // Interactive ACID Transaction Simulation for Greentop
  const [acidLog, setAcidLog] = useState<string>('ACID Pool: 10 connections active. Zero thread starvation.');
  const [acidRunning, setAcidRunning] = useState(false);

  const activeExp = EXPERIENCES.find((e) => e.id === activeTabId) || EXPERIENCES[0];

  // Simulation Handlers
  const handleTainAddSurvey = () => {
    setTainQueue((prev) => prev + 1);
  };

  const handleTainToggleNetwork = () => {
    const nextState = !tainOnline;
    setTainOnline(nextState);
    if (nextState && tainQueue > 0) {
      setTainSyncStatus('syncing');
      setTimeout(() => {
        setTainQueue(0);
        setTainSyncStatus('synced');
        setTimeout(() => setTainSyncStatus('idle'), 2000);
      }, 1200);
    }
  };

  const handleErpDispatch = () => {
    setErpStatus('processing');
    setTimeout(() => {
      setErpStock((prev) => Math.max(0, prev - 20));
      setErpInvoiceId((prev) => prev + 1);
      setErpStatus('billed');
      setTimeout(() => setErpStatus('idle'), 1500);
    }, 600);
  };

  const handleTestAcid = () => {
    setAcidRunning(true);
    setAcidLog('START TRANSACTION → Checking supplier inventory lock...');
    setTimeout(() => {
      setAcidLog('EXECUTING: Multi-batch insert with parameterized query [OK]');
      setTimeout(() => {
        setAcidLog('COMMIT: Transaction finalized in 38ms. Winston logs rotated.');
        setAcidRunning(false);
      }, 500);
    }, 500);
  };

  return (
    <section id="experience" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20 overflow-hidden">
      
      {/* Background Architectural Grid Lines */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* =====================================================================
            SECTION HEADER: Architect's Statement
           ===================================================================== */}
        <ScrollAssemble direction="top" distance={40}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-sky-400 border border-sky-500/40 text-xs font-mono uppercase tracking-wider mb-4 font-bold shadow-lg shadow-sky-500/10">
              <Radio className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>Production Track Record & Engineering Architectures</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 font-display tracking-tight leading-none">
              Professional{' '}
              <span className="bg-gradient-to-r from-sky-600 via-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                Experience Deck
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base mt-4 font-medium leading-relaxed max-w-2xl mx-auto">
              Real-world systems delivery across offline-first mobile apps live on the App Store & Play Store, multi-module agricultural ERP platforms, and transactional B2B engines.
            </p>

            {/* View Mode Toggle: Command Deck vs Panoramic Timeline */}
            <div className="mt-8 inline-flex items-center p-1 rounded-2xl bg-slate-200/90 border border-slate-300 shadow-inner">
              <button
                onClick={() => setViewLayout('command-deck')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  viewLayout === 'command-deck'
                    ? 'bg-white text-slate-900 shadow-md border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-sky-600" />
                <span>Mission Control Deck</span>
              </button>

              <button
                onClick={() => setViewLayout('all-deployments')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                  viewLayout === 'all-deployments'
                    ? 'bg-white text-slate-900 shadow-md border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <GitCommit className="w-3.5 h-3.5 text-emerald-600" />
                <span>Panoramic Timeline</span>
              </button>
            </div>
          </div>
        </ScrollAssemble>

        {/* =====================================================================
            LAYOUT 1: MISSION CONTROL DECK (Tactile Architectural Pods)
           ===================================================================== */}
        {viewLayout === 'command-deck' && (
          <div className="space-y-8">
            
            {/* Architectural Mission Selector Pods */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {EXPERIENCES.map((exp, idx) => {
                const isActive = exp.id === activeTabId;
                const scatterDir = idx === 0 ? 'tilt-left' : idx === 1 ? 'bottom' : 'tilt-right';

                return (
                  <ScrollAssemble key={exp.id} direction={scatterDir} delay={idx * 0.1} distance={45}>
                    <button
                      onClick={() => setActiveTabId(exp.id)}
                      className={`w-full text-left p-5 rounded-3xl border-2 transition-all relative overflow-hidden group ${
                        isActive
                          ? 'bg-white border-slate-900 shadow-2xl ring-4 ring-slate-900/5 -translate-y-1'
                          : 'bg-white/80 border-slate-200 hover:border-slate-400 hover:bg-white hover:shadow-lg'
                      }`}
                    >
                      {/* Accent Glow Strip */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-2 transition-all ${
                          isActive ? 'opacity-100' : 'opacity-30 group-hover:opacity-70'
                        }`}
                        style={{ backgroundColor: exp.accentColor }}
                      />

                      {/* Header row: Status Ping & Tenure */}
                      <div className="flex items-center justify-between mb-3 mt-1">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2.5 w-2.5">
                            {isActive && (
                              <span 
                                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                                style={{ backgroundColor: exp.accentColor }}
                              />
                            )}
                            <span 
                              className="relative inline-flex rounded-full h-2.5 w-2.5"
                              style={{ backgroundColor: exp.accentColor }}
                            />
                          </span>
                          <span 
                            className="text-[11px] font-mono uppercase font-black tracking-wider"
                            style={{ color: exp.accentColor }}
                          >
                            {exp.category || 'Architecture'}
                          </span>
                        </div>

                        <span className="text-[11px] font-mono font-bold text-slate-500">
                          {exp.period.split('–')[0].trim()}
                        </span>
                      </div>

                      {/* Company Name & Role */}
                      <h3 className="text-lg font-black font-display text-slate-900 tracking-tight group-hover:text-sky-600 transition-colors">
                        {exp.company}
                      </h3>
                      <p className="text-xs text-slate-600 font-medium mt-0.5 line-clamp-1">
                        {exp.role}
                      </p>

                      {/* Micro Pill Highlight */}
                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                        <span className="font-bold truncate">
                          {exp.metrics?.[0]?.value || exp.type}
                        </span>
                        <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'translate-x-1 text-slate-900' : 'text-slate-400'}`} />
                      </div>
                    </button>
                  </ScrollAssemble>
                );
              })}
            </div>

            {/* Active Mission Architectural Showcase Stage */}
            <ScrollFocusZoom maxScale={1.015} enableGlow glowColor={`${activeExp.accentColor}25`}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeExp.id}
                  initial={{ opacity: 0, y: 30, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white rounded-3xl border-2 border-slate-200/90 shadow-2xl p-6 sm:p-10 relative overflow-hidden"
                >
                  {/* Top Ambient Banner */}
                  <div 
                    className="absolute top-0 left-0 right-0 h-3"
                    style={{ backgroundColor: activeExp.accentColor }}
                  />

                  {/* Header Dossier */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b-2 border-slate-100">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span 
                          className="text-xs font-mono px-3.5 py-1 rounded-full font-black text-white shadow-sm"
                          style={{ backgroundColor: activeExp.accentColor }}
                        >
                          {activeExp.type}
                        </span>
                        <span className="text-xs font-mono text-slate-600 font-bold flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {activeExp.period}
                        </span>
                        <span className="text-xs font-mono text-slate-600 font-bold flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {activeExp.location}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-display tracking-tight">
                        {activeExp.role}
                      </h3>
                      <div 
                        className="text-lg font-black mt-1 font-mono flex items-center gap-2"
                        style={{ color: activeExp.accentColor }}
                      >
                        <Building className="w-5 h-5 stroke-[2.5]" />
                        <span>{activeExp.company}</span>
                      </div>
                    </div>

                    {/* Store Badges & Primary Action Button */}
                    <div className="flex flex-wrap items-center gap-3">
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
                          className="flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-mono font-black text-white shadow-lg hover:shadow-xl transition-all active:scale-95 group"
                          style={{ backgroundColor: activeExp.accentColor }}
                        >
                          <span>Inspect System Architecture</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* 3-Column Architecture Matrix */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                    
                    {/* LEFT (7 Columns): Core Architectural Scope & Highlights */}
                    <div className="lg:col-span-7 space-y-6">
                      
                      {/* Summary Quote */}
                      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-bold mb-1 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-sky-500" />
                          <span>Engineering Mandate & Core Focus</span>
                        </div>
                        <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                          {activeExp.summary}
                        </p>
                      </div>

                      {/* Key Engineering Deliverables */}
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Key Deliverables & Responsibilities</span>
                        </h4>
                        <ul className="space-y-3">
                          {activeExp.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-800 font-medium">
                              <span 
                                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-white font-bold text-xs"
                                style={{ backgroundColor: activeExp.accentColor }}
                              >
                                ✓
                              </span>
                              <span className="leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* 4 Architectural Pillars */}
                      {activeExp.keyPillars && (
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                            <Layers className="w-4 h-4 text-sky-600" />
                            <span>System Architecture Pillars</span>
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {activeExp.keyPillars.map((p, idx) => (
                              <div 
                                key={idx}
                                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-400 transition-all shadow-sm"
                              >
                                <h5 className="text-xs font-mono font-black text-slate-900 mb-1">
                                  {p.title}
                                </h5>
                                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                  {p.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack Matrix */}
                      <div>
                        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold mb-3 flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-purple-600" />
                          <span>Production Technologies</span>
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeExp.technologies.map((t) => (
                            <span 
                              key={t}
                              className="text-xs font-mono px-3 py-1 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-bold hover:bg-slate-200 transition-colors"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT (5 Columns): Live Telemetry Simulation & Challenge Spotlight */}
                    <div className="lg:col-span-5 space-y-6">
                      
                      {/* INTERACTIVE TELEMETRY STATION WIDGET */}
                      {activeExp.id === 'tain-electai' && (
                        <div className="p-5 rounded-3xl bg-slate-950 text-white border-2 border-sky-500/40 shadow-2xl relative overflow-hidden">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <Smartphone className="w-4 h-4 text-sky-400" />
                              <span className="text-xs font-mono font-black text-sky-400 uppercase tracking-wider">
                                Live Device Telemetry
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              AsyncStorage Write-Queue
                            </span>
                          </div>

                          <div className="space-y-3 text-xs font-mono">
                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-slate-400">NetInfo Status:</span>
                              <div className="flex items-center gap-2">
                                {tainOnline ? (
                                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                                    <Wifi className="w-3.5 h-3.5" /> 5G Cellular
                                  </span>
                                ) : (
                                  <span className="flex items-center gap-1 text-rose-400 font-bold">
                                    <WifiOff className="w-3.5 h-3.5" /> 0% (Offline-First)
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-slate-400">Local Write-Queue:</span>
                              <span className="text-amber-400 font-black">
                                {tainQueue} Surveys Buffered
                              </span>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-slate-400">Sync Worker:</span>
                              <span className={`font-bold ${tainSyncStatus === 'syncing' ? 'text-sky-400 animate-pulse' : tainSyncStatus === 'synced' ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {tainSyncStatus === 'syncing' ? 'Auto-Syncing with Backoff...' : tainSyncStatus === 'synced' ? '✓ Synced to Supabase' : 'Waiting for network'}
                              </span>
                            </div>
                          </div>

                          {/* Controls */}
                          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-2">
                            <button
                              onClick={handleTainAddSurvey}
                              className="flex-1 py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-[11px] font-mono font-bold transition-all active:scale-95"
                            >
                              + Buffer Survey
                            </button>
                            <button
                              onClick={handleTainToggleNetwork}
                              className={`flex-1 py-2 px-3 rounded-xl text-[11px] font-mono font-bold transition-all active:scale-95 ${
                                tainOnline 
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30' 
                                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                              }`}
                            >
                              {tainOnline ? 'Drop to Offline' : 'Reconnect Cellular'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* INTERACTIVE ERP SIMULATION WIDGET */}
                      {activeExp.id === 'nebula-technology' && (
                        <div className="p-5 rounded-3xl bg-slate-950 text-white border-2 border-emerald-500/40 shadow-2xl relative overflow-hidden">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-emerald-400" />
                              <span className="text-xs font-mono font-black text-emerald-400 uppercase tracking-wider">
                                AgroStock Billing Telemetry
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              Redux Atomic Slices
                            </span>
                          </div>

                          <div className="space-y-3 text-xs font-mono">
                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-slate-400">SKU-WHEAT-HD:</span>
                              <span className="text-emerald-400 font-black">
                                {erpStock} Units Available
                              </span>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-slate-400">Current Invoice:</span>
                              <span className="text-sky-400 font-black">
                                #INV-{erpInvoiceId} (+18% GST)
                              </span>
                            </div>

                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                              <span className="text-slate-400">PDF Dispatcher:</span>
                              <span className={`font-bold ${erpStatus === 'processing' ? 'text-amber-400 animate-pulse' : erpStatus === 'billed' ? 'text-emerald-400' : 'text-slate-400'}`}>
                                {erpStatus === 'processing' ? 'Deducting & Generating PDF...' : erpStatus === 'billed' ? '✓ AutoTable PDF Printed' : 'Ready for Billing'}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-800">
                            <button
                              onClick={handleErpDispatch}
                              disabled={erpStatus === 'processing'}
                              className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-black transition-all active:scale-95 shadow-lg shadow-emerald-600/30"
                            >
                              Simulate B2B Order Dispatch (-20 Units)
                            </button>
                          </div>
                        </div>
                      )}

                      {/* INTERACTIVE ACID TRANSACTION WIDGET */}
                      {activeExp.id === 'knowledge-keen' && (
                        <div className="p-5 rounded-3xl bg-slate-950 text-white border-2 border-indigo-500/40 shadow-2xl relative overflow-hidden">
                          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                            <div className="flex items-center gap-2">
                              <Database className="w-4 h-4 text-indigo-400" />
                              <span className="text-xs font-mono font-black text-indigo-400 uppercase tracking-wider">
                                MySQL ACID Connection Pool
                              </span>
                            </div>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              PM2 Clustered
                            </span>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono leading-relaxed text-slate-300">
                            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">
                              Live Pool Log:
                            </div>
                            <p className="text-indigo-300 font-semibold">{acidLog}</p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-800">
                            <button
                              onClick={handleTestAcid}
                              disabled={acidRunning}
                              className="w-full py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-black transition-all active:scale-95 shadow-lg shadow-indigo-600/30"
                            >
                              {acidRunning ? 'Executing Transaction...' : 'Run ACID Parameterized Transaction'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Real Engineering Crucible Challenge & Solution */}
                      {activeExp.engineeringChallenge && (
                        <div className="p-5 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-white border border-slate-700 shadow-xl relative overflow-hidden">
                          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-3">
                            <Flame className="w-4 h-4 text-amber-400" />
                            <span>Engineering Hurdle & Architectural Solution</span>
                          </div>

                          <div className="space-y-3 text-xs leading-relaxed">
                            <div>
                              <span className="text-slate-400 font-mono font-bold block mb-0.5">Hurdle:</span>
                              <p className="text-slate-200 font-medium">
                                {activeExp.engineeringChallenge.challenge}
                              </p>
                            </div>

                            <div>
                              <span className="text-sky-300 font-mono font-bold block mb-0.5">Architectural Solution:</span>
                              <p className="text-slate-200 font-medium">
                                {activeExp.engineeringChallenge.solution}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-slate-700/60">
                              <span className="text-emerald-400 font-mono font-bold block mb-0.5">Verified Impact:</span>
                              <p className="text-emerald-200 font-semibold">
                                {activeExp.engineeringChallenge.impact}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Verified Metrics Counter Pods */}
                      {activeExp.metrics && (
                        <div className="grid grid-cols-2 gap-3">
                          {activeExp.metrics.map((m, i) => (
                            <div 
                              key={i}
                              className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                            >
                              <div className="text-[10px] font-mono text-slate-500 uppercase font-bold tracking-wider truncate">
                                {m.label}
                              </div>
                              <div className="text-xs sm:text-sm font-black font-display text-slate-900 mt-0.5 truncate">
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
            </ScrollFocusZoom>

          </div>
        )}

        {/* =====================================================================
            LAYOUT 2: ALL DEPLOYMENTS TIMELINE (Panoramic Scatter-to-Assembly)
           ===================================================================== */}
        {viewLayout === 'all-deployments' && (
          <div className="space-y-16 mt-8">
            {EXPERIENCES.map((exp, index) => {
              const scatterDir = index % 2 === 0 ? 'tilt-left' : 'tilt-right';

              return (
                <ScrollAssemble key={exp.id} direction={scatterDir} delay={index * 0.1} distance={60}>
                  <ScrollFocusZoom maxScale={1.02} enableGlow glowColor={`${exp.accentColor}20`}>
                    <div className="bg-white rounded-3xl border-2 border-slate-200/90 hover:border-slate-400 p-6 sm:p-10 shadow-xl transition-all relative overflow-hidden">
                      {/* Top Accent Strip */}
                      <div 
                        className="absolute top-0 left-0 right-0 h-2.5"
                        style={{ backgroundColor: exp.accentColor }}
                      />

                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-100">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span 
                              className="text-xs font-mono px-3 py-1 rounded-full font-black text-white"
                              style={{ backgroundColor: exp.accentColor }}
                            >
                              {exp.type}
                            </span>
                            <span className="text-xs font-mono text-slate-600 font-bold flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {exp.period}
                            </span>
                            <span className="text-xs font-mono text-slate-600 font-bold flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {exp.location}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                            {exp.role}
                          </h3>
                          <div 
                            className="text-base font-black mt-0.5 font-mono flex items-center gap-2"
                            style={{ color: exp.accentColor }}
                          >
                            <Building className="w-4 h-4 stroke-[2.5]" />
                            <span>{exp.company}</span>
                          </div>
                        </div>

                        {/* Store Badges & CTA */}
                        <div className="flex flex-wrap items-center gap-3">
                          {exp.storeLinks && (
                            <StoreBadges
                              appStoreUrl={exp.storeLinks.appStoreUrl}
                              playStoreUrl={exp.storeLinks.playStoreUrl}
                              variant="pill"
                            />
                          )}

                          {exp.associatedProject && (
                            <button
                              onClick={() => onOpenProject(exp.associatedProject!)}
                              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-black text-white shadow-md hover:shadow-lg transition-all active:scale-95"
                              style={{ backgroundColor: exp.accentColor }}
                            >
                              <span>Inspect Architecture Blueprint</span>
                              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Content Grid */}
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
                        <div className="lg:col-span-7 space-y-4">
                          <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
                            {exp.summary}
                          </p>

                          <ul className="space-y-2.5">
                            {exp.highlights.map((h, i) => (
                              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                                <span className="leading-relaxed">{h}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Pills */}
                          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                            {exp.technologies.map((t) => (
                              <span 
                                key={t}
                                className="text-[11px] font-mono px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 font-bold"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right: Challenge Spotlight */}
                        <div className="lg:col-span-5 space-y-4">
                          {exp.engineeringChallenge && (
                            <div className="p-4 rounded-2xl bg-slate-900 text-white border border-slate-800 text-xs space-y-2">
                              <div className="flex items-center gap-2 font-mono font-bold text-amber-400 uppercase tracking-wider text-[11px]">
                                <Flame className="w-3.5 h-3.5" />
                                <span>Challenge & Solution</span>
                              </div>
                              <p className="text-slate-300">
                                <strong className="text-slate-400">Problem:</strong> {exp.engineeringChallenge.challenge}
                              </p>
                              <p className="text-slate-300">
                                <strong className="text-sky-300">Solution:</strong> {exp.engineeringChallenge.solution}
                              </p>
                              <p className="text-emerald-300 font-semibold pt-1 border-t border-slate-800">
                                <strong>Impact:</strong> {exp.engineeringChallenge.impact}
                              </p>
                            </div>
                          )}

                          {exp.metrics && (
                            <div className="grid grid-cols-2 gap-2">
                              {exp.metrics.map((m, i) => (
                                <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                                  <div className="text-[10px] font-mono text-slate-500 uppercase font-bold">{m.label}</div>
                                  <div className="text-xs font-black font-display text-slate-900 mt-0.5">{m.value}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollFocusZoom>
                </ScrollAssemble>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
