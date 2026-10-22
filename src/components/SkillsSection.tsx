import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Code2,
  Smartphone,
  Server,
  Cloud,
  Cpu,
  Zap,
  Terminal,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { SKILL_CATEGORIES } from "../data/portfolioData";
import { TiltCard } from "./TiltCard";
import { ScrollAssemble } from "./animations/ScrollAssemble";
import { ScrollFocusZoom } from "./animations/ScrollFocusZoom";

export const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeCategory, setActiveCategory] =
    useState<string>("Frontend & Mobile");
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [isSectionInView, setIsSectionInView] = useState<boolean>(false);
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedCategoryData =
    SKILL_CATEGORIES.find((c) => c.category === activeCategory) ||
    SKILL_CATEGORIES[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "smartphone":
        return <Smartphone className="w-4 h-4" />;
      case "server":
        return <Server className="w-4 h-4" />;
      case "cloud":
        return <Cloud className="w-4 h-4" />;
      case "cpu":
        return <Cpu className="w-4 h-4" />;
      default:
        return <Code2 className="w-4 h-4" />;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Frontend & Mobile":
        return {
          accent: "#0284c7",
          borderHover: "hover:border-sky-500",
          barGradient: "from-sky-500 via-blue-600 to-indigo-600",
          shadowHover: "hover:shadow-sky-500/15",
        };
      case "Backend & Systems":
      case "Backend, APIs & Databases":
        return {
          accent: "#059669",
          borderHover: "hover:border-emerald-500",
          barGradient: "from-emerald-500 via-teal-600 to-cyan-600",
          shadowHover: "hover:shadow-emerald-500/15",
        };
      case "Cloud & DevOps":
      case "DevOps, Cloud & Infrastructure":
        return {
          accent: "#d97706",
          borderHover: "hover:border-amber-500",
          barGradient: "from-amber-500 via-orange-600 to-rose-600",
          shadowHover: "hover:shadow-amber-500/15",
        };
      case "AI & Data Science":
      case "AI, Gen-AI & Research":
      default:
        return {
          accent: "#7c3aed",
          borderHover: "hover:border-purple-500",
          barGradient: "from-purple-500 via-indigo-600 to-sky-600",
          shadowHover: "hover:shadow-purple-500/15",
        };
    }
  };

  // Next category handler for auto-carousel
  const handleNextCategory = useCallback(() => {
    setActiveCategory((curr) => {
      const idx = SKILL_CATEGORIES.findIndex((c) => c.category === curr);
      const nextIdx = (idx + 1) % SKILL_CATEGORIES.length;
      return SKILL_CATEGORIES[nextIdx].category;
    });
  }, []);

  // Viewport tracking: auto-carousel only runs when user is looking at this section
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionInView(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Pause carousel immediately on user interaction and resume after 8 seconds of inactivity
  const registerUserActivity = useCallback(() => {
    setIsInteracting(true);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 8000);
  }, []);

  // 3500ms auto-advance carousel (only when in view and not interacting)
  useEffect(() => {
    if (isInteracting || !isSectionInView) {
      return;
    }

    const timer = setInterval(() => {
      handleNextCategory();
    }, 3500);

    return () => clearInterval(timer);
  }, [isInteracting, isSectionInView, handleNextCategory]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const activeTheme = getCategoryTheme(activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header & Category Tabs */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-sky-400 border border-sky-500/30 text-xs font-mono uppercase tracking-wider mb-4 font-bold shadow-md shadow-sky-500/10">
              <Zap className="w-4 h-4 text-sky-400 animate-pulse stroke-[2.5]" />
              <span>Verified Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
              Engineered For{" "}
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                High Complexity
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 font-medium leading-relaxed max-w-2xl mx-auto">
              Languages, frameworks, architecture paradigms, and cloud
              infrastructure verified across production deployments.
            </p>
          </div>

          {/* Category Tabs (Without HUD - native tabs serving as indicators) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-12">
            {SKILL_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.category;

              return (
                <button
                  key={cat.category}
                  onClick={() => {
                    registerUserActivity();
                    setActiveCategory(cat.category);
                  }}
                  className={`px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-2 active:scale-95 ${
                    isSelected
                      ? "bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-500/30 scale-105"
                      : "bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:text-sky-700 shadow-sm"
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                  <span>{cat.category}</span>
                </button>
              );
            })}
          </div>
        </ScrollAssemble>

        {/* Skills Grid with AnimatePresence & Stable Min-Height */}
        <div
          className="min-h-[760px] md:min-h-[420px] relative"
          onMouseEnter={registerUserActivity}
          onTouchStart={registerUserActivity}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
            >
              {selectedCategoryData.skills.map((skill) => (
                <div key={skill.name} className="h-full">
                  <TiltCard
                    maxTilt={3}
                    scale={1.008}
                    glareOpacity={0.06}
                    className="h-full"
                  >
                    <div
                      className={`relative bg-white/95 backdrop-blur-xl p-5 rounded-2xl border border-slate-200/75 ${activeTheme.borderHover} hover:shadow-[0_12px_28px_-6px_rgba(15,23,42,0.1)] transition-all duration-300 h-full flex flex-col justify-between group shadow-[0_4px_16px_-4px_rgba(15,23,42,0.05)] overflow-hidden`}
                    >
                      {/* Architectural Top Ambient Hairline */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[1.5px] transition-opacity duration-300 opacity-70 group-hover:opacity-100"
                        style={{ backgroundColor: activeTheme.accent }}
                      />

                      {/* Subtle Corner Watermark Glow */}
                      <div
                        className="absolute -top-12 -right-12 w-24 h-24 rounded-full blur-2xl opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity"
                        style={{ backgroundColor: activeTheme.accent }}
                      />

                      <div>
                        {/* Title, Core Badge & Level % */}
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-sky-600 transition-colors font-display tracking-tight">
                              {skill.name}
                            </span>
                            {skill.highlight && (
                              <span
                                className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold shadow-2xs border"
                                style={{
                                  backgroundColor: `${activeTheme.accent}12`,
                                  color: activeTheme.accent,
                                  borderColor: `${activeTheme.accent}30`,
                                }}
                              >
                                <span
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{
                                    backgroundColor: activeTheme.accent,
                                  }}
                                />
                                Core
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono uppercase font-bold text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200/60">
                              {skill.level >= 90
                                ? "Expert"
                                : skill.level >= 80
                                  ? "Advanced"
                                  : "Proficient"}
                            </span>
                            <span
                              className="text-xs font-mono font-bold"
                              style={{ color: activeTheme.accent }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Telemetry Indicator Bar */}
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden my-2.5">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${activeTheme.barGradient} transition-all duration-700 ease-out`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>

                        {/* Clean Skill Description */}
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Core Languages Strip */}
        <ScrollAssemble direction="bottom" distance={45} delay={0.12}>
          <ScrollFocusZoom maxScale={1.012}>
            <div className="mt-12 p-5 sm:p-7 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.06)] relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 shadow-2xs">
                    <Terminal className="w-4 h-4 stroke-[2.5]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                      Foundational Stack
                    </h4>
                    <span className="text-sm sm:text-base font-black font-display text-slate-900">
                      Core Programming Languages & Paradigms
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-600 font-bold bg-slate-100 px-3 py-1 rounded-full w-fit">
                  Type-Safe • Concurrent • Relational
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  {
                    name: "JavaScript",
                    sub: "ESNext / Async",
                    type: "Primary",
                    color: "#eab308",
                  },
                  {
                    name: "TypeScript",
                    sub: "Strict Generics",
                    type: "Primary",
                    color: "#0284c7",
                  },
                  {
                    name: "Python",
                    sub: "Async / FastAPI",
                    type: "Primary",
                    color: "#3b82f6",
                  },
                  {
                    name: "Java",
                    sub: "Core OOP / JVM",
                    type: "Academic",
                    color: "#ea580c",
                  },
                  {
                    name: "C",
                    sub: "Memory / OS",
                    type: "Foundational",
                    color: "#64748b",
                  },
                  {
                    name: "SQL",
                    sub: "ACID / MySQL",
                    type: "Relational",
                    color: "#059669",
                  },
                ].map((lang) => (
                  <div
                    key={lang.name}
                    className="p-3.5 rounded-2xl bg-slate-50/80 hover:bg-white border-2 border-slate-200/80 hover:border-slate-400 hover:shadow-md transition-all duration-200 group text-left"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full transition-transform group-hover:scale-125 shadow-2xs"
                        style={{ backgroundColor: lang.color }}
                      />
                      <span className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                        {lang.type}
                      </span>
                    </div>
                    <div className="text-sm font-black font-display text-slate-900 group-hover:text-sky-600 transition-colors">
                      {lang.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-500 font-medium truncate mt-0.5">
                      {lang.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollFocusZoom>
        </ScrollAssemble>
      </div>
    </section>
  );
};
