import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, FileText, ExternalLink, Award, FileDown } from 'lucide-react';
import { RESEARCH_PAPER } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

export const ResearchPaperSection: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'apa' | 'bibtex' | null>(null);

  const handleCopyCitation = (type: 'apa' | 'bibtex') => {
    const text = type === 'apa' ? RESEARCH_PAPER.citationApa : RESEARCH_PAPER.citationBibtex;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 border-2 border-purple-300 text-purple-900 text-xs font-mono uppercase tracking-wider mb-3 font-bold shadow-sm">
            <BookOpen className="w-4 h-4 text-purple-600 stroke-[2.5]" />
            <span>Academic Publication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
            Peer-Reviewed{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Gen-AI Research
            </span>
          </h2>
          <p className="text-slate-700 text-sm sm:text-base mt-2 font-medium leading-relaxed">
            Bridging software engineering industry practices with academic empirical methodology.
          </p>
        </div>

        {/* Paper Showcase Card */}
        <TiltCard maxTilt={5} scale={1.01} glareOpacity={0.12}>
          <div className="bg-white p-6 sm:p-9 rounded-3xl border-2 border-purple-400/90 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-purple-500">
          {/* Top Saturated Color Stripe */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Meta header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b-2 border-slate-100 mt-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-purple-100 text-purple-900 border-2 border-purple-300 font-extrabold flex items-center gap-1.5 shadow-sm">
                <Award className="w-3.5 h-3.5 text-purple-700 stroke-[2.5]" />
                International Research Journal
              </span>
              <span className="text-xs font-mono text-slate-600 font-bold">
                ISSN: {RESEARCH_PAPER.issn}
              </span>
              <span className="text-xs font-mono text-slate-600 font-bold">
                • {RESEARCH_PAPER.volume}, {RESEARCH_PAPER.page}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-purple-900 font-black bg-purple-100 px-3 py-1 rounded-xl border-2 border-purple-300">
                Published: {RESEARCH_PAPER.year}
              </span>
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="GenAI_Research_Paper_Inamdar_2026.pdf"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-900 bg-purple-100 hover:bg-purple-200 px-3.5 py-1 rounded-xl border-2 border-purple-300 transition-all font-black shadow-sm"
                title="Download official PDF from journal (030117.pdf)"
              >
                <FileDown className="w-3.5 h-3.5 text-purple-700 stroke-[2.5]" />
                <span>PDF (030117.pdf)</span>
              </a>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-display mt-5 leading-snug tracking-tight">
            &ldquo;{RESEARCH_PAPER.title}&rdquo;
          </h3>

          {/* Authors */}
          <div className="mt-2 text-sm text-slate-700 font-mono font-medium">
            Authors: <strong className="text-purple-800 font-black">{RESEARCH_PAPER.authors.join(', ')}</strong>
          </div>

          <div className="text-xs text-slate-600 font-mono mt-1 font-semibold">
            Journal: <span className="text-slate-900 font-black">{RESEARCH_PAPER.journal}</span>
          </div>

          {/* Abstract */}
          <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-purple-50/80 border-2 border-purple-200 shadow-sm">
            <h4 className="text-xs font-mono uppercase text-purple-900 font-black mb-2 tracking-wider">
              Research Abstract & Findings:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {RESEARCH_PAPER.abstract}
            </p>
          </div>

          {/* Key Contributions */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-purple-900 font-black mb-3 tracking-wider">
              Key Empirical Contributions:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {RESEARCH_PAPER.keyContributions.map((point, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs text-slate-700 flex items-start gap-2 shadow-sm font-medium"
                >
                  <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Action Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-purple-100 via-indigo-50 to-pink-50 border-2 border-purple-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-2xl bg-purple-200 text-purple-800 border-2 border-purple-300 shrink-0 shadow-sm">
                <FileText className="w-6 h-6 text-purple-800 stroke-[2.5]" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-900 flex flex-wrap items-center gap-2 font-display">
                  <span>Download Full Research Paper (PDF)</span>
                  <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border-2 border-emerald-300">
                    Official ibrj.us Publication
                  </span>
                </h4>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed max-w-xl font-medium">
                  Get the complete published paper: empirical methodology, 35%+ productivity evaluations, LLM hallucination guardrails, and developer workflow benchmarks.
                </p>
                <div className="text-[11px] font-mono text-purple-800 mt-1.5 flex flex-wrap items-center gap-2 font-bold">
                  <span>File: 030117.pdf</span>
                  <span>•</span>
                  <span>Size: 743 KB</span>
                  <span>•</span>
                  <span>ISSN: {RESEARCH_PAPER.issn}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="GenAI_Software_Development_Research_Inamdar_2026.pdf"
                id="research-paper-download-btn"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-black text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md shadow-purple-600/30 group border-2 border-purple-500"
              >
                <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
                <span>Download Paper PDF</span>
              </a>
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-purple-800 border-2 border-purple-300 hover:bg-purple-50 text-xs sm:text-sm font-bold transition-all shadow-sm"
                title="Open direct journal PDF in new tab"
              >
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* Citation Generator Buttons */}
          <div className="mt-6 pt-5 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-slate-600 font-medium">
              Need to cite this paper in research or technical due diligence?
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyCitation('apa')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-purple-400 hover:bg-purple-50/50 text-xs font-mono font-bold transition-all shadow-sm"
              >
                {copiedType === 'apa' ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5 text-purple-600 stroke-[2.5]" />}
                <span>{copiedType === 'apa' ? 'Copied APA' : 'Copy APA Citation'}</span>
              </button>

              <button
                onClick={() => handleCopyCitation('bibtex')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white text-slate-800 border-2 border-slate-300 hover:border-purple-400 hover:bg-purple-50/50 text-xs font-mono font-bold transition-all shadow-sm"
              >
                {copiedType === 'bibtex' ? <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5 text-purple-600 stroke-[2.5]" />}
                <span>{copiedType === 'bibtex' ? 'Copied BibTeX' : 'Copy BibTeX'}</span>
              </button>
            </div>
          </div>
        </div>
        </TiltCard>
      </div>
    </section>
  );
};
