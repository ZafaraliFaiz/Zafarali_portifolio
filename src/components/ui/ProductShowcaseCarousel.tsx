import React, { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Eye, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ProductShowcaseCarouselProps {
  images: string[];
  title: string;
  category: string;
  accentColor?: string;
  onSelectProject?: () => void;
  className?: string;
  autoPlayInterval?: number;
}

export const ProductShowcaseCarousel: React.FC<ProductShowcaseCarouselProps> = ({
  images,
  title,
  category,
  accentColor = "#0284c7",
  onSelectProject,
  className = "",
  autoPlayInterval = 4200,
}) => {
  // Ensure we have at least 1 image
  const validImages = images && images.length > 0 ? images : ["/images/projects/tain-elect-ai/1.jpeg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  // Auto-play when not hovered and has multiple images
  useEffect(() => {
    if (isHovered || validImages.length <= 1) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [isHovered, validImages.length, autoPlayInterval]);

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % validImages.length);
    },
    [validImages.length],
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setDirection(-1);
      setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
    },
    [validImages.length],
  );

  const handleDotClick = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  const currentImage = validImages[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onClick={onSelectProject}
      className={`relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-slate-200/80 bg-slate-950/90 shadow-sm group/carousel select-none cursor-pointer ${className}`}
      title="Click to explore interactive architecture & live preview"
    >
      {/* Background Soft Ambient Light */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-500 group-hover/carousel:opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accentColor} 0%, transparent 70%)`,
        }}
      />

      {/* Slide Image with Dynamic AnimatePresence */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: direction * 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: direction * -40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex items-center justify-center p-1"
          >
            <img
              src={currentImage}
              alt={`${title} - Preview ${currentIndex + 1}`}
              loading="lazy"
              className={`w-full h-full object-cover transition-transform duration-500 group-hover/carousel:scale-102 ${
                category === "Mobile"
                  ? "object-contain max-h-full drop-shadow-md py-1"
                  : "object-cover rounded-lg"
              }`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Top Floating Glass Bar: Slide Counter & Category Spec */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
        <span className="px-2 py-0.5 rounded-md bg-slate-950/75 backdrop-blur-md border border-white/10 text-white font-mono text-[10px] font-bold shadow-xs">
          SCREEN // 0{currentIndex + 1}
        </span>
        {validImages.length > 1 && (
          <span className="px-2 py-0.5 rounded-md bg-slate-950/75 backdrop-blur-md border border-white/10 text-white/90 font-mono text-[10px] font-medium shadow-xs">
            {currentIndex + 1} / {validImages.length}
          </span>
        )}
      </div>

      {/* Hover Deep-Dive Overlay Badge */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300 pointer-events-none flex items-end justify-between p-3 z-10">
        <div className="flex items-center gap-1.5 text-white text-[11px] font-mono font-medium">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>Click to Inspect Full Blueprint</span>
        </div>
        <div className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md border border-white/20 text-white">
          <Maximize2 className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Navigation Chevrons (only if multiple images) */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous preview slide"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md z-20"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next preview slide"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 text-white flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95 shadow-md z-20"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Micro Indicator Dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 px-2 py-1 rounded-full bg-slate-950/60 backdrop-blur-md border border-white/10">
            {validImages.slice(0, 8).map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => handleDotClick(idx, e)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "w-4 shadow-xs"
                    : "w-1.5 bg-white/40 hover:bg-white/70"
                }`}
                style={
                  currentIndex === idx
                    ? { backgroundColor: accentColor }
                    : undefined
                }
              />
            ))}
            {validImages.length > 8 && (
              <span className="text-[9px] font-mono text-white/60 leading-none">
                +{validImages.length - 8}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
};
