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
import { ScrollAssemble } from './animations/ScrollAssemble';
import { ScrollFocusZoom } from './animations/ScrollFocusZoom';

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
        {/* Header & Category Tabs */}
        <ScrollAssemble direction="top" distance={35}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 border-2 border-sky-300 text-sky-800 text-xs font-mono uppercase tracking-wider mb-3 font-bold shadow-sm">
              <Zap className="w-4 h-4 text-sky-600 stroke-[2.5]" />
              <span>Technical Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 font-display tracking-tight">
              Engineered For{' '}
              <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                High Complexity
              </span>
            </h2>
            <p className="text-slate-700 text-sm sm:text-base mt-2 font-medium leading-relaxed">
              Languages, frameworks, architecture paradigms, and cloud infrastructure verified across production deployments.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-10">
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`px-4 py-2.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border-2 ${
                  activeCategory === cat.category
                    ? 'bg-sky-600 text-white border-sky-600 shadow-lg shadow-sky-500/30 scale-105'
                    : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:text-sky-700 shadow-sm'
                }`}
              >
                {getCategoryIcon(cat.iconName)}
                <span>{cat.category}</span>
              </button>
            ))}
          </div>
        </ScrollAssemble>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {selectedCategoryData.skills.map((skill, idx) => (
            <ScrollAssemble
              key={skill.name}
              direction={idx % 2 === 0 ? 'tilt-left' : 'tilt-right'}
              delay={(idx % 4) * 0.08}
              distance={40}
              className="h-full"
            >
              <ScrollFocusZoom maxScale={1.015} className="h-full">
                <TiltCard
                  maxTilt={5}
                  scale={1.01}
                  glareOpacity={0.1}
                  className="h-full"
                >
                  <div className="bg-white p-5 sm:p-6 rounded-2xl border-2 border-slate-200/90 hover:border-sky-500 hover:shadow-xl transition-all h-full flex flex-col justify-between group shadow-md">
                    <div>
                      <div className="flex items-center justify-between gap-3 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm sm:text-base group-hover:text-sky-600 transition-colors font-display">
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-sky-100 text-sky-900 border-2 border-sky-300 font-extrabold shadow-sm">
                              Core
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-mono text-sky-700 font-black">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden my-2.5 border border-slate-300">
                        <div
                          className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-full transition-all duration-700 ease-out"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        {skill.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollFocusZoom>
            </ScrollAssemble>
          ))}
        </div>

        {/* Core Languages Strip */}
        <ScrollAssemble direction="bottom" distance={45} delay={0.15}>
          <ScrollFocusZoom maxScale={1.015}>
            <div className="mt-12 p-6 sm:p-7 rounded-3xl bg-white border-2 border-slate-200/90 shadow-xl">
              <div className="text-xs font-mono text-slate-700 uppercase tracking-wider mb-3.5 font-bold">
                Core Programming Languages & Paradigms:
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
                    className="px-3.5 py-2 rounded-xl bg-slate-50 border-2 border-slate-200 text-xs font-mono flex items-center gap-2 shadow-sm"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span>
                    <span className="text-slate-900 font-black">{lang.name}</span>
                    <span className="text-[10px] text-slate-600 font-semibold">({lang.type})</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollFocusZoom>
        </ScrollAssemble>
      </div>
    </section>
  );
};
