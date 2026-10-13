import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useScrollParallax } from '../hooks/useParallax';

export const ScrollProgress: React.FC = () => {
  const { scrollY, scrollProgress } = useScrollParallax();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const percentage = Math.round(scrollProgress * 100);

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

      {/* Floating Back-to-Top Pill */}
      <div
        className={`fixed bottom-6 right-6 z-40 transition-all duration-300 pointer-events-auto no-print ${
          scrollY > 320
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={handleScrollToTop}
          title="Back to Top"
          className="group flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 border-2 border-slate-300 hover:border-sky-400 text-xs font-mono text-slate-700 hover:text-sky-700 shadow-xl shadow-slate-900/10 backdrop-blur-xl transition-all active:scale-95"
        >
          {/* Mini circular progress indicator */}
          <div className="relative w-4 h-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="9"
                className="stroke-slate-200"
                strokeWidth="2.5"
                fill="none"
              />
              <circle
                cx="12"
                cy="12"
                r="9"
                className="stroke-sky-600 transition-all duration-75"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray={56.5}
                strokeDashoffset={56.5 - (scrollProgress * 56.5)}
                strokeLinecap="round"
              />
            </svg>
          </div>

          <span className="text-[11px] font-bold">{percentage}%</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform text-sky-600 stroke-[2.5]" />
        </button>
      </div>
    </>
  );
};
