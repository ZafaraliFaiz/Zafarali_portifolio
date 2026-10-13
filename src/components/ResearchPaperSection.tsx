import React, { useState } from 'react';
import { BookOpen, Copy, Check, Sparkles, FileText, ExternalLink, Award, FileDown } from 'lucide-react';
import { RESEARCH_PAPER } from '../data/portfolioData';

export const ResearchPaperSection: React.FC = () => {
  const [copiedType, setCopiedType] = useState<'apa' | 'bibtex' | null>(null);

  const handleCopyCitation = (type: 'apa' | 'bibtex') => {
    const text = type === 'apa' ? RESEARCH_PAPER.citationApa : RESEARCH_PAPER.citationBibtex;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section id="research" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10 bg-slate-950/30">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Academic Publication</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
            Peer-Reviewed{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Gen-AI Research
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Bridging software engineering industry practices with academic empirical methodology.
          </p>
        </div>

        {/* Paper Showcase Card */}
        <div className="glass-panel p-6 sm:p-9 rounded-2xl border border-purple-500/30 shadow-2xl relative overflow-hidden">
          {/* Subtle glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Meta header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-purple-400" />
                International Research Journal
              </span>
              <span className="text-xs font-mono text-slate-400">
                ISSN: {RESEARCH_PAPER.issn}
              </span>
              <span className="text-xs font-mono text-slate-400">
                • {RESEARCH_PAPER.volume}, {RESEARCH_PAPER.page}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-purple-300 font-bold bg-purple-950/60 px-2.5 py-1 rounded border border-purple-800">
                Published: {RESEARCH_PAPER.year}
              </span>
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="GenAI_Research_Paper_Inamdar_2026.pdf"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-200 bg-purple-900/60 hover:bg-purple-800 px-3 py-1 rounded-md border border-purple-500/50 hover:border-purple-300 transition-all font-semibold"
                title="Download official PDF from journal (030117.pdf)"
              >
                <FileDown className="w-3.5 h-3.5 text-purple-300" />
                <span>PDF (030117.pdf)</span>
              </a>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white font-display mt-5 leading-snug">
            &ldquo;{RESEARCH_PAPER.title}&rdquo;
          </h3>

          {/* Authors */}
          <div className="mt-2 text-sm text-slate-300 font-mono">
            Authors: <strong className="text-purple-300">{RESEARCH_PAPER.authors.join(', ')}</strong>
          </div>

          <div className="text-xs text-slate-400 font-mono mt-1">
            Journal: <span className="text-slate-200">{RESEARCH_PAPER.journal}</span>
          </div>

          {/* Abstract */}
          <div className="mt-6 p-4 sm:p-5 rounded-xl bg-slate-950/80 border border-slate-800">
            <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-2 tracking-wider">
              Research Abstract & Findings:
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {RESEARCH_PAPER.abstract}
            </p>
          </div>

          {/* Key Contributions */}
          <div className="mt-6">
            <h4 className="text-xs font-mono uppercase text-purple-400 font-bold mb-3 tracking-wider">
              Key Empirical Contributions:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {RESEARCH_PAPER.keyContributions.map((point, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download Action Banner */}
          <div className="mt-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-purple-950/80 via-indigo-950/60 to-slate-950/80 border border-purple-500/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="p-3 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 shrink-0">
                <FileText className="w-6 h-6 text-purple-300" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-white flex flex-wrap items-center gap-2">
                  <span>Download Full Research Paper (PDF)</span>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Official ibrj.us Publication
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl">
                  Get the complete published paper: empirical methodology, 35%+ productivity evaluations, LLM hallucination guardrails, and developer workflow benchmarks.
                </p>
                <div className="text-[11px] font-mono text-purple-300/80 mt-1.5 flex flex-wrap items-center gap-2">
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
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-indigo-600 text-white font-bold text-xs sm:text-sm hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-purple-500/25 group"
              >
                <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                <span>Download Paper PDF</span>
              </a>
              <a
                href={RESEARCH_PAPER.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-purple-300 border border-purple-500/40 hover:border-purple-300 hover:bg-slate-800 text-xs sm:text-sm font-medium transition-all"
                title="Open direct journal PDF in new tab"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Tab</span>
              </a>
            </div>
          </div>

          {/* Citation Generator Buttons */}
          <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-mono text-slate-400">
              Need to cite this paper in research or technical due diligence?
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyCitation('apa')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 hover:border-purple-400 text-xs font-mono transition-colors"
              >
                {copiedType === 'apa' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                <span>{copiedType === 'apa' ? 'Copied APA' : 'Copy APA Citation'}</span>
              </button>

              <button
                onClick={() => handleCopyCitation('bibtex')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 text-slate-200 border border-slate-700 hover:border-purple-400 text-xs font-mono transition-colors"
              >
                {copiedType === 'bibtex' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                <span>{copiedType === 'bibtex' ? 'Copied BibTeX' : 'Copy BibTeX'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
