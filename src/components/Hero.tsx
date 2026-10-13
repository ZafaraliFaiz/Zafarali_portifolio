import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Terminal, 
  FileDown, 
  Sparkles, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Layers, 
  Smartphone, 
  Cpu, 
  GraduationCap,
  ExternalLink
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onOpenTerminal: () => void;
  onOpenResume: () => void;
  onOpenRecruiterDeck: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenTerminal,
  onOpenResume,
  onOpenRecruiterDeck,
}) => {
  const roles = [
    'Full-Stack Web Architect (React & Next.js)',
    'React Native Mobile Engineer (Expo & Offline-First)',
    'Enterprise ERP Developer (Krushi & Greentop)',
    'Gen-AI Systems & LangChain Engineer',
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex, roles]);

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full z-10">
        
        {/* Availability Badge */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-medium backdrop-blur-md shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Available for Full-Stack, Mobile & Gen-AI Engineering Roles</span>
          </div>

          <button
            onClick={onOpenRecruiterDeck}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 text-xs font-medium backdrop-blur-md transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recruiter 30-Sec Pitch Deck</span>
          </button>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
            Building Scalable Web, Mobile &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Gen-AI Systems
            </span>
          </h1>

          {/* Subtitle / Interactive Typewriter */}
          <div className="h-10 flex items-center justify-center">
            <p className="text-lg sm:text-2xl font-mono text-cyan-300 font-semibold tracking-wide flex items-center">
              <span>&gt; </span>
              <span className="mx-2 text-slate-100">{displayedText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 animate-pulse ml-0.5 inline-block"></span>
            </p>
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Hi, I&apos;m <strong className="text-white font-semibold">Zafarali Faizahmed Inamdar</strong>. 
            Full-stack software developer with production delivery across 
            <span className="text-cyan-300 font-medium"> Krushi ERP</span>, 
            <span className="text-emerald-300 font-medium"> Greentop B2B</span>, and 
            <span className="text-sky-300 font-medium"> BEMS offline-first mobile app</span>. 
            Published Gen-AI researcher with a 9.05 CGPA in both M.Sc. & B.Sc.
          </p>
        </div>

        {/* Hero Interactive Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10">
          <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 text-center hover:border-cyan-400/50 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-mono text-xl sm:text-2xl font-bold">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>3+</span>
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Enterprise Systems</div>
            <div className="text-[11px] text-slate-400">Krushi, Greentop & BEMS</div>
          </div>

          <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-emerald-500/20 text-center hover:border-emerald-400/50 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-mono text-xl sm:text-2xl font-bold">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>9.05</span>
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Double 9.05 CGPA</div>
            <div className="text-[11px] text-slate-400">M.Sc. & B.Sc. Comp Sci</div>
          </div>

          <a
            href="#research"
            className="glass-panel p-3.5 sm:p-4 rounded-xl border border-purple-500/20 text-center hover:border-purple-400/50 hover:bg-purple-950/20 transition-all block group"
            title="Read published research & download paper PDF"
          >
            <div className="flex items-center justify-center gap-1.5 text-purple-400 font-mono text-xl sm:text-2xl font-bold">
              <Cpu className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>1 Paper</span>
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Published Research</div>
            <div className="text-[11px] text-purple-300">Read & Download PDF</div>
          </a>

          <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-sky-500/20 text-center hover:border-sky-400/50 transition-all">
            <div className="flex items-center justify-center gap-1.5 text-sky-400 font-mono text-xl sm:text-2xl font-bold">
              <Smartphone className="w-5 h-5 text-sky-400" />
              <span>100%</span>
            </div>
            <div className="text-xs font-semibold text-slate-200 mt-1">Offline-First Mobile</div>
            <div className="text-[11px] text-slate-400">React Native, Expo & EAS</div>
          </div>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-9">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-cyan-500/25 group"
          >
            <span>Explore Flagship Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/90 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-950/40 hover:border-emerald-400 text-sm font-semibold transition-all shadow-md group"
          >
            <FileDown className="w-4 h-4 text-emerald-400 group-hover:animate-bounce" />
            <span>Interactive Resume & PDF</span>
          </button>

          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-900/80 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400 text-sm font-mono font-medium transition-all group"
          >
            <Terminal className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300" />
            <span>Run CLI [Terminal]</span>
          </button>
        </div>

        {/* Direct Contact & Social Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-9 pt-6 border-t border-slate-800/80 text-xs sm:text-sm text-slate-400 font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>{PERSONAL_INFO.location}</span>
          </div>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>{PERSONAL_INFO.email}</span>
          </a>

          <a
            href={`tel:${PERSONAL_INFO.phone}`}
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>{PERSONAL_INFO.phone}</span>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-blue-400 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        </div>

      </div>
    </section>
  );
};
