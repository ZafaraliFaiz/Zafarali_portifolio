import React, { useState, useEffect } from "react";
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
  Zap,
  CheckCircle2,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PERSONAL_INFO } from "../data/portfolioData";
import { useMouseParallax, useScrollParallax } from "../hooks/useParallax";
import { TiltCard } from "./TiltCard";
import { AnimatedCounter } from "./animations/AnimatedCounter";
import { AppleIcon, GooglePlayIcon, StoreBadges } from "./StoreBadges";

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
      full: "Full-Stack Web Architect (React & Next.js)",
      short: "React & Next.js",
    },
    {
      full: "React Native Mobile Engineer (Expo & Offline-First)",
      short: "React Native Mobile",
    },
    {
      full: "Enterprise ERP Developer (AgroStock & Greentop)",
      short: "Enterprise ERP",
    },
    {
      full: "Gen-AI Systems & LangChain Engineer",
      short: "Gen-AI & LangChain",
    },
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);

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
    <section
      id="hero"
      className="relative min-h-[94vh] flex items-center justify-center pt-36 sm:pt-44 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dynamic Floating 3D Parallax Badges (Organically Scattered Depth Layers) */}
      <div
        aria-hidden="true"
        className="absolute top-42 lg:top-120 left-4 sm:left-6 lg:left-10 xl:left-14 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-sky-50/95 border-2 border-sky-400 text-sky-900 text-xs font-mono font-bold shadow-xl shadow-sky-500/20 backdrop-blur-xl pointer-events-none will-change-transform z-20 animate-float-subtle"
        style={{
          transform: `translate3d(${-mx * 24}px, ${-scrollY * 0.18 - my * 16}px, 0) rotate(${-4 - mx * 4}deg)`,
        }}
      >
        <Zap className="w-4 h-4 text-sky-600 animate-pulse" />
        <span>Next.js 15 &amp; React 19</span>
      </div>

      <div
        aria-hidden="true"
        className="absolute top-36 lg:top-50
         right-4 sm:right-6 lg:right-12 xl:right-16 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-50/95 border-2 border-purple-400 text-purple-900 text-xs font-mono font-bold shadow-xl shadow-purple-500/20 backdrop-blur-xl pointer-events-none will-change-transform z-20 animate-float-delayed"
        style={{
          transform: `translate3d(${mx * 26}px, ${-scrollY * 0.22 + my * 18}px, 0) rotate(${5 + mx * 4}deg)`,
        }}
      >
        <Cpu className="w-4 h-4 text-purple-600" />
        <span>LangChain Gen-AI System</span>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-32 left-6 lg:left-14 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-50/95 border-2 border-emerald-400 text-emerald-900 text-xs font-mono font-bold shadow-xl shadow-emerald-500/20 backdrop-blur-xl pointer-events-none will-change-transform z-20 animate-float-delayed"
        style={{
          transform: `translate3d(${-mx * 20}px, ${-scrollY * 0.15 - my * 14}px, 0) rotate(${2.5 - mx * 3}deg)`,
        }}
      >
        <Smartphone className="w-4 h-4 text-emerald-600" />
        <span>Apple Unlisted &amp; Play Store Live</span>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-28 right-8 lg:right-20 hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-50/95 border-2 border-amber-400 text-amber-900 text-xs font-mono font-bold shadow-xl shadow-amber-500/20 backdrop-blur-xl pointer-events-none will-change-transform z-20 animate-float-subtle"
        style={{
          transform: `translate3d(${mx * 22}px, ${-scrollY * 0.2 + my * 16}px, 0) rotate(${-3 + mx * 3}deg)`,
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
            <span>
              Available for Full-Stack, Mobile & Gen-AI Engineering Roles
            </span>
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
            Building Scalable Web, Mobile &{" "}
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
                    ? "bg-sky-600 text-white border-sky-600 font-bold shadow-md shadow-sky-600/30 scale-105"
                    : "bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-slate-900 shadow-sm font-semibold"
                }`}
                title={`Switch directly to: ${role.full}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    currentRoleIndex === idx
                      ? "bg-white animate-ping"
                      : "bg-slate-400"
                  }`}
                />
                <span>{role.short}</span>
              </button>
            ))}
          </div>

          <p className="text-slate-700 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed pt-2 font-medium">
            Hi, I&apos;m{" "}
            <strong className="text-slate-900 font-black">
              Zafarali Faizahmed Inamdar
            </strong>
            . Full-stack software developer with production delivery across
            <span className="text-sky-700 font-bold"> AgroStock ERP</span>,
            <span className="text-emerald-700 font-bold"> Greentop B2B</span>,
            and
            <span className="text-blue-700 font-bold">
              {" "}
              TAIN Elect AI offline-first mobile app
            </span>
            . Published Gen-AI researcher with a 9.05 CGPA in both M.Sc. & B.Sc.
          </p>
        </div>

        {/* Hero Interactive Quick Stats (Wrapped in 3D TiltCards) */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-10 will-change-transform"
          style={{
            transform: `translate3d(${mx * 6}px, ${my * 5 - scrollY * 0.04}px, 0)`,
          }}
        >
          {/* Card 1: Enterprise Systems */}
          <TiltCard
            maxTilt={4}
            scale={1.01}
            glareOpacity={0.08}
            className="h-full"
          >
            <div className="bg-white/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/75 hover:border-sky-300 text-left transition-all duration-300 h-full flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1)] group relative overflow-hidden">
              {/* Subtle Hairline Gradient Top */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-sky-500 via-blue-500 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-sky-50/80 border border-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Layers className="w-4 h-4 text-sky-600 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
                  PROD // B2B
                </span>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 group-hover:text-sky-600 transition-colors flex items-center">
                  <AnimatedCounter from={0} to={3} duration={1800} suffix="+" />
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  Enterprise Systems
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                  AgroStock, Greentop &amp; TAIN
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 2: Double 9.05 CGPA */}
          <TiltCard
            maxTilt={4}
            scale={1.01}
            glareOpacity={0.08}
            className="h-full"
          >
            <div className="bg-white/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/75 hover:border-emerald-300 text-left transition-all duration-300 h-full flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1)] group relative overflow-hidden">
              {/* Subtle Hairline Gradient Top */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-50/80 border border-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-4 h-4 text-emerald-600 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 font-bold">
                  GOLD MEDAL
                </span>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center">
                  <AnimatedCounter
                    from={0}
                    to={9.05}
                    decimals={2}
                    duration={2200}
                  />
                  <span className="text-xs font-mono text-slate-400 ml-1.5 font-bold">
                    CGPA
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  Double 9.05 CGPA
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                  M.Sc. &amp; B.Sc. SPPU Pune
                </div>
              </div>
            </div>
          </TiltCard>

          {/* Card 3: Published Research Paper */}
          <TiltCard
            maxTilt={4}
            scale={1.01}
            glareOpacity={0.08}
            className="h-full"
          >
            <a
              href="#research"
              className="bg-white/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/75 hover:border-purple-300 text-left transition-all duration-300 block group h-full flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1)] relative overflow-hidden"
              title="Read published research & download paper PDF"
            >
              {/* Subtle Hairline Gradient Top */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-purple-500 via-pink-400 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-purple-50/80 border border-purple-100 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Cpu className="w-4 h-4 text-purple-600 stroke-[2.2]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200/60 font-bold">
                  PEER-REVIEWED
                </span>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 group-hover:text-purple-600 transition-colors flex items-center">
                  <AnimatedCounter
                    from={0}
                    to={1}
                    duration={1400}
                    suffix=" Paper"
                  />
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  Published Gen-AI Paper
                </div>
                <div className="text-[11px] text-purple-700 font-mono mt-0.5 flex items-center gap-1 font-semibold">
                  <span>Read Paper PDF</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </div>
              </div>
            </a>
          </TiltCard>

          {/* Card 4: Interactive Live Store Release Card */}
          <TiltCard
            maxTilt={4}
            scale={1.01}
            glareOpacity={0.08}
            className="h-full"
          >
            <div
              onClick={() => setIsStoreModalOpen(true)}
              className="bg-white/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200/75 hover:border-blue-300 text-left transition-all duration-300 h-full flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.1)] group cursor-pointer relative overflow-hidden"
              title="Click to view verified store builds & downloads"
            >
              {/* Subtle Hairline Gradient Top */}
              <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-blue-500 via-sky-400 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-xl bg-blue-50/80 border border-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Smartphone className="w-4 h-4 text-blue-600 stroke-[2.2]" />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200/60 text-[10px] font-mono text-emerald-800 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>AGENTS LIVE</span>
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-black font-display text-slate-900 group-hover:text-blue-600 transition-colors flex items-center gap-1.5">
                  <AnimatedCounter
                    from={0}
                    to={650}
                    duration={2000}
                    suffix="+"
                  />
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Agents
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5">
                  Production Mobile App
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-bold border border-slate-200/60">
                    <AppleIcon className="w-2.5 h-2.5" /> iOS
                  </span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-bold border border-slate-200/60">
                    <GooglePlayIcon className="w-2.5 h-2.5" /> Play
                  </span>
                </div>
              </div>
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

      {/* Live Store Release Inspection Modal */}
      <AnimatePresence>
        {isStoreModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-lg rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden relative"
            >
              <div className="h-2 bg-gradient-to-r from-blue-600 via-sky-500 to-emerald-500" />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono uppercase bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-full border border-emerald-300 font-extrabold">
                      Live Store Deployment
                    </span>
                  </div>
                  <button
                    onClick={() => setIsStoreModalOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-xl font-black text-slate-900 font-display">
                  TAIN Elect AI • Mobile Ecosystem
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium leading-relaxed">
                  Engineered with React Native, Expo, and Supabase. Successfully
                  cleared 14-day Closed Testing track on Google Play Console and
                  distributed via Apple Unlisted App Distribution.
                </p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-3 gap-2.5 my-5">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-base font-black text-blue-600 font-mono">
                      600+
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">
                      Active Agents
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-base font-black text-emerald-600 font-mono">
                      0% Loss
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">
                      Offline Sync
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                    <div className="text-base font-black text-indigo-600 font-mono">
                      v2.4.0
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold">
                      Build Status
                    </div>
                  </div>
                </div>

                {/* Store Action Buttons */}
                <div className="space-y-2.5">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.elitespro.BEMS&pcampaignid=web_share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-950 text-white hover:bg-slate-800 transition-all border border-slate-800 group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center">
                        <GooglePlayIcon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">
                          Android App
                        </div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                          Google Play Store
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </a>

                  <a
                    href="https://apps.apple.com/us/app/tain-electai/id6807301293"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all border border-slate-700 group shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center">
                        <AppleIcon className="w-5 h-5 text-sky-400" />
                      </div>
                      <div className="text-left">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">
                          iOS Enterprise / Unlisted
                        </div>
                        <div className="text-xs font-bold text-white group-hover:text-sky-400 transition-colors">
                          Apple App Store
                        </div>
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </a>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-center">
                  <a
                    href="#architecture"
                    onClick={() => setIsStoreModalOpen(false)}
                    className="text-xs font-mono text-sky-600 hover:text-sky-800 font-bold inline-flex items-center gap-1"
                  >
                    <span>Test Offline Architecture in Simulator</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
