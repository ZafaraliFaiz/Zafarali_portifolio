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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#090e1b] border border-indigo-500/40 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-indigo-950/80 to-slate-900 border-b border-indigo-500/20 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/40 font-bold">
                  Hiring Manager & Recruiter Briefing
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-400" /> 30-Sec Read
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
                Why Hire Zafarali Inamdar?
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-cyan-400 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Enterprise Full-Stack</span>
              </div>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                Proven developer behind <strong>Krushi ERP</strong> (Nebula Tech) and <strong>Greentop</strong> (Knowledge Keen) using React, Next.js App Router, Express, and transactional MySQL.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-sky-400 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-sky-400" />
                <span>Offline-First Mobile App</span>
              </div>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                Built and distributed <strong>BEMS</strong> on React Native (Expo Router) with custom local write-queue, NetInfo, and Supabase sync for Apple & Google Play store tracks.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-purple-400 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Gen-AI & Academic Publication</span>
              </div>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                Co-authored published peer-reviewed research on <strong>Gen-AI tools in software development</strong> (InSight Bulletin, 2026, ISSN: 3065-7857). Built LangChain + Gemini platforms.
              </p>
              <div className="mt-2">
                <a
                  href="https://ibrj.us/wp-content/uploads/030117.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-purple-300 hover:text-purple-100 underline font-semibold"
                >
                  <span>Download Paper PDF (030117.pdf)</span>
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <div className="text-emerald-400 font-mono font-bold flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Top Academic Standing</span>
              </div>
              <p className="text-slate-300 text-xs mt-1.5 leading-relaxed">
                Consistent <strong>9.05 CGPA in both M.Sc. & B.Sc. Computer Science</strong>, paired with 94% in HSC Electronics Bifocal.
              </p>
            </div>
          </div>

          {/* Quick Fit Summary */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/30">
            <h4 className="text-xs font-mono uppercase text-indigo-300 font-bold mb-1">
              Ideal Roles & Team Impact:
            </h4>
            <p className="text-slate-300 text-xs leading-relaxed">
              Full-Stack Software Engineer, Frontend Engineer (React/Next.js), Mobile App Developer (React Native/Expo), or AI Solutions Developer. Brings high velocity, clean architecture, automated testing mindset, and zero-compromise product delivery.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#0e1629] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 text-emerald-300 border border-emerald-500/40 text-xs font-bold hover:bg-slate-700 transition-colors"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>View Full Resume</span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${PERSONAL_INFO.phone}`}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold hover:border-cyan-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call Candidate</span>
            </a>
            <a
              href="#contact"
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-slate-950 text-xs font-bold hover:brightness-110 transition-all shadow-md"
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
