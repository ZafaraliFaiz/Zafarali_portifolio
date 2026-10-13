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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>Production Systems & Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
              Featured{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Engineering Projects
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              High-concurrency web platforms, offline-first mobile apps, and Gen-AI integrated systems built for real-world enterprise operations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  filter === cat
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
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
            <div
              key={project.id}
              className="glass-panel rounded-2xl border border-slate-800 p-6 flex flex-col justify-between glass-card-hover group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Meta badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                    {project.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500">
                    {project.period}
                  </span>
                </div>

                {/* Title & Client */}
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-display">
                  {project.title}
                </h3>
                {project.clientOrOrg && (
                  <div className="text-xs font-mono text-emerald-400 font-medium mt-0.5">
                    {project.clientOrOrg}
                  </div>
                )}

                {/* Tagline */}
                <p className="text-xs text-slate-300 font-medium mt-2 leading-relaxed">
                  {project.tagline}
                </p>

                {/* Brief description */}
                <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metric Highlights */}
                {project.metrics && (
                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-800/80">
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <div key={idx} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-center">
                        <div className="text-[10px] text-slate-400">{m.label}</div>
                        <div className="text-xs font-bold text-cyan-400 font-mono mt-0.5">{m.value}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Tech Tags & Action */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectProject(project)}
                  className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-900 text-cyan-300 border border-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-slate-950 group-hover:border-cyan-400 font-mono text-xs font-bold transition-all shadow-sm"
                >
                  <span>System Deep Dive</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
