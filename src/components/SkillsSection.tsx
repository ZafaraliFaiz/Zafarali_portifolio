import React, { useState } from 'react';
import { 
  Code2, 
  Smartphone, 
  Server, 
  Cloud, 
  Cpu, 
  CheckCircle2, 
  Sparkles,
  Zap
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { TiltCard } from './TiltCard';

export const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Frontend & Mobile');

  const selectedCategoryData = SKILL_CATEGORIES.find(
    (c) => c.category === activeCategory
  ) || SKILL_CATEGORIES[0];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'smartphone': return <Smartphone className="w-4 h-4" />;
      case 'server': return <Server className="w-4 h-4" />;
      case 'cloud': return <Cloud className="w-4 h-4" />;
      case 'cpu': return <Cpu className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-mono uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display tracking-tight">
            Engineered For{' '}
            <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              High Complexity
            </span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Languages, frameworks, architecture paradigms, and cloud infrastructure verified across production deployments.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(cat.category)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeCategory === cat.category
                  ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/25 scale-105'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:text-slate-900 shadow-sm'
              }`}
            >
              {getCategoryIcon(cat.iconName)}
              <span>{cat.category}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {selectedCategoryData.skills.map((skill) => (
            <TiltCard
              key={skill.name}
              maxTilt={5}
              scale={1.02}
              glareOpacity={0.1}
              className="h-full"
            >
              <div className="bg-white/95 p-5 rounded-xl border border-slate-200/90 hover:border-sky-400 hover:shadow-lg transition-all h-full flex flex-col justify-between group shadow-md">
                <div>
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-sky-600 transition-colors">
                        {skill.name}
                      </span>
                      {skill.highlight && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-50 text-sky-700 border border-sky-200">
                          Core
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-mono text-sky-600 font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden my-2 border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {skill.description}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* Core Languages Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md">
          <div className="text-xs font-mono text-slate-500 uppercase tracking-wider mb-3">
            Core Programming Languages:
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {[
              { name: 'JavaScript (ESNext)', type: 'Primary' },
              { name: 'TypeScript', type: 'Primary' },
              { name: 'Python', type: 'Primary' },
              { name: 'Java', type: 'Academic / Core' },
              { name: 'C', type: 'Foundational' },
              { name: 'SQL', type: 'Relational / ACID' },
            ].map((lang) => (
              <div
                key={lang.name}
                className="px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-mono flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                <span className="text-slate-800 font-semibold">{lang.name}</span>
                <span className="text-[10px] text-slate-500">({lang.type})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
