import React, { useState, useEffect } from 'react';
import { Code2, User, Globe, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SplashPreloaderProps {
  onComplete: () => void;
  durationMs?: number;
}

export const SplashPreloader: React.FC<SplashPreloaderProps> = ({
  onComplete,
  durationMs = 2800,
}) => {
  const [progress, setProgress] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isFadingOut, setIsFadingOut] = useState(false);

  const fullDomain = 'zafarali-inamdar.dev';

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    const startTime = performance.now();
    let animId: number;

    // Typewriter effect interval
    const typeInterval = setInterval(() => {
      setTypedText((prev) => {
        if (prev.length < fullDomain.length) {
          return fullDomain.slice(0, prev.length + 1);
        }
        return prev;
      });
    }, 75);

    // Progress bar loop
    const updateProgress = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
      setProgress(pct);

      if (elapsed < durationMs) {
        animId = requestAnimationFrame(updateProgress);
      } else {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete();
        }, 500); // 500ms fadeout transition
      }
    };

    animId = requestAnimationFrame(updateProgress);

    return () => {
      clearInterval(typeInterval);
      cancelAnimationFrame(animId);
    };
  }, [durationMs, onComplete, fullDomain]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#f8fafc] text-slate-900 transition-opacity duration-500 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        {/* Three circular icon badges: </>, User, Globe */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-white border-2 border-sky-300 shadow-md flex items-center justify-center text-sky-600 transition-transform hover:scale-105">
            <Code2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 p-[2px] shadow-lg shadow-sky-500/20 transition-transform hover:scale-105">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-indigo-600">
              <User className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-white border-2 border-emerald-300 shadow-md flex items-center justify-center text-emerald-600 transition-transform hover:scale-105">
            <Globe className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        {/* Welcome title with existing user name */}
        <h1 className="text-2xl sm:text-3xl font-black font-display text-slate-900 tracking-tight mb-2">
          {PERSONAL_INFO.preferredName}
        </h1>
        <p className="text-xs sm:text-sm font-mono text-slate-600 font-bold uppercase tracking-wider mb-6">
          {PERSONAL_INFO.title}
        </p>

        {/* Pill badge with live typewriter effect */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border-2 border-slate-200/90 shadow-sm mb-8 text-xs font-mono font-bold text-slate-800">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>https://</span>
          <span className="text-sky-600">{typedText}</span>
          <span className="inline-block w-1.5 h-3.5 bg-sky-600 animate-pulse -ml-1">|</span>
        </div>

        {/* Sleek Progress Bar Container */}
        <div className="w-full max-w-xs flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-500 px-1">
            <span className="flex items-center gap-1.5 text-sky-600">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>INITIALIZING PORTFOLIO</span>
            </span>
            <span>{progress}%</span>
          </div>

          <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden p-[1px] border border-slate-300/60 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transition-all duration-75 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
