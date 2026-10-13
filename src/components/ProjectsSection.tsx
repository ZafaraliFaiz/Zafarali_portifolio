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
  ChevronRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { TiltCard } from './TiltCard';

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

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Production Systems & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
              Featured{' '}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Engineering Projects
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              High-concurrency web platforms, offline-first mobile apps, and Gen-AI integrated systems built for real-world enterprise operations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white/90 p-1.5 rounded-xl border border-slate-200/90 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  filter === cat
                    ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <TiltCard
              key={project.id}
              maxTilt={7}
              scale={1.02}
              glareOpacity={0.14}
              className="h-full"
            >
              <div className="bg-white/95 rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between h-full group relative overflow-hidden transition-all duration-300 hover:border-sky-400 hover:shadow-xl hover:shadow-sky-500/10 shadow-lg">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Interactive Screenshot Preview */}
                  {project.imageUrl && (
                    <div 
                      onClick={() => onSelectProject(project)}
                      className="relative w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 border border-slate-200 group/img cursor-pointer bg-slate-100"
                    >
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                      
                      {/* Floating App Icon / Client Tag */}
                      {project.logoUrl && (
                        <div className="absolute top-2.5 left-2.5">
                          <img
                            src={project.logoUrl}
                            alt="app-icon"
                            className="w-7 h-7 rounded-lg object-contain bg-white/90 p-0.5 border border-slate-200 shadow-md"
                          />
                        </div>
                      )}

                      {/* Interactive Hover CTA */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-slate-900/40 backdrop-blur-[2px]">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-500 text-white font-mono text-xs font-bold shadow-lg shadow-sky-500/30 transform translate-y-1 group-hover/img:translate-y-0 transition-transform">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>View Architecture & Specs</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Meta badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 font-semibold">
                      {project.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-500">
                      {project.period}
                    </span>
                  </div>

                  {/* Title & Client */}
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors font-display">
                    {project.title}
                  </h3>
                  {project.clientOrOrg && (
                    <div className="text-xs font-mono text-emerald-600 font-semibold mt-0.5">
                      {project.clientOrOrg}
                    </div>
                  )}

                  {/* Tagline */}
                  <p className="text-xs text-slate-700 font-medium mt-2 leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Brief description */}
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Key Metric Highlights */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-200">
                      {project.metrics.slice(0, 2).map((m, idx) => (
                        <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-200 text-center">
                          <div className="text-[10px] text-slate-500 font-medium">{m.label}</div>
                          <div className="text-xs font-bold text-sky-600 font-mono mt-0.5">{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Tech Tags & Action */}
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 border border-slate-200">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    <span>System Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
