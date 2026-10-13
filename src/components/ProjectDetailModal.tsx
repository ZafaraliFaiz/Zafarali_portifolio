import React from 'react';
import { X, CheckCircle2, Cpu, Database, ExternalLink, Github, Layers, ShieldCheck, Sparkles, Smartphone, Server } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenArchitectureTab?: (tab: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenArchitectureTab,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-[#090e1b] border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 bg-[#0d1427] border-b border-slate-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded border border-cyan-500/40">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {project.period}
              </span>
              {project.clientOrOrg && (
                <span className="text-xs font-mono text-emerald-400">
                  • {project.clientOrOrg}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {project.title}
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Metrics Grid */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 font-mono">{m.label}</div>
                  <div className="text-sm sm:text-base font-bold text-cyan-400 font-mono mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
              System Overview
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Architecture Nodes */}
          {project.architectureNodes && (
            <div>
              <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4" />
                <span>Architectural Components & Design Patterns</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architectureNodes.map((node, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
                    <div className="font-semibold text-white text-xs sm:text-sm flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                      <span>{node.title}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {node.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Engineering Deliverables */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Key Engineering Deliverables & Technical Decisions</span>
            </h3>
            <ul className="space-y-2.5">
              {project.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700/80 text-xs font-mono text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#0d1427] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono">
            Candidate: <strong className="text-white">Zafarali Faizahmed Inamdar</strong>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#architecture"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-semibold transition-colors"
            >
              Test Live Architecture Simulation
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 text-xs font-bold hover:brightness-110 transition-all"
            >
              Discuss This Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
