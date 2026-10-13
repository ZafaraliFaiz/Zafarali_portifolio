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
  Smartphone,
  Package,
  ShoppingCart,
  FileText,
  AlertTriangle
} from 'lucide-react';

export const ArchitectureVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tain-electai' | 'agrostock' | 'ai-engine' | 'devops'>('tain-electai');

  // TAIN Elect AI Simulation State
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

  // AgroStock ERP Inventory & Sales Pipeline State
  interface ERPProduct {
    id: string;
    name: string;
    sku: string;
    unitPrice: number;
    stock: number;
    minThreshold: number;
    category: string;
  }

  const [erpProducts, setErpProducts] = useState<ERPProduct[]>([
    { id: '1', name: 'Wheat Seed Hybrid (Sharbati)', sku: 'SKU-WHT-300', unitPrice: 1540, stock: 240, minThreshold: 50, category: 'Seeds' },
    { id: '2', name: 'Urea 46% Nitrogen Granular', sku: 'SKU-URE-460', unitPrice: 285, stock: 480, minThreshold: 100, category: 'Fertilizers' },
    { id: '3', name: 'Potash Soluble Fertilizer 50kg', sku: 'SKU-POT-750', unitPrice: 1750, stock: 35, minThreshold: 40, category: 'Nutrients' },
  ]);
  const [selectedProductId, setSelectedProductId] = useState<string>('1');
  const [orderQuantity, setOrderQuantity] = useState<number>(10);
  const [isProcessingOrder, setIsProcessingOrder] = useState<boolean>(false);
  const [billingStage, setBillingStage] = useState<'idle' | 'pricing' | 'stock' | 'ledger' | 'invoice'>('idle');
  const [erpLogs, setErpLogs] = useState<string[]>([
    'AgroStock Ledger Core v2.4 initialized. Real-time batch inventory listeners connected.',
    'Warehouse bin verification passed: All stock quantities match primary ledger.',
  ]);

  // AI Translator State
  const [selectedTone, setSelectedTone] = useState<'Executive' | 'Diplomatic' | 'Concise' | 'Persuasive'>('Executive');
  const [selectedProvider, setSelectedProvider] = useState<'Gemini 2.5 Flash' | 'OpenAI GPT-4o'>('Gemini 2.5 Flash');
  const [simulatedAIText, setSimulatedAIText] = useState(
    'Please review the attached quarterly metrics and provide leadership sign-off by end of day.'
  );

  // DevOps Simulation State
  const [pipelineStep, setPipelineStep] = useState<number>(0);
  const [pipelineActive, setPipelineActive] = useState<boolean>(false);

  // Handle TAIN Elect AI Add Queue
  const handleAddVoteRecord = () => {
    const id = Math.floor(1000 + Math.random() * 9000);
    const newRecord = `Voter #${id}: Booth ${Math.floor(Math.random() * 10) + 1} Record`;
    
    if (isOnline) {
      setSyncedRecords((prev) => [newRecord, ...prev]);
    } else {
      setOfflineQueue((prev) => [...prev, newRecord]);
    }
  };

  // Handle TAIN Elect AI Toggle Online
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

  // Handle AgroStock ERP Billing & Stock Deduction Simulation
  const handleDispatchOrder = () => {
    const product = erpProducts.find((p) => p.id === selectedProductId);
    if (!product) return;
    if (product.stock < orderQuantity) {
      setErpLogs((prev) => [
        `❌ Dispatch Blocked: Insufficient stock for ${product.name}. Available: ${product.stock}, Requested: ${orderQuantity}.`,
        ...prev,
      ]);
      return;
    }

    setIsProcessingOrder(true);
    setBillingStage('pricing');
    const subtotal = product.unitPrice * orderQuantity;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;
    const invId = `INV-${Math.floor(10000 + Math.random() * 90000)}`;

    setErpLogs((prev) => [
      `⚡ [Step 1: Pricing & GST] Order: ${orderQuantity}x ${product.name} (${product.sku}) | Base: ₹${subtotal.toLocaleString()} + 18% GST: ₹${gst.toLocaleString()} = Total: ₹${total.toLocaleString()}`,
      ...prev,
    ]);

    setTimeout(() => {
      setBillingStage('stock');
      const updatedStock = product.stock - orderQuantity;
      setErpProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, stock: updatedStock } : p))
      );
      setErpLogs((prev) => [
        `📦 [Step 2: Atomic Warehouse Deduction] Bin lock acquired. Deducted ${orderQuantity} units from ${product.sku}. Remaining: ${updatedStock} units.${
          updatedStock <= product.minThreshold ? ` ⚠️ REORDER WARNING: Stock fell below threshold (${product.minThreshold})!` : ''
        }`,
        ...prev,
      ]);

      setTimeout(() => {
        setBillingStage('ledger');
        setErpLogs((prev) => [
          `📒 [Step 3: Double-Entry Ledger] Debited Accounts Receivable ₹${total.toLocaleString()} | Credited Sales Account & GST Output Tax.`,
          ...prev,
        ]);

        setTimeout(() => {
          setBillingStage('invoice');
          setIsProcessingOrder(false);
          setErpLogs((prev) => [
            `✅ [Step 4: Vector PDF Output] Generated Invoice #${invId} via jsPDF AutoTable. Ready for thermal print / WhatsApp billing.`,
            ...prev,
          ]);
        }, 700);
      }, 700);
    }, 700);
  };

  const handleRestock = (productId: string) => {
    setErpProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 100 } : p))
    );
    const prod = erpProducts.find((p) => p.id === productId);
    if (prod) {
      setErpLogs((prev) => [
        `📥 Warehouse Restock: Added +100 units to ${prod.sku} (${prod.name}). Stock replenished.`,
        ...prev,
      ]);
    }
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-800 text-xs font-mono uppercase tracking-wider mb-3 font-bold shadow-sm">
            <Cpu className="w-4 h-4 text-sky-600 stroke-[2.5]" />
            <span>Interactive Engineering Visualizer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
            How I Architect{' '}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mission-Critical Systems
            </span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-3 leading-relaxed font-medium">
            Interact with live simulations of the key engineering patterns I designed across my projects: 
            Offline-first queues, atomic warehouse stock deductions, multi-provider Gen-AI orchestration, and automated CI/CD pipelines.
          </p>
        </div>

        {/* System Architecture Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
          <button
            onClick={() => setActiveTab('tain-electai')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'tain-electai'
                ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-500/30 scale-105'
                : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:text-sky-700 shadow-sm'
            }`}
          >
            <Smartphone className="w-4 h-4 stroke-[2.5]" />
            <span>TAIN Elect AI Offline-First</span>
          </button>

          <button
            onClick={() => setActiveTab('agrostock')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'agrostock'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/30 scale-105'
                : 'bg-white text-slate-800 border-slate-300 hover:border-emerald-400 hover:text-emerald-700 shadow-sm'
            }`}
          >
            <Layers className="w-4 h-4 stroke-[2.5]" />
            <span>AgroStock ERP Inventory</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-engine')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'ai-engine'
                ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30 scale-105'
                : 'bg-white text-slate-800 border-slate-300 hover:border-purple-400 hover:text-purple-700 shadow-sm'
            }`}
          >
            <Cpu className="w-4 h-4 stroke-[2.5]" />
            <span>AI Multi-LLM Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('devops')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-2 ${
              activeTab === 'devops'
                ? 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-500/30 scale-105'
                : 'bg-white text-slate-800 border-slate-300 hover:border-amber-400 hover:text-amber-700 shadow-sm'
            }`}
          >
            <GitBranch className="w-4 h-4 stroke-[2.5]" />
            <span>House Rent DevOps Pipeline</span>
          </button>
        </div>

        {/* Tab 1: TAIN Elect AI Offline-First Architecture */}
        {activeTab === 'tain-electai' && (
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-sky-400/90 shadow-2xl relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200 mt-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-sky-100 text-sky-900 px-3 py-1 rounded-lg border-2 border-sky-300 font-extrabold shadow-sm">
                    TAIN Elect AI • React Native + Supabase
                  </span>
                  <span className="text-xs text-slate-600 font-mono font-medium">AsyncStorage + NetInfo + Exponential Backoff</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-2 tracking-tight">
                  Offline-First Local Write-Queue & Background Sync
                </h3>
              </div>

              {/* Network Toggle Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleOnline}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-extrabold transition-all border-2 shadow-sm ${
                    isOnline
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                      : 'bg-rose-100 text-rose-900 border-rose-300 hover:bg-rose-200'
                  }`}
                >
                  {isOnline ? <Wifi className="w-4 h-4 text-emerald-600 stroke-[2.5]" /> : <WifiOff className="w-4 h-4 text-rose-600 stroke-[2.5]" />}
                  <span>Status: {isOnline ? 'ONLINE' : 'OFFLINE (Simulated)'}</span>
                </button>

                <button
                  onClick={handleAddVoteRecord}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs sm:text-sm font-bold active:scale-95 transition-all shadow-md shadow-sky-600/30 border-2 border-sky-500"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Record Voter Action</span>
                </button>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* Step 1: React Native UI */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono text-sky-800 font-extrabold flex items-center gap-1.5 mb-1.5">
                    <Smartphone className="w-4 h-4 text-sky-600 stroke-[2.5]" />
                    <span>01. React Native Device UI</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    Field agents record voter counseling, unlisted app forms, and camera captures on iOS/Android.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t-2 border-slate-200 text-[11px] font-mono text-slate-700">
                  Write latency: <span className="text-emerald-700 font-black">&lt; 4ms</span> (Optimistic UI)
                </div>
              </div>

              {/* Step 2: Local AsyncStorage Write-Queue */}
              <div className={`p-4 rounded-2xl border-2 transition-all shadow-sm ${
                offlineQueue.length > 0 ? 'bg-sky-50/80 border-sky-400' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-sky-900 font-extrabold flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-sky-600 stroke-[2.5]" />
                    <span>02. AsyncStorage Write-Queue</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-200 text-sky-900 font-black border border-sky-300">
                    {offlineQueue.length} queued
                  </span>
                </div>
                <p className="text-xs text-slate-700 mb-2 leading-relaxed font-medium">
                  Writes persist safely in local sandbox memory. If NetInfo is offline, items wait with retry backoff.
                </p>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {offlineQueue.length === 0 ? (
                    <div className="text-[11px] text-slate-500 italic">Queue empty (All records synchronized)</div>
                  ) : (
                    offlineQueue.map((item, idx) => (
                      <div key={idx} className="text-[11px] font-mono bg-white text-slate-900 p-2 rounded-lg border-2 border-slate-200 flex items-center justify-between shadow-sm">
                        <span className="truncate font-semibold">{item}</span>
                        <span className="text-[9px] text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300 font-black">QUEUED</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Step 3: Supabase Cloud Postgres */}
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="text-xs font-mono text-emerald-800 font-extrabold flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      <span>03. Supabase Postgres & Auth</span>
                    </div>
                    {isSyncing && (
                      <span className="text-[10px] text-sky-700 flex items-center gap-1 animate-pulse font-bold">
                        <RefreshCw className="w-3 h-3 animate-spin stroke-[2.5]" /> Syncing...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-700 mb-2 leading-relaxed font-medium">
                    Synced records reconciled with role-based PII masking and hardened security policies.
                  </p>
                </div>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {syncedRecords.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-[11px] font-mono bg-emerald-100 text-emerald-900 p-1.5 rounded-lg border border-emerald-300 flex items-center justify-between font-semibold">
                      <span className="truncate">{item}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0 stroke-[2.5]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-700 font-mono bg-sky-50/70 p-3.5 rounded-2xl border-2 border-sky-200 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>💡 <strong className="text-slate-900">How to test:</strong> Click &quot;Record Voter Action&quot; while OFFLINE to see the queue grow. Toggle to &quot;ONLINE&quot; to witness automatic queue sync!</span>
              <span className="text-sky-800 font-black shrink-0">Resilience: 100% Zero-Loss</span>
            </div>

            {/* Production Store Distribution Banner */}
            <div className="mt-3 p-4 rounded-2xl bg-slate-900 text-white border-2 border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <span className="text-xs font-mono">
                  <strong className="text-emerald-400">Live Production Status:</strong> Published via <strong className="text-white">Apple iOS Unlisted App Distribution</strong> &amp; live on the <strong className="text-white">Google Play Store via Google Play Console</strong> after Closed Testing tracks.
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/50 text-[11px] font-mono font-black shrink-0">
                Live on iOS &amp; Android ✓
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: AgroStock Inventory & Billing Pipeline */}
        {activeTab === 'agrostock' && (
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-emerald-400/90 shadow-2xl relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200 mt-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-emerald-100 text-emerald-900 px-3 py-1 rounded-lg border-2 border-emerald-300 font-extrabold shadow-sm">
                    Nebula Technology • React Vite + Redux Toolkit + Node.js
                  </span>
                  <span className="text-xs text-slate-600 font-mono font-medium">Atomic Stock Reconciliation + GST Billing + jsPDF Invoicing</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-2 tracking-tight">
                  High-Throughput ERP Sales Billing & Batch Inventory Pipeline
                </h3>
              </div>

              {/* Order Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 shadow-sm">
                  <span className="text-xs font-mono text-slate-700 font-bold">Product:</span>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="bg-transparent text-xs font-mono text-emerald-800 font-black focus:outline-none cursor-pointer"
                  >
                    {erpProducts.map((p) => (
                      <option key={p.id} value={p.id} className="bg-white text-slate-900">
                        {p.name.split(' ')[0]} ({p.sku}) - ₹{p.unitPrice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border-2 border-slate-300 rounded-xl px-3 py-1.5 shadow-sm">
                  <span className="text-xs font-mono text-slate-700 font-bold">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 bg-transparent text-xs font-mono text-slate-900 font-black text-center focus:outline-none border-b-2 border-slate-400"
                  />
                  <span className="text-[10px] text-slate-600 font-bold">units</span>
                </div>

                <button
                  onClick={handleDispatchOrder}
                  disabled={isProcessingOrder}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-emerald-600/30 border-2 border-emerald-500"
                >
                  <Package className={`w-3.5 h-3.5 stroke-[2.5] ${isProcessingOrder ? 'animate-bounce' : ''}`} />
                  <span>{isProcessingOrder ? 'Deducting Stock...' : 'Dispatch B2B Bill & Deduct'}</span>
                </button>
              </div>
            </div>

            {/* Warehouse Inventory Stock Level Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6">
              {erpProducts.map((p) => {
                const isSelected = p.id === selectedProductId;
                const isLowStock = p.stock <= p.minThreshold;

                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProductId(p.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold border border-slate-200">
                        {p.category} • {p.sku}
                      </span>
                      {isLowStock ? (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 border-2 border-rose-300 font-black animate-pulse flex items-center gap-1 shadow-sm">
                          <AlertTriangle className="w-3 h-3 stroke-[2.5]" /> LOW STOCK
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border-2 border-emerald-300 font-black">
                          IN STOCK
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-black text-slate-900 truncate font-display">{p.name}</div>
                    <div className="flex items-baseline justify-between mt-2 pt-2 border-t-2 border-slate-100">
                      <div>
                        <div className="text-[10px] text-slate-600 font-mono font-medium">Wholesale Price</div>
                        <div className="text-xs font-mono font-black text-slate-900">₹{p.unitPrice.toLocaleString()} / unit</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-600 font-mono font-medium">Available Stock</div>
                        <div className={`text-base font-mono font-black ${isLowStock ? 'text-rose-700' : 'text-emerald-700'}`}>
                          {p.stock} units
                        </div>
                      </div>
                    </div>

                    {isLowStock && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestock(p.id);
                        }}
                        className="w-full mt-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 border-2 border-rose-300 hover:bg-rose-200 text-[11px] font-mono font-black transition-all shadow-sm"
                      >
                        + Restock Batch (+100 Units)
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Visual 4-Stage Transaction Pipeline */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
              <div className={`p-4 rounded-2xl border-2 text-center transition-all ${
                billingStage === 'pricing' ? 'bg-emerald-100 border-emerald-500 scale-[1.02] shadow-md' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-emerald-900 font-black mb-1">1. Pricing & GST</div>
                <div className="text-[11px] text-slate-700 font-medium">Multi-tier wholesale calculation + 18% GST</div>
                <div className="mt-2 text-[10px] font-mono text-slate-800 font-extrabold">
                  {billingStage === 'pricing' ? 'COMPUTING TAX...' : 'State: Ready'}
                </div>
              </div>

              <div className={`p-4 rounded-2xl border-2 text-center transition-all ${
                billingStage === 'stock' ? 'bg-sky-100 border-sky-500 scale-[1.02] shadow-md' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-sky-900 font-black mb-1">2. Atomic Stock Deduct</div>
                <div className="text-[11px] text-slate-700 font-medium">Prevents overselling & checks min-threshold</div>
                <div className="mt-2 text-[10px] font-mono text-slate-800 font-extrabold">
                  {billingStage === 'stock' ? 'LOCKING BIN...' : 'Bin Lock: Free'}
                </div>
              </div>

              <div className={`p-4 rounded-2xl border-2 text-center transition-all ${
                billingStage === 'ledger' ? 'bg-indigo-100 border-indigo-500 scale-[1.02] shadow-md' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-indigo-900 font-black mb-1">3. Ledger Posting</div>
                <div className="text-[11px] text-slate-700 font-medium">Double-entry debit/credit reconciliation</div>
                <div className="mt-2 text-[10px] font-mono text-slate-800 font-extrabold">
                  {billingStage === 'ledger' ? 'POSTING LEDGER...' : 'Accounts: Balanced'}
                </div>
              </div>

              <div className={`p-4 rounded-2xl border-2 text-center transition-all ${
                billingStage === 'invoice' ? 'bg-emerald-100 border-emerald-500 scale-[1.02] shadow-md' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-emerald-900 font-black mb-1">4. Vector jsPDF</div>
                <div className="text-[11px] text-slate-700 font-medium">Printable invoice + QR + auto-dispatch</div>
                <div className="mt-2 text-[10px] font-mono text-emerald-800 font-black">
                  {billingStage === 'invoice' ? 'INVOICE ISSUED ✓' : 'Thermal & PDF Ready'}
                </div>
              </div>
            </div>

            {/* Live Terminal / Audit Log */}
            <div className="bg-slate-950 p-4 rounded-2xl border-2 border-slate-800 font-mono text-xs space-y-1.5 max-h-36 overflow-y-auto shadow-inner">
              <div className="text-slate-300 font-bold mb-2 flex items-center justify-between border-b border-slate-800 pb-1">
                <span># AgroStock ERP Transaction & Audit Log:</span>
                <span className="text-[10px] text-emerald-400 font-black">Live Stream • Synchronized</span>
              </div>
              {erpLogs.map((log, index) => (
                <div key={index} className="text-slate-200 leading-relaxed">
                  {log}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t-2 border-slate-200 text-xs font-mono text-slate-700 flex flex-wrap items-center justify-between gap-2">
              <span>💡 Try dispatching orders to watch stock decrement in real-time. If stock drops below threshold, an automated reorder alert triggers!</span>
              <span className="text-emerald-800 font-black">Stock Reconciliation: 100% Atomic</span>
            </div>
          </div>
        )}

        {/* Tab 3: AI Multi-LLM Engine */}
        {activeTab === 'ai-engine' && (
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-purple-400/90 shadow-2xl relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200 mt-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-purple-100 text-purple-900 px-3 py-1 rounded-lg border-2 border-purple-300 font-extrabold shadow-sm">
                    Gen-AI Platform • FastAPI + LangChain + Gemini
                  </span>
                  <span className="text-xs text-slate-600 font-mono font-medium">Dynamic Tone Adaptation & Multi-Provider Fallback</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-2 tracking-tight">
                  Context-Preserving Tone Transformation Engine
                </h3>
              </div>

              {/* Model Provider Picker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-700 font-bold">Primary Provider:</span>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as any)}
                  className="bg-white border-2 border-purple-300 text-purple-900 text-xs font-mono font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-sm cursor-pointer"
                >
                  <option value="Gemini 2.5 Flash">Google Gemini 2.5 Flash</option>
                  <option value="OpenAI GPT-4o">OpenAI GPT-4o (Dual Routing)</option>
                </select>
              </div>
            </div>

            {/* Tone Selector Pills */}
            <div className="flex flex-wrap items-center gap-2.5 my-5">
              <span className="text-xs font-mono text-slate-700 font-bold mr-2">Select Target Tone:</span>
              {(['Executive', 'Diplomatic', 'Concise', 'Persuasive'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-mono transition-all border-2 ${
                    selectedTone === tone
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-500/30'
                      : 'bg-white text-slate-800 border-slate-300 hover:border-purple-400 hover:text-purple-700 shadow-sm'
                  }`}
                >
                  {tone} Tone
                </button>
              ))}
            </div>

            {/* Input vs Output Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-sm">
                <div className="text-xs font-mono text-slate-700 font-bold mb-2 flex items-center justify-between">
                  <span>Input Draft (Raw context):</span>
                  <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-800 font-bold">Original</span>
                </div>
                <div className="text-sm text-slate-800 font-sans p-3.5 rounded-xl bg-white border-2 border-slate-200 shadow-sm leading-relaxed font-medium">
                  {simulatedAIText}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/80 border-2 border-purple-300 shadow-sm">
                <div className="text-xs font-mono text-purple-900 font-extrabold mb-2 flex items-center justify-between">
                  <span>AI Transformed ({selectedTone} tone):</span>
                  <span className="text-[10px] bg-purple-200 px-2 py-0.5 rounded-md text-purple-900 border border-purple-300 font-black">
                    Engine: {selectedProvider}
                  </span>
                </div>
                <div className="text-sm text-purple-950 font-sans p-3.5 rounded-xl bg-white border-2 border-purple-200 shadow-sm leading-relaxed font-bold">
                  {toneSamples[selectedTone]}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t-2 border-slate-200 text-xs font-mono text-slate-700 flex flex-wrap items-center justify-between gap-2">
              <span>LangChain Fallback Strategy: If provider rate-limit occurs, automatic zero-loss switch to secondary LLM in &lt; 200ms.</span>
              <span className="text-purple-800 font-black">MySQL translation history cached</span>
            </div>
          </div>
        )}

        {/* Tab 4: DevOps & Cloud Pipeline */}
        {activeTab === 'devops' && (
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-amber-400/90 shadow-2xl relative overflow-hidden bg-white">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b-2 border-slate-200 mt-1">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-amber-100 text-amber-900 px-3 py-1 rounded-lg border-2 border-amber-300 font-extrabold shadow-sm">
                    House Rent Admin • Cloud Infrastructure
                  </span>
                  <span className="text-xs text-slate-600 font-mono font-medium">Docker + NGINX + Jenkins CI/CD + AWS EC2</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-2 tracking-tight">
                  Automated CI/CD Pipeline to AWS Cloud
                </h3>
              </div>

              <button
                onClick={handleRunDevOpsPipeline}
                disabled={pipelineActive}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs sm:text-sm font-bold active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-amber-600/30 border-2 border-amber-500"
              >
                <Play className="w-3.5 h-3.5 fill-current stroke-[2.5]" />
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
                    className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                      isCurrent
                        ? 'bg-amber-100 border-amber-500 scale-105 shadow-md'
                        : isPassed
                        ? 'bg-emerald-50 border-emerald-400'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-center mb-1.5">
                      <IconComponent
                        className={`w-5 h-5 stroke-[2.5] ${
                          isCurrent
                            ? 'text-amber-700 animate-bounce'
                            : isPassed
                            ? 'text-emerald-700'
                            : 'text-slate-400'
                        }`}
                      />
                    </div>
                    <div className="text-xs font-mono font-black text-slate-900">{item.title}</div>
                    <div className="text-[10px] text-slate-600 mt-0.5 font-medium">{item.desc}</div>
                    <div className="mt-2 text-[10px] font-mono font-black uppercase">
                      {isCurrent ? (
                        <span className="text-amber-800">RUNNING...</span>
                      ) : isPassed ? (
                        <span className="text-emerald-800">PASSED ✓</span>
                      ) : (
                        <span className="text-slate-400">PENDING</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-amber-50/70 p-3.5 rounded-2xl border-2 border-amber-200 text-xs font-mono text-slate-700 flex items-center justify-between">
              <span>Docker footprint optimized through Alpine bases and layer caching. Continuous deployment straight to AWS EC2 cluster.</span>
              <span className="text-amber-800 font-black">100% Automated</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
