import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Compass } from "lucide-react";
import { motion } from "motion/react";
import { Project } from "../../types/portfolio";
import { ProjectCardFlip } from "./ProjectCardFlip";

interface ParallaxCarouselProps {
  projects: Project[];
  getCategoryTheme: (category: string) => any;
  getProjectTheme?: (project: Project) => any;
  onSelectProject: (project: Project) => void;
}

export const ParallaxCarousel: React.FC<ParallaxCarouselProps> = ({
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

  return (
    <div className="w-full flex flex-col items-center py-4 select-none overflow-hidden">
      {/* Top Header & Navigation */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6 px-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Parallax Perspective Carousel</span>
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-mono text-slate-500">
            {activeIndex + 1} of {projects.length}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs hover:scale-105 active:scale-95 transition-all"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-slate-700 shadow-2xs hover:scale-105 active:scale-95 transition-all"
            aria-label="Next project"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Parallax Stage Container */}
      <div
        className="relative w-full max-w-6xl h-[650px] sm:h-[670px] flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {projects.map((project, idx) => {
            const theme = getProjectTheme
              ? getProjectTheme(project)
              : getCategoryTheme(project.category);
            const offset = idx - activeIndex;

            // Only render items within window of -2 to +2 for performance
            if (Math.abs(offset) > 2) return null;

            const isCenter = offset === 0;
            const xTranslation = offset * 360; // Offset distance
            const scale = isCenter ? 1 : 0.88;
            const rotateY = offset * -14; // Inward 3D tilt
            const zIndex = 20 - Math.abs(offset) * 5;
            const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.65 : 0.25;

            return (
              <motion.div
                key={project.id}
                initial={false}
                animate={{
                  x: xTranslation,
                  scale,
                  rotateY,
                  zIndex,
                  opacity,
                }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={() => {
                  if (!isCenter) setActiveIndex(idx);
                }}
                className={`absolute w-[86vw] max-w-[460px] h-[610px] sm:h-[630px] will-change-transform ${
                  !isCenter ? "cursor-pointer hover:opacity-85" : ""
                }`}
                style={{
                  transformStyle: "preserve-3d",
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
      </div>

      {/* Bottom Pagination Strip */}
      <div className="flex items-center gap-2 mt-6">
        {projects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(idx)}
            className={`transition-all duration-300 rounded-full ${
              activeIndex === idx
                ? "w-8 h-2 bg-indigo-600 shadow-xs"
                : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
            }`}
            title={p.title}
          />
        ))}
      </div>
      <p className="text-[11px] font-mono text-slate-400 mt-2">
        Click side cards to bring them into parallax focus, or swipe
      </p>
    </div>
  );
};
