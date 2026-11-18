import React, { useState } from "react";
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
  Code2,
  RotateCcw,
  Compass,
  LayoutGrid,
  Server,
  Cloud,
  Box,
  WifiOff,
  Sliders,
  FileText,
  RefreshCw,
} from "lucide-react";
import {
  PROJECTS,
  RESEARCH_PAPER,
  EDUCATION_LIST,
  SKILL_CATEGORIES,
} from "../data/portfolioData";
import { Project } from "../types/portfolio";
import { TiltCard } from "./TiltCard";
import { StoreBadges } from "./StoreBadges";
import { ScrollAssemble } from "./animations/ScrollAssemble";
import { ScrollFocusZoom } from "./animations/ScrollFocusZoom";
import { ProjectCardFlip } from "./ui/ProjectCardFlip";
import { StackingSlider } from "./ui/StackingSlider";

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

// Tech Stack Brand Color Mapping with Vibrant Authentic Brand Colors
const TECH_BRAND_COLORS: Record<string, string> = {
  "React.js": "#0ea5e9",
  "React Native & Expo": "#0284c7",
  "Next.js (App Router)": "#0f172a",
  "TypeScript & JavaScript": "#3178c6",
  "Tailwind CSS & HeroUI": "#06b6d4",
  "Redux Toolkit & Zustand": "#764abc",
  "React Hook Form & Yup": "#ec4899",
  "TanStack React Query": "#ff4154",
  "Node.js & Express.js": "#16a34a",
  "FastAPI & Python": "#0284c7",
  "MySQL & Relational Design": "#00758f",
  "Supabase (Postgres & Auth)": "#10b981",
  "Offline-First Architectures": "#6366f1",
  "Docker & Containerization": "#2496ed",
  "NGINX Reverse Proxy": "#009639",
  "Jenkins CI/CD": "#d24939",
  "AWS (EC2, IAM, S3)": "#f59e0b",
  "EAS Build & App Distribution": "#4630eb",
  "Git, GitHub & CI/CD": "#f05032",
  "LangChain Orchestration": "#7c3aed",
  "OpenAI & Gemini APIs": "#059669",
  "Prompt Engineering": "#8b5cf6",
  "Scientific Research Methodology": "#ec4899",
};

// Map each technology to its crisp Lucide brand glyph
const getTechIcon = (name: string) => {
  switch (name) {
    case "React.js":
      return <Layers className="w-4 h-4" />;
    case "React Native & Expo":
    case "EAS Build & App Distribution":
      return <Smartphone className="w-4 h-4" />;
    case "Next.js (App Router)":
    case "Node.js & Express.js":
      return <Server className="w-4 h-4" />;
    case "TypeScript & JavaScript":
      return <Code2 className="w-4 h-4" />;
    case "Tailwind CSS & HeroUI":
      return <Sparkles className="w-4 h-4" />;
    case "Redux Toolkit & Zustand":
      return <Layers className="w-4 h-4" />;
    case "React Hook Form & Yup":
      return <FileText className="w-4 h-4" />;
    case "TanStack React Query":
      return <RefreshCw className="w-4 h-4" />;
    case "FastAPI & Python":
      return <Terminal className="w-4 h-4" />;
    case "MySQL & Relational Design":
    case "Supabase (Postgres & Auth)":
      return <Database className="w-4 h-4" />;
    case "Offline-First Architectures":
      return <WifiOff className="w-4 h-4" />;
    case "Docker & Containerization":
      return <Box className="w-4 h-4" />;
    case "NGINX Reverse Proxy":
      return <ShieldCheck className="w-4 h-4" />;
    case "Jenkins CI/CD":
    case "Git, GitHub & CI/CD":
      return <GitBranch className="w-4 h-4" />;
    case "AWS (EC2, IAM, S3)":
      return <Cloud className="w-4 h-4" />;
    case "LangChain Orchestration":
      return <Cpu className="w-4 h-4" />;
    case "OpenAI & Gemini APIs":
      return <Sparkles className="w-4 h-4" />;
    case "Prompt Engineering":
      return <Sliders className="w-4 h-4" />;
    case "Scientific Research Methodology":
      return <BookOpen className="w-4 h-4" />;
    default:
      return <Code2 className="w-4 h-4" />;
  }
};

const getMasteryLabel = (level: number) => {
  if (level >= 94) return "Production Authority";
  if (level >= 90) return "Expert Production";
  if (level >= 86) return "Advanced Architect";
  return "Proficient Production";
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
}) => {
  // FEAT-06: Segmented Multi-Tab Controller
  const [showcaseTab, setShowcaseTab] = useState<
    "projects" | "credentials" | "tech-stack"
  >("projects");

  // Showcasing Template Mode: Card Deck Flip | Stacking Slider | Architectural Grid
  const [templateMode, setTemplateMode] = useState<
    "deck-flip" | "stacking" | "grid"
  >("deck-flip");

  // Master Flip State for 3D Deck Flip
  const [masterFlip, setMasterFlip] = useState(false);

  const [filter, setFilter] = useState<
    "All" | "Full Stack" | "Mobile" | "AI & Gen-AI" | "DevOps & Cloud"
  >("All");

  const filteredProjects =
    filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter);

  const categories: (
    | "All"
    | "Full Stack"
    | "Mobile"
    | "AI & Gen-AI"
    | "DevOps & Cloud"
  )[] = ["All", "Mobile", "Full Stack", "AI & Gen-AI", "DevOps & Cloud"];

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Mobile":
        return {
          accent: "#0284c7",
          icon: Smartphone,
          gradient: "from-sky-500 via-blue-600 to-indigo-600",
          badgeBg: "bg-sky-50 text-sky-800 border-sky-200/80",
          btnGradient:
            "from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500",
        };
      case "Full Stack":
        return {
          accent: "#059669",
          icon: Layers,
          gradient: "from-emerald-500 via-teal-600 to-amber-500",
          badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
          btnGradient:
            "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
        };
      case "AI & Gen-AI":
        return {
          accent: "#7c3aed",
          icon: Cpu,
          gradient: "from-purple-500 via-fuchsia-600 to-indigo-600",
          badgeBg: "bg-purple-50 text-purple-800 border-purple-200/80",
          btnGradient:
            "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
        };
      case "DevOps & Cloud":
      default:
        return {
          accent: "#d97706",
          icon: GitBranch,
          gradient: "from-amber-500 via-orange-600 to-rose-600",
          badgeBg: "bg-amber-50 text-amber-800 border-amber-200/80",
          btnGradient:
            "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
        };
    }
  };

  const getProjectTheme = (project: Project) => {
    switch (project.id) {
      case "tain-electai":
        return {
          accent: "#0284c7",
          icon: Smartphone,
          gradient: "from-sky-500 via-blue-600 to-indigo-600",
          badgeBg: "bg-sky-50 text-sky-800 border-sky-200/80",
          btnGradient:
            "from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500",
        };
      case "agrostock":
        return {
          accent: "#059669",
          icon: Layers,
          gradient: "from-emerald-500 via-teal-600 to-green-600",
          badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200/80",
          btnGradient:
            "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
        };
      case "greentop":
        return {
          accent: "#0d9488",
          icon: Layers,
          gradient: "from-teal-500 via-emerald-600 to-cyan-600",
          badgeBg: "bg-teal-50 text-teal-800 border-teal-200/80",
          btnGradient:
            "from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500",
        };
      case "email-translator":
        return {
          accent: "#7c3aed",
          icon: Cpu,
          gradient: "from-purple-500 via-fuchsia-600 to-indigo-600",
          badgeBg: "bg-purple-50 text-purple-800 border-purple-200/80",
          btnGradient:
            "from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500",
        };
      case "house-rent-devops":
        return {
          accent: "#d97706",
          icon: GitBranch,
          gradient: "from-amber-500 via-orange-600 to-rose-600",
          badgeBg: "bg-amber-50 text-amber-800 border-amber-200/80",
          btnGradient:
            "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
        };
      default:
        return getCategoryTheme(project.category);
    }
  };

  // Tech Stack Tab Filters
  const [techFilter, setTechFilter] = useState<string>("All");
  const [techCoreOnly, setTechCoreOnly] = useState<boolean>(false);

  // Flattened all skills for Tech Stack Tab
  const allSkills = SKILL_CATEGORIES.flatMap((cat) =>
    cat.skills.map((s) => ({
      ...s,
      categoryName: cat.category,
      brandColor: TECH_BRAND_COLORS[s.name] || "#0284c7",
    })),
  );

  const techCategories = ["All", ...SKILL_CATEGORIES.map((c) => c.category)];

  const filteredSkills = allSkills.filter((s) => {
    const matchesCategory =
      techFilter === "All" || s.categoryName === techFilter;
    const matchesCore = !techCoreOnly || s.highlight;
    return matchesCategory && matchesCore;
  });

  return (
    <section
      id="projects"
      className="pt-8 sm:pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative z-10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] text-xs font-mono uppercase tracking-wider mb-3 font-bold shadow-sm">
              <FolderGit2 className="w-4 h-4 text-[#059669] stroke-[2.5]" />
              <span>Production Systems &amp; Technical Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight leading-none">
              <span>Engineering </span>
              <span className="bg-gradient-to-r from-[#059669] via-[#10B981] to-[#E34234] bg-clip-text text-transparent">
                Portfolio Showcase
              </span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl mx-auto font-medium leading-relaxed">
              Explore flagship production architectures, published academic
              research, and verified daily technology proficiencies.
            </p>
          </div>

          {/* FEAT-06: Segmented Multi-Tab Controller */}
          <div className="flex justify-center mb-8">
            <div
              role="tablist"
              aria-label="Portfolio Showcase Views"
              className="inline-flex items-center p-1.5 rounded-2xl bg-[#FFFDF9] border border-[#EADBCA] shadow-md backdrop-blur-md gap-1.5 max-w-full overflow-x-auto"
            >
              <button
                role="tab"
                id="tab-projects"
                aria-selected={showcaseTab === "projects"}
                aria-controls="panel-projects"
                onClick={() => setShowcaseTab("projects")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black transition-all ${
                  showcaseTab === "projects"
                    ? "bg-gradient-to-r from-[#059669] to-[#047857] text-white shadow-md shadow-emerald-600/25 scale-[1.02]"
                    : "text-stone-600 hover:text-[#065F46] hover:bg-[#FAF3E7]"
                }`}
              >
                <FolderGit2 className="w-4 h-4 text-white" />
                <span>Projects ({PROJECTS.length})</span>
              </button>

              <button
                role="tab"
                id="tab-credentials"
                aria-selected={showcaseTab === "credentials"}
                aria-controls="panel-credentials"
                onClick={() => setShowcaseTab("credentials")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black transition-all ${
                  showcaseTab === "credentials"
                    ? "bg-gradient-to-r from-[#059669] to-[#047857] text-white shadow-md shadow-emerald-600/25 scale-[1.02]"
                    : "text-stone-600 hover:text-[#065F46] hover:bg-[#FAF3E7]"
                }`}
              >
                <Award className="w-4 h-4" />
                <span>Credentials &amp; Research</span>
              </button>

              <button
                role="tab"
                id="tab-tech-stack"
                aria-selected={showcaseTab === "tech-stack"}
                aria-controls="panel-tech-stack"
                onClick={() => setShowcaseTab("tech-stack")}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-black transition-all ${
                  showcaseTab === "tech-stack"
                    ? "bg-gradient-to-r from-[#059669] to-[#047857] text-white shadow-md shadow-emerald-600/25 scale-[1.02]"
                    : "text-stone-600 hover:text-[#065F46] hover:bg-[#FAF3E7]"
                }`}
              >
                <Code2 className="w-4 h-4" />
                <span>Tech Stack ({allSkills.length})</span>
              </button>
            </div>
          </div>
        </ScrollAssemble>

        {/* TAB 1: PROJECTS SHOWCASE WITH DYNAMIC TEMPLATES */}
        {showcaseTab === "projects" && (
          <div
            id="panel-projects"
            role="tabpanel"
            aria-labelledby="tab-projects"
            className="space-y-6 animate-fadeIn"
          >
            {/* Template Selector & Category Filter Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3 rounded-2xl bg-[#FFFDF9] backdrop-blur-md border border-[#EADBCA] shadow-sm">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all font-semibold ${
                      filter === cat
                        ? "bg-[#059669] text-white shadow-xs scale-[1.02]"
                        : "bg-[#FAF3E7] text-stone-600 hover:text-stone-900 hover:bg-[#F5ECE0] border border-[#EADBCA]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Showcasing Template Mode Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF3E7] border border-[#EADBCA] overflow-x-auto self-stretch md:self-auto justify-center">
                <button
                  onClick={() => setTemplateMode("deck-flip")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    templateMode === "deck-flip"
                      ? "bg-[#FFFDF9] text-stone-900 shadow-xs border border-[#EADBCA]"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                  title="Card Deck Flip: 3D interactive flip revealing architectural blueprints"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#059669]" />
                  <span>3D Deck Flip</span>
                </button>

                <button
                  onClick={() => setTemplateMode("stacking")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    templateMode === "stacking"
                      ? "bg-[#FFFDF9] text-stone-900 shadow-xs border border-[#EADBCA]"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                  title="Stacking Slider: 3D stacked cards with swipe depth"
                >
                  <Layers className="w-3.5 h-3.5 text-[#047857]" />
                  <span>Stacking Deck</span>
                </button>

                <button
                  onClick={() => setTemplateMode("grid")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all whitespace-nowrap ${
                    templateMode === "grid"
                      ? "bg-[#FFFDF9] text-stone-900 shadow-xs border border-[#EADBCA]"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                  title="Architectural Grid: Standard multi-column overview"
                >
                  <LayoutGrid className="w-3.5 h-3.5 text-[#059669]" />
                  <span>Grid</span>
                </button>
              </div>
            </div>

            {/* TEMPLATE 1: STACKING SLIDER */}
            {templateMode === "stacking" && (
              <div className="py-2 animate-fadeIn">
                <StackingSlider
                  projects={filteredProjects}
                  getCategoryTheme={getCategoryTheme}
                  getProjectTheme={getProjectTheme}
                  onSelectProject={onSelectProject}
                />
              </div>
            )}

            {/* TEMPLATE 2 & 3: CARD DECK FLIP & ARCHITECTURAL GRID */}
            {(templateMode === "deck-flip" || templateMode === "grid") && (
              <div className="space-y-4 animate-fadeIn">
                {/* Deck Flip Quick Master Controls */}
                {templateMode === "deck-flip" && (
                  <div className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs text-xs font-mono">
                    <span className="text-slate-600 font-semibold flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-600" />
                      </span>
                      <span>
                        {masterFlip
                          ? "Architecture Blueprints Active (Showing Backend / Flow / Specs)"
                          : "Live Product Showcases (Showing Front Interfaces & Carousels)"}
                      </span>
                    </span>
                    <button
                      onClick={() => setMasterFlip((prev) => !prev)}
                      className={`group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all shadow-xs active:scale-95 ${
                        masterFlip
                          ? "bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25 ring-2 ring-sky-300"
                          : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/10"
                      }`}
                      title={masterFlip ? "Flip all cards back to product showcase" : "Flip all cards in 3D to reveal architecture blueprints"}
                    >
                      <RotateCcw
                        className={`w-3.5 h-3.5 transition-transform duration-700 ease-out ${
                          masterFlip ? "-rotate-180 text-sky-200" : "text-sky-400 group-hover:-rotate-90"
                        }`}
                      />
                      <span>{masterFlip ? "Flip All to Product View" : "Flip All to Blueprint"}</span>
                    </button>
                  </div>
                )}

                {/* Projects Card Grid with Centered Flow Layout */}
                <div className="min-h-[640px] flex flex-wrap justify-center gap-6 sm:gap-7">
                  {filteredProjects.map((project, idx) => {
                    const theme = getProjectTheme(project);

                    return (
                      <ScrollAssemble
                        key={project.id}
                        direction={idx % 2 === 0 ? "left" : "bottom"}
                        delay={(idx % 3) * 0.08}
                        distance={35}
                        className="w-full md:w-[calc(50%-14px)] lg:w-[calc(33.333333%-19px)] max-w-md lg:max-w-none flex flex-col"
                      >
                        <ProjectCardFlip
                          key={project.id}
                          project={project}
                          theme={theme}
                          onSelectProject={onSelectProject}
                          defaultFlipped={masterFlip}
                          flipDelay={idx * 75}
                          className="w-full h-full flex flex-col flex-1"
                        />
                      </ScrollAssemble>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: CREDENTIALS & RESEARCH */}
        {showcaseTab === "credentials" && (
          <div
            id="panel-credentials"
            role="tabpanel"
            aria-labelledby="tab-credentials"
            className="space-y-6 animate-fadeIn"
          >
            {/* Gen-AI Research Publication Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5ECE0] border border-[#EADBCA] shadow-[0_8px_30px_-6px_rgba(180,120,60,0.08)] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#059669] via-[#10B981] to-[#E34234]" />
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EADBCA]/70">
                <span className="text-xs font-mono px-3 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-bold flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#059669] stroke-[2.2]" />
                  <span>Peer-Reviewed Publication • {RESEARCH_PAPER.year}</span>
                </span>
                <span className="text-xs font-mono font-bold text-[#78350F] bg-[#FAF3E7] px-2.5 py-0.5 rounded-md border border-[#EADBCA]">
                  ISSN: {RESEARCH_PAPER.issn}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black font-display text-slate-900 mt-4 leading-snug">
                &ldquo;{RESEARCH_PAPER.title}&rdquo;
              </h3>
              <p className="text-xs sm:text-sm font-mono text-[#059669] font-bold mt-1">
                Journal: {RESEARCH_PAPER.journal} ({RESEARCH_PAPER.volume},{" "}
                {RESEARCH_PAPER.page})
              </p>

              <p className="text-stone-700 text-sm mt-3 leading-relaxed font-medium">
                {RESEARCH_PAPER.abstract}
              </p>

              <div className="flex flex-wrap gap-3 mt-5 pt-3 border-t border-[#EADBCA]/70">
                <a
                  href={RESEARCH_PAPER.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#059669] via-[#047857] to-[#E34234] text-white font-mono font-semibold text-xs shadow-md shadow-emerald-600/25 hover:brightness-105 transition-all active:scale-98"
                >
                  <FileDown className="w-4 h-4 stroke-[2.2]" />
                  <span>Download Published Paper (PDF)</span>
                </a>
              </div>
            </div>

            {/* Academic Degrees & CGPA Distinction */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {EDUCATION_LIST.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FFFDF9] via-[#FAF6ED] to-[#F5ECE0] border border-[#EADBCA] shadow-[0_8px_24px_-6px_rgba(180,120,60,0.08)] hover:border-[#059669] flex flex-col justify-between transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-mono font-bold text-stone-500">
                        {edu.year}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#065F46] bg-[#ECFDF5] px-2.5 py-0.5 rounded-md border border-[#A7F3D0]">
                        {edu.scoreType}: {edu.score}
                      </span>
                    </div>
                    <h4 className="text-lg font-black font-display text-slate-900">
                      {edu.degree}
                    </h4>
                    <p className="text-xs font-medium text-stone-500 mt-0.5">
                      {edu.institution}, {edu.location}
                    </p>
                  </div>
                  <p className="text-xs text-stone-600 mt-3 font-mono pt-2 border-t border-[#EADBCA]/70">
                    {edu.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TECH STACK ARCHITECTURAL SHOWCASE WITH BRAND GLOW CARDS */}
        {showcaseTab === "tech-stack" && (
          <div
            id="panel-tech-stack"
            role="tabpanel"
            aria-labelledby="tab-tech-stack"
            className="space-y-6 animate-fadeIn"
          >
            {/* Header & Category Filter Toolbar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#FFFDF9] backdrop-blur-md border border-[#EADBCA] shadow-xs">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {techCategories.map((cat) => {
                  const count =
                    cat === "All"
                      ? allSkills.length
                      : allSkills.filter((s) => s.categoryName === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setTechFilter(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all font-bold flex items-center gap-1.5 ${
                        techFilter === cat
                          ? "bg-[#059669] text-white shadow-xs scale-[1.02]"
                          : "bg-[#FAF3E7] text-stone-600 hover:text-stone-900 hover:bg-[#F5ECE0] border border-[#EADBCA]"
                      }`}
                    >
                      <span>
                        {cat === "All" ? "All Stack" : cat.split("&")[0].trim()}
                      </span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                          techFilter === cat
                            ? "bg-white/25 text-white"
                            : "bg-black/5 text-stone-600"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Core Flagship Filter Toggle */}
              <button
                onClick={() => setTechCoreOnly((prev) => !prev)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border shadow-xs whitespace-nowrap active:scale-95 ${
                  techCoreOnly
                    ? "bg-amber-500 text-white border-amber-600 shadow-amber-500/25 ring-2 ring-amber-300"
                    : "bg-[#FAF3E7] text-stone-700 hover:text-stone-900 border-[#EADBCA] hover:bg-[#F5ECE0]"
                }`}
                title={
                  techCoreOnly
                    ? "Show all skills"
                    : "Filter by core flagship skills only"
                }
              >
                <Sparkles
                  className={`w-3.5 h-3.5 ${
                    techCoreOnly ? "text-white" : "text-amber-600"
                  }`}
                />
                <span>
                  {techCoreOnly ? "Core Stack Active" : "Filter Core Only"}
                </span>
              </button>
            </div>

            {/* Tech Stack Architectural Cards with Centered Flow Layout */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5 min-h-[480px]">
              {filteredSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-[calc(50%-10px)] lg:w-[calc(33.333333%-14px)] flex flex-col"
                >
                  <TiltCard
                    maxTilt={2.5}
                    scale={1.008}
                    glareOpacity={0.05}
                    className="w-full h-full flex flex-col flex-1"
                  >
                    <div className="w-full h-full min-h-[175px] rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 hover:border-slate-300 p-4 sm:p-5 flex flex-col justify-between shadow-[0_4px_20px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(15,23,42,0.12)] transition-all duration-300 relative overflow-hidden group select-none">
                      {/* Top Specular Brand Accent Line */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                        style={{ backgroundColor: skill.brandColor }}
                      />

                      {/* Ambient Hover Radial Spotlight */}
                      <div
                        className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500"
                        style={{ backgroundColor: skill.brandColor }}
                      />

                      {/* Top Header Row: Icon + Name + Category + Badges */}
                      <div>
                        <div className="flex items-start justify-between gap-2.5 mb-2.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Brand Icon Box */}
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border transition-transform duration-300 group-hover:scale-105 shadow-2xs"
                              style={{
                                backgroundColor: `${skill.brandColor}18`,
                                borderColor: `${skill.brandColor}35`,
                                color: skill.brandColor,
                              }}
                            >
                              {getTechIcon(skill.name)}
                            </div>

                            <div className="min-w-0">
                              <h4 className="text-sm sm:text-base font-black font-display text-slate-900 group-hover:text-slate-950 transition-colors leading-tight truncate">
                                {skill.name}
                              </h4>
                              <span className="text-[10px] font-mono font-semibold text-slate-500 block truncate mt-0.5">
                                {skill.categoryName}
                              </span>
                            </div>
                          </div>

                          {/* CORE Badge or Mastery Level */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {skill.highlight && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-mono font-black uppercase tracking-wider shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                Core
                              </span>
                            )}
                            <span
                              className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black border shadow-2xs"
                              style={{
                                backgroundColor: `${skill.brandColor}14`,
                                borderColor: `${skill.brandColor}35`,
                                color:
                                  skill.brandColor === "#ffffff"
                                    ? "#0f172a"
                                    : skill.brandColor,
                              }}
                            >
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Production Architecture Capability Description */}
                        {skill.description && (
                          <p className="text-xs text-slate-600 font-medium leading-relaxed line-clamp-2 mt-1.5">
                            {skill.description}
                          </p>
                        )}
                      </div>

                      {/* Bottom Mastery Meter Row */}
                      <div className="pt-3 mt-3 border-t border-slate-100 flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-slate-700 font-bold flex items-center gap-1.5">
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: skill.brandColor }}
                            />
                            {getMasteryLabel(skill.level)}
                          </span>
                          <span className="text-slate-400 font-medium">
                            Production Verified
                          </span>
                        </div>

                        {/* Precision Progress Bar */}
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80 p-[0.5px]">
                          <div
                            className="h-full rounded-full transition-all duration-700 ease-out"
                            style={{
                              width: `${skill.level}%`,
                              backgroundColor: skill.brandColor,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
