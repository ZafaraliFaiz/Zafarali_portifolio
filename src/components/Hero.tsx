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
    <section className="relative min-h-[94vh] flex items-center justify-center pt-36 sm:pt-44 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Dynamic Floating 3D Parallax Badges (Desktop Depth Layers) */}
      <div 
        aria-hidden="true"
        className="absolute top-36 left-8 lg:left-14 hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-sky-50/95 border-2 border-sky-400 text-sky-800 text-xs font-mono font-bold shadow-lg shadow-sky-500/15 backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${-mx * 26}px, ${(-scrollY * 0.2) - my * 20}px, 0)`,
        }}
      >
        <Zap className="w-4 h-4 text-sky-600 animate-pulse" />
        <span>Next.js 15 & React 19</span>
      </div>

      <div 
        aria-hidden="true"
        className="absolute top-44 right-8 lg:right-16 hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-50/95 border-2 border-purple-400 text-purple-800 text-xs font-mono font-bold shadow-lg shadow-purple-500/15 backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${mx * 30}px, ${(-scrollY * 0.28) + my * 24}px, 0)`,
        }}
      >
        <Cpu className="w-4 h-4 text-purple-600" />
        <span>LangChain Gen-AI System</span>
      </div>

      <div 
        aria-hidden="true"
        className="absolute bottom-28 left-10 lg:left-20 hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-emerald-50/95 border-2 border-emerald-400 text-emerald-800 text-xs font-mono font-bold shadow-lg shadow-emerald-500/15 backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${-mx * 22}px, ${(-scrollY * 0.15) - my * 18}px, 0)`,
        }}
      >
        <Smartphone className="w-4 h-4 text-emerald-600" />
        <span>Apple Unlisted &amp; Play Store Live</span>
      </div>

      <div 
        aria-hidden="true"
        className="absolute bottom-32 right-12 lg:right-24 hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-50/95 border-2 border-amber-400 text-amber-800 text-xs font-mono font-bold shadow-lg shadow-amber-500/15 backdrop-blur-md pointer-events-none will-change-transform z-20"
        style={{
          transform: `translate3d(${mx * 24}px, ${(-scrollY * 0.22) + my * 20}px, 0)`,
        }}
      >
        <GraduationCap className="w-4 h-4 text-amber-600" />
        <span>Double 9.05 CGPA Gold</span>
      </div>

      <div className="max-w-6xl mx-auto w-full z-10 relative">
        
        {/* Prominent Name & Identity Header with Ample Space and Visibility */}
        <div 
          className="flex items-center justify-center mb-5 will-change-transform"
          style={{
            transform: `translate3d(${mx * 10}px, ${my * 8 - scrollY * 0.06}px, 0)`,
          }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-2xl bg-white border-2 border-slate-300 shadow-md hover:border-sky-500 hover:shadow-lg transition-all">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-600"></span>
            </span>
            <span className="font-display font-black text-slate-950 text-base sm:text-lg tracking-tight">
              Zafarali Inamdar
            </span>
            <span className="text-slate-300 font-bold">•</span>
            <span className="font-mono text-xs font-black text-sky-700 uppercase tracking-wider">
              Full-Stack & Mobile Engineer
            </span>
          </div>
        </div>

        {/* Availability Badge */}
        <div 
          className="flex flex-wrap items-center justify-center gap-3 mb-6 will-change-transform"
          style={{
            transform: `translate3d(${mx * 8}px, ${my * 6 - scrollY * 0.05}px, 0)`,
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border-2 border-emerald-400 text-emerald-800 text-xs font-bold backdrop-blur-md shadow-md shadow-emerald-500/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Available for Full-Stack, Mobile & Gen-AI Engineering Roles</span>
          </div>

          <button
            onClick={onOpenRecruiterDeck}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50 border-2 border-indigo-400 text-indigo-800 hover:bg-indigo-100 text-xs font-bold backdrop-blur-md transition-all hover:scale-105 shadow-md shadow-indigo-500/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
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
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 font-display leading-[1.08]">
            Building Scalable Web, Mobile &{' '}
            <span className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500 bg-clip-text text-transparent drop-shadow-sm">
              Gen-AI Systems
            </span>
          </h1>

          {/* Subtitle / Interactive Typewriter */}
          <div className="min-h-11 flex items-center justify-center">
            <p className="text-lg sm:text-2xl font-mono text-sky-700 font-bold tracking-wide flex items-center flex-wrap justify-center text-center">
              <span>&gt; </span>
              <span className="mx-2 text-slate-800">{displayedText}</span>
              <span className="w-2.5 h-6 bg-sky-500 animate-pulse ml-0.5 inline-block shrink-0"></span>
            </p>
          </div>

          {/* Quick Interactive Role Switcher Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
            {roles.map((role, idx) => (
              <button
                key={role.short}
                onClick={() => handleSelectRole(idx)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border-2 flex items-center gap-1.5 ${
                  currentRoleIndex === idx
                    ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-md shadow-sky-600/30 scale-105'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-slate-900 shadow-sm font-semibold'
                }`}
                title={`Switch directly to: ${role.full}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentRoleIndex === idx ? 'bg-white animate-ping' : 'bg-slate-400'
                  }`}
                />
                <span>{role.short}</span>
              </button>
            ))}
          </div>

          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2 font-medium">
            Hi, I&apos;m <strong className="text-slate-900 font-black">Zafarali Faizahmed Inamdar</strong>. 
            Full-stack software developer with production delivery across 
            <span className="text-sky-700 font-bold"> AgroStock ERP</span>, 
            <span className="text-emerald-700 font-bold"> Greentop B2B</span>, and 
            <span className="text-blue-700 font-bold"> TAIN Elect AI offline-first mobile app</span>. 
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
            <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 text-center hover:border-2 hover:border-sky-500 transition-all h-full flex flex-col justify-center shadow-lg hover:shadow-xl hover:shadow-sky-500/15 group">
              <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-300 text-sky-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-sm">
                <Layers className="w-5 h-5 text-sky-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-sky-600">3+</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Enterprise Systems</div>
              <div className="text-[11px] text-slate-500 font-medium">AgroStock, Greentop & TAIN Elect AI</div>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} scale={1.03} glareOpacity={0.16} className="h-full">
            <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 text-center hover:border-2 hover:border-emerald-500 transition-all h-full flex flex-col justify-center shadow-lg hover:shadow-xl hover:shadow-emerald-500/15 group">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-sm">
                <GraduationCap className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-emerald-600">9.05</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Double 9.05 CGPA</div>
              <div className="text-[11px] text-slate-500 font-medium">M.Sc. & B.Sc. Comp Sci</div>
            </div>
          </TiltCard>

          <TiltCard maxTilt={10} scale={1.03} glareOpacity={0.16} className="h-full">
            <a
              href="#research"
              className="bg-white/95 p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 text-center hover:border-2 hover:border-purple-500 hover:bg-purple-50/40 transition-all block group h-full flex flex-col justify-center shadow-lg hover:shadow-xl hover:shadow-purple-500/15"
              title="Read published research & download paper PDF"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-100 border border-purple-300 text-purple-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-sm">
                <Cpu className="w-5 h-5 text-purple-600 group-hover:rotate-12 transition-transform" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-purple-600">1 Paper</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Published Research</div>
              <div className="text-[11px] text-purple-700 font-bold">Read & Download PDF</div>
            </a>
          </TiltCard>

          <TiltCard maxTilt={10} scale={1.03} glareOpacity={0.16} className="h-full">
            <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border-2 border-slate-200/90 text-center hover:border-2 hover:border-blue-500 transition-all h-full flex flex-col justify-center shadow-lg hover:shadow-xl hover:shadow-blue-500/15 group">
              <div className="w-9 h-9 rounded-xl bg-blue-100 border border-blue-300 text-blue-700 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform shadow-sm">
                <Smartphone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-2xl sm:text-3xl font-black font-display text-blue-600">iOS &amp; Android</div>
              <div className="text-xs font-bold text-slate-900 mt-1">Live Store Releases</div>
              <div className="text-[11px] text-slate-500 font-medium">Apple Unlisted &amp; Play Store</div>
            </div>
          </TiltCard>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-9">
          <a
            href="#projects"
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-blue-500/25 group border-2 border-transparent"
          >
            <span>Explore Flagship Work</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={onOpenResume}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-emerald-700 border-2 border-emerald-300 hover:border-emerald-500 hover:bg-emerald-50 text-sm font-bold transition-all shadow-md group"
          >
            <FileDown className="w-4 h-4 text-emerald-600 group-hover:animate-bounce" />
            <span>Interactive Resume & PDF</span>
          </button>

          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-4 py-3.5 rounded-xl bg-white text-sky-700 border-2 border-sky-300 hover:border-sky-500 hover:bg-sky-50 text-sm font-mono font-bold transition-all shadow-md group"
          >
            <Terminal className="w-4 h-4 text-sky-600 group-hover:text-sky-500" />
            <span>Run CLI [Terminal]</span>
          </button>
        </div>

        {/* Direct Contact & Social Links Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-9 pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-600 font-mono">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <MapPin className="w-4 h-4 text-sky-600" />
            <span>{PERSONAL_INFO.location}</span>
          </div>

          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="flex items-center gap-1.5 hover:text-sky-600 transition-colors font-medium"
          >
            <Mail className="w-4 h-4 text-sky-600" />
            <span>{PERSONAL_INFO.email}</span>
          </a>

          <a
            href="https://wa.me/919860800543?text=Hi%20Zafarali,%20I%20would%20like%20to%20connect%20with%20you."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-emerald-600 transition-colors font-medium text-emerald-700"
          >
            <Phone className="w-4 h-4 text-emerald-600" />
            <span>{PERSONAL_INFO.phone}</span>
          </a>

          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
          >
            <Github className="w-4 h-4 text-slate-700" />
            <span>GitHub</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
          >
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span>LinkedIn</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
