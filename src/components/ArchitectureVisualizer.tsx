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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono uppercase tracking-wider mb-3 font-semibold">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Engineering Visualizer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            How I Architect{' '}
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Mission-Critical Systems
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Interact with live simulations of the key engineering patterns I designed across my projects: 
            Offline-first queues, atomic warehouse stock deductions, multi-provider Gen-AI orchestration, and automated CI/CD pipelines.
          </p>
        </div>

        {/* System Architecture Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <button
            onClick={() => setActiveTab('tain-electai')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'tain-electai'
                ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>TAIN Elect AI Offline-First Queue</span>
          </button>

          <button
            onClick={() => setActiveTab('agrostock')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'agrostock'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25 scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>AgroStock Inventory & Billing Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('ai-engine')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'ai-engine'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25 scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Multi-LLM Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('devops')}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'devops'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-500/25 scale-105'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>House Rent DevOps Pipeline</span>
          </button>
        </div>

        {/* Tab 1: TAIN Elect AI Offline-First Architecture */}
        {activeTab === 'tain-electai' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sky-200 shadow-xl relative overflow-hidden bg-white/95">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-sky-50 text-sky-800 px-2.5 py-1 rounded-md border border-sky-200 font-semibold">
                    TAIN Elect AI • React Native + Supabase
                  </span>
                  <span className="text-xs text-slate-500 font-mono">AsyncStorage + NetInfo + Exponential Backoff</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Offline-First Local Write-Queue & Background Sync
                </h3>
              </div>

              {/* Network Toggle Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleToggleOnline}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all shadow-sm ${
                    isOnline
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-50 text-rose-800 border border-rose-300'
                  }`}
                >
                  {isOnline ? <Wifi className="w-4 h-4 text-emerald-600" /> : <WifiOff className="w-4 h-4 text-rose-600" />}
                  <span>Status: {isOnline ? 'ONLINE' : 'OFFLINE (Simulated)'}</span>
                </button>

                <button
                  onClick={handleAddVoteRecord}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 text-white text-xs sm:text-sm font-bold hover:bg-sky-500 active:scale-95 transition-all shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Record Voter Action</span>
                </button>
              </div>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              {/* Step 1: React Native UI */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-sky-700 font-semibold flex items-center gap-1.5 mb-1">
                    <Smartphone className="w-4 h-4" />
                    <span>01. React Native Device UI</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Field agents record voter counseling, unlisted app forms, and camera captures on iOS/Android.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] font-mono text-slate-600">
                  Write latency: <span className="text-emerald-600 font-bold">&lt; 4ms</span> (Optimistic UI)
                </div>
              </div>

              {/* Step 2: Local AsyncStorage Write-Queue */}
              <div className={`p-4 rounded-xl border transition-all ${
                offlineQueue.length > 0 ? 'bg-sky-50/70 border-sky-300' : 'bg-slate-50 border border-slate-200'
              }`}>
                <div className="text-xs font-mono text-sky-800 font-semibold flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    <Database className="w-4 h-4 text-sky-600" />
                    <span>02. AsyncStorage Write-Queue</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold">
                    {offlineQueue.length} queued
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-2">
                  Writes persist safely in local sandbox memory. If NetInfo is offline, items wait with retry backoff.
                </p>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {offlineQueue.length === 0 ? (
                    <div className="text-[11px] text-slate-400 italic">Queue empty (All records synchronized)</div>
                  ) : (
                    offlineQueue.map((item, idx) => (
                      <div key={idx} className="text-[11px] font-mono bg-white text-slate-800 p-1.5 rounded border border-slate-200 flex items-center justify-between shadow-sm">
                        <span className="truncate">{item}</span>
                        <span className="text-[9px] text-amber-600 font-bold">QUEUED</span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Step 3: Supabase Cloud Postgres */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-emerald-700 font-semibold flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-emerald-600" />
                      <span>03. Supabase Postgres & Auth</span>
                    </div>
                    {isSyncing && (
                      <span className="text-[10px] text-sky-600 flex items-center gap-1 animate-pulse">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Syncing...
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mb-2">
                    Synced records reconciled with role-based PII masking and hardened security policies.
                  </p>
                </div>
                <div className="space-y-1 max-h-24 overflow-y-auto pr-1">
                  {syncedRecords.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="text-[11px] font-mono bg-emerald-50 text-emerald-800 p-1 rounded border border-emerald-200 flex items-center justify-between">
                      <span className="truncate">{item}</span>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-600 font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <span>💡 <strong className="text-slate-800">How to test:</strong> Click &quot;Record Voter Action&quot; while OFFLINE to see the queue grow. Toggle to &quot;ONLINE&quot; to witness automatic queue sync!</span>
              <span className="text-sky-700 font-bold">Resilience: 100% Zero-Loss</span>
            </div>
          </div>
        )}

        {/* Tab 2: AgroStock Inventory & Billing Pipeline */}
        {activeTab === 'agrostock' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-emerald-200 shadow-xl relative overflow-hidden bg-white/95">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
                    Nebula Technology • React Vite + Redux Toolkit + Node.js
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Atomic Stock Reconciliation + GST Billing + jsPDF Invoicing</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  High-Throughput ERP Sales Billing & Batch Inventory Pipeline
                </h3>
              </div>

              {/* Order Controls */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
                  <span className="text-xs font-mono text-slate-600 font-semibold">Product:</span>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="bg-transparent text-xs font-mono text-emerald-800 font-bold focus:outline-none cursor-pointer"
                  >
                    {erpProducts.map((p) => (
                      <option key={p.id} value={p.id} className="bg-white text-slate-900">
                        {p.name.split(' ')[0]} ({p.sku}) - ₹{p.unitPrice}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-sm">
                  <span className="text-xs font-mono text-slate-600 font-semibold">Qty:</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 bg-transparent text-xs font-mono text-slate-900 font-bold text-center focus:outline-none border-b border-slate-300"
                  />
                  <span className="text-[10px] text-slate-500">units</span>
                </div>

                <button
                  onClick={handleDispatchOrder}
                  disabled={isProcessingOrder}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs sm:text-sm font-bold hover:bg-emerald-500 active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-emerald-500/20"
                >
                  <Package className={`w-3.5 h-3.5 ${isProcessingOrder ? 'animate-bounce' : ''}`} />
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
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/60 border-emerald-400 shadow-md ring-2 ring-emerald-400/20'
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {p.category} • {p.sku}
                      </span>
                      {isLowStock ? (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold animate-pulse flex items-center gap-1">
                          <AlertTriangle className="w-2.5 h-2.5" /> LOW STOCK
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold">
                          IN STOCK
                        </span>
                      )}
                    </div>

                    <div className="text-sm font-bold text-slate-900 truncate">{p.name}</div>
                    <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-slate-200">
                      <div>
                        <div className="text-[10px] text-slate-500 font-mono">Wholesale Price</div>
                        <div className="text-xs font-mono font-bold text-slate-800">₹{p.unitPrice.toLocaleString()} / unit</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 font-mono">Available Stock</div>
                        <div className={`text-base font-mono font-extrabold ${isLowStock ? 'text-rose-600' : 'text-emerald-600'}`}>
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
                        className="w-full mt-3 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 text-[10px] font-mono font-bold transition-all"
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
              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                billingStage === 'pricing' ? 'bg-emerald-50 border-emerald-400 scale-[1.02]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-emerald-800 font-bold mb-1">1. Pricing & GST</div>
                <div className="text-[11px] text-slate-600">Multi-tier wholesale calculation + 18% GST</div>
                <div className="mt-2 text-[10px] font-mono text-slate-700 font-semibold">
                  {billingStage === 'pricing' ? 'COMPUTING TAX...' : 'State: Ready'}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                billingStage === 'stock' ? 'bg-sky-50 border-sky-400 scale-[1.02]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-sky-800 font-bold mb-1">2. Atomic Stock Deduct</div>
                <div className="text-[11px] text-slate-600">Prevents overselling & checks min-threshold</div>
                <div className="mt-2 text-[10px] font-mono text-slate-700 font-semibold">
                  {billingStage === 'stock' ? 'LOCKING BIN...' : 'Bin Lock: Free'}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                billingStage === 'ledger' ? 'bg-indigo-50 border-indigo-400 scale-[1.02]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-indigo-800 font-bold mb-1">3. Ledger Posting</div>
                <div className="text-[11px] text-slate-600">Double-entry debit/credit reconciliation</div>
                <div className="mt-2 text-[10px] font-mono text-slate-700 font-semibold">
                  {billingStage === 'ledger' ? 'POSTING LEDGER...' : 'Accounts: Balanced'}
                </div>
              </div>

              <div className={`p-3.5 rounded-xl border text-center transition-all ${
                billingStage === 'invoice' ? 'bg-emerald-50 border-emerald-400 scale-[1.02]' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="text-xs font-mono text-emerald-800 font-bold mb-1">4. Vector jsPDF</div>
                <div className="text-[11px] text-slate-600">Printable invoice + QR + auto-dispatch</div>
                <div className="mt-2 text-[10px] font-mono text-emerald-700 font-bold">
                  {billingStage === 'invoice' ? 'INVOICE ISSUED ✓' : 'Thermal & PDF Ready'}
                </div>
              </div>
            </div>

            {/* Live Terminal / Audit Log */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-1 max-h-36 overflow-y-auto">
              <div className="text-slate-400 font-semibold mb-2 flex items-center justify-between">
                <span># AgroStock ERP Transaction & Audit Log:</span>
                <span className="text-[10px] text-emerald-400">Live Stream • Synchronized</span>
              </div>
              {erpLogs.map((log, index) => (
                <div key={index} className="text-slate-200 leading-relaxed">
                  {log}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-mono text-slate-600 flex flex-wrap items-center justify-between gap-2">
              <span>💡 Try dispatching orders to watch stock decrement in real-time. If stock drops below threshold, an automated reorder alert triggers!</span>
              <span className="text-emerald-700 font-bold">Stock Reconciliation: 100% Atomic</span>
            </div>
          </div>
        )}

        {/* Tab 3: AI Multi-LLM Engine */}
        {activeTab === 'ai-engine' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-purple-200 shadow-xl relative overflow-hidden bg-white/95">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-purple-50 text-purple-800 px-2.5 py-1 rounded-md border border-purple-200 font-semibold">
                    Gen-AI Platform • FastAPI + LangChain + Gemini
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Dynamic Tone Adaptation & Multi-Provider Fallback</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Context-Preserving Tone Transformation Engine
                </h3>
              </div>

              {/* Model Provider Picker */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-600 font-semibold">Primary Provider:</span>
                <select
                  value={selectedProvider}
                  onChange={(e) => setSelectedProvider(e.target.value as any)}
                  className="bg-white border border-purple-300 text-purple-800 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-purple-400 shadow-sm"
                >
                  <option value="Gemini 2.5 Flash">Google Gemini 2.5 Flash</option>
                  <option value="OpenAI GPT-4o">OpenAI GPT-4o (Dual Routing)</option>
                </select>
              </div>
            </div>

            {/* Tone Selector Pills */}
            <div className="flex flex-wrap items-center gap-2 my-5">
              <span className="text-xs font-mono text-slate-600 font-semibold mr-2">Select Target Tone:</span>
              {(['Executive', 'Diplomatic', 'Concise', 'Persuasive'] as const).map((tone) => (
                <button
                  key={tone}
                  onClick={() => setSelectedTone(tone)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                    selectedTone === tone
                      ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-500/25'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-300 shadow-sm'
                  }`}
                >
                  {tone} Tone
                </button>
              ))}
            </div>

            {/* Input vs Output Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-mono text-slate-500 mb-2 flex items-center justify-between">
                  <span>Input Draft (Raw context):</span>
                  <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-700">Original</span>
                </div>
                <div className="text-sm text-slate-700 font-sans p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                  {simulatedAIText}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200">
                <div className="text-xs font-mono text-purple-800 font-semibold mb-2 flex items-center justify-between">
                  <span>AI Transformed ({selectedTone} tone):</span>
                  <span className="text-[10px] bg-purple-100 px-1.5 py-0.5 rounded text-purple-800 border border-purple-200">
                    Engine: {selectedProvider}
                  </span>
                </div>
                <div className="text-sm text-purple-950 font-sans p-3 rounded-lg bg-white border border-purple-200 shadow-sm font-medium">
                  {toneSamples[selectedTone]}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-mono text-slate-600 flex flex-wrap items-center justify-between gap-2">
              <span>LangChain Fallback Strategy: If provider rate-limit occurs, automatic zero-loss switch to secondary LLM in &lt; 200ms.</span>
              <span className="text-purple-700 font-semibold">MySQL translation history cached</span>
            </div>
          </div>
        )}

        {/* Tab 4: DevOps & Cloud Pipeline */}
        {activeTab === 'devops' && (
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-xl relative overflow-hidden bg-white/95">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase bg-amber-50 text-amber-800 px-2.5 py-1 rounded-md border border-amber-200 font-semibold">
                    House Rent Admin • Cloud Infrastructure
                  </span>
                  <span className="text-xs text-slate-500 font-mono">Docker + NGINX + Jenkins CI/CD + AWS EC2</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  Automated CI/CD Pipeline to AWS Cloud
                </h3>
              </div>

              <button
                onClick={handleRunDevOpsPipeline}
                disabled={pipelineActive}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 text-white text-xs sm:text-sm font-bold hover:bg-amber-500 active:scale-95 transition-all disabled:opacity-50 shadow-md shadow-amber-500/20"
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
                        ? 'bg-amber-100 border-amber-400 scale-105 shadow-md'
                        : isPassed
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-center mb-1.5">
                      <IconComponent
                        className={`w-5 h-5 ${
                          isCurrent
                            ? 'text-amber-600 animate-bounce'
                            : isPassed
                            ? 'text-emerald-600'
                            : 'text-slate-400'
                        }`}
                      />
                    </div>
                    <div className="text-xs font-mono font-bold text-slate-800">{item.title}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{item.desc}</div>
                    <div className="mt-2 text-[9px] font-mono font-bold uppercase">
                      {isCurrent ? (
                        <span className="text-amber-700">RUNNING...</span>
                      ) : isPassed ? (
                        <span className="text-emerald-700">PASSED ✓</span>
                      ) : (
                        <span className="text-slate-400">PENDING</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-mono text-slate-600 flex items-center justify-between">
              <span>Docker footprint optimized through Alpine bases and layer caching. Continuous deployment straight to AWS EC2 cluster.</span>
              <span className="text-amber-700 font-bold">100% Automated</span>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
