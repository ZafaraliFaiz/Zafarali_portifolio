import React from 'react';
import { X, Sparkles, CheckCircle2, FileDown, Phone, Mail, Award, Clock, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface RecruiterFastDeckProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
}

export const RecruiterFastDeck: React.FC<RecruiterFastDeckProps> = ({
  isOpen,
  onClose,
  onOpenResume,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white border-2 border-slate-300 rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Top Accent Gradient Bar */}
        <div className="h-2 w-full bg-gradient-to-r from-sky-500 via-indigo-600 to-purple-600" />
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-50/80 via-sky-50/50 to-slate-50 border-b-2 border-slate-200 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-indigo-700 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-indigo-100 text-indigo-900 px-2.5 py-0.5 rounded-full border-2 border-indigo-300 font-black">
                  Hiring Manager Briefing
                </span>
                <span className="text-xs text-slate-600 font-mono font-bold flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-600" /> 30-Sec Read
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight mt-1">
                Why Hire Zafarali Inamdar?
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl border-2 border-slate-200 text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-sky-500 shadow-md transition-all">
              <div className="text-sky-700 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                <span className="font-display font-black text-slate-900 text-sm">Enterprise Full-Stack</span>
              </div>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Proven developer behind <strong className="text-slate-900 font-bold">AgroStock ERP</strong> (Nebula Tech) and <strong className="text-slate-900 font-bold">Greentop</strong> (Knowledge Keen) using React, Next.js App Router, Express, and transactional MySQL.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-blue-500 shadow-md transition-all">
              <div className="text-blue-700 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span className="font-display font-black text-slate-900 text-sm">Offline-First Mobile App</span>
              </div>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Built and distributed <strong className="text-slate-900 font-bold">TAIN Elect AI</strong> on React Native (Expo Router) with custom local write-queue, NetInfo, and Supabase sync for Apple & Google Play store tracks.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-purple-500 shadow-md transition-all">
              <div className="text-purple-700 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span className="font-display font-black text-slate-900 text-sm">Gen-AI & Academic Publication</span>
              </div>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Co-authored published peer-reviewed research on <strong className="text-slate-900 font-bold">Gen-AI tools in software development</strong> (InSight Bulletin, 2026, ISSN: 3065-7857). Built LangChain + Gemini platforms.
              </p>
              <div className="mt-2.5">
                <a
                  href="https://ibrj.us/wp-content/uploads/030117.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-700 hover:text-purple-900 underline font-black"
                >
                  <span>Download Paper PDF (030117.pdf)</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border-2 border-slate-200/90 hover:border-emerald-500 shadow-md transition-all">
              <div className="text-emerald-700 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-display font-black text-slate-900 text-sm">Top Academic Standing</span>
              </div>
              <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                Consistent <strong className="text-slate-900 font-bold">9.05 CGPA in both M.Sc. & B.Sc. Computer Science</strong>, paired with 94% in HSC Electronics Bifocal.
              </p>
            </div>
          </div>

          {/* Quick Fit Summary */}
          <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 border-2 border-indigo-200 shadow-sm">
            <h4 className="text-xs font-mono uppercase text-indigo-900 font-black mb-1.5">
              Ideal Roles & Team Impact:
            </h4>
            <p className="text-slate-800 text-xs sm:text-sm font-medium leading-relaxed">
              Full-Stack Software Engineer, Frontend Engineer (React/Next.js), Mobile App Developer (React Native/Expo), or AI Solutions Developer. Brings high velocity, clean architecture, automated testing mindset, and zero-compromise product delivery.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-emerald-800 border-2 border-emerald-400 text-xs font-black hover:bg-emerald-50 transition-colors shadow-sm"
          >
            <FileDown className="w-4 h-4 text-emerald-600" />
            <span>View Full Resume</span>
          </button>

          <div className="flex items-center gap-2.5">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-slate-800 border-2 border-slate-300 text-xs font-bold hover:border-sky-500 hover:text-sky-700 transition-colors shadow-sm"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Candidate</span>
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-black hover:brightness-110 transition-all shadow-md shadow-sky-500/25"
            >
              <span>Schedule Interview</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
