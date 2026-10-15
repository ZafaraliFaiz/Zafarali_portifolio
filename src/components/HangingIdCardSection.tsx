import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  CreditCard,
  User,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Smartphone,
  GitBranch,
  ShieldCheck,
  ArrowRight,
  Move
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HangingIdCardSectionProps {
  onOpenAboutModal: () => void;
}

export const HangingIdCardSection: React.FC<HangingIdCardSectionProps> = ({
  onOpenAboutModal,
}) => {
  const [isCardVisible, setIsCardVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Physics State
  const [cardPos, setCardPos] = useState({ x: 0, y: 160 });
  const [angleZ, setAngleZ] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [strapLength, setStrapLength] = useState(150);

  // Internal physics refs
  const physicsRef = useRef({
    x: 0,
    y: 160,
    targetY: 160,
    vx: 0,
    vy: 0,
    angle: 0,
    angularVelocity: 0,
    spinAngle: 0,
    spinVelocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    cardStartX: 0,
    cardStartY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    anchorX: 160,
    anchorY: 10,
    restLength: 155,
  });

  // Calculate container center for anchor
  useEffect(() => {
    const updateAnchor = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const center = rect.width / 2;
        physicsRef.current.anchorX = center;
        if (!physicsRef.current.isDragging) {
          physicsRef.current.x = center;
          setCardPos((prev) => ({ ...prev, x: center }));
        }
      }
    };
    updateAnchor();
    window.addEventListener('resize', updateAnchor);
    return () => window.removeEventListener('resize', updateAnchor);
  }, []);

  // Toggle card visibility with drop-in bounce
  const handleToggleCard = () => {
    if (!isCardVisible) {
      setIsCardVisible(true);
      // Trigger drop-in from top with velocity
      physicsRef.current.y = -60;
      physicsRef.current.vy = 12;
      physicsRef.current.spinVelocity = 18;
      physicsRef.current.angularVelocity = 0.08;
    } else {
      setIsCardVisible(false);
    }
  };

  // Main 60fps Verlet / Spring Physics Loop
  useEffect(() => {
    if (!isCardVisible) return;

    let animId: number;

    const loop = () => {
      const p = physicsRef.current;

      if (!p.isDragging) {
        // 1. Vertical bounce & gravity towards target rest length
        const targetY = p.anchorY + p.restLength;
        const dy = targetY - p.y;
        const springForceY = dy * 0.08;
        p.vy = (p.vy + springForceY) * 0.86;
        p.y += p.vy;

        // 2. Pendulum angular oscillation
        const dx = p.x - p.anchorX;
        const currentLength = Math.max(100, Math.hypot(dx, p.y - p.anchorY));
        const theta = Math.atan2(dx, p.y - p.anchorY);
        
        const gravity = 0.45;
        const angularDamping = 0.96;
        const angularAccel = (-gravity / currentLength) * Math.sin(theta);
        
        p.angularVelocity = (p.angularVelocity + angularAccel) * angularDamping;
        p.angle += p.angularVelocity;

        // Reposition card along pendulum arc
        p.x = p.anchorX + currentLength * Math.sin(p.angle);
        
        // 3. 3D Y-axis rotational spin with damping
        p.spinVelocity *= 0.94;
        p.spinAngle += p.spinVelocity;

        // Subtle settle towards front facing (0 or 360 deg)
        if (Math.abs(p.spinVelocity) < 0.2) {
          const nearestTurn = Math.round(p.spinAngle / 360) * 360;
          p.spinAngle += (nearestTurn - p.spinAngle) * 0.08;
        }

        setCardPos({ x: p.x, y: p.y });
        setAngleZ((p.angle * 180) / Math.PI);
        setRotateY(p.spinAngle);
        setStrapLength(currentLength);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isCardVisible]);

  // Pointer drag interactions
  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const p = physicsRef.current;
    p.isDragging = true;
    setIsDragging(true);
    p.dragStartX = e.clientX;
    p.dragStartY = e.clientY;
    p.cardStartX = p.x;
    p.cardStartY = p.y;
    p.lastX = e.clientX;
    p.lastY = e.clientY;
    p.lastTime = performance.now();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const p = physicsRef.current;
    if (!p.isDragging) return;

    const deltaX = e.clientX - p.dragStartX;
    const deltaY = e.clientY - p.dragStartY;

    // Elastic resistance
    const newX = p.cardStartX + deltaX;
    const newY = Math.max(p.anchorY + 70, p.cardStartY + deltaY);

    p.x = newX;
    p.y = newY;

    // Track instantaneous pointer release velocity
    const now = performance.now();
    const dt = Math.max(1, now - p.lastTime);
    p.vx = (e.clientX - p.lastX) / dt;
    p.vy = (e.clientY - p.lastY) / dt;
    p.lastX = e.clientX;
    p.lastY = e.clientY;
    p.lastTime = now;

    const dx = newX - p.anchorX;
    const dy = newY - p.anchorY;
    const currentLength = Math.hypot(dx, dy);
    const theta = Math.atan2(dx, dy);
    p.angle = theta;

    setCardPos({ x: newX, y: newY });
    setAngleZ((theta * 180) / Math.PI);
    setStrapLength(currentLength);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }

    const p = physicsRef.current;
    p.isDragging = false;
    setIsDragging(false);

    // Give card pendulum swing & 3D Y-axis rotational flip based on throw velocity!
    p.angularVelocity = p.vx * 0.12;
    p.spinVelocity = -p.vx * 2.2;
    p.vy = p.vy * 4;
  };

  const anchorX = physicsRef.current.anchorX || 160;
  const anchorY = physicsRef.current.anchorY || 10;

  return (
    <section id="intro" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Developer Intro, Bio, Skill Pills, Action Buttons */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Status badge: Available for Work */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-50 border-2 border-emerald-300 shadow-sm">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-mono font-black text-emerald-800 uppercase tracking-wider">
                AVAILABLE FOR FULL-TIME ROLES
              </span>
            </div>

            {/* Role heading */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-sky-700">
                SYSTEMS ARCHITECT &amp; DEVELOPER
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-slate-900 tracking-tight leading-tight">
                Engineering Modern{' '}
                <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Web, Mobile &amp; AI
                </span>{' '}
                Solutions
              </h2>
            </div>

            {/* Bio summary */}
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Core skill pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { name: 'React.js & Next.js', icon: Layers, color: 'text-sky-600 bg-sky-50 border-sky-300' },
                { name: 'React Native & Expo', icon: Smartphone, color: 'text-indigo-600 bg-indigo-50 border-indigo-300' },
                { name: 'Node & Express.js', icon: Cpu, color: 'text-emerald-600 bg-emerald-50 border-emerald-300' },
                { name: 'Offline-First Queues', icon: ShieldCheck, color: 'text-amber-600 bg-amber-50 border-amber-300' },
                { name: 'LangChain Gen-AI', icon: Sparkles, color: 'text-purple-600 bg-purple-50 border-purple-300' },
                { name: 'Docker & AWS', icon: GitBranch, color: 'text-slate-700 bg-slate-100 border-slate-300' },
              ].map((pill, idx) => {
                const IconComponent = pill.icon;
                return (
                  <span
                    key={idx}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-mono font-bold shadow-2xs ${pill.color}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{pill.name}</span>
                  </span>
                );
              })}
            </div>

            {/* Action Buttons: SHOW/HIDE CARD & ABOUT ME */}
            <div className="flex flex-wrap items-center gap-3.5 pt-3">
              <button
                onClick={handleToggleCard}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border-2 border-sky-400 hover:border-sky-500 text-sky-800 hover:bg-sky-50 font-mono font-black text-xs sm:text-sm shadow-md transition-all active:scale-95 group"
                aria-expanded={isCardVisible}
              >
                <CreditCard className="w-4 h-4 text-sky-600 group-hover:rotate-12 transition-transform stroke-[2.5]" />
                <span>{isCardVisible ? 'HIDE 3D CARD' : 'SHOW 3D CARD'}</span>
              </button>

              <button
                onClick={onOpenAboutModal}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white font-mono font-black text-xs sm:text-sm shadow-lg shadow-sky-600/25 hover:brightness-105 active:scale-95 transition-all group"
              >
                <User className="w-4 h-4 stroke-[2.5]" />
                <span>ABOUT ME</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Right Column: Physics-Based 3D Hanging ID Card */}
          <div
            ref={containerRef}
            className="lg:col-span-5 relative w-full h-[470px] sm:h-[500px] flex items-center justify-center overflow-visible select-none"
          >
            {isCardVisible ? (
              <div className="relative w-full h-full">
                
                {/* Lanyard Strap SVG Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
                  <defs>
                    <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0284c7" />
                      <stop offset="50%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                    <filter id="lanyardShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0284c7" floodOpacity="0.25" />
                    </filter>
                  </defs>

                  {/* Connecting Ribbon/Strap */}
                  <line
                    x1={anchorX}
                    y1={anchorY}
                    x2={cardPos.x}
                    y2={cardPos.y - 120}
                    stroke="url(#lanyardGrad)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    filter="url(#lanyardShadow)"
                  />
                  {/* Subtle inner highlight stitch */}
                  <line
                    x1={anchorX}
                    y1={anchorY}
                    x2={cardPos.x}
                    y2={cardPos.y - 120}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    strokeOpacity="0.6"
                  />
                </svg>

                {/* Top Ceiling Anchor Clip */}
                <div
                  className="absolute top-1 left-1/2 -translate-x-1/2 z-20 w-8 h-4 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b-md shadow-md border border-slate-300 flex items-center justify-center"
                  style={{ left: `${anchorX}px` }}
                >
                  <div className="w-3 h-1.5 rounded-full bg-slate-800" />
                </div>

                {/* Interactive Physics ID Card Badge */}
                <div
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className={`absolute z-20 w-[270px] sm:w-[290px] h-[370px] sm:h-[390px] cursor-grab active:cursor-grabbing touch-none ${
                    isDragging ? 'scale-105' : 'transition-transform duration-75'
                  }`}
                  style={{
                    left: `${cardPos.x}px`,
                    top: `${cardPos.y}px`,
                    transform: `translate(-50%, -30%) rotate(${angleZ}deg) rotateY(${rotateY}deg)`,
                    transformStyle: 'preserve-3d',
                    perspective: 1000,
                  }}
                >
                  {/* Chrome Badge Clip Top Eyeball */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-7 h-8 bg-gradient-to-b from-slate-300 via-slate-100 to-slate-400 rounded-t-xl rounded-b-md border border-slate-400 shadow-md flex items-center justify-center z-30">
                    <div className="w-3 h-3 rounded-full bg-slate-800 border border-slate-300" />
                  </div>

                  {/* ID Card Outer Body with Specular Border & Luxury Shadow */}
                  <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-white via-white to-slate-50 border-2 border-slate-300/90 shadow-2xl p-5 flex flex-col justify-between overflow-hidden">
                    
                    {/* Top Holographic Security Ribbon */}
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400" />
                    
                    {/* Watermark Logo in BG */}
                    <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-sky-500/5 blur-xl pointer-events-none" />

                    {/* Card Header: Organization & Clearance */}
                    <div className="flex items-center justify-between pt-1 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-mono font-black text-slate-800 tracking-wider uppercase">
                          SOFTWARE DEV // 2026
                        </span>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full border border-sky-300">
                        OFFICIAL PASS
                      </span>
                    </div>

                    {/* Photo Area */}
                    <div className="flex flex-col items-center text-center my-auto py-2">
                      <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-[2.5px] shadow-lg shadow-sky-500/20 mb-2.5">
                        <div className="w-full h-full rounded-[14px] bg-slate-900 overflow-hidden relative shadow-inner">
                          <img
                            src="/images/profilepic2.jpeg"
                            alt={PERSONAL_INFO.preferredName}
                            className="w-full h-full object-cover object-[center_14%]"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-sm" title="Active Clearance">
                          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                      </div>

                      <h3 className="font-display font-black text-slate-950 text-base sm:text-lg tracking-tight">
                        Zafarali Inamdar
                      </h3>
                      <p className="text-[11px] font-mono font-bold text-sky-700">
                        Full Stack &amp; Mobile Engineer
                      </p>

                      <div className="flex items-center gap-1.5 mt-2">
                        <span className="text-[9px] font-mono font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md border border-purple-300">
                          9.05 CGPA Gold
                        </span>
                        <span className="text-[9px] font-mono font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                          Gen-AI Author
                        </span>
                      </div>
                    </div>

                    {/* Card Footer: Barcode & Staff Key */}
                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                      <div className="flex flex-col text-left">
                        <span className="text-[9px] font-mono font-bold text-slate-500 uppercase">
                          CLEARANCE ID
                        </span>
                        <span className="text-[11px] font-mono font-black text-slate-900 tracking-wider">
                          ZI-2026-PROD
                        </span>
                      </div>

                      {/* Mini Simulated Barcode */}
                      <div className="flex items-center gap-[2px] h-6">
                        {[3, 1, 4, 1, 5, 2, 4, 1, 3, 2, 5, 1, 4, 2].map((w, i) => (
                          <div
                            key={i}
                            className="bg-slate-800 rounded-xs"
                            style={{ width: `${w}px`, height: '100%' }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Subtle Drag Prompt Watermark */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 font-bold flex items-center gap-1 opacity-75">
                      <Move className="w-2.5 h-2.5" />
                      <span>DRAG &amp; THROW CARD</span>
                    </div>

                  </div>
                </div>

              </div>
            ) : (
              /* When Card is Hidden */
              <div className="p-8 rounded-3xl bg-white/70 border-2 border-dashed border-slate-300 text-center flex flex-col items-center justify-center space-y-3">
                <CreditCard className="w-10 h-10 text-slate-400 stroke-[1.5]" />
                <p className="text-sm font-mono font-bold text-slate-600">
                  Interactive 3D ID Badge is currently parked.
                </p>
                <button
                  onClick={handleToggleCard}
                  className="px-4 py-2 rounded-xl bg-sky-500 text-white font-mono font-bold text-xs shadow-md hover:bg-sky-600 transition-all active:scale-95"
                >
                  Drop 3D ID Badge
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};
