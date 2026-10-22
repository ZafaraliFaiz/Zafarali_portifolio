import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Shuffle, Layers } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "../../types/portfolio";
import { ProjectCardFlip } from "./ProjectCardFlip";

interface StackingSliderProps {
  projects: Project[];
  getCategoryTheme: (category: string) => any;
  getProjectTheme?: (project: Project) => any;
  onSelectProject: (project: Project) => void;
}

export const StackingSlider: React.FC<StackingSliderProps> = ({
  projects,
  getCategoryTheme,
  getProjectTheme,
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleShuffle = () => {
    let next = Math.floor(Math.random() * projects.length);
    if (next === activeIndex && projects.length > 1) {
      next = (next + 1) % projects.length;
    }
    setActiveIndex(next);
  };

  // Reorder projects so active is first, followed by remaining in circular order
  const stackedCards = projects.map((_, i) => {
    const projectIndex = (activeIndex + i) % projects.length;
    return {
      project: projects[projectIndex],
      stackPosition: i, // 0 = top, 1 = second, 2 = third...
    };
  });

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center py-4 select-none">
      {/* Top Controller Bar */}
      <div className="w-full flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-sky-600" />
            <span>3D Stacking Deck</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-mono text-slate-500">
            Card {activeIndex + 1} of {projects.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShuffle}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-600 text-xs font-mono font-medium transition-all shadow-2xs hover:scale-105 active:scale-95"
            title="Random shuffle card deck"
          >
            <Shuffle className="w-3.5 h-3.5 text-slate-500" />
            <span>Shuffle</span>
          </button>
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center transition-all shadow-2xs active:scale-95"
            aria-label="Previous card in stack"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 flex items-center justify-center transition-all shadow-2xs active:scale-95"
            aria-label="Next card in stack"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3D Stacking Card Container */}
      <div className="relative w-full max-w-[560px] h-[640px] sm:h-[660px]">
        {stackedCards.slice(0, 4).reverse().map(({ project, stackPosition }) => {
          const theme = getProjectTheme
            ? getProjectTheme(project)
            : getCategoryTheme(project.category);
          const isTop = stackPosition === 0;

          // Compute 3D stacked offsets
          const scale = 1 - stackPosition * 0.055;
          const yOffset = stackPosition * 22;
          const rotateZ = stackPosition === 0 ? 0 : stackPosition % 2 === 1 ? 1.8 : -1.8;
          const zIndex = 30 - stackPosition * 5;
          const opacity = 1 - stackPosition * 0.16;

          return (
            <motion.div
              key={project.id}
              initial={false}
              animate={{
                scale,
                y: yOffset,
                rotateZ,
                zIndex,
                opacity,
              }}
              transition={{
                duration: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 90) {
                  if (info.offset.x > 0) {
                    handlePrev();
                  } else {
                    handleNext();
                  }
                }
              }}
              className="absolute inset-0 w-full h-full will-change-transform cursor-grab active:cursor-grabbing"
              style={{
                transformOrigin: "center bottom",
                pointerEvents: isTop ? "auto" : "none",
              }}
            >
              <ProjectCardFlip
                project={project}
                theme={theme}
                onSelectProject={onSelectProject}
                className="h-full"
              />
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Milestone Indicators */}
      <div className="flex items-center gap-2 mt-8">
        {projects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx
                ? "w-8 h-2 bg-slate-900 shadow-xs"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
            title={p.title}
          />
        ))}
      </div>
      <p className="text-[11px] font-mono text-slate-400 mt-2">
        Tip: Drag or swipe card horizontally to flip to next in deck, or click 3D Flip
      </p>
    </div>
  );
};
