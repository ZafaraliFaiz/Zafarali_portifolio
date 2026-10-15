import React from 'react';
import { 
  ArrowUp, 
  Terminal, 
  Github, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  FileDown, 
  Sparkles,
  ShieldCheck,
  Code2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { scrollToTarget } from './SmoothScroll';

interface FooterProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerminal, onOpenResume }) => {
  const scrollToTop = () => {
    scrollToTarget(0, { duration: 1.2 });
  };

  const socialLinks = [
    {
      label: 'GitHub',
      href: PERSONAL_INFO.github,
      icon: Github,
      glowColor: '#333333',
      hoverBorder: 'hover:border-slate-800 hover:text-slate-900',
    },
    {
      label: 'LinkedIn',
      href: PERSONAL_INFO.linkedin,
      icon: Linkedin,
      glowColor: '#0077b5',
      hoverBorder: 'hover:border-blue-600 hover:text-blue-600',
    },
    {
      label: 'WhatsApp',
      href: 'https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20would%20like%20to%20connect%20with%20you.',
      icon: MessageCircle,
      glowColor: '#25D366',
      hoverBorder: 'hover:border-emerald-500 hover:text-emerald-600',
    },
    {
      label: 'Email',
      href: `mailto:${PERSONAL_INFO.email}`,
      icon: Mail,
      glowColor: '#EA4335',
      hoverBorder: 'hover:border-rose-500 hover:text-rose-600',
    },
  ];

  return (
    <footer className="relative z-10 border-t-2 border-slate-300 bg-white/95 backdrop-blur-xl py-12 px-4 sm:px-6 lg:px-8 text-xs font-mono text-slate-600 no-print select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Left: Identity & Tagline */}
        <div className="text-center md:text-left space-y-2">
          <div className="flex items-center justify-center md:justify-start gap-2.5 text-slate-900 font-display font-black text-xl tracking-tight">
            <span>{PERSONAL_INFO.name}</span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border-2 border-sky-300 font-black">
              Full Stack • Mobile
            </span>
          </div>
          <p className="text-slate-600 text-xs font-medium max-w-md">
            Architect of AgroStock ERP, TAIN Elect AI Mobile Suite, and published Gen-AI research systems.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-2 text-slate-500 text-[11px] font-mono font-bold pt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Open for Full-Time Software Engineering &amp; Mobile Roles</span>
          </div>
        </div>

        {/* Center: Circular Glassmorphic Social Buttons (FEAT-09) */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">
            CONNECT WITH ME
          </span>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  className={`relative w-11 h-11 rounded-full bg-white/95 border-2 border-slate-200/90 flex items-center justify-center text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg active:scale-95 group ${social.hoverBorder}`}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110 stroke-[2.2]" />
                  {/* Subtle inner radial glow on hover */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none"
                    style={{ backgroundColor: social.glowColor }}
                  />
                </a>
              );
            })}

            {/* Launch CLI Modal Trigger Button */}
            <button
              onClick={onOpenTerminal}
              title="Launch Developer CLI"
              className="relative w-11 h-11 rounded-full bg-sky-50 border-2 border-sky-300 hover:border-sky-500 flex items-center justify-center text-sky-700 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-sky-500/20 active:scale-95 group"
            >
              <Terminal className="w-4 h-4 group-hover:scale-110 stroke-[2.5]" />
            </button>

            {/* Resume Sheet Trigger Button */}
            <button
              onClick={onOpenResume}
              title="View Resume Sheet"
              className="relative w-11 h-11 rounded-full bg-emerald-50 border-2 border-emerald-300 hover:border-emerald-500 flex items-center justify-center text-emerald-700 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-95 group"
            >
              <FileDown className="w-4 h-4 group-hover:scale-110 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Right: Scroll to Top */}
        <div className="flex items-center gap-3">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border-2 border-slate-300 hover:border-sky-400 hover:bg-sky-50 text-slate-800 hover:text-sky-700 font-mono font-bold text-xs transition-all shadow-sm active:scale-95 group"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform stroke-[2.5]" />
          </button>
        </div>

      </div>

      {/* Copyright Bar */}
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2 font-mono">
        <div>
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All Rights Reserved.
        </div>
        <div className="flex items-center gap-2 font-bold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>Pune, India • Double 9.05 CGPA Alum • Open for Global Roles</span>
        </div>
      </div>
    </footer>
  );
};
