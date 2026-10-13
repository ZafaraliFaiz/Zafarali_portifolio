import React, { useState } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Database, 
  RefreshCw, 
  CheckCircle2, 
  Server, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  AlertCircle,
  FileCheck,
  Send,
  GitBranch,
  Cloud,
  Smartphone
} from 'lucide-react';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bems' | 'krushi' | 'ai-engine' | 'devops'>('bems');

  // BEMS Simulation State
  const [isOnline, setIsOnline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<string[]>([
    'Voter #4092: Survey Recorded (Ward 12)',
    'Member Verification: Agent ID #204',
  ]);
  const [syncedRecords, setSyncedRecords] = useState<string[]>([
    'Voter #4088: Polling Check-in',
    'Voter #4089: Polling Check-in',
  ]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Krushi Simulation State
  const [tokenStatus, setTokenStatus] = useState<'valid' | 'expired' | 'refreshing' | 'replayed'>('valid');
  const [tokenLog, setTokenLog] = useState<string[]>(['Session initiated with secure HTTP-only refresh cookie.']);

  // AI Translator State
  const [selectedTone, setSelectedTone] = useState<'Executive' | 'Diplomatic' | 'Concise' | 'Persuasive'>('Executive');
  const [selectedProvider, setSelectedProvider] = useState<'Gemini 2.5 Flash' | 'OpenAI GPT-4o'>('Gemini 2.5 Flash');
  const [simulatedAIText, setSimulatedAIText] = useState(
    'Please review the attached quarterly metrics and provide leadership sign-off by end of day.'
  );

  // DevOps Simulation State
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [pipelineActive, setPipelineActive] = useState<boolean>(false);

  // Handle BEMS Add Queue
  const handleAddVoteRecord = () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    const newRecord = `Voter #${id}: Booth ${Math.floor(Math.random() * 10) + 1} Record`;
    
    if (isOnline) {
      setSyncedRecords((prev) => [newRecord, ...prev]);
    } else {
      setOfflineQueue((prev) => [...prev, newRecord]);
    }
  };

  // Handle BEMS Toggle Online
  const handleToggleOnline = () => {
    const nextState = !isOnline;
    setIsOnline(nextState);

    if (nextState && offlineQueue.length > 0) {
      setIsSyncing(true);
      setTimeout(() => {
        setSyncedRecords((prev) => [...offlineQueue, ...prev]);
        setOfflineQueue([]);
        setIsSyncing(false);
      }, 1200);
    }
  };

  // Handle Krushi Token Simulation
  const handleSimulateTokenExpiry = () => {
    setTokenStatus('expired');
    setTokenLog((prev) => [
      ...prev,
      '⚠️ Request dispatched -> Received HTTP 401 Unauthorized (JWT Expired)',
      '🛡️ Axios Interceptor intercepted 401, queued original request.',
    ]);

    setTimeout(() => {
      setTokenStatus('refreshing');
      setTokenLog((prev) => [
        ...prev,
        '🔄 Sending silent POST /auth/refresh with HttpOnly Cookie...',
        '✨ New Access Token issued by backend (200 OK)',
      ]);

      setTimeout(() => {
        setTokenStatus('replayed');
        setTokenLog((prev) => [
          ...prev,
          '🚀 Replaying original request with new Bearer token -> 200 OK SUCCESS',
        ]);
      }, 900);
    }, 900);
  };

  // Tone transformations
  const toneSamples: Record<string, string> = {
    Executive:
      'Attached are the quarterly performance metrics for your executive review and formal endorsement prior to end of day.',
    Diplomatic:
      'Whenever your schedule permits today, we would greatly appreciate your valued thoughts and alignment on the quarterly metrics.',
    Concise:
      'Quarterly metrics attached. Requesting sign-off by EOD today.',
    Persuasive:
      'Locking in sign-off on the quarterly metrics today will unlock our next growth sprint and keep leadership benchmarks on target.',
  };

  // Handle DevOps Pipeline Run
  const handleRunDevOpsPipeline = () => {
    setPipelineActive(true);
    setPipelineStep(1);

    setTimeout(() => setPipelineStep(2), 700);
    setTimeout(() => setPipelineStep(3), 1400);
    setTimeout(() => setPipelineStep(4), 2100);
    setTimeout(() => {
      setPipelineStep(5);
      setPipelineActive(false);
    }, 2800);
  };

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Engineering Visualizer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            How I Architect{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Mission-Critical Systems
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Interact with live simulations of the key engineering patterns I designed across my projects: 
            Offline-first queues, silent token refresh, multi-provider Gen-AI orchestration, and automated CI/CD pipelines.
          </p>
        </div>

        {/* System Architecture Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => setActiveTab('bems')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'bems'
                ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/25 scale-105'
                : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>BEMS Offline-First Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('krushi')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'krushi'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Krushi Silent Auth Refresh</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-engine')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'ai-engine'
                ? 'bg-purple-500 text-slate-950 shadow-lg shadow-purple-500/25 scale-105'
                : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Multi-LLM Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('devops')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              activeTab === 'devops'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                : 'bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>House Rent DevOps Pipeline</span>
          </button>
        </div>

        {/* Tab 1: BEMS Offline-First Architecture */}
        {activeTab === 'bems' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sky-500/25 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-sky-500/20 text-sky-300 px-2.5 py-1 rounded-md border border-sky-500/40">
                    Tain ElectAI • React Native + Supabase
                  </span>
                  <span className="text-xs text-slate-400 font-mono">AsyncStorage + NetInfo + Exponential Backoff</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Offline-First Local Write-Queue & Background Sync
                </h3>
              </div>

              {/* Network Toggle Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleOnline}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all shadow-md ${
                    isOnline
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                  }`}
                >
                  {isOnline ? <Wifi className="w-4 h-4 text-emerald-400" /> : <WifiOff className="w-4 h-4 text-rose-400" />}
                  <span>Status: {isOnline ? 'ONLINE' : 'OFFLINE (Simulated)'}</span>
                </button>

                <button
                  onClick={handleAddVoteRecord}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-500 text-slate-950 text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Record Voter Action</span>
                </button>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* Step 1: React Native UI */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-sky-400 flex items-center gap-1.5 mb-1">
                    <Smartphone className="w-4 h-4" />
                    <span>01. React Native Device UI</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Field agents record voter counseling, unlisted app forms, and camera captures on iOS/Android.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-300">
                  Write latency: <span className="text-emerald-400 font-bold">&lt; 4ms</span> (Optimistic UI)
                </div>
              </div>

              {/* Step 2: Local AsyncStorage Write-Queue */}
              <div className={`p-4 rounded-xl border transition-all ${
                offlineQueue.length > 0 ? 'bg-sky-950/30 border-sky-500/50' : 'bg-slate-950/70 border-slate-800'
              }`}>
                <div className="text-xs font-mono text-sky-400 flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-4 h-4" />
                    <span>02. AsyncStorage Write-Queue</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300">
                    {offlineQueue.length} queued
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-2">
                  Writes persist safely in local sandbox memory. If NetInfo is offline, items wait with retry backoff.
                </p>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {offlineQueue.length === 0 ? (
                    <div className="text-[11px] text-slate-500 italic">Queue empty (All records synchronized)</div>
                  ) : (
                    offlineQueue.map((item, idx) => (
                      <div key={idx} className="text-[11px] font-mono bg-sky-500/10 text-sky-200 p-1.5 rounded border border-sky-500/20 flex items-center justify-between">
                        <span className="truncate">{item}</span>
                        <span className="text-[9px] text-amber-400 font-bold">QUEUED</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Step 3: Supabase Cloud Postgres */}
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-emerald-400 flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Server className="w-4 h-4" />
                      <span>03. Supabase Postgres & Auth</span>
                    </div>
                    {isSyncing && (
                      <span className="text-[10px] text-cyan-400 flex items-center gap-1 animate-pulse">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Syncing...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-2">
                    Synced records reconciled with role-based PII masking and hardened security policies.
                  </p>
                </div>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {syncedRecords.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-[11px] font-mono bg-emerald-500/10 text-emerald-300 p-1 rounded border border-emerald-500/20 flex items-center justify-between">
                      <span className="truncate">{item}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-400 font-mono bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
              <span>💡 <strong className="text-slate-200">How to test:</strong> Click &quot;Record Voter Action&quot; while OFFLINE to see the queue grow. Toggle to &quot;ONLINE&quot; to witness automatic queue sync!</span>
              <span className="text-sky-400 font-bold">Resilience: 100% Zero-Loss</span>
            </div>
          </div>
        )}

        {/* Tab 2: Krushi Silent Token Refresh */}
        {activeTab === 'krushi' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-500/25 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/40">
                    Nebula Technology • React Vite + Redux Toolkit
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Axios Interceptors + HTTP-Only Cookie Refresh</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Zero-Interruption JWT Token Refresh Lifecycle
                </h3>
              </div>

              <button
                onClick={handleSimulateTokenExpiry}
                disabled={tokenStatus === 'refreshing'}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 text-slate-950 text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${tokenStatus === 'refreshing' ? 'animate-spin' : ''}`} />
                <span>Simulate Expired Token (401)</span>
              </button>
            </div>

            {/* Visual Token Lifecycle */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-6">
              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                tokenStatus === 'valid' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className="text-xs font-mono text-emerald-400 font-bold mb-1">1. Active Request</div>
                <div className="text-[11px] text-slate-400">User submits Sales Billing form</div>
                <div className="mt-2 text-[10px] font-mono text-slate-300">Bearer Token: VALID</div>
              </div>

              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                tokenStatus === 'expired' ? 'bg-rose-950/40 border-rose-400' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className="text-xs font-mono text-rose-400 font-bold mb-1">2. 401 Interception</div>
                <div className="text-[11px] text-slate-400">Axios Interceptor catches error</div>
                <div className="mt-2 text-[10px] font-mono text-rose-300">Original req queued</div>
              </div>

              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                tokenStatus === 'refreshing' ? 'bg-cyan-950/40 border-cyan-400' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className="text-xs font-mono text-cyan-400 font-bold mb-1">3. Silent Refresh</div>
                <div className="text-[11px] text-slate-400">POST /refresh with HttpOnly cookie</div>
                <div className="mt-2 text-[10px] font-mono text-cyan-300">New Access Token</div>
              </div>

              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                tokenStatus === 'replayed' ? 'bg-emerald-950/40 border-emerald-400' : 'bg-slate-950/60 border-slate-800'
              }`}>
                <div className="text-xs font-mono text-emerald-400 font-bold mb-1">4. Replay Request</div>
                <div className="text-[11px] text-slate-400">Invoice saved without logging out!</div>
                <div className="mt-2 text-[10px] font-mono text-emerald-300">Zero UX friction</div>
              </div>
            </div>

            {/* Live Terminal Log */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1 max-h-36 overflow-y-auto">
              <div className="text-slate-500 font-semibold mb-2"># Axios Auth Interceptor Event Stream:</div>
              {tokenLog.map((log, index) => (
                <div key={index} className="text-slate-300 leading-relaxed">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: AI Multi-LLM Engine */}
        {activeTab === 'ai-engine' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-500/25 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-md border border-purple-500/40">
                    Gen-AI Platform • FastAPI + LangChain + Gemini
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Dynamic Tone Adaptation & Multi-Provider Fallback</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Context-Preserving Tone Transformation Engine
                </h3>
              </div>

              {/* Model Provider Picker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400">Primary Provider:</span>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as any)}
                  className="bg-slate-900 border border-purple-500/40 text-purple-300 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400"
                >
                  <option value="Gemini 2.5 Flash">Google Gemini 2.5 Flash</option>
                  <option value="OpenAI GPT-4o">OpenAI GPT-4o (Dual Routing)</option>
                </select>
              </div>
            </div>

            {/* Tone Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 my-5">
              <span className="text-xs font-mono text-slate-400 mr-2">Select Target Tone:</span>
              {(['Executive', 'Diplomatic', 'Concise', 'Persuasive'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                    selectedTone === tone
                      ? 'bg-purple-500 text-slate-950 font-bold shadow-md shadow-purple-500/30'
                      : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-purple-500/30'
                  }`}
                >
                  {tone} Tone
                </button>
              ))}
            </div>

            {/* Input vs Output Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="text-xs font-mono text-slate-400 mb-2 flex items-center justify-between">
                  <span>Input Draft (Raw context):</span>
                  <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-300">Original</span>
                </div>
                <div className="text-sm text-slate-300 font-sans p-3 rounded-lg bg-slate-900/60 border border-slate-800">
                  {simulatedAIText}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-950/20 border border-purple-500/40">
                <div className="text-xs font-mono text-purple-300 mb-2 flex items-center justify-between">
                  <span>AI Transformed ({selectedTone} tone):</span>
                  <span className="text-[10px] bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-300 border border-purple-500/30">
                    Engine: {selectedProvider}
                  </span>
                </div>
                <div className="text-sm text-purple-100 font-sans p-3 rounded-lg bg-slate-900/90 border border-purple-500/30 shadow-inner">
                  {toneSamples[selectedTone]}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
              <span>LangChain Fallback Strategy: If provider rate-limit occurs, automatic zero-loss switch to secondary LLM in &lt; 200ms.</span>
              <span className="text-purple-400 font-semibold">MySQL translation history cached</span>
            </div>
          </div>
        )}

        {/* Tab 4: DevOps & Cloud Pipeline */}
        {activeTab === 'devops' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/25 shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/40">
                    House Rent Admin • Cloud Infrastructure
                  </span>
                  <span className="text-xs text-slate-400 font-mono">Docker + NGINX + Jenkins CI/CD + AWS EC2</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                  Automated CI/CD Pipeline to AWS Cloud
                </h3>
              </div>

              <button
                onClick={handleRunDevOpsPipeline}
                disabled={pipelineActive}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{pipelineActive ? 'Pipeline Running...' : 'Trigger Git Push CI/CD'}</span>
              </button>
            </div>

            {/* Pipeline Step Sequence */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 my-6">
              {[
                { step: 1, title: 'Git Push', desc: 'Webhook triggers Jenkins pipeline', icon: GitBranch },
                { step: 2, title: 'Test Suite', desc: 'Jest & API integration checks', icon: FileCheck },
                { step: 3, title: 'Multi-stage Docker', desc: 'Build slim prod image (-60% size)', icon: Layers },
                { step: 4, title: 'NGINX Proxy', desc: 'SSL & reverse proxy reload', icon: ShieldCheck },
                { step: 5, title: 'AWS EC2', desc: 'Live container deploy with 0 downtime', icon: Cloud },
              ].map((item) => {
                const isPassed = pipelineStep >= item.step;
                const isCurrent = pipelineStep === item.step;
                const IconComponent = item.icon;

                return (
                  <div
                    key={item.step}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isCurrent
                        ? 'bg-amber-500/20 border-amber-400 scale-105'
                        : isPassed
                        ? 'bg-emerald-950/30 border-emerald-500/40'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="flex justify-center mb-1.5">
                      <IconComponent
                        className={`w-5 h-5 ${
                          isCurrent
                            ? 'text-amber-400 animate-bounce'
                            : isPassed
                            ? 'text-emerald-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-200">{item.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{item.desc}</div>
                    <div className="mt-2 text-[9px] font-mono font-bold uppercase">
                      {isCurrent ? (
                        <span className="text-amber-400">RUNNING...</span>
                      ) : isPassed ? (
                        <span className="text-emerald-400">PASSED ✓</span>
                      ) : (
                        <span className="text-slate-600">PENDING</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
              <span>Docker footprint optimized through Alpine bases and layer caching. Continuous deployment straight to AWS EC2 cluster.</span>
              <span className="text-amber-400 font-bold">100% Automated</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
