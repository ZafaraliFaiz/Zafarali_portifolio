import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Cpu, Database, ExternalLink, Github, Layers, ShieldCheck, Sparkles, Smartphone, Server, Eye } from 'lucide-react';
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedImage(project?.imageUrl || null);
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-white border-2 border-slate-300 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 z-10" />

        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 bg-slate-50 border-b-2 border-slate-200 mt-1">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase bg-sky-100 text-sky-900 px-3 py-0.5 rounded-md border-2 border-sky-300 font-black shadow-sm">
                {project.category}
              </span>
              <span className="text-xs font-mono text-slate-600 font-bold">
                {project.period}
              </span>
              {project.clientOrOrg && (
                <span className="text-xs font-mono text-emerald-800 font-black">
                  • {project.clientOrOrg}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-display tracking-tight">
              {project.title}
            </h2>
            <p className="text-slate-700 text-sm mt-1 font-bold">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white border-2 border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 transition-all shadow-sm"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Visual Architecture & UI Screenshot Showcase */}
          {project.imageUrl && (
            <div className="space-y-3">
              <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden border-2 border-slate-200 bg-slate-100 shadow-xl group">
                <img
                  src={selectedImage || project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-100">
                  <span className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur px-3 py-1.5 rounded-xl border border-slate-700 font-bold">
                    <Eye className="w-3.5 h-3.5 text-sky-400 stroke-[2.5]" />
                    <span>Production Architecture & UI Preview</span>
                  </span>
                  <a
                    href={selectedImage || project.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 bg-white hover:bg-slate-100 text-sky-800 px-3 py-1.5 rounded-xl border-2 border-slate-200 transition-colors font-black shadow-md"
                  >
                    <span>Full Resolution</span>
                    <ExternalLink className="w-3 h-3 stroke-[2.5]" />
                  </a>
                </div>
              </div>

              {/* Multi-screen thumbnail gallery */}
              {project.previewImages && project.previewImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {project.previewImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        (selectedImage || project.imageUrl) === img
                          ? 'border-sky-500 scale-105 shadow-md shadow-sky-500/25 ring-2 ring-sky-400/40'
                          : 'border-slate-300 opacity-60 hover:opacity-100 hover:border-slate-400'
                      }`}
                    >
                      <img src={img} alt={`thumb-${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Metrics Grid */}
          {project.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border-2 border-slate-200 text-center shadow-sm">
                  <div className="text-xs text-slate-600 font-mono font-semibold">{m.label}</div>
                  <div className="text-sm sm:text-base font-black text-sky-600 font-mono mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>
          )}

          {/* Overview */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-800 font-black mb-2">
              System Overview
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
              {project.description}
            </p>
          </div>

          {/* Architecture Nodes */}
          {project.architectureNodes && (
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-sky-800 font-black mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 stroke-[2.5]" />
                <span>Architectural Components & Design Patterns</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.architectureNodes.map((node, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 shadow-sm">
                    <div className="font-black text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
                      <span>{node.title}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                      {node.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Engineering Deliverables */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-800 font-black mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              <span>Key Engineering Deliverables & Technical Decisions</span>
            </h3>
            <ul className="space-y-2.5">
              {project.keyHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies Used */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-sky-800 font-black mb-3">
              Technologies & Frameworks
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl bg-slate-100 border-2 border-slate-200 text-xs font-mono text-slate-800 font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-700 font-mono">
            Candidate: <strong className="text-slate-900 font-black">Zafarali Faizahmed Inamdar</strong>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#architecture"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:bg-slate-100 hover:text-sky-700 text-xs font-bold transition-all shadow-sm"
            >
              Test Live Architecture Simulation
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white text-xs font-black transition-all shadow-md shadow-sky-600/30 border-2 border-sky-500"
            >
              Discuss This Project
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
