import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { EDUCATION_LIST } from '../data/portfolioData';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Rigor</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Education &{' '}
            <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
              Academic Excellence
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Top academic performance reflecting strong theoretical foundations in Computer Science, Systems Architecture, and Electronics.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {EDUCATION_LIST.map((edu, idx) => (
            <div
              key={idx}
              className="bg-white/95 p-6 sm:p-7 rounded-2xl border border-slate-200/90 hover:border-sky-400 transition-all flex flex-col justify-between group shadow-md hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-mono text-sky-600 font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{edu.year}</span>
                  </div>
                  <div className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-extrabold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{edu.scoreType}: {edu.score}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors font-display">
                  {edu.degree}
                </h3>
                <div className="text-sm font-semibold text-slate-700 mt-1">
                  {edu.institution}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-1">
                  <MapPin className="w-3 h-3" />
                  <span>{edu.location}</span>
                </div>

                {edu.notes && (
                  <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200 leading-relaxed">
                    {edu.notes}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 flex items-center gap-2 text-xs font-mono text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Academic Record</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
