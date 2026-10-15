import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

const MARQUEE_ITEMS = [
  PERSONAL_INFO.name.toUpperCase(),
  'FULL STACK SOFTWARE ARCHITECT',
  'REACT NATIVE & EXPO (IOS & ANDROID)',
  'OFFLINE-FIRST WRITE-QUEUE ARCHITECTURE',
  'AGROSTOCK ENTERPRISE ERP',
  'PUBLISHED GEN-AI EMPIRICAL RESEARCH (ISSN: 3065-7857)',
  'DOUBLE 9.05 CGPA (M.SC & B.SC COMP SCI)',
  'LIVE ON APPLE UNLISTED & GOOGLE PLAY STORE',
  'DOCKER, AWS EC2 & CI/CD PIPELINES',
  'NEXT.JS 15 & REACT 19 APP ROUTER',
  'LANGCHAIN ORCHESTRATION & LLM INTEGRATION',
  'ACID TRANSACTIONAL BACKENDS & SUPABASE RLS',
];

export const KeywordMarquee: React.FC = () => {
  // Duplicate array for seamless infinite looping
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden bg-white/80 backdrop-blur-md border-y-2 border-slate-200/90 py-3.5 z-20 select-none group"
    >
      {/* Edge gradient fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#f8fafc] via-[#f8fafc]/90 to-transparent z-10 pointer-events-none" />

      {/* Ticker track */}
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] will-change-transform">
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 sm:gap-6 px-3 sm:px-4 text-xs sm:text-sm font-mono font-bold tracking-wider text-slate-700 whitespace-nowrap"
          >
            <span className="hover:text-sky-600 transition-colors">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.8)] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
