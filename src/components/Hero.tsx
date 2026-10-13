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
  Layers, 
  Smartphone, 
  Cpu, 
  GraduationCap,
  ExternalLink,
  Code2,
  Zap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useMouseParallax, useScrollParallax } from '../hooks/useParallax';
import { TiltCard } from './TiltCard';

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
    {
      full: 'Full-Stack Web Architect (React & Next.js)',
      short: 'React & Next.js',
    },
    {
      full: 'React Native Mobile Engineer (Expo & Offline-First)',
      short: 'React Native Mobile',
    },
    {
      full: 'Enterprise ERP Developer (AgroStock & Greentop)',
      short: 'Enterprise ERP',
    },
    {
      full: 'Gen-AI Systems & LangChain Engineer',
      short: 'Gen-AI & LangChain',
    },
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const mouse = useMouseParallax(0.07);
  const { scrollY } = useScrollParallax();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex].full;

    if (!isDeleting) {
      if (displayedText.length < fullText.length) {
        // Smooth, natural typing speed (36ms per character)
        timer = setTimeout(() => {
          setDisplayedText(fullText.substring(0, displayedText.length + 1));
        }, 36);
      } else {
        // Comfortable hold time to read role (1600ms)
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1600);
      }
    } else {
      if (displayedText.length > 0) {
        // Smooth erase speed (18ms per character)
        timer = setTimeout(() => {
          setDisplayedText(fullText.substring(0, displayedText.length - 1));
        }, 18);
      } else {
        // Advance to next role
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const handleSelectRole = (index: number) => {
    setCurrentRoleIndex(index);
    setDisplayedText(roles[index].full);
    setIsDeleting(false);
  };

  // Mouse Parallax Offsets
  const mx = mouse.x;
  const my = mouse.y;

  return (
    <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Dynamic Floating 3D Parallax Badges (Desktop Depth Layers) */}
      <div 
        aria-hidden="true"
        className="absolute top-28 left-8 lg:left-14 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-xl backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${-mx * 26}px, ${(-scrollY * 0.2) - my * 20}px, 0)`,
        }}
      >
        <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
        <span>Next.js 15 & React 19</span>
      </div>

      <div 
        aria-hidden="true"
        className="absolute top-36 right-8 lg:right-16 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-purple-500/30 text-purple-300 text-xs font-mono shadow-xl backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${mx * 30}px, ${(-scrollY * 0.28) + my * 24}px, 0)`,
        }}
      >
        <Cpu className="w-3.5 h-3.5 text-purple-400" />
        <span>LangChain Gen-AI System</span>
      </div>

      <div 
        aria-hidden="true"
        className="absolute bottom-28 left-10 lg:left-20 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-emerald-500/30 text-emerald-300 text-xs font-mono shadow-xl backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${-mx * 22}px, ${(-scrollY * 0.15) - my * 18}px, 0)`,
        }}
      >
        <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
        <span>Offline-First (Expo Router)</span>
      </div>

      <div 
        aria-hidden="true"
        className="absolute bottom-32 right-12 lg:right-24 hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-2xl glass-panel border border-sky-500/30 text-sky-300 text-xs font-mono shadow-xl backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${mx * 24}px, ${(-scrollY * 0.22) + my * 20}px, 0)`,
        }}
      >
        <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
        <span>Double 9.05 CGPA Gold</span>
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Availability Badge */}
        <div 
          className="flex flex-wrap items-center justify-center gap-3 mb-6 will-change-transform"
          style={{
            transform: `translate3d(${mx * 8}px, ${my * 6 - scrollY * 0.05}px, 0)`,
          }}
        >
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

        {/* Main Headline with 3D Depth Layering */}
        <div 
          className="text-center max-w-4xl mx-auto space-y-4 will-change-transform"
          style={{
            transform: `translate3d(${mx * 12}px, ${my * 10 - scrollY * 0.08}px, 0)`,
          }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.1]">
            Building Scalable Web, Mobile &{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              Gen-AI Systems
            </span>
          </h1>

          {/* Subtitle / Interactive Typewriter */}
          <div className="min-h-11 flex items-center justify-center">
            <p className="text-lg sm:text-2xl font-mono text-cyan-300 font-semibold tracking-wide flex items-center flex-wrap justify-center text-center">
              <span>&gt; </span>
              <span className="mx-2 text-slate-100">{displayedText}</span>
              <span className="w-2.5 h-6 bg-cyan-400 animate-pulse ml-0.5 inline-block shrink-0"></span>
            </p>
          </div>

          {/* Quick Interactive Role Switcher Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
            {roles.map((role, idx) => (
              <button
                key={role.short}
                onClick={() => handleSelectRole(idx)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all border flex items-center gap-1.5 ${
                  currentRoleIndex === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 font-bold shadow-sm shadow-cyan-500/30 scale-105'
                    : 'bg-slate-950/60 text-slate-400 border-slate-800/80 hover:border-slate-700 hover:text-slate-200'
                }`}
                title={`Switch directly to: ${role.full}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentRoleIndex === idx ? 'bg-cyan-400 animate-ping' : 'bg-slate-600'
                  }`}
                />
                <span>{role.short}</span>
              </button>
            ))}
          </div>

          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2">
            Hi, I&apos;m <strong className="text-white font-semibold">Zafarali Faizahmed Inamdar</strong>. 
            Full-stack software developer with production delivery across 
            <span className="text-cyan-300 font-medium"> AgroStock ERP</span>, 
            <span className="text-emerald-300 font-medium"> Greentop B2B</span>, and 
            <span className="text-sky-300 font-medium"> TAIN Elect AI offline-first mobile app</span>. 
            Published Gen-AI researcher with a 9.05 CGPA in both M.Sc. & B.Sc.
          </p>
        </div>

        {/* Hero Interactive Quick Stats (Wrapped in 3D TiltCards) */}
        <div 
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10 will-change-transform"
          style={{
            transform: `translate3d(${mx * 6}px, ${my * 5 - scrollY * 0.04}px, 0)`,
          }}
        >
          <TiltCard maxTilt={10} scale={1.03} glareOpacity={0.16} className="h-full">
            <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 text-center hover:border-cyan-400/50 transition-colors h-full flex flex-col justify-center">
              <div className="flex items-center justify-center gap-1.5 text-cyan-400 font-mono text-xl sm:text-2xl font-bold">
                <Layers className="w-5 h-5 text-cyan-400" />
                <span>3+</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Enterprise Systems</div>
              <div className="text-[11px] text-slate-400">AgroStock, Greentop & TAIN Elect AI</div>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} scale={1.03} glareOpacity={0.16} className="h-full">
            <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-emerald-500/20 text-center hover:border-emerald-400/50 transition-colors h-full flex flex-col justify-center">
              <div className="flex items-center justify-center gap-1.5 text-emerald-400 font-mono text-xl sm:text-2xl font-bold">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <span>9.05</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Double 9.05 CGPA</div>
              <div className="text-[11px] text-slate-400">M.Sc. & B.Sc. Comp Sci</div>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} scale={1.03} glareOpacity={0.16} className="h-full">
            <a
              href="#research"
              className="glass-panel p-3.5 sm:p-4 rounded-xl border border-purple-500/20 text-center hover:border-purple-400/50 hover:bg-purple-950/20 transition-all block group h-full flex flex-col justify-center"
              title="Read published research & download paper PDF"
            >
              <div className="flex items-center justify-center gap-1.5 text-purple-400 font-mono text-xl sm:text-2xl font-bold">
                <Cpu className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
                <span>1 Paper</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Published Research</div>
              <div className="text-[11px] text-purple-300">Read & Download PDF</div>
            </a>
          </TiltCard>

          <TiltCard maxTilt={10} scale={1.03} glareOpacity={0.16} className="h-full">
            <div className="glass-panel p-3.5 sm:p-4 rounded-xl border border-sky-500/20 text-center hover:border-sky-400/50 transition-colors h-full flex flex-col justify-center">
              <div className="flex items-center justify-center gap-1.5 text-sky-400 font-mono text-xl sm:text-2xl font-bold">
                <Smartphone className="w-5 h-5 text-sky-400" />
                <span>100%</span>
              </div>
              <div className="text-xs font-semibold text-slate-200 mt-1">Offline-First Mobile</div>
              <div className="text-[11px] text-slate-400">React Native, Expo & EAS</div>
            </div>
          </TiltCard>
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
            href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20would%20like%20to%20connect%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors"
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
