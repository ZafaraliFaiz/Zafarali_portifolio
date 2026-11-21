import React, { useState, useEffect } from "react";
import {
  Terminal,
  FileDown,
  Send,
  Menu,
  X,
  Sparkles,
  Briefcase,
  Clock,
} from "lucide-react";
import { scrollToTarget } from "./SmoothScroll";

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
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Live system clock updated dynamically every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: "About", href: "#intro" },
    { label: "Journey", href: "#journey" },
    { label: "Architecture", href: "#architecture" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Research", href: "#research" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 no-print ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl border-b-2 border-slate-200 py-3.5 sm:py-4 shadow-md shadow-slate-200/60"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-[1520px] w-full mx-auto px-3 sm:px-5 lg:px-6 xl:px-8 flex items-center justify-between gap-1.5 sm:gap-3">
        {/* Brand Area: Cristiano Ronaldo SUI Celebration Mascot + Clean Brand Anchor */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Cristiano Ronaldo Sui Celebration Mascot Anchor */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#hero", { offset: -80 });
            }}
            className="relative flex items-center justify-center shrink-0 transition-transform duration-300 hover:scale-110 select-none group/sui -my-1 sm:-my-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-2xl"
            title="Cristiano Ronaldo SIUUU Celebration Mascot (Scroll to Top)"
            aria-label="Cristiano Ronaldo SIUUU Celebration Mascot - Scroll to Top"
          >
            <img
              src="/images/sui%20one.gif"
              alt="Cristiano Ronaldo SIUUU Celebration Mascot"
              loading="eager"
              decoding="async"
              className="h-14 sm:h-16 lg:h-15 xl:h-18 w-auto object-contain pointer-events-none select-none drop-shadow-md transition-transform duration-300 group-hover/sui:rotate-3"
            />
          </a>

          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#hero", { offset: -80 });
            }}
            className="group flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-2xl px-1.5 sm:px-2 py-1.5 hover:bg-slate-100/70 transition-all shrink-0 cursor-pointer"
            title="Return to Hero Section"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-sky-500 via-indigo-600 to-purple-600 p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center font-mono font-black text-sky-700 text-sm">
                ZI
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-white"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-display font-black text-sm sm:text-base xl:text-lg tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors whitespace-nowrap">
                  Zafarali Inamdar
                </span>
                <span className="hidden 2xl:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 border-2 border-sky-300 font-black shadow-sm">
                  v2026
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-600 font-mono tracking-wide font-bold whitespace-nowrap">
                Full Stack • Mobile • Gen-AI
              </p>
            </div>
          </a>
        </div>

        {/* Desktop Nav Links - All 9 Core Sections Visible */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 2xl:gap-1.5 shrink-0">
          {navLinks.map((link) => {
            const isContact = link.label === "Contact";

            return (
              <a
                key={link.label}
                href={link.href}
                id={isContact ? "nav-link-contact" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(link.href, { offset: -80 });
                }}
                className={`text-[11px] xl:text-xs 2xl:text-[13px] font-bold px-1.5 xl:px-2 2xl:px-2.5 py-1.5 rounded-lg xl:rounded-xl transition-all whitespace-nowrap cursor-pointer ${
                  isContact
                    ? "text-sky-700 hover:text-sky-600 hover:bg-sky-50 font-black border border-transparent hover:border-sky-200"
                    : "text-slate-700 hover:text-sky-600 hover:bg-slate-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 xl:gap-3.5 shrink-0 ml-1 sm:ml-2">
          {/* Live System Clock (FEAT-02) */}
          <div
            className="hidden 2xl:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 border-2 border-slate-200/90 text-xs font-mono font-bold text-slate-800 shadow-2xs shrink-0"
            title="Local System Time"
          >
            <Clock className="w-3.5 h-3.5 text-sky-600 stroke-[2.5]" />
            <span>{currentTime || "LIVE CLOCK"}</span>
          </div>

          {/* Dev Mode Terminal Button */}
          <button
            id="nav-dev-cli-btn"
            onClick={onOpenTerminal}
            type="button"
            className="flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-mono font-bold rounded-xl bg-white text-sky-800 border-2 border-sky-300 hover:bg-sky-50 hover:border-sky-400 hover:text-sky-900 transition-all shadow-xs group shrink-0 cursor-pointer active:scale-95"
            title="Open Interactive Developer CLI (Terminal)"
            aria-label="Open Interactive Developer CLI"
          >
            <Terminal className="w-3.5 h-3.5 text-sky-600 group-hover:animate-pulse stroke-[2.5]" />
            <span className="inline font-bold">Dev CLI</span>
            <span className="text-[10px] bg-sky-100 text-sky-800 px-1 rounded font-black">
              ~
            </span>
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            type="button"
            className="hidden md:flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-bold rounded-xl bg-emerald-50 text-emerald-900 border-2 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-400 transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
          >
            <FileDown className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
            <span>Resume</span>
          </button>

          {/* Quick 30s Pitch Deck for Recruiters */}
          <button
            onClick={onOpenRecruiterDeck}
            type="button"
            className="hidden xl:flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 text-xs font-bold rounded-xl bg-indigo-50 text-indigo-900 border-2 border-indigo-300 hover:bg-indigo-100 hover:border-indigo-400 transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
            title="30-Second Recruiter Pitch Deck"
          >
            <Briefcase className="w-3.5 h-3.5 text-indigo-700 stroke-[2.5]" />
            <span>30s Pitch</span>
          </button>

          {/* Hire Me CTA - Distinct margin to prevent collision with 30s Pitch */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#contact", { offset: -80 });
            }}
            className="flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 text-xs font-black rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 text-white hover:brightness-105 active:scale-95 transition-all shadow-md shadow-sky-600/30 border-2 border-sky-500 shrink-0 cursor-pointer ml-1 sm:ml-2"
          >
            <Send className="w-3.5 h-3.5 text-white stroke-[2.5]" />
            <span>Hire Me</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            type="button"
            onClick={onOpenTerminal}
            className="p-2 rounded-lg bg-white text-sky-600 border border-slate-200 shadow-sm cursor-pointer"
            aria-label="Open Interactive Developer CLI"
          >
            <Terminal className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white text-slate-700 border border-slate-200 hover:text-slate-900 shadow-sm cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          {/* Mobile Live Clock */}
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-700">
            <span className="flex items-center gap-1.5 text-sky-600">
              <Clock className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>SYSTEM CLOCK</span>
            </span>
            <span className="text-slate-900">{currentTime || "LIVE"}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  scrollToTarget(link.href, { offset: -80 });
                }}
                className="text-sm font-semibold text-slate-700 hover:text-sky-600 p-2 rounded-md hover:bg-slate-50 transition-all cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold shadow-sm cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRecruiterDeck();
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>30s Pitch</span>
            </button>
          </div>

          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-sm shadow-md shadow-sky-500/20 cursor-pointer"
          >
            <Send className="w-4 h-4 text-white" />
            <span>Connect & Hire Zafarali</span>
          </a>
        </div>
      )}
    </header>
  );
};
