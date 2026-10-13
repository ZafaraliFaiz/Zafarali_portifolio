import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, Building, Sparkles, ArrowRight } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

interface ExperienceSectionProps {
  onOpenProject: (projectId: string) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenProject }) => {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-mono uppercase tracking-wider mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Professional{' '}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Proven track record delivering client-facing, high-reliability web and mobile solutions with rigorous engineering standards.
          </p>
        </div>

        {/* Timeline List */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 before:-translate-x-px before:w-0.5 before:bg-gradient-to-b before:from-sky-500 before:via-emerald-500 before:to-purple-500 before:opacity-40">
          {EXPERIENCES.map((exp, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={exp.id}
                className="relative flex flex-col sm:flex-row items-start group"
              >
                {/* Center Timeline Node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-sky-500 flex items-center justify-center shadow-lg shadow-sky-500/20 z-10 group-hover:scale-110 transition-transform">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-500"></div>
                </div>

                {/* Content Card */}
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-6 w-full">
                  <TiltCard maxTilt={5} scale={1.015} glareOpacity={0.12} className="h-full">
                    <div className="bg-white/95 p-6 sm:p-7 rounded-2xl border border-slate-200/90 hover:border-sky-400 transition-all shadow-lg">
                      {/* Header info */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                          {exp.type}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500">
                          <Calendar className="w-3.5 h-3.5 text-sky-600" />
                          <span>{exp.period}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 font-display">
                        {exp.role}
                      </h3>
                      <div className="text-sm font-semibold text-sky-700 mt-0.5 flex items-center gap-1.5 font-mono">
                        <Building className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{exp.location}</span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                        {exp.summary}
                      </p>

                      {/* Bullet Points */}
                      <ul className="space-y-2 mb-5">
                        {exp.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-200">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {exp.associatedProject && (
                        <button
                          onClick={() => onOpenProject(exp.associatedProject!)}
                          className="mt-4 flex items-center gap-1.5 text-xs font-mono text-sky-600 hover:text-sky-700 transition-colors font-semibold"
                        >
                          <span>View Project Architecture & Spec</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </TiltCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
