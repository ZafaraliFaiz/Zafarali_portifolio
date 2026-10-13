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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Publication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Peer-Reviewed{' '}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
              Gen-AI Research
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Bridging software engineering industry practices with academic empirical methodology.
          </p>
        </div>

        {/* Paper Showcase Card */}
        <TiltCard maxTilt={5} scale={1.01} glareOpacity={0.12}>
          <div className="bg-white/95 p-6 sm:p-9 rounded-2xl border border-purple-200 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-purple-400">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

          {/* Meta header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-600" />
                International Research Journal
              </span>
              <span className="text-xs font-mono text-slate-500">
                ISSN: {RESEARCH_PAPER.issn}
              </span>
              <span className="text-xs font-mono text-slate-500">
                • {RESEARCH_PAPER.volume}, {RESEARCH_PAPER.page}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-purple-700 font-bold bg-purple-50 px-2.5 py-1 rounded border border-purple-200">
                Published: {RESEARCH_PAPER.year}
              </span>
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="GenAI_Research_Paper_Inamdar_2026.pdf"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-700 bg-purple-100 hover:bg-purple-200 px-3 py-1 rounded-md border border-purple-300 transition-all font-semibold"
                title="Download official PDF from journal (030117.pdf)"
              >
                <FileDown className="w-3.5 h-3.5 text-purple-700" />
                <span>PDF (030117.pdf)</span>
              </a>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 font-display mt-5 leading-snug">
            &ldquo;{RESEARCH_PAPER.title}&rdquo;
          </h3>

          {/* Authors */}
          <div className="mt-2 text-sm text-slate-600 font-mono">
            Authors: <strong className="text-purple-700">{RESEARCH_PAPER.authors.join(', ')}</strong>
          </div>

          <div className="text-xs text-slate-500 font-mono mt-1">
            Journal: <span className="text-slate-700 font-semibold">{RESEARCH_PAPER.journal}</span>
          </div>

          {/* Abstract */}
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-purple-50/50 border border-purple-100">
            <h4 className="text-xs font-mono uppercase text-purple-700 font-bold mb-2 tracking-wider">
              Research Abstract & Findings:
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {RESEARCH_PAPER.abstract}
            </p>
          </div>

          {/* Key Contributions */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-purple-700 font-bold mb-3 tracking-wider">
              Key Empirical Contributions:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {RESEARCH_PAPER.keyContributions.map((point, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Action Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-purple-50 via-indigo-50 to-slate-50 border border-purple-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-700 border border-purple-200 shrink-0">
                <FileText className="w-6 h-6 text-purple-700" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-slate-900 flex flex-wrap items-center gap-2">
                  <span>Download Full Research Paper (PDF)</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Official ibrj.us Publication
                  </span>
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed max-w-xl">
                  Get the complete published paper: empirical methodology, 35%+ productivity evaluations, LLM hallucination guardrails, and developer workflow benchmarks.
                </p>
                <div className="text-[11px] font-mono text-purple-700 mt-1.5 flex flex-wrap items-center gap-2 font-medium">
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
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-md shadow-purple-500/25 group"
              >
                <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Paper PDF</span>
              </a>
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-purple-700 border border-purple-200 hover:bg-purple-50 text-xs sm:text-sm font-semibold transition-all shadow-sm"
                title="Open direct journal PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* Citation Generator Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-slate-500">
              Need to cite this paper in research or technical due diligence?
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyCitation('apa')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-xs font-mono transition-colors shadow-sm"
              >
                {copiedType === 'apa' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-purple-600" />}
                <span>{copiedType === 'apa' ? 'Copied APA' : 'Copy APA Citation'}</span>
              </button>

              <button
                onClick={() => handleCopyCitation('bibtex')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-slate-700 border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 text-xs font-mono transition-colors shadow-sm"
              >
                {copiedType === 'bibtex' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-purple-600" />}
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
