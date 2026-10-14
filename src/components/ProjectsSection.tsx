import React, { useState } from 'react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Smartphone, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  GitBranch,
  Terminal,
  Activity
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { TiltCard } from './TiltCard';
import { StoreBadges } from './StoreBadges';
import { ScrollAssemble } from './animations/ScrollAssemble';
import { ScrollFocusZoom } from './animations/ScrollFocusZoom';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'Full Stack' | 'Mobile' | 'AI & Gen-AI' | 'DevOps & Cloud'>('All');

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const categories: ('All' | 'Full Stack' | 'Mobile' | 'AI & Gen-AI' | 'DevOps & Cloud')[] = [
    'All',
    'Mobile',
    'Full Stack',
    'AI & Gen-AI',
    'DevOps & Cloud',
  ];

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Mobile':
        return {
          accent: '#0284c7',
          icon: Smartphone,
          gradient: 'from-sky-500 via-blue-600 to-indigo-600',
          badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
          btnGradient: 'from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500',
        };
      case 'Full Stack':
        return {
          accent: '#059669',
          icon: Layers,
          gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          btnGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
        };
      case 'AI & Gen-AI':
        return {
          accent: '#7c3aed',
          icon: Cpu,
          gradient: 'from-purple-500 via-pink-600 to-indigo-600',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
          btnGradient: 'from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500',
        };
      case 'DevOps & Cloud':
      default:
        return {
          accent: '#d97706',
          icon: GitBranch,
          gradient: 'from-amber-500 via-orange-600 to-rose-600',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          btnGradient: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
        };
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-sky-400 border border-sky-500/30 text-xs font-mono uppercase tracking-wider mb-4 font-bold shadow-md shadow-sky-500/10">
                <FolderGit2 className="w-4 h-4 text-sky-400 stroke-[2.5]" />
                <span>Production Systems & Architecture</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
                Featured{' '}
                <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Engineering Projects
                </span>
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-4 max-w-xl font-medium leading-relaxed">
                High-concurrency web platforms, offline-first mobile apps, and Gen-AI integrated systems built for real-world enterprise operations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl border-2 border-slate-200/90 shadow-md">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    filter === cat
                      ? 'bg-slate-900 text-white shadow-md scale-[1.02]'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </ScrollAssemble>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {filteredProjects.map((project, idx) => {
            const scatterDir = idx % 3 === 0 ? 'tilt-left' : idx % 3 === 1 ? 'bottom' : 'tilt-right';
            const theme = getCategoryTheme(project.category);
            const CategoryIcon = theme.icon;

            return (
              <ScrollAssemble
                key={project.id}
                direction={scatterDir}
                delay={(idx % 3) * 0.08}
                distance={45}
                className="h-full"
              >
                <ScrollFocusZoom maxScale={1.018} enableGlow glowColor={`${theme.accent}15`} className="h-full">
                  <TiltCard
                    maxTilt={5}
                    scale={1.01}
                    glareOpacity={0.12}
                    className="h-full"
                  >
                    <div className="bg-gradient-to-b from-white via-white to-slate-50/80 backdrop-blur-md rounded-3xl border border-slate-200/90 hover:border-slate-400/80 p-6 sm:p-7 flex flex-col justify-between h-full group relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                      
                      {/* Top Specular Accent Gradient Line */}
                      <div 
                        className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:h-2`}
                      />

                      {/* Ambient Glow Aura */}
                      <div 
                        className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                        style={{ backgroundColor: theme.accent }}
                      />

                      <div>
                        {/* Top Developer Meta Row: Sys ID, Live Ping & Period */}
                        <div className="flex items-center justify-between gap-2 mb-4">
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-black flex items-center gap-1.5 shadow-2xs ${theme.badgeBg}`}>
                              <CategoryIcon className="w-3 h-3 stroke-[2.5]" />
                              <span>{project.badge}</span>
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/70">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              PROD
                            </span>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100/70 px-2 py-0.5 rounded-md border border-slate-200/60">
                            {project.period}
                          </span>
                        </div>

                        {/* Interactive Screenshot Preview */}
                        {project.imageUrl && (
                          <div 
                            onClick={() => onSelectProject(project)}
                            className={`relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-slate-200/90 group-hover:border-slate-300 group/img cursor-pointer shadow-sm hover:shadow-md transition-all ${
                              project.category === 'Mobile'
                                ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 p-2.5 flex items-center justify-center'
                                : 'bg-slate-100'
                            }`}
                          >
                            {project.category === 'Mobile' ? (
                              <div className="relative h-full w-full flex items-center justify-center gap-2 overflow-hidden">
                                {/* Ambient background glow */}
                                <div 
                                  className="absolute inset-0 bg-cover bg-center opacity-35 blur-xl scale-125 pointer-events-none"
                                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                                />
                                {/* Primary Phone Frame */}
                                <div className="relative z-10 h-full aspect-[9/19.5] rounded-xl overflow-hidden border-2 border-slate-700 bg-black shadow-2xl group-hover/img:scale-105 transition-transform duration-300">
                                  <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top"
                                    loading="lazy"
                                  />
                                </div>
                                {/* Secondary Peeking Phone Frame */}
                                {project.previewImages && project.previewImages[1] && (
                                  <div className="relative z-0 h-[86%] aspect-[9/19.5] rounded-xl overflow-hidden border border-slate-700/80 bg-black shadow-xl opacity-60 hidden sm:block -ml-5 group-hover/img:translate-x-2 transition-transform duration-300">
                                    <img
                                      src={project.previewImages[1]}
                                      alt={project.title}
                                      className="w-full h-full object-cover object-top"
                                      loading="lazy"
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <>
                                {/* Browser Mockup Header */}
                                <div className="absolute top-0 left-0 right-0 h-6 bg-slate-900/85 backdrop-blur-xs px-2.5 flex items-center justify-between z-10 border-b border-white/10">
                                  <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                                    <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                                    <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                  </div>
                                  <span className="text-[9px] font-mono text-slate-300 truncate max-w-[150px]">
                                    {project.id}.production // sys
                                  </span>
                                  <div className="w-3" />
                                </div>
                                <img
                                  src={project.imageUrl}
                                  alt={project.title}
                                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105 pt-6"
                                  loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                              </>
                            )}
                            
                            {/* Floating App Icon / Client Tag */}
                            {project.logoUrl && (
                              <div className="absolute top-3 left-3 z-20">
                                <img
                                  src={project.logoUrl}
                                  alt="app-icon"
                                  className="w-8 h-8 rounded-xl object-contain bg-white p-1 border border-slate-200 shadow-md"
                                />
                              </div>
                            )}

                            {/* Interactive Hover CTA Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-950/60 backdrop-blur-[2px] z-20">
                              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-mono text-xs font-black shadow-xl transform translate-y-1 group-hover/img:translate-y-0 transition-transform border border-slate-200">
                                <Sparkles className="w-3.5 h-3.5 text-sky-600 stroke-[2.5]" />
                                <span>Inspect Architecture & Specs</span>
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Title & Organization */}
                        <div className="flex items-baseline justify-between gap-2">
                          <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-sky-600 transition-colors font-display tracking-tight">
                            {project.title}
                          </h3>
                        </div>
                        {project.clientOrOrg && (
                          <div className="text-xs font-mono font-bold mt-1 flex items-center gap-1.5" style={{ color: theme.accent }}>
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accent }} />
                            <span>{project.clientOrOrg}</span>
                          </div>
                        )}

                        {/* Tagline */}
                        <p className="text-xs text-slate-800 font-bold mt-2 leading-relaxed">
                          {project.tagline}
                        </p>

                        {/* Brief description */}
                        <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed font-medium">
                          {project.description}
                        </p>

                        {/* Key Metric Highlights (Clean Recruiter Data Cards) */}
                        {project.metrics && (
                          <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                            {project.metrics.slice(0, 2).map((m, mIdx) => (
                              <div key={mIdx} className="bg-slate-50/90 group-hover:bg-sky-50/30 p-2.5 rounded-2xl border border-slate-200/80 group-hover:border-sky-200/70 text-center shadow-2xs transition-colors">
                                <div className="text-[10px] font-mono text-slate-500 uppercase font-bold truncate">{m.label}</div>
                                <div className="text-xs sm:text-sm font-black font-mono mt-0.5 truncate" style={{ color: theme.accent }}>{m.value}</div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Tech Tags & Action */}
                      <div className="mt-6 pt-4 border-t border-slate-100">
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90 font-semibold shadow-2xs transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="text-[11px] font-mono px-2 py-1 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {(project.appStoreUrl || project.playStoreUrl) && (
                          <div className="mb-3">
                            <StoreBadges
                              appStoreUrl={project.appStoreUrl}
                              playStoreUrl={project.playStoreUrl}
                              variant="compact"
                              onLinkClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}

                        <button
                          onClick={() => onSelectProject(project)}
                          className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-slate-900 hover:bg-sky-600 text-white font-mono text-xs font-black transition-all shadow-md group/btn active:scale-98"
                        >
                          <span>System Architecture Deep Dive</span>
                          <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                        </button>
                      </div>

                    </div>
                  </TiltCard>
                </ScrollFocusZoom>
              </ScrollAssemble>
            );
          })}
        </div>
      </div>
    </section>
  );
};
