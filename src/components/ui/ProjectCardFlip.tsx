import React, { useState } from "react";
import {
  RotateCcw,
  ArrowUpRight,
  ChevronRight,
  Database,
  Server,
  Smartphone,
  Cpu,
  Layers,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Box,
  FileText,
  BarChart,
  GitBranch,
} from "lucide-react";
import { Project } from "../../types/portfolio";
import { ProductShowcaseCarousel } from "./ProductShowcaseCarousel";
import { StoreBadges } from "../StoreBadges";
import { TiltCard } from "../TiltCard";

interface ProjectCardFlipProps {
  project: Project;
  theme: {
    accent: string;
    icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
    gradient: string;
    badgeBg: string;
    btnGradient: string;
  };
  onSelectProject: (project: Project) => void;
  className?: string;
  defaultFlipped?: boolean;
}

export const ProjectCardFlip: React.FC<ProjectCardFlipProps> = ({
  project,
  theme,
  onSelectProject,
  className = "",
  defaultFlipped = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(defaultFlipped);
  const CategoryIcon = theme.icon;

  const handleFlipToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped((prev) => !prev);
  };

  const getNodeIcon = (iconName?: string) => {
    switch (iconName) {
      case "database":
        return <Database className="w-3.5 h-3.5" />;
      case "server":
        return <Server className="w-3.5 h-3.5" />;
      case "smartphone":
        return <Smartphone className="w-3.5 h-3.5" />;
      case "cpu":
        return <Cpu className="w-3.5 h-3.5" />;
      case "layers":
        return <Layers className="w-3.5 h-3.5" />;
      case "shield":
        return <ShieldCheck className="w-3.5 h-3.5" />;
      case "activity":
        return <Activity className="w-3.5 h-3.5" />;
      case "file-text":
        return <FileText className="w-3.5 h-3.5" />;
      case "bar-chart":
        return <BarChart className="w-3.5 h-3.5" />;
      case "git-branch":
        return <GitBranch className="w-3.5 h-3.5" />;
      case "box":
      default:
        return <Box className="w-3.5 h-3.5" />;
    }
  };

  const images =
    project.previewImages && project.previewImages.length > 0
      ? project.previewImages
      : project.imageUrl
        ? [project.imageUrl]
        : [];

  return (
    <div
      className={`relative w-full h-full select-none ${className}`}
      style={{ perspective: "1400px" }}
    >
      <TiltCard
        maxTilt={isFlipped ? 2 : 3.5}
        scale={1.008}
        glareOpacity={0.06}
        className="w-full h-full"
      >
        <div
          className="relative w-full h-full transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* ======================================================== */}
          {/* FRONT FACE: PRODUCT SHOWCASE & CAROUSEL                  */}
          {/* ======================================================== */}
          <div
            className="w-full h-full bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/80 hover:border-slate-300 p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05),0_1px_3px_rgba(15,23,42,0.04)] hover:shadow-[0_18px_36px_-10px_rgba(15,23,42,0.12)] group relative overflow-hidden transition-all duration-300"
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Top Specular Accent Hairline */}
            <div
              className={`absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${theme.gradient} transition-all duration-300 opacity-75 group-hover:opacity-100`}
            />

            {/* Ambient Glow Aura */}
            <div
              className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-10 pointer-events-none group-hover:opacity-25 transition-opacity"
              style={{ backgroundColor: theme.accent }}
            />

            <div>
              {/* Top Architectural Meta Row with 3D Flip Action */}
              <div className="flex items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 text-[10px] font-mono font-bold uppercase tracking-wider shadow-2xs">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: theme.accent }}
                    />
                    <span>{project.badge}</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 bg-slate-100/70 px-2 py-0.5 rounded-md border border-slate-200/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    PROD
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-slate-400 font-medium hidden sm:inline">
                    {project.period}
                  </span>
                  {/* 3D Flip Toggle Pill */}
                  <button
                    onClick={handleFlipToggle}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 text-[10px] font-mono font-bold transition-all shadow-2xs hover:scale-105 active:scale-95 group/flip"
                    title="Flip card in 3D to reveal System Architecture Blueprint"
                  >
                    <RotateCcw className="w-3 h-3 text-sky-600 transition-transform duration-500 group-hover/flip:-rotate-180" />
                    <span>Specs 3D</span>
                  </button>
                </div>
              </div>

              {/* Embedded Product Showcase Multi-Slide Carousel */}
              <ProductShowcaseCarousel
                images={images}
                title={project.title}
                category={project.category}
                accentColor={theme.accent}
                onSelectProject={() => onSelectProject(project)}
              />

              {/* Title & Tagline */}
              <h3
                onClick={() => onSelectProject(project)}
                className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors font-display tracking-tight leading-snug cursor-pointer mb-1.5"
              >
                {project.title}
              </h3>

              <p className="text-slate-600 text-xs sm:text-[13px] leading-relaxed mb-3.5 line-clamp-2 font-medium">
                {project.description}
              </p>

              {/* Architectural Highlights Telemetry Box */}
              <div className="grid grid-cols-2 gap-2 mb-4 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100 text-left">
                {project.keyHighlights.slice(0, 2).map((h, i) => (
                  <div
                    key={i}
                    className="text-[11px] font-mono text-slate-600 line-clamp-2 leading-tight"
                  >
                    <span className="text-slate-400 mr-1">//</span>
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills & CTA */}
            <div>
              <div className="flex flex-wrap gap-1 mb-3.5">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white hover:bg-slate-50 text-slate-600 border border-slate-200/70 font-medium transition-colors shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 4 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 border border-slate-200/60 font-semibold">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>

              {(project.appStoreUrl || project.playStoreUrl) && (
                <div className="mb-2.5">
                  <StoreBadges
                    appStoreUrl={project.appStoreUrl}
                    playStoreUrl={project.playStoreUrl}
                    variant="compact"
                    onLinkClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSelectProject(project)}
                  className="flex-1 flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-sm group/btn active:scale-98"
                >
                  <span>Architecture Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2] transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
                <button
                  onClick={handleFlipToggle}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 transition-all hover:scale-105 active:scale-95"
                  title="Flip to Blueprint & Specs"
                >
                  <RotateCcw className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* BACK FACE: SYSTEM ARCHITECTURE BLUEPRINT & TELEMETRY     */}
          {/* ======================================================== */}
          <div
            className="absolute inset-0 w-full h-full bg-slate-950 text-white rounded-2xl border border-slate-800 p-5 sm:p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
            style={{
              transform: "rotateY(180deg)",
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
          >
            {/* Top Accent Gradient Line */}
            <div
              className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${theme.gradient}`}
            />

            {/* Subtle Blueprint Grid Pattern Watermark */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* Header: Blueprint Spec Breadcrumb + Flip Back */}
            <div>
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-800/80 mb-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] text-sky-400 font-bold uppercase tracking-wider">
                    // SPEC_BLUEPRINT.architecture
                  </span>
                </div>
                <button
                  onClick={handleFlipToggle}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-[10px] font-mono font-bold transition-all hover:scale-105 active:scale-95"
                >
                  <RotateCcw className="w-3 h-3 text-sky-400" />
                  <span>Product View</span>
                </button>
              </div>

              {/* Title & Architecture Flow */}
              <h4 className="text-base sm:text-lg font-bold font-display text-white tracking-tight mb-2">
                {project.title}
              </h4>

              {/* Data Flow Strip */}
              {project.architectureOverview && (
                <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-3 text-[11px] font-mono text-slate-300 leading-snug">
                  <span className="text-sky-400 font-bold mr-1.5">FLOW:</span>
                  <span className="line-clamp-2">{project.architectureOverview}</span>
                </div>
              )}

              {/* Architecture Nodes List */}
              <div className="space-y-2 mb-3">
                {(project.architectureNodes || []).slice(0, 3).map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-2.5 hover:border-slate-700 transition-colors"
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{
                        backgroundColor: `${theme.accent}20`,
                        color: theme.accent,
                      }}
                    >
                      {getNodeIcon(node.icon)}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold font-display text-slate-100 flex items-center gap-1.5">
                        <span>{node.title}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                        {node.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Metrics Matrix & Modal Launch */}
            <div>
              {/* Telemetry Pods */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-2 mb-3.5">
                  {project.metrics.slice(0, 2).map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-left"
                    >
                      <div className="text-[9px] font-mono text-slate-400 uppercase">
                        {m.label}
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-400 truncate mt-0.5">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={() => onSelectProject(project)}
                className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-semibold tracking-wide transition-all shadow-md active:scale-98"
              >
                <span>Launch Interactive Visualizer</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
};
