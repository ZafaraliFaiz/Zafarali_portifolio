import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { EDUCATION_LIST } from '../data/portfolioData';
import { ScrollAssemble } from './animations/ScrollAssemble';
import { ScrollFocusZoom } from './animations/ScrollFocusZoom';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-900 text-xs font-mono uppercase tracking-wider mb-3 font-bold shadow-sm">
              <GraduationCap className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
              <span>Academic Rigor</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
              Education &{' '}
              <span className="bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Academic Excellence
              </span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base mt-2 font-medium leading-relaxed">
              Top academic performance reflecting strong theoretical foundations in Computer Science, Systems Architecture, and Electronics.
            </p>
          </div>
        </ScrollAssemble>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EDUCATION_LIST.map((edu, idx) => (
            <ScrollAssemble
              key={idx}
              direction={idx === 0 ? 'tilt-left' : 'tilt-right'}
              delay={idx * 0.12}
              distance={45}
              className="h-full"
            >
              <ScrollFocusZoom maxScale={1.02} enableGlow glowColor="rgba(16, 185, 129, 0.15)" className="h-full">
                <div className="bg-white p-6 sm:p-7 rounded-3xl border-2 border-slate-200/90 hover:border-emerald-500 transition-all flex flex-col justify-between group shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 relative overflow-hidden h-full">
                  {/* Top Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500" />

                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3 mt-1">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-sky-700 font-bold">
                        <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>{edu.year}</span>
                      </div>
                      <div className="px-3.5 py-1 rounded-xl bg-emerald-100 border-2 border-emerald-300 text-emerald-900 font-mono text-xs font-black flex items-center gap-1.5 shadow-sm">
                        <Award className="w-3.5 h-3.5 text-emerald-700 stroke-[2.5]" />
                        <span>{edu.scoreType}: {edu.score}</span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors font-display tracking-tight">
                      {edu.degree}
                    </h3>
                    <div className="text-sm font-bold text-slate-800 mt-1">
                      {edu.institution}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-1 font-semibold">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{edu.location}</span>
                    </div>

                    {edu.notes && (
                      <div className="mt-4 p-3 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                        {edu.notes}
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-3 border-t-2 border-slate-100 flex items-center gap-2 text-xs font-mono text-emerald-700 font-bold">
                    <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                    <span>Verified Academic Record</span>
                  </div>
                </div>
              </ScrollFocusZoom>
            </ScrollAssemble>
          ))}
        </div>
      </div>
    </section>
  );
};
