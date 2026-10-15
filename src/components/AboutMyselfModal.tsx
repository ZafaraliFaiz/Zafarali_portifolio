import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  FileDown,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  GraduationCap,
  Sparkles,
  Award,
  BookOpen,
  Code2,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { PERSONAL_INFO, RESEARCH_PAPER, EDUCATION_LIST } from '../data/portfolioData';

interface AboutMyselfModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutMyselfModal: React.FC<AboutMyselfModalProps> = ({ isOpen, onClose }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = 'About Myself |';

  // Typewriter effect on opening
  useEffect(() => {
    if (!isOpen) {
      setTypedTitle('');
      return;
    }

    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setTypedTitle(fullTitle.slice(0, idx));
      if (idx >= fullTitle.length) {
        clearInterval(interval);
      }
    }, 70);

    return () => clearInterval(interval);
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/70 backdrop-blur-2xl flex items-center justify-center p-0 sm:p-2.5 md:p-3.5 animate-fadeIn"
    >
      {/* Generated Dynamic Ambient Glow Backdrop (Removes dull grey, generates subtle radiant cosmic aura) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-sky-500/25 via-indigo-500/15 to-transparent rounded-full blur-3xl opacity-80 animate-pulse" />
        <div className="absolute -bottom-32 left-1/4 w-[750px] h-[450px] bg-gradient-to-t from-emerald-500/20 via-sky-500/10 to-transparent rounded-full blur-3xl opacity-70" />
      </div>

      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-[98vh] max-w-6xl xl:max-w-7xl bg-[#f8fafc] text-slate-900 border-0 sm:border-2 border-slate-300/90 sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
      >
        
        {/* Top Header Bar with Back Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-slate-200/90 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 hover:bg-sky-50 border-2 border-slate-300 hover:border-sky-400 text-slate-800 hover:text-sky-700 text-xs font-mono font-bold transition-all shadow-sm active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform stroke-[2.5]" />
            <span>&larr; Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Hire</span>
            </span>
            <span className="text-xs font-mono text-slate-400 font-bold hidden sm:inline">ESC to close</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 lg:p-10 space-y-8 flex-1 overflow-y-auto">
          
          {/* Main Two-Column Profile & Biography Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Portrait & Quick Contact Card */}
            <div className="md:col-span-4 flex flex-col items-center text-center p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-md">
              <div className="relative w-36 h-36 rounded-3xl bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 p-[3px] shadow-xl shadow-sky-500/20 mb-4">
                <div className="w-full h-full rounded-[21px] bg-slate-900 overflow-hidden relative shadow-inner">
                  <img
                    src="/images/profilepic2.jpeg"
                    alt={PERSONAL_INFO.preferredName}
                    className="w-full h-full object-cover object-[center_14%]"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow-sm" title="Active Clearance">
                  <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                </div>
              </div>

              <h2 className="text-xl font-black font-display text-slate-900 tracking-tight">
                {PERSONAL_INFO.preferredName}
              </h2>
              <p className="text-xs font-mono font-bold text-sky-700 mt-1">
                Full Stack &amp; Mobile Engineer
              </p>

              <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-3 font-medium">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{PERSONAL_INFO.location}</span>
              </div>

              <div className="w-full border-t border-slate-200 my-4" />

              <div className="w-full flex flex-col gap-2 text-left text-xs font-mono">
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span className="truncate">{PERSONAL_INFO.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{PERSONAL_INFO.phone}</span>
                </div>
              </div>

              <div className="w-full mt-4 flex items-center justify-center gap-2 pt-2 border-t border-slate-100">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-mono font-bold text-slate-800 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-xs font-mono font-bold text-sky-800 transition-colors"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Right Biography & Engineering Focus */}
            <div className="md:col-span-8 flex flex-col justify-between space-y-6">
              <div className="p-7 rounded-3xl bg-white border-2 border-slate-200/90 shadow-md">
                
                {/* Typewriter Heading */}
                <div className="flex items-center gap-2 text-slate-900 mb-3">
                  <Sparkles className="w-5 h-5 text-sky-600" />
                  <h3 id="about-modal-title" className="text-2xl sm:text-3xl font-black font-display tracking-tight text-slate-900">
                    {typedTitle}
                    <span className="inline-block w-2 h-6 bg-sky-600 animate-pulse ml-0.5"></span>
                  </h3>
                </div>

                <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  <p>
                    I am a <strong>Full Stack Software Developer &amp; Mobile Engineer</strong> dedicated to building high-concurrency web platforms, resilient offline-first mobile apps, and robust enterprise software systems.
                  </p>
                  <p>
                    Throughout my engineering journey, I have architected and deployed mission-critical systems: from <strong>AgroStock ERP</strong> (a 7-module inventory and GST billing platform in React.js and Redux Toolkit) and <strong>Greentop</strong> (Next.js App Router with transactional MySQL backends), to <strong>TAIN Elect AI</strong>—a cross-platform React Native field-operations mobile suite published on both the <strong>Apple iOS Unlisted App Store</strong> and <strong>Google Play Store</strong>.
                  </p>
                  <p>
                    Bridging industry software engineering with academic rigor, I co-authored a peer-reviewed research paper titled <em>&ldquo;{RESEARCH_PAPER.title}&rdquo;</em> published in the International Research Journal (ISSN: {RESEARCH_PAPER.issn}). I graduated with a <strong>Double 9.05 CGPA Gold Distinction</strong> across both my M.Sc. and B.Sc. in Computer Science.
                  </p>
                </div>

                {/* Core Metric Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-200">
                  <div className="p-3 rounded-2xl bg-sky-50/70 border border-sky-200 text-center">
                    <span className="block text-xl font-black font-mono text-sky-700">9.05</span>
                    <span className="text-[11px] font-mono text-slate-600 font-bold uppercase">Double CGPA</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
                    <span className="block text-xl font-black font-mono text-emerald-700">2 Stores</span>
                    <span className="text-[11px] font-mono text-slate-600 font-bold uppercase">Apple &amp; Play</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-200 text-center">
                    <span className="block text-xl font-black font-mono text-purple-700">1 Paper</span>
                    <span className="text-[11px] font-mono text-slate-600 font-bold uppercase">Gen-AI ISSN</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
                    <span className="block text-xl font-black font-mono text-amber-700">7+ ERP</span>
                    <span className="text-[11px] font-mono text-slate-600 font-bold uppercase">Modules Built</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education & Academic Rigor Summary */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border-2 border-slate-200/90 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-emerald-600" />
              <h4 className="text-lg font-black font-display text-slate-900 tracking-tight">
                Academic Background &amp; Distinction
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDUCATION_LIST.slice(0, 2).map((edu, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono font-bold text-slate-500">{edu.year}</span>
                    <span className="text-xs font-mono font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      CGPA: {edu.score}
                    </span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-sm">{edu.degree}</h5>
                  <p className="text-xs text-slate-600 font-medium">{edu.institution}, {edu.location}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Download Resume Bottom CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-slate-200">
            <a
              href={PERSONAL_INFO.resumeDownloadUrl}
              download="Zafarali_Inamdar_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white font-mono font-black text-sm shadow-xl shadow-sky-600/30 hover:brightness-105 active:scale-95 transition-all"
            >
              <FileDown className="w-4 h-4 stroke-[2.5]" />
              <span>Download Official Resume (PDF)</span>
            </a>

            <a
              href={PERSONAL_INFO.resumeDriveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-mono font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
            >
              <ExternalLink className="w-4 h-4 text-slate-600 stroke-[2.5]" />
              <span>View on Google Drive</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
