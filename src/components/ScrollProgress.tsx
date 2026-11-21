import React from "react";
import { ArrowUp } from "lucide-react";
import { useScrollParallax } from "../hooks/useParallax";
import { scrollToTarget } from "./SmoothScroll";

export const ScrollProgress: React.FC = () => {
  const { scrollY, scrollProgress } = useScrollParallax();

  const handleScrollToTop = () => {
    scrollToTarget(0, { duration: 1.2 });
  };

  const percent = Math.round(scrollProgress * 100);

  return (
    <>
      {/* Top Global Scroll Progress Laser Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3.5px] z-50 pointer-events-none bg-slate-200/40 dark:bg-slate-900/40 backdrop-blur-xs"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-500 via-indigo-500 to-purple-600 relative transition-[width] duration-75 ease-out shadow-[0_0_16px_rgba(14,165,233,0.9),0_0_30px_rgba(99,102,241,0.5)]"
          style={{ width: `${scrollProgress * 100}%` }}
        >
          {/* Glowing Quantum Diamond Wavefront */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex items-center justify-center">
            <span className="absolute w-4 h-4 rounded-full bg-cyan-400/35 animate-ping pointer-events-none" />
            <div className="w-2.5 h-2.5 rotate-45 rounded-[2px] bg-white border-2 border-cyan-300 shadow-[0_0_10px_#38bdf8,0_0_20px_#818cf8]" />
          </div>
        </div>

        {/* Subtle Micro-Tick Section Notches */}
        <div className="absolute inset-0 pointer-events-none flex justify-between px-[25%] opacity-40">
          <div className="w-[1px] h-full bg-slate-400/60" />
          <div className="w-[1px] h-full bg-slate-400/60" />
        </div>
      </div>

      {/* Floating Top-Right Mini Telemetry Pill (Visible once scrolled) */}
      <div
        className={`fixed top-3 right-4 sm:right-6 z-50 transition-all duration-300 pointer-events-none hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/92 border border-slate-200/90 shadow-md shadow-slate-900/5 backdrop-blur-md font-mono text-[10px] font-bold text-slate-700 ${
          scrollY > 90 ? "opacity-90 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
        <span className="text-sky-700 font-black">{percent}%</span>
        <span className="text-slate-400 font-semibold uppercase tracking-wider text-[9px]">PAGE</span>
      </div>

      {/* Floating Back-to-Top Pill - Cleanly stacked above Cosmos Mode HUD */}
      <div
        className={`fixed bottom-[74px] right-5 sm:bottom-[80px] sm:right-6 z-50 transition-all duration-300 pointer-events-auto no-print ${
          scrollY > 320
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
      >
        <button
          id="back-to-top-btn"
          onClick={handleScrollToTop}
          title="Back to Top"
          aria-label="Back to Top"
          className="group flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/92 border border-slate-300/80 hover:border-sky-500 text-slate-700 hover:text-sky-600 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-all active:scale-95 cursor-pointer"
        >
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform stroke-[2.5]" />
        </button>
      </div>
    </>
  );
};
