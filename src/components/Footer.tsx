import React from 'react';
import { ArrowUp, Heart, Terminal, Sparkles, Github, Linkedin, Mail, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t-2 border-slate-300 bg-white/95 backdrop-blur-md py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-600 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="text-center md:text-left space-y-1.5">
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-slate-900 font-display font-black text-lg tracking-tight">
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border-2 border-sky-300 font-black">
              Full Stack & Mobile
            </span>
          </div>
          <p className="text-slate-600 text-xs font-medium">
            Architecting AgroStock ERP, Greentop B2B, TAIN Elect AI Mobile, and Gen-AI Platforms.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 pt-2 text-slate-700 font-bold">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-sky-600 transition-colors">
              {PERSONAL_INFO.email}
            </a>
            <span>•</span>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-sky-600 transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-sky-600 transition-colors">
              GitHub
            </a>
          </div>
        </div>

        {/* Center / Action */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-sky-800 border-2 border-slate-300 hover:border-sky-500 hover:bg-sky-50 text-xs font-black transition-colors shadow-sm"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-600" />
            <span>Launch CLI</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-emerald-800 border-2 border-slate-300 hover:border-emerald-500 hover:bg-emerald-50 text-xs font-black transition-colors shadow-sm"
          >
            <span>Resume Sheet</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-xl bg-white text-slate-700 hover:text-slate-950 border-2 border-slate-300 hover:border-slate-500 transition-colors shadow-sm"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
        <div>
          © {new Date().getFullYear()} Zafarali Faizahmed Inamdar. All Rights Reserved.
        </div>
        <div className="flex items-center gap-2 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Pune, India • Open for Global Roles & Relocation</span>
        </div>
      </div>
    </footer>
  );
};
