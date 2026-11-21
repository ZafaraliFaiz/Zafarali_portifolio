import React from "react";
import { ArrowUp } from "lucide-react";
import { useScrollParallax } from "../hooks/useParallax";
import { scrollToTarget } from "./SmoothScroll";

export const ScrollProgress: React.FC = () => {
  const { scrollY, scrollProgress } = useScrollParallax();

  const handleScrollToTop = () => {
    scrollToTarget(0, { duration: 1.2 });
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-slate-900/30 backdrop-blur-[1px]"
      >
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 relative transition-[width] duration-75 ease-out shadow-[0_0_12px_rgba(56,189,248,0.7)]"
          style={{ width: `${scrollProgress * 100}%` }}
        >
          {/* Glowing pulse tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#38bdf8,0_0_20px_#818cf8]" />
        </div>
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
