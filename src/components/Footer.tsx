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
    <footer className="relative z-10 border-t border-slate-800/80 bg-[#04060b] py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-500 no-print">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left */}
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-200 font-display font-bold text-base">
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              Full Stack & Mobile
            </span>
          </div>
          <p className="text-slate-400 text-xs">
            Architecting Krushi ERP, Greentop B2B, BEMS Mobile, and Gen-AI Platforms.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 pt-2 text-slate-400">
            <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-cyan-400 transition-colors">
              {PERSONAL_INFO.email}
            </a>
            <span>•</span>
            <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="hover:text-cyan-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>

        {/* Center / Action */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-xs transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Launch CLI</span>
          </button>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-emerald-300 border border-emerald-500/30 hover:border-emerald-400 text-xs transition-colors"
          >
            <span>Resume Sheet</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-600 gap-2">
        <div>
          © {new Date().getFullYear()} Zafarali Faizahmed Inamdar. All Rights Reserved.
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Pune, India • Open for Global Roles & Relocation</span>
        </div>
      </div>
    </footer>
  );
};
