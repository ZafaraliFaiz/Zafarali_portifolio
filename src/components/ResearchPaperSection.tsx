import React, { useState } from "react";
import {
  BookOpen,
  Copy,
  Check,
  Sparkles,
  FileText,
  ExternalLink,
  Award,
  FileDown,
  CheckCircle2,
} from "lucide-react";
import { RESEARCH_PAPER } from "../data/portfolioData";
import { TiltCard } from "./TiltCard";
import { ScrollAssemble } from "./animations/ScrollAssemble";
import { ScrollFocusZoom } from "./animations/ScrollFocusZoom";

export const ResearchPaperSection: React.FC = () => {
  const [copiedType, setCopiedType] = useState<"apa" | "bibtex" | null>(null);

  const handleCopyCitation = (type: "apa" | "bibtex") => {
    const text =
      type === "apa"
        ? RESEARCH_PAPER.citationApa
        : RESEARCH_PAPER.citationBibtex;
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <section
      id="research"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-purple-400 border border-purple-500/30 text-xs font-mono uppercase tracking-wider mb-4 font-bold shadow-md shadow-purple-500/10">
              <BookOpen className="w-4 h-4 text-purple-400 stroke-[2.5]" />
              <span>Academic Publication & Empirical Research</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
              Peer-Reviewed{" "}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Gen-AI Research
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-4 font-medium leading-relaxed max-w-2xl mx-auto">
              Bridging modern software engineering industry paradigms with
              academic empirical rigor, evaluating LLM integration and developer
              throughput.
            </p>
          </div>
        </ScrollAssemble>

        {/* Paper Showcase Card */}
        <ScrollAssemble direction="bottom" distance={45}>
          <ScrollFocusZoom
            maxScale={1.018}
            enableGlow
            glowColor="rgba(168, 85, 247, 0.2)"
          >
            <TiltCard maxTilt={4} scale={1.01} glareOpacity={0.12}>
              <div className="bg-gradient-to-b from-white via-white to-slate-50/80 backdrop-blur-md p-7 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl relative overflow-hidden transition-all duration-300 hover:border-purple-400/80 hover:shadow-2xl hover:-translate-y-0.5 group">
                {/* Top Saturated Color Stripe */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:h-2" />
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl pointer-events-none" />

                {/* Meta header */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-slate-100 mt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-purple-100/80 text-purple-900 border border-purple-300 font-extrabold flex items-center gap-1.5 shadow-2xs">
                      <Award className="w-3.5 h-3.5 text-purple-700 stroke-[2.5]" />
                      International Research Journal
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100/80 px-2.5 py-1 rounded-xl border border-slate-200/70">
                      ISSN: {RESEARCH_PAPER.issn}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-bold bg-slate-100/80 px-2.5 py-1 rounded-xl border border-slate-200/70">
                      {RESEARCH_PAPER.volume}, {RESEARCH_PAPER.page}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-purple-900 font-black bg-purple-50 px-3 py-1 rounded-xl border border-purple-200">
                      Published: {RESEARCH_PAPER.year}
                    </span>
                    <a
                      href={RESEARCH_PAPER.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="GenAI_Research_Paper_Inamdar_2026.pdf"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-purple-900 bg-purple-100/80 hover:bg-purple-200 px-3.5 py-1 rounded-xl border border-purple-300 transition-all font-black shadow-2xs"
                      title="Download official PDF from journal (030117.pdf)"
                    >
                      <FileDown className="w-3.5 h-3.5 text-purple-700 stroke-[2.5]" />
                      <span>PDF (030117.pdf)</span>
                    </a>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 font-display mt-6 leading-snug tracking-tight">
                  &ldquo;{RESEARCH_PAPER.title}&rdquo;
                </h3>

                {/* Authors & Journal */}
                <div className="mt-3 flex flex-wrap items-center gap-4 text-xs sm:text-sm font-mono">
                  <div className="text-slate-600">
                    Lead Author:{" "}
                    <strong className="text-purple-700 font-black">
                      {RESEARCH_PAPER.authors[0]}
                    </strong>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="text-slate-600">
                    Journal:{" "}
                    <span className="text-slate-900 font-black">
                      {RESEARCH_PAPER.journal}
                    </span>
                  </div>
                </div>

                {/* Abstract Box */}
                <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-purple-50/50 border border-purple-200/80 shadow-2xs">
                  <h4 className="text-xs font-mono uppercase text-purple-900 font-black mb-2 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                    <span>Research Abstract & Findings</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                    {RESEARCH_PAPER.abstract}
                  </p>
                </div>

                {/* Key Empirical Contributions */}
                <div className="mt-7">
                  <h4 className="text-xs font-mono uppercase text-slate-500 font-bold mb-3 tracking-wider">
                    Key Empirical Contributions:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {RESEARCH_PAPER.keyContributions.map((point, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-2xl bg-white border border-slate-200/90 text-xs text-slate-700 flex items-start gap-2.5 shadow-2xs font-medium hover:border-purple-200 hover:shadow-md transition-all"
                      >
                        <CheckCircle2 className="w-4 h-4 text-purple-600 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Download Action Banner */}
                <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white border border-purple-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl">
                  <div className="flex items-start gap-3.5">
                    <div className="p-3 rounded-2xl bg-white/10 text-purple-300 border border-white/10 shrink-0 shadow-inner">
                      <FileText className="w-6 h-6 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-white flex flex-wrap items-center gap-2 font-display">
                        <span>Download Full Research Paper (PDF)</span>
                        <span className="text-[10px] font-mono font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                          Verified ibrj.us Publication
                        </span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-xl font-medium">
                        Get the complete published paper: empirical methodology,
                        35%+ productivity evaluations, LLM hallucination
                        guardrails, and developer workflow benchmarks.
                      </p>
                      <div className="text-[11px] font-mono text-purple-300 mt-2 flex flex-wrap items-center gap-2 font-bold">
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
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm active:scale-95 transition-all shadow-lg shadow-purple-600/40 group"
                    >
                      <FileDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform stroke-[2.5]" />
                      <span>Download Paper PDF</span>
                    </a>
                    <a
                      href={RESEARCH_PAPER.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 md:flex-none flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-bold transition-all shadow-sm"
                      title="Open direct journal PDF in new tab"
                    >
                      <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                      <span>Open in Tab</span>
                    </a>
                  </div>
                </div>

                {/* Citation Generator Buttons */}
                <div className="mt-6 pt-5 border-t-2 border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-500 font-medium">
                    Need to cite this paper in research or technical due
                    diligence?
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyCitation("apa")}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-white text-xs font-mono text-slate-700 font-bold transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      {copiedType === "apa" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied APA!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy APA</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => handleCopyCitation("bibtex")}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-white text-xs font-mono text-slate-700 font-bold transition-all flex items-center gap-1.5 active:scale-95"
                    >
                      {copiedType === "bibtex" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">
                            Copied BibTeX!
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Copy BibTeX</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollFocusZoom>
        </ScrollAssemble>
      </div>
    </section>
  );
};
