import React, { useState, useEffect } from 'react';
import { Terminal, FileDown, Send, Menu, X, Sparkles, Code2, Briefcase } from 'lucide-react';

interface NavbarProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenRecruiterDeck: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTerminal,
  onOpenResume,
  onOpenRecruiterDeck,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Journey', href: '#journey' },
    { label: 'Projects', href: '#projects' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Research', href: '#research' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
        scrolled
          ? 'bg-[#060912]/85 backdrop-blur-xl border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-lg p-1"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#080d1a] rounded-[10px] flex items-center justify-center font-mono font-bold text-cyan-400 text-sm">
              ZI
            </div>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-base tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Zafarali Inamdar
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                v2026
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono tracking-wide">
              Full Stack • Mobile • Gen-AI
            </p>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs xl:text-sm font-medium text-slate-300 hover:text-cyan-400 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Dev Mode Terminal Button */}
          <button
            onClick={onOpenTerminal}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-900/90 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-950/40 hover:border-cyan-400 transition-all shadow-sm group"
            title="Open Interactive Developer CLI (Terminal)"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:animate-pulse" />
            <span>Dev CLI</span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1 rounded">~</span>
          </button>

          {/* Quick 30s Pitch Deck for Recruiters */}
          <button
            onClick={onOpenRecruiterDeck}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-950/60 text-indigo-200 border border-indigo-500/30 hover:bg-indigo-900/50 hover:border-indigo-400 transition-all"
            title="30-Second Recruiter Pitch Deck"
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
            <span>30s Pitch</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/40 hover:border-emerald-400 hover:from-emerald-500/30 hover:to-teal-500/30 transition-all"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-400" />
            <span>Resume</span>
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-md shadow-cyan-500/20"
          >
            <Send className="w-3.5 h-3.5 text-slate-950" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-cyan-500/30"
            aria-label="Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0f1d]/98 border-b border-cyan-500/20 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-slate-300 hover:text-cyan-400 p-2 rounded-md hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterDeck();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-xs font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>30s Pitch</span>
            </button>
          </div>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20"
          >
            <Send className="w-4 h-4" />
            <span>Connect & Hire Zafarali</span>
          </a>
        </div>
      )}
    </header>
  );
};
