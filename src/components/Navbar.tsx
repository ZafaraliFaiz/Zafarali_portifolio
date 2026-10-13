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
    { label: 'Architecture', href: '#architecture' },
    { label: 'Projects', href: '#projects' },
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
          ? 'bg-white/95 backdrop-blur-xl border-b-2 border-slate-200 py-3.5 sm:py-4 shadow-md shadow-slate-200/60'
          : 'bg-transparent py-5 sm:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="group flex items-center gap-3.5 text-left focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-2xl px-2.5 py-1.5 hover:bg-slate-100/70 transition-all"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-600 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shrink-0">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-mono font-black text-sky-700 text-sm">
              ZI
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-display font-black text-lg sm:text-xl tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                Zafarali Inamdar
              </span>
              <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 border-2 border-sky-300 font-black shadow-sm">
                v2026
              </span>
            </div>
            <p className="text-xs text-slate-600 font-mono tracking-wide font-bold">
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
              className="text-xs xl:text-sm font-bold text-slate-700 hover:text-sky-600 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all"
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
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl bg-white text-sky-800 border-2 border-sky-300 hover:bg-sky-50 hover:border-sky-400 transition-all shadow-sm group"
            title="Open Interactive Developer CLI (Terminal)"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-600 group-hover:animate-pulse stroke-[2.5]" />
            <span>Dev CLI</span>
            <span className="text-[10px] bg-sky-100 text-sky-800 px-1 rounded font-black">~</span>
          </button>

          {/* Quick 30s Pitch Deck for Recruiters */}
          <button
            onClick={onOpenRecruiterDeck}
            type="button"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-900 border-2 border-indigo-300 hover:bg-indigo-100 hover:border-indigo-400 transition-all shadow-sm"
            title="30-Second Recruiter Pitch Deck"
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-700 stroke-[2.5]" />
            <span>30s Pitch</span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            type="button"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-900 border-2 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 transition-all shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
            <span>Resume</span>
          </button>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-black rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white hover:brightness-105 active:scale-95 transition-all shadow-md shadow-sky-600/30 border-2 border-sky-500"
          >
            <Send className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-white text-sky-600 border border-slate-200 shadow-sm"
            aria-label="Terminal"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white text-slate-700 border border-slate-200 hover:text-slate-900 shadow-sm"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold text-slate-700 hover:text-sky-600 p-2 rounded-md hover:bg-slate-50 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold shadow-sm"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterDeck();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>30s Pitch</span>
            </button>
          </div>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-md shadow-sky-500/20"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Connect & Hire Zafarali</span>
          </a>
        </div>
      )}
    </header>
  );
};
