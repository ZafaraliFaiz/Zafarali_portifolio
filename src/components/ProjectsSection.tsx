import React, { useState } from 'react';
import { 
  FolderGit2, 
  ArrowUpRight, 
  Smartphone, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Database, 
  Sparkles, 
  ExternalLink, 
  ChevronRight, 
  GitBranch, 
  Terminal, 
  Activity,
  Award,
  BookOpen,
  FileDown,
  GraduationCap,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { PROJECTS, RESEARCH_PAPER, EDUCATION_LIST, SKILL_CATEGORIES } from '../data/portfolioData';
import { Project } from '../types/portfolio';
import { TiltCard } from './TiltCard';
import { StoreBadges } from './StoreBadges';
import { ScrollAssemble } from './animations/ScrollAssemble';
import { ScrollFocusZoom } from './animations/ScrollFocusZoom';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

// Tech Stack Brand Color Mapping for FEAT-07
const TECH_BRAND_COLORS: Record<string, string> = {
  'React.js': '#61DAFB',
  'React Native & Expo': '#61DAFB',
  'Next.js (App Router)': '#0284c7',
  'TypeScript & JavaScript': '#3178C6',
  'Tailwind CSS & HeroUI': '#06B6D4',
  'Redux Toolkit & Zustand': '#764ABC',
  'React Hook Form & Yup': '#EC5990',
  'TanStack React Query': '#FF4154',
  'Node.js & Express.js': '#339933',
  'FastAPI & Python': '#3776AB',
  'MySQL & Relational Design': '#4479A1',
  'Supabase (Postgres & Auth)': '#3ECF8E',
  'Offline-First Architectures': '#0284C7',
  'Docker & Containerization': '#2496ED',
  'NGINX Reverse Proxy': '#009639',
  'Jenkins CI/CD': '#D24939',
  'AWS (EC2, IAM, S3)': '#FF9900',
  'EAS Build & App Distribution': '#4630EB',
  'Git, GitHub & CI/CD': '#F05032',
  'LangChain Orchestration': '#7C3AED',
  'OpenAI & Gemini APIs': '#10A37F',
  'Prompt Engineering': '#8B5CF6',
  'Scientific Research Methodology': '#EC4899',
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  // FEAT-06: Segmented Multi-Tab Controller
  const [showcaseTab, setShowcaseTab] = useState<'projects' | 'credentials' | 'tech-stack'>('projects');
  const [filter, setFilter] = useState<'All' | 'Full Stack' | 'Mobile' | 'AI & Gen-AI' | 'DevOps & Cloud'>('All');

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === filter);

  const categories: ('All' | 'Full Stack' | 'Mobile' | 'AI & Gen-AI' | 'DevOps & Cloud')[] = [
    'All',
    'Mobile',
    'Full Stack',
    'AI & Gen-AI',
    'DevOps & Cloud',
  ];

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'Mobile':
        return {
          accent: '#0284c7',
          icon: Smartphone,
          gradient: 'from-sky-500 via-blue-600 to-indigo-600',
          badgeBg: 'bg-sky-100 text-sky-900 border-sky-300',
          btnGradient: 'from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500',
        };
      case 'Full Stack':
        return {
          accent: '#059669',
          icon: Layers,
          gradient: 'from-emerald-500 via-teal-600 to-cyan-600',
          badgeBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          btnGradient: 'from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500',
        };
      case 'AI & Gen-AI':
        return {
          accent: '#7c3aed',
          icon: Cpu,
          gradient: 'from-purple-500 via-pink-600 to-indigo-600',
          badgeBg: 'bg-purple-100 text-purple-900 border-purple-300',
          btnGradient: 'from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500',
        };
      case 'DevOps & Cloud':
      default:
        return {
          accent: '#d97706',
          icon: GitBranch,
          gradient: 'from-amber-500 via-orange-600 to-rose-600',
          badgeBg: 'bg-amber-100 text-amber-900 border-amber-300',
          btnGradient: 'from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500',
        };
    }
  };

  // Flattened all skills for Tech Stack Tab
  const allSkills = SKILL_CATEGORIES.flatMap((cat) =>
    cat.skills.map((s) => ({
      ...s,
      categoryName: cat.category,
      brandColor: TECH_BRAND_COLORS[s.name] || '#0284c7',
    }))
  );

  return (
    <section id="projects" className="pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-sky-400 border border-sky-500/30 text-xs font-mono uppercase tracking-wider mb-3 font-bold shadow-md shadow-sky-500/10">
              <FolderGit2 className="w-4 h-4 text-sky-400 stroke-[2.5]" />
              <span>Production Systems &amp; Technical Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
              Engineering{' '}
              <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Portfolio Showcase
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium leading-relaxed">
              Explore flagship production architectures, published academic research, and verified daily technology proficiencies.
            </p>
          </div>

          {/* FEAT-06: Segmented Multi-Tab Controller */}
          <div className="flex justify-center mb-10">
            <div
              role="tablist"
              aria-label="Portfolio Showcase Views"
              className="inline-flex items-center p-1.5 rounded-2xl bg-white/95 border-2 border-slate-200/90 shadow-lg backdrop-blur-md gap-1.5 max-w-full overflow-x-auto"
            >
              <button
                role="tab"
                id="tab-projects"
                aria-selected={showcaseTab === 'projects'}
                aria-controls="panel-projects"
                onClick={() => setShowcaseTab('projects')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black transition-all ${
                  showcaseTab === 'projects'
                    ? 'bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <FolderGit2 className="w-4 h-4 text-sky-400" />
                <span>Projects ({PROJECTS.length})</span>
              </button>

              <button
                role="tab"
                id="tab-credentials"
                aria-selected={showcaseTab === 'credentials'}
                aria-controls="panel-credentials"
                onClick={() => setShowcaseTab('credentials')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black transition-all ${
                  showcaseTab === 'credentials'
                    ? 'bg-purple-900 text-white shadow-md shadow-purple-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Award className="w-4 h-4 text-purple-400" />
                <span>Credentials &amp; Research</span>
              </button>

              <button
                role="tab"
                id="tab-tech-stack"
                aria-selected={showcaseTab === 'tech-stack'}
                aria-controls="panel-tech-stack"
                onClick={() => setShowcaseTab('tech-stack')}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black transition-all ${
                  showcaseTab === 'tech-stack'
                    ? 'bg-sky-900 text-white shadow-md shadow-sky-900/20 scale-[1.02]'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Code2 className="w-4 h-4 text-sky-400" />
                <span>Tech Stack ({allSkills.length})</span>
              </button>
            </div>
          </div>
        </ScrollAssemble>

        {/* TAB 1: PROJECTS GRID */}
        {showcaseTab === 'projects' && (
          <div id="panel-projects" role="tabpanel" aria-labelledby="tab-projects" className="space-y-8 animate-fadeIn">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all font-bold ${
                    filter === cat
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-500/25 scale-[1.02]'
                      : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200/90 shadow-2xs'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Projects Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProjects.map((project, idx) => {
                const scatterDir = idx % 3 === 0 ? 'left' : idx % 3 === 1 ? 'bottom' : 'tilt-right';
                const theme = getCategoryTheme(project.category);
                const CategoryIcon = theme.icon;

                return (
                  <ScrollAssemble
                    key={project.id}
                    direction={scatterDir}
                    delay={(idx % 3) * 0.08}
                    distance={45}
                    className="h-full"
                  >
                    <ScrollFocusZoom maxScale={1.018} enableGlow glowColor={`${theme.accent}15`} className="h-full">
                      <TiltCard
                        maxTilt={5}
                        scale={1.01}
                        glareOpacity={0.12}
                        className="h-full"
                      >
                        <div className="bg-gradient-to-b from-white via-white to-slate-50/80 backdrop-blur-md rounded-3xl border border-slate-200/90 hover:border-slate-400/80 p-6 sm:p-7 flex flex-col justify-between h-full group relative overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                          
                          {/* Top Specular Accent Gradient Line */}
                          <div 
                            className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${theme.gradient} transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:h-2`}
                          />

                          {/* Ambient Glow Aura */}
                          <div 
                            className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-3xl opacity-15 pointer-events-none group-hover:opacity-30 transition-opacity"
                            style={{ backgroundColor: theme.accent }}
                          />

                          <div>
                            {/* Top Developer Meta Row: Category Badge & Period */}
                            <div className="flex items-center justify-between gap-2 mb-4">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-black flex items-center gap-1.5 shadow-2xs ${theme.badgeBg}`}>
                                  <CategoryIcon className="w-3 h-3 stroke-[2.5]" />
                                  <span>{project.badge}</span>
                                </span>
                                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/70">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  PROD
                                </span>
                              </div>
                              <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100/70 px-2 py-0.5 rounded-md border border-slate-200/60">
                                {project.period}
                              </span>
                            </div>

                            {/* Interactive Screenshot Preview */}
                            {project.imageUrl && (
                              <div 
                                onClick={() => onSelectProject(project)}
                                className={`relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-5 border border-slate-200/90 group-hover:border-slate-300 group/img cursor-pointer shadow-sm hover:shadow-md transition-all ${
                                  project.category === 'Mobile'
                                    ? 'bg-gradient-to-b from-sky-50 via-slate-100 to-slate-200 flex items-center justify-center p-3'
                                    : 'bg-slate-100'
                                }`}
                              >
                                <img
                                  src={project.imageUrl}
                                  alt={project.title}
                                  loading="lazy"
                                  className={`w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105 ${
                                    project.category === 'Mobile' ? 'object-contain max-h-full drop-shadow-lg' : 'object-cover'
                                  }`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-4">
                                  <span className="text-white text-xs font-mono font-bold flex items-center gap-1">
                                    <span>Explore System Architecture</span>
                                    <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Title & Tagline */}
                            <h3 
                              onClick={() => onSelectProject(project)}
                              className="text-lg sm:text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors font-display tracking-tight leading-snug cursor-pointer mb-2"
                            >
                              {project.title}
                            </h3>

                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 font-medium">
                              {project.description}
                            </p>

                            {/* Key Highlights Pill */}
                            <div className="space-y-1.5 mb-5 border-y border-slate-100 py-3">
                              {project.keyHighlights.slice(0, 2).map((h, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px] font-mono text-slate-700 leading-snug">
                                  <span className="text-sky-600 font-bold shrink-0 mt-0.5">▹</span>
                                  <span className="line-clamp-2">{h}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tech Stack Pills & CTA */}
                          <div>
                            <div className="flex flex-wrap gap-1.5 mb-5">
                              {project.technologies.slice(0, 4).map((tech) => (
                                <span
                                  key={tech}
                                  className="text-[11px] font-mono px-2.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/90 font-semibold shadow-2xs transition-colors"
                                >
                                  {tech}
                                </span>
                              ))}
                              {project.technologies.length > 4 && (
                                <span className="text-[11px] font-mono px-2 py-1 rounded-xl bg-slate-100 text-slate-600 border border-slate-200 font-bold">
                                  +{project.technologies.length - 4}
                                </span>
                              )}
                            </div>

                            {(project.appStoreUrl || project.playStoreUrl) && (
                              <div className="mb-3">
                                <StoreBadges
                                  appStoreUrl={project.appStoreUrl}
                                  playStoreUrl={project.playStoreUrl}
                                  variant="compact"
                                  onLinkClick={(e) => e.stopPropagation()}
                                />
                              </div>
                            )}

                            <button
                              onClick={() => onSelectProject(project)}
                              className="w-full flex items-center justify-between py-3 px-4 rounded-2xl bg-slate-900 hover:bg-sky-600 text-white font-mono text-xs font-black transition-all shadow-md group/btn active:scale-98"
                            >
                              <span>System Architecture Deep Dive</span>
                              <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                            </button>
                          </div>

                        </div>
                      </TiltCard>
                    </ScrollFocusZoom>
                  </ScrollAssemble>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CREDENTIALS & RESEARCH */}
        {showcaseTab === 'credentials' && (
          <div id="panel-credentials" role="tabpanel" aria-labelledby="tab-credentials" className="space-y-8 animate-fadeIn">
            {/* Gen-AI Research Publication Card */}
            <div className="p-7 sm:p-9 rounded-3xl bg-white border-2 border-purple-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600" />
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <span className="text-xs font-mono px-3.5 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-300 font-black flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-purple-700 stroke-[2.5]" />
                  <span>Peer-Reviewed Publication • {RESEARCH_PAPER.year}</span>
                </span>
                <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-xl">
                  ISSN: {RESEARCH_PAPER.issn}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-4 leading-snug">
                &ldquo;{RESEARCH_PAPER.title}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm font-mono text-purple-700 font-bold mt-1">
                Journal: {RESEARCH_PAPER.journal} ({RESEARCH_PAPER.volume}, {RESEARCH_PAPER.page})
              </p>

              <p className="text-slate-700 text-sm mt-3 leading-relaxed font-medium">
                {RESEARCH_PAPER.abstract}
              </p>

              <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-slate-100">
                <a
                  href={RESEARCH_PAPER.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600 text-white font-mono font-bold text-xs shadow-md hover:bg-purple-700 transition-all"
                >
                  <FileDown className="w-4 h-4 stroke-[2.5]" />
                  <span>Download Published Paper (PDF)</span>
                </a>
              </div>
            </div>

            {/* Academic Degrees & CGPA Distinction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {EDUCATION_LIST.map((edu, idx) => (
                <div key={idx} className="p-6 rounded-3xl bg-white border-2 border-slate-200/90 shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-slate-500">{edu.year}</span>
                    <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                      {edu.scoreType}: {edu.score}
                    </span>
                  </div>
                  <h4 className="text-lg font-black font-display text-slate-900">{edu.degree}</h4>
                  <p className="text-xs font-medium text-slate-600 mt-1">{edu.institution}, {edu.location}</p>
                  <p className="text-xs text-slate-700 mt-3 font-mono">{edu.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TECH STACK WITH FEAT-07 BRAND GLOW HOVER CARDS */}
        {showcaseTab === 'tech-stack' && (
          <div id="panel-tech-stack" role="tabpanel" aria-labelledby="tab-tech-stack" className="space-y-6 animate-fadeIn">
            {/* Header Count */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="text-xs sm:text-sm font-mono font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Code2 className="w-4 h-4 text-sky-600" />
                <span>{allSkills.length} TECHNOLOGIES · DAILY PRODUCTION STACK</span>
              </span>
              <span className="text-xs font-mono text-slate-500 font-bold hidden sm:inline">
                Hover to illuminate brand radial glow
              </span>
            </div>

            {/* Brand Glow Tech Grid (FEAT-07) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
              {allSkills.map((skill, idx) => (
                <div
                  key={idx}
                  style={
                    {
                      '--tech-glow-color': skill.brandColor,
                    } as React.CSSProperties
                  }
                  className="relative p-4 rounded-2xl bg-white border-2 border-slate-200/90 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl group overflow-hidden flex flex-col justify-between"
                >
                  {/* Radial Spotlight Gradient (FEAT-07) */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${skill.brandColor}35 0%, transparent 75%)`,
                    }}
                  />

                  {/* Brand Colored Border on Hover (FEAT-07) */}
                  <div
                    className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ borderColor: skill.brandColor }}
                  />

                  {/* Tech Content */}
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="w-3 h-3 rounded-full border shadow-2xs"
                        style={{ backgroundColor: skill.brandColor, borderColor: '#ffffff' }}
                      />
                      <span className="text-[10px] font-mono font-bold text-slate-500">
                        {skill.level}%
                      </span>
                    </div>

                    <h4 className="text-xs sm:text-sm font-black font-display text-slate-900 group-hover:text-slate-950 transition-colors leading-tight">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-500 truncate block mt-0.5">
                      {skill.categoryName}
                    </span>
                  </div>

                  {/* Level Progress Bar in Brand Color */}
                  <div className="relative z-10 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: skill.brandColor,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
