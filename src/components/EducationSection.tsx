import React from 'react';
import { GraduationCap, Award, MapPin, Calendar, CheckCircle2, BookOpen, Sparkles, Building2 } from 'lucide-react';
import { EDUCATION_LIST } from '../data/portfolioData';
import { ScrollAssemble } from './animations/ScrollAssemble';
import { ScrollFocusZoom } from './animations/ScrollFocusZoom';

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-emerald-400 border border-emerald-500/30 text-xs font-mono uppercase tracking-wider mb-4 font-bold shadow-md shadow-emerald-500/10">
              <GraduationCap className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
              <span>Academic Rigor & Distinction</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
              Academic{' '}
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                Excellence & Foundations
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 font-medium leading-relaxed max-w-2xl mx-auto">
              Consistent 9.05 CGPA across both Master&apos;s and Bachelor&apos;s degrees reflecting uncompromising theoretical foundations in Computer Science, Systems Architecture, and Computational Complexity.
            </p>
          </div>
        </ScrollAssemble>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
          {EDUCATION_LIST.map((edu, idx) => (
            <ScrollAssemble
              key={idx}
              direction={idx === 0 ? 'tilt-left' : 'tilt-right'}
              delay={idx * 0.1}
              distance={45}
              className="h-full"
            >
              <ScrollFocusZoom maxScale={1.018} enableGlow glowColor="rgba(16, 185, 129, 0.18)" className="h-full">
                <div className="bg-gradient-to-b from-white via-white to-slate-50/80 backdrop-blur-md p-7 sm:p-8 rounded-3xl border border-slate-200/90 hover:border-emerald-500/70 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 relative overflow-hidden h-full">
                  
                  {/* Top Ambient Highlight Line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:h-2" />

                  {/* Corner Glow Watermark */}
                  <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none group-hover:bg-emerald-400/25 transition-colors" />

                  <div>
                    {/* Header Row: Calendar & Distinction Pill */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-bold bg-slate-100/80 px-2.5 py-1 rounded-xl border border-slate-200/70">
                        <Calendar className="w-3.5 h-3.5 text-slate-500 stroke-[2.5]" />
                        <span>{edu.year}</span>
                      </div>
                      <div className="px-3 py-1 rounded-xl bg-emerald-50/90 border border-emerald-300/80 text-emerald-900 font-mono text-xs font-black flex items-center gap-1.5 shadow-2xs">
                        <Award className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
                        <span>{edu.scoreType}: {edu.score}</span>
                      </div>
                    </div>

                    {/* Emblem & Degree */}
                    <div className="flex items-start gap-4 mb-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100/70 border border-emerald-300 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-110 group-hover:-rotate-3 transition-transform">
                        <GraduationCap className="w-6 h-6 stroke-[2.2]" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-black">
                          ACADEMIC DEGREE // {idx === 0 ? 'POSTGRADUATE' : 'UNDERGRADUATE'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-700 transition-colors font-display tracking-tight leading-tight mt-0.5">
                          {edu.degree}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800 mt-2">
                      <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>{edu.institution}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mt-1 font-semibold pl-6">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{edu.location}</span>
                    </div>

                    {edu.notes && (
                      <div className="mt-5 p-4 rounded-2xl bg-slate-50/90 border border-slate-200/80 text-xs text-slate-700 leading-relaxed font-medium shadow-2xs">
                        {edu.notes}
                      </div>
                    )}
                  </div>

                  {/* Bottom Verification Seal */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-emerald-800 font-bold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                      <span>First Class with Distinction</span>
                    </div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">
                      VERIFIED
                    </span>
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
